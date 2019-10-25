# MySQL配置

## 配置my.cnf

> 从5.7.17后mysql就没有默认的my_default.cnf文件，需要手动创建

```bash
vi /etc/my.cnf
```

> 按`i`后输入以下内容

```bash
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

## yum安装配置

```bash
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


## 宝塔面板安装配置

```bash
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




# [返回顶部](#readme)
