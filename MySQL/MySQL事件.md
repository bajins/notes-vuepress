
# 事件

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
    DO 执行的代码;
```

## 启动定时器
```sql
ALTER EVENT event_remind_status ON    
COMPLETION PRESERVE ENABLE; 
```
