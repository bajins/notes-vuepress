# MySQL

[[toc]]


## Flag

+ [https://github.com/topics/innodb](https://github.com/topics/innodb)
+ [https://github.com/topics/mysql](https://github.com/topics/mysql)


* [https://github.com/guodongxiaren/MySQL-docs](https://github.com/guodongxiaren/MySQL-docs)
* [https://github.com/phpmyadmin/phpmyadmin](https://github.com/phpmyadmin/phpmyadmin)
* [https://github.com/vrana/adminer](https://github.com/vrana/adminer)
* 备份并上传对象存储 [https://github.com/iKeepLearn/db-back-tool](https://github.com/iKeepLearn/db-back-tool)
* [如果是MySQL引起的CPU消耗过大，你会如何优化？](https://www.cnblogs.com/xiaoheliu1024/p/12657929.html)
* 全文搜索 [https://github.com/mengzhuo/sqlalchemy-fulltext-search](https://github.com/mengzhuo/sqlalchemy-fulltext-search)
* [MySQL系列——MySQL实现序列（Sequence）效果](https://blog.csdn.net/sinat_19351993/article/details/47169789)
* [MySQL索引数据结构入门](https://segmentfault.com/a/1190000043655061)


![](/images/sql执行顺序.png)


**MySQL优化工具**

+ 压测 [https://github.com/topics/sysbench](https://github.com/topics/sysbench)
  + [Mysql专栏 - 线上调优与压力测试](https://www.52pojie.cn/thread-1502301-1-1.html)


* [https://github.com/major/MySQLTuner-perl](https://github.com/major/MySQLTuner-perl)
* [https://github.com/BMDan/tuning-primer.sh](https://github.com/BMDan/tuning-primer.sh)
* pt-query-digest、pt-variable-advisor：[https://www.percona.com/downloads/percona-toolkit/LATEST/](https://www.percona.com/downloads/percona-toolkit/LATEST/)
* [https://www.red-gate.com/products](https://www.red-gate.com/products)
* [https://www.sqlgate.com](https://www.sqlgate.com)
* [https://www.jetprofiler.com](https://www.jetprofiler.com)
* [https://www.solarwinds.com/zh/database-performance-monitoring-software](https://www.solarwinds.com/zh/database-performance-monitoring-software)
* 高可用复制管理工具 [https://github.com/openark/orchestrator](https://github.com/openark/orchestrator)
* 水平切片集群扩展 [https://github.com/vitessio/vitess](https://github.com/vitessio/vitess)
* 配置管理 [https://github.com/AhmedAredah/DBSwitcher](https://github.com/AhmedAredah/DBSwitcher)



**MySql5.0以上字符串数据类型可以存的汉字个数**

* [https://dev.mysql.com/doc/refman/5.7/en/data-types.html](https://dev.mysql.com/doc/refman/5.7/en/data-types.html)

> 注意谨慎选择较大的存储数据类型

- UTF8MB4编码：一个汉字 = 4 个字节，英文是一个字节（bytes）
- UTF8编码：一个汉字 = 3 个字节，英文是一个字节（bytes）
- GBK编码： 一个汉字 = 2 个字节，英文是一个字节（bytes）

+ 在UTF8状态下 longtext : 4294967295/3=1431655765 个汉字，约14亿，存储空间占用：4294967295/1024/1024/1024=4G 的数据
+ 在UTF8状态下 mediumtext : 16777215/3=5592405 个汉字，约560万，存储空间占用：16777215/1024/1024=16M 的数据
+ 在UTF8状态下 text : 65535/3=21845个汉字，约20000，存储空间占用：65535/1024=64K 的数据
+ 在UTF8状态下 tinytext : 256/3=85个汉字，存储空间占用：256 bytes
+ 在UTF8MB4状态下 varchar ： (65535 - 2) / 4 = 16383 个汉字，英文也为 16383 个字符串，存储空间占用：64k
+ 在UTF8状态下 varchar ： (65535 - 2) / 3 = 21844 个汉字，英文也为 21844 个字符串，存储空间占用：64k
+ 在GBK状态下 varchar ： (65535 - 2) / 2 = 32766 个汉字，英文也为 32766 个字符串，存储空间占用：64k

> varchar 超过255个字节会有2字节的额外占用空间开销，所以减2，如果是255以下，则减1

* [mysql的varchar与text对比](https://blog.51cto.com/arthur376/2121160)



## 索引

> 索引是加速搜索引擎检索数据的一种特殊表查询。简单地说，索引是一个指向表中数据的指针。
> 索引也是一张表，该表保存了主键与索引字段，并指向实体表的记录。因为更新表时，MySQL不仅要保存数据，还要保存一下索引文件。
> 建立索引会占用磁盘空间的索引文件。

> 一个数据库中的索引与一本书的索引目录是非常相似的。
> 拿汉语字典的目录页（索引）打比方，我们可以按拼音、笔画、偏旁部首等排序的目录（索引）快速查找到需要的字。

> 索引有助于加快 SELECT 查询和 WHERE 子句，但它会减慢使用 UPDATE 和 INSERT 语句时的数据输入。索引可以创建或删除，但不会影响数据。
> 使用 CREATE INDEX 语句创建索引，它允许命名索引，指定表及要索引的一列或多列，并指示索引是升序排列还是降序排列。
> 索引也可以是唯一的，与 UNIQUE 约束类似，在列上或列组合上防止重复条目。


* [在线DDL操作 - 官网](https://dev.mysql.com/doc/refman/8.0/en/innodb-online-ddl-operations.html)
* [MySQL 全文索引实现简单版搜索引擎](https://www.cnblogs.com/YangJiaXin/p/11153579.html)
* [mysql数据库的索引类型](https://baijiahao.baidu.com/s?id=1641311517406582639)
* [详细介绍mysql索引类型：FULLTEXT、NORMAL、SPATIAL、UNIQUE](https://blog.csdn.net/guo_qiangqiang/article/details/88794971)
* [MYSQL8.0全文索引使用](https://blog.csdn.net/csdnnhb2014/article/details/104466891)


```sql
-- 强制使用指定索引
FORCE INDEX (索引名)
```

**从数据结构角度**

1. BTREE
2. HASH

**从物理存储角度**

1. 聚集索引（clustered index）
2. 非聚集索引（non-clustered index）

**从逻辑角度**

- Normal（普通索引）

```sql
CREATE INDEX 索引名 ON 表名(`字段名`(length));
ALTER TABLE 表名 ADD INDEX IndexName(`字段名`(length));
```

- Unique（唯一索引）

```sql
CREATE UNIQUE INDEX 索引名 ON 表名(`字段名`(length));
ALTER TABLE 表名 ADD UNIQUE (column_list);
```

- 组合索引

```sql
CREATE INDEX 索引名 On 表名(`字段名`(length),`字段名`(length),...);
ALTER TABLE 表名 ADD INDEX 索引名 (id,name);
```

- SPATIAL（空间索引）

- Full Text（全文索引）

* [https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html)
* [ngram全文分析器 - 官网](https://dev.mysql.com/doc/refman/8.0/en/fulltext-search-ngram.html)

```ini
# 最小字符长度，默认是4，必须要匹配大于4的才会有返回结果
ft_min_word_len=2
# 存储在InnoDB的FULLTEXT索引中的最小词长
innodb_ft_min_token_size=2
# 中文检索分词插件，设置分词大小，取值范围是1到10,默认值是2，分词的SIZE越大,索引的体积就越大
# 注意位置必须放在全文索引的配置后面
ngram_token_size=1
```

```sql
-- 查看所有全文索引相关参数
SHOW GLOBAL VARIABLES LIKE '%ft%';
SHOW GLOBAL VARIABLES LIKE 'ngram_token_size';
```

```sql
ALTER TABLE tablename ADD FULLTEXT(column1, column2);
```

* [MySQL全文索引之布尔全文索引、查询扩展全文索引](https://blog.csdn.net/yyyxxxs/article/details/100079074)

```sql
-- 
SELECT * FROM 表名 WHERE MATCH(column1, column2) AGAINST('aa','bb','cc'...);
-- 使用IN BOOLEAN MODE匹配不完整单词，默认IN NATURAL LANGUAGE MODE（自然语言模式）
SELECT * FROM  表名 WHERE MATCH(字段) AGAINST('关键词' IN BOOLEAN MODE);
```

**重新构建索引文件**

* [重建或修复表或索引 - 官网](https://dev.mysql.com/doc/refman/8.0/en/rebuilding-tables.html)

```sql
-- 对于InnoDB存储引擎的表无效
REPAIR TABLE 表名 QUICK;
-- InnoDB对表进行索引的重新构建
ALTER TABLE 表名 ENGINE=INNODB;
-- 使用优化指令也可以起到同样的作用，同时这个指令会完成更多的优化作用。OPTIMIZE TABLE运行过程中，MySQL会锁定表
OPTIMIZE TABLE 表名;
-- 执行之后会返回如下信息，但实际上是执行成功的
-- Table does not support optimize, doing recreate + analyze instead
```



## 常用语句


```sql
-- 根据表注释查找对应的表
SELECT TABLE_NAME 表名,TABLE_COMMENT '表注解' FROM INFORMATION_SCHEMA.TABLES
 WHERE TABLE_SCHEMA = '数据库名' AND TABLE_COMMENT  LIKE '%注释关键词%';
```


```sql
-- 插入或替换 若id=1的记录不存在，REPLACE语句将插入新记录，否则，当前id=1的记录将被删除，然后再插入新记录。
REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
-- 插入或更新 upsert
INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99) ON DUPLICATE KEY UPDATE name='小明', gender='F', score=99;
-- 插入或忽略
INSERT IGNORE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);
```




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


```sql
SELECT * FROM 表名 GROUP BY 别名.字段 HAVING MAX(别名.字段);
-- 因为`group by`后取的一条数据默认是按照主键id排序后的第一条，所以对表先排序，然后再分组
SELECT 别名.* FROM (SELECT * FROM 表名 ORDER BY 字段 DESC) AS 别名 GROUP BY 别名.字段;
```

### 删除重复值

**查询单个字段**

- 方式一

```sql
DELETE FROM test WHERE id NOT IN(SELECT MIN(id) FROM images GROUP BY name)
```

- 方式二

```sql
DELETE FROM test WHERE name 
IN(SELECT name FROM test GROUP BY name HAVING COUNT(name)>1) 
AND id NOT IN(SELECT MIN(id) FROM test GROUP BY name HAVING COUNT(name)>1)
```


### 查询数据库中的存储过程

```sql
selectnamefrom mysql.proc where db = 'your_db_name' andtype= 'PROCEDURE';

show procedure status;

-- 查看存储过程或函数的创建代码
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

- `now()` 
- `sysdate()` 日期时间函数跟 now() 类似，不同之处在于：now() 在执行开始时值就得到了， sysdate() 在函数执行时动态得到值。

### 获得当前日期

- `curdate() `下面的两个时间函数同阶
	- `current_date()`
	- `current_date` 

### 获得当前时间time函数

- `curtime()`下面的两个时间函数同阶
	- `current_time()`
	- `current_time` 

### 获得当前UTC日期时间函数

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


### 查看授权

```sql
# 查看root用户
SHOW GRANTS;
# 查看指定用户
SHOW GRANTS FOR 'root'@'localhost';
```

### 创建用户并授权

> 以root用户登录到数据库后进行用户创建


**`CREATE`创建的用户需要手动授权**

- `username` 将要创建的用户名；
- `host` 指定该用户在哪个主机上可以登录，`%` 表示在任何一台电脑上都可以登录
- `password` 该用户的登录密码，密码可以为空，若为空则该用户可以不需要密码登录服务器

```sql
# 创建本地登录账户
CREATE USER 'admin'@'localhost' IDENTIFIED BY '密码';
# 创建所有主机可登录账户
CREATE USER 'admin'@'%' IDENTIFIED BY '密码';
```


**`GRANT`创建用户或授权**

- `GRANT` 用户存在时会进行授权，用户不存在时，创建用户并授权。
	- 8.0 必须先创建其他用户再授权（不能授权给自己），否则会报错`You are not allowed to create a user with GRANT`
- `WITH GRANT OPTION` 这个选项表示该用户可以将自己拥有的权限授权给别人
- `PRIVILEGES` 用户的操作权限，如`INSERT`,`DELETE`,`UPDATE`,`SELECT`等。所有权限则使用`ALL PRIVILEGES`。
- `database.table` 数据库名.表名，所有数据库和表用`*.*`表示。用“`”（反引号）包裹。
- `IDENTIFIED BY` 指定密码，如果不带此属性会导致创建的用户无法远程连接，虽然从`mysql.user`查出`host`为`%`
	- 8.0 使用此语句会报错

```sql
# 创建只读账号
GRANT SELECT ON database.* TO 'reader'@'%' IDENTIFIED BY "密码";
# 增删改查账号
GRANT INSERT,DELETE,UPDATE,SELECT ON database.* TO 'writer'@'%' IDENTIFIED BY "密码";
# 创建拥有所有权限的账户，并且所有主机可登录
GRANT ALL PRIVILEGES ON database.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
# MySQL 8.0 为用户授权所有权限
GRANT ALL PRIVILEGES ON database.* TO 'root'@'%' WITH GRANT OPTION;

# 刷新权限
FLUSH PRIVILEGES;
# 查看用户信息
select user,host from mysql.user;
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
# 其中`root@localhost:`后面部分就是默认密码
grep 'temporary password' /var/log/mysqld.log
```


- 修改密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
# 8.0
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
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
# 或者使用update修改
update user set password=PASSWORD("123456") where user='root';
```



## 常见问题

### GROUP_CONCAT

- 使用`GROUP_CONCAT`出现

> Row 147 was cut by GROUP_CONCAT()

- 由于MySQL的`GROUP_CONCAT`有默认大小值，先查询一下

```sql
SHOW VARIABLES LIKE 'group_concat_max_len';
#或者
SELECT @@global.group_concat_max_len;
```

- 默认值为1024

| Variable_name | Value |
|-------------|------------|
| group_concat_max_len | 1024 |



### 修改默认值大小

- 在MySQL配置文件中添加配置

```bash
#-1为最大值或根据实际需求设置长度
group_concat_max_len = -1
```

- 如果是生产环境下，不能擅自重启MySQL服务，则可以通过语句设置`group_concat`的作用范围

```sql
SET GLOBAL group_concat_max_len=-1;
SET SESSION group_concat_max_len=-1;
```



### 自定义函数


**执行自定义函数报错**

> `This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and
binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)`


- 查看是否开启`log_bin_trust_function_creators`

```sql
SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
#或者
SELECT @@global.log_bin_trust_function_creators;
```

- 默认关闭

| Variable_name	| Value |
|------------------|-----------------|
|log_bin_trust_function_creators | OFF|

- 开启

> 在MySQL配置文件中`[mysqld]`节点下加上

```bash
log_bin_trust_function_creators=1
```

> 如果是生产环境下，不能擅自重启MySQL服务，则可以通过语句开启，重启后无效

```sql
SET GLOBAL log_bin_trust_function_creators = 1;
#或者
SET GLOBAL log_bin_trust_function_creators=TRUE;
```


### 表名未忽略大小写

```bash
vim /etc/my.cnf
```

**在[mysqld]模块中添加**

```bash
lower_case_table_names = 1
```

**保存并重启mysql**


