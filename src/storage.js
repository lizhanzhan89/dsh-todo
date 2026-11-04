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

/** A new state with nothing in it. */
function emptyState() {
  return { projects: [], todos: [], trash: [] };
}

/** Coerce whatever came back from disk into the shape the page expects. */
function normalizeState(parsed) {
  return {
    projects: Array.isArray(parsed && parsed.projects) ? parsed.projects : [],
    todos: Array.isArray(parsed && parsed.todos) ? parsed.todos : [],
    // The recycle bin: deleted items and projects kept for restoring.
    trash: Array.isArray(parsed && parsed.trash) ? parsed.trash : [],
  };
}

/** Stable unique id for a project or an item. */
function uid() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch (e) { /* ignore */ }
  return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
}

/** Read the stored state. A missing file or a network error yields empty state. */
async function loadState() {
  try {
    const res = await fetch(STATE_URL, { method: 'GET', headers: { accept: 'application/json' } });
    if (!res.ok) return emptyState();
    const data = await res.json();
    return normalizeState(data);
  } catch (e) {
    return emptyState();
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
    return { ok: true };
  } catch (e) {
    return { ok: false, error: 'syncFailed' };
  }
}
