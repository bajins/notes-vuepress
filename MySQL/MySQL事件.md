# MySQL事件


## 查看当前是否已开启事件调度器
```sql
show variables like 'event_scheduler';
```
## 查看定时任务
```sql
SELECT * FROM information_schema.events;
select * from mysql.event;
```
## 创建事件
```sql
CREATE EVENT [IFNOT EXISTS] event_name
  ON SCHEDULE SCHEDULE
  [ON COMPLETION [NOT] PRESERVE]
  [ENABLE | DISABLE]
  [COMMENT 'comment']
  DO sql_statement;
```

> `[ON COMPLETION [NOT] PRESERVE]` 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
>
> `[ENABLE | DISABLE]` 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
>
> `[COMMENT 'comment']` 可以给该事件加上注释

```
## 修改事件(ALTER EVENT)
```sql
ALTER EVENT event_name
  [ON SCHEDULE SCHEDULE]
  [RENAME TO new_event_name]
  [ON COMPLETION [NOT] PRESERVE]
  [COMMENT 'comment']
  [ENABLE | DISABLE]
  [DO sql_statement]
```
## 删除事件(DROP EVENT)
```sql
DROP EVENT [IF EXISTS] event_name
```
## 开启任务
```sql
ALTER EVENT event_name ENABLE;
```
## 停止任务
```sql
ALTER EVENT event_name DISABLE;
```

## 创建定时器，每间隔一秒调用一次存储过程
```sql
DELIMITER //  
CREATE EVENT  event_remind_status  
ON SCHEDULE EVERY 1 second  do  
begin
-- 调用存储过程
call update_remind_status();  
end //  
DELIMITER;  
```
## 每天凌晨1点执行
```sql
CREATE EVENT IF NOT EXISTS temp_event   
    ON SCHEDULE EVERY 1 DAY STARTS DATE_ADD(DATE_ADD(CURDATE(), INTERVAL 1 DAY), INTERVAL 1 HOUR)   
    ON COMPLETION PRESERVE ENABLE   
    DO 执行的SQL语句;
```
## 每隔一分钟执行
```sql
CREATE event IF NOT EXISTS temp_event ON SCHEDULE EVERY 1 MINUTE   
ON COMPLETION PRESERVE   
DO 执行的SQL语句;
```


## 启动定时器
```sql
ALTER EVENT event_remind_status ON    
COMPLETION PRESERVE ENABLE; 
```
