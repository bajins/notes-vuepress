
# 事件
## 查看定时任务
```sql
SELECT * FROM information_schema.events; 
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
