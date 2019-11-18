# Python使用



* [安装新版](#安装新版)
  * [安装编译相关工具](#安装编译相关工具)
  * [下载安装包解压](#下载安装包解压)
  * [编译安装](#编译安装)
  * [创建软连接](#创建软连接)
  * [验证是否成功](#验证是否成功)
  * [安装后`yum`不能正常使用](#安装后yum不能正常使用)
* [pip](#pip)
  * [换源](#换源)
  * [生成依赖管理文件](#生成依赖管理文件)
  * [根据管理文件安装依赖](#根据管理文件安装依赖)
  * [更新](#更新)
  * [卸载库](#卸载库)
* [其他](#其他)
  * [输入参数](#输入参数)
  * [随机](#随机)









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

* [https://pypi.org/](https://pypi.org/)


* 阿里云 [https://mirrors.aliyun.com/pypi/simple](https://mirrors.aliyun.com/pypi/simple)
* 中国科技大学 [https://pypi.mirrors.ustc.edu.cn/simple](https://pypi.mirrors.ustc.edu.cn/simple)
* 清华大学 [https://pypi.tuna.tsinghua.edu.cn/simple](https://pypi.tuna.tsinghua.edu.cn/simple)

* 豆瓣(douban) [http://pypi.douban.com/simple](http://pypi.douban.com/simple)
* 中国科学技术大学 [http://pypi.mirrors.ustc.edu.cn/simple](http://pypi.mirrors.ustc.edu.cn/simple)
* 华中理工大学 [http://pypi.hustunique.com](http://pypi.hustunique.com)
* 山东理工大学 [http://pypi.sdutlinux.org](http://pypi.sdutlinux.org)


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

- **更新pip**

```bash
python -m pip install --upgrade pip setuptools
```

- 解决pip安装模块提示已经安装更高版本问题

```bash
pip3 install --ignore-installed 模块名
```

- **查看可更新的库**

```bash
pip list -o
pip list --outdated
# format有两个选项：columns(有表头), freeze(无表头), json
pip list --outdated --format=columns
```

- **更新单个库**

```bash
pip install --upgrade 要升级的包名
```

- **批量更新库**

* [使用pip升级所有包](https://www.codenong.com/2720014/)

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


