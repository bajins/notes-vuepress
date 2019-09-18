# Go爬虫

* [`chromedp`](#chromedp)
  * [`chromedp`能做什么](#chromedp能做什么)
  * [xpath和css选择器](#xpath和css选择器)
  * [`chromedriver`](#chromedriver)








## `chromedp`

### `chromedp`能做什么

- 反爬虫js，例如有的网页后台js自动发送心跳包，浏览器里会自动运行，不需要我们自动处理
- 针对于前端页面的自动化测试
- 解决类似VueJS和SPA之类的渲染
- 解决网页的懒加载
- 网页截图和pdf导出，而不需要额外的去学习其他的库实现
- seo训练和刷点击量
- 执行javascript 代码
- 设置dom的标签属性

> `chromedp`同Python的`selenium`,它是使用`Chrome Debugging Protocol`(简称cdp) 并且没有外部依赖 (如`Selenium`, `PhantomJS`等)

* [https://github.com/chromedp/chromedp](https://github.com/chromedp/chromedp)

* [golang headless browser包chromedp初探](https://zhangguanzhang.github.io/2019/07/14/chromedp)

* [go语言chromedp使用教程](https://mojotv.cn/2018/12/26/chromedp-tutorial-for-golang)



- [xpath和css选择器](/Python/Python爬虫.md#xpath和css选择器)

- [`chromedriver`](/Python/Python爬虫.md#chromedriver)
