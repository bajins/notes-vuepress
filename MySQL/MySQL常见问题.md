# MySQL常见问题

## GROUP_CONCAT

- 使用`GROUP_CONCAT`出现

> Row 147 was cut by GROUP_CONCAT()

- 由于MySQL的`GROUP_CONCAT`有默认大小值，先查询一下

```sql
SHOW VARIABLES LIKE 'group_concat_max_len';
#或者
SELECT @@global.group_concat_max_len;
```

- 默认值为1024

| Variable_name | Value |
|-------------|------------|
| group_concat_max_len | 1024 |

### 修改默认值大小

- 在MySQL配置文件中添加配置

```bash
#-1为最大值或根据实际需求设置长度
group_concat_max_len = -1
```

- 如果是生产环境下，不能擅自重启MySQL服务，则可以通过语句设置`group_concat`的作用范围

```sql
SET GLOBAL group_concat_max_len=-1;
SET SESSION group_concat_max_len=-1;
```

## 自定义函数

### 执行自定义函数报错

> `This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and
binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)`


#### 查看是否开启`log_bin_trust_function_creators`

```sql
SHOW VARIABLES LIKE 'log_bin_trust_function_creators';
#或者
SELECT @@global.log_bin_trust_function_creators;
```

#### 默认关闭

| Variable_name	| Value |
|------------------|-----------------|
|log_bin_trust_function_creators | OFF|

#### 开启

- 在MySQL配置文件中`[mysqld]`节点下加上

```bash
log_bin_trust_function_creators=1
```

- 如果是生产环境下，不能擅自重启MySQL服务，则可以通过语句开启，重启后无效

```sql
SET GLOBAL log_bin_trust_function_creators = 1;
#或者
SET GLOBAL log_bin_trust_function_creators=TRUE;
```


## 表名未忽略大小写

```bash
vim /etc/my.cnf
```

### 在`[mysqld]`模块中添加

```bash
lower_case_table_names = 1
```

### 保存并重启mysql


