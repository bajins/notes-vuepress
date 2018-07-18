#!/bin/bash
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
echo "****************************************************************************"
startDate=`date +"%Y-%m-%d %H:%M:%S"`
echo "★[$startDate] 开始执行："
echo "----------------------------------------------------------------------------"

#服务器
SERVER_HOST="ip"
SERVER_PORT="端口"
SERVER_USER="用户名"
SERVER_PASSWORD="密码"
SERVER_DB="kcyw"

#本地
LOCAL_HOST="localhost"
LOCAL_PORT="3306"
LOCAL_USER="用户名"
LOCAL_PASSWORD="密码"


#在本地创建对应数据库
#create_db_sql="create database IF NOT EXISTS ${SERVER_DB}"
#mysql -h${LOCAL_HOST}  -P${LOCAL_PORT}  -u${LOCAL_USER} -p${LOCAL_PASSWORD} -e "${create_db_sql}"

#从远程数据库备份到本地数据库
mysqldump -R -E -h${SERVER_HOST} -P${SERVER_PORT} -u${SERVER_USER} -p${SERVER_PASSWORD} ${SERVER_DB} | mysql -h${LOCAL_HOST} -P${LOCAL_PORT} -u${LOCAL_USER} -p${LOCAL_PASSWORD} -C ${SERVER_DB}
echo "----------------------------------------------------------------------------"
endDate=`date +"%Y-%m-%d %H:%M:%S"`
echo "★[$endDate] Successful"
echo "****************************************************************************"
