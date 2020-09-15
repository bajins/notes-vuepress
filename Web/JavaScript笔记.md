# JavaScript笔记


[[toc]]



## Flag

* [性能提速：debounce（防抖）、throttle（节流／限频）](https://www.cnblogs.com/hity-tt/p/7852888.html)
* [js实现 throttle 和 debounce](https://blog.csdn.net/u013475983/article/details/88874248)
* [函数节流与函数防抖](https://www.cnblogs.com/guohanyang/p/13446062.html)
* [JS函数节流和分时函数](http://c.biancheng.net/view/5761.html)


**循环loop**

- `for` 多次遍历代码块
- `forEach` 遍历对象属性，不能中断循环（使用`break`语句或使用`return`语句）
- `for/in` 遍历对象属性，实际是为循环`enumerable`对象而设计，不推荐用`for/in`来循环一个数组
- `for/of` 可遍历`Array`、`String`、`TypedArray`、`Map`、`Set`、`DOM collections`、`enumerable`、`generators`，弥补了`forEach`和`for/in`循环的短板
- `while` 当指定条件为 true 时循环一段代码块
- `do/while` 当指定条件为 true 时循环一段代码块



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


## Http

* [flyio](https://wendux.github.io/dist/#/doc/flyio/readme)
* [HTTP封装](https://github.com/woytu/key-gin/blob/master/static/js/utils)
* [XMLHttpRequest—必知必会](https://www.jianshu.com/p/918c63045bc3)
* [XMLHttpRequest封装源码](https://github.com/yanxiaojun617/exercise/tree/master/src/20180410ajax)

- http,XMLHttpRequest,Ajax的关系
    - http是浏览器和web服务器交换数据的协议,规范
    - XMLHttpRequest是JavaScript的一个对象,是浏览器实现的一组api函数(方法),使用这些函数,浏览器再通过http协议请求和发送数据
        - XMLHttpRequest请求数据>使用js操作dom
    - Ajax不是一种技术,是综合多种技术实现交互的模式:用html+css展示页面>使用

* [ajax和axios、fetch的区别](https://www.jianshu.com/p/8bc48f8fde75)
* [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

> fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。
> Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。
> fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象。



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
//6000毫秒后执行testFunction()函数，只执行一次。
setTimeout(function (){
    // 业务逻辑

}, 6000);

//每隔6000毫秒执行一次testFunction()函数，执行无数次。
var interval = window.setInterval(function (){
    // 业务逻辑

}, 6000);
// 停止执行setInterval循环。
window.clearInterval(interval);

setInterval(function(){
    // 业务逻辑

}, 6000);
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



## 获取元素

```js
document.getElementById('元素的ID')
document.getElementsByTagName('元素的标签名')
// 通过元素的name属性的值获取一组元素
context.getElementsByName()
// 通过元素的类名（class的值）
context.getElementsByClassName()
// 获取HTML元素
document.documentElement
// 获取body元素
document.body
// 获取一个(IE6~8下不兼容)
document.querySelector()
// 获取多个(IE6~8下不兼容)
document.querySelectorAll()
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


## 标签默认动作

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
    if(document.all){  //只有ie识别
        // 针对IE，在新版本chrome,opera浏览器中已经支持
        // https://developer.mozilla.org/zh-CN/docs/Web/API/UIEvent/cancelBubble
        e.cancelBubble = true;
    }else{
        e.stopPropagation();
    }
}
```

**href伪协议**

```html
<a href="javascript:void(0);" onclick="test()">{{ row.name }}</a>
```


**原生方式**

* [event.preventDefault](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)

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
* [Web Storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
* IndexedDB [IndexedDB_API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
    * [使用IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB)
* Cahce Storage [https://developer.mozilla.org/zh-CN/docs/Web/API/Cache](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache)
* Application Cache [HTML5 - 应用程序缓存(Application Cache)](https://blog.csdn.net/weixin_44198965/article/details/89760924)


> storage存储的数据只能是字符串类型，其他类型的数据需做类型转换

**Cookie和Storage的区别**

1. cookie兼容所有的浏览器（本地cookie谷歌不支持），storage不支持IE6~8;
2. 二者对存储的内容均有大小限制，前者同源情况写一般不能存储4kb的内容，后者同源一般能存储只能存储5MB的数据
3. cookie有过期时间，localStorage是永久存储（如果你不手动去删除的话）
4. 一些浏览器处于安全的角度可能会禁用cookie,但无法禁用localStorage


**Session Storage**

```js
sessionStorage.setItem("key", "value");
var value = sessionStorage.getItem("key");
sessionStorage.removeItem("key");
sessionStorage.clear();

var storage = window.sessionStorage;
for(var i=0, len=storage.length; i<len;i++){
    var key = storage.key(i);    
    var value = storage.getItem(key);    
    console.log(key + "=" + value);
}
```

**Local Storage**

```js
localStorage.getItem('mobile');
var value = localStorage.setItem('mobile',"要存的数据");
```


**jQuery数据缓存方案**

> 使用隐藏控件或者js全局变量来临时存储数据，全局变量容易导致命名污染，隐藏控件导致经常读写dom浪费性能。jQuery提供了数据缓存方案

* [jQuery 源码分析(十) 数据缓存模块 data详解](https://www.cnblogs.com/greatdesert/p/11609111.html)
* [jQuery数据缓存$.data 的使用以及源码解析](https://segmentfault.com/a/1190000000626031)

- `$.data()` 这是一个底层方法，用于在指定的元素上存取临时数据，一旦页面刷新，之前存放的数据都将被移除
- `$.cache`
- `$.expando`
- `$.hasData()`
- `$.removeData()`

```js

var myObj = {};
// hasData用来判断HTMLElement或JS对象是否具有数据
console.log(jQuery.hasData($("#a")));// false
 
// data()添加属性
$.data(myObj, 'name', 'aty');
console.log(jQuery.hasData(myObj));// true
 
// data()读取属性
console.log($.data(myObj, 'name'));//aty
 
// removeData删除属性
$.removeData(myObj, 'name');
console.log($.data(myObj, 'name'));//undefined
 
// 如果所有属性都被删除,那么hasData返回false
console.log(jQuery.hasData(myObj));// false
```