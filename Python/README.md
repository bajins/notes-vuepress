# Python

[[toc]]


## Flag

> 由于`Python`是动态编译的语言，和`C`/`C++`、`Java`或者`Kotlin`等静态语言不同，它是在运行时一句一句代码地边编译边执行的，
> 而`Java`是提前将高级语言编译成了`JVM`字节码，运行时直接通过JVM和机器打交道，所以进行密集计算时运行速度远高于动态编译语言。
> 但是根据`二八定律`（帕累托法则），有`80%`的计算资源只被`20%`的程序所使用，因此在大部分情况下，
> 原生的`CPython`解释器已经足够满足日常编程，加上很多科学计算库底层都是`C`/`C++`写的，一般不会用`Python`做密集计算。


+ [https://github.com/topics/python](https://github.com/topics/python)
+ [https://github.com/python](https://github.com/python)
    + [https://www.python.org](https://www.python.org)
    + [https://docs.python.org/zh-cn](https://docs.python.org/zh-cn)
    + [https://www.python.org/ftp/python](https://www.python.org/ftp/python)
+ [https://github.com/psf](https://github.com/psf)
+ [https://github.com/Python-World](https://github.com/Python-World)
+ [https://github.com/taichi-dev/taichi](https://github.com/taichi-dev/taichi)
+ [https://github.com/kennethreitz/pep8.org](https://github.com/kennethreitz/pep8.org)
+ [https://github.com/hhatto/autopep8](https://github.com/hhatto/autopep8)
+ [https://github.com/psf/black](https://github.com/psf/black)
+ 代码格式化 [https://github.com/astral-sh/ruff](https://github.com/astral-sh/ruff)



* [GO-Node-Python的简单性能比较](https://www.izhongxia.com/posts/64310.html)
* 内置函数 [https://docs.python.org/zh-cn/3/library/functions.html](https://docs.python.org/zh-cn/3/library/functions.html)
* 内置异常 [https://docs.python.org/zh-cn/3/library/exceptions.html](https://docs.python.org/zh-cn/3/library/exceptions.html)
* [List Comprehensions](https://www.python.org/dev/peps/pep-0202/#reference-implementation)
* [列表显示/列表解析](https://docs.python.org/zh-cn/3/reference/expressions.html#list-displays)
* [https://github.com/jackfrued/Python-100-Days](https://github.com/jackfrued/Python-100-Days)
* 内置异常和函数-LeaCoder [https://lichangke.github.io/category/#python](https://lichangke.github.io/category/#python)
* [Python语言小册](https://python.fasionchan.com/zh_CN/latest/index.html)
* [https://github.com/revolunet/PythonBooks](https://github.com/revolunet/PythonBooks)
* [https://github.com/robertparley/wtfpython-cn](https://github.com/robertparley/wtfpython-cn)
* [https://github.com/gto76/python-cheatsheet](https://github.com/gto76/python-cheatsheet)
* 教程 [https://github.com/TwoWater/Python](https://github.com/TwoWater/Python)
* [https://github.com/xxg1413/python](https://github.com/xxg1413/python)
* [https://github.com/yidao620c/python3-cookbook](https://github.com/yidao620c/python3-cookbook)
* [https://github.com/eastlakeside/interpy-zh](https://github.com/eastlakeside/interpy-zh)
* [https://github.com/cloga/scipy-lecture-notes_cn](https://github.com/cloga/scipy-lecture-notes_cn)
* [https://www.junmajinlong.com/python/index](https://www.junmajinlong.com/python/index)
* [https://zmister.com](https://zmister.com)
* [https://github.com/iam-veeramalla/python-for-devops](https://github.com/iam-veeramalla/python-for-devops)
* 基础教程 [https://morvanzhou.github.io/tutorials/python-basic/basic](https://morvanzhou.github.io/tutorials/python-basic/basic)
* [https://github.com/luckrnx09/python-guide-for-javascript-engineers](https://github.com/luckrnx09/python-guide-for-javascript-engineers)
* [https://github.com/ProgrammingHero1](https://github.com/ProgrammingHero1)
* 设计模式和集合 [https://github.com/faif/python-patterns](https://github.com/faif/python-patterns)
* [https://hellopython.readthedocs.io](https://hellopython.readthedocs.io)
    * [https://github.com/meizhaohui/vueblog](https://github.com/meizhaohui/vueblog)
* [https://github.com/Pierian-Data/Complete-Python-3-Bootcamp](https://github.com/Pierian-Data/Complete-Python-3-Bootcamp)
* 流式数据处理 [https://github.com/sandabuliu/python-stream](https://github.com/sandabuliu/python-stream)
* [https://github.com/Asabeneh/30-Days-Of-Python](https://github.com/Asabeneh/30-Days-Of-Python)
* [https://github.com/cycleuser/ThinkPython-CN](https://github.com/cycleuser/ThinkPython-CN)



- [FantixKing 的个人主页-掘金](https://juejin.cn/user/4372110956833581/posts)
- [Python中的GIL机制详解](https://zhuanlan.zhihu.com/p/353555643)
- [深挖python上下文管理——类的__init__、__enter__、__exit__、__del__在with下的表现](https://blog.csdn.net/qq_27884799/article/details/101535569)
- [深入理解 Python 中的上下文管理器](https://www.cnblogs.com/wongbingming/p/10519553.html)

```python
test = Test() # 触发__del__
with Test() as t: # 触发__exit__
    pass
```



**工具**

- 纯真IP数据库 [https://github.com/animalize/qqwry-python3](https://github.com/animalize/qqwry-python3)
- 反编译 [https://github.com/countercept/python-exe-unpacker](https://github.com/countercept/python-exe-unpacker)
- 解密MS Office [https://github.com/nolze/msoffcrypto-tool](https://github.com/nolze/msoffcrypto-tool)
- 网站脱机下载 [https://github.com/xroche/httrack](https://github.com/xroche/httrack)
- web文件扫描 [https://github.com/topics/dirbuster](https://github.com/topics/dirbuster)
- [https://github.com/H4ckForJob/dirmap](https://github.com/H4ckForJob/dirmap)
- [https://github.com/DIGITALCRIMINAL/OnlyFans](https://github.com/DIGITALCRIMINAL/OnlyFans)
- WiFi扫描破解 [https://github.com/TheSadError/NIVOS](https://github.com/TheSadError/NIVOS)
- CLI工具 [https://github.com/kellyjonbrazil/jc](https://github.com/kellyjonbrazil/jc)
- [https://github.com/astral-sh/ruff](https://github.com/astral-sh/ruff)
- 数据提取 [https://github.com/opendatalab/MinerU](https://github.com/opendatalab/MinerU)



## 三方编译器

> `PyPy`使用了`JIT`（即时编译）技术，混合了动态编译和静态编译的特性，仍然是一句一句编译源代码，
> 但是会将翻译过的代码缓存起来以降低性能损耗。相对于静态编译代码，即时编译的代码可以处理延迟绑定并增强安全性。

* [https://github.com/python/cpython](https://github.com/python/cpython)
* [https://www.pypy.org](https://www.pypy.org)
    * [https://github.com/topics/pypy](https://github.com/topics/pypy)
    * [https://github.com/mozillazg/pypy](https://github.com/mozillazg/pypy)
* [https://github.com/pyston/pyston](https://github.com/pyston/pyston)
* [https://github.com/stackless-dev/stackless](https://github.com/stackless-dev/stackless)
* [https://github.com/jython/jython](https://github.com/jython/jython)
* [https://github.com/IronLanguages](https://github.com/IronLanguages)
    * [https://ironpython.net](https://ironpython.net)
* [https://github.com/numpy](https://github.com/numpy)
* [https://github.com/faster-cpython](https://github.com/faster-cpython)
    * [https://github.com/markshannon/faster-cpython](https://github.com/markshannon/faster-cpython)
* [https://github.com/cython/cython](https://github.com/cython/cython)
* [https://github.com/numba/numba](https://github.com/numba/numba)
* [https://github.com/Nuitka/Nuitka](https://github.com/Nuitka/Nuitka)
* [https://github.com/Immediate-Mode-UI/Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)
    * [https://github.com/vurtun/nuklear](https://github.com/vurtun/nuklear)
    * [http://github.xiaoc.cn/ghaerr/microwindows](http://github.xiaoc.cn/ghaerr/microwindows)
* [https://github.com/pybind](https://github.com/pybind)
* [https://github.com/wlav/cppyy](https://github.com/wlav/cppyy)
* [https://github.com/ethan-funny](https://github.com/ethan-funny)






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

* 到官网复制最新版下载地址 https://www.python.org/downloads/release

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

### 安装后yum不能正常使用

- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`
 
```bash
vi /usr/bin/yum 
```

- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`

```bash
vi /usr/libexec/urlgrabber-ext-down 
```


## pip

* [https://github.com/pypa](https://github.com/pypa)
    * [https://pypi.org](https://pypi.org)
    * [https://www.cnpython.com/pypi](https://www.cnpython.com/pypi)
* [https://packaging.python.org/tutorials/installing-packages](https://packaging.python.org/tutorials/installing-packages)
* [Python包管理工作流](https://frostming.com/2018/09-14/python-packaging-flow)

- `sudo apt install python3-pip`

* Anaconda [https://github.com/ContinuumIO](https://github.com/ContinuumIO) 科学包及其依赖项的发行版本
    * [https://github.com/Anaconda-Platform](https://github.com/Anaconda-Platform)
* [https://github.com/conda/conda](https://github.com/conda/conda) 包及其依赖项和环境的管理工具
* [https://github.com/jazzband/pip-tools](https://github.com/jazzband/pip-tools)
* [https://github.com/python-poetry/poetry](https://github.com/python-poetry/poetry)
* [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)
* [https://github.com/danhper/asdf-python](https://github.com/danhper/asdf-python)
* [https://github.com/pdm-project/pdm](https://github.com/pdm-project/pdm)
* [https://bitbucket.org/virtualenvwrapper/virtualenvwrapper](https://bitbucket.org/virtualenvwrapper/virtualenvwrapper)
* [https://github.com/davidmarble/virtualenvwrapper-win](https://github.com/davidmarble/virtualenvwrapper-win)
* [https://github.com/python-poetry/poetry](https://github.com/python-poetry/poetry)
* [https://github.com/astral-sh/uv](https://github.com/astral-sh/uv)



### 镜像源

**[更多镜像源](/Other/#通用镜像)**

- 阿里云 [https://mirrors.aliyun.com/pypi/simple](https://mirrors.aliyun.com/pypi/simple)
- 百度 [https://mirror.baidu.com/pypi/simple](https://mirror.baidu.com/pypi/simple)
- 中国科技大学 [https://pypi.mirrors.ustc.edu.cn/simple](https://pypi.mirrors.ustc.edu.cn/simple)
- 清华大学 [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple)

* 豆瓣(douban) [http://pypi.douban.com/simple](http://pypi.douban.com/simple)
* 中国科学技术大学 [http://pypi.mirrors.ustc.edu.cn/simple](http://pypi.mirrors.ustc.edu.cn/simple)
* 华中理工大学 [http://pypi.hustunique.com](http://pypi.hustunique.com)
* 山东理工大学 [http://pypi.sdutlinux.org](http://pypi.sdutlinux.org)
* 上海交通大学 [https://mirrors.sjtug.sjtu.edu.cn/pypi](https://mirrors.sjtug.sjtu.edu.cn/pypi)


- 安装单个库

```batch
# 使用pip参数`-i 网址`，如果不是`https`协议网址需要加--trusted-host参数
pip install -i http://pypi.douban.com/simple --trusted-host pypi.douban.com requests
```

- 使用命令全局配置

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

- 编辑文件全局配置

```ini
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

* [https://github.com/bndr/pipreqs](https://github.com/bndr/pipreqs)

```bash
# 对于没有使用虚拟环境，会把系统所有的包都导出
pip freeze > requirements.txt
# pipreqs则只导出当前项目依赖库，如果文件存在可以使用--force覆盖，默认不会覆盖
pipreqs --force --encoding utf-8 ./
```


### 根据管理文件安装依赖

```bash
pip install -r requirements.txt
pip install --requirement requirements.txt
```



### 更新依赖库

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
# --outdated
pip list -o
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
#  linux 下升级所有 pip 过期包
pip install `pip list --outdate | sed -n '3,$p' | awk '{print $1}'` --upgrade
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


### 卸载依赖库

```bash
pip uninstall 要卸载的包名
```


