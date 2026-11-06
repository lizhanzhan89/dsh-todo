/**
 * Persistence for the Client half.
 *
 * The Client never touches the file system itself: the Host half owns the JSON
 * file and exposes it over `STATE_URL`. The browser cookie carries the session,
 * so a plain `fetch` is already authenticated.
 *
 * The whole state is POSTed on every change, so the file on disk is always the
 * current copy and no merge logic is needed.
 */

/**
 * A new state with nothing in it.
 *
 * `includeDone` is a preference, not data, but it lives in the same file: it
 * decides whether the combined "All" tab lists finished todos, and that is a
 * per-user choice worth keeping across reloads.
 */
function emptyState() {
  return { projects: [], todos: [], trash: [], includeDone: true };
}

/** Coerce whatever came back from disk into the shape the page expects. */
function normalizeState(parsed) {
  return {
    // `archived` is a flag on the project itself: an archived project keeps its
    // items and its position, it just leaves the board for the archive view.
    projects: Array.isArray(parsed && parsed.projects) ? parsed.projects : [],
    // `due` is a calendar day ("2026-11-06"), kept on the todo beside the text.
    todos: Array.isArray(parsed && parsed.todos) ? parsed.todos : [],
    // The recycle bin: deleted items and projects kept for restoring.
    trash: Array.isArray(parsed && parsed.trash) ? parsed.trash : [],
    // A file written before this flag existed has no value; default to showing
    // finished todos, which is what those versions did.
    includeDone: !(parsed && parsed.includeDone === false),
  };
}

function emptyMeta() {
  return { dataDir: '', dataFile: '', backupDir: '' };
}

/**
 * Where the Host keeps the data. It rides along with the state response; an
 * older Host answers with just the state, so this is always optional.
 */
function readMeta(data) {
  const meta = data && data.meta;
  if (!meta || typeof meta !== 'object') return emptyMeta();
  return {
    dataDir: typeof meta.dataDir === 'string' ? meta.dataDir : '',
    dataFile: typeof meta.dataFile === 'string' ? meta.dataFile : '',
    backupDir: typeof meta.backupDir === 'string' ? meta.backupDir : '',
  };
}

/** Stable unique id for a project or an item. */
function uid() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch (e) { /* ignore */ }
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

/**
 * Read the stored state. A missing file or a network error yields empty state.
 *
 * Returns the state with its `meta` already reduced to strings, so the caller
 * can show the data folder without re-checking the response shape.
 */
async function loadState() {
  try {
    const res = await fetch(STATE_URL, { method: 'GET', headers: { accept: 'application/json' } });
    if (!res.ok) return { ...emptyState(), meta: emptyMeta() };
    const data = await res.json();
    return { ...normalizeState(data), meta: readMeta(data) };
  } catch (e) {
    return { ...emptyState(), meta: emptyMeta() };
  }
}

/** Replace the stored state. Transient network errors are ignored. */
async function saveState(state) {
  try {
    await fetch(STATE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(state),
    });
  } catch (e) { /* ignore transient network errors */ }
}

/**
 * The same request, but it reports what happened.
 *
 * `saveState` above is fire-and-forget: it runs on every keystroke-level change
 * and a transient failure would only produce noise. The sync button is a
 * deliberate, user-initiated action, so it needs a real answer to show.
 *
 * @param {object} state the state to write
 * @returns {Promise<{ ok: boolean, error?: string }>} `error` is a locale key
 */
async function syncState(state) {
  try {
    const res = await fetch(STATE_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(state),
    });
    if (!res || !res.ok) return { ok: false, error: 'syncFailed' };
    let meta = emptyMeta();
    try {
      meta = readMeta(await res.json());
    } catch (e) { /* an older Host answers with a bare { ok: true } */ }
    return { ok: true, meta };
  } catch (e) {
    return { ok: false, error: 'syncFailed' };
  }
}
