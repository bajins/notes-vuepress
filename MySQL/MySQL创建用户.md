## 五、查看用户的授权
#### 命令：
```sql
# 查看所有
SHOW GRANTS;
# 查看指定用户
SHOW GRANTS FOR 'username'@'host'
```
#### 说明：
##### username——将要创建的用户名；

##### host——指定该用户在哪个主机上可以登录，"localhost"指该用户只能在本地登录，不能在另外一台机器上远程登录，如果想远程登录，将"localhost"改为"%"，表示在任何一台电脑上都可以登录；如果替换成ip，则为只有对应的ip可以连接；

## 一、创建用户：以root用户登录到数据库后进行用户创建
#### 命令：
```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
```
#### 说明：
##### username——将要创建的用户名；

##### host——指定该用户在哪个主机上可以登录，"localhost"指该用户只能在本地登录，不能在另外一台机器上远程登录，如果想远程登录，将"localhost"改为"%"，表示在任何一台电脑上都可以登录；如果替换成ip，则为只有对应的ip可以连接；

##### password——该用户的登录密码，密码可以为空，若为空则该用户可以不需要密码登录服务器。

#### 例如：
```sql
# 创建本地登录账户
CREATE USER 'test_admin'@'localhost' IDENTIFIED BY '123456';
# 创建所有主机可登录账户
CREATE USER 'test_admin2'@'%' IDENTIFIED BY '123456';
# 创建只读账号
GRANT SELECT ON *.* TO 'reader'@'%' IDENTIFIED BY "123456";
# 增删改查账号
GRANT SELECT,UPDATE,INSERT,DELETE ON *.* TO 'writer'@'%' IDENTIFIED BY "123456"
```
## 二、授权：以root用户登录到数据库后进行授权
#### 命令：
```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```
#### 说明：
##### privileges——用户的操作权限，如SELECT等。如果授予所有权限则使用ALL。

##### databasename——数据库名称。tablename——表名。如果要给该用户授予对所有数据库和表的相应操作权限则可用*表示，例如*.*

#### 例如：
```sql
GRANT SELECT ON test_db.* TO 'test_admin2'@'%';
# 刷新权限
flush privileges;
```

## 三、撤销用户权限
#### 命令：
```sql
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```
#### 说明：
##### privileges——用户的操作权限，如SELECT等。如果授予所有权限则使用ALL。

##### databasename——数据库名称。tablename——表名。如果要给该用户授予对所有数据库和表的相应操作权限则可用*表示，例如*.*

#### 例如：
```sql
REVOKE SELECT ON test_db.* FROM 'test_min'@'%';
```
## 四、删除账户及权限：
#### 命令：
```sql
DROP USER 'username'@'host';
```
#### 说明：
##### username——将要创建的用户名；

##### host——指定该用户在哪个主机上可以登录，"localhost"指该用户只能在本地登录，不能在另外一台机器上远程登录，如果想远程登录，将"localhost"改为"%"，表示在任何一台电脑上都可以登录；如果替换成ip，则为只有对应的ip可以连接；












