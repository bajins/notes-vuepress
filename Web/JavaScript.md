# JavaScript



* [CDN](#cdn)
  * [other](#other)
* [Http](#http)
  * [请求头常量](#请求头常量)
  * [下载文件](#下载文件)
* [NodeJs](#nodejs)
  * [安装](#安装)
  * [npm和yarn镜像](#npm和yarn镜像)
  * [更新依赖包](#更新依赖包)
    * [yarn](#yarn)
    * [npm](#npm)
  * [依赖管理](#依赖管理)
* [日志](#日志)
* [Utils](#utils)
  * [原型方法](#原型方法)
  * [时间转换](#时间转换)
  * [随机数](#随机数)
  * [判断空](#判断空)
  * [数组](#数组)
  * [字符串](#字符串)





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

### 请求头常量
```javascript
/**
 * 请求方式（OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT）
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 13:53
 */
const METHOD = {
    OPTIONS: "OPTIONS",
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    TRACE: "TRACE",
    CONNECT: "CONNECT"
}

/**
 * 请求数据类型,告诉服务器，我要发什么类型的数据。
 *
 * application/x-www-form-urlencoded：数据被编码为名称/值对。这是标准的编码格式。默认使用此类型。
 * multipart/form-data：数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
 * text/plain：数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 13:56
 */
const CONTENT_TYPE = {
    URLENCODED: "application/x-www-form-urlencoded",
    FORM_DATA: "multipart/form-data",
    TEXT_PLAIN: "text/plain"
}

/**
 * 预期服务器返回的数据类型（对应请求头中的Accept），如果是下载文件则指定RESPONSE_TYPE
 *
 * 如果没有指定，那么会自动推断是返回 XML，还是JSON，还是script，还是String。
 * xml: 返回 XML 文档。
 * html: 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
 * script: 返回纯文本 Web 代码。不会自动缓存结果。除非设置了 “cache” 参数。
 * 注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
 * json: 返回 JSON 数据 。
 * jsonp: JSONP 格式。使用 JSONP 形式调用函数时，如 “myurl?callback=?” jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
 * text: 返回纯文本字符串
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 14:00
 */
const DATA_TYPE = {
    JSON: "json", TEXT: "text", XML: "xml", HTML: "html", SCRIPTY: "script", JSONP: "jsonp"
}

/**
 * 响应的数据类型
 *
 *   ""    将 responseType 设为空字符串与设置为"text"相同， 是默认类型 （实际上是 DOMString）。
 *  "arraybuffer"    response 是一个包含二进制数据的 Web ArrayBuffer 。
 *  "blob"    response 是一个包含二进制数据的 Blob 对象 。
 *  "document"    response 是一个 HTML Document 或 XML XMLDocument ，这取决于接收到的数据的 MIME 类型。
 *  "json"    response 是一个 Web 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
 *  "text"    response 是包含在 DOMString 对象中的文本。
 *  "moz-chunked-arraybuffer" 与"arraybuffer"相似，但是数据会被接收到一个流中。
 *         使用此响应类型时，响应中的值仅在 progress 事件的处理程序中可用，并且只包含上一次响应 progress 事件以后收到的数据，
 *         而不是自请求发送以来收到的所有数据。在 progress 事件处理时访问 response 将返回到目前为止收到的数据。
 *         在 progress 事件处理程序之外访问， response 的值会始终为 null 。
 *  "ms-stream"  response 是下载流的一部分；此响应类型仅允许下载请求，并且仅受Internet Explorer支持。
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 14:13
 */
const RESPONSE_TYPE = {
    TEXT: "text", ARRAYBUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", MS_STREAM: "ms-stream"
}

```

### 下载文件
```javascript
// responseType: RESPONSE_TYPE.BLOB
//从response的headers中获取filename, 后端response.setHeader("Content-Disposition", "attachment; filename=xxxx.xxx") 设置的文件名;
let contentDisposition = result.headers['Content-Disposition'];
let reg = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
let filename = reg.exec(contentDisposition)[1];
// 取文件名信息中的文件名,替换掉文件名中多余的符号
filename = filename.replaceAll("\\\\|/|\"", "");
let downloadElement = document.createElement('a');

//这里res.data是返回的blob对象
let blob = new Blob([result.data], {type: 'application/octet-stream;charset=utf-8'});
// 创建下载的链接
let href = window.URL.createObjectURL(blob);

downloadElement.style.display = 'none';
downloadElement.href = href;
// 下载后文件名
downloadElement.download = filename;
document.body.appendChild(downloadElement);
// 点击下载
downloadElement.click();
// 下载完成移除元素
document.body.removeChild(downloadElement);
// 释放掉blob对象
window.URL.revokeObjectURL(href);
```

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

## 日志

```javascript
const isDebugEnabled = process.env.NODE_ENV != "production";
const isInfoEnabled = true;
const isErrorEnabled = true;
const isWarnEnabled = true;
const isTraceEnabled = true;

// JS获取当前文件所在的文件夹全路径
// let js = document.scripts;
// js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

let loggerName = "[" + getCurrAbsPath() + "]";

/**
 * @return
 * @Description 获取当前路径
 * @author claer woytu.com
 * @date 2019/4/29 13:28
 */
const getCurrAbsPath = () => {
    let a = {},
        rExtractUri = /((?:http|https|file):\/\/.*?\/[^:]+)(?::\d+)?:\d+/;
    // expose = +new Date(),
    // isLtIE8 = ('' + doc.querySelector).indexOf('[native code]') === -1;


    // FF,Chrome
    if (document.currentScript) {
        return document.currentScript.src;
    }

    let stack;
    try {
        a.b();
    } catch (e) {
        stack = e.fileName || e.sourceURL || e.stack || e.stacktrace;
    }
    // IE10
    if (stack) {
        let absPath = rExtractUri.exec(stack)[1];
        if (absPath) {
            return absPath;
        }
    }

    // IE5-9
    // for (let scripts = doc.scripts, i = scripts.length - 1, script; script = scripts[i--];) {
    //     if (script.className != expose && script.readyState === 'interactive') {
    //         script.className = expose;
    //         // if less than ie 8, must get abs path by getAttribute(src, 4)
    //         return isLtIE8 ? script.getAttribute('src', 4) : script.src;
    //     }
    // }
}

console.log(
    "%cisDebugEnabled=%c" + `${isDebugEnabled}` +
    ",%cisInfoEnabled=%c" + `${isInfoEnabled}` +
    ",%cisErrorEnabled=%c " + `${isErrorEnabled}` +
    ",%cisWarnEnabled=%c" + `${isWarnEnabled}` +
    ",%cisTraceEnabled=%c" + `${isTraceEnabled}`
    , 'color:#2db7f5;', 'color:red;'
    , 'color:#2db7f5;', 'color:red;'
    , 'color:red;', 'color:red;'
    , 'background:#aaa;color:#bada55;', 'color:red;'
    , 'color:#2db7f5;', 'color:red;'
);

/**
 * 对日志参数解析
 * 格式为：
 *     logger.info("页面{}，点击第{}行", "App.vue", index);
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/25 18:04
 */
const getParam = (...log) => {
    let params = log[0];
    let parentString = params[0].toString();
    // 正则表达式，如须匹配大小写则去掉i
    let re = eval("/" + "{}" + "/ig");
    // 匹配正则
    let ps = parentString.match(re);

    // 参数个数大于1，并且匹配的个数大于0
    if (params.length > 1 && ps != null) {
        // 移除第一个元素并返回该元素
        params.shift();
        for (let i = 0; i < ps.length; i++) {
            parentString = parentString.replace("{}", params[i]);
        }
        // 把替换后的字符串与参数未替换完的拼接起来
        parentString = parentString + params.slice(ps.length).toString();
        return parentString;
    }
    return params.toString();
}

const debug = (...log) => {
    if (isDebugEnabled) {
        console.log("%c " + loggerName + " %c " + getParam(log), 'color:red;', 'font-size:15px;color:red;');
    }
};

const info = (...log) => {
    if (isInfoEnabled) {
        console.info(loggerName + getParam(log));
    }
};

const error = (...log) => {
    if (isErrorEnabled) {
        console.error(loggerName + getParam(log));
    }
};
const warn = (...log) => {
    if (isWarnEnabled) {
        console.warn(loggerName + getParam(log));
    }
};
const trace = (...log) => {
    if (isTraceEnabled) {
        console.trace(loggerName + getParam(log));
    }
};

/**
 groovy/lang/GroovyShell
 * @return
 * @Description  将方法、变量暴露出去
 * @author claer woytu.com
 * @date 2019/4/29 11:55
 */
export default {
    debug,
    info,
    error,
    warn,
    trace
};
```

## Utils

### 原型方法

```javascript
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0) {
        return false;
    }
    if (str.length > this.length) {
        return false;
    }
    if (this.substring(this.length - str.length) != str) {
        return false;
    }
    return true;
}
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串开头的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串开头
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0) {
        return false;
    }
    if (str.length > this.length) {
        return false;
    }
    if (this.substr(0, str.length) != str) {
        return false;
    }
    return true;
}

/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.endWithRegExp = function (str) {
    let reg = new RegExp(str + "$");
    return reg.test(this);
}

/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串开头的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串开头
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.startWithRegExp = function (str) {
    let reg = new RegExp("^" + str);
    return reg.test(this);
}
Array.prototype.contains = function(val) {
     for (let i = 0; i < this.length; i++) {
       if (this[i] == val) {
           return true;
       }
     }
     return false;
};

/**
 * 给数组对象增加一个原型方法:
 * 判断一个数组中是否存在某个元素
 *
 * @param val 元素
 * @return boolean 是否以该字符串开头
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
Array.prototype.contains = function(val) {
     for (let i = 0; i < this.length; i++) {
       if (this[i] == val) {
           return true;
       }
     }
     return false;
}


/**
 * 给String对象增加一个原型方法:
 * 替换全部字符串 - 无replaceAll的解决方案,自定义扩展js函数库
 * 原生js中并没有replaceAll方法，只有replace，如果要将字符串替换，一般使用replace
 *
 * @param FindText 要替换的字符串
 * @param RepText 新的字符串
 * @return string
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 15:24
 */
String.prototype.replaceAll = function (FindText, RepText) {
    // g表示执行全局匹配，m表示执行多次匹配
    let regExp = new RegExp(FindText, "gm");
    return this.replace(regExp, RepText);
}
```

### 时间转换
```javascript
/**
 * 时间转换工具
 * date 时间
 * join 年月日之间连接的字符
 */
const formatTime = (date, join) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [year, month, day].map(formatNumber).join(join) + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
```

### 随机数
```javascript
/**
 * 生成从最小数到最大数的随机数
 * minNum 最小数
 * maxNum 最大数
 */
const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
```

### 判断空
```javascript
/**
 * 判断js数组/对象是否为空
 * isPrototypeOf() 验证一个对象是否存在于另一个对象的原型链上。即判断 Object 是否存在于 $obj 的原型链上。
 * js中一切皆对象，也就是说，Object 也存在于数组的原型链上，因此这里数组需要先于对象检验。
 * Object.keys() 返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
 * @param $obj
 * @return {boolean}
 */
function isEmpty($obj) {
    // 找不到属性
    if (typeof ($obj) == 'undefined') {
        return true;
    }
    // 检验非数组/对象类型  EX：undefined   null  ''  根据自身要求添加其他适合的为空的值  如：0 ,'0','  '  等
    if ($obj === 0 || $obj === '' || $obj === null) {
        return true;
    }
    if (typeof ($obj) === "string") {
        $obj = $obj.replace(/\s*/g, ""); //移除字符串中所有 ''
        if ($obj === '') {
            return true;
        }
    }
    if (typeof ($obj) === "object") {
        if (!Array.isArray($obj) || $obj.length <= 0 || Object.keys($obj).length <= 0) {
            return true;
        }
    }
    return false;
}
```

### 数组
```javascript

/**
 * 将数组平均分割
 * arr 数组
 * len 分割成多少个
 * @author claer woytu.com
 * @date 2019/4/29 20:10
 */
const splitArray = (arr, len) => {
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}

/**
 * 自定义数组合并并去重函数
 * @param arr1 数组1
 * @param arr2 数组2
 * @return
 * @Description 自定义数组合并并去重函数
 * @author claer woytu.com
 * @date 2019/4/29 20:10
 */
const mergeArray = (arr1, arr2) => {
    // var _arr = new Array();
    // for (var i = 0; i < arr1.length; i++) {
    //   _arr.push(arr1[i]);
    // }
    // for (var i = 0; i < arr2.length; i++) {
    //   var flag = true;
    //   for (var j = 0; j < arr1.length; j++) {
    //     if (arr2[i] == arr1[j]) {
    //       flag = false;
    //       break;
    //     }
    //   }
    //   if (flag) {
    //     _arr.push(arr2[i]);
    //   }
    // }

    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            arr1.push(arr2[i]);
        }
    }
    return arr1;
}

/**
 * 插入去重的元素
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 17:05
 */
const reinsertElement = (array, element) => {
    if (array.indexOf(element) === -1) {
        array.push(element);
    }
    return array;
}


/**
 * 过滤在数组中的值
 *
 * @param arr 元数据数组
 * @param ignoresArr 需要去除的值数组
 * @return Array 去掉值后的新数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:30
 */
function inArrayKV(arr, ignoresArr) {
    let newArr = [];
    arr.forEach(function (value, index, array) {
        // 判断文件名以什么开头、是否在指定数组中存在
        if (!value.startsWith(".") && ignoresArr.includes(value)) {
            newArr.push(value);
        }
    });
    return newArr;
}

/**
 * 过滤不在数组中的值
 *
 * @param arr 元数据数组
 * @param retentionArr 需要保留的值数组
 * @return Array 去掉值后的新数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:30
 */
function notInArrayKV(arr, retentionArr) {
    let newArr = [];
    arr.forEach(function (value, index, array) {
        // 判断文件名以什么开头、是否在指定数组中存在
        if (!value.startsWith(".") && !retentionArr.includes(value)) {
            newArr.push(value);
        }
    });
    return newArr;
}


/**
 * splice方法删除数组中的空值
 *
 * @param array
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 18:14
 */
function trimSpace(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == " " || array[i] == null || typeof (array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

/**
 * filter 过滤方法删除数组中的空值
 *
 * @param array
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 18:14
 */
function trimFilter(array) {
    array.filter(function (s) {
        return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
    });
}
```

### 字符串
```javascript
/**
 * 正则表达式去除空行
 *
 * @param oldStr 字符串
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 17:55
 */
function replaceBlank(oldStr) {
    if (typeof oldStr != "string") {
        console.log("正则表达式去除空行，传入的不为字符串！");
    } else {
        // 匹配空行
        let reg = /\n(\n)*( )*(\n)*\n/g;
        return oldStr.replace(reg, "\n");
    }
}
```