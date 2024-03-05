# JavaScript笔记

[[toc]]


## Flag

* [性能提速：debounce（防抖）、throttle（节流／限频）](https://www.cnblogs.com/hity-tt/p/7852888.html)
* [js实现 throttle 和 debounce](https://blog.csdn.net/u013475983/article/details/88874248)
* [7分钟理解JS的节流、防抖及使用场景](https://juejin.cn/post/6844903669389885453)
* [JavaScript中高阶函数的魅力](https://juejin.cn/post/6844903668651819016)
* [函数节流与函数防抖](https://www.cnblogs.com/guohanyang/p/13446062.html)
* [JS进阶篇1---函数节流（throttle）](https://segmentfault.com/a/1190000019577510)
* [js防止重复触发事件](https://segmentfault.com/a/1190000012147456)
* [JS中的call、apply、bind方法详解](https://www.cnblogs.com/moqiutao/p/7371988.html)
* [js实现replaceAll方法](https://blog.csdn.net/fukaiit/article/details/83245943)
* [如何在 JavaScript 中清空数组？](https://www.huntsbot.com/qa/rDZ6/how-do-i-empty-an-array-in-javascript)
* [利用html5读取本地文本文件及图片文件](https://blog.csdn.net/cnds123/article/details/120469779)
* [探秘神奇的IntersectionObserver：释放网页性能的黑科技！](https://juejin.cn/post/7247045258842996794)
* [上传文件net::ERR_UPLOAD_FILE_CHANGED](https://stackoverflow.com/questions/61916331/re-uploading-a-file-with-ajax-after-it-was-changed-causes-neterr-upload-file-c)
* [改变世界的 17 个方程式 - 用 JavaScript 重写](https://runjs.app/blog/equations-that-changed-the-world-rewritten-in-javascript)



**回调地狱**

* [浅谈js中的回调地狱问题](https://blog.csdn.net/qq_21602341/article/details/87820778)
* [JavaScript中的回调地狱及解决方法](https://www.cnblogs.com/wenxuehai/p/10455664.html)

> 什么是回调地狱:通常以javaScript的执行顺序来编写代码,在执行异步代码时,无论以什么顺序简单的执行代码,通常情况会变成许多层级的回调函数堆积

> 解决方法: 1.放弃使用匿名函数,给所有的函数都命名,以名字的方式传递回调函数;2.代码简洁;3.模块儿化,将重复代码写入一个函数体内;
> 4.[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)


**循环loop**

* [JS中集合对象(Array、Map、Set)及类数组对象的使用与对比](https://github.com/quanzaiyu/hexo-blog/blob/master/source/_posts/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3JavaScript%20-%20JS%E4%B8%AD%E9%9B%86%E5%90%88%E5%AF%B9%E8%B1%A1(Array%E3%80%81Map%E3%80%81Set)%E5%8F%8A%E7%B1%BB%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E7%9A%84%E4%BD%BF%E7%94%A8%E4%B8%8E%E5%AF%B9%E6%AF%94.md)

- `for/i` 多次遍历代码块
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

// 匹配多个${}
var reg = /(\${.*?\})/g;
var reg = /\$\{[^\}]+\}/g;
var str = "如何匹配到 ${A0111}${A0117}  现在好像只能匹配一个。";
str.match(reg);
```


## HTTP

> 如果在业务场景中需要请求后端并使用返回数据（理想状态是拿到返回数据后下面的代码才执行），并且在多个地方使用相同请求后端代码，
>
> Ajax中如果使用同步那么有可能会导致不可达异常，如果使用异步请求就不能按时序拿到后端返回值（会跳过）再执行后面的代码，
>
> `解决方案`：应该在封装请求后端代码（异步）函数的参数上传入要在（回调匿名函数中）返回值处理后调用其他代码的函数，
> 这里使用了[尾调用](http://www.ruanyifeng.com/blog/2015/04/tail-call.html) [图解尾调用优化](https://segmentfault.com/a/1190000018441167)


* [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)
* [HTTP封装](https://github.com/bajins/key-gin/blob/master/static/js/utils)
* [XMLHttpRequest—必知必会](https://www.jianshu.com/p/918c63045bc3)
* [XMLHttpRequest封装源码](https://github.com/yanxiaojun617/exercise/tree/master/src/20180410ajax)

+ Fetch各浏览器支持情况 [https://caniuse.com/?search=fetch](https://caniuse.com/?search=fetch)
+ Fetch标准 [https://github.com/whatwg/fetch](https://github.com/whatwg/fetch)
+ [https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)


**http,XMLHttpRequest,Ajax的关系**

- http是浏览器和web服务器交换数据的协议,规范
- XMLHttpRequest是JavaScript的一个对象,是浏览器实现的一组api函数(方法),使用这些函数,浏览器再通过http协议请求和发送数据
- Ajax最核心的依赖是浏览器提供的XMLHttpRequest对象
- axios 是一个基于Promise实现版本，本质上也是对原生XMLHttpRequest的封装，符合最新的ES规范
- fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象，使用了ES6中的promise对象




## 标签默认事件

* [https://developer.mozilla.org/zh-CN/docs/Web/API/Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)


**阻止其他事件触发**

- 事件捕获其实有三种方式，事件冒泡只是其中的一种：
    - （1）IE从里到外（inside→outside）的冒泡型事件。
    - （2）Netscape4.0从外到里（outside→inside）的捕获型事件。
    - （3）DOM事件流，先从外到里，再从里到外回到原点（outside→inside→outside）的事件捕获方法。
- 以下事件不冒泡：blur、focus、load、unload。

> focus事件是在冒泡到document之后再返回到原来的元素上面才被触发

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

> `javascript:` 是一个伪协议，表示在触发默认动作时，执行一段JavaScript代码。

- `javascript:;` 表示什么都不执行，点击时没有任何反应。
- `#`点击后，页面默认上滚到页的顶部，`οnclick="return false"`或`event.returnValue=false;` 防止上滚到页的顶部
- `####` 用2个到4个`#`或`#all`，一个无意义的标签指定，不做任何处理。
- `javascript：void(0);` 表示一个死链接，执行空事件

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
    event = window.event || arguments.callee.caller.arguments[0] || event;
    event.returnValue = false : event.preventDefault();
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
 



## Storage和Cache

+ [技术指南-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps#%E6%8A%80%E6%9C%AF%E6%8C%87%E5%8D%97)

* [使用Chrome DevTools查看和编辑本地存储](https://developers.google.com/web/tools/chrome-devtools/storage/localstorage)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
    * [https://developer.mozilla.org/zh-CN/docs/Web/API/Storage](https://developer.mozilla.org/zh-CN/docs/Web/API/Storage)
* [https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
    * [https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
* [HTML5 - 应用程序缓存(Application Cache)](https://blog.csdn.net/weixin_44198965/article/details/89760924)


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

## 自动触发事件

* [https://developer.mozilla.org/zh-CN/docs/Web/API/Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

```js
var event = document.createEvent('Event'); // 创建
event.initEvent('keydown', true, false); // 初始化
event = Object.assign(event, {
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    which: 13,
    keyCode: 13, // 回车
    key: 'Enter',
    code: 'Enter'
});
var inp = document.querySelector('.input');
inp.value = new Date().toLocaleString();
inp.dispatchEvent(event); // 触发
inp.detachEvent(event); // 事件删除


var e = $.Event("keydown") || jQuery.Event("keydown"); // 创建事件
e.keyCode = 13; // 回车
$("input").trigger(e); // 触发事件
```


## 合并对象

```js
Object.assing({}, obj);
{...{}, ...obj}

// Jquery
$.extend({}, obj)
```


## 选择器特殊符转义

```js
function escapeSelector(src) {
    // javascript正则表达式中的特殊字符
    const jsSpecialChars = ["\\", "^", "$", "*", "?", ".", "+", "(", ")", "[", "]", "|", "{", "}"];
    for (const sc of jsSpecialChars) {
        src = src.replace(new RegExp("\\" + sc, "g"), "\\" + sc);
    }
    // jquery中的特殊字符,不是正则表达式中的特殊字符
    const jquerySpecialChars = ["~", "`", "@", "#", "%", "&", "=", "'", "\"", ":", ";", "<", ">", ",", "/"];
    for (const sc of jquerySpecialChars) {
        src = src.replace(new RegExp(sc, "g"), "\\" + sc);
    }
    return src;
}
```