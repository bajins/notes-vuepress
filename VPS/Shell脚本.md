# Shell脚本


* [flag](#flag)
* [清理内存](#清理内存)
* [清理日志](#清理日志)
* [Linux之间传输文件](#linux之间传输文件)




## flag

> `Shell`脚本（`shell script`），是一种为`Shell`编写的脚本程序。
> `Shell`脚本文件的名称可以任意，但为了避免被误以为是普通文件，建议将`.sh`后缀加上，以表示是一个脚本文件。

* [Shell 教程](https://www.runoob.com/linux/linux-shell.html)

* [Shell命令脚本初步认识，Shell脚本入门](https://www.jianshu.com/p/3782970dec75)




## 清理内存

```bash
# 获取到的内存配置信息若为0的话，则表示开启了缓存机制
cat /proc/sys/vm/drop_caches

# drop_caches是让系统清理内存页的缓存，从而得到更多的可用内存
# 释放网页缓存(To free pagecache)
sync; echo 1 > /proc/sys/vm/drop_caches

# 释放目录项和索引(To free dentries and inodes)
sync; echo 2 > /proc/sys/vm/drop_caches

# 释放网页缓存，目录项和索引（To free pagecache, dentries and inodes）
sync; echo 3 > /proc/sys/vm/drop_caches

# 清理/var/cache/yum的headers
yum clean headers

# 清理/var/cache/yum下的软件包
yum clean packages

# 清理软件源
yum clean metadata
```




## 清理日志

```bash
# 清除定时任务记录
sed -i '1,50d' /var/log/cron
# 清除ftp记录
sed -i '1,50d' /var/log/xferlog
# 清除数据库日志
sed -i '1,50' /var/log/mariadb/mariadb.log
# 清除sshd信息
sed -i '1,50d' /var/log/secure
sed -i '1,50d' /var/log/firewalld
sed -i '1,50d' /var/log/httpd/access_log
sed -i '1,50d' /var/log/httpd/ssl_access_log
sed -i '1,50d' /var/log/httpd/ssl_error_log
sed -i '1,50d' /var/log/httpd/ssl_request_log
# 清除系统开机发生的错误
sed -i '1,50d' /var/log/messages
sed -i '1,50d' /var/log/tuned/tuned.log
sed -i '1,50d' /var/log/hawkey.log
sed -i '1,50d' /var/log/yum.log
sed -i '1,50d' /var/log/dnf.log
sed -i '1,50d' /var/log/dnf.rpm.log
sed -i '1,50d' /var/log/ntp.log
sed -i '1,50d' /var/log/audit/audit.log

# 清除历史执行命令
rm -rf ~/.bash_history

# 清除系统登录成功的记录
echo > /var/log/wtmp
# 清除系统登录失败的记录
echo > /var/log/btmp
# 清除最近登录信息
echo > /var/log/lastlog

rm -fr /var/log/*

```


## Linux之间传输文件

```bash
#!/bin/bash


# 远程IP
des_ip=192.168.1.1
# 远程端口
des_port=22
# 远程用户
des_user=root
# 远程密码
des_pass=123456
# 远程文件或文件夹路径
des_path=/www/wwwroot/file
# 本地文件或文件夹路径
local_path=/www/wwwroot/file

# 检索expect是否安装
is_expect=`whereis expect | awk '{print $2}'`
# 如果没有安装
if [ ! -n "$is_expect" ]; then
    yum -y install expect > /dev/null 2>&1
fi


expect -c "
# 设置拷贝的时间，超时时间-1为永不超时
set timeout -1

# 本地路径在前，远程在后，是从本地上传到远端
# spawn scp -P ${des_port} -p -r ${local_path} ${des_user}@${des_ip}:${des_path}
# 远程在前，本地路径在后，的是从远端下载到本地
spawn scp -P ${des_port} -p -r ${des_user}@${des_ip}:${des_path} ${local_path}

expect {
  \"*yes/no*\" {send \"yes\r\"; exp_continue}
  \"*password*\" {send \"${des_pass}\r\";}
}

"
exit

```