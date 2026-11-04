/**
 * One project group on the board: a single header row with the three tabs on the
 * left, the project name centred, and the add controls on the right, followed by
 * the rows of the selected tab.
 *
 * While a search is active the group keeps its header and lists only the rows
 * that match, across all three tabs at once.
 */

/**
 * @param {object} group { id, name } — id null for the fixed default group
 * @param {object} api   page state, transitions and the row api
 */
function renderGroup(group, api) {
  const { t, state, tabFor, setTabFor, draftFor, setDraftFor, addTodo, addNote, groupAnchor } = api;
  const all = itemsOf(state, group.id);
  const todoItems = all.filter((item) => !isEntry(item));
  const noteItems = all.filter(isEntry);
  const active = todoItems.filter((todo) => !todo.done);
  const done = todoItems.filter((todo) => todo.done);
  const tab = tabFor(group.id);
  const inTab = tab === TAB_DONE ? done : tab === TAB_ENTRIES ? noteItems : active;
  const isEntriesTab = tab === TAB_ENTRIES;

  // Searching looks at todos, notes and completed todos at once, so the matching
  // rows come from every tab and are listed under the group regardless of which
  // tab happens to be selected.
  const searchPool = todoItems.concat(noteItems).filter(api.visibleInSearch);
  const hits = api.searching ? searchPool.filter((item) => api.matches(item.text)) : [];
  const shown = api.searching ? hits : inTab;
  // While searching, rows that do not match are hidden in place: the group keeps
  // its header and tabs, and only the visible rows change.
  const groupHit = api.searching && api.matches(group.name);

  // While searching, each tab badge counts the matches of that kind rather than
  // every stored row, so the numbers match what is displayed.
  const hitCount = (predicate) => (api.searching ? hits.filter(predicate).length : null);
  const countFor = (key, stored) => {
    if (!api.searching) return stored;
    if (key === TAB_ENTRIES) return hitCount(isEntry);
    if (key === TAB_DONE) return hitCount((item) => !isEntry(item) && item.done);
    return hitCount((item) => !isEntry(item) && !item.done);
  };

  const tabButton = (key, label, count) => h('button', {
    type: 'button',
    className: 'tp-tab' + (tab === key ? ' is-active' : '') + (api.searching ? ' is-filtered' : ''),
    role: 'tab',
    'aria-selected': tab === key,
    onClick: () => setTabFor(group.id, key),
  }, label, h('span', { className: 'tp-tab-count' }, String(countFor(key, count))));

  const emptyTitle = tab === TAB_DONE
    ? t('doneEmpty')
    : tab === TAB_ENTRIES
      ? t('entriesEmpty')
      : (todoItems.length === 0 ? t('empty') : t('activeEmpty'));
  const emptyHint = tab === TAB_DONE
    ? t('doneEmptyHint')
    : tab === TAB_ENTRIES
      ? t('entriesEmptyHint')
      : (todoItems.length === 0 ? t('emptyHint') : t('activeEmptyHint'));
  const emptyBlock = shown.length === 0 && !groupHit
    ? h('div', { className: 'tp-empty' }, h('strong', null, emptyTitle), emptyHint)
    : null;

  const placeholder = isEntriesTab ? t('addNotePlaceholder') : t('addTodoPlaceholder');
  const addLabel = isEntriesTab ? t('addNote') : t('add');
  const submit = () => (isEntriesTab ? addNote(group.id) : addTodo(group.id));

  // Add controls sit in the header's right column. The compact form keeps them
  // from squeezing the centred title. The completed tab takes no input.
  const addControls = (tab === TAB_ACTIVE || tab === TAB_ENTRIES)
    ? h('div', { className: 'tp-add-inline' },
        h('input', {
          className: 'tp-input',
          type: 'text',
          placeholder,
          value: draftFor(group.id),
          onChange: (event) => setDraftFor(group.id, event.target.value),
          onKeyDown: (event) => {
            if (event.key === 'Enter') { event.preventDefault(); submit(); }
          },
          'aria-label': placeholder,
        }),
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-primary',
          onClick: submit,
        }, h(PlusIcon, { size: 13 }), addLabel))
    : null;

  if (api.searching && !groupHit && shown.length === 0) return null;

  return h('section', { key: groupKey(group.id), id: groupAnchor(group.id), className: 'tp-group' },
    // One header row, three columns: tabs on the left, the project name in the
    // middle, the add controls on the right (when the tab has them).
    h('div', { className: 'tp-group-head' + (shown.length === 0 ? ' is-empty' : '') },
      h('div', { className: 'tp-group-side tp-group-side-left' },
        h('div', { className: 'tp-tabs', role: 'tablist' },
          tabButton(TAB_ACTIVE, t('tabActive'), active.length),
          tabButton(TAB_DONE, t('tabDone'), done.length),
          tabButton(TAB_ENTRIES, t('tabEntries'), noteItems.length))),
      h('div', { className: 'tp-group-center' },
        h('h2', { className: 'tp-group-title' }, group.name)),
      h('div', { className: 'tp-group-side tp-group-side-right' }, addControls)),
    h('div', { className: 'tp-group-body' },
      h('ul', { className: 'tp-todos' }, shown.map((item) => renderRow(item, api))),
      emptyBlock));
}
