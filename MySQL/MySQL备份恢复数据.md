# MySQL备份恢复数据


* [通过binlog2sql恢复数据](#通过binlog2sql恢复数据)
  * [MySQL必须设置参数](#mysql必须设置参数)
  * [user需要的最小权限集合](#user需要的最小权限集合)
  * [查看目前的binlog文件](#查看目前的binlog文件)
    * [查询结果：](#查询结果)
  * [定位误操作SQL的binlog位置](#定位误操作sql的binlog位置)
  * [生成`sql`文件回滚](#生成sql文件回滚)
  * [不生成`sql`文件回滚](#不生成sql文件回滚)
* [`mysqldump`备份恢复](#mysqldump备份恢复)
  * [参数说明](#参数说明)
  * [导出](#导出)
  * [导入](#导入)
  * [`mysqldump`两台主机同步备份](#mysqldump两台主机同步备份)
  * [`mysqldump`其他命令](#mysqldump其他命令)
* [脚本](#脚本)
  * [备份并删除历史](#备份并删除历史)
  * [同步远程数据库到本地](#同步远程数据库到本地)


## 通过binlog2sql恢复数据

> 使用此方式之前一定是MySQL开启了bin-log的才可行
>> 如果没有安装开源工具`binlog2sql`那么请安装。
>
> binlog2sql的使用详情：https://github.com/danfengcao/binlog2sql
>
> binlog2sql是一款简单易用的binlog解析工具，其中一个功能就是生成回滚SQL。

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

#### 查询结果

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
>
> `binlog2sql.py`文件在`binlog2sql/binlog2sql/`文件夹下
>
> 如果命令最后不加时间可输出最近操作的SQL命令

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-datetime='之前误操作的SQL执行开始时间' --stop-datetime='之前误操作的SQL执行结束时间'
```

> 当程序跑完之后看最后一条数据最末尾：
>> `#start 5117865 end 13679060 time 2018-06-12 10:07:53`
>>
>> 开始位置（start 5117865）和结束位置（end 13679060）

![](/images/MySQL_binlog.png)

### 生成`sql`文件回滚

> 生成`rollback.sql`文件，并检查回滚SQL是否正确

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B > rollback.sql
```
> 查看当前文件夹下是否生成了rollback.sql文件,确认回滚SQL正确，如果有就执行回滚

```bash
mysql -h127.0.0.1 -P端口 -u账号 -p'密码' < rollback.sql
```

### 不生成`sql`文件回滚

> 不生成rollback.sql文件，执行命令后在输出中检查回滚SQL是否正确

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B
```

> 确认回滚SQL正确，执行回滚语句。登录MySQL确认，数据回滚成功。

```bash
python binlog2sql/binlog2sql.py -h127.0.0.1 -P端口 -u账号 -p'密码' -d数据库 -t表 --start-file='binlog文件' --start-position=开始位置 --stop-position=结束位置 -B | mysql -h127.0.0.1 -P端口 -u账号 -p'密码'
```






## `mysqldump`备份恢复

> 如果是在本机上备份本机的数据库地址和端口可以不要，如果是在本机上备份其他主机上的数据库就需要地址和端口
>
> `mysqldump`命令需要手动输入密码，所以一般不输入`-p`参数

### 参数说明

> `-d` 结构(--no-data:不导出任何数据，只导出数据库表结构)
>
> `-t` 数据(--no-create-info:只导出数据，而不添加CREATE TABLE 语句)
>
> `-n` (--no-create-db:只导出数据，而不添加CREATE DATABASE 语句）
>
> `-R` (--routines:导出存储过程以及自定义函数)
>
> `-E` (--events:导出事件)
>
> `--triggers` (默认导出触发器，使用--skip-triggers屏蔽导出)
>
> `-B` (--databases:导出数据库列表，单个库时可省略）
>
> `--tables` 表列表（单个表时可省略）
>> ①同时导出结构以及数据时可同时省略-d和-t
>>
>> ②同时不导出结构和数据可使用-ntd
>>
>> ③只导出存储过程和函数可使用-R -ntd
>>
>> ④导出所有(结构&数据&存储过程&函数&事件&触发器)使用-R -E(相当于①，省略了-d -t;触发器默认导出)
>>
>> ⑤只导出结构&函数&事件&触发器使用 -R -E -d


### 导出

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

### 导入

```bash
# 用mysqldump导入本地sql文件
mysqldump -h主机地址 -P端口 -u用户名 数据库名 < /home/backup.sql

# mysql直接用压缩文件恢复
gunzip < backup.sql.gz | mysql -h主机地址 -P端口 -u用户名 -p密码 数据库名

# mysql从本地sql文件导入
mysql -h主机地址 -P端口 -u用户名 -p密码 数据库名 < backupfile.sql

# 登录MySQL用source命令导入本地sql文件
# 指定数据库
use 数据库名;
# 导入数据（注意sql文件的路径）
source /home/backup.sql;

```

### `mysqldump`两台主机同步备份

```bash
mysqldump -R -E -h导出的主机地址 -P端口 -u用户名 -p 数据库名 | mysql -h导入的主机地址 -P端口 -u用户名 -p密码 -C 数据库名
```

> --opt等同于--add-drop-table，--add-locks，--create-options，--quick，--extended-insert，--lock-tables，--set-charset，--disable-keys。 
该选项默认开启， 可以用--skip-opt禁用。
>> 1、--opt 在创建表结构之前 会有 DROP TABLE IF EXISTS

>> 2、原表在创建的时候指定了AUTO_INCREMENT，在使用了--opt 仍然和建表时候一样存在参数，在使用参数--skip-opt的时候，忽略了此参数AUTO_INCREMENT

>> 3、在使用参数--opt的时候，创建表的类型，字符集等等都是默认参数ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;当使用了--skip-opt的时候，这些参数都给忽略了

>> 4、导出原表中的数据，--opt是一个insert多个value，在使用了--skip-opt的时候，是多个insert组成的；





[mysqldump数据导出参数说明](https://blog.csdn.net/hao7030187/article/details/77839968)

[mysqldump数据导出参数说明](http://www.cnblogs.com/chenmh/p/5300370.html)


### `mysqldump`其他命令

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


## 脚本

### 备份并删除历史

```bash
#!/bin/bash

echo "****************************************************************************"
startDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$startDate] 开始执行："
echo "----------------------------------------------------------------------------"

function finish() {
    echo "----------------------------------------------------------------------------"
    endDate=$(date +"%Y-%m-%d %H:%M:%S")
    echo "★[$endDate] 执行结束！"
    echo "****************************************************************************"
    exit
}

# ============ 以下配置信息请自行修改 ===================

# MySQL备份用户
mysql_user="USER"
# MySQL备份用户的密码
mysql_password="PASSWORD"
# 主机地址
mysql_host="localhost"
# 端口
mysql_port="3306"
# MySQL编码
mysql_charset="utf8"
# 要备份的数据库名称，多个用空格分开隔开 如("db1" "db2" "db3")
backup_db_arr=("db1" "db2")
# 备份数据存放位置，末尾请不要带"/",此项可以保持默认，程序会自动创建文件夹
backup_location=/home/mysqlBackup
# 是否开启过期备份删除 ON为开启 OFF为关闭
expire_backup_delete="ON"
# 过期时间天数 默认为三天，此项只有在expire_backup_delete开启时有效
expire_days=3

# ============= 本行开始不需要修改 ===================

# 定义备份详细时间
backup_time=$(date +%Y%m%d%H%M)
# 3天之前的日期
#backup_3ago=$(date -d '3 days ago' +%Y-%m-%d)

# 定义备份目录中的年月日时间
#backup_Ymd=`date +%Y-%m-%d`
# 备份文件夹全路径
#backup_dir=$backup_location/$backup_Ymd
backup_dir=$backup_location

# 判断MYSQL是否启动,mysql没有启动则备份退出
mysql_ps=$(ps -ef | grep mysql | wc -l)
mysql_listen=$(netstat -an | grep LISTEN | grep $mysql_port | wc -l)
if [ [$mysql_ps == 0] -o [$mysql_listen == 0] ]; then
    echo "错误：MySQL没有运行！备份停止！"
    finish
fi

# 连接到mysql数据库，无法连接则备份退出
# 可以用shell脚本操作mysql数据库，
# 使用mysql的-e参数可以执行各种sql的(创建，删除，增，删，改、查)等各种操作 。
databases=`mysql -h$mysql_host -P$mysql_port -u$mysql_user \
-p$mysql_password -e "show databases;" 2>/dev/null`

flag=$(echo $?)
if [ $flag != "0" ]; then
    echo "错误：无法连接mysql服务器！备份停止！"
    finish
fi
echo "MySQL连接成功! 请等待......"
# 如果没有定义备份的数据库，则退出备份
if [ -z "$backup_db_arr"]; then
    echo "错误：没有定义备份的数据库"
    finish
fi

#dbnames=$(cut -d ',' -f1-5 $backup_database)
#echo "arr is (${backup_db_arr[@]})"
for dbname in ${backup_db_arr[@]}; do
    echo "数据库 $dbname 备份开始..."
    
    # 过滤查询出的数据库中是否有当前数据库
    result=`echo $databases | grep -o $dbname`
    # 如果定义备份的数据库不存在，则备份停止
    if [ -z "$result"]; then
        echo "错误：数据库中没有查到此数据库$dbname！"
        finish
    fi

    # 创建备份文件夹
    $(mkdir -p $backup_dir)
    # 开始备份
    $(
        mysqldump -h$mysql_host -P$mysql_port -u$mysql_user \
        -p$mysql_password $dbname --default-character-set=$mysql_charset \
        | gzip >$backup_dir/$dbname-$backup_time.sql.gz
    )

    # 获取执行结果
    flag=$(echo $?)
    if [ $flag == "0" ]; then
        echo "数据库 $dbname 成功备份到 $backup_dir/$dbname-$backup_time.sql.gz"
    else
        echo "数据库 $dbname 备份失败!"
    fi

done

# 如果开启了删除过期备份，则进行删除操作
if [ "$expire_backup_delete" == "ON" -a "$backup_dir" != "" ]; then
    echo "查找要删除的文件："
    # 查找要删除的文件
    $(find $backup_dir/ -type f -mtime +$expire_days -print)
    # 开始查找并删除
    $(find $backup_dir/ -type f -mtime +$expire_days -print | xargs rm -f)
    echo "删除备份文件成功!"
fi

finish

```

### 同步远程数据库到本地

```bash
#!/bin/bash

echo "****************************************************************************"
startDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$startDate] 开始执行："
echo "----------------------------------------------------------------------------"

# 远程数据库
SERVER_HOST="ip"
SERVER_PORT="端口"
SERVER_USER="用户名"
SERVER_PASSWORD="密码"
SERVER_DB="kcyw"

# 本地数据库
LOCAL_HOST="localhost"
LOCAL_PORT="3306"
LOCAL_USER="用户名"
LOCAL_PASSWORD="密码"

# 如果本地数据库不存在则创建
create_db_sql="create database IF NOT EXISTS ${SERVER_DB}"
mysql -h${LOCAL_HOST} -P${LOCAL_PORT} -u${LOCAL_USER} -p${LOCAL_PASSWORD} -e "${create_db_sql}"

#从远程数据库备份到本地数据库
mysqldump -R -E -h${SERVER_HOST} -P${SERVER_PORT} -u${SERVER_USER} -p${SERVER_PASSWORD} ${SERVER_DB} \
| mysql -h${LOCAL_HOST} -P${LOCAL_PORT} -u${LOCAL_USER} -p${LOCAL_PASSWORD} -C ${SERVER_DB}

echo "----------------------------------------------------------------------------"
endDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$endDate] Successful"
echo "****************************************************************************"
exit

```