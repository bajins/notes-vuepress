# Centos7安装Python3.7

## 源码安装
#### 全部操作都在`root`用户下执行
### 1.安装编译相关工具
```bash
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```
### 2.下载安装包解压
#### 到官网复制最新版下载地址 https://www.python.org/downloads/release
```bash
wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tar.xz && tar -xvJf Python-3.7.3.tar.xz && cd Python-3.7.3
```
### 3.编译安装
```bash
# 创建编译安装目录，并配置指定安装路径
mkdir /usr/local/python3 && ./configure --prefix=/usr/local/python3
# 编译安装并把安装日志保存下来
make && make install > install.log
```
### 4.创建软连接
```bash
ln -s /usr/local/python3/bin/python3 /bin/python3
ln -s /usr/local/python3/bin/pip3 /bin/pip3
```
### 5.验证是否成功
```bash
python3 -V && pip3 -V
```

### 如果安装后出现yum不能正常使用
#### 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2` 
```bash
vi /usr/bin/yum 
```
#### 把 `#!/usr/bin/python` 修改为 `#!/usr/bin/python2`
```bash
vi /usr/libexec/urlgrabber-ext-down 
```

--------------------------------------------------------------------


## yum安装Python3.6
### 1、安装EPEL和IUS软件源
```bash
yum -y install epel-release
yum -y install https://centos7.iuscommunity.org/ius-release.rpm
```
### 2、安装Python3.6
```bash
yum -y install python36u
```

### 3、创建python3连接符
```bash
ln -s /bin/python3.6 /bin/python3
```

### 4、安装pip3
```bash
yum -y install python36u-pip
```
### 5、创建pip3链接符
```bash
ln -s /bin/pip3.6 /bin/pip3
```













