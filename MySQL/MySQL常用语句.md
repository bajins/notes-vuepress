# MySQL常用语句


## 命令行
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


## 随机取值
> 先根据rand()和id获取一遍随机数，再跟原表关联，最后取出值，因为是随机取，所以你的id值越平均，数据量越大，最后limit之前获取的id值就会越接近整表数据量的一半，limit取到的结果也越接近。

```sql
SELECT * FROM `table1` AS t1 JOIN (SELECT ROUND(RAND() * (SELECT MAX(id) FROM `table1`)) AS id) AS t2 WHERE t1.id >= t2.id ORDER BY t1.id ASC LIMIT 1
```
### 最大减去最小值乘以随机值获取随机数
```sql
SELECT * FROM USER WHERE id >= ( ( SELECT MAX( id ) FROM USER ) - ( SELECT MIN( id ) FROM USER ) ) * RAND( ) + ( SELECT MIN( id ) FROM USER ) LIMIT 1
```
> `order by rand()`效率极低，采用JOIN的语法比直接在WHERE中使用函数效率还要高很多

## 随机插入
### 连续有限队列随机取
```sql
update table1 set a = (floor(rand() * 4) + 3) where b = 84;
```
### 非连续有限队列随机取
```sql
update table1 set a = elt(floor(rand() * 4) + 1, 5, 7, 11, 13) where b = 84;
```

## 查询分组中某字段最大值
> 因为`group by`后取的一条数据默认是按照主键id排序后的第一条，所以对表先排序，然后再分组

```sql
SELECT 别名.* FROM (SELECT * FROM 表名 ORDER BY 字段 DESC) AS 别名 GROUP BY 别名.字段;
```

## 查询数据库中的存储过程
```sql
selectnamefrom mysql.proc where db = 'your_db_name' andtype= 'PROCEDURE';

show procedure status;

# 查看存储过程或函数的创建代码
show create procedure proc_name;
show create function func_name;
```

## 事务隔离级别修改
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
