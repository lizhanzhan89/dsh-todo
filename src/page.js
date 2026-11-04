/**
 * The panel page: owns the state, drives persistence, and wires transitions to
 * the render helpers. All rendering lives in `components/`, all data rules in
 * `board-ops.js`, so this file is mostly state and event handlers.
 *
 * State model (see README):
 *   projects: [{ id, name }]
 *   todos:    [{ id, text, kind, done, completedAt, projectId }]
 *   trash:    [{ id, kind, text, deletedAt, projectId, projectName, index, item
 *                | project, items }]
 */

/**
 * @param {{ t: (key: string, vars?: object) => string }} props — `t` is injected
 *   by the `main` slot registration (`inject: () => ({ t })`).
 */
function TodoPage(props) {
  const t = props.t || ((k) => en[k] || k);
  const [state, setState] = React.useState(emptyState);

  // Per-group drafts, keyed by group id (the default slot when no project).
  // Per-group state fixes the bug where one shared draft leaked text into every
  // project's input.
  const [drafts, setDrafts] = React.useState({});
  // Per-group selected tab: 'active' | 'done' | 'entries'.
  const [tabs, setTabs] = React.useState({});
  const [projectDraft, setProjectDraft] = React.useState('');
  const [creatingProject, setCreatingProject] = React.useState(false);
  // Left quick-jump nav: which group is highlighted, plus the scroll container
  // so nav clicks can scroll that group into view.
  const [activeGroup, setActiveGroup] = React.useState(NO_PROJECT);
  // Which page the main pane shows: 'board' (groups) or 'trash'.
  const [view, setView] = React.useState('board');
  // Search across every todo, entry and project name.
  const [query, setQuery] = React.useState('');
  // Completed todos stay hidden from search results unless this is ticked.
  const [includeDone, setIncludeDone] = React.useState(false);
  // Inline editing: the id of the row being edited and its draft text.
  const [editingId, setEditingId] = React.useState(null);
  const [editDraft, setEditDraft] = React.useState('');
  // Drag-and-drop project reordering inside the quick-jump nav.
  const [dragId, setDragId] = React.useState(null);
  const [dropId, setDropId] = React.useState(null);
  // True while a project row is hovering the nav's delete zone.
  const [dragOverTrash, setDragOverTrash] = React.useState(false);
  // Drag-and-drop item reordering (todos and notes) inside a group tab.
  const [itemDragId, setItemDragId] = React.useState(null);
  const [itemDropId, setItemDropId] = React.useState(null);
  const scrollRef = React.useRef(null);
  // Skip the very first save (the empty initial render before the load lands).
  const loadedRef = React.useRef(false);

  // A pending jump, performed after React has committed the next render.
  // Scrolling straight from the click handler looks up the node too early: when
  // the board was filtered or replaced by the recycle bin, the target group is
  // not in the DOM yet and the jump would be silently dropped.
  const [pendingJump, setPendingJump] = React.useState(null);

  // Load the JSON file from the Host once on mount.
  React.useEffect(() => {
    let alive = true;
    loadState().then((loaded) => {
      if (!alive) return;
      setState(loaded);
      loadedRef.current = true;
    });
    return () => { alive = false; };
  }, []);

  // Persist to the Host JSON file on every change after the initial load.
  React.useEffect(() => {
    if (!loadedRef.current) return;
    saveState(state);
  }, [state]);

  const update = (fn) => setState((prev) => fn(prev));

  const groupAnchor = (projectId) => 'tp-group-' + groupKey(projectId);

  // Scroll the requested group into view once it exists, retrying briefly in
  // case the board is still settling (data load, tab switch).
  React.useEffect(() => {
    if (!pendingJump) return undefined;
    let cancelled = false;
    let tries = 0;
    let frame = null;
    const tick = () => {
      if (cancelled) return;
      if (typeof document !== 'undefined') {
        const node = document.getElementById(groupAnchor(pendingJump.id));
        if (node) {
          // Prefer scrolling the panel's own container: scrollIntoView can also
          // move an outer scroller and shift the whole page.
          const scroller = scrollRef.current;
          const canScroll = scroller && typeof scroller.scrollTo === 'function' && typeof node.offsetTop === 'number';
          if (canScroll) {
            scroller.scrollTo({ top: Math.max(0, node.offsetTop - 8), behavior: 'smooth' });
          } else if (typeof node.scrollIntoView === 'function') {
            node.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setPendingJump(null);
          return;
        }
      }
      tries += 1;
      if (tries > 20) { setPendingJump(null); return; }
      frame = setTimeout(tick, 16);
    };
    tick();
    return () => { cancelled = true; if (frame) clearTimeout(frame); };
  }, [pendingJump]);

  // --- per-group inputs and tabs -------------------------------------------
  const setDraftFor = (projectId, value) =>
    setDrafts((prev) => ({ ...prev, [groupKey(projectId)]: value }));
  const draftFor = (projectId) => drafts[groupKey(projectId)] || '';
  const tabFor = (projectId) => tabs[groupKey(projectId)] || TAB_ACTIVE;
  const setTabFor = (projectId, value) =>
    setTabs((prev) => ({ ...prev, [groupKey(projectId)]: value }));

  // --- quick-jump navigation ------------------------------------------------
  const jumpToGroup = (projectId) => {
    setActiveGroup(groupKey(projectId));
    // Jumping from the recycle bin or from search results returns to the full
    // board first, so the target group is actually rendered.
    setView('board');
    setQuery('');
    setPendingJump({ id: groupKey(projectId), nonce: Date.now() });
  };

  // --- adding ---------------------------------------------------------------
  const addItemFor = (projectId, kind) => {
    const text = draftFor(projectId).trim();
    if (!text) return;
    update((prev) => addItem(prev, projectId, kind, text));
    setDraftFor(projectId, '');
  };
  const addTodo = (projectId) => addItemFor(projectId, KIND_TODO);
  const addNote = (projectId) => addItemFor(projectId, KIND_ENTRY);

  // Create a project from the footer field. The transition is `createProject`
  // in board-ops.js: its natural name `addProject` is taken by this handler.
  const addProject = () => {
    const name = projectDraft.trim();
    if (!name) return;
    update((prev) => createProject(prev, name));
    setProjectDraft('');
    setCreatingProject(false);
  };

  // --- editing --------------------------------------------------------------
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditDraft(item.text);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft('');
  };
  // Save the edited text. Empty input cancels; unchanged text just closes.
  const commitEdit = () => {
    if (editingId === null) return;
    const text = editDraft.trim();
    if (!text) { cancelEdit(); return; }
    update((prev) => renameItem(prev, editingId, text));
    cancelEdit();
  };

  // --- deleting and restoring ----------------------------------------------
  const removeTodo = (id) => update((prev) => moveItemToTrash(prev, id));
  const removeProject = (project) => update((prev) => moveProjectToTrash(prev, project));
  const restore = (record) => update((prev) => restoreRecord(prev, record));
  const deleteForeverRecord = (record) => update((prev) => deleteForever(prev, record));

  const emptyAll = () => {
    const message = t('trashEmptyAllConfirm');
    if (typeof window !== 'undefined' && typeof window.confirm === 'function' && !window.confirm(message)) return;
    update((prev) => emptyTrash(prev));
  };

  // --- reordering -----------------------------------------------------------
  const reorderItems = (sourceId, targetId) => update((prev) => reorderItem(prev, sourceId, targetId));
  const reorderProjects = (sourceId, targetId) => update((prev) => reorderProject(prev, sourceId, targetId));

  // --- export / import ------------------------------------------------------
  // Export downloads the whole state as one JSON file. Import reads a backup and
  // merges it in: nothing already on the board is replaced or removed, and every
  // imported id is remapped so a second import cannot duplicate onto the first.
  const [exporting, setExporting] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  const [notice, setNotice] = React.useState(null);

  // Success notices fade after a few seconds; errors stay until dismissed so a
  // failed import cannot go unnoticed.
  React.useEffect(() => {
    if (!notice || notice.kind !== 'ok') return undefined;
    const timer = setTimeout(() => setNotice(null), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  const exportData = () => {
    if (exporting) return;
    setExporting(true);
    try {
      const blob = new Blob([backupText(state)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = backupFileName();
      document.body.appendChild(link);
      link.click();
      link.remove();
      // Give the download a moment to start before revoking the blob URL.
      setTimeout(() => URL.revokeObjectURL(url), 10000);
      const counts = {
        projects: state.projects.length,
        items: state.todos.length,
        trash: state.trash.length,
      };
      setNotice({ kind: 'ok', text: t('exportDone', counts) });
    } catch (error) {
      setNotice({ kind: 'error', text: t('importFailed', { error: String(error && error.message || error) }) });
    } finally {
      setExporting(false);
    }
  };

  const importFile = (file) => {
    if (importing || !file) return;
    setImporting(true);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = parseBackup(String(reader.result || ''));
        if (!parsed.ok) {
          setNotice({ kind: 'error', text: t(parsed.error) });
          return;
        }
        const merged = mergeState(state, parsed.state);
        update(() => merged.state);
        setNotice({ kind: 'ok', text: t('importDone', merged.counts) });
      } catch (error) {
        setNotice({ kind: 'error', text: t('importFailed', { error: String(error && error.message || error) }) });
      } finally {
        setImporting(false);
      }
    };
    reader.onerror = () => {
      setImporting(false);
      setNotice({ kind: 'error', text: t('importFailed', { error: 'read error' }) });
    };
    reader.readAsText(file);
  };

  // --- derived values -------------------------------------------------------
  const groups = groupList(state, t('noProject'));
  const needle = query.trim().toLowerCase();
  const searching = needle.length > 0;
  const matches = (text) => String(text || '').toLowerCase().includes(needle);
  // Searching spans all three tabs; completed todos only join the results when
  // the "include completed" box is ticked.
  const visibleInSearch = (item) => includeDone || !item.done;
  const matchCount = !searching
    ? 0
    : state.todos.filter((item) => visibleInSearch(item) && matches(item.text)).length
      + state.projects.filter((project) => matches(project.name)).length;

  // --- drag handlers shared by todo and note rows ---------------------------
  const itemDragProps = (item) => ({
    draggable: true,
    onDragStart: (event) => {
      setItemDragId(item.id);
      setItemDropId(null);
      try {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', item.id);
      } catch (e) { /* some browsers restrict dataTransfer */ }
    },
    onDragOver: (event) => {
      if (!itemDragId || itemDragId === item.id) return;
      const source = state.todos.find((candidate) => candidate.id === itemDragId);
      if (source === undefined || !sameList(source, item)) return;
      event.preventDefault();
      try { event.dataTransfer.dropEffect = 'move'; } catch (e) { /* ignore */ }
      if (itemDropId !== item.id) setItemDropId(item.id);
    },
    onDragLeave: () => { if (itemDropId === item.id) setItemDropId(null); },
    onDrop: (event) => {
      event.preventDefault();
      reorderItems(itemDragId, item.id);
      setItemDragId(null);
      setItemDropId(null);
    },
    onDragEnd: () => { setItemDragId(null); setItemDropId(null); },
  });

  const itemDragClass = (item) =>
    (itemDragId !== null && itemDragId === item.id ? ' is-dragging' : '') +
    (itemDropId !== null && itemDropId === item.id ? ' is-drop-target' : '');

  // --- the render api -------------------------------------------------------
  // One object passed down to the pure render helpers, so they never reach into
  // React hooks themselves and stay easy to reason about.
  const api = {
    t, state, groups, view, activeGroup,
    setView, setQuery, query, includeDone, setIncludeDone,
    setDragId, setDropId, dragId, dropId, setDragOverTrash, dragOverTrash,
    creatingProject, setCreatingProject, projectDraft, setProjectDraft,
    editingId, editDraft, setEditDraft,
    searching, matches, visibleInSearch,
    tabFor, setTabFor, draftFor, setDraftFor, groupAnchor,
    addTodo, addNote, jumpToGroup, reorderProject: reorderProjects,
    removeTodo, removeProject, restoreRecord: restore,
    deleteForever: deleteForeverRecord, emptyTrash: emptyAll,
    toggleTodo: (id) => update((prev) => toggleTodo(prev, id)),
    startEdit, cancelEdit, commitEdit,
    itemDragProps, itemDragClass,
    addProject,
    exporting, exportData, importing, importFile,
  };

  // The title row holds the heading and the search field; search filters the
  // board in place, so both views share the same scroll container.
  const board = h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', { className: 'tp-head-title' },
        h('h1', null, t('title')),
        h('p', null, searching
          ? t('searchResults').replace('{query}', query.trim()).replace('{count}', String(matchCount))
          : t('subtitle'))),
      renderSearch(api)),
    searching && matchCount === 0
      ? h('div', { className: 'tp-empty' },
          h('strong', null, t('searchNothing').replace('{query}', query.trim())),
          t('searchNothingHint'))
      : groups.map((group) => renderGroup(group, api)));

  // The recycle bin replaces the board; search filters the board in place.
  const content = view === 'trash' ? renderTrash(api) : board;

  // A short-lived status line for export and import. It sits over the pane so
  // the layout does not jump, and carries its own close button.
  const noticeBar = notice
    ? h('div', {
        className: 'tp-notice' + (notice.kind === 'error' ? ' is-error' : ''),
        role: 'status',
        'aria-live': 'polite',
      },
        h('span', { className: 'tp-notice-text' }, notice.text),
        h('button', {
          type: 'button',
          className: 'tp-icon-btn tp-notice-close',
          'aria-label': t('cancel'),
          title: t('cancel'),
          onClick: () => setNotice(null),
        }, h(CloseIcon, { size: 12 })))
    : null;

  return h('section', { className: 'tp-page', 'aria-label': t('title') },
    renderNav(api),
    h('div', { className: 'tp-pane' },
      h('div', { className: 'tp-scroll', ref: scrollRef }, content),
      noticeBar));
}
