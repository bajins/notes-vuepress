## MySQL查看数据库详细信息
### information_schema数据库记录每个表和数据库的详细信息，在该库中有一个TABLES表：

|字段        |    说明     |
|------------|------------|
|TABLE_SCHEMA | 数据库名   |
|TABLE_NAME   | 表名      |
|ENGINE       | 所使用的存储引擎|
|TABLES_ROWS  | 记录数    |
|DATA_LENGTH  | 数据大小   |
|INDEX_LENGTH | 索引大小   |

#### 其他字段请参考MySQL的手册，我们只需要了解这几个就足够了。

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

### 查看一个数据库占用空间的大小，那就相当于是 数据大小(DATA_LENGTH)+索引大小(INDEX_LENGTH) 即可，SQL语句:
```sql
SELECT
	TABLE_NAME,
	DATA_LENGTH + INDEX_LENGTH AS TABLE_SIZE,
	TABLE_ROWS 
FROM
TABLES 
WHERE
	TABLE_SCHEMA = '数据库名' 
ORDER BY
	TABLE_ROWS DESC
```
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

### 查看一个表占用空间的大小，那就相当于是 数据大小(DATA_LENGTH)+索引大小(INDEX_LENGTH) 即可，SQL语句:
```sql
SELECT
	TABLE_NAME,
	DATA_LENGTH + INDEX_LENGTH AS TABLE_SIZE,
	TABLE_ROWS 
FROM
TABLES 
WHERE
	TABLE_SCHEMA = '数据库名' 
	AND TABLE_NAME = '表名' 
ORDER BY
	TABLE_ROWS DESC
```
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

