/**
 * One todo or note row, and the inline editor it swaps in.
 *
 * Rows are draggable to reorder within their own list (same group, same kind).
 * Clicking the text of a todo opens the editor; completed todos are read-only.
 */

/**
 * Completed todos cannot be renamed: the checkbox has to be reopened first.
 * Notes carry no `done`, so they are always editable.
 */
const canEdit = (item) => !item.done;

/**
 * The text of a collapsed row.
 *
 * `pre-wrap` keeps every newline, but an unbounded item would push one row to
 * the height of the whole note. Lines are cut on their own rather than with a
 * CSS line clamp, which would also cut the line horizontally: a long line is
 * sliced at COLLAPSED_CHARS, and past COLLAPSED_LINES lines the last shown line
 * ends in an ellipsis. The full text stays in `item.text`, in the editor and in
 * the tooltip.
 */
function collapsedText(text) {
  const lines = String(text == null ? '' : text).split('\n');
  const shown = lines.slice(0, COLLAPSED_LINES).map((line) =>
    (line.length > COLLAPSED_CHARS ? line.slice(0, COLLAPSED_CHARS) + '…' : line));
  if (lines.length > COLLAPSED_LINES) shown[shown.length - 1] += '…';
  return shown.join('\n');
}

/**
 * The text of a row: an editor while that row is being edited, otherwise a span
 * that opens the editor on double-click, or a locked span when read-only.
 *
 * The editor is a textarea fixed at three text rows: an item may span many
 * lines, and a one-row field would show only the first one, while growing
 * without a cap would shove the rest of the list around. Past three lines it
 * scrolls, so the row keeps a predictable height.
 *
 * @param {object} item the todo or note
 * @param {object} api  { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t }
 */
function editableText(item, api) {
  const { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t } = api;
  if (editingId === item.id && canEdit(item)) {
    // Enter inserts a newline and Ctrl/Cmd+Enter saves, matching the add field.
    return h('textarea', {
      className: 'tp-input tp-edit-input',
      rows: EDIT_ROWS,
      autoFocus: true,
      value: editDraft,
      onChange: (event) => setEditDraft(event.target.value),
      onKeyDown: (event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          commitEdit();
        }
        if (event.key === 'Escape') { event.preventDefault(); cancelEdit(); }
      },
      onBlur: commitEdit,
      // Text selection inside the field must not start a row drag.
      onMouseDown: (event) => event.stopPropagation(),
      'aria-label': t('editHint'),
    });
  }
  if (!canEdit(item)) {
    return h('span', {
      className: 'tp-todo-text tp-locked',
      title: t('editLocked'),
    }, collapsedText(item.text));
  }
  return h('span', {
    className: 'tp-todo-text tp-editable',
    title: item.text,
    onDoubleClick: () => startEdit(item),
  }, collapsedText(item.text));
}

/**
 * The drag grip. It is the only draggable element of a row, so the text can be
 * selected and the buttons clicked without starting a drag.
 */
function renderGrip(item, api) {
  return h('span', {
    className: 'tp-row-grip',
    title: api.t('dragToReorder'),
    'aria-hidden': true,
    ...api.gripDragProps(item),
  }, '⠿');
}

/** A plain note: a kind badge, no checkbox, a grip, text, edit and delete. */
function renderEntry(item, api, options) {
  const withKind = !!(options && options.withKind);
  return h('li', {
    key: item.id,
    className: 'tp-todo tp-entry' + (withKind ? ' has-kind' : '') + api.itemDragClass(item),
    ...api.itemDragProps(item),
  },
    renderGrip(item, api),
    withKind ? h(KindBadge, { kind: KIND_ENTRY, label: api.t('kindNote'), size: 14 }) : null,
    h('div', { className: 'tp-todo-main' },
      editableText(item, api)),
    h('button', {
      type: 'button',
      className: 'tp-icon-btn tp-edit-btn',
      'aria-label': api.t('edit'),
      title: api.t('edit'),
      onClick: () => api.startEdit(item),
    }, h(PencilIcon, { size: 13 })),
    h('button', {
      type: 'button',
      className: 'tp-icon-btn',
      'aria-label': api.t('delete'),
      title: api.t('delete'),
      onClick: () => api.removeTodo(item.id),
    }, h(TrashIcon, { size: 14 })));
}

/** A todo: a kind badge, checkbox, text, finish time when done, edit and delete. */
function renderTodo(todo, api, options) {
  const { t } = api;
  const withKind = !!(options && options.withKind);
  return h('li', {
    key: todo.id,
    className: 'tp-todo is-todo' + (withKind ? ' has-kind' : '') + (todo.done ? ' is-done' : '') + api.itemDragClass(todo),
    ...api.itemDragProps(todo),
  },
    renderGrip(todo, api),
    withKind ? h(KindBadge, { kind: KIND_TODO, label: t('kindTodo'), size: 14 }) : null,
    h('button', {
      type: 'button',
      className: 'tp-check' + (todo.done ? ' is-done' : ''),
      'aria-label': todo.done ? t('reopen') : t('complete'),
      'aria-pressed': todo.done,
      onClick: () => api.toggleTodo(todo.id),
    }, todo.done ? h(CheckIcon, { size: 12 }) : null),
    h('div', { className: 'tp-todo-main' },
      editableText(todo, api),
      todo.done && todo.completedAt
        ? h('span', { className: 'tp-todo-time' }, t('completedAt').replace('{time}', formatTime(todo.completedAt)))
        : null),
    canEdit(todo) ? h('button', {
      type: 'button',
      className: 'tp-icon-btn tp-edit-btn',
      'aria-label': t('edit'),
      title: t('edit'),
      onClick: () => api.startEdit(todo),
    }, h(PencilIcon, { size: 13 })) : null,
    h('button', {
      type: 'button',
      className: 'tp-icon-btn',
      'aria-label': t('delete'),
      title: t('delete'),
      onClick: () => api.removeTodo(todo.id),
    }, h(TrashIcon, { size: 14 })));
}

/**
 * Dispatch one item to the matching row renderer.
 *
 * `options.withKind` adds the leading todo/note badge. Only the combined "All"
 * tab sets it, because that tab mixes both kinds and the badge is what tells
 * them apart; the single-kind tabs leave it off.
 */
function renderRow(item, api, options) {
  return isEntry(item) ? renderEntry(item, api, options) : renderTodo(item, api, options);
}
