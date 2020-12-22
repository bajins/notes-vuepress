# JavaScript笔记


[[toc]]



## Flag

* [性能提速：debounce（防抖）、throttle（节流／限频）](https://www.cnblogs.com/hity-tt/p/7852888.html)
* [js实现 throttle 和 debounce](https://blog.csdn.net/u013475983/article/details/88874248)
* [函数节流与函数防抖](https://www.cnblogs.com/guohanyang/p/13446062.html)
* [JS函数节流和分时函数](http://c.biancheng.net/view/5761.html)
* [JS中的call、apply、bind方法详解](https://www.cnblogs.com/moqiutao/p/7371988.html)


**回调地狱**

* [浅谈js中的回调地狱问题](https://blog.csdn.net/qq_21602341/article/details/87820778)
* [JavaScript中的回调地狱及解决方法](https://www.cnblogs.com/wenxuehai/p/10455664.html)

> 什么是回调地狱:通常以javaScript的执行顺序来编写代码,在执行异步代码时,无论以什么顺序简单的执行代码,通常情况会变成许多层级的回调函数堆积

> 解决方法: 1.放弃使用匿名函数,给所有的函数都命名,以名字的方式传递回调函数;2.代码简洁;3.模块儿化,将重复代码写入一个函数体内;
> 4.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)


**循环loop**

- `for` 多次遍历代码块
- `forEach` 遍历对象属性，不能中断循环（使用`break`语句或使用`return`语句）
- `for/in` 遍历对象属性，实际是为循环`enumerable`对象而设计，不推荐用`for/in`来循环一个数组
- `for/of` 可遍历`Array`、`String`、`TypedArray`、`Map`、`Set`、`DOM collections`、`enumerable`、`generators`，弥补了`forEach`和`for/in`循环的短板
- `while` 当指定条件为 true 时循环一段代码块
- `do/while` 当指定条件为 true 时循环一段代码块


## 异步协程

* [JavaScript中的协程](https://kylin.dev/2020/06/13/JavaScript%E4%B8%AD%E7%9A%84%E5%8D%8F%E7%A8%8B)
* [JS 中的协程（Coroutine）](http://zhangchen915.com/index.php/archives/719)

**ES6 co/yield方案**

* [Generator 函数的异步应用](https://es6.ruanyifeng.com/#docs/generator-async)

- Generator 函数是协程在 ES6 的实现，可以交出函数的执行权，`function*`
    - `yield` 是Generator关键字，异步操作需要暂停的地方（主动交出执行权暂停执行），都用yield语句注明
    - `next()`恢复执行
    - `yield*`移交执行权调用另一个协程
- co: co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

**ES7 async/await 方案**

- async/await是es7的新标准，async函数就是将 Generator 函数的`*`替换成async，将yield替换成await，仅此而已。



## 字符串换行和拼接

**字符串多行换行**

- Multiline String 多行字符串
- Template String 模板字符串
- Text Blocks 文本块

* [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)

```js
var x = "我的\
博客\
https://www.bajins.com";
console.log(x);
```

```js
var x = "我的"+
"博客"+
"https://www.bajins.com";
console.log(x);
```

```js
var x =['我的',
    '博客',
    'https://www.bajins.com'
].join('');
console.log(x);
```

```js
var f = function () {/*
      我的博客：
      https://www.bajins.com
*/};

// 定义一个实现多行字符串的函数
Function.prototype.multiLine = function () {
    var str = this.toString().split('\n');
    return str.slice(1, str.length - 1 ).join('\n');
}

Function.prototype.getMultiLine = function() {
    var lines = this.toString();
    return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));  
}

console.log(f.multiLine());
console.log(f.getMultiLine());
```

- ECMAScript6语法

```js
var x = `我的
博客
https://www.bajins.com`;
console.log(x);
```


**字符串拼接**


```js
var x = "我的博客${?}";
x=x.replace("${?}","https://www.bajins.com");
console.log(x);
```

```js
var b="博客";
var x = "我的" + b + "https://www.bajins.com";
console.log(x);
```

- ECMAScript6语法

```js
var b="博客";
var x = `我的${b}https://www.bajins.com`;
console.log(x);
```




## 正则表达式

- `exec`是正则表达式的方法，参数是字符串
- `match`字符串的方法，参数是正则表达

1. 当正则表达式无子表达式，并且定义为非全局匹配时：exec和match执行的结果是一样，均返回第一个匹配的字符串内容；
2. 当正则表达式无子表达式，并且定义为全局匹配时：exec和match执行，做存在多处匹配内容，则match返回的是多个元素数组；
3. 当正则表达式有子表示时，并且定义为非全局匹配：exec和match执行的结果是一样返回多个匹配内容数组；
4. 当正则表达式有子表示时，并且定义为全局匹配：exec和match执行的结果不一样，此时match将忽略子表达式，只查找全匹配正则表达式并返回所有内容；

> 也就说，exec与全局是否定义无关系，而match则于全局相关联，当定义为非全局，两者执行结果相同；
> exec没有匹配返回null，匹配有子表达式返回匹配结果数组下标0值为所有表达式结果，其他下标为子表达式的匹配

```js
var str = `test https://www.bajins.com`; 
console.log(new RegExp("var servers = (.*)","ig").exec(str));
console.log(str.match(new RegExp("var servers = (.*)","ig")));
console.log(new RegExp("test(.*)","ig").exec(str));
console.log(str.match(new RegExp("test(.*)","ig")));
```


## HTTP

> 如果在业务场景中需要请求后端并使用返回数据（理想状态是拿到返回数据后下面的代码才执行），并且在多个地方使用相同请求后端代码，
>
> Ajax中如果使用同步那么有可能会导致不可达异常，如果使用异步请求就不能按时序拿到后端返回值（会跳过）再执行后面的代码，
>
> `解决方案`：应该在封装请求后端代码（异步）函数的参数上传入要在（回调匿名函数中）返回值处理后调用其他代码的函数，
> 这里使用了[尾调用](http://www.ruanyifeng.com/blog/2015/04/tail-call.html) [图解尾调用优化](https://segmentfault.com/a/1190000018441167)


* [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)
* [HTTP封装](https://github.com/woytu/key-gin/blob/master/static/js/utils)
* [XMLHttpRequest—必知必会](https://www.jianshu.com/p/918c63045bc3)
* [XMLHttpRequest封装源码](https://github.com/yanxiaojun617/exercise/tree/master/src/20180410ajax)

+ Fetch各浏览器支持情况 [https://caniuse.com/?search=fetch](https://caniuse.com/?search=fetch)
+ Fetch标准 [https://github.com/whatwg/fetch](https://github.com/whatwg/fetch)
+ [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
+ [https://github.com/github/fetch](https://github.com/github/fetch)
+ [https://github.com/matthew-andrews/isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
+ [https://github.com/qubyte/fetch-ponyfill](https://github.com/qubyte/fetch-ponyfill)


**http,XMLHttpRequest,Ajax的关系**

- http是浏览器和web服务器交换数据的协议,规范
- XMLHttpRequest是JavaScript的一个对象,是浏览器实现的一组api函数(方法),使用这些函数,浏览器再通过http协议请求和发送数据
- Ajax最核心的依赖是浏览器提供的XMLHttpRequest对象
- axios 是一个基于Promise实现版本，本质上也是对原生XMLHttpRequest的封装，符合最新的ES规范
- fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象，使用了ES6中的promise对象


**下载文件的几种方式**

```js
// 此方法火狐有些版本不支持
window.location.href = 'https://www.bajins.com/files/设置必应壁纸.bat';
// 支持所有
window.location = 'https://www.bajins.com/files/设置必应壁纸.bat';

// iframe
function(url){
    try {
        var elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
    } catch (e) {
        alert("下载异常！");
    }
}
// form表单
downloadFile(url){
    var form=$(`<form style="display:none" target="" method="get" action={url}></form>`);
    $("body").append(form);
    form.submit();//表单提交}
}
// a标签
function(url,name){
    var a = document.createElement("a");
    a.style.display = 'none';
    a.download = name + ".xls";
    a.href = url;
    $("body").append(a); // 修复firefox中无法触发click
    a.click();
    $(a).remove();
}
// 处理后端返回文件流
function (formData, url, filename) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true); // 也可以使用POST方式，根据接口
        xhr.responseType = "blob"; // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
        xhr.onload = function () {
            // 请求完成，返回200
            if (this.status === 200) {
                // 方式一
                var reader = new FileReader();
                reader.readAsDataURL(this.response); // 转换为base64
                reader.onload = function (e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement("a");
                    a.download = filename;
                    a.href = e.target.result;
                    $("body").append(a); // 修复firefox中无法触发click
                    a.click();
                    resolve(200);
                    $(a).remove();
                }
                // 方式二
                let a = document.createElement('a');
                a.style.display = 'none';
                // 创建下载的链接
                a.href = URL.createObjectURL(new Blob([this.response], {type: this.getResponseHeader('Content-Type')}));
                // 下载后文件名
                a.download = filename;
                // 点击下载
                a.click();
                // 释放掉blob对象
                URL.revokeObjectURL(a.href);
                resolve(200);
                a.removeNode(true);
            }
        }
        // 发送ajax请求
        xhr.send(formData);
    });
}
```


**blob转json**


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


## 类型判断

**typeof**

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

**instanceof**

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


**constructor**

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


**call**

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

```js
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class TimeoutError extends CustomError {}

module.exports = {
  TimeoutError,
};
```

## 定时延时

```js
// 6000毫秒后执行testFunction()函数，只执行一次。
setTimeout(function (){
    // 业务逻辑

}, 6000);

// 每隔6000毫秒执行一次testFunction()函数，执行无数次。
var interval = setInterval(function (){
    // 业务逻辑

}, 6000);
// 停止执行setInterval循环。
clearInterval(interval);
```

```js
//第一种，使用while循环
function sleep(delay) {
    var start = (new Date()).getTime();
    while((new Date()).getTime() - start < delay) {
        continue;
    }
}
//或者使用for循环
function sleep(delay) {
    for(var t = Date.now(); Date.now() - t <= delay;);
}
```



## 获取宽高

* [https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)

```js
// 屏幕可用工作区宽度
screen.availWidth
// 屏幕可用工作区高度
screen.availHeight

// 屏幕分辨率的宽
screen.width
// 屏幕分辨率的高
screen.height

// 网页正文部分上
window.screenTop
// 网页正文部分左
window.screenLeft

// 设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离
window.scrollLeft
// 设置或获取位于给定对象最顶端与窗口中目前可见内容的最顶端之间的距离
window.scrollTop

// 设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置
window.offsetLeft
// 设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算顶端位置
window.offsetTop

// 浏览器窗口的内部宽高，会随窗口的显示大小改变
window.innerWidth
window.innerHeight

// 网页可见区域宽度，不包括工具栏和滚动条，会随窗口的显示大小改变
document.body.clientWidth
document.documentElement.clientWidth
// 网页可见区域高度，不包括工具栏和滚动条，会随窗口的显示大小改变
document.body.clientHeight
document.documentElement.clientHeight

// 网页可见区域宽度，包括滚动条等边线，会随窗口的显示大小改变
document.body.offsetWidth
document.documentElement.offsetWidth
// 网页可见区域高度，包括滚动条等边线，会随窗口的显示大小改变
document.body.offsetHeight
document.documentElement.offsetHeight

// 网页正文全文宽度(不包括滚动条)，会随窗口的显示大小改变
document.body.scrollWidth
document.documentElement.scrollWidth
// 网页正文全文宽度(不包括滚动条)，会随窗口的显示大小改变
document.body.scrollHeight
document.documentElement.scrollHeight
```

```js
/**
 * 把水平滚动条位置和垂直滚动条位置保存在Cookie中
 */
function setScrollToCookie() {
    var scrollTop, scrollLeft;
    if (typeof window.pageYOffset != 'undefined') {
        scrollTop = window.pageYOffset;
        scrollLeft = window.pageXOffset;
    } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        scrollTop = document.documentElement.scrollTop;
        scrollLeft = document.documentElement.scrollLeft;
    } else if (typeof document.body != 'undefined') {
        scrollTop = document.body.scrollTop;
        scrollLeft = document.body.scrollLeft;
    }
    var date = new Date();
    date.setHours(date.getHours() + 1); // 设置cookie的有效期
    // 创建cookie，保存水平滚动条位置
    document.cookie = "scrollTop=" + escape(scrollTop) + "; expires=" + date.toGMTString();
    // 创建cookie，保存垂直滚动条位置
    document.cookie = "scrollLeft=" + escape(scrollLeft) + "; expires=" + date.toGMTString();
}

/**
 * 获取Cookie中存储的信息
 * 
 * @param {Stirng} sName 
 */
function getCookie(sName) {
    var arr = document.cookie.match(/(scrollTop|scrollLeft)=([^;]+)(;|$)/);
    if (arr != null) {
        var aCookie = document.cookie.split("; "); // 将cookie中的数据切割成数组，方便遍历
        for (var i = 0; i < aCookie.length; i++) { // 遍历cookie中的数据
            var aCrumb = aCookie[i].split("="); // 将键和值分开
            if (sName == aCrumb[0]) { // 判断是否是指定的键
                return unescape(aCrumb[1]);
            }
        }
    }
    return null;
}

/**
 * 加载页面时自动执行获取cookie保存值的方法
 */
window.onload = function () {
    document.documentElement.scrollLeft = getCookie("scrollLeft");
    document.body.scrollLeft = getCookie("scrollLeft"); // 获取水平滚动条位置
    document.documentElement.scrollTop = getCookie("scrollTop");
    document.body.scrollTop = getCookie("scrollTop"); // 获取垂直滚动条位置
}

window.onunload = setScrollToCookie();

window.onbeforeunload = setScrollToCookie();
```


## 监听窗口变化

* [window.onresize或者$(window).resize()触发两次](https://blog.csdn.net/soindy/article/details/53886921)

```js
window.onresize = function () {
    var res;
    if (res){clearTimeout(res)}
    res = setTimeout(function(){console.log($(window).width(););},20);
}
$(window).resize(function () {
    $(window).width();
});
$(window).on('resize', function () {
    $(window).width();
});
$(window).resizeEnd({delay: 500}, function () {
    $(window).width();
});
```


## 标签默认事件

* [https://developer.mozilla.org/zh-CN/docs/Web/API/Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

**阻止其他事件触发**

- 事件捕获其实有三种方式，事件冒泡只是其中的一种：
    - （1）IE从里到外（inside→outside）的冒泡型事件。
    - （2）Netscape4.0从外到里（outside→inside）的捕获型事件。
    - （3）DOM事件流，先从外到里，再从里到外回到原点（outside→inside→outside）的事件捕获方法。
- 以下事件不冒泡：blur、focus、load、unload。

```js
// 阻止事件冒泡
function stopPropagation(event){
    //var e = event? event:window.event;
    var e = window.event || event;
    e.stopPropagation();
}
```

```css
/* 使用该样式，会阻止事件的触发。鼠标只会显示为箭头样式 */
pointer-events: none;
/* 鼠标禁用样式，然后使用js阻止事件的触发 */
cursor: not-allowed;
```

**href伪协议**

```html
<a href="javascript:void(0);" onclick="test()">{{ row.name }}</a>
```


**原生方式**

* 取消事件 [event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)
* 阻止事件的其他监听器和冒泡 [event.stopImmediatePropagation](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopImmediatePropagation)
* 阻止冒泡 [event.stopPropagation](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/stopPropagation)

```html
<a href="https://www.bajins.com" onclick="test();return false;">{{ row.name }}</a>
```


```html
<a href="https://www.bajins.com" onclick="return test();">{{ row.name }}</a>
<script>
function test(){
    return false;
}
</script>
```


```html
<a href="https://www.bajins.com" onclick="test();return false;">{{ row.name }}</a>
<script>
function test(event){
    event = event || window.event;
    window.event? window.event.returnValue = false : event.preventDefault();
}
</script>
```


**VUE阻止默认行为**

* [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)
* [v-on api](https://cn.vuejs.org/v2/api/#v-on)

```html
<a href="https://www.bajins.com" v-on:click.prevent="test()">{{ row.name }}</a>
```

```html
<a href="https://www.bajins.com" v-on:click="test($event)">{{ row.name }}</a>
<script>
    function test(event){
        event.preventDefault();
    }
</script>
```


## 封包闭包

```js
(function () {
    // 全局对象
    window.utils = {};
}());
```

```js
(function (w) {
    // 全局对象
    var utils = function () {

    };
    // 兼容AMD,CMD和原生JS
    if (typeof define === "function" && (define.amd || define.cmd)) {
        define(function () {
            return new utils();
        });
    } else {
        w.utils = new utils();
    }
})(window);
```

```js
; (function () {
    var utils = function () {
        // ... 
    }
    // 兼容AMD,CMD和原生JS
    if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
        module.exports = utils;
    } else if (typeof define === 'function' && define.amd) {

        define(function () { return utils; });

    } else {
        this.utils = utils;
    }
}).call(function () {
    return this || (typeof window !== 'undefined' ? window : global);
});
```

```js
$(function (w) {
    // 全局对象
    window.utils = {};
}($));
```

```js
(function ($) {
    // 全局对象
    window.utils = {};
})(jQuery);
```

```js
$(function () {
    // 全局对象
    window.utils = {};
});
```

```js
jQuery(function ($) {
    // 全局对象
    window.utils = {};
});
```

```js
$(document).ready(function () {
    // 全局对象
    window.utils = {};
})
```


## Storage和Cache

* [使用Chrome DevTools查看和编辑本地存储](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
    * [https://developer.mozilla.org/zh-CN/docs/Web/API/Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
    * [https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
* [HTML5 - 应用程序缓存(Application Cache)](https://blog.csdn.net/weixin_44198965/article/details/89760924)


> storage存储的数据只能是字符串类型，其他类型的数据需做类型转换，只要当前浏览器标签页不关闭会一直存在（不管是否进行了链接跳转）

```js
sessionStorage.setItem("k", "v");
var value = sessionStorage.getItem("k");
console.log(value);
sessionStorage.removeItem("k");
sessionStorage.clear();

// 跟上面的sessionStorage有一样的方法
var value = localStorage.setItem('键',"值");
for(var i=0, len=localStorage.length; i<len; i++){
    var key = localStorage.key(i);    
    var value = localStorage.getItem(key);    
    console.log(key + "=" + value);
}
```


**jQuery数据缓存方案**

> 使用隐藏控件或者js全局变量来临时存储数据，全局变量容易导致命名污染，隐藏控件导致经常读写dom浪费性能。jQuery提供了数据缓存方案

> 同window全局变量或标签元素属性一样只针对于当前页面有效，跳转链接后将清除

* [jQuery 源码分析(十) 数据缓存模块 data详解](https://www.cnblogs.com/greatdesert/p/11609111.html)
* [jQuery数据缓存$.data 的使用以及源码解析](https://segmentfault.com/a/1190000000626031)

- `$.data()` 用于在指定的元素上存取临时数据，页面刷新数据都将被移除
- `$.attr()` 绑定数据在标签的属性上，一定要以`data-`开头

```js
// hasData用来判断HTMLElement或JS对象是否具有数据
console.log($("#a").hasData('name'));// false

// 添加数据，值存在`$.cache`中，key使用`$.expando`生成
$("#a").data('name', '11111111');
// 标签上`data-`开头属性也是数据
$("#a").attr("data-name", '2222222222');

// 读取数据，在$.cache中找，没有则去标签的`data-`开头属性中查找
console.log($("#a").data('name'));

// 删除数据，不能删除标签上`data-`开头属性的数据
$("#a").removeData('name');
$("#a").removeAttr('data-name');
console.log($("#a").data('name'));//undefined
```

