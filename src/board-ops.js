/**
 * Pure state transitions.
 *
 * Every function takes the previous state and returns the next one; nothing here
 * reads React, the DOM or the network. `TodoPage` passes them to `setState`, so
 * the data rules stay testable on their own and the page only handles wiring.
 */

/** A note (plain text, no checkbox) rather than a todo. */
const isEntry = (item) => item.kind === KIND_ENTRY;

/**
 * Whether the combined "All" tab lists finished todos. That tab is a review of
 * the whole group, so it can hold the archive; the saved flag is only the
 * starting point, and the tab's own toggle edits it.
 */
const showDoneInAll = (state) => state.includeDone !== false;

/** Key used for drafts, tabs and group anchors: project id or the default slot. */
const groupKey = (projectId) => projectId || NO_PROJECT;

/** Resolve a project id to the group it belongs to (null = default group). */
const projectIdOf = (item) => item.projectId || null;

/** Items belonging to one group, todos and notes alike. */
const itemsOf = (state, projectId) =>
  state.todos.filter((item) => projectIdOf(item) === (projectId || null));

/** Append a new todo or note to the group. */
function addItem(state, projectId, kind, text) {
  const item = {
    id: uid(),
    text,
    kind,
    done: false,
    completedAt: null,
    projectId: projectId || null,
  };
  return { ...state, todos: state.todos.concat(item) };
}

/** Check a todo off (stamping `completedAt`) or reopen it (clearing it). */
function toggleTodo(state, id) {
  return {
    ...state,
    todos: state.todos.map((todo) => {
      if (todo.id !== id) return todo;
      const done = !todo.done;
      // Record the finish time; clear it when the todo is reopened.
      return { ...todo, done, completedAt: done ? now() : null };
    }),
  };
}

/** Flip whether finished todos appear in the combined "All" tab. */
function setIncludeDoneFlag(state, include) {
  return { ...state, includeDone: !!include };
}

/** Replace an item's text. Blank text is rejected by the caller. */
function renameItem(state, id, text) {
  return {
    ...state,
    todos: state.todos.map((item) => (item.id === id ? { ...item, text } : item)),
  };
}

/**
 * Move one item to the recycle bin, keeping its project, position and full
 * record so it can be restored later.
 */
function moveItemToTrash(state, id) {
  const index = state.todos.findIndex((todo) => todo.id === id);
  if (index === -1) return state;
  const item = state.todos[index];
  const project = state.projects.find((p) => p.id === projectIdOf(item));
  const record = {
    id: item.id,
    kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
    text: item.text,
    deletedAt: now(),
    projectId: projectIdOf(item),
    projectName: project ? project.name : null,
    index,
    item,
  };
  return {
    ...state,
    todos: state.todos.filter((todo) => todo.id !== id),
    trash: [record, ...state.trash],
  };
}

/** Append a project created from a (trimmed, non-empty) name. */
function createProject(state, name) {
  return { ...state, projects: state.projects.concat({ id: uid(), name }) };
}

/**
 * Deleting a project moves the project and every item it held into the recycle
 * bin as one record, so one restore brings the whole group back.
 */
function moveProjectToTrash(state, project) {
  const items = state.todos.filter((todo) => projectIdOf(todo) === project.id);
  const record = {
    id: project.id,
    kind: 'project',
    text: project.name,
    deletedAt: now(),
    index: state.projects.findIndex((p) => p.id === project.id),
    project,
    items,
  };
  return {
    ...state,
    projects: state.projects.filter((p) => p.id !== project.id),
    todos: state.todos.filter((todo) => projectIdOf(todo) !== project.id),
    trash: [record, ...state.trash],
  };
}

/** Put a recycle-bin record back where it came from. */
function restoreRecord(state, record) {
  const trash = state.trash.filter((entry) => entry.id !== record.id);
  if (record.kind === 'project') {
    const projects = state.projects.slice();
    const at = Math.min(Math.max(record.index ?? projects.length, 0), projects.length);
    projects.splice(at, 0, record.project);
    return {
      ...state,
      projects,
      todos: state.todos.concat(record.items || []),
      trash,
    };
  }
  const item = { ...record.item };
  // If its project is gone, land in the default group instead of vanishing.
  if (item.projectId && !state.projects.some((p) => p.id === item.projectId)) item.projectId = null;
  const todos = state.todos.slice();
  const at = Math.min(Math.max(record.index ?? todos.length, 0), todos.length);
  todos.splice(at, 0, item);
  return { ...state, todos, trash };
}

/** Drop one record from the recycle bin for good. */
function deleteForever(state, record) {
  return { ...state, trash: state.trash.filter((entry) => entry.id !== record.id) };
}

/** Drop every record in the recycle bin. */
function emptyTrash(state) {
  return { ...state, trash: [] };
}

/** Whether two items belong to the same group, whatever their kind. */
const sameGroup = (a, b) => projectIdOf(a) === projectIdOf(b);

/** Whether two items may sit in the same list: same group and same kind. */
const sameList = (a, b) => sameGroup(a, b) && isEntry(a) === isEntry(b);

/**
 * Drag-and-drop: take the dragged item's slot and insert it where the drop
 * target sat. Cross-list drops are ignored.
 *
 * `mixed` relaxes the kind check so a note can be dropped among todos: the
 * combined "All" tab lists both kinds in one column, and there a note and a
 * todo are neighbours. The group still has to match, so a row never moves to
 * another project by accident.
 */
function reorderItem(state, sourceId, targetId, mixed) {
  if (!sourceId || !targetId || sourceId === targetId) return state;
  const from = state.todos.findIndex((item) => item.id === sourceId);
  const to = state.todos.findIndex((item) => item.id === targetId);
  if (from === -1 || to === -1) return state;
  if (!(mixed ? sameGroup : sameList)(state.todos[from], state.todos[to])) return state;
  const next = state.todos.slice();
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return { ...state, todos: next };
}

/**
 * Drag-and-drop: move the dragged project to the drop target's slot. Dropping a
 * row on itself (or ending outside any row) keeps the order.
 */
function reorderProject(state, sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return state;
  const from = state.projects.findIndex((p) => p.id === sourceId);
  const to = state.projects.findIndex((p) => p.id === targetId);
  if (from === -1 || to === -1) return state;
  const projects = state.projects.slice();
  const [moved] = projects.splice(from, 1);
  projects.splice(to, 0, moved);
  return { ...state, projects };
}

/** Groups for the board and the nav: the fixed default group first. */
function groupList(state, defaultName) {
  return [{ id: null, name: defaultName, hint: '' }]
    .concat(state.projects.map((p) => ({ id: p.id, name: p.name })));
}
