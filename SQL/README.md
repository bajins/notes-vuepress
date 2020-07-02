# SQL


[[toc]]



## flag

* [http://www.h2database.com](http://www.h2database.com)
* [http://hsqldb.org](http://hsqldb.org)

- [https://github.com/flyway/flyway](https://github.com/flyway/flyway)




## MySQL

* [MySQL 全文索引实现简单版搜索引擎](https://www.cnblogs.com/YangJiaXin/p/11153579.html)
* [如果是MySQL引起的CPU消耗过大，你会如何优化？](https://www.cnblogs.com/xiaoheliu1024/p/12657929.html)

![](/images/sql执行顺序.png)


**MySQL优化工具**

* [https://github.com/major/MySQLTuner-perl](https://github.com/major/MySQLTuner-perl)
* [https://github.com/BMDan/tuning-primer.sh](https://github.com/BMDan/tuning-primer.sh)
* pt-query-digest、pt-variable-advisor：[https://www.percona.com/downloads/percona-toolkit/LATEST/](https://www.percona.com/downloads/percona-toolkit/LATEST/)
* [https://www.red-gate.com/products](https://www.red-gate.com/products)
* [https://www.sqlgate.com](https://www.sqlgate.com)


**MySql 5.0 以上字符串数据类型可以存的汉字个数**

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




## SQLite3

* [SQLite教程（内置日期和时间函数）](https://blog.csdn.net/hexingen/article/details/71577318)
* [SQLite 教程](https://www.twle.cn/l/yufei/sqlite/sqlite-basic-index.html)
* [SQLite 教程](https://www.runoob.com/sqlite/sqlite-tutorial.html)
* [SQLite3 数据类型与亲和类型](https://blog.csdn.net/feiyihexin/article/details/99728504)



**连接符**

| 连接符  | 说明       |
|------|----------|
| \-    | 算术减法     |
| \!=  | 关系不等于    |
| %    | 算术模量     |
| &    | 逻辑与      |
| \*   | 算术乘法     |
| /    | 算术除法     |
| \|   | 逻辑或      |
| \|\| | 字符串串联    |
| \+   | 算术加法     |
| <    | 关系小于     |
| <<   | 按位右移     |
| <=   | 关系式小于或等于 |
| <>   | 关系不等于    |
| =    | 关系等于     |
| ==   | 关系等于     |
| >    | 关系大于     |
| >=   | 关系大于或等于  |
| >>   | 按位左移     |
| AND  | 逻辑与      |
| GLOB | 关系文件名匹配  |
| IN   | 逻辑输入     |
| LIKE | 关系字符串匹配  |
| OR   | 逻辑或      |


## Redis

+ [https://redis.io/documentation](https://redis.io/documentation)
+ [https://github.com/huangz1990/redis-3.0-annotated](https://github.com/huangz1990/redis-3.0-annotated)

* [https://github.com/huangz1990/redis](https://github.com/huangz1990/redis)
    * [http://redisdoc.com](http://redisdoc.com)
    * [http://doc.redisfans.com](http://doc.redisfans.com)
* [https://github.com/antirez/redis-doc](https://github.com/antirez/redis-doc)
    * [http://www.redis.cn/documentation.html](http://www.redis.cn/documentation.html)
* [https://github.com/guodongxiaren/redis-wiki](https://github.com/guodongxiaren/redis-wiki)
* redis常用特性：[https://github.com/LxyTe/redis](https://github.com/LxyTe/redis)

- [https://github.com/nitzzzu/RedisDesktopManager](https://github.com/nitzzzu/RedisDesktopManager)
- [https://github.com/kanyways/rdm](https://github.com/kanyways/rdm)
- [https://github.com/lework/RedisDesktopManager-Windows](https://github.com/lework/RedisDesktopManager-Windows)


## Memcached




## MongoDB



## 免费数据库

**MySQL**

* [https://remotemysql.com](https://remotemysql.com)
* [https://www.db4free.net](https://www.db4free.net)


**SQLServer**

* [https://www.gearhost.com](https://www.gearhost.com)


**PostgresqlSQL**

* [https://www.elephantsql.com](https://www.elephantsql.com)


**Redis**

* [https://redislabs.com/redis-enterprise-deployment](https://redislabs.com/redis-enterprise-deployment)