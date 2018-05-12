本机以centOS为例：

安装依赖，一条命令行全部都可以搞定：
```
yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel lrzsz lrzsz-devel p7zip p7zip-devel net-tools net-tools-devel vim vim-devel libaio libaio-devel unzip zip
```
---

把Linux的idea代理软件上传到服务器（我把文件名改为ideaServer64）：
输入rz会自动弹出选择文件窗口，选择好文件之后点确认就可以了。

上传之后命令行会自动跳到下一行，但是没有任何上传完成提示，可以查看上传目录下是否有该文件：
ll


接下来 需要把它运行起来，先加一个可执行权限：
```
chmod +x ideaServer64
```

开始运行，输入路径加文件名加命令，我把文件上传到/usr/local/src/目录下的：
/usr/local/src/ideaServer64 -p 1027 -prolongationPeriod 999999999999

默认运行会出现运行的信息：
包括制作代理软件的作者信息，和IP端口信息，注意要记住端口号，有作用。

按Ctrl加c退出当前运行。

如果要后台运行，请使用nohup命令：
先切换到代理软件的目录下：cd /usr/local/src/
再输入：nohup ./ideaServer64 -p 1027 -prolongationPeriod 999999999999 2>&1 &
之后会有一个进程号，可以用jobs -l命令查看。

可以通过supervisor实现守护进程，自启动。命令如下：
编辑supervisord.conf文件：
vi /etc/supervisord.conf
输入i:

#添加以下内容
[program:idea-server]
command = /usr/local/src/ideaServer64 -p 1027 -u 域名（不带前缀） -prolongationPeriod 999999999 -l 127.0.0.1
autostart=true
autorestart=true
startsecs=3
按Esc按键，再输入:wq保存并关闭（:q退出，:wq保存并关闭，:q!撤销编辑，:!q强制退出）
----------------------------------------------------------------------------
如果你安装了NGINX，操作如下,如果没有安装请往下看：
接下来更改NGINX的nginx.conf配置信息：
输入：
vi /usr/local/nginx/nginx.conf
在最后一个}前加入以下代码：
```
	server{
		listen 80;
		#自己的域名，没有的话就是自己的公网ip，域名一定要解析到这台服务器上
		server_name 域名或者ip;
		root /home/www/;

		location / {
			#注意这里的端口一定要跟之前运行代理软件的端口一样
			proxy_pass http://127.0.0.1:1027;
			proxy_redirect off;
			proxy_set_header Host $host;
			proxy_set_header X-Real-IP $remote_addr;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		}
		access_log off; #access_log end
		error_log /dev/null; #error_log end
	}
```
按Esc按键，再输入:wq保存并关闭。
重启nginx：
```
/usr/local/nginx/nginx -s reload
```
=================================================================
如果你没有安装NGINX，操作如下：
源码编译安装，继续往下看有更简单的方式！！！（yum安装）
Nginx 一般有两个版本，分别是稳定版和开发版，您可以根据您的目的来选择这两个版本的其中一个，
下面是把 Nginx 安装到 /usr/local/nginx 目录下的详细步骤：
```
cd /usr/local/src
wget http://nginx.org/download/nginx-1.13.8.tar.gz
tar -zxvf nginx-1.13.8.tar.gz
cd nginx-1.13.8

./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_ssl_module \
--with-pcre=/usr/local/src/pcre-8.39 \
--with-zlib=/usr/local/src/zlib-1.2.11 \
--with-openssl=/usr/local/src/openssl-1.1.0g

make
make install
```

安装成功后 /usr/local/nginx 目录下如下
fastcgi.conf            koi-win             nginx.conf.default
fastcgi.conf.default    logs                scgi_params
fastcgi_params          mime.types          scgi_params.default
fastcgi_params.default  mime.types.default  uwsgi_params
html                    nginx               uwsgi_params.default
koi-utf                 nginx.conf          win-utf


6.启动
确保系统的 80 端口没被其他程序占用，运行命令来启动Nginx：
```
/usr/local/nginx/nginx
```

查看占用端口：
```
netstat -ano|grep 80
```

如果出现：-bash: netstat: command not found
可能是CentOS 7的最小化安装少了一些工具,比如 ifconfig 及 netstat
```
yum install net-tools
```
--------------------------------------------------------------------
或者用yum安装：
下载并安装nginx
```
yum install -y nginx
```
刚安装的Nginx不会自行启动。运行Nginx:
```
sudo systemctl start nginx.service
```
CentOS 7 开机启动Nginx：
```
sudo systemctl enable nginx.service
```
网站文件存放默认目录：
/usr/share/nginx/html
网站默认站点配置：
/etc/nginx/conf.d/default.conf
自定义Nginx站点配置文件存放目录：
/etc/nginx/conf.d/
Nginx全局配置：
/etc/nginx/nginx.conf

