# 备忘录 (Memos)

侧边栏里的待办 + 笔记面板。按项目分组，支持拖动排序、搜索、回收站和就地编辑。

- **插件包名**：`@local/dsh-todo`
- **侧边栏 id**：`todos`（主面板 key 相同）
- **数据文件**：`<工作区根目录>/dsh-todo.json`
- **路由**：`GET/POST /api/dsh-todo`

> 早期版本用过 `todo-project` 这个名字（路由 `/api/todo-project`、数据文件 `todo-projects.json`、备份标识 `todo-project`），现已全部改为 `dsh-todo`。旧的备份文件仍可导入（导入时不校验 `format` 字段），但旧的数据文件需要手动改名：`mv todo-projects.json dsh-todo.json`。

---

## 功能一览

| 功能 | 说明 |
| --- | --- |
| 项目分组 | 「默认」组固定在最前、不可拖动、不可删除；其余项目可增删 |
| 四个标签页 | 每个组有 `全部` / `未完成` / `已完成` / `笔记`，各带图标；每个组的选中页独立记忆 |
| 待办 | 复选框标记完成，自动记录完成时间；重新打开时清空时间 |
| 笔记 | 无复选框的纯文字条目，适合记录说明 |
| 编辑 | 双击文字或点铅笔按钮；`Enter` 保存、`Esc` 取消、失焦保存、清空即取消 |
| 只读 | **已完成的待办不可编辑**，需先取消完成 |
| 项目排序 | 拖动左侧快速导航里的项目行 |
| 条目排序 | **只能拖动行首的图标**；单类型标签页里限同组同类型，「全部」里可在同组内跨类型混排 |
| 删除项目 | 把导航行拖到底部的删除区域（导航里没有删除按钮） |
| 删除条目 | 行尾垃圾桶按钮 |
| 回收站 | 删除的条目和整个项目先进回收站，可恢复或永久删除 |
| 搜索 | 标题右侧搜索框，就地隐藏不匹配内容；「包含已完成」默认不勾选 |
| 快速跳转 | 点导航里的组名，滚动到对应分组 |
| 导出 | 导航底部「导出」，把全部内容下载成一个带日期的 JSON 文件 |
| 导入 | 导航底部「导入」，从 JSON 备份**合并**进来，已有内容不删除 |
| 同步 | 导航底部「同步」，立刻把当前内容写入 JSON 数据文件并报告结果 |

### 导出 / 导入 / 同步

三个按钮在左侧导航底部、"新建项目"上方。

**同步**是一次手动、可确认的写入。改动本来就会自动保存（每次状态变化都 POST 一次），
所以「同步」的作用不是补做保存，而是：

- 强制立刻写一次，不用等下一次改动
- 把写入结果告诉你——自动保存是静默的，失败了不会有任何提示；同步成功显示
  「已同步到 JSON 文件：N 个项目、M 个条目…」，失败则显示红色错误提示，需要手动关闭

如果怀疑数据没落盘（比如换了一台机器读不到刚加的内容），点一下就知道。

**导出**下载 `memos-YYYY-MM-DD.json`，内容是完整状态（项目、待办、笔记、回收站）。文件带一个信封：

```jsonc
{
  "format": "dsh-todo",
  "version": 1,
  "exportedAt": "2024-05-01T10:00:00.000Z",
  "projects": [ … ],
  "todos": [ … ],
  "trash": [ … ]
}
```

**导入是合并，不是覆盖**，这样可以安心地在一台设备上恢复、或把别人的清单并进来：

| 情况 | 结果 |
| --- | --- |
| 同名项目 | 两个都保留（项目靠 id 区分，不靠名字） |
| 条目所属项目不存在 | 落到「默认」组 |
| 导入两次同一个文件 | 出现两份，但 id 全部重新生成，不会互相覆盖 |
| 文件不是 JSON / 不是备忘录格式 / 没有任何条目 | 拒绝导入，状态完全不变，右下角显示错误提示 |
| 裸状态文件（没有 `format` 信封、没有 `trash`） | 接受，按待办处理 |
| 结构损坏的单行 | 丢弃该行，其余照常导入 |

导入后右下角显示「已导入 N 个项目、M 个条目…」，成功提示 5 秒自动消失，错误提示需手动关闭。
整个操作只改浏览器里的状态，随后照常写入 JSON 文件，所以导入结果立刻落盘。

> 想「用备份完全替换」而不是合并：先导出当前内容留底，再在应用里删掉不要的内容，然后导入备份。

### 数据模型

```jsonc
{
  "projects": [{ "id": "p1", "name": "工作" }],
  "todos": [
    {
      "id": "a1",
      "text": "写周报",
      "kind": "todo",            // "todo" | "entry"（entry = 笔记）
      "done": false,
      "completedAt": null,       // ISO 时间，完成时写入
      "projectId": "p1"          // null = 默认组
    }
  ],
  "trash": [
    // 单条：附带 index 用于放回原位
    { "id": "...", "kind": "todo", "text": "...", "deletedAt": "ISO",
      "projectId": "p1", "projectName": "工作", "index": 0, "item": { } },
    // 整个项目：项目与其全部条目一起恢复
    { "id": "...", "kind": "project", "text": "工作", "deletedAt": "ISO",
      "index": 0, "project": { }, "items": [ ] }
  ]
}
```

- 数组顺序就是显示顺序（`projects` 决定分组顺序，`todos` 决定条目顺序）。
- 类型字段内部保留 `kind: "entry"`，界面上显示为「笔记」。
- 旧数据没有 `kind` 时按 `todo` 处理。
- 每次改动都把**完整状态** POST 给 Host，Host 写临时文件后 `rename`，所以磁盘上永远是完整副本。

