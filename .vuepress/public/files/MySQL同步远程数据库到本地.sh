#!/bin/bash

echo "****************************************************************************"
startDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$startDate] 开始执行："
echo "----------------------------------------------------------------------------"

# 远程数据库
SERVER_HOST="ip"
SERVER_PORT="端口"
SERVER_USER="用户名"
SERVER_PASSWORD="密码"
SERVER_DB="kcyw"

# 本地数据库
LOCAL_HOST="localhost"
LOCAL_PORT="3306"
LOCAL_USER="用户名"
LOCAL_PASSWORD="密码"

# 如果本地数据库不存在则创建
create_db_sql="create database IF NOT EXISTS ${SERVER_DB}"
mysql -h${LOCAL_HOST} -P${LOCAL_PORT} -u${LOCAL_USER} -p${LOCAL_PASSWORD} -e "${create_db_sql}"

#从远程数据库备份到本地数据库
mysqldump -R -E -h${SERVER_HOST} -P${SERVER_PORT} -u${SERVER_USER} -p${SERVER_PASSWORD} ${SERVER_DB} \
| mysql -h${LOCAL_HOST} -P${LOCAL_PORT} -u${LOCAL_USER} -p${LOCAL_PASSWORD} -C ${SERVER_DB}

echo "----------------------------------------------------------------------------"
endDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$endDate] Successful"
echo "****************************************************************************"
exit