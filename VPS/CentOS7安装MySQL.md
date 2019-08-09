# CentOS7安装mysql

## [MySQL配置](/MySQL/配置.md)
## yum按装MySQL
### 这里参考了[海月博客](https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/)
首先centos7 默认已经不支持mysql，因为收费了你懂得，所以内部集成了mariadb，
而安装mysql的话会和mariadb的文件冲突，所以需要先卸载掉mariadb，以下为卸载mariadb，安装mysql的步骤。
列出所有被安装的rpm package 
```bash
rpm -qa | grep mariadb
```
### 卸载
```bash
rpm -e mariadb-libs-5.5.56-2.el7.x86_64
```
### 强制卸载，因为没有--nodeps
```bash
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
```
### 安装mysql依赖
```bash
yum -y install vim libaio
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
#### 检查yum源是否安装成功
```bash
yum repolist enabled | grep "mysql.*-community.*"
```
#### 可以看到这里默认启用了 MySQL 8.0 Community Server ，而我们需要安装的是 MySQL 5.7 Community Server，因此需要修改源设置：
```bash
vi /etc/yum.repos.d/mysql-community.repo
```
#### 找到mysql57-community节点：
```bash
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```
#### 将 enabled=0 改成 enabled=1 ，再找到mysql80-community节点：
```bash
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/7/$basearch/
enabled=1
gpgcheck=1
```
#### 将 enabled=1 改成 enabled=0 ，保存退出。

#### 现在查看 MySQL 各个系列默认的版本：
```bash
yum repolist enabled | grep "mysql.*-community.*"
```
#### 安装mysql
```bash
yum -y install mysql-community-server
```
#### 查看安装的 MySQL 版本：
```bash
mysqld -V
```
#### [配置MySQL](/MySQL/配置.md#yum安装配置)

### 更改MYSQL用户权限（按需执行）：
```bash
sudo chown -R root:root /var/lib/mysql
```
### 启动mysql并查看其状态
```bash
systemctl start mysqld
systemctl status mysqld
```
### 设置mysql为系统服务，随系统启动而启动
```bash
systemctl enable mysqld
systemctl daemon-reload
```
### 重启服务：
```bash
systemctl restart mysqld
```
[修改密码和设置远程连接](/MySQL/用户管理.md#安装MySQL后修改密码)


-----------------------------------------------------------------------------------------------------------------------
# 编译安装
### 1、下载
官网链接：https://dev.mysql.com/downloads/mysql/5.7.html#downloads
![](/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

```bash
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
```
### 解压
> 建议：不要安装到其它目录，否则数据库初始化的时候会报`cannot change dir`的错

```bash
tar zxvf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/mysql
# 重命名
mv mysql-5.7.22-linux-glibc2.12-x86_64 mysql
```

### 卸载系统自带mysql
#### 查看
```bash
rpm -qa | grep mysql
```
#### 卸载
```bash
rpm -e --nodeps softfullname
```
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

### 给mysql目录指定专有用户和用户组
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
./mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/ --lc_messages_dir=/usr/local/mysql/share --lc_messages=en_US
```
> 记住生成的临时密码,如果忘记密码或者想重新初始化，可以先将mysql/data目录中文件删除，然后再执行初始化命令

### [配置MySQL](/MySQL/配置.md#yum安装配置)

### 启动
```bash
cd /usr/local/mysql/bin
启动：./mysqld_safe --user=mysql &
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
#### 设为开机启动
```bash
chkconfig --add mysql
```
### service启动
```bash
重启服务：service mysql restart
停止服务：service mysql stop
启动服务：service mysql start
查看服务：service mysql status
```
### 登录mysql修改密码授权远程登录
```bash
cd /usr/local/mysql/bin
```
#### 登录
```bash
./mysql -u root -p  #输入临时密码
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


