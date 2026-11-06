/**
 * Left quick-jump column of the panel.
 *
 * One row per group (the fixed "Default" group first, then the projects), with
 * the number of open todos, plus a recycle-bin row. Project rows are draggable
 * to reorder them; dropping one on the delete zone at the bottom removes it, so
 * the nav has no per-row delete button. "New project" lives in the footer.
 */

/**
 * One nav row. The default group is not a project: it never drags, accepts no
 * drops and offers no deletion, but still reserves the grip column so every name
 * lines up.
 *
 * @param {object}  group     { id, name }
 * @param {boolean} draggable true for real projects
 * @param {number}  count     open todos in the group
 * @param {object}  api       page state and transitions
 */
function navButton(group, draggable, count, api) {
  const { t, activeGroup, dragId, dropId, setDragId, setDropId, setDragOverTrash, jumpToGroup, reorderProject } = api;
  const key = groupKey(group.id);
  return h('button', {
    key,
    type: 'button',
    draggable: draggable || undefined,
    className: 'tp-nav-item' +
      (activeGroup === key ? ' is-active' : '') +
      (draggable ? ' is-draggable' : '') +
      (draggable && dragId !== null && dragId === group.id ? ' is-dragging' : '') +
      (draggable && dropId !== null && dropId === group.id ? ' is-drop-target' : ''),
    'aria-label': draggable ? group.name + ' — ' + t('dragToReorder') : undefined,
    onClick: () => jumpToGroup(group.id),
    onDragStart: draggable
      ? (event) => {
          setDragId(group.id);
          setDropId(null);
          try {
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text/plain', group.id);
          } catch (e) { /* some browsers restrict dataTransfer */ }
        }
      : undefined,
    onDragOver: draggable
      ? (event) => {
          if (!dragId || dragId === group.id) return;
          event.preventDefault();
          try { event.dataTransfer.dropEffect = 'move'; } catch (e) { /* ignore */ }
          if (dropId !== group.id) setDropId(group.id);
        }
      : undefined,
    onDragLeave: draggable
      ? () => { if (dropId === group.id) setDropId(null); }
      : undefined,
    onDrop: draggable
      ? (event) => {
          event.preventDefault();
          reorderProject(dragId, group.id);
          setDragId(null);
          setDropId(null);
        }
      : undefined,
    onDragEnd: () => {
      setDragId(null);
      setDropId(null);
      setDragOverTrash(false);
    },
  },
    h('span', { className: 'tp-nav-grip' + (draggable ? '' : ' is-blank'), 'aria-hidden': true }, draggable ? '⠿' : null),
    h('span', { className: 'tp-nav-name' }, group.name),
    h('span', { className: 'tp-nav-count' }, String(count)));
}

/**
 * The drop zone that deletes a project. It only reacts to project rows and only
 * lights up while one is actually being dragged.
 */
function trashZone(api) {
  const { t, state, dragId, dragOverTrash, setDragId, setDropId, setDragOverTrash, removeProject, dropId } = api;
  const draggedProject = dragId === null ? null : state.projects.find((p) => p.id === dragId);

  return h('div', {
    className: 'tp-nav-drop-trash' +
      (draggedProject ? ' is-armed' : '') +
      (dragOverTrash && draggedProject ? ' is-hot' : ''),
    onDragOver: (event) => {
      if (!draggedProject) return;
      event.preventDefault();
      try { event.dataTransfer.dropEffect = 'move'; } catch (e) { /* ignore */ }
      if (!dragOverTrash) setDragOverTrash(true);
      // Leave the rows' own highlight behind once the pointer is here.
      if (dropId !== null) setDropId(null);
    },
    onDragLeave: () => { if (dragOverTrash) setDragOverTrash(false); },
    onDrop: (event) => {
      event.preventDefault();
      const project = draggedProject;
      setDragId(null);
      setDropId(null);
      setDragOverTrash(false);
      if (project) removeProject(project);
    },
  },
    h('span', { className: 'tp-nav-drop-icon', 'aria-hidden': true }, h(TrashIcon, { size: 13 })),
    h('span', { className: 'tp-nav-drop-text' },
      draggedProject
        ? t('dragToDeleteNamed').replace('{name}', draggedProject.name)
        : t('dragToDelete')));
}

/** "New project" button, or the name field while one is being created. */
function createProjectControl(api) {
  const { t, creatingProject, setCreatingProject, projectDraft, setProjectDraft, addProject } = api;
  const close = () => { setCreatingProject(false); setProjectDraft(''); };

  if (!creatingProject) {
    return h('button', {
      type: 'button',
      className: 'tp-btn tp-nav-new',
      onClick: () => setCreatingProject(true),
    }, h(PlusIcon, { size: 13 }), t('newProject'));
  }
  return h('div', { className: 'tp-nav-create' },
    h('input', {
      className: 'tp-input',
      type: 'text',
      autoFocus: true,
      placeholder: t('projectNamePlaceholder'),
      value: projectDraft,
      onChange: (event) => setProjectDraft(event.target.value),
      onKeyDown: (event) => {
        if (event.key === 'Enter') { event.preventDefault(); addProject(); }
        if (event.key === 'Escape') { close(); }
      },
      'aria-label': t('projectNamePlaceholder'),
    }),
    h('div', { className: 'tp-nav-create-actions' },
      h('button', { type: 'button', className: 'tp-btn tp-btn-primary', onClick: addProject }, t('create')),
      h('button', { type: 'button', className: 'tp-btn', onClick: close }, t('cancel'))));
}

