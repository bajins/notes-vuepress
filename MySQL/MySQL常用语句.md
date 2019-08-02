# MySQL常用语句

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