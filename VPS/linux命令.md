
用以下命令清理内存
```shell
#获取到的内存配置信息若为0的话，则表示开启了缓存机制
cat /proc/sys/vm/drop_caches

#drop_caches是让系统清理内存页的缓存，从而得到更多的可用内存
#释放网页缓存(To free pagecache)
sync; echo 1 > /proc/sys/vm/drop_caches

#释放目录项和索引(To free dentries and inodes)
sync; echo 2 > /proc/sys/vm/drop_caches

#释放网页缓存，目录项和索引（To free pagecache, dentries and inodes）
sync; echo 3 > /proc/sys/vm/drop_caches

#清理/var/cache/yum的headers
yum clean headers

#清理/var/cache/yum下的软件包
yum clean packages

#清理软件源
yum clean metadata
```
文件权限查看
```shell
ls -l 文件名
```
一次性更改权限就使用-R,文件修改为所有用户可读可写可执行，也就是对应编号为777
```shell
chmod -R 777 文件名
```
使用命令chown改变目录或文件的所有权,更改所有者和所属组chown(change owner缩写）
```shell
chown:用户名 文件名
```
## crontab 命令常用于Unix 和类 Unix的操作系统之中，用于设置周期性被执行的指令
### 通过Linux终端（Terminal）编辑crontab文件.
```shell
crontab -e
```
### 输入定时任务命令.
```shell
# 每分钟输出一次当前时间
 * * * * * echo `date` >> /log.log
# 每天凌晨1点30分执行清理内存脚本，并且输出到日志
30 1 * * *  /bin/bash /home/rememory.sh >> /home/rememory.log 2>&1
# 每隔3天,1点30分执行，并且输出到日志
30 1 */3 * *  文件路径 >> 输出日志文件路径 2>&1
```


简化操作

cd ~     进行当前用户的家目录

cd 

cd - 进入上次目录

cd .. 进入上一级目录

cd . 进入当前目录
