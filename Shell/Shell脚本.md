# Shell脚本


[[toc]]




## flag

> `Shell`脚本（`shell script`），是一种为`Shell`编写的脚本程序。
> `Shell`脚本文件的名称可以任意，但为了避免被误以为是普通文件，建议将`.sh`后缀加上，以表示是一个脚本文件。

* [Shell 教程](https://www.runoob.com/linux/linux-shell.html)
* [Linux Shell脚本学习指南](http://c.biancheng.net/shell)
* [Shell命令脚本初步认识，Shell脚本入门](https://www.jianshu.com/p/3782970dec75)
* [Shell中if的使用详解_&&与||的使用详解](https://blog.csdn.net/setul/article/details/80114020)
* [shell-if判断](https://www.jianshu.com/p/c71e85375e88)
* [https://github.com/guodongxiaren/Bash](https://github.com/guodongxiaren/Bash)



## 自动交互



### 指令有参数

**重定向**

> shell用重定向作为标准输入的用法是：`cmd<<delimiter`
>
> shell会将分界符delimiter之后直到下一个同样的分界符之前的内容作为输入

> 实现ftp自动登录并运行ls指令的用法如下：其中admin为用户名，password为密码

```bash
ftp -i -n 192.168.21.46 <<EOF  
user admin password
ls  
EOF
```


**管道**

```bash
# sudo的-S参数
echo 'zjk123' | sudo -S cp file1 /etc/hosts
# passwd的-stdin参数
echo 'password' | passwd -stdin username
```



### 指令无参数

> `Expect`是由`Don Libes`基于`Tcl`（`Tool Command Language`）的脚本语言，所以你至少要学习一下`TCL`它的语法。

* [https://www.tcl-lang.org/man](https://www.tcl-lang.org/man) [https://www.tcl.tk/man](https://www.tcl.tk/man)
* [Tcl教程](https://www.yiibai.com/tcl/tcl_special_variables.html)
* [expect手册](https://linux.die.net/man/1/expect)
* [shell编程之expect用法](http://blog.leanote.com/post/wkf19911118@gmail.com/shell%E7%BC%96%E7%A8%8B%E4%B9%8Bexpect)
* [linux expect 自动交互脚本用法](https://man.linuxde.net/expect1)
* [expect 脚本使用](https://einverne.github.io/post/2019/01/expect-command.html)
* [Expect学习笔记](https://blog.csdn.net/boyishachang/article/details/8677936)


**启用选项**

| 选项 	| 说明                                                                                             	|
|------	|--------------------------------------------------------------------------------------------------	|
| `-c` 	| 执行脚本前先执行的命令，可多次使用。                                                             	|
| `-d` 	| debug模式，可以在运行时输出一些诊断信息，与在脚本开始处使用exp_internal 1相似。                  	|
| `-D` 	| 启用交换调式器,可设一整数参数。                                                                  	|
| `-f` 	| 从文件读取命令，仅用于使用#!时。如果文件名为"-"，则从stdin读取(使用"./-"从文件名为-的文件读取)。 	|
| `-i` 	| 交互式输入命令，使用"exit"或"EOF"退出输入状态。                                                  	|
| `--` 	| 标示选项结束(如果你需要传递与expect选项相似的参数给脚本时)，可放到#!行:#!/usr/bin/expect --。    	|
| `-v` 	| 显示expect版本信息                                                                               	|


**命令**

| 命令           	| 说明                                                                                   	|
|----------------	|----------------------------------------------------------------------------------------	|
| $argc          	| 参数个数                                                                               	|
| $argv          	| 接收的所有参数数组                                                                     	|
| $NAME          	| 使用变量                                                                               	|
| close          	| 关闭当前进程的连接，-i选项关闭指定句柄的过程                                              	|
| debug          	| 控制调试器                                                                             	|
| disconnect     	| 断开进程连接(进程仍在后台运行)                                                         	|
| exit           	| 退出expect                                                                             	|
| exp_pid          	| 获取当前spawn的进程号，-i选项指定spawn进程：setpid [exp_pid –i $spawn_id]                    	|
| exp_send         	| 将参数输出到程序中                                                                        	|
| exp_continue   	| 当问题不存在时继续回答下边的问题                                                       	|
| exp_internal   	| 调试模式，1（打开）、0（关闭）、-f file（将调试内容写入文件），放在spawn后面                  	|
| expect eof     	| 问题回答完毕等待expect进程结束，expect -timeout -1 eof                                 	|
| expect -re     	| 表示匹配正则表达式                                                                     	|
| expect         	| 从进程接收字符串，expect与{之间没有空格或者TAB间隔，会报invalid command name "expect{" 	|
| expr           	| 计算                                                                                   	|
| interact       	| 执行完成后保持交互状态，否则退出                                                       	|
| lindex         	| 获取参数                                                                               	|
| puts           	| 向用户终端发送提示信息                                                                 	|
| send_user      	| 把参数输出到标准输出中                                                            	        |
| send_error      	| 把参数输出到标准错误输出中                                                             	|
| send_log        	| 把内容输出到log记录文件中                                                            	|
| send           	| 用于向进程发送字符串                                                                  	|
| set NAME value 	| 设置变量                                                                               	|
| set timeout -1 	| 超时时间，-1为永不超时                                                                 	|
| spawn          	| expect中的监控程序，其运行会监控命令提出的交互式问题，启动新的进程                     	    |
| wait             	| 等待系统主动返回eof，也就是结束信号后才关闭，wait -nowait                                 	|
| log_user         	| 指定输出的位置，默认值是1，表示所有输出都放在标准输出中，为0就表示不需要任何输出        	    |
| log_file         	| 将输出记录到一个文件中                                                              	|

- `send`命令有几个可用的参数

> `-i` 指定`spawn_id`，这个参数用来向不同`spawn_id`的进程发送命令，是进行多程序控制的关键参数。

> `-s` 代表`slowly`，也就是控制发送的速度，这个参数使用的时候要与`expect`中的变量`send_slow`相关联


**特殊字符**

| 字符 	| 说明          	|
|------	|---------------	|
| `\r` 	| 表示回车      	|
| `\n` 	| 表示换行      	|
| `\t` 	| 表示制表符    	|
| `\`  	| 需转义 `\\\`  	|
| `}`  	| 需转义 `\}`   	|
| `[`  	| 需转义 `\[`   	|
| `$`  	| 需转义 `\\\$` 	|
| &#96; | 需转义 &#92;&#96;|
| `"`  	| 需转义 `\\\"` 	|



- 方式一

```bash
push_url=https://github.com/woytu/woytu.github.io.git
push_username=admin
push_password=admin

# 检索expect是否安装
is_expect=`whereis expect | awk '{print $2}'`
# 如果没有安装
if [ ! -n "$is_expect" ]; then
    yum -y install expect > /dev/null 2>&1
fi

expect -c "

# 超时时间-1为永不超时
set timeout -1

# spawn将开启一个新的进程，或者使用：ssh $user@$host {your_command}
# 只有先进入expect环境后才可执行spawn
spawn git push -f ${push_url} master

# 判断运行上述命令的输出结果中是否有指定的字符串(不区分大小写)。
# 若有则立即返回，否则就等待一段时间后返回，等待时长就是开头设置的timeout。
# 同时向上面的进程发送字符串, 并且自动敲Enter健(\r)
expect {
  \"*Username*\" {send \"${push_username}\r\"; exp_continue}
  \"*Password*\" {send \"${push_password}\r\";}
}
# 问题回答完毕等待`expect`进程结束
expect eof
"
```


- 方式二

```bash
push_url=https://github.com/woytu/woytu.github.io.git
push_username=admin
push_password=admin

# 检索expect是否安装
is_expect=`whereis expect | awk '{print $2}'`
# 如果没有安装
if [ ! -n "$is_expect" ]; then
    yum -y install expect > /dev/null 2>&1
fi

expect <<-EOF
    set timeout -1

    spawn git push -f ${push_url} master
    
    #expect "*Username*" {send "${push_username}\r"; exp_continue}
    #expect "*Password*" {send "${push_password}\r"}
    
    expect {
      \"*Username*\" {send \"${push_username}\r\"; exp_continue}
      \"*Password*\" {send \"${push_password}\r\";}
    }
    interact
    
    # 问题回答完毕等待`expect`进程结束
    expect eof

# 由于用的-EOF，这里的EOF可以有空格，tab键
EOF
```




- 方式三

```bash
#!/usr/bin/expect

set push_url "https://github.com/woytu/woytu.github.io.git"
set push_username "admin"
set push_password "admin"

# 超时时间-1为永不超时
set timeout -1

# spawn将开启一个新的进程，或者使用：ssh $user@$host {your_command}
# 只有先进入expect环境后才可执行spawn
spawn git push -f ${push_url} master

# 判断运行上述命令的输出结果中是否有指定的字符串(不区分大小写)。
# 若有则立即返回，否则就等待一段时间后返回，等待时长就是开头设置的timeout。
expect "*Username*"
# 向上面的进程发送字符串, 并且自动敲Enter健(\r)
# -- 后面的"之间有一个空格
send -- "$push_username\n"

expect "*Password*"
# -- 后面的"之间有一个空格
send -- "$push_password\n"

# 允许用户交互
interact
# 问题回答完毕等待`expect`进程结束
expect eof
```


- 获取日期

```bash
expect -c "

set date [ clock format [ clock seconds ] -format "%Y%m%d" ]
set secon [  clock seconds ]
set yestoday_secon 0
 
#set i [expr {$i + 1}]    #expect里的加减法
set yestoday_secon [expr {$secon - 86400} ]
set yestoday [ clock format [ expr {$yestoday_secon} ] -format "%Y%m%d" ]
 
puts "\n date = $date"
puts "\n secon = $secon"
puts "\n yestoday_secon = $yestoday_secon"
puts "\n yestoday = $yestoday"

# 问题回答完毕等待`expect`进程结束
expect eof
"
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
history -cw && rm -rf ~/.bash_history

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

# 问题回答完毕等待`expect`进程结束
expect eof
"
exit

```