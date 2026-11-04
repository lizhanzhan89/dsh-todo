/**
 * The recycle bin view: deleted todos, notes and whole projects, each with a
 * restore and a delete-forever button, plus "empty the bin" for everything.
 *
 * Deleting never discards data immediately, so a mis-drag can always be undone.
 */

/**
 * @param {object} api { t, state, setView, restoreRecord, deleteForever, emptyTrash }
 */
function renderTrash(api) {
  const { t, state, setView, restoreRecord, deleteForever, emptyTrash } = api;

  const kindLabel = (record) => record.kind === 'project'
    ? t('trashKindProject')
    : record.kind === KIND_ENTRY ? t('trashKindEntry') : t('trashKindTodo');

  const row = (record) => h('li', { key: record.id, className: 'tp-todo tp-trash-row' },
    h('div', { className: 'tp-todo-main' },
      h('div', { className: 'tp-trash-title' },
        h('span', { className: 'tp-trash-kind' }, kindLabel(record)),
        record.projectName ? h('span', { className: 'tp-trash-project' }, '· ' + record.projectName) : null),
      h('span', { className: 'tp-todo-text' }, record.text),
      h('span', { className: 'tp-todo-time' },
        t('trashDeletedAt').replace('{time}', formatTime(record.deletedAt)) +
        (record.kind === 'project' && record.items && record.items.length
          ? ' · ' + t('trashItemCount').replace('{count}', String(record.items.length))
          : ''))),
    h('button', {
      type: 'button',
      className: 'tp-btn tp-btn-sm',
      onClick: () => restoreRecord(record),
    }, t('trashRestore')),
    h('button', {
      type: 'button',
      className: 'tp-btn tp-btn-sm tp-btn-danger',
      onClick: () => deleteForever(record),
    }, t('trashDeleteForever')));

  return h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', null,
        h('h1', null, t('trash')),
        h('p', null, t('trashEmptyHint'))),
      h('div', { className: 'tp-head-actions' },
        h('button', {
          type: 'button',
          className: 'tp-btn',
          onClick: () => setView('board'),
        }, t('back')),
        state.trash.length
          ? h('button', {
              type: 'button',
              className: 'tp-btn tp-btn-danger',
              onClick: emptyTrash,
            }, h(TrashIcon, { size: 13 }), t('trashEmptyAll'))
          : null)),
    state.trash.length === 0
      ? h('div', { className: 'tp-empty' }, h('strong', null, t('trashEmpty')), t('trashEmptyHint'))
      : h('ul', { className: 'tp-todos tp-trash-list' }, state.trash.map(row)));
}
