# MySQL主从同步

## 配置主服务器

### 在`[mysqld]`节点下按需添加

```bash
[mysqld]
# 设置server_id，一般设置为IP,注意要唯一
server_id=100
# 复制过滤：也就是指定数据库不用同步,多个之间用','号分割
binlog-ignore-db=mysql,information_schema,preformance_schema
# 指定需要同步的二进制数据库
binlog-do-db=test
# 开启二进制日志功能，可以随便取，最好有含义（关键就是这里了）
log-bin=edu-mysql-bin
# 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
binlog_cache_size=1M
# 主从复制的格式（mixed,statement,row，默认格式是statement）
binlog_format=mixed
# 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
expire_logs_days=5
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
```

### 创建数据同步用户

> 这里主要是要授予用户REPLICATION SLAVE权限和REPLICATION CLIENT权限

```sql
CREATE USER IF NOT EXISTS 'slave'@'%' IDENTIFIED BY '密码';
GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
FLUSH PRIVILEGES;
```

## 配置从服务器

### 在`[mysqld]`节点下按需添加

> 从库中的`server-id`值一定不要跟主库的一样

```sql
[mysqld]
# 设置server_id，一般设置为IP,注意要唯一
server_id=101
# 复制过滤：也就是指定数据库不用同步,多个之间用','号分割
binlog-ignore-db=mysql,information_schema,preformance_schema
# 指定需要同步的二进制数据库
binlog-do-db=test
# 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
log-bin=edu-mysql-slave1-bin
# 为每个session 分配的内存，在事务过程中用来存储二进制日志的缓存
binlog_cache_size=1M
# 主从复制的格式（mixed,statement,row，默认格式是statement）
binlog_format=mixed
# 二进制日志自动删除/过期的天数。默认值为0，表示不自动删除。
expire_logs_days=5
# 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。
# 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致
slave_skip_errors=1062
# relay_log配置中继日志
relay_log=edu-mysql-relay-bin
# log_slave_updates表示slave将复制事件写进自己的二进制日志
log_slave_updates=1
# 防止改变数据(除了特殊的线程)
read_only=1
```

### 先查询主服务器当前二进制log文件

```sql
SHOW MASTER STATUS;
```

#### 查询出来如下

| File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
|---------------|---------------|---------------|---------------|---------------|
| mysql-bin.000025 | 154 | ichangg_im	|

### 进入从服务器MySQL执行以下命令

```sql
CHANGE MASTER TO MASTER_HOST='主服务器IP',MASTER_PORT=3306,MASTER_USER='主服务器同步用户名',MASTER_PASSWORD='密码',MASTER_LOG_FILE='主MySQL二进制文件名',MASTER_LOG_POS=Position字段中数据,MASTER_CONNECT_RETRY=30;
```

#### 上面执行的命令的解释

> `MASTER_HOST='192.168.1.100'` #Master的IP地址
>
> `MASTER_USER='slave'` #用于同步数据的用户（在Master中授权的用户）
>
> `MASTER_PASSWORD='123456'` #同步数据用户的密码
>
> `MASTER_PORT=3306` #Master数据库服务的端口
>
> `MASTER_LOG_FILE='edu-mysql-bin.000001'` #指定Slave从哪个日志文件开始读复制数据（Master上执行命令的结果的File字段）
>
> `MASTER_LOG_POS=429` #从哪个POSITION号开始读（Master上执行命令的结果的Position字段）
>
> `MASTER_CONNECT_RETRY=30` #当建立主从连接时，如果连接建立失败，间隔多久后重试。单位为秒，默认设置为60秒，同步延迟调优参数。

### 查看主从同步状态

```sql
show slave status;
```

### 开启复制

```sql
START SLAVE;
```

### 如果出现以下错误

> `ERROR 1872 (HY000): Slave failed to initialize relay log info structure from the repository`

> 看样子是找不到中继日志的仓库，但是查看变量`relay log`的位置是设置了的

```sql
show variables like 'relay%';
```

#### 重置复制信息

```sql
RESET MASTER;
```

#### 查看主从复制是否还有主从配置

```sql
SHOW SLAVE STATUS\G
```

#### 如果还有就执行以下命令清除所有

```sql
RESET SLAVE ALL;
```

#### 再次开启复制

```sql
START SLAVE;
```

### 查看主从复制是否成功

```sql
SHOW SLAVE STATUS\G
```

#### 如果有以下错误

> `Error 'Operation CREATE USER failed for 'slave'@'%'' on query. Default database: ''. Query: `
>> `'CREATE USER 'slave'@'%' IDENTIFIED WITH 'mysql_native_password' AS '*040A65A51A0B047A826CDE05448536015D471E15''`


#### 先执行以下命令

```sql
STOP SLAVE;
FLUSH PRIVILEGES;
START SLAVE;
```

#### 如果错误仍然存在，执行以下命令

```sql
STOP SLAVE;
DROP USER 'slave'@'%';
START SLAVE;
```


