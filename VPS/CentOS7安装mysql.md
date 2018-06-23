## [MySQL配置](/MySQL/MySQL配置.md)
## yum按装MySQL
### 这里参考了[海月博客](https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/)
首先centos7 默认已经不支持mysql，因为收费了你懂得，所以内部集成了mariadb，
而安装mysql的话会和mariadb的文件冲突，所以需要先卸载掉mariadb，以下为卸载mariadb，安装mysql的步骤。
列出所有被安装的rpm package 
```shell
rpm -qa | grep mariadb
```
### 卸载
```shell
rpm -e mariadb-libs-5.5.56-2.el7.x86_64
```
### 强制卸载，因为没有--nodeps
```shell
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
```
### 安装mysql依赖
```shell
yum -y install vim libaio
```
### 安装MySQL
#### 下载yum源
```shell
# MySQL 8.0
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
```
#### 安装yum源
```shell
yum -y localinstall mysql-community-server-5.7.22-1.el7.x86_64.rpm
```
#### 检查yum源是否安装成功
```shell
yum repolist enabled | grep "mysql.*-community.*"
```
#### 可以看到这里默认启用了 MySQL 8.0 Community Server ，而我们需要安装的是 MySQL 5.7 Community Server，因此需要修改源设置：
```shell
vi /etc/yum.repos.d/mysql-community.repo
```
#### 找到mysql57-community节点：
```shell
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```
#### 将 enabled=0 改成 enabled=1 ，再找到mysql80-community节点：
```shell
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/7/$basearch/
enabled=1
gpgcheck=1
```
#### 将 enabled=1 改成 enabled=0 ，保存退出。

#### 现在查看 MySQL 各个系列默认的版本：
```shell
yum repolist enabled | grep "mysql.*-community.*"
```
#### 安装mysql
```shell
yum -y install mysql-community-server
```
#### 查看安装的 MySQL 版本：
```shell
mysqld -V
```
#### [配置MySQL](/MySQL/MySQL配置.md#yum安装配置)

### 更改MYSQL用户权限（按需执行）：
```shell
sudo chown -R root:root /var/lib/mysql
```
### 启动mysql并查看其状态
```shell
systemctl start mysqld
systemctl status mysqld
```
### 设置mysql为系统服务，随系统启动而启动
```shell
systemctl enable mysqld
systemctl daemon-reload
```
### 重启服务：
```shell
systemctl restart mysqld
```
### 使用默认密码进入修改密码：

#### 查看mysql下root账号的默认密码
##### mysql5.7安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql。
```shell
grep 'temporary password' /var/log/mysqld.log
```
##### 其中root@localhost:后面部分就是默认密码

#### 执行修改密码SQL命令
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```
#### 如果出现以下错误，就说明密码强度不够：
> ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

#### 需要修改以下两个参数：
```sql
set global validate_password_policy=0;
set global validate_password_length=自己想要的密码长度;
```
#### 再次执行修改密码SQL命令：
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```
#### 最后，刷新MySQL的权限相关表：
```shell
FLUSH PRIVILEGES;
```


### 修改配置修改密码：

#### 1、修改/etc/my.cnf，在 [mysqld] 小节下添加一行,修改密码完成后需要删除此行：
```shell
skip-grant-tables=1
```
##### 这一行配置让 mysqld 启动时不对密码进行验证

#### 2、重启mysqld 服务：
```shell
systemctl restart mysqld
```
#### 3、使用 root 用户登录到 
```shell
mysql -uroot
```
#### 4、切换到mysql数据库，更新 user 表：
```sql
update user set authentication_string = password('新密码'),password_expired = 'N', password_last_changed = now() where user = 'root';
```
##### 在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string



### 修改远程主机连接权限：

#### 指定mysql表，更新连接权限：
```sql
update user set host = '%' where user ='root';
```
#### 查看是否更新成功，即host下面是否为%号：
```sql
select host, user from user;
```
#### 最后，刷新MySQL的权限相关表：
```sql
FLUSH PRIVILEGES;
```
#### 重启服务，再用新密码登录即可：
```sell
systemctl restart mysqld
```
#### [放开MySQL防火墙端口](/VPS/linux命令.md#防火墙)

-------------------------------------------------------------------------
### MariaDB 远程连接：
#### 针对ip
```sql
create user 'root'@'192.168.10.10' identified by 'password';
```
#### 全部
```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
```
#### 刷新权限表
```sql
FLUSH PRIVILEGES;
```
#### 重启服务：
```sell
systemctl restart mysqld
```
-------------------------------------------------------------------------

### 5.7以下修改密码 
#### 修改密码有几种方式 

#### 首先查看原有的配置 
```sql
select host,user,password from mysql.user;
```
#### 使用set password for ‘用户名’@’主机名’=password(‘密码’)：
```sql
set password for 'root'@'localhost'=password('123456');
```
#### 或者使用update修改:
```sql
update user set password=PASSWORD("123456") where user='root';
```

#### 设置远程访问：
```sql
grant all privileges on *.* to 'root'@'%' identified by'123456';
#或者
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
```
#### 刷新MySQL的权限相关表
```sql
flush privileges;
```
#### 重启mysql
```sell
service mysql restart
#或者
service mysqld restart
```
注意：初次安装设置密码时候一定要使用update修改密码，更改root密码。
这样使用localhost或者127.0.0.1时候密码都一样。否则很有可能不一样，导致不能使用，
如果数据库服务器和web等在一个服务器的时候，尽量使用localhost。
在linux下mysql使用localhost的时候使用的是unix套接字，而其他使用的是tcp/ip协议。

#### 设置服务端编码：
```shell
vi /etc/my.cnf
```
#### 添加到 [mysqld] 这个标志下面
```shell
character-set-server=utf8
```

-----------------------------------------------------------------------------------------------------------------------
# 编译安装
### 1、下载
官网链接：https://dev.mysql.com/downloads/mysql/5.7.html#downloads
![](/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

```shell
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
```
### 解压:
建议：不要安装到其它目录，否则数据库初始化的时候会报cannot change dir的错
```shell
tar zxvf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/mysql
# 重命名
mv mysql-5.7.22-linux-glibc2.12-x86_64 mysql
```

### 卸载系统自带mysql
查看：
```shell
rpm -qa | grep mysql
```
卸载：
```shell
rpm -e --nodeps softfullname
```
### 创建用户组和用户
创建用户组：
```shell
group add mysql
```
创建用户：
```shell
user add -r -g mysql mysql
```
说明：

为了安全性，给mysql数据库创建专有用户，该用户只能访问mysql目录，不能访问系统其它目录

另外不建议直接用root初始化mysql，否则连接mysql时会报错：[ERROR] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!

### 给mysql目录指定专有用户和用户组
首先创建data目录：
```shell
cd /usr/local/mysql
mkdir data
```
指定用户和用户组：
```shell
cd /usr/local
chown -R mysql mysql/
chgrp -R mysql mysql/
```
-R包含目录下所有和目录和文件
### 初始化mysql
```shell
cd /usr/local/mysql/bin
./mysqld --initialize --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data/ --lc_messages_dir=/usr/local/mysql/share --lc_messages=en_US
```
记住生成的临时密码,如果忘记密码或者想重新初始化，可以先将mysql/data目录中文件删除，然后再执行初始化命令

### [配置MySQL](/MySQL/MySQL配置.md#yum安装配置)

### 启动
```shell
cd /usr/local/mysql/bin
启动：./mysqld_safe --user=mysql &
```
### 设为开机启动
```shell
cd /usr/local/mysql/support-files/
cp mysql.server /etc/init.d/mysql
vi /etc/init.d/mysql
```
将mysql目录填上：
```shell
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data/
```
授权：
```shell
chmod +x /etc/init.d/mysql
```
设为开机启动：
```shell
chkconfig --add mysql
```
### service启动
```shell
重启服务：service mysql restart
停止服务：service mysql stop
启动服务：service mysql start
查看服务：service mysql status
```
### 登录mysql修改密码授权远程登录
```shell
cd /usr/local/mysql/bin
```
登录：
```shell
./mysql -u root -p  #输入临时密码
```
修改密码：
```sql
SET password=password("root");
```
登录授权：
```sql
GRANT ALL PRIVILEGES on *.* to'root' @'%' IDENTIFIED BY 'root';
```
刷新授权：
``sql
FLUSH PRIVILEGES;
```
