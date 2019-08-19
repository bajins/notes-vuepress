# HTML5/CSS3

## 目录

* [CSS3](#css3)
  * [`Media Queries`](#media-queries)
    * [语法](#语法)
    * [设备类型](#设备类型)
    * [设备特性](#设备特性)
    * [外联和内嵌样式](#外联和内嵌样式)
    * [`bootstrap css`](#bootstrap-css)
      * [混合应用](#混合应用)
  * [JavaScript获取宽高](#javascript获取宽高)



## CSS3

> 新增功能

- 动画 `animation`
- 转化 `transform`
- 过渡 `translation`

> 之前必须用 JS 或 JQ 写的效果用 CSS 就能实现，现在几行 CSS3 代码就够了。

> `CSS3`的多媒体查询继承了`CSS2`多媒体类型的所有思想：取代了查找设备的类型，`CSS3`根据设置自适应显示。
> 媒体查询可用于检测很多事情，例如：
>> `viewport`(视窗) 的宽度与高度
>>
>> 设备的宽度与高度
>>
>> 朝向 (智能手机横屏，竖屏)
>>
>> 分辨率
>>
>> 目前很多针对苹果手机，Android 手机，平板等设备都会使用到多媒体查询。

### `Media Queries`

> `Media Queries`能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。
>
> 使用`Media Queries`必须要使用`@media`开头，然后指定媒体类型（也可以称为设备类型），随后是指定媒体特性（也可以称之为设备特性）。
> 媒体特性的书写方式和样式的书写方式非常相似，主要分为两个部分，而且这两个部分之间使用冒号分隔：
>> 第一个部分指的是媒体特性
>
>> 第二部分为媒体特性所指定的值


#### 语法
> @media 设备类型 and|not|only （设备特性）{样式代码}

> `Media Queries`可以使用关键词`and`将多个媒体特性结合在一起。
> 一个`Media Query`中可以包含0到多个表达式，表达式又可以包含0到多个关键字，以及一种媒体类型。

> `only`的作用是，让那些不支持`Media Query`但是能够读取`Media Type`的设备的浏览器将表达式中的样式隐藏起来。
>> 示例：`@media only screen and (min-width: 768px) {body {background: blue;}}`
>
> 对于支持`Media Query`的设备来说，正确应用该样式；对于不支持`Media Query`但能够读取`Media Type`的设备，
> 由于先读取到的是`only`而不是`screen`，将忽略该样式。
>
> `not`是用来排除某种制定的媒体类型，也就是用来排除符合表达式的设备。换句话说，not关键词表示对后面的表达式执行取反操作。


> 兼容移动设备的展示效果：

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

> `width = device-width`：宽度等于当前设备的宽度
>
> `initial-scale`：初始的缩放比例（默认设置为1.0）
>
> `minimum-scale`：允许用户缩放到的最小比例（默认设置为1.0）
>
> `maximum-scale`：允许用户缩放到的最大比例（默认设置为1.0）
>
> `user-scalable`：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面）




#### 设备类型
| 值          | 描述                                  |
|------------|-------------------------------------|
| all        | 用于所有设备                              |
| print      | 用于打印机和打印预览                          |
| screen     | 用于电脑屏幕，平板电脑，智能手机等。                  |
| speech     | 应用于屏幕阅读器等发声设备                       |


#### 设备特性
| 值                       | 描述                                         |
|-------------------------|--------------------------------------------|
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                     |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0            |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0       |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                       |
| device-height           | 定义输出设备的屏幕可见高度。                             |
| device-width            | 定义输出设备的屏幕可见宽度。                             |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                         |
| height                  | 定义输出设备中的页面可见区域高度。                          |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                     |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                        |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                      |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                     |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                          |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                           |
| max-height              | 定义输出设备中的页面最大可见区域高度。                        |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。               |
| max-resolution          | 定义设备的最大分辨率。                                |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                        |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。                  |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                        |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                      |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                     |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                           |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                          |
| min-height              | 定义输出设备中的页面最小可见区域高度。                        |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数                |
| min-resolution          | 定义设备的最小分辨率。                                |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                        |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0  |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。                 |
| resolution              | 定义设备的分辨率。如：`96dpi`, `300dpi`, `118dpcm`          |
| scan                    | 定义电视类设备的扫描工序。                              |
| width                   | 定义输出设备中的页面可见区域宽度。                          |



#### 外联和内嵌样式

```html
//外联
@import url(style.css) screen and (min-width:1000px);

<link rel="stylesheet" href="style.css" media="only screen and (max-width:640px)">

//内嵌样式：
<style>
    @media screen and (min-width:640px) {
      body{
        background:coral;
      }
    }
</style>
```



#### `bootstrap css`


> 先看下面的代码,这是从`bootstrap`中遍历出来的，`min-width`来确认分别是`768`、`992`、`1200`。
>
> 当然了过去也有些设备宽度是`600` `480`的，哪些小分辨率的我们都归类为小于`767`的。
>
> 为什么是小于`767`而不是`768`呢，那是因为在`css`中`@media (min-width: 768px)`表示最小是`768`也就是`>=768`，
> 这里有等于，所以我们判断更小的设备用`@media (max-width: 767px)`这边表示`<=767`就不会有冲突了

> 运用`@media`实现网页自适应中的几个关键分辨率

```css
@media (min-width: 768px){
/*>=768的设备*/
}
@media (min-width: 992px){
/*>=992的设备*/
}
@media (min-width: 1200px){
/*>=1200的设备*/
}
```

> 注意下顺序，如果你把上面的分辨率大小顺序反过来，按从大到小写那么很悲剧，因为如果是`1440`,由于`1440>768`那么你的`1200`就会失效。
>
> 所以我们用`min-width`时，小的放上面大的在下面，同理如果是用`max-width`那么就是大的在上面，小的在下面

```css
@media (max-width: 1199px){
/*<=1199的设备*/
}
@media (max-width: 991px){
/*<=991的设备*/
}
@media (max-width: 767px){
/*<=768的设备*/
}
```

##### 混合应用

```css
@media all and (orientation : portrait) {
/*竖屏*/
}
@media all and (orientation : landscape) {
/*横屏*/
}

@media screen and (min-width: 1200px) {
    /*>=1200的设备*/
}

@media screen and (min-width: 960px) and (max-width: 1199px) {
    /*>=960,<=1200的设备*/
}

@media screen and (min-width: 768px) and (max-width: 959px) {
    /*>=768,<=960的设备*/
}

@media only screen and (min-width: 480px) and (max-width: 767px) {
    /*>=480,<=768的设备*/
}

@media only screen and (max-width: 479px) {
    /*<=480的设备*/
}
```


### JavaScript获取宽高
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