#config: /etc/nginx/nginx.conf 安装目录
#config: /etc/sysconfig/nginx
#pidfile: /var/run/nginx.pid
#log日志文件在var/log/nginx


项目文件存放在/usr/share/nginx/html/

启动直接输入nginx

关闭nginx进程,强制停止Nginx:
```
pkill -9 nginx
```
其他的停止nginx 方式： 
```
ps -ef | grep nginx
#主进程号 >>>>从容停止Nginx 
kill -QUIT
#主进程号 >>>>快速停止Nginx 
kill -TERM
```
---------------------------------------------------------------

打开浏览器访问此机器的 IP，如果浏览器出现 Welcome to nginx! 则表示 Nginx 已经安装并运行成功。

---------------------------------------------------------------------------------------------

ssh遇到port 22:No route to host问题的解决方法
把防火墙端口放开！！！


==============================================================



启动Nginx出现这个错误：
nginx: [error] open() "/usr/local/var/run/nginx.pid" failed (2: No such file or directory)
解决方法：找到你的nginx.conf的文件夹目录，然后运行这个命令：
```
nginx -c /etc/nginx/nginx.conf
```
再重启就可以了。

Linux每个应用运行都会产生一个进程，那么我们就可以通过查看Nginx进程是否存在来判断它是否启动。
用ps -ef列出进程列表，然后通过grep过滤。
如： ps -ef | grep nginx 就可以看到Nginx进程是否存在了。

第二种方法：直接查看进程id
```
ps -C nginx -o pid
```
第三种方法：使用netstat命令
如果我们的Nginx运行在80端口，那么就可以通过netstat -anp | grep :80命令来判断Nginx是否启动。

第四种方法：使用lsof命令
lsof -i:80 也可以查到80端口进程是否有进程在运行。

=======================================================================
首先centos7 已经不支持mysql，因为收费了你懂得，所以内部集成了mariadb，
而安装mysql的话会和mariadb的文件冲突，所以需要先卸载掉mariadb，以下为卸载mariadb，安装mysql的步骤。
列出所有被安装的rpm package 
```
rpm -qa | grep mariadb
```
#卸载
```
rpm -e mariadb-libs-5.5.56-2.el7.x86_64
```
#强制卸载，因为没有--nodeps
```
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64
```
安装mysql依赖
```
yum -y install vim libaio
```
安装MySQL
下载yum源
```
wget https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
```
安装yum源
```
yum -y localinstall mysql57-community-release-el7-11.noarch.rpm
```
检查yum源是否安装成功
```
yum repolist enabled | grep "mysql.*-community.*"
```
安装mysql
```
yum -y install mysql-community-server
```
更改MYSQL用户权限：
```
sudo chown -R root:root /var/lib/mysql
```
启动mysql并查看其状态
```
systemctl start mysqld
systemctl status mysqld
```
设置mysql为系统服务，随系统启动而启动
```
systemctl enable mysqld
systemctl daemon-reload
```
重启服务：
```
systemctl restart mysql
```
查看mysql下root账号的默认密码
mysql5.7安装完成之后，在/var/log/mysqld.log文件中给root生成了一个默认密码。通过下面的方式找到root默认密码，然后登录mysql。
grep 'temporary password' /var/log/mysqld.log
其中=号后面部分就是默认密码
1、修改/etc/my.cnf，在 [mysqld] 小节下添加一行：skip-grant-tables=1
这一行配置让 mysqld 启动时不对密码进行验证

2、重启mysqld 服务：systemctl restart mysqld
3、使用 root 用户登录到 mysql -uroot
4、切换到mysql数据库，更新 user 表：
```
update user set authentication_string = password('123456'),password_expired = 'N', password_last_changed = now() where user = 'root';
```
在之前的版本中，密码字段的字段名是 password，5.7版本改为了 authentication_string

5、修改远程主机连接权限：
指定mysql表，更新连接权限：
```
update user set host = '%' where user ='root';
```
查看是否更新成功，即host下面是否为%号：
```
select host, user from user;
```
最后，刷新MySQL的权限相关表：
```
flush privileges;
```
6、退出 mysql，编辑 /etc/my.cnf 文件，删除 skip-grant-tables=1的内容
7、重启mysqld 服务，再用新密码登录即可


