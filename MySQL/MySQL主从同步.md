## 配置主服务器
### 在[mysqld]节点下添加
```shell
#需要同步的二进制数据库名；
binlog-do-db=ichangg_im
```
### 如果有需要可以创建一个指定IP访问的账户
```sql
CREATE USER '用户名'@'@' IDENTIFIED BY '密码';
GRANT REPLICATION SLAVE ON *.* TO '用户名'@'指定访问IP' IDENTIFIED BY '密码';
FLUSH PRIVILEGES;
```
## 配置从服务器
### 先查询主服务器当前二进制log文件
```sql
SHOW MASTER STATUS;
```
#### 查询出来如下
File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set
|---------------|---------------|---------------|---------------|---------------|
mysql-bin.000025 | 154 | ichangg_im	

### 进入MySQL执行以下命令
```sql
CHANGE MASTER TO MASTER_HOST='主服务器IP', MASTER_USER='用户名', MASTER_PASSWORD='密码', MASTER_LOG_FILE='主MySQL二进制文件名', MASTER_LOG_POS=Position字段中数据;
```
