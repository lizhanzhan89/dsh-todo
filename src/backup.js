/**
 * Backup file format: export, validate and merge.
 *
 * The export is the whole state (`projects`, `todos`, `trash`) wrapped in a
 * small envelope with a version and a timestamp, so a file can be recognised
 * without guessing:
 *
 *   {
 *     "format": "todo-project",
 *     "version": 1,
 *     "exportedAt": "2024-05-01T10:00:00.000Z",
 *     "projects": [{ "id": "p1", "name": "Work" }],
 *     "todos":    [{ "id": "a1", "text": "…", "kind": "todo", "done": false,
 *                    "completedAt": null, "projectId": "p1" }],
 *     "trash":    [ … ]
 *   }
 *
 * `parseBackup` accepts that envelope and also a bare state object, with or
 * without `trash`, so hand-edited files and files from older versions still
 * import. `mergeState` never destroys what is already on the board: it adds the
 * incoming projects and items under fresh ids, so a second import does not
 * duplicate silently and nothing existing is overwritten.
 */

const BACKUP_FORMAT = 'todo-project';
const BACKUP_VERSION = 1;

/** A file name that sorts by date: `memos-2024-05-01.json`. */
function backupFileName(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return 'memos-' + date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + '.json';
}

/** The document written by "export". */
function buildBackup(state) {
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    exportedAt: now(),
    projects: state.projects,
    todos: state.todos,
    trash: state.trash,
  };
}

/** The same document as pretty JSON text, ready to download. */
function backupText(state) {
  return JSON.stringify(buildBackup(state), null, 2) + '\n';
}

/**
 * Validate untrusted text and turn it into a state object.
 *
 * @param {string} text the file contents
 * @returns {{ ok: true, state: object, counts: object } | { ok: false, error: string }}
 *   `error` is a locale key (`importInvalid`, `importEmpty`), not a message.
 */
function parseBackup(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return { ok: false, error: 'importInvalid' };
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, error: 'importInvalid' };
  }
  const looksLikeState = Array.isArray(parsed.projects) || Array.isArray(parsed.todos);
  if (!looksLikeState) return { ok: false, error: 'importInvalid' };

  const state = normalizeState(parsed);
  // Drop malformed rows rather than letting a broken record crash the board.
  state.projects = state.projects.filter((p) => p && typeof p === 'object' && typeof p.id === 'string' && typeof p.name === 'string');
  state.todos = state.todos.filter((item) => item && typeof item === 'object' && typeof item.id === 'string' && typeof item.text === 'string');
  state.trash = state.trash.filter((record) => record && typeof record === 'object' && typeof record.id === 'string');

  if (state.projects.length === 0 && state.todos.length === 0) {
    return { ok: false, error: 'importEmpty' };
  }
  return {
    ok: true,
    state,
    counts: {
      projects: state.projects.length,
      todos: state.todos.filter((item) => !isEntry(item)).length,
      notes: state.todos.filter(isEntry).length,
    },
  };
}

/**
 * Merge an imported state into the current one.
 *
 * Projects keep their names and order and are appended after the existing ones;
 * every incoming id is remapped so nothing collides with what is already here.
 * Items follow the project they belong to, and an item whose project is missing
 * lands in the default group. Incoming recycle-bin records are remapped the same
 * way, with items already moved by their project left out to avoid duplicates.
 *
 * @returns {{ state: object, counts: object }} the merged state and what was added
 */
function mergeState(current, incoming) {
  const idMap = new Map();
  const freshId = (oldId) => {
    const key = String(oldId);
    if (!idMap.has(key)) idMap.set(key, uid());
    return idMap.get(key);
  };

  const projects = current.projects.slice();
  const incomingProjects = [];
  for (const project of incoming.projects) {
    const copy = { id: freshId(project.id), name: project.name };
    incomingProjects.push(copy);
    projects.push(copy);
  }

  const todos = current.todos.slice();
  const incomingItems = [];
  for (const item of incoming.todos) {
    const projectId = item.projectId ? idMap.get(String(item.projectId)) || null : null;
    const copy = {
      id: freshId(item.id),
      text: item.text,
      kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
      done: Boolean(item.done),
      completedAt: item.done ? (item.completedAt || null) : null,
      projectId,
    };
    incomingItems.push(copy);
    todos.push(copy);
  }

  // Recycle-bin records: a project record carries its own items, so those are
  // not re-added as separate records; item records of such a project are skipped
  // because the entire project already travels with its record.
  const trash = current.trash.slice();
  const incomingTrash = [];
  const trashedProjectIds = new Set(incoming.trash.filter((r) => r.kind === 'project').map((r) => String(r.id)));
  for (const record of incoming.trash) {
    if (record.kind === 'project') {
      const project = { id: freshId(record.id), name: record.project && record.project.name ? record.project.name : record.text };
      const items = (Array.isArray(record.items) ? record.items : []).map((item) => ({
        id: freshId(item.id),
        text: item.text,
        kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
        done: Boolean(item.done),
        completedAt: item.done ? (item.completedAt || null) : null,
        projectId: project.id,
      }));
      const copy = {
        id: freshId(record.id + ':trash'),
        kind: 'project',
        text: project.name,
        deletedAt: record.deletedAt || now(),
        index: record.index,
        project,
        items,
      };
      incomingTrash.push(copy);
      trash.push(copy);
      continue;
    }
    if (record.projectId && trashedProjectIds.has(String(record.projectId))) continue;
    const item = record.item && typeof record.item === 'object' ? record.item : {};
    const copy = {
      id: freshId(record.id + ':trash'),
      kind: record.kind === KIND_ENTRY || isEntry(item) ? KIND_ENTRY : KIND_TODO,
      text: typeof record.text === 'string' ? record.text : (typeof item.text === 'string' ? item.text : ''),
      deletedAt: record.deletedAt || now(),
      projectId: record.projectId ? idMap.get(String(record.projectId)) || null : null,
      projectName: record.projectName || null,
      index: record.index,
      item: {
        id: freshId(item.id || record.id),
        text: typeof item.text === 'string' ? item.text : record.text,
        kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
        done: Boolean(item.done),
        completedAt: item.completedAt || null,
        projectId: record.projectId ? idMap.get(String(record.projectId)) || null : null,
      },
    };
    incomingTrash.push(copy);
    trash.push(copy);
  }

  return {
    state: { projects, todos, trash },
    counts: {
      projects: incomingProjects.length,
      items: incomingItems.length,
      trash: incomingTrash.length,
    },
  };
}
