#!/bin/bash

echo "****************************************************************************"
startDate=$(date +"%Y-%m-%d %H:%M:%S")
echo "★[$startDate] 开始执行："
echo "----------------------------------------------------------------------------"

function finish() {
    echo "----------------------------------------------------------------------------"
    endDate=$(date +"%Y-%m-%d %H:%M:%S")
    echo "★[$endDate] 执行结束！"
    echo "****************************************************************************"
    exit
}

# ============ 以下配置信息请自行修改 ===================

# MySQL备份用户
mysql_user="USER"
# MySQL备份用户的密码
mysql_password="PASSWORD"
# 主机地址
mysql_host="localhost"
# 端口
mysql_port="3306"
# MySQL编码
mysql_charset="utf8"
# 要备份的数据库名称，多个用空格分开隔开 如("db1" "db2" "db3")
backup_db_arr=("db1" "db2")
# 备份数据存放位置，末尾请不要带"/",此项可以保持默认，程序会自动创建文件夹
backup_location=/home/mysqlBackup
# 是否开启过期备份删除 ON为开启 OFF为关闭
expire_backup_delete="ON"
# 过期时间天数 默认为三天，此项只有在expire_backup_delete开启时有效
expire_days=3

# ============= 本行开始不需要修改 ===================

# 定义备份详细时间
backup_time=$(date +%Y%m%d%H%M)
# 3天之前的日期
#backup_3ago=$(date -d '3 days ago' +%Y-%m-%d)

# 定义备份目录中的年月日时间
#backup_Ymd=date +%Y-%m-%d
# 备份文件夹全路径
#backup_dir=$backup_location/$backup_Ymd
backup_dir=$backup_location

# 判断MYSQL是否启动,mysql没有启动则备份退出
mysql_ps=$(ps -ef | grep mysql | wc -l)
mysql_listen=$(netstat -an | grep LISTEN | grep $mysql_port | wc -l)
if [ [$mysql_ps == 0] -o [$mysql_listen == 0] ]; then
    echo "错误：MySQL没有运行！备份停止！"
    finish
fi

# 连接到mysql数据库，无法连接则备份退出
# 可以用shell脚本操作mysql数据库，
# 使用mysql的-e参数可以执行各种sql的(创建，删除，增，删，改、查)等各种操作 。
databases=`mysql -h$mysql_host -P$mysql_port -u$mysql_user \
-p$mysql_password -e "show databases;" 2>/dev/null`

flag=$(echo $?)
if [ $flag != "0" ]; then
    echo "错误：无法连接mysql服务器！备份停止！"
    finish
fi
echo "MySQL连接成功! 请等待......"
# 如果没有定义备份的数据库，则退出备份
if [ -z "$backup_db_arr"]; then
    echo "错误：没有定义备份的数据库"
    finish
fi

#dbnames=$(cut -d ',' -f1-5 $backup_database)
#echo "arr is (${backup_db_arr[@]})"
for dbname in ${backup_db_arr[@]}; do
    echo "数据库 $dbname 备份开始..."
    
    # 过滤查询出的数据库中是否有当前数据库
    result=`echo $databases | grep -o $dbname`
    # 如果定义备份的数据库不存在，则备份停止
    if [ -z "$result"]; then
        echo "错误：数据库中没有查到此数据库$dbname！"
        finish
    fi

    # 创建备份文件夹
    $(mkdir -p $backup_dir)
    # 开始备份
    $(
        mysqldump -h$mysql_host -P$mysql_port -u$mysql_user \
        -p$mysql_password $dbname --default-character-set=$mysql_charset \
        | gzip >$backup_dir/$dbname-$backup_time.sql.gz
    )

    # 获取执行结果
    flag=$(echo $?)
    if [ $flag == "0" ]; then
        echo "数据库 $dbname 成功备份到 $backup_dir/$dbname-$backup_time.sql.gz"
    else
        echo "数据库 $dbname 备份失败!"
    fi

done

# 如果开启了删除过期备份，则进行删除操作
if [ "$expire_backup_delete" == "ON" -a "$backup_dir" != "" ]; then
    echo "查找要删除的文件："
    # 查找要删除的文件
    $(find $backup_dir/ -type f -mtime +$expire_days -print)
    # 开始查找并删除
    $(find $backup_dir/ -type f -mtime +$expire_days -print | xargs rm -f)
    echo "删除备份文件成功!"
fi

finish