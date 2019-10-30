# Python爬虫


* [selenium](#selenium)
  * [xpath和css选择器](#xpath和css选择器)
    * [css元素选择器](#css元素选择器)
    * [`Sizzle`的`Css3`结构性定位](#sizzle的css3结构性定位)
  * [`chromedriver`](#chromedriver)
  * [`geckodriver`](#geckodriver)
* [在CentOS中使用](#在centos中使用)






## selenium

### xpath和css选择器

> `Chrome`打开网页`F12`后下面的调试工具出来后点击`Elements`左边的那个框框里的鼠标箭头（或者按`Ctrl + Shift + C`），
> 然后网页会变成蓝色，到网页点击自己要选择的区域，接下来就会自动跳到`Elements`对应的位置，
> 在`HTML`的标签上点击鼠标右键->`Copy`->`COpy selector`或者`xpath`，就能复制选择器了。

#### css元素选择器

* [CSS 选择器参考手册](https://www.w3school.com.cn/cssref/css_selectors.ASP)

| 语法                     	| 说明                                                             	|
|--------------------------	|------------------------------------------------------------------	|
| *                        	| 通用元素选择器，匹配任何元素                                     	|
| E                        	| 标签选择器，匹配所有使用E标签的元素                              	|
| .info                    	| class选择器，匹配所有class属性中包含info的元素                   	|
| #footer                  	| id选择器，匹配所有id属性等于footer的元素                         	|
| E,F                      	| 多元素选择器，同时匹配所有E元素或F元素，E和F之间用逗号分隔       	|
| E F                      	| 后代元素选择器，匹配所有属于E元素后代的F元素，E和F之间用空格分隔 	|
| E > F                    	| 子元素选择器，匹配所有E元素的子元素F                             	|
| E + F                    	| 毗邻元素选择器，匹配紧随E元素之后的同级元素F （只匹配第一个）    	|
| E ~ F                    	| 同级元素选择器，匹配所有在E元素之后的同级F元素                   	|
| E[att='val']             	| 属性att的值为val的E元素 （区分大小写）                           	|
| E[att^='val']            	| 属性att的值以val开头的E元素 （区分大小写）                       	|
| E[att$='val']            	| 属性att的值以val结尾的E元素 （区分大小写）                       	|
| E[att*='val']            	| 属性att的值包含val的E元素 （区分大小写）                         	|
| E[att1='v1'][att2*='v2'] 	| 属性att1的值为v1，att2的值包含v2 （区分大小写）                  	|
| E:contains('xxxx')       	| 内容中包含xxxx的E元素                                            	|
| E:not(s)                 	| 匹配不符合当前选择器的任何元素                                   	|

- 匹配示例

| locator                                    	| 匹配                                                                      	|
|-----------------------------------------	|---------------------------------------------------------------------------	|
| css=divcss=div.formdiv                  	| `<div class="formdiv">`                                                     	|
| css=#recordlistcss=ul#recordlist        	| `<ul id="recordlist">`                                                      	|
| css=div.subdiv pcss=div.subdiv > ul > p 	| `<p>Heading</p>`                                                            	|
| css=form + div                          	| `<div class="subdiv">`                                                      	|
| css=p + licss=p ~ li                    	| 二者定位到的都是`<li>Cat</li>`但是storeCssCount的时候，前者得到1，后者得到4 	|
| css=form > input[name=username]         	| `<input name="username">`                                                   	|
| css=input[name$=id][value^=SYS]         	| `<input value="SYS123456" name="vid" type="hidden">`                        	|
| css=input:not([name$=id][value^=SYS])   	| `<input name="username" type="text"></input>`                               	|
| css=li:contains('Goa')                  	| `<li>Goat</li>`                                                             	|
| css=li:not(contains('Goa'))             	| `<li>Cat</li>`                                                              	|



#### `Sizzle`的`Css3`结构性定位

| 语法            	| 说明                                                           	|
|-----------------	|----------------------------------------------------------------	|
| E:nth(n)E:eq(n) 	| 在其父元素中的E子元素集合中排在第n+1个的E元素 (第一个n=0)      	|
| E:first         	| 在其父元素中的E子元素集合中排在第1个的E元素                    	|
| E:last          	| 在其父元素中的E子元素集合中排在最后1个的E元素                  	|
| E:even          	| 在其父元素中的E子元素集合中排在偶数位的E元素 (0,2,4…)          	|
| E:odd           	| 在其父元素中的E子元素集合中排在奇数的E元素 (1,3,5…)            	|
| E:lt(n)         	| 在其父元素中的E子元素集合中排在n位之前的E元素 (n=2,则匹配0,1)  	|
| E:gt(n)         	| 在其父元素中的E子元素集合中排在n位之后的E元素 (n=2，在匹配3,4) 	|
| E:only-child    	| 父元素的唯一一个子元素且标签为E                                	|
| E:empty         	| 不包含任何子元素的E元素，注意，文本节点也被看作子元素          	|


- 匹配示例

| locator                                                         	| 匹配                                 	|
|-----------------------------------------------------------------	|--------------------------------------	|
| css=ul > li:nth(0)                                              	| `<li>Cat</li>`                         	|
| css=ul > li:first                                               	| `<li>Cat</li>`                         	|
| css=ul > li:lt(2)                                               	| `<li>Cat</li>`                         	|
| css=ul > *:nth(0)css=ul > :nth(0)                               	| `<p>Heading</p>`                       	|
| css=ul > :first                                                 	| `<p>Heading</p>`                       	|
| css=ul > :even                                                  	| `<p>Heading</p>`                       	|
| css=ul > *:lastcss=ul > li:last                                 	| `<li>Goat</li>`                        	|
| css=ul > li:gt(2)                                               	| `<li>Goat</li>`                        	|
| css=ul > li:even                                                	| Cat, Car                             	|
| css=ul > li:odd                                                 	| Dog, Goat                            	|
| css=ul > p:odd                                                  	| [error] not found                    	|
| css=ul > li:only-childcss=ul > :only-childcss=ul > *:only-child 	| [error] not found (ul没有only-child) 	|
| css=div.subdiv > :only-child                                    	| `<ul id="recordlist">… … … …</ul>`     	|


### `HeadlessBrowser`

> `Headless Browser`(无头的浏览器)是没有图形用户界面(GUI)的web浏览器，通常是通过编程或命令行界面来控制的

* [Headless Browser](https://www.jianshu.com/p/11d519e2d0cb)

#### `chromedriver`

> `Selenium`操作`Chrome`浏览器需要有`ChromeDriver`驱动来协助，`ChromeDriver`与`Chrome`版本对应关系一定要正确

* [http://chromedriver.storage.googleapis.com/index.html](http://chromedriver.storage.googleapis.com/index.html)

* [http://npm.taobao.org/mirrors/chromedriver](http://npm.taobao.org/mirrors/chromedriver)

* [隐藏Headles-Chrome不被检测出来](https://mlln.cn/2019/07/05/%E7%88%AC%E8%99%AB%E5%A6%82%E4%BD%95%E9%9A%90%E8%97%8FHeadles-Chrome%E4%B8%8D%E8%A2%AB%E6%A3%80%E6%B5%8B%E5%87%BA%E6%9D%A5)

* [headless-chrome官方文档](https://developers.google.com/web/updates/2017/04/headless-chrome)


- **参数列表**

* [https://peter.sh/experiments/chromium-command-line-switches/](https://peter.sh/experiments/chromium-command-line-switches)

* [https://cs.chromium.org/chromium/src/content/public/common/content_switches.cc](https://cs.chromium.org/chromium/src/content/public/common/content_switches.cc)


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
| --ignore-certificate-errors  	| 忽略证书错误                                         	|
| --disable-extensions        	| 禁用扩展                                         	|
| --disable-plugins         	| 禁用插件                                          	|
| –disable-software-rasterizer  | 禁用插件                                         	|
| --hide-scrollbars             | 隐藏滚动条, 应对一些特殊页面                                         	|
| --blink-settings=imagesEnabled=false | 不加载图片, 提升速度                                         	|



#### `geckodriver`

* [https://github.com/mozilla/geckodriver](https://github.com/mozilla/geckodriver)


- [`selenium`+`chromedriver`+`BeautifulSoup`](https://github.com/woytu/tool-gui-python/blob/master/utils/ReptileUtil.py)



### 函数或变量


| 函数或变量                                                             	| 说明 	|
|------------------------------------------------------------------------	|------	|
| def file_detector_context(self, file_detector_class, *args, **kwargs): 	|      	|
| def mobile(self):                                                      	|      	|
| def name(self):                                                        	|      	|
| def start_client(self):                                                	|      	|
| def stop_client(self):                                                 	|      	|
| def start_session(self, capabilities, browser_profile=None):           	|      	|
| def create_web_element(self, element_id):                              	|      	|
| def execute(self, driver_command, params=None):                        	|      	|
| def get(self, url):                                                    	|      	|
| def title(self):                                                       	|      	|
| def find_element_by_id(self, id_):                                     	|      	|
| def find_elements_by_id(self, id_):                                    	|      	|
| def find_element_by_xpath(self, xpath):                                	|      	|
| def find_elements_by_xpath(self, xpath):                               	|      	|
| def find_element_by_link_text(self, link_text):                        	|      	|
| def find_elements_by_link_text(self, text):                            	|      	|
| def find_element_by_partial_link_text(self, link_text):                	|      	|
| def find_elements_by_partial_link_text(self, link_text):               	|      	|
| def find_element_by_name(self, name):                                  	|      	|
| def find_elements_by_name(self, name):                                 	|      	|
| def find_element_by_tag_name(self, name):                              	|      	|
| def find_elements_by_tag_name(self, name):                             	|      	|
| def find_element_by_class_name(self, name):                            	|      	|
| def find_elements_by_class_name(self, name):                           	|      	|
| def find_element_by_css_selector(self, css_selector):                  	|      	|
| def find_elements_by_css_selector(self, css_selector):                 	|      	|
| def execute_script(self, script, *args):                               	|      	|
| def execute_async_script(self, script, *args):                         	|      	|
| def current_url(self):                                                 	|      	|
| def page_source(self):                                                 	|      	|
| def close(self):                                                       	|      	|
| def quit(self):                                                        	|      	|
| def current_window_handle(self):                                       	|      	|
| def window_handles(self):                                              	|      	|
| def maximize_window(self):                                             	|      	|
| def fullscreen_window(self):                                           	|      	|
| def minimize_window(self):                                             	|      	|
| def switch_to(self):                                                   	|      	|
| def switch_to_active_element(self):                                    	|      	|
| def switch_to_window(self, window_name):                               	|      	|
| def switch_to_frame(self, frame_reference):                            	|      	|
| def switch_to_default_content(self):                                   	|      	|
| def switch_to_alert(self):                                             	|      	|
| def back(self):                                                        	|      	|
| def forward(self):                                                     	|      	|
| def refresh(self):                                                     	|      	|
| def get_cookies(self):                                                 	|      	|
| def get_cookie(self, name):                                            	|      	|
| def delete_cookie(self, name):                                         	|      	|
| def delete_all_cookies(self):                                          	|      	|
| def add_cookie(self, cookie_dict):                                     	|      	|
| def implicitly_wait(self, time_to_wait):                               	|      	|
| def set_script_timeout(self, time_to_wait):                            	|      	|
| def set_page_load_timeout(self, time_to_wait):                         	|      	|
| def find_element(self, by=By.ID, value=None):                          	|      	|
| def find_elements(self, by=By.ID, value=None):                         	|      	|
| def desired_capabilities(self):                                        	|      	|
| def get_screenshot_as_file(self, filename):                            	|      	|
| def save_screenshot(self, filename):                                   	|      	|
| def get_screenshot_as_png(self):                                       	|      	|
| def get_screenshot_as_base64(self):                                    	|      	|
| def set_window_size(self, width, height, windowHandle='current'):      	|      	|
| def get_window_size(self, windowHandle='current'):                     	|      	|
| def set_window_position(self, x, y, windowHandle='current'):           	|      	|
| def get_window_position(self, windowHandle='current'):                 	|      	|
| def get_window_rect(self):                                             	|      	|
| def set_window_rect(self, x=None, y=None, width=None, height=None):    	|      	|
| def file_detector(self):                                               	|      	|
| def file_detector(self, detector):                                     	|      	|
| def orientation(self):                                                 	|      	|
| def orientation(self, value):                                          	|      	|
| def application_cache(self):                                           	|      	|
| def log_types(self):                                                   	|      	|
| def get_log(self, log_type):                                           	|      	|









### 在CentOS中使用

* [xvfb可以将屏幕的图像输出给放到虚拟内存中](https://blog.csdn.net/wkb342814892/article/details/81591394)

- 批量杀死`chromedriver`进程

```bash
ps -efww|grep LOCAL=chromedriver|grep -v grep|cut -c 9-15|xargs kill -9
```
