/**
 * Client half of the dsh-todo bundle (sidebar panel "todos").
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
    const NS = 'dshTodo';

    /** Panellist order among the shipped sidebar icons. */
    const PANEL_ORDER = 20;

    /** Host route that reads and writes the JSON data file. */
    const STATE_URL = '/api/dsh-todo';

    /** Host routes for the manual snapshot and the full restore. */
    const BACKUP_URL = '/api/dsh-todo/backup';
    const RESTORE_URL = '/api/dsh-todo/restore';

    /** Host route that removes one manual snapshot. */
    const DELETE_BACKUP_URL = '/api/dsh-todo/delete';

    /** Stable key for the fixed "Default" group (no project). */
    const NO_PROJECT = '__none__';

    /**
     * The four per-group tabs. `TAB_ALL` mixes open todos, completed todos and
     * notes, and is the only tab whose rows carry a kind badge.
     */
    const TAB_ALL = 'all';
    const TAB_ACTIVE = 'active';
    const TAB_DONE = 'done';
    const TAB_ENTRIES = 'entries';

    /** Item kinds. `entry` is a note: plain text, no checkbox. */
    const KIND_TODO = 'todo';
    const KIND_ENTRY = 'entry';

    /**
     * Text rows the inline editor opens with. An item may span many lines, so the
     * field shows three of them and scrolls beyond that instead of growing, which
     * keeps a row's height predictable while editing. A shorter item gets a shorter
     * field: the editor is sized to the text, never taller than this.
     */
    const EDIT_ROWS = 3;

    /**
     * Rows a single page of a group tab holds. A group that has grown past this is
     * paged rather than scrolled: a tab of forty finished todos pushes every other
     * project off the screen, and the four tab counts stop meaning anything once
     * the list under them is a wall. Ten is about what fits above the fold.
     */
    const PAGE_SIZE = 10;

    /**
     * Build stamp shown next to the panel title. Bump it on every shipped change:
     * the panel is served as an immutable bundle picked by file metadata, so when
     * a fix "does not apply" this number says whether the browser got the new code
     * at all. It is a diagnostic, not a release number.
     */
    const BUILD = '2026-11-12.3';

    /* ---------------------------------------------------------------------- */
    /* src/locale/en.js                                                       */
    /* ---------------------------------------------------------------------- */
    /**
     * English copy. Keys must stay in step with `zh.js`.
     *
     * `{name}`, `{count}`, `{time}` and `{query}` are replaced by the caller.
     */
    const en = {
      panel: 'Todos',
      title: 'Todos',
      subtitle: 'Todos and notes, organized by project.',
      noProject: 'Default',
      noProjectHint: 'Todos that belong to no project.',
      newProject: 'New project',
      projectNamePlaceholder: 'Project name',
      create: 'Create',
      cancel: 'Cancel',
      addTodoPlaceholder: 'Add a todo — Ctrl+Enter saves',
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
      tabAll: 'All',
      tabActive: 'Active',
      tabDone: 'Completed',
      tabEntries: 'Notes',
      showDoneInAll: 'Completed',
      kindTodo: 'Todo',
      kindNote: 'Note',
      allEmpty: 'This group is still empty',
      allEmptyHint: 'Todos and notes both show up here.',
      entriesEmpty: 'No notes yet',
      entriesEmptyHint: 'Notes added here stay as plain text, shown without a checkbox.',
      addNotePlaceholder: 'Add a note — Ctrl+Enter saves',
      addNote: 'Add note',
      activeEmpty: 'Nothing active here',
      activeEmptyHint: 'Add a todo below, or check off the ones you finished.',
      doneEmpty: 'Nothing completed yet',
      doneEmptyHint: 'Completed todos will appear here with a finish time.',
      completedAt: 'Completed {time}',
      navTitle: 'Jump to',
      navEmpty: 'No projects yet',
      dragToReorder: 'Drag to reorder',
      dragToDelete: 'Drop here to delete',
      dragToDeleteNamed: 'Release to delete “{name}”',
      dragToArchive: 'Drop here to archive',
      dragToArchiveNamed: 'Release to archive “{name}”',
      dueView: 'Deadlines',
      dueViewHint: 'Every open todo that has a deadline, ordered by date.',
      dueViewHintCount: '{count} items, {overdue} of them late.',
      dueViewEmpty: 'No deadlines set',
      dueViewEmptyHint: 'Use the calendar icon at the end of an open todo to set one.',
      dueJumpHint: 'Jump to “{name}”',
      dueGroupOverdue: 'Overdue',
      dueGroupToday: 'Due today',
      dueGroupWeek: 'Within a week',
      dueGroupLater: 'Later',
      dueGroupNone: 'No due date',
      pagePrev: 'Previous page',
      pageNext: 'Next page',
      pageOf: 'Page {page} of {pages}',
      backups: 'Backups',
      backupPageHint: 'Take a manual snapshot, or restore any snapshot. A restore replaces everything.',
      backupNow: 'Back up now',
      backupNowHint: 'Save the current content as a snapshot that never expires.',
      backingUp: 'Backing up…',
      backupKindManual: 'Manual',
      backupKindAuto: 'Auto',
      backupManual: 'Manual backups',
      backupManualHint: 'Created when you press the button. Never pruned.',
      backupAuto: 'Automatic backups',
      backupAutoHint: 'Written before the first save of each day. The newest {keep} are kept.',
      backupNone: 'No backups yet',
      backupNoneHint: 'Press “Back up now” to create the first one.',
      backupBroken: 'Unreadable file',
      backupDelete: 'Delete this backup',
      backupDeleteConfirm: 'Delete',
      backupDeleting: 'Deleting…',
      backupDeleted: 'Backup deleted: {name}',
      backupDone: 'Backup created: {name}',
      backupFailed: 'The backup request failed. Check that the service is running.',
      restore: 'Restore',
      restoreHint: 'Replace everything with this snapshot',
      restoring: 'Restoring…',
      restoreConfirm: 'Replace everything with the backup from {when}?\n\nThe current content is snapshotted as a manual backup first.',
      restoreDone: 'Restored from the backup of {when}: {count} items.',
      restoreMissing: 'That backup file is gone. Refresh the page and try again.',
      archive: 'Archive',
      archiveHint: 'Archived projects leave the board. Their items and completion state are kept. Drag a project row onto the archive zone to move it here.',
      unarchive: 'Unarchive',
      unarchiveHint: 'Put the project back on the board',
      archiveNothing: 'Nothing archived yet',
      archiveNothingHint: 'Drag a project row onto the archive zone in the sidebar to move it here.',
      archiveEmpty: 'This project has no items',
      archiveEmptyHint: 'It was already empty when it was archived.',
      archiveOpenCount: '{count} open',
      archiveOverdueCount: '{count} overdue',
      dataFolder: 'Data folder',
      dataLocation: 'Data file: {dataFile}\nBackups: {backupDir}',
      dueSet: 'Set a deadline',
      dueChange: 'Deadline: {date} (click to change)',
      dueClear: 'Clear the deadline',
      dueTitle: 'Deadline: {date}',
      dueToday: 'Today',
      dueTomorrow: 'Tomorrow',
      dueInDaysOne: '1 day left',
      dueOverdueOne: '1 day late',
      dueInDays: '{count} days left',
      dueOverdue: '{count} days late',
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
      sync: 'Sync',
      syncHint: 'Write the current content to the JSON data file now. Changes save automatically; this button confirms the write.',
      syncDone: 'Synced to the JSON file: {projects} projects, {items} items, {trash} recycle-bin records.',
      syncFailed: 'Sync failed. Check that the service is running.',
      import: 'Import',
      importHint: 'Add projects and items from a JSON backup file. Existing items are kept.',
      importDone: 'Imported {projects} projects, {items} items and {trash} recycle-bin records.',
      importInvalid: 'That file is not a dsh-todo backup.',
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
      panel: '待办',
      title: '待办',
      subtitle: '按项目分组的待办与笔记。',
      noProject: '默认',
      noProjectHint: '不属于任何项目的待办。',
      newProject: '新建项目',
      projectNamePlaceholder: '项目名称',
      create: '创建',
      cancel: '取消',
      addTodoPlaceholder: '添加待办，Ctrl+回车保存',
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
      tabAll: '全部',
      tabActive: '未完成',
      tabDone: '已完成',
      tabEntries: '笔记',
      showDoneInAll: '包含已完成',
      kindTodo: '待办',
      kindNote: '笔记',
      allEmpty: '这一组还是空的',
      allEmptyHint: '待办和笔记都会显示在这里。',
      entriesEmpty: '还没有笔记',
      entriesEmptyHint: '在这里添加的笔记是普通文字，不显示复选框。',
      addNotePlaceholder: '添加笔记，Ctrl+回车保存',
      addNote: '添加笔记',
      activeEmpty: '暂无未完成待办',
      activeEmptyHint: '在下方添加一条待办，或勾选已完成的项。',
      doneEmpty: '还没有已完成的待办',
      doneEmptyHint: '完成后的待办会连同完成时间显示在这里。',
      completedAt: '完成于 {time}',
      navTitle: '快速跳转',
      navEmpty: '还没有项目',
      dragToReorder: '拖动以排序',
      dragToDelete: '拖到这里删除',
      dragToDeleteNamed: '松开即删除“{name}”',
      dragToArchive: '拖到这里归档',
      dragToArchiveNamed: '松开即归档“{name}”',
      dueView: '截止日期',
      dueViewHint: '所有设了截止日期的未完成待办，按日期排序。',
      dueViewHintCount: '共 {count} 项，其中逾期 {overdue} 项。',
      dueViewEmpty: '没有设截止日期的待办',
      dueViewEmptyHint: '在未完成待办的行尾点日历图标就能设一个。',
      dueJumpHint: '跳到「{name}」',
      dueGroupOverdue: '已逾期',
      dueGroupToday: '今天到期',
      dueGroupWeek: '一周内',
      dueGroupLater: '更晚',
      dueGroupNone: '未设截止日期',
      pagePrev: '上一页',
      pageNext: '下一页',
      pageOf: '第 {page} / {pages} 页',
      backups: '备份',
      backupPageHint: '手动留一份快照，或从任意一份快照恢复。恢复会覆盖当前全部内容。',
      backupNow: '立即备份',
      backupNowHint: '把当前内容另存为一份不会过期的快照。',
      backingUp: '备份中…',
      backupKindManual: '手动',
      backupKindAuto: '自动',
      backupManual: '手动备份',
      backupManualHint: '点击备份时创建，不会自动清理。',
      backupAuto: '自动备份',
      backupAutoHint: '每天第一次写入前自动生成，只保留最新 {keep} 份。',
      backupNone: '还没有备份',
      backupNoneHint: '点右上角的「立即备份」创建第一份。',
      backupBroken: '文件损坏，无法恢复',
      backupDelete: '删除这份备份',
      backupDeleteConfirm: '确认删除',
      backupDeleting: '删除中…',
      backupDeleted: '已删除备份：{name}',
      backupDone: '已创建备份：{name}',
      backupFailed: '备份操作失败，请检查服务是否在运行。',
      restore: '恢复',
      restoreHint: '用这份快照覆盖当前全部内容',
      restoring: '恢复中…',
      restoreConfirm: '要用 {when} 的备份覆盖当前全部内容吗？\n\n恢复前会自动把现在的内容存成一份手动备份。',
      restoreDone: '已从 {when} 的备份恢复，共 {count} 个条目。',
      restoreMissing: '这份备份文件已经不在了，刷新页面再看看。',
      archive: '归档',
      archiveHint: '归档的项目不显示在看板上，条目和完成状态都保留。把导航里的项目行拖到归档区域即可移入。',
      unarchive: '取消归档',
      unarchiveHint: '把项目放回看板',
      archiveNothing: '还没有归档的项目',
      archiveNothingHint: '把项目行拖到左侧导航的归档区域，项目会移到这里。',
      archiveEmpty: '这个项目没有条目',
      archiveEmptyHint: '它在归档时就是空的。',
      archiveOpenCount: '未完成 {count}',
      archiveOverdueCount: '逾期 {count}',
      dataFolder: '数据目录',
      dataLocation: '数据文件：{dataFile}\n备份目录：{backupDir}',
      dueSet: '设置截止日期',
      dueChange: '截止日期：{date}（点击修改）',
      dueClear: '清除截止日期',
      dueTitle: '截止日期：{date}',
      dueToday: '今天',
      dueTomorrow: '明天',
      dueInDaysOne: '还有 1 天',
      dueOverdueOne: '逾期 1 天',
      dueInDays: '{count} 天后',
      dueOverdue: '逾期 {count} 天',
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
      sync: '同步',
      syncHint: '立刻把当前内容写入 JSON 数据文件。改动本来就会自动保存，这个按钮用于确认写入成功。',
      syncDone: '已同步到 JSON 文件：{projects} 个项目、{items} 个条目、{trash} 条回收站记录。',
      syncFailed: '同步失败，请检查服务是否在运行。',
      import: '导入',
      importHint: '从 JSON 备份文件导入项目与条目，已有内容会保留。',
      importDone: '已导入 {projects} 个项目、{items} 个条目和 {trash} 条回收站记录。',
      importInvalid: '这个文件不是待办（dsh-todo）的备份文件。',
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

    /**
     * A new state with nothing in it.
     *
     * `includeDone` is a preference, not data, but it lives in the same file: it
     * decides whether the combined "All" tab lists finished todos, and that is a
     * per-user choice worth keeping across reloads.
     */
    function emptyState() {
      return { projects: [], todos: [], trash: [], includeDone: true };
    }

    /** Coerce whatever came back from disk into the shape the page expects. */
    function normalizeState(parsed) {
      return {
        // `archived` is a flag on the project itself: an archived project keeps its
        // items and its position, it just leaves the board for the archive view.
        projects: Array.isArray(parsed && parsed.projects) ? parsed.projects : [],
        // `due` is a calendar day ("2026-11-06"), kept on the todo beside the text.
        todos: Array.isArray(parsed && parsed.todos) ? parsed.todos : [],
        // The recycle bin: deleted items and projects kept for restoring.
        trash: Array.isArray(parsed && parsed.trash) ? parsed.trash : [],
        // A file written before this flag existed has no value; default to showing
        // finished todos, which is what those versions did.
        includeDone: !(parsed && parsed.includeDone === false),
      };
    }

    function emptyMeta() {
      return { dataDir: '', dataFile: '', backupDir: '', keep: 7, backups: [] };
    }

    /**
     * Where the Host keeps the data. It rides along with the state response; an
     * older Host answers with just the state, so this is always optional.
     */
    function readMeta(data) {
      const meta = data && data.meta;
      if (!meta || typeof meta !== 'object') return emptyMeta();
      return {
        dataDir: typeof meta.dataDir === 'string' ? meta.dataDir : '',
        dataFile: typeof meta.dataFile === 'string' ? meta.dataFile : '',
        backupDir: typeof meta.backupDir === 'string' ? meta.backupDir : '',
        keep: typeof meta.keep === 'number' ? meta.keep : 7,
        // `{ name, kind, stamp, ok, size }`, newest first. Anything else in the
        // folder is not a backup and never reaches the list.
        backups: Array.isArray(meta.backups) ? meta.backups : [],
      };
    }

    /** Stable unique id for a project or an item. */
    function uid() {
      try {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
      } catch (e) { /* ignore */ }
      return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    /**
     * Read the stored state. A missing file or a network error yields empty state.
     *
     * Returns the state with its `meta` already reduced to strings, so the caller
     * can show the data folder without re-checking the response shape.
     */
    async function loadState() {
      try {
        const res = await fetch(STATE_URL, { method: 'GET', headers: { accept: 'application/json' } });
        if (!res.ok) return { ...emptyState(), meta: emptyMeta() };
        const data = await res.json();
        return { ...normalizeState(data), meta: readMeta(data) };
      } catch (e) {
        return { ...emptyState(), meta: emptyMeta() };
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

    /**
     * The same request, but it reports what happened.
     *
     * `saveState` above is fire-and-forget: it runs on every keystroke-level change
     * and a transient failure would only produce noise. The sync button is a
     * deliberate, user-initiated action, so it needs a real answer to show.
     *
     * @param {object} state the state to write
     * @returns {Promise<{ ok: boolean, error?: string }>} `error` is a locale key
     */
    async function syncState(state) {
      try {
        const res = await fetch(STATE_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(state),
        });
        if (!res || !res.ok) return { ok: false, error: 'syncFailed' };
        let meta = emptyMeta();
        try {
          meta = readMeta(await res.json());
        } catch (e) { /* an older Host answers with a bare { ok: true } */ }
        return { ok: true, meta };
      } catch (e) {
        return { ok: false, error: 'syncFailed' };
      }
    }

    /**
     * Ask the Host for a manual snapshot now.
     *
     * Unlike the automatic daily one, this never expires: it is the copy to take
     * before doing something large. The Host copies the file it has on disk, and the
     * Client saves on every change, so "now" really is now.
     *
     * @returns {Promise<{ ok: boolean, error?: string, meta?: object }>}
     */
    async function createBackup() {
      return postJson(BACKUP_URL, {});
    }

    /**
     * Replace everything with one snapshot.
     *
     * This is the destructive one, on purpose: the client checks with the user and
     * the Host snapshots the current content first, so the restored state can be
     * undone by restoring that snapshot.
     *
     * @param {string} name backup file name from `meta.backups`
     * @returns {Promise<{ ok: boolean, error?: string, state?: object, meta?: object }>}
     */
    async function restoreBackup(name) {
      return postJson(RESTORE_URL, { name });
    }

    /**
     * Remove one manual snapshot from the backups folder.
     *
     * Only manual ones: the automatic daily files rotate on their own, and deleting
     * those from the panel would remove the safety net rather than a copy the user
     * chose to keep.
     *
     * @param {string} name backup file name from `meta.backups`
     * @returns {Promise<{ ok: boolean, error?: string, meta?: object }>}
     */
    async function deleteBackup(name) {
      return postJson(DELETE_BACKUP_URL, { name });
    }

    /** Shared POST-to-Host helper for the backup routes. */
    async function postJson(url, body) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!res || !res.ok) {
          // 404 carries its own key so the panel can say "that file is gone"
          // instead of the generic failure.
          return { ok: false, error: res && res.status === 404 ? 'restoreMissing' : 'backupFailed' };
        }
        const data = await res.json();
        return {
          ok: true,
          state: data && data.state ? normalizeState(data.state) : null,
          safety: data && data.safety,
          backup: data && data.backup,
          meta: readMeta(data),
        };
      } catch (e) {
        return { ok: false, error: 'backupFailed' };
      }
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
     *     "format": "dsh-todo",
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

    const BACKUP_FORMAT = 'dsh-todo';
    const BACKUP_VERSION = 1;

    /** A file name that sorts by date: `dsh-todo-2024-05-01.json`. */
    function backupFileName(date = new Date()) {
      const pad = (n) => String(n).padStart(2, '0');
      return 'dsh-todo-' + date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) + '.json';
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
    /* Two drop zones for a dragged project, sharing one look: they only exist while
       a project is being dragged, and they collapse to nothing otherwise. Archive
       sits above delete, so the recoverable outcome is the one reached first. */
    .tp-nav-drop{display:none;margin:4px 8px 0;padding:8px 10px;align-items:center;gap:8px;border:.5px dashed var(--dsw-alias-border-l2);border-radius:10px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px;transition:border-color .12s,background .12s,color .12s}
    .tp-nav.is-dragging .tp-nav-drop{display:flex}
    .tp-nav-drop.is-hot{border-color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .tp-nav-drop.trash.is-hot{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}
    /* A hairline between the project rows and the cross-project views: the rows
       above are groups of items, the three below are ways of looking at all of them. */
    .tp-nav-sep{height:.5px;margin:6px 4px;background:var(--dsw-alias-border-l1)}

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
    .tp-nav-data{display:flex;gap:6px;margin:0 0 8px;padding:6px;border-radius:10px}
    /* The wash behind these buttons is the area's, so the buttons themselves stay
       transparent until hovered. */
    .tp-nav-data .tp-btn{background:transparent;border-color:transparent}
    .tp-nav-data .tp-btn:hover{background:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-border-l1)}
    .tp-nav-data-btn{flex:1;justify-content:center;min-width:0;height:30px;padding:0 6px;font-size:12px;gap:4px;white-space:nowrap}
    .tp-nav-data-btn svg{flex:none}
    .tp-nav-data-btn:disabled,.tp-nav-data-btn.is-busy{cursor:default;opacity:.55}
    .tp-nav-data-btn:disabled:hover,.tp-nav-data-btn.is-busy:hover{background:var(--dsw-alias-bg-layer-1);border-color:var(--dsw-alias-border-l2)}
    label.tp-nav-data-btn{cursor:pointer}
    .tp-nav-new{width:100%;justify-content:center}
    .tp-nav-create{display:flex;flex-direction:column;gap:6px}
    /* Taller than the plain input: this field is a one-off action, and at 32px it
       read as an inline chip next to the buttons under it.
       One rule only. An earlier attempt kept a second copy that the base .tp-input
       rule overrode at equal specificity, which is what made the height look
       ignored. The element selector raises specificity so there is no tie left to
       lose. min-height and line-height are repeated on purpose: an input's used
       height is driven by the line box, so a rule that only set height would still
       look unchanged whenever something else overrode it. */
    .tp-nav-create input.tp-input{height:52px;min-height:52px;line-height:20px;font-size:15px;padding:0 14px;border-radius:12px}
    .tp-nav-create-actions{display:flex;gap:6px}
    .tp-nav-create-actions .tp-btn{flex:1;justify-content:center;height:30px;padding:0 8px}
    .tp-pane{flex-direction:column;flex:1;min-width:0;min-height:0;display:flex}
    .tp-scroll{scrollbar-gutter:stable;flex:1;min-height:0;overflow:auto}
    .tp-content{max-width:820px;margin:0 auto;padding:0 clamp(20px,4vw,44px) 48px}
    .tp-head{margin-bottom:20px;padding-top:28px}
    .tp-head h1{margin:0;font-size:20px;font-weight:500;line-height:28px;display:flex;align-items:baseline;gap:8px}
    /* The build stamp: small, quiet, and only there to identify the loaded code. */
    .tp-build{font-size:11px;font-weight:400;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
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
    .tp-todos{list-style:none;margin:0;padding:6px;display:flex;flex-direction:column;gap:4px}
    .tp-todo{position:relative;display:flex;align-items:flex-start;gap:10px;padding:10px 8px 10px 12px;border-radius:10px;transition:background .12s}
    /* Hover deepens the wash slightly instead of swapping in a token colour, which
       would replace the kind's tint with a neutral one on every mouse-over. */
    /* Each row carries a faint wash instead of the old left bar: it marks the row
       without an edge that has to line up with anything. Hover swaps in a token
       layer, which reads as "this one" rather than as a different kind of row.
       The wash itself is set inline per kind (see rowTint in components/row.js),
       because it differs per kind and React owns that value. */
    .tp-todo{touch-action:manipulation}
    .tp-todo:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-check{flex:none;width:18px;height:18px;margin-top:2px;border-radius:50%;border:1.5px solid var(--dsw-alias-border-l1);background:transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;padding:0;color:#fff}
    .tp-check.is-done{background:var(--dsw-alias-state-success-primary);border-color:var(--dsw-alias-state-success-primary)}
    .tp-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    /* pre-wrap keeps the newlines a user typed and still wraps long lines. The row
       shows the whole item: it is the record, and hiding part of it behind an
       ellipsis makes a three-line note look like a truncated one. Only the editor
       is bounded to three rows. */
    .tp-todo-text{flex:1;min-width:0;overflow-wrap:anywhere;font-size:14px;line-height:22px;white-space:pre-wrap}
    .tp-todo.is-todo .tp-todo-text{font-weight:500}
    .tp-todo.tp-entry .tp-todo-text{font-size:13.5px;color:var(--dsw-alias-label-secondary)}
    .tp-editable{cursor:text;border-radius:4px;padding:1px 3px;margin:-1px -3px}
    .tp-editable:hover{background:var(--dsw-alias-bg-base);box-shadow:0 0 0 1px var(--dsw-alias-border-l1)}
    /* The inline editor is sized in JS to the text it holds: one row for a short
       item, up to three, then it scrolls. A fixed three-row field was tried first
       and left two empty rows under a one-line todo. The row height is the same
       68px ceiling, so the list does not jump when the editor opens. */
    .tp-edit-input{height:auto;font-size:14px;line-height:20px;padding:4px 8px;margin:-4px 0;resize:none;overflow-y:auto;max-height:68px;font-family:inherit}
    .tp-edit-btn{opacity:0;transition:opacity .12s}
    .tp-todo:hover .tp-edit-btn,.tp-edit-btn:focus-visible{opacity:1}
    .tp-todo.is-done .tp-todo-text{color:var(--dsw-alias-label-secondary);text-decoration:line-through}
    .tp-locked{cursor:default}
    .tp-add-inline{display:flex;align-items:flex-end;gap:6px;min-width:0;max-width:100%}
    /* The field grows with its container. It used to be capped at
       clamp(80px,14vw,150px), which is 150px on any screen wider than ~1070px: that
       cap, not the layout, was why narrowing the button freed nothing. flex:1 with
       a 16em basis lets the field take whatever the header leaves, and 16em reads
       as the placeholder's natural width. */
    .tp-add-inline .tp-input{height:32px;font-size:13px;padding:0 10px;width:auto;flex:1 1 16em;max-width:100%;min-width:0}
    /* The add button is a square "+", so the field beside it gets the width the
       label used to take: roughly three more characters at 13px. */
    .tp-add-btn{width:30px;height:30px;padding:0;justify-content:center;flex:none;align-self:flex-start}
    .tp-add-btn svg{flex:none}
    /* The add field is a one-row textarea so it can hold newlines: 30px tall at one
       line, growing to a small ceiling before it scrolls. */
    .tp-add-inline textarea.tp-add-input{height:auto;min-height:30px;max-height:96px;line-height:20px;padding:5px 10px;resize:none;overflow-y:auto;font-family:inherit}
    .tp-add-inline .tp-btn{height:30px;padding:0 10px;font-size:13px;flex:none;align-self:flex-start}
    /* Beats the rule directly above, which ties on specificity and would give the
       "+" button back its 10px padding and stop it being a 30px square. */
    .tp-add-inline .tp-btn.tp-add-btn{width:30px;height:30px;padding:0;justify-content:center}
    /* A strip under the group header for the "All" tab's own switch. */
    .tp-group-tools{display:flex;justify-content:flex-end;padding:6px 14px 0}
    .tp-inline-toggle{display:inline-flex;align-items:center;gap:6px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:pointer;user-select:none}
    .tp-inline-toggle:hover{color:var(--dsw-alias-label-primary)}
    .tp-empty{padding:26px 16px;text-align:center;color:var(--dsw-alias-label-secondary);font-size:13px}
    .tp-empty strong{display:block;margin-bottom:4px;color:var(--dsw-alias-label-primary);font-weight:500}
    .tp-muted{color:var(--dsw-alias-label-secondary)}
    .tp-tabs{display:flex;align-items:center;gap:4px;padding:0;min-width:0;flex-wrap:wrap}
    .tp-tab{height:28px;border:0;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:13px;cursor:pointer;padding:0 8px;border-radius:14px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}
    .tp-tab svg{flex:none;opacity:.85}
    .tp-tab.is-active svg{opacity:1}
    .tp-tab:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-tab.is-active{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font-weight:500}
    .tp-tab:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}
    .tp-tab-count{color:var(--dsw-alias-label-secondary);font-size:12px;font-variant-numeric:tabular-nums}
    .tp-todo-main{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
    /* The grip is the only draggable element, so it always shows a grab cursor even
       while invisible, which tells the mouse where a drag can start. */
    .tp-row-grip{flex:none;width:12px;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:22px;cursor:grab;opacity:0;transition:opacity .12s;text-align:center;user-select:none}
    .tp-row-grip:active{cursor:grabbing}
    .tp-todo:hover .tp-row-grip,.tp-todo.is-dragging .tp-row-grip{opacity:1}
    .tp-todo.is-dragging{opacity:.45}
    .tp-todo.is-drop-target{box-shadow:inset 0 2px 0 0 var(--dsw-alias-brand-primary)}
    .tp-todo-time{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:16px}
    /* Kind badge: only the combined "All" tab shows one, because only there do
       todos and notes share a column. */
    .tp-kind{flex:none;display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:1px;border-radius:6px}
    .tp-kind-todo{color:var(--dsw-alias-brand-primary);background:var(--dsw-alias-bg-layer-2)}
    .tp-kind-note{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-1)}
    .tp-todos.is-mixed .tp-todo.has-kind{padding-left:4px;gap:8px}
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

    /* --- deadline view -------------------------------------------------------
       A flat list per bucket: date, text, project. It is a view of the whole store
       rather than a group, so it has no tabs and no add field - the row's own
       project is the way back to editing it. */
    .tp-due-section{margin-bottom:18px}
    .tp-due-section-title{display:flex;align-items:center;gap:8px;margin:0 0 6px;padding:0 2px;font-size:12px;font-weight:600;line-height:16px;letter-spacing:.02em;color:var(--dsw-alias-label-secondary)}
    .tp-due-section-title.is-overdue{color:var(--dsw-alias-state-error-primary)}
    .tp-due-section-title.is-today{color:var(--dsw-alias-brand-primary)}
    .tp-due-section-count{font-size:11px;font-weight:400;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
    .tp-due-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
    .tp-due-row{display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
    .tp-due-row:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-due-row-date{flex:none;display:inline-flex;align-items:center;gap:5px;min-width:74px;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary)}
    .tp-due-row-text{flex:1;min-width:0;font-size:14px;line-height:22px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .tp-due-row-project{flex:none;display:inline-flex;align-items:center;gap:4px;max-width:140px;border:0;background:transparent;border-radius:7px;padding:2px 6px;font:inherit;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:pointer;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .tp-due-row-project:hover{background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary)}
    .tp-due-row-project svg{flex:none}
    /* The undated block: a quieter heading and a dashed left edge, so it reads as
       "these have no date" rather than as another deadline bucket. */
    .tp-due-section-none{margin-top:22px}
    .tp-due-section-title.is-none{color:var(--dsw-alias-label-secondary);opacity:.85}
    .tp-due-row.is-undated{border-style:dashed}
    .tp-due-row-nodate{display:inline-flex;align-items:center;color:var(--dsw-alias-label-secondary);opacity:.6}

    /* --- pagination ----------------------------------------------------------
       A tab with more rows than PAGE_SIZE is cut into pages; this strip sits under
       the list. Kept to the left so it never competes with the add controls above. */
    .tp-pager{display:flex;align-items:center;gap:6px;margin-top:8px;padding:0 2px}
    .tp-pager-btn{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border:.5px solid var(--dsw-alias-border-l1);border-radius:7px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);cursor:pointer}
    .tp-pager-btn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .tp-pager-btn:disabled{opacity:.35;cursor:default}
    .tp-pager-info{font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary)}

    /* --- backup page ---------------------------------------------------------
       One row per snapshot: kind, when, file name, restore. The manual kind is the
       accented one because it is the one the user made on purpose. */
    .tp-backup-note{display:flex;align-items:center;gap:6px;margin:-8px 0 18px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);word-break:break-all}
    .tp-backup-section{margin-bottom:22px}
    .tp-backup-section-title{display:flex;align-items:center;gap:8px;margin:0 0 4px;font-size:13px;font-weight:600;line-height:18px;color:var(--dsw-alias-label-primary)}
    .tp-backup-section-count{font-size:11px;font-weight:400;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-base);border-radius:9px;padding:0 6px;min-width:18px;text-align:center}
    .tp-backup-section-hint{margin:0 0 8px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary)}
    .tp-backup-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:2px}
    .tp-backup-row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:10px;border:.5px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-1)}
    .tp-backup-row:hover{background:var(--dsw-alias-bg-layer-2)}
    .tp-backup-row.is-broken{opacity:.65}
    .tp-backup-kind{flex:none;font-size:11px;line-height:16px;border-radius:6px;padding:0 6px;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-secondary)}
    .tp-backup-kind.is-manual{color:var(--dsw-alias-brand-primary)}
    .tp-backup-when{flex:none;min-width:132px;font-size:12px;line-height:16px;font-variant-numeric:tabular-nums;color:var(--dsw-alias-label-primary)}
    .tp-backup-name{flex:1;min-width:0;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .tp-backup-broken{flex:none;font-size:11px;line-height:16px;color:var(--dsw-alias-state-error-primary)}
    .tp-backup-restore{flex:none}
    .tp-backup-actions{flex:none;display:inline-flex;align-items:center;gap:4px}
    /* The confirm pair replaces the row's buttons, so the row has to stay the same
       height and the two answers have to be the eye-catching part. */
    .tp-backup-confirm{flex:none;display:inline-flex;align-items:center;gap:4px}
    .tp-backup-row.is-confirming{border-color:var(--dsw-alias-state-error-primary)}
    .tp-backup-row.is-confirming .tp-backup-name{color:var(--dsw-alias-label-primary)}
    .tp-backup-delete{width:26px;height:26px}
    .tp-notice.is-error .tp-notice-close:hover{color:var(--dsw-alias-state-error-primary)}

    /* --- deadlines ------------------------------------------------------------
       The control is a glyph, not a field: a date input on every row would read as
       a form. The real date input is invisible and stretched over the glyph, so the
       click lands on it and the browser opens its own picker in the right place. */
    .tp-due-wrap{position:relative;flex:none;display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:7px;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:0;transition:opacity .12s,background .12s,color .12s}
    .tp-todo:hover .tp-due-wrap,.tp-due-wrap:focus-within,.tp-due-wrap.has-value{opacity:1}
    .tp-due-wrap:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
    .tp-due-wrap.has-value{color:var(--dsw-alias-brand-primary)}
    /* A deadline that is due or late colours the glyph, so the row says it even
       before the badge below is read. */
    .tp-due-wrap.is-today{color:var(--dsw-alias-brand-primary)}
    .tp-due-wrap.is-overdue{color:var(--dsw-alias-state-error-primary)}
    .tp-due-wrap svg{pointer-events:none}
    .tp-due-input{position:absolute;inset:0;width:100%;height:100%;padding:0;border:0;margin:0;background:transparent;opacity:0;cursor:pointer;-webkit-appearance:none;appearance:none}
    .tp-due-input::-webkit-date-and-time-value{color:transparent}
    .tp-due-input:focus-visible{outline:none}
    .tp-due-wrap:focus-within{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
    /* Clearing rides on the same control and only exists once there is a date. */
    .tp-due-clear{position:absolute;right:-5px;top:-5px;width:13px;height:13px;padding:0;border:0;border-radius:50%;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);display:none;align-items:center;justify-content:center;cursor:pointer}
    .tp-due-wrap.has-value:hover .tp-due-clear{display:inline-flex}
    .tp-due-clear:hover{background:var(--dsw-alias-state-error-primary);color:#fff}


    /* The badge sits under the text with the finish time. Colour carries urgency:
       overdue is the error colour, today is the brand accent, the rest stays quiet. */
    .tp-todo-meta{display:flex;align-items:center;gap:10px;min-height:16px}
    .tp-todo-meta:empty{display:none}
    .tp-due{display:inline-flex;align-items:center;gap:4px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
    .tp-due.is-today{color:var(--dsw-alias-brand-primary);font-weight:500}
    .tp-due.is-soon{color:var(--dsw-alias-label-primary)}
    .tp-due.is-overdue{color:var(--dsw-alias-state-error-primary);font-weight:500}
    .tp-due.is-done{color:var(--dsw-alias-label-secondary);opacity:.7}
    .tp-due-rel{font-size:11px}
    .tp-due.is-done .tp-due-date{text-decoration:line-through}

    /* --- archive -------------------------------------------------------------- */
    .tp-nav-archive{margin-top:2px}
    .tp-archived-head{padding-top:12px}
    .tp-archived-counts{display:flex;align-items:center;gap:8px;font-size:12px;line-height:16px;color:var(--dsw-alias-label-secondary)}
    .tp-archived-overdue{color:var(--dsw-alias-state-error-primary)}
    /* The archived rows keep the board's layout but not its drag affordances. */
    .tp-row-grip.is-inert{opacity:0;cursor:default}
    .tp-archived .tp-todo:hover{background:var(--dsw-alias-bg-layer-2)}

    /* The quiet data-folder line in the footer: one row, one tooltip, no path in
       sight until it is asked for. */
    .tp-nav-path{display:flex;align-items:center;gap:5px;margin-top:6px;padding:0 2px;font-size:11px;line-height:16px;color:var(--dsw-alias-label-secondary);cursor:default}
    .tp-nav-path svg{flex:none;opacity:.75}
    .tp-nav-path-text{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
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

    function ChevronLeftIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M10 3.5L5.5 8 10 12.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    function ChevronRightIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M6 3.5L10.5 8 6 12.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }));
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

    /* --- tab glyphs ---------------------------------------------------------- */

    /**
     * "Active": an empty checkbox — the same square the row's checkbox would take,
     * so the tab reads as "not done yet" rather than as a generic circle.
     */
    function CircleIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 3, y: 3, width: 10, height: 10, rx: 2.4, fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 }));
    }

    /** "Done": a ticked checkbox, filled so it reads at 13px. */
    function DoneCircleIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 3, y: 3, width: 10, height: 10, rx: 2.4, fill: 'currentColor' }),
        h('path', { d: 'M5.6 8.1l1.7 1.7 3.2-3.6', fill: 'none', stroke: 'var(--dsw-alias-bg-base)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    /** "Notes": a page with a folded corner and two lines. */
    function NoteIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M4 2.6h5l3 3v7.8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3.6a1 1 0 0 1 1-1z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M9 2.7v3h3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M5.6 9h4.8M5.6 11.3h3.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round' }));
    }

    /**
     * "All": a 2x2 grid, one filled cell standing for each kind in the mix. A grid
     * reads as "everything collected" and cannot be mistaken for a checkbox, which
     * is what the three-bars glyph looked like next to the empty-circle one.
     */
    function StackIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 2.4, y: 2.4, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .95 }),
        h('rect', { x: 8.6, y: 2.4, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .45 }),
        h('rect', { x: 2.4, y: 8.6, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .45 }),
        h('rect', { x: 8.6, y: 8.6, width: 5, height: 5, rx: 1.3, fill: 'currentColor', opacity: .95 }));
    }

    /**
     * The leading badge that marks a row's kind in the combined "All" tab. The icon
     * doubles as the tab glyph of that kind, so a row's badge and its tab look the
     * same.
     */
    function KindBadge({ kind, label, size = 14 }) {
      // A todo takes the empty checkbox rather than the ticked one: a badge says
      // what the row *is*, and the ticked glyph would imply every todo is done.
      const Icon = kind === KIND_ENTRY ? NoteIcon : CircleIcon;
      return h('span', {
        className: 'tp-kind tp-kind-' + (kind === KIND_ENTRY ? 'note' : 'todo'),
        title: label,
        'aria-label': label,
      }, h(Icon, { size }));
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

    /** Two arrows chasing each other in a circle: "sync". */
    function SyncIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', {
          d: 'M13 8a5 5 0 0 1-8.4 3.6M3 8a5 5 0 0 1 8.4-3.6',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
        }),
        h('path', { d: 'M11.4 1.9v2.7H8.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M4.6 14.1v-2.7h2.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    /** A calendar page: the deadline control and the due-date badge. */
    function CalendarIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 2.6, y: 3.6, width: 10.8, height: 9.8, rx: 1.6, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', { d: 'M2.6 6.6h10.8M5.6 2.4v2.4M10.4 2.4v2.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }));
    }

    /** A closed box: "archive". */
    function ArchiveIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 2.2, y: 3, width: 11.6, height: 3.4, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', { d: 'M3.4 6.4v6.2a1 1 0 0 0 1 1h7.2a1 1 0 0 0 1-1V6.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M6.4 9.4h3.2', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round' }));
    }

    /** A box with its lid lifted: "unarchive". */
    function UnarchiveIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('rect', { x: 2.2, y: 2.2, width: 11.6, height: 3.2, rx: 1, fill: 'none', stroke: 'currentColor', strokeWidth: 1.4 }),
        h('path', { d: 'M3.4 5.6v6.6a1 1 0 0 0 1 1h7.2a1 1 0 0 0 1-1V5.6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }),
        h('path', { d: 'M8 12v-3.4M6.6 10l1.4-1.4 1.4 1.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    }

    /** A folder: the data-location line in the footer. */
    function FolderIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M2.4 4.6a1 1 0 0 1 1-1h2.5l1.4 1.6h5.3a1 1 0 0 1 1 1v6.2a1 1 0 0 1-1 1H3.4a1 1 0 0 1-1-1V4.6z', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinejoin: 'round' }));
    }

    /**
     * A plain cross: "clear". Smaller and thinner than `CloseIcon`, because it sits
     * on the corner of a 24px control and a full-weight X there reads as a close
     * button for the whole row.
     */
    function CrossIcon({ size = 10 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 12 12', 'aria-hidden': true },
        h('path', { d: 'M3 3l6 6M9 3l-6 6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }));
    }

    /** A floppy-free "save" glyph: an arrow into a tray plus a corner mark. */
    function SaveIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M8 2.5v6M5.6 6.1L8 8.5l2.4-2.4', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M3 10.5v1.6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.6', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }));
    }

    /** A clock with an arrow running back: "restore to a moment". */
    function HistoryIcon({ size = 13 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 16 16', 'aria-hidden': true },
        h('path', { d: 'M3 8a5 5 0 1 0 1.6-3.7', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
        h('path', { d: 'M2.4 2.6v3h3', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M8 5.6V8l1.9 1.1', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
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

    /* --- deadlines ------------------------------------------------------------ */

    /**
     * A calendar day as a local `YYYY-MM-DD` string.
     *
     * `toISOString()` is deliberately not used: it converts to UTC, so east of
     * Greenwich an evening date rolls over to the next day and a todo due "today"
     * would show as due tomorrow.
     */
    function dayKey(date) {
      const d = date || new Date();
      const pad = (n) => String(n).padStart(2, '0');
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
    }

    /** Whole days from today to a `YYYY-MM-DD` date; negative when overdue. */
    function daysUntil(due) {
      if (!due) return null;
      const parts = String(due).split('-').map(Number);
      if (parts.length !== 3 || parts.some(isNaN)) return null;
      const target = new Date(parts[0], parts[1] - 1, parts[2]);
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      return Math.round((target.getTime() - start.getTime()) / 86400000);
    }

    /**
     * How a deadline reads: `overdue` / `today` / `soon` (within a week) / `later`.
     * The row styles by this class, so the urgency is not only in the text.
     */
    function dueState(due) {
      const days = daysUntil(due);
      if (days === null) return null;
      if (days < 0) return 'overdue';
      if (days === 0) return 'today';
      return days <= 7 ? 'soon' : 'later';
    }

    /**
     * A deadline as the row shows it: the day, with the year only when it is not
     * this one. `11-06` today, `2027-03-01` for a date far enough out that leaving
     * the year off would be ambiguous.
     */
    function shortDate(due) {
      if (!due) return '';
      const parts = String(due).split('-');
      if (parts.length !== 3) return String(due);
      const sameYear = Number(parts[0]) === new Date().getFullYear();
      return sameYear ? parts[1] + '-' + parts[2] : due;
    }

    /**
     * Backup when, from a backup's `stamp`: `2026-11-09 18:30`, time only when it
     * says so.
     *
     * The stamp is a wall-clock string with no zone, exactly as it was on the
     * machine that wrote it. Formatting it through `Date` would shift it into the
     * viewer's zone and show the wrong hour, which for a backup is the one number
     * that matters.
     */
    function formatBackupStamp(stamp) {
      if (!stamp) return '';
      const [date, time] = String(stamp).split('T');
      const d = String(date || '').split('-');
      if (d.length !== 3) return String(stamp);
      const hm = time && time !== '00:00:00' ? ' ' + String(time).slice(0, 5) : '';
      return d[0] + '/' + d[1] + '/' + d[2] + hm;
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

    /**
     * Whether the combined "All" tab lists finished todos. That tab is a review of
     * the whole group, so it can hold the archive; the saved flag is only the
     * starting point, and the tab's own toggle edits it.
     */
    const showDoneInAll = (state) => state.includeDone !== false;

    /** Key used for drafts, tabs and group anchors: project id or the default slot. */
    const groupKey = (projectId) => projectId || NO_PROJECT;

    /** Resolve a project id to the group it belongs to (null = default group). */
    const projectIdOf = (item) => item.projectId || null;

    /** Items belonging to one group, todos and notes alike. */
    const itemsOf = (state, projectId) =>
      state.todos.filter((item) => projectIdOf(item) === (projectId || null));

    /** Append a new todo or note to the group. */
    function addItem(state, projectId, kind, text, due) {
      const item = {
        id: uid(),
        text,
        kind,
        done: false,
        completedAt: null,
        projectId: projectId || null,
      };
      // Only a todo carries a deadline; a note has nothing to finish.
      if (due && kind === KIND_TODO) item.due = due;
      return { ...state, todos: state.todos.concat(item) };
    }

    /**
     * Set or clear one todo's deadline.
     *
     * `due` is a calendar day (`YYYY-MM-DD`), not an instant: "due Friday" means
     * that day in the reader's own time zone, and storing a timestamp would move
     * the date when the machine changes zone.
     */
    function setItemDue(state, id, due) {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== id) return todo;
          const next = { ...todo };
          if (due) next.due = due;
          else delete next.due;
          return next;
        }),
      };
    }

    /** A project is archived when it carries the flag; the default group never is. */
    const isArchived = (project) => Boolean(project && project.archived);

    /**
     * Archive a project, or bring it back.
     *
     * Archiving is deliberately not deletion: the project keeps its id, its place in
     * the order and every item it holds, so unarchiving puts it back exactly where
     * it was. Only the board and the quick-jump list hide it.
     */
    function setProjectArchived(state, projectId, archived) {
      if (!projectId) return state;
      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== projectId) return project;
          const next = { ...project };
          if (archived) next.archived = true;
          else delete next.archived;
          return next;
        }),
      };
    }

    /** Projects shown on the board and in the quick-jump list. */
    const liveProjects = (state) => state.projects.filter((project) => !isArchived(project));

    /** Projects that left the board, keeping their order. */
    const archivedProjects = (state) => state.projects.filter(isArchived);

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

    /** Flip whether finished todos appear in the combined "All" tab. */
    function setIncludeDoneFlag(state, include) {
      return { ...state, includeDone: !!include };
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

    /** Whether two items belong to the same group, whatever their kind. */
    const sameGroup = (a, b) => projectIdOf(a) === projectIdOf(b);

    /** Whether two items may sit in the same list: same group and same kind. */
    const sameList = (a, b) => sameGroup(a, b) && isEntry(a) === isEntry(b);

    /**
     * Drag-and-drop: take the dragged item's slot and insert it where the drop
     * target sat. Cross-list drops are ignored.
     *
     * `mixed` relaxes the kind check so a note can be dropped among todos: the
     * combined "All" tab lists both kinds in one column, and there a note and a
     * todo are neighbours. The group still has to match, so a row never moves to
     * another project by accident.
     */
    function reorderItem(state, sourceId, targetId, mixed) {
      if (!sourceId || !targetId || sourceId === targetId) return state;
      const from = state.todos.findIndex((item) => item.id === sourceId);
      const to = state.todos.findIndex((item) => item.id === targetId);
      if (from === -1 || to === -1) return state;
      if (!(mixed ? sameGroup : sameList)(state.todos[from], state.todos[to])) return state;
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

    /**
     * Groups for the board and the nav: the fixed default group first, then the
     * projects that are not archived. The default group cannot be archived - it is
     * not a project, it is the slot for everything without one.
     */
    function groupList(state, defaultName) {
      return [{ id: null, name: defaultName, hint: '' }]
        .concat(liveProjects(state).map((p) => ({ id: p.id, name: p.name })));
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
     * Lines the editor needs for this text, counting wrapped lines, capped at
     * EDIT_ROWS. A short item gets a short field; a long one scrolls inside three
     * rows. `wrapAt` is the field's text columns, measured from its width and font
     * so a wrapped line is not mistaken for a short one.
     */
    function editorRows(text, wrapAt) {
      const cols = Math.max(12, wrapAt | 0);
      let rows = 0;
      String(text == null ? '' : text).split('\n').forEach((line) => {
        // An empty line still takes one row.
        rows += Math.max(1, Math.ceil(line.length / cols));
      });
      return Math.min(EDIT_ROWS, Math.max(1, rows));
    }

    /**
     * The text of a row: an editor while that row is being edited, otherwise a span
     * that opens the editor on double-click, or a locked span when read-only.
     *
     * The row itself shows the whole text, newlines and all. Only the editor is
     * bounded: it opens as tall as the text needs and never taller than EDIT_ROWS,
     * scrolling past that, so typing into a long item does not push the list around.
     *
     * @param {object} item the todo or note
     * @param {object} api  { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t }
     */
    function editableText(item, api) {
      const { editingId, editDraft, setEditDraft, startEdit, cancelEdit, commitEdit, t } = api;
      if (editingId === item.id && canEdit(item)) {
        // Enter inserts a newline and Ctrl/Cmd+Enter saves, matching the add field.
        // `rows` follows the text: a two-line item gets a two-row field.
        const rows = editorRows(editDraft, api.editCols());
        return h('textarea', {
          className: 'tp-input tp-edit-input',
          rows,
          autoFocus: true,
          value: editDraft,
          onChange: (event) => setEditDraft(event.target.value),
          onKeyDown: (event) => {
            if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
              event.preventDefault();
              commitEdit();
            }
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

    /**
     * The row's faint wash, by kind. Hex tints at low alpha rather than theme
     * tokens: the alias tokens swing hard between light and dark, and the note grey
     * has to stay grey in both. At .06–.1 the value is not readable as a colour,
     * only as a fill that separates one row from the next.
     *
     * Notes are given the strongest and greyest wash on purpose: they carry no
     * checkbox, so colour is what says "this one is a note" at a glance.
     */
    const TINT = {
      todo: 'rgb(96 138 235 / .07)',
      done: 'rgb(84 168 112 / .06)',
      note: 'rgb(118 122 130 / .12)',
    };

    /** The wash for a row, from the row's own kind. */
    function rowTint(isTodo, isDone) {
      const key = isTodo ? (isDone ? 'done' : 'todo') : 'note';
      return { background: TINT[key] };
    }

    /**
     * The deadline badge.
     *
     * A finished todo keeps its deadline but stops shouting: the date is shown
     * plainly, without the overdue colour, because "late" is no longer actionable.
     * Otherwise the badge carries a state class (`overdue` / `today` / `soon`) that
     * colours it, so urgency is not only in the text.
     */
    function dueBadge(todo, api) {
      if (!todo.due) return null;
      const state = todo.done ? 'done' : dueState(todo.due);
      const days = daysUntil(todo.due);
      // "1 days left" is not English; the singular gets its own words, and tomorrow
      // reads better as a word than as "in 1 day".
      const relative = todo.done || days === null
        ? ''
        : days === 0
          ? api.t('dueToday')
          : days === 1
            ? api.t('dueTomorrow')
            : days < 0
              ? api.t(-days === 1 ? 'dueOverdueOne' : 'dueOverdue').replace('{count}', String(-days))
              : api.t('dueInDays').replace('{count}', String(days));
      return h('span', {
        className: 'tp-due is-' + state,
        title: api.t('dueTitle').replace('{date}', todo.due),
      },
        h(CalendarIcon, { size: 11 }),
        h('span', { className: 'tp-due-date' }, shortDate(todo.due)),
        relative ? h('span', { className: 'tp-due-rel' }, relative) : null);
    }

    /**
     * The deadline control: a calendar button that opens the platform's date picker.
     *
     * The visible control is only a glyph, because a date field on every row would
     * read as a form. The real `<input type="date">` still exists but is invisible
     * and sits underneath the button, so clicking the glyph opens the browser's own
     * picker rather than a hand-written calendar - and its value is already
     * `YYYY-MM-DD`, which is exactly what is stored.
     *
     * A row that already has a deadline shows the date in the badge instead, so the
     * button never has to display text.
     */
    function dueControl(todo, api) {
      if (todo.done) return null;
      const has = Boolean(todo.due);
      const label = has
        ? api.t('dueChange').replace('{date}', todo.due)
        : api.t('dueSet');
      const tone = has ? (todo.done ? 'done' : dueState(todo.due)) : null;
      return h('span', { className: 'tp-due-wrap' + (has ? ' has-value' : '') + (tone ? ' is-' + tone : '') },
        // The picker itself: invisible, stretched over the button, clicked through.
        h('input', {
          type: 'date',
          className: 'tp-due-input',
          value: todo.due || '',
          title: label,
          'aria-label': label,
          onChange: (event) => api.setDue(todo.id, event.target.value || ''),
          // The row is a drop target; a click in the date field is not a drag.
          onMouseDown: (event) => event.stopPropagation(),
          onClick: (event) => event.stopPropagation(),
        }),
        h(CalendarIcon, { size: 14 }),
        // Clearing is part of the same control: without it a mis-click would leave a
        // deadline that can only be removed by reopening the picker.
        has
          ? h('button', {
              type: 'button',
              className: 'tp-due-clear',
              title: api.t('dueClear'),
              'aria-label': api.t('dueClear'),
              onClick: () => api.setDue(todo.id, ''),
            }, h(CloseIcon, { size: 10 }))
          : null);
    }

    /**
     * The drag grip. It is the only draggable element of a row, so the text can be
     * selected and the buttons clicked without starting a drag.
     *
     * `options.readOnlyDrag` keeps the grip's column (so archived rows line up with
     * the board's) but drops the drag handlers: dropping into an archive list would
     * be a reorder across views, which no transition accepts.
     */
    function renderGrip(item, api, options) {
      const inert = !!(options && options.readOnlyDrag);
      return h('span', {
        className: 'tp-row-grip' + (inert ? ' is-inert' : ''),
        title: inert ? undefined : api.t('dragToReorder'),
        'aria-hidden': true,
        ...(inert ? {} : api.gripDragProps(item)),
      }, '⠿');
    }

    /** A plain note: a kind badge, no checkbox, a grip, text, edit and delete. */
    function renderEntry(item, api, options) {
      const withKind = !!(options && options.withKind);
      return h('li', {
        key: item.id,
        className: 'tp-todo tp-entry' + (withKind ? ' has-kind' : '') + api.itemDragClass(item),
        style: rowTint(false, false),
        ...api.itemDragProps(item),
      },
        renderGrip(item, api, options),
        withKind ? h(KindBadge, { kind: KIND_ENTRY, label: api.t('kindNote'), size: 14 }) : null,
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

    /** A todo: a kind badge, checkbox, text, finish time when done, edit and delete. */
    function renderTodo(todo, api, options) {
      const { t } = api;
      const withKind = !!(options && options.withKind);
      return h('li', {
        key: todo.id,
        className: 'tp-todo is-todo' + (withKind ? ' has-kind' : '') + (todo.done ? ' is-done' : '') + api.itemDragClass(todo),
        style: rowTint(true, todo.done),
        ...api.itemDragProps(todo),
      },
        renderGrip(todo, api, options),
        withKind ? h(KindBadge, { kind: KIND_TODO, label: t('kindTodo'), size: 14 }) : null,
        h('button', {
          type: 'button',
          className: 'tp-check' + (todo.done ? ' is-done' : ''),
          'aria-label': todo.done ? t('reopen') : t('complete'),
          'aria-pressed': todo.done,
          onClick: () => api.toggleTodo(todo.id),
        }, todo.done ? h(CheckIcon, { size: 12 }) : null),
        h('div', { className: 'tp-todo-main' },
          editableText(todo, api),
          h('div', { className: 'tp-todo-meta' },
            dueBadge(todo, api),
            todo.done && todo.completedAt
              ? h('span', { className: 'tp-todo-time' }, t('completedAt').replace('{time}', formatTime(todo.completedAt)))
              : null)),
        dueControl(todo, api),
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

    /**
     * Dispatch one item to the matching row renderer.
     *
     * `options.withKind` adds the leading todo/note badge. Only the combined "All"
     * tab sets it, because that tab mixes both kinds and the badge is what tells
     * them apart; the single-kind tabs leave it off.
     */
    function renderRow(item, api, options) {
      return isEntry(item) ? renderEntry(item, api, options) : renderTodo(item, api, options);
    }

    /* ---------------------------------------------------------------------- */
    /* src/components/group.js                                                */
    /* ---------------------------------------------------------------------- */
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
    /* src/components/archive.js                                              */
    /* ---------------------------------------------------------------------- */
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

    /* ---------------------------------------------------------------------- */
    /* src/components/due.js                                                  */
    /* ---------------------------------------------------------------------- */
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
     * The undated items in board order, as one flat list. They sit at the bottom of
     * the page under their own heading: a todo that never got a date is the one
     * most likely to be forgotten, and a page that answers "what is due" should also
     * show what has quietly escaped being due at all.
     *
     * The order matches the board (default group first, then each live project in
     * stored order, items in board order) so the list does not feel shuffled; only
     * the project labels are dropped, keeping the block as a single quiet list.
     */
    function undatedItems(state, defaultName) {
      return groupList(state, defaultName).flatMap((group) =>
        state.todos.filter(
          (item) => !isEntry(item) && !item.done && !item.due && projectIdOf(item) === group.id,
        ));
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
      // It is a single flat list ordered like the board (default group first, then
      // each live project in stored order), but without per-project labels.
      const undated = undatedItems(state, t('noProject'));
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

    /* ---------------------------------------------------------------------- */
    /* src/components/backups.js                                              */
    /* ---------------------------------------------------------------------- */
    /**
     * The backup page: take a manual snapshot, and restore any snapshot - automatic
     * or manual - over the current content.
     *
     * Two different verbs live here, and the page keeps them apart on purpose:
     *
     *   备份   copies what is on disk. Cheap, safe, no confirmation needed.
     *   恢复   replaces everything. It is the destructive one: a snapshot of the
     *          current content is taken first by the Host, but the user still has to
     *          say yes, because "put it all back" is not something to do by accident.
     *
     * This is not the "import" in the sidebar footer: import merges into what is
     * there, restore replaces it. Both exist because both are wanted at different
     * moments.
     */

    /** The two buttons a manual row shows when it is asking whether to delete. */
    function confirmingControls(backup, api) {
      const { t } = api;
      return h('span', { className: 'tp-backup-confirm' },
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-sm tp-btn-danger',
          disabled: api.deleting !== null,
          onClick: () => api.deleteBackupNow(backup),
        }, api.deleting === backup.name ? t('backupDeleting') : t('backupDeleteConfirm')),
        h('button', {
          type: 'button',
          className: 'tp-btn tp-btn-sm',
          disabled: api.deleting !== null,
          onClick: () => api.cancelDeleteBackup(),
        }, t('cancel')));
    }

    /** The trash button, which turns the row into a confirmation when pressed. */
    function deleteControls(backup, api) {
      return h('button', {
        type: 'button',
        className: 'tp-icon-btn tp-backup-delete',
        title: api.t('backupDelete'),
        'aria-label': api.t('backupDelete'),
        disabled: api.deleting !== null,
        onClick: () => api.askDeleteBackup(backup),
      }, h(TrashIcon, { size: 13 }));
    }

    /**
     * One backup row: when, which kind, how big, and the restore button.
     *
     * A broken file is shown with its button disabled rather than hidden: the user
     * should know the file is there and that it cannot be used.
     */
    function backupRow(backup, api) {
      const { t } = api;
      const isManual = backup.kind === 'manual';
      const kindLabel = isManual ? t('backupKindManual') : t('backupKindAuto');
      const isAsking = api.confirmingDelete === backup.name;
      return h('li', {
        key: backup.name,
        className: 'tp-backup-row' + (backup.ok ? '' : ' is-broken') + (isAsking ? ' is-confirming' : ''),
      },
        h('span', { className: 'tp-backup-kind is-' + backup.kind }, kindLabel),
        h('span', { className: 'tp-backup-when' }, formatBackupStamp(backup.stamp)),
        h('span', { className: 'tp-backup-name', title: backup.name }, backup.name),
        backup.ok
          ? null
          : h('span', { className: 'tp-backup-broken' }, t('backupBroken')),
        // Asking replaces the row's own buttons instead of opening a dialog: the
        // question stays next to the file it is about, and only this row changes.
        isAsking
          ? confirmingControls(backup, api)
          : h('span', { className: 'tp-backup-actions' },
              // Deleting exists only for manual snapshots: the automatic ones rotate
              // on their own, so a delete button there would be a way to remove the
              // last week's safety net by accident.
              isManual ? deleteControls(backup, api) : null,
              h('button', {
                type: 'button',
                className: 'tp-btn tp-btn-sm tp-btn-danger tp-backup-restore',
                disabled: !backup.ok || api.restoring !== null || api.deleting !== null,
                title: backup.ok ? t('restoreHint') : t('backupBroken'),
                onClick: () => api.restoreFromBackup(backup),
              }, api.restoring === backup.name ? t('restoring') : t('restore'))));
    }

    /**
     * The whole page.
     *
     * @param {object} api { t, state, setView }
     */
    function renderBackups(api) {
      const { t, state, setView } = api;
      const meta = state.meta || {};
      const backups = Array.isArray(meta.backups) ? meta.backups : [];
      const autos = backups.filter((b) => b.kind === 'auto');
      const manuals = backups.filter((b) => b.kind === 'manual');

      const section = (title, hint, list) => h('section', { className: 'tp-backup-section' },
        h('h2', { className: 'tp-backup-section-title' }, title,
          h('span', { className: 'tp-backup-section-count' }, String(list.length))),
        hint ? h('p', { className: 'tp-backup-section-hint' }, hint) : null,
        list.length
          ? h('ul', { className: 'tp-backup-list' }, list.map((backup) => backupRow(backup, api)))
          : h('div', { className: 'tp-empty' }, h('strong', null, t('backupNone')), t('backupNoneHint')));

      return h('div', { className: 'tp-content' },
        h('header', { className: 'tp-head tp-head-row' },
          h('div', null,
            h('h1', null, t('backups')),
            h('p', null, t('backupPageHint'))),
          h('div', { className: 'tp-head-actions' },
            h('button', {
              type: 'button',
              className: 'tp-btn',
              onClick: () => setView('board'),
            }, t('back')),
            h('button', {
              type: 'button',
              className: 'tp-btn tp-btn-primary' + (api.backingUp ? ' is-busy' : ''),
              disabled: api.backingUp,
              title: t('backupNowHint'),
              onClick: api.backupNow,
            }, h(SaveIcon, { size: 13 }), api.backingUp ? t('backingUp') : t('backupNow')))),
        h('div', { className: 'tp-backup-note' },
          h(FolderIcon, { size: 12 }),
          h('span', null, meta.backupDir || '')),
        section(t('backupManual'), t('backupManualHint'), manuals),
        section(
          t('backupAuto'),
          t('backupAutoHint').replace('{keep}', String(meta.keep || 7)),
          autos));
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

      // --- pagination -----------------------------------------------------------
      // A tab that holds a pile of rows is cut into pages of PAGE_SIZE. The page is
      // remembered per tab, not per group, so moving between projects keeps the
      // reader in the same depth of the list. Kept in React state (not the data
      // file): which page you are looking at is a view position, not content.
      const [pages, setPages] = React.useState({});
      const pageFor = (tabKey) => pages[tabKey] || 0;
      const setPageFor = (tabKey, value) =>
        setPages((prev) => (prev[tabKey] === value ? prev : { ...prev, [tabKey]: value }));
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
        pageFor, setPageFor,
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

