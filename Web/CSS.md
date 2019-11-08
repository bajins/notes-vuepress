# CSS



* [flag](#flag)
* [`Media Queries`](#media-queries)
  * [语法](#语法)
  * [设备类型](#设备类型)
  * [设备特性](#设备特性)
  * [外联和内嵌样式](#外联和内嵌样式)
  * [`bootstrap css`](#bootstrap-css)
  * [混合应用](#混合应用)
  * [完整示例](#完整示例)
* [文本溢出处理](#文本溢出处理)
  * [隐藏溢出内容](#隐藏溢出内容)
* [`Footer`固定在底部](#footer固定在底部)
  * [固定在页面底部](#固定在页面底部)
    * [借助`margin`](#借助margin)
    * [借助`padding`](#借助padding)
    * [使用`calc`计算属性](#使用calc计算属性)
    * [使用`flex`布局](#使用flex布局)
    * [使用`absolute`定位](#使用absolute定位)
    * [使用`grid`网格布局](#使用grid网格布局)
  * [固定在窗口底部](#固定在窗口底部)
    * [`fixed`定位](#fixed定位)
    * [`absolute`定位](#absolute定位)
    * [`flex`布局](#flex布局)
    * [`calc`计算属性](#calc计算属性)









## flag


* [HTML系列教程](https://www.w3school.com.cn/h.asp)

* [http://css.doyoe.com/](http://css.doyoe.com/)



## `Media Queries`

> `Media Queries`能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。
>
> 使用`Media Queries`必须要使用`@media`开头，然后指定媒体类型（也可以称为设备类型），随后是指定媒体特性（也可以称之为设备特性）。
> 媒体特性的书写方式和样式的书写方式非常相似，主要分为两个部分，而且这两个部分之间使用冒号分隔：
>> 第一个部分指的是媒体特性
>>
>> 第二部分为媒体特性所指定的值


### 语法

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


- 兼容移动设备

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


### 完整示例

```html
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>停水通知</title>
    <!--  让当前viewport的宽度等于设备的宽度，即将viewport由默认变为ideal viewport  -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=0">
    <style>
        .container {
            width: 50%;
            margin: 25% auto;
            background-color: #f0f0f0;
            padding: 2% 5%;
            border-radius: 10px;
        }
        @media only screen and (max-width:768px) {
            .container {
                width: 70%;
            }
        }
        @media only screen and (max-width:450px) {
            .container {
                width: 90%;
            }
        }
        @media screen and (min-width:1025px) {
            .container {
                margin: 15% auto;
                width: 35%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>尊敬的各位业主/住户：</h3>
        <p style="text-indent:2em;">
            <span>因本小区主自来水管网阀门损坏需停水维修，xxx月xxx日9：00--17:30进行自来水的主管道阀门进行抢修更换。</span>
            <span>届时本小区1号楼2号楼3号楼的生活用水将受影响，请各位住户做好储水准备。</span>
            <span>因自来水主管道阀门更换抢修工作给您生活带来的不便敬请谅解，感谢您对我们物业服务工作的理解和支持。</span>
        </p>
        <p style="text-align: right;">xxxxxx物业有限公司</p>
        <p style="text-align: right;">20xxx年xxx月xxx日</p>
    </div>
</body>
</html>
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

## `Footer`固定在底部

- `Sticky Footer`
> 所谓`Sticky Footer`，并不是什么新的前端概念和技术，它指的就是一种网页效果： 
>> 如果页面内容不足够长时，页脚固定在浏览器窗口的底部；
>>
>> 如果内容足够长时，页脚固定在页面的最底部。但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

* [CSS-Footer底部固定实现](https://github.com/junruchen/junruchen.github.io/wiki/CSS-Footer%E5%BA%95%E9%83%A8%E5%9B%BA%E5%AE%9A%E5%AE%9E%E7%8E%B0)

### 固定在页面底部

#### 借助`margin`

> 这是个比较主流的用法，把内容部分最小高度设为100%，
> 再利用内容部分的负底部外边距值来达到当高度不满时，页脚保持在窗口底部，当高度超出则随之推出的效果。

> 需要容器里有额外的占位元素（如.ph），以防止`content`区域的内容被`footer`覆盖


```html
<body>
  <div class="content">
    <div class="ph"></div>
  </div>
  <div class="footer"></div>
</body>
```

- `div.content`使用`margin-bottom: -50px;`

> 需要注意的是`.content`的`margin-bottom`值需要和`.footer`的负的`height`值保持一致，这一点不太友好。

```css
html {
  height: 100%;
}
body {
  height: 100%
}
.content {
  width: 100%;
  height: 500px; /*高度可由内容撑开*/
  min-height: 100%;
  margin-bottom: -50px;
  background-color: #ccc;
}
.footer {
  width: 100%;
  height: 50px;
  background-color: #666;
}
.ph {
  height: 50px; /*占位元素，与footer高度一致*/
}
```

- `div.footer`使用`margin-top: -50px;`

> 给内容外增加父元素，并让内容部分的底部内边距与页脚高度的值相等。

```css
html {
  height: 100%;
}
body {
  height: 100%
}
.content {
  width: 100%;
  height: 500px; /*高度可由内容撑开*/
  min-height: 100%;
  background-color: #ccc;
}
.footer {
  width: 100%;
  height: 50px;
  margin-top: -50px;
  background-color: #666;
}
.ph {
  height: 50px; /*占位元素，与footer高度一致*/
}
```

#### 借助`padding`

> 使用`padding`实现`footer`置底，需要为`div.content`元素增加一个父元素，
> 且需为`div.footer`元素设置`margin-top: -50px`来抵消使用`padding`产生的高度


```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%
    }
    .container {
      width: 100%;
      min-height: 100%;
      background-color: #ccc;
    }
    .content {
      width: 100%;
      height: 500px; /*高度可由内容撑开*/
      padding-bottom: 50px;
    }
    .footer {
      width: 100%;
      height: 50px;
      margin-top: -50px; /*用来抵消content使用padding产生的高度*/
      background-color: #666;
    }
</style>
<body>
  <div class="content">
    <div class="push"></div>
  </div>
  <div class="footer"></div>
</body>
```


#### 使用`calc`计算属性

> `calc`的用法比较简单，但是需要注意`calc`与`(`之间不要有空格，另外运算符前后应该有空格。如：`min-height: calc(100% - 50px);`

> 通过计算函数`calc`计算（视窗高度 - 页脚高度）赋予内容区最小高度，不需要任何额外样式处理，代码量最少、最简单。
>
> 如果不需考虑`calc()`以及`vh`单位的兼容情况，这是个很理想的实现方案。同样的问题是`footer`的高度值需要与`content`其中的计算值一致。



```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%
    }
    .content {
      width: 100%;
      height: 500px; /*高度可由内容撑开*/
      min-height: calc(100% - 50px);
      background-color: #ccc;
    }
    .footer {
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```

#### 使用`flex`布局

> `flex`布局`footer`的高度设置更加灵活，不需要设计计算，也不需要占位符。

```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -webkit-flex-direction: column; 
    }
    .content {
      /* 使内容高度可以自由伸缩*/
      flex: 1;
      -webkit-flex: 1;
      width: 100%;
      height: 500px; /*高度可由内容撑开*/
      background-color: #ccc;
    }
    .footer {
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```


#### 使用`absolute`定位

> 注意：`div.container`设置最小高度为`100%`，以保证当内容区高度小于浏览器高度时，`footer`仍位于底部

> 这个方案需指定`html`、`body`的`100%`高度，且`content`的`padding-bottom`需要与`footer`的`height`一致。

```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%
    }
    .container {
      position: relative;
      min-height: 100%;
    }
    .content {
      width: 100%;
      height: 500px; /*高度可由内容撑开*/
      background-color: #ccc;
    }
    .footer {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="container">
    <div class="content"></div>
    <div class="footer"></div>
  </div>
</body>
```

#### 使用`grid`网格布局

```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
    }
    .content {
      width: 100%;
      height: 500px; /*高度可由内容撑开*/
      background-color: #ccc;
    }
    .footer {
      grid-row-start: 2;
      grid-row-end: 3;
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```


### 固定在窗口底部

#### `fixed`定位


```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
    .content {
      width: 100%;
      height: 500px;
      background-color: #ccc;
    }
    .footer{
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```

#### `absolute`定位

> `absolute`定位只能将`footer`置于底部，还需要将`div.content`设置为高度固定的可滚动区域，同理上述实现位于页面底部`footer`的方式，
> 如：`flex`布局、`absolute`定位、`calc`计算属性，都可转换为固定在浏览器窗口底部的方法。

```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
    .content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background-color: #ccc;
    }
    .footer{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```


#### `flex`布局

```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -webkit-flex-direction: column; 
    }
    .content {
      flex: 1;
      -webkit-flex: 1;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      background-color: #ccc;
    }
    .footer{
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```

#### `calc`计算属性
```html
<style>
    html {
      height: 100%;
    }
    body {
      height: 100%;
    }
    .content {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      background-color: #ccc;
    }
    .footer{
      width: 100%;
      height: 50px;
      background-color: #666;
    }
</style>
<body>
  <div class="content"></div>
  <div class="footer"></div>
</body>
```


## 水平排列

> 字体居中需使元素与父级元素等宽


### `display:flex`

```html
style{
    .display-flex {
      display: flex;
    }
    
    .div-size {
      border: 1px solid red;
      width: 200px;
      height: 120px;
      margin: 10px;
    }
}
<h3>display: flex</h3>
<div class="display-flex">
  <div class="div-size">1</div>
  <div class="div-size">2</div>
  <div class="div-size">3</div>
</div>
```

### `float:left`

```html
style{
    .float-left {
      float: left;
      border: 1px solid yellowgreen;
      width: 200px;
      height: 120px;
      margin: 10px;
    }
    
    .clear {
      clear: both;
    }
}
<h3>float: left</h3>
<div>
  <div class="float-left">4</div>
  <div class="float-left">5</div>
  <div class="float-left">6</div>
</div>
<div class="clear"></div>
```

### `display:inline-block`

```html
style{
    .inline-block {
      display: inline-block;
      border: 1px solid blue;
      width: 200px;
      height: 120px;
      margin: 10px;
    }
}
<h3>display: inline-block</h3>
<div>
  <div class="inline-block">7</div>
  <div class="inline-block">8</div>
  <div class="inline-block">9</div>
</div>
```

