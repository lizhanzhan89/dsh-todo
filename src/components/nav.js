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
  const { t, activeGroup, dragId, dropId, setDragId, setDropId, setDragOverTrash, setDragOverArchive, jumpToGroup, reorderProject } = api;
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
      // Both zones highlight while a project is dragged; clear both on release.
      setDragOverTrash(false);
      setDragOverArchive(false);
    },
  },
    h('span', { className: 'tp-nav-grip' + (draggable ? '' : ' is-blank'), 'aria-hidden': true }, draggable ? '⠿' : null),
    h('span', { className: 'tp-nav-name' }, group.name),
    h('span', { className: 'tp-nav-count' }, String(count)));
}

/**
 * One of the two drop zones under the nav list: dropping a dragged project here
 * deletes it, or archives it.
 *
 * Both zones are the same control with different labels, because they are used
 * the same way: they only react to project rows, and they say what will happen
 * to *that* project by name. Keeping deletion and archiving on the same gesture
 * is what makes the pair learnable - drag a project off the list, then pick
 * which way.
 *
 * A zone with nothing being dragged is invisible and collapses to nothing: two
 * empty dashed boxes sitting under the list all day would read as disabled
 * buttons nobody can press.
 *
 * @param {object} options { kind: 'trash' | 'archive', icon, label, named, onDrop }
 */
function dropZone(api, options) {
  const { t, state, dragId, setDragId, setDropId, dropId } = api;
  const over = options.kind === 'trash' ? api.dragOverTrash : api.dragOverArchive;
  const setOver = options.kind === 'trash' ? api.setDragOverTrash : api.setDragOverArchive;
  const draggedProject = dragId === null ? null : state.projects.find((p) => p.id === dragId);
  const isHot = over && draggedProject;

  return h('div', {
    className: 'tp-nav-drop ' + options.kind +
      (isHot ? ' is-hot' : ''),
    onDragOver: (event) => {
      if (!draggedProject) return;
      event.preventDefault();
      try { event.dataTransfer.dropEffect = 'move'; } catch (e) { /* ignore */ }
      if (!over) setOver(true);
      // Leave the rows' own highlight behind once the pointer is here.
      if (dropId !== null) setDropId(null);
    },
    onDragLeave: () => { if (over) setOver(false); },
    onDrop: (event) => {
      event.preventDefault();
      const project = draggedProject;
      setDragId(null);
      setDropId(null);
      setOver(false);
      if (project) options.onDrop(project);
    },
  },
    h('span', { className: 'tp-nav-drop-icon', 'aria-hidden': true }, h(options.icon, { size: 13 })),
    h('span', { className: 'tp-nav-drop-text' },
      draggedProject
        ? options.named.replace('{name}', draggedProject.name)
        : t(options.label)));
}

/** The delete zone: drag a project here to send it to the recycle bin. */
function trashZone(api) {
  return dropZone(api, {
    kind: 'trash',
    icon: TrashIcon,
    label: 'dragToDelete',
    named: api.t('dragToDeleteNamed'),
    onDrop: (project) => api.removeProject(project),
  });
}

/** The archive zone: drag a project here to take it off the board. */
function archiveZone(api) {
  return dropZone(api, {
    kind: 'archive',
    icon: ArchiveIcon,
    label: 'dragToArchive',
    named: api.t('dragToArchiveNamed'),
    onDrop: (project) => api.archiveProject(project.id),
  });
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

  // The drop zones only render while a project row is being dragged, and the
  // class tells CSS to show them: an empty dashed box all day would read as a
  // button nobody can press.
  const dragging = dragId !== null;

  // The two cross-project views sit above the recycle bin and read as a pair:
  // they list things, they do not hold them.
  const dueOpen = api.dueCount;
  const dueRow = h('button', {
    key: '__due__',
    type: 'button',
    className: 'tp-nav-item tp-nav-due' + (view === 'due' ? ' is-active' : ''),
    title: t('dueViewHint'),
    onClick: () => setView('due'),
  },
    h('span', { className: 'tp-nav-trash-icon', 'aria-hidden': true }, h(CalendarIcon, { size: 13 })),
    h('span', { className: 'tp-nav-name' }, t('dueView')),
    dueOpen ? h('span', { className: 'tp-nav-count' }, String(dueOpen)) : null);

  const backupRow = h('button', {
    key: '__backups__',
    type: 'button',
    className: 'tp-nav-item tp-nav-backups' + (view === 'backups' ? ' is-active' : ''),
    title: t('backupPageHint'),
    onClick: () => setView('backups'),
  },
    h('span', { className: 'tp-nav-trash-icon', 'aria-hidden': true }, h(HistoryIcon, { size: 13 })),
    h('span', { className: 'tp-nav-name' }, t('backups')));

  return h('nav', { className: 'tp-nav' + (dragging ? ' is-dragging' : ''), 'aria-label': t('navTitle') },
    h('div', { className: 'tp-nav-head' }, t('navTitle')),
    h('div', { className: 'tp-nav-list' },
      rows,
      h('div', { className: 'tp-nav-sep', 'aria-hidden': true }),
      dueRow,
      backupRow,
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
    // Archive sits above delete: the gentler of the two outcomes is the one the
    // pointer reaches first.
    archiveZone(api),
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
