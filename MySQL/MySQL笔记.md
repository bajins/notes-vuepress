# MySQL笔记



- [常用语句](#常用语句)
  - [命令行](#命令行)
  - [随机取值](#随机取值)
  - [随机插入](#随机插入)
  - [查询分组中某字段最大值](#查询分组中某字段最大值)
  - [查询数据库中的存储过程](#查询数据库中的存储过程)
  - [事务隔离级别修改](#事务隔离级别修改)
- [数据库信息](#数据库信息)
  - [查看数据库详细信息](#查看数据库详细信息)
  - [查看所有数据库信息](#查看所有数据库信息)
  - [查看一个数据库占用空间的大小](#查看一个数据库占用空间的大小)
  - [查看一个表占用空间的大小](#查看一个表占用空间的大小)
- [时间函数](#时间函数)
  - [获取当前日期时间](#获取当前日期时间)
  - [获得当前日期](#获得当前日期)
  - [获得当前时间`time`函数](#获得当前时间time函数)
  - [获得当前`UTC`日期时间函数](#获得当前utc日期时间函数)
  - [格式化日期](#格式化日期)
  - [生成18位uuid加14位精确到秒的时间](#生成18位uuid加14位精确到秒的时间)
  - [日期增加或者减去一个时间间隔](#日期增加或者减去一个时间间隔)
  - [日期时间相减](#日期时间相减)
  - [时间戳](#时间戳)
  - [日期时间选取](#日期时间选取)
  - [返回星期和月份名称](#返回星期和月份名称)
- [用户管理](#用户管理)
  - [查看用户的授权](#查看用户的授权)
  - [创建用户](#创建用户)
  - [授权](#授权)
  - [撤销用户权限](#撤销用户权限)
  - [删除账户及权限](#删除账户及权限)
- [安装后修改密码](#安装后修改密码)
  - [使用默认密码进入修改密码](#使用默认密码进入修改密码)
  - [修改配置修改密码](#修改配置修改密码)








## 常用语句


### 命令行

> 可以用shell脚本操作mysql数据库，使用mysql的`-e`参数可以执行各种sql的(创建，删除，增，删，改、查)等各种操作。

```bash
#!/bin/bash

# 数据库信息
HOSTNAME="192.168.111.84"
PORT="3306"
USERNAME="root"
PASSWORD=""
# 数据库名称
DBNAME="test_db_test"
# 数据库中表的名称
TABLENAME="test_table_test"

# 查询数据库 
mysql -hlocalhost -P3306 -uroot -pabc123 -e "show databases;"

# 创建数据库
create_db_sql="create database IF NOT EXISTS ${DBNAME}"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} -e"${create_db_sql}"
 
# 创建表
create_table_sql="create table IF NOT EXISTS ${TABLENAME} (name varchar(20), id int(11) default 0)"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${create_table_sql}"

# 插入数据
insert_sql="insert into ${TABLENAME} values('billchen',2)"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${insert_sql}"
 
# 查询
select_sql="select * from ${TABLENAME}"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${select_sql}"
 
# 更新数据
update_sql="update ${TABLENAME} set id=3"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${update_sql}"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${select_sql}"
 
# 删除数据
delete_sql="delete from ${TABLENAME}"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${delete_sql}"
mysql -h${HOSTNAME}  -P${PORT}  -u${USERNAME} -p${PASSWORD} ${DBNAME} -e"${select_sql}"

```


### 随机取值

> 先根据rand()和id获取一遍随机数，再跟原表关联，最后取出值，因为是随机取，
> 所以你的id值越平均，数据量越大，最后limit之前获取的id值就会越接近整表数据量的一半，limit取到的结果也越接近。

```sql
SELECT * FROM `table1` AS t1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(id) FROM `table1`)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id ASC LIMIT 1
```

- 最大减去最小值乘以随机值获取随机数

```sql
SELECT * FROM USER WHERE id >= ( ( SELECT MAX( id ) FROM USER ) - ( SELECT MIN( id ) FROM USER ) ) * RAND( ) + ( SELECT MIN( id ) FROM USER ) LIMIT 1
```

> `order by rand()`效率极低，采用JOIN的语法比直接在WHERE中使用函数效率还要高很多

### 随机插入

- 连续有限队列随机取

```sql
update table1 set a = (floor(rand() * 4) + 3) where b = 84;
```

- 非连续有限队列随机取

```sql
update table1 set a = elt(floor(rand() * 4) + 1, 5, 7, 11, 13) where b = 84;
```

### 查询分组中某字段最大值

> 因为`group by`后取的一条数据默认是按照主键id排序后的第一条，所以对表先排序，然后再分组

```sql
SELECT 别名.* FROM (SELECT * FROM 表名 ORDER BY 字段 DESC) AS 别名 GROUP BY 别名.字段;
```

### 查询数据库中的存储过程

```sql
selectnamefrom mysql.proc where db = 'your_db_name' andtype= 'PROCEDURE';

show procedure status;

# 查看存储过程或函数的创建代码
show create procedure proc_name;
show create function func_name;
```

### 事务隔离级别修改

```sql
SET [SESSION | GLOBAL] TRANSACTION ISOLATION LEVEL [READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE];
```

| 代码             | 说明           |
|------------------|----------------|
| SESSION          | 当前会话       |
| GLOBAL           | 全局           |
| READ UNCOMMITTED | 读取未提交内容 |
| READ COMMITTED   | 读取提交内容   |
| REPEATABLE READ  | 可重读         |
| SERIALIZABLE     | 可串行化       |


## 数据库信息

### 查看数据库详细信息

- `information_schema`数据库记录每个表和数据库的详细信息，在该库中有一个TABLES表：

|字段        |    说明     |
|------------|------------|
|TABLE_SCHEMA | 数据库名   |
|TABLE_NAME   | 表名      |
|ENGINE       | 所使用的存储引擎|
|TABLES_ROWS  | 记录数    |
|DATA_LENGTH  | 数据大小   |
|INDEX_LENGTH | 索引大小   |

> 其他字段请参考MySQL的手册，我们只需要了解这几个就足够了。

### 查看所有数据库信息

```sql
SELECT
	table_schema AS '数据库',
	sum( table_rows ) AS '总行数',
	sum( TRUNCATE ( data_length / 1024 / 1024, 2 ) ) AS '数据容量(MB)',
	sum( TRUNCATE ( index_length / 1024 / 1024, 2 ) ) AS '索引容量(MB)' 
FROM
	information_schema.TABLES 
GROUP BY
	table_schema 
ORDER BY
	sum( table_rows ) DESC;
```

### 查看一个数据库占用空间的大小

> 那就相当于是数据大小(`DATA_LENGTH`)+索引大小(`INDEX_LENGTH`)即可

```sql
SELECT
	table_schema AS '数据库',
	table_name AS '表名',
	table_rows AS '行数',
	TRUNCATE ( data_length / 1024 / 1024, 2 ) AS '数据容量(MB)',
	TRUNCATE ( index_length / 1024 / 1024, 2 ) AS '索引容量(MB)' 
FROM
	information_schema.TABLES 
WHERE
	table_schema = '数据库' 
ORDER BY
	table_rows DESC;
```

### 查看一个表占用空间的大小

> 那就相当于是数据大小(`DATA_LENGTH`)+索引大小(`INDEX_LENGTH`)即可

```sql
SELECT
	table_schema AS '数据库',
	table_name AS '表名',
	table_rows AS '行数',
	TRUNCATE ( data_length / 1024 / 1024, 2 ) AS '数据容量(MB)',
	TRUNCATE ( index_length / 1024 / 1024, 2 ) AS '索引容量(MB)' 
FROM
	information_schema.TABLES 
WHERE
	table_schema = '数据库' 
	AND TABLE_NAME = '表名' 
ORDER BY
	table_rows DESC;
```

## 时间函数


### 获取当前日期时间

> 获得当前日期+时间（date+time）函数

> 除了 `now()` 函数能获得当前的日期时间外，MySQL 中还有下面的函数： 
>> `current_timestamp()`
>>
>> `localtime()`
>>
>> `localtimestamp()`
>
> 这些日期时间函数，都等同于 `now()`。鉴于 `now()` 函数简短易记，建议总是使用 `now()`来替代上面列出的函数。

- `now()` 

- `current_timestamp()`

```sql
CURRENT_TIMESTAMP { + INTERVAL 1 [HOUR|MONTH|WEEK|DAY|MINUTE|...] }
```

- `INTERVAL`时间单位

| unit          | 说明  |
|---------------|-----|
| YEAR          | 年   |
| QUARTER       | 季度  |
| MONTH         | 月   |
| DAY           | 天   |
| HOUR          | 时   |
| MINUTE        | 分   |
| WEEK          | 周   |
| SECOND        | 秒   |
| YEAR_MONTH    | 年:月  |
| DAY_HOUR      | 日:时 |
| DAY_MINUTE    | 日:分 |
| DAY_SECOND    | 日:秒  |
| HOUR_MINUTE   | 时:分 |
| HOUR_SECOND   | 时:秒  |
| MINUTE_SECOND | 分:秒  |


- `sysdate()`

> sysdate() 日期时间函数跟 now() 类似，不同之处在于：now() 在执行开始时值就得到了， sysdate() 在函数执行时动态得到值。

### 获得当前日期

- `curdate() `

> 其中，下面的两个日期函数等同于`curdate()`：
>> `current_date()`
>>
>> `current_date` 

### 获得当前时间`time`函数

- `curtime()`

> 其中，下面的两个时间函数等同于`curtime()`：
>> `current_time()`
>>
>> `current_time` 

### 获得当前`UTC`日期时间函数

- `utc_date()`

- `utc_time()`

- `utc_timestamp()`

### 格式化日期

> `DATE_FORMAT(date, format)`

### 生成18位uuid加14位精确到秒的时间

```sql
CONCAT(LEFT(REPLACE(UUID(),'-',''),18),DATE_FORMAT(NOW(), '%Y%m%d%H%i%S'))
```

| 格式        	| 说明                                                               	|
|-------------	|--------------------------------------------------------------------	|
| `%%`        	| 直接值“%”                                                          	|
| `%a`        	| 一周中每一天名称的缩写（Sun, Mon, ..., Sat）                       	|
| `%b`        	| 缩写的月名（ January, February,...., December）                    	|
| `%c`        	| 数字表示的月份（1, 2, ...., 12）                                   	|
| `%d`        	| 两位数字表示月中的天数（00, 01,..., 31）                           	|
| `%D`        	| 英文后缀表示月中的天数（1st, 2nd, 3rd,...）                        	|
| `%e`        	| 数字形式表示月中的天数（1, 2， ..., 31）                           	|
| `%H`        	| 两位数字形式的小时，24 小时（00,01, ..., 23）                      	|
| `%h`        	| 两位数字形式的小时，12 小时（01,02, ..., 12）                      	|
| `%I`, `%i ` 	| 两位数字形式的分（ 00,01, ..., 59）                                	|
| `%j`        	| 以三位数字表示年中的天数（ 001, 002, ..., 366）                    	|
| `%k`        	| 数字形式的小时，24 小时（0,1, ..., 23）                            	|
| `%l`        	| 数字形式的小时，12 小时（1, 2, ..., 12）                           	|
| `%M`        	| 月名（January, February, ..., December）                           	|
| `%m`        	| 两位数字表示的月份（01, 02, ..., 12）                              	|
| `%p`        	| AM或PM                                                             	|
| `%r`        	| 12 小时的时间形式（hh:mm:ss AM 或hh:mm:ss PM）                     	|
| `%S`, `%s`  	| 两位数字形式的秒（ 00,01, ..., 59）                                	|
| `%T`        	| 24 小时的时间形式（hh:mm:ss）                                      	|
| `%U`        	| 周（0, 1, 52），其中Sunday 为周中的第一天                          	|
| `%u`        	| 周（0, 1, 52），其中Monday 为周中的第一天                          	|
| `%W`        	| 一周中每一天的名称（Sunday, Monday, ..., Saturday）                	|
| `%w`        	| 以数字形式表示周中的天数（ 0 = Sunday, 1=Monday, ..., 6=Saturday） 	|
| `%Y`        	| 四位数字表示的年份                                                 	|
| `%y`        	| 两位数字表示的年份                                                 	|



### 日期增加或者减去一个时间间隔

- `date_add()`

- `date_sub()`

```sql
set @dt = now();
select date_add(@dt, interval 1 day); -- add 1 day
select date_add(@dt, interval 1 hour); -- add 1 hour
select date_add(@dt, interval 1 minute); -- ...
select date_add(@dt, interval 1 second);
select date_add(@dt, interval 1 microsecond);
select date_add(@dt, interval 1 week);
select date_add(@dt, interval 1 month);
select date_add(@dt, interval 1 quarter);
select date_add(@dt, interval 1 year);
select date_add(@dt, interval -1 day); -- sub 1 day
```

### 日期时间相减

> 两个日期相减 date1 - date2，返回天数。

> 注意：`timediff(time1,time2)` 函数的两个参数类型必须相同。

```sql
select datediff('2008-08-08', '2008-08-01'); -- 7
select datediff('2008-08-01', '2008-08-08'); -- -7
MySQL timediff(time1,time2)：两个日期相减 time1 - time2，返回 time 差值。
select timediff('2008-08-08 08:08:08', '2008-08-08 00:00:00'); -- 08:08:08
select timediff('08:08:08', '00:00:00'); -- 08:08:08
```

### 时间戳

```sql
timestamp(date) -- date to timestamp
timestamp(dt,time) -- dt + time
timestampadd(unit,interval,datetime_expr) --
timestampdiff(unit,datetime_expr1,datetime_expr2) --

select timestamp('2008-08-08'); -- 2008-08-08 00:00:00
select timestamp('2008-08-08 08:00:00', '01:01:01'); -- 2008-08-08 09:01:01
select timestamp('2008-08-08 08:00:00', '10 01:01:01'); -- 2008-08-18 09:01:01
select timestampadd(day, 1, '2008-08-08 08:00:00'); -- 2008-08-09 08:00:00
select date_add('2008-08-08 08:00:00', interval 1 day); -- 2008-08-09 08:00:00
MySQL timestampadd() 函数类似于 date_add()。
select timestampdiff(year,'2002-05-01','2001-01-01'); -- -1
select timestampdiff(day ,'2002-05-01','2001-01-01'); -- -485
select timestampdiff(hour,'2008-08-08 12:00:00','2008-08-08 00:00:00'); -- -12
select datediff('2008-08-08 12:00:00', '2008-08-01 00:00:00'); -- 7
```


### 日期时间选取

> 日期时间的各个部分：日期、时间、年、季度、月、日、小时、分钟、秒、微秒

```sql
set @dt = '2008-09-10 07:15:30.123456';
 
select date(@dt); -- 2008-09-10
select time(@dt); -- 07:15:30.123456
select year(@dt); -- 2008
select quarter(@dt); -- 3
select month(@dt); -- 9
select week(@dt); -- 36
select day(@dt); -- 10
select hour(@dt); -- 7
select minute(@dt); -- 15
select second(@dt); -- 30
select microsecond(@dt); -- 123456
```

- `Extract()`

```sql
set @dt = '2008-09-10 07:15:30.123456';
 
select extract(year from @dt); -- 2008
select extract(quarter from @dt); -- 3
select extract(month from @dt); -- 9
select extract(week from @dt); -- 36
select extract(day from @dt); -- 10
select extract(hour from @dt); -- 7
select extract(minute from @dt); -- 15
select extract(second from @dt); -- 30
select extract(microsecond from @dt); -- 123456select extract(year_month from @dt); -- 200809
select extract(day_hour from @dt); -- 1007
select extract(day_minute from @dt); -- 100715
select extract(day_second from @dt); -- 10071530
select extract(day_microsecond from @dt); -- 10071530123456
select extract(hour_minute from @dt); -- 715
select extract(hour_second from @dt); -- 71530
select extract(hour_microsecond from @dt); -- 71530123456
select extract(minute_second from @dt); -- 1530
select extract(minute_microsecond from @dt); -- 1530123456
select extract(second_microsecond from @dt); -- 30123456
```

- `dayofweek()` 返回日期参数，在一周中的位置。
- `dayofmonth()` 返回日期参数，在一月中的位置。
- `dayofyear()` 返回日期参数，在一年中的位置。

```sql
set @dt = '2008-08-08';
select dayofweek(@dt); -- 6
select dayofmonth(@dt); -- 8
select dayofyear(@dt); -- 221
```



```sql
# 获取当前日期
SELECT CURDATE();

# 获取当月最后一天
SELECT LAST_DAY(CURDATE());

# 获取当月第一天
SELECT DATE_ADD(CURDATE(),INTERVAL -DAY(CURDATE())+1 DAY);

# 获取下个月的第一天
SELECT DATE_ADD(CURDATE()-DAY(CURDATE())+1,INTERVAL 1 MONTH);

# 获取上个月的今天
SELECT DATE_SUB(CURDATE(), INTERVAL 1 MONTH);

# MySQL last_day() 函数非常有用，比如我想得到当前月份中有多少天，可以这样来计算：
SELECT NOW(), DAY(LAST_DAY(NOW())) AS days;
# 或者
SELECT DAY(LAST_DAY(CURDATE()));
# 或者
SELECT DATEDIFF(DATE_ADD(CURDATE()-DAY(CURDATE())+1,INTERVAL 1 MONTH ),DATE_ADD(CURDATE(),INTERVAL -DAY(CURDATE())+1 DAY)) AS days FROM DUAL;
```
```sql
/*上个月今天的当前时间*/
SELECT DATE_SUB(NOW(),INTERVAL 1 MONTH);

/*上个月今天的当前时间（时间戳）*/
SELECT UNIX_TIMESTAMP(DATE_SUB(NOW(),INTERVAL 1 MONTH));

/*上个月的第一天*/
SELECT DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d 00:00:00'),INTERVAL EXTRACT(DAY FROM NOW())-1 DAY),INTERVAL 1 MONTH);

/*上个月的第一天（时间戳）*/
SELECT UNIX_TIMESTAMP(DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d 00:00:00'),INTERVAL EXTRACT(DAY FROM NOW())-1 DAY),INTERVAL 1 MONTH));

/*上个月的第一天：*/
SELECT DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d'),INTERVAL EXTRACT(DAY FROM NOW())-1 DAY),INTERVAL 1 MONTH);

/*上个月的最后一天：*/
SELECT DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d'),INTERVAL EXTRACT(DAY FROM NOW()) DAY),INTERVAL 0 MONTH) AS DATE;

/*这个月的第一天：*/
SELECT DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d'),INTERVAL EXTRACT(DAY FROM NOW())-1 DAY),INTERVAL 0 MONTH);

/*这个月的最后一天：*/
SELECT DATE_SUB(DATE_SUB(DATE_FORMAT(NOW(),'%y-%m-%d'),INTERVAL EXTRACT(DAY FROM NOW()) DAY),INTERVAL-1 MONTH) AS DATE;
```


### 返回星期和月份名称

- `dayname()`
- `monthname()`

```sql
set @dt = '2008-08-08';
select dayname(@dt); -- Friday
select monthname(@dt); -- August
```


## 用户管理


### 查看用户的授权

```sql
# 查看root用户
SHOW GRANTS;
# 查看指定用户
SHOW GRANTS FOR 'username'@'host'
```

### 创建用户

> 以root用户登录到数据库后进行用户创建

- `CREATE`命令创建用户

> `CREATE`创建的用户需要手动授权


- `GRANT`命令创建用户

> 当数据库存在用户的时候`GRANT`会对用户进行授权，但当数据库不存在该用户的时候，就会创建相应的用户并进行授权。
> `WITH GRANT OPTION`这个选项表示该用户可以将自己拥有的权限授权给别人



```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```

- `username`将要创建的用户名；

- `host` 指定该用户在哪个主机上可以登录，"localhost"指该用户只能在本地登录，不能在另外一台机器上远程登录，
 如果想远程登录，将"localhost"改为"%"，表示在任何一台电脑上都可以登录；如果替换成ip，则为只有对应的ip可以连接；

- `password` 该用户的登录密码，密码可以为空，若为空则该用户可以不需要密码登录服务器。

```sql
# 创建本地登录账户
CREATE USER 'admin'@'localhost' IDENTIFIED BY '123456';
# 创建所有主机可登录账户
CREATE USER 'admin'@'%' IDENTIFIED BY '123456';
# 创建只读账号
GRANT SELECT ON *.* TO 'reader'@'%' IDENTIFIED BY "123456";
# 增删改查账号
GRANT INSERT,DELETE,UPDATE,SELECT ON *.* TO 'writer'@'%' IDENTIFIED BY "123456";
# 创建拥有所有权限的账户
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;

# 刷新权限
FLUSH PRIVILEGES;
```


### 授权

> 以root用户登录到数据库后进行授权

```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```

- `privileges`用户的操作权限，如INSERT,DELETE,UPDATE,SELECT等。如果授予所有权限则使用ALL。

- `databasename`数据库名称。`tablename`表名。如果要给该用户授予对所有数据库和表的相应操作权限则可用`\*`表示，例如`\*\.\*`

```sql
GRANT SELECT ON *.* TO 'admin'@'%';
# 刷新权限
FLUSH PRIVILEGES;
```

### 撤销用户权限

```sql
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
# 刷新权限
FLUSH PRIVILEGES;
```

### 删除账户及权限

```sql
DROP USER 'username'@'host';
# 刷新权限
FLUSH PRIVILEGES;
```


## 安装后修改密码

### 使用默认密码进入修改密码

- 查看root账号的默认密码

> mysql5.7安装完成之后，在`/var/log/mysqld.log`文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql。

```bash
grep 'temporary password' /var/log/mysqld.log
```

> 其中`root@localhost:`后面部分就是默认密码

- 修改密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
# 刷新权限
FLUSH PRIVILEGES;
```

- 如果出现以下错误，就说明密码强度不够：

> `ERROR 1819 (HY000): Your password does not satisfy the current policy requirements`

> 需要修改以下两个参数，然后再次修改密码

```sql
set global validate_password_policy=0;
set global validate_password_length=自己想要的密码长度;
```


### 修改配置修改密码

- 修改`/etc/my.cnf`

> 在`[mysqld]`小节下添加一行,修改密码完成后需要删除此行

```bash
skip-grant-tables = 1
```

> 这一行配置让`mysqld`启动时不对密码进行验证

- 重启

```bash
systemctl restart mysqld
```

- 使用`root`用户登录
 
```bash
mysql -uroot
```

- 切换到`mysql`数据库

```sql
use mysql
```


- 更新`user`表

```sql
update user set authentication_string = password('新密码'),password_expired = 'N', password_last_changed = now() where user = 'root';
```

> 在`5.7`之前的版本密码字段的字段名是`password`，`5.7`版本改为了`authentication_string`

```sql
# 使用set设置密码
set password for 'root'@'localhost'=password('123456');
# 或者使用`update`修改
update user set password=PASSWORD("123456") where user='root';
```


