# 目录
* [一、while循环](#一while循环)
* [二、repeat循环](#二repeat循环)
* [三、loop循环](#三loop循环)
*****************************************************************************

# 一、while循环
```sql
DELIMITER //                            #定义标识符为双斜杠
DROP PROCEDURE IF EXISTS test_while;          #如果存在test存储过程则删除
CREATE PROCEDURE test_while()                 #创建无参存储过程,名称为test
BEGIN
    DECLARE i INT;                      #申明变量
    SET i = 0;                          #变量赋值
    WHILE i < 10 DO                     #结束循环的条件: 当i大于10时跳出while循环
        INSERT INTO test_while VALUES (i);    #往test表添加数据
        SET i = i + 1;                  #循环一次,i加一
    END WHILE;                          #结束while循环
    SELECT * FROM test_while;                 #查看test表数据
END
//                                      #结束定义语句

```
## 调用存储过程
```sql
CALL test_while();
```

# 二、repeat循环
```sql
DELIMITER //                            #定义标识符为双斜杠
DROP PROCEDURE IF EXISTS test_repeat;          #如果存在test存储过程则删除
CREATE PROCEDURE test_repeat()                 #创建无参存储过程,名称为test
BEGIN
    DECLARE i INT;                      #申明变量
    SET i = 0;                          #变量赋值
    REPEAT
        INSERT INTO test_repeat VALUES (i);    #往test表添加数据
        SET i = i + 1;                  #循环一次,i加一
    UNTIL i > 10 END REPEAT;            #结束循环的条件: 当i大于10时跳出repeat循环
    SELECT * FROM test_repeat;                 #查看test表数据
END
//                                      #结束定义语句
```
## 调用存储过程
```sql
CALL test_repeat();
```

# 三、loop循环
```sql
DELIMITER //                            #定义标识符为双斜杠
DROP PROCEDURE IF EXISTS test_loop;          #如果存在test存储过程则删除
CREATE PROCEDURE test_loop()                 #创建无参存储过程,名称为test
BEGIN
    DECLARE i INT;                      #申明变量
    SET i = 0;                          #变量赋值
    lp : LOOP                           #lp为循环体名,可随意 loop为关键字
        INSERT INTO test_loop VALUES (i);    #往test表添加数据
        SET i = i + 1;                  #循环一次,i加一
        IF i > 10 THEN                  #结束循环的条件: 当i大于10时跳出loop循环
            LEAVE lp;
        END IF; 
    END LOOP;
    SELECT * FROM test_loop;                 #查看test表数据
END
//                                      #结束定义语句
```
## 调用存储过程
```sql
CALL test_loop();
```



