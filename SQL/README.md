# SQL


[[toc]]



## Flag

* [https://github.com/dunwu/db-tutorial](https://github.com/dunwu/db-tutorial)
* [https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/cm_chap_SQLCommandRef.html](https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/cm_chap_SQLCommandRef.html)
* [https://www.alibabacloud.com/help/zh/analyticdb-for-mysql/latest/sql-manual](https://www.alibabacloud.com/help/zh/analyticdb-for-mysql/latest/sql-manual)
* 自学SQL网 [http://xuesql.cn](http://xuesql.cn)
* 数据库压测 [https://github.com/akopytov/sysbench](https://github.com/akopytov/sysbench)
* [https://github.com/stcarrez/sql-benchmark](https://github.com/stcarrez/sql-benchmark)
* 优化和改写 [https://github.com/XiaoMi/soar](https://github.com/XiaoMi/soar)
* [https://www.1keydata.com/cn/sql](https://www.1keydata.com/cn/sql)
* [https://www.twle.cn/l/yufei/sql/sql-basic-index.html](https://www.twle.cn/l/yufei/sql/sql-basic-index.html)
* [https://www.begtut.com/sql/sql-ref-keywords.html](https://www.begtut.com/sql/sql-ref-keywords.html)
* [https://wizardforcel.gitbooks.io/w3school-sql](https://wizardforcel.gitbooks.io/w3school-sql)
* HiveSQL教程 [https://www.gairuo.com/p/hive-sql-tutorial](https://www.gairuo.com/p/hive-sql-tutorial)


**备份/迁移/同步/导入导出**

+ [https://github.com/topics/binlog](https://github.com/topics/binlog)
+ [https://github.com/topics/flashback](https://github.com/topics/flashback)
+ 迁移 [https://github.com/topics/migrations](https://github.com/topics/migrations)
+ [https://github.com/topics/migration](https://github.com/topics/migration)

- 同步 [https://github.com/alibaba/DataX](https://github.com/alibaba/DataX)
- 日志解析订阅和消费 [https://github.com/alibaba/canal](https://github.com/alibaba/canal)
- [https://github.com/ucarGroup/DataLink](https://github.com/ucarGroup/DataLink)
- 数据库迁移 [https://github.com/flyway/flyway](https://github.com/flyway/flyway)
- Go编写的数据库迁移 [https://github.com/golang-migrate/migrate](https://github.com/golang-migrate/migrate)
- PostgreSQL迁移 [https://github.com/jackc/tern](https://github.com/jackc/tern)
- [https://github.com/DTStack/flinkx](https://github.com/DTStack/flinkx)
- [https://gitee.com/ghi/dbsyncer](https://gitee.com/ghi/dbsyncer)
- [https://github.com/jeessy2/backup-x](https://github.com/jeessy2/backup-x)
- [https://github.com/jeessy2/backup-db](https://github.com/jeessy2/backup-db)




**数据库分类**

1. 关系型数据库(SQL)
2. 非关系型数据库(NoSQL)：键值、列存储、图形、文档、搜索引擎
3. 网状数据库
4. 层次数据库
5. 新型数据库(NewSQL)：关系型数据库与NoSQL的结合 [The bridge between SQL and NoSQL](https://www.techtarget.com/searchdatamanagement/feature/NewSQL-databases-The-bridge-between-SQL-and-NoSQL)
6. 分布式数据库



**NoSQL**

- 1970: NoSQL = We have no SQL
- 1980: NoSQL = Know SQL
- 2000: NoSQL = No SQL!
- 2005: NoSQL = Not only SQL
- 2013: NoSQL = No, SQL!




## 数据库设计


**范式：Normal Format**

> 符合某一种级别的关系模式的集合，表示一个关系内部各属性之间的联系的合理化程度。一个数据库表之间的所有字段之间的联系的合理性。

- 范式是离散数学里的概念
- 范式目标是在满足组织和存储的前提下使数据结构冗余最小化
- 范式级别越高，表的级别就越标准


+ 第一范式：1NF，确保表中每一列数据的原子性，不可再分！
+ 第二范式：2NF，在满足第一范式的基础上，确保列数据要跟主键关联，不能出现部分依赖。
+ 第三范式：3NF，再满足第二范式的基础上，保证每一列数据都要跟主键直接关联，不能出现传递依赖。
+ BCNF范式,4NF,5NF
+ 反范式：用空间换时间，通过适当的数据冗余提高查询效率，但冗余数据会牺牲数据一致性


* [数据库设计-表结构的设计范式](https://zhuanlan.zhihu.com/p/353493253)
* [数据库设计三大范式](https://www.cnblogs.com/jingzh/p/15270698.html)


- [数据库分库分表Java实战经验总结](https://bbs.huaweicloud.com/blogs/286564)
- [数据库分区](https://www.jianshu.com/p/8bfe4ed00f88)
- [数据库分区、分表、分库、分片](https://blog.csdn.net/chezong/article/details/123322973)




## 免费数据库

**MySQL**

* [https://remotemysql.com](https://remotemysql.com)
* [https://www.db4free.net](https://www.db4free.net)


**SQLServer**

* [https://www.gearhost.com](https://www.gearhost.com)


**PostgresqlSQL**

* [https://www.elephantsql.com](https://www.elephantsql.com)
* [https://memfiredb.com](https://memfiredb.com)


**Redis**

* [https://redislabs.com/redis-enterprise-deployment](https://redislabs.com/redis-enterprise-deployment)
