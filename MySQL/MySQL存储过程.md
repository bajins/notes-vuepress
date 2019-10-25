# MySQL存储过程


* [创建游标存储过程](#创建游标存储过程)
  * [调用存储过程，查询返回结果](#调用存储过程查询返回结果)
  * [多次调用存储过程，并拼接结果](#多次调用存储过程并拼接结果)
* [循环](#循环)
* [异常处理](#异常处理)


## 创建游标存储过程

```sql
-- 将语句的结束符号从分号;临时改为两个$$(可以是自定义)
DELIMITER $$
USE `table_name`$$
-- 判断删除存储过程
DROP PROCEDURE IF EXISTS select_review$$
-- IN输入参数 OUT输出参数
CREATE DEFINER=`root`@`%` PROCEDURE select_review ( IN gs BIGINT,IN rid BIGINT,OUT result VARCHAR(255)) 
BEGIN

	DECLARE _email VARCHAR(32);
	DECLARE i INT;
	DECLARE r VARCHAR(255);
	DECLARE s INT DEFAULT 0;
	-- 遍历数据结束标志
	DECLARE done INT DEFAULT FALSE;
	-- 游标
	DECLARE r_name CURSOR FOR (SELECT email FROM company c JOIN u_user u ON c.id=u.company_id JOIN u_user_role ur ON u.id=ur.uid WHERE ur.rid=rid AND c.id=gs);
	-- 设定捕捉异常的结束标志
	DECLARE CONTINUE HANDLER FOR SQLWARNING, NOT FOUND, SQLEXCEPTION SET done = TRUE;
	-- 统计循环条数并赋值给变量i
	-- 赋值多列使用：列名1 ,列名2 INTO 变量名1,变量名2
	SELECT COUNT(nickname) INTO i FROM company c JOIN u_user u ON c.id=u.company_id JOIN u_user_role ur ON u.id=ur.uid WHERE ur.rid=rid AND c.id=gs;
	
	-- 打开游标
	OPEN r_name;
	-- 自定义循环体开始
	rLoop:LOOP
		-- 取值 赋值给变量，多个以,号分割
		-- FETCH NEXT FROM r_name INTO _email,password1,name1;
		FETCH r_name INTO _email;
				
		SET s=s+1;-- 循环一次加1
		IF(i=1) then
			SET r=CONCAT('[{"Push_MC":"',_email,'"}]');
		ELSEIF(s=1) THEN
			SET r=CONCAT('[{"Push_MC":"',_email,'"},');
		ELSEIF(s=i) THEN
			SET r=CONCAT(r,'{"Push_MC":"',_email,'"}]');
		ELSE
			SET r=CONCAT(r,'{"Push_MC":"',_email,'"},');
		END IF;
		
		-- 判断是否继续循环
		-- IF done OR s=i THEN
		IF s=i THEN
			LEAVE rLoop;-- 结束循环
			-- ITERATE rLoop;-- 跳过继续循环
		END IF;
		
	END LOOP rLoop;-- 结束自定义循环体
	CLOSE r_name;-- 关闭游标
		SET result=r;-- 返回结果
	-- 自定义异常
	-- SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT = '错误！' ;
-- 使用自定义结束标志结束
END$$
-- 还原结束标志
DELIMITER ;
```

### 调用存储过程，查询返回结果

```sql
-- 调用存储过程，@sum变量为返回结果
call select_review(输入参数一,输入参数二,@sum);
-- 查询返回结果
select @sum e;
```

### 多次调用存储过程，并拼接结果

```sql
-- 调用存储过程，@sum变量为返回结果
call select_review(输入参数一,输入参数二,@sum);
-- 定义变量接收拼接返回结果
SET @e=CONCAT('[',@sum);

call select_review(输入参数一,输入参数二,@sum);
SET @e=CONCAT(@e,',',@sum);

SET @declaration=(SELECT email FROM u_user WHERE id=48);
SET @e=CONCAT(@e,',{"Push_MC":"',@declaration,'"}]');

-- 查询最终拼接结果
SELECT @e e;
```

## 循环

> `LOOP`、`WHILE`、`REPEAT`

```sql
-- 将语句的结束符号从分号;临时改为两个$$(可以是自定义)
DELIMITER $$
USE `table_name`$$
-- 判断删除存储过程
DROP PROCEDURE IF EXISTS `add_year_month_info`$$

CREATE DEFINER=`yc`@`%` PROCEDURE `add_year_month_info`()
BEGIN
		/*
		CALL add_year_month_info()
		*/
		
		-- 统计循环次数变量
		DECLARE i INT DEFAULT 1;
		-- 需要循环次数变量
		DECLARE a INT DEFAULT 12;
		-- 设定捕捉异常的结束标志
		-- DECLARE CONTINUE HANDLER FOR SQLWARNING, NOT FOUND, SQLEXCEPTION SET done = TRUE;
		
		-- 自定义LOOP循环体开始
		rLoop:LOOP
			-- 判断是否继续循环
			IF (i>a) THEN
				-- 结束循环，意思同boeak
				LEAVE rLoop;
				-- 跳过继续循环
				-- ITERATE rLoop;
			END IF;
			-- 循环一次加1
			SET i=i+1;
			
			SELECT * FROM USER WHERE id=i;
			
		-- 结束自定义循环体
		END LOOP rLoop;
		
		-- 恢复初始值
		SET i=1;
		
		-- WHILE循环开始
		WHILE i<=a DO
			SET i=i+1;
			
			SELECT * FROM USER WHERE id=i;
			
		-- 循环结束
		END WHILE;
		
		-- 恢复初始值
		SET i=1;
		
		-- REPEAT循环开始
		REPEAT
			SET i=i+1;
			
			SELECT * FROM USER WHERE id=i;
			
		-- 循环结束
		UNTIL i>a END REPEAT;
	-- 使用自定义结束标志结束
	END$$

DELIMITER ;
```

## 异常处理

```
DELIMITER $$
-- 判断删除存储过程
DROP PROCEDURE IF EXISTS err;
CREATE PROCEDURE err() 
BEGIN
	DECLARE code VARCHAR(5) DEFAULT '00000';
	DECLARE msg TEXT;
	DECLARE errno INT;
	
	-- EXIT：发生错误时退出当前代码块
	-- DECLARE EXIT HANDLER FOR SQLEXCEPTION,SQLWARNING,NOT FOUND
	
	/*CONTINUE: 发送错误时继续执行后续代码
	SQLWARNING是对所有以01开头的SQLSTATE代码的速记
	NOT FOUND是对所有以02开头的SQLSTATE代码的速记
	SQLEXCEPTION是对所有没有被SQLWARNING或NOT FOUND捕获的SQLSTATE代码的速记*/
	DECLARE CONTINUE  HANDLER FOR SQLEXCEPTION,SQLWARNING,NOT FOUND
	
	BEGIN -- 捕获到异常时执行的代码块
	-- 赋值错误代码给code变量，赋值错误信息给msg变量
	GET DIAGNOSTICS CONDITION 1 code = RETURNED_SQLSTATE,errno = MYSQL_ERRNO, msg = MESSAGE_TEXT;
	-- 保存错误信息到日志表中
	-- INSERT INTO sql_log(errno,code,description,create_time,message) VALUES(errno,code,'存储过程：err',NOW(),msg);
	
	SELECT CONCAT("ERROR ", errno,'[', code, '] ', msg) sqlerrm;
		
	END;
	SELECT * FROM a;
	
END $$
DELIMITER;
```
```
CALL err();
```