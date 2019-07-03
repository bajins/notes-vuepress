# 动静分离配置


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