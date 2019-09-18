# JavaScript



* [CDN](#cdn)
  * [other](#other)
* [Http](#http)
* [NodeJs](#nodejs)
  * [安装](#安装)
  * [npm和yarn镜像](#npm和yarn镜像)
  * [更新依赖包](#更新依赖包)
    * [yarn](#yarn)
    * [npm](#npm)
  * [依赖管理](#依赖管理)





* [浏览器脚本教程](https://www.w3school.com.cn/b.asp)

* [参考手册](https://www.w3school.com.cn/r.asp)


## CDN

> unpkg：`https://unpkg.com`
>
> 知乎-unpkg：`http://unpkg.zhimg.com`
>
> 饿了么-unpkg：`http://npm.elemecdn.com`

- 使用unpkg

> 使用固定的版本号：
>> `unpkg.com/react@16.0.0/umd/react.production.min.js`
>>
>> `unpkg.com/react-dom@16.0.0/umd/react-dom.production.min.js`
>
> 也可使用语义化版本范围，或标签来代替固定版本号，亦可忽略版本和标签，直接使用最新的版本。
>> `unpkg.com/react@^16/umd/react.production.min.js`
>>
>> `unpkg.com/react/umd/react.production.min.js`
>
> 如果忽略了文件的路径（例如，使用裸网址 “bare” URL），unpkg 会提供 package.json 里指定的文件，或降级到 main。
>> `unpkg.com/d3`
>>
>> `unpkg.com/jquery`
>>
>> `unpkg.com/three`
>
> 注：这种方式会产生一次 302 到最新的文件 URL。好处是自动使用最新版，坏处是多一次性跳转，降低了性能。
>
> 在网址最后添加斜线，可以查看一个包内的所有文件列表。
>> `unpkg.com/react/`
>>
>> `unpkg.com/lodash/`

### other

[jsdelivr](https://www.jsdelivr.com/)

[cdnjs](https://cdnjs.com/)

[bootcdn](http://www.bootcdn.cn/)

[StaticfileCDN](http://staticfile.org/)

[75CDN](https://cdn.baomitu.com/)


## Http

* [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)

* [HTTP封装](https://github.com/woytu/key-gin/blob/master/static/js/http.js)


### XMLHttpRequest

* [XMLHttpRequest—必知必会](https://www.jianshu.com/p/918c63045bc3)

* [XMLHttpRequest封装源码](https://github.com/yanxiaojun617/exercise/tree/master/src/20180410ajax)

- http,XMLHttpRequest,Ajax的关系

> http是浏览器和web服务器交换数据的协议,规范
>
> XMLHttpRequest是JavaScript的一个对象,是浏览器实现的一组api函数(方法),使用这些函数,浏览器再通过http协议请求和发送数据
>> XMLHttpRequest请求数据>使用js操作dom
>
> Ajax不是一种技术,是综合多种技术实现交互的模式:用html+css展示页面>使用

* [ajax和axios、fetch的区别](https://www.jianshu.com/p/8bc48f8fde75)

* [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

> fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。
> Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。
> fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。



## NodeJs

### 安装

- rpm

> npm与Node.js一起存在，这意味着当您下载并安装Node.js时，您会自动在计算机上安装npm

```bash
# 到https://github.com/nodesource/distributions#installation-instructions-1
# 复制更新软件源命令，并执行
curl -sL https://rpm.nodesource.com/setup_12.x | bash -
# 安装
yum install -y nodejs
# 检查Node.js和NPM版本
node -v && npm -v
```

- NVM

> nodeJs版本管理工具,管理nodejs版本和npm版本

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
# 刷新
source ~/.bashrc
# 查询最新版本号
nvm ls-remote --lts
# 安装稳定版 Nodejs
nvm install <最新的版本号>
```


### npm和yarn镜像

- 如果使用`yarn`，就把命令开头的`npm`替换为`yarn`

```bash
# 查看仓库地址
npm config get registry

# 设置官方仓库地址
npm config set registry https://registry.npmjs.org

# 设置淘宝镜像仓库地址
npm config set registry https://registry.npm.taobao.org

# 查看代理地址
npm config get proxy
npm config get https-proxy

# 设置代理地址
npm config set proxy http://127.0.0.1:1080
# 设置https代理地址
npm config set https-proxy http://server:port

# 设置代理用户名和密码
npm config set proxy http://username:password@server:port
npm confit set https-proxy http://username:password@server:port

# 删除代理地址
npm config delete proxy
npm config delete https-proxy
```

### 更新依赖包

#### yarn

- 更新所有到最新版本

> 推荐，不需要安装过多的依赖就可以达到目的

```bash
# 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
yarn upgrade-interactive --latest
```

- 更新单个到指定版本

```bash
# yarn.lock和package.json都会更新，但是会进行版本锁定
yarn upgrade package@latest
```

#### npm

> 更新`dependencies`到最新版本

```bash
# 先安装
npm install -g npm-check-updates
# 或者
yarn global add npm-check-updates
# 更新
npm-check-updates
# 或者
ncu -u
# 或者
ncu --upgrade
# 安装最新版本依赖
npm install
```


### 依赖管理

- yarn、npm命令简单比较

| npm                                | yarn                      | 说明                         |
|------------------------------------|---------------------------|----------------------------|
| npm install(i)                     | yarn                      | 安装                         |
| npm uninstall(un)                  | yarn remove               | 卸载                         |
| npm install xxx –-global(-g)       | yarn global add xxx       | 全局安装                       |
| npm install xxx –save(-S)          | yarn add xxx              | 安装包                        |
| npm install xxx –save-dev(-D)      | yarn add xxx –dev(-D)     | 开发模式安装包                    |
| npm update –save                   | yarn upgrade              | 更新                         |
| npm update –global                 | yarn global upgrade       | 全局更新                       |
| npm uninstall [–save/–save-dev]    | yarn remove xx            | 卸载                         |
| npm cache clean                    | yarn cache clean          | 清除缓存                       |
| rm -rf node_modules && npm install | yarn upgrade              | 重装                         |
| npm init                           | yarn init                 | 初始化某个项目                    |
| npm install/link                   | yarn install/link         | 默认的安装依赖操作                  |
| npm install koa --save             | yarn add koa              | 安装某个依赖，并且默认保存到package      |
| npm uninstall koa --save           | yarn remove koa           | 移除某个依赖项目                   |
| npm install koa --save-dev         | yarn add koa --dev        | 安装某个开发时依赖项目                |
| npm update koa --save              | yarn upgrade koa          | 更新某个依赖项目                   |
| npm install koa --global           | yarn global add koa       | 安装某个全局依赖项目                 |
| npm publish/login/logout           | yarn publish/login/logout | 发布/登录/登出，一系列NPM Registry操作 |
| npm run/test                       | yarn run/test             | 运行某个命令                     |
