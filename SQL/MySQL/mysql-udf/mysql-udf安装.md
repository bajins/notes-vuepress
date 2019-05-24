# mysql-udf安装

# 一、mysql-udf-http
### 安装cur
```
yum install -y libcurl*
```
#### 或者
```
yum install -y curl*
```

### 安装mysql-udf-http
项目网址：http://code.google.com/p/mysql-udf-http/
中文说明：http://blog.zyan.cc/mysql-udf-http/
```
wget https://github.com/claer-ding/UseNotes/raw/master/MySQL/mysql-udf/mysql-udf-http-1.0.tar.gz
tar zxvf mysql-udf-http-1.0.tar.gz
cd mysql-udf-http-1.0
./configure --prefix=/usr/local/mysql-udf-http --with-mysql=/usr/local/mysql/bin/mysql_config
make && make install
```
#### 如果提示configure: error: no acceptable C compiler found in $PATH需要安装GCC编译器
```
yum install -y gcc
```

#### 如果没有mysql_config，请执行以下命令
```
yum install -y mysql-devel
```

### 搜索mysql-udf-http.so文件位置
```
find / -name mysql-udf-http.so
```

### 由于mysql-udf-http.so不在mysql/lib/plugin/目录下，所以需要创建软连接或者复制过去
#### 创建软连接
```
ln -s /usr/local/mysql-udf-http/lib/mysql-udf-http.so /usr/local/mysql/lib/plugin/mysql-udf-http.so
```
#### 或者复制
```
cp /usr/local/mysql-udf-http/lib/mysql-udf* /usr/local/mysql/lib/plugin/
```

### 重启mysql
```
service mysqld restart
```
#### 或者
```
systemctl restart mysqld.service
```

### 创建
```
create function http_get returns string soname 'mysql-udf-http.so';
create function http_post returns string soname 'mysql-udf-http.so';
create function http_put returns string soname 'mysql-udf-http.so';
create function http_delete returns string soname 'mysql-udf-http.so';
```

### 删除
```
DROP FUNCTION IF EXISTS http_get;
DROP FUNCTION IF EXISTS http_post;
DROP FUNCTION IF EXISTS http_put;
DROP FUNCTION IF EXISTS http_delete;
```

### 验证是否安装成功:
```
select * from mysql.func; 
```

### Description:
```
SELECT http_get('<url>');
SELECT http_post('<url>', '<data>');
SELECT http_put('<url>', '<data>');
SELECT http_delete('<url>');
```
### 实例：
```
/* HTTP GET、POST方式提交关键词“xoyo”到百度移动搜索 */  
SELECT http_get('http://m.baidu.com/s?word=xoyo&pn=0');  
SELECT http_post('http://m.baidu.com/s','word=xoyo&pn=0');  
  
/* 新浪微博开放平台：获取新浪用户ID为103500的最近一条微博内容 */  
SELECT http_get('http://api.t.sina.com.cn/statuses/user_timeline/103500.json?count=1&source=1561596835') AS data;  
/* 新浪微博开放平台：发表一条微博 */  
SELECT http_post('http://your_sina_uid:your_password@api.t.sina.com.cn/statuses/update.xml?source=1561596835', 'status=Thins is sina weibo test information');  
  
/* Tokyo Tyrant 写入、读取、删除操作 */  
SELECT http_put('http://192.168.8.34:1978/key', 'This is value');  
SELECT http_get('http://192.168.8.34:1978/key');  
SELECT http_delete('http://192.168.8.34:1978/key');  
```

# 二、mysql-udf-json
```
wget https://github.com/claer-ding/lib_mysqludf_json/archive/2013.zip
unzip 2013.zip
cd lib_mysqludf_json-2013
gcc $(/usr/local/mysql/bin/mysql_config --cflags) -shared -fPIC -o lib_mysqludf_json.so lib_mysqludf_json.c
cp lib_mysqludf_json.so /usr/local/mysql/lib/plugin/
```


### 创建
```
create function lib_mysqludf_json_info returns string soname 'lib_mysqludf_json.so';
create function json_array returns string soname 'lib_mysqludf_json.so';
create function json_members returns string soname 'lib_mysqludf_json.so';
create function json_object returns string soname 'lib_mysqludf_json.so';
create function json_values returns string soname 'lib_mysqludf_json.so';
```

### 删除
```
DROP FUNCTION IF EXISTS lib_mysqludf_json_info;
DROP FUNCTION IF EXISTS json_array;
DROP FUNCTION IF EXISTS json_members;
DROP FUNCTION IF EXISTS json_object;
DROP FUNCTION IF EXISTS json_values;
```

### 验证是否安装成功:
```
select * from mysql.func; 
```

### 实例：
#### 返回json对象
```
select json_object(login_name as user,login_password as pwd) as user from t_sys_loginperson;
```
#### 返回json数组
```
select json_array(login_name,login_password) as user from t_sys_loginperson;
```

### 创建触发器
```
/* INSERT插入操作的触发器 */  
/*开头将结束符号定义为|*/
DELIMITER |  
DROP TRIGGER IF EXISTS mytable_insert;  
CREATE TRIGGER mytable_insert  
AFTER INSERT ON mytable  
FOR EACH ROW BEGIN  
    SET @tt_json = (SELECT json_object(id,addtime,title) FROM mytable WHERE id = NEW.id LIMIT 1);  
    SET @tt_resu = (SELECT http_put(CONCAT('http://192.168.8.34:1978/', NEW.id), @tt_json));  
/*使用|结束*/
END |  
/*最后使用DELIMITER ; 将结束符号还原*/
DELIMITER ;  
``` 
  
``` 
/* UPDATE更新操作的触发器 */  
DELIMITER |  
DROP TRIGGER IF EXISTS mytable_update;  
CREATE TRIGGER mytable_update  
AFTER UPDATE ON mytable  
FOR EACH ROW BEGIN
	/*判断表中字段新数据与旧数据变化*/
	if new.status<>old.status then
    SET @tt_json = (SELECT json_object(id,addtime,title) FROM mytable WHERE id = OLD.id LIMIT 1);  
    SET @tt_resu = (SELECT http_get(CONCAT('http://192.168.8.34:1978/', OLD.id), @tt_json));  
	/*结束判断*/
	end if;
END |  
DELIMITER ;  
```
```
/* DELETE删除操作的触发器 */  
DELIMITER |  
DROP TRIGGER IF EXISTS mytable_delete;  
CREATE TRIGGER mytable_delete  
AFTER DELETE ON mytable  
FOR EACH ROW BEGIN  
    SET @tt_resu = (SELECT http_delete(CONCAT('http://192.168.8.34:1978/', OLD.id)));  
END |  
DELIMITER ;  
```
