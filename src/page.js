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
  // Completed todos stay hidden from search results unless this is ticked. The
  // value is stored in the data file (`includeDone`), so it is read from the
  // loaded state rather than kept as local UI state, and the toggle writes it
  // back like any other edit.
  // Inline editing: the id of the row being edited and its draft text.
  const [editingId, setEditingId] = React.useState(null);
  const [editDraft, setEditDraft] = React.useState('');
  // Drag-and-drop project reordering inside the quick-jump nav.
  const [dragId, setDragId] = React.useState(null);
  const [dropId, setDropId] = React.useState(null);
  // True while a project row is hovering the nav's delete or archive zone.
  const [dragOverTrash, setDragOverTrash] = React.useState(false);
  const [dragOverArchive, setDragOverArchive] = React.useState(false);
  // Drag-and-drop item reordering (todos and notes) inside a group tab.
  const [itemDragId, setItemDragId] = React.useState(null);
  const [itemDropId, setItemDropId] = React.useState(null);
  const scrollRef = React.useRef(null);
  // Skip the very first save (the empty initial render before the load lands).
  const loadedRef = React.useRef(false);
  // Set after a restore: the restored state is already the file's content.
  const skipNextSaveRef = React.useRef(false);

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
    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }
    // `meta` came from the Host and is not part of the record; posting it back
    // would put a copy of the paths into the data file.
    const { meta, ...record } = state;
    saveState(record);
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
  // Adding never asks for a deadline. A date is a decision about one item, and
  // it belongs on the row where the item is - a field next to the add button
  // invites setting a date for a thought that has not been written yet.
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
  // `mixed` says whether the source row came from the combined "All" tab, where
  // a note and a todo are allowed to swap places.
  const reorderItems = (sourceId, targetId, mixed) =>
    update((prev) => reorderItem(prev, sourceId, targetId, mixed));
  const reorderProjects = (sourceId, targetId) => update((prev) => reorderProject(prev, sourceId, targetId));

  // --- export / import ------------------------------------------------------
  // Export downloads the whole state as one JSON file. Import reads a backup and
  // merges it in: nothing already on the board is replaced or removed, and every
  // imported id is remapped so a second import cannot duplicate onto the first.
  const [exporting, setExporting] = React.useState(false);
  const [importing, setImporting] = React.useState(false);
  // The sync button writes on demand and reports the result, unlike the silent
  // auto-save in the effect above.
  const [syncing, setSyncing] = React.useState(false);
  const [notice, setNotice] = React.useState(null);
  // The backup page: one snapshot being written, one snapshot being restored.
  const [backingUp, setBackingUp] = React.useState(false);
  const [restoring, setRestoring] = React.useState(null);
  // One snapshot being removed. Tracked so a second click cannot fire while the
  // first is in flight and the button can report what it is doing.
  const [deleting, setDeleting] = React.useState(null);
  const [confirmingDelete, setConfirmingDelete] = React.useState(null);

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
        // Keep the loaded `meta` on the incoming record: it describes where the
        // data lives, not what is in it.
        const merged = mergeState(state, parsed.state);
        update((prev) => ({ ...merged.state, meta: prev.meta }));
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

  // Write the current state to the JSON data file and say so. Every change
  // already saves automatically, so this is a confirmation control: it forces a
  // write right now and surfaces a failure that the silent auto-save hides.
  const syncNow = () => {
    if (syncing) return;
    setSyncing(true);
    const counts = {
      projects: state.projects.length,
      items: state.todos.length,
      trash: state.trash.length,
    };
    const { meta, ...record } = state;
    syncState(record)
      .then((result) => {
        if (result.ok) {
          // The Host answers with the folder it wrote to; adopt it so the footer
          // line stays correct even if the data dir was changed in the config.
          if (result.meta && result.meta.dataDir) setState((prev) => ({ ...prev, meta: result.meta }));
          setNotice({ kind: 'ok', text: t('syncDone', counts) });
        } else {
          setNotice({ kind: 'error', text: t(result.error || 'syncFailed') });
        }
      })
      .finally(() => setSyncing(false));
  };

  // --- archiving ------------------------------------------------------------
  // Archiving moves a project off the board without touching its items: the
  // project keeps its id and its place in `projects`, so unarchiving restores
  // both the group and everything in it.
  const archiveProject = (projectId) => update((prev) => setProjectArchived(prev, projectId, true));
  const unarchiveProject = (projectId) => update((prev) => setProjectArchived(prev, projectId, false));
  const setDue = (id, due) => update((prev) => setItemDue(prev, id, due));

  // --- backups --------------------------------------------------------------
  /**
   * Write a manual snapshot now.
   *
   * The Host copies the file it has on disk, and every change is saved
   * immediately, so nothing has to be pushed first. It answers with the updated
   * backup list, which is what makes the new row appear without a reload.
   */
  const backupNow = () => {
    if (backingUp) return;
    setBackingUp(true);
    createBackup()
      .then((result) => {
        if (!result.ok) {
          setNotice({ kind: 'error', text: t(result.error || 'backupFailed') });
          return;
        }
        setState((prev) => ({ ...prev, meta: result.meta }));
        setNotice({ kind: 'ok', text: t('backupDone').replace('{name}', (result.backup && result.backup.name) || '') });
      })
      .finally(() => setBackingUp(false));
  };

  /**
   * Replace the whole board with one snapshot.
   *
   * Confirmed first, because this is the one action in the panel that throws
   * content away - it is a restore, not the merge that "import" does. The Host
   * snapshots the current content before overwriting, so the confirmation also
   * says how to get back.
   */
  const restoreFromBackup = (backup) => {
    if (restoring !== null || !backup) return;
    const when = formatBackupStamp(backup.stamp) || backup.name;
    const message = t('restoreConfirm').replace('{when}', when);
    if (typeof window !== 'undefined' && typeof window.confirm === 'function' && !window.confirm(message)) return;
    setRestoring(backup.name);
    restoreBackup(backup.name)
      .then((result) => {
        if (!result.ok) {
          setNotice({ kind: 'error', text: t(result.error || 'backupFailed') });
          return;
        }
        // A restore replaces the record wholesale; `meta` describes the folder,
        // not the content, so it comes from the response rather than the file.
        setState({ ...normalizeState(result.state), meta: result.meta });
        // The restored state is already on disk. Skip the next auto-save so the
        // panel does not write it straight back: that write would be harmless
        // but it would also take a "day's first write" snapshot of content the
        // user did not type. The flag has to be read in the effect, so it is
        // set here and cleared there.
        skipNextSaveRef.current = true;
        setNotice({
          kind: 'ok',
          text: t('restoreDone')
            .replace('{when}', when)
            .replace('{count}', String((result.state.todos || []).length)),
        });
      })
      .finally(() => setRestoring(null));
  };

  /**
   * Remove one manual snapshot.
   *
   * Confirmed in place rather than through `window.confirm`: the row can turn
   * its own buttons into "delete / cancel", which keeps the question next to
   * the file it is about. The state holds the name of the row being asked
   * about, so only that row changes.
   */
  const askDeleteBackup = (backup) => {
    if (!backup || deleting !== null) return;
    setConfirmingDelete(backup.name);
  };

  const cancelDeleteBackup = () => setConfirmingDelete(null);

  const deleteBackupNow = (backup) => {
    if (!backup || deleting !== null) return;
    setDeleting(backup.name);
    deleteBackup(backup.name)
      .then((result) => {
        if (!result.ok) {
          setNotice({ kind: 'error', text: t(result.error || 'backupFailed') });
          return;
        }
        setState((prev) => ({ ...prev, meta: result.meta }));
        setNotice({ kind: 'ok', text: t('backupDeleted').replace('{name}', backup.name) });
      })
      .finally(() => {
        setDeleting(null);
        setConfirmingDelete(null);
      });
  };

  // --- derived values -------------------------------------------------------
  const groups = groupList(state, t('noProject'));
  const archived = archivedProjects(state);
  // The nav badge for the deadline view counts what the page would list.
  const dueCount = dueItems(state).length;
  // The flag decides whether finished todos appear in the combined "All" tab
  // and in search results. It is read straight from the state, so the file is
  // the single source of truth and the toggle needs no extra sync.
  const includeDone = state.includeDone !== false;
  // The transition is named differently because this handler shadows it.
  const setIncludeDone = (value) => update((prev) => setIncludeDoneFlag(prev, value));
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

  /**
   * Text columns available to the inline editor, measured from the actual
   * field: its width minus padding and border, divided by the width of one
   * character in the field's own font. Reading the live element avoids guessing
   * at font metrics; the fallback covers a row that is not in the DOM yet.
   */
  const editCols = () => {
    if (typeof document === 'undefined' || typeof document.querySelector !== 'function') return 30;
    const field = document.querySelector('.tp-edit-input');
    if (!field || !field.getBoundingClientRect) return 30;
    const style = typeof getComputedStyle === 'function' ? getComputedStyle(field) : null;
    const padding = style ? parseFloat(style.paddingLeft || 0) + parseFloat(style.paddingRight || 0) : 16;
    const border = style ? parseFloat(style.borderLeftWidth || 0) + parseFloat(style.borderRightWidth || 0) : 1;
    const width = field.getBoundingClientRect().width - padding - border;
    if (!(width > 0)) return 30;
    // A monospace-ish estimate from the computed font size: that is close
    // enough to decide how many rows a line wraps into.
    const fontSize = style ? parseFloat(style.fontSize || 14) : 14;
    const perChar = fontSize * 0.55;
    return Math.max(12, Math.floor(width / perChar));
  };

  // --- drag handlers shared by todo and note rows ---------------------------
  // Only the grip starts a drag: the <li> itself is not draggable, so text
  // selection and the row's buttons never turn into a drag. `gripDragProps`
  // returns the handlers for the grip, `itemDragProps` the drop target events
  // that stay on the row.
  const [dragArmedId, setDragArmedId] = React.useState(null);

  /**
   * Whether the row was dragged out of the combined "All" tab. There a note and
   * a todo are neighbours in one column, so the two kinds may be interleaved;
   * in the single-kind tabs the kind is fixed and the check stays strict.
   */
  const draggingFromAll = () =>
    tabFor(projectIdOf(state.todos.find((candidate) => candidate.id === itemDragId) || {})) === TAB_ALL;

  const itemDragProps = (item) => ({
    onDragOver: (event) => {
      if (!itemDragId || itemDragId === item.id) return;
      const source = state.todos.find((candidate) => candidate.id === itemDragId);
      if (source === undefined) return;
      const allowed = draggingFromAll() ? sameGroup : sameList;
      if (!allowed(source, item)) return;
      event.preventDefault();
      try { event.dataTransfer.dropEffect = 'move'; } catch (e) { /* ignore */ }
      if (itemDropId !== item.id) setItemDropId(item.id);
    },
    onDragLeave: () => { if (itemDropId === item.id) setItemDropId(null); },
    onDrop: (event) => {
      event.preventDefault();
      reorderItems(itemDragId, item.id, draggingFromAll());
      setItemDragId(null);
      setItemDropId(null);
      setDragArmedId(null);
    },
  });

  /**
   * The grip is the only draggable element of a row. `dragArmedId` mirrors the
   * grip's own `draggable` flag: React keeps a DOM attribute once set, so the
   * flag has to be reset on drag end or the row stays draggable afterwards.
   */
  const gripDragProps = (item) => ({
    draggable: dragArmedId === item.id || undefined,
    onMouseDown: () => setDragArmedId(item.id),
    onDragStart: (event) => {
      setItemDragId(item.id);
      setItemDropId(null);
      try {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', item.id);
      } catch (e) { /* some browsers restrict dataTransfer */ }
    },
    onDragEnd: () => {
      setItemDragId(null);
      setItemDropId(null);
      setDragArmedId(null);
    },
  });

  const itemDragClass = (item) =>
    (itemDragId !== null && itemDragId === item.id ? ' is-dragging' : '') +
    (itemDropId !== null && itemDropId === item.id ? ' is-drop-target' : '');

  // --- the render api -------------------------------------------------------
  // One object passed down to the pure render helpers, so they never reach into
  // React hooks themselves and stay easy to reason about.
  const api = {
    t, state, groups, view, activeGroup,
    setView, setQuery, query, includeDone, setIncludeDone, editCols,
    setDragId, setDropId, dragId, dropId, setDragOverTrash, dragOverTrash,
    setDragOverArchive, dragOverArchive,
    setDue,
    archived, archiveProject, unarchiveProject, dueCount,
    creatingProject, setCreatingProject, projectDraft, setProjectDraft,
    editingId, editDraft, setEditDraft,
    searching, matches, visibleInSearch,
    tabFor, setTabFor, draftFor, setDraftFor, groupAnchor,
    addTodo, addNote, jumpToGroup, reorderProject: reorderProjects,
    removeTodo, removeProject, restoreRecord: restore,
    deleteForever: deleteForeverRecord, emptyTrash: emptyAll,
    toggleTodo: (id) => update((prev) => toggleTodo(prev, id)),
    startEdit, cancelEdit, commitEdit,
    itemDragProps, itemDragClass, gripDragProps,
    addProject,
    exporting, exportData, importing, importFile, syncing, syncNow,
    backingUp, restoring, backupNow, restoreFromBackup,
    deleting, confirmingDelete, askDeleteBackup, cancelDeleteBackup, deleteBackupNow,
  };

  // The title row holds the heading and the search field; search filters the
  // board in place, so both views share the same scroll container.
  const board = h('div', { className: 'tp-content' },
    h('header', { className: 'tp-head tp-head-row' },
      h('div', { className: 'tp-head-title' },
        // The build stamp is the quickest way to tell a stale browser cache from
        // a real bug: if this number is not what the source says, the page is
        // running old code and no CSS fix can show up yet.
        h('h1', null, t('title'), h('span', { className: 'tp-build' }, 'v' + BUILD)),
        h('p', null, searching
          ? t('searchResults').replace('{query}', query.trim()).replace('{count}', String(matchCount))
          : t('subtitle'))),
      renderSearch(api)),
    searching && matchCount === 0
      ? h('div', { className: 'tp-empty' },
          h('strong', null, t('searchNothing').replace('{query}', query.trim())),
          t('searchNothingHint'))
      : groups.map((group) => renderGroup(group, api)));

  // The recycle bin and the archive each replace the board; search filters the
  // board in place.
  const content = view === 'trash' ? renderTrash(api)
    : view === 'archive' ? renderArchive(api)
      : view === 'due' ? renderDue(api)
        : view === 'backups' ? renderBackups(api)
          : board;

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
