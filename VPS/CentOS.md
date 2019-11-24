# CentOS


* [卸载软件](#卸载软件)
  * [RPM安装](#rpm安装)
  * [yum安装](#yum安装)
  * [源码编译安装](#源码编译安装)
    * [如果源码被删除就查找并删除](#如果源码被删除就查找并删除)
  * [`checkinstall`](#checkinstall)
    * [使用`checkinstall`编译安装](#使用checkinstall编译安装)
    * [卸载`checkinstall`安装的软件](#卸载checkinstall安装的软件)
* [初次配置](#初次配置)
  * [修改时区为亚洲上海](#修改时区为亚洲上海)
  * [查看系统语言](#查看系统语言)
  * [安装简体中文语言包](#安装简体中文语言包)
  * [设置中文utf8编码](#设置中文utf8编码)
    * [临时](#临时)
    * [长久](#长久)
  * [设置vi显示行号](#设置vi显示行号)
    * [编辑以下两个文件](#编辑以下两个文件)
    * [在开头或者末尾添加](#在开头或者末尾添加)
  * [欢迎信息](#欢迎信息)
  * [`profile`文件](#profile文件)
  * [ssh欢迎信息](#ssh欢迎信息)
* [`yum`操作](#yum操作)
  * [安装`EPEL`源](#安装epel源)
  * [更新yum源包](#更新yum源包)
  * [安装必要软件](#安装必要软件)
  * [三方工具](#三方工具)
    * [`figlet`](#figlet)
    * [`boxes`](#boxes)
    * [`Toilet`](#toilet)
* [`systemctl`](#systemctl)
* [`firewalld`](#firewalld)
  * [开启端口](#开启端口)
    * [配置`firewalld-cmd`](#配置firewalld-cmd)
* [rpm](#rpm)
  * [查询已安装软件包信息](#查询已安装软件包信息)
  * [查询已安装软件包安装位置](#查询已安装软件包安装位置)
  * [查看已安装软件依赖](#查看已安装软件依赖)
  * [查看已安装软件的配置文件](#查看已安装软件的配置文件)
  * [查询已经安装文件所属软件包](#查询已经安装文件所属软件包)
  * [安装软件包数量](#安装软件包数量)
* [内核升级](#内核升级)
  * [手动安装](#手动安装)
  * [一键安装脚本](#一键安装脚本)
  * [CentOS安装新版内核`headers`](#centos安装新版内核headers)
    * [卸载原版内核`headers`](#卸载原版内核headers)
  * [内核升级方法](#内核升级方法)
* [shadowsocks](#shadowsocks)
* [v2ray](#v2ray)
* [PAC](#pac)




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

### `checkinstall`

> 通过`checkinstall`管理编译安装过程

#### 使用`checkinstall`编译安装

```bash
./configure
make
checkinstall
```

- CheckInstall会完成以下任务

> 调用`make install`，然后用`installwatch`监视、记录整个安装过程中添加的文件

> 等到安装完成，把记录的文件打包，根据不同的系统创建安装包：`.rpm`或`.deb`

> 注：安装包会保存在源代码目录，以便复制到其它机器安装，省去重复编译的麻烦。

> 移除`make install`安装的文件

> 调用系统安装工具来安装第2步创建的安装包：`rpm -i`或`dpkg -i`

#### 卸载`checkinstall`安装的软件

```bash
CentOS: rpm -e package_name
Ubuntu: dpkg -r package_name
```

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
```

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

> 输入`shift + g`（就是大写的G）跳转到末尾添加以下内容

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

### 安装`EPEL`源

```bash
yum -y install epel-release 
```


### 更新yum源包

```bash
yum -y update
```


### 安装必要软件

```bash
yum install -y which gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel lrzsz lrzsz-devel p7zip p7zip-devel net-tools net-tools-devel vim vim-devel libaio libaio-devel
```

### 三方工具

#### `figlet`

> Linux下的命令行工具，我们经常会看到一些终端工具有一个字符Logo,这些Logo可以通过`Figlet`生成：

```bash
yum install -y figlet
```

> 居中显示用 `-c`
>
> 从文件导入用 `-p`
>> 比如从testFile导入`figlet -c -p < testFile`
>
> 还可以用`-w`指定宽度。
>
> 实时显示时间`watch -n1 "date '+%D%n%T' |figlet -k"`

#### `boxes`

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

#### `Toilet`

> 可以输出更丰富的样式，它比 `figlet` 命令的效果更有艺术感。

```bash
echo "Hello World" | toilet -f term -F border --gay
# 可以有颜色
toilet -f mono12 -F metal Linux
# 多种样式
while true; do echo "$(date '+%D %T' | toilet -f term -F border --gay)"; sleep 1; done
```




## `systemctl`

> `systemctl`是`CentOS7`的服务管理工具中主要的工具，它融合之前`service`和`chkconfig`的功能于一体。

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

```bash
# 查看mysql是否自启动
chkconfig --list | grep mysqld
# 设置开启自启动
chkconfig mysqld on
```

## `firewalld`

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

### 开启端口

```bash
# 开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 开启8080-8089的IP端
firewall-cmd --zone=public --add-port=8080-8089/tcp --permanent
# 开启3306端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

- 命令含义

> `--zone` 作用域

> `--add-port=80/tcp` 添加端口，格式为：端口/通讯协议

> `--permanent` 永久生效，没有此参数重启后失效

#### 配置`firewalld-cmd`

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


## rpm

### 查询已安装软件包信息

```bash
rpm -qi 软件名
```

### 查询已安装软件包安装位置

```bash
rpm -ql 软件名
```

### 查看已安装软件依赖

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

### 安装软件包数量

```bash
rpm -qa | wc -l 
```


## 内核升级


* [OpenVZ魔改BBR的一键安装脚本](https://github.com/nanqinlang-tcp/tcp_nanqinlang-test)

* [安装命令参考](https://github.com/tcp-nanqinlang/wiki/wiki/lkl-haproxy)


### 手动安装

- 检查当前CentOS系统版本

```bash
cat /etc/redhat-release
```

- 检查当前CentOS系统内核版本

```bash
uname -sr
```

- 运行yum命令升级

> CentOS中update命令可以一次性更新所有软件(包括系统版本)到最新版本。

```bash
# 先清除所有
yum clean all
# 再升级
yum update -y
# 升级内核
yum update kernel  -y
```

- 在`CentOS7.x`上启用`ELRepo`仓库

```bash
# 首先导入elrepo的key
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
# 安装elrepo的yum
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm
```

- 查看内核相关包

> 仓库启用后，你可以使用下面的命令列出可用的系统内核相关包，查看内核相关包

```bash
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```

- 安装最新的主线稳定内核

```bash
yum -y --enablerepo=elrepo-kernel install kernel-ml
# 或者以下命令安装最新的主线稳定内核
yum -y --enablerepo=elrepo-kernel install kernel-ml.x86_64 kernel-ml-devel.x86_64
```

- 查看可用内核

```bash
cat /boot/grub2/grub.cfg |grep menuentry 
```

- 设置内核启动项

> 替换刚刚查看出来的内核名字执行，比如：`grub2-set-default 'CentOS Linux (4.15.13-1.el7.elrepo.x86_64) 7 (Core)'`
>> `grub2-set-default '内核名字'`

- 查看内核启动项是否设置成功

```bash
grub2-editenv list
```

- 重启

```bash
reboot
```

- 检查当前CentOS系统内核版本

```bash
uname -sr
```

- 查看多余的内核

```bash
rpm -qa | grep kernel
```

- 删除多余的内核

```bash
yum remove 内核名字
```

### 一键安装脚本

* [秋水逸冰](https://github.com/teddysun/across)

- 下载并执行脚本

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```

> 安装完成后，脚本会提示需要重启 VPS，输入`y`并回车后重启。

- 查看内核版本

> 显示为最新版就表示OK了
>
> 重启完成后，进入VPS，验证一下是否成功安装最新内核并开启`TCP BBR`


```bash
uname -r
```

```bash
sysctl net.ipv4.tcp_available_congestion_control
```

> 返回值一般为`net.ipv4.tcp_available_congestion_control = bbr cubic reno`

> 或者为：`net.ipv4.tcp_available_congestion_control = reno cubic bbr`

```bash
sysctl net.ipv4.tcp_congestion_control
```

> 返回值一般为 `net.ipv4.tcp_congestion_control = bbr`

```bash
sysctl net.core.default_qdisc
```

> 返回值一般为 `net.core.default_qdisc = fq`

```bash
lsmod | grep bbr
```

> 返回值有`tcp_bbr`模块即说明`bbr`已启动。

> 注意：并不是所有的都会有此返回值，若没有也属正常。

### CentOS安装新版内核`headers`

```bash
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```

- 根据`CentOS`版本的不同，此时一般会出现类似于以下的错误提示：

> `Error: kernel-ml-headers conflicts with kernel-headers-2.6.32-696.20.1.el6.x86_64`

> `Error: kernel-ml-headers conflicts with kernel-headers-3.10.0-693.17.1.el7.x86_64`

#### 卸载原版内核`headers`

> 需要先卸载原版内核`headers`，然后再安装最新版内核`headers`。

```bash
yum remove kernel-headers -y
```

> 注意：有时候这么操作还会卸载一些对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的。
> 不过不要紧，我们可以在安装完最新版内核 headers 后再重新安装回来即可。

### 内核升级方法

- CentOS系统升级内核

```bash
yum -y install kernel-ml kernel-ml-devel
```

- 升级`headers`

```bash
yum -y install kernel-ml-headers
```

- 执行命令

```bash
grub2-set-default 0
```

> 最后，重启VPS即可。



## shadowsocks

* [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases)

* [shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)

## v2ray

* [v2ray-tools](https://www.v2ray.com/awesome/tools.html)

* [v2ray-core](https://github.com/v2ray/v2ray-core/releases)

* [v2rayNG-android](https://github.com/2dust/v2rayNG/releases)

* [v2rayN-Windows](https://github.com/2dust/v2rayN/releases)

* [V2RayW-Windows](https://github.com/Cenmrev/V2RayW/releases)

* [v2ray教程](https://yuan.ga/v2ray-complete-tutorial/)

* [multi-v2ray](https://github.com/Jrohy/multi-v2ray)

* [https://github.com/wulabing/V2Ray_ws-tls_bash_onekey](https://github.com/wulabing/V2Ray_ws-tls_bash_onekey)

* [https://github.com/ssrsub/ssr/tree/master](https://github.com/ssrsub/ssr/tree/master)

* [https://www.ssrtool.com](https://www.ssrtool.com)

* [https://github.com/xiaotianwl/v2ray_vps/](https://github.com/xiaotianwl/v2ray_vps/)

## PAC

* [https://github.com/lbp0200/mono_pac](https://github.com/lbp0200/mono_pac)

* [https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)

* [https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/other/pac.txt](https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/other/pac.txt)




