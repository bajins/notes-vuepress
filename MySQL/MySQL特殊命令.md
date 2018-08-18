## 查看数据库详细信息
#### MySQL中information_schema数据库记录每个表占用的空间、表记录的行数，在该库中有一个 TABLES 表，这个表主要字段分别是：

|字段        |    说明     |
|------------|------------|
|TABLE_SCHEMA | 数据库名   |
|TABLE_NAME   | 表名      |
|ENGINE       | 所使用的存储引擎|
|TABLES_ROWS  | 记录数    |
|DATA_LENGTH  | 数据大小   |
|INDEX_LENGTH | 索引大小   |

#### 其他字段请参考MySQL的手册，我们只需要了解这几个就足够了。

### 查看一个数据库占用空间的大小，那就相当于是 数据大小(DATA_LENGTH)+索引大小(INDEX_LENGTH) 即可，SQL语句:
```sql
SELECT TABLE_NAME,DATA_LENGTH+INDEX_LENGTH,TABLE_ROWS FROM TABLES WHERE TABLE_SCHEMA='数据库名' ORDER BY TABLE_ROWS DESC
```
### 查看一个表占用空间的大小，那就相当于是 数据大小(DATA_LENGTH)+索引大小(INDEX_LENGTH) 即可，SQL语句:
```sql
SELECT TABLE_NAME,DATA_LENGTH+INDEX_LENGTH,TABLE_ROWS FROM TABLES WHERE TABLE_SCHEMA='数据库名' AND TABLE_NAME='表名' ORDER BY TABLE_ROWS DESC
```
