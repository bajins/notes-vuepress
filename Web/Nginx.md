# Nginx

[[toc]]


## Flag

+ [https://github.com/nginx](https://github.com/nginx)
    + [https://nginx.org/en/download.html](http://nginx.org/en/download.html)
    + [https://nginx.org/en/docs](http://nginx.org/en/docs)
+ [https://github.com/nginxinc](https://github.com/nginxinc)
+ [https://github.com/h5bp/server-configs-nginx](https://github.com/h5bp/server-configs-nginx)
+ [https://github.com/digitalocean/nginxconfig.io](https://github.com/digitalocean/nginxconfig.io)
    + [https://www.digitalocean.com/community/tools/nginx](https://www.digitalocean.com/community/tools/nginx)
+ [https://github.com/alibaba/tengine](https://github.com/alibaba/tengine)


* [https://github.com/hfpp2012/nginx-tutorial](https://github.com/hfpp2012/nginx-tutorial)
* Nginx 入门指南 [https://github.com/xuexb/learn-nginx](https://github.com/xuexb/learn-nginx)
* [标签: Nginx | 原少子杨](https://iziyang.github.io/tags/nginx)
* [Nginx HTTP核心模块指令和内置变量中文说明](https://my.oschina.net/jsan/blog/125861)
* [nginx 变量使用](https://blog.csdn.net/u014296316/article/details/80973530)
* [Nginx 从入门到实践，万字详解](https://juejin.im/post/5ea931866fb9a043815146fb)
* [Nginx从入门到实践](https://segmentfault.com/blog/siguoya-nginx)
* [Nginx流控](https://www.cnblogs.com/zjfjava/p/10947264.html)
* [Nginx 高性能优化配置实战总结](https://segmentfault.com/a/1190000037788252)
* [nginx 优化的六点方法](https://zhuanlan.zhihu.com/p/149946545)
* [Nginx-性能优化](https://juejin.cn/post/6844904122068680711)
* [博客使用Cloudflare和Nginx的相关配置](https://jayshao.com/cloudflare-nginx-ssl)
* [Nginx——Nginx负载均衡](https://blog.csdn.net/weixin_44623055/article/details/124715177)
* [Nginx--流量限制（最有用的功能之一）](https://blog.csdn.net/liji133122/article/details/126667277)


+ 开发工具包 [https://github.com/vision5/ngx_devel_kit](https://github.com/vision5/ngx_devel_kit)
+ [https://github.com/topics/nginx-configuration](https://github.com/topics/nginx-configuration)
+ 配置生成 [https://github.com/0xB4LINT/nginxconfig.io](https://github.com/0xB4LINT/nginxconfig.io)
+ 配置格式化 [https://github.com/vasilevich/nginxbeautifier](https://github.com/vasilevich/nginxbeautifier)
+ [https://github.com/slomkowski/nginx-config-formatter](https://github.com/1connect/nginx-config-formatter)
+ [https://github.com/nginx-proxy/nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)
+ [https://github.com/evertramos/nginx-proxy-automation](https://github.com/evertramos/nginx-proxy-automation)
+ [https://github.com/onlyGuo/nginx-gui](https://github.com/onlyGuo/nginx-gui)
+ 文件服务器 [https://github.com/Naereen/Nginx-Fancyindex-Theme](https://github.com/Naereen/Nginx-Fancyindex-Theme)
+ [https://github.com/aperezdc/ngx-fancyindex](https://github.com/aperezdc/ngx-fancyindex)
+ 监控请求 [https://github.com/lebinh/ngxtop](https://github.com/lebinh/ngxtop)
+ IP漂移 [https://github.com/acassen/keepalived](https://github.com/acassen/keepalived)
    + [https://github.com/garenchan/keepalived-doc](https://github.com/garenchan/keepalived-doc)
    + [高可用实践——Keepalived踩坑记录](https://zhuanlan.zhihu.com/p/148136167)
    + [Keepalived Nginx双网络(内外网)故障非同步漂移双主模式](https://b.sundayle.com/keepalived-nginx-dual-network)
    + [通过keepalived来实现高可用服务](https://juejin.cn/post/6971589043352305678)
    + [虚拟IP技术 ip地址漂移技术](https://www.cnblogs.com/myseries/p/11409895.html)
+ 高可用集群 [https://github.com/ClusterLabs](https://github.com/ClusterLabs)
    + [https://github.com/corosync](https://github.com/corosync)
+ Heartbeat [http://www.linux-ha.org](http://www.linux-ha.org)
+ LVS [http://www.linuxvirtualserver.org](http://www.linuxvirtualserver.org)
    + [Linux Virtual Server](https://www.zhihu.com/topic/19607051/newest)
    + [LVS nat模式和DR模式简介](https://blog.51cto.com/u_11566825/2130705)
    + [VIP和RIP不同网段的LVS和keepalived高可用](https://blog.51cto.com/bbotte/1584925)




```bash
# 启动
nignx -c /usr/local/nginx/conf/nginx.conf
nginx -p `pwd`/.. -c conf/nginx.conf
# 快速关闭，可能不保存相关信息，并迅速终止web服务
nginx -s stop
kill -s quit PID
# 平稳关闭，保存相关信息，有安排的结束web服务
nginx -s quit
# 重新打开日志文件
nginx -s reopen
# 重载配置
nginx -s reload
# 验证配置
nginx -t
```




**其他同类程序**

* [https://github.com/apache/httpd](https://github.com/apache/httpd)
* [https://github.com/lighttpd](https://github.com/lighttpd)
* [https://github.com/caddyserver/caddy](https://github.com/caddyserver/caddy)
    * [Caddy2 简明教程 - bleem](https://mritd.com/2021/01/07/lets-start-using-caddy2)
* [https://github.com/traefik/traefik](https://github.com/traefik/traefik)
* [https://github.com/haproxy/haproxy](https://github.com/haproxy/haproxy)
    * HAProxy入门 [https://jaminzhang.github.io/lb/HAProxy-Get-Started](https://jaminzhang.github.io/lb/HAProxy-Get-Started)
    1. [Nginx和HAProxy对比](https://www.zhihu.com/question/34489042/answers/updated)
    2. [HAProxy Nginx LVS 对比](http://www.lgoon.com/detail/22)
    3. [负载均衡器对比(LVS、Nginx、Haproxy)](https://vimll.com/?p=886)
    4. [各大API网关性能比较](https://segmentfault.com/a/1190000018838988)
* [https://github.com/envoyproxy/envoy](https://github.com/envoyproxy/envoy)
    * [https://github.com/projectcontour/contour](https://github.com/projectcontour/contour)
    * [https://github.com/datawire/ambassador](https://github.com/datawire/ambassador)
    * [https://github.com/projectcontour/gimbal](https://github.com/projectcontour/gimbal)
* [https://github.com/zalando/skipper](https://github.com/zalando/skipper)




## 扩展模块插件

+ [https://www.nginx.com/resources/wiki/modules](https://www.nginx.com/resources/wiki/modules)
+ [https://www.nginx.com/nginx-wiki/build/dirhtml/modules](https://www.nginx.com/nginx-wiki/build/dirhtml/modules)
+ [https://github.com/search?q=nginx-module](https://github.com/search?q=nginx-module)
+ [https://github.com/topics/nginx-module](https://github.com/topics/nginx-module)


* Lua多种扩展模块 [https://github.com/openresty](https://github.com/openresty)
    * [https://openresty.org/cn](https://openresty.org/cn)
    * [https://openresty-reference.readthedocs.io](https://openresty-reference.readthedocs.io)
    * [OpenResty 概要及原理科普](https://honeypps.com/architect/introduction-of-openresty)
    * [openresty 的动态 - SegmentFault 思否](https://segmentfault.com/t/openresty)
    * [https://www.nginx.com/resources/wiki/modules/lua](https://www.nginx.com/resources/wiki/modules/lua)
    * [https://github.com/moonbingbing/openresty-best-practices](https://github.com/moonbingbing/openresty-best-practices)
    * [https://github.com/gityf/ngx_lua_thrift](https://github.com/gityf/ngx_lua_thrift)
    * [浅谈OpenResty中的body_filter_by_lua*](https://zhuanlan.zhihu.com/p/67904411)
    * [ngx.re模块和lua正则匹配的区别](https://www.bilibili.com/read/cv5038242)
        * [https://github.com/openresty/lua-nginx-module#ngxrematch](https://github.com/openresty/lua-nginx-module#ngxrematch)
    * [Openresty+lua实现动态upstream](https://www.jianshu.com/p/5167325edb09)
    * [NGINX 结合 lua 动态修改upstream](https://blog.csdn.net/force_eagle/article/details/51966333)
* [https://github.com/iresty/nginx-lua-module-zh-wiki](https://github.com/iresty/nginx-lua-module-zh-wiki)
* [https://github.com/loveshell/ngx_lua_waf](https://github.com/loveshell/ngx_lua_waf)
* [https://github.com/ledgetech/lua-resty-http](https://github.com/ledgetech/lua-resty-http)
* [https://github.com/3scale/cors-proxy](https://github.com/3scale/cors-proxy)
* [https://github.com/starjun/openstar](https://github.com/starjun/openstar)
* [https://github.com/zhouchangxun/ngx_healthcheck_module](https://github.com/zhouchangxun/ngx_healthcheck_module)
* [https://github.com/vozlt/nginx-module-vts](https://github.com/vozlt/nginx-module-vts)
* [https://gitee.com/tianhao26/openresty_forwarding_log](https://gitee.com/tianhao26/openresty_forwarding_log)
* [https://github.com/cuber/ngx_http_google_filter_module](https://github.com/cuber/ngx_http_google_filter_module)
    * [Nginx 配置谷歌镜像站](https://plusls.github.io/linux/nginx/configure-nginx-google-mirror)
* 流媒体 [https://github.com/arut/nginx-rtmp-module](https://github.com/arut/nginx-rtmp-module)



## 编译安装

* [Nginx 核心模块与配置实践](https://juejin.cn/post/6868289389722763272)


**openssl: error while loading shared libraries: libssl.so.1.1: cannot open shared object file**

```bash
# 查找一下libssl.so.1.1的位置，然后链接到/usr/lib64/libssl.so.1.1即可。
find / -name libssl.so.1.1
ln -s /usr/local/lib64/libssl.so.1.1  /usr/lib64/libssl.so.1.1
ln -s /usr/local/lib64/libcrypto.so.1.1  /usr/lib64/libcrypto.so.1.1
openssl version
```

**libssl.so.1.1: cannot open shared object file: No such file or directory**

> Centos7 默认提供的 openssl 版本是 1.0.2，报错是因为openssl 库的安装位置不正确或未安装 1.1 以上版本的问题

```bash
#从官网下载，去掉文件名，直接访问链接获取最新的包链接
# wget https://www.openssl.org/source/openssl-1.1.1k.tar.gz
#腾讯云提供的镜像，去掉文件名，直接访问链接获取最新的包链接
wget https://mirrors.cloud.tencent.com/openssl/source/openssl-1.1.1k.tar.gz
tar -xvf openssl-1.1.1k.tar.gz
cd openssl-1.1.1k
yum -y install gcc automake autoconf libtool make
./config shared --openssldir=/usr/local/openssl --prefix=/usr/local/openssl
make clean && make && make install
```

- `openssl version` 如果看到版本号还是低版本

```bash
echo "/usr/local/lib64/" >> /etc/ld.so.conf
ldconfig
```

- 还是有问题执行以下方式

```bash
# 备份
mv /usr/bin/openssl /usr/bin/openssl.old
mv /usr/lib/openssl /usr/lib/openssl.old
# 创建软链接
ln -s /usr/local/openssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/openssl/include/openssl /usr/include/openssl
# 写配置
echo "/usr/local/openssl/lib" >> /etc/ld.so.conf
ldconfig -v
```




## location

### 语法规则

```conf
location [=|~|~*|^~] /uri/ {
        ····· 
}
```

- 修饰符含义

| 规则  	| 说明                                                                                                            	|
|-------	|------------------------------------------------------------------------------------------------------------------	|
| `!~*` 	| 不区分大小写，但不匹配的正则                                                                          	|
| `!~`  	| 区分大小写，但不匹配的正则                                                                                          	|
| `/`   	| 通用匹配，任何请求都会匹配到                                                                                          	|
| `@`   	| 定义一个内部命名的匹配（[等阶于`internal`](https://blog.sometimesnaive.org/article/72)），适用于`error_page`,`try_files` 	|
| `^~`  	| uri以某个常规字符串开头，如请求为`/static/20%/aa`，匹配规则`^~ /static/ /aa`                                      |
| `~*`  	| 不区分大小写的正则匹配                                                                                  	|
| `~`   	| 区分大小写的正则匹配                                                                                  	|
| `=`   	| 精确匹配                                                                                                       	|


- 当我们有多个`location`配置的情况下，其匹配顺序为

1. 带有`=`的精确匹配优先
2. 没有修饰符的精确匹配
3. 正则表达式按照他们在配置文件中定义的顺序
4. 带有`^~`修饰符的，开头匹配
5. 带有`~`、`~*`修饰符的，如果正则表达式与`URI`匹配
6. 没有修饰符的，如果指定字符串与`URI`开头匹配


**示例**

* [nginx的root和alias详解](https://mp.weixin.qq.com/s/eMXrIaTRpoyZdPsoF_tMCQ)

```
# 匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
# 这里是直接转发给后端应用服务器了，也可以是一个静态首页
location = / {
   #匹配http://localhost/
}
location = /login {
   #匹配http://localhost/login
}
# 第二个必选规则是处理静态文件请求，这是 nginx 作为 http 服务器的强项
# 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
location ^~ /static/ {
   #匹配http://localhost/static/a.html，http://localhost/static/c.png
}
location ~ \.(gif|jpg|png|js|css)$ {
   #匹配http://localhost/a.gif, http://localhost/b.jpg
}
location ~* \.png$ {
   #http://localhost/a.PNG
}
location !~ \.xhtml$ {
   #匹配http://localhost/a.XHTML
}
location !~* \.xhtml$ {
   #匹配http://localhost/a.jsp
}
# 通用规则，用来转发动态请求到后端应用服务器
# 非静态文件请求就默认是动态请求
location / {
   #匹配http://localhost/register，http://localhost/category/id/1111
}
```


### 内部调用

**`internal`**

> `internal` 指令用于指定只允许来自本地 `Nginx` 的内部调用，来自外部的访问会直接返回 `404 not found` 状态。

```conf
# 定义一个内部调用location
location /internal/ {
    internal;
    # https://nginx.org/en/docs/http/ngx_http_proxy_module.html
    proxy_pass http://192.168.1.110:8091;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    # 修改响应头中的"Location"和"Refresh"字段
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

**`location @name`**

> 命名location中不能再嵌套其它的命名location。

```conf
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
    # https://nginx.org/en/docs/http/ngx_http_proxy_module.html
    proxy_pass http://192.168.1.110:8091;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    # 修改响应头中的"Location"和"Refresh"字段
    # 解决https->nginx->http->tomcat重定向问题
    proxy_redirect ~^http://([^:]+)(:\d+)?(.*)$  https://$1$3;
}
```


### 以后缀设置过期时间

```conf
location ~* \.(js|css|jpg|jpeg|gif|png|swf)$ {
    if (-f $request_filename) {
        expires 1h;
        break;
    }
}
```

### 禁止访问某个目录

```conf
location ~* \.(txt|doc)${
    root /data/www/wwwroot/linuxtone/test;
    deny all;
}
```



## rewrite语法

* [https://blog.csdn.net/weixin_40792878/article/details/83316519](https://blog.csdn.net/weixin_40792878/article/details/83316519)

> 该指令通过正则表达式的使用来改变URI.可以同时存在一个或者多个指令，按照顺序一次对URL进行匹配和处理。

> 该指令可以在`server`块或者`location`块中配置

- 语法：`rewrite regex replacement [flag];`
    - `rewrite`是实现URL重定向的重要指令。
    - `regex`用来匹配URI的正则表达式；
    -  `replacement`匹配成功后用来替换URI中被截取内容的字符串，默认情况如果该字符串包含“http://”、"https://"开头，则不会继续向下对URI进行其他处理。直接返回重写的URI给客户端
    - `flag`用来设置rewrite对URI的处理行为,包含如下数据：

| 标记符号  	| 说明                                                                                                                           	|
|-----------	|--------------------------------------------------------------------------------------------------------------------------------	|
| last      	| 终止在本location块中处理接收到的URI，并将此处重写的URI作为新的URI使用其他location进行处理。（只是终止当前location的处理）      	|
| break     	| 将此处重写的URI作为一个新的URI在当前location中继续执行，并不会将新的URI转向其他location。                                      	|
| redirect  	| 将重写后的URI返回个客户端，状态码是302，表明临时重定向，主要用在replacement字符串不以“http://”，“ https://”或“ $scheme” 开头； 	|
| permanent 	| 将重写的URI返回客户端，状态码为301,指明是永久重定向；                                                                          	|


**Redirect**

```conf
rewrite ^(.*) http://example.com$1 redirect;
```

**防盗链**

```
location ~* \.(gif|jpg|swf)$ {
    valid_referers none blocked start.igrow.cn sta.igrow.cn;
    if ($invalid_referer) {
        rewrite ^/ http://$host/logo.png;
    }
}
```


## 判断表达式

| 表达式        	| 说明                       	|
|---------------	|----------------------------	|
| `-d` 和 `!-d` 	| 用来判断是否存在目录       	|
| `-e` 和 `!-e` 	| 用来判断是否存在文件或目录 	|
| `-f` 和 `!-f` 	| 用来判断是否存在文件       	|
| `-x` 和 `!-x` 	| 用来判断文件是否可执行     	|




## 全局变量

**常见变量**


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



**TCP相关变量**

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


**处理请求过程中产生的变量**

| 变量                  	| 作用                               	|
|-----------------------	|------------------------------------	|
| `$request_completion` 	| 若请求处理完则返回OK，否则为空     	|
| `$request_id`         	| 以16禁止输出的请求标识id，随即生成 	|
| `$request_time`       	| 请求处理到现在的耗时               	|
| `$server_name`        	| 匹配上的请求server_name            	|


**系统变量**

| 变量          	| 作用                      	|
|---------------	|---------------------------	|
| `$hostname`   	| 与系统上输出hostname 一致 	|
| `$pid`        	| 所属worker进程的id        	|
| `$time_local` 	| 以本地时间的标准输出      	|
| `$time_iso8601`   | 服务器时间的ISO 8610格式    |
| `$msec`           | 当前的Unix时间戳     	|
| `$nginx_version`  | nginx版本              |




## 判断user_agent

```conf
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

```conf
# cloudflare 默认会在header里面加上’HTTP_CF_IPCOUNTRY’
# 禁止某些国家, user agent 的访问，配置在http（全局）
map $http_cf_ipcountry $allow {
    default yes;
    US no;
    CA no;
    UK no;
    AU no;
}
# 在server或location中配置
if ($allow = no) {
    return 403;
}
```




## proxy_pass指令

> nginx无法在`proxy_pass`指令中处理所需的URI部分，因为位于指定的位置（因此是错误消息）。
> 这是因为nginx是以模块化的方式构建的，每个配置块都是由各个模块在各个阶段读取的。

- `proxy_pass`在以下情况下，指令中不能有URI ：
    - 正则表达式位置
    - 命名的地点
    - if 块

> 解决方案可见[判断`user_agent`](#判断user-agent)

- `proxy_set_header` 设置请求头信息给上游服务器
- `add_header` 设置响应头信息给浏览器




## 日志切割

> 在`nginx.conf`中配置`log_format`（可以配置在`server`中），含义是配置了一个名为`main`的日志格式化的规则，应用在了`access_log`的日志上


**使用到`timeiso8601`内嵌变量来获取时间配置日志循环**

* [简单搞定Nginx日志分割](https://github.com/jingsam/jingsam.github.io/blob/source/source/_posts/2019-01-15-nginx-access-log.md)

```conf
# 可能出现if条件不成立的情况，推荐在http块中使用map
if ($time_iso8601 ~ "^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})") {
    set $year $1;
    set $month $2;
    set $day $3;
    set $hour $4;
    set $minutes $5;
    set $seconds $6;
}
access_log logs/$year-$month-$day-$hour$minutes$seconds-access.log main;

# Perl语法
if ($time_iso8601 ~ "^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})") {}
access_log logs/$year-$month-$day-access.log main;

# http块中不允许使用if，使用map替代
map $time_iso8601 $logdate {
    '~^(?<ymd>\d{4}-\d{2}-\d{2}-\d{6})'   $ymd;
    default                               'nodate';
}
access_log logs/access_${logdate}.log;
```


**日志归档程序logrotate**

- [https://github.com/fordmason/cronolog](https://github.com/fordmason/cronolog)
- [https://github.com/logrotate/logrotate](https://github.com/logrotate/logrotate)

```bash
vi /etc/logrotate.d/nginx
```

> `kill -USR1 cat /usr/local/nginx/logs/nginx.pid` 向nginx主进程发送USR1信号用于重新读取日志文件

```conf
/home/nginx/logs/*.log { # 目录下所有以.log结尾的文件
    daily # 按天切割
    #dateformat %Y%m%d # 切割后文件后缀，不能使用log，否则会使文件进行继续切割
    #extension .log # 切割文件后缀
    rotate 7 # 保留天数
    #create 0640 root root   # 切割后日志权限
    missingok
    dateext
    notifempty
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/nginx ]; then \  # 判断切割文件
            run-parts /etc/logrotate.d/nginx; \
        fi \
    endscript
    postrotate
        [ -e /usr/local/nginx/logs/nginx.pid ] && kill -USR1 `cat /home/nginx/logs/nginx.pid`
    endscript
    postrotate
        [ ! -f /var/nginx.pid ] || kill -USR1 `cat /home/nginx/logs/nginx.pid`
    endscript
}
```




## 主配置

* [Nginx配置文件解析](https://blog.csdn.net/DeliaPu/article/details/108647180)
* [nginx - HowOldAreYou - 博客园](https://www.cnblogs.com/wxxjianchi/p/13582252.html)

```conf

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
    # 关闭日志
    access_log off;
    # 输出日志
    #error_log /dev/null;
}
```


## 动静分离配置

**静态文件在本地**

```conf
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


**静态文件在镜像存储**

```conf
#PROXY-START/
location = / {
    #rewrite (.*) $1index.html;
    index /index.html;
}
# 拦截静态文件后缀
location ~ .*\.(htm|html|js|css|jpg|png|gif|eot|svg|ttf|woff|woff2)$|/static/ {
    # 配置静态资源地址
    #root ./vhost/html;
	root "/index";
	# 将此处重写的URI作为一个新的URI在当前location中继续执行，并不会将新的URI转向其他location
	rewrite ^(.*)$ /index/$1 break;
	
	proxy_pass https://test.cos.ap-hongkong.myqcloud.com;
    #proxy_set_header Host $host;
	proxy_set_header Host test.cos.ap-hongkong.myqcloud.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    
    add_header X-Cache $upstream_cache_status;
    
    #Set Nginx Cache
    add_header Cache-Control no-cache;
}
location / {
    proxy_pass http://127.0.0.1:8081;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header REMOTE-HOST $remote_addr;
    
    add_header X-Cache $upstream_cache_status;
    
    #Set Nginx Cache
    add_header Cache-Control no-cache;
    #expires 12h;
}

#PROXY-END/
```