-------------------------------------------------------------------------
MariaDB 远程连接：
#针对ip
```
create user 'root'@'192.168.10.10' identified by 'password';
```
#全部
```
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;
```
#刷新权限表
```
flush privileges;
```
重启服务：
```
systemctl restart mysql
```
-------------------------------------------------------------------------

5.7以下修改密码 
修改密码有几种方式 
首先查看原有的配置 
```
select host,user,password from mysql.user;
```
使用set password for ‘用户名’@’主机名’=password(‘密码’)：
```
set password for 'root'@'localhost'=password('123456');
```
或者
使用update修改:
```
update user set password=PASSWORD("123456") where user='root';
```

设置远程访问：
```
grant all privileges on *.* to 'root'@'%' identified by'123456';
#或者
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '你的密码' WITH GRANT OPTION;
```
刷新MySQL的权限相关表
```
flush privileges;
```
重启mysql
```
service mysql restart
#或者
service mysqld restart
```
注意：初次安装设置密码时候一定要使用update修改密码，更改root密码。
这样使用localhost或者127.0.0.1时候密码都一样。否则很有可能不一样，导致不能使用，
如果数据库服务器和web等在一个服务器的时候，尽量使用localhost。
在linux下mysql使用localhost的时候使用的是unix套接字，而其他使用的是tcp/ip协议。

设置服务端编码：
```
vi /etc/my.cnf
```
添加到 [mysqld] 这个标志下面
```
character-set-server=utf8
```
---------------------------------------------------------
安装phpmyadmin：
```
yum -y install  phpMyAdmin
```
配置phpmyadmin：
```
cp /etc/phpMyAdmin/config.inc.php /usr/share/phpMyAdmin/
ln -s /usr/share/phpMyAdmin  /usr/local/nginx/html/pma
```
有时候会安装不成功，提示没有可用软件包，则需要安装Remi源 ：
yum install epel-release
rpm -ivh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

或者直接下载使用：
```
wget https://files.phpmyadmin.net/phpMyAdmin/4.7.7/phpMyAdmin-4.7.7-all-languages.tar.gz
chown -R www:www /var/lib/php/session
```
==========================================================

rpm 安装 Php7 相应的 yum源：
```
rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm
```
安装php7.0：
```
yum install -y php70w
```
安装php扩展：
```
yum install -y php70w-mysql.x86_64 php70w-gd.x86_64 php70w-ldap.x86_64 php70w-mbstring.x86_64 php70w-mcrypt.x86_64
yum -y install libxml2 libxml2-devel openssl openssl-devel bzip2 bzip2-devel libcurl libcurl-devel libjpeg libjpeg-devel libpng libpng-devel freetype freetype-devel gmp gmp-devel libmcrypt libmcrypt-devel readline readline-devel libxslt libxslt-devel
```
安装PHP FPM：
```
yum install -y php70w-fpm php70w-opcache
```
验证安装
终端命令：php -v，显示当前PHP版本

修改Nginx配置文件：
```
	server {
	    listen       80;
	    server_name  www.jostin.top;
	    root         /home/www;
	     
	    location / {
	        index index.php;
	        try_files $uri $uri/ /index.php?$args;
	    }
	 
	    rewrite /wp-admin$ $scheme://$host$uri/ permanent;
	 
	    location ~*^.+\.(ogg|ogv|svg|svgz|eot|otf|woff|mp4|ttf|rss|atom|jpg|jpeg|gif|png|ico|zip|tgz|gz|rar|bz2|doc|xls|exe|ppt|tar|mid|midi|wav|bmp|rtf)$ {
	                access_log off; log_not_found off; expires max;
	    }
	 
	    location ~ \.php$ {
	        try_files $uri =404;
	        fastcgi_split_path_info ^(.+\.php)(/.+)$;
	        fastcgi_pass 127.0.0.1:9000;
	        fastcgi_index index.php;
	        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	        include fastcgi_params;
	    }
	}
```
修改php-fpm配置文件：
php-fpm配置文件位置：（/etc/php-fpm.d/www.conf） 
指定用户和组，必须要指定root以外的：
user =www
group=www


放入测试文件：
cd nginx指定的root目录
在index.php中输入：
<?php phpinfo(); ?>

启动PHP-FPM：
systemctl start php-fpm.service
查看启动状态：
systemctl status php-fpm.service
设置开机自启动
systemctl enable php-fpm.service


