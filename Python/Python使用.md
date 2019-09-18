# Python使用




* [CentOS7安装Python](#centos7安装python)
  * [源码安装](#源码安装)
    * [安装编译相关工具](#安装编译相关工具)
    * [下载安装包解压](#下载安装包解压)
    * [编译安装](#编译安装)
    * [创建软连接](#创建软连接)
    * [验证是否成功](#验证是否成功)
    * [安装后`yum`不能正常使用](#安装后yum不能正常使用)
  * [yum安装Python3.6](#yum安装python36)
    * [安装`EPEL`和`IUS`软件源](#安装epel和ius软件源)
    * [安装Python3.6](#安装python36)
    * [创建python3连接符](#创建python3连接符)
    * [安装pip3](#安装pip3)
    * [创建pip3链接符](#创建pip3链接符)
* [pip](#pip)
  * [生成依赖管理文件](#生成依赖管理文件)
  * [根据管理文件安装依赖](#根据管理文件安装依赖)
  * [更新](#更新)
  * [换源](#换源)
    * [临时使用](#临时使用)
    * [永久修改](#永久修改)
* [打包](#打包)
  * [`PyInstalle`](#pyinstalle)
    * [安装](#安装)
    * [生成单文件](#生成单文件)
    * [生成安装目录](#生成安装目录)
    * [静态文件处理](#静态文件处理)
    * [参数](#参数)
    * [问题](#问题)
  * [`py2exe`](#py2exe)
    * [`setup.py`](#setuppy)
* [其他](#其他)
  * [输入参数](#输入参数)






## CentOS7安装Python

### 源码安装
> 全部操作都在`root`用户下执行

#### 安装编译相关工具
```bash
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel \
 ncurses-devel sqlite-devel readline-devel tk-devel \
 gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```
#### 下载安装包解压
> 到官网复制最新版下载地址 https://www.python.org/downloads/release

```bash
wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz
# 解压
tar -xvJf Python-3.7.3.tar.xz
# 切换到解压目录
cd Python-3.7.3
```
#### 编译安装
```bash
# 创建编译安装目录，并配置指定安装路径
mkdir /usr/local/python3 && ./configure --prefix=/usr/local/python3
# 编译安装并把安装日志保存下来
make && make install > install.log
```
#### 创建软连接
```bash
ln -s /usr/local/python3/bin/python3 /bin/python3
ln -s /usr/local/python3/bin/pip3 /bin/pip3
```
#### 验证是否成功
```bash
python3 -V && pip3 -V
```

#### 安装后`yum`不能正常使用
- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`
 
```bash
vi /usr/bin/yum 
```
- 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`

```bash
vi /usr/libexec/urlgrabber-ext-down 
```



### yum安装Python3.6
#### 安装`EPEL`和`IUS`软件源
```bash
yum -y install epel-release
yum -y install https://centos7.iuscommunity.org/ius-release.rpm
```
#### 安装Python3.6
```bash
yum -y install python36u
```

#### 创建python3连接符
```bash
ln -s /bin/python3.6 /bin/python3
```

#### 安装pip3
```bash
yum -y install python36u-pip
```
#### 创建pip3链接符
```bash
ln -s /bin/pip3.6 /bin/pip3
```


## pip
### 生成依赖管理文件
```bash
pip freeze > requirements.txt
``` 

### 根据管理文件安装依赖
```bash
pip install -r requirements.txt
```

### 更新
```bash
python -m pip install --upgrade pip setuptools
```

- 解决pip安装模块提示已经安装更高版本问题
```bash
pip3 install --ignore-installed 模块名
```

### 换源

* [https://pypi.org/](https://pypi.org/)

```
阿里云 https://mirrors.aliyun.com/pypi/simple
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple
清华大学 https://pypi.tuna.tsinghua.edu.cn/simple

豆瓣(douban) http://pypi.douban.com/simple
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple
华中理工大学：http://pypi.hustunique.com
山东理工大学：http://pypi.sdutlinux.org
```
#### 临时使用
> 可以在使用pip的时候加参数`-i 网址`
>
> 注意如果不是`https`协议网址需要加`--trusted-host`参数

```batch
pip install -i http://pypi.douban.com/simple --trusted-host pypi.douban.com requests
```

#### 永久修改

- 使用命令
```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```


- 编辑文件
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





## 打包
### `PyInstalle`

> PyInstaller 是一个十分有用的第三方库，可以用来打包`Python`应用程序，打包完的程序就可以在没有安装`Python`解释器的机器上运行了。
>
> 它能够在`Windows`、`Linux`、`Mac OS X`等操作系统下将`Python`源文件打包，通过对源文件打包，
> `Python`程序可以在没有安装`Python`的环境中运行，也可以作为一个独立文件方便传递和管理。

> `PyInstaller`支持`Python 2.7`和`Python 3.4 +`。可以在`Windows`、`Mac OS X`和`Linux`上使用，
> 但是并不是跨平台的，而是说你要是希望打包成`.exe`文件，需要在`Windows`系统上运行`PyInstaller`进行打包工作。

* [https://github.com/pyinstaller](https://github.com/pyinstaller)

* [https://hoxis.github.io/python-pyinstaller.html](https://hoxis.github.io/python-pyinstaller.html)

#### 安装
```bash
pip install pyinstaller
```
#### 生成单文件
```bash
pyinstaller -F app.py
# windows打包为运行不显示命令行窗口的程序
pyinstaller -F -w -n=BajinsWallpaper app.py
```
#### 生成安装目录
> 此方式可借用其他第三方封包工具封装为exe安装程序，比如`NSIS`、`InnoSetup`
>
> 注意：执行命令前先将目录下`build`、`dist`目录删除，并将`spec`后缀的文件也删除

```bash
pyinstaller -D -w -n=BajinsWallpaper app.py
```

#### 静态文件处理

- 在`.spec`后缀文件中修改`datas=[]`

> 每一个文件用`(a,b)`进行描述，其中`a`是源文件，`b`是目标路径
> 也就是最终打包`exe`执行时，它需要把这些静态资源解压出来，那么解压到哪里呢就需要`b`来指定，它是一个文件夹

```bash
datas=[('view/imges/*', '.'), ('view/static/logo.png','view/static/')],
```
- 使用`--add-data`命令参数
> 其实就是修改`.spec`后缀文件中的`datas=[]`

> `;`前面是本地文件路径，后面是打包中所处的位置

```bash
--add-data view\static\*;view\static --add-data "list.txt;."
```

#### 参数

* [https://pyinstaller.readthedocs.io/en/latest/usage.html#options](https://pyinstaller.readthedocs.io/en/latest/usage.html#options)

- 通用参数

| 参数名              | 描述                             | 说明                                                                                |
|------------------|--------------------------------|-----------------------------------------------------------------------------------|
| -h               | 显示帮助                           | 无                                                                                 |
| -v               | 显示版本号                          | 无                                                                                 |
| –distpath        | 生成文件放在哪里                       | 默认：当前目录的dist文件夹内                                                                  |
| –workpath        | 生成过程中的中间文件放在哪里                 | 默认：当前目录的build文件夹内                                                                 |
| -y               | 如果dist文件夹内已经存在生成文件，则不询问用户，直接覆盖 | 默认：询问是否覆盖                                                                         |
| –upx-dir UPX_DIR | 指定upx工具的目录                     | 默认：execution path                                                                 |
| -a               | 不包含unicode支持                   | 默认：尽可能支持unicode                                                                   |
| –clean           | 在本次编译开始时，清空上一次编译生成的各种文件        | 默认：不清除                                                                            |
| –log-level LEVEL | 控制编译时pyi打印的信息                  | 一共有6个等级，由低到高分别为TRACE DEBUG INFO(默认) WARN ERROR CRITICAL。也就是默认清空下，不打印TRACE和DEBUG信息 |



- 与生成结果有关的参数

| 参数名       | 描述                  | 说明                                    |
|-----------|---------------------|---------------------------------------|
| -D        | 生成one-folder的程序（默认） | 生成结果是一个目录，各种第三方依赖、资源和exe同时存储在该目录      |
| -F        | 生成one-file的程序       | 生成结果是一个exe文件，所有的第三方依赖、资源和代码均被打包进该exe内 |
| –specpath | 指定.spec文件的存储路径      | 默认：当前目录                               |
| -n        | 生成的.exe文件和.spec的文件名 | 默认：用户脚本的名称，即main.py和main.spec         |



- 指定打包哪些资源、代码

| 参数名                   | 描述                            | 说明                                                               |
|-----------------------|-------------------------------|------------------------------------------------------------------|
| –add-data             | 打包额外资源                        | 用法：pyinstaller main.py --add-data=src;dest。windows以;分割，linux以:分割 |
| –add-binary           | 打包额外的代码                       | 用法：同–add-data。与–add-data不同的是，用binary添加的文件，pyi会分析它引用的文件并把它们一同添加进来 |
| -p                    | 指定额外的import路径，类似于使用PYTHONPATH | 参见PYTHONPATH                                                     |
| –hidden-import        | 打包额外py库                       | pyi在分析过程中，有些import没有正确分析出来，运行时会报import error，这时可以使用该参数           |
| –additional-hooks-dir | 指定用户的hook目录                   | hook用法参见其他，系统hook在PyInstaller\hooks目录下                           |
| –runtime-hook         | 指定用户runtime-hook              | 如果设置了此参数，则runtime-hook会在运行main.py之前被运行                           |
| –exclude-module       | 需要排除的module                   | pyi会分析出很多相互关联的库，但是某些库对用户来说是没用的，可以用这个参数排除这些库，有助于减少生成文件的大小         |
| –key                  | pyi会存储字节码，指定加密字节码的key         | 16位的字符串                                                          |



- 生成参数

| 参数名    | 描述                                | 说明                   |
|--------|-----------------------------------|----------------------|
| -d     | 执行生成的main.exe时，会输出pyi的一些log，有助于查错 | 默认：不输出pyi的log        |
| -s     | 优化符号表                             | 原文明确表示不建议在windows上使用 |
| –noupx | 强制不使用upx                          | 默认：尽可能使用。            |



- 其他

| 参数名             | 描述         | 说明          |
|-----------------|------------|-------------|
| –runtime-tmpdir | 指定运行时的临时目录 | 默认：使用系统临时目录 |



- Windows和Mac特有的参数

| 参数名 | 描述            | 说明                                |
|-----|---------------|-----------------------------------|
| -c  | 显示命令行窗口       | 与-w相反，默认含有此参数                     |
| -w  | 不显示命令行窗口      | 编写GUI程序时使用此参数有用。                  |
| -i  | 为main.exe指定图标 | pyinstaller -i beauty.ico main.py |

> 使用`-i`参数设置图标后，由于有缓存，需要移动一下生成的可执行程序的位置，才会显示自定义图标


- Windows特有的参数

| 参数名            | 描述           | 说明                                 |
|----------------|--------------|------------------------------------|
| –version-file  | 添加版本信息文件     | pyinstaller --version-file ver.txt |
| -m, --manifest | 添加manifest文件 | pyinstaller -m main.manifest       |
| -r RESOURCE    | 请参考原文        |                                    |
| –uac-admin     | 请参考原文        |                                    |
| –uac-uiaccess  | 请参考原文        |                                    |




#### 问题

- 多进程multiprocessing，我们需要创建一个模块
```python
import os
import sys
import multiprocessing
 
# Module multiprocessing is organized differently in Python 3.4+
try:
    # Python 3.4+
    if sys.platform.startswith('win'):
        import multiprocessing.popen_spawn_win32 as forking
    else:
        import multiprocessing.popen_fork as forking
except ImportError:
    import multiprocessing.forking as forking
 
if sys.platform.startswith('win'):
    # First define a modified version of Popen.
    class _Popen(forking.Popen):
        def __init__(self, *args, **kw):
            if hasattr(sys, 'frozen'):
                # We have to set original _MEIPASS2 value from sys._MEIPASS
                # to get --onefile mode working.
                os.putenv('_MEIPASS2', sys._MEIPASS)
            try:
                super(_Popen, self).__init__(*args, **kw)
            finally:
                if hasattr(sys, 'frozen'):
                    # On some platforms (e.g. AIX) 'os.unsetenv()' is not
                    # available. In those cases we cannot delete the variable
                    # but only set it to the empty string. The bootloader
                    # can handle this case.
                    if hasattr(os, 'unsetenv'):
                        os.unsetenv('_MEIPASS2')
                    else:
                        os.putenv('_MEIPASS2', '')
 
    # Second override 'Popen' class with our modified version.
    forking.Popen = _Popen
 
```


### `py2exe`

[http://www.py2exe.org/](http://www.py2exe.org/)

[https://hoxis.github.io/python-py2exe.html](https://hoxis.github.io/python-py2exe.html)

> `py2exe`是一个将`python`脚本转换成`Windows`上的可独立执行的可执行程序（`*.exe`）的工具，
> 这样就可以不用装`python`而在`Windows`系统上运行这个可执行程序

> `py2exe`新版本只支持`python3.3`以上，可以使用`pip install py2exe_py2`来安装兼容`python2`版本；
>
> 若在`python3.6`版本下运行报错，请切换到`python3.4`尝试；
>
> `python3`如果是`64 位`，生成的`exe`只能在`64 位`操作系统下运行，使用`32 位` `python`可以解决；
>
> 从`Python 3.3`，`Windows`在构建`Python`时使用的是`Visual Studio 2010`，因此生成后，
> 需要手动将`msvcr100.dll`拷到生成目录下（`dist`目录），否则最终的文件运行时可能会报错；
> 或者通过`data_files=[("",["MSVCR100.dll"])]`, 打包其中；


#### `setup.py`

```python

from distutils.core import setup
import py2exe
import sys
 
# 允许程序通过双击的形式执行。
sys.argv.append('py2exe')
 
py2exe_options = {
        # 需要包含的文件，这里的"sip"是PyQt程序打包时需要添加的，如果不是PyQt程序不需要此项。
        "includes": ["sip"],
        # 需要排除的dll文件，这里的"MSVCP90.dll"文件，
        # 如果不排除的话会报error: MSVCP90.dll: No such file or directory错误。
        "dll_excludes": ["MSVCP90.dll",],
        # 为1，则压缩文件
        "compressed": 1,
        # 为优化级别，默认为0。
        "optimize": 2,
        # 不自动包含encodings和codecs。
        "ascii": 0,
        """
        将程序打包成单文件（同时还会生成一个zip文件，可设置zipfile = None去除）。
        1：表示pyd和dll文件会被打包到单文件中，且不能从文件系统中加载python模块；
        2：表示pyd和dll文件会被打包到单文件中，但是可以从文件系统中加载python模块。
        64位的Py2exe不要添加本句。
        """
        "bundle_files": 1,
        }
 
setup(
      name = 'PyQt Demo',
      version = '1.0',
      """
      这里使用的是windows，即没有命令行窗口出现，如果使用console则表示有命令行窗口出现。
      "myico.ico"是程序图标
      """
      windows = [{ "script":'wordreplace.py',"icon_resources":[(1,"myico.ico")]}], 
      """
      把images目录中所有的jpg文件打包到dist/images子目录中。
      把public目录下的test.bat文件打包到dist/static子目录中。
      """
      data_files = [('images',['images\*.jpg']),('static',['public\\test.bat'])],
      # 如果没有此句，会生成一个`library.zip`文件。
      zipfile = None,
      options = {'py2exe': py2exe_options}
      )
```
> 执行该脚本，会得到一个build文件夹和一个dist文件夹。其中，dist文件夹，就是你得到的打包程序。

> 如果按照上述代码执行成功，则应该dist文件夹中，只包括程序的exe文件和`w9xpopen.exe`。`w9xpopen.exe`是针对`windows9x`版本的，
> 一般来说该文件并不需要。

> 如果`bundle_files`不为`1`、`2`，则`dist`文件夹中还会包括一些dll文件和pyd文件（`Python Dll`文件）。
> 如果`bundle_files`为`2`，`dist`文件夹会包括一个`python##.dll`文件，如果为1则不会。


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