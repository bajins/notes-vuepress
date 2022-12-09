# MySQL安装配置


[[toc]]


## Flag

* [https://github.com/mysql](https://github.com/mysql)
* [https://dev.mysql.com/downloads/mysql](https://dev.mysql.com/downloads/mysql)


- [如何在 Ubuntu 20.04 上安装 MySQL](https://linuxize.com/post/how-to-install-mysql-on-ubuntu-20-04)
- [ubuntu20 使用命令安装 mysql](https://www.cnblogs.com/cnwcl/p/13785655.html)
- [ubuntu20 安装和配置mysql8.0.23](https://segmentfault.com/a/1190000039203507)
- [ubuntu20安装mysql8](https://www.jianshu.com/p/9e69e0e38665)
- [ubuntu20.04安装mysql8.0](https://blog.csdn.net/lduzhenlin/article/details/113243476)

> 在MySQL 8.0上，`auth_socket`默认情况下，root用户通过插件进行身份验证。该auth_socket插件对localhost通过Unix套接字文件
> 从进行连接的用户进行身份验证。这意味着您不能通过提供密码来以root用户身份进行身份验证。


## Windows版安装

> 这里是介绍免安装版的Mysql

1. 安装服务：`mysqld --install` 如果执行错误需要安装C++运行库
2. 初始化：`mysqld --initialize --console` 会产生一个随机密码
    - `mysqld –initialize-insecure` 初始化数据库，并设置默认root密码为空
    - `mysqladmin -u root password 密码";` 创建root用户的密码
3. 开启服务：`net start mysql`
4. 关闭服务：`net stop mysql`
5. 登录mysql：`mysql -u root -p`
6. 修改密码：`alter user 'root'@'localhost' identified by '密码';`
7. 标记删除mysql服务：`sc delete mysql`



## CentOS安装

### yum安装

* [https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en)
* [https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/](https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql)

> 首先`CentOS7`默认已经不支持`mysql`，因为收费了你懂得，所以内部集成了`mariadb`，
> 而安装`mysql`的话会和`mariadb`的文件冲突，所以需要先卸载掉`mariadb`，以下为卸载`mariadb`，安装`mysql`的步骤。


**卸载**

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

- 查找残留目录

```bash
whereis mysql
```

**安装依赖**

```bash
yum -y install libaio glibc
```

**下载yum源**

```bash
# MySQL 8.0
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
```

**安装yum源**

```bash
yum -y localinstall mysql80-community-release-el7-1.noarch.rpm
```

**查看所有版本**

```bash
yum repolist all | grep mysql
```

> 可以看到这里默认启用了`MySQL 8.0 Community Server`，而我们需要安装的是`MySQL 5.7 Community Server`

**修改源设置**

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

**查看默认启用版本**

```bash
yum repolist enabled | grep mysql
```

**安装**

```bash
yum -y install mysql-community-server
```

**查看安装版本**

```bash
mysqld -V
```


### 编译安装

**下载**

* [https://dev.mysql.com/downloads/mysql/5.7.html#downloads](https://dev.mysql.com/downloads/mysql/5.7.html#downloads)

![](/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

**解压**

> 建议：不要安装到其它目录，否则数据库初始化的时候会报`cannot change dir`的错

```bash
tar zxvf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/mysql
# 重命名
mv mysql-5.7.22-linux-glibc2.12-x86_64 mysql
```


**创建用户组**

```bash
group add mysql
```

**创建用户**

```bash
user add -r -g mysql mysql
```

- 为了安全性，给mysql数据库创建专有用户，该用户只能访问mysql目录，不能访问系统其它目录

- 另外不建议直接用root初始化mysql，否则连接mysql时会报错：

> `[ERROR] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!`

**创建data目录**

```bash
cd /usr/local/mysql
mkdir data
```

**指定用户和用户组**

```bash
cd /usr/local
chown -R mysql mysql/
chgrp -R mysql mysql/
```

> `-R`包含目录下所有和目录和文件

**初始化**

```bash
cd /usr/local/mysql/bin

./mysqld --initialize --user=mysql \
--basedir=/usr/local/mysql/ \
--datadir=/usr/local/mysql/data/ \
--lc_messages_dir=/usr/local/mysql/share \
--lc_messages=en_US
```

> 记住生成的临时密码,如果忘记密码或者想重新初始化，可以先将`mysql/data`目录中文件删除，然后再执行初始化命令


**启动**

```bash
cd /usr/local/mysql/bin
# 启动
./mysqld_safe --user=mysql &
```

**设为开机启动**

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

**授权**

```bash
chmod +x /etc/init.d/mysql
```

**添加开机启动**

```bash
chkconfig --add mysql
```

**service启动**

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



## 配置

* 5.7动态参数 [5.7 Dynamic System Variables](https://dev.mysql.com/doc/refman/5.7/en/dynamic-system-variables.html)
* 8.0动态参数 [8.0 Dynamic System Variables](https://dev.mysql.com/doc/refman/8.0/en/dynamic-system-variables.html)
    * [https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html](https://dev.mysql.com/doc/refman/8.0/en/innodb-parameters.html)
    * `set persist` 修改并持久化动态参数
    * `set persist_only` 持久化静态参数
* [服务器系统变量 - 官网](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html)


> 从5.7.17后mysql就没有默认的`my_default.cnf`文件，需要手动创建

> windows在mysql目录下创建一个ini或cnf配置文件

```bash
vi /etc/my.cnf
```

> 按`i`后输入以下内容

```conf
[mysqld]
# sql_mode = NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 

# 一般配置选项
basedir = /usr/local/mysql/
datadir = /usr/local/mysql/data
port = 3306
character-set-server = utf8
explicit_defaults_for_timestamp = true
# socket = /var/run/mysqld/mysqld.sock
# 0：区分大小写，1：不区分大小写
lower_case_table_names =1

#下面是可选项，要不要都行，如果出现启动错误，则全部注释掉，
#保留最基本的配置选项，然后尝试添加某些配置项后启动，检测配置项是否有误
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

# 默认开启事件调度器ON或者是1
event_scheduler=ON
thread_stack = 512K
#默认是REPEATABLE-READ，改成读已提交
transaction-isolation=READ-COMMITTED
#永久设置手动提交事务
#autocommit=0
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

```

### yum安装配置

```conf
[client]
#password   = your_password
port        = 3306
socket      = /var/lib/mysql/mysql.sock

[mysqld]
port        = 3306
socket      = /var/lib/mysql/mysql.sock
datadir = /var/lib/mysql
symbolic-links= 0
log-error= /var/log/mysqld.log
pid-file= /var/run/mysqld/mysqld.pid
skip-external-locking
performance_schema_max_table_instances=400
table_definition_cache=400
key_buffer_size = 32M
max_allowed_packet = 100G
table_open_cache = 128
sort_buffer_size = 768K
net_buffer_length = 8K
read_buffer_size = 768K
read_rnd_buffer_size = 512K
myisam_sort_buffer_size = 8M
thread_cache_size = 16
query_cache_size = 16M
tmp_table_size = 32M
sql-mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

explicit_defaults_for_timestamp = true
#skip-networking
max_connections = 500
max_connect_errors = 100
open_files_limit = 65535

# 0：区分大小写，1：不区分大小写
lower_case_table_names =1
# 默认开启事件调度器ON或者是1
event_scheduler=ON

thread_stack = 512K
#默认是REPEATABLE-READ，改成读已提交
transaction-isolation=READ-COMMITTED
#永久设置手动提交事务
#autocommit=0
tmp_table_size = 128M
#注释掉之后，会关闭binlog日志
log-bin=mysql-bin
#注释掉之后，会关闭binlog日志
binlog_format=mixed

# 数据库ID号,为1时表示为Master,其中master_id必须为1到232–1
# 之间的一个正整数值，主从server-id不能一样;
server-id = 1
#自动删除5天前的日志。默认值为0，表示从不删除。
expire_logs_days = 5
slow_query_log=1
slow-query-log-file=/var/lib/mysql/mysql-slow.log
long_query_time=3
#log_queries_not_using_indexes=on

# MySQL5.7.11拥有，默认值为keyring_file，
# InnoDB表空间在初始化InnoDB之前需要此插件来加密，
# MySQL5.7.12及以后此参数默认为空
#early-plugin-load = ""

#loose-innodb-trx=0
#loose-innodb-locks=0
#loose-innodb-lock-waits=0
#loose-innodb-cmp=0
#loose-innodb-cmp-per-index=0
#loose-innodb-cmp-per-index-reset=0
#loose-innodb-cmp-reset=0
#loose-innodb-cmpmem=0
#loose-innodb-cmpmem-reset=0
#loose-innodb-buffer-page=0
#loose-innodb-buffer-page-lru=0
#loose-innodb-buffer-pool-stats=0
#loose-innodb-metrics=0
#loose-innodb-ft-default-stopword=0
#loose-innodb-ft-inserted=0
#loose-innodb-ft-deleted=0
#loose-innodb-ft-being-deleted=0
#loose-innodb-ft-config=0
#loose-innodb-ft-index-cache=0
#loose-innodb-ft-index-table=0
#loose-innodb-sys-tables=0
#loose-innodb-sys-tablestats=0
#loose-innodb-sys-indexes=0
#loose-innodb-sys-columns=0
#loose-innodb-sys-fields=0
#loose-innodb-sys-foreign=0
#loose-innodb-sys-foreign-cols=0

default_storage_engine = InnoDB
innodb_data_home_dir = /var/lib/mysql
innodb_data_file_path = ibdata1:10M:autoextend
innodb_log_group_home_dir = /var/lib/mysql
innodb_buffer_pool_size = 128M
innodb_log_file_size = 64M
innodb_log_buffer_size = 16M
innodb_flush_log_at_trx_commit = 1
innodb_lock_wait_timeout = 120
innodb_max_dirty_pages_pct = 90
innodb_read_io_threads = 3
innodb_write_io_threads = 3

[mysqldump]
quick
max_allowed_packet = 16M

[mysql]
no-auto-rehash

[myisamchk]
key_buffer_size = 32M
sort_buffer_size = 768K
read_buffer = 2M
write_buffer = 2M

[mysqlhotcopy]
interactive-timeout
```


### 宝塔面板安装配置

```conf
[client]
#password   = your_password
port        = 3306
socket      = /tmp/mysql.sock

[mysqld]
port        = 3306
socket      = /tmp/mysql.sock
datadir = /usr/local/mysql/data
skip-external-locking
performance_schema_max_table_instances=400
table_definition_cache=400
key_buffer_size = 32M
max_allowed_packet = 100G
table_open_cache = 128
sort_buffer_size = 768K
net_buffer_length = 8K
read_buffer_size = 768K
read_rnd_buffer_size = 512K
myisam_sort_buffer_size = 8M
thread_cache_size = 16
query_cache_size = 16M
tmp_table_size = 32M
sql-mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES

explicit_defaults_for_timestamp = true
#skip-networking
max_connections = 500
max_connect_errors = 100
open_files_limit = 65535

# 0：区分大小写，1：不区分大小写
lower_case_table_names =1
# 默认开启事件调度器ON或者是1
event_scheduler=ON

thread_stack = 512K
#默认是REPEATABLE-READ，改成读已提交
transaction-isolation=READ-COMMITTED
#永久设置手动提交事务
#autocommit=0
tmp_table_size = 128M
#注释掉之后，会关闭binlog日志
log-bin=mysql-bin
#注释掉之后，会关闭binlog日志
binlog_format=mixed
server-id = 1
#自动删除5天前的日志。默认值为0，表示从不删除。
expire_logs_days = 5
slow_query_log=1
slow-query-log-file=/usr/local/mysql/data/mysql-slow.log
long_query_time=3
#log_queries_not_using_indexes=on
# MySQL5.7.11拥有，默认值为keyring_file，
# InnoDB表空间在初始化InnoDB之前需要此插件来加密，
# MySQL5.7.12及以后此参数默认为空
#early-plugin-load = ""

#loose-innodb-trx=0
#loose-innodb-locks=0
#loose-innodb-lock-waits=0
#loose-innodb-cmp=0
#loose-innodb-cmp-per-index=0
#loose-innodb-cmp-per-index-reset=0
#loose-innodb-cmp-reset=0
#loose-innodb-cmpmem=0
#loose-innodb-cmpmem-reset=0
#loose-innodb-buffer-page=0
#loose-innodb-buffer-page-lru=0
#loose-innodb-buffer-pool-stats=0
#loose-innodb-metrics=0
#loose-innodb-ft-default-stopword=0
#loose-innodb-ft-inserted=0
#loose-innodb-ft-deleted=0
#loose-innodb-ft-being-deleted=0
#loose-innodb-ft-config=0
#loose-innodb-ft-index-cache=0
#loose-innodb-ft-index-table=0
#loose-innodb-sys-tables=0
#loose-innodb-sys-tablestats=0
#loose-innodb-sys-indexes=0
#loose-innodb-sys-columns=0
#loose-innodb-sys-fields=0
#loose-innodb-sys-foreign=0
#loose-innodb-sys-foreign-cols=0

default_storage_engine = InnoDB
innodb_data_home_dir = /usr/local/mysql/data
innodb_data_file_path = ibdata1:10M:autoextend
innodb_log_group_home_dir = /usr/local/mysql/data
innodb_buffer_pool_size = 128M
innodb_log_file_size = 64M
innodb_log_buffer_size = 16M
innodb_flush_log_at_trx_commit = 1
innodb_lock_wait_timeout = 120
innodb_max_dirty_pages_pct = 90
innodb_read_io_threads = 3
innodb_write_io_threads = 3

[mysqldump]
quick
max_allowed_packet = 16M

[mysql]
no-auto-rehash

[myisamchk]
key_buffer_size = 32M
sort_buffer_size = 768K
read_buffer = 2M
write_buffer = 2M

[mysqlhotcopy]
interactive-timeout
```

> 按`ESC`后输入`:wq`退出
