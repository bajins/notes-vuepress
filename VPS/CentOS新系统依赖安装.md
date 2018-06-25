# 新centOS需要安装的工具：


修改时区为亚洲上海
```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
查看系当前语言包
```shell
locale
```
查看系统拥有语言包
```shell
locale -a
```
安装简体中文语言包
```shell
yum -y install kde-l10n-Chinese
glibc-common软件包包括用于GNU libc库的常见二进制文件，以及国家语言（locale）支持。
yum -y reinstall glibc-common
```
设置中文utf8编码（临时）：
```shell
export LANG=zh_CN.utf8
```
方法（一）修改vi /etc/locale.conf文件内容为（长久）：
```shell
LANG="zh_CN.utf8"
LANGUAGE="zh_CN.UTF-8:zh_CN.utf8:zh_CN"
SUPPORTED="zh_CN.utf8:zh_CN:zh:en_US.utf8:en_US:en"
SYSFONT="lat0-sun16"
```

方法（二）（长久）:
```shell
localectl  set-locale LANG=zh_CN.utf8
```
设置vi显示行号,编辑以下两个文件：
```shell
vi /etc/vimrc
vi /etc/virc
```
在开头或者末尾添加：
```shell
set number
```

vi /etc/motd这个文件，可以在里面加入自己喜欢的任何欢迎信息，这段信息将会在登录成功后显示！

简单的修改下配置文件可以做到每次登陆服务器自动显示磁盘情况：
```shell
#此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行. 并从/etc/profile.d目录的配置文件中搜集shell的设置。
vi /etc/
#为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取（即每次新开一个终端，都会执行bashrc）。
vi /etc/profile

#当root用户登录时执行
vi /root/.bash_profile
#当每次root用户退出系统(退出bash shell)时,执行该文件
vi /root/.bash_logout
#当root用户登录时以及每次打开新的shell时,该该文件被读取。
vi /root/.bashrc

#/etc/profile中设定的变量(全局)的可以作用于任何用户,/.bashrc设定的变量(局部)只能继承/etc/profile中的变量,他们是”父子”关系
```
在末尾添加以下内容：
```shell
echo '=========================================================='
#查询系统版本
cat /etc/redhat-release
#查询内核版本
uname -sr
echo '=========================================================='
#查询目前所有文件系统的可用空间及使用情形
df -h
echo '=========================================================='
#查询内存使用情况
free -h
echo '=========================================================='
#统计文件夹总数大小
du -sh /usr
du -sh /home
du -sh /data
du -sh /var
du -sh /www
#循环列出所有文件和文件夹所使用的空间
du -h --max-depth=1 /www/root
echo '=========================================================='
```


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

