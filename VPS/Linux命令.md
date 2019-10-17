# Linux命令


* [Linux命令手册](#linux命令手册)
* [查看邮箱](#查看邮箱)
* [清理内存](#清理内存)
* [清理日志](#清理日志)
* [过滤结果](#过滤结果)
  * [切分字符串取出最后一段](#切分字符串取出最后一段)
  * [过滤多个结果](#过滤多个结果)
* [定时任务](#定时任务)
  * [编辑`crontab`文件](#编辑crontab文件)
  * [输入定时任务命令](#输入定时任务命令)
* [进制转换](#进制转换)
* [进程与线程](#进程与线程)
* [服务器之间传输文件](#服务器之间传输文件)
  * [scp](#scp)
  * [rsync](#rsync)
* [文件和文件夹操作](#文件和文件夹操作)
  * [查找大文件](#查找大文件)
  * [列出目录](#列出目录)
  * [文件查找](#文件查找)
  * [批量替换文件内容](#批量替换文件内容)
  * [删除文件](#删除文件)
  * [设置文件格式](#设置文件格式)
  * [列出文件](#列出文件)
  * [显示当前文件夹大小](#显示当前文件夹大小)
  * [查看当前路径](#查看当前路径)
  * [修改权限](#修改权限)
  * [切换目录](#切换目录)
  * [tar](#tar)
  * [7zip](#7zip)
* [解决网卡问题](#解决网卡问题)
  * [MTU](#mtu)
  * [查看MTU值](#查看mtu值)
  * [更改MTU值（临时）](#更改mtu值临时)
  * [更改MTU值（永久）](#更改mtu值永久)
  * [重启网络接口](#重启网络接口)
* [后台运行](#后台运行)
  * [`nohup`](#nohup)
  * [`setsid`](#setsid)
  * [screen](#screen)
* [Linux性能及网速测试工具](#linux性能及网速测试工具)
  * [一键测试脚本bench.sh](#一键测试脚本benchsh)
  * [91yun的网络测试脚本](#91yun的网络测试脚本)
  * [主机运算性能测试](#主机运算性能测试)
  * [服务器一键测试脚本](#服务器一键测试脚本)
  * [中文版](#中文版)
  * [英文版](#英文版)
* [路由跟踪](#路由跟踪)
  * [ping](#ping)
  * [traceroute](#traceroute)
  * [tcptraceroute](#tcptraceroute)
  * [mtr](#mtr)








## Linux命令手册

* [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)

* [https://man.linuxde.net](https://man.linuxde.net)

* [https://www.linuxcool.com](https://www.linuxcool.com)



## 查看邮箱

```bash
cat /var/spool/mail/root
```

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
history -c
echo > ./.bash_history

# 清除当前登录session的历史
history -r
# 清除所有历史
history -cw

# 清除系统登录成功的记录
echo > /var/log/wtmp
# 清除系统登录失败的记录
echo > /var/log/btmp
# 清除最近登录信息
echo > /var/log/lastlog

rm -fr /var/log/*

```



## 过滤结果

```bash
ls -l | grep test | awk '{print $5}' | sed -n '2p'
```

- `grep` 文本过滤命令，包含test的文件

> 由正则表达式或者字符及基本文本字符所编写的过滤条件

| 参数                                           	| 说明                                                                                                 	|
|------------------------------------------------	|------------------------------------------------------------------------------------------------------	|
| -a --text                                      	| 不要忽略二进制数据。                                                                                 	|
| -A <显示行数>   --after-context=<显示行数>     	| 除了显示符合范本样式的那一行之外，并显示该行之后的内容。                                             	|
| -b --byte-offset                               	| 在显示符合范本样式的那一行之外，并显示该行之前的内容。                                               	|
| -B<显示行数>   --before-context=<显示行数>     	| 除了显示符合样式的那一行之外，并显示该行之前的内容。                                                 	|
| -c --count                                     	| 计算符合范本样式的列数。                                                                             	|
| -C<显示行数> --context=<显示行数>或-<显示行数> 	| 除了显示符合范本样式的那一列之外，并显示该列之前后的内容。                                           	|
| -d<进行动作> --directories=<动作>              	| 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep命令将回报信息并停止动作。                 	|
| -e<范本样式> --regexp=<范本样式>               	| 指定字符串作为查找文件内容的范本样式。                                                               	|
| -E --extended-regexp                           	| 将范本样式为延伸的普通表示法来使用，意味着使用能使用扩展正则表达式。                                 	|
| -f<范本文件> --file=<规则文件>                 	| 指定范本文件，其内容有一个或多个范本样式，让grep查找符合范本条件的文件内容，格式为每一列的范本样式。 	|
| -F --fixed-regexp                              	| 将范本样式视为固定字符串的列表。                                                                     	|
| -G --basic-regexp                              	| 将范本样式视为普通的表示法来使用。                                                                   	|
| -h --no-filename                               	| 在显示符合范本样式的那一列之前，不标示该列所属的文件名称。                                           	|
| -H --with-filename                             	| 在显示符合范本样式的那一列之前，标示该列的文件名称。                                                 	|
| -i --ignore-case                               	| 忽略字符大小写的差别。                                                                               	|
| -l --file-with-matches                         	| 列出文件内容符合指定的范本样式的文件名称。                                                           	|
| -L --files-without-match                       	| 列出文件内容不符合指定的范本样式的文件名称。                                                         	|
| -n --line-number                               	| 在显示符合范本样式的那一列之前，标示出该列的编号。                                                   	|
| -P --perl-regexp                               	| PATTERN 是一个 Perl 正则表达式                                                                       	|
| -q --quiet或--silent                           	| 不显示任何信息。                                                                                     	|
| -R/-r  --recursive                             	| 此参数的效果和指定“-d recurse”参数相同。                                                             	|
| -s --no-messages                               	| 不显示错误信息。                                                                                     	|
| -v --revert-match                              	| 反转查找。                                                                                           	|
| -V --version                                   	| 显示版本信息。                                                                                       	|
| -w --word-regexp                               	| 只显示全字符合的列。                                                                                 	|
| -x --line-regexp                               	| 只显示全列符合的列。                                                                                 	|
| -y                                             	| 此参数效果跟“-i”相同。                                                                               	|
| -o                                             	| 只输出文件中匹配到的部分。                                                                           	|
| -m <num> --max-count=<num>                     	| 找到num行结果后停止查找，用来限制匹配行数                                                            	|




- `awk` 文本处理命令，`print`后面是你要获取第几列

- `sed` 行编辑器，`-n`是指定第几行。

> `p` 显示
>
> `d` 删除
>
> `a` 添加
>
> `c` 替换
>
> `w` 写入
>
> `i` 插入

### 切分字符串取出最后一段

```bash
echo "1:3:5" | awk -F ":" '{print $NF}'
echo "1:3:5" | sed 's/.*:\([^:]*\)$/\1/'
echo "1:3:5" | cut -d : -f 3
```

### 过滤多个结果

```bash
ls -l | grep "postfix\|dovecot"
# 或者
ls -l | grep -e postfix -e dovecot
# 或者
ls -l | grep -E "postfix|dovecot"
# 或者
ls -l | egrep "postfix|dovecot"
# 或者
ls -l | awk "/postfix|dovecot/"
```


## 定时任务

> `crontab`命令常用于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令

### 编辑`crontab`文件

```bash
crontab -e
```

### 输入定时任务命令

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
0 */1 * * *  执行命令
```

> 在linux中的直接执行shell脚本可以用相对路径找到文件,但是如果通过计划任务`crontab`执行shell脚本时，却不能通过相对路径找到文件!
>
> 可以使用pwd命令获取目录`pwd`'/文件名'


## 进制转换

```bash
# 转换为16进制,大写转换为小写。
echo "obase=16; 值" | bc
# 转换为16进制，\n换行
printf "%x\n" 值
```


## 进程与线程


- **查看系统允许的最大线程数**

```bash
ulimit -a | grep processes
```



- **查看进程的信息**

```bash
cat /proc/进程PID/status
```

- **查看线程树**

> 如果不跟进程PID就查看系统中所有的进行线程树

```bash
pstree -p 进程PID
```

- **查看进程中的线程**

> `top -p 进程PID` 再按`Shift+h`（也就是大写`H`）

> 或者直接输入`top -bH -d 3 -p 进程PID`


> `top -H` 加上`-H`这个选项启动`top`，一行显示一个线程。否则，它一行显示一个进程。

```bash
top -H -p 进程PID
top -Hp 进程PID
```


- **查看线程列表**

> 查看所有存在的线程

```bash
ps xH
```

- **查看线程数量**

```bash
pstree -p | wc -l

pstree -p 进程PID | wc -l

ps -hH -p 进程PID | wc -l

ps -mp 进程PID -o THREAD,tid,time | wc -l

ls /proc/进程PID/task | wc -l
```


- **查看进程下的线程状态**

```bash
ps -mp 进程PID -o THREAD,tid,time | sort -rn
```



## 服务器之间传输文件

> 首先进入需要搭建web服务器的目录，然后在输入下面的命令
>
> 注意：不填端口号则默认使用8000端口。

```bash
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

- 命令参数

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

- 示例

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

#### 遇到的问题

> 输入密码时提示：`Permission denied, please try again.`

- 先修改远程文件夹或文件的权限`chmod -R 777 路径`

- 修改`PermitRootLogin`允许Root登录

```bash
# 编辑sshd_config文件
vi /etc/ssh/sshd_config
# 搜索PermitRootLogin并修改为yes
/PermitRootLogin
# 重启ssh
/etc/init.d/sshd restart
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

# 本地路径在前，远程在后，是从本地上传到远端
# spawn scp -P ${des_port} -p -r ${local_path} ${des_user}@${des_ip}:${des_path}
# 远程在前，本地路径在后，的是从远端下载到本地
spawn scp -P ${des_port} -p -r ${des_user}@${des_ip}:${des_path} ${local_path}
# expect \"password:\"
# send \"${des_pass}\r\"
expect {
  \"*yes/no*\" {send \"yes\r\"; exp_continue}
  \"*password*\" {send \"${des_pass}\r\";}
}
expect eof
"
exit

```


### rsync

>【优点】功能强大，操作类似scp，支持排除目录，支持限速参数；还支持本地复制。 
>  
> 【缺点】会耗系统资源，占用I/O
>  
> 【用法】rsync是类unix系统下的数据镜像备份工具，从软件的命名上就可以看出来了——remote sync。
> 它的操作方式和scp和相似，但是比scp强大很多。使用双冒号分割主机名和文件路径时，是使用rsync服务器

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


## 文件和文件夹操作

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




### 文件查找

> `find`用于查找文件

> `grep`用于查找文件内容的行
>> `-r`递归查找
>>
>> `-l`列出匹配的文件名
>>
>> `-n`列出所在的行号
>>
>> `--include="*.text"`只查找后缀名是`.text`的文件
>> 
>> `--exclude="*.sql"`查找除了后缀名是`.sql`的文件

> `xargs`命令是给其他命令传递参数的一个过滤器，也是组合多个命令的一个工具，它擅成长将标准输入数据转换成命令行参数。


> 使用`find`命令的`-exec`选项处理匹配到的文件时，`find`命令将所有匹配到的文件一起传递给`exec`。
> 不幸的是，有些系统对能够传递给`exec`的命令长度有限制，这样`find`命令运行几分钟之后就算出现溢出错误。
>> 错误信息通常是"参数列太长"或"参数列溢出"。
>
> 这就是`xargs`的用处所在，特别是与`find`命令一起使用,`exec`会发起多个进程，而`xargs`只有一个



> 查看某个文件，注意权限问题

```bash
find -name test
```

> 查看录前目录下文件名中含有字符串的文件，`*`为通配符，可以按需要使用

```bash
find -name '*XXX*'
```

> 在当前目录下查看所有目录并排序

```bash
find -type d | sort
```

>  在指定文件中（一个或多个）查找并出含字符串的行

```bash
grep 'XXX' text1.txt text2.txt
```

> 在以t开头的文件中查找并出含字符串的行

```bash
grep 'XXX' t*
```

> 查找指定时间内的文件

```bash
find 文件路径 -type f -newermt '起始时间' -a -not -newermt '结束时间'
```

> 查找当前目录下文件内容匹配的字符串，输出：`全路径文件名:字符串所在行内容`

```bash
find . -type f | xargs grep "XXX"
find . | xargs grep -ri "XXX"
```

> 查找当前目录下文件内容匹配的字符串，输出：`字符串所在行内容`

```bash
find /XXX/XXX -type f -exec grep "XXX" {} \;
```

> 查找当前目录下文件内容匹配的字符串，输出：`文件名`

```bash
find . | xargs grep -ril "XXX"
```

### 批量替换文件内容

```bash
find -name '要查找的文件名' | xargs perl -pi -e 's|被替换的字符串|替换后的字符串|g'
```

> `sed`命令可以批量替换多个文件中的字符串

> 注意命令中的反撇号，而不是单引号
>
> 反撇号：功能是将命令的输出结果给变量；在这里的作用是将输出查找到的文件名给`sed`用于字符串替换。

```bash
sed -i "s/原字符串/新字符串/g" `grep 原字符串 -rl 所在目录`
grep "原字符串" -rl 所在目录 | xargs sed -i "s/原字符串/新字符串/g"
grep -rl "原字符串" ./* | xargs sed -i s/"原字符串"/"新字符串"/g
```

> 一次性将所有文件中的指定字符串进行修改

```bash
grep "原字符串" * -R | awk -F: '{print $1}' | sort | uniq | xargs sed -i 's/原字符串/新字符串/g'
```

> 统计匹配指定字符串的所有sql文件的数量

```bash
grep -rl "XXX" --exclude="*.sql" ./* | wc -l
```

### 删除文件


- **删除指定时间前的文件**

```bash
# 统计目录下N天前的文件数量
find 目录 -type f -mtime +天数 | wc -l

# 列出目录下N天前的文件
find 目录 -type f -mtime +天数 -exec ls -l {} \;

# 删除目录下N天前的文件
find 目录 -type f -mtime +天数 -exec rm -rf {} \;

# 删除目录下N天前的文件
find 目录 -type f -mtime +天数 | xargs -I {} rm -rf {}


# 删除目录下N天前文件名包含tar的文件或目录
find 目录 -mtime +天数 -name "*.tar.*" -exec rm -rf {} \;

# 删除目录下N天前文件名为tar.gz后缀的文件或目录
find 目录 -mtime +天数 -name "*.tar.gz" | xargs -I {} rm -rf {}
```


- **删除指定大小的文件**


> `-lt 50` 删除小于50KB的文件
>
> `-gt 50` 删除大于50KB的文件

```bash
for file in `ls ./`; do size=`du $file | awk '{print \$1}'`; [ $size -lt 50 ] && rm $file; done
```


> `-size 1k` 删除1KB占用空间的文件
>
> `-size +100k` 删除大于100KB占用空间的文件
>
> `-size -1k` 删除小于1KB占用空间的文件

> `-size 1024c` 删除1k大小的文件
>
> `-size +1024c` 删除大于1k大小的文件
>
> `-size -1024c` 删除小于1k大小的文件

```bash
find 目录 -type f -size 大小 -exec rm -rf {} \;
find 目录 -type f -size 大小 | xargs -n 1 rm -f
```




### 设置文件格式

```bash
# 显示格式。
:set ff
# 设置为unix格式
:set ff=unix
# 保存
:wq
```

### 列出文件

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

### 切换目录

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

### tar

```bash
# 打包的时候我们要排除 tomcat/logs 目录，命令如下：
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs tomcat

# 如果要排除多个目录，增加 --exclude 即可，如下命令排除logs和libs两个目录及文件xiaoshan.txt
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs --exclude=tomcat/libs --exclude=tomcat/xiaoshan.txt tomcat
```

> 注意：在使用`tar`的`--exclude`命令排除打包时，末尾不能加`/`或者路径为绝对路径，否则还是会把排除目录以及其下的文件打包进去。

### 7zip

```bash
# 安装7zip
yum –y install p7zip
# 解压到当前目录下,不保留原来的目录结构
7za e 文件名
# 解压到当前目录下,但保留原来的目录结构
7za x 文件名

# 用7z压缩成tar
7za a -ttar 文件名.tar 文件夹
# 用7z把tar压缩成gz
7za a -tgzip 文件名.tar.gz 文件名.tar
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

### `nohup`

#### 只输出错误信息到日志文件

```bash
nohup python3 ./index.py >/dev/null 2>index.log &
```

#### 不输出日志

```bash
nohup python3 ./index.py >/dev/null 2>&1 &
```

- Linux的3种重定向

>`0`表示标准输入
>
>`1`标准输出,在一般使用时，默认的是标准输出
>
>`2`标准错误信息输出
>> 可以用来指定需要重定向的标准输入或输出。
>>
>> 将某个程序的错误信息输出到log文件中：./index 2>index.log。
>> 这样标准输出还是在屏幕上，但是错误信息会输出到log文件中。
>>
>> 另外，也可以实现0，1，2之间的重定向。`2>&1`：将错误信息重定向到标准输出。

- 关于`/dev/null`文件

>Linux下还有一个特殊的文件/dev/null，它就像一个无底洞，所有重定向到它的信息都会消失得无影无踪。
> 这一点非常有用，当我们不需要回显程序的所有信息时，就可以将输出重定向到/dev/null。

### `setsid`

> `setsid`就是`set session id`的意思。表示该命令运行的进程是一个新的`session`。因此其父进程不属于当前终端。
> 实际上`setsid`运行的进程，其父进程id(ppid)为1(init进程的id)。

```bash
setsid python3 ./index.py >/dev/null 2>&1 &
```

#### 语法

- `setsid(选项)(参数)`
> `-c`, `--ctty` 将控制终端设置为当前控制终端
>
> `-f`, `--fork` 总是 fork
>
> `-w`, `--wait` 等待程序退出，并使用相同的返回

### screen

> `Screen`是一款由 GNU 计划开发的用于命令行终端切换的自由软件。
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

- 按`Ctrl+A`，再按`D`键

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

#### 选项

- `-A` 　将所有的视窗都调整为目前终端机的大小。

- `-d` <作业名称> 　将指定的screen作业离线。

- `-h` <行数> 　指定视窗的缓冲区行数。

- `-m` 　即使目前已在作业中的screen作业，仍强制建立新的screen作业。

- `-r` <作业名称> 　恢复离线的screen作业。

- `-R` 　先试图恢复离线的作业。若找不到离线的作业，即建立新的screen作业。

- `-s` 　指定建立新视窗时，所要执行的shell。

- `-S` <作业名称> 　指定screen作业的名称。

- `-v` 　显示版本信息。

- `-x` 　恢复之前离线的screen作业。

- `-ls`或`--list` 　显示目前所有的screen作业。

- `-wipe` 　检查目前所有的screen作业，并删除已经无法使用的screen作业。


## Linux性能及网速测试工具

### 一键测试脚本bench.sh

* 这个是秋水逸冰老大的脚本，用于测试网络下载及主机IO性能测试。是网络上普遍使用的脚本，界面很漂亮。

```bash
wget -qO- bench.sh | bash
```

### 91yun的网络测试脚本

* 这个来自91yun的脚本，主要测试的是网络ping值及路由。

```bash
wget -N --no-check-certificate https://raw.githubusercontent.com/91yun/91yuntest/master/test_91yun.sh
bash test_91yun.sh s
```

### 主机运算性能测试

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/unixbench.sh
chmod +x unixbench.sh
./unixbench.sh
```

### 服务器一键测试脚本

> 可以一键检测服务器基本性能，以及网络去程回程的速度。功能相当完善。作者还一直在维护，代码整合来自 SpeedTest 和 OldKing 的 SuperSpeed。

* by [FunctionClub](https://github.com/FunctionClub/ZBench)

### 中文版

```bash
wget https://raw.githubusercontent.com/FunctionClub/ZBench/master/ZBench-CN.sh
bash ZBench-CN.sh
```

### 英文版

```bash
wget https://raw.githubusercontent.com/FunctionClub/ZBench/master/ZBench.sh
bash ZBench.sh
```

> 测试完之后，会在/root/下面生成一个 report.html 的文件。

- Superspeed.sh by [Oldking](https://github.com/oooldking/script)

```bash
wget https://raw.githubusercontent.com/oooldking/script/master/superspeed.sh
chmod +x superspeed.sh
./superspeed.sh
```

## 路由跟踪


### ping

> ping使用了ICMP回送请求和回送应答报文。ping工具发出去的数据包没有通过tcp/udp协议，但是要经过ip协议。ping命令计算的时间是数据包的往返总时间。

#### ping选项

- `-c num`  表示使用ping发出去num个数据包 
- `-d` 使用Socket的SO_DEBUG功能。

- `-f`  极限检测。大量且快速地送网络封包给一台机器，看它的回应。快速ping，Flood ping，发送接收ICMP Echo报文的频率快了非常多

- `-n` 只输出IP,表示ping的输出中包含主机信息的都用ip表示，不在进行ip和主机名之间的映射，那样ping的响应速度会更快。

- `-q` 不显示任何传送封包的信息，只显示最后的结果。

- `-r` 忽略普通的Routing Table，直接将数据包送到远端主机上。通常是查看本机的网络接口是否有问题。

- `-R` 记录路由过程。

- `-v` 详细显示指令的执行过程。

- `-c` 数目：在发送指定数目的包后停止。LINUX的ping不会自动终止如果不指定这个参数就需要手动按ctrl+c终止

- `-i` 秒数：设定间隔几秒送一个网络封包给一台机器，预设值是一秒送一次。

- `-I` 网络界面：使用指定的网络界面送出数据包。

- `-l` 前置载入：设置在送出要求信息之前，先行发出的数据包。

- `-p` 范本样式：设置填满数据包的范本样式。

- `-s` packetsize 字节数：指定发送的数据字节数，预设值是56，加上8字节的ICMP头，一共是64ICMP数据字节。

- `-t` 存活数值：设置存活数值TTL的大小。设定数据包在网络上传输的Time To Live（TTL）生命周期


#### ping示例

```
ping -c 3 -s 512 www.woytu.com  #表示向www.bnxb.com发送3个512B大小的数据包，来进行网络探测  
ping -f www.woytu.com           #快速ping
```


### traceroute

#### traceroute选项

- `-d` 使用Socket层级的排错功能。
- `-f` 设置第一个检测数据包的存活数值TTL的大小。
- `-F` 设置勿离断位。
- `-g` 设置来源路由网关,最多可设置8个。
- `-i` 使用指定的网络界面送出数据包。
- `-I` 使用ICMP回应取代UDP,与-U\-T是互斥关系。
- `-m` 设置检测数据包的最大存活数值TTL的大小,也就是改变跳数,默认只检测30跳。
- `-n` 直接使用IP地址而非主机名称。
- `-p` 设置UDP传输协议的通信端口。
- `-q` 改变每一次主机之间路由传送包的次数,最大为10
- `-r` 忽略普通的Routing Table,直接将数据包送到远端主机上。
- `-s` 设置本地主机送出数据包的IP地址。
- `-t` 设置检测数据包的TOS数值。
- `-T` 使用TCP协议来探测,与-U\-I是互斥关系,另外TCP协议默认是80端口,而LINUX下1024以下端口需要管理员ROOT权限才能执行,因此需注意权限。
- `-U` 使用UDP协议来探测,这是默认的检测协议
- `-v` 详细显示指令的执行过程。
- `-w` 设置等待远端主机回报的时间。
- `-x` 开启或关闭数据包的正确性检验。

##### 安装

```bash
yum -y install traceroute
```

##### 示例

```bash
traceroute www.woytu.com
```

> 备注，使用traceroute返回的每行信息中有三个时间值，那是因为对于每个节点或者路由器，源端发了三次探测请求。

### tcptraceroute

#### tcptraceroute选项

- `-i` 指定接口

- `-f` 设置开始TTL值（第一条显示的路径）

- `-l` 包长度

- `-q` 每一跳延时查询的次数（default 3）

- `-t` 设置TOS(服务类型)可用于传出数据包。默认 未设置

- `-m` 设置最大TTL值

- `-p` 指定使用本机的特定端口作为源端口（默认随机）

- `-s` 如果本机有多个IP，可指定使用一个IP进行追踪

- `-w` 等待超时时间

- `host` 必跟参数，可以使用主机名或者IP地址

- `des port` 可选选项，默认使用目的地址的80端口

##### 安装

```bash
yum -y install tcptraceroute
```

##### 示例

```bash
tcptraceroute www.woytu.com 443 -n -q 1
```

### mtr

* [https://www.cnblogs.com/xzkzzz/p/7413177.html](https://www.cnblogs.com/xzkzzz/p/7413177.html)

* [https://www.jianshu.com/p/802010d54849](https://www.jianshu.com/p/802010d54849)

* [https://cloud.tencent.com/developer/article/1332118](https://cloud.tencent.com/developer/article/1332118)

* [http://winmtr.net/download-winmtr](http://winmtr.net/download-winmtr/)

> 在Linux中有一个更好的网络连通性判断工具，它可以结合ping | nslookup | tracert 来判断网络的相关特性，这个命令就是mtr。

> 注意：MTR使用的raw sockets是绕过TCP/IP协议，需要ROOT权限来执行，因此如果以普通用户身份来执行mtr会出错，提示“mtr: unable to get raw sockets”

#### 选项

- `-n` 不探测主机名,no-dns不对IP地址做主机名解析
- `-r` 将mtr设置为报告模式，追踪结果以报告模式输出。若没有-r显现，那么将进入mtr的实时交互模式。  
- `-c` num 定义追踪的次数，每次是1s，且-c必须和-r配合使用，默认的10次。
- `-s` 用来指定ping数据包的大小
- `-a` 来设置发送数据包的IP地址 这个对一个主机由多个IP地址是有用的
- `-i` 使用这个参数来设置ICMP返回之间的要求默认是1秒
- `-4` IPv4
- `-6` IPv6

#### 安装

```bash
yum -y install mtr
```

#### 使用格式

```bash
mtr [options] hostname
```

#### 示例

```bash
mtr -r www.woytu.com
```

- 第一列:显示的是IP地址和本机域名，这点和tracert很像
- 第二列:snt:10 设置追踪的次数，默认值是10 可以通过参数 -c来定制，例如mtr -r -c 15 www.bnxb.com
- 第三列 Loss: 是显示的每个对应IP的丢包率
- 第四列 Last: 显示的最近一次的返回时延
- 第五列 Avg : 是平均值 这个应该是发送ping包的平均时延
- 第六列 Best: 是最好或者说时延最短的
- 第七列 Wrst: 是最差或者说时延最常的
- 第八列 StDev: 是标准偏差