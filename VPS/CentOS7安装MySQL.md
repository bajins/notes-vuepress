# CentOS7安装MySQL

## 目录

* [yum按装](#yum按装)
  * [卸载](#卸载)
    * [查找残留目录](#查找残留目录)
  * [安装mysql依赖](#安装mysql依赖)
  * [安装MySQL](#安装mysql)
    * [下载yum源](#下载yum源)
    * [安装yum源](#安装yum源)
    * [查看所有MySQL版本](#查看所有mysql版本)
    * [修改源设置](#修改源设置)
    * [查看默认启用版本](#查看默认启用版本)
    * [安装mysql](#安装mysql)
    * [查看安装版本](#查看安装版本)
  * [更改MYSQL用户权限](#更改mysql用户权限)
  * [启动mysql并查看其状态](#启动mysql并查看其状态)
  * [设置开机启动](#设置开机启动)
  * [重启服务](#重启服务)
* [编译安装](#编译安装)
  * [下载](#下载)
  * [解压](#解压)
  * [创建用户组和用户](#创建用户组和用户)
    * [创建用户组](#创建用户组)
    * [创建用户](#创建用户)
    * [说明](#说明)
  * [指定专有用户和用户组](#指定专有用户和用户组)
    * [创建data目录](#创建data目录)
    * [指定用户和用户组](#指定用户和用户组)
  * [初始化mysql](#初始化mysql)
  * [启动](#启动)
  * [设为开机启动](#设为开机启动)
    * [授权](#授权)
    * [添加开机启动](#添加开机启动)
  * [service启动](#service启动)
  * [修改密码授权远程登录](#修改密码授权远程登录)
    * [登录](#登录)
    * [修改密码](#修改密码)
    * [创建用户并授权](#创建用户并授权)
    * [刷新授权](#刷新授权)




* [MySQL配置](/MySQL/配置.md)

## yum按装

* [https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)

* [https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/](https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/)

> 首先`CentOS7`默认已经不支持`mysql`，因为收费了你懂得，所以内部集成了`mariadb`，
> 而安装`mysql`的话会和`mariadb`的文件冲突，所以需要先卸载掉`mariadb`，以下为卸载`mariadb`，安装`mysql`的步骤。


### 卸载
```bash
# 查看软件包
rpm -qa | grep -i "mariadb\|mysql"
# --nodeps强制卸载
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64

# 检测系统是否存在mysql
yum list installed | grep mysql
# 删除mysql依赖项
yum remove -y mysql mysql-server mysql-libs mysql-server
```

#### 查找残留目录
```bash
whereis mysql
```

### 安装mysql依赖
```bash
yum -y install libaio glibc
```
### 安装MySQL
#### 下载yum源
```bash
# MySQL 8.0
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
```
#### 安装yum源
```bash
yum -y localinstall mysql80-community-release-el7-1.noarch.rpm
```
#### 查看所有MySQL版本
```bash
yum repolist all | grep mysql
```
> 可以看到这里默认启用了`MySQL 8.0 Community Server`，而我们需要安装的是`MySQL 5.7 Community Server`

#### 修改源设置

```bash
vi /etc/yum.repos.d/mysql-community.repo
```
- 找到mysql57-community节点

> 将`enabled=0`改成`enabled=1`

```bash
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```
- 找到`mysql80-community`节点

> 将`enabled=1`改成`enabled=0`

```bash
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/7/$basearch/
enabled=1
gpgcheck=1
```

- 或者使用命令
```bash
# 禁用MySQL版本
yum-config-manager --disable mysql80-community
# 启用MySQL版本
yum-config-manager --enable mysql57-community
```

#### 查看默认启用版本
```bash
yum repolist enabled | grep mysql
```

#### 安装mysql
```bash
yum -y install mysql-community-server
```
#### 查看安装版本
```bash
mysqld -V
```
* [配置MySQL](/MySQL/配置.md#yum安装配置)

### 更改MYSQL用户权限
```bash
sudo chown -R root:root /var/lib/mysql
```
### 启动mysql并查看其状态
```bash
systemctl start mysqld
systemctl status mysqld
```
### 设置开机启动
```bash
systemctl enable mysqld
systemctl daemon-reload
```
### 重启服务
```bash
systemctl restart mysqld
```
[修改密码和设置远程连接](/MySQL/用户管理.md#安装MySQL后修改密码)


## 编译安装

### 下载
* [https://dev.mysql.com/downloads/mysql/5.7.html#downloads](https://dev.mysql.com/downloads/mysql/5.7.html#downloads)

![](/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

### 解压
> 建议：不要安装到其它目录，否则数据库初始化的时候会报`cannot change dir`的错

```bash
tar zxvf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/mysql
# 重命名
mv mysql-5.7.22-linux-glibc2.12-x86_64 mysql
```

* [卸载系统自带mysql](#卸载)



### 创建用户组和用户

#### 创建用户组
```bash
group add mysql
```
#### 创建用户
```bash
user add -r -g mysql mysql
```
#### 说明

> 为了安全性，给mysql数据库创建专有用户，该用户只能访问mysql目录，不能访问系统其它目录
>
> 另外不建议直接用root初始化mysql，否则连接mysql时会报错：
> `[ERROR] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!`

### 指定专有用户和用户组
#### 创建data目录
```bash
cd /usr/local/mysql
mkdir data
```
#### 指定用户和用户组
```bash
cd /usr/local
chown -R mysql mysql/
chgrp -R mysql mysql/
```
> -R包含目录下所有和目录和文件

### 初始化mysql
```bash
cd /usr/local/mysql/bin
./mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ \
 --datadir=/usr/local/mysql/data/ --lc_messages_dir=/usr/local/mysql/share --lc_messages=en_US
```
> 记住生成的临时密码,如果忘记密码或者想重新初始化，可以先将mysql/data目录中文件删除，然后再执行初始化命令

* [配置MySQL](/MySQL/配置.md#yum安装配置)

### 启动
```bash
cd /usr/local/mysql/bin
# 启动
./mysqld_safe --user=mysql &
```
### 设为开机启动
```bash
cd /usr/local/mysql/support-files/
cp mysql.server /etc/init.d/mysql
vi /etc/init.d/mysql
```
> 将mysql目录填上
```bash
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data/
```
#### 授权
```bash
chmod +x /etc/init.d/mysql
```
#### 添加开机启动
```bash
chkconfig --add mysql
```
### service启动
```bash
# 重启服务
service mysql restart
# 停止服务
service mysql stop
# 启动服务
service mysql start
# 查看服务
service mysql status
```
### 修改密码授权远程登录
```bash
cd /usr/local/mysql/bin
```
#### 登录
```bash
# 输入临时密码
./mysql -u root -p
```
#### 修改密码
```sql
SET password=password("root");
```
#### 创建用户并授权
```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
```
#### 刷新授权
```sql
FLUSH PRIVILEGES;
```


