# Python爬虫


## 爬取动态数据 
> selenium配合BeautifulSoup

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