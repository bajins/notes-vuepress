# HTML


[[toc]]



## Flag

> 定义网页的内容

+ 标准规范 [https://github.com/whatwg/html](https://github.com/whatwg/html)
+ [https://github.com/whatwg/dom](https://github.com/whatwg/dom)
+ HTML全局属性 [https://www.w3.org/wiki/HTML/Attributes/_Global](https://www.w3.org/wiki/HTML/Attributes/_Global)
+ [https://developer.mozilla.org/zh-CN/docs/Web/HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
+ [https://github.com/thedaviddias/Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist)

- [https://github.com/bradtraversy/50projects50days](https://github.com/bradtraversy/50projects50days)
- 响应式 [https://github.com/bedimcode](https://github.com/bedimcode)

> Window对象 -> Parent对象 -> Frame对象 -> Document对象 -> Form对象


**template代码片段**

* [https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)
* [https://www.html5rocks.com/zh/tutorials/webcomponents/template](https://www.html5rocks.com/zh/tutorials/webcomponents/template)
    * 文档片段 [https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
* [https://caniuse.com/?search=template](https://caniuse.com/?search=template)
* [关于template标签用法总结(含vue中的用法总结)](https://blog.csdn.net/u010510187/article/details/100356624)

- `<script>` 和 `<template>`（推荐） 标签内的内容页面不会渲染，浏览器会默认添加`display: none;`，也不能使用选择器定位子元素
- `<script type=text/html >` 或 `<script type="text/template" >` 定义一个被JS调用的代码，内容不会被执行
- `<div style="display: none">` 与复用DOM结构后的id等重复：可以把DOM结构缓存到JS变量或标签属性内容，然后移除这个标签



**select框默认选项为空白**

```html
<option selected="selected" disabled="disabled"  style='display: none' value=''></option>
```


## Meta标签

```html
<!-- 声明文档使用的字符编码 -->
<meta charset='utf-8'>
<!-- 优先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<!-- 页面描述 -->
<meta name="description" content="不超过150个字符"/>
<!-- 页面关键词 -->
<meta name="keywords" content=""/>
<!-- 网页作者 -->
<meta name="author" content="name, email@gmail.com"/>
<!-- 搜索引擎抓取 -->
<meta name="robots" content="index,follow"/>
<!-- 为移动设备添加 viewport -->
<meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
<!-- `width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边 http://bigc.at/ios-webapp-viewport-meta.orz -->

<!-- iOS 设备 begin -->
<meta name="apple-mobile-web-app-title" content="标题">
<!-- 添加到主屏后的标题（iOS 6 新增） -->
<meta name="apple-mobile-web-app-capable" content="yes"/>
<!-- 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏 -->

<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">
<!-- 添加智能 App 广告条 Smart App Banner（iOS 6+ Safari） -->
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
<!-- 设置苹果工具栏颜色 -->
<meta name="format-detection" content="telphone=no, email=no"/>
<!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit">
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 不让百度转码 -->
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">
<!-- iOS 图标 begin -->
<link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png"/>
<!-- iPhone 和 iTouch，默认 57x57 像素，必须有 -->
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="/apple-touch-icon-114x114-precomposed.png"/>
<!-- Retina iPhone 和 Retina iTouch，114x114 像素，可以没有，但推荐有 -->
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="/apple-touch-icon-144x144-precomposed.png"/>
<!-- Retina iPad，144x144 像素，可以没有，但推荐有 -->
<!-- iOS 图标 end -->

<!-- iOS 启动画面 begin -->
<link rel="apple-touch-startup-image" sizes="768x1004" href="/splash-screen-768x1004.png"/>
<!-- iPad 竖屏 768 x 1004（标准分辨率） -->
<link rel="apple-touch-startup-image" sizes="1536x2008" href="/splash-screen-1536x2008.png"/>
<!-- iPad 竖屏 1536x2008（Retina） -->
<link rel="apple-touch-startup-image" sizes="1024x748" href="/Default-Portrait-1024x748.png"/>
<!-- iPad 横屏 1024x748（标准分辨率） -->
<link rel="apple-touch-startup-image" sizes="2048x1496" href="/splash-screen-2048x1496.png"/>
<!-- iPad 横屏 2048x1496（Retina） -->

<link rel="apple-touch-startup-image" href="/splash-screen-320x480.png"/>
<!-- iPhone/iPod Touch 竖屏 320x480 (标准分辨率) -->
<link rel="apple-touch-startup-image" sizes="640x960" href="/splash-screen-640x960.png"/>
<!-- iPhone/iPod Touch 竖屏 640x960 (Retina) -->
<link rel="apple-touch-startup-image" sizes="640x1136" href="/splash-screen-640x1136.png"/>
<!-- iPhone 5/iPod Touch 5 竖屏 640x1136 (Retina) -->
<!-- iOS 启动画面 end -->

<!-- iOS 设备 end -->
<meta name="msapplication-TileColor" content="#000"/>
<!-- Windows 8 磁贴颜色 -->
<meta name="msapplication-TileImage" content="icon.png"/>
<!-- Windows 8 磁贴图标 -->

<link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml"/>
<!-- 添加 RSS 订阅 -->
<link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
<!-- 添加 favicon icon -->

<!-- sns 社交标签 begin -->
<!-- 参考微博API -->
<meta property="og:type" content="类型" />
<meta property="og:url" content="URL地址" />
<meta property="og:title" content="标题" />
<meta property="og:image" content="图片" />
<meta property="og:description" content="描述" />
<!-- sns 社交标签 end -->
```


## 页面刷新汇总

- history.go(0) // 刷新当前页
- history.go(1) // 返回上一页
- location.reload()
- location=location
- location.assign(location)
- document.execCommand('Refresh')
- window.navigate(location)
- location.replace(location)
- document.URL=location.href


**刷新页面内嵌框架**

- window.parent.frames[1].location.reload();
- window.parent.frames.bottom.location.reload();
- window.parent.frames["bottom"].location.reload();
- window.parent.frames.item(1).location.reload();
- window.parent.frames.item('bottom').location.reload();
- window.parent.bottom.location.reload();
- window.parent['bottom'].location.reload();

**页面自动刷新**

```html
<meta http-equiv="refresh" content="20">
<!-- 其中20指每隔20秒刷新一次页面 -->
```

**页面开窗口或关闭时自动刷新**

```html
<body onload="opener.location.reload()"> 开窗时刷新 
<body onUnload="opener.location.reload()"> 关闭时刷新 
<script language="javascript"> 
window.opener.document.location.reload() 
</script>
```

**参考：**

* [JS中实现页面跳转和刷新方法总结](https://juejin.cn/post/6844903925741682696)
* [JS刷新当前页面的几种方法总结](http://www.iqianduan.net/blog/refresh-browser-method)

