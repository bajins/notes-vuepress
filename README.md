---
home: true
//heroImage: /hero.png
actionText: 快速上手 →
actionLink: /WEB/JavaScript/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2019 Bajins
---

## 基于本仓库可快速创建你自己的文档网站

### 先看看本仓库目录结构

```
// 官方标准目录结构 https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html
.
├─ README.md        // 首页文档
├─ docs/            // 编译后存放静态文件的目录，GitHub Pages指向此目录
├─ .vuepress/       // 用于存放全局的配置、组件、静态资源等。
│  ├─ public/       // 静态资源目录。
│  |  ├─ icons/     // 存放图标目录
│  |  └─ images/    // 存放所有文档的图片目录
│  ├─ config.js     // 配置文件的入口文件。
│  ├─ nav.js        // 导航栏 配置文件
│  └─ sidebar.js    // 侧边栏 配置文件
├─ .../             // 你自己的文档目录
│  ├─ ....md
│
└─ package.json     // 项目全局配置

```
### 也就是你只需要遵从以上目录结构来修改你自己的文档即可使用。
::: warning 注意
配置文件中的注释文字部分，请结合VuePress官方文档一定理解其意义再修改配置！
:::

``` bash
# 使用前请自行安装Node.js环境
# 安装yarn
npm install -g yarn

# 安装项目的全部依赖
yarn install

# 开始运行开发环境
yarn dev

# 构建静态文件
yarn build
```

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::
