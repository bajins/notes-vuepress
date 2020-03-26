# Shell命令


[[toc]]




## flag

> `Shell`是一个用`C`语言编写的程序，它是用户使用`Linux`的桥梁。
>
> 文字操作系统与外部最主要的接口就叫做`Shell`。`Shell`是操作系统最外面的一层。
>
> `Shell`管理你与操作系统之间的交互:等待你输入，向操作系统解释你的输入，并且处理各种各样的操作系统的输出结果。


* [https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
* [https://github.com/idank/explainshell](https://github.com/idank/explainshell)


* [https://github.com/jaywcjlove/linux-command](https://github.com/jaywcjlove/linux-command)
* [https://man.linuxde.net](https://man.linuxde.net)
* [https://www.linuxcool.com](https://www.linuxcool.com)


* [精选的优秀命令行框架](https://github.com/alebcay/awesome-shell)
* [Linux常用命令汇总](https://blog.csdn.net/Mculover666/article/details/84558280)




## 查看邮箱

```bash
cat /var/spool/mail/root
```

## 清除屏幕输出

> `clear`命令、`reset`命令（可修正光标位置）或<kbd>Ctrl</kbd> + <kbd>L</kbd>组合快捷键，并不是真正的清空屏幕，当用鼠标向上滚时，你仍然能看到之前的命令操作留下来的输出

> `printf "\033c"`或`printf "\ec"`真正的清空了终端屏幕，它的功能跟`DOS`里`CMD.EXE`提供的`CLS`效果很相似。`\033  == \x1B == 27 == ESC`，于是，这个命令变成了`<ESC>c`，它是VT-XXX中表示`Full Reset (RIS)`的转义码。现今我们使用的所有的终端都是VT兼容的，但如果你发现自己使用的是一个非常奇怪的终端，那这个命令你可能用不了。`printf`是`bash`里内置的命令，内置命令的优先级比其它可执行文件要高。


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
| -m 数量 --max-count=数量                         	| 找到num行结果后停止查找，用来限制匹配行数                                                            	|




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


- `cut`命令用于显示每行从开头算起num1到num2的文字

> `-b` ：以字节为单位进行分割。这些字节位置将忽略多字节字符边界，除非也指定了`-n`标志。
>
> `-c` ：以字符为单位进行分割。
>
> `-d` ：自定义分隔符，默认为制表符。
>
> `-f` ：与-d一起使用，指定显示哪个区域。
>
> `-n` ：取消分割多字节字符。仅和 -b 标志一起使用。
> 如果字符的最后一个字节落在由`-b`标志的List参数指示的范围之内，该字符将被写出；否则，该字符将被排除


```bash
ll | cut -c1-10
```


### 截取末尾字符串

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


**查看系统进程和线程限制**


- 查看系统允许的最大线程数

```bash
ulimit -a | grep processes
ulimit -u
```

- 系统支持的最大线程数

> 操作系统线程ID的最大值

```bash
cat /proc/sys/kernel/pid_max
```

- 内核支持的最大线程数

```bash
sysctl kernel.pid_max
```

> 修改值（临时）：`sysctl -w kernel.pid_max=值`

> 修改值（永久）：`echo 'kernel.pid_max=值' >>/etc/sysctl.conf`


- 单个进程可创建的线程数

```bash
cat /proc/sys/vm/max_map_count
```




**查看进程的信息**

```bash
cat /proc/进程PID/status
```

**查看线程树**

> 如果不跟进程PID就查看系统中所有的进行线程树

```bash
pstree -p 进程PID
```

**查看进程中的线程**

> `top -p 进程PID` 再按`Shift+h`（也就是大写`H`）

> 或者直接输入`top -bH -d 3 -p 进程PID`


> `top -H` 加上`-H`这个选项启动`top`，一行显示一个线程。否则，它一行显示一个进程。

```bash
top -H -p 进程PID
top -Hp 进程PID
```


**查看线程列表**

> 查看所有存在的线程

```bash
ps xH
```

**查看线程数量**

```bash
pstree -p | wc -l

pstree -p 进程PID | wc -l

ps -hH -p 进程PID | wc -l

ps -mp 进程PID -o THREAD,tid,time | wc -l

ls /proc/进程PID/task | wc -l
```


**查看进程下的线程状态**

```bash
ps -mp 进程PID -o THREAD,tid,time | sort -rn
```


## 开机启动

**添加命令到`/etc/rc.local`文件末尾**

> 编辑`/etc/rc.local`或者`/etc/rc.d/rc.local`（前者是后者的软连接）文件，
> 按<kbd>Shift</kbd> + <kbd>g</kbd>（就是大写的G）跳转到末尾添加运行命令
>> 执行的程序需要写绝对路径，添加到系统环境变量的除外

> 为防止启动执行失败，最好执行一次`chmod +x /etc/rc.d/rc.local`进行授权

**crontab**

```bash
crontab -e
@reboot 运行程序命令
```



**脚本文件放在`/etc/profile.d/`目录下**

- `chkconfig`

1、创建软连接或者复制脚本到`/etc/init.d/`或者`/etc/rc.d/init.d/`（前者是后者的软连接）下

> 注意脚本文件开头一定要添加以下几行代码，否侧会提示`chkconfig`不支持

```bash
#!/bin/sh
# - 64 36 分别代表运行级别，启动优先权，关闭优先权
# chkconfig: - 64 36
# description: Supervisor Server
# processname: supervisord
```

2、添加启动项

```bash
chkconfig --add 脚本名
chkconfig 脚本名 on
```

3、检查是否设置成功

```bash
chkconfig --list | grep 脚本名
```




## 延时

- `sleep` 默认以秒为单位

> `sleep 1` 睡眠1秒
>
> `sleep 1s` 表示延迟一秒
>
> `sleep 1m` 表示延迟一分钟
>
> `sleep 1h` 表示延迟一小时
>
> `sleep 1d` 表示延迟一天

- `usleep` 默认以微秒为单位

> 1s = 1000ms = 1000000us




## 查找大文件

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

## 列出目录

```bash
ls -l |grep "^d" |awk '{print $9}'
ls -F |grep "/$"
ls -d */
ls -ad */
```




## 文件查找

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

## 批量替换文件内容

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

## 删除文件

**删除并排除文件**

```bash
find * | grep -v '\(*.jpg\|*.png)' | xargs rm
rm -rf !(*.jpg|*.png)
```

> 如果报错：`-bash: !: event not found` 需要开启通配符功能

```bash
shopt -s extglob
```



**删除指定时间前的文件**

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


**删除指定大小的文件**


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
find 目录 -type f -size 大小 | xargs -n 1 rm -rf
```



## 列出文件

```bash
# 查看所有文件（包括隐藏文件）并以最大容量单位显示
ll -a -h 文件名
```

## 显示目录大小

```bash
du -sh
```

## 查看当前路径

```bash
pwd
```

## 修改权限

> 一次性更改权限就使用-R,文件修改为所有用户可读可写可执行，也就是对应编号为777

```bash
chmod -R 777 文件名
```

> 使用命令chown改变目录或文件的所有权,更改所有者和所属组chown(change owner缩写）

```bash
chown:用户名 文件名
```



## 切换目录

- 进入当前用户的主目录

```bash
cd ~
cd 
```

- 进入上次所在目录

```bash
cd -
```

- 进入上一级目录

```bash
cd ..
```

- 进入当前目录

```bash
cd .
```

