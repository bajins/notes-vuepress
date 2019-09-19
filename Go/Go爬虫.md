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




| 函数或变量                                                                                                 	| 说明                                                     	|
|------------------------------------------------------------------------------------------------------------	|----------------------------------------------------------	|
| (f ActionFunc) Do(ctx context.Context) error                                                               	|                                                          	|
| (s *Selector) Do(ctx context.Context) error                                                                	|                                                          	|
| (t Tasks) Do(ctx context.Context) error                                                                    	|                                                          	|
| After(f func(context.Context, ...*cdp.Node) error) QueryOption                                             	|                                                          	|
| AtLeast(n int) QueryOption                                                                                 	|                                                          	|
| Attributes(sel interface{}, attributes *map[string]string, opts ...QueryOption) QueryAction                	|                                                          	|
| AttributesAll(sel interface{}, attributes *[]map[string]string, opts ...QueryOption) QueryAction           	|                                                          	|
| AttributeValue(sel interface{}, name string, value *string, ok *bool, opts ...QueryOption) QueryAction     	|                                                          	|
| Blur(sel interface{}, opts ...QueryOption) QueryAction                                                     	|                                                          	|
| ByFunc(f func(context.Context, *cdp.Node) ([]cdp.NodeID, error)) QueryOption                               	|                                                          	|
| ByID(s *Selector)                                                                                          	| 只id来选择元素                                           	|
| ByJSPath(s *Selector)                                                                                      	|                                                          	|
| ByNodeID(s *Selector)                                                                                      	| 按节点ID选择元素                                         	|
| ByQuery(s *Selector)                                                                                       	| 根据document.querySelector的规则选择元素，返回单个节点   	|
| ByQueryAll(s *Selector)                                                                                    	| 根据document.querySelectorAll返回所有匹配的节点          	|
| BySearch(s *Selector)                                                                                      	| 如果不写，默认会使用这个选择器，类似devtools ctrl+f 搜索 	|
| Cancel(ctx context.Context) error                                                                          	|                                                          	|
| CaptureScreenshot(res *[]byte) Action                                                                      	|                                                          	|
| Clear(sel interface{}, opts ...QueryOption) QueryAction                                                    	|                                                          	|
| Click(sel interface{}, opts ...QueryOption) QueryAction                                                    	| 触发点击事件                                             	|
| ComputedStyle(sel interface{}, style *[]*css.ComputedProperty, opts ...QueryOption) QueryAction            	|                                                          	|
| Dimensions(sel interface{}, model **dom.BoxModel, opts ...QueryOption) QueryAction                         	|                                                          	|
| DoubleClick(sel interface{}, opts ...QueryOption) QueryAction                                              	|                                                          	|
| Focus(sel interface{}, opts ...QueryOption) QueryAction                                                    	|                                                          	|
| FromContext(ctx context.Context) *Context                                                                  	|                                                          	|
| InnerHTML(sel interface{}, html *string, opts ...QueryOption) QueryAction                                  	|                                                          	|
| JavascriptAttribute(sel interface{}, name string, res interface{}, opts ...QueryOption) QueryAction        	|                                                          	|
| ListenBrowser(ctx context.Context, fn func(ev interface{}))                                                	|                                                          	|
| ListenTarget(ctx context.Context, fn func(ev interface{}))                                                 	|                                                          	|
| Location(urlstr *string) Action                                                                            	|                                                          	|
| MatchedStyle(sel interface{}, style **css.GetMatchedStylesForNodeReturns, opts ...QueryOption) QueryAction 	|                                                          	|
| Navigate(urlstr string) NavigateAction                                                                     	| 设置url                                                  	|
| NavigateBack() NavigateAction                                                                              	|                                                          	|
| NavigateForward() NavigateAction                                                                           	|                                                          	|
| NavigateToHistoryEntry(entryID int64) NavigateAction                                                       	|                                                          	|
| NavigationEntries(currentIndex *int64, entries *[]*page.NavigationEntry) NavigateAction                    	|                                                          	|
| NewContext(parent context.Context, opts ...ContextOption) (context.Context, context.CancelFunc)            	|                                                          	|
| NodeEnabled(s *Selector)                                                                                   	|                                                          	|
| NodeIDs(sel interface{}, ids *[]cdp.NodeID, opts ...QueryOption) QueryAction                               	|                                                          	|
| NodeNotPresent(s *Selector)                                                                                	|                                                          	|
| NodeNotVisible(s *Selector)                                                                                	|                                                          	|
| NodeReady(s *Selector)                                                                                     	|                                                          	|
| Nodes(sel interface{}, nodes *[]*cdp.Node, opts ...QueryOption) QueryAction                                	|                                                          	|
| NodeSelected(s *Selector)                                                                                  	|                                                          	|
| NodeVisible(s *Selector)                                                                                   	|                                                          	|
| OuterHTML(sel interface{}, html *string, opts ...QueryOption) QueryAction                                  	| 获取HTML源码                                             	|
| Query(sel interface{}, opts ...QueryOption) QueryAction                                                    	|                                                          	|
| QueryAfter(sel interface{}, f func(context.Context, ...*cdp.Node) error, opts ...QueryOption) QueryAction  	|                                                          	|
| Reload() NavigateAction                                                                                    	|                                                          	|
| RemoveAttribute(sel interface{}, name string, opts ...QueryOption) QueryAction                             	|                                                          	|
| Reset(sel interface{}, opts ...QueryOption) QueryAction                                                    	|                                                          	|
| Run(ctx context.Context, actions ...Action) error                                                          	|                                                          	|
| Screenshot(sel interface{}, picbuf *[]byte, opts ...QueryOption) QueryAction                               	| 标签截图，赋值给变量                                     	|
| ScrollIntoView(sel interface{}, opts ...QueryOption) QueryAction                                           	|                                                          	|
| SendKeys(sel interface{}, v string, opts ...QueryOption) QueryAction                                       	| 使用chromedp.ByID选择器。向标签输入内容。                	|
| SetAttributes(sel interface{}, attributes map[string]string, opts ...QueryOption) QueryAction              	|                                                          	|
| SetAttributeValue(sel interface{}, name, value string, opts ...QueryOption) QueryAction                    	|                                                          	|
| SetJavascriptAttribute(sel interface{}, name, value string, opts ...QueryOption) QueryAction               	|                                                          	|
| SetUploadFiles(sel interface{}, files []string, opts ...QueryOption) QueryAction                           	|                                                          	|
| SetValue(sel interface{}, value string, opts ...QueryOption) QueryAction                                   	|                                                          	|
| Sleep(d time.Duration) Action                                                                              	| 等待时间                                                 	|
| Stop() NavigateAction                                                                                      	|                                                          	|
| Submit(sel interface{}, opts ...QueryOption) QueryAction                                                   	|                                                          	|
| Targets(ctx context.Context) ([]*target.Info, error)                                                       	|                                                          	|
| Text(sel interface{}, text *string, opts ...QueryOption) QueryAction                                       	|                                                          	|
| TextContent(sel interface{}, text *string, opts ...QueryOption) QueryAction                                	|                                                          	|
| Title(title *string) Action                                                                                	|                                                          	|
| Value(sel interface{}, value *string, opts ...QueryOption) QueryAction                                     	| 取值并赋值给变量                                         	|
| WaitEnabled(sel interface{}, opts ...QueryOption) QueryAction                                              	|                                                          	|
| WaitFunc(wait func(context.Context, *cdp.Frame, ...cdp.NodeID) ([]*cdp.Node, error)) QueryOption           	|                                                          	|
| waitLoaded(ctx context.Context) error                                                                      	|                                                          	|
| WaitNewTarget(ctx context.Context, fn func(*target.Info) bool) <-chan target.ID                            	|                                                          	|
| WaitNotPresent(sel interface{}, opts ...QueryOption) QueryAction                                           	|                                                          	|
| WaitNotVisible(sel interface{}, opts ...QueryOption) QueryAction                                           	|                                                          	|
| WaitReady(sel interface{}, opts ...QueryOption) QueryAction                                                	|                                                          	|
| WaitSelected(sel interface{}, opts ...QueryOption) QueryAction                                             	|                                                          	|
| WaitVisible(sel interface{}, opts ...QueryOption) QueryAction                                              	| 等待指定标签元素加载完成                                 	|
| WithBrowserOption(opts ...BrowserOption) ContextOption                                                     	|                                                          	|
| WithDebugf(f func(string, ...interface{})) ContextOption                                                   	|                                                          	|
| WithErrorf(f func(string, ...interface{})) ContextOption                                                   	|                                                          	|
| WithLogf(f func(string, ...interface{})) ContextOption                                                     	|                                                          	|
| WithTargetID(id target.ID) ContextOption                                                                   	|                                                          	|