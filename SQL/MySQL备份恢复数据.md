# MySQL备份恢复数据


[[toc]]





## binlog2sql

> 使用此方式之前一定是MySQL开启了bin-log的才可行，如果没有安装开源工具`binlog2sql`那么请安装。

> binlog2sql是一款简单易用的binlog解析工具，其中一个功能就是生成回滚SQL。

* [https://github.com/danfengcao/binlog2sql](https://github.com/danfengcao/binlog2sql)


```bash
git clone https://github.com/danfengcao/binlog2sql.git
cd binlog2sql/
pip install -r requirements.txt
```

### MySQL必须设置参数

```bash
[mysqld]
server_id = 1
log_bin = /var/log/mysql/mysql-bin.log
max_binlog_size = 1G
binlog_format = row
binlog_row_image = full
```

### user需要的最小权限集合

```sql
select, super/replication client, replication slave
#建议授权
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 
```

### 查看目前的binlog文件

```sql
show master logs;
```

- 查询结果

| Log_name         | File_size |
|------------------|-----------|
| mysql-bin.000001 | 177       |
| mysql-bin.000002 | 437       |
| mysql-bin.000003 | 685       |
| mysql-bin.000004 | 1702399   |
| mysql-bin.000005 | 963964    |
| mysql-bin.000006 | 13118637  |
| mysql-bin.000007 | 26765043  |


### 定位误操作SQL的binlog位置

> 可以看到最新的binlog文件是mysql-bin.000007，我们再定位误操作SQL的binlog位置


```bash
# `binlog2sql.py`文件在`binlog2sql/binlog2sql/`文件夹下
# 如果命令最后不加时间可输出最近操作的SQL命令
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' \
    -d数据库 -t表 --start-file='binlog文件' \
    --start-datetime='之前误操作的SQL执行开始时间' \
    --stop-datetime='之前误操作的SQL执行结束时间'
```

> 当程序跑完之后看最后一条数据最末尾：`#start 5117865 end 13679060 time 2018-06-12 10:07:53`
> 开始位置（start 5117865）和结束位置（end 13679060）

![](/images/MySQL_binlog.png)


### 生成sql文件回滚

> 生成`rollback.sql`文件，并检查回滚SQL是否正确

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' \
    -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 \
    --stop-position=结束位置 -B > rollback.sql
```
> 查看当前文件夹下是否生成了rollback.sql文件,确认回滚SQL正确，如果有就执行回滚

```bash
mysql -h127.0.0.1 -P端口 -u账号 -p'密码' < rollback.sql
```

### 不生成sql文件回滚

> 不生成rollback.sql文件，执行命令后在输出中检查回滚SQL是否正确

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' \
    -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 \
    --stop-position=结束位置 -B
```

> 确认回滚SQL正确，执行回滚语句。登录MySQL确认，数据回滚成功。

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' \
    -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 \
    --stop-position=结束位置 -B | mysql -h127.0.0.1 -P端口 -u账号 -p'密码'
```






## mysqldump

> 如果是在本机上备份本机的数据库地址和端口可以不要，如果是在本机上备份其他主机上的数据库就需要地址和端口

- [MySQL备份并删除历史.sh](/files/MySQL备份并删除历史.sh)
- [MySQL同步远程数据库到本地.sh](/files/MySQL同步远程数据库到本地.sh)

> `mysqldump`命令需要手动输入密码，所以一般不输入`-p`参数

* [mysqldump数据导出参数说明](https://blog.csdn.net/hao7030187/article/details/77839968)
* [mysqldump数据导出参数说明](http://www.cnblogs.com/chenmh/p/5300370.html)


**参数说明**

- `-d` 结构(--no-data:不导出任何数据，只导出数据库表结构)
- `-t` 数据(--no-create-info:只导出数据，而不添加CREATE TABLE 语句)
- `-n` (--no-create-db:只导出数据，而不添加CREATE DATABASE 语句）
- `-R` (--routines:导出存储过程以及自定义函数)
- `-E` (--events:导出事件)
- `--triggers` (默认导出触发器，使用--skip-triggers屏蔽导出)
- `-B` (--databases:导出数据库列表，单个库时可省略）
- `--tables` 表列表（单个表时可省略）
    - ①同时导出结构以及数据时可同时省略-d和-t
    - ②同时不导出结构和数据可使用-ntd
    - ③只导出存储过程和函数可使用-R -ntd
    - ④导出所有(结构&数据&存储过程&函数&事件&触发器)使用-R -E(相当于①，省略了-d -t;触发器默认导出)
    - ⑤只导出结构&函数&事件&触发器使用 -R -E -d
- `--opt`等同于以下参数，该选项默认开启， 可以用--skip-opt禁用
    - `--add-drop-table`
    - `--add-locks`
    - `--create-options`
    - `--quick`
    - `--extended-insert`
    - `--lock-tables`
    - `--set-charset`
    - `--disable-keys`
1. --opt 在创建表结构之前 会有 DROP TABLE IF EXISTS
2. 原表在创建的时候指定了AUTO_INCREMENT，在使用了--opt 仍然和建表时候一样存在参数，在使用参数--skip-opt的时候，忽略了此参数AUTO_INCREMENT
3. 在使用参数--opt的时候，创建表的类型，字符集等等都是默认参数ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;当使用了--skip-opt的时候，这些参数都给忽略了
4. 导出原表中的数据，--opt是一个insert多个value，在使用了--skip-opt的时候，是多个insert组成的；


### mysqldump导出

```bash
# 只导出结构&函数&事件&触发器使用
mysqldump -R -E -d -h需要备份的主机地址 -P端口 -u用户名 -p 数据库名 > /home/backup.sql

# 只导出存储过程和函数可使用
mysqldump -R -ntd -h需要备份的主机地址 -P端口 -u用户名 -p 数据库名 > /home/backup.sql

# 导出单个数据库中所有(结构&数据&存储过程&函数&事件&触发器)到sql文件
mysqldump -R -E -h需要备份的主机地址 -P端口 -u用户名 -p 数据库名 > /home/backup.sql

# mysqldump 备份并压缩sql文件
mysqldump -R -E -h主机地址 -P端口 -u用户名 -p 数据库名 | gzip > /home/backup.sql.gz

# 备份所有的数据库到一个sql文件
mysqldump -R -E -h主机地址 -P端口 -u用户名 -p --all-databases > /home/all.sql

# 从一个数据库导出到另一个数据库
mysqldump -R -E -u用户名 -p 数据库名 | mysql 新数据库名 -u用户名 -p密码
```

```batch
@echo off

:: 存储sql脚本文件的目录
set "dirPath=D:\mysql_backup"
:: 数据库名
set "databaseName=demo"
:: 设置时间变量
set "Ymd=%date:~0,4%%date:~5,2%%date:~8,2%"

:: 创建存储的文件夹
if not exist %dirPath% md %dirPath%

:: 执行备份操作
mysqldump --opt --user=root --password=root --host=127.0.0.1 --protocol=tcp ^
    --port=3306 --default-character-set=utf8 --single-transaction=TRUE ^
    --routines --events %databaseName% >D:\mysql_backup\backup_demo_%Ymd%.sql

:: 从文件夹或树中选择要进行批处理的文件，删除两周前的备份数据
forfiles /p %dirPath% /m backup_*.sql -d -14 /c "cmd /c del /f @path"
```


### mysqldump导入

```bash
# 用mysqldump导入本地sql文件
mysqldump -h主机地址 -P端口 -u用户名 数据库名 < /home/backup.sql

# mysql直接用压缩文件恢复
gunzip < backup.sql.gz | mysql -h主机地址 -P端口 -u用户名 -p密码 数据库名

# mysql从本地sql文件导入
mysql -h主机地址 -P端口 -u用户名 -p密码 数据库名 < backupfile.sql
```

### mysqldump两台主机同步备份

```bash
mysqldump -R -E -h导出的主机地址 -P端口 -u用户名 -p 数据库名 | mysql -h导入的主机地址 -P端口 -u用户名 -p密码 -C 数据库名
```



### mysqldump其他命令

> `mysqldump`导入导出结构，数据，存储过程，函数，事件，触发器

```
1.①导出一个库结构

mysqldump -d dbname -u root -p > xxx.sql

②导出多个库结构

mysqldump -d -B dbname1 dbname2 -u root -p > xxx.sql

2.①导出一个库数据

mysqldump -t dbname -u root -p > xxx.sql

②导出多个库数据

mysqldump -t -B dbname1 dbname2 -u root -p > xxx.sql
 

3.①导出一个库结构以及数据

mysqldump dbname1 -u root -p > xxx.sql

②导出多个库结构以及数据

mysqldump -B dbname1 dbname2 -u root -p > xxx.sql

-------------------------数据表操作-----------------------------

4.①导出一个表结构

mysqldump -d dbname1 tablename1 -u root -p > xxx.sql

②导出多个表结构

mysqldump -d -B dbname1 --tables tablename1 tablename2 -u root -p > xxx.sql
 

5.①导出一个表数据

mysqldump -t dbname1 tablename1 -u root -p > xxx.sql

②导出多个表数据

mysqldump -d -B dbname1 --tables tablename1 tablename2 -u root -p > xxx.sql
 

6.①导出一个表结构以及数据

mysqldump dbname1 tablename1 -u root -p > xxx.sql

②导出多个表结构以及数据

mysqldump -B dbname1 --tables tablename1 tablename2 -u root -p > xxx.sql

-------------------------存储过程、函数操作-----------------------------

7.只导出存储过程和函数(不导出结构和数据，要同时导出结构的话，需要同时使用-d)

mysqldump -R -ndt dbname1 -u root -p > xxx.sql
 
-------------------------事件操作-----------------------------
8.只导出事件

mysqldump -E -ndt dbname1 -u root -p > xxx.sql
 
-------------------------触发器操作-----------------------------

9.不导出触发器（触发器是默认导出的–triggers，使用–skip-triggers屏蔽导出触发器）

mysqldump --skip-triggers dbname1 -u root -p > xxx.sql
```



## source命令导入

```bash
# 进入MySQL并指定数据库
use 数据库名;
# 导入数据（注意sql文件的路径）
source /home/backup.sql;
```


## 主从同步


### 配置主服务器

**在[mysqld]节点下按需添加**

```conf
[mysqld]
# 设置server_id，一般设置为IP,注意要唯一
server_id=100
# 复制过滤：也就是指定数据库不用同步,多个之间用','号分割
binlog-ignore-db=mysql,information_schema,preformance_schema
# 指定需要同步的二进制数据库
binlog-do-db=test
# 开启二进制日志功能，可以随便取，最好有含义（关键就是这里了）
log-bin=edu-mysql-bin
# 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
binlog_cache_size=1M
# 主从复制的格式（mixed,statement,row，默认格式是statement）
binlog_format=mixed
# 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
expire_logs_days=5
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

**创建数据同步用户**

> 这里主要是要授予用户REPLICATION SLAVE权限和REPLICATION CLIENT权限

```sql
CREATE USER IF NOT EXISTS 'slave'@'%' IDENTIFIED BY '密码';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
FLUSH PRIVILEGES;
```

### 配置从服务器

**在[mysqld]节点下按需添加**

> 从库中的`server-id`值一定不要跟主库的一样

```conf
[mysqld]
# 设置server_id，一般设置为IP,注意要唯一
server_id=101
# 复制过滤：也就是指定数据库不用同步,多个之间用','号分割
binlog-ignore-db=mysql,information_schema,preformance_schema
# 指定需要同步的二进制数据库
binlog-do-db=test
# 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
log-bin=edu-mysql-slave1-bin
# 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
binlog_cache_size=1M
# 主从复制的格式（mixed,statement,row，默认格式是statement）
binlog_format=mixed
# 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
expire_logs_days=5
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
# relay_log配置中继日志
relay_log=edu-mysql-relay-bin
# log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1
# 防止改变数据(除了特殊的线程)
read_only=1
```

**先查询主服务器当前二进制log文件**

```sql
SHOW MASTER STATUS;
```

- 查询出来如下

| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
|---------------|---------------|---------------|---------------|---------------|
| mysql-bin.000025 | 154 | ichangg_im	|


**进入从服务器MySQL执行以下命令**

```sql
CHANGE MASTER TO MASTER_HOST='主服务器IP',MASTER_PORT=3306,MASTER_USER='主服务器同步用户名',MASTER_PASSWORD='密码',MASTER_LOG_FILE='主MySQL二进制文件名',MASTER_LOG_POS=Position字段中数据,MASTER_CONNECT_RETRY=30;
```

- `MASTER_HOST='192.168.1.100'` #Master的IP地址
- `MASTER_USER='slave'` #用于同步数据的用户（在Master中授权的用户）
- `MASTER_PASSWORD='123456'` #同步数据用户的密码
- `MASTER_PORT=3306` #Master数据库服务的端口
- `MASTER_LOG_FILE='edu-mysql-bin.000001'` #指定Slave从哪个日志文件开始读复制数据（Master上执行命令的结果的File字段）
- `MASTER_LOG_POS=429` #从哪个POSITION号开始读（Master上执行命令的结果的Position字段）
- `MASTER_CONNECT_RETRY=30` #当建立主从连接时，如果连接建立失败，间隔多久后重试。单位为秒，默认设置为60秒，同步延迟调优参数。


**查看主从同步状态**

```sql
show slave status;
```

**开启复制**

```sql
START SLAVE;
```

### 如果出现以下错误

> `ERROR 1872 (HY000): Slave failed to initialize relay log info structure from the repository`

> 看样子是找不到中继日志的仓库，但是查看变量`relay log`的位置是设置了的

```sql
show variables like 'relay%';
```

- 重置复制信息

```sql
RESET MASTER;
```

- 查看主从复制是否还有主从配置

```sql
SHOW SLAVE STATUS\G
```

- 如果还有就执行以下命令清除所有

```sql
RESET SLAVE ALL;
```

- 再次开启复制

```sql
START SLAVE;
```

- 查看主从复制是否成功

```sql
SHOW SLAVE STATUS\G
```

**Operation CREATE USER failed**

> `Error 'Operation CREATE USER failed for 'slave'@'%'' on query. Default database: ''. Query: `
>> `'CREATE USER 'slave'@'%' IDENTIFIED WITH 'mysql_native_password' AS '*040A65A51A0B047A826CDE05448536015D471E15''`


- 先执行以下命令

```sql
STOP SLAVE;
FLUSH PRIVILEGES;
START SLAVE;
```

- 如果错误仍然存在，执行以下命令

```sql
STOP SLAVE;
DROP USER 'slave'@'%';
START SLAVE;
```