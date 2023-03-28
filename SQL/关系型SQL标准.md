# 关系型SQL标准

[[toc]]


## Flag

> Structured Query Language：SQL86、SQL89、SQL92、SQL99、SQL2003、SQL2008、SQL2011、SQL2016

* [https://github.com/crate/sql-99](https://github.com/crate/sql-99)
* [https://standards.iso.org/ittf/PubliclyAvailableStandards/index.html](https://standards.iso.org/ittf/PubliclyAvailableStandards/index.html)
* [SQL标准简介](https://cloud.tencent.com/developer/article/1442564)
* [数据库必知词汇：SQL标准](https://developer.aliyun.com/article/745815)
* [SQL数据库中什么是游标？](https://www.zhihu.com/question/59114952/answer/2477832680)
* [SQL之游标](https://www.cnblogs.com/xiao02fang/p/12567687.html)


> 在标准 SQL 中，字符串使用的是单引号。

> 如果字符串本身也包括单引号，则使用两个单引号（注意，不是双引号，字符串中的双引号不需要另外转义）。

> 有些SQL中使用双引号字符串，是其它的数据库对 SQL 的扩展，比如在MySQL中允许使用单引号和双引号两种。

> 保留字不能用于表名，比如desc，此时需要加入反引号来区别，但使用表名时可忽略反引号。
>
> 保留字不能用于字段名，比如desc，此时也需要加入反引号，并且insert等使用时也要加上反引号




## DDL/DML/DQL/DCL/TCL

- DDL(Data Definition Language) 数据定义语言，用于定义和管理 SQL 数据库中的所有对象的语言
    1. CREATE - 创建
    2. ALTER - 修改
    3. DROP - 删除
    4. TRUNCATE - 截断/移除，立即回收磁盘空间，而不需要后续的VACUUM操作
    5. COMMENT - 注释
    6. RENAME - 重命名
- DML(Data Manipulation Language) 数据操纵语言，用于SQL中处理数据等操作统称为数据操纵语言，对模式对象内的数据执行查询
    1. INSERT - 添加
    2. UPDATE - 更新
    3. DELETE - 删除
    4. CALL - 调用
    5. EXPLAIN PLAN - 解释
    6. LOCK TABLE - 锁，用于控制并发
- DQL(Data Query Language) 数据查询语言，根据传递给它的查询获取一些模式关系
    1. SELECT - 用于从数据库中检索数据
- DCL(Data Control Language) 数据控制语言，用来授予或回收访问数据库的某种特权
    1. GRANT - 授权 允许对象的创建者给某用户或某组或所有用户(PUBLIC)某些特定的权限。
    2. REVOKE - 收回已经授予的权限
- TCL(Transaction Control Language) 事务控制语言/存储过程控制预言
    1. COMMIT - 提交保存已完成的工作
    2. SAVEPOINT - 在事务中设置保存点，可以回滚到此处
    3. ROLLBACK - 回滚
    4. SET TRANSACTION - 改变事务特性选项


![](/images/ddl-dml-dcl.png)
![](/images/ddl-dml-dcl-tcl.png)
![](/images/SQL语言.png)




## TREE树形结构

- `start with 起始位置 connect by prior 本级=上级`
- `start with 起始位置 connect by 本级=上级`
- `connect by 本级=上级`

![](/images/sql-tree.jpg)



## SQL1992

 

## SQL1999

**sql分类**

> `+` 在哪一边的列，该表就补充null


1. cross join 交叉连接 （笛卡尔积，表乘表） ，不需要on关键字
2. natural join 自然连接 （找两个表中相同的列，进行等值匹配），不需要on关键字
3. inner join 内连接
    - 必须有on关键字，on表示连接条件
    - inner 关键字可以省略
4. outer join 外连接，outer关键字可以省略
    - left outer join 左外连接，`+` 在等号右边
    - right outer join 右外连接，`+` 在等号左边
    - full outer join 全外连接
5. 等值连接 表的连接条件使用 `=`
6. 非等值连接 表的连接条件使用 `>、>=、 <、<=、!=、any` 等
7. 自连接 自己连接自己


**sql99语法：通过join关键字实现连接**

- 含义：1999年推出的sql语法
- 支持： 等值连接、非等值连接 （内连接）、外连接

```sql
select 字段，...
from 表1
【inner|left outer|right outer】join 表2 on  连接条件
【inner|left outer|right outer】join 表3 on  连接条件
【where 分组前筛选条件】
【group by 分组字段】
【having 分组后的筛选条件】
【order by 最后执行的，排序的字段或表达式】
```

> 好处：语句上，连接条件和筛选条件实现了分离，简洁明了！





### 自连接

- cross join：自然连接。主要用于产生笛卡尔积。
    - `select * from emp cross join dept;`
- natural join：自然连接。这种情况下，数据库会自动找到一个字段来消除笛卡尔积。一般来说，数据库会找那些通过外键约束关联的字段。因此，有较大的局限性。
    - `select * from emp natural join dept;`

> 案例：查询员工名和直接上级的名称

- sql99

```sql
SELECT e.last_name,m.last_name
FROM employees e
JOIN employees m ON e.`manager_id`=m.`employee_id`;
```

- sql92

```sql
SELECT e.last_name,m.last_name
FROM employees e,employees m 
WHERE e.`manager_id`=m.`employee_id`;
```



### 子查询

> 含义：一条查询语句中又嵌套了另一条完整的select语句，其中被嵌套的select语句，称为子查询或内查询在外面的查询语句，称为主查询或外查询

**特点：**

1. 子查询都放在小括号内
2. 子查询可以放在from后面、select后面、where后面、having后面，但一般放在条件的右侧
3. 子查询优先于主查询执行，主查询使用了子查询的执行结果
4. 子查询根据查询结果的行数不同分为以下两类：
    - 单行子查询，结果集只有一行，一般搭配单行操作符使用：`> < = <> >= <=`，非法使用子查询的情况：
        - 子查询的结果为一组值
        - 子查询的结果为空
    - 多行子查询，结果集有多行，一般搭配多行操作符使用：any、all、in、not in
        - in： 属于子查询结果中的任意一个就行
        - any和all往往可以用其他查询代替



### 分页查询

> 应用场景：实际的web项目中需要根据用户的需求提交对应的分页查询的sql语句

```sql
select 字段|表达式,...
from 表
【where 筛选条件】
【group by 分组字段】
【having 分组后的筛选条件】
【order by 排序的字段】
limit 【起始的记录索引，】 每页的记录数;
```

**特点：**

1. 起始条目索引从0开始
2. limit子句放在查询语句的最后
3. 公式：`select * from  表 limit （page-1）*sizePerPage, sizePerPage`
    - 假如：每页显示条目数sizePerPage,要显示的页数 page


**Oracle分页**

```sql
select * from (
    select rownum as rn, first_name from (select first_name from some_table order by first_name)
  ) where rn > 100  and rn <= 200

select * from (select ncallernm, count(*) tol from tmp_86 group by ncallernm order by tol desc) where rownum<20

select * from OB_CALL_DATA_LOG rownum<101  minus  select * from OB_CALL_DATA_LOG rownum>9
```



### 连接查询


- 连接查询的分类：
    - 按年代分为sql192标准仅仅支持内连接，sql199标准支持内连接，左外连接，右外连接，交叉连接
    - 按功能分为内连接，外连接，交叉连接


**sql92标准：内连接包括**

1. 等值连接：`select name,boyname form boys,beauty where beauty.boyfriend_id = boys.id;`
    - 多表等值连接的结果为多表的交集部分;n表连接至少需要n-1个连接条件;多表的顺序没有要求;一般需要为表起别名
2. 非等值连接：`select salary,grade_level form employees e,job_grades g where salary between g.'lowest_sal' and 'highest_sal';`
3. 自连接：`select e.employee_id,e.last_name,m.employee_id,m.last_name from employees e,employees m where e.'manager_id' = m.'employee_id';`


**sql99语法：包括内连接(inner)，外连接(left outer ,right outer,full outer)，交叉连接(cross join)**

> 语法：`select 查询列表 form 表1 别名 【连接类型】 join 表2 别名 on 连接条件 【where 筛选条件】`

> 特点：添加排序，分组，筛选，inner可以省略，筛选条件放在where后面，连接条件放在on后面，提高分离性

1. 内连接：`select 查询列表 form 表1 别名 inner join 表2 别名 on 连接条件`
    - 等值连接：`select last_name,department_name form employee e inner join department d on e.'department_id' = d.'department_id';`
    - 非等值连接：`select  salary,grade_level from employee e join job_grades g on e.'salary' between g.'lowest_sal' and g.'highest_sal' group by grade_level;`
    - 自连接: `select e.last_name,m.last_name from employees e join employees m on e.'manager_id' = m.'employee_id' where e.'last_name' like '%k%';`

2. 外连接：用于查询一个表中有，一个表中没有的，外连接的查询结果是主表中的所有记录 如果从表中有和它匹配的值，则显示出来，没有显示null
    - 左外连接，left join左边的是主表： `select b.name,bo.* form beauty b left outer join boys bo on b.'boyfriend_id' = bo.'id';`
    - 右外连接，right join右边的是主表： `select b.name,bo.* form boys bo right outer join  beauty b on b.'boyfriend_id' = bo.'id';`
    - 全外连接，等于内连接的结果，加上表1有但表2没有的，加上表2有表一没有的 use girls; `select b.*,bo.* from beauty b full outer join boys bo on b.'boyfriend_id' = 'bo.id';`
    - 交叉连接：`select b.*,bo.* form beauty b cross join boys bo;`




### CASE

> 同其他编程语言中的`switch...case`或`if...else`语句，可以直接在`order by` 后面使用自定义排序

> Case函数在满足了某个符合条件后，剩下的条件将会被自动忽略，因此，即使满足多个条件，执行过程中也只认第一个条件。
> 在使用 CASE WHEN时，可以把它当作一个没有字段名的字段，字段值根据条件确认，在需要使用字段名时可以是用 `as` 来定义别名。

- 简单Case函数

> 简单Case函数胜在简洁，但是它只适用于这种单字段的单值比较

```sql
CASE sex
WHEN '0' THEN '男'
WHEN '1' THEN '男'
WHEN '2' THEN '女'
ELSE '其他' END
```

- Case搜索函数

> Case搜索函数的优点在于适用于所有比较的情况

```sql
CASE WHEN sex = '1' and sex = '0' THEN '男'
WHEN sex = '2' THEN '女'
ELSE '其他' END
```



## SQL2003

* [窗口函数](https://docs.aws.amazon.com/zh_cn/redshift/latest/dg/c_Window_functions.html)

> 开窗函数（分析函数）简介:与聚合函数一样，开窗函数也是对行集组进行聚合计算，但是它不像普通聚合函数那样每组只返回一个值
> ，开窗函数可以为每组返回多个值，因为开窗函数所执行聚合计算的行集组是窗口

> 窗口函数是一种分析型的OLAP函数，OLAP是online analytical processing的简称，意思是对数据库数据进行实时分析处理


**窗口函数可以用在以下两种函数：**

1. 专用窗口函数：
    - `rank()`：按升序顺序，如果有并列名次的行，会占用下一名次的位置。
    - `dese_rank()`：按降序顺序，如果并列名次的行，不占用下一名次的位置。
    - `row_number()`：不考虑并列名次的情况。
2. 聚合函数：`sun()`,`avg()`,`count()`,`max()`,`min()`
3. 向前向后取值：`lag()`，`lead()`
4. 百分位：`percent_rank()`
5. 取值函数：`first_value()`，`last_value()`，`nth_value()`
6. 分箱函数：`ntile()`


**窗口函数语法**

```sql
<窗口函数> over (partition by <用于分组的列名> order by <用于排序的列名>)
```

**应用场景：**

1. topN问题
2. 经典排名问题
3. 在每个组里比较的问题
