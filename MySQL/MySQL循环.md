# 目录
* [一、while循环](#一while循环)

*****************************************************************************

# 一、while循环
```sql
DELIMITER //                            #定义标识符为双斜杠
DROP PROCEDURE IF EXISTS test;          #如果存在test存储过程则删除
CREATE PROCEDURE test_while()                 #创建无参存储过程,名称为test
BEGIN
    DECLARE i INT;                      #申明变量
    SET i = 0;                          #变量赋值
    WHILE i < 10 DO                     #结束循环的条件: 当i大于10时跳出while循环
        INSERT INTO test VALUES (i);    #往test表添加数据
        SET i = i + 1;                  #循环一次,i加一
    END WHILE;                          #结束while循环
    SELECT * FROM test;                 #查看test表数据
END
//                                      #结束定义语句

```
## 调用存储过程
```sql
CALL test_while();
```
