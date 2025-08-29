# Oracle

[[toc]]


## Flag

* [Oracle with as + /*+ materialize*/ 优化](https://blog.csdn.net/qq_34745941/article/details/106897099)
* [Oracle两种临时表的创建及使用方法](https://www.cnblogs.com/beloved-bq/p/12561512.html)
* [https://docs.oracle.com/en/database/oracle/oracle-database/21/lnoci/preface.html](https://docs.oracle.com/en/database/oracle/oracle-database/21/lnoci/preface.html)


> 空字符串''同等NULL，字符串与数字类型会自动转换

> Oracle Call Interface（OCI）是Oracle提供的一组C语言API，用于开发Oracle数据库应用程序。
> OCI提供了一种直接访问Oracle数据库的方式，使开发人员可以编写高效且可扩展的应用程序


```sql
-- 创建会话级临时表来存储原数据，并删除表数据
CREATE GLOBAL TEMPORARY TABLE TEST_BAK AS (SELECT * FROM TEST);

-- 查看临时表数据
SELECT * FROM TEST_BAK;

-- Oracle中类似于PostgreSQL的unnest
-- https://docs.oracle.com/en/database/oracle/oracle-database/23/addci/extensibility-constants-types-and-mappings.html
select * from table(sys.odcinumberlist(3,4,3))
select * from table(sys.odcivarchar2list('3a','4b','3d'))

-- 常量子查询
字段 IN (SELECT 10000 FROM dual UNION ALL SELECT 20000 FROM dual)

-- 清空数据 delete是dml操作；truncate是ddl操作，ddl隐式提交不能回滚，会回收表空间
DELETE FROM TEST;
-- 将目标字段数据清空
--UPDATE TEST SET MEASURED = NULL;

-- 修改表字段
ALTER TABLE TEST MODIFY MEASURED NUMBER(18,6);

-- 还原表结构
INSERT INTO TEST SELECT * FROM TEST_BAK;

-- 删除临时表
DROP TABLE TEST_BAK;


-- 替代LISTAGG拼接超4000字符长度
SELECT
REGEXP_REPLACE(RTRIM(XMLSERIALIZE(CONTENT XMLAGG(XMLELEMENT(E,colname,',').EXTRACT('//text()')) AS CLOB),', '),'(,)+',',') a,
REGEXP_REPLACE(RTRIM(XMLAGG(XMLELEMENT(E,colname,',').EXTRACT('//text()')).getclobval(),','),'(,)+',',') b,
REGEXP_REPLACE(RTRIM(REGEXP_REPLACE(XMLSERIALIZE(CONTENT XMLAGG(XMLELEMENT(e, colname || ',')) AS CLOB),'<E>|</E>',''),','),'(,)+',',') c
FROM table_name
GROUP BY grouping_column;
```


**系统表**

- `USER_TABLES` 当前用户拥有的表：`TABLE_NAME`,`TABLESPACE_NAME`,`LAST_ANALYZED`
- `DBA_TABLES` 包括系统表：多了`OWER`列
- `ALL_TABLES` 所有用户的表：多了`OWER`列
- `ALL_OBJECTS` 当前用户有访问权限的所有对象：`OWER`,`OBJECT_NAME`,`SUBOBJECT_NAME`,`OBJECT_ID`,`CREATED`,`LAST_DDL_TIME`,`TIMESTAMP`,`STATUS`
- `USER_TAB_COLUMNS` 当前用户拥有的表字段
- `ALL_TAB_COLUMNS`
- `DBA_TAB_COLUMNS`
- `USER_TAB_COMMENTS` 当前用户拥有的表注释 ：`TABLE_NAME`,`TABLE_TYPE`,`COMMENTS`
- `DBA_TAB_COMMENTS` ：多了`OWER`列
- `ALL_TAB_COMMENTS` ：多了`OWER`列
- `USER_COL_COMMENTS` 当前用户拥有的表字段注释 ： `TABLE_NAME`,`COLUMN_NAME`,`COMMENTS`
- `DBA_COL_COMMENTS` ：多了`OWER`列
- `ALL_COL_COMMENTS` ：多了`OWER`列

> `SELECT * FROM USER_TAB_COMMENTS WHERE COMMENTS LIKE '%摘要%'`


**分组获取最新一条数据（查询各组最新的一条记录）**

- over partition by 分析函数（开窗函数）

```sql
SELECT * FROM (
    SELECT ROW_NUMBER() OVER(PARTITION BY 分组字段名 ORDER BY 排序字段名 DESC) rn,t.* FROM test1 t
    ) WHERE rn = 1;

SELECT t.* FROM test1 t GROUP BY 分组字段名 ORDER BY 排序字段名 DESC FETCH FIRST 1 ROWS ONLY;


SELECT * FROM (
    select eb_vipcode,eb_time,MAX(eb_time) over(partition by eb_vipcode) as "atime" from eb_daskexpdateinfo
    ) x where eb_time = "atime";

SELECT * FROM (
    select ID_,COMPANY_NAME,USAGE_RATE,CREATE_TIME
    ,MAX(CREATE_TIME) over(partition by COMPANY_NAME) as "atime" from SPEC_RATE_ORIGIN
    ) x where CREATE_TIME = "atime";
```

- group by

```sql
SELECT eb_vipcode,MAX(eb_time) AS "atime" FROM eb_daskexpdateinfo group by eb_vipcode
```

- inner join

```sql
SELECT A.* FROM SPEC_RATE_ORIGIN A INNER JOIN (
    SELECT COMPANY_NAME,MAX(CREATE_TIME) AS "atime" FROM SPEC_RATE_ORIGIN group by COMPANY_NAME
    ) B ON A.COMPANY_NAME = B.COMPANY_NAME AND A.CREATE_TIME = B."atime";
```


**一次执行多条SQL**

```sql
INSERT ALL
 INTO a表(字段) VALUES(各个值1)
 INTO a表(字段) VALUES(其它值2)
 INTO a表(字段) VALUES(其它值3)
SELECT 1 FROM DUAL;
```

- 使用`begin…end;`

* [如何在Oracle中一次执行多条sql语句](https://www.cnblogs.com/teamleader/archive/2007/05/31/765943.html)

```sql
begin
insert into table_name (列名,列名) values (express,express);
insert into table_name (列名,列名) values (express,express);
insert into table_name (列名,列名) values (express,express);
insert into table_name (列名,列名) values (express,express);
end;
```



**插入或更新 upsert**

* [SQL语句 存在就更新不存在就插入](https://www.jianshu.com/p/602ba0b8395b)
* [merge into 的用法](https://blog.csdn.net/weixin_40374341/article/details/109239544)


```sql
MERGE INTO table_name alias1   
USING (table|view|sub_query) alias2  
ON (join condition)   
WHEN MATCHED THEN   
    UPDATE table_name SET col1 = col_val1
WHEN NOT MATCHED THEN   
    INSERT (column_list) VALUES (column_values);
```




**死锁**

```sql
-- 查询死锁会话
SELECT l.session_id sid, s.serial#, l.locked_mode, l.oracle_username, l.os_user_name
, s.machine, s.terminal, o.object_name, s.logon_time, p.SPID
 FROM v$locked_object l, all_objects o, v$session s,v$process p
 WHERE l.object_id = o.object_id AND l.session_id = s.sid AND s.paddr = p.addr
 ORDER BY sid, s.serial#;

-- 结束
alter system kill session 'sid,serial#';
```

```bash
orakill SID spid
```


**查看所有表结构**

```sql
SELECT t1.Table_Name || chr(13) || t3.comments       AS "表名称及说明",
       --t3.comments                                 AS "表说明",
       t1.COLUMN_ID                                  AS "序号",
       t1.Column_Name                                AS "字段名称",
       t1.DATA_TYPE || '(' || t1.DATA_LENGTH || ')'  AS "数据类型",
       t1.NullAble                                   AS "是否为空",
       t2.Comments                                   AS "字段说明",
       t1.Data_Default                               AS "默认值"
       --t4.created                                  AS "建表时间"
FROM cols t1
LEFT JOIN user_col_comments t2 ON t1.Table_name = t2.Table_name AND t1.Column_Name = t2.Column_Name
LEFT JOIN user_tab_comments t3 ON t1.Table_name = t3.Table_name
LEFT JOIN user_objects t4 ON t1.table_name = t4.OBJECT_NAME
WHERE NOT EXISTS (
    SELECT t4.Object_Name
    FROM User_objects t4
    WHERE t4.Object_Type = 'TABLE' AND t4.Temporary = 'Y' AND t4.Object_Name = t1.Table_Name
)
ORDER BY t1.Table_Name, t1.Column_ID;

-- 查询表字段信息
WITH ct AS (
    SELECT u3.table_name,u3.column_name,u4.constraint_type FROM user_cons_columns u3
    JOIN user_constraints u4 ON u4.constraint_name=u3.constraint_name AND u4.constraint_type='P'
)
SELECT DISTINCT u1.column_id
, u1.column_name
, u1.data_type AS column_type
, (CASE WHEN u1.data_type='NVARCHAR2' THEN u1.data_length/2 ELSE u1.data_length END) AS data_length
, (CASE WHEN DECODE(u1.nullable, 'Y', 'N', 'N', 'Y', 'N')='Y' THEN 0 ELSE 1 END) AS nullable
, u1.data_precision AS data_precision
, u1.data_scale AS data_scale
, u2.comments
, DECODE(ct.constraint_type,'P','PRI') AS column_key
FROM user_tab_columns u1
LEFT JOIN user_col_comments u2 ON u1.table_name=u2.table_name AND u1.column_name=u2.column_name
LEFT JOIN ct ON ct.table_name=u1.table_name AND ct.column_name=u1.column_name
WHERE u1.table_name= '表名'
ORDER BY u1.column_id
```


**日期时间**

* [Oracle日期格式转换 to_date,to_char,to_timetamp 相互转换](https://blog.csdn.net/HaHa_Sir/article/details/125572325)

```sql
SELECT SYSDATE, SYSTIMESTAMP FROM dual;
SELECT TO_CHAR(TO_TIMESTAMP('2023-05-08 10:10:10', 'yyyy-mm-dd hh24:mi:ss'), 'ww') FROM dual;
-- 得到当天凌晨0点0分0秒的日期
SELECT TRUNC(SYSDATE) FROM DUAL;
-- 获取今天最后的时间（即午夜之前的那一刻）
SELECT TRUNC(SYSDATE) + 0.99999 AS last_time FROM DUAL;
SELECT TRUNC(SYSDATE) + 1 - 1/86400 AS last_time FROM dual;
SELECT TRUNC(SYSDATE) + 1 - INTERVAL '1' SECOND AS last_time FROM DUAL;
SELECT TRUNC(SYSDATE) + INTERVAL '1' DAY - INTERVAL '1' SECOND AS last_time FROM DUAL;
SELECT TRUNC(SYSDATE) + INTERVAL '23' HOUR + INTERVAL '59' MINUTE + INTERVAL '59' SECOND AS last_time FROM DUAL;
-- 获取本周开始日期（星期一）
SELECT TRUNC(SYSDATE, 'IW') FROM DUAL;
-- 获取本周结束日期（星期日）
SELECT TRUNC(SYSDATE, 'IW') + 7 - 1 FROM DUAL;
-- 获取当月开始时间和结束时间
SELECT TRUNC(SYSDATE, 'MM') FROM DUAL
SELECT TRUNC(LAST_DAY(SYSDATE))+ 0.99999 FROM DUAL
-- 获取今年开始时间和结束时间
SELECT TO_CHAR(TRUNC(SYSDATE, 'YYYY'), 'YYYY-MM-DD HH24:MI:SS') AS start_date,
       TO_CHAR(LAST_DAY(TRUNC(SYSDATE, 'YYYY') + 0.99999), 'YYYY-MM-DD HH24:MI:SS') AS end_date
FROM dual;
SELECT TO_DATE(EXTRACT(YEAR FROM SYSDATE) || '-01-01', 'YYYY-MM-DD HH24:MI:SS') AS start_date,
       TO_DATE(EXTRACT(YEAR FROM SYSDATE) || '-12-31 23:59:59', 'YYYY-MM-DD HH24:MI:SS') AS end_date
FROM dual;
SELECT TRUNC(SYSDATE, 'YYYY') AS start_date,
  TRUNC(SYSDATE + INTERVAL '1' YEAR, 'YYYY') - INTERVAL '1' SECOND AS end_date
FROM dual
-- FM格式模型来实现不要前导零
SELECT TO_CHAR(SYSDATE, 'FMMM') AS one_digit_month
FROM dual;


-- 获取倒推时间列表
SELECT TRUNC(sysdate - NumToDSInterval(level-1, 'hour'), 'MI') AS ds -- 'day','hour','minute','second'
, TRUNC(sysdate - NumToYMInterval(level-1, 'month'), 'MI') AS ym -- 'year','month'
FROM dual CONNECT BY level <= 12;

SELECT TO_CHAR(Add_Months(TRUNC(sysdate,'YYYY'), Level-1), 'FMMonth') AS month_name FROM Dual CONNECT BY Level <= 12;
SELECT TRUNC(SYSDATE - LEVEL/24, 'HH24') AS HOURMIN FROM DUAL CONNECT BY LEVEL <= 12 ORDER BY 1;

-- 将数据按半小时进行分组
SELECT TO_CHAR(record_date, 'YYYY-MM-DD HH24') || CASE WHEN TO_CHAR(record_date, 'MI') < '30' THEN ':00' ELSE ':30' END AS half_hour,
       SUM(col_8) AS total_money
FROM table_name
GROUP BY TO_CHAR(record_date, 'YYYY-MM-DD HH24') || CASE WHEN TO_CHAR(record_date, 'MI') < '30' THEN ':00' ELSE ':30' END

SELECT TRUNC(record_date, 'HH24') + CASE WHEN TO_CHAR(record_date, 'MI') < '30' THEN INTERVAL '0' MINUTE ELSE INTERVAL '30' MINUTE END AS half_hour,
       SUM(col_8) AS total_money
FROM table_name
GROUP BY TRUNC(record_date, 'HH24') + CASE WHEN TO_CHAR(record_date, 'MI') < '30' THEN INTERVAL '0' MINUTE ELSE INTERVAL '30' MINUTE END
```


**随机取数**

```sql
SELECT *
FROM test a
--WHERE rownum = FLOOR(DBMS_RANDOM.VALUE(1, 10))
WHERE MOD(rownum, floor(DBMS_RANDOM.VALUE(1, 10))) = 0
FETCH FIRST ROW ONLY

-- 重建排序
SELECT * FROM (
    SELECT a.*, rownum as rn
    FROM test a
)
WHERE MOD(rn, floor(DBMS_RANDOM.VALUE(1, 1))) = 0
ORDER BY dbms_random.value
FETCH FIRST ROW ONLY;

-- Oracle类PostgreSQL的generate_series函数
SELECT ROWNUM AS num FROM dual CONNECT BY ROWNUM <= 3;
SELECT LEVEL AS num FROM DUAL CONNECT BY LEVEL <= 3;
-- 使用序列
CREATE SEQUENCE seq_num START WITH 1 INCREMENT BY 1 NOMAXVALUE;
SELECT NEXT VALUE FOR seq_num AS num FROM DUAL WHERE NEXT VALUE FOR seq_num <= 3;
```


