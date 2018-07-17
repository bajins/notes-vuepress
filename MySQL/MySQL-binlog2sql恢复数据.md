# 目录
* [MySQL误操作通过binlog2sql恢复数据](#1)
* [MySQL备份](#2)

*****************************************************************************
###### 1
# MySQL误操作通过binlog2sql恢复数据
### 使用此方式之前一定是MySQL开启了bin-log的才可行
## 第一步如果没有安装开源工具binlog2sql那么请安装。
#### binlog2sql的使用详情：https://github.com/danfengcao/binlog2sql
### binlog2sql是一款简单易用的binlog解析工具，其中一个功能就是生成回滚SQL。
```shell
git clone https://github.com/danfengcao/binlog2sql.git
cd binlog2sql/
pip install -r requirements.txt
```
### MySQL server必须设置以下参数:
```sehll
[mysqld]
server_id = 1
log_bin = /var/log/mysql/mysql-bin.log
max_binlog_size = 1G
binlog_format = row
binlog_row_image = full
```
### user需要的最小权限集合：
```sql
select, super/replication client, replication slave
#建议授权
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 
```
## 查看目前的binlog文件
```sql
show master logs;
```
### 查询结果：
Log_name   |   File_size
| ------------ | ------------ |
mysql-bin.000001 | 177
mysql-bin.000002 |	437
mysql-bin.000003 |	685
mysql-bin.000004 |	1702399
mysql-bin.000005 |	963964
mysql-bin.000006 |	13118637
mysql-bin.000007 |	26765043

### 可以看到最新的binlog文件是mysql-bin.000007，我们再定位误操作SQL的binlog位置
#### binlog2sql.py文件在binlog2sql/binlog2sql/ 文件夹下
#### 如果命令最后不加时间可输出最近操作的SQL命令
```shell
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-datetime='之前误操作的SQL执行开始时间' --stop-datetime='之前误操作的SQL执行结束时间'
```
### 当程序跑完之后看最后一条数据最末尾：
#### #start 5117865 end 13679060 time 2018-06-12 10:07:53
#### 开始位置（start 5117865）和结束位置（end 13679060）
![](/images/MySQL_binlog.png)

## 方式一：
### rollback.sql文件，并检查回滚SQL是否正确
```shell
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B > rollback.sql
```
### 查看当前文件夹下是否生成了rollback.sql文件,确认回滚SQL正确，如果有就执行回滚
```shell
mysql -h127.0.0.1 -P端口 -u账号 -p'密码' < rollback.sql
```
## 方式二：
### 不生成rollback.sql文件，执行命令后在输出中检查回滚SQL是否正确
```shell
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B
```
### 确认回滚SQL正确，执行回滚语句。登录MySQL确认，数据回滚成功。
```shell
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B | mysql -h127.0.0.1 -P端口 -u账号 -p'密码'
```

********************************************************************************************************
###### 2
# MySQL备份
## 用mysqldump备份
### 执行mysqldump备份单个数据库
```diff
+ ①同时导出结构以及数据时可同时省略-d和-t
+ ②同时不导出结构和数据可使用-ntd
+ ③只导出存储过程和函数可使用-R -ntd
+ ④导出所有(结构&数据&存储过程&函数&事件&触发器)使用-R -E(相当于①，省略了-d -t;触发器默认导出)
+ ⑤只导出结构&函数&事件&触发器使用 -R -E -d
```
```shell
#备份
mysqldump -h需要备份的主机IP -P端口 -u 用户名 -p 数据库名 > /home/backup.sql
#还原
mysqldump -u 用户名 -p 数据库名 < /home/backup.sql
```
```diff
+ 如果是在本机上备份本机的数据库IP和端口可以不要，如果是在本机上备份其他主机上的数据库就需要IP和端口
```
#### 如果用mysqldump导入不成功，可以用以下方法
```sql
#先登录MySQL，再指定数据库，设置数据库bianm
set names utf8;
#导入数据（注意sql文件的路径）
source /home/backup.sql
```

### mysqldump远程备份到本机的指定数据库中
```shell
mysqldump --host=需要备份的主机IP -P端口 -u用户名 -p --opt 数据库名| mysql --host=localhost -P端口 -u本机MySQL用户名 -p本机MySQL密码 -C 数据库名
```
### [导出导入脚本](/MySQL/MySQL_Backup.sh)

## MySQL mysqldump导入导出 结构，数据，存储过程，函数，事件，触发器
-------------------------数据库操作-----------------------------

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
 
-------------------------导入数据库操作-----------------------------
10.导入
　　source命令：
　　　　mysql -u root -p
　　　　　　use game;
　　　　　　source xxx.sql
　　mysql命令：
　　　　mysql -hhostname -uusername - ppassword databasename < xxx.sql
 
总结
-d 结构(--no-data:不导出任何数据，只导出数据库表结构)

-t 数据(--no-create-info:只导出数据，而不添加CREATE TABLE 语句)

-n (--no-create-db:只导出数据，而不添加CREATE DATABASE 语句）

-R (--routines:导出存储过程以及自定义函数)

-E (--events:导出事件)

--triggers (默认导出触发器，使用--skip-triggers屏蔽导出)

-B (--databases:导出数据库列表，单个库时可省略）

--tables 表列表（单个表时可省略）
①同时导出结构以及数据时可同时省略-d和-t
②同时不导出结构和数据可使用-ntd
③只导出存储过程和函数可使用-R -ntd
④导出所有(结构&数据&存储过程&函数&事件&触发器)使用-R -E(相当于①，省略了-d -t;触发器默认导出)
⑤只导出结构&函数&事件&触发器使用 -R -E -d




# [返回顶部](#readme)
