/**
 * The deadline view: every open todo that has a date, from every project, in
 * one list ordered by that date.
 *
 * Why it exists: the board is organised by project, and a deadline cuts across
 * projects. "What is due this week" cannot be answered by scrolling groups, and
 * the number that matters (how late is the worst one) is invisible until the
 * late items are side by side.
 *
 * Read-only on purpose. Every row links back to its project, and the edit itself
 * belongs where the item lives - this page is for looking at the week, not for
 * retyping what is already on the board.
 */

/**
 * Every open todo with a deadline, earliest first.
 */
function dueItems(state) {
  return state.todos
    .filter((item) => !isEntry(item) && !item.done && item.due)
    .sort((a, b) => {
      if (a.due !== b.due) return a.due < b.due ? -1 : 1;
      // Same day: keep the board's order so the list is not shuffled by a tie.
      return state.todos.indexOf(a) - state.todos.indexOf(b);
    });
}

/**
 * Every open todo with no deadline, in board order. They sit at the bottom of
 * the page under their own heading: a todo that never got a date is the one
 * most likely to be forgotten, and a page that answers "what is due" should also
 * show what has quietly escaped being due at all.
 */
function undatedItems(state) {
  return state.todos.filter((item) => !isEntry(item) && !item.done && !item.due);
}

/**
 * The groups the list is cut into. Overdue first, then today, then the rest by
 * day: the top of the page is what hurts.
 */
const DUE_BUCKETS = [
  { key: 'overdue', label: 'dueGroupOverdue' },
  { key: 'today', label: 'dueGroupToday' },
  { key: 'week', label: 'dueGroupWeek' },
  { key: 'later', label: 'dueGroupLater' },
];

/** Which bucket a date belongs to. */
function bucketOf(due) {
  const state = dueState(due);
  if (state === 'overdue') return 'overdue';
  if (state === 'today') return 'today';
  const days = daysUntil(due);
  return days !== null && days <= 7 ? 'week' : 'later';
}

/**
 * One row: the deadline badge, the text, and the project it belongs to.
 *
 * The project name is a link rather than a label, because the first thing a
 * user does after seeing a late item is go and change it. Clicking it jumps to
 * that group's board with the item's tab selected.
 *
 * @param {object} item  the todo
 * @param {object} api   page state and transitions
 */
function dueRow(item, api) {
  const project = item.projectId
    ? api.state.projects.find((p) => p.id === item.projectId)
    : null;
  const projectName = project ? project.name : api.t('noProject');

  return h('li', { key: item.id, className: 'tp-due-row' + (item.due ? '' : ' is-undated') },
    h('span', { className: 'tp-due-row-date' },
      item.due
        ? [h(CalendarIcon, { key: 'i', size: 12 }), shortDate(item.due)]
        : h('span', { className: 'tp-due-row-nodate' }, h(CalendarIcon, { size: 12 }))),
    h('span', { className: 'tp-due-row-text' }, item.text),
    h('button', {
      type: 'button',
      className: 'tp-due-row-project',
      title: api.t('dueJumpHint').replace('{name}', projectName),
      onClick: () => api.jumpToGroup(item.projectId),
    }, h(FolderIcon, { size: 11 }), projectName));
}

/**
 * The whole page.
 *
 * @param {object} api { t, state, setView }
 */
function renderDue(api) {
  const { t, state, setView } = api;
  const items = dueItems(state);
  const undated = undatedItems(state);
  const counts = { overdue: 0, today: 0, week: 0, later: 0 };
  items.forEach((item) => { counts[bucketOf(item.due)] += 1; });

  const sections = DUE_BUCKETS
    .filter((bucket) => counts[bucket.key] > 0)
    .map((bucket) => h('section', { key: bucket.key, className: 'tp-due-section' },
      h('h2', { className: 'tp-due-section-title is-' + bucket.key },
        t(bucket.label),
        h('span', { className: 'tp-due-section-count' }, String(counts[bucket.key]))),
      h('ul', { className: 'tp-due-list' },
        items.filter((item) => bucketOf(item.due) === bucket.key).map((item) => dueRow(item, api)))));

  // The undated block always comes last, and only when there is something in it:
  // an empty "no due date" heading would just be noise under a healthy list.
  const undatedSection = undated.length
    ? h('section', { key: 'none', className: 'tp-due-section tp-due-section-none' },
        h('h2', { className: 'tp-due-section-title is-none' },
          t('dueGroupNone'),
          h('span', { className: 'tp-due-section-count' }, String(undated.length))),
        h('ul', { className: 'tp-due-list' }, undated.map((item) => dueRow(item, api))))
    : null;

  const total = items.length + undated.length;

  return h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', null,
        h('h1', null, t('dueView')),
        h('p', null, items.length
          ? t('dueViewHintCount')
              .replace('{count}', String(items.length))
              .replace('{overdue}', String(counts.overdue))
          : t('dueViewHint'))),
      h('div', { className: 'tp-head-actions' },
        h('button', {
          type: 'button',
          className: 'tp-btn',
          onClick: () => setView('board'),
        }, t('back')))),
    total === 0
      ? h('div', { className: 'tp-empty' }, h('strong', null, t('dueViewEmpty')), t('dueViewEmptyHint'))
      : h('div', null, sections, undatedSection));
}
