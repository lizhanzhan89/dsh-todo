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

  return h('div', { className: 'tp-nav-data' },
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

/** The whole left column: heading, group rows, recycle bin, delete zone, footer. */
function renderNav(api) {
  const { t, state, view, setView, activeGroup, dragId, dropId, groups } = api;

  const rows = groups.map((group) => {
    const open = itemsOf(state, group.id).filter((item) => !item.done).length;
    return navButton(group, Boolean(group.id), open, api);
  });

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
        state.trash.length ? h('span', { className: 'tp-nav-count' }, String(state.trash.length)) : null)),
    trashZone(api),
    h('div', { className: 'tp-nav-foot' },
      dataControls(api),
      createProjectControl(api)));
}
