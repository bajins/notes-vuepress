# Go爬虫



* [HTML解析](#html解析)
* [`chromedp`](#chromedp)
  * [`chromedp`能做什么](#chromedp能做什么)
* [`godet`](#godet)
* [`gcd`](#gcd)











## HTML解析

* [https://github.com/antchfx](https://github.com/antchfx)

* [https://github.com/PuerkitoBio/goquery](https://github.com/PuerkitoBio/goquery)

* [https://github.com/gocolly/colly](https://github.com/gocolly/colly)



## `chromedp`

* [https://github.com/chromedp](https://github.com/chromedp)

- 该组织下有以下项目

* [https://github.com/chromedp/chromedp](https://github.com/chromedp/chromedp)

* [https://github.com/chromedp/cdproto](https://github.com/chromedp/cdproto)

> "github.com/chromedp/cdproto/cdp" `cdp.TimeSinceEpoch(time.Now().Add(180 * 24 * time.Hour))`

> "github.com/chromedp/cdproto/network" 网络处理，比如启用启用网络跟踪，现在将网络事件传递给客户端`network.Enable()`

> "github.com/chromedp/cdproto/page" chrome页面处理，
> 比如设置下载`page.SetDownloadBehavior(page.SetDownloadBehaviorBehaviorDeny)`



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

* [golang headless browser包chromedp初探](https://zhangguanzhang.github.io/2019/07/14/chromedp)

* [go语言chromedp使用教程](https://mojotv.cn/2018/12/26/chromedp-tutorial-for-golang)



- [xpath和css选择器](/Python/Python爬虫.md#xpath和css选择器)

- [`chromedriver`](/Python/Python爬虫.md#chromedriver)



| 函数或变量                                                                                                  | 说明                                                     |
|-------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|
| (a *ExecAllocator) Allocate(ctx context.Context, opts ...BrowserOption) (*Browser, error)                   |                                                          |
| (a *ExecAllocator) Wait()                                                                                   |                                                          |
| (a *RemoteAllocator) Allocate(ctx context.Context, opts ...BrowserOption) (*Browser, error)                 |                                                          |
| (a *RemoteAllocator) Wait()                                                                                 |                                                          |
| (f ActionFunc) Do(ctx context.Context) error                                                                |                                                          |
| (s *Selector) Do(ctx context.Context) error                                                                 |                                                          |
| (t Tasks) Do(ctx context.Context) error                                                                     |                                                          |
| After(f func(context.Context, ...*cdp.Node) error) QueryOption                                              |                                                          |
| AtLeast(n int) QueryOption                                                                                  |                                                          |
| Attributes(sel interface{}, attributes *map[string]string, opts ...QueryOption) QueryAction                 |                                                          |
| AttributesAll(sel interface{}, attributes *[]map[string]string, opts ...QueryOption) QueryAction            |                                                          |
| AttributeValue(sel interface{}, name string, value *string, ok *bool, opts ...QueryOption) QueryAction      |                                                          |
| Blur(sel interface{}, opts ...QueryOption) QueryAction                                                      |                                                          |
| ByFunc(f func(context.Context, *cdp.Node) ([]cdp.NodeID, error)) QueryOption                                |                                                          |
| ByID(s *Selector)                                                                                           | 只id来选择元素                                           |
| ByJSPath(s *Selector)                                                                                       |                                                          |
| ByNodeID(s *Selector)                                                                                       | 按节点ID选择元素                                         |
| ByQuery(s *Selector)                                                                                        | 根据document.querySelector的规则选择元素，返回单个节点   |
| ByQueryAll(s *Selector)                                                                                     | 根据document.querySelectorAll返回所有匹配的节点          |
| BySearch(s *Selector)                                                                                       | 如果不写，默认会使用这个选择器，类似devtools ctrl+f 搜索 |
| Cancel(ctx context.Context) error                                                                           |                                                          |
| CaptureScreenshot(res *[]byte) Action                                                                       |                                                          |
| Clear(sel interface{}, opts ...QueryOption) QueryAction                                                     |                                                          |
| Click(sel interface{}, opts ...QueryOption) QueryAction                                                     | 触发点击事件                                             |
| CombinedOutput(w io.Writer) ExecAllocatorOption                                                             |                                                          |
| ComputedStyle(sel interface{}, style *[]*css.ComputedProperty, opts ...QueryOption) QueryAction             |                                                          |
| Dimensions(sel interface{}, model **dom.BoxModel, opts ...QueryOption) QueryAction                          |                                                          |
| DisableGPU(a *ExecAllocator)                                                                                | 关闭gpu,服务器一般没有显卡                                 |
| DoubleClick(sel interface{}, opts ...QueryOption) QueryAction                                               |                                                          |
| Env(vars ...string) ExecAllocatorOption                                                                     | NAME=value形式的通用环境变量列表，用于传递到新的Chrome进程。  |
| ExecPath(path string) ExecAllocatorOption                                                                   |                                                          |
| Flag(name string, value interface{}) ExecAllocatorOption                                                    |                                                          |
| Focus(sel interface{}, opts ...QueryOption) QueryAction                                                     |                                                          |
| FromContext(ctx context.Context) *Context                                                                   |                                                          |
| Headless(a *ExecAllocator)                                                                                  |                                                          |
| InnerHTML(sel interface{}, html *string, opts ...QueryOption) QueryAction                                   |                                                          |
| JavascriptAttribute(sel interface{}, name string, res interface{}, opts ...QueryOption) QueryAction         |                                                          |
| ListenBrowser(ctx context.Context, fn func(ev interface{}))                                                 |                                                          |
| ListenTarget(ctx context.Context, fn func(ev interface{}))                                                  |                                                          |
| Location(urlstr *string) Action                                                                             |                                                          |
| MatchedStyle(sel interface{}, style **css.GetMatchedStylesForNodeReturns, opts ...QueryOption) QueryAction  |                                                          |
| Navigate(urlstr string) NavigateAction                                                                      | 设置url                                                  |
| NavigateBack() NavigateAction                                                                               |                                                          |
| NavigateForward() NavigateAction                                                                            |                                                          |
| NavigateToHistoryEntry(entryID int64) NavigateAction                                                        |                                                          |
| NavigationEntries(currentIndex *int64, entries *[]*page.NavigationEntry) NavigateAction                     |                                                          |
| NewContext(parent context.Context, opts ...ContextOption) (context.Context, context.CancelFunc)             |                                                          |
| NewExecAllocator(parent context.Context, opts ...ExecAllocatorOption) (context.Context, context.CancelFunc) |                                                          |
| NewRemoteAllocator(parent context.Context, url string) (context.Context, context.CancelFunc)                |                                                          |
| NodeEnabled(s *Selector)                                                                                    |                                                          |
| NoDefaultBrowserCheck(a *ExecAllocator)                                                                     | 禁用默认浏览器检查。                                        |
| NodeIDs(sel interface{}, ids *[]cdp.NodeID, opts ...QueryOption) QueryAction                                |                                                          |
| NodeNotPresent(s *Selector)                                                                                 |                                                          |
| NodeNotVisible(s *Selector)                                                                                 |                                                          |
| NodeReady(s *Selector)                                                                                      |                                                          |
| Nodes(sel interface{}, nodes *[]*cdp.Node, opts ...QueryOption) QueryAction                                 |                                                          |
| NodeSelected(s *Selector)                                                                                   |                                                          |
| NodeVisible(s *Selector)                                                                                    |                                                          |
| NoFirstRun(a *ExecAllocator)                                                                                | 禁用第一次运行对话框的Chrome命令行选项                     |
| NoSandbox(a *ExecAllocator)                                                                                 | 用于禁用沙箱的Chrome命令行选项                              |
| OuterHTML(sel interface{}, html *string, opts ...QueryOption) QueryAction                                   | 获取HTML源码                                             |
| ProxyServer(proxy string) ExecAllocatorOption                                                               |                                                          |
| Query(sel interface{}, opts ...QueryOption) QueryAction                                                     |                                                          |
| QueryAfter(sel interface{}, f func(context.Context, ...*cdp.Node) error, opts ...QueryOption) QueryAction   |                                                          |
| Reload() NavigateAction                                                                                     |                                                          |
| RemoveAttribute(sel interface{}, name string, opts ...QueryOption) QueryAction                              |                                                          |
| Reset(sel interface{}, opts ...QueryOption) QueryAction                                                     |                                                          |
| Run(ctx context.Context, actions ...Action) error                                                           |                                                          |
| Screenshot(sel interface{}, picbuf *[]byte, opts ...QueryOption) QueryAction                                | 标签截图，赋值给变量                                     |
| ScrollIntoView(sel interface{}, opts ...QueryOption) QueryAction                                            |                                                          |
| SendKeys(sel interface{}, v string, opts ...QueryOption) QueryAction                                        | 使用chromedp.ByID选择器。向标签输入内容。                |
| SetAttributes(sel interface{}, attributes map[string]string, opts ...QueryOption) QueryAction               |                                                          |
| SetAttributeValue(sel interface{}, name, value string, opts ...QueryOption) QueryAction                     |                                                          |
| SetJavascriptAttribute(sel interface{}, name, value string, opts ...QueryOption) QueryAction                |                                                          |
| SetUploadFiles(sel interface{}, files []string, opts ...QueryOption) QueryAction                            |                                                          |
| SetValue(sel interface{}, value string, opts ...QueryOption) QueryAction                                    |                                                          |
| Sleep(d time.Duration) Action                                                                               | 等待时间                                                 |
| Stop() NavigateAction                                                                                       |                                                          |
| Submit(sel interface{}, opts ...QueryOption) QueryAction                                                    |                                                          |
| Targets(ctx context.Context) ([]*target.Info, error)                                                        |                                                          |
| Text(sel interface{}, text *string, opts ...QueryOption) QueryAction                                        |                                                          |
| TextContent(sel interface{}, text *string, opts ...QueryOption) QueryAction                                 |                                                          |
| Title(title *string) Action                                                                                 |                                                          |
| UserAgent(userAgent string) ExecAllocatorOption                                                             |                                                          |
| UserDataDir(dir string) ExecAllocatorOption                                                                 |                                                          |
| Value(sel interface{}, value *string, opts ...QueryOption) QueryAction                                      | 取值并赋值给变量                                         |
| WaitEnabled(sel interface{}, opts ...QueryOption) QueryAction                                               |                                                          |
| WaitFunc(wait func(context.Context, *cdp.Frame, ...cdp.NodeID) ([]*cdp.Node, error)) QueryOption            |                                                          |
| waitLoaded(ctx context.Context) error                                                                       |                                                          |
| WaitNewTarget(ctx context.Context, fn func(*target.Info) bool) <-chan target.ID                             |                                                          |
| WaitNotPresent(sel interface{}, opts ...QueryOption) QueryAction                                            |                                                          |
| WaitNotVisible(sel interface{}, opts ...QueryOption) QueryAction                                            |                                                          |
| WaitReady(sel interface{}, opts ...QueryOption) QueryAction                                                 |                                                          |
| WaitSelected(sel interface{}, opts ...QueryOption) QueryAction                                              |                                                          |
| WaitVisible(sel interface{}, opts ...QueryOption) QueryAction                                               | 等待指定标签元素加载完成                                 |
| WindowSize(width, height int) ExecAllocatorOption                                                           | 设置初始窗口大小的命令行选项。                              |
| WithBrowserOption(opts ...BrowserOption) ContextOption                                                      |                                                          |
| WithDebugf(f func(string, ...interface{})) ContextOption                                                    |                                                          |
| WithErrorf(f func(string, ...interface{})) ContextOption                                                    |                                                          |
| WithLogf(f func(string, ...interface{})) ContextOption                                                      |                                                          |
| WithTargetID(id target.ID) ContextOption                                                                    |                                                          |


## `godet`

* [https://github.com/raff/godet](https://github.com/raff/godet)


- 截图

```go
package main

import "fmt"
import "time"

import "github.com/raff/godet"

func main() {
	// connect to Chrome instance
	remote, err := godet.Connect("localhost:9222", false)
	if err != nil {
		fmt.Println("cannot connect to Chrome instance:", err)
		return
	}

	// disconnect when done
	defer remote.Close()

	// get browser and protocol version
	version, _ := remote.Version()
	fmt.Println(version)

	// get list of open tabs
	tabs, _ := remote.TabList("")
	fmt.Println(tabs)

	// install some callbacks
	remote.CallbackEvent(godet.EventClosed, func(params godet.Params) {
		fmt.Println("RemoteDebugger connection terminated.")
	})

	remote.CallbackEvent("Network.requestWillBeSent", func(params godet.Params) {
		fmt.Println("requestWillBeSent",
			params["type"],
			params["documentURL"],
			params["request"].(map[string]interface{})["url"])
	})

	remote.CallbackEvent("Network.responseReceived", func(params godet.Params) {
		fmt.Println("responseReceived",
			params["type"],
			params["response"].(map[string]interface{})["url"])
	})

	remote.CallbackEvent("Log.entryAdded", func(params godet.Params) {
		entry := params["entry"].(map[string]interface{})
		fmt.Println("LOG", entry["type"], entry["level"], entry["text"])
	})

	// block loading of most images
	_ = remote.SetBlockedURLs("*.jpg", "*.png", "*.gif")

	// create new tab
	tab, _ := remote.NewTab("https://www.google.com")
	fmt.Println(tab)

	// enable event processing
	remote.RuntimeEvents(true)
	remote.NetworkEvents(true)
	remote.PageEvents(true)
	remote.DOMEvents(true)
	remote.LogEvents(true)

	// navigate in existing tab
	_ = remote.ActivateTab(tabs[0])

	//remote.StartPreciseCoverage(true, true)

	// re-enable events when changing active tab
	remote.AllEvents(true) // enable all events

	_, _ = remote.Navigate("https://www.google.com")

	// evaluate Javascript expression in existing context
	res, _ := remote.EvaluateWrap(`
            console.log("hello from godet!")
            return 42;
        `)
	fmt.Println(res)

	// take a screenshot
	_ = remote.SaveScreenshot("screenshot.png", 0644, 0, true)

	time.Sleep(time.Second)

	// or save page as PDF
	_ = remote.SavePDF("page.pdf", 0644, godet.PortraitMode(), godet.Scale(0.5), godet.Dimensions(6.0, 2.0))

	// if err := remote.SetInputFiles(0, []string{"hello.txt"}); err != nil {
	//     fmt.Println("setInputFiles", err)
	// }

	time.Sleep(5 * time.Second)

	//remote.StopPreciseCoverage()

	r, err := remote.GetPreciseCoverage(true)
	if err != nil {
		fmt.Println("error profiling", err)
	} else {
		fmt.Println(r)
	}

	// Allow downloads
	_ = remote.SetDownloadBehavior(godet.AllowDownload, "/tmp/")
	_, _ = remote.Navigate("http://httpbin.org/response-headers?Content-Type=text/plain;%20charset=UTF-8&Content-Disposition=attachment;%20filename%3d%22test.jnlp%22")

	time.Sleep(time.Second)

	// Block downloads
	_ = remote.SetDownloadBehavior(godet.DenyDownload, "")
	_, _ = remote.Navigate("http://httpbin.org/response-headers?Content-Type=text/plain;%20charset=UTF-8&Content-Disposition=attachment;%20filename%3d%22test.jnlp%22")
}
```





## `gcd`

* [https://github.com/wirepair/gcd](https://github.com/wirepair/gcd)


- 截图

```go
package main

import (
	"encoding/base64"
	"flag"
	"fmt"
	"log"
	"net/url"
	"os"
	"runtime"
	"sync"
	"time"

	"github.com/wirepair/gcd"
	"github.com/wirepair/gcd/gcdapi"
)

const (
	numTabs = 5
)

var debugger *gcd.Gcd
var wg sync.WaitGroup

var path string
var dir string
var port string

func init() {
	switch runtime.GOOS {
	case "windows":
		flag.StringVar(&path, "chrome", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", "path to chrome")
		flag.StringVar(&dir, "dir", "C:\\temp\\", "user directory")
	case "darwin":
		flag.StringVar(&path, "chrome", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "path to chrome")
		flag.StringVar(&dir, "dir", "/tmp/", "user directory")
	case "linux":
		flag.StringVar(&path, "chrome", "/usr/bin/chromium-browser", "path to chrome")
		flag.StringVar(&dir, "dir", "/tmp/", "user directory")
	}

	flag.StringVar(&port, "port", "9222", "Debugger port")
}

func main() {
	var err error
	urls := []string{"http://www.google.com", "http://www.veracode.com", "http://www.microsoft.com", "http://bbc.co.uk", "http://www.reddit.com/r/golang"}

	flag.Parse()

	debugger = gcd.NewChromeDebugger()
	debugger.StartProcess(path, dir, port)
	defer debugger.ExitProcess()

	targets := make([]*gcd.ChromeTarget, numTabs)

	for i := 0; i < numTabs; i++ {
		wg.Add(1)
		targets[i], err = debugger.NewTab()
		if err != nil {
			log.Fatalf("error getting targets")
		}
		page := targets[i].Page
		page.Enable()
		targets[i].Subscribe("Page.loadEventFired", pageLoaded)
		// navigate
		navigateParams := &gcdapi.PageNavigateParams{Url: urls[i]}
		_, _, _, err := page.NavigateWithParams(navigateParams)
		if err != nil {
			log.Fatalf("error: %s\n", err)
		}
	}
	wg.Wait()
	for i := 0; i < numTabs; i++ {
		takeScreenShot(targets[i])
	}
}

func pageLoaded(target *gcd.ChromeTarget, event []byte) {
	target.Unsubscribe("Page.loadEventFired")
	wg.Done()
}

func takeScreenShot(target *gcd.ChromeTarget) {
	dom := target.DOM
	page := target.Page
	doc, err := dom.GetDocument(-1, true)
	if err != nil {
		fmt.Printf("error getting doc: %s\n", err)
		return
	}

	debugger.ActivateTab(target)
	time.Sleep(1 * time.Second) // give it a sec to paint
	u, urlErr := url.Parse(doc.DocumentURL)
	if urlErr != nil {
		fmt.Printf("error parsing url: %s\n", urlErr)
		return
	}

	fmt.Printf("Taking screen shot of: %s\n", u.Host)
	screenShotParams := &gcdapi.PageCaptureScreenshotParams{Format: "png", FromSurface: true}
	img, errCap := page.CaptureScreenshotWithParams(screenShotParams)
	if errCap != nil {
		fmt.Printf("error getting doc: %s\n", errCap)
		return
	}

	imgBytes, errDecode := base64.StdEncoding.DecodeString(img)
	if errDecode != nil {
		fmt.Printf("error decoding image: %s\n", errDecode)
		return
	}

	f, errFile := os.Create(u.Host + ".png")
	defer f.Close()
	if errFile != nil {
		fmt.Printf("error creating image file: %s\n", errFile)
		return
	}
	f.Write(imgBytes)
	debugger.CloseTab(target)
}
```