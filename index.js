/**
 * Host half of the dsh-todo bundle.
 *
 * Owns the data folder and exposes it over authenticated HTTP routes that the
 * Client half talks to:
 *   GET    /api/dsh-todo            -> the stored state, where it lives, backup list
 *   POST   /api/dsh-todo            -> replace the stored state with the request body
 *   POST   /api/dsh-todo/backup     -> write a manual snapshot now
 *   POST   /api/dsh-todo/restore    -> replace everything from one snapshot
 *   POST   /api/dsh-todo/delete     -> remove one manual snapshot
 *
 * Every Client change POSTs the full state, so the JSON file on disk is always
 * the current copy. Writes go to a temporary file first and are then renamed,
 * so a reader never sees a half-written file.
 *
 * Two kinds of backup share one folder:
 *   dsh-todo-YYYY-MM-DD.json   automatic, one per day, pruned to the last 7
 *   manual-YYYYMMDD-HHmmss.json  requested by hand, never pruned
 */
import { readFile, writeFile, rename, mkdir, copyFile, readdir, unlink } from 'node:fs/promises';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, resolve } from 'node:path';

export const name = 'dsh-todo';
export const inject = ['webServer', 'connection'];

const ROUTE_PATH = '/api/dsh-todo';
const BACKUP_ROUTE = '/api/dsh-todo/backup';
const RESTORE_ROUTE = '/api/dsh-todo/restore';
const DELETE_ROUTE = '/api/dsh-todo/delete';
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

/** `2026-11-06` for a date, used as the automatic backup's own name. */
function dayStamp(date) {
  const d = date || new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
}

/** `20261106-193005` for a moment: a manual backup must not collide. */
function momentStamp(date) {
  const d = date || new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' +
    pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
}

