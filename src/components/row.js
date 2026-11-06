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
 * Lines the editor needs for this text, counting wrapped lines, capped at
 * EDIT_ROWS. A short item gets a short field; a long one scrolls inside three
 * rows. `wrapAt` is the field's text columns, measured from its width and font
 * so a wrapped line is not mistaken for a short one.
 */
function editorRows(text, wrapAt) {
  const cols = Math.max(12, wrapAt | 0);
  let rows = 0;
  String(text == null ? '' : text).split('\n').forEach((line) => {
    // An empty line still takes one row.
    rows += Math.max(1, Math.ceil(line.length / cols));
  });
  return Math.min(EDIT_ROWS, Math.max(1, rows));
}

/**
 * The text of a row: an editor while that row is being edited, otherwise a span
 * that opens the editor on double-click, or a locked span when read-only.
 *
 * The row itself shows the whole text, newlines and all. Only the editor is
 * bounded: it opens as tall as the text needs and never taller than EDIT_ROWS,
 * scrolling past that, so typing into a long item does not push the list around.
 *
 * @param {object} item the todo or note
 * @param {object} api  { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t }
 */
function editableText(item, api) {
  const { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t } = api;
  if (editingId === item.id && canEdit(item)) {
    // Enter inserts a newline and Ctrl/Cmd+Enter saves, matching the add field.
    // `rows` follows the text: a two-line item gets a two-row field.
    const rows = editorRows(editDraft, api.editCols());
    return h('textarea', {
      className: 'tp-input tp-edit-input',
      rows,
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
    }, item.text);
  }
  return h('span', {
    className: 'tp-todo-text tp-editable',
    title: t('editHint'),
    onDoubleClick: () => startEdit(item),
  }, item.text);
}

/**
 * The row's faint wash, by kind. Hex tints at low alpha rather than theme
 * tokens: the alias tokens swing hard between light and dark, and the note grey
 * has to stay grey in both. At .06–.1 the value is not readable as a colour,
 * only as a fill that separates one row from the next.
 *
 * Notes are given the strongest and greyest wash on purpose: they carry no
 * checkbox, so colour is what says "this one is a note" at a glance.
 */
const TINT = {
  todo: 'rgb(96 138 235 / .07)',
  done: 'rgb(84 168 112 / .06)',
  note: 'rgb(118 122 130 / .12)',
};

/** The wash for a row, from the row's own kind. */
function rowTint(isTodo, isDone) {
  const key = isTodo ? (isDone ? 'done' : 'todo') : 'note';
  return { background: TINT[key] };
}

/**
 * The deadline badge.
 *
 * A finished todo keeps its deadline but stops shouting: the date is shown
 * plainly, without the overdue colour, because "late" is no longer actionable.
 * Otherwise the badge carries a state class (`overdue` / `today` / `soon`) that
 * colours it, so urgency is not only in the text.
 */
function dueBadge(todo, api) {
  if (!todo.due) return null;
  const state = todo.done ? 'done' : dueState(todo.due);
  const days = daysUntil(todo.due);
  // "1 days left" is not English; the singular gets its own words, and tomorrow
  // reads better as a word than as "in 1 day".
  const relative = todo.done || days === null
    ? ''
    : days === 0
      ? api.t('dueToday')
      : days === 1
        ? api.t('dueTomorrow')
        : days < 0
          ? api.t(-days === 1 ? 'dueOverdueOne' : 'dueOverdue').replace('{count}', String(-days))
          : api.t('dueInDays').replace('{count}', String(days));
  return h('span', {
    className: 'tp-due is-' + state,
    title: api.t('dueTitle').replace('{date}', todo.due),
  },
    h(CalendarIcon, { size: 11 }),
    h('span', { className: 'tp-due-date' }, shortDate(todo.due)),
    relative ? h('span', { className: 'tp-due-rel' }, relative) : null);
}

/**
 * The deadline control: a native date field.
 *
 * A `<input type="date">` is the whole date picker for free - keyboard entry,
 * the platform's own calendar popup, locale-correct display - and its value is
 * already `YYYY-MM-DD`, which is exactly what is stored.
 */
function dueControl(todo, api) {
  if (todo.done) return null;
  return h('input', {
    type: 'date',
    className: 'tp-due-input' + (todo.due ? ' has-value' : ''),
    value: todo.due || '',
    title: api.t('dueSet'),
    'aria-label': api.t('dueSet'),
    onChange: (event) => api.setDue(todo.id, event.target.value || ''),
    // The row is a drop target; a click in the date field is not a drag.
    onMouseDown: (event) => event.stopPropagation(),
    onClick: (event) => event.stopPropagation(),
  });
}

/**
 * The drag grip. It is the only draggable element of a row, so the text can be
 * selected and the buttons clicked without starting a drag.
 *
 * `options.readOnlyDrag` keeps the grip's column (so archived rows line up with
 * the board's) but drops the drag handlers: dropping into an archive list would
 * be a reorder across views, which no transition accepts.
 */
function renderGrip(item, api, options) {
  const inert = !!(options && options.readOnlyDrag);
  return h('span', {
    className: 'tp-row-grip' + (inert ? ' is-inert' : ''),
    title: inert ? undefined : api.t('dragToReorder'),
    'aria-hidden': true,
    ...(inert ? {} : api.gripDragProps(item)),
  }, '⠿');
}

/** A plain note: a kind badge, no checkbox, a grip, text, edit and delete. */
function renderEntry(item, api, options) {
  const withKind = !!(options && options.withKind);
  return h('li', {
    key: item.id,
    className: 'tp-todo tp-entry' + (withKind ? ' has-kind' : '') + api.itemDragClass(item),
    style: rowTint(false, false),
    ...api.itemDragProps(item),
  },
    renderGrip(item, api, options),
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
    style: rowTint(true, todo.done),
    ...api.itemDragProps(todo),
  },
    renderGrip(todo, api, options),
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
      h('div', { className: 'tp-todo-meta' },
        dueBadge(todo, api),
        todo.done && todo.completedAt
          ? h('span', { className: 'tp-todo-time' }, t('completedAt').replace('{time}', formatTime(todo.completedAt)))
          : null)),
    dueControl(todo, api),
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
