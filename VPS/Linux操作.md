# Linux操作


* [flag](#flag)
* [重装系统](#重装系统)
  * [MeowLove](#meowlove)
  * [moeclub](#moeclub)
* [软件组合](#软件组合)
* [后台运行](#后台运行)
  * [`nohup`](#nohup)
  * [`tmux`](#tmux)
  * [`supervisor`](#supervisor)
  * [`setsid`](#setsid)
  * [screen](#screen)
* [Linux之间传输文件](#linux之间传输文件)
  * [scp](#scp)
  * [rsync](#rsync)
* [性能及网速测试工具](#性能及网速测试工具)
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
* [解决网卡问题](#解决网卡问题)
  * [MTU](#mtu)
  * [查看MTU值](#查看mtu值)
  * [临时更改MTU值](#临时更改mtu值)
  * [永久更改MTU值](#永久更改mtu值)
  * [重启网络接口](#重启网络接口)




## flag

* [Linux手册](https://learn-linux.readthedocs.io/zh_CN/latest/)

* [Linux网络编程](https://network.fasionchan.com/zh_CN/latest/index.html)

* [OSX操作指南](https://osx-guide.readthedocs.io/zh_CN/latest/)

* [阿里云CentOS 7系统一键净化脚本](https://www.moerats.com/archives/625/)

* [Linux工程师必备的88个监控工具](https://learn-linux.readthedocs.io/zh_CN/latest/maintenance/monitor/tools/80-linux-monitoring-tools.html)

- `nethogs`: 按进程查看流量占用

- `ethtool`: 诊断工具

- `tcpdump`: 抓包工具

- 监控总体带宽使用：`nload`、`bmon`、`slurm`、`bwm-ng`、`cbm`、`speedometer`、`netload`
- 监控总体带宽使用（批量式输出）：`vnstat`、`ifstat`、`dstat`、`collectl`
- 每个套接字连接的带宽使用：`iftop`、`iptraf`、`tcptrack`、`pktstat`、`netwatch`、`trafshow`、`jnettop`

- `ntopng`


## 重装系统

### MeowLove

* [https://github.com/MeowLove/Network-Reinstall-System-Modify](https://github.com/MeowLove/Network-Reinstall-System-Modify)

```bash
yum update
yum install -y xz openssl gawk file
# 下载脚本
wget --no-check-certificate 'https://raw.githubusercontent.com/MeowLove/Network-Reinstall-System-Modify/master/Network-Reinstall-System-Modify.sh'
# 给脚本授权
chmod a+x Network-Reinstall-System-Modify.sh
# 一键网络重装纯净CentOS 7
bash Network-Reinstall-System-Modify.sh -CentOS_7
# 一键网络重装纯净Windows Server 2019
bash Network-Reinstall-System-Modify.sh -Windows_Server_2019
```

- 下载SHELL脚本（通过root用户运行）

```bash
wget --no-check-certificate -qO ~/Network-Reinstall-System-Modify.sh 'https://www.cxthhhhh.com/tech-tools/Network-Reinstall-System-Modify/Network-Reinstall-System-Modify.sh' 

chmod a+x ~/Network-Reinstall-System-Modify.sh
```



- 安装Linux系统
```bash
# ①. 一键网络重装纯净CentOS 7（推荐）
bash ~/Network-Reinstall-System-Modify.sh -CentOS_7
# ②. 一键网络重装纯净CentOS 6
bash ~/Network-Reinstall-System-Modify.sh -CentOS_6
# ③. 一键网络重装纯净Debian 10（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Debian_10
# ④. 一键网络重装纯净Debian 9
bash ~/Network-Reinstall-System-Modify.sh -Debian_9
# ⑤. 一键网络重装纯净Debian 8
bash ~/Network-Reinstall-System-Modify.sh -Debian_8
# ⑥. 一键网络重装纯净Ubuntu 18.04（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_18.04
# ⑦. 一键网络重装纯净Ubuntu 16.04
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_16.04
# ⑧. 一键网络重装纯净Ubuntu 14.04
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_14.04
```

- 安装Windows系统

> 警告：你需要购买来自Microsoft或其合作伙伴正版系统授权并激活系统使用。继续安装即代表您知悉并已经购买正版授权。

```bash
# ①. 一键网络重装纯净Windows Server 2019（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2019
# ②. 一键网络重装纯净Windows Server 2016
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2016
# ③. 一键网络重装纯净Windows Server 2012 R2
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2012R2
# ④. 一键网络重装纯净Windows Server 2008 R2
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2008R2
# ⑤. 一键网络重装纯净Windows 7 Vienna
bash ~/Network-Reinstall-System-Modify.sh -Windows_7_Vienna
# ⑥. 一键网络重装纯净Windows Server 2003
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2003
```

- 安装裸机系统部署平台

> 仅适用于高端用户，手动安装任意系统。可通过网络ISO或iPXE安装任意系统。

```bash
bash ~/Network-Reinstall-System-Modify.sh -CXT_Bare-metal_System_Deployment_Platform
```

- 安装DD系统

> 如果您不了解这意味着什么，请不要进行操作。%ULR%应该替换为您自己的映像地址。

```bash
bash ~/Network-Reinstall-System-Modify.sh -DD "%URL%"
```


```bash
bash <(wget --no-check-certificate -qO- 'https://zhujiwiki.com/wp-content/uploads/2018/04/InstallNET.sh') -dd 'https://hao.zhujiwiki.com/dd/CentOS_7.X_NetInstallation.vhd.gz'
```

### moeclub

* [https://moeclub.org/2018/04/03/603/](https://moeclub.org/2018/04/03/603/)

> 适用于由GRUB引导的CentOS,Ubuntu,Debian系统

```bash
yum update
yum install -y xz openssl gawk file
# 下载脚本
wget --no-check-certificate 'https://moeclub.org/attachment/LinuxShell/InstallNET.sh'
# 给脚本授权
chmod a+x InstallNET.sh
# 一键网络重装纯净CentOS 7
bash InstallNET.sh -c 7.6.1810 -v 64 -a --mirror 'http://mirror.centos.org/centos'
```



## 软件组合

* [https://lamp.sh](https://lamp.sh)

* [https://oneinstack.com](https://oneinstack.com)

* [https://lnmp.org](https://lnmp.org)




## 后台运行

### `nohup`

- **只输出错误日志**

```bash
nohup python3 ./index.py >/dev/null 2>index.log &
```

- **不输出日志**

```bash
nohup python3 ./index.py >/dev/null 2>&1 &
```

- **Linux的3种重定向**

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

- **关于`/dev/null`文件**

>Linux下还有一个特殊的文件/dev/null，它就像一个无底洞，所有重定向到它的信息都会消失得无影无踪。
> 这一点非常有用，当我们不需要回显程序的所有信息时，就可以将输出重定向到/dev/null。



### `tmux`

> `tmux`是一款`Linux`下的终端复用工具，可以开启不同的终端窗口来将应用程序作为后台守护进程执行，
> 即使远程连接的SSH断开也不会影响程序的执行。

1. `yum install tmux`
2. 新建`tmux new -s 程序名称`；
3. 在新终端窗口中执行`./程序名称`即可；
4. 使用`Ctrl` + `B & D`快捷键可以退出当前终端窗口；
5. 使用`tmux attach -t 程序名称`可进入到之前的终端窗口；



### `supervisor`

> `supervisor`是用`Python`开发的一套通用的进程管理程序，能将一个普通的命令行进程变为后台`daemon`，
> 并监控进程状态，异常退出时能自动重启。

[http://supervisord.org](http://supervisord.org)

- 常见配置如下

```vim
[program:程序名称]
user=root
command=/var/www/main
stdout_logfile=/var/log/gf-app-stdout.log
stderr_logfile=/var/log/gf-app-stderr.log
autostart=true
autorestart=true
```

- 使用步骤如下

1. 使用`sudo service supervisor start`启动`supervisor`服务；
2. 创建应用配置文件`/etc/supervisor/conf.d/程序名称.conf`, 内容如上;
3. 使用`sudo supervisorctl`进入`supervisor`管理终端；
4. 使用`reload`重新读取配置文件并重启当前`supoervisor`管理的所有进程；
5. 也可以使用`update`重新加载配置(默认不重启)，随后使用`start 程序名称`启动指定的应用程序；
6. 随后可以使用`status`指令查看当前`supervisor`管理的进程状态；



### `setsid`

> `setsid`就是`set session id`的意思。表示该命令运行的进程是一个新的`session`。因此其父进程不属于当前终端。
> 实际上`setsid`运行的进程，其父进程id(ppid)为1(init进程的id)。

```bash
setsid python3 ./index.py >/dev/null 2>&1 &
```

- **语法**

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

- **安装**

```bash
yum install -y screen
```

- **创建一个screen会话**

```bash
screen -S 会话名称
```

- **隐藏并保留当前会话**

- 按`Ctrl+A`，再按`D`键

- **列出所有的会话列表**

```bash
screen -ls
```

- **恢复会话窗口**

```bash
screen -r 会话名称
```

- **关闭会话窗口**

```bash
exit
```

- **选项**

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





## Linux之间传输文件

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

- **遇到的问题**

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






## 性能及网速测试工具

### 一键测试脚本bench.sh

> 这个是秋水逸冰老大的脚本，用于测试网络下载及主机IO性能测试。是网络上普遍使用的脚本，界面很漂亮。

```bash
wget -qO- bench.sh | bash
```

### 91yun的网络测试脚本

> 这个来自91yun的脚本，主要测试的是网络ping值及路由。

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

> 可以一键检测服务器基本性能，以及网络去程回程的速度。功能相当完善。作者还一直在维护，
> 代码整合来自 SpeedTest 和 OldKing 的 SuperSpeed。

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

> ping使用了ICMP回送请求和回送应答报文。ping工具发出去的数据包没有通过tcp/udp协议，
> 但是要经过ip协议。ping命令计算的时间是数据包的往返总时间。

- **ping选项**

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


- **ping示例**

```
ping -c 3 -s 512 www.woytu.com  #表示向www.bnxb.com发送3个512B大小的数据包，来进行网络探测  
ping -f www.woytu.com           #快速ping
```


### traceroute

- **traceroute选项**

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

- **安装**

```bash
yum -y install traceroute
```

- **示例**

```bash
traceroute www.woytu.com
```

> 备注，使用traceroute返回的每行信息中有三个时间值，那是因为对于每个节点或者路由器，源端发了三次探测请求。



### tcptraceroute

- **tcptraceroute选项**

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

- **安装**

```bash
yum -y install tcptraceroute
```

- **示例**

```bash
tcptraceroute www.woytu.com 443 -n -q 1
```

### mtr

* [https://www.cnblogs.com/xzkzzz/p/7413177.html](https://www.cnblogs.com/xzkzzz/p/7413177.html)

* [https://www.jianshu.com/p/802010d54849](https://www.jianshu.com/p/802010d54849)

* [https://cloud.tencent.com/developer/article/1332118](https://cloud.tencent.com/developer/article/1332118)

* [http://winmtr.net/download-winmtr](http://winmtr.net/download-winmtr/)

> 在Linux中有一个更好的网络连通性判断工具，它可以结合ping | nslookup | tracert 来判断网络的相关特性，这个命令就是mtr。

> 注意：MTR使用的raw sockets是绕过TCP/IP协议，需要ROOT权限来执行，因此如果以普通用户身份来执行mtr会出错，
> 提示“mtr: unable to get raw sockets”

- **选项**

- `-n` 不探测主机名,no-dns不对IP地址做主机名解析
- `-r` 将mtr设置为报告模式，追踪结果以报告模式输出。若没有-r显现，那么将进入mtr的实时交互模式。  
- `-c` num 定义追踪的次数，每次是1s，且-c必须和-r配合使用，默认的10次。
- `-s` 用来指定ping数据包的大小
- `-a` 来设置发送数据包的IP地址 这个对一个主机由多个IP地址是有用的
- `-i` 使用这个参数来设置ICMP返回之间的要求默认是1秒
- `-4` IPv4
- `-6` IPv6

- **安装**

```bash
yum -y install mtr
```

- **使用格式**

```bash
mtr [options] hostname
```

- **示例**

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



## 解决网卡问题

### MTU

> MTU经过网卡传输的数据包的最大传输单元,传输设备的MTU值不规范造成传输失败的情况

### 查看MTU值

```bash
cat /sys/class/net/eth0/mtu
```

### 临时更改MTU值

```bash
echo "1476" > /sys/class/net/eth0/mtu
# 或者
# ifconfig 网口名 mtu 数值
ifconfig eth0 mtu 1476
```

### 永久更改MTU值

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