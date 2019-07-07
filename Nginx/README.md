# Nginx

## 格式化项目
[nginxbeautifier](https://github.com/vasilevich/nginxbeautifier)

[nginx-config-formatter](https://github.com/1connect/nginx-config-formatter)

[nginxconfig配置生成](https://github.com/0xB4LINT/nginxconfig.io/)


## [语法](语法.md)

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