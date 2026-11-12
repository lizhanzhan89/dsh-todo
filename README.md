# 待办 (dsh-todo)

Harness 侧边栏里的事项面板。待办和笔记放在一起，按项目分块管理，不联网、不要账号。

这里的"项目"只是分组，不是工程：新建一个项目就是起个名字，删掉它整个分组连同条目一起进回收站。

## 功能

- **截止日期**：待办可设到期日，逾期红、今天蓝；「截止日期」页跨项目按日期列出全部未完成，末尾单列「未设截止日期」的待办，且按其所在项目、与主页面一致的顺序排列
- **分页**：任一标签页超过 10 条自动分页，底部分页条切换；页码按标签页记忆，搜索时同样分页
- **归档**：把导航里的项目行拖到归档区，项目离开看板但条目全留着，随时放回
- **备份**：每天自动留一份快照（保留 7 天），也可手动备份（永不清理）；任选一份原样恢复
- **多行**：`Enter` 换行，`Ctrl/Cmd+Enter` 保存；列表完整显示，编辑框最多三行
- **拖动排序**：项目拖导航行，条目拖行首握把
- **搜索 / 回收站**：搜索就地隐藏不匹配内容；删除先进回收站，可恢复原位

## 安装

```
plugin_manager: install_bundle  target=/绝对路径/dsh-todo
```

| | |
| --- | --- |
| 插件包名 | `@local/dsh-todo` |
| 侧边栏 id | `todos` |
| 数据目录 | `~/Documents/dsh-todo/`（中文系统即 `~/文稿/dsh-todo/`） |
| 依赖 | Harness 自带 `webServer`、`connection`（cookie 鉴权） |

## 数据

```
~/Documents/dsh-todo/
├── dsh-todo.json                      # 当前数据
└── backups/
    ├── manual-20261109-183000.json    # 手动备份，永不清理
    └── dsh-todo-2026-11-09.json       # 自动备份，保留最新 7 份
```

放在文稿目录而不是工作区：工作区会被清空和切换，待办得活过这些。整个文件夹拷走就是完整迁移。

想换位置，在 `cordis.patch.yml` 里加 `dataDir`（相对路径按用户主目录解析）：

```yaml
- id: dsh-todo
  name: '@local/dsh-todo'
  config:
    dataDir: /Users/me/OneDrive/dsh-todo
```

备份是纯 JSON，可以直接看、直接改。格式：

```jsonc
{
  "projects": [{ "id": "p1", "name": "工作" }, { "id": "p0", "name": "旧项目", "archived": true }],
  "todos": [{
    "id": "a1", "text": "写周报", "kind": "todo",   // "todo" | "entry"（笔记）
    "done": false, "completedAt": null,             // 完成时写 ISO 时间
    "projectId": "p1",                              // null = 默认组
    "due": "2026-11-20"                             // 可选，YYYY-MM-DD
  }],
  "trash": [ … ],                                   // 删除的条目和项目
  "includeDone": true                               // 「包含已完成」开关
}
```

数组顺序就是显示顺序。每次改动都把完整状态 POST 给 Host，写入走临时文件再 `rename`，磁盘上永远是完整副本。

### 备份与恢复

- **自动**：每天第一次写入前，把上一份数据复制成 `dsh-todo-YYYY-MM-DD.json`，只留最新 7 份
- **手动**：点「立即备份」，Host 直接另存磁盘文件，永不清理，可在页面上删除
- **恢复**：完全覆盖当前内容（不同于导入的**合并**）；确认后会先把现状存成一份手动备份，所以恢复本身可撤销

## 开发

```
node build.mjs          # src/ 拼成 client/index.js
node build.mjs --check  # 检查产物是否最新
```

Client 产物是单个纯 JS 文件（无 import / JSX / 打包器），由 `build.mjs` 按依赖顺序拼接。**改了 `src/` 必须重新构建**，`client/index.js` 不要手改。

改完生效：重新构建 → 重启 Host（产物按文件元数据缓存）→ 刷新页面。面板标题旁的版本号（如 `v2026-11-09.2`）用来确认加载的是哪份代码，改完记得把 `src/constants.js` 里的 `BUILD` 挪一位。

几处容易踩的地方：

- `index.js` 的 `pickState()` 是文件形状的白名单，**状态顶层新增字段必须加进去**，否则 Client 提交了也会被静默丢弃
- 同特异性 CSS 后写的赢，一条看着对的规则可能被下面的覆盖掉——改完在 DevTools 里确认最终生效值
- 日期存 `YYYY-MM-DD` 而不是时间戳，`toISOString()` 会跨时区滚到第二天

## 卸载

```
plugin_manager: remove_bundle  target=@local/dsh-todo
```

数据不会跟着删，想清空手动删掉 `~/Documents/dsh-todo/`。

## 许可

[MIT](LICENSE) © 2026 lzz
