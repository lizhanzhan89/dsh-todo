/**
 * Client half of the Memos bundle (sidebar panel "todos").
 *
 * GENERATED FILE — do not edit. Sources live in `src/`; run
 * `node build.mjs` from the package root to regenerate this file.
 *
 * The Harness loads one plain-JS browser artifact that registers a lazy factory
 * whose id equals the package name; React comes from the host module table. All
 * modules therefore share this single factory scope.
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-todo',
  factory(require) {
    const React = require('react');
    const h = React.createElement;


    /* ---------------------------------------------------------------------- */
    /* src/constants.js                                                       */
    /* ---------------------------------------------------------------------- */
    /**
     * Fixed identifiers shared by the Client halves and the Host route.
     */

    /** Sidebar panel id, used for both `sidebar.panellist` and the `main` key. */
    const PANEL_ID = 'todos';

    /** Locale namespace these dictionaries register under. */
    const NS = 'todoProject';

    /** Panellist order among the shipped sidebar icons. */
    const PANEL_ORDER = 20;

    /** Host route that reads and writes the JSON data file. */
    const STATE_URL = '/api/todo-project';

    /** Stable key for the fixed "Default" group (no project). */
    const NO_PROJECT = '__none__';

    /** The three per-group tabs. */
    const TAB_ACTIVE = 'active';
    const TAB_DONE = 'done';
    const TAB_ENTRIES = 'entries';

    /** Item kinds. `entry` is a note: plain text, no checkbox. */
    const KIND_TODO = 'todo';
    const KIND_ENTRY = 'entry';

    /* ---------------------------------------------------------------------- */
    /* src/locale/en.js                                                       */
    /* ---------------------------------------------------------------------- */
    /**
     * English copy. Keys must stay in step with `zh.js`.
     *
     * `{name}`, `{count}`, `{time}` and `{query}` are replaced by the caller.
     */
    const en = {
      panel: 'Memos',
      title: 'Memos',
      subtitle: 'Todos and notes, organized by project.',
      noProject: 'Default',
      noProjectHint: 'Todos that belong to no project.',
      newProject: 'New project',
      projectNamePlaceholder: 'Project name',
      create: 'Create',
      cancel: 'Cancel',
      addTodoPlaceholder: 'Add a todo and press Enter',
      add: 'Add',
      delete: 'Delete',
      edit: 'Edit',
      editHint: 'Double-click to edit',
      editLocked: 'Completed items cannot be edited. Reopen it first.',
      empty: 'No todos yet',
      emptyHint: 'Add your first todo above.',
      projectsEmpty: 'No projects yet',
      projectsEmptyHint: 'Create a project to group your todos.',
      remaining: '{count} left',
      doneLabel: 'Done',
      reopen: 'Reopen',
      complete: 'Mark done',
      deleteProject: 'Delete project',
      deleteProjectConfirm: 'Delete "{name}" and its todos?',
      countTodos: '{count} todos',
      tabActive: 'Active',
      tabDone: 'Completed',
      tabEntries: 'Notes',
      entriesEmpty: 'No notes yet',
      entriesEmptyHint: 'Notes added here stay as plain text, shown without a checkbox.',
      addNotePlaceholder: 'Add a note and press Enter',
      addNote: 'Add note',
      activeEmpty: 'Nothing active here',
      activeEmptyHint: 'Add a todo below, or check off the ones you finished.',
      doneEmpty: 'Nothing completed yet',
      doneEmptyHint: 'Completed todos will appear here with a finish time.',
      completedAt: 'Completed {time}',
      navTitle: 'Jump to',
      navEmpty: 'No projects yet',
      dragToReorder: 'Drag to reorder',
      dragToDelete: 'Drag a project here to delete',
      dragToDeleteNamed: 'Release to delete “{name}”',
      trash: 'Recycle bin',
      trashEmpty: 'Recycle bin is empty',
      trashEmptyHint: 'Deleted todos, notes and projects collect here.',
      trashRestore: 'Restore',
      trashDeleteForever: 'Delete forever',
      trashEmptyAll: 'Empty recycle bin',
      trashEmptyAllConfirm: 'Permanently delete everything in the recycle bin?',
      trashDeletedAt: 'Deleted {time}',
      trashKindTodo: 'Todo',
      trashKindEntry: 'Note',
      trashKindProject: 'Project',
      trashItemCount: '{count} items',
      back: 'Back',
      searchPlaceholder: 'Search todos, notes and projects',
      searchClear: 'Clear search',
      searchIncludeDone: 'Completed',
      searchResults: '{count} results for "{query}"',
      searchNothing: 'No matches for "{query}"',
      searchNothingHint: 'Try a shorter word, or a different keyword.',
      export: 'Export',
      exportHint: 'Download every project, todo, note and recycle-bin item as one JSON file.',
      exportDone: 'Exported {projects} projects, {items} items and {trash} recycle-bin records.',
      import: 'Import',
      importHint: 'Add projects and items from a JSON backup file. Existing items are kept.',
      importDone: 'Imported {projects} projects, {items} items and {trash} recycle-bin records.',
      importInvalid: 'That file is not a Memos backup.',
      importEmpty: 'That backup contains no projects or todos.',
      importFailed: 'Import failed: {error}',
    };

    /* ---------------------------------------------------------------------- */
    /* src/locale/zh.js                                                       */
    /* ---------------------------------------------------------------------- */
    /**
     * Chinese copy (default UI language here). Keys must stay in step with `en.js`.
     */
    const zh = {
      panel: '备忘录',
      title: '备忘录',
      subtitle: '按项目分组的待办与笔记。',
      noProject: '默认',
      noProjectHint: '不属于任何项目的待办。',
      newProject: '新建项目',
      projectNamePlaceholder: '项目名称',
      create: '创建',
      cancel: '取消',
      addTodoPlaceholder: '添加待办，回车确认',
      add: '添加',
      delete: '删除',
      edit: '编辑',
      editHint: '双击可编辑',
      editLocked: '已完成的待办不可编辑，取消完成后才能修改。',
      empty: '还没有待办',
      emptyHint: '在上方添加第一条待办吧。',
      projectsEmpty: '还没有项目',
      projectsEmptyHint: '创建一个项目来整理你的待办。',
      remaining: '剩余 {count} 项',
      doneLabel: '已完成',
      reopen: '重新打开',
      complete: '标记完成',
      deleteProject: '删除项目',
      deleteProjectConfirm: '删除“{name}”及其全部待办？',
      countTodos: '{count} 项待办',
      tabActive: '未完成',
      tabDone: '已完成',
      tabEntries: '笔记',
      entriesEmpty: '还没有笔记',
      entriesEmptyHint: '在这里添加的笔记是普通文字，不显示复选框。',
      addNotePlaceholder: '添加笔记，回车确认',
      addNote: '添加笔记',
      activeEmpty: '暂无未完成待办',
      activeEmptyHint: '在下方添加一条待办，或勾选已完成的项。',
      doneEmpty: '还没有已完成的待办',
      doneEmptyHint: '完成后的待办会连同完成时间显示在这里。',
      completedAt: '完成于 {time}',
      navTitle: '快速跳转',
      navEmpty: '还没有项目',
      dragToReorder: '拖动以排序',
      dragToDelete: '把项目拖到这里删除',
      dragToDeleteNamed: '松开即删除“{name}”',
      trash: '回收站',
      trashEmpty: '回收站是空的',
      trashEmptyHint: '删除的待办、笔记和项目会先放到这里。',
      trashRestore: '恢复',
      trashDeleteForever: '永久删除',
      trashEmptyAll: '清空回收站',
      trashEmptyAllConfirm: '要永久删除回收站中的全部内容吗？',
      trashDeletedAt: '删除于 {time}',
      trashKindTodo: '待办',
      trashKindEntry: '笔记',
      trashKindProject: '项目',
      trashItemCount: '{count} 项',
      back: '返回',
      searchPlaceholder: '搜索待办、笔记和项目',
      searchClear: '清除搜索',
      searchIncludeDone: '包含已完成',
      searchResults: '“{query}”的搜索结果：{count} 项',
      searchNothing: '没有找到“{query}”',
      searchNothingHint: '试试更短的关键词，或换一个词。',
      export: '导出',
      exportHint: '把全部项目、待办、笔记和回收站内容导出为一个 JSON 文件。',
      exportDone: '已导出 {projects} 个项目、{items} 个条目和 {trash} 条回收站记录。',
      import: '导入',
      importHint: '从 JSON 备份文件导入项目与条目，已有内容会保留。',
      importDone: '已导入 {projects} 个项目、{items} 个条目和 {trash} 条回收站记录。',
      importInvalid: '这个文件不是备忘录的备份文件。',
      importEmpty: '这个备份里没有项目或待办。',
      importFailed: '导入失败：{error}',
    };

    /* ---------------------------------------------------------------------- */
    /* src/storage.js                                                         */
    /* ---------------------------------------------------------------------- */
    /**
     * Persistence for the Client half.
     *
     * The Client never touches the file system itself: the Host half owns the JSON
     * file and exposes it over `STATE_URL`. The browser cookie carries the session,
     * so a plain `fetch` is already authenticated.
     *
     * The whole state is POSTed on every change, so the file on disk is always the
     * current copy and no merge logic is needed.
     */

    /** A new state with nothing in it. */
    function emptyState() {
      return { projects: [], todos: [], trash: [] };
    }

    /** Coerce whatever came back from disk into the shape the page expects. */
    function normalizeState(parsed) {
      return {
        projects: Array.isArray(parsed && parsed.projects) ? parsed.projects : [],
        todos: Array.isArray(parsed && parsed.todos) ? parsed.todos : [],
        // The recycle bin: deleted items and projects kept for restoring.
        trash: Array.isArray(parsed && parsed.trash) ? parsed.trash : [],
      };
    }

    /** Stable unique id for a project or an item. */
    function uid() {
      try {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
      } catch (e) { /* ignore */ }
      return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    /** Read the stored state. A missing file or a network error yields empty state. */
    async function loadState() {
      try {
        const res = await fetch(STATE_URL, { method: 'GET', headers: { accept: 'application/json' } });
        if (!res.ok) return emptyState();
        const data = await res.json();
        return normalizeState(data);
      } catch (e) {
        return emptyState();
      }
    }

    /** Replace the stored state. Transient network errors are ignored. */
    async function saveState(state) {
      try {
        await fetch(STATE_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(state),
        });
      } catch (e) { /* ignore transient network errors */ }
    }

    /* ---------------------------------------------------------------------- */
    /* src/backup.js                                                          */
    /* ---------------------------------------------------------------------- */
    /**
     * Backup file format: export, validate and merge.
     *
     * The export is the whole state (`projects`, `todos`, `trash`) wrapped in a
     * small envelope with a version and a timestamp, so a file can be recognised
     * without guessing:
     *
     *   {
     *     "format": "todo-project",
     *     "version": 1,
     *     "exportedAt": "2024-05-01T10:00:00.000Z",
     *     "projects": [{ "id": "p1", "name": "Work" }],
     *     "todos":    [{ "id": "a1", "text": "…", "kind": "todo", "done": false,
     *                    "completedAt": null, "projectId": "p1" }],
     *     "trash":    [ … ]
     *   }
     *
     * `parseBackup` accepts that envelope and also a bare state object, with or
     * without `trash`, so hand-edited files and files from older versions still
     * import. `mergeState` never destroys what is already on the board: it adds the
     * incoming projects and items under fresh ids, so a second import does not
     * duplicate silently and nothing existing is overwritten.
     */

    const BACKUP_FORMAT = 'todo-project';
    const BACKUP_VERSION = 1;

    /** A file name that sorts by date: `memos-2024-05-01.json`. */
    function backupFileName(date = new Date()) {
      const pad = (n) => String(n).padStart(2, '0');
      return 'memos-' + date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + '.json';
    }

    /** The document written by "export". */
    function buildBackup(state) {
      return {
        format: BACKUP_FORMAT,
        version: BACKUP_VERSION,
        exportedAt: now(),
        projects: state.projects,
        todos: state.todos,
        trash: state.trash,
      };
    }

    /** The same document as pretty JSON text, ready to download. */
    function backupText(state) {
      return JSON.stringify(buildBackup(state), null, 2) + '\n';
    }

    /**
     * Validate untrusted text and turn it into a state object.
     *
     * @param {string} text the file contents
     * @returns {{ ok: true, state: object, counts: object } | { ok: false, error: string }}
     *   `error` is a locale key (`importInvalid`, `importEmpty`), not a message.
     */
    function parseBackup(text) {
      let parsed;
      try {
        parsed = JSON.parse(text);
      } catch (e) {
        return { ok: false, error: 'importInvalid' };
      }
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ok: false, error: 'importInvalid' };
      }
      const looksLikeState = Array.isArray(parsed.projects) || Array.isArray(parsed.todos);
      if (!looksLikeState) return { ok: false, error: 'importInvalid' };

      const state = normalizeState(parsed);
      // Drop malformed rows rather than letting a broken record crash the board.
      state.projects = state.projects.filter((p) => p && typeof p === 'object' && typeof p.id === 'string' && typeof p.name === 'string');
      state.todos = state.todos.filter((item) => item && typeof item === 'object' && typeof item.id === 'string' && typeof item.text === 'string');
      state.trash = state.trash.filter((record) => record && typeof record === 'object' && typeof record.id === 'string');

      if (state.projects.length === 0 && state.todos.length === 0) {
        return { ok: false, error: 'importEmpty' };
      }
      return {
        ok: true,
        state,
        counts: {
          projects: state.projects.length,
          todos: state.todos.filter((item) => !isEntry(item)).length,
          notes: state.todos.filter(isEntry).length,
        },
      };
    }

    /**
     * Merge an imported state into the current one.
     *
     * Projects keep their names and order and are appended after the existing ones;
     * every incoming id is remapped so nothing collides with what is already here.
     * Items follow the project they belong to, and an item whose project is missing
     * lands in the default group. Incoming recycle-bin records are remapped the same
     * way, with items already moved by their project left out to avoid duplicates.
     *
     * @returns {{ state: object, counts: object }} the merged state and what was added
     */
    function mergeState(current, incoming) {
      const idMap = new Map();
      const freshId = (oldId) => {
        const key = String(oldId);
        if (!idMap.has(key)) idMap.set(key, uid());
        return idMap.get(key);
      };

      const projects = current.projects.slice();
      const incomingProjects = [];
      for (const project of incoming.projects) {
        const copy = { id: freshId(project.id), name: project.name };
        incomingProjects.push(copy);
        projects.push(copy);
      }

      const todos = current.todos.slice();
      const incomingItems = [];
      for (const item of incoming.todos) {
        const projectId = item.projectId ? idMap.get(String(item.projectId)) || null : null;
        const copy = {
          id: freshId(item.id),
          text: item.text,
          kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
          done: Boolean(item.done),
          completedAt: item.done ? (item.completedAt || null) : null,
          projectId,
        };
        incomingItems.push(copy);
        todos.push(copy);
      }

      // Recycle-bin records: a project record carries its own items, so those are
      // not re-added as separate records; item records of such a project are skipped
      // because the entire project already travels with its record.
      const trash = current.trash.slice();
      const incomingTrash = [];
      const trashedProjectIds = new Set(incoming.trash.filter((r) => r.kind === 'project').map((r) => String(r.id)));
      for (const record of incoming.trash) {
        if (record.kind === 'project') {
          const project = { id: freshId(record.id), name: record.project && record.project.name ? record.project.name : record.text };
          const items = (Array.isArray(record.items) ? record.items : []).map((item) => ({
            id: freshId(item.id),
            text: item.text,
            kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
            done: Boolean(item.done),
            completedAt: item.done ? (item.completedAt || null) : null,
            projectId: project.id,
          }));
          const copy = {
            id: freshId(record.id + ':trash'),
            kind: 'project',
            text: project.name,
            deletedAt: record.deletedAt || now(),
            index: record.index,
            project,
            items,
          };
          incomingTrash.push(copy);
          trash.push(copy);
          continue;
        }
        if (record.projectId && trashedProjectIds.has(String(record.projectId))) continue;
        const item = record.item && typeof record.item === 'object' ? record.item : {};
        const copy = {
          id: freshId(record.id + ':trash'),
          kind: record.kind === KIND_ENTRY || isEntry(item) ? KIND_ENTRY : KIND_TODO,
          text: typeof record.text === 'string' ? record.text : (typeof item.text === 'string' ? item.text : ''),
          deletedAt: record.deletedAt || now(),
          projectId: record.projectId ? idMap.get(String(record.projectId)) || null : null,
          projectName: record.projectName || null,
          index: record.index,
          item: {
            id: freshId(item.id || record.id),
            text: typeof item.text === 'string' ? item.text : record.text,
            kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
            done: Boolean(item.done),
            completedAt: item.completedAt || null,
            projectId: record.projectId ? idMap.get(String(record.projectId)) || null : null,
          },
        };
        incomingTrash.push(copy);
        trash.push(copy);
      }

      return {
        state: { projects, todos, trash },
        counts: {
          projects: incomingProjects.length,
          items: incomingItems.length,
          trash: incomingTrash.length,
        },
      };
    }

    /* ---------------------------------------------------------------------- */
    /* src/styles.js                                                          */
    /* ---------------------------------------------------------------------- */
    /**
     * Panel stylesheet, injected by `apply` as one `<style data-dsh-todo>` tag.
     *
     * Rules use only `--dsw-alias-*` theme tokens so the panel follows light/dark
     * switching; every class is namespaced with `tp-`. The file is a plain string
     * because the browser artifact is not transpiled: no template literal here so a
     * concatenating build cannot break on inner backticks.
     */
    const CSS = `
    .tp-page{width:100%;min-width:0;height:100%;min-height:0;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-base);font-size:14px;line-height:1.6;display:flex;overflow:hidden}
    .tp-nav{flex:none;width:190px;min-height:0;display:flex;flex-direction:column;border-right:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1);overflow:hidden}
    .tp-nav-head{padding:24px 16px 8px;font-size:12px;font-weight:600;color:var(--dsw-alias-label-secondary);letter-spacing:.02em;text-transform:uppercase}
    .tp-nav-list{flex:1;min-height:0;overflow:auto;padding:4px 8px 24px;display:flex;flex-direction:column;gap:2px}
    .tp-nav-item{display:flex;align-items:center;gap:8px;width:100%;text-align:left;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;line-height:18px;padding:7px 10px;border-radius:8px;cursor:pointer}
    .tp-nav-item:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .tp-nav-item:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-nav-item.is-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:500}
    .tp-nav-grip.is-blank{opacity:0}
    .tp-nav-drop-trash{margin:8px 8px 0;padding:8px 10px;display:flex;align-items:center;gap:8px;border:.5px dashed var(--dsw-alias-border-l2);border-radius:10px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;opacity:0;transition:opacity .12s,border-color .12s,background .12s,color .12s}
    .tp-nav-drop-trash.is-armed{opacity:1}
    .tp-nav-drop-trash.is-hot{border-color:var(--dsw-alias-state-error-primary);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary)}
    .tp-nav-drop-icon{flex:none;display:inline-flex;align-items:center}
    .tp-nav-drop-text{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .tp-nav-count{transition:opacity .12s}
    .tp-nav-item.is-draggable{cursor:grab}
    .tp-nav-item.is-draggable:active{cursor:grabbing}
    .tp-nav-item.is-dragging{opacity:.45}
    .tp-nav-item.is-drop-target{box-shadow:inset 0 2px 0 0 var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
    .tp-nav-grip{flex:none;color:var(--dsw-alias-label-secondary);font-size:12px;opacity:0;transition:opacity .12s}
    .tp-nav-item:hover .tp-nav-grip,.tp-nav-item.is-dragging .tp-nav-grip{opacity:1}
    .tp-nav-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .tp-nav-count{flex:none;font-size:11px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
    .tp-nav-empty{padding:8px 12px;color:var(--dsw-alias-label-secondary);font-size:12px}
    .tp-nav-foot{flex:none;padding:8px;border-top:.5px solid var(--dsw-alias-border-l1)}
    /* Export and import share one row above "New project". */
    .tp-nav-data{display:flex;gap:6px;margin-bottom:6px}
    .tp-nav-data-btn{flex:1;justify-content:center;min-width:0;height:30px;padding:0 8px;font-size:12px;gap:5px}
    .tp-nav-data-btn:disabled,.tp-nav-data-btn.is-busy{cursor:default;opacity:.55}
    .tp-nav-data-btn:disabled:hover,.tp-nav-data-btn.is-busy:hover{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l2)}
    label.tp-nav-data-btn{cursor:pointer}
    .tp-nav-new{width:100%;justify-content:center}
    .tp-nav-create{display:flex;flex-direction:column;gap:6px}
    .tp-nav-create .tp-input{height:32px;font-size:13px}
    .tp-nav-create-actions{display:flex;gap:6px}
    .tp-nav-create-actions .tp-btn{flex:1;justify-content:center;height:30px;padding:0 8px}
    .tp-pane{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}
    .tp-scroll{scrollbar-gutter:stable;flex:1;min-height:0;overflow:auto}
    .tp-content{max-width:820px;margin:0 auto;padding:0 clamp(20px,4vw,44px) 48px}
    .tp-head{margin-bottom:20px;padding-top:28px}
    .tp-head h1{margin:0;font-size:20px;font-weight:500;line-height:28px}
    .tp-head p{margin:4px 0 0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
    .tp-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:20px}
    .tp-btn{border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);border-radius:10px;height:32px;padding:0 12px;font:inherit;font-size:13px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:background .15s,border-color .15s}
    .tp-btn:hover{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-border-l1)}
    .tp-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-btn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
    .tp-btn-primary:hover{background:var(--dsw-alias-brand-primary);opacity:.9}
    .tp-input{box-sizing:border-box;flex:1;min-width:0;height:34px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:10px;padding:0 12px;font:inherit;font-size:14px;outline:none;transition:border-color .15s}
    .tp-input::placeholder{color:var(--dsw-alias-label-secondary)}
    .tp-input:focus{border-color:var(--dsw-alias-brand-primary)}
    .tp-search-group{flex:none;display:flex;align-items:center;gap:12px}
    .tp-search{position:relative;display:flex;align-items:center;gap:8px;width:clamp(150px,26vw,260px)}
    .tp-search-toggle{flex:none;display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none;white-space:nowrap}
    .tp-search-toggle:hover{color:var(--dsw-alias-label-primary)}
    .tp-search-check{width:14px;height:14px;margin:0;accent-color:var(--dsw-alias-brand-primary);cursor:pointer}
    .tp-search-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-tab.is-filtered .tp-tab-count{opacity:.9}
    .tp-head-title{flex:1;min-width:0}
    .tp-search-glyph{position:absolute;left:11px;display:inline-flex;color:var(--dsw-alias-label-secondary);pointer-events:none}
    .tp-search-input{padding-left:32px;padding-right:30px}
    .tp-search-input::-webkit-search-cancel-button{display:none}
    .tp-search-clear{position:absolute;right:5px}
    .tp-group{border:.5px solid var(--dsw-alias-border-l2);border-radius:14px;background:var(--dsw-alias-bg-layer-1);margin-bottom:14px;overflow:hidden;scroll-margin-top:16px}
    .tp-group-head{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:center;gap:12px;padding:8px 12px;border-bottom:.5px solid var(--dsw-alias-border-l1)}
    .tp-group-side{display:flex;align-items:center;min-width:0}
    .tp-group-side-left{justify-content:flex-start}
    .tp-group-side-right{justify-content:flex-end}
    .tp-group-center{display:flex;align-items:center;justify-content:center;min-width:0}
    .tp-group-title{min-width:0;margin:0;text-align:center;font-size:15px;font-weight:600;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .tp-icon-btn{flex:none;width:26px;height:26px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0}
    .tp-icon-btn:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary)}
    .tp-icon-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-todos{list-style:none;margin:0;padding:6px}
    .tp-todo{display:flex;align-items:flex-start;gap:10px;padding:8px;border-radius:10px}
    .tp-todo:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-check{flex:none;width:18px;height:18px;margin-top:2px;border-radius:50%;border:1.5px solid var(--dsw-alias-border-l1);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;color:#fff}
    .tp-check.is-done{background:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
    .tp-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-todo-text{flex:1;min-width:0;overflow-wrap:anywhere;font-size:14px;line-height:22px}
    .tp-editable{cursor:text;border-radius:4px;padding:1px 3px;margin:-1px -3px}
    .tp-editable:hover{background:var(--dsw-alias-bg-base);box-shadow:0 0 0 1px var(--dsw-alias-border-l1)}
    .tp-edit-input{height:28px;font-size:14px;padding:0 8px;margin:-3px 0}
    .tp-edit-btn{opacity:0;transition:opacity .12s}
    .tp-todo:hover .tp-edit-btn,.tp-edit-btn:focus-visible{opacity:1}
    .tp-todo.is-done .tp-todo-text{color:var(--dsw-alias-label-secondary);text-decoration:line-through}
    .tp-locked{cursor:default}
    .tp-add-inline{display:flex;align-items:center;gap:6px;min-width:0;max-width:100%}
    .tp-add-inline .tp-input{height:30px;font-size:13px;padding:0 10px;width:clamp(80px,14vw,150px);min-width:0;flex:1}
    .tp-add-inline .tp-btn{height:30px;padding:0 10px;font-size:13px;flex:none}
    .tp-empty{padding:26px 16px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px}
    .tp-empty strong{display:block;margin-bottom:4px;color:var(--dsw-alias-label-primary);font-weight:500}
    .tp-muted{color:var(--dsw-alias-label-secondary)}
    .tp-tabs{display:flex;align-items:center;gap:4px;padding:0}
    .tp-tab{height:28px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;cursor:pointer;padding:0 10px;border-radius:14px;display:inline-flex;align-items:center;gap:6px}
    .tp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-tab.is-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .tp-tab:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-tab-count{color:var(--dsw-alias-label-secondary);font-size:12px;font-variant-numeric:tabular-nums}
    .tp-todo-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
    .tp-entry{padding-left:12px}
    .tp-todo.is-draggable{cursor:grab}
    .tp-todo.is-draggable:active{cursor:grabbing}
    .tp-todo.is-dragging{opacity:.45}
    .tp-todo.is-drop-target{box-shadow:inset 0 2px 0 0 var(--dsw-alias-brand-primary)}
    .tp-row-grip{flex:none;width:10px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:22px;opacity:0;transition:opacity .12s}
    .tp-todo:hover .tp-row-grip,.tp-todo.is-dragging .tp-row-grip{opacity:1}
    .tp-todo-time{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px}
    .tp-nav-trash{margin-top:6px;padding-top:9px;border-top:.5px solid var(--dsw-alias-border-l1);border-radius:0 0 8px 8px}
    .tp-nav-trash-icon{flex:none;display:inline-flex;align-items:center;color:var(--dsw-alias-label-secondary)}
    .tp-head-row{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
    .tp-head-row .tp-head-actions{align-self:center}
    .tp-head-actions{display:flex;align-items:center;gap:8px;flex:none}
    .tp-btn-sm{height:28px;padding:0 10px;font-size:12px;border-radius:8px}
    .tp-btn-danger{color:var(--dsw-alias-state-error-primary)}
    .tp-btn-danger:hover{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
    .tp-trash-list{padding:0;display:flex;flex-direction:column;gap:2px}
    .tp-trash-row{align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:var(--dsw-alias-bg-layer-1);border:.5px solid var(--dsw-alias-border-l1)}
    .tp-trash-row:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-trash-title{display:flex;align-items:center;gap:6px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px}
    .tp-trash-kind{border-radius:6px;padding:0 6px;background:var(--dsw-alias-bg-base)}
    .tp-trash-project{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    /* Status line for export/import: floats over the pane so nothing shifts. */
    .tp-pane{position:relative}
    .tp-notice{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);max-width:min(520px,calc(100% - 32px));display:flex;align-items:center;gap:10px;padding:8px 8px 8px 14px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);box-shadow:0 6px 20px rgba(0,0,0,.12);font-size:13px;line-height:18px;color:var(--dsw-alias-label-primary);z-index:2}
    .tp-notice.is-error{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
    .tp-notice-text{flex:1;min-width:0}
    .tp-notice-close{flex:none}
    .tp-notice.is-error .tp-notice-close:hover{color:var(--dsw-alias-state-error-primary)}
    `;

    /* ---------------------------------------------------------------------- */
    /* src/icons.js                                                           */
    /* ---------------------------------------------------------------------- */
    /**
     * Inline SVG icons. Every icon takes `size` and inherits `currentColor`; each is
     * drawn from the plugin's own paths, so no external assets are loaded.
     */

    function CheckIcon({ size = 12 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M3 8.5l3 3 7-7', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function PlusIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M8 3v10M3 8h10', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
    }

    function TrashIcon({ size = 14 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M2.5 4h11M6 4V2.5h4V4M4 4l.7 9a1 1 0 001 .9h4.6a1 1 0 001-.9L12 4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function PencilIcon({ size = 14 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M11.2 2.6a1.2 1.2 0 011.7 0l.5.5a1.2 1.2 0 010 1.7L5.6 12.6l-2.4.6.6-2.4 7.4-7.4z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinejoin: 'round' }),
        h('path', { d: 'M10.3 3.5l2.2 2.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }));
    }

    function SearchIcon({ size = 14 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('circle', { cx: 7, cy: 7, r: 4.3, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }),
        h('path', { d: 'M10.3 10.3L14 14', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
    }

    function CloseIcon({ size = 12 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M4 4l8 8M12 4l-8 8', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }

    /** Sidebar glyph: the checklist mark supplied to `sidebar.panellist`. */
    function TodoIcon({ size = 18 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', 'aria-hidden': true, style: { display: 'block' } },
        h('path', { d: 'M4 7.5l2 2 3.5-4', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M4 16.5l2 2 3.5-4', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', opacity: 0.55 }),
        h('path', { d: 'M12 8h8M12 17h8', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }));
    }

    /** Download arrow into a tray: "export". */
    function DownloadIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M8 2.5v7.5M5 7.2l3 3 3-3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M2.8 12.6h10.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
    }

    /** Tray with an upward arrow: "import". */
    function UploadIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M8 10.5V3M5 5.8l3-3 3 3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M2.8 12.6h10.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
    }

    /* ---------------------------------------------------------------------- */
    /* src/format.js                                                          */
    /* ---------------------------------------------------------------------- */
    /**
     * Date rendering. Timestamps are stored as ISO strings (UTC) and shown in the
     * viewer's own locale and time zone.
     */

    /** Local "YYYY/MM/DD HH:mm"-style stamp, or '' when the value is unusable. */
    function formatTime(iso) {
      try {
        const date = new Date(iso);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleString(undefined, {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit',
        });
      } catch (e) {
        return '';
      }
    }

    /** Current time as the ISO string written into `completedAt` / `deletedAt`. */
    function now() {
      return new Date().toISOString();
    }

    /* ---------------------------------------------------------------------- */
    /* src/board-ops.js                                                       */
    /* ---------------------------------------------------------------------- */
    /**
     * Pure state transitions.
     *
     * Every function takes the previous state and returns the next one; nothing here
     * reads React, the DOM or the network. `TodoPage` passes them to `setState`, so
     * the data rules stay testable on their own and the page only handles wiring.
     */

    /** A note (plain text, no checkbox) rather than a todo. */
    const isEntry = (item) => item.kind === KIND_ENTRY;

    /** Key used for drafts, tabs and group anchors: project id or the default slot. */
    const groupKey = (projectId) => projectId || NO_PROJECT;

    /** Resolve a project id to the group it belongs to (null = default group). */
    const projectIdOf = (item) => item.projectId || null;

    /** Items belonging to one group, todos and notes alike. */
    const itemsOf = (state, projectId) =>
      state.todos.filter((item) => projectIdOf(item) === (projectId || null));

    /** Append a new todo or note to the group. */
    function addItem(state, projectId, kind, text) {
      const item = {
        id: uid(),
        text,
        kind,
        done: false,
        completedAt: null,
        projectId: projectId || null,
      };
      return { ...state, todos: state.todos.concat(item) };
    }

    /** Check a todo off (stamping `completedAt`) or reopen it (clearing it). */
    function toggleTodo(state, id) {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          const done = !todo.done;
          // Record the finish time; clear it when the todo is reopened.
          return { ...todo, done, completedAt: done ? now() : null };
        }),
      };
    }

    /** Replace an item's text. Blank text is rejected by the caller. */
    function renameItem(state, id, text) {
      return {
        ...state,
        todos: state.todos.map((item) => (item.id === id ? { ...item, text } : item)),
      };
    }

    /**
     * Move one item to the recycle bin, keeping its project, position and full
     * record so it can be restored later.
     */
    function moveItemToTrash(state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      if (index === -1) return state;
      const item = state.todos[index];
      const project = state.projects.find((p) => p.id === projectIdOf(item));
      const record = {
        id: item.id,
        kind: isEntry(item) ? KIND_ENTRY : KIND_TODO,
        text: item.text,
        deletedAt: now(),
        projectId: projectIdOf(item),
        projectName: project ? project.name : null,
        index,
        item,
      };
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== id),
        trash: [record, ...state.trash],
      };
    }

    /** Append a project created from a (trimmed, non-empty) name. */
    function createProject(state, name) {
      return { ...state, projects: state.projects.concat({ id: uid(), name }) };
    }

    /**
     * Deleting a project moves the project and every item it held into the recycle
     * bin as one record, so one restore brings the whole group back.
     */
    function moveProjectToTrash(state, project) {
      const items = state.todos.filter((todo) => projectIdOf(todo) === project.id);
      const record = {
        id: project.id,
        kind: 'project',
        text: project.name,
        deletedAt: now(),
        index: state.projects.findIndex((p) => p.id === project.id),
        project,
        items,
      };
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== project.id),
        todos: state.todos.filter((todo) => projectIdOf(todo) !== project.id),
        trash: [record, ...state.trash],
      };
    }

    /** Put a recycle-bin record back where it came from. */
    function restoreRecord(state, record) {
      const trash = state.trash.filter((entry) => entry.id !== record.id);
      if (record.kind === 'project') {
        const projects = state.projects.slice();
        const at = Math.min(Math.max(record.index ?? projects.length, 0), projects.length);
        projects.splice(at, 0, record.project);
        return {
          ...state,
          projects,
          todos: state.todos.concat(record.items || []),
          trash,
        };
      }
      const item = { ...record.item };
      // If its project is gone, land in the default group instead of vanishing.
      if (item.projectId && !state.projects.some((p) => p.id === item.projectId)) item.projectId = null;
      const todos = state.todos.slice();
      const at = Math.min(Math.max(record.index ?? todos.length, 0), todos.length);
      todos.splice(at, 0, item);
      return { ...state, todos, trash };
    }

    /** Drop one record from the recycle bin for good. */
    function deleteForever(state, record) {
      return { ...state, trash: state.trash.filter((entry) => entry.id !== record.id) };
    }

    /** Drop every record in the recycle bin. */
    function emptyTrash(state) {
      return { ...state, trash: [] };
    }

    /** Whether two items may sit in the same list: same group and same kind. */
    const sameList = (a, b) =>
      projectIdOf(a) === projectIdOf(b) && isEntry(a) === isEntry(b);

    /**
     * Drag-and-drop: take the dragged item's slot and insert it where the drop
     * target sat. Cross-list drops are ignored.
     */
    function reorderItem(state, sourceId, targetId) {
      if (!sourceId || !targetId || sourceId === targetId) return state;
      const from = state.todos.findIndex((item) => item.id === sourceId);
      const to = state.todos.findIndex((item) => item.id === targetId);
      if (from === -1 || to === -1) return state;
      if (!sameList(state.todos[from], state.todos[to])) return state;
      const next = state.todos.slice();
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return { ...state, todos: next };
    }

    /**
     * Drag-and-drop: move the dragged project to the drop target's slot. Dropping a
     * row on itself (or ending outside any row) keeps the order.
     */
    function reorderProject(state, sourceId, targetId) {
      if (!sourceId || !targetId || sourceId === targetId) return state;
      const from = state.projects.findIndex((p) => p.id === sourceId);
      const to = state.projects.findIndex((p) => p.id === targetId);
      if (from === -1 || to === -1) return state;
      const projects = state.projects.slice();
      const [moved] = projects.splice(from, 1);
      projects.splice(to, 0, moved);
      return { ...state, projects };
    }

    /** Groups for the board and the nav: the fixed default group first. */
    function groupList(state, defaultName) {
      return [{ id: null, name: defaultName, hint: '' }]
        .concat(state.projects.map((p) => ({ id: p.id, name: p.name })));
    }

    /* ---------------------------------------------------------------------- */
    /* src/components/row.js                                                  */
    /* ---------------------------------------------------------------------- */
    /**
     * One todo or note row, and the inline editor it swaps in.
     *
     * Rows are draggable to reorder within their own list (same group, same kind).
     * Clicking the text of a todo opens the editor; completed todos are read-only.
     */

    /**
     * Completed todos cannot be renamed: the checkbox has to be reopened first.
     * Notes carry no `done`, so they are always editable.
     */
    const canEdit = (item) => !item.done;

    /**
     * Row text. While that row is being edited it becomes an input; otherwise it is
     * a span that opens the editor on double-click, or a locked span when read-only.
     *
     * @param {object} item the todo or note
     * @param {object} api  { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t }
     */
    function editableText(item, api) {
      const { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t } = api;
      if (editingId === item.id && canEdit(item)) {
        return h('input', {
          className: 'tp-input tp-edit-input',
          type: 'text',
          autoFocus: true,
          value: editDraft,
          onChange: (event) => setEditDraft(event.target.value),
          onKeyDown: (event) => {
            if (event.key === 'Enter') { event.preventDefault(); commitEdit(); }
            if (event.key === 'Escape') { event.preventDefault(); cancelEdit(); }
          },
          onBlur: commitEdit,
          // Text selection inside the field must not start a row drag.
          onMouseDown: (event) => event.stopPropagation(),
          'aria-label': t('editHint'),
        });
      }
      if (!canEdit(item)) {
        return h('span', {
          className: 'tp-todo-text tp-locked',
          title: t('editLocked'),
        }, item.text);
      }
      return h('span', {
        className: 'tp-todo-text tp-editable',
        title: t('editHint'),
        onDoubleClick: () => startEdit(item),
      }, item.text);
    }

    /** A plain note: no checkbox, just a grip, text, edit and delete. */
    function renderEntry(item, api) {
      return h('li', {
        key: item.id,
        className: 'tp-todo tp-entry is-draggable' + api.itemDragClass(item),
        ...api.itemDragProps(item),
      },
        h('span', { className: 'tp-row-grip', 'aria-hidden': true }, '⠿'),
        h('div', { className: 'tp-todo-main' },
          editableText(item, api)),
        h('button', {
          type: 'button',
          className: 'tp-icon-btn tp-edit-btn',
          'aria-label': api.t('edit'),
          title: api.t('edit'),
          onClick: () => api.startEdit(item),
        }, h(PencilIcon, { size: 13 })),
        h('button', {
          type: 'button',
          className: 'tp-icon-btn',
          'aria-label': api.t('delete'),
          title: api.t('delete'),
          onClick: () => api.removeTodo(item.id),
        }, h(TrashIcon, { size: 14 })));
    }

    /** A todo: checkbox, text, finish time when done, edit (if allowed) and delete. */
    function renderTodo(todo, api) {
      const { t } = api;
      return h('li', {
        key: todo.id,
        className: 'tp-todo is-draggable' + (todo.done ? ' is-done' : '') + api.itemDragClass(todo),
        ...api.itemDragProps(todo),
      },
        h('span', { className: 'tp-row-grip', 'aria-hidden': true }, '⠿'),
        h('button', {
          type: 'button',
          className: 'tp-check' + (todo.done ? ' is-done' : ''),
          'aria-label': todo.done ? t('reopen') : t('complete'),
          'aria-pressed': todo.done,
          onClick: () => api.toggleTodo(todo.id),
        }, todo.done ? h(CheckIcon, { size: 12 }) : null),
        h('div', { className: 'tp-todo-main' },
          editableText(todo, api),
          todo.done && todo.completedAt
            ? h('span', { className: 'tp-todo-time' }, t('completedAt').replace('{time}', formatTime(todo.completedAt)))
            : null),
        canEdit(todo) ? h('button', {
          type: 'button',
          className: 'tp-icon-btn tp-edit-btn',
          'aria-label': t('edit'),
          title: t('edit'),
          onClick: () => api.startEdit(todo),
        }, h(PencilIcon, { size: 13 })) : null,
        h('button', {
          type: 'button',
          className: 'tp-icon-btn',
          'aria-label': t('delete'),
          title: t('delete'),
          onClick: () => api.removeTodo(todo.id),
        }, h(TrashIcon, { size: 14 })));
    }

    /** Dispatch one item to the matching row renderer. */
    function renderRow(item, api) {
      return isEntry(item) ? renderEntry(item, api) : renderTodo(item, api);
    }

    /* ---------------------------------------------------------------------- */
    /* src/components/group.js                                                */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
    /* src/components/nav.js                                                  */
    /* ---------------------------------------------------------------------- */
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
      const { t, exporting, exportData, importFile, importing } = api;

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

    /* ---------------------------------------------------------------------- */
    /* src/components/search.js                                               */
    /* ---------------------------------------------------------------------- */
    /**
     * Search field in the title row, plus the "include completed" switch beside it.
     *
     * Typing filters the board in place: rows and groups that do not match are
     * hidden, and the completed todos join the results only when the box is ticked.
     * Escape or the clear button resets the query.
     */

    /**
     * @param {object} api { t, query, setQuery, includeDone, setIncludeDone }
     */
    function renderSearch(api) {
      const { t, query, setQuery, includeDone, setIncludeDone } = api;

      return h('div', { className: 'tp-search-group' },
        h('div', { className: 'tp-search' },
          h('span', { className: 'tp-search-glyph', 'aria-hidden': true }, h(SearchIcon, { size: 14 })),
          h('input', {
            className: 'tp-input tp-search-input',
            type: 'search',
            value: query,
            placeholder: t('searchPlaceholder'),
            onChange: (event) => setQuery(event.target.value),
            onKeyDown: (event) => {
              if (event.key === 'Escape') { event.preventDefault(); setQuery(''); }
            },
            'aria-label': t('searchPlaceholder'),
          }),
          query
            ? h('button', {
                type: 'button',
                className: 'tp-icon-btn tp-search-clear',
                'aria-label': t('searchClear'),
                title: t('searchClear'),
                onClick: () => setQuery(''),
              }, h(CloseIcon, { size: 12 }))
            : null),
        h('label', { className: 'tp-search-toggle', title: t('searchIncludeDone') },
          h('input', {
            type: 'checkbox',
            className: 'tp-search-check',
            checked: includeDone,
            onChange: (event) => setIncludeDone(Boolean(event.target.checked)),
          }),
          h('span', null, t('searchIncludeDone'))));
    }

    /* ---------------------------------------------------------------------- */
    /* src/components/trash.js                                                */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
    /* src/page.js                                                            */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
    /* src/plugin.js                                                          */
    /* ---------------------------------------------------------------------- */
    /**
     * Plugin wiring: registers the locale dictionaries, the stylesheet, the sidebar
     * icon and the page. Everything is owned by an effect, so unloading the plugin
     * (or collapsing the sidebar) removes what `apply` added.
     */
    const plugin = {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { en, zh }), 'dsh-todo: dictionaries');
        ctx.effect(() => {
          const style = document.createElement('style');
          style.setAttribute('data-dsh-todo', '');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => { style.remove(); };
        }, 'dsh-todo: styles');

        const t = ctx.locale.bind(NS);

        // The page: same key as the sidebar icon, so the icon opens this panel.
        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
          inject: () => ({ t }),
        }, TodoPage));

        // The sidebar icon, rendered inside the global panel list.
        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: PANEL_ORDER,
          label: () => t('panel'),
        }, function TodoPanelIcon({ size }) {
          return h(TodoIcon, { size });
        }));
      },
    };

    return plugin;
  },
});

