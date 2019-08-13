# CentOS

## 目录

* [yum源](#yum源)
  * [Git](#git)
* [重装系统](#重装系统)
  * [moeclub](#moeclub)
* [卸载软件](#卸载软件)
  * [RPM安装](#rpm安装)
  * [yum安装](#yum安装)
  * [源码编译安装](#源码编译安装)
  * [checkinstall](#checkinstall)
* [初次配置](#初次配置)
  * [修改时区为亚洲上海](#修改时区为亚洲上海)
  * [查看系统语言](#查看系统语言)
  * [安装简体中文语言包](#安装简体中文语言包)
  * [设置中文utf8编码](#设置中文utf8编码)
  * [设置vi显示行号](#设置vi显示行号)
  * [欢迎信息](#欢迎信息)
  * [`profile`文件](#profile文件)
  * [ssh欢迎信息](#ssh欢迎信息)
* [`yum`操作](#yum操作)
  * [安装并启用 EPEL 源](#安装并启用-epel-源)
  * [更新yum源包](#更新yum源包)
  * [which命令](#which命令)
  * [安装lrzsz](#安装lrzsz)
  * [安装make](#安装make)
  * [gcc](#gcc)
  * [安装](#安装)
  * [安装`pcre`重写rewrite](#安装pcre重写rewrite)
  * [zlib](#zlib)
  * [7z压缩软件](#7z压缩软件)
  * [openssl](#openssl)
  * [`ifconfig` 及 `netstat`](#ifconfig-及-netstat)
  * [vim](#vim)
  * [libaio](#libaio)
* [一条命令安装全部](#一条命令安装全部)
* [三方工具](#三方工具)
  * [`figlet`](#figlet)
  * [`boxes`](#boxes)
  * [`Toilet`](#toilet)



## yum源
### Git
```bash
yum install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
# 或者
wget http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
rpm -ivh wandisco-git-release-7-2.noarch.rpm
```
```bash
curl https://setup.ius.io | sh
# 或者
yum install -y epel-release  
rpm -ivh https://centos7.iuscommunity.org/ius-release.rpm
# 查看git包版本
yum list git2u
# 安装
yum -y install git2u
```


## 重装系统

### Network-Reinstall-System-Modify

[https://github.com/MeowLove/Network-Reinstall-System-Modify](https://github.com/MeowLove/Network-Reinstall-System-Modify)

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

```bash
1. 下载SHELL脚本（通过root用户运行）

wget --no-check-certificate -qO ~/Network-Reinstall-System-Modify.sh 'https://www.cxthhhhh.com/tech-tools/Network-Reinstall-System-Modify/Network-Reinstall-System-Modify.sh' && chmod a+x ~/Network-Reinstall-System-Modify.sh

2. 安装系统（任选其一）

【安装Linux系统】
①. 一键网络重装纯净CentOS 7（推荐）
bash ~/Network-Reinstall-System-Modify.sh -CentOS_7
②. 一键网络重装纯净CentOS 6
bash ~/Network-Reinstall-System-Modify.sh -CentOS_6
③. 一键网络重装纯净Debian 10（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Debian_10
④. 一键网络重装纯净Debian 9
bash ~/Network-Reinstall-System-Modify.sh -Debian_9
⑤. 一键网络重装纯净Debian 8
bash ~/Network-Reinstall-System-Modify.sh -Debian_8
⑥. 一键网络重装纯净Ubuntu 18.04（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_18.04
⑦. 一键网络重装纯净Ubuntu 16.04
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_16.04
⑧. 一键网络重装纯净Ubuntu 14.04
bash ~/Network-Reinstall-System-Modify.sh -Ubuntu_14.04

【安装Windows系统】
*警告：你需要购买来自Microsoft或其合作伙伴正版系统授权并激活系统使用。继续安装即代表您知悉并已经购买正版授权。
①. 一键网络重装纯净Windows Server 2019（推荐）
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2019
②. 一键网络重装纯净Windows Server 2016
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2016
③. 一键网络重装纯净Windows Server 2012 R2
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2012R2
④. 一键网络重装纯净Windows Server 2008 R2
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2008R2
⑤. 一键网络重装纯净Windows 7 Vienna
bash ~/Network-Reinstall-System-Modify.sh -Windows_7_Vienna
⑥. 一键网络重装纯净Windows Server 2003
bash ~/Network-Reinstall-System-Modify.sh -Windows_Server_2003

【安装裸机系统部署平台】
*仅适用于高端用户，手动安装任意系统。可通过网络ISO或iPXE安装任意系统。
bash ~/Network-Reinstall-System-Modify.sh -CXT_Bare-metal_System_Deployment_Platform

【安装DD系统】
*如果您不了解这意味着什么，请不要进行操作。%ULR%应该替换为您自己的映像地址。
bash ~/Network-Reinstall-System-Modify.sh -DD "%URL%"
```


```bash
bash <(wget --no-check-certificate -qO- 'https://zhujiwiki.com/wp-content/uploads/2018/04/InstallNET.sh') -dd 'https://hao.zhujiwiki.com/dd/CentOS_7.X_NetInstallation.vhd.gz'
```

### moeclub
[https://moeclub.org/2018/04/03/603/](https://moeclub.org/2018/04/03/603/)

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

## 卸载软件
### RPM安装
```bash
rpm -qa | grep 软件名称
rpm -e --nodeps 列出的软件全名
```
### yum安装
```bash
yum remove 软件名
```

### 源码编译安装
> 编译时的路径如果指定了`--prefix /usr/local/xxx` 直接`rm -rf /usr/local/xxx`即可。
>
> 没指定路径，那就到源码路径执行make uninstall，如果最初的编译文件夹被删除了，还可以重新下载、编译，然后删除

#### 如果源码被删除就查找并删除
```bash
find / -name 软件名称
```
### checkinstall

> 通过checkinstall管理编译安装过程

#### 1、使用checkinstall编译安装
```bash
./configure
make
checkinstall
```
#### CheckInstall会完成以下任务：
> 调用make install，然后用installwatch监视、记录整个安装过程中添加的文件
>
> 等到安装完成，把记录的文件打包，根据不同的系统创建安装包：.rpm或.deb
>
> 注：安装包会保存在源代码目录，以便复制到其它机器安装，省去重复编译的麻烦。
>
> 移除make install安装的文件
>
> 调用系统安装工具来安装第2步创建的安装包：rpm -i或dpkg -i

#### 2、卸载checkinstall安装的软件
```bash
CentOS: rpm -e package_name
Ubuntu: dpkg -r package_name
```

----------------------------------------------------------------------
## 初次配置
### 修改时区为亚洲上海
```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
### 查看系统语言
```bash
#查看系统当前使用语言包
locale
#查看系统拥有语言包
locale -a
```
### 安装简体中文语言包

> 如果没有zh_CN.utf8就需要安装简体中文语言包

```bash
yum -y install kde-l10n-Chinese
#glibc-common软件包包括用于GNU libc库的常见二进制文件，以及国家语言（locale）支持。
yum -y reinstall glibc-common
yum -y groupinstall chinese-support
```
### 设置中文utf8编码
#### 临时
```bash
export LANG=zh_CN.utf8
```
#### 长久
> CenOS7修改`vi /etc/locale.conf`文件
>
> CentOS6修改`vi /etc/sysconfig/i18n`文件

```bash
LANG="zh_CN.utf8"
LANGUAGE="zh_CN.UTF-8:zh_CN.utf8:zh_CN"
SUPPORTED="zh_CN.utf8:zh_CN:zh:en_US.utf8:en_US:en"
SYSFONT="lat0-sun16"
```

```bash
localectl  set-locale LANG=zh_CN.utf8
```
### 设置vi显示行号
#### 编辑以下两个文件
```bash
vi /etc/vimrc
vi /etc/virc
```
#### 在开头或者末尾添加
```bash
set number
```
### 欢迎信息
> `vi /etc/motd`这个文件，可以在里面加入自己喜欢的任何欢迎信息，这段信息将会在登录成功后显示！

### `profile`文件
> 为每一个运行bash shell的用户执行此文件.当bash shell被打开时,
> 该文件被读取（即每次新开一个终端，都会执行bashrc）。
>
> 只要在同一个shell界面，不管多少用户登录都只执行一次

```bash
vi /etc/profile
```
> 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.
> 并从`/etc/profile.d`目录的配置文件中搜集shell的设置。
>
> 如果进入shell用普通用户登录后，再用su进入root用户那么将会被执行两次

```bash
vi /etc/bashrc
```
> 当root用户登录时执行

```bash
vi /root/.bash_profile
> 当每次root用户退出系统(退出bash shell)时,执行该文件
```bash
vi /root/.bash_logout
```
> 当root用户登录时以及每次打开新的shell时,该该文件被读取。

```bash
vi /root/.bashrc
```
> `/etc/profile`中设定的变量(全局)的可以作用于任何用户,
> `/.bashrc`设定的变量(局部)只能继承`/etc/profile`中的变量,他们是”父子”关系


### ssh欢迎信息
> 输入`shift + g`也就是大写的G跳转到末尾添加以下内容：
```bash
echo '=========================================================='
# 查询系统版本
cat /etc/redhat-release
# 查询内核版本
uname -sr
echo '=========================================================='
# 查询目前所有文件系统的可用空间及使用情形
df -h
echo '=========================================================='
# 查询内存使用情况
free -h
echo '=========================================================='
# 切换到home文件夹
cd /home
```

*****************************************************************


## `yum`操作
```bash
yum -y install 包名（支持*） ：自动选择y，全自动

yum install 包名（支持*） ：手动选择y or n

yum remove 包名（不支持*）

rpm -ivh 包名（支持*）：安装rpm包

rpm -e 包名（不支持*）：卸载rpm包

yum info nginx(查看当前版本可选)

yum list installed | grep 包名（不支持*）：确认是否安装过包
```

### 安装并启用 EPEL 源
```bash
yum -y install epel-release 
```
### 更新yum源包
```bash
yum -y update
```
### which命令

> which命令 用于查找并显示给定命令的绝对路径，环境变量PATH中
保存了查找命令时需要遍历的目录。which指令会在环境变量$PATH设
置的目录里查找符合条件的文件。也就是说，使用which命令，就可
以看到某个系统命令是否存在，以及执行的到底是哪一个位置的命令。
```bash
yum -y install which
```

### 安装lrzsz
> 一款在linux里可代替ftp上传和下载的程序。
```bash
yum  -y install lrzsz
```
#### 使用命令：
> 上传：`rz`
>
> 下载：`sz`

### 安装make
```bash
yum -y install gcc automake autoconf libtool make
```

### gcc
##### 查看系统是否已安装gcc编译器
```bash
gcc -v
```
##### gcc升级
```bash
yum update gcc
```
### 安装
> g++编译环境gcc-g++开发库

```bash
yum -y install gcc gcc-c++
```
### 安装`pcre`重写rewrite
```bash
yum -y install pcre
```
### zlib
```bash
yum -y install zlib
```
### 7z压缩软件
```bash
yum -y install p7zip
```
#### 常用命令

> `7za e 文件名`   解压到当前目录下,不保留原来的目录结构
>
> `7za x 文件名`   解压到当前目录下,但保留原来的目录结构

### openssl
```bash
yum -y install openssl
```
### `ifconfig` 及 `netstat`
```bash
yum -y install net-tools
```
### vim
```bash
yum -y install vim
```
### libaio
```bash
yum -y install libaio
```

## 一条命令安装全部
```bash
yum install -y which gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel lrzsz lrzsz-devel p7zip p7zip-devel net-tools net-tools-devel vim vim-devel libaio libaio-devel
```

## 三方工具

### `figlet`
> Linux下的命令行工具，我们经常会看到一些终端工具有一个字符Logo,这些Logo可以通过Figlet生成：
```bash
yum install -y figlet
```
> 居中显示用 `-c`
>
> 从文件导入用 `-p`
>> 比如从testfile导入`figlet -c -p < testfile`
>
> 还可以用`-w`指定宽度。
>
> 实时显示时间`watch -n1 "date '+%D%n%T' |figlet -k"`

### `boxes`
> 这个工具提供了 n 种样式，例如各种动物等，然后你输入的字符就放在这些图案的内部空白处。
```bash
yum -y install boxes
```
> 使用boxes -l列出所有的样式。
 ```bash
echo [text] | boxes -d [style name]
# 比如dog
echo "Hello World" | boxes -d dog
```
### `Toilet`
> 可以输出更丰富的样式，它比 `figlet` 命令的效果更有艺术感。

```bash
echo "Hello World" | toilet -f term -F border --gay
# 可以有颜色
toilet -f mono12 -F metal Linux
# 多种样式
while true; do echo "$(date '+%D %T' | toilet -f term -F border --gay)"; sleep 1; done
```

