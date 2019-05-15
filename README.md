---
home: true
//heroImage: /hero.png
actionText: 快速上手 →
actionLink: /#命令
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2019 Bajins
---

# 使用

::: tip
基于本仓库可快速创建你自己的文档网站
:::

## 目录结构

```
// 官方标准目录结构 https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html
.
│  package-lock.json NMP依赖配置文件
│  package.json      项目配置文件
│  README.md         首页md文件
│  yarn.lock         yarn依赖配置文件
│  
├─.vuepress         用于存放VuePress的配置、组件、静态资源等。
│  │  config.js     VuePress配置
│  │  nav.js        导航栏
│  │  sidebar.js    侧边栏
│  │  
│  └─public        静态资源目录
│      │  
│      ├─icons     存放图标目录
│      │      
│      └─images    存放所有文档的图片目录
├─docs              编译后的静态资源文件输出目录
│              
│
│
...... 其他自己的md文档或文件夹，都会打包到docs文件夹下，md文件会编译成html

```
### 也就是你只需要遵从以上目录结构来修改你自己的文档即可使用。
::: warning 注意
配置文件中的注释文字部分，请结合VuePress[官方文档](https://v1.vuepress.vuejs.org/zh/config/)一定理解其意义再修改配置！
:::

## 命令

``` bash
# 先克隆本仓库
git clone https://github.com/woytu/UseNotes.git

# 除了以下文件或文件夹，其他的全部删除：
# .vuepress、docs、package.json、README.md、yarn.lock、package-lock.json

# 使用前请自行安装Node.js环境
# 安装yarn
npm install -g yarn

# 安装项目的全部依赖
yarn install

# 这时创建并书写你自己的文档
# 再配置.vuepress/nav.js和.vuepress/sidebar.js两个文件

# 开始运行开发环境，然后访问窗口中的路径
yarn dev


# 构建静态文件并上传到仓库正式使用
yarn build

# 如果是直接发布到本仓库，那么就把docs文件夹下的所有文件都push，
# 然后再在GitHub设置中指定Source为docs文件夹

# 可以把编译后的静态文件部署到指定仓库
cd /docs
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
git push -f https://github.com/<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages
```

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::
