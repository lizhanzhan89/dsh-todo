# 项目描述

这个文件放的是给 GitHub 用的项目文案。仓库设置里的 **Description** 只能填一行、约 350 字符以内，
所以这里把短描述、长一点的开场白和 Topics 标签分开放，按需要复制。

> 文件本身不需要改代码，也不参与构建。

---

## 1. Repository description（仓库描述框，一行）

直接复制这一行贴进 GitHub 仓库右上角 **About → Description**：

```
Harness 侧边栏待办与笔记面板：按项目分组，多行条目、拖动排序、搜索、回收站、JSON 本地存储与导入导出。
```

英文版（如果你的仓库主要面向英文读者）：

```
A sidebar todo and note panel for the Harness: group by project, multi-line items, drag to reorder, search, recycle bin, local JSON storage with import and export.
```

---

## 2. Website / Topics

**Website** 留空即可（没有独立主页）。**Topics** 建议填：

```
harness  cordis  plugin  todo  notes  productivity  sidebar-panel  json-storage
```

---

## 3. About 段落（README 顶部或仓库首页的简介）

### 中文

**备忘录**是一个 Harness 侧边栏插件，把待办和笔记放在同一个面板里，按项目分块管理。

它解决的是「待办工具都太重」这件事：不联网、不要账号、没有同步服务器，数据就是工作区里的一个
`dsh-todo.json` 文件，想备份就导出，想迁移就复制文件。界面上只保留真正会用的东西——一个项目一块卡片，
四个标签页（全部 / 未完成 / 已完成 / 笔记），条目可以写多行，拖住行首的图标就能排序。

已完成的项目不会被删除，只会先进回收站；整个项目被删时，它的条目会跟着一起进去，恢复时原样回来。

### English

**Memos** is a Harness sidebar plugin that keeps todos and notes in one panel, grouped by project.

It exists because most todo apps are too heavy: no network, no account, no sync server. The data is a
single `dsh-todo.json` file in your workspace — export it to back up, copy it to move. The interface
keeps only what actually gets used: one card per project, four tabs (All / Active / Completed / Notes),
multi-line items, and drag-to-reorder by grabbing the grip at the start of a row.

Nothing is destroyed outright: deleted items and whole projects go to a recycle bin first, and restoring
a project brings its items back with it.

---

## 4. 一句话版本（社交平台 / 转发用）

- 中文：Harness 里的待办面板：按项目管理、支持多行、本地存 JSON，不等云同步。
- English: A todo panel for Harness — per-project, multi-line, stored as a local JSON file, no cloud required.

---

## 5. 功能清单（粘贴到 PR 描述或 Release 说明时用）

```
- 按项目分组，默认组固定在第一个
- 每个组四个标签页：全部 / 未完成 / 已完成 / 笔记，选中状态各自记忆
- 条目支持多行文本，列表里完整显示，编辑框最多三行
- 只拖动行首图标即可排序，不会误触选中文字
- 已完成待办记录完成时间，且不可编辑（需先取消完成）
- 回收站：删除的条目和项目可恢复或永久删除
- 搜索：跨标签页就地过滤，可选是否包含已完成
- 数据存为 JSON 文件，支持导出、导入（合并，不覆盖）与手动同步
- 全部操作本地完成，无网络请求之外的依赖
```
