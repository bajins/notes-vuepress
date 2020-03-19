# API


[[toc]]



## flag

* [https://github.com/hongyangAndroid/wanandroid](https://github.com/hongyangAndroid/wanandroid)
* [https://api.imjad.cn](https://api.imjad.cn)
* [https://github.com/Binaryify/NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)


**图片**

* [https://pixabay.com/zh](https://pixabay.com/zh)
* [https://visualhunt.com](https://visualhunt.com)
* [https://stocksnap.io](https://stocksnap.io)
* [https://kaboompics.com](https://kaboompics.com)
* [https://www.wallpaperup.com](https://www.wallpaperup.com)
* [https://www.splitshire.com](https://www.splitshire.com)
* [https://magdeleine.co](https://magdeleine.co)
* [http://cupcake.nilssonlee.se](http://cupcake.nilssonlee.se)
* [http://lorempixel.com/1920/1080](http://lorempixel.com/1920/1080)
* [https://www.lifeofpix.com/page/1](https://www.lifeofpix.com/page/1)
* [https://isorepublic.com/photos](https://isorepublic.com/photos)
* [https://pxhere.com](https://pxhere.com)
* [https://www.hippopx.com](https://www.hippopx.com)
* [https://foter.com](https://foter.com)
* [https://negativespace.co](https://negativespace.co)
* [http://photopin.com](http://photopin.com)
* [https://gratisography.com](https://gratisography.com)
* [https://shotstash.com](https://shotstash.com)
* [https://picography.co](https://picography.co)



## 天气

> http://tianqi.2345.com/plugin

> http://m.weather.com.cn/m/pn11/weather.htm

> http://i.tianqi.com/index.php?c=code&id=55

> http://cdn.weather.hao.360.cn/sed_api_weather_info.php?app=360chrome&code=【地区编码】&_jsonp=【jsonp回调函数】



## bing

> http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1

> n，必要参数。这是输出信息的数量。比如n=1，即为1条，以此类推，至多输出8条。

> format，返回结果的格式，不存在或者等于xml时，输出为xml格式，等于js时，输出json格式

> idx，不存在或者等于0时，输出当天的图片，-1为已经预备用于明天显示的信息，1则为昨天的图片，以此类推，idx最多获取到前16天的图片信息


## 360wallpaper

* [https://www.yuluoge.com/api/index.php](https://www.yuluoge.com/api/index.php)
* [https://api.zwho.me/image/360](https://api.zwho.me/image/360)
* [https://github.com/mengkunsoft/wallpaper](https://github.com/mengkunsoft/wallpaper)



- 获取最近更新的壁纸

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=【偏移量，从0开始】&count=【加载张数】
>
> http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=【偏移量，从0开始】&count=【加载张数】


- 获取壁纸类别


> http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories
>
> http://cdn.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories

> `a`参数有：`getAllCategories`和`getAllCategoriesV2`
>
> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2
>
> http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAllCategoriesV2



- 获取某类别下的壁纸


> http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=【分类ID】&start=【偏移量，从0开始】&count=【加载张数】
>
> http://cdn.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=【分类ID】&start=【偏移量，从0开始】&count=【加载张数】

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=【分类ID】&start=【偏移量，从0开始】&count=【每次加载的数量】
>
> http://cdn.apc.360.cn/index.php?c=WallPaper&a=getAppsByCategory&cid=【分类ID】&start=【偏移量，从0开始】&count=【每次加载的数量】



- 按关键字搜索壁纸

> http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=search&start=【偏移量，从0开始】&count=【每次加载的数量】&kw=【关键字】

> http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=【偏移量，从0开始】&count=【每次加载的数量】&kw=【关键字】


- 获取今日热门搜索

> http://openbox.mobilem.360.cn/html/api/wallpaperhot.html



## unsplash

* [https://unsplash.com/documentation#photos](https://unsplash.com/documentation#photos)

> 参数per_page为获取数量，最大值30

- 获取最新

> https://unsplash.com/napi/photos?page=页数&per_page=30&order_by=latest

- 图片下载

> https://unsplash.com/photos/图片ID/download

- 获取集合（也就是标签）下的图片

> https://unsplash.com/napi/search/photos?query=night&xp=search-cervantes-v1%3Aexperiment&per_page=30&page=页数

- 所有壁纸

> [https://unsplash.com/napi/collections/1065976?page=1&per_page=30&order_by=latest](https://unsplash.com/napi/collections/1065976?page=1&per_page=30&order_by=latest)

- 桌面壁纸

> [https://unsplash.com/napi/collections/1065396/photos?page=1&per_page=30&order_by=latest](https://unsplash.com/napi/collections/1065396/photos?page=1&per_page=30&order_by=latest)



## wallhaven

**搜索**

> https://wallhaven.cc/search?q=id%3A标签的ID&page=页数

- 例子

> 搜索女性，第一页：[https://wallhaven.cc/search?q=id%3A222&page=1](https://wallhaven.cc/search?q=id%3A222&page=1)

> 搜索亚洲，第一页：[https://wallhaven.cc/search?q=id%3A449&page=1](https://wallhaven.cc/search?q=id%3A449&page=1)


**最新**

> https://wallhaven.cc/latest?page=2


**标签**

> https://wallhaven.cc/tags


**保存**

> https://w.wallhaven.cc/full/图片编号前两位/wallhaven-图片编号前两位.后缀


**图片详情**

> https://wallhaven.cc/w/图片编号

> 标签在`a class="tagname" rel="tag"`页面元素的文本内容



## pexels

* [https://www.pexels.com/zh-cn](https://www.pexels.com/zh-cn)
* [https://www.pexels.com/api](https://www.pexels.com/api)


**获取最新**

- html

> https://www.pexels.com/zh-cn/new-photos/?page=1

> https://www.pexels.com/zh-cn/new-photos/?format=html&page=1

- js

> https://www.pexels.com/zh-cn/new-photos/?format=js&page=1

> `seed`参数值需要从js中获取
>
> https://www.pexels.com/zh-cn/new-photos/?format=js&seed=2019-10-16+06:03:11+UTC&page=1&type=


**保存**

> 图片编号以`10000`为起始位置

> https://www.pexels.com/photo/图片编号/download/
>
> 此链接也是返回下面的链接进行下载文件，请看`Response Headers`中的`location`参数

> https://images.pexels.com/photos/图片编号/pexels-photo-图片编号.jpeg?dl=图片编号.jpg
>> 不带参数就是预览
>>
>> 参数`dl`的值为文件名

**图片详细信息**

> https://www.pexels.com/zh-cn/photo/图片编号

> 标签在`meta name="keywords"`页面元素的`content`属性值
> 
> 或者为`a class="rd__tag" data-track-action="medium-related-tags" data-track-label="tag"`页面元素的文本内容



## alphacoders

**搜索**

> https://wall.alphacoders.com/by_sub_category.php?id=169040&name=名称&filter=分辨率过滤&page=页数

- 例子

> 搜索亚洲，4K高清，第一页：[https://wall.alphacoders.com/by_sub_category.php?id=169040&name=Asian&filter=4K+Ultra+HD&page=1](https://wall.alphacoders.com/by_sub_category.php?id=169040&name=Asian&filter=4K+Ultra+HD&page=1)

> 搜索女性，4K高清，第一页：[https://wall.alphacoders.com/by_category.php?id=33&name=Women&filter=4K+Ultra+HD&page=1](https://wall.alphacoders.com/by_category.php?id=33&name=Women&filter=4K+Ultra+HD&page=1)


**精选**

> https://wall.alphacoders.com/featured.php?page=1



**保存**

> https://initiate.alphacoders.com/download/wallpaper/图片编号/images2/jpg

- 例子

[https://initiate.alphacoders.com/download/wallpaper/947194/images2/jpg](https://initiate.alphacoders.com/download/wallpaper/947194/images2/jpg)




## icons8

* [https://photos.icons8.cn](https://photos.icons8.cn)

> 获取图片下载链接 https://photos.icons8.com/api/frontend/v1/images/图片id/download-url?width=1913&height=3400





## 二次元图片

**img.xjh.me**

- 获取随机图片

https://img.xjh.me/random_img.php?return=302

- 带参数API

https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302

- 适用于手机端壁纸

https://img.xjh.me/random_img.php?type=bg&ctype=nature&return=302&device=mobile



**api.ixiaowai.cn**

- 二次元动漫图片

https://api.ixiaowai.cn/api/api.php

- menhear酱

https://api.ixiaowai.cn/mcapi/mcapi.php

- 风景

https://api.ixiaowai.cn/mcapi/mcapi.php

