# MySQL


[[toc]]



## Flag

+ [https://github.com/topics/innodb](https://github.com/topics/innodb)
+ [https://github.com/topics/mysql](https://github.com/topics/mysql)


* [https://github.com/phpmyadmin/phpmyadmin](https://github.com/phpmyadmin/phpmyadmin)
* [https://github.com/vrana/adminer](https://github.com/vrana/adminer)
* [如果是MySQL引起的CPU消耗过大，你会如何优化？](https://www.cnblogs.com/xiaoheliu1024/p/12657929.html)
* 全文搜索 [https://github.com/mengzhuo/sqlalchemy-fulltext-search](https://github.com/mengzhuo/sqlalchemy-fulltext-search)

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



**通过分组聚合GROUP_CONCAT实现分析函数（开窗函数）**

* [Mysql 分组聚合实现 over partition by 功能](https://blog.csdn.net/jishanwang/article/details/87179461)

```sql
SELECT
  product_id,
  branch,
  GROUP_CONCAT(t.stock ORDER BY t.stock DESC ) stocks
FROM (SELECT *
      FROM product_stock) t
GROUP BY product_id,branch
```



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


