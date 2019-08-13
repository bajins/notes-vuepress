#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
#+------------------------------------
#+ 放内存脚本
#+------------------------------------

startDate=`date +"%Y-%m-%d %H:%M:%S"`
log="释放内存!"
echo "★[$startDate] $log"
echo '----------------------------------------------------------------------------'

if [ -f "/etc/init.d/php-fpm-52" ];then
	/etc/init.d/php-fpm-52 reload
fi

if [ -f "/etc/init.d/php-fpm-53" ];then
	/etc/init.d/php-fpm-53 reload
fi

if [ -f "/etc/init.d/php-fpm-54" ];then
	/etc/init.d/php-fpm-54 reload
fi

if [ -f "/etc/init.d/php-fpm-55" ];then
	/etc/init.d/php-fpm-55 reload
fi

if [ -f "/etc/init.d/php-fpm-56" ];then
	/etc/init.d/php-fpm-56 reload
fi

if [ -f "/etc/init.d/php-fpm-70" ];then
	/etc/init.d/php-fpm-70 reload
fi

if [ -f "/etc/init.d/php-fpm-71" ];then
	/etc/init.d/php-fpm-71 reload
fi

if [ -f "/etc/init.d/mysqld" ];then
	/etc/init.d/mysqld reload
fi

if [ -f "/etc/init.d/nginx" ];then
	/etc/init.d/nginx reload
fi

if [ -f "/etc/init.d/httpd" ];then
	/etc/init.d/httpd graceful
fi

if [ -f "/etc/init.d/pure-ftpd" ];then
	pkill -9 pure-ftpd
	sleep 0.3
	/etc/init.d/pure-ftpd start 2>/dev/null
fi

sync
sleep 2
sync
echo 3 > /proc/sys/vm/drop_caches
endDate=`date +"%Y-%m-%d %H:%M:%S"`
echo '[$endDate] 释放网页缓存，目录项和索引（To free pagecache, dentries and inodes）成功！'

echo '----------------------------------------------------------------------------'
