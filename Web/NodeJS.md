# NodeJS


[[toc]]



## Flag

+ [https://github.com/denoland/deno](https://github.com/denoland/deno)

* [NodeJs小册](https://nodejs.fasionchan.com/zh_CN/latest/index.html)
* [https://github.com/nodejs](https://github.com/nodejs)
* [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)
* [https://developer.ibm.com/zh/technologies/node-js](https://developer.ibm.com/zh/technologies/node-js)

> `node`执行脚本时获取参数`process.argv`数组，下标`0`为执行程序的绝对路径，下标`1`为脚本的绝对路径，
> 所以真正的参数从下标`2`开始`process.argv.splice(2)`

* [https://github.com/stylus](https://github.com/stylus)

- [https://github.com/webpack/webpack](https://github.com/webpack/webpack)
    - [https://webpack.js.org](https://webpack.js.org)
    - [https://www.webpackjs.com](https://www.webpackjs.com)




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
* [https://github.com/npm](https://github.com/npm)
* [https://github.com/yarnpkg](https://github.com/yarnpkg)


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




## 原生应用开发

> 在3大主流渲染引擎里，webview、react native/weex、flutter，复杂度依次降低，渲染性能依次上升。

+ [https://github.com/apache/cordova](https://github.com/apache/cordova)

* [https://github.com/facebook/react-native](https://github.com/facebook/react-native)
    * [https://reactnative.cn](https://reactnative.cn)
* [https://github.com/necolas/react-native-web](https://github.com/necolas/react-native-web)
* [https://github.com/angular/angular](https://github.com/angular/angular)
    * [https://angular.io](https://angular.io)
* [https://github.com/kuaifan/eeui](https://github.com/kuaifan/eeui)
* [https://github.com/hminghe/weex-amui](https://github.com/hminghe/weex-amui)
* [https://github.com/bingo-oss/bui-weex](https://github.com/bingo-oss/bui-weex)
* [https://github.com/apache/incubator-weex](https://github.com/apache/incubator-weex)
    * [https://github.com/apache/incubator-weex-ui](https://github.com/apache/incubator-weex-ui)
    * [https://github.com/apache/incubator-weex-site](https://github.com/apache/incubator-weex-site)
    * [https://segmentfault.com/t/weex](https://segmentfault.com/t/weex)
* [https://github.com/NativeScript](https://github.com/NativeScript)
* [https://github.com/topics/electron](https://github.com/topics/electron)
    * [https://github.com/electron/electron](https://github.com/electron/electron)
* [使用 node-ffi 构建 Electron 和 C++ Library 混合桌面应用](https://io.hancel.org/2018/05/02/building-an-electron-hybrid-application.html)
* [https://github.com/topics/nwjs](https://github.com/topics/nwjs)
    * [https://github.com/nwjs/nw.js](https://github.com/nwjs/nw.js)
    * [https://github.com/lxp135/NW.jsCnDocs](https://github.com/lxp135/NW.jsCnDocs)
* [https://github.com/Kagami/mpv.js](https://github.com/Kagami/mpv.js)
* 将 Node.js 项目打包到可执行文件中 [https://github.com/vercel/pkg](https://github.com/vercel/pkg)




## 爬虫

* [https://github.com/webdriverio](https://github.com/webdriverio)
* [https://github.com/puppeteer](https://github.com/puppeteer)
* [Puppeteer配置小记](https://www.itfanr.cc/2019/04/10/configuration-development-of-puppeteer)
* [https://github.com/microsoft/playwright](https://github.com/microsoft/playwright)
* 一个基于webkit的JavaScript API [https://github.com/ariya/phantomjs](https://github.com/ariya/phantomjs)
    * [PhantomJS -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/tool/phantomjs.html)

**[xpath和css选择器](/Python/Python爬虫.md#xpath和css选择器)**
**[`chromedriver`](/Python/Python爬虫.md#chromedriver)**

* [https://github.com/ebidel/try-puppeteer](https://github.com/ebidel/try-puppeteer)
* [https://github.com/berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra)




## 小程序

+ [https://github.com/search?q=weapp](https://github.com/search?q=weapp)
+ [https://github.com/topics/wxapp](https://github.com/topics/wxapp)
+ [https://github.com/topics/weapp](https://github.com/topics/weapp)
+ [https://github.com/topics/wechat](https://github.com/topics/wechat)
+ [https://github.com/topics/minapp](https://github.com/topics/minapp)
+ [https://github.com/topics/wechat-app](https://github.com/topics/wechat-app)
+ [https://github.com/topics/wechat-mini-program](https://github.com/topics/wechat-mini-program)
+ [https://github.com/topics/weixin](https://github.com/topics/weixin)

- [https://github.com/Wechat-Group](https://github.com/Wechat-Group)

* [https://github.com/justjavac/awesome-wechat-weapp](https://github.com/justjavac/awesome-wechat-weapp)
* [https://github.com/qiushi123/xiaochengxu_demos](https://github.com/qiushi123/xiaochengxu_demos)

- 使用Golang开发的微信SDK: [https://github.com/silenceper/wechat](https://github.com/silenceper/wechat)


**框架**

* [https://github.com/dcloudio/uni-app](https://github.com/dcloudio/uni-app)
* [https://github.com/NervJS/taro](https://github.com/NervJS/taro)
    * [https://taro.aotu.io](https://taro.aotu.io)
* [https://github.com/tinajs/tina](https://github.com/tinajs/tina)
* [https://github.com/didi/chameleon](https://github.com/didi/chameleon)
* [https://github.com/didi/mpx](https://github.com/didi/mpx)
* [https://github.com/kaola-fed/megalo](https://github.com/kaola-fed/megalo)
* [https://github.com/Tencent/wepy](https://github.com/Tencent/wepy)
* [https://github.com/Meituan-Dianping/mpvue](https://github.com/Meituan-Dianping/mpvue)


**Other**

* [https://gitee.com/laeser/demo-weapp](https://gitee.com/laeser/demo-weapp)
* [小程序海报组件-生成朋友圈分享海报并生成图片](https://github.com/jasondu/wxa-plugin-canvas)
* [微信小程序Markdown渲染库](https://github.com/TooBug/wemark)
* [手持弹幕微信小程序版](https://github.com/redblue9771/minibarrage)
* [https://github.com/super456/weapp_expressTime](https://github.com/super456/weapp_expressTime)



### 自定义组件

* [https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component)



**组件库**

* [https://github.com/youzan/vant-weapp](https://github.com/youzan/vant-weapp)
* [https://github.com/jisida/VtuWeapp](https://github.com/jisida/VtuWeapp)
* [https://github.com/wux-weapp/wux-weapp](https://github.com/wux-weapp/wux-weapp)
* [https://github.com/Tencent/weui](https://github.com/Tencent/weui)
* [https://github.com/weilanwl/ColorUI](https://github.com/weilanwl/ColorUI)


**日历**

* [https://github.com/treadpit/wx_calendar](https://github.com/treadpit/wx_calendar)


**授权**

* [https://github.com/misterxu1567/wxMiniProgram-components](https://github.com/misterxu1567/wxMiniProgram-components)
* [https://github.com/GRW999/auth-component](https://github.com/GRW999/auth-component)
* [https://github.com/yeyi361936738/mini-login-component](https://github.com/yeyi361936738/mini-login-component)
* [https://github.com/Skura23/authModal](https://github.com/Skura23/authModal)


**搜索**

* [https://github.com/fancaixia/SearchBar](https://github.com/fancaixia/SearchBar)
* [https://github.com/mindawei/wsSearchView](https://github.com/mindawei/wsSearchView)
