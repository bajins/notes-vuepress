# API



* [360wallpaper](#360wallpaper)
  * [获取最近更新的壁纸](#获取最近更新的壁纸)
  * [获取壁纸类别](#获取壁纸类别)
  * [获取某类别下的壁纸](#获取某类别下的壁纸)
  * [按关键字搜索壁纸](#按关键字搜索壁纸)
  * [获取今日热门搜索](#获取今日热门搜索)
* [unsplash](#unsplash)
* [wallhaven](#wallhaven)
* [pexels](#pexels)
* [pixabay](#pixabay)
* [visualhunt](#visualhunt)
* [stocksnap.io](#stocksnapio)
* [kaboompics](#kaboompics)
* [wallpaperup](#wallpaperup)
* [alphacoders](#alphacoders)
* [splitshire](#splitshire)
* [magdeleine.co](#magdeleineco)
* [cupcake.nilssonlee.se](#cupcakenilssonleese)










## 360wallpaper


### 获取最近更新的壁纸

```
http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=getAppsByOrder&order=create_time&start=【偏移量，从0开始】&count=【加载张数】&from=360chrome  
```


### 获取壁纸类别

```html
<h2 id="category">获取壁纸类别</h2>
```

> url：http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories

> url 示例：[`http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories`](http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAllCategories)


- **json示例**

```json
	{
    "errno": "0",
    "errmsg": "正常",
    "consume": "10",
    "total": "16",
    "data": [
        {
            "id": "36",
            "name": "4K专区",
            "totalcnt": "2704",
            "create_time": "2015-12-08 13:50:44",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "6",
            "name": "美女模特",
            "totalcnt": "3905",
            "create_time": "2011-10-29 17:49:27",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "30",
            "name": "爱情美图",
            "totalcnt": "2305",
            "create_time": "2012-11-23 10:49:25",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "9",
            "name": "风景大片",
            "totalcnt": "8185",
            "create_time": "2011-11-02 16:33:34",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "15",
            "name": "小清新",
            "totalcnt": "6922",
            "create_time": "2011-12-15 18:47:03",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "26",
            "name": "动漫卡通",
            "totalcnt": "6818",
            "create_time": "2012-07-27 17:17:42",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "11",
            "name": "明星风尚",
            "totalcnt": "4316",
            "create_time": "2011-11-02 17:38:58",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "14",
            "name": "萌宠动物",
            "totalcnt": "2722",
            "create_time": "2011-12-15 18:23:27",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "5",
            "name": "游戏壁纸",
            "totalcnt": "2041",
            "create_time": "2011-10-29 17:49:12",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "12",
            "name": "汽车天下",
            "totalcnt": "1757",
            "create_time": "2011-12-13 18:59:40",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "10",
            "name": "炫酷时尚",
            "totalcnt": "4828",
            "create_time": "2011-11-02 17:10:53",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "22",
            "name": "军事天地",
            "totalcnt": "665",
            "create_time": "2012-05-29 15:10:04",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "16",
            "name": "劲爆体育",
            "totalcnt": "1174",
            "create_time": "2011-12-30 11:37:49",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "32",
            "name": "纹理",
            "totalcnt": "333",
            "create_time": "2013-03-18 13:58:21",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "35",
            "name": "文字控",
            "totalcnt": "926",
            "create_time": "2014-09-25 18:35:57",
            "displaytype": "",
            "tempdata": ""
        },
        {
            "id": "1",
            "name": "限时壁纸",
            "totalcnt": "204",
            "create_time": "2014-09-25 18:20:40",
            "displaytype": "",
            "tempdata": ""
        }
    ]
}
```

- **解析**

- `total`：返回数据数量
- `data`：返回的数据
    - `name`：类别名
    - `id`：
    - `totalcnt`：该类别壁纸数量

### 获取某类别下的壁纸

```html
<h2 id="category-images">获取某类别下的壁纸</h2>
```

> url：http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory

- **其他拼接参数**

- `cid`：类别id,类别已知：

```
1：每日精选

5：游戏

6：美女

9：风景

10：视觉创意

11：明星影视

12：汽车

14：萌宠动物

15：小清新

16：体育

22：军事

26：动漫卡通

30：情感

35：文字

```

- `start`：跳过的记录数
- `count`：返回的数量

> url 示例：[`http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=9&start=0&count=99`](http://wallpaper.apc.360.cn/index.php?c=WallPaperAndroid&a=getAppsByCategory&cid=9&start=0&count=99)

- **json示例**

```json
	{
    "errno": "0",
    "errmsg": "正常",
    "consume": "6",
    "total": "8185",
    "data": [
        {
            "pid": "319229",
            "cid": "9",
            "dl_cnt": "0",
            "c_t": "2018-05-02 10:10:54",
            "imgcut": "0",
            "url": "http://p16.qhimg.com/t01d7effbff8a01b127.jpg",
            "tempdata": "",
            "fav_total": "9319"
        },
        {
            "pid": "319146",
            "cid": "9",
            "dl_cnt": "0",
            "c_t": "2018-04-27 10:06:11",
            "imgcut": "0",
            "url": "http://p17.qhimg.com/t018bb2253d2df00838.jpg",
            "tempdata": "",
            "fav_total": "6425"
        },
        {
            "pid": "319145",
            "cid": "9",
            "dl_cnt": "0",
            "c_t": "2018-04-27 10:05:44",
            "imgcut": "0",
            "url": "http://p19.qhimg.com/t018d05d2327c2f4bec.jpg",
            "tempdata": "",
            "fav_total": "7093"
        },
        {
            "pid": "319144",
            "cid": "9",
            "dl_cnt": "0",
            "c_t": "2018-04-27 10:05:01",
            "imgcut": "0",
            "url": "http://p19.qhimg.com/t012864214a3c106fbc.jpg",
            "tempdata": "",
            "fav_total": "5866"
        },
        {
            "pid": "319143",
            "cid": "9",
            "dl_cnt": "0",
            "c_t": "2018-04-27 10:04:37",
            "imgcut": "0",
            "url": "http://p17.qhimg.com/t01d7f7956cc1be4821.jpg",
            "tempdata": "",
            "fav_total": "5997"
        }
    ]
}
```


- **解析**

- `total`：返回数据数量
- `data`：返回的数据
    - `pid`：
    - `cid`：类别ID
    - `url`：壁纸地址
    - `fav_total`：收藏数


### 按关键字搜索壁纸

```html
<h2 id="keywords">按关键字搜索壁纸</h2>
```

> url：http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search

- **其他拼接参数**

- `kw`：关键字
- `start`：跳过的记录数
- `count`：返回的数量

> url 示例：[`http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=%E6%AF%95%E4%B8%9A&start=0&count=99`](http://wallpaper.apc.360.cn/index.php?c=WallPaper&a=search&start=0&count=99&kw=%E6%AF%95%E4%B8%9A&start=0&count=99)

- **json示例**

```json
	{
    "errno": "0",
    "errmsg": "success",
    "consume": "0",
    "total": "97",
    "data": [
        {
            "id": "305990",
            "class_id": "35",
            "resolution": "1920x1200",
            "url_mobile": "http://p18.qhimg.com/t017489cbb76a02bf66.jpg",
            "url": "http://p18.qhimg.com/bdr/__85/t017489cbb76a02bf66.jpg",
            "url_thumb": "http://p18.qhimg.com/t017489cbb76a02bf66.jpg",
            "url_mid": "http://p18.qhimg.com/t017489cbb76a02bf66.jpg",
            "download_times": "0",
            "imgcut": "0",
            "tag": "_全部_ _category_文字_  _category_毕业季_ _category_伤感_ _category_文字控_",
            "create_time": "2017-06-16 13:30:06",
            "update_time": "2017-06-16 13:33:07",
            "utag": "文字 毕业季 伤感",
            "tempdata": "",
            "rdata": [],
            "img_1600_900": "http://p18.qhimg.com/bdm/1600_900_85/t017489cbb76a02bf66.jpg",
            "img_1440_900": "http://p18.qhimg.com/bdm/1440_900_85/t017489cbb76a02bf66.jpg",
            "img_1366_768": "http://p18.qhimg.com/bdm/1366_768_85/t017489cbb76a02bf66.jpg",
            "img_1280_800": "http://p18.qhimg.com/bdm/1280_800_85/t017489cbb76a02bf66.jpg",
            "img_1280_1024": "http://p18.qhimg.com/bdm/1280_1024_85/t017489cbb76a02bf66.jpg",
            "img_1024_768": "http://p18.qhimg.com/bdm/1024_768_85/t017489cbb76a02bf66.jpg"
        },
        {
            "id": "306106",
            "class_id": "35",
            "resolution": "1920x1200",
            "url_mobile": "http://p16.qhimg.com/t01b31a7859ecc52066.jpg",
            "url": "http://p16.qhimg.com/bdr/__85/t01b31a7859ecc52066.jpg",
            "url_thumb": "http://p16.qhimg.com/t01b31a7859ecc52066.jpg",
            "url_mid": "http://p16.qhimg.com/t01b31a7859ecc52066.jpg",
            "download_times": "0",
            "imgcut": "0",
            "tag": "_全部_ _category_文字_  _category_毕业季_ _category_伤感_ _category_文字控_",
            "create_time": "2017-06-20 13:12:50",
            "update_time": "2017-06-20 13:12:50",
            "utag": "文字 毕业季 伤感",
            "tempdata": "",
            "rdata": [],
            "img_1600_900": "http://p16.qhimg.com/bdm/1600_900_85/t01b31a7859ecc52066.jpg",
            "img_1440_900": "http://p16.qhimg.com/bdm/1440_900_85/t01b31a7859ecc52066.jpg",
            "img_1366_768": "http://p16.qhimg.com/bdm/1366_768_85/t01b31a7859ecc52066.jpg",
            "img_1280_800": "http://p16.qhimg.com/bdm/1280_800_85/t01b31a7859ecc52066.jpg",
            "img_1280_1024": "http://p16.qhimg.com/bdm/1280_1024_85/t01b31a7859ecc52066.jpg",
            "img_1024_768": "http://p16.qhimg.com/bdm/1024_768_85/t01b31a7859ecc52066.jpg"
        }
    ]
}
```


- __解析__

- `total`：返回数据数量
- `data`：返回的数据
    - `id`：壁纸id
    - `tag`：所属的壁纸类别名称
    - `utag`：壁纸tags
    - `fav_total`：收藏数

### 获取今日热门搜索

```html
<h2 id="search-hot">获取今日热门搜索</h2>
```

> url：http://openbox.mobilem.360.cn/html/api/wallpaperhot.html


- **json示例**

```json
	{
    "error": 0,
    "end_state": 1,
    "total": 11,
    "data": [
        "爱情箴言",
        "一个人",
        "范冰冰",
        "温馨",
        "阿狸",
        "恶搞",
        "lomo",
        "清纯",
        "瓶邪",
        "正能量",
        "毕业季",
        "葫芦娃",
        "手写",
        "世界杯",
        "TFBOYS",
        "我是歌手",
        "李易峰",
        "早安"
    ]
}
```

- **解析**

- `total`：返回数据数量
- `data`：返回的数据


## unsplash
   
- API `https://unsplash.com/documentation#photos`

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

- **搜索**

> https://wallhaven.cc/search?q=id%3A标签的ID&page=页数

- 例子

> 搜索女性，第一页：[https://wallhaven.cc/search?q=id%3A222&page=1](https://wallhaven.cc/search?q=id%3A222&page=1)

> 搜索亚洲，第一页：[https://wallhaven.cc/search?q=id%3A449&page=1](https://wallhaven.cc/search?q=id%3A449&page=1)


- **最新**

> https://wallhaven.cc/latest?page=2


- **标签**

> https://wallhaven.cc/tags


- **保存**

> https://w.wallhaven.cc/full/图片编号前两位/wallhaven-图片编号前两位.后缀


- **图片详情**

> https://wallhaven.cc/w/图片编号

> 标签在`a class="tagname" rel="tag"`页面元素的文本内容





## pexels

* [https://www.pexels.com/zh-cn](https://www.pexels.com/zh-cn)

- **获取最新**

- html

> https://www.pexels.com/zh-cn/new-photos/?page=1

> https://www.pexels.com/zh-cn/new-photos/?format=html&page=1

- js

> https://www.pexels.com/zh-cn/new-photos/?format=js&page=1

> `seed`参数值需要从js中获取
>
> https://www.pexels.com/zh-cn/new-photos/?format=js&seed=2019-10-16+06:03:11+UTC&page=1&type=


- **保存**

> 图片编号以`10000`为起始位置

> https://www.pexels.com/photo/图片编号/download/
>
> 此链接也是返回下面的链接进行下载文件，请看`Response Headers`中的`location`参数

> https://images.pexels.com/photos/图片编号/pexels-photo-图片编号.jpeg?dl=图片编号.jpg
>> 不带参数就是预览
>>
>> 参数`dl`的值为文件名

- **图片详细信息**

> https://www.pexels.com/zh-cn/photo/图片编号

> 标签在`meta name="keywords"`页面元素的`content`属性值
> 
> 或者为`a class="rd__tag" data-track-action="medium-related-tags" data-track-label="tag"`页面元素的文本内容



## pixabay

* [https://pixabay.com/zh](https://pixabay.com/zh)






## visualhunt

* [https://visualhunt.com](https://visualhunt.com)





## stocksnap.io

* [https://stocksnap.io](https://stocksnap.io)





## kaboompics

* [https://kaboompics.com](https://kaboompics.com)





## wallpaperup

* [https://www.wallpaperup.com](https://www.wallpaperup.com)







## alphacoders

- **搜索**

> https://wall.alphacoders.com/by_sub_category.php?id=169040&name=名称&filter=分辨率过滤&page=页数

- 例子

> 搜索亚洲，4K高清，第一页：[https://wall.alphacoders.com/by_sub_category.php?id=169040&name=Asian&filter=4K+Ultra+HD&page=1](https://wall.alphacoders.com/by_sub_category.php?id=169040&name=Asian&filter=4K+Ultra+HD&page=1)

> 搜索女性，4K高清，第一页：[https://wall.alphacoders.com/by_category.php?id=33&name=Women&filter=4K+Ultra+HD&page=1](https://wall.alphacoders.com/by_category.php?id=33&name=Women&filter=4K+Ultra+HD&page=1)


- **精选**

> https://wall.alphacoders.com/featured.php?page=1



- **保存**

> https://initiate.alphacoders.com/download/wallpaper/图片编号/images2/jpg

- 例子

[https://initiate.alphacoders.com/download/wallpaper/947194/images2/jpg](https://initiate.alphacoders.com/download/wallpaper/947194/images2/jpg)






## splitshire

* [https://www.splitshire.com](https://www.splitshire.com)




## magdeleine.co

* [https://magdeleine.co](https://magdeleine.co)




## cupcake.nilssonlee.se

* [http://cupcake.nilssonlee.se](http://cupcake.nilssonlee.se)



