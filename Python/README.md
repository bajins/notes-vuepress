# Python


[[toc]]




## flag

> 由于`Python`是动态编译的语言，和`C`/`C++`、`Java`或者`Kotlin`等静态语言不同，它是在运行时一句一句代码地边编译边执行的，
> 而`Java`是提前将高级语言编译成了`JVM`字节码，运行时直接通过JVM和机器打交道，所以进行密集计算时运行速度远高于动态编译语言。
> 但是根据`二八定律`（帕累托法则），有`80%`的计算资源只被`20%`的程序所使用，因此在大部分情况下，
> 原生的`CPython`解释器已经足够满足日常编程，加上很多科学计算库底层都是`C`/`C++`写的，一般不会用`Python`做密集计算。


> 当你从官网下载并安装好`Python`后，就自带了一个`CPython`解释器，是使用最广的`Python`解释器，
> 我们在终端使用`python xxx.py`命令就是调用的`CPython`解释器。

> `PyPy`使用了`JIT`（即时编译）技术，混合了动态编译和静态编译的特性，仍然是一句一句编译源代码，
> 但是会将翻译过的代码缓存起来以降低性能损耗。相对于静态编译代码，即时编译的代码可以处理延迟绑定并增强安全性。

* [GO-Node-Python的简单性能比较](https://www.izhongxia.com/posts/64310.html)

* [https://docs.python.org/zh-cn](https://docs.python.org/zh-cn)

* [内置异常和函数](https://lichangke.github.io/category/#python)

* [Python语言小册](https://python.fasionchan.com/zh_CN/latest/index.html)

* [https://github.com/yidao620c/python3-cookbook](https://github.com/yidao620c/python3-cookbook)

* [https://github.com/eastlakeside/interpy-zh](https://github.com/eastlakeside/interpy-zh)

* [https://github.com/cloga/scipy-lecture-notes_cn](https://github.com/cloga/scipy-lecture-notes_cn)

* [https://www.junmajinlong.com/python/index](https://www.junmajinlong.com/python/index)

* [https://zmister.com](https://zmister.com)


* [精选的Python框架，库，软件和资源的精选列表](https://github.com/vinta/awesome-python)

* [python3 中执行系统命令](https://www.jianshu.com/p/a19de14c4b57)

* [Python图像处理库—-Pillow](https://www.lizenghai.com/archives/17611.html)





## 安装新版

> 全部操作都在`root`用户下执行

### 安装编译相关工具

```bash
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel \
ncurses-devel sqlite-devel readline-devel tk-devel \
gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

### 下载安装包解压

> 到官网复制最新版下载地址 https://www.python.org/downloads/release

```bash
wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz
# 解压
tar -xvJf Python-3.7.3.tar.xz
# 切换到解压目录
cd Python-3.7.3
```

### 编译安装

```bash
# 创建编译安装目录，并配置指定安装路径
mkdir /usr/local/python3 && ./configure --prefix=/usr/local/python3
# 编译安装并把安装日志保存下来
make && make install > install.log
```

### 创建软连接

```bash
ln -s /usr/local/python3/bin/python3 /bin/python3
ln -s /usr/local/python3/bin/pip3 /bin/pip3
```

### 验证是否成功

```bash
python3 -V && pip3 -V
```

### 安装后`yum`不能正常使用

- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`
 
```bash
vi /usr/bin/yum 
```

- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`

```bash
vi /usr/libexec/urlgrabber-ext-down 
```






## pip

* [Python包管理工作流](https://frostming.com/2018/09-14/python-packaging-flow)


### 换源

* [https://pypi.org/](https://pypi.org)


* 阿里云 [https://mirrors.aliyun.com/pypi/simple](https://mirrors.aliyun.com/pypi/simple)
* 中国科技大学 [https://pypi.mirrors.ustc.edu.cn/simple](https://pypi.mirrors.ustc.edu.cn/simple)
* 清华大学 [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple)

* 豆瓣(douban) [http://pypi.douban.com/simple](http://pypi.douban.com/simple)
* 中国科学技术大学 [http://pypi.mirrors.ustc.edu.cn/simple](http://pypi.mirrors.ustc.edu.cn/simple)
* 华中理工大学 [http://pypi.hustunique.com](http://pypi.hustunique.com)
* 山东理工大学 [http://pypi.sdutlinux.org](http://pypi.sdutlinux.org)
* 上海交通大学 [https://mirrors.sjtug.sjtu.edu.cn/pypi](https://mirrors.sjtug.sjtu.edu.cn/pypi)

- 安装单个库使用

> 可以在使用pip的时候加参数`-i 网址`
>
> 注意如果不是`https`协议网址需要加`--trusted-host`参数

```batch
pip install -i http://pypi.douban.com/simple --trusted-host pypi.douban.com requests
```


- 使用命令全局配置

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```


- 编辑文件全局配置

```bash
# Linux环境
vi ~/.pip/pip.conf 
# windows环境
%APPDATA%\Romaing\pip\pip.ini

# 添加或者修改
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```



### 生成依赖管理文件

```bash
pip freeze > requirements.txt
```


### 根据管理文件安装依赖

```bash
pip install -r requirements.txt
pip install --requirement requirements.txt
```



### 更新

**更新pip**

```bash
python -m pip install --upgrade pip setuptools
```

- 解决pip安装模块提示已经安装更高版本问题

```bash
pip3 install --ignore-installed 模块名
```

**查看可更新的库**

```bash
pip list -o
pip list --outdated
# format有两个选项：columns(有表头), freeze(无表头), json
pip list --outdated --format=columns
```

**更新单个库**

```bash
pip install --upgrade 要升级的包名
```

**批量更新库**

* [使用pip升级所有包](https://www.codenong.com/2720014)

```bash
pip freeze --local | grep -v '^-e' | cut -d = -f 1  | xargs -n1 pip install -U

pip list -o --format=freeze | cut -d = -f 1  | xargs -n1 pip install -U
```

```bash
# 安装 pip-review
pip install pip-review
# 查看可更新的包
pip-review
# 自动更新所有包
pip-review --auto
# 更新包，提供操作可选项：[Y]es, [N]o, [A]ll, [Q]uit
pip-review --local --interactive
```

```python
from subprocess import call
from pip._internal.utils.misc import get_installed_distributions

packages = [dist.project_name for dist in get_installed_distributions()]
call("pip install --upgrade" + ' '.join(packages), shell=True)
```

```python
import pkg_resources
from subprocess import call

packages = [dist.project_name for dist in pkg_resources.working_set]
call("pip install --upgrade" + ' '.join(packages), shell=True)
```


### 卸载库

```bash
pip uninstall 要卸载的包名
```







## 其他

### 输入参数

```python
# host=input("请输入数据库IP地址：")
# port=input("请输入数据库端口：")
# user=input("请输入数据库用户名：")
# dbPasswd=input("请输入数据库密码：")
# database=input("请输入数据库名：")
# charset=input("请输入数据库字符编码：")
# dbSQL=input("请输入数据库查询SQL：")

# 设置参数
parser = argparse.ArgumentParser(description='manual to this script')
parser.add_argument('--host', '-host', type=str, default='localhost', help='请输入数据库IP地址')
parser.add_argument('--port', '-port', type=int, default=3306, help='请输入数据库端口')
parser.add_argument('--user', '-user', type=str, default='root', help='请输入数据库用户名')
parser.add_argument('--password', '-pwd', type=str, default=None, help='请输入数据库密码')
parser.add_argument('--database', '-db', type=str, default=None, help='请输入数据库名')
parser.add_argument('--charset', '-charset', type=str, default='UTF8', help='请输入数据库字符编码')

# 获取参数值
args = parser.parse_args()
host = args.host
port = args.port
user = args.user
password = args.password
database = args.database
charset = args.charset
```


### 随机

```python
# 随机大于0 且小于1 之间的小数
random.random()
# 随机一个大于0小于9的小数
random.uniform(0,9)

# 随机一个大于等于1且小于等于5的整数
random.randint(1,5)
# 随机一个大于等于1且小于等于10之间的奇数，其中2表示递增基数
random.randrange(1,10,2)

# 随机返回参数列表中任意一个元素
random.choice(['123','abc',52,[1,2]])
# 随机返回参数列表中任意两个元素，参数二指定返回的数量
random.sample(['123','abc',52,[1,2]],2)

# 打乱列表顺序
random.shuffle([1,2,5,7,9,10])
```


## 系统信息

```python
print('system and bit'.center(40, '-'))
print(platform.architecture(), '\n')

print('system and deatial'.center(40, '-'))
print(platform.platform(), '\n')

print('system'.center(40, '-'))
print(platform.system(), '\n')

print('version'.center(40, '-'))
print(platform.version(), '\n')

print('系统信息'.center(40, '-'))
print(platform.uname(), '\n')

print("python Version".center(40, '-'))
print(platform.python_version(), '\n')
```


## asyncio

* [python asyncio](https://www.jianshu.com/p/9ce6c3bf6733)

* [https://docs.python.org/zh-cn/3/library/asyncio.html](https://docs.python.org/zh-cn/3/library/asyncio.html)

```python
import threading
import asyncio
 
async def hello():
    print('Hello world! (%s)' % threading.currentThread())
    await asyncio.sleep(1)
    print('Hello again! (%s)' % threading.currentThread())
 
 
try:
    loop = asyncio.get_event_loop()
    tasks = [hello() for i in range(1000*1000*1)]
    loop.run_until_complete(asyncio.wait(tasks))
    # loop.close()
    # Python 3.7
    #asyncio.run(asyncio.wait(tasks))
except ValueError:
    print('Async Error')
```



## 线程池


* [python3异步编程](https://blog.51cto.com/445153/2138832)

* [Python 并发、并行、同步和异步](https://www.jianshu.com/p/13d2e8514546)

* [ThreadPoolExecutor](https://www.jianshu.com/p/6d6e4f745c27)


### 线程数量控制

- IO密集型

> 线程数 = CPU核心数/(1-阻塞系数)

> Blocking Coefficient(阻塞系数)（一般为0.8~0.9之间） = 阻塞时间/(阻塞时间+使用CPU的时间)

- 计算密集型

> CPU有超线程：线程数 = CPU内核线程数*2
>
> CPU无超线程：线程数 = CPU核数+1



## SQLite3

* [https://docs.python.org/zh-cn/3.8/library/sqlite3.html](https://docs.python.org/zh-cn/3.8/library/sqlite3.html)

* [SQLite教程（内置日期和时间函数）](https://blog.csdn.net/hexingen/article/details/71577318)

* [SQLite - Python](https://www.runoob.com/sqlite/sqlite-python.html)

* [SQLite 教程](https://www.twle.cn/l/yufei/sqlite/sqlite-basic-index.html)

* [Python连接SQLite数据库](https://www.yiibai.com/sqlite/python-with-sqlite.html)


**连接符**

| 连接符  | 说明       |
|------|----------|
| \-    | 算术减法     |
| \!=  | 关系不等于    |
| %    | 算术模量     |
| &    | 逻辑与      |
| \*   | 算术乘法     |
| /    | 算术除法     |
| \|   | 逻辑或      |
| \|\| | 字符串串联    |
| \+   | 算术加法     |
| <    | 关系小于     |
| <<   | 按位右移     |
| <=   | 关系式小于或等于 |
| <>   | 关系不等于    |
| =    | 关系等于     |
| ==   | 关系等于     |
| >    | 关系大于     |
| >=   | 关系大于或等于  |
| >>   | 按位左移     |
| AND  | 逻辑与      |
| GLOB | 关系文件名匹配  |
| IN   | 逻辑输入     |
| LIKE | 关系字符串匹配  |
| OR   | 逻辑或      |



## 定时任务

* [Python3-定时任务五种实现方式](https://blog.51cto.com/huangyg/2367088)

1. sched模块`sched.scheduler`
2. 循环+sleep
3. 线程模块中Timer类`threading.Timer`
4. 第三方模块：schedule
5. 定时框架：APScheduler、Celery




## gc

* [https://docs.python.org/zh-cn/3.8/library/gc.html](https://docs.python.org/zh-cn/3.8/library/gc.html)

* [https://docs.python.org/zh-cn/3/library/tracemalloc.html](https://docs.python.org/zh-cn/3/library/tracemalloc.html)

* [https://github.com/giampaolo/psutil](https://github.com/giampaolo/psutil)

* [https://github.com/pythonprofilers/memory_profiler](https://github.com/pythonprofilers/memory_profiler)

* [https://github.com/mgedmin/objgraph](https://github.com/mgedmin/objgraph)

* [https://github.com/pympler/pympler](https://github.com/pympler/pympler)

* [https://github.com/zhuyifei1999/guppy3](https://github.com/zhuyifei1999/guppy3)

* [一次python内存调优经历](https://saucer-man.com/operation_and_maintenance/298.html)


> 使用`sys.getsizeof`方法可以查看`python`对象的内存占用，单位：字节 (byte)

```python
#开启gc（默认）
gc.enable()
# 关闭gc
gc.disable()
# 判断gc是否开启
gc.isenabled()
# 执行一次垃圾回收，不管gc是否处于开启状态都能使用
gc.collect()
# 设置垃圾回收阈值
gc.set_threshold(t0, t1, t2) 
# 获得当前的垃圾回收阈值
gc.get_threshold()
# 获取所有被垃圾回收器监控管理的对象
gc.get_objects()
# 返回obj对象直接指向的对象
gc.get_referents(obj)
# 返回所有直接指向obj的对象
gc.get_referrers(obj)
```




