# Nginx



* [flag](#flag)
* [location规则匹配](#location规则匹配)
  * [location语法规则](#location语法规则)
  * [内部调用](#内部调用)
* [rewrite语法](#rewrite语法)
* [判断表达式](#判断表达式)
* [Redirect语法](#redirect语法)
* [防盗链](#防盗链)
* [以后缀设置过期时间](#以后缀设置过期时间)
* [禁止访问某个目录](#禁止访问某个目录)
* [全局变量](#全局变量)
* [判断`user_agent`](#判断user_agent)
* [`proxy_pass`指令](#proxy_pass指令)
* [主配置](#主配置)
* [动静分离配置](#动静分离配置)





## flag

* [Nginx HTTP核心模块指令和内置变量中文说明](https://my.oschina.net/jsan/blog/125861)

* [nginxbeautifier](https://github.com/vasilevich/nginxbeautifier)

* [nginx-config-formatter](https://github.com/1connect/nginx-config-formatter)

* [nginxconfig配置生成](https://github.com/0xB4LINT/nginxconfig.io/)

* [nginx 变量使用](https://blog.csdn.net/u014296316/article/details/80973530)


* [HAProxy 入门](https://jaminzhang.github.io/lb/HAProxy-Get-Started/)

1. [Nginx和HAProxy对比](https://www.zhihu.com/question/34489042/answers/updated)

2. [HAProxy Nginx LVS 对比](http://www.lgoon.com/detail/22)

3. [负载均衡器对比(LVS、Nginx、Haproxy)](https://vimll.com/?p=886)

4. [各大API网关性能比较](https://segmentfault.com/a/1190000018838988)


## location规则匹配

### location语法规则

```nginx
location [=|~|~*|^~] /uri/ {
        ····· 
}
```

- location后接的匹配规则含义

| 规则  	| 说明                                                                                                                                                 	|
|-------	|------------------------------------------------------------------------------------------------------------------------------------------------------	|
| `!~*` 	| 不区分大小写不匹配的正则                                                                                                                             	|
| `!~`  	| 区分大小写不匹配的正则                                                                                                                               	|
| `/`   	| 通用匹配，任何请求都会匹配到                                                                                                                         	|
| `@`   	| 定义一个内部命名的匹配（[等阶于`internal`](https://blog.sometimesnaive.org/article/72)），适用于`error_page`,`try_files`                             	|
| `^~`  	| 开头表示uri以某个常规字符串开头，理解为匹配 url路径即可。nginx不对url做编码，因此请求为/static/20%/aa，可以被规则^~ /static/ /aa匹配到（注意是空格） 	|
| `~*`  	| 开头表示不区分大小写的正则匹配                                                                                                                       	|
| `~`   	| 开头表示区分大小写的正则匹配                                                                                                                         	|
| `=`   	| 开头表示精确匹配                                                                                                                                     	|


- 当我们有多个`location`配置的情况下，其匹配顺序为

> 首先匹配 "="，其次匹配 "^~", 其次是按文件中顺序的正则匹配，最后是交给 "/" 通用匹配。

> 当有匹配成功时候，停止匹配，按当前匹配规则处理请求。

- 比如现在同时存在如下所示匹配规则

```
location = / {
   #规则A
}
location = /login {
   #规则B
}
location ^~ /static/ {
   #规则C
}
location ~ \.(gif|jpg|png|js|css)$ {
   #规则D
}
location ~* \.png$ {
   #规则E
}
location !~ \.xhtml$ {
   #规则F
}
location !~* \.xhtml$ {
   #规则G
}
location / {
   #规则H
}
```

- 那么产生的效果如下

> 访问根目录/   比如 http://localhost/   将匹配规则A

> 访问 http://localhost/login   将匹配规则B，http://localhost/register 则匹配规则H

> 访问 http://localhost/static/a.html   将匹配规则C

> 访问 http://localhost/a.gif, http://localhost/b.jpg   将匹配规则D和规则E，但是规则D顺序优先，规则E不起作用，而 http://localhost/static/c.png 则优先匹配到规则C

> 访问 http://localhost/a.PNG   则匹配规则E，而不会匹配规则D，因为规则E不区分大小写

> 访问 http://localhost/a.xhtml   不会匹配规则F和规则G，http://localhost/a.XHTML不会匹配规则G，因为不区分大小写。规则F，规则G属于排除法，符合匹配规则但是不会匹配到，所以想想看实际应用中哪里会用到

> 访问 http://localhost/category/id/1111   则最终匹配到规则H，因为以上规则都不匹配，这个时候应该是nginx转发请求给后端应用服务器，比如FastCGI（php），tomcat（jsp），nginx作为方向代理服务器存在

- 在实际应用中，至少需要有三个匹配规则定义

```nginx
# 直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
# 这里是直接转发给后端应用服务器了，也可以是一个静态首页
# 第一个必选规则
location = / {
    proxy_pass http://localhost:8080/index
}

# 第二个必选规则是处理静态文件请求，这是 nginx 作为 http 服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
    root /webroot/static/;
}
location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
}

# 第三个规则就是通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求，自己根据实际把握
# 毕竟目前的一些框架的流行，带 .php, .jsp 后缀的情况很少了
location / {
    proxy_pass http://localhost:8080/
}
```

### 内部调用

- **`internal`**

> `internal` 指令用于指定只允许来自本地 `Nginx` 的内部调用，来自外部的访问会直接返回 `404 not found` 状态。

```nginx
# 定义一个内部调用location
location /internal/ {
    internal;
    proxy_pass http://192.168.1.110:8091;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    # 解决https->nginx->http->tomcat重定向问题
    proxy_redirect ~^http://([^:]+)(:\d+)?(.*)$ https://$1$3;
}
# 使用rewrite 内部重定向，其中 last 或 break 均可提供内部重定向。
location / {
    rewrite .* /internal/ last;
}
# 利用 Openresty 的 ngx.exec 模块
location / {
    access_by_lua_block {
        return ngx.exec("/internal/")
    }
}
```

- **`location @name`**

> 命名location中不能再嵌套其它的命名location。

```nginx
# 匹配静态文件
location ~ .*\.(htm|html|js|css|jpg|png|gif|eot|svg|ttf|woff|woff2)$ {
    # 如果文件不存在
    #if (!-f $request_filename) {
        #content_by_lua_block {
                #ngx.exec("@pass");
        #}
    #}
    root /www/wwwroot/api;
    # 按顺序检查文件是否存在，返回第一个找到的文件。结尾的斜线表示为文件夹 -$uri/。
    # 如果所有的文件都找不到，会进行一个内部重定向到最后一个参数
    try_files $uri $uri/ @pass;
}
# 通用匹配
location / {
    # 或者使用`ngx.exec`主要实现的是内部的重定向
    # `ngx.redirect`是外部重定向
    content_by_lua_block {
        ngx.exec("@pass");
    }
}
location @pass {
    proxy_pass http://192.168.1.110:8091;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    # 解决https->nginx->http->tomcat重定向问题
    proxy_redirect ~^http://([^:]+)(:\d+)?(.*)$  https://$1$3;
}
```



## rewrite语法

> [参考](https://blog.csdn.net/weixin_40792878/article/details/83316519)
>
> 该指令通过正则表达式的使用来改变URI.可以同时存在一个或者多个指令，按照顺序一次对URL进行匹配和处理。
>
> 该指令可以在`server`块或者`location`块中配置

> 语法：`rewrite regex replacement [flag];`

>> `rewrite`是实现URL重定向的重要指令。
>>
>> `regex`用来匹配URI的正则表达式；
>>
>> `replacement`匹配成功后用来替换URI中被截取内容的字符串，默认情况如果该字符串包含“http://”、"https://"开头，
>> 则不会继续向下对URI进行其他处理。直接返回重写的URI给客户端
>>
>> `flag`用来设置rewrite对URI的处理行为,包含如下数据：


| 标记符号      | 说明                                                                                      |
|-----------|-----------------------------------------------------------------------------------------|
| last      | 终止在本location块中处理接收到的URI，并将此处重写的URI作为新的URI使用其他location进行处理。（只是终止当前location的处理）           |
| break     | 将此处重写的URI作为一个新的URI在当前location中继续执行，并不会将新的URI转向其他location。                               |
| redirect  | 将重写后的URI返回个客户端，状态码是302，表明临时重定向，主要用在replacement字符串不以“http://”，“ https://”或“ $scheme” 开头； |
| permanent | 将重写的URI返回客户端，状态码为301,指明是永久重定向；                                                          |


## 判断表达式

| 表达式        	| 说明                       	|
|---------------	|----------------------------	|
| `-d` 和 `!-d` 	| 用来判断是否存在目录       	|
| `-e` 和 `!-e` 	| 用来判断是否存在文件或目录 	|
| `-f` 和 `!-f` 	| 用来判断是否存在文件       	|
| `-x` 和 `!-x` 	| 用来判断文件是否可执行     	|


## Redirect语法

```nginx
server {
    listen 80;
    server_name start.igrow.cn;
    index index.html index.php;
    root html;
    if ($http_host !~ “^star\.igrow\.cn$&quot {
        rewrite ^(.*) http://star.igrow.cn$1 redirect;
    }
}
```

## 防盗链

```
location ~* \.(gif|jpg|swf)$ {
    valid_referers none blocked start.igrow.cn sta.igrow.cn;
    if ($invalid_referer) {
        rewrite ^/ http://$host/logo.png;
    }
}
```

## 以后缀设置过期时间

```nginx
location ~* \.(js|css|jpg|jpeg|gif|png|swf)$ {
    if (-f $request_filename) {
        expires 1h;
        break;
    }
}
```

## 禁止访问某个目录

```nginx
location ~* \.(txt|doc)${
    root /data/www/wwwroot/linuxtone/test;
    deny all;
}
```

## 全局变量

- **常见变量**


| 变量                           	| 作用                                                                                                                                               	|
|--------------------------------	|----------------------------------------------------------------------------------------------------------------------------------------------------	|
| `$arg_名称`                    	| URL 中某个具体参数的值                                                                                                                             	|
| `$args`                        	| 这个变量等于请求行中(GET请求)的参数，同$query_string                                                                                               	|
| `$body_bytes_sent`             	| 传输给客户端的字节数，响应头不计算在内；这个变量和Apache的mod_log_config模块中的"%B"参数保持兼容                                                   	|
| `$bytes_sent`                  	| 传输给客户端的字节数                                                                                                                               	|
| `$content_length`              	| HTTP 请求中标识包体长度的Content-Length头部的值，头部没有这个则为空                                                                                	|
| `$content_type`                	| 标识请求包体类型的Content-Type 头部的值                                                                                                            	|
| `$cookie_名称`                 	| 客户端请求Header头中的cookie变量，前缀"$cookie_"加上cookie名称的变量，该变量的值即为cookie名称的值                                                 	|
| `$document_root`               	| 当前请求在root指令中指定的值。                                                                                                                     	|
| `$document_uri`                	| 与uri完全相同                                                                                                                                      	|
| `$host`                        	| 请求主机头字段，否则为服务器名称。                                                                                                                 	|
| `$http_cookie`                 	| 客户端cookie信息                                                                                                                                   	|
| `$http_host`                   	| 请求地址，即浏览器中你输入的地址（IP或域名）                                                                                                       	|
| `$http_referer`                	| url跳转来源,用来记录从那个页面链接访问过来的                                                                                                       	|
| `$http_user_agent`             	| 客户端agent信息                                                                                                                                    	|
| `$http_x_forwarded_for`        	| 当前端有代理服务器时，设置web节点记录客户端地址的配置，此参数生效的前提是代理服务器也要进行相关的x_forwarded_for设置                               	|
| `$http_名称`                   	| 匹配任意请求头字段；变量名中的后半部分名称可以替换成任意请求头字段，如在配置文件中需要获取http请求头："Accept-Language"，$http_accept_language即可 	|
| `$https`                       	| 如果开启了SSL安全模式，值为"on"，否则为空字符串。                                                                                                  	|
| `$is_args`                     	| 如果已经设置$args，则该变量的值为"？"，否则为""。                                                                                                  	|
| `$limit_rate`                  	| 这个变量可以限制连接速率。                                                                                                                         	|
| `$pipe`                        	| 如果请求来自管道通信，值为"p"，否则为"."                                                                                                           	|
| `$query_string`                	| 与args变量完全相同                                                                                                                                 	|
| `$realpath_root`               	| 当前请求的文档根目录或别名的真实路径，会将所有符号连接转换为真实路径                                                                               	|
| `$remote_user`                 	| 有HTTP Basic Authentication 协议传入的用户名，已经经过Auth Basic Module验证的用户名。                                                              	|
| `$request_body_file`           	| 客户端请求主体信息的临时文件名。                                                                                                                   	|
| `$request_body`                	| 客户端的请求主体：此变量可在location中使用，将请求主体通过proxy_pass，fastcgi_pass，uwsgi_pass和scgi_pass传递给下一级的代理服务器                  	|
| `$request_filename`            	| 当前请求的文件路径，由root或alias指令与URI请求生成。                                                                                               	|
| `$request_length`              	| 所有请求内容的大小，包括请求行，头部，包体等                                                                                                       	|
| `$request_method`              	| 客户端请求的动作，通常为GET或POST。                                                                                                                	|
| `$request_uri`                 	| 包含请求参数的原始URI，不包含主机名，如："/?dir=DeveloperTool"。                                                                                   	|
| `$request`                     	| 原始的url请求，含有方法和协议版本                                                                                                                  	|
| `$scheme`                      	| HTTP协议 HTTP 或者 HTTPS                                                                                                                           	|
| `$sent_http_名称`              	| 可以设置任意http响应头字段；变量名中的后半部分名称可以替换成任意响应头字段，如需要设置响应头Content-length，$sent_http_content_length即可          	|
| `$status`                      	| HTTP响应代码                                                                                                                                       	|
| `$uri`                         	| 请求的URI，不包含主机名，不包含?后的参数                                                                                                           	|




> `$request_body_file` 将客户端请求主体保存在临时文件中。文件处理结束后，此文件需删除。如果需要执意开启此功能，
> 需要设置`client_body_in_file_only`。如果将次文件传递给后端的代理服务器，需要禁用`request body`，
> 即设置`proxy_pass_request_body off`，`fastcgi_pass_request_body off`，
> `uwsgi_pass_request_body off`，`scgi_pass_request_body off`



- **TCP相关变量**

| 变量                   	| 作用                                                                               	|
|------------------------	|------------------------------------------------------------------------------------	|
| `$binary_remote_addr`  	| 客户端地质的整型格式，对于IPv4是4字节                                              	|
| `$connection_requests` 	| 当前连接上执行过的请求数，对keepalive 有意义                                       	|
| `$connection`          	| 递增的连接序号                                                                     	|
| `$proxy_protocol_addr` 	| 若使用了proxy_protocol 协议则返回协议中的地址                                      	|
| `$proxy_protocol_port` 	| 若使用了proxy_protocol 协议则返回协议中的端口                                      	|
| `$remote_addr`         	| 客户端地址                                                                         	|
| `$remote_port`         	| 客户端端口                                                                         	|
| `$server_addr`         	| 服务器端地址(本端地址)，在完成一次系统调用后可以确定这个值。                       	|
| `$server_port`         	| 请求到达服务器的端口号。                                                           	|
| `$server_protocol`     	| 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。                                         	|
| `$TCP_INFO`            	| tcp内核层参数（$tcpinfo_rtt,$tcpinfo_rttvar,$tcpinfo_snd_cwnd,$tcpinfo_rcv_space） 	|


- **处理请求过程中产生的变量**

| 变量                  	| 作用                               	|
|-----------------------	|------------------------------------	|
| `$request_completion` 	| 若请求处理完则返回OK，否则为空     	|
| `$request_id`         	| 以16禁止输出的请求标识id，随即生成 	|
| `$request_time`       	| 请求处理到现在的耗时               	|
| `$server_name`        	| 匹配上的请求server_name            	|


- **系统变量**

| 变量          	| 作用                      	|
|---------------	|---------------------------	|
| `$hostname`   	| 与系统上输出hostname 一致 	|
| `$pid`        	| 所属worker进程的id        	|
| `$time_local` 	| 以本地时间的标准输出      	|
| `$time_iso8601`   | 服务器时间的ISO 8610格式    |
| `$msec`           | 当前的Unix时间戳     	|
| `$nginx_version`  | nginx版本              |






## 判断`user_agent`

```nginx
# 设置变量
set $mobile_user_agent "(MIDP)|(WAP)|(UP.Browser)|(Smartphone)
|(Obigo)|(Mobile)|(AU.Browser)|(wxd.Mms)|(WxdB.Browser)|(CLDC)
|(UP.Link)|(KM.Browser)|(UCWEB)|(SEMC-Browser)|(Mini)|(Symbian)
|(Palm)|(Nokia)|(Panasonic)|(MOT-)|(SonyEricsson)|(NEC-)|(Alcatel)
|(Ericsson)|(BENQ)|(BenQ)|(Amoisonic)|(Amoi-)|(Capitel)|(PHILIPS)
|(SAMSUNG)|(Lenovo)|(Mitsu)|(Motorola)|(SHARP)|(WAPPER)|(LG-)
|(LG/)|(EG900)|(CECT)|(Compal)|(kejian)|(Bird)|(BIRD)|(G900/V1.0)
|(Arima)|(CTL)|(TDG)|(Daxian)|(DAXIAN)|(DBTEL)|(Eastcom)|(EASTCOM)
|(PANTECH)|(Dopod)|(Haier)|(HAIER)|(KONKA)|(KEJIAN)|(LENOVO)
|(Soutec)|(SOUTEC)|(SAGEM)|(SEC-)|(SED-)|(EMOL-)|(INNO55)
|(ZTE)|(iPhone)|(Android)|(Windows CE)|(Wget)|(Java)|(curl)|(Opera)";

# 判断是否为移动端访问
if ( $http_user_agent ~ "$mobile_user_agent" ) {
    # 重写URI作为一个新的URI在当前location中继续执行。
    # 目的是在if块中proxy_pass不能带URI
    rewrite ^ /URI参数$1 break;
    proxy_pass https://127.0.0.1;
    #proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
}
```




## `proxy_pass`指令

> nginx无法在proxy_pass指令中处理所需的URI部分，因为位于指定的位置（因此是错误消息）。
> 这是因为nginx是以模块化的方式构建的，每个配置块都是由各个模块在各个阶段读取的。
> 所以请记住，proxy_pass在以下情况下，指令中不能有URI ：
>> 正则表达式位置
>>
>> 命名的地点
>>
>> if 块

> 解决方案可见[判断`user_agent`](#判断user-agent)



## 主配置

```nginx

user www www;
worker_processes auto;
error_log /logs/nginx_error.log crit;
pid /logs/nginx.pid;
worker_rlimit_nofile 51200;
events {
    use epoll;
    worker_connections 51200;
    multi_accept on;
}
http {
    # 扩展名与文件类型映射表
    include mime.types;
    #include luawaf.conf;
    include proxy.conf;
    include /vhost/*.conf;
    # 默认类型
    default_type application/octet-stream;
    server_names_hash_bucket_size 512;
    # 设置请求缓冲
    client_header_buffer_size 32k;
    large_client_header_buffers 4 32k;
    client_max_body_size 500m;
    # 开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，
    # 如果用来进行下载等应用磁盘 IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，
    # 降低系统的负载。注意：如果图片显示不正常把这个改成off。
    sendfile on;
    tcp_nopush on;
    # 设置连接超时时间，单位是秒
    keepalive_timeout 60;
    tcp_nodelay on;
    fastcgi_connect_timeout 300;
    fastcgi_send_timeout 300;
    fastcgi_read_timeout 300;
    fastcgi_buffer_size 64k;
    fastcgi_buffers 4 64k;
    fastcgi_busy_buffers_size 128k;
    fastcgi_temp_file_write_size 256k;
    fastcgi_intercept_errors on;
    # 开启gzip压缩
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 16k;
    gzip_http_version 1.1;
    gzip_comp_level 2;
    gzip_types text/plain application/javascript application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    gzip_proxied expired no-cache no-store private auth;
    gzip_disable "MSIE [1-6]\.";
    limit_conn_zone $binary_remote_addr zone=perip:10m;
    limit_conn_zone $server_name zone=perserver:10m;
    server_tokens off;
    access_log off;
}
```


## 动静分离配置


```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.woetu.com woetu.com;
    index index.html index.htm default.htm default.html;
    root html;
    # SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    # HTTP_TO_HTTPS_START
    if ($server_port !~ 443) {
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    # HTTP_TO_HTTPS_END
    ssl_certificate /etc/letsencrypt/live/www/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/www/privkey.pem;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    error_page 497 https://$host$request_uri;
    # SSL-END
    # ERROR-PAGE-START  错误页配置，可以注释、删除或修改
    error_page 404 /404.html;
    error_page 502 /502.html;
    # ERROR-PAGE-END
    # PROXY-START/
    # 配置首页，这里必须要有一个=号
    location =/ {
        index index.html index.htm;
    }
    # 拦截静态文件后缀
    location ~ .*\.(htm|html|js|css|jpg|png|gif|eot|svg|ttf|woff|woff2)$ {
        # 配置静态资源地址
        root /home/html/index;
    }
    # 拦截静态文件后缀
    #location ~ \.(htm|html|js|css|jpg|png|gif|eot|svg|ttf|woff|woff2)$ {
    # 配置静态资源地址
    #        root /home/html/index;
    #}
    # 动态请求转发
    location ~.*$ {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header REMOTE-HOST $remote_addr;
        # 解决https->nginx->http->tomcat重定向问题
        proxy_redirect ~^http://([^:]+)(:\d+)?(.*)$ https://$1$3;
    }
    # PROXY-END/
    # 禁止访问的文件或目录
    location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md) {
        return 404;
    }
    # 一键申请SSL证书验证目录相关设置
    location ~ \.well-known {
        allow all;
    }
    access_log /logs/wwwlog;
    error_log /logs/wwwlog;
}
```