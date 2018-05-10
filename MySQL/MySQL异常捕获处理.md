```
DELIMITER $$
-- 判断删除存储过程
DROP PROCEDURE IF EXISTS complete_order;
CREATE PROCEDURE complete_order () 
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
	-- INSERT INTO sql_log(code,description,create_time,message) VALUES(code,'存储过程：complete_order',NOW(),msg);
	
	SELECT CONCAT("ERROR ", errno,'[', code, '] ', msg) sqlerrm;
		
	END;
	SELECT * FROM a;
	
END $$
DELIMITER;
```
```
call complete_order();
```
