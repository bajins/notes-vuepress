---
home: true
//heroImage: /hero.png
actionText: 快速上手 →
actionLink: /#命令
---

# 使用

::: tip
基于本仓库可快速创建你自己的文档网站。
[高亮语法支持列表](https://prismjs.com/#languages-list)
:::
::: tip
编译时自动帮你配置菜单栏和侧边栏，最多三层目录结构。
:::
::: tip
非常多的热心开发者开源主题[theme](/Theme.md)
:::

## 目录结构

```
// 官方标准目录结构 https://v1.vuepress.vuejs.org/zh/guide/directory-structure.html
.
│  package-lock.json NPM依赖配置文件
│  package.json      项目配置文件
│  README.md         首页md文件
│  yarn.lock         yarn依赖配置文件
│  
├─.vuepress         用于存放VuePress的配置、组件、静态资源等。
│  │  config.js     VuePress配置
│  │  nav.js        除创建的目录之外，还可以自定义添加导航栏
│  │  utils.js      侧边栏和菜单栏自动配置工具
│  │  
│  └─public        静态资源目录
│      │  
│      ├─icons     存放图标目录
│      │      
│      └─images    存放所有文档的图片目录
├─docs              编译后的静态资源文件输出目录
│
│
...... 其他自己的md文档或文件夹，都会打包到docs文件夹下，md文件会编译成html

```
### 也就是你只需要遵从以上目录结构来修改你自己的文档即可使用。
::: warning 注意
配置文件中的注释文字部分，请结合[VuePress官方文档](https://v1.vuepress.vuejs.org/zh/config/)一定理解其意义再修改配置！
:::

## 命令

``` bash
# 先克隆本仓库
git clone https://github.com/woytu/UseNotes.git

# 保留上面目录结构列出的文件和文件夹，其他的全部删除

# 使用前请自行安装Node.js环境
# 安装yarn
npm install -g yarn

# 安装项目的全部依赖
yarn install

# 这时创建并书写你自己的文档
# 再配置.vuepress/nav.js和.vuepress/sidebar.js两个文件

# 开始运行开发环境，然后访问窗口中的路径
yarn dev


# 如果是直接发布到本仓库：
# 执行下面的命名会自动编译并提交，然后再在GitHub设置中指定Source为docs文件夹
yarn push-docs

# 如果发布到 https://<USERNAME>.github.io
# 修改.vuepress/push.js文件中的仓库地址并执行以下命令即可
yarn push-pages

```

::: warning 注意
请确保你的 Node.js 版本 >= 8.6。
:::
