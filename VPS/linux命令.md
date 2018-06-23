# 系统操作
## 用以下命令清理内存
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

# crontab命令常用于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令
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
30 1 */3 * * /bin/bash 文件路径 >> 输出日志文件路径 2>&1
#设置每20天清理一次（日志清理太频繁不方便以后按日志排错）
0 0 */20 * * /bin/bash /home/cleanLog.sh >> /home/cleanLog.log 2>&1
```
# 文件和文件夹操作
## 创建目录 mkdir
```shell
#在当前目录下创建名为yunkus.com的目录
mkdir yunkus.com
#在指定目录下创建名为yunkus.com的目录（使用绝对路径）,比如在 /home/var/ 下创建目录
mkdir /home/var/yunkus.com
#同时创建多个目录
mkdir test1 test2 test3
#在指定目录下创建多个目录（使用绝对路径）,比如在 /home/var/ 下创建目录
mkdir /home/var/test1 test2 test3
```
### 创建多级目录
```shell
#在当前创建目录及其子目录
mkdir -p yunkus/test
#在指定目录下创 yunkus目录及其子目录
mkdir -p /home/var/yunkus/test
```
## 创建文件 touch
```shell
# 在当前目录创建 test.txt 文件
touch test.txt
# 创建多个文件
touch test1.txt test2.txt
#修改访问时间
touch -a test.txt
#查看访问修改文件的时间
stat test.txt
# 更改为自定义格式、自定义时间戳（更改访问时间、修改时间）
touch -d '18-May-2017' test.txt
# 更改修改时间
touch -m test.txt
#修改 test1.txt 为 test2.txt 文件的时间戳。
touch -r test1.txt test2.txt
# 更改为自定义时间戳
touch -t 201703031558.28 test.txt
```
## rm 命令可以用于删除文件及文件夹，可以同时一个或者多个文件/文件夹，而对于链接文件，只删除链接，不影响原文件。
```shell
# 删除文件
rm test.txt
# 删除目录（不带 -r 可能会无法删除目录），通常会提示
# rm: cannot remove ‘test’: Is a directory
rm -r test
# 如果是同时删除目录和文件时（文件可以正常删除，但目录无法删除，仍然提示rm: cannot remove ‘test’: Is a directory）
rm test test.txt
#删除当前目录下的所有文件,这个命令行得谨慎使用，有可能一个不留神，把一些不该删除的东西删除了，所以后面跟的路径得注意下
rm -rf *
```
## mv命令对文件的更改可以有重命名，移动等操作，下面是几个简单的例子。
```shell
# 将目录 test1 改为 test2
mv test1 test2
# 将/test1目录移动到 /home/ 下，并重命名为test2
mv /test1 /home/test2
# 修改文件/目录名（两种方法 touch 或者 rename）
touch test1 test2
rename test1 test2 test1
```
## 文件查找的命令主要有 find 和 grep。find 用于查找文件，grep 用于查找文件内容的行
```shell
#查看某个文件，注意权限问题
find -name test
#查看录前目录下文件名中含有字符串 yun 的文件，*为通配符，可以按需要使用
find -name '*yun*'
#在当前目录下查看所有目录并排序
find -type d | sort
# 在指定文件中（一个或多个）查找并出含字符串为 test 的行
grep 'test' text1.txt text2.txt
#在以t开头的文件中查找并出含字符串为 test 的行
grep 'test' t*
```
## 文件和文件夹权限操作
### 文件权限查看
```shell
ls -l 文件名
```
### 一次性更改权限就使用-R,文件修改为所有用户可读可写可执行，也就是对应编号为777
```shell
chmod -R 777 文件名
```
### 使用命令chown改变目录或文件的所有权,更改所有者和所属组chown(change owner缩写）
```shell
chown:用户名 文件名
```












简化操作

cd ~     进行当前用户的家目录

cd 

cd - 进入上次目录

cd .. 进入上一级目录

cd . 进入当前目录