报错说www 用户不存在或者无法启动：
[26-Feb-2015 15:57:38] ERROR: [pool www] cannot get uid for user 'www'
[26-Feb-2015 15:57:38] ERROR: FPM initialization failed
那我们新建www 用户组：
groupadd www
useradd -g www www

php7连接mysql测试代码：
<?php 
    $mysqli = new mysqli("localhost", "root", "123456"); 
    if(!$mysqli)  { 
        echo"database error"; 
    }else{ 
        echo"php env successful"; 
    } 
    $mysqli->close(); 
?> 


===================================================================

VPS搭建Wordpress更新/安装插件时需要输入FTP信息的解决方法:

解决方法就是利用chown语句将网站文件夹的所有者设置给服务器：

如果你是LNMP的用户，请执行下面语句：

改变目录的组和用户
chown nginx.nginx 文件夹名

修改目录下所有文件所属
chown -R www 网站目录
这样，你的Wordpress在更新或安装东东的时候就不会再提示你填入什么FTP信息了~

文件夹授权（7权限-读写执行）
chmod -R 777 文件夹名
参数 -R 表示递归，文件夹名及其之内的所有文件夹、文件都被改变了权限。


========================================================================
```
http{

    gzip on;
    client_max_body_size 50m; #缓冲区代理缓冲用户端请求的最大字节数,可以理解为保存到本地再传给用户
    client_body_buffer_size 256k;
    client_header_timeout 3m;
    client_body_timeout 3m;
    send_timeout 3m;
    proxy_connect_timeout 300s; #nginx跟后端服务器连接超时时间(代理连接超时)
    proxy_read_timeout 300s; #连接成功后，后端服务器响应时间(代理接收超时)
    proxy_send_timeout 300s;
    proxy_buffer_size 64k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
    proxy_buffers 4 32k; #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
    proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
    proxy_temp_file_write_size 64k; #设定缓存文件夹大小，大于这个值，将从upstream服务器传递请求，而不缓冲到磁盘
    proxy_ignore_client_abort on; #不允许代理端主动关闭连接
    
    
 }
```
NGINX用ip代理其他NGINX服务器
```
	upstream zml{#如果想对后端机器做负载均衡
	#被代理IP
            server 193.112.13.35:8085;
        }

	server {
	    listen       80;
	    #域名
	    server_name  0tip.top www.0tip.top;
	    
            location / {
            	proxy_pass http://193.112.13.35:8085;#如果负载均衡就填upstream的名称
                proxy_redirect off;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	        
            }

	}
```
	
proxy_set_header Host $host:$proxy_port;服务器名可以和后端服务器的端口一起传送：
$host代表转发服务器，$host就是nginx代理服务器。
$proxy_port代表转发服务器请求后端服务器的端口，也就是80，将请求的报文首部重新封装，将proxy_host封装为请求的host
proxy_set_header X-Real-IP $remote_addr:
将$remote_addr的值放进变量X-Real-IP中，此变量名可变，$remote_addr的值为客户端的ip
1、proxy_set_header X-Forwarded-For $remote_addr;
后端服务器成功的显示了真实客户端的ip.
2、proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

1和2在只有一个代理服务器的转发的情况下，两者的效果貌似差不多，都可以真实的显示出客户端原始ip
但是区别在于：
$proxy_add_x_forwarded_for变量包含客户端请求头中的"X-Forwarded-For"，与$remote_addr两部分，他们之间用逗号分开。
举个例子，有一个web应用，在它之前通过了两个nginx转发，www.linuxidc.com 即用户访问该web通过两台nginx。
在第一台nginx中,使用
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
现在的$proxy_add_x_forwarded_for变量的"X-Forwarded-For"部分是空的，所以只有$remote_addr，而$remote_addr的值是用户的ip，于是赋值以后，X-Forwarded-For变量的值就是用户的真实的ip地址了。
到了第二台nginx，使用
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#### 现在的$proxy_add_x_forwarded_for变量，X-Forwarded-For部分包含的是用户的真实ip，$remote_addr部分的值是上一台nginx的ip地址，于是通过这个赋值以后现在的X-Forwarded-For的值就变成了“用户的真实ip，第一台nginx的ip”，这样就清楚了吧。
--------------------------------------------------------
```
	server {
	    listen       80;
	    #公网IP,可以在ip后面加端口，要与listen端口号一致
	    server_name  公网IP;
	    #网站项目地址
	    root         /home/www/jostin/;

	    location / {
	        index index.php index.html;
	    }
	}
```
