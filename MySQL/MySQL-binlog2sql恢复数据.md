### 使用此方式之前一定是MySQL开启了bin-log的才可行
## 查看目前的binlog文件
```sql
show master logs;
```
| ------------ | ------------ |
Log_name   |   File_size
| ------------ | ------------ |
mysql-bin.000001 | 177
mysql-bin.000002 |	437
mysql-bin.000003 |	685
mysql-bin.000004 |	1702399
mysql-bin.000005 |	963964
mysql-bin.000006 |	13118637
mysql-bin.000007 |	26765043
| ------------ | ------------ |
