# Python

## [Centos7安装Python3.7](./install.md)

# 更新pip
```shell
python -m pip install --upgrade pip
pip install --upgrade setuptools
pip install --user numpy scipy matplotlib jupyter pandas sympy nose
```

# 换源
```
阿里云 https://mirrors.aliyun.com/pypi/simple
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple
清华大学 https://pypi.tuna.tsinghua.edu.cn/simple

豆瓣(douban) http://pypi.douban.com/simple
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple
华中理工大学：http://pypi.hustunique.com
山东理工大学：http://pypi.sdutlinux.org
```
## 临时使用
#### 可以在使用pip的时候加参数-i https://pypi.tuna.tsinghua.edu.cn/simple
```shell
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests
# 使用豆瓣镜像源安装pandas
# --trusted-host pypi.douban.com 在不是HTTPS的时候加上使用
pip install matplotlib -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
pip install numpy -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
pip install pandas -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
pip install seaborn scipy  -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
```

## 永久修改
### Linux环境(Mac环境)
```shell
vi ~/.pip/pip.conf 
```
#### 添加或者修改
```shell
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```
### windows环境
#### 在资源管理器输入`%APPDATA%`如果没有pip文件夹，那么就直接在user目录中创建一个pip目录:
```shell
C:\Users\xx\pip\pip.ini
```
#### 加入
```shell
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```

