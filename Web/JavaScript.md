# JavaScript


[[toc]]






## flag

* [ECMAScript支持度检测](https://github.com/ruanyf/es-checker)
* [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese)


**手册**

> `HTML`网页中，浏览器通过`script`标签加载脚本的默认语言是`JavaScript`，因此`type="application/javascript"`可以省略。

* [浏览器脚本教程](https://www.w3school.com.cn/b.asp)
* [参考手册](https://www.w3school.com.cn/r.asp)
* [ECMAScript 6入门](https://github.com/ruanyf/es6tutorial)
* [ECMAscript和Javascript的区别](https://www.jianshu.com/p/10cfcb536d4a)
* [es6支持情况](https://kangax.github.io/compat-table/es6)
* [检查JavaScript文件中的ES版本](https://github.com/dollarshaveclub/es-check)
* [文档对象模型 (DOM)](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)
* [JavaScript HTML DOM](https://www.w3school.com.cn/js/js_htmldom_document.asp)



**ECMAScript6**

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


## 第三方依赖库

* [JavaScript 日期处理类库](https://github.com/moment/moment)
[http://momentjs.cn](http://momentjs.cn)

* [https://github.com/matthewhudson/current-device](https://github.com/matthewhudson/current-device)
* [Babel 是一个JavaScript转换编译器](https://babeljs.io) [https://www.babeljs.cn](https://www.babeljs.cn)
* [压缩或编码解码库](https://github.com/photopea)
* [压缩](https://github.com/nodeca/pako)
* [现代化的拷贝文字](http://www.clipboardjs.cn)
* [https://github.com/Stuk/jszip](https://github.com/Stuk/jszip)
* [使浏览器支持require](https://github.com/browserify)
* [https://github.com/pixijs/pixi.js](https://github.com/pixijs/pixi.js)
* [https://github.com/zenorocha/clipboard.js](https://github.com/zenorocha/clipboard.js)
[http://www.clipboardjs.cn](http://www.clipboardjs.cn)


## CDN

* [https://cdnjs.com](https://cdnjs.com)
* 知乎：[https://unpkg.zhimg.com](https://unpkg.zhimg.com)
* 饿了么：[https://npm.elemecdn.com](https://npm.elemecdn.com)
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


* [https://github.com/jsdelivr/jsdelivr](https://github.com/jsdelivr/jsdelivr)
* [https://www.bootcdn.cn](https://www.bootcdn.cn)
* [http://staticfile.org](http://staticfile.org)
* [https://cdn.baomitu.com](https://cdn.baomitu.com)


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

## 延时

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


## 标签默认动作

- href伪协议

```html
<a href="javascript:void(0);" onclick="test()">{{ row.name }}</a>
```


- 原生方式

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


- VUE阻止默认行为

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




