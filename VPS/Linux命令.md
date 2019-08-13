# Linux命令

# 目录
* [系统操作](#系统操作)
  * [查看邮箱](#查看邮箱)
  * [用以下命令清理内存](#用以下命令清理内存)
  * [过滤结果](#过滤结果)
* [定时任务](#定时任务)
  * [编辑crontab文件.](#编辑crontab文件)
  * [输入定时任务命令.](#输入定时任务命令)
* [文件和文件夹操作](#文件和文件夹操作)
  * [服务器之间传输文件](#服务器之间传输文件)
  * [scp](#scp)
    * [命令参数：](#命令参数)
  * [rsync](#rsync)
  * [查找大文件](#查找大文件)
  * [列出目录](#列出目录)
  * [创建目录](#创建目录)
  * [创建多级目录](#创建多级目录)
  * [创建文件](#创建文件)
  * [删除文件及文件夹](#删除文件及文件夹)
  * [移动和重命名](#移动和重命名)
  * [文件查找](#文件查找)
  * [文件和文件夹权限操作](#文件和文件夹权限操作)
  * [文件查看](#文件查看)
  * [显示当前文件夹大小](#显示当前文件夹大小)
  * [查看当前路径](#查看当前路径)
  * [修改权限](#修改权限)
  * [简化操作](#简化操作)
  * [压缩](#压缩)
    * [tar](#tar)
    * [7zip](#7zip)
* [systemctl](#systemctl)
* [防火墙](#防火墙)
  * [firewalld](#firewalld)
    * [开启端口](#开启端口)
      * [命令含义：](#命令含义)
    * [配置firewalld-cmd](#配置firewalld-cmd)
* [rpm](#rpm)
  * [查询已安装软件包的信息](#查询已安装软件包的信息)
  * [查询已安装软件包都安装到何处](#查询已安装软件包都安装到何处)
  * [查看已安装软件所依赖软件包及文件](#查看已安装软件所依赖软件包及文件)
  * [查看已安装软件的配置文件](#查看已安装软件的配置文件)
  * [查询已经安装文件所属软件包](#查询已经安装文件所属软件包)
  * [共安装了多少个软件包:](#共安装了多少个软件包)
* [解决网卡问题](#解决网卡问题)
  * [MTU](#mtu)
  * [查看MTU值](#查看mtu值)
  * [更改MTU值（临时）](#更改mtu值临时)
  * [更改MTU值（永久）](#更改mtu值永久)
  * [重启网络接口](#重启网络接口)
* [后台运行](#后台运行)
  * [nohup](#nohup)
    * [只输出错误信息到日志文件](#只输出错误信息到日志文件)
    * [不输出日志](#不输出日志)
  * [setsid](#setsid)
    * [语法](#语法)
  * [screen](#screen)
    * [安装](#安装)
    * [创建一个screen会话](#创建一个screen会话)
    * [隐藏并保留当前会话窗口](#隐藏并保留当前会话窗口)
    * [列出所有的会话列表](#列出所有的会话列表)
    * [恢复会话窗口](#恢复会话窗口)
    * [关闭会话窗口](#关闭会话窗口)




## 系统操作
### 查看邮箱
```bash
cat /var/spool/mail/root
```

### 用以下命令清理内存
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

### 过滤结果
```bash
ls -l | grep test | awk '{print $5}' | sed -n '2p'
```
> `grep` 文本过滤命令，包含test的文件
>> 由正则表达式或者字符及基本文本字符所编写的过滤条件
>>
>> `-a` 不要忽略二进制数据。
>>
>> `-d`<进行动作> 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep命令将回报信息并停止动作。
>>
>> `-E` 将范本样式为延伸的普通表示法来使用，意味着使用能使用扩展正则表达式。
>>
>> `-i` 忽略字符大小写的差别。
>>
>> `-n` 在显示符合范本样式的那一列之前，标示出该列的编号。
>>
>> `-s` 不显示错误信息。
>>
>> `-v` 反转查找。
>
> `awk` 文本处理命令，`print`后面是你要获取第几列
>
> `sed` 行编辑器，`-n`是指定第几行。
>> `p` 显示
>>
>> `d` 删除
>>
>> `a` 添加
>>
>> `c` 替换
>>
>> `w` 写入
>>
>> `i` 插入





## 定时任务
> crontab命令常用于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令

### 编辑crontab文件.

```bash
crontab -e
```
### 输入定时任务命令.
```bash
# 每分钟输出一次当前时间
* * * * * echo `date` >> /log.log
# 每天凌晨1点30分执行清理内存脚本，并且输出到日志
30 1 * * *  /bin/bash /home/rememory.sh >> /home/rememory.log 2>&1
# 每天凌晨1点30分执行删除MySQL日志文件，并且输出到日志
30 1 * * *  python /home/delete_file.py 文件带后缀的路径 保留的文件个数 >> /home/delete_file.log 2>&1
# 每隔3天,1点30分执行，并且输出到日志
30 1 */3 * * /bin/bash 文件路径 >> 输出日志文件路径 2>&1
# 设置每20天清理一次（日志清理太频繁不方便以后按日志排错）
0 0 */20 * * /bin/bash /home/cleanLog.sh >> /home/cleanLog.log 2>&1

# 设置每小时执行一次
0 */1 * * *  python3 /home/dowloadSqlFile.py -host='127.0.0.1' -port=3306 -user='root' -pwd='123456' -db='test' -table='images' -start=0 -end=2000 -mkdir='/home/c/' >> /home/dowloadSQLFile.log 2>&1
```

> 在linux中的直接执行shell脚本可以用相对路径找到文件,但是如果通过计划任务crontab执行shell脚本时，却不能通过相对路径找到文件!
>
> 可以使用pwd命令获取目录`pwd`'/文件名'






## 文件和文件夹操作

### 服务器之间传输文件
```bash
# 首先进入需要搭建web服务器的目录，然后在输入下面的命令
# 注意：不填端口号则默认使用8000端口。
# linux
python -m SimpleHTTPServer port
# windows
python -m http.server port

# 服务开启后，地址协议类型加IP/目录下的文件： 
wget host:port/file 就可以下载了
```
### scp

> 【优点】简单方便，安全可靠；支持限速参数，不占资源，不会提高多少系统负荷
>
> 【缺点】不支持排除目录 
>
> 【用法】scp就是secure copy，是用来进行远程文件拷贝的。数据传输使用 ssh，并且和ssh 使用相同的认证方式，提供相同的安全保证 。 
#### 命令参数：
> -1  强制scp命令使用协议ssh1
>
> -2  强制scp命令使用协议ssh2
>  
> -4  强制scp命令只使用IPv4寻址
>  
> -6  强制scp命令只使用IPv6寻址
>   
> -B  使用批处理模式（传输过程中不询问传输口令或短语）
>   
> -C  允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
>   
> -p 保留原文件的修改时间，访问时间和访问权限。
>   
> -q  不显示传输进度条。
>   
> -r  递归复制整个目录。
>   
> -v 详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。
>    
> -c cipher  以cipher将数据传输进行加密，这个选项将直接传递给ssh。
>    
> -F ssh_config  指定一个替代的ssh配置文件，此参数直接传递给ssh。
>   
> -i identity_file  从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。
>     
> -l limit  限定用户所能使用的带宽，以Kbit/s为单位。
>      
> -o ssh_option  如果习惯于使用ssh_config(5)中的参数传递方式，
>    
> -P port  注意是大写的P, port是指定数据传输用到的端口号
>    
> -S program  指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。

> scp [参数] <源地址（用户名@IP地址或主机名）>:<文件路径> <目的地址（用户名 @IP 地址或主机名）>:<文件路径> 

#### 举例： 
> 把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下

```bash
scp -P 22 -p /home/work/source.txt work@192.168.0.10:/home/work/
```
> 把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下

```bash
scp -P 22 -p work@192.168.0.10:/home/work/source.txt /home/work/
```
> 把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下

```bash
scp -P 22 -p work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/
# 拷贝文件夹，加-r参数
scp -P 22 -p -r /home/work/sourcedir work@192.168.0.10:/home/work/
# 使用主机名
scp -P 22 -p -r /home/work/sourcedir work@www.myhost.com:/home/work/
# 显示详情，加-v参数
scp -P 22 -p -r -v /home/work/sourcedir work@www.myhost.com:/home/work/  
```
> 将远程主机复制到本地

```bash
scp -P 22 -p root@192.168.214.187:/tmp/demo/f3.log /tmp/files/
```

#### 脚本
```bash
#!/bin/bash

# 安装expect包
yum -y install expect expect-devel
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

expect -c "
# 设置拷贝的时间，超时时间-1为永不超时
set timeout -1

# 本地文件路径在前远程在后是从本地上传到远端
# spawn scp -P ${des_port} -p -r ${local_path} ${des_user}@${des_ip}:${des_path}
# 远程在前本地文件路径在后的是从远端下载到本地
spawn scp -P ${des_port} -p -r ${des_user}@${des_ip}:${des_path} ${local_path}
# expect \"password:\"
# send \"${des_pass}\r\"
expect {
  \"*yes/no*\" {send \"yes\r\"; exp_continue}
  \"*password*\" {send \"${des_pass}\r\";}
}
expect eof
"

```


### rsync
>【优点】功能强大，操作类似scp，支持排除目录，支持限速参数；还支持本地复制。 
>  
> 【缺点】会耗系统资源，占用I/O
>  
> 【用法】rsync是类unix系统下的数据镜像备份工具，从软件的命名上就可以看出来了——remote sync。它的操作方式和scp和相似，但是比scp强大很多。使用双冒号分割主机名和文件路径时，是使用rsync服务器

```bash
# 把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
rsync /home/work/source.txt work@192.168.0.10:/home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下
rsync work@192.168.0.10:/home/work/source.txt /home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
rsync work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/

# 拷贝文件夹，加-r参数
rsync -r /home/work/sourcedir work@192.168.0.10:/home/work/

# 使用主机名
rsync -r /home/work/sourcedir work@www.myhost.com:/home/work/

# 显示详情，加-v参数
rsync -r -v /home/work/sourcedir work@www.myhost.com:/home/work/

# 排除子目录，注意：--exclude后面的路径不能为绝对路径，必须为相对路径才可以，否则匹配不上，就不会被排除掉。
rsync -r -v --exclude sourcedir/notinclude /home/work/sourcedir work@www.myhost.com:/home/work/
```

### 查找大文件
```bash
# 查找从根目录下查找大于100M的文件，并显示文件的具体大小再进行排序
find / -type f -size +100M -print0 | xargs -0 du -h | sort -nr

# 查找从根目录下查找大于1G的文件，并显示文件的具体大小再进行排序
find / -type f -size +1G -print0 | xargs -0 du -h | sort -nr

# 有时候排列的顺序并不完全是按大小一致，这个是因为du命令的参数h所致，可以使用MB来显示
find / -type f -size +100M -print0 | xargs -0 du -hm | sort -nr

# 查找从根目录下查找大于100M的文件，并显示文件的属性信息
find / -type f -size +100M -print0 | xargs -0 ls -l

# 查看当前文件夹下的文件夹占用大小并排序
du -h --max-depth=2 | sort -n

# 有时候排列的顺序并不完全是按大小一致，这个是因为du命令的参数h所致，可以使用MB来显示
du -hm --max-depth=2 | sort -n

# 找出当前文件夹下最大的12个文件夹
du -hm --max-depth=2 | sort -nr | head -12

# 查看home文件夹下的所有文件夹占用大小并排序
du -hm --max-depth=2 /home/ | sort -nr

# 查找目录
find / -name 'path' -type d

# 查找内容
find . | xargs grep -ri 'content'
# 查找内容只显示文件名称
find . | xargs grep -ril 'content'
```

### 列出目录
```bash
ls -l |grep "^d" |awk '{print $9}'
ls -F |grep "/$"
ls -d */
ls -ad */
```

### 创建目录
```bash
# 在当前目录下创建名为yunkus.com的目录
mkdir yunkus.com
# 在指定目录下创建名为yunkus.com的目录（使用绝对路径）,比如在 /home/var/ 下创建目录
mkdir /home/var/yunkus.com
# 同时创建多个目录
mkdir test1 test2 test3
# 在指定目录下创建多个目录（使用绝对路径）,比如在 /home/var/ 下创建目录
mkdir /home/var/test1 test2 test3
```
### 创建多级目录
```bash
# 在当前创建目录及其子目录
mkdir -p yunkus/test
# 在指定目录下创 yunkus目录及其子目录
mkdir -p /home/var/yunkus/test
```
### 创建文件
```bash
# 在当前目录创建 test.txt 文件
touch test.txt
# 创建多个文件
touch test1.txt test2.txt
# 修改访问时间
touch -a test.txt
# 查看访问修改文件的时间
stat test.txt
# 更改为自定义格式、自定义时间戳（更改访问时间、修改时间）
touch -d '18-May-2017' test.txt
# 更改修改时间
touch -m test.txt
# 修改 test1.txt 为 test2.txt 文件的时间戳。
touch -r test1.txt test2.txt
# 更改为自定义时间戳
touch -t 201703031558.28 test.txt

# dd命令创建一个名为test.zip大小为1000M的文件
# 文件内容为全0（因/dev/zero为0源）
dd if=/dev/zero of=test.zip bs=1M count=1000
# 同理创建1GB的文件
dd if=/dev/zero of=test.zip bs=1G count=1
```
### 删除文件及文件夹
> rm 命令可以用于删除文件及文件夹，可以同时一个或者多个文件/文件夹，而对于链接文件，只删除链接，不影响原文件。

```bash
# 删除文件
rm test.txt
# 删除目录（不带 -r 可能会无法删除目录），通常会提示
# rm: cannot remove ‘test’: Is a directory
rm -r test
# 如果是同时删除目录和文件时（文件可以正常删除，但目录无法删除，仍然提示rm: cannot remove ‘test’: Is a directory）
rm test test.txt
# 删除当前目录下的所有文件,这个命令行得谨慎使用，有可能一个不留神，把一些不该删除的东西删除了，所以后面跟的路径得注意下
rm -rf *
# 删除多个文件夹{}内的为自定义
rm -rf 2017{01,02,03,04,05,06,07,08,09,10}*
# linux按指定时间删除文件和文件夹
find 文件路径 -name "文件名" -mtime +多少天之前 -print -exec rm {} \;
# linux按指定时间删除文件 -type f 指出找系统普通文件，不包含目录文件
find 文件路径 -mtime +多少天之前 -type f -name 文件名 -print -exec rm -rf {} \;
# 也可以使用 xargs 代替 -exec
find 文件路径 -type f -mtime +多少天之前 -print | xargs rm -f
# 删除指定时间内的文件
find 文件路径 -type f -newermt '起始时间' -a -not -newermt '结束时间' -name '文件名' -print -exec rm -rf {} \;
```

> `-amin n`查找系统中最后N分钟访问的文件
>
> `-atime n`查找系统中最后n*24小时访问的文件
>
> `-cmin n`查找系统中最后N分钟被改变文件状态的文件
>
> `-ctime n`查找系统中最后n*24小时被改变文件状态的文件
>
> `-mmin n`查找系统中最后N分钟被改变文件数据的文件
>
> `-mtime n`查找系统中最后n*24小时被改变文件数据的文件
>
> xargs：读取 stdin, 把格式化的数据传递给命令(用于不支持 “|” 管道来传递参数的命令) 



### 移动和重命名
> mv命令对文件的更改可以有重命名，移动等操作，下面是几个简单的例子。
```bash
# 将目录 test1 重命名为 test2
mv test1 test2

# 将/test1目录移动到 /home/ 下，并重命名为test2
mv /test1 /home/test2

# 修改文件/目录名（两种方法 touch 或者 rename）
touch test1 test2
rename test1 test2 test1
```
### 文件查找
> 命令主要有 find 和 grep。find 用于查找文件，grep 用于查找文件内容的行
```bash
# 查看某个文件，注意权限问题
find -name test

# 查看录前目录下文件名中含有字符串 yun 的文件，*为通配符，可以按需要使用
find -name '*yun*'

# 在当前目录下查看所有目录并排序
find -type d | sort

#  在指定文件中（一个或多个）查找并出含字符串为 test 的行
grep 'test' text1.txt text2.txt

# 在以t开头的文件中查找并出含字符串为 test 的行
grep 'test' t*

#  查找指定时间内的文件
find 文件路径 -type f -newermt '起始时间' -a -not -newermt '结束时间'
```
### 文件和文件夹权限操作
### 文件查看
```bash
# 查看所有文件（包括隐藏文件）并以最大容量单位显示
ll -a -h 文件名
```
### 显示当前文件夹大小
```bash
du -sh
```
### 查看当前路径
```bash
pwd
```

### 修改权限

> 一次性更改权限就使用-R,文件修改为所有用户可读可写可执行，也就是对应编号为777

```bash
chmod -R 777 文件名
```
> 使用命令chown改变目录或文件的所有权,更改所有者和所属组chown(change owner缩写）

```bash
chown:用户名 文件名
```

### 简化操作
```bash
# 进行当前用户的主目录
cd ~
cd 
# 进入上次目录
cd -
# 进入上一级目录
cd ..
# 进入当前目录
cd .
```

### 压缩
#### tar
```bash
# 打包的时候我们要排除 tomcat/logs 目录，命令如下：
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs tomcat

# 如果要排除多个目录，增加 --exclude 即可，如下命令排除logs和libs两个目录及文件xiaoshan.txt
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs --exclude=tomcat/libs --exclude=tomcat/xiaoshan.txt tomcat
```

> 注意：
>> 在使用tar的--exclude命令排除打包时，末尾不能加“/”或者路径为绝对路径，否则还是会把排除目录以及其下的文件打包进去。

#### 7zip
```bash
# 安装7zip
yum –y install p7zip
# 解压到当前目录下,不保留原来的目录结构
7za e 文件名
# 解压到当前目录下,但保留原来的目录结构
7za x 文件名
```
*********************************************************************************************
## systemctl
> systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。
```bash
# 启动一个服务
systemctl start firewalld.service

# 关闭一个服务
systemctl stop firewalld.service

# 重启一个服务
systemctl restart firewalld.service

# 显示一个服务的状态
systemctl status firewalld.service

# 在开机时启用一个服务
systemctl enable firewalld.service

# 在开机时禁用一个服务
systemctl disable firewalld.service

# 查看服务是否开机启动
systemctl is-enabled firewalld.service

# 查看已启动的服务列表
systemctl list-unit-files|grep enabled

# 查看启动失败的服务列表
systemctl --failed
```
## 防火墙
### firewalld
```bash
# 查看firewalld状态，发现当前是dead状态，即防火墙未开启。
systemctl status firewalld

# 开启防火墙，没有任何提示即开启成功。
systemctl start firewalld

# 查看已开放的端口(默认不开放任何端口)
firewall-cmd --list-ports

# 重启防火墙
firewall-cmd --reload

# 停止防火墙
systemctl stop firewalld.service

# 禁止防火墙开机启动
systemctl disable firewalld.service

# 删除端口
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```
#### 开启端口
```bash
# 开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 开启8080-8089的IP端
firewall-cmd --zone=public --add-port=8080-8089/tcp --permanent
# 开启3306端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```
##### 命令含义：

> `--zone` 作用域
>
> `--add-port=80/tcp` 添加端口，格式为：端口/通讯协议
>
> `--permanent` 永久生效，没有此参数重启后失效

#### 配置firewalld-cmd
```bash
# 查看版本
firewall-cmd --version

# 查看帮助
firewall-cmd --help

# 显示状态
firewall-cmd --state

# 查看所有打开的端口
firewall-cmd --zone=public --list-ports

# 更新防火墙规则
firewall-cmd --reload

# 查看区域信息
firewall-cmd --get-active-zones

# 查看指定接口所属区域
firewall-cmd --get-zone-of-interface=eth0

# 拒绝所有包
firewall-cmd --panic-on

# 取消拒绝状态
firewall-cmd --panic-off

# 查看是否拒绝
firewall-cmd --query-panic
```
----------------------------------------------------------------------
## rpm
### 查询已安装软件包的信息
```bash
rpm -qi 软件名
```
### 查询已安装软件包都安装到何处
```bash
rpm -ql 软件名
```
### 查看已安装软件所依赖软件包及文件
```bash
rpm -qR 软件名
```
### 查看已安装软件的配置文件
```bash
rpm -qc 软件名
```
### 查询已经安装文件所属软件包
```bash
rpm -qf 文件名的绝对路径
```
### 共安装了多少个软件包:
```bash
rpm -qa | wc -l 
```





## 解决网卡问题
### MTU
> MTU经过网卡传输的数据包的最大传输单元,传输设备的MTU值不规范造成传输失败的情况

### 查看MTU值
```bash
cat /sys/class/net/eth0/mtu
```
### 更改MTU值（临时）
```bash
echo "1476" > /sys/class/net/eth0/mtu
# 或者
# ifconfig 网口名 mtu 数值
ifconfig eth0 mtu 1476
```
### 更改MTU值（永久）
```bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0
# 在DEVICE=eth0下面加入
MTU=1476
# 启用IPv6地址的，修改IPv6 mtu的参数为
IPV6_MTU="1280"
```
### 重启网络接口
```bash
service network restart
```

## 后台运行
### nohup
#### 只输出错误信息到日志文件
```bash
nohup python3 ./index.py >/dev/null 2>index.log &
```
#### 不输出日志
```bash
nohup python3 ./index.py >/dev/null 2>&1 &
```
> ### Linux的3种重定向
>>`0`表示标准输入
>>
>>`1`标准输出,在一般使用时，默认的是标准输出
>>
>>`2`标准错误信息输出
>>> 可以用来指定需要重定向的标准输入或输出。
>>>
>>> 将某个程序的错误信息输出到log文件中：./index 2>index.log。
>>> 这样标准输出还是在屏幕上，但是错误信息会输出到log文件中。
>>>
>>> 另外，也可以实现0，1，2之间的重定向。`2>&1`：将错误信息重定向到标准输出。
>>
> ### 关于/dev/null文件
>>Linux下还有一个特殊的文件/dev/null，它就像一个无底洞，所有重定向到它的信息都会消失得无影无踪。
>> 这一点非常有用，当我们不需要回显程序的所有信息时，就可以将输出重定向到/dev/null。

### setsid
> setsid 就是 "set session id" 的意思。表示该命令运行的进程是一个新的 session。因此其父进程不属于当前终端。
>实际上 setsid 运行的进程，其父进程 id (ppid) 为 1 (init 进程的 id)。

```bash
setsid python3 ./index.py >/dev/null 2>&1 &
```
#### 语法
> `setsid(选项)(参数)`
>> `-c`, --ctty   将控制终端设置为当前控制终端
>>
>> `-f`, --fork   总是 fork
>>
>> `-w`, --wait   等待程序退出，并使用相同的返回

### screen
> Screen 是一款由 GNU 计划开发的用于命令行终端切换的自由软件。
> 用户可以通过该软件同时连接多个本地或远程的命令行会话，并在其间自由切换。
> GNU Screen 可以看作是窗口管理器的命令行界面版本。它提供了统一的管理多个会话的界面和相应的功能。 

#### 安装
```bash
yum install -y screen
```
#### 创建一个screen会话
```bash
screen -S 会话名称
```
#### 隐藏并保留当前会话窗口
> #### **按`Ctrl+A`，再按`D`键**

#### 列出所有的会话列表
```bash
screen -ls
```

#### 恢复会话窗口
```bash
screen -r 会话名称
```

#### 关闭会话窗口
```bash
exit
```

> 语法
>> `-A` 　将所有的视窗都调整为目前终端机的大小。
>> 
>> `-d` <作业名称> 　将指定的screen作业离线。
>> 
>> `-h` <行数> 　指定视窗的缓冲区行数。
>> 
>> `-m` 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。
>> 
>> `-r` <作业名称> 　恢复离线的screen作业。
>> 
>> `-R` 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。
>> 
>> `-s` 　指定建立新视窗时，所要执行的shell。
>> 
>> `-S` <作业名称> 　指定screen作业的名称。
>> 
>> `-v` 　显示版本信息。
>> 
>> `-x` 　恢复之前离线的screen作业。
>> 
>> `-ls`或`--list` 　显示目前所有的screen作业。
>> 
>> `-wipe` 　检查目前所有的screen作业，并删除已经无法使用的screen作业。