/**
 * Export and import sit above "New project": both act on the whole store, so
 * they belong to the store's footer rather than to any one group.
 */
function dataControls(api) {
  const { t, exporting, exportData, importFile, importing, syncing, syncNow } = api;

  const fileInput = h('input', {
    type: 'file',
    accept: 'application/json,.json',
    style: { display: 'none' },
    onChange: (event) => {
      const file = event.target.files && event.target.files[0];
      // Reset first, so picking the same file twice fires again.
      event.target.value = '';
      if (file) importFile(file);
    },
  });

  // The three buttons act on the whole store, so they get a wash of their own
  // and read as one area rather than as three loose buttons.
  return h('div', { className: 'tp-nav-data', style: rowTint(false, false) },
    h('button', {
      type: 'button',
      className: 'tp-btn tp-nav-data-btn' + (syncing ? ' is-busy' : ''),
      title: t('syncHint'),
      'aria-label': t('syncHint'),
      'aria-busy': syncing ? 'true' : 'false',
      disabled: syncing,
      onClick: syncNow,
    }, h(SyncIcon, { size: 13 }), t('sync')),
    h('button', {
      type: 'button',
      className: 'tp-btn tp-nav-data-btn',
      title: t('exportHint'),
      'aria-label': t('exportHint'),
      disabled: exporting,
      onClick: exportData,
    }, h(DownloadIcon, { size: 13 }), t('export')),
    // A label opens the hidden input natively; no click forwarding needed.
    h('label', {
      className: 'tp-btn tp-nav-data-btn' + (importing ? ' is-busy' : ''),
      title: t('importHint'),
      'aria-label': t('importHint'),
      'aria-busy': importing ? 'true' : 'false',
    }, h(UploadIcon, { size: 13 }), t('import'), fileInput));
}

/** The whole left column: heading, group rows, recycle bin, archive, delete zone, footer. */
function renderNav(api) {
  const { t, state, view, setView, activeGroup, dragId, dropId, groups, archived } = api;

  const rows = groups.map((group) => {
    // The badge counts what is left to do, so a group reads as a workload at a
    // glance. Notes are not work, so they are not counted: an "open count" that
    // included them would never reach zero on a group full of reminders.
    const open = itemsOf(state, group.id).filter((item) => !isEntry(item) && !item.done).length;
    return navButton(group, Boolean(group.id), open, api);
  });

  const archiveRow = h('button', {
    key: '__archive__',
    type: 'button',
    className: 'tp-nav-item tp-nav-archive' + (view === 'archive' ? ' is-active' : ''),
    onClick: () => setView('archive'),
  },
    h('span', { className: 'tp-nav-trash-icon', 'aria-hidden': true }, h(ArchiveIcon, { size: 13 })),
    h('span', { className: 'tp-nav-name' }, t('archive')),
    archived.length ? h('span', { className: 'tp-nav-count' }, String(archived.length)) : null);

  return h('nav', { className: 'tp-nav', 'aria-label': t('navTitle') },
    h('div', { className: 'tp-nav-head' }, t('navTitle')),
    h('div', { className: 'tp-nav-list' },
      rows,
      h('button', {
        key: '__trash__',
        type: 'button',
        className: 'tp-nav-item tp-nav-trash' + (view === 'trash' ? ' is-active' : ''),
        onClick: () => setView('trash'),
      },
        h('span', { className: 'tp-nav-trash-icon', 'aria-hidden': true }, h(TrashIcon, { size: 13 })),
        h('span', { className: 'tp-nav-name' }, t('trash')),
        state.trash.length ? h('span', { className: 'tp-nav-count' }, String(state.trash.length)) : null),
      archiveRow),
    trashZone(api),
    h('div', { className: 'tp-nav-foot' },
      dataControls(api),
      createProjectControl(api),
      dataLocation(api)));
}

/**
 * Where the data lives, as a tooltip on one quiet line.
 *
 * The path is only known after the first load (the Host reports it with the
 * state), so this renders nothing until then. It is a tooltip rather than a
 * visible path because a folder path is reference information, not something to
 * read every day; the dot is only there to say the panel knows.
 */
function dataLocation(api) {
  const { t, state } = api;
  const meta = (state && state.meta) || {};
  if (!meta.dataDir) return null;
  // Substituted by hand: `t` only replaces the variables it is handed, so the
  // folder paths have to be filled in here rather than passed through it.
  const title = t('dataLocation')
    .split('{dataFile}').join(meta.dataFile || meta.dataDir)
    .split('{backupDir}').join(meta.backupDir || '');
  return h('div', { className: 'tp-nav-path', title },
    h(FolderIcon, { size: 11 }),
    h('span', { className: 'tp-nav-path-text' }, t('dataFolder')));
}
