# MySQL事件


* [事件是什么](#事件是什么)
* [查看事件调度器](#查看事件调度器)
* [开启事件调度器](#开启事件调度器)
* [查看事件](#查看事件)
* [查看事件创建语句](#查看事件创建语句)
* [创建事件](#创建事件)
  * [每隔一秒执行](#每隔一秒执行)
  * [每天凌晨1点执行](#每天凌晨1点执行)
  * [每隔一分钟执行](#每隔一分钟执行)
  * [指定时间范围内执行](#指定时间范围内执行)
  * [一小时后只执行一次](#一小时后只执行一次)
* [修改事件](#修改事件)
* [删除事件](#删除事件)
* [开启事件](#开启事件)
* [停止事件](#停止事件)
* [启动定时器](#启动定时器)




## 事件是什么

> MySQL5.1版本开始引进event概念，MySQL中的事件(event：时间触发器)是用于执行定时或周期性的任务，类似Linux中的`crontab`，
> 但是后者只能精确到分钟，事件可以精确到秒。
>
> 通过单独或调用存储过程使用，在某一特定的时间点，触发相关的SQL语句或存储过程。
>
> 事件由一个特定的线程来管理的，也就是所谓的事件调度器，但是事件不能直接调用。

> 整个服务器重启、断电会导致event事件恢复成默认`OFF`关闭状态，需要在`mysql.ini`文件中修改加入`event_scheduler = ON`


## 查看事件调度器

> MySQL中调度器`event_scheduler`负责调用事件，也就是由全局变量`event_scheduler`的状态决定，它默认是`OFF`, 一般是`OFF`。

```sql
SHOW VARIABLES LIKE '%event_scheduler%';
```

## 开启事件调度器

```sql
SET GLOBAL event_scheduler=1
```



## 查看事件

```sql
SHOW EVENTS;

SELECT * FROM information_schema.events;
SELECT * FROM mysql.event;
```

## 查看事件创建语句

```sql
SHOW CREATE EVENT event_name
```

## 创建事件

> `EVERY`后面可以跟可选的`STARTS`和`ENDS`，指定事件开始和结束时间，在这个时间段内，时间定时执行。
> `STARTS`和`ENDS`可同时指定，或者只指定`STARTS`，或两者都不指定。

### 每隔一秒执行

```sql
DELIMITER $$

CREATE EVENT `executed_every_second`

-- 设置触发点
ON SCHEDULE
	-- 使用EVERY关键字指定时间间隔，每隔一秒执行
	EVERY 1 SECOND

-- 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
-- 即默认的计划任务执行完毕后自动drop该事件
ON COMPLETION PRESERVE 
-- 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
ENABLE
-- 可以给该事件加上注释，最大长度64个字节
COMMENT "每隔一秒执行"
DO
	BEGIN
		
		SELECT * FROM USER LIMIT 10;
		
	END$$

DELIMITER ;
```

### 每天凌晨1点执行

```sql
DELIMITER $$

CREATE EVENT `1_am_every_day`

-- 设置触发点
ON SCHEDULE
	-- 使用EVERY关键字指定时间间隔，每天启动时间
	EVERY 1 DAY STARTS DATE_ADD(DATE_ADD(CURDATE(), INTERVAL 1 DAY), INTERVAL 1 HOUR)

-- 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
-- 即默认的计划任务执行完毕后自动drop该事件
ON COMPLETION PRESERVE 
-- 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
ENABLE
-- 可以给该事件加上注释，最大长度64个字节
COMMENT "每天凌晨1点执行"
DO
	BEGIN
		
		SELECT * FROM USER LIMIT 10;
		
	END$$

DELIMITER ;
```

### 每隔一分钟执行

```sql
DELIMITER $$

CREATE EVENT `executed_every_minute`

-- 设置触发点
ON SCHEDULE
	-- 使用EVERY关键字指定时间间隔，每隔一分钟执行
	EVERY 1 MINUTE

-- 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
-- 即默认的计划任务执行完毕后自动drop该事件
ON COMPLETION PRESERVE 
-- 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
ENABLE
-- 可以给该事件加上注释，最大长度64个字节
COMMENT "每隔一分钟执行"
DO
	BEGIN
		
		SELECT * FROM USER LIMIT 10;
		
	END$$

DELIMITER ;
```

### 指定时间范围内执行

```sql
DELIMITER $$

CREATE EVENT `1_am_every_range`

-- 设置触发点
ON SCHEDULE
	-- 使用EVERY关键字指定时间间隔，每隔一分钟执行
	EVERY 1 MINUTE
	-- 使用STARTS关键字指定开始时间，当前时间一小时之后开始执行
	STARTS CURRENT_TIMESTAMP + INTERVAL 1 HOUR
	-- 使用ENDS关键字指定结束时间，当前时间一个月后结束执行
	ENDS CURRENT_TIMESTAMP + INTERVAL 1 MONTH

-- 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
-- 即默认的计划任务执行完毕后自动drop该事件
ON COMPLETION PRESERVE 
-- 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
ENABLE
-- 可以给该事件加上注释，最大长度64个字节
COMMENT "每隔一分钟执行，指定开始时间和结束时间"
DO
	BEGIN
		
		SELECT * FROM USER LIMIT 10;
		
	END$$

DELIMITER ;
```





### 一小时后只执行一次

```sql
DELIMITER $$

CREATE EVENT `after_hour_execute_once`

-- 设置触发点
ON SCHEDULE
	-- 使用AT关键字指定只执行一次的时间，一小时后只执行一次
	AT CURRENT_TIMESTAMP + INTERVAL 1 HOUR

-- 可以设置这个事件是执行一次还是持久执行，默认为`NOT PRESERVE`
-- 即默认的计划任务执行完毕后自动drop该事件
ON COMPLETION PRESERVE 
-- 可是设置该事件创建后状态是否开启或关闭，默认为`ENABLE`
ENABLE
-- 可以给该事件加上注释，最大长度64个字节
COMMENT "一小时后只执行一次"
DO
	BEGIN
		
		SELECT * FROM USER LIMIT 10;
		
	END$$

DELIMITER ;
```







## 修改事件

```sql
ALTER EVENT event_name
  [ON SCHEDULE SCHEDULE]
  [RENAME TO new_event_name]
  [ON COMPLETION [NOT] PRESERVE]
  [COMMENT 'comment']
  [ENABLE | DISABLE]
  [DO sql_statement]
```

## 删除事件

```sql
DROP EVENT [IF EXISTS] event_name
```

## 开启事件

```sql
ALTER EVENT event_name ENABLE;
```

## 停止事件

```sql
ALTER EVENT event_name DISABLE;
```



## 启动定时器

```sql
ALTER EVENT event_remind_status ON    
COMPLETION PRESERVE ENABLE; 
```
