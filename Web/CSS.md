# CSS

[[toc]]


## Flag

> Cascading Style Sheets：规定网页的布局

* [https://drafts.csswg.org/css-cascade](https://drafts.csswg.org/css-cascade)
* [https://developer.mozilla.org/zh-CN/docs/Web/CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
* [https://github.com/chokcoco/iCSS](https://github.com/chokcoco/iCSS)
* [https://github.com/Afif13](https://github.com/Afif13)
    * [https://css-loaders.com](https://css-loaders.com)
    * [https://css-generators.com](https://css-generators.com)
* CSS3/CSS2/CSS 教程 [http://www.w3chtml.com/css3](http://www.w3chtml.com/css3)
* [https://github.com/5t3ph/moderncss-dot-dev](https://github.com/5t3ph/moderncss-dot-dev)
* [https://github.com/adrianhajdin/brainwave](https://github.com/adrianhajdin/brainwave)
* HTML系列教程 [https://www.w3school.com.cn/h.asp](https://www.w3school.com.cn/h.asp)
* [http://css.doyoe.com/](http://css.doyoe.com)
* CSS/CSS3 中文参考文档手册 [http://css.cuishifeng.cn](http://css.cuishifeng.cn)
* [https://github.com/adamschwartz/magic-of-css](https://github.com/adamschwartz/magic-of-css)
* [界面灵感类网站合集](https://uxchi.notion.site/881b4c0179a74935a3f607ad3521cdb5)
* [现代 CSS 高阶技巧，完美的波浪进度条效果](https://segmentfault.com/a/1190000043081752)
* 可折叠树 [https://iamkate.com/code/tree-views](https://iamkate.com/code/tree-views)
* [CSS In 2023](https://juejin.cn/post/7232187022399586362)


**各种隐藏HTML元素的区别**

1. `display:none;` 一旦显示为隐藏，则其子元素也隐藏，并且不占用任何位置，JS将获取不到子元素
2. `visiblity:hidden` 设置为隐藏，占据页面空间，其子元素不隐藏，占用位置，不可点击
3. `transform:scale(0);` 缩放为0，占据页面空间，占用位置，不可点击
4. `height:0` 高度为0，不可点击
5. `opacity:0` 透明度，取值范围（0-1），0不显示，占据页面空间，占用位置，并且可以点击
6. `z-index:-10; position:relative;` 层级，`z-index`属性需要搭配`positon`属性一块使用，不然设置了不起作用
7. `position:absolute; left:-5000; top:-5000;` 绝对定位方式移出可视区域，不影响页面布局，脱标
8. `cli-path:polygon(0px 0px , 0px 0px,0px 0px,0px 0px)` 通过裁剪盒子，不脱标
9. `position:absolute; clip:rect(0px 0px 0px 0px);` 通过裁剪绝对定位的盒子，脱标
10. `removeChild` 用JS暂时从DOM树上摘下，但并未从后台清除，如需再次生成必须要用`appendChild`来生成



**颜色**

- 十六进制色 `background-color:#0000ff;`
- RGB 颜色 `background-color:rgb(255,0,0);`
- RGBA 颜色 `background-color:rgba(255,0,0,0.5);` 最后一个参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字
- HSL 颜色 `background-color:hsl(120,65%,75%);` 是hue（色调）、saturation（饱和度）、lightness（亮度），颜色柱面坐标表示法
- HSLA 颜色 `background-color:hsla(120,65%,75%,0.3);`
- 预定义/跨浏览器颜色名 `background-color:red;`

* [CSS颜色代码大全](https://www.cnblogs.com/cnblogs-jcy/p/5689033.html)
* [CSS 颜色名称](https://www.w3school.com.cn/cssref/css_colornames.asp)


**17种标准颜色（HTML 4标准只定义了16种颜色，CSS2.1添加橙色）**

| 英文名  | 中文   | 示例                            |
|---------|--------|---------------------------------|
| aqua    | 浅绿色 | <font color='aqua'>▇▇</font>    |
| black   | 黑色   | <font color='black'>▇▇</font>   |
| blue    | 蓝色   | <font color='blue'>▇▇</font>    |
| fuchsia | 紫红色 | <font color='fuchsia'>▇▇</font> |
| gray    | 灰色   | <font color='gray'>▇▇</font>    |
| green   | 绿色   | <font color='green'>▇▇</font>   |
| lime    | 石灰   | <font color='lime'>▇▇</font>    |
| maroon  | 栗色   | <font color='maroon'>▇▇</font>  |
| navy    | 海军   | <font color='navy'>▇▇</font>    |
| olive   | 橄榄色 | <font color='olive'>▇▇</font>   |
| orange  | 橙色   | <font color='orange'>▇▇</font>  |
| purple  | 紫色   | <font color='purple'>▇▇</font>  |
| red     | 红色   | <font color='red'>▇▇</font>     |
| silver  | 银色   | <font color='silver'>▇▇</font>  |
| teal    | 蓝绿色 | <font color='teal'>▇▇</font>    |
| white   | 白色   | <font color='white'>▇▇</font>   |
| yellow  | 黄色   | <font color='yellow'>▇▇</font>  |



| 英文名    | 中文 | RGB对照 | 示例 |
|-----------|------|---------|------|
| blue      | 蓝   | #007bff | <font color="#007bff">▇▇</font>   |
| cyan      | 青   | #17a2b8 | <font color="#17a2b8">▇▇</font>   |
| dark      | 黑   | #343a40 | <font color="#343a40">▇▇</font>   |
| gray      | 灰   | #6c757d | <font color="#6c757d">▇▇</font>   |
| gray-dark | 灰黑 | #343a40 | <font color="#343a40">▇▇</font>   |
| green     | 绿   | #28a745 | <font color="#28a745">▇▇</font>   |
| indigo    | 靛蓝 | #6610f2 | <font color="#6610f2">▇▇</font>   |
| orange    | 橙   | #fd7e14 | <font color="#fd7e14">▇▇</font>   |
| pink      | 粉   | #e83e8c | <font color="#e83e8c">▇▇</font>   |
| purple    | 紫   | #6f42c1 | <font color="#6f42c1">▇▇</font>   |
| red       | 红   | #dc3545 | <font color="#dc3545">▇▇</font>   |
| teal      | 蓝绿 | #20c997 | <font color="#20c997">▇▇</font>   |
| white     | 白   | #fff    | <font color="#fff">▇▇</font>      |
| yellow    | 黄   | #ffc107 | <font color="#ffc107">▇▇</font>   |
| –         | –    | –       | –    |
| primary   | 主要 | #007bff | <font color="#007bff">▇▇</font>   |
| secondary | 次要 | #6c757d | <font color="#6c757d">▇▇</font>   |
| success   | 成功 | #28a745 | <font color="#28a745">▇▇</font>   |
| info      | 信息 | #17a2b8 | <font color="#17a2b8">▇▇</font>   |
| warning   | 警告 | #ffc107 | <font color="#ffc107">▇▇</font>   |
| danger    | 危险 | #dc3545 | <font color="#dc3545">▇▇</font>   |
| light     | 浅色 | #f8f9fa | <font color="#f8f9fa">▇▇</font>   |






## 第三方库

- [https://github.com/topics/css-framework](https://github.com/topics/css-framework)


* [https://github.com/filamentgroup](https://github.com/filamentgroup)
* [https://github.com/pure-css/pure](https://github.com/pure-css/pure)
    * [https://www.purecss.cn](https://www.purecss.cn)
* [https://github.com/wintermute-cell/magick.css](https://github.com/wintermute-cell/magick.css)
* [https://github.com/louismerlin/concrete.css](https://github.com/louismerlin/concrete.css)
* [https://github.com/milligram/milligram](https://github.com/milligram/milligram)
* [https://github.com/dhg/Skeleton](https://github.com/dhg/Skeleton)
* [https://github.com/necolas/normalize.css](https://github.com/necolas/normalize.css)
* [https://github.com/picturepan2/spectre](https://github.com/picturepan2/spectre)
* [https://github.com/semantic-org/semantic-ui](https://github.com/semantic-org/semantic-ui)
* [https://github.com/Dogfalo/materialize](https://github.com/Dogfalo/materialize)
    * [http://www.materializecss.cn](http://www.materializecss.cn)
* [https://github.com/jgthms/bulma](https://github.com/jgthms/bulma)
    * [https://lqzhgood.github.io/bulma-docs-cn](https://lqzhgood.github.io/bulma-docs-cn)
* [https://github.com/Chalarangelo/mini.css](https://github.com/Chalarangelo/mini.css)
* [https://github.com/olton/Metro-UI-CSS](https://github.com/olton/Metro-UI-CSS)
* [https://github.com/saadeghi/daisyui](https://github.com/saadeghi/daisyui)
* [https://github.com/antfu/unocss](https://github.com/antfu/unocss)
* [https://github.com/windicss/windicss](https://github.com/windicss/windicss)
* [https://github.com/tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
    * [https://www.tailwindcss.cn](https://www.tailwindcss.cn)
    * [https://github.com/mdbootstrap/Tailwind-Elements](https://github.com/mdbootstrap/Tailwind-Elements)
    * [https://github.com/sonofmagic/weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)
* [https://github.com/sailboatui/sailboatui](https://github.com/sailboatui/sailboatui)
* [https://github.com/dufu1991/stdf](https://github.com/dufu1991/stdf)
* [https://github.com/FullHuman/purgecss](https://github.com/FullHuman/purgecss)
    * [https://www.purgecss.cn](https://www.purgecss.cn)
* [https://github.com/codazoda/neatcss](https://github.com/codazoda/neatcss)
* [https://github.com/tw-in-js/twind](https://github.com/tw-in-js/twind)
* [https://github.com/BlazeSoftware](https://github.com/BlazeSoftware)
* [https://github.com/postcss/postcss](https://github.com/postcss/postcss)
    * [https://www.postcss.com.cn](https://www.postcss.com.cn)
* [https://github.com/unocss/unocss](https://github.com/unocss/unocss)
* [https://github.com/ansible-semaphore/semaphore](https://github.com/ansible-semaphore/semaphore)
* [https://www.telerik.com/kendo-ui](https://www.telerik.com/kendo-ui)
* [https://github.com/shadcn/ui](https://github.com/shadcn/ui)
* [https://github.com/shadcn-ui/ui](https://github.com/shadcn-ui/ui)
    * [https://ui.shadcn.com/charts](https://ui.shadcn.com/charts)
* [https://github.com/magicuidesign/magicui](https://github.com/magicuidesign/magicui)
* [https://github.com/radix-ui](https://github.com/radix-ui)
* [https://github.com/shoelace-style/shoelace](https://github.com/shoelace-style/shoelace)
* 解析 [https://github.com/csstree/csstree](https://github.com/csstree/csstree)
* 矢量图标 [https://github.com/FortAwesome/Font-Awesome](https://github.com/FortAwesome/Font-Awesome)
* [https://www.iconfont.cn](https://www.iconfont.cn)
* [https://www.iconbolt.com](https://www.iconbolt.com)
* [https://icomoon.io](https://icomoon.io)
* [https://www.flaticon.com/authors/freepik](https://www.flaticon.com/authors/freepik)
* [https://glyphicons.com](https://glyphicons.com)
* [https://iconbuddy.app](https://iconbuddy.app)
* [https://useanimations.com](https://useanimations.com)
* [https://github.com/primer/octicons](https://github.com/primer/octicons)
* [https://yesicon.app](https://yesicon.app)
    * [https://github.com/rotick/yesicon-forum](https://github.com/rotick/yesicon-forum)
* [https://github.com/simple-icons](https://github.com/simple-icons)
* [https://github.com/pheralb/svgl](https://github.com/pheralb/svgl)
* [https://iconce.com](https://iconce.com)
* [https://github.com/KanjiVG/kanjivg](https://github.com/KanjiVG/kanjivg)
* [https://github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
* [https://shipfa.st/tools/logo-fast](https://shipfa.st/tools/logo-fast)
* [https://www.svgviewer.dev](https://www.svgviewer.dev)
* [https://github.com/hugeicons/hugeicons-react](https://github.com/hugeicons/hugeicons-react)
* [https://github.com/pqoqubbw/icons](https://github.com/pqoqubbw/icons)
* 生成SVG [https://github.com/chaseFunny/svg-backend](https://github.com/chaseFunny/svg-backend)


- [最受程序员欢迎的 20 个 CSS 框架](https://www.fuocu.cn/archives/css-frame)
- [https://github.com/sass](https://github.com/sass)
    - [https://www.sass.hk/docs](https://www.sass.hk/docs)
    - [SASS用法指南(阮一峰)](http://www.ruanyifeng.com/blog/2012/06/sass.html)
- [https://github.com/less](https://github.com/less)
    - [https://less.bootcss.com](https://less.bootcss.com)
- [https://github.com/cssnano/cssnano](https://github.com/cssnano/cssnano)
    - [https://www.cssnano.cn](https://www.cssnano.cn)
- CSS规约 [https://github.com/stylelint/stylelint](https://github.com/stylelint/stylelint)
- [https://github.com/ubershmekel/cssbed](https://github.com/ubershmekel/cssbed)



## CSS3新单位和计算

* [https://www.w3.org/TR/css3-values/#lengths](https://www.w3.org/TR/css3-values/#lengths)
* [https://developer.mozilla.org/zh-CN/docs/Web/CSS/length](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length)
* [https://www.raresportan.com/css-units](https://www.raresportan.com/css-units)

| 单位 	| 说明                                                                          	|
|------	|-------------------------------------------------------------------------------	|
| px   	| 一像素（pixel） 	|
| cm   	| 一厘米。`1cm = 96px / 2.54` 	|
| mm   	| 一毫米。`1mm = 1/10 * 1cm` 	|
| in   	| 一英寸。`1in = 2.54cm = 96px`	|
| pc   	| 一磅（point），72 分之一英寸。`1pc = 12pt = 1/6 * 1in` 	|
| pt   	| 一磅（point），72 分之一英寸。`1pt = 1/12 * 1pc = 1/72 * 1in`	|
| ch   	| 数字 0 的宽度                                                                 	|
| em   	| 相对于应用在当前元素的字体尺寸。一般浏览器字体大小默认为16px，则2em == 32px； 	|
| ex   	| 依赖于英文字母小 x 的高度                                                     	|
| rem  	| 根元素（html）的 font-size                                                    	|
| vh   	| viewpoint height，视窗高度，1vh=视窗高度的1%                                  	|
| vw   	| viewpoint width，视窗宽度，1vw=视窗宽度的1%                                   	|
| vmin 	| vw和vh中较小的那个。                                                          	|
| vmax 	| vw和vh中较大的那个。                                                          	|


> `vw`、`vh`、`vmin`、`vmax` 是一种由视窗（`Viewport`）大小来决定的视窗单位，也是相对单位。它相对的不是父节点或者页面的根节点。

> 视窗(`Viewport`)是你的浏览器实际显示内容的区域，换句话说是你的不包括工具栏和按钮的网页浏览器。

> 做移动页面开发时，如果使用`vw`、`wh`设置字体大小，在竖屏和横屏状态下显示的字体大小是不一样的。
> 这里就可以用到`vmin`和`vmax`使得文字大小在横竖屏下保持一致。


- `vw`和`vh` 与`%`百分比的区别
    - `%`是相对于父元素的大小设定的比率，`vw`、`vh` 是视窗大小决定的。
    - `vw`、`vh`优势在于能够直接获取高度，而用`%`在没有设置`body`高度的情况下，无法正确获得可视区域的高度。

> 当元素没有内容时候，设置`height:100%`，该元素不会被撑开，此时高度为`0`，但是设置`height:100vh`，该元素会被撑开屏幕高度一致。



**`calc()`动态计算长度值**

* [https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc](https://developer.mozilla.org/zh-CN/docs/Web/CSS/calc)

- 使用`+`、`-`、`*` 和 `/`四则运算
- 可以使用`%`、`px`、`em`、`rem`等单位
- 可以混合使用各种单位进行计算
- 表达式中有`+`和`-`时，其前后必须要有空格，如`widht: calc(12%+5em)`这种没有空格的写法是错误的
- 表达式中有`*`和`/`时，其前后可以没有空格，但建议留有空格



## Media Queries

> `Media Queries`能在不同的条件下使用不同的样式，使页面在不同在终端设备下达到不同的渲染效果。

+ [https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Viewport_meta_tag)
+ [https://viewportsizer.com/devices](https://viewportsizer.com/devices)
+ [https://experienceleague.adobe.com/docs/target/using/experiences/vec/mobile-viewports.html](https://experienceleague.adobe.com/docs/target/using/experiences/vec/mobile-viewports.html)


* [HTML页面适应移动端](https://www.jianshu.com/p/d95579d721a1)
* [到底什么是像素](https://segmentfault.com/a/1190000017526874)
* [使用meta标签设置viewport](https://segmentfault.com/a/1190000020218602)
* [visual viewport、layout viewport和ideal viewport介绍](https://segmentfault.com/a/1190000017542232)
* [viewport 深入理解](https://www.runoob.com/w3cnote/viewport-deep-understanding.html)

- [https://github.com/search?q=viewport](https://github.com/search?q=viewport)
- [https://github.com/pazguille/viewport](https://github.com/pazguille/viewport)

```html
<!-- 使用 Media Queries 必须先在页面中声明，移动设备上的`viewport`就是其屏幕上能用来显示我们的网页的那一块区域。
    该标签最大的作用是让当前viewport的宽度等于设备的宽度，即将viewport由默认变为ideal viewport，
    同时不允许用户缩放网页（缩放是相对于 ideal viewport来进行缩放的） -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- `width = device-width`：宽度等于当前设备的宽度
- `initial-scale`：初始的缩放比例（默认设置为1.0）
- `minimum-scale`：允许用户缩放到的最小比例（默认设置为1.0）
- `maximum-scale`：允许用户缩放到的最大比例（默认设置为1.0）
- `user-scalable`：用户是否可以手动缩放（默认设置为no，因为我们不希望用户放大缩小页面）

* [完整示例 MediaQueriesExample.html](/files/MediaQueriesExample.html)


> 使用`Media Queries`必须要使用`@media`开头，然后指定媒体类型（也可以称为设备类型），随后是指定媒体特性（也可以称之为设备特性）。


- 语法： `@media 设备类型 and|not|only （设备特性）{样式代码}`
    - `and`将多个媒体特性结合在一起。可以包含0到多个表达式，表达式又可以包含0到多个关键字，以及一种媒体类型。
    - `only`的作用是，让那些不支持`Media Query`但是能够读取`Media Type`的设备的浏览器将表达式中的样式隐藏起来。
        - 示例：`@media only screen and (min-width: 768px) {body {background: blue;}}`
    - 对于不支持`Media Query`但能够读取`Media Type`的设备，由于先读取到的是`only`而不是`screen`，将忽略该样式。
    - `not`是用来排除某种制定的媒体类型，也就是用来排除符合表达式的设备。换句话说，`not`关键词表示对后面的表达式执行取反操作。



### 设备类型

| 值          | 描述                                  |
|------------|-------------------------------------|
| all        | 用于所有设备                              |
| print      | 用于打印机和打印预览                          |
| screen     | 用于电脑屏幕，平板电脑，智能手机等。                  |
| speech     | 应用于屏幕阅读器等发声设备                       |


### 设备特性

- 媒体特性的书写方式和样式的书写方式非常相似，主要分为两个部分，而且这两个部分之间使用冒号分隔：
    - 第一个部分指的是媒体特性
    - 第二部分为媒体特性所指定的值

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

```css
/* 外联 */
@import url(style.css) screen and (min-width:1000px);
```

```html
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


**Bootstrap**


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




## 文本溢出处理

- `white-space: normal|pre|nowrap|pre-wrap|pre-line|inherit;` 设置如何处理元素内的空白
    - `normal` 默认。空白会被浏览器忽略
    - `pre` 空白会被浏览器保留。其行为方式类似`HTML`中的`pre`标签
    - `nowrap` 文本不会换行，文本会在在同一行上继续，直到遇到`br`标签为止
    - `pre-wrap` 保留空白符序列，但是正常地进行换行 
    - `pre-line` 合并空白符序列，但是保留换行符
    - `inherit` 规定应该从父元素继承`white-space`属性的值


- `overflow-wrap: normal|break-word;` 标明是否允许浏览器在单词内进行断句，防止当一个字符串太长而找不到它的自然断句点时产生溢出现象。 
    - `normal` 只在允许的断字点换行(浏览器保持默认处理) 
    - `break-word` 在长单词或URL地址内部进行换行 


- `word-break: normal|break-all|keep-all;` 标明怎么样进行单词内的断句。 
    - `normal` 使用浏览器默认的换行规则
    - `break-all` 允许在单词内换行
    - `keep-all` 只能在半角空格或连字符处换行

- `text-overflow: clip|ellipsis|string;` 规定当文本溢出包含元素时发生的事情。
    - `clip` 修剪文本
    - `ellipsis` 显示省略符号来代表被修剪的文本
    - `string` 使用给定的字符串来代表被修剪的文本



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


## Footer固定在页面底部

- `Sticky Footer` 并不是什么新的前端概念和技术，它指的就是一种网页效果： 
    - 如果页面内容不足够长时，页脚固定在浏览器窗口的底部；
    - 如果内容足够长时，页脚固定在页面的最底部。但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

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


* [fix-footer-page-bottom-flex.html](/files/fix-footer-page-bottom-flex.html)


## Footer固定在窗口底部

* [fix-footer-window-bottom-fixed.html](/files/fix-footer-window-bottom-fixed.html)
* [fix-footer-window-bottom-sticky.html](/files/fix-footer-window-bottom-sticky.html)



## 水平排列

> 字体居中需使元素与父级元素等宽

+ [CSS Flex弹性布局，多个div自动换行，源码](https://www.cnblogs.com/orzzt/p/9713037.html)

* [horizontal-arrangement-flex.html](/files/horizontal-arrangement-flex.html)
* [horizontal-arrangement-float-left.html](/files/horizontal-arrangement-float-left.html)
* [horizontal-arrangement-inline-block.html](/files/horizontal-arrangement-inline-block.html)



## 动画

* [动画](https://www.w3school.com.cn/css3/css3_animation.asp)
* [过渡](https://www.w3school.com.cn/css3/css3_3dtransform.asp)

**属性**

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


**圆形进度条**

* [circle-progress-bar](/files/circle-progress-bar.html)
* [round-progress-bar](/files/round-progress-bar.html)

>  首先：是定义三个动画，第一个是最外层，让他只显示一半，然后运行3s，同时右边运行3s,从0到180度。
  
> 接着：到了180度之后，释放外层的显示一半，让他自动显示其他。然后右边的停止动画并停在那里。
  
> 最后：左边的在原来的基础（跟右边一样运行3s，同样转过180度）再继续转动180度。



## 伪类和伪元素

* [伪类 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
* [伪元素 - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pseudo-elements)
* [伪元素组成的时间线](https://github.com/bajins/notes-vuepress/commits/master)


- 分割线

```css
.split-line:before {
    padding: 0 5px;
    color: #ccc;
    content: "|\00a0";
}
```



## 优先级权重恢复

> 权重决定了你css规则怎样被浏览器解析直到生效。css权重关系到你的css规则是怎样显示的

> 权重记忆口诀。从0开始，一个行内样式+1000，一个id+100，一个属性选择器/class或者伪类+10，一个元素名，或者伪元素+1

> 优先级从高到底显示：!important>行内样式表>id选择器>类选择器>标签选择器>继承

| 类型                     	| 示例                   	| 权重  	|
|--------------------------	|------------------------	|-------	|
| !important               	| 加在样式属性值后       	| 无穷 	|
| 内联样式                 	| style=""               	| 1000  	|
| ID选择器                 	| #content               	| 100   	|
| 类、伪类和属性选择器     	| .page、content、:hover 	| 10    	|
| 标签选择器和伪元素选择器 	| div、p、:before        	| 1     	|
| 通用选择器               	| *                      	| 0     	|
| 子选择器                 	| >                      	| 0     	|
| 相邻选择器               	| +                      	| 0     	|
| 同胞选择器               	| -                      	| 0     	|

* [css的优先级 和 权重](https://www.cnblogs.com/cnblogs-jcy/p/8574177.html)

- [inherit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit) 该值使得属性能够继承祖先设置
- [initial](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial) 属于CSS-wide关键字，属性初始值
- [unset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset) 擦除属性申明，如果属性是默认继承属性，等同于inherit，如果属性是非继承属性，等同于initial，unset属于CSS-wide关键字
- [revert](https://developer.mozilla.org/zh-CN/docs/Web/CSS/revert) 重置当前样式来源（style origin）的样式




## 输入框勾选样式

```css
input[type='checkbox'] {
    cursor: pointer;
    position: relative;
    width: 18px;
    height: 18px;
    font-size: 16px;
    visibility: hidden;
}
input[type='checkbox']::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #fff;
    border: 1px solid #b1b1b1;
    width: 18px;
    height: 18px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    /*border-radius: 50%;*/
    box-sizing: border-box;
}

input[type='checkbox']:checked::after {
    background-color: #4db7ff;
    border: none;
    content: '\2713';
    font-size: 14px;
    font-weight: bold;
}
```

```css
input[type='checkbox'] {
    cursor: pointer;
    position: relative;
    width: 13px;
    height: 13px;
    font-size: 13px;
    margin-right: 5px;
    visibility: hidden;
}
input[type='checkbox']::after {
    position: absolute;
    top: 2px;
    color: #fff;
    border: 1px solid #4db7ff;
    width: 13px;
    height: 13px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    box-sizing: border-box;
}
 
input[type='checkbox']:checked::after {
    color: #4db7ff;
    border: 1px solid #4db7ff;
    content: '\2713';
    font-size: 12px;
}
```

