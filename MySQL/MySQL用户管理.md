# 目录
* [GRANT命令创建用户](#GRANT命令创建用户)
* [安装MySQL后修改密码](#安装MySQL后修改密码)

*****************************************************************************
## 查看用户的授权
#### 命令：
```sql
# 查看root用户
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
GRANT INSERT,DELETE,UPDATE,SELECT ON *.* TO 'writer'@'%' IDENTIFIED BY "123456"
```
## 二、授权：以root用户登录到数据库后进行授权
#### 命令：
```sql
GRANT privileges ON databasename.tablename TO 'username'@'host'
```
#### 说明：
##### privileges——用户的操作权限，如INSERT,DELETE,UPDATE,SELECT等。如果授予所有权限则使用ALL。

##### databasename——数据库名称。tablename——表名。如果要给该用户授予对所有数据库和表的相应操作权限则可用\*表示，例如\*\.\*

#### 例如：
```sql
GRANT SELECT ON *.* TO 'test_admin2'@'%';
# 刷新权限
FLUSH PRIVILEGES;
```

## 三、撤销用户权限
#### 命令：
```sql
REVOKE privilege ON databasename.tablename FROM 'username'@'host';
```
#### 说明：
##### privileges——用户的操作权限，如INSERT,DELETE,UPDATE,SELECT等。如果授予所有权限则使用ALL。

##### databasename——数据库名称。tablename——表名。如果要给该用户授予对所有数据库和表的相应操作权限则可用\*表示，例如\*\.\*

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

#### GRANT命令创建用户
```diff
+当数据库存在用户的时候GRANT会对用户进行授权，但当数据库不存在该用户的时候，就会创建相应的用户并进行授权。
+ WITH GRANT OPTION 这个选项表示该用户可以将自己拥有的权限授权给别人
```
#### 创建用户并权限：
```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
```
#### 最后，刷新MySQL的权限相关表：
```sql
FLUSH PRIVILEGES;
```
#### 重启服务，再用新密码登录即可：
```sell
systemctl restart mysqld
```
#### [放开MySQL防火墙端口](/VPS/linux命令.md#防火墙)

*******************************************************
## 安装MySQL后修改密码
### 使用默认密码进入修改密码：

#### 查看mysql下root账号的默认密码
##### mysql5.7安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql。
```shell
grep 'temporary password' /var/log/mysqld.log
```
##### 其中root@localhost:后面部分就是默认密码

#### 执行修改密码SQL命令
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```
#### 如果出现以下错误，就说明密码强度不够：
> ERROR 1819 (HY000): Your password does not satisfy the current policy requirements

#### 需要修改以下两个参数：
```sql
set global validate_password_policy=0;
set global validate_password_length=自己想要的密码长度;
```
#### 再次执行修改密码SQL命令：
```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码';
```
#### 最后，刷新MySQL的权限相关表：
```shell
FLUSH PRIVILEGES;
```


### 修改配置修改密码：

#### 1、修改/etc/my.cnf，在 [mysqld] 小节下添加一行,修改密码完成后需要删除此行：
```shell
skip-grant-tables=1
```
##### 这一行配置让 mysqld 启动时不对密码进行验证

#### 2、重启mysqld 服务：
```shell
systemctl restart mysqld
```
#### 3、使用 root 用户登录到 
```shell
mysql -uroot
```
#### 4、切换到mysql数据库，更新 user 表：
```sql
update user set authentication_string = password('新密码'),password_expired = 'N', password_last_changed = now() where user = 'root';
```
##### 在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string

#### 使用set password for ‘用户名’@’主机名’=password(‘密码’)：
```sql
set password for 'root'@'localhost'=password('123456');
```
#### 或者使用update修改:
```sql
update user set password=PASSWORD("123456") where user='root';
```