/** The two kinds, recognised by name: only these may be listed or restored. */
const AUTO_NAME = /^dsh-todo-(\d{4})-(\d{2})-(\d{2})\.json$/;
const MANUAL_NAME = /^manual-(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})\.json$/;

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
   * Keep the newest KEEP_BACKUPS *automatic* snapshots.
   *
   * Names sort lexically because they are ISO dates, so the newest ones are the
   * last. Manual backups are matched by a different pattern and never removed
   * here - surviving the pruning is the whole point of pressing the button.
   * Anything else in the folder (a hand-made copy, a temp file) is left alone:
   * this only ever deletes files it wrote.
   */
  async function pruneBackups() {
    const names = await readdir(backupDir);
    const mine = names
      .filter((entry) => AUTO_NAME.test(entry))
      .sort();
    const extra = mine.slice(0, Math.max(0, mine.length - KEEP_BACKUPS));
    for (const name of extra) await unlink(join(backupDir, name));
  }

  /** When a backup file was written, from its name; null if it is not ours. */
  function stampOf(name) {
    const auto = AUTO_NAME.exec(name);
    if (auto) return { kind: 'auto', stamp: auto[1] + '-' + auto[2] + '-' + auto[3] + 'T00:00:00' };
    const manual = MANUAL_NAME.exec(name);
    if (manual) {
      return {
        kind: 'manual',
        stamp: manual[1] + '-' + manual[2] + '-' + manual[3] + 'T' + manual[4] + ':' + manual[5] + ':' + manual[6],
      };
    }
    return null;
  }

  /**
   * Every backup, newest first.
   *
   * A broken file is listed but flagged: it is real information that something
   * in the folder cannot be restored, and hiding it would only make the missing
   * entry puzzling.
   */
  async function listBackups() {
    let names;
    try {
      names = await readdir(backupDir);
    } catch (error) {
      if (error && error.code === 'ENOENT') return [];
      throw error;
    }
    const out = [];
    for (const name of names) {
      const info = stampOf(name);
      if (!info) continue;
      let ok = false;
      let size = 0;
      try {
        const text = await readFile(join(backupDir, name), 'utf8');
        const parsed = JSON.parse(text);
        ok = Boolean(parsed && typeof parsed === 'object' && (Array.isArray(parsed.projects) || Array.isArray(parsed.todos)));
        size = text.length;
      } catch (error) {
        ok = false;
      }
      out.push({ name, kind: info.kind, stamp: info.stamp, ok, size });
    }
    // Newest first: the row the user most likely wants is at the top.
    out.sort((a, b) => (a.stamp < b.stamp ? 1 : a.stamp > b.stamp ? -1 : 0));
    return out;
  }

  /**
   * Write a manual snapshot of what is on disk right now.
   *
   * It copies the data file rather than taking the Client's state, so a manual
   * backup and the automatic ones are the same kind of artifact: whatever was
   * last written. The Client saves on every change, so that is current.
   */
  async function writeManualBackup() {
    await mkdir(backupDir, { recursive: true });
    const name = 'manual-' + momentStamp() + '.json';
    await copyFile(dataFile, join(backupDir, name));
    return { name, kind: 'manual' };
  }

  /**
   * Replace the whole record from one backup.
   *
   * This is not the Client's "import": that one merges and never deletes, this
   * one is a real restore, so the current content is snapshotted first under a
   * manual name. Overwriting the live file with no way back would make one
   * mis-click cost a week of work.
   */
  /**
   * Delete one manual snapshot.
   *
   * Manual only. An automatic backup is the safety net for the last 7 days, and
   * letting the panel delete those would let one tired evening remove the only
   * copy of something; they expire by rotation instead. Deleting the file that
   * was just written by a restore's safety step is allowed - it is a manual
   * backup like any other.
   */
  async function deleteManualBackup(name) {
    if (!MANUAL_NAME.test(name)) throw new Error('unknown backup');
    await unlink(join(backupDir, name));
    return { name };
  }

  async function restoreFrom(name) {
    if (!stampOf(name)) throw new Error('unknown backup');
    const text = await readFile(join(backupDir, name), 'utf8');
    const parsed = JSON.parse(text);
    const safe = pickState(parsed);
    // Keep the pre-restore state before it is overwritten.
    let safety = null;
    try {
      safety = await writeManualBackup();
    } catch (error) {
      if (!(error && error.code === 'ENOENT')) throw error;
    }
    await mkdir(dataDir, { recursive: true });
    const tmp = dataFile + '.' + process.pid + '.restore.tmp';
    await writeFile(tmp, JSON.stringify(safe, null, 2), 'utf8');
    await rename(tmp, dataFile);
    return { state: safe, safety: safety && safety.name };
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

  /** Everything the panel needs about where the data lives and what can come back. */
  async function meta() {
    return {
      dataDir,
      dataFile,
      backupDir,
      keep: KEEP_BACKUPS,
      backups: await listBackups(),
    };
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
          sendJson(res, 200, { ...(await readState()), meta: await meta() });
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
          sendJson(res, 200, { ok: true, meta: await meta() });
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

  /**
   * POST only, same authentication. The body is JSON:
   *   /backup   {}                      -> { ok, backup, meta }
   *   /restore  { name: "manual-…" }    -> { ok, state, safety, meta }
   *   /delete   { name: "manual-…" }    -> { ok, name, meta }
   */
  function backupRoute(path, run) {
    return ctx.webServer.register({
      kind: 'exact',
      path,
      handler: async (req, res) => {
        if (!ctx.connection.authorizeIndex(req, res)) return;
        if (req.method !== 'POST') {
          res.writeHead(405, { allow: 'POST' });
          res.end();
          return;
        }
        try {
          const raw = await readBody(req);
          let body = {};
          try {
            body = raw ? JSON.parse(raw) : {};
          } catch (error) {
            sendJson(res, 400, { error: 'invalid-json' });
            return;
          }
          const payload = await run(body);
          sendJson(res, 200, { ok: true, ...payload, meta: await meta() });
        } catch (error) {
          // A restore that cannot read its file is a 404, not a server fault:
          // the name came from the caller and simply may not exist any more.
          const missing = error && (error.code === 'ENOENT' || error.message === 'unknown backup');
          if (missing) {
            sendJson(res, 404, { error: 'backup-not-found' });
            return;
          }
          ctx.logger.warn('dsh-todo: ' + path + ' failed', error);
          if (!res.headersSent) sendJson(res, 500, { error: 'internal-error' });
          else res.destroy();
        }
      },
    });
  }

  const disposeBackup = backupRoute(BACKUP_ROUTE, async () => ({ backup: await writeManualBackup() }));
  const disposeRestore = backupRoute(RESTORE_ROUTE, async (body) => {
    const name = typeof body && typeof body.name === 'string' ? body.name : '';
    if (!name) throw new Error('unknown backup');
    return restoreFrom(name);
  });
  const disposeDelete = backupRoute(DELETE_ROUTE, async (body) => {
    const name = typeof body && typeof body.name === 'string' ? body.name : '';
    if (!name) throw new Error('unknown backup');
    return deleteManualBackup(name);
  });

  ctx.effect(() => dispose, 'dsh-todo: data route');
  ctx.effect(() => disposeBackup, 'dsh-todo: backup route');
  ctx.effect(() => disposeRestore, 'dsh-todo: restore route');
  ctx.effect(() => disposeDelete, 'dsh-todo: delete route');
  ctx.logger.info('dsh-todo: data folder ' + dataDir + ' (backups in ' + backupDir + ')');
}
