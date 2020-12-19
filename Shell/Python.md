# Python


[[toc]]




## Flag

> 由于`Python`是动态编译的语言，和`C`/`C++`、`Java`或者`Kotlin`等静态语言不同，它是在运行时一句一句代码地边编译边执行的，
> 而`Java`是提前将高级语言编译成了`JVM`字节码，运行时直接通过JVM和机器打交道，所以进行密集计算时运行速度远高于动态编译语言。
> 但是根据`二八定律`（帕累托法则），有`80%`的计算资源只被`20%`的程序所使用，因此在大部分情况下，
> 原生的`CPython`解释器已经足够满足日常编程，加上很多科学计算库底层都是`C`/`C++`写的，一般不会用`Python`做密集计算。


> 当你从官网下载并安装好`Python`后，就自带了一个`CPython`解释器，是使用最广的`Python`解释器，
> 我们在终端使用`python xxx.py`命令就是调用的`CPython`解释器。

> `PyPy`使用了`JIT`（即时编译）技术，混合了动态编译和静态编译的特性，仍然是一句一句编译源代码，
> 但是会将翻译过的代码缓存起来以降低性能损耗。相对于静态编译代码，即时编译的代码可以处理延迟绑定并增强安全性。

+ [https://github.com/topics/python](https://github.com/topics/python)
+ [https://github.com/python](https://github.com/python)
    + [https://www.python.org](https://www.python.org)
    + [https://docs.python.org/zh-cn](https://docs.python.org/zh-cn)
    + [https://www.python.org/ftp/python](https://www.python.org/ftp/python)
    + [http://npm.taobao.org/mirrors/python](http://npm.taobao.org/mirrors/python)

* [GO-Node-Python的简单性能比较](https://www.izhongxia.com/posts/64310.html)
* 内置函数 [https://docs.python.org/zh-cn/3/library/functions.html](https://docs.python.org/zh-cn/3/library/functions.html)
* 内置异常 [https://docs.python.org/zh-cn/3/library/exceptions.html](https://docs.python.org/zh-cn/3/library/exceptions.html)
* [内置异常和函数-LeaCoder](https://lichangke.github.io/category/#python)
* [Python语言小册](https://python.fasionchan.com/zh_CN/latest/index.html)
* 最良心的 Python 教程 [https://github.com/TwoWater/Python](https://github.com/TwoWater/Python)
* [https://github.com/xxg1413/python](https://github.com/xxg1413/python)
* [https://github.com/yidao620c/python3-cookbook](https://github.com/yidao620c/python3-cookbook)
* [https://github.com/eastlakeside/interpy-zh](https://github.com/eastlakeside/interpy-zh)
* [https://github.com/cloga/scipy-lecture-notes_cn](https://github.com/cloga/scipy-lecture-notes_cn)
* [https://www.junmajinlong.com/python/index](https://www.junmajinlong.com/python/index)
* [https://zmister.com](https://zmister.com)
* [python3基础教程](https://morvanzhou.github.io/tutorials/python-basic/basic)
* Python中的设计模式和习惯用法的集合 [https://github.com/faif/python-patterns](https://github.com/faif/python-patterns)
* Python中文网 [https://www.cnpython.com](https://www.cnpython.com)
* [https://hellopython.readthedocs.io](https://hellopython.readthedocs.io)
    * [https://github.com/meizhaohui/vueblog](https://github.com/meizhaohui/vueblog)

+ [深挖python上下文管理——类的__init__、__enter__、__exit__、__del__在with下的表现](https://blog.csdn.net/qq_27884799/article/details/101535569)
+ [深入理解 Python 中的上下文管理器](https://www.cnblogs.com/wongbingming/p/10519553.html)

```python
test = Test() # 触发__del__
with Test() as t: # 触发__exit__
    pass
```

- 纯真IP数据库 [https://github.com/animalize/qqwry-python3](https://github.com/animalize/qqwry-python3)



## 第三方库

+ [https://github.com/jobbole/awesome-python-cn](https://github.com/jobbole/awesome-python-cn)
+ [https://github.com/vinta/awesome-python](https://github.com/vinta/awesome-python)
+ [Python 常用的标准库以及第三方库有哪些？](https://www.zhihu.com/question/20501628/answers/updated)

* [Python图像处理库—-Pillow](https://www.lizenghai.com/archives/17611.html)
* 基于异步库 [https://github.com/aio-libs](https://github.com/aio-libs)
* [https://github.com/psf/requests](https://github.com/psf/requests)
    * [https://github.com/requests](https://github.com/requests)
    * [https://github.com/not-kennethreitz](https://github.com/not-kennethreitz)
* [https://github.com/urllib3/urllib3](https://github.com/urllib3/urllib3)
* Python的下一代HTTP客户端 [https://github.com/encode/httpx](https://github.com/encode/httpx)
* 简单的Python日志记录 [https://github.com/Delgan/loguru](https://github.com/Delgan/loguru)
* [https://github.com/jpadilla/pyjwt](https://github.com/jpadilla/pyjwt)
* [https://github.com/Arronlong/py_scripts](https://github.com/Arronlong/py_scripts)
* Python字节码反汇编器/反编译器 [https://github.com/zrax/pycdc](https://github.com/zrax/pycdc)
* [https://github.com/pyexcel](https://github.com/pyexcel)
* [https://github.com/jmcnamara/XlsxWriter](https://github.com/jmcnamara/XlsxWriter)
* [https://foss.heptapod.net/openpyxl/openpyxl](https://foss.heptapod.net/openpyxl/openpyxl)
    * [https://openpyxl.readthedocs.io](https://openpyxl.readthedocs.io)
* [https://github.com/mhammond/pywin32](https://github.com/mhammond/pywin32)
    * [winreg --- Windows 注册表访问](https://docs.python.org/zh-cn/3/library/winreg.html)
* 简繁转换 [https://github.com/gumblex/zhconv](https://github.com/gumblex/zhconv)
* 開放中文轉換 [https://github.com/BYVoid/OpenCC](https://github.com/BYVoid/OpenCC)
* [https://github.com/pyecharts/pyecharts](https://github.com/pyecharts/pyecharts)


- 交互式计算 [https://github.com/ipython](https://github.com/ipython)
- 纠正以前的控制台命令中的错误 [https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck)
- 命令行HTTP客户端 [https://github.com/jakubroztocil/httpie](https://github.com/jakubroztocil/httpie)
- [https://github.com/topics/expect](https://github.com/topics/expect)
    - [https://www.nist.gov/services-resources/software/expect](https://www.nist.gov/services-resources/software/expect)
    - [https://github.com/clarkwang/sexpect](https://github.com/clarkwang/sexpect)
    - 自动化交互式 [https://github.com/pexpect/pexpect](https://github.com/pexpect/pexpect)
    - [https://github.com/pytest-dev/pytest](https://github.com/pytest-dev/pytest)
    - [https://github.com/jacebrowning/pytest-expecter](https://github.com/jacebrowning/pytest-expecter)
- [https://github.com/topics/ops](https://github.com/topics/ops)
- [https://github.com/topics/automation](https://github.com/topics/automation)



**HTML文档解析**

- Beautiful Soup 4 的中文文档 [https://github.com/DeronW/beautifulsoup](https://github.com/DeronW/beautifulsoup)
    - [https://beautifulsoup.readthedocs.io](https://beautifulsoup.readthedocs.io)
- [https://github.com/html5lib/html5lib-python](https://github.com/html5lib/html5lib-python)
- 类似于jQuery的python库 [https://github.com/gawel/pyquery](https://github.com/gawel/pyquery)
- [https://github.com/lxml/lxml](https://github.com/lxml/lxml)
- [https://github.com/psf/requests-html](https://github.com/psf/requests-html)
- [https://github.com/scrapy/parsel](https://github.com/scrapy/parsel)



## Jupyter Notebook

+ [https://github.com/jupyterlab/jupyterlab](https://github.com/jupyterlab/jupyterlab)
+ [https://github.com/jupyter](https://github.com/jupyter)
    + [https://jupyter.org](https://jupyter.org)
    + [https://zh.wikipedia.org/wiki/Jupyter](https://zh.wikipedia.org/wiki/Jupyter)
+ [https://github.com/markusschanta/awesome-jupyter](https://github.com/markusschanta/awesome-jupyter)
    + [https://github.com/jupyterhub](https://github.com/jupyterhub)
        + [https://mybinder.org](https://mybinder.org)
        + [https://notebooks.gesis.org](https://notebooks.gesis.org)

* [https://github.com/Kaggle](https://github.com/Kaggle)
    * [https://www.kaggle.com](https://www.kaggle.com)
        * [https://github.com/Kaggle/kaggle-api#kernels](https://github.com/Kaggle/kaggle-api#kernels)
        * [https://github.com/Kaggle/kaggle-api#installation](https://github.com/Kaggle/kaggle-api#installation)
        * [资源默认分配](https://www.kaggle.com/docs/notebooks#technical-specifications)
    * [GitHub等海外大文件快速中转下载](https://mp.weixin.qq.com/s/DH8jXalZiBcX3KhrPdDw8w)
* [https://github.com/googlecolab](https://github.com/googlecolab)
    * [https://colab.research.google.com](https://colab.research.google.com)
* [https://console.cloud.google.com/ai-platform/notebooks](https://console.cloud.google.com/ai-platform/notebooks)
* CoCalc [https://cocalc.com](https://cocalc.com)
* Azure Notebooks [https://notebooks.azure.com](https://notebooks.azure.com)
    * [Azure Notebooks 预览版概述](https://docs.microsoft.com/zh-cn/azure/notebooks/azure-notebooks-overview)
* [https://deepnote.com](https://deepnote.com)
* [https://datalore.jetbrains.com](https://datalore.jetbrains.com)
* [https://www.floydhub.com](https://www.floydhub.com)
* [https://github.com/rstudio](https://github.com/rstudio)
    * [https://rstudio.cloud/plans/free](https://rstudio.cloud/plans/free)
* 阿里天池大数据 [https://tianchi.aliyun.com](https://tianchi.aliyun.com)
* 科赛和鲸 K-lab [https://www.kesci.com](https://www.kesci.com)
* [https://aistudio.baidu.com](https://aistudio.baidu.com)
* [https://momodel.cn](https://momodel.cn)
* [https://www.huaweicloud.com/product/modelarts.html](https://www.huaweicloud.com/product/modelarts.html)



## 人工智能

> 深度学习是神经网络的深层神经网络。强化学习是独立于机器学习之外的分支，强化学习严格来说不属于机器学习，
> 机器学习的任务是通过已知的训练集来学习目标函数，而强化学习不需要训练集。

- 机器学习：一切通过优化方法挖掘数据中规律的学科。
- 深度学习：一切运用了神经网络作为参数结构进行优化的机器学习算法。学习过程是静态的，训练样本是有标签的
- 强化学习：不仅能利用现有数据，还可以通过对环境的探索获得新数据，并利用新数据循环往复地更新迭代现有模型的机器学习算法。学习过程是动态的，训练是没有标签的
- 深度强化学习：一切运用了神经网络作为参数结构进行优化的强化学习算法。

+ [https://github.com/topics/machine-learning](https://github.com/topics/machine-learning)
+ [https://github.com/topics/deep-learning](https://github.com/topics/deep-learning)
+ [https://github.com/topics/neural-network](https://github.com/topics/neural-network)
+ [https://github.com/topics/computer-vision](https://github.com/topics/computer-vision)
+ ncnn推理 [https://github.com/topics/ncnn](https://github.com/topics/ncnn)
+ torch推理 [https://github.com/topics/pytorch](https://github.com/topics/pytorch)


* [https://github.com/Tencent/ncnn](https://github.com/Tencent/ncnn)
* [https://github.com/onnx/onnx](https://github.com/onnx/onnx)
* [https://github.com/ARM-software/ComputeLibrary](https://github.com/ARM-software/ComputeLibrary)
* [https://github.com/apache/incubator-mxnet](https://github.com/apache/incubator-mxnet)
* [https://github.com/apache/incubator-systemml](https://github.com/apache/incubator-systemml)
* [https://github.com/tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)
* [https://github.com/Microsoft/CNTK](https://github.com/Microsoft/CNTK)
* [https://github.com/deepmind/lab](https://github.com/deepmind/lab)
* [https://github.com/pytorch/pytorch](https://github.com/pytorch/pytorch)
* [https://github.com/scikit-learn/scikit-learn](https://github.com/scikit-learn/scikit-learn)
* [https://github.com/xianyi/OpenBLAS](https://github.com/xianyi/OpenBLAS)
* [https://github.com/Theano/Theano](https://github.com/Theano/Theano)
* [https://github.com/intel/caffe](https://github.com/intel/caffe)
* [https://github.com/BVLC/caffe](https://github.com/BVLC/caffe)
* [https://github.com/torch/torch7](https://github.com/torch/torch7)
* crnn [https://github.com/meijieru/crnn.pytorch](https://github.com/meijieru/crnn.pytorch)
* chineseocr [https://github.com/chineseocr/chineseocr](https://github.com/chineseocr/chineseocr)
* Psenet [https://github.com/WenmuZhou/PSENet.pytorch](https://github.com/WenmuZhou/PSENet.pytorch)
* 语言模型实现 [https://github.com/lukhy/masr](https://github.com/lukhy/masr)

- [https://github.com/opencv](https://github.com/opencv)
    - [https://github.com/skvark/opencv-python](https://github.com/skvark/opencv-python)
- [https://github.com/ainize-team](https://github.com/ainize-team)
    - [![Run on Ainize](https://ainize.ai/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=https://github.com/alisen39/TrWebOCR)
- [https://github.com/d2l-ai](https://github.com/d2l-ai)



**OCR**

+ [https://github.com/topics/ocr](https://github.com/topics/ocr)
+ [https://github.com/search?q=ocr](https://github.com/search?q=ocr)


- `ImportError: libGL.so.1: cannot open shared object file: No such file or directory`
    - `apt install libgl1-mesa-glx` debian
    - `yum install mesa-libGL-devel` centos


* [https://github.com/alisen39/TrWebOCR](https://github.com/alisen39/TrWebOCR)
    * `pip3 install libtorch numpy opencv-python Pillow tornado`
* [https://github.com/ianzhao05/textshot](https://github.com/ianzhao05/textshot)
* [https://github.com/ouyanghuiyu/chineseocr_lite](https://github.com/ouyanghuiyu/chineseocr_lite)
    * `pip3 install tornado numpy opencv_python onnxruntime Shapely pyclipper Pillow`
* [https://github.com/tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract)
* [https://github.com/PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR)




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

* [https://github.com/pypa/pip](https://github.com/pypa/pip)
    * [https://pypi.org](https://pypi.org)
* [https://packaging.python.org/tutorials/installing-packages](https://packaging.python.org/tutorials/installing-packages)
* [Python包管理工作流](https://frostming.com/2018/09-14/python-packaging-flow)

- `sudo apt install python3-pip`

* Anaconda [https://github.com/ContinuumIO](https://github.com/ContinuumIO) 科学包及其依赖项的发行版本
* [https://github.com/conda/conda](https://github.com/conda/conda) 包及其依赖项和环境的管理工具
* [https://github.com/jazzband/pip-tools](https://github.com/jazzband/pip-tools)
* [https://github.com/python-poetry/poetry](https://github.com/python-poetry/poetry)
* [https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)
* [https://github.com/asdf-vm/asdf](https://github.com/asdf-vm/asdf)
    * [https://github.com/danhper/asdf-python](https://github.com/danhper/asdf-python)
* [https://github.com/frostming/pdm](https://github.com/frostming/pdm)
* [https://bitbucket.org/virtualenvwrapper/virtualenvwrapper](https://bitbucket.org/virtualenvwrapper/virtualenvwrapper)
* [https://github.com/davidmarble/virtualenvwrapper-win](https://github.com/davidmarble/virtualenvwrapper-win)



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


