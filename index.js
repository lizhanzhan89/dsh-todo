/**
 * Host half of the Memos bundle.
 *
 * Owns the JSON data file and exposes it over one authenticated HTTP route that
 * the Client half talks to:
 *   GET  /api/todo-project  -> the stored state JSON ({ projects, todos, trash })
 *   POST /api/todo-project  -> replace the stored state with the request body
 *
 * Every Client change POSTs the full state, so the JSON file on disk is always
 * the current copy. Writes go to a temporary file first and are then renamed,
 * so a reader never sees a half-written file.
 */
import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname, isAbsolute, join, resolve } from 'node:path';

export const name = 'dsh-todo';
export const inject = ['webServer', 'connection'];

const ROUTE_PATH = '/api/todo-project';
const DEFAULT_FILE_NAME = 'todo-projects.json';

export function apply(ctx, config = {}) {
  const workingDirectory = ctx.get('workingDirectory');
  const baseDir =
    (workingDirectory && typeof workingDirectory.defaultDirectory === 'string' && workingDirectory.defaultDirectory) ||
    process.cwd();
  // The row's `config.fileName` may override the data file name; an absolute
  // path is used as-is, anything else resolves against the workspace root.
  const requested = config && typeof config.fileName === 'string' ? config.fileName.trim() : '';
  const fileName = requested || DEFAULT_FILE_NAME;
  const dataFile = isAbsolute(fileName) ? resolve(fileName) : join(baseDir, fileName);

  async function readState() {
    try {
      const text = await readFile(dataFile, 'utf8');
      const parsed = JSON.parse(text);
      return {
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        todos: Array.isArray(parsed.todos) ? parsed.todos : [],
        trash: Array.isArray(parsed.trash) ? parsed.trash : [],
      };
    } catch (error) {
      if (error && error.code === 'ENOENT') return { projects: [], todos: [], trash: [] };
      ctx.logger.warn('dsh-todo: failed to read data file', error);
      return { projects: [], todos: [], trash: [] };
    }
  }

  async function writeState(state) {
    const safe = {
      projects: Array.isArray(state && state.projects) ? state.projects : [],
      todos: Array.isArray(state && state.todos) ? state.todos : [],
      trash: Array.isArray(state && state.trash) ? state.trash : [],
    };
    await mkdir(dirname(dataFile), { recursive: true });
    const tmp = dataFile + '.' + process.pid + '.tmp';
    // Write-then-rename so a reader never sees a half-written file.
    await writeFile(tmp, JSON.stringify(safe, null, 2), 'utf8');
    await rename(tmp, dataFile);
    return safe;
  }

  function readBody(req, limitBytes = 5 * 1024 * 1024) {
    return new Promise((resolve, reject) => {
      let size = 0;
      const chunks = [];
      req.on('data', (chunk) => {
        size += chunk.length;
        if (size > limitBytes) {
          reject(new Error('request body too large'));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });
      req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      req.on('error', reject);
    });
  }

  function sendJson(res, status, value) {
    res.writeHead(status, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    });
    res.end(JSON.stringify(value));
  }

  const dispose = ctx.webServer.register({
    kind: 'exact',
    path: ROUTE_PATH,
    handler: async (req, res) => {
      // Same authentication gate as the application index.
      if (!ctx.connection.authorizeIndex(req, res)) return;
      try {
        if (req.method === 'GET' || req.method === 'HEAD') {
          sendJson(res, 200, await readState());
          return;
        }
        if (req.method === 'POST') {
          const raw = await readBody(req);
          let parsed;
          try {
            parsed = JSON.parse(raw);
          } catch (error) {
            sendJson(res, 400, { error: 'invalid-json' });
            return;
          }
          await writeState(parsed);
          sendJson(res, 200, { ok: true });
          return;
        }
        res.writeHead(405, { allow: 'GET, HEAD, POST' });
        res.end();
      } catch (error) {
        ctx.logger.warn('dsh-todo: route handler failed', error);
        if (!res.headersSent) sendJson(res, 500, { error: 'internal-error' });
        else res.destroy();
      }
    },
  });

  ctx.effect(() => dispose, 'dsh-todo: data route');
  ctx.logger.info('dsh-todo: serving data file at ' + dataFile);
}
