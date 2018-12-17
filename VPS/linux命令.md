# 目录
* [系统操作](#系统操作)
* [定时任务](#定时任务)
* [文件和文件夹操作](#文件和文件夹操作)
* [防火墙](#防火墙)
* [解决网卡问题](#解决网卡问题)

************************************************************
# 系统操作
## 查看邮箱
```shell
cat /var/spool/mail/root
```

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
************************************************************************
# 定时任务
### crontab命令常用于Unix和类Unix的操作系统之中，用于设置周期性被执行的指令
### 创建脚本文件

##### 清理内存脚本
```shell
vi rememory.sh
```
##### 复制[rememory.sh](/VPS/rememory.sh)中的代码到服务器上，保存并授权
```shell
chmod a+x rememory.sh
```
##### 清理日志脚本
```shell
vi cleanLog.sh
```
##### 复制[cleanLog.sh](/VPS/cleanLog.sh)中的代码到服务器上，保存并授权
```shell
chmod a+x cleanLog.sh
```
##### 清理MySQL日志脚本
```shell
vi delete_file.py
```
##### 复制[delete_file.py](/VPS/delete_file.py)中的代码到服务器上，保存并授权
```shell
chmod a+x delete_file.py
```

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
# 每天凌晨1点30分执行删除MySQL日志文件，并且输出到日志
30 1 * * *  python /home/delete_file.py 文件带后缀的路径 保留的文件个数 >> /home/delete_file.log 2>&1
# 每隔3天,1点30分执行，并且输出到日志
30 1 */3 * * /bin/bash 文件路径 >> 输出日志文件路径 2>&1
#设置每20天清理一次（日志清理太频繁不方便以后按日志排错）
0 0 */20 * * /bin/bash /home/cleanLog.sh >> /home/cleanLog.log 2>&1
```
```diff
-在linux中的直接执行shell脚本可以用相对路径找到文件,但是如果通过计划任务crontab执行shell脚本时，却不能通过相对路径找到文件!
+可以使用pwd命令获取目录`pwd`'/文件名'
```

*****************************************************************************************

# 文件和文件夹操作

## 服务器之间传输文件
```shell
#首先进入需要搭建web服务器的目录，然后在输入下面的命令
#注意：不填端口号则默认使用8000端口。
#linux
python -m SimpleHTTPServer port
#windows
python -m http.server port

#服务开启后，地址协议类型加IP/目录下的文件： 
wget host:port/file 就可以下载了
```
### scp
#### [shell脚本](/VPS/scp.sh)使用前请安装expect包：`yum -y install expect expect-devel`
#### 【优点】简单方便，安全可靠；支持限速参数，不占资源，不会提高多少系统负荷
#### 【缺点】不支持排除目录 
#### 【用法】scp就是secure copy，是用来进行远程文件拷贝的。数据传输使用 ssh，并且和ssh 使用相同的认证方式，提供相同的安全保证 。 
#### 命令参数：
```
-1  强制scp命令使用协议ssh1 
-2  强制scp命令使用协议ssh2 
-4  强制scp命令只使用IPv4寻址 
-6  强制scp命令只使用IPv6寻址 
-B  使用批处理模式（传输过程中不询问传输口令或短语） 
-C  允许压缩。（将-C标志传递给ssh，从而打开压缩功能） 
-p 保留原文件的修改时间，访问时间和访问权限。 
-q  不显示传输进度条。 
-r  递归复制整个目录。 
-v 详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。  
-c cipher  以cipher将数据传输进行加密，这个选项将直接传递给ssh。  
-F ssh_config  指定一个替代的ssh配置文件，此参数直接传递给ssh。 
-i identity_file  从指定文件中读取传输时使用的密钥文件，此参数直接传递给ssh。   
-l limit  限定用户所能使用的带宽，以Kbit/s为单位。    
-o ssh_option  如果习惯于使用ssh_config(5)中的参数传递方式，  
-P port  注意是大写的P, port是指定数据传输用到的端口号  
-S program  指定加密传输时所使用的程序。此程序必须能够理解ssh(1)的选项。
```
```shell
scp [参数] <源地址（用户名@IP地址或主机名）>:<文件路径> <目的地址（用户名 @IP 地址或主机名）>:<文件路径> 
举例： 
# 把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
scp -P -p /home/work/source.txt work@192.168.0.10:/home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下
scp -P -p work@192.168.0.10:/home/work/source.txt /home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
scp -P -p work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/

scp -P -p -r /home/work/sourcedir work@192.168.0.10:/home/work/  #拷贝文件夹，加-r参数 
scp -P -p -r /home/work/sourcedir work@www.myhost.com:/home/work/  #使用主机名 
scp -P -p -r -v /home/work/sourcedir work@www.myhost.com:/home/work/  #显示详情，加-v参数

# 将本地A主机文件复制到B主机
scp -P -p ./files/yum.log 192.168.214.187:/tmp/demo/

#将远程主机复制到本地
scp -P -p 192.168.214.187:/tmp/demo/f3.log /tmp/files/
```

### rsync
#### 【优点】功能强大，操作类似scp，支持排除目录，支持限速参数；还支持本地复制。 
#### 【缺点】会耗系统资源，占用I/O
#### 【用法】rsync是类unix系统下的数据镜像备份工具，从软件的命名上就可以看出来了——remote sync。它的操作方式和scp和相似，但是比scp强大很多。使用双冒号分割主机名和文件路径时，是使用rsync服务器
```shell
#把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
rsync /home/work/source.txt work@192.168.0.10:/home/work/

#把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下
rsync work@192.168.0.10:/home/work/source.txt /home/work/

#把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
rsync work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/

#拷贝文件夹，加-r参数
rsync -r /home/work/sourcedir work@192.168.0.10:/home/work/

#使用主机名
rsync -r /home/work/sourcedir work@www.myhost.com:/home/work/

#显示详情，加-v参数
rsync -r -v /home/work/sourcedir work@www.myhost.com:/home/work/

#排除子目录，注意：--exclude后面的路径不能为绝对路径，必须为相对路径才可以，否则匹配不上，就不会被排除掉。
rsync -r -v --exclude sourcedir/notinclude /home/work/sourcedir work@www.myhost.com:/home/work/
```

## 查找大文件
```shell
#查找从根目录下查找大于100M的文件，并显示文件的具体大小再进行排序
find / -type f -size +100M -print0 | xargs -0 du -h | sort -nr

#查找从根目录下查找大于1G的文件，并显示文件的具体大小再进行排序
find / -type f -size +1G -print0 | xargs -0 du -h | sort -nr

#有时候排列的顺序并不完全是按大小一致，这个是因为du命令的参数h所致，可以使用MB来显示
find / -type f -size +100M -print0 | xargs -0 du -hm | sort -nr

#查找从根目录下查找大于100M的文件，并显示文件的属性信息
find / -type f -size +100M -print0 | xargs -0 ls -l

#查看当前文件夹下的文件夹占用大小并排序
du -h --max-depth=2 | sort -n

#有时候排列的顺序并不完全是按大小一致，这个是因为du命令的参数h所致，可以使用MB来显示
du -hm --max-depth=2 | sort -n

#找出当前文件夹下最大的12个文件夹
du -hm --max-depth=2 | sort -nr | head -12

#查看home文件夹下的所有文件夹占用大小并排序
du -hm --max-depth=2 /home/ | sort -nr
```

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
```shell
cd ~     #进行当前用户的家目录
cd 

cd - #进入上次目录

cd .. #进入上一级目录

cd . #进入当前目录
```

## 压缩
### 打包的时候我们要排除 tomcat/logs 目录，命令如下：
```shell
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs tomcat
```
### 如果要排除多个目录，增加 --exclude 即可，如下命令排除logs和libs两个目录及文件xiaoshan.txt：
```shell
tar -zcvf tomcat.tar.gz --exclude=tomcat/logs --exclude=tomcat/libs --exclude=tomcat/xiaoshan.txt tomcat
```
```diff
- 注意：在使用tar的--exclude命令排除打包时，末尾不能加“/”或者路径为绝对路径，否则还是会把排除目录以及其下的文件打包进去。
```
### 7zip
```sehll
#安装7zip
yum –y install p7zip
#解压到当前目录下,不保留原来的目录结构
7za e 文件名
#解压到当前目录下,但保留原来的目录结构
7za x 文件名
```
*********************************************************************************************

# 防火墙

查看firewalld状态，发现当前是dead状态，即防火墙未开启。
```
systemctl status firewalld
```
开启防火墙，没有任何提示即开启成功。
```
systemctl start firewalld
```
1.查看已开放的端口(默认不开放任何端口)
```
firewall-cmd --list-ports
```
2.开启端口
firewall-cmd --zone=public(作用域) --add-port=80/tcp(端口和访问类型) --permanent(永久生效)
开启80端口
```
firewall-cmd --zone=public --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=8080-8089/tcp --permanent
```
开启3306端口
```
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```
命令含义：

--zone #作用域

--add-port=80/tcp #添加端口，格式为：端口/通讯协议

--permanent #永久生效，没有此参数重启后失效

3.重启防火墙
```
firewall-cmd --reload
```
4.停止防火墙
```
systemctl stop firewalld.service
```
5.禁止防火墙开机启动
```
systemctl disable firewalld.service
```
6.开机禁止启动防火墙：
```
systemctl disable firewalld.service
```
7.删除端口
```
firewall-cmd --zone= public --remove-port=80/tcp --permanent
```

--------------------------------------------------------------------
CentOS7使用firewalld打开关闭防火墙与端口

1、firewalld的基本使用

启动： systemctl start firewalld

查看状态： systemctl status firewalld 

停止： systemctl disable firewalld

禁用： systemctl stop firewalld
 
2.systemctl是CentOS7的服务管理工具中主要的工具，它融合之前service和chkconfig的功能于一体。

启动一个服务：systemctl start firewalld.service

关闭一个服务：systemctl stop firewalld.service

重启一个服务：systemctl restart firewalld.service

显示一个服务的状态：systemctl status firewalld.service

在开机时启用一个服务：systemctl enable firewalld.service

在开机时禁用一个服务：systemctl disable firewalld.service

查看服务是否开机启动：systemctl is-enabled firewalld.service

查看已启动的服务列表：systemctl list-unit-files|grep enabled

查看启动失败的服务列表：systemctl --failed

3.配置firewalld-cmd

查看版本： firewall-cmd --version

查看帮助： firewall-cmd --help

显示状态： firewall-cmd --state

查看所有打开的端口：firewall-cmd --zone=public --list-ports

更新防火墙规则： firewall-cmd --reload

查看区域信息:  firewall-cmd --get-active-zones

查看指定接口所属区域： firewall-cmd --get-zone-of-interface=eth0

拒绝所有包：firewall-cmd --panic-on

取消拒绝状态： firewall-cmd --panic-off

查看是否拒绝： firewall-cmd --query-panic

-------------------------------------------------------------------
查看本机关于IPTABLES的设置情况

iptables -L -n


iptable iptable-service

#先检查是否安装了iptables

service iptables status

#安装iptables

yum install -y iptables

#升级iptables

yum update iptables 

#安装iptables-services

yum install iptables-services


#查看iptables现有规则

iptables -L -n

#先允许所有,不然有可能会杯具

iptables -P INPUT ACCEPT

#清空所有默认规则

iptables -F

#清空所有自定义规则

iptables -X

#所有计数器归0

iptables -Z

#允许来自于lo接口的数据包(本地访问)

iptables -A INPUT -i lo -j ACCEPT

#开放22端口

iptables -A INPUT -p tcp --dport 22 -j ACCEPT

#开放21端口(FTP)

iptables -A INPUT -p tcp --dport 21 -j ACCEPT

#开放80端口(HTTP)

iptables -A INPUT -p tcp --dport 80 -j ACCEPT

#开放443端口(HTTPS)

iptables -A INPUT -p tcp --dport 443 -j ACCEPT

#允许ping

iptables -A INPUT -p icmp --icmp-type 8 -j ACCEPT

#允许接受本机请求之后的返回数据 RELATED,是为FTP设置的

iptables -A INPUT -m state --state  RELATED,ESTABLISHED -j ACCEPT

#其他入站一律丢弃

iptables -P INPUT DROP

#所有出站一律绿灯

iptables -P OUTPUT ACCEPT

#所有转发一律丢弃

iptables -P FORWARD DROP

#如果要添加内网ip信任（接受其所有TCP请求）

iptables -A INPUT -p tcp -s 45.96.174.68 -j ACCEPT

#过滤所有非以上规则的请求

iptables -P INPUT DROP

#要封停一个IP，使用下面这条命令：

iptables -I INPUT -s ***.***.***.*** -j DROP

#要解封一个IP，使用下面这条命令:

iptables -D INPUT -s ***.***.***.*** -j DROP


====================================================================

查询已安装软件包的信息:

rpm -qi 软件名

查询已安装软件包都安装到何处:

rpm -ql 软件名

查看已安装软件所依赖的软件包及文件:
rpm -qR 软件名

查看已安装软件的配置文件:

rpm -qc 软件名

查询已经安装的文件属于哪个软件包:

rpm -qf 文件名的绝对路径

共安装了多少个软件包:

rpm -qa | wc -l 


********************************************
# 解决网卡问题
## MTU
#### 传输设备的MTU值不规范造成传输失败的情况，后统一更改网卡MTU值为1476 后解决
### 查看MTU值
```sehll
cat /sys/class/net/eth0/mtu
```
### 更改MTU值
```shell
echo “1476” > /sys/class/net/eth0/mtu
# 或者
ifconfig eth0 mtu 1476
```









