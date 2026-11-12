/**
 * One project group on the board: a single header row with the four tabs on the
 * left, the project name centred, and the add controls on the right, followed by
 * the rows of the selected tab.
 *
 * The tabs are "All", "Open", "Done" and "Notes". "All" mixes every kind in one
 * column and is the only tab that labels each row with a kind badge, because
 * there the badge is the only thing telling a note from a todo.
 *
 * While a search is active the group keeps its header and lists only the rows
 * that match, across every tab at once.
 */

/** The tab glyph for a tab key. */
function tabIcon(key) {
  if (key === TAB_ALL) return StackIcon;
  if (key === TAB_DONE) return DoneCircleIcon;
  if (key === TAB_ENTRIES) return NoteIcon;
  return CircleIcon;
}

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
  const isAllTab = tab === TAB_ALL;
  const isEntriesTab = tab === TAB_ENTRIES;
  // The "All" tab is a review of the whole group and normally includes finished
  // todos, but a full archive can bury the live work: the toggle in that tab's
  // header hides them again. The flag is the one saved with the data.
  const withDone = isAllTab ? api.includeDone : true;
  const allRows = withDone ? noteItems.concat(active, done) : noteItems.concat(active);
  const inTab = isAllTab ? allRows : tab === TAB_DONE ? done : isEntriesTab ? noteItems : active;

  // Searching looks at todos, notes and completed todos at once, so the matching
  // rows come from every tab and are listed under the group regardless of which
  // tab happens to be selected.
  const searchPool = todoItems.concat(noteItems).filter(api.visibleInSearch);
  const hits = api.searching ? searchPool.filter((item) => api.matches(item.text)) : [];
  const shown = api.searching ? hits : inTab;
  // While searching, rows that do not match are hidden in place: the group keeps
  // its header and tabs, and only the visible rows change.
  const groupHit = api.searching && api.matches(group.name);

  // The badge counts what the tab would list, so hiding finished todos is
  // visible in the number instead of only in the list.
  // While searching, each tab badge counts the matches of that kind rather than
  // every stored row, so the numbers match what is displayed.
  const hitCount = (predicate) => (api.searching ? hits.filter(predicate).length : null);
  const countFor = (key, stored) => {
    if (!api.searching) return stored;
    if (key === TAB_ALL) return hits.length;
    if (key === TAB_ENTRIES) return hitCount(isEntry);
    if (key === TAB_DONE) return hitCount((item) => !isEntry(item) && item.done);
    return hitCount((item) => !isEntry(item) && !item.done);
  };

  const tabButton = (key, label, count) => {
    const Icon = tabIcon(key);
    return h('button', {
      type: 'button',
      className: 'tp-tab' + (tab === key ? ' is-active' : '') + (api.searching ? ' is-filtered' : ''),
      role: 'tab',
      'aria-selected': tab === key,
      title: label,
      onClick: () => setTabFor(group.id, key),
    },
      h(Icon, { size: 13 }),
      h('span', { className: 'tp-tab-label' }, label),
      h('span', { className: 'tp-tab-count' }, String(countFor(key, count))));
  };

  const emptyTitle = isAllTab
    ? t('allEmpty')
    : tab === TAB_DONE
      ? t('doneEmpty')
      : isEntriesTab
        ? t('entriesEmpty')
        : (todoItems.length === 0 ? t('empty') : t('activeEmpty'));
  const emptyHint = isAllTab
    ? t('allEmptyHint')
    : tab === TAB_DONE
      ? t('doneEmptyHint')
      : isEntriesTab
        ? t('entriesEmptyHint')
        : (todoItems.length === 0 ? t('emptyHint') : t('activeEmptyHint'));
  const emptyBlock = shown.length === 0 && !groupHit
    ? h('div', { className: 'tp-empty' }, h('strong', null, emptyTitle), emptyHint)
    : null;
  // The "All" tab hides finished todos through this toggle rather than through
  // the global search switch: they are separate questions ("show the archive
  // here" vs "match the archive too").
  const doneToggle = isAllTab
    ? h('label', { className: 'tp-inline-toggle', title: t('showDoneInAll') },
        h('input', {
          type: 'checkbox',
          className: 'tp-search-check',
          checked: api.includeDone,
          onChange: (event) => api.setIncludeDone(Boolean(event.target.checked)),
        }),
        h('span', null, t('showDoneInAll')))
    : null;

  const placeholder = isEntriesTab ? t('addNotePlaceholder') : t('addTodoPlaceholder');
  // The button is a bare "+": the field beside it already says what will be
  // added ("添加待办" / "添加笔记" as its placeholder), so a text label repeated
  // it and cost the width the field needs. The label survives as the accessible
  // name and the tooltip.
  const addLabel = isEntriesTab ? t('addNote') : t('add');
  const submit = () => (isEntriesTab ? addNote(group.id) : addTodo(group.id));

  // Add controls sit in the header's right column. The compact form keeps them
  // from squeezing the centred title. "All" takes an input too: it adds a todo,
  // the default kind.
  //
  // The field is a one-row textarea so a multi-line entry can be typed: Enter
  // inserts a newline and Ctrl/Cmd+Enter adds the item, which is what a plain
  // textarea user expects. Shift+Enter is left to the browser.
  const addControls = (tab === TAB_ACTIVE || tab === TAB_ENTRIES || isAllTab)
    ? h('div', { className: 'tp-add-inline' },
        h('textarea', {
          className: 'tp-input tp-add-input',
          rows: 1,
          placeholder,
          value: draftFor(group.id),
          onChange: (event) => setDraftFor(group.id, event.target.value),
          onKeyDown: (event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              submit();
            }
          },
          'aria-label': placeholder,
        }),
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-primary tp-add-btn',
          onClick: submit,
          title: addLabel,
          'aria-label': addLabel,
        }, h(PlusIcon, { size: 14 })))
    : null;

  if (api.searching && !groupHit && shown.length === 0) return null;

  // Only the combined tab mixes kinds, so only there does a row need a badge.
  const rowOptions = { withKind: isAllTab && !api.searching };

  // --- paging ---------------------------------------------------------------
  // Search results are cut too: a search that matches two hundred rows is the
  // same wall as a long tab. The page key carries the group id so moving to
  // another project does not inherit the previous one's page number, while the
  // same group's other tabs each keep their own.
  const pageKey = groupKey(group.id) + ':' + (api.searching ? 'search' : tab);
  const pageCount = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
  const page = Math.min(api.pageFor(pageKey), pageCount - 1);
  const offset = page * PAGE_SIZE;
  const pageRows = pageCount > 1 ? shown.slice(offset, offset + PAGE_SIZE) : shown;
  const pager = pageCount > 1
    ? h('div', { className: 'tp-pager' },
        h('button', {
          type: 'button',
          className: 'tp-pager-btn',
          disabled: page === 0,
          title: t('pagePrev'),
          'aria-label': t('pagePrev'),
          onClick: () => api.setPageFor(pageKey, page - 1),
        }, h(ChevronLeftIcon, { size: 13 })),
        h('span', { className: 'tp-pager-info' },
          t('pageOf')
            .replace('{page}', String(page + 1))
            .replace('{pages}', String(pageCount))),
        h('button', {
          type: 'button',
          className: 'tp-pager-btn',
          disabled: page >= pageCount - 1,
          title: t('pageNext'),
          'aria-label': t('pageNext'),
          onClick: () => api.setPageFor(pageKey, page + 1),
        }, h(ChevronRightIcon, { size: 13 })))
    : null;

  return h('section', { key: groupKey(group.id), id: groupAnchor(group.id), className: 'tp-group' },
    // One header row, three columns: tabs on the left, the project name in the
    // middle, the add controls on the right (when the tab has them).
    h('div', { className: 'tp-group-head' + (shown.length === 0 ? ' is-empty' : '') },
      h('div', { className: 'tp-group-side tp-group-side-left' },
        h('div', { className: 'tp-tabs', role: 'tablist' },
          tabButton(TAB_ALL, t('tabAll'), allRows.length),
          tabButton(TAB_ACTIVE, t('tabActive'), active.length),
          tabButton(TAB_DONE, t('tabDone'), done.length),
          tabButton(TAB_ENTRIES, t('tabEntries'), noteItems.length))),
      // The name is the whole centre column: archiving is a drag on the nav row,
      // not a button here, so a finished project leaves the same way a deleted
      // one does.
      h('div', { className: 'tp-group-center' },
        h('h2', { className: 'tp-group-title' }, group.name)),
      h('div', { className: 'tp-group-side tp-group-side-right' }, addControls)),
    doneToggle ? h('div', { className: 'tp-group-tools' }, doneToggle) : null,
    h('div', { className: 'tp-group-body' },
      h('ul', { className: 'tp-todos' + (isAllTab ? ' is-mixed' : '') },
        pageRows.map((item) => renderRow(item, api, rowOptions))),
      pager,
      emptyBlock));
}
