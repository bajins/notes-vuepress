#!/bin/bash
echo "开始清除日志文件"
sed -i '1,50d' /var/log/cron #清除定时任务记录
sed -i '1,50d' /var/log/xferlog #清除ftp记录
sed -i '1,50' /var/log/mariadb/mariadb.log #清除数据库日志
sed -i '1,50d' /var/log/secure #清除sshd信息
sed -i '1,50d' /var/log/firewalld
sed -i '1,50d' /var/log/httpd/access_log
sed -i '1,50d' /var/log/httpd/ssl_access_log
sed -i '1,50d' /var/log/httpd/ssl_error_log
sed -i '1,50d' /var/log/httpd/ssl_request_log
sed -i '1,50d' /var/log/messages #清除系统开机发生的错误
sed -i '1,50d' /var/log/tuned/tuned.log
sed -i '1,50d' /var/log/hawkey.log
sed -i '1,50d' /var/log/yum.log
sed -i '1,50d' /var/log/dnf.log
sed -i '1,50d' /var/log/dnf.rpm.log
sed -i '1,50d' /var/log/ntp.log
sed -i '1,50d' /var/log/audit/audit.log

history -c #清除历史执行命令

echo > /var/log/wtmp  #清除系统登录成功的记录
echo > /var/log/btmp #清除系统登录失败的记录
echo > /var/log/lastlog

rm -fr /var/log/boot.log-* /var/log/btmp-* /var/log/cron-* /var/log/maillog-* /var/log/messages-* /var/log/secure-* /var/log/spooler-* /var/log/xferlog-* /var/log/messages-* /var/log/multi-nic-util/*

rm -fr /var/log/httpd/access_log-* /var/log/httpd/error_log-* /var/log/httpd/ssl_access_log-* /var/log/httpd/ssl_error_log-* /var/log/httpd/ssl_request_log-*
