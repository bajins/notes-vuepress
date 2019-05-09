# MySQL循环

# 目录
* [一、while循环](#一while循环)
* [二、repeat循环](#二repeat循环)
* [三、loop循环](#三loop循环)
*****************************************************************************

# 一、while循环
```sql
# 定义标识符为双斜杠
DELIMITER //
# 如果存在test_while存储过程则删除
DROP PROCEDURE IF EXISTS test_while;
# 创建无参存储过程,名称为test_while
CREATE PROCEDURE test_while() 
BEGIN
    # 申明变量
    DECLARE i INT;
    # 变量赋值
    SET i = 0;
    # 结束循环的条件: 当i大于10时跳出while循环
    WHILE i < 10 DO
        # 往test_while表添加数据
        INSERT INTO test_while VALUES (i);
        # 循环一次,i加一
        SET i = i + 1;
    # 结束while循环
    END WHILE;
    # 查看test_while表数据
    SELECT * FROM test_while;
END
# 结束定义语句
//

```
## 调用存储过程
```sql
CALL test_while();
```

# 二、repeat循环
```sql
# 定义标识符为双斜杠
DELIMITER //
# 如果存在test_repeat存储过程则删除
DROP PROCEDURE IF EXISTS test_repeat;
# 创建无参存储过程,名称为test_repeat
CREATE PROCEDURE test_repeat()
BEGIN
    # 申明变量
    DECLARE i INT;
    # 变量赋值
    SET i = 0;
    REPEAT
        # 往test_repeat表添加数据
        INSERT INTO test_repeat VALUES (i);
        # 循环一次,i加一
        SET i = i + 1;
    # 结束循环的条件: 当i大于10时跳出repeat循环
    UNTIL i > 10 END REPEAT;
    # 查看test_repeat表数据
    SELECT * FROM test_repeat;
END
# 结束定义语句
//
```
## 调用存储过程
```sql
CALL test_repeat();
```

# 三、loop循环
```sql
# 定义标识符为双斜杠
DELIMITER //
# 如果存在test_loop存储过程则删除
DROP PROCEDURE IF EXISTS test_loop;
# 创建无参存储过程,名称为test_loop
CREATE PROCEDURE test_loop()
BEGIN
    # 申明变量
    DECLARE i INT;
    # 变量赋值
    SET i = 0;
    # lp为循环体名,可随意 loop为关键字
    lp : LOOP
        # 往test_loop表添加数据
        INSERT INTO test_loop VALUES (i);
        # 循环一次,i加一
        SET i = i + 1;
        # 束循环的条件: 当i大于10时跳出loop循环
        IF i > 10 THEN
            LEAVE lp;
        END IF;
    END LOOP;
    # 看test_loop表数据
    SELECT * FROM test_loop;
END
# 束定义语句
//
```
## 调用存储过程
```sql
CALL test_loop();
```



