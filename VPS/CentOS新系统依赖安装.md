新centOS需要安装的工具：

查看当前文件夹下空间占用
du -h --max-depth=1 文件夹路径


修改时区为亚洲上海
```
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
查看系当前语言包
```
locale
```
查看系统拥有语言包
```
locale -a
```
安装简体中文语言包
```
yum -y install kde-l10n-Chinese
glibc-common软件包包括用于GNU libc库的常见二进制文件，以及国家语言（locale）支持。
yum -y reinstall glibc-common
```
设置中文utf8编码（临时）：
```
export LANG=zh_CN.utf8
```
方法（一）修改vim /etc/locale.conf文件内容为（长久）：
```
LANG="zh_CN.utf8"
LANGUAGE="zh_CN.UTF-8:zh_CN.utf8:zh_CN"
SUPPORTED="zh_CN.utf8:zh_CN:zh:en_US.utf8:en_US:en"
SYSFONT="lat0-sun16"
```

方法（二）（长久）:
```
localectl  set-locale LANG=zh_CN.utf8
```


vi /etc/motd这个文件，可以在里面加入自己喜欢的任何欢迎信息，这段信息将会在登录成功后显示！

简单的修改下配置文件可以做到每次登陆服务器自动显示磁盘情况：
```
vi /root/.bash_profile
```
在末尾添加以下内容：
```
echo '=========================================================='
cat /etc/redhat-release
uname -sr
echo '=========================================================='
df -lh
echo '=========================================================='
du -h --max-depth=1 /www/wwwroot/
```


配置文件
（1）/etc/profile： 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行. 并从/etc/profile.d目录的配置文件中搜集shell的设置。

（2）/etc/bashrc: 为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取（即每次新开一个终端，都会执行bashrc）。

（3）~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次。默认情况下,设置一些环境变量,执行用户的.bashrc文件。

（4）~/.bashrc: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取。

（5） ~/.bash_logout: 当每次退出系统(退出bash shell)时,执行该文件. 另外,/etc/profile中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承 /etc/profile中的变量,他们是”父子”关系。

（6）~/.bash_profile: 是交互式、login 方式进入 bash 运行的~/.bashrc 是交互式 non-login 方式进入 bash 运行的通常二者设置大致相同，所以通常前者会调用后者。

===================================================================

yum 的安装方式
yum -y install 包名（支持*） ：自动选择y，全自动
yum install 包名（支持*） ：手动选择y or n
yum remove 包名（不支持*）
rpm -ivh 包名（支持*）：安装rpm包
rpm -e 包名（不支持*）：卸载rpm包
yum info nginx(查看当前版本可选)

yum list installed | grep 包名（不支持*）：确认是否安装过包


安装并启用 EPEL 源
```
yum -y install epel-release 
```
------------------------------------------------------------
更新yum源包
```
yum -y update
```
------------------------------------------------------------
which命令

which命令 用于查找并显示给定命令的绝对路径，环境变量PATH中
保存了查找命令时需要遍历的目录。which指令会在环境变量$PATH设
置的目录里查找符合条件的文件。也就是说，使用which命令，就可
以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。

yum -y install which

------------------------------------------------------------
安装lrzsz，是一款在linux里可代替ftp上传和下载的程序。：

yum  -y install lrzsz

命令：
上传：rz
下载：sz

------------------------------------------------------------
安装make：
yum -y install gcc automake autoconf libtool make

------------------------------------------------------------
查看系统是否已安装gcc编译器：
gcc -v

gcc版本较老，我们可以使用yum命令对其进行升级对其进行升级：
yum update gcc

安装g++ 编译环境gcc g++ 开发库:
yum -y install gcc gcc-c++

------------------------------------------------------------
安装pcre 重写rewrite
yum -y install pcre

------------------------------------------------------------
zlib gzip压缩，可直接安装一个7z
yum -y install zlib

------------------------------------------------------------
7z 7z压缩软件
yum -y install p7zip

常用命令：
7za e 文件名   解压到当前目录下,不保留原来的目录结构

7za x 文件名   解压到当前目录下,但保留原来的目录结构

------------------------------------------------------------
openssl
yum -y install openssl

------------------------------------------------------------
ifconfig 及 netstat
yum -y install net-tools

------------------------------------------------------------
vim
yum -y install vim

------------------------------------------------------------
libaio
yum -y install libaio

------------------------------------------------------------

以上全是安装依赖，其实一条命令行全部都可以搞定：
```
yum install -y which gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel lrzsz lrzsz-devel p7zip p7zip-devel net-tools net-tools-devel vim vim-devel libaio libaio-devel
```
------------------------------------------------------------

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
