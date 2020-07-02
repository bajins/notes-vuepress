# NodeJS


[[toc]]



## flag

* [NodeJs小册](https://nodejs.fasionchan.com/zh_CN/latest/index.html)
* [https://github.com/nodejs](https://github.com/nodejs)
* [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)

> `node`执行脚本时获取参数`process.argv`数组，下标`0`为执行程序的绝对路径，下标`1`为脚本的绝对路径，
> 所以真正的参数从下标`2`开始`process.argv.splice(2)`


## 第三方依赖

* [https://github.com/liriliri/licia](https://github.com/liriliri/licia)
* [https://github.com/Rob--W/cors-anywhere](https://github.com/Rob--W/cors-anywhere)
* [https://github.com/apache/incubator-echarts](https://github.com/apache/incubator-echarts)

**HTTP**

* [https://github.com/wendux/fly](https://github.com/wendux/fly)
* [https://github.com/github/fetch](https://github.com/github/fetch)
* [https://github.com/axios/axios](https://github.com/axios/axios)


**导出**

* [TableExport](https://github.com/clarketm/TableExport)
* [tableExport.jquery.plugin](https://github.com/hhurz/tableExport.jquery.plugin)
* [excellentexport](https://github.com/jmaister/excellentexport)



**WEB开发**

* [https://github.com/facebook/react](https://github.com/facebook/react)
    * [https://reactnative.cn](https://reactnative.cn)
* [https://github.com/angular/angular](https://github.com/angular/angular)
    * [https://angular.cn](https://angular.cn)
* [https://github.com/zdhxiong/mdui](https://github.com/zdhxiong/mdui)
* [https://github.com/baidu/amis](https://github.com/baidu/amis)
* [https://github.com/alienzhou/web-highlighter](https://github.com/alienzhou/web-highlighter)
* [https://github.com/josdejong/mathjs](https://github.com/josdejong/mathjs)
* 单页网站 [https://github.com/alvarotrigo/fullPage.js](https://github.com/alvarotrigo/fullPage.js)


**原生应用开发**

* [https://github.com/topics/electron](https://github.com/topics/electron)
    * [https://github.com/electron/electron](https://github.com/electron/electron)
* [使用 node-ffi 构建 Electron 和 C++ Library 混合桌面应用](https://io.hancel.org/2018/05/02/building-an-electron-hybrid-application.html)
* [https://github.com/topics/nwjs](https://github.com/topics/nwjs)
    * [https://github.com/nwjs/nw.js](https://github.com/nwjs/nw.js)
    * [https://github.com/lxp135/NW.jsCnDocs](https://github.com/lxp135/NW.jsCnDocs)
* [https://github.com/Kagami/mpv.js](https://github.com/Kagami/mpv.js)


**Player**

* [萌豚技术组织 | 播放器、音视频、弹幕相关开源开发](https://github.com/MoePlayer)
* [Plyr–一个轻量级的HTML5播放器](https://github.com/sampotts/plyr)



**反爬虫**

* [https://github.com/antoinevastel/fpscanner](https://github.com/antoinevastel/fpscanner)
* [https://github.com/ta7sudan/secan](https://github.com/ta7sudan/secan)
* [前端如何检测Chrome-Headless不被爬虫虐](https://mlln.cn/2019/07/05/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%A3%80%E6%B5%8BChrome-Headless%E4%B8%8D%E8%A2%AB%E7%88%AC%E8%99%AB%E8%99%90)




## 管理NodeJS


**rpm**

> npm与Node.js一起存在，这意味着当您下载并安装Node.js时，您会自动在计算机上安装npm

* [https://github.com/nodesource/distributions](https://github.com/nodesource/distributions)

```bash
# CentOS安装
# 到https://github.com/nodesource/distributions#installation-instructions-1
# 复制更新软件源命令，并执行
curl -sL https://rpm.nodesource.com/setup_12.x | bash -
# 安装
yum install -y nodejs
# 检查Node.js和NPM版本
node -v && npm -v
```

**NVM**

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




## 依赖管理

* [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)


### 管理yarn

```bash
# 安装
npm install -g yarn
```

**卸载**

```bash
# 查找目录并删除
yarn global bin
# 卸载
npm uninstall -g yarn
```


### 依赖镜像

- `npm i -g nrm` 安装`nrm`，`nrm ls` 查看下载镜像源，`nrm use taobao` 切换镜像源

- 手动配置

> 如果使用`yarn`，就把命令开头的`npm`替换为`yarn`

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

**yarn**

> `yarn.lock`和`package.json`都会更新，但是会进行版本锁定

- 更新所有到最新版本

> 需要手动选择升级的依赖包，<kbd>a</kbd>键选择所有，<kbd>i</kbd>键反向选择

```bash
yarn upgrade-interactive --latest
```

- 更新单个到指定版本

```bash
yarn upgrade package@latest
```


**npm**

> 更新`dependencies`到最新版本

```bash
# 先检查更新
npm outdated
# 安装
npm install -g npm-check-updates
# 检查可更新依赖，ncu
npm-check-updates
# 更新，ncu -u
ncu --upgrade
# 安装最新版本依赖
npm install
```


### yarn和npm命令

| npm                                   	| yarn                       	| 说明                             	|
|---------------------------------------	|----------------------------	|----------------------------------	|
| npm install(i)                        	| yarn/yarn install          	| 根据package.json安装依赖         	|
| npm uninstall(un) 包名 –-global(-g)   	| yarn global remove 包名    	| 卸载全局依赖包                   	|
| npm uninstall(un) 包名 -–save(-S)     	| yarn remove 包名           	| 卸载依赖，并删除package.json中的 	|
| npm uninstall(un) 包名 -–save-dev(-D) 	| yarn remove 包名 –dev(-D)  	| 卸载开发环境依赖                 	|
| npm install 包名 –-global(-g)         	| yarn global add 包名       	| 安装全局依赖包                   	|
| npm install 包名 -–save(-S)           	| yarn add 包名              	| 安装依赖，并保存到package.json   	|
| npm install 包名 -–save-dev(-D)       	| yarn add 包名 –dev(-D)     	| 安装开发环境依赖                 	|
| npm update 包名 –-global(-g)          	| yarn global upgrade 包名   	| 更新全局依赖                     	|
| npm update 包名 -–save(-S)            	| yarn upgrade 包名          	| 更新依赖                         	|
| npm update 包名 -–save-dev(-D)        	| yarn upgrade 包名 –dev(-D) 	| 更新开发环境依赖                 	|
| npm cache clean                       	| yarn cache clean           	| 清除缓存                         	|
| rm -rf node_modules && npm install    	| yarn upgrade               	| 重装                             	|
| npm init                              	| yarn init                  	| 初始化某个项目                   	|
| npm publish/login/logout              	| yarn publish/login/logout  	| 发布/登录/登出，NPM Registry操作 	|
| npm run/test 命令                     	| yarn run/test 命令         	| 运行某个命令                     	|




## 解析

```js
/**
 * https://www.npmjs.com/search?q=keywords:xml2js
 */

const fs = require("fs");
//模拟发送http请求
const request = require("request");
// npm install xpath
// https://github.com/yaronn/xpath.js
const xpath = require('xpath');

//get请求
request('https://jolx-1256021553.cos.ap-chengdu.myqcloud.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // npm install xmlreader
        // const xmlreader = require("xmlreader");
        // xmlreader.read(body, function (errors, res) {
        //     if (null !== errors) {
        //         console.log(errors)
        //         return;
        //     }
        //     console.log(res);
        // });

        // npm install xml2js
        // const Xml2js = require('xml2js');
        // const Parser = new Xml2js.Parser({ explicitArray: false, ignoreAttrs: false });

        // Parser.parseString(body, function (err, result) {
        //     console.log(result);
        // });

        // npm install xmldom
        // https://github.com/goto100/xpath
        // const dom = require('xmldom').DOMParser;
        // let doc = new dom().parseFromString(body);
        // console.log(doc);

        // npm install fast-xml-parser
        // const parser = require('fast-xml-parser');
        // const doc = parser.parse(body);
        // console.log(doc);

        // npm install xml-js
        const convert = require('xml-js');
        const doc = convert.xml2js(body);
        console.log(doc);
    }
});

//post请求
request({
    url: "https://jolx-1256021553.cos.ap-chengdu.myqcloud.com",
    method: "post",//如果是post就涉及到跨域的问题了
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: {
        account: 'admin',
        pwd: 'admin'
    }
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
});
```



## 爬虫

* [https://github.com/GoogleChrome/puppeteer](https://github.com/GoogleChrome/puppeteer)
* [Puppeteer配置小记](https://www.itfanr.cc/2019/04/10/configuration-development-of-puppeteer)
* [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)

**[xpath和css选择器](/Python/Python爬虫.md#xpath和css选择器)**
**[`chromedriver`](/Python/Python爬虫.md#chromedriver)**

* [https://github.com/ebidel/try-puppeteer](https://github.com/ebidel/try-puppeteer)
* [https://github.com/berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra)



## VueJS

* [https://github.com/vuejs/vue](https://github.com/vuejs/vue)
    * [https://cn.vuejs.org](https://cn.vuejs.org)
* [vue学习笔记](https://www.rumosky.wiki/docs/vue_learning_process)

![](/images/vue生命周期详解.png)


* [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)


### VueJS框架

* [https://madewithvuejs.com](https://madewithvuejs.com)
* [https://github.com/vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify)
* [https://github.com/buefy/buefy](https://github.com/buefy/buefy)
* [https://github.com/bootstrap-vue/bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
* [https://github.com/vuematerial/vue-material](https://github.com/vuematerial/vue-material)
* [https://github.com/quasarframework/quasar](https://github.com/quasarframework/quasar)
* [https://github.com/uikit/uikit](https://github.com/uikit/uikit)
* [https://github.com/sdc-alibaba/sui](https://github.com/sdc-alibaba/sui)
* [https://github.com/FE-Driver/vue-beauty](https://github.com/FE-Driver/vue-beauty)
* [https://github.com/chenz24/vue-blu](https://github.com/chenz24/vue-blu)
* [https://github.com/ant-design/ant-design](https://github.com/ant-design/ant-design)
* [https://github.com/heyui/heyui](https://github.com/heyui/heyui)
* [https://github.com/at-ui/at-ui](https://github.com/at-ui/at-ui)
* [https://github.com/view-design/ViewUI](https://github.com/view-design/ViewUI)
* [https://github.com/ElemeFE/element](https://github.com/ElemeFE/element)



**Mobile**

* [https://github.com/airyland/vux](https://github.com/airyland/vux)
* [https://github.com/sdc-alibaba/SUI-Mobile](https://github.com/sdc-alibaba/SUI-Mobile)
* [https://github.com/ElemeFE/mint-ui](https://github.com/ElemeFE/mint-ui)
* [https://github.com/didi/cube-ui](https://github.com/didi/cube-ui)


### 动态导入组件

```js
() => import(`@${_this.files.path}.vue`)

//component(resolve) {require([`@${_this.files.path}.vue`], resolve)}
resolve => require([`@${_this.files.path}.vue`], resolve)

resolve => require.ensure([], () => resolve(require(`@${_this.files.path}.vue`)))

const resolveRequire = (path) => {
    return resolve => {
        require.ensure([], (require) => {
            resolve(require(`@${path}.vue`));
        });
    }
}
```

