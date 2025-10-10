# PostgreSQL

[[toc]]


## Flag

+ [https://github.com/topics/postgrest](https://github.com/topics/postgrest)
+ [https://github.com/topics/postgresql](https://github.com/topics/postgresql)
+ [https://github.com/dhamaniasad/awesome-postgres](https://github.com/dhamaniasad/awesome-postgres)


* [https://github.com/postgres/postgres](https://github.com/postgres/postgres)
    * [http://postgres.cn/docs/14/catalogs.html](http://postgres.cn/docs/14/catalogs.html)
    * [连接字符串](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)
    * [https://jdbc.postgresql.org](https://jdbc.postgresql.org)
* [https://github.com/postgrespro](https://github.com/postgrespro)
* [https://github.com/citusdata](https://github.com/citusdata)
* [https://github.com/neondatabase/neon](https://github.com/neondatabase/neon)
* [https://github.com/pgpartman](https://github.com/pgpartman)
* [https://github.com/PostgREST/postgrest](https://github.com/PostgREST/postgrest)
* [https://github.com/CrunchyData](https://github.com/CrunchyData)
* 客户端 [https://github.com/sosedoff/pgweb](https://github.com/sosedoff/pgweb)
* [https://github.com/prest/prest](https://github.com/prest/prest)
* [https://github.com/alibaba/PolarDB-for-PostgreSQL](https://github.com/alibaba/PolarDB-for-PostgreSQL)
* [https://github.com/npgsql](https://github.com/npgsql)
* [https://github.com/commandprompt/pgmanage](https://github.com/commandprompt/pgmanage)
* 管理器 [https://github.com/sorintlab/stolon](https://github.com/sorintlab/stolon)
* [https://github.com/achristmascarl/rainfrog](https://github.com/achristmascarl/rainfrog)
* [https://github.com/lesovsky/pgcenter](https://github.com/lesovsky/pgcenter)
* 连接池工具 [https://github.com/pgbouncer/pgbouncer](https://github.com/pgbouncer/pgbouncer)
* 扩展Rust开发框架 [https://github.com/tcdi/pgx](https://github.com/tcdi/pgx)
* 迁移 [https://github.com/sbdchd/squawk](https://github.com/sbdchd/squawk)
* 分片水平扩展 [https://github.com/pg-sharding/spqr](https://github.com/pg-sharding/spqr)
* 解析器 [https://github.com/pganalyze/libpg_query](https://github.com/pganalyze/libpg_query)


- 文本搜索和分析 [https://github.com/zombodb/zombodb](https://github.com/zombodb/zombodb)

* 开发指南 [https://github.com/dongxuyang1985/postgresql_dev_guide](https://github.com/dongxuyang1985/postgresql_dev_guide)
* [不剪发的Tony老师《SQL编程思想》作者](https://www.zhihu.com/people/dongxuyang85/posts)
* [Postgresql库常用系统表](https://blog.csdn.net/jsbylibo/article/details/108448400)
* [PostgreSQL upsert(插入更新)教程](https://blog.csdn.net/neweastsun/article/details/112147693)
* [PostgreSQL_树形结构的递归查询](https://juejin.cn/post/6844904061414670350)
* [postgresql递归查询](https://blog.csdn.net/sunshuo1231/article/details/79634998)
* [PostgreSQL窗口函数](https://blog.csdn.net/u011447403/article/details/122877396)
* [PostgreSQL 触发器](https://zhuanlan.zhihu.com/p/432124325)
* [PostgreSQL的存储过程及基本使用](https://blog.csdn.net/Mr_Door/article/details/102527225)
* [PostgreSQL事件触发器实战教程](https://blog.csdn.net/neweastsun/article/details/121574175)
* [pg12.5中分区表的一些操作](https://blog.csdn.net/weixin_42583514/article/details/123063420)
* [Postgresql12 分区表实例以及自动添加分区](https://blog.csdn.net/dazuiba008/article/details/116709091)
* [postgresql常见数值,字符,日期类型常见函数总结](https://blog.csdn.net/su377486/article/details/82722391)
* [PostgreSQL学习手册(目录)](https://www.cnblogs.com/orangeform/archive/2012/06/08/2315679.html)
* [PostgreSQL中的OID](https://www.jianshu.com/p/ffb833bd4fb5)



```sql
-- 插入或更新 upsert
INSERT INTO table_name(column_list) 
VALUES(value_list)
ON CONFLICT target action;

-- https://zhuanlan.zhihu.com/p/342722338
-- https://dba.stackexchange.com/questions/91247/optimizing-a-postgres-query-with-a-large-in/91539
-- https://www.postgresql.org/docs/current/arrays.html
-- https://www.postgresql.org/docs/current/functions-array.html
-- 临时表
with tmp_table as (
    select unnest('{
        10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, 21000, 22000
    }'::bigint[]) "aid"
)
select * from tmp_table

-- https://zhuanlan.zhihu.com/p/38381497
-- WITH ORDINALITY返回记录的每一行行号
SELECT * FROM unnest(ARRAY['a','b','c','d','e','f']) WITH ORDINALITY;

-- 常量子查询
字段 in ( VALUES (10000), (11000), (12000), (13000), (14000), (15000), (16000), (17000), (18000), (19000), (20000));

-- JSON
-- https://www.postgresql.org/docs/current/functions-json.html
-- https://www.crunchydata.com/developers/playground/basics-of-jsonb
SELECT * FROM jsonb_to_recordset('[{"name": "batman"}, {"name": "superman"}]'::jsonb) AS x(name TEXT);
SELECT * FROM json_array_elements_text('["batman", "superman"]');
```



**查询Postgres数据库中的所有表信息（表名、备注）**

```sql
SELECT
	relname AS tabname
	, cast(obj_description( relfilenode, 'pg_class') AS VARCHAR ) AS COMMENT
    , b.description
FROM pg_class c
LEFT JOIN pg_description b ON b.objsubid =0 AND a.oid=b.objoid
WHERE relkind = 'r' AND relname NOT LIKE 'pg_%' AND relname NOT LIKE 'sql_%'
    -- AND relchecks=0 -- 过滤掉分表
ORDER BY relname


-- 查询表字段信息
SELECT col_description(a.attrelid,a.attnum) AS comments
--, format_type(a.atttypid,a.atttypmod) AS column_type"
, t.typname AS column_type
, a.attname AS column_name
, CASE WHEN a.attnotnull THEN 0 ELSE 1 END AS nullable
, CASE WHEN p.conname IS NULL THEN '' ELSE 'PRI' END AS column_key
, CASE WHEN a.attlen>0 THEN a.attlen
        WHEN t.typname='numeric' THEN pc.numeric_precision
        WHEN t.typname='timestamp' THEN pc.datetime_precision
        ELSE a.atttypmod-4
  END AS data_length
, CASE WHEN a.attlen>0 THEN a.attlen
        WHEN t.typname='numeric' THEN pc.numeric_precision-pc.numeric_scale
        WHEN t.typname='timestamp' THEN pc.datetime_precision
        WHEN t.typname='varchar' THEN pc.character_maximum_length
        ELSE a.atttypmod-4
  END AS data_precision
, pc.numeric_scale AS data_scale
FROM pg_class c
LEFT JOIN pg_attribute a ON a.attrelid=c.oid
LEFT JOIN pg_constraint as p ON c.oid=p.conrelid AND p.conkey[1]=a.attnum AND p.contype='p'
LEFT JOIN pg_type t ON t.oid=a.atttypid
LEFT JOIN pg_namespace n ON n.oid=c.relnamespace
-- LEFT JOIN pg_tables tb ON tb.schemaname=n.nspname AND tb.tablename=c.relname
LEFT JOIN information_schema.columns pc ON pc.table_schema=n.nspname AND pc.table_name=c.relname AND pc.column_name=a.attname
WHERE a.attisdropped='f' AND a.attnum>0 AND c.relname='表名'
-- ORDER BY a.attnum
```



**查询Postgres数据库中的表字段名、类型、注释、注释是否为空**

```sql
-- information_schema.COLUMNS
SELECT
	a.attname AS NAME,
	col_description( a.attrelid, a.attnum ) AS COMMENT,
	format_type( a.atttypid, a.atttypmod ) AS type,
	a.attnotnull AS notnull
FROM
	pg_class AS c,
	pg_attribute AS a
WHERE
	c.relname = '表名'
	AND a.attrelid = c.oid
	AND a.attnum >0
```


**UUID**

```sql
-- 不建议在高并发下使用，以下三个语句都可以生成
SELECT uuid_in(md5(random()::text || now()::text)::cstring);
SELECT uuid_in(md5(random()::text || clock_timestamp()::text)::cstring);
SELECT md5(random()::text || clock_timestamp()::text)::uuid;
-- 去掉-，32位
SELECT REPLACE(md5(random()::text || clock_timestamp()::text),'-','');
```


**日期时间**

* [https://www.postgresql.org/docs/current/functions-datetime.html](https://www.postgresql.org/docs/current/functions-datetime.html)

```sql
select to_timestamp('2022-08-02 00:00:00', 'yyyy-MM-dd hh24:mi:ss');
select to_date('2022-08-02 23:59:59', 'yyyy-MM-dd HH24:mi:ss');
select to_char(now(), 'yyyy-MM-dd HH24:mi:ss');
select date_trunc('day', now()) - interval '1d' + ('6 hours')::INTERVAL;
-- 得到当天凌晨0点0分0秒的日期
select date_trunc('day', now());
-- 获取今天最后的时间（即午夜之前的那一刻）
SELECT CURRENT_DATE + INTERVAL '1 day' - INTERVAL '1 microsecond';
SELECT (date_trunc('day', now()) + INTERVAL '1 day' - INTERVAL '1 microsecond')::timestamp;
SELECT DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '1 day - 1 microsecond';
SELECT DATE_TRUNC('day', CURRENT_TIMESTAMP) + INTERVAL '1 day' - INTERVAL '1 microsecond';
-- 月末
select date_trunc('month', now() + '1 months') + '-1 days';
-- 获取上个月的开始和结束时间
select date_trunc('month', current_date - interval '1 month'), date_trunc('month', current_date) - interval '1 microsecond';

-- 获取周数
select extract(week FROM timestamp '2022-01-01') week;
SELECT date_part('week', timestamp '2022-01-01') week;
-- 遍历两个日期的每一天 https://stackoverflow.com/questions/6870499/generate-series-equivalent-in-mysql
select * from generate_series('2022-09-21 00:00:00'::TIMESTAMP, '2022-09-22 00:00:00'::TIMESTAMP, '1 day');
-- 遍历两个日期的每小时
select * from generate_series('2022-09-21 00:00:00'::TIMESTAMP, '2022-09-22 00:00:00'::TIMESTAMP, '1 hour');
-- 每一天每一小时每一行的列数据
select
    d::date::text || ' ' ||
        to_char(d::time, 'HH24:MM:SS') || ' - ' ||
        to_char(d::time + interval '1 hour' - interval '1 second', 'HH24:MM:SS') as hour
from
    generate_series(
       (date '2022-09-21')::timestamp,
       (date '2022-09-22')::timestamp,
       interval '1 hour'
     ) as d
-- 计算时间差，实际时间不到1小时时，DATEDIFF会返回1，而DATE_PART返回0
SELECT DATE_PART('day', '2011-12-30 08:55'::timestamp - '2011-12-30 09:05'::timestamp) * 24 + 
        DATE_PART('hour', '2011-12-30 08:55'::timestamp - '2011-12-30 09:05'::timestamp);
-- 计算月份差
SELECT 12*EXTRACT(YEAR from age('2023-06-01','2022-01-01'))+EXTRACT(MONTH from age('2023-06-01','2022-01-01'));
-- 提取days时结果是准确的；但提取hours的时候，出现的小时数没有考虑日期，最大23
SELECT EXTRACT(DAYS FROM NOW() - '2020-01-31 10:00:00'::timestamp);
SELECT ROUND((EXTRACT(EPOCH FROM timestamp '2023-12-25 12:00:00' - timestamp '2023-12-20 00:00:00') / 86400)::NUMERIC, 2) AS days_diff;
```


**整数除法保留小数**

```sql
select 1/2::float8
select 1/2::numeric
select 1/cast(2 as numeric)
```


## 备份恢复

```sql
-- 表结构复制，包括索引和约束
create table schema.table_name_bak (like schema.table_name including all);
```


| **步骤** | **操作** | **目的** | **备注** |
| :---: | :---: | :---: | :---: |
| 1 | 转储源数据库 | 为克隆或迁移创建逻辑备份 | 使用 `pg_dump` 或 `pg_basebackup` 其他等效工具 |
| 2 | 准备目标数据库 | 设置用户、角色和模式以避免权限问题 | 确保扩展匹配 |
| 3 | 恢复SQL转储 | 在新环境中重建完整的模式和数据 | 使用 `psql <` 或 `pg_restore` |
| 4 | 重新应用只读权限 | 强制执行访问控制并确保最小权限角色 | 恢复后应用GRANT |

* https://www.postgresql.org/docs/current/app-pgbasebackup.html
* https://www.postgresql.org/docs/current/app-pgdump.html
* https://www.postgresql.org/docs/current/app-pgrestore.html
* https://www.postgresql.org/docs/current/app-psql.html
* https://dev.to/w95/cloning-postgresql-databases-a-developers-guide-to-local-replication-14a6

```bash
#!/bin/bash

SOURCE_DB=source_db
TARGET_DB=target_db
ADMIN_USER=admin_user
HOST=your-rds-endpoint.amazonaws.com
# Step 1: Dump source database
echo "Dumping $SOURCE_DB..."
pg_dump -h $HOST -U $ADMIN_USER -d $SOURCE_DB > ${SOURCE_DB}_dump.sql
# Step 2: Prepare target database
psql -h $HOST -U $ADMIN_USER -d $TARGET_DB -f db_clone_setup.sql
# Step 3: Restore into target database
psql -h $HOST -U $ADMIN_USER -d $TARGET_DB < ${SOURCE_DB}_dump.sql
```


- 默认使用相同模式恢复

```powershell
# 使用自定义格式 (-F c) 或目录格式 (-F d) 
# --schema指定要过滤的模式
# --exclude-table=table_name：完全排除指定的表（包括表结构和数据）
# --exclude-table-data=table_name：只排除指定表的数据，但会备份表的结构
# -f 指定备份文件
.\pg_dump.exe -h "192.168.24.100" -p 5432 -U "readonly" -d "test" -F c -f backup.dump

# 恢复到同名模式（Schema）下 --schema过滤指定模式
# -l 或 --list 提取内容列表
# -L 或 --use-list 只恢复在 restore_list.txt 文件中没有被注释掉的对象
.\pg_restore.exe -h "127.0.0.1" -p 5432 -U "t1" -d "postgres" --no-owner --no-privileges "E:\backup.dump"
```


```sql
-- 重命名模式（Schema）
ALTER SCHEMA schema_A RENAME TO schema_B;
-- 查看search_path（搜索路径）中是否有指定模式
SHOW search_path;
-- 修改search_path（搜索路径），断开连接，然后重新登录，新的 search_path 设置才会生效
SET search_path = schema_B, public;
-- SET search_path TO schema_B, public;
ALTER USER postgres SET search_path TO schema_B, public;
ALTER ROLE postgres SET search_path TO schema_B, public;
ALTER DATABASE test SET search_path TO schema_B, public;
-- 授予用户访问指定 schema 的权限
GRANT USAGE ON SCHEMA schema_B TO postgres;
-- 授予用户该 schema 下所有表的权限
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA schema_B TO postgres;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA schema_B TO postgres;
-- 授予对所有序列的权限
GRANT USAGE ON ALL SEQUENCES IN SCHEMA schema_B TO postgres;
-- 为未来创建的对象设置默认权限
-- FOR ROLE xx 规则应用于 xx 创建的表，可以不要
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA schema_B GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO postgres;
-- 为未来的序列设置权限
ALTER DEFAULT PRIVILEGES IN SCHEMA schema_B GRANT USAGE ON SEQUENCES TO postgres;
-- 为未来创建的函数授予执行权限
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA schema_B GRANT EXECUTE ON FUNCTIONS TO postgres;
```


- 导出为纯文本格式并修改模式再恢复

```powershell
# 导出为标准的 SQL 脚本纯文本格式 --schema指定要过滤的模式 -f 或 > 指定备份文件
.\pg_dump.exe -h "192.168.24.100" -p 5432 -U "readonly" -d "test" --schema=schema_A > backup.sql

# 将所有出现的旧模式名 schema_A 替换为新模式名 schema_B
# 直接修改文件 (-i)，并创建一个名为 backup.sql.bak 的原始文件备份 (.bak) s/替换命令的开始 \b 是一个“单词边界”
sed -i.bak 's/\bchema_A\./schema_B\./g' backup.sql
# sed 's/\schema_A\./schema_B\./g' backup.sql > modified_backup.sql
# search_path（搜索路径）是一个会话变量，定义当你在查询中只写表名（而不带模式名）时，数据库应该按照什么顺序去哪些模式里查找这个表
sed -i "s/SET search_path = schema_A/SET search_path = schema_B/g" backup.sql

# 将修改后的 .sql 文件导入到目标数据库
# -1 (--single-transaction) 标志，将整个脚本导入过程在单个事务中完成
# -f 或 < 指定备份文件
psql -U "t1" -d "postgres" -1 < backup.sql
```



## 修改连接类型


```sql
SHOW config_file;
SHOW hba_file;
SHOW postmaster_start_time;
SHOW data_directory;
SHOW listen_addresses;
SHOW port;
SHOW max_connections;
SHOW unix_socket_directories;
SHOW log_directory;
SHOW log_filename;
SHOW log_file_mode;
SHOW log_truncate_on_rotation;
SHOW log_rotation_age;
SHOW log_rotation_size;
SHOW log_checkpoints;
SHOW log_connections;
SHOW log_disconnections;
SHOW log_statement;
SHOW log_duration;
SHOW log_error_verbosity;
SHOW log_lock_waits;
SHOW log_temp_files;
SHOW log_autovacuum_min_duration;
SHOW log_temp_files;
SHOW log_autovacuum_min_duration;
SHOW log_checkpoints;
```


- postgresql.conf

```conf
listen_addresses = '*'
```

- pg_hba.conf (Host-Based Authentication) 

```conf
# 在文件的末尾添加一行新客户端认证规则
# 192.168.1.0/24：允许来自 192.168.1.0 到 192.168.1.255 子网的所有连接
# trust ：允许任何用户使用任何密码连接到数据库
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    all             all             0.0.0.0/0               scram-sha-256
```


## 启动


```powershell
# 初始化数据库
.\initdb.exe -D "D:\PostgreSQL\data" --locale=C --username=postgres --encoding=UTF8
# start: 启动
# stop: 停止
# restart: 重启
# reload: 重新加载服务器的配置文件，而不需要完全重启服务
# status: 显示服务器的当前状态
# -o: 将后面的字符串“透传”给 postgres 进程，覆盖 postgresql.conf 文件中的任何配置参数
# -c: 设置一个配置参数
.\pg_ctl.exe start-o "-p 5433 -c listen_addresses=* -c log_statement=all" -D "../../PostgreSQL/data" 
```