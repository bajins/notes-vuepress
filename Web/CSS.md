# CSS


* [flag](#flag)
* [css3新单位](#css3新单位)
* [calc](#calc)
* [`Media Queries`](#media-queries)
  * [设备类型](#设备类型)
  * [设备特性](#设备特性)
  * [兼容移动设备](#兼容移动设备)
  * [外联和内嵌样式](#外联和内嵌样式)
  * [`bootstrap css`](#bootstrap-css)
  * [混合应用](#混合应用)
* [文本溢出处理](#文本溢出处理)
  * [隐藏溢出内容](#隐藏溢出内容)
* [`Footer`固定在页面底部](#footer固定在页面底部)
* [`Footer`固定在窗口底部](#footer固定在窗口底部)
* [水平排列](#水平排列)
* [动画](#动画)





## flag

* [css](https://developer.mozilla.org/zh-CN/docs/Web/CSS)

* [CSS3/CSS2/CSS 教程](http://www.w3chtml.com/css3/)

* [HTML系列教程](https://www.w3school.com.cn/h.asp)

* [http://css.doyoe.com/](http://css.doyoe.com/)



## css3新单位


- `vw`：视窗宽度的百分比（`1vw`代表视窗的宽度为`1%`）
- `vh`：视窗高度的百分比（`1vh`代表视窗的宽度为`1%`）
- `vmin`：当前`vw`和`vh`中较小的一个值
- `vmax`：当前`vw`和`vh`中较大的一个值

> `vw`、`vh`、`vmin`、`vmax` 是一种由视窗（`Viewport`）大小来决定的视窗单位，也是相对单位。它相对的不是父节点或者页面的根节点。

> 视窗(`Viewport`)是你的浏览器实际显示内容的区域—，换句话说是你的不包括工具栏和按钮的网页浏览器。


> 做移动页面开发时，如果使用`vw`、`wh`设置字体大小，在竖屏和横屏状态下显示的字体大小是不一样的。
> 这里就可以用到`vmin`和`vmax`使得文字大小在横竖屏下保持一致。


- `vw`和`vh` 与`%`百分比的区别

> `%`是相对于父元素的大小设定的比率，`vw`、`vh` 是视窗大小决定的。

> `vw`、`vh`优势在于能够直接获取高度，而用`%`在没有设置`body`高度的情况下，无法正确获得可视区域的高度。

> 当元素没有内容时候，设置`height:100%`，该元素不会被撑开，此时高度为`0`，但是设置`height:100vh`，该元素会被撑开屏幕高度一致。


## calc

> `calc()` 函数用于动态计算长度值。

* [https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)


> 使用`+`、`-`、`*` 和 `/`四则运算

> 可以使用`%`、`px`、`em`、`rem`等单位

> 可以混合使用各种单位进行计算

> 表达式中有`+`和`-`时，其前后必须要有空格，如`widht: calc(12%+5em)`这种没有空格的写法是错误的

> 表达式中有`*`和`/`时，其前后可以没有空格，但建议留有空格



## `Media Queries`

> `Media Queries`能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。

> 使用`Media Queries`必须要使用`@media`开头，然后指定媒体类型（也可以称为设备类型），随后是指定媒体特性（也可以称之为设备特性）。
> 媒体特性的书写方式和样式的书写方式非常相似，主要分为两个部分，而且这两个部分之间使用冒号分隔：
>> 第一个部分指的是媒体特性
>>
>> 第二部分为媒体特性所指定的值


- 语法

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



### 设备类型

| 值          | 描述                                  |
|------------|-------------------------------------|
| all        | 用于所有设备                              |
| print      | 用于打印机和打印预览                          |
| screen     | 用于电脑屏幕，平板电脑，智能手机等。                  |
| speech     | 应用于屏幕阅读器等发声设备                       |


### 设备特性

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


### 兼容移动设备

* [HTML页面适应移动端](https://www.jianshu.com/p/d95579d721a1)

* [到底什么是像素](https://segmentfault.com/a/1190000017526874)

* [使用meta标签设置viewport](https://segmentfault.com/a/1190000020218602)

* [visual viewport、layout viewport和ideal viewport介绍](https://segmentfault.com/a/1190000017542232)

* [viewport 深入理解](https://www.runoob.com/w3cnote/viewport-deep-understanding.html)


```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

> 移动设备上的`viewport`就是其屏幕上能用来显示我们的网页的那一块区域。

> `width = device-width`：宽度等于当前设备的宽度
>
> `initial-scale`：初始的缩放比例（默认设置为1.0）
>
> `minimum-scale`：允许用户缩放到的最小比例（默认设置为1.0）
>
> `maximum-scale`：允许用户缩放到的最大比例（默认设置为1.0）
>
> `user-scalable`：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面）

* [完整示例](/files/MediaQueriesExample.html)


### 外联和内嵌样式

```html
/* 外联 */
@import url(style.css) screen and (min-width:1000px);
<!-- 外联 -->
<link rel="stylesheet" href="style.css" media="only screen and (max-width:640px)">

<!-- 内联 -->
<style>
    @media screen and (min-width:640px) {
      body{
        background:coral;
      }
    }
</style>
```



### `bootstrap css`


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

### 混合应用

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




## 文本溢出处理

- `white-space: normal|pre|nowrap|pre-wrap|pre-line|inherit;`

> `white-space` 属性设置如何处理元素内的空白 
>> `normal` 默认。空白会被浏览器忽略
>>
>> `pre` 空白会被浏览器保留。其行为方式类似`HTML`中的`pre`标签
>>
>> `nowrap` 文本不会换行，文本会在在同一行上继续，直到遇到`br`标签为止
>> 
>> `pre-wrap` 保留空白符序列，但是正常地进行换行 
>> 
>> `pre-line` 合并空白符序列，但是保留换行符
>> 
>> `inherit` 规定应该从父元素继承`white-space`属性的值


- `word-wrap: normal|break-word;`

> `word-wrap` 属性用来标明是否允许浏览器在单词内进行断句，这是为了防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。 
>> `normal` 只在允许的断字点换行(浏览器保持默认处理) 
>> 
>> `break-word` 在长单词或URL地址内部进行换行 


- `word-break: normal|break-all|keep-all;`

> `word-break` 属性用来标明怎么样进行单词内的断句。 
>> `normal` 使用浏览器默认的换行规则
>> 
>> `break-all` 允许再单词内换行
>> 
>> `keep-all` 只能在半角空格或连字符处换行

- `text-overflow: clip|ellipsis|string;`

> `text-overflow` 属性规定当文本溢出包含元素时发生的事情。
>> `clip` 修剪文本
>>
>> `ellipsis` 显示省略符号来代表被修剪的文本
>>
>> `string` 使用给定的字符串来代表被修剪的文本



### 隐藏溢出内容

```css
div{
    /*必须指定宽度*/
    width: 200px;
    /*处理行内元素标签*/
    display: block;
    /*隐藏溢出内容*/
    overflow: hidden;
    word-break: keep-all;
    /*强制文本不能换行*/
    white-space: nowrap;
    text-overflow: ellipsis;
}
/*光标移动到div上，就能够看到全部文本。*/
div:hover{
   text-overflow:inherit;
   overflow:visible;
}
```


## `Footer`固定在页面底部

- `Sticky Footer`
> 所谓`Sticky Footer`，并不是什么新的前端概念和技术，它指的就是一种网页效果： 
>> 如果页面内容不足够长时，页脚固定在浏览器窗口的底部；
>>
>> 如果内容足够长时，页脚固定在页面的最底部。但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

* [CSS-Footer底部固定实现](https://github.com/junruchen/junruchen.github.io/wiki/CSS-Footer%E5%BA%95%E9%83%A8%E5%9B%BA%E5%AE%9A%E5%AE%9E%E7%8E%B0)



* [fix-footer-page-bottom-margin-top.html](/files/fix-footer-page-bottom-margin-top.html)

> 这是个比较主流的用法，把内容部分最小高度设为100%，
> 再利用内容部分的负底部外边距值来达到当高度不满时，页脚保持在窗口底部，当高度超出则随之推出的效果。

> 需要容器里有额外的占位元素（如.ph），以防止`content`区域的内容被`footer`覆盖

> 需要注意的是`.content`的`margin-bottom`值需要和`.footer`的负的`height`值保持一致，这一点不太友好。



* [fix-footer-page-bottom-calc.html](/files/fix-footer-page-bottom-calc.html)

> `calc`的用法比较简单，但是需要注意`calc`与`(`之间不要有空格，另外运算符前后应该有空格。如：`min-height: calc(100% - 50px);`

> 通过计算函数`calc`计算（视窗高度 - 页脚高度）赋予内容区最小高度，不需要任何额外样式处理，代码量最少、最简单。
>
> 如果不需考虑`calc()`以及`vh`单位的兼容情况，这是个很理想的实现方案。同样的问题是`footer`的高度值需要与`content`其中的计算值一致。



* [fix-footer-page-bottom-absolute.html](/files/fix-footer-page-bottom-absolute.html)

> 注意：`div.container`设置最小高度为`100%`，以保证当内容区高度小于浏览器高度时，`footer`仍位于底部

> 这个方案需指定`html`、`body`的`100%`高度，且`content`的`padding-bottom`需要与`footer`的`height`一致。


* [fix-footer-page-bottom-grid.html](/files/fix-footer-page-bottom-grid.html)

* [fix-footer-page-bottom-flex.html](/files/fix-footer-page-bottom-flex.html)


## `Footer`固定在窗口底部

* [fix-footer-window-bottom-fixed.html](/files/fix-footer-window-bottom-fixed.html)


* [fix-footer-window-bottom-sticky.html](/files/fix-footer-window-bottom-sticky.html)



## 水平排列

> 字体居中需使元素与父级元素等宽

* [horizontal-arrangement-flex.html](/files/horizontal-arrangement-flex.html)

* [horizontal-arrangement-float-left.html](/files/horizontal-arrangement-float-left.html)

* [horizontal-arrangement-inline-block.html](/files/horizontal-arrangement-inline-block.html)



## 动画

* [动画](https://www.w3school.com.cn/css3/css3_animation.asp)

* [过渡](https://www.w3school.com.cn/css3/css3_3dtransform.asp)

- **属性**

| 属性                           | 描述                                        | CSS |
|------------------------------|-------------------------------------------|-----|
| transform                    | 向元素应用 2D 或 3D 转换。                         | 3   |
| transform\-origin            | 允许你改变被转换元素的位置。                            | 3   |
| transform\-style             | 规定被嵌套元素如何在 3D 空间中显示。                      | 3   |
| perspective                  | 规定 3D 元素的透视效果。                            | 3   |
| perspective\-origin          | 规定 3D 元素的底部位置。                            | 3   |
| backface\-visibility         | 定义元素在不面对屏幕时是否可见。                          | 3   |
| transition                   | 简写属性，用于在一个属性中设置四个过渡属性。                    | 3   |
| transition\-property         | 规定应用过渡的 CSS 属性的名称。                        | 3   |
| transition\-duration         | 定义过渡效果花费的时间。默认是 0。                        | 3   |
| transition\-timing\-function | 规定过渡效果的时间曲线。默认是 "ease"。                   | 3   |
| transition\-delay            | 规定过渡效果何时开始。默认是 0。                         | 3   |
| @keyframes                   | 规定动画。                                     | 3   |
| animation                    | 所有动画属性的简写属性，除了 animation\-play\-state 属性。 | 3   |
| animation\-name              | 规定 @keyframes 动画的名称。                      | 3   |
| animation\-duration          | 规定动画完成一个周期所花费的秒或毫秒。默认是 0。                 | 3   |
| animation\-timing\-function  | 规定动画的速度曲线。默认是 "ease"。                     | 3   |
| animation\-delay             | 规定动画何时开始。默认是 0。                           | 3   |
| animation\-iteration\-count  | 规定动画被播放的次数。默认是 1。                         | 3   |
| animation\-direction         | 规定动画是否在下一周期逆向地播放。默认是 "normal"。            | 3   |
| animation\-play\-state       | 规定动画是否正在运行或暂停。默认是 "running"。              | 3   |
| animation\-fill\-mode        | 规定对象动画时间之外的状态。                            | 3   |


- **圆形进度条**

* [circle-progress-bar](/files/circle-progress-bar.html)

* [round-progress-bar](/files/round-progress-bar.html)

>  首先：是定义三个动画，第一个是最外层，让他只显示一半，然后运行3s，同时右边运行3s,从0到180度。
  
> 接着：到了180度之后，释放外层的显示一半，让他自动显示其他。然后右边的停止动画并停在那里。
  
> 最后：左边的在原来的基础（跟右边一样运行3s，同样转过180度）再继续转动180度。



## 伪类和伪元素

* [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

* [伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pseudo-elements)

* [伪元素组成的时间线](https://github.com/woytu/UseNotes-vuepress/commits/master)


- 分割线

```css
.split-line:before {
    padding: 0 5px;
    color: #ccc;
    content: "|\00a0";
}
```

