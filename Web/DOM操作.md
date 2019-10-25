# DOM操作


## flag

* [HTML DOM 教程](https://www.w3school.com.cn/htmldom/index.asp)

* [DOM对象](https://www.w3school.com.cn/jsref/dom_obj_document.asp)

* [JavaScript HTML DOM](https://www.w3school.com.cn/js/js_htmldom_document.asp)



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
// 显示浏览器的屏幕的可用宽度像素
screen.availWidth
// 显示浏览器的屏幕的可用高度像素
screen.availHeight

// 浏览器的屏幕的宽度像素
screen.width
// 浏览器的屏幕的高度像素
screen.height

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

// 浏览器窗口的内部宽高，会随窗口的显示大小改变
window.innerWidth
window.innerHeight

// scrollLeft:设置或获取位于给定对象左边界与窗口中目前可见内容的最左端之间的距离；
// scrollTop:设置或获取位于给定对象最顶端与窗口中目前可见内容的最左端之间的距离；
// offsetLeft:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算左侧位置；
// offsetTop:设置或获取位于给定对象相对于版面或由offsetParent属性指定的父坐标的计算顶端位置；

```