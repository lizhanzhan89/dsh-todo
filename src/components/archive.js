/**
 * The archive view: projects that left the board, with the items they still
 * hold and a button that puts each one back.
 *
 * Archiving is not deletion, so nothing here is destructive: the only two
 * actions are "restore to the board" and "look inside", and the items keep their
 * ids, their order and their deadlines while they are parked here.
 */

/**
 * How many of a project's items are still open, and how many are overdue. Both
 * numbers are shown per row so an archived project is not a black box: a project
 * parked with three late items is not really "done".
 */
function archiveCounts(project) {
  const open = project.items.filter((item) => !isEntry(item) && !item.done);
  const overdue = open.filter((item) => {
    const state = dueState(item.due);
    return state === 'overdue';
  });
  return { open: open.length, overdue: overdue.length };
}

/**
 * One archived project: name, counts, and its items.
 *
 * The items are listed in full with the board's own row renderer. A user who
 * opens the archive is asking "what is in there", and a row that is not rendered
 * cannot answer that. Reordering is off here because drop targets belong to the
 * board: the grip is still drawn, so the rows line up with the board's, but it
 * carries no drag handlers.
 *
 * @param {object} project { id, name, items }
 * @param {object} api     page state and transitions
 */
function archivedRow(project, api) {
  const { t } = api;
  const counts = archiveCounts(project);
  return h('section', { key: project.id, className: 'tp-group tp-archived' },
    h('div', { className: 'tp-group-head tp-archived-head' },
      h('div', { className: 'tp-group-side tp-group-side-left' },
        h('span', { className: 'tp-archived-counts' },
          t('archiveOpenCount').replace('{count}', String(counts.open)),
          counts.overdue
            ? h('span', { className: 'tp-archived-overdue' }, t('archiveOverdueCount').replace('{count}', String(counts.overdue)))
            : null)),
      h('div', { className: 'tp-group-center' },
        h('h2', { className: 'tp-group-title' }, project.name)),
      h('div', { className: 'tp-group-side tp-group-side-right' },
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-sm',
          title: t('unarchiveHint'),
          onClick: () => api.unarchiveProject(project.id),
        }, h(UnarchiveIcon, { size: 13 }), t('unarchive')))),
    project.items.length
      ? h('div', { className: 'tp-group-body' },
          h('ul', { className: 'tp-todos is-mixed' },
            project.items.map((item) => renderRow(item, api, { withKind: true, readOnlyDrag: true }))))
      : h('div', { className: 'tp-empty' }, h('strong', null, t('archiveEmpty')), t('archiveEmptyHint')));
}

/**
 * The whole archive page.
 *
 * @param {object} api { t, state, setView, archived }
 */
function renderArchive(api) {
  const { t, setView, archived } = api;

  const groups = archived.map((project) => archivedRow({
    id: project.id,
    name: project.name,
    items: itemsOf(api.state, project.id),
  }, api));

  return h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', null,
        h('h1', null, t('archive')),
        h('p', null, t('archiveHint'))),
      h('div', { className: 'tp-head-actions' },
        h('button', {
          type: 'button',
          className: 'tp-btn',
          onClick: () => setView('board'),
        }, t('back')))),
    archived.length === 0
      ? h('div', { className: 'tp-empty' },
          h('strong', null, t('archiveNothing')),
          t('archiveNothingHint'))
      : groups);
}
