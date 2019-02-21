# Centos7安装Python3.7

## 源码安装
#### 全部操作都在`root`用户下执行
### 1.安装编译相关工具
```shell
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```
### 2.下载安装包解压
#### 到官网复制最新版下载地址 https://www.python.org/downloads/release
```shell
wget https://www.python.org/ftp/python/3.7.2/Python-3.7.2.tar.xz
tar -xvJf  Python-3.7.2.tar.xz
```
### 3.编译安装
```shell
# 创建编译安装目录
mkdir /usr/local/python3
cd Python-3.7.2
./configure --prefix=/usr/local/python3
make && make install > install.log
```
### 4.创建软连接
```shell
ln -s /usr/local/python3/bin/python3 /bin/python3
ln -s /usr/local/python3/bin/pip3 /bin/pip3
```
### 5.验证是否成功
```shell
python3 -V
pip3 -V
```

## yum安装Python3.6
### 1、安装EPEL和IUS软件源
```shell
yum -y install epel-release
yum -y install https://centos7.iuscommunity.org/ius-release.rpm
```
### 2、安装Python3.6
```shell
yum -y install python36u
```

### 3、创建python3连接符
```shell
ln -s /bin/python3.6 /bin/python3
```

### 4、安装pip3
```shell
yum -y install python36u-pip
```
### 5、创建pip3链接符
```shell
ln -s /bin/pip3.6 /bin/pip3
```













