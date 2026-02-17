# TODO: BST236 Coding Blog — GitHub Pages 多页面网站

## 项目概述

为 BST236 课程搭建一个基于 GitHub Pages 的 Coding Blog 网站。  
主页标题："BST236 Coding Blog"，左侧导航栏支持多个 Homework 页面跳转，结构可扩展。

---

## 目标文件结构

```
Problem_1_Github_website/
├── index.html          # 主页（含欢迎内容 + 左侧导航）
├── hw0.html            # Homework 0 页面
├── hw1.html            # Homework 1 页面（含 Pac-Man 和 ArXiv 链接）
├── css/
│   └── style.css       # 全局统一样式
└── TODO.md             # 本文件
```

---

## 阶段 1：结构设计

- [x] 确认文件目录结构（见上方）
- [x] 设计统一页面布局模板：
  - `<header>`：顶部标题栏，显示 "BST236 Coding Blog"
  - `<nav class="sidebar">`：左侧固定导航栏
  - `<main class="content">`：右侧主内容区
  - `<footer>`：底部版权信息
- [x] 确定导航栏条目：
  - Home → `index.html`
  - Homework 0 → `hw0.html`
  - Homework 1 → `hw1.html`
  - （预留 Homework 2, 3 … 的扩展位置）

---

## 阶段 2：页面实现

### 2.1 全局样式 `css/style.css`

- [x] 定义 CSS 变量（主色、背景色、字体等）
- [x] 实现 Header 样式（全宽置顶，居中标题）
- [x] 实现 Sidebar 样式（左侧固定宽度，垂直导航链接列表）
- [x] 实现 Content 区域样式（Sidebar 右侧自适应宽度）
- [x] 实现 Footer 样式（底部固定或随内容流动）
- [x] 导航链接 hover 效果与当前页高亮（`active` class）
- [x] 添加响应式适配（移动端 Sidebar 折叠或隐藏）
- [x] 引入 Google Fonts（如 Inter / Roboto）

### 2.2 主页 `index.html`

- [x] 搭建 HTML5 骨架（`<!DOCTYPE html>`, `<head>`, `<body>`）
- [x] 引入 `css/style.css`
- [x] 实现 Header（标题 "BST236 Coding Blog"）
- [x] 实现 Sidebar 导航（Home / HW0 / HW1）
- [x] 主内容区：欢迎语 + 课程简介 + 网站导航说明
- [x] 实现 Footer（版权 © 2026）

### 2.3 Homework 0 页面 `hw0.html`

- [x] 复用统一布局模板
- [x] Sidebar 中 "Homework 0" 链接标记为 `active`
- [x] 主内容区：Homework 0 的内容（标题 + 描述）

### 2.4 Homework 1 页面 `hw1.html`

- [x] 复用统一布局模板
- [x] Sidebar 中 "Homework 1" 链接标记为 `active`
- [x] 主内容区：Homework 1 简介
- [x] 添加子链接/卡片：
  - Pac-Man Game（链接到 Problem 2 的游戏页面，后续补充）
  - ArXiv Paper Feed（链接到 Problem 3 的页面，后续补充）

---

## 阶段 3：GitHub Pages 部署

- [ ] 将 `Problem_1_Github_website/` 文件夹内容部署到 GitHub Pages
  - **方案 A**：在个人 GitHub 账号下创建独立仓库（如 `<username>.github.io` 或 `coding-blog`），将网站文件推送到该仓库
  - **方案 B**：使用当前 homework 仓库，在 Settings → Pages 中选择分支和目录
- [ ] 在 GitHub 仓库 Settings → Pages 中启用 GitHub Pages
- [ ] 确认部署成功，获取公开访问 URL（如 `https://<username>.github.io/coding-blog/`）
- [ ] 在 homework 仓库的 `README.md` 中添加网站链接

---

## 阶段 4：优化与完善

- [x] 检查所有页面的导航链接是否正确跳转
- [x] 统一所有页面的样式（字体、颜色、间距一致）
- [x] 优化视觉效果（渐变背景、卡片阴影、动画过渡等）
- [ ] 确保页面在不同浏览器中显示正常
- [x] 为未来扩展预留空间（添加新 Homework 只需：新建 `hwX.html` + 在 Sidebar 中加一行链接）

---

## 测试检查清单

- [x] `index.html` 可正常打开，标题显示 "BST236 Coding Blog"
- [x] Sidebar 导航包含 Home / Homework 0 / Homework 1
- [x] 点击 Sidebar 各链接可正确跳转到对应页面
- [x] 各页面当前导航项有高亮样式
- [x] 所有页面 Header / Sidebar / Content / Footer 布局一致
- [ ] 移动端页面布局不崩溃
- [ ] GitHub Pages URL 可公开访问
- [ ] `README.md` 中包含网站链接且链接有效
- [ ] 添加新 Homework 页面只需新建 HTML + 更新导航（验证可扩展性）
