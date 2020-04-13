# Python爬虫


[[toc]]



## flag

* [https://github.com/HiddenStrawberry/Crawler_Illegal_Cases_In_China](https://github.com/HiddenStrawberry/Crawler_Illegal_Cases_In_China)
* [xvfb可以将屏幕的图像输出给放到虚拟内存中](https://blog.csdn.net/wkb342814892/article/details/81591394)


**[xpath和css选择器](/Web/README.md#xpath和css选择器)**


- 批量杀死`chromedriver`进程

```bash
ps -efww|grep LOCAL=chromedriver|grep -v grep|cut -c 9-15|xargs kill -9
```


```batch
taskkill /f /im chromedriver.exe
```

+ [关于网页referer以及破解referer反爬虫的办法](https://blog.csdn.net/python_neophyte/article/details/82562330)


* [微信公众号爬取研究](https://github.com/DropsDevopsOrg/ECommerceCrawlers/wiki/%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E7%88%AC%E5%8F%96%E7%A0%94%E7%A9%B6)
* [微信公众号爬虫](https://github.com/search?o=desc&q=%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%8F%B7%E7%88%AC%E8%99%AB&s=updated&type=Repositories)
* [https://github.com/wnma3mz/wechat_articles_spider](https://github.com/wnma3mz/wechat_articles_spider)
* [WeChat Hook](https://github.com/search?o=desc&q=WeChat+Hook&s=updated&type=Repositories)
* [https://github.com/redtips/wechathook](https://github.com/redtips/wechathook)
* [https://github.com/codeByDog/pcWechat](https://github.com/codeByDog/pcWechat)
* [https://github.com/wwg88888888/WeChatExt](https://github.com/wwg88888888/WeChatExt)



## `HeadlessBrowser`

> `Headless Browser`(无头的浏览器)是没有图形用户界面(GUI)的web浏览器，通常是通过编程或命令行界面来控制的

* [https://w3c.github.io/webdriver](https://w3c.github.io/webdriver)
* [Headless Browser](https://www.jianshu.com/p/11d519e2d0cb)
* [https://github.com/mozilla/geckodriver](https://github.com/mozilla/geckodriver)



**反爬虫**

* [https://github.com/intoli/intoli-article-materials](https://github.com/intoli/intoli-article-materials)
* [无头浏览器检测](https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html)
* [隐藏Headles-Chrome不被检测出来](https://mlln.cn/2019/07/05/%E7%88%AC%E8%99%AB%E5%A6%82%E4%BD%95%E9%9A%90%E8%97%8FHeadles-Chrome%E4%B8%8D%E8%A2%AB%E6%A3%80%E6%B5%8B%E5%87%BA%E6%9D%A5)



### `chromedriver`

> `Selenium`操作`Chrome`浏览器需要有`ChromeDriver`驱动来协助，`ChromeDriver`与`Chrome`版本对应关系一定要正确

* [http://chromedriver.storage.googleapis.com/index.html](http://chromedriver.storage.googleapis.com/index.html)
* [http://npm.taobao.org/mirrors/chromedriver](http://npm.taobao.org/mirrors/chromedriver)
* [headless-chrome官方文档](https://developers.google.com/web/updates/2017/04/headless-chrome)
* [功能和ChromeOptions官方网站参考](https://sites.google.com/a/chromium.org/chromedriver/capabilities)





**参数列表**

* [https://peter.sh/experiments/chromium-command-line-switches/](https://peter.sh/experiments/chromium-command-line-switches)
* [https://cs.chromium.org/chromium/src/content/public/common/content_switches.cc](https://cs.chromium.org/chromium/src/content/public/common/content_switches.cc)


| 参数                                	| 说明                                                                   	|
|-------------------------------------	|------------------------------------------------------------------------	|
| -blink-settings=imagesEnabled=false 	| 不加载图片, 此方式只针对单个标签页                                     	|
| -bookmark-menu                      	| 在工具 栏增加一个书签按钮                                              	|
| -default-browser-check              	| 不检查默认浏览器                                                       	|
| -disable-extensions                 	| 禁用扩展                                                               	|
| -disable-gpu                        	| 关闭gpu,服务器一般没有显卡                                             	|
| -disable-images                     	| 禁用图像，建议使用"profile.managed_default_content_settings.images":2   |
| -disable-java                       	| 禁用java                                                               	|
| -disable-javascript                 	| 禁用Javascript                                                         	|
| -disable-plugins                    	| 禁止加载所有插件。可以通过about:plugins页面查看效果                    	|
| -disable-popup-blocking             	| 禁用弹出拦截                                                           	|
| -disable-software-rasterizer        	| 禁用浏览器应用                                                         	|
| -disk-cache-dir="[PATH]"            	| 指定缓存Cache路径                                                      	|
| -disk-cache-size=                   	| 指定Cache大小，单位Byte                                                	|
| -enable-sync                        	| 启用书签同步                                                           	|
| -enable-udd-profiles                	| 启用账户切换菜单                                                       	|
| -first run                          	| 重置到初始状态，第一次运行                                             	|
| -headless                           	| 不开启图像界面                                                         	|
| -hide-scrollbars                    	| 隐藏滚动条, 应对一些特殊页面                                           	|
| -ignore-certificate-errors          	| 忽略证书错误                                                           	|
| -incognito                          	| 隐身模式启动                                                           	|
| -in-process-plugins                 	| 插件不以独立的进程运行，插件的异常崩溃，可能会导致整个页面挂掉         	|
| -lang=zh-CN                         	| 设置语言为简体中文                                                     	|
| -media-cache-size                   	| 自定义多媒体缓存最大值（单位byte）                                     	|
| -no-first-run                       	| 第一次不运行                                                           	|
| -no-sandbox                         	| 不开启沙盒模式可以减少对服务器的资源消耗,但是服务器安全性降低          	|
| -omnibox-popup-count="num"          	| 将地址栏弹出的提示菜单数量改为num个。我都改为15个了。                  	|
| -process-per-site                   	| 每个站点使用单独进程                                                   	|
| -process-per-tab                    	| 每个标签使用单独进程                                                   	|
| -proxy-pac-url                      	| 指定使用PAC代理时，所需要的脚本url地址                                 	|
| -remote-debugging-address           	| 远程调试地址 0.0.0.0 可以外网调用但是安全性低,建议使用默认值 127.0.0.1 	|
| -remote-debugging-port              	| chrome-debug工具的端口(golang chromepd 默认端口是9222,建议不要修改)    	|
| -single-process                     	| 浏览器只能以单进程运行，通常用于调试，定位bug                          	|
| -start-maximized                    	| 浏览器启动后，窗口默认为最大化                                         	|
| -user-agent=""                      	| 修改HTTP请求头部的Agent字符串，可以通过about:version页面查看修改效果   	|
| -user-data-dir="[PATH]"             	| 指定用户文件夹User Data路径。                                          	|
| -window-size="1600x900"             	| 窗口尺寸                                                               	|




## selenium

* [https://github.com/SeleniumHQ](https://github.com/SeleniumHQ)
* [https://selenium.dev/documentation/zh-cn](https://selenium.dev/documentation/zh-cn)
* [Selenium with Python中文翻译文档](https://selenium-python-zh.readthedocs.io/en/latest/index.html)
* [`selenium`+`chromedriver`+`BeautifulSoup`](https://github.com/woytu/tool-gui-python/blob/master/utils/ReptileUtil.py)
* [Python3-Selenium开启自动化测试](http://qzmvc1.top/Python3-Selenium%E5%BC%80%E5%90%AF%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95.html)
* [python+selenium 判断元素是否存在，是否可点击，是否被选中](https://www.twblogs.net/a/5c8414bdbd9eee35cd69c929/zh-cn)
* [EC：expected_conditions判断页面元素](https://www.jianshu.com/p/a94918d49c3c)
* [selenium,Python3滚动到页面底部的几种解决方案](https://rumenz.com/rumenbiji/python3-selenium-scrollToBottom.html)
* [Python Selenium教程 - 猿人学Python](https://www.yuanrenxue.com/python-selenium)



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


## 浏览器下载设置

* [https://github.com/SeleniumHQ/selenium/issues/5722](https://github.com/SeleniumHQ/selenium/issues/5722)
* [https://github.com/SeleniumHQ/selenium/issues/5159](https://github.com/SeleniumHQ/selenium/issues/5159)

```python
# 向Selenium Webwdriver添加对Chrome "send_command"的支持
driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
# allow自动、deny禁止、default默认
params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'deny', 'downloadPath': "D:\\"}}
driver.execute("send_command", params)
```

```python
driver.execute_cdp_cmd("Page.setDownloadBehavior", {'behavior': 'deny', 'downloadPath': "D:\\"})
```




### 打开新标签页

```python
# 获取主窗口句柄
main_window = driver.current_window_handle
# 通过执行js打开新标签页并访问url
driver.execute_script(f"window.open('{url}')")
# 在新选项卡中打开空白页面
#driver.execute_script(f"window.open('','_blank')")
# 获取当前所有窗口句柄（窗口A、B），并切换到新标签页
driver.switch_to.window(driver.window_handles[-1])
# 访问url
#driver.get(url)
# 关闭当前窗口。
driver.close()
# 关闭新选项卡后回到主窗口，必须做这一步，否则会引发错误
driver.switch_to.window(main_window)
```

**使用组合键**

> 该方式在Chrome下无效

> 在增加了设置下载路径代码后，无法打开新标签页，但是捕获到的handler是两个，可以进行切换，只是没有切换动态效果了，实际是切换了的

> `OSX`操作系统通过组合键<kbd>COMMAND</kbd> + <kbd>T</kbd>或<kbd>COMMAND</kbd> + <kbd>W</kbd>来实现选项卡的打开/关闭

> 在其他操作系统上，可以使用<kbd>CONTROL</kbd> + <kbd>T</kbd> / <kbd>CONTROL<kbd> + <kbd>W</kbd>

```python
# windows 用Keys.CONTROL 如同ctrl+t打开新标签页
driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 't')
# <CTRL> + <T>通过Action链发送
# ActionChains(driver).key_down(Keys.CONTROL).send_keys("t").key_up(Keys.CONTROL).perform()
# 获取当前所有窗口句柄（窗口A、B），并切换到新标签页
driver.switch_to.window(driver.window_handles[-1])
# 访问url
driver.get(url)
# windows 用Keys.CONTROL 如同ctrl+w关闭标签页
#driver.find_element_by_tag_name('body').send_keys(Keys.CONTROL + 'w')
# 关闭当前窗口。
driver.close()
```

### 执行JavaScript

```python
# 通过 js 移动到最下
driver.execute_script( "var q=document.documentElement.scrollTop=10000" )
# 通过 js 返回所有html
driver.execute_script( "return document.documentElement.outerHTML" )
```



## m3u8解析下载解密合并

> M3U8有两层：第一层存放的是流信息（EXT-X-STREAM-INF）和第二层的下载链接，第二层才是存放加密（EXT-X-KEY）和`ts`文件的下载地址

* [https://github.com/globocom/m3u8](https://github.com/globocom/m3u8)
* [什么是m3u8文件](https://www.jianshu.com/p/2a5403234b14)
* [加密的ts+m3u8合并](https://www.junmajinlong.com/others/ts_m3u8)
* [关于m3u8格式的视频文件ts转mp4下载和key加密问题](https://www.cnblogs.com/String-Lee/p/11391893.html)
* [将TS转换为MP4](https://gist.github.com/larvata/95df619df7109d8b74d2b965a3266354)



```python
import os
import time
from urllib.parse import urljoin

import m3u8
import requests
from glob import iglob

from natsort import natsorted
from dataclasses import dataclass
from concurrent.futures import ThreadPoolExecutor
# pip3 install pycryptodome
# 进入python安装目录，如C:\python37
# 在\Lib\site-packages目录下找到：
# crypto这个目录重命名为: Crypto
from Crypto.Cipher import AES

UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 " \
            "Safari/537.36"


@dataclass
class DownLoadM3U8(object):
    m3u8_url: str
    file_name: str

    def __post_init__(self):
        self.thread_pool = ThreadPoolExecutor(max_workers=10)
        if not self.file_name:
            self.file_name = 'new.mp4'
        self.m3u8_obj = m3u8.load(self.m3u8_url)
        self.cryptor = self.get_key()

    def get_key(self):
        """
        获取key进行解密，这里可以获取method加密方式进行解密
        """
        if self.m3u8_obj.keys and self.m3u8_obj.keys[0]:
            res = requests.get(self.m3u8_obj.keys[0].absolute_uri, headers={'User-Agent': UserAgent})
            # AES 解密
            return AES.new(res.content, AES.MODE_CBC, res.content)
        else:
            return None

    def get_ts_url(self):
        for seg in self.m3u8_obj.segments:
            yield urljoin(self.m3u8_obj.base_uri, seg.uri)

    def download_ts(self, url_info):
        """
        下载ts文件，写入时如果有加密需要解密
        """
        url, ts_name = url_info
        res = requests.get(url, headers={'User-Agent': UserAgent})
        with open(ts_name, 'wb') as fp:
            if self.cryptor is not None:
                fp.write(self.cryptor.decrypt(res.content))
            else:
                fp.write(res.content)

    def download_all_ts(self):
        ts_urls = self.get_ts_url()
        for index, ts_url in enumerate(ts_urls):
            self.thread_pool.submit(self.download_ts, [ts_url, f'{index}.ts'])
        # 此方式可能使视频合并时顺序错乱
        # for file in self.m3u8_obj.files:
        #     url = urljoin(self.m3u8_obj.base_uri, file)
        #     self.thread_pool.submit(self.download_ts, [url, url[url.rfind("/") + 1:]])
        self.thread_pool.shutdown()

    def run(self):
        # 如果是第一层M3U8文件，那么就获取第二层的url
        if self.m3u8_obj.playlists and self.m3u8_obj.data.get("playlists"):
            self.m3u8_url = urljoin(self.m3u8_obj.base_uri, self.m3u8_obj.data.get("playlists")[0]["uri"])
            self.__post_init__()
        if not self.m3u8_obj.segments or not self.m3u8_obj.files:
            raise ValueError("m3u8数据不正确，请检查")
        self.download_all_ts()
        ts_path = '*.ts'
        with open(self.file_name, 'wb') as fn:
            for ts in natsorted(iglob(ts_path)):
                with open(ts, 'rb') as ft:
                    sc_line = ft.read()
                    fn.write(sc_line)
        [os.remove(ts) for ts in iglob(ts_path)]
        if os.path.exists("key.key"):
            os.remove("key.key")


if __name__ == '__main__':
    # aHR0cHM6Ly93d3cuMTAyNHV1LmNjL3ZvZC9saXN0aW5nLTQtMC0wLTAtMC0wLTAtMC0wLTEuaHRtbA==
    m3u8_url = 'https://zk.wb699.com/2019/03/06/aLdpUIBeHC48HGTk/playlist.m3u8'
    file_name = ''

    start = time.time()

    M3U8 = DownLoadM3U8(m3u8_url, file_name)
    M3U8.run()

    end = time.time()
    print('耗时:', end - start)
```



