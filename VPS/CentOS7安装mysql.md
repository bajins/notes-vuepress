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
```
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
