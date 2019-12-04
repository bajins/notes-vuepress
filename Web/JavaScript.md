# JavaScript


* [手册](#手册)
* [CDN](#cdn)
  * [other](#other)
* [Http](#http)
  * [XMLHttpRequest](#xmlhttprequest)
* [NodeJs](#nodejs)
  * [安装rpm](#安装rpm)
  * [安装NVM](#安装nvm)
  * [安装yarn](#安装yarn)
  * [npm和yarn镜像](#npm和yarn镜像)
  * [yarn更新依赖包](#yarn更新依赖包)
  * [npm更新依赖包](#npm更新依赖包)
  * [依赖管理](#依赖管理)
* [类型判断](#类型判断)
* [爬虫](#爬虫)
  * [Puppeteer](#puppeteer)



## 手册

> `HTML`网页中，浏览器通过`script`标签加载脚本的默认语言是`JavaScript`，因此`type="application/javascript"`可以省略。

* [浏览器脚本教程](https://www.w3school.com.cn/b.asp)

* [参考手册](https://www.w3school.com.cn/r.asp)

* [ECMAScript 6入门](https://github.com/ruanyf/es6tutorial)

* [ECMAscript和Javascript的区别](https://www.jianshu.com/p/10cfcb536d4a)

* [es6支持情况](http://kangax.github.io/compat-table/es6)

* [检查JavaScript文件中的ES版本](https://github.com/dollarshaveclub/es-check)

* [ECMAScript支持度检测](https://github.com/ruanyf/es-checker)




## ECMAScript6启用

* [在浏览器中使用javascript module](https://www.jianshu.com/p/f7db50cf956f)

- `Uncaught SyntaxError: Cannot use import statement outside a module`

> 在报错是说无法在模块外部使用`import`语句，因为`Module`的加载实现的是`es6`语法，
> 所以在浏览器加载`html`文件时，需要在`script`标签中加入`type="module"`属性。

```html
<script type="module" src="/static/js/index.js"></script>
```

- 在module中绑定事件

```js
// ECMAScript6使用全局变量配置页面绑定事件
window.getKey = getKey;
// ECMAScript6指定元素添加事件
document.querySelector("#id").addEventListener("click", testOnclick);
```


## 类库

* [JavaScript 日期处理类库](https://github.com/moment/moment)
[http://momentjs.cn](http://momentjs.cn)

* [https://github.com/matthewhudson/current-device](https://github.com/matthewhudson/current-device)



## CDN

- [https://cdnjs.com](https://cdnjs.com)

- 知乎：[https://unpkg.zhimg.com](https://unpkg.zhimg.com)

- 饿了么：[https://npm.elemecdn.com](https://npm.elemecdn.com)


* [https://unpkg.com](https://unpkg.com)

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



* [https://www.jsdelivr.com](https://www.jsdelivr.com)

* [https://www.bootcdn.cn](https://www.bootcdn.cn)

* [http://staticfile.org](http://staticfile.org)

* [https://cdn.baomitu.com](https://cdn.baomitu.com)


## Http

* [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)

* [HTTP封装](https://github.com/woytu/key-gin/blob/master/static/js/utils)


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

* [NodeJs小册](https://nodejs.fasionchan.com/zh_CN/latest/index.html)

* [https://github.com/nodejs](https://github.com/nodejs)

* [https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)


### 安装rpm


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

### 安装NVM

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

### 安装yarn

```bash
npm install -g yarn
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


### yarn更新依赖包


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


### npm更新依赖包

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



## 类型判断

### typeof

> `[]`和`null`被`typeof`解释为`object`类型

> 数字`Number`，布尔值`Boolean`，字符串`String`，函数`Function`，对象`Object`，
> `Undefined`这一些数据类型在`typeof`下都被精准的解释，只有数组和`null`的数据类型不够精准。


```js
console.log(typeof 2);              // number
console.log(typeof true);           // boolean
console.log(typeof 'str');          // string
console.log(typeof []);             // object
console.log(typeof function(){});   // function
console.log(typeof {});             // object
console.log(typeof (new Date));     // object
console.log(typeof undefined);      // undefined
console.log(typeof null);           // object
```

### instanceof

> 直接的字面量值判断数据类型，只有引用数据类型`Array`、`Function`、`Object`被精准判断
>
> 数值`Number`，布尔值`Boolean`，字符串`String`等字面值不能被`instanceof`精准判断。

> 在MDN中的解释：`instanceof`运算符用来测试一个对象在其原型链中是否存在一个构造函数的`prototype`属性。

```js
console.log(2 instanceof Number);               // false
console.log(true instanceof Boolean);           // false
console.log('str' instanceof String);           // false
console.log([] instanceof Array);               // true
console.log(function(){} instanceof Function);  // true
console.log({} instanceof Object);              // true
console.log(new Date() instanceof Object);      // true
console.log(undefined instanceof Undefined);    // 报错
console.log(null instanceof Null);              // 报错
```


### constructor

> 如果创建一个对象，更改它的原型，这种方式也变得不可靠了。

```js
console.log((2).constructor == Number);                 // true
console.log((true).constructor == Boolean);             // true
console.log(('str').constructor == String);             // true
console.log(([]).constructor == Array);                 // true
console.log((function() {}).constructor == Function);   // true
console.log(({}).constructor == Object);                // true
console.log((new Date()).constructor == Date);          // true
console.log((undefined).constructor == Undefined);      // 报错
console.log((null).constructor == Null);                // 报错
```


### call

> `Object.prototype.toString.call()`即使改变对象的原型，依然会显示正确的数据类型

```js
var a = Object.prototype.toString;
console.log(a.call(2));             // [object Number]
console.log(a.call(true));          // [object Boolean]
console.log(a.call('str'));         // [object String]
console.log(a.call([]));            // [object Array]
console.log(a.call(function(){}));  // [object Function]
console.log(a.call({}));            // [object Object]
console.log(a.call(new Date()));    // [object Date]
console.log(a.call(undefined));     // [object Undefined]
console.log(a.call(null));          // [object Null]
```


## errors

> `ECMAScript`定义了六种类型的错误。还可以使用`throw new Error("错误信息")`抛出自定义异常。

1. `ReferenceError` 找不到对象时
2. `TypeError` 错误的使用了类型或对象的方法时
3. `RangeError` 使用内置对象的方法时，参数超范围
4. `SyntaxError` 语法写错了
5. `EvalError` 错误的使用了Eval
6. `URIError` URI错误

```js
try{
    // 可能发生错误的代码
}catch(err){
    // 只有发生错误时才执行的代码
}finally{
    // 无论是否出错，肯定都要执行的代码
}
```


## blob转json


```js
// 如果服务器错误返回
if (result.data.type === 'application/json') {
    let reader = new FileReader();
    reader.readAsText(result.data, 'utf-8');
    reader.onload = (e) => {
        console.log(JSON.parse(reader.result));
        console.log(JSON.parse(e.target.result));
    }
    reader.onload = function (e) {
        console.log(JSON.parse(reader.result));
        console.log(JSON.parse(e.target.result));
    }
}
```





## 爬虫

### Puppeteer

* [https://github.com/GoogleChrome/puppeteer](https://github.com/GoogleChrome/puppeteer)

* [Puppeteer配置小记](https://www.itfanr.cc/2019/04/10/configuration-development-of-puppeteer)

- [xpath和css选择器](/Python/Python爬虫.md#xpath和css选择器)

- [`chromedriver`](/Python/Python爬虫.md#chromedriver)


## vue

![](/images/vue生命周期详解.png)


* [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)