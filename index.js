/**
 * Host half of the dsh-todo bundle.
 *
 * Owns the data folder and exposes it over one authenticated HTTP route that the
 * Client half talks to:
 *   GET  /api/dsh-todo  -> the stored state JSON, plus where it lives
 *   POST /api/dsh-todo  -> replace the stored state with the request body
 *
 * Every Client change POSTs the full state, so the JSON file on disk is always
 * the current copy. Writes go to a temporary file first and are then renamed,
 * so a reader never sees a half-written file.
 *
 * Before each day's first write, the previous file is copied into `backups/`
 * and backups older than the retention window are pruned.
 */
import { readFile, writeFile, rename, mkdir, copyFile, readdir, unlink } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, resolve } from 'node:path';

export const name = 'dsh-todo';
export const inject = ['webServer', 'connection'];

const ROUTE_PATH = '/api/dsh-todo';
const DEFAULT_DIR_NAME = 'dsh-todo';
const DEFAULT_FILE_NAME = 'dsh-todo.json';

/** Backups live beside the data file, so the folder is self-contained. */
const BACKUP_DIR = 'backups';
/** How many daily backups to keep. */
const KEEP_BACKUPS = 7;

/**
 * Where the data lives when the row sets no `config.dataDir`: the user's
 * Documents folder, not the workspace.
 *
 * The workspace is a working area that gets wiped, cloned or switched between
 * projects; this data is personal and has to outlive all of that. The folder
 * name is localized, so it is derived from the home directory rather than
 * hard-coded - `~/Documents` on an English macOS, `~/文稿` on a Chinese one.
 */
function defaultDataDir() {
  return join(homedir(), 'Documents', DEFAULT_DIR_NAME);
}

/**
 * Keep the record fields the Client persists.
 *
 * This list is the one place the file's shape is decided. Building the object
 * field by field here (rather than spreading the body through) is what caused a
 * real bug: `includeDone` was added to the Client's state, the Client POSTed
 * it, and this whitelist dropped it on the floor, so the setting came back
 * defaulted after every reload. A whitelist is still the right thing - the file
 * must not absorb arbitrary request fields - so it now names every field.
 *
 * `projects` and `todos` are passed through as arrays: their own fields
 * (`archived` on a project, `due` on a todo) are the Client's business, and
 * listing them twice would be one more place to forget.
 *
 * @param {object} state whatever the Client sent
 * @returns {object} the subset that belongs in the file
 */
function pickState(state) {
  const picked = {
    projects: Array.isArray(state && state.projects) ? state.projects : [],
    todos: Array.isArray(state && state.todos) ? state.todos : [],
    trash: Array.isArray(state && state.trash) ? state.trash : [],
  };
  // A boolean preference, missing from files written by older versions.
  if (state && typeof state.includeDone === 'boolean') picked.includeDone = state.includeDone;
  return picked;
}

/** `2026-11-06` for a date, used as the backup file's own name. */
function dayStamp(date) {
  const d = date || new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

export function apply(ctx, config = {}) {
  // `config.dataDir` picks the folder (absolute path or relative to the home
  // directory); `config.fileName` renames the file inside it.
  const requestedDir = config && typeof config.dataDir === 'string' ? config.dataDir.trim() : '';
  const dataDir = requestedDir
    ? (isAbsolute(requestedDir) ? resolve(requestedDir) : join(homedir(), requestedDir))
    : defaultDataDir();
  const requestedFile = config && typeof config.fileName === 'string' ? config.fileName.trim() : '';
  const dataFile = join(dataDir, requestedFile || DEFAULT_FILE_NAME);
  const backupDir = join(dataDir, BACKUP_DIR);

  /**
   * Keep the newest KEEP_BACKUPS daily snapshots.
   *
   * Names sort lexically because they are ISO dates, so the newest ones are the
   * last. Anything else in the folder (a hand-made copy, a temp file) is left
   * alone: this only ever deletes files it wrote.
   */
  async function pruneBackups() {
    const names = await readdir(backupDir);
    const mine = names
      .filter((entry) => /^dsh-todo-\d{4}-\d{2}-\d{2}\.json$/.test(entry))
      .sort();
    const extra = mine.slice(0, Math.max(0, mine.length - KEEP_BACKUPS));
    for (const name of extra) await unlink(join(backupDir, name));
  }

  /**
   * Snapshot the current file as today's backup.
   *
   * At most one backup per day: if today's snapshot exists the file is left as
   * it is, so a day in which nothing changed still has the previous state and
   * ten edits in one afternoon do not push out ten days of history.
   */
  async function backupToday() {
    const target = join(backupDir, 'dsh-todo-' + dayStamp() + '.json');
    try {
      const existing = await readFile(target, 'utf8').then(() => true, () => false);
      if (existing) return null;
      // Copy the data file itself; a missing one means a first run, no backup.
      await copyFile(dataFile, target);
      await pruneBackups();
      return target;
    } catch (error) {
      if (error && error.code === 'ENOENT') return null;
      throw error;
    }
  }

  async function readState() {
    try {
      const text = await readFile(dataFile, 'utf8');
      // Same shape as a write, so a field never survives a write but vanish on
      // the way back in.
      return pickState(JSON.parse(text));
    } catch (error) {
      if (error && error.code === 'ENOENT') return { projects: [], todos: [], trash: [] };
      ctx.logger.warn('dsh-todo: failed to read data file', error);
      return { projects: [], todos: [], trash: [] };
    }
  }

  async function writeState(state) {
    const safe = pickState(state);
    await mkdir(dataDir, { recursive: true });
    await mkdir(backupDir, { recursive: true });
    // Before overwriting: keep yesterday's copy as today's snapshot.
    try {
      await backupToday();
    } catch (error) {
      // A failed backup must not cost the user their edit.
      ctx.logger.warn('dsh-todo: daily backup failed', error);
    }
    const tmp = dataFile + '.' + process.pid + '.tmp';
    // Write-then-rename so a reader never sees a half-written file.
    await writeFile(tmp, JSON.stringify(safe, null, 2), 'utf8');
    await rename(tmp, dataFile);
    return safe;
  }

  function readBody(req, limitBytes = 5 * 1024 * 1024) {
    return new Promise((resolvePromise, rejectPromise) => {
      let size = 0;
      const chunks = [];
      req.on('data', (chunk) => {
        size += chunk.length;
        if (size > limitBytes) {
          rejectPromise(new Error('request body too large'));
          req.destroy();
          return;
        }
        chunks.push(chunk);
      });
      req.on('end', () => resolvePromise(Buffer.concat(chunks).toString('utf8')));
      req.on('error', rejectPromise);
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
          // `meta` rides along with the state so the panel can show where the
          // data actually lives, which is otherwise only in the Host log.
          sendJson(res, 200, { ...(await readState()), meta: { dataDir, dataFile, backupDir } });
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
          sendJson(res, 200, { ok: true, meta: { dataDir, dataFile, backupDir } });
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
  ctx.logger.info('dsh-todo: data folder ' + dataDir + ' (backups in ' + backupDir + ')');
}
