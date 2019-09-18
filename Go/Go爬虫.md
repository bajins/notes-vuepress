# Go爬虫

* [`chromedp`](#chromedp)
  * [`chromedp`能做什么](#chromedp能做什么)
  * [xpath和css选择器](#xpath和css选择器)
  * [`chromedriver`](#chromedriver)








## `chromedp`

> `chromedp`同Python的`selenium`,它是使用`Chrome Debugging Protocol`(简称cdp) 并且没有外部依赖 (如`Selenium`, `PhantomJS`等)

* [https://github.com/chromedp/chromedp](https://github.com/chromedp/chromedp)

* [golang headless browser包chromedp初探](https://zhangguanzhang.github.io/2019/07/14/chromedp)

* [go语言chromedp使用教程](https://mojotv.cn/2018/12/26/chromedp-tutorial-for-golang)


### `chromedp`能做什么

- 反爬虫js，例如有的网页后台js自动发送心跳包，浏览器里会自动运行，不需要我们自动处理
- 针对于前端页面的自动化测试
- 解决类似VueJS和SPA之类的渲染
- 解决网页的懒加载
- 网页截图和pdf导出，而不需要额外的去学习其他的库实现
- seo训练和刷点击量
- 执行javascript 代码
- 设置dom的标签属性

### xpath和css选择器

> `Chrome`打开网页`F12`后下面的调试工具出来后点击`Elements`左边的那个框框里的鼠标箭头（或者按`Ctrl + Shift + C`），
> 然后网页会变成蓝色，到网页点击自己要选择的区域，接下来就会自动跳到`Elements`对应的位置，
> 在`HTML`的标签上点击鼠标右键->`Copy`->`COpy selector`或者`xpath`，就能复制选择器了。



### `chromedriver`

> `chromedriver`与`chrome`版本对应关系一定要正确

* [http://chromedriver.storage.googleapis.com/index.html](http://chromedriver.storage.googleapis.com/index.html)

* [http://npm.taobao.org/mirrors/chromedriver](http://npm.taobao.org/mirrors/chromedriver)

* [headless-chrome官方文档](https://developers.google.com/web/updates/2017/04/headless-chrome)

| 参数                       	| 说明                                                                                                                 	|
|----------------------------	|----------------------------------------------------------------------------------------------------------------------	|
| --no-first-run             	| 第一次不运行                                                                                                         	|
| ---default-browser-check   	| 不检查默认浏览器                                                                                                     	|
| --headless                 	| 不开启图像界面                                                                                                       	|
| --disable-gpu              	| 关闭gpu,服务器一般没有显卡                                                                                           	|
| remote-debugging-port      	| chrome-debug工具的端口(golang chromepd 默认端口是9222,建议不要修改)                                                  	|
| --no-sandbox               	| 不开启沙盒模式可以减少对服务器的资源消耗,但是服务器安全性降低,配和参数 --remote-debugging-address=127.0.0.1 一起使用 	|
| --disable-plugins          	| 关闭chrome插件                                                                                                       	|
| --remote-debugging-address 	| 远程调试地址 0.0.0.0 可以外网调用但是安全性低,建议使用默认值 127.0.0.1                                               	|
| --window-size              	| 窗口尺寸                                                                                                             	|



| 参数                         	| 说明                                                                   	|
|------------------------------	|------------------------------------------------------------------------	|
| --incognito                  	| 进入隐身模式——保证浏览网页时，不留下任何痕迹。                         	|
| --user-data-dir=“绝对路径”   	| 指定UserData路径，默认路径位于系统盘，通过该命令，可以重定向为其它分区 	|
| --disk-cache-dir=”绝对路径“  	| 指定Cache路径                                                          	|
| --disk-cache-size=           	| 指定Cache大小，单位为字节                                              	|
| –first run                   	| 强行指定浏览器会第一次运行                                             	|
| --disable-javascript         	| 禁用Javascript                                                         	|
| --omnibox-popup-count="数字" 	| 指出多功能地址栏的弹出菜单数量                                         	|
| --user-agent="abcd"          	| 强行执行http请求头中的UserAgent为abcd                                  	|
| --disable-plugins            	| 禁止加载所有插件                                                       	|
| --disable-java               	| 禁用java                                                               	|
| --start-maximized            	| 浏览器启动后，窗口默认为最大化                                         	|
| --no-sandbox                 	| 关闭沙盒                                                               	|
| --single-process             	| 浏览器只能以单进程运行，通常用于调试，定位bug                          	|
| --process-per-tab            	| 一个标签一个进程                                                       	|
| --process-per-site           	| 一个站点，一个进程                                                     	|
| --in-process-plugins         	| 插件不以独立的进程运行，插件的异常崩溃，可能会导致整个页面挂掉         	|
| --disable-popup-blocking     	| 关闭弹窗拦截                                                           	|
| --proxy-pac-url              	| 指定使用PAC代理时，所需要的脚本url地址                                 	|