---

## 目录结构

```
dsh-todo/
├── package.json          # 包清单：exports / files / dsh.bundle / dsh.client
├── cordis.patch.yml      # 往 profile 组合里插入插件行
├── index.js              # Host 半部分：数据文件 + HTTP 路由
├── icon.svg              # 插件图标（侧边栏和插件管理页共用）
├── locale/
│   ├── en.json           # 插件管理页显示的标题/描述（英文）
│   └── zh.json           # 同上（中文）
├── build.mjs             # 把 src/ 拼成 client/index.js
├── client/
│   └── index.js          # ← 生成物，浏览器实际加载的产物
└── src/                  # 源码（唯一需要手改的地方）
    ├── constants.js      # id、路由、标签页和类型常量
    ├── board-ops.js      # 纯数据操作（增删改、排序、回收站）
    ├── storage.js        # 读写 Host 的 JSON 文件
    ├── backup.js        # 导出格式、校验、合并导入
    ├── styles.js         # 整份 CSS（只用 --dsw-alias-* 主题变量）
    ├── icons.js          # 内联 SVG 图标
    ├── format.js         # 时间格式化
    ├── page.js           # 页面：状态、事件处理、装配
    ├── plugin.js         # apply()：注册语言包、样式、图标、页面
    ├── locale/
    │   ├── en.js         # 界面文案（英文）
    │   └── zh.js         # 界面文案（中文）
    └── components/
        ├── row.js        # 单条待办/笔记，含就地编辑器
        ├── group.js      # 一个项目分组（标签页 + 标题 + 添加框 + 列表）
        ├── nav.js        # 左侧快速导航、删除区、新建项目
        ├── search.js     # 搜索框 + 包含已完成
        └── trash.js      # 回收站视图
```

### 为什么有 `build.mjs`

Harness 的静态 Client 半部分是**单个纯 JS 文件**：没有 `import`、没有 JSX、没有打包器，浏览器只加载一个调用
`window.__ModuleLoader__.load({ id, factory })` 的产物。为了让代码分文件又能直接跑，`build.mjs` 按依赖顺序把
`src/` 下的模块拼进同一个 factory 作用域：

```
node build.mjs          # 生成 client/index.js
node build.mjs --check  # 检查产物是否最新（CI 用）
```

**改了 `src/` 里的任何文件后，必须重新 `node build.mjs`**，否则运行的是旧代码。
`client/index.js` 是生成物，不要直接编辑——下次构建会覆盖。

---

## Host 半部分 (`index.js`)

- 数据文件默认是 `<workspace 根目录>/dsh-todo.json`。`apply(ctx, config)` 会读取该行的 `config.fileName`
  覆盖文件名（相对路径按工作区根目录解析，绝对路径原样使用），例如在 `cordis.patch.yml` 里：

  ```yaml
  - id: dsh-todo
    name: '@local/dsh-todo'
    config:
      fileName: my-memos.json
  ```

  这是普通的运行时读取，不是 Cordis 的 `Config` schema——插件没有声明 `Config`，所以多余的键不会被静态校验或拒绝。

- 路由与页面一样走 `connection.authorizeIndex` 鉴权，用浏览器 cookie 认证。
- `GET` / `HEAD` 返回状态；`POST` 覆盖写入（400 = 非法 JSON，405 = 其他方法，500 = 内部错误）。

## Client 半部分 (`src/`)

- 数据流：`TodoPage` 持有 `state`；初始 `loadState()`，之后每次 `state` 变化 `saveState()`。
  加载完成前的第一次渲染不写盘（`loadedRef`）。
- 所有数据修改都是 `board-ops.js` 里的纯函数 `(prev, ...) => next`，页面只负责调用 `setState`。
- 组件是普通渲染函数（不是 React 组件），接收一个统一的 `api` 对象，因此不需要传一堆 props。
- 样式全部在 `styles.js`，用 `<style data-dsh-todo>` 注入，卸载时移除；类名统一 `tp-` 前缀，只引用
  `--dsw-alias-*` 主题变量，跟随明暗主题。

### 修改界面的常见位置

| 想改什么 | 改哪里 |
| --- | --- |
| 文案（中/英） | `src/locale/zh.js`、`src/locale/en.js`（两边键必须一致） |
| 颜色、间距、圆角 | `src/styles.js` |
| 单条待办/笔记的外观 | `src/components/row.js` |
| 分组头（标签页、标题、添加框） | `src/components/group.js` |
| 左侧导航、删除区 | `src/components/nav.js` |
| 搜索行为 | `src/page.js`（`needle`/`matches`/`visibleInSearch`）+ `src/components/group.js`（计数） |
| 数据规则（排序、回收站） | `src/board-ops.js` |
| 导出格式、导入合并规则 | `src/backup.js` |
| 数据文件路径、路由 | `index.js` |

---

## 安装与更新

插件装在当前 profile 中，对所有会话生效。

```
# 安装（或替换已安装的版本）
plugin_manager: install_bundle  target=/绝对路径/dsh-todo
```

改动 `src/` 后的完整流程：

1. `node build.mjs`（重新生成 `client/index.js`）
2. `node build.mjs --check` 与 `node --check client/index.js` 自检
3. `plugin_manager`：先 `remove_bundle`，再 `install_bundle`
4. 浏览器**刷新页面**

静态产物没有文件监听：不重新 install 就不会生效，不刷新页面就看不到新代码。

## 卸载

```
plugin_manager: remove_bundle  target=@local/dsh-todo
```

数据文件不会删除；想清空就手动删掉 `dsh-todo.json`。
