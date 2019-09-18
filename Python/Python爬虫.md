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
| css=divcss=div.formdiv                  	| <div class="formdiv">                                                     	|
| css=#recordlistcss=ul#recordlist        	| <ul id="recordlist">                                                      	|
| css=div.subdiv pcss=div.subdiv > ul > p 	| <p>Heading</p>                                                            	|
| css=form + div                          	| <div class="subdiv">                                                      	|
| css=p + licss=p ~ li                    	| 二者定位到的都是<li>Cat</li>但是storeCssCount的时候，前者得到1，后者得到4 	|
| css=form > input[name=username]         	| <input name="username">                                                   	|
| css=input[name$=id][value^=SYS]         	| <input value="SYS123456" name="vid" type="hidden">                        	|
| css=input:not([name$=id][value^=SYS])   	| <input name="username" type="text"></input>                               	|
| css=li:contains('Goa')                  	| <li>Goat</li>                                                             	|
| css=li:not(contains('Goa'))             	| <li>Cat</li>                                                              	|



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
| css=ul > li:nth(0)                                              	| <li>Cat</li>                         	|
| css=ul > li:first                                               	| <li>Cat</li>                         	|
| css=ul > li:lt(2)                                               	| <li>Cat</li>                         	|
| css=ul > *:nth(0)css=ul > :nth(0)                               	| <p>Heading</p>                       	|
| css=ul > :first                                                 	| <p>Heading</p>                       	|
| css=ul > :even                                                  	| <p>Heading</p>                       	|
| css=ul > *:lastcss=ul > li:last                                 	| <li>Goat</li>                        	|
| css=ul > li:gt(2)                                               	| <li>Goat</li>                        	|
| css=ul > li:even                                                	| Cat, Car                             	|
| css=ul > li:odd                                                 	| Dog, Goat                            	|
| css=ul > p:odd                                                  	| [error] not found                    	|
| css=ul > li:only-childcss=ul > :only-childcss=ul > *:only-child 	| [error] not found (ul没有only-child) 	|
| css=div.subdiv > :only-child                                    	| <ul id="recordlist">… … … …</ul>     	|




### `chromedriver`

> `chromedriver`与`chrome`版本对应关系一定要正确

* [http://chromedriver.storage.googleapis.com/index.html](http://chromedriver.storage.googleapis.com/index.html)

* [http://npm.taobao.org/mirrors/chromedriver](http://npm.taobao.org/mirrors/chromedriver)


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



### `geckodriver`

* [https://github.com/mozilla/geckodriver](https://github.com/mozilla/geckodriver)



- `selenium`+`chromedriver`+`BeautifulSoup`

```python
import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By


def crawling_selenium(url, input_el, input_text):
    try:
        # 先下载chromedriver
        # http://chromedriver.storage.googleapis.com/index.html
        # chrome选项
        options = webdriver.ChromeOptions()
        # 设置chrome浏览器无界面模式
        options.add_argument('--headless')
        # 打开浏览器
        driver = webdriver.Chrome(chrome_options=options)
        # 最大化浏览器
        # driver.maximize_window()
        # 最小化浏览器
        driver.minimize_window()
        # 打开网站
        driver.get(url)
        # n次点击加载更多
        # for i in range(0, 5):
        #     # 点击加载更多
        #     driver.find_element_by_class_name("home-news-footer").click()
        #     # 找到加载更多按钮，点击
        #     driver.find_element(By.LINK_TEXT, "加载更多").click()
        #     # 延时两秒
        #     time.sleep(2)
        # 使用selenium通过id，name或class的方式来获取到这个input标签
        input_element = driver.find_element_by_class_name(input_el)
        # 传入值，输入的内容
        input_element.send_keys(input_text)
        # 提交
        input_element.submit()
        # 延时
        time.sleep(2)
        # 获取网页源代码
        html = driver.page_source
        # 使用BeautifulSoup创建html代码的BeautifulSoup实例
        return BeautifulSoup(html, features="html.parser")
    except Exception as e:
        print(e)
    finally:
        # 关闭浏览器
        driver.close()
        # 关闭chreomedriver进程
        driver.quit()


def app():
    try:
        soup = requestsUtils.crawling_selenium("http://tool.chinaz.com/dns", "w360", "github.com")
        lis = soup.find_all("li", class_="ReLists")
        if lis is not None:
            for li in lis:
                ip = li.find(class_="w60-0").string
                if not ip == "-" and ip is not None:
                    addr = li.find(class_="w23-0").string
                    ttl = li.find(class_="w14-0").string
                    print(addr, ip, ttl)
    except Exception as e:
        print(e)


if __name__ == '__main__':
    app()


```



### 在CentOS中使用

* [CentOS + Selenium](https://blog.csdn.net/wkb342814892/article/details/81591394)

* [chrome其他安装方式](https://intoli.com/blog/installing-google-chrome-on-centos)

```bash
# 安装selenium
pip install selenium

# 安装chrome-browser
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
yum install -y google-chrome-stable_current_x86_64.rpm

# 查看安装的chrome版本
google-chrome --version

# 安装chromedriver：一个用来和chrome交互的接口
yum install -y chromedriver

# 查看安装的chromedriver版本
chromedriver --version
```

- 批量杀死`chromedriver`进程

```bash
ps -efww|grep LOCAL=chromedriver|grep -v grep|cut -c 9-15|xargs kill -9
```