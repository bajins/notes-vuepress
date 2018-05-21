首先centos7 默认已经不支持mysql，因为收费了你懂得，所以内部集成了mariadb，
而安装mysql的话会和mariadb的文件冲突，所以需要先卸载掉mariadb，以下为卸载mariadb，安装mysql的步骤。
列出所有被安装的rpm package 
```
rpm -qa | grep mariadb
```
#卸载
```
rpm -e mariadb-libs-5.5.56-2.el7.x86_64
```
#强制卸载，因为没有--nodeps
```
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
```
安装mysql依赖
```
yum -y install vim libaio
```
安装MySQL
下载yum源
```
# MySQL 8.0
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
# MySQL 5.7
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
# MySQL 5.7.22
wget https://cdn.mysql.com//Downloads/MySQL-5.7/mysql-community-server-5.7.22-1.el7.x86_64.rpm
```
5.7最新版本下载地址：https://dev.mysql.com/downloads/mysql/5.7.html#downloads
![](https://github.com/claer-ding/UseNotes/blob/master/images/MySQL-RPM%E4%B8%8B%E8%BD%BD.png)
安装yum源
```
yum -y localinstall mysql57-community-release-el7-11.noarch.rpm
```
检查yum源是否安装成功
```
yum repolist enabled | grep "mysql.*-community.*"
```
安装mysql
```
yum -y install mysql-community-server
```
更改MYSQL用户权限：
```
sudo chown -R root:root /var/lib/mysql
```
启动mysql并查看其状态
```
systemctl start mysqld
systemctl status mysqld
```
设置mysql为系统服务，随系统启动而启动
```
systemctl enable mysqld
systemctl daemon-reload
```
重启服务：
```
systemctl restart mysql
```
查看mysql下root账号的默认密码
mysql5.7安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql。
```
grep 'temporary password' /var/log/mysqld.log
```
其中=号后面部分就是默认密码

1、修改/etc/my.cnf，在 [mysqld] 小节下添加一行：skip-grant-tables=1
这一行配置让 mysqld 启动时不对密码进行验证

2、重启mysqld 服务：systemctl restart mysqld
3、使用 root 用户登录到 mysql -uroot
4、切换到mysql数据库，更新 user 表：
```
update user set authentication_string = password('123456'),password_expired = 'N', password_last_changed = now() where user = 'root';
```
在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string

5、修改远程主机连接权限：
指定mysql表，更新连接权限：
```
update user set host = '%' where user ='root';
```
查看是否更新成功，即host下面是否为%号：
```
select host, user from user;
```
最后，刷新MySQL的权限相关表：
```
flush privileges;
```
6、退出 mysql，编辑 /etc/my.cnf 文件，删除 skip-grant-tables=1的内容
7、重启mysqld 服务，再用新密码登录即可


-------------------------------------------------------------------------
MariaDB 远程连接：
#针对ip
```
create user 'root'@'192.168.10.10' identified by 'password';
```
#全部
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
```
#刷新权限表
```
flush privileges;
```
重启服务：
```
systemctl restart mysql
```
-------------------------------------------------------------------------

5.7以下修改密码 
修改密码有几种方式 
首先查看原有的配置 
```
select host,user,password from mysql.user;
```
使用set password for ‘用户名’@’主机名’=password(‘密码’)：
```
set password for 'root'@'localhost'=password('123456');
```
或者
使用update修改:
```
update user set password=PASSWORD("123456") where user='root';
```

设置远程访问：
```
grant all privileges on *.* to 'root'@'%' identified by'123456';
#或者
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
```
刷新MySQL的权限相关表
```
flush privileges;
```
重启mysql
```
service mysql restart
#或者
service mysqld restart
```
注意：初次安装设置密码时候一定要使用update修改密码，更改root密码。
这样使用localhost或者127.0.0.1时候密码都一样。否则很有可能不一样，导致不能使用，
如果数据库服务器和web等在一个服务器的时候，尽量使用localhost。
在linux下mysql使用localhost的时候使用的是unix套接字，而其他使用的是tcp/ip协议。

设置服务端编码：
```
vi /etc/my.cnf
```
添加到 [mysqld] 这个标志下面
```
character-set-server=utf8
```
---------------------------------------------------------
安装phpmyadmin：
```
yum -y install  phpMyAdmin
```
配置phpmyadmin：
```
cp /etc/phpMyAdmin/config.inc.php /usr/share/phpMyAdmin/
ln -s /usr/share/phpMyAdmin  /usr/local/nginx/html/pma
```
有时候会安装不成功，提示没有可用软件包，则需要安装Remi源 ：
yum install epel-release
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

或者直接下载使用：
```
wget https://files.phpmyadmin.net/phpMyAdmin/4.7.7/phpMyAdmin-4.7.7-all-languages.tar.gz
chown -R www:www /var/lib/php/session
```

-----------------------------------------------------------------------------------------------------------------------
# 编译安装
### 1、下载
官网链接：https://dev.mysql.com/downloads/mysql/5.7.html#downloads
![](https://github.com/claer-ding/UseNotes/blob/master/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

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
groupadd mysql
```
创建用户：
```shell
useradd -r -g mysql mysql
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

### 配置my.cnf
从5.7.17后mysql就没有默认的my_default.cnf文件，需要手动创建
```shell
cd /etc
cat>>my.cnf
```
输入以下内容，ctrl+D退出
```shell

# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html
# *** DO NOT EDIT THIS FILE. It's a template which will be copied to the
# *** default location during install, and will be replaced if you
# *** upgrade to a newer version of MySQL.

[mysqld]
# sql_mode = NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 

# 一般配置选项
basedir = /usr/local/mysql/
datadir = /usr/local/mysql/data
port = 3306
character-set-server = utf8
explicit_defaults_for_timestamp = true
# socket = /var/run/mysqld/mysqld.sock

#下面是可选项，要不要都行，如果出现启动错误，则全部注释掉，保留最基本的配置选项，然后尝试添加某些配置项后启动，检测配置项是否有误
back_log = 300
max_connections = 3000
max_connect_errors = 50
table_open_cache = 4096
max_allowed_packet = 32M
#binlog_cache_size = 4M

max_heap_table_size = 128M
read_rnd_buffer_size = 16M
sort_buffer_size = 16M
join_buffer_size = 16M
thread_cache_size = 16
query_cache_size = 128M
query_cache_limit = 4M
ft_min_word_len = 8

thread_stack = 512K
transaction_isolation = REPEATABLE-READ
tmp_table_size = 128M
#log-bin=mysql-bin
long_query_time = 6

server_id=1

innodb_buffer_pool_size = 1G
innodb_thread_concurrency = 16
innodb_log_buffer_size = 16M

innodb_log_file_size = 512M
innodb_log_files_in_group = 3
innodb_max_dirty_pages_pct = 90
innodb_lock_wait_timeout = 120
innodb_file_per_table = on

[mysqldump]
quick
max_allowed_packet = 32M

[mysql]
no-auto-rehash
default-character-set=utf8
safe-updates

[myisamchk]
key_buffer = 16M
sort_buffer_size = 16M
read_buffer = 8M
write_buffer = 8M

[mysqlhotcopy]
interactive-timeout

[mysqld_safe]
open-files-limit = 8192

[client]
/bin/bash: Q: command not found
```
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
```shell
SET password=password("root");
```
登录授权：
```shell
GRANT ALL PRIVILEGES on *.* to'root' @'%' IDENTIFIED BY 'root';
```
刷新授权：
``shell
FLUSH PRIVILEGES;
```
