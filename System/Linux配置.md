# Linux配置

[[toc]]


# Flag

* 广告拦截 [https://github.com/pi-hole/pi-hole](https://github.com/pi-hole/pi-hole)
* [在 Linux 上安装字体：综合指南](https://linuxiac.com/how-to-install-fonts-on-linux)


```bash
# 查看/bin/sh指向的解释器
ls /bin/sh -al
# 重新配置dash，并选择“no”，即不使用dash
sudo dpkg-reconfigure dash
```


## 源码安装卸载

> 编译时的路径如果指定了`--prefix /usr/local/xxx` 直接`rm -rf /usr/local/xxx`即可。
>
> 没指定路径，那就到源码路径执行make uninstall，如果最初的编译文件夹被删除了，还可以重新下载、编译，然后删除

**如果源码被删除就查找并删除**

```bash
find / -name 软件名称
```

### checkinstall

> 通过`checkinstall`管理编译安装过程

**使用`checkinstall`编译安装**

```bash
./configure
make
checkinstall
```

- CheckInstall会完成以下任务

1. 调用`make install`，然后用`installwatch`监视、记录整个安装过程中添加的文件
2. 等到安装完成，把记录的文件打包，根据不同的系统创建安装包：`.rpm`或`.deb`
    - 注：安装包会保存在源代码目录，以便复制到其它机器安装，省去重复编译的麻烦。
3. 移除`make install`安装的文件
4. 调用系统安装工具来安装第2步创建的安装包：`rpm -i`或`dpkg -i`


**卸载`checkinstall`安装的软件**

```bash
CentOS: rpm -e package_name
Ubuntu: dpkg -r package_name
```



## 初次配置


### 修改时区为亚洲上海

```bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```


### 安装简体中文语言包

```bash
#查看系统当前使用语言包
locale
#查看系统拥有语言包
locale -a
```

> 如果没有zh_CN.utf8就需要安装简体中文语言包

```bash
yum -y install kde-l10n-Chinese
#glibc-common软件包包括用于GNU libc库的常见二进制文件，以及国家语言（locale）支持。
yum -y reinstall glibc-common
yum -y groupinstall chinese-support
```

### 设置中文utf8编码

**临时**

```bash
export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN.UTF-8
```

**长久**

- CenOS7修改`vi /etc/locale.conf`
- CentOS6修改`vi /etc/sysconfig/i18n`
- Ubuntu修改`vi /etc/default/locale`
    * [Ubuntu修改编码格式为中文](https://blog.csdn.net/qu_learner/article/details/104030765)

```bash
LANG="zh_CN.utf8"
LANGUAGE="zh_CN.UTF-8:zh_CN.utf8:zh_CN"
SUPPORTED="zh_CN.utf8:zh_CN:zh:en_US.utf8:en_US:en"
SYSFONT="lat0-sun16"
```

```bash
localectl set-locale LANG=zh_CN.utf8
```

### 安装字体

```bash
# 安装字体配置和字体索引指令
yum install -y fontconfig mkfontscale
sudo apt-get -y install fontconfig xfonts-utils
# 查看字体
fc-list
# 查看系统中已经安装的中文字体
fc-list :lang=zh
# 进入C:\Windows\Fonts把MSYH.TTF（微软雅黑字体文件）和simhei.tty（黑体常规）文件
# 上传到linux服务器/usr/share/fonts/my_fonts下

# 建立字体索引信息
mkfontscale
mkfontdir
# 更新字体缓存
fc-cache
```


### 设置VIM

**解决中文乱码问题**

```bash
vi /etc/vim/vimrc
# 在开头或者末尾添加
set fileencodings=utf-8,gbk,utf-16le,cp1252,iso-8859-15,ucs-bom
set termencoding=utf-8
set encoding=utf-8
```


**显示行号**

```bash
vi /etc/vimrc
vi /etc/virc
# 在开头或者末尾添加
set number
```



### SSH会话执行文件

- `/etc/motd` 可以在里面加入自己喜欢的任何欢迎信息，这段信息将会在登录成功后显示
- `/etc/profile` 中设定的变量(全局)的可以作用于任何用户
- `/.bashrc` 设定的变量(局部)只能继承`/etc/profile`中的变量,他们是”父子”关系
- `/~/.bash_profile` 当前用户登录时执行
- `/~/.bash_logout` 当前用户每次退出系统(退出shell)时执行
- `/~/.bashrc` 当前用户登录时以及每次打开新的shell时,该文件被读取

+ `export key=value` 设置变量
+ `source 文件路径` 刷新配置文件，立即执行（变量、程序、脚本）
+ `PATH=$PATH:` 全局变量，不同值之间用`:`分割，存储在`~/.bash_profile`里


> 为每一个运行bash shell的用户执行此文件.当bash shell被打开时, 该文件被读取（即每次新开一个终端，都会执行bashrc）。
>
> 只要在同一个shell界面，不管多少用户登录都只执行一次

```bash
vi /etc/profile
```

> 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行. 并从`/etc/profile.d`目录的配置文件中搜集shell的设置。
>
> 如果进入shell用普通用户登录后，再用su进入root用户那么将会被执行两次

```bash
vi /etc/bashrc
```



**欢迎信息**

* [https://github.com/taills/sysinfo](https://github.com/taills/sysinfo)

> 输入<kbd>shift</kbd> + <kbd>g</kbd>（就是大写的`G`）跳转到末尾添加以下内容

```bash
echo '=========================================================='
# 查看系统发行版信息
sed -n -e 's/PRETTY_NAME=//gp' /etc/os-release
# 查询内核版本
cat /proc/version
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

```bash
# 查看系统发行版信息
cat /etc/*release
cat /etc/os-release
cat /usr/lib/os-release
# 输出NAME和VERSION
source /etc/os-release && echo $PRETTY_NAME
sed -n -e 's/PRETTY_NAME=//gp' /etc/os-release
cat /etc/os-release | grep ^PRETTY_NAME= | awk -F= '{print $2}'
# 输出NAME部分
sed -n -e '/PRETTY_NAME/ s/^.*=\|"\| .*//gp' /etc/os-release
cat /etc/os-release | grep "PRETTY_NAME" | sed 's/PRETTY_NAME=//g' | sed 's/["]//g' | awk '{print $1}'
cat /etc/issue
cat /etc/issue.net
# 查询内核版本
cat /proc/version
cat /proc/sys/kernel/ostype /proc/sys/kernel/osrelease
dmesg | grep 'Linux version'
uname -sr
# 查看cpu相关信息（型号、主频、内核）
cat /proc/cpuinfo
# 查看CPU信息（型号）
cat /proc/cpuinfo | grep name | cut -f2 -d: | uniq -c
# 查看物理CPU个数
cat /proc/cpuinfo| grep "physical id"| sort| uniq| wc -l
grep 'physical id' /proc/cpuinfo | sort -u
# 查看每个物理CPU中core的个数(即核数)
cat /proc/cpuinfo| grep "cpu cores"| uniq
grep 'core id' /proc/cpuinfo | sort -u | wc -l
# 查看逻辑CPU的个数
cat /proc/cpuinfo| grep "processor"| wc -l
grep 'processor' /proc/cpuinfo | sort -u | wc -l
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

1. 创建软连接或者复制脚本到`/etc/init.d/`或者`/etc/rc.d/init.d/`（前者是后者的软连接）下

> 注意脚本文件开头一定要添加以下几行代码，否侧会提示`chkconfig`不支持

```bash
#!/bin/sh
# - 64 36 分别代表运行级别，启动优先权，关闭优先权
# chkconfig: - 64 36
# description: Supervisor Server
# processname: supervisord
```

2. 添加启动项

```bash
chkconfig --add 脚本名
chkconfig 脚本名 on
```

3. 检查是否设置成功

```bash
chkconfig --list | grep 脚本名
```




## 修改为root登录


```bash
# 重置root密码，其他账户都一样按此方法修改root为指定账户即可
sudo passwd root
echo root:密码 |sudo chpasswd root
# 切换到root账号
su
sudo -i
# 强制删除用户（会同时删除相关目录）
userdel -rf name
```

**修改sshd_config中的参数**

```bash
# 编辑sshd_config文件
vi /etc/ssh/sshd_config
```

- `PermitRootLogin` 修改为`yes` 允许远程root用户登入
- `PasswordAuthentication` 修改为`yes` 允许使用用户名密码方式登入

**或者执行命令直接修改**

```bash
# -r 支持扩展表达式，-i 直接修改文件内容
sudo sed -i 's/^#\?Port.*/Port 22/g' /etc/ssh/sshd_config;
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -ri 's/^#?(PasswordAuthentication)\s+(yes|no)/\1 yes/' /etc/ssh/sshd_config;
# 修改authorized_keys文件（即ssh证书），把ssh-rsa之前的内容都删除掉（酌情执行）
sudo sed -ri 's/^/#/;s/sleep 10"\s+/&\n/' /root/.ssh/authorized_keys;
```

**重启ssh**

```bash
sudo service sshd restart
sudo service ssh --full-restart
```



## 挂载存储卷


### 基本概念


1、 物理卷—–PV（Physical Volume）
物理卷在逻辑卷管理中处于最底层，它可以是实际物理硬盘上的分区，也可以是整个物理硬盘。

2、 卷组——–VG（Volumne Group）
卷组建立在物理卷之上，一个卷组中至少要包括一个物理卷，在卷组建立之后可动态添加物理卷到卷组中。一个逻辑卷管理系统工程中可以只有一个卷组，也可以拥有多个卷组。

3、 逻辑卷—–LV（Logical Volume）
逻辑卷建立在卷组之上，卷组中的未分配空间可以用于建立新的逻辑卷，逻辑卷建立后可以动态地扩展和缩小空间。系统中的多个逻辑卷要以属于同一个卷组，也可以属于不同的多个卷组。

4、 物理区域–PE（Physical Extent）
物理区域是物理卷中可用于分配的最小存储单元，物理区域的大小可根据实际情况在建立物理卷时指定。物理区域大小一旦确定将不能更改，同一卷组中的所有物理卷的物理区域大小需要一致。

5、 逻辑区域―LE（Logical Extent）
逻辑区域是逻辑卷中可用于分配的最小存储单元，逻辑区域的大小取决于逻辑卷所在卷组中的物理区域的大小。

6、 卷组描述区域—–（Volume Group Descriptor Area）
卷组描述区域存在于每个物理卷中，用于描述物理卷本身、物理卷所属卷组、卷组中的逻辑卷及逻辑卷中物理区域的分配等所有信息，卷组描述区域是在使用pvcreate建立物理卷时建立的。



### 物理卷命令

```bash
pvscan #在系统的所有磁盘中搜索已存在的物理卷
pvdisplay 物理卷全路径名称 #用于显示指定物理卷的属性。
pvdata 物理卷全路径名称 #用于显示物理卷的卷组描述区域信息，用于调试目的。
pvchange Cx|--allocation {y|n} 物理卷全路径名 #用于改变物理卷的分配许可设置物理卷的创建与删除命令
pvcreate 设备全路径名 #用于在磁盘或磁盘分区上创建物理卷初始化信息，以便对该物理卷进行逻辑卷管理。
pvmove 源物理卷全路径我[目的物理卷全路径名] #用于把某物理卷中的数据转移到同卷组中其他的特刊卷中。
```

### 卷组命令

```bash
vgscan #检测系统中所有磁盘
vgck [卷组名] #用于检查卷组中卷组描述区域信息的一致性。
vgdisplay [卷组名] #显示卷组的属性信息
vgrename 原卷组名 新卷组名
vgchange -a y|n [卷组名] #改变卷组的相应属性。是否可分配
vgchange -l 最大逻辑卷数 #卷组可容纳最大逻辑卷数
vgchange -x y|n [卷组名] #卷是否有效
vgmknodes [卷组名|卷组路径] #用于建立（重新建立）已有卷组目录和其中的设备文件卷组配置的备份与恢复命令
vgcfgbackup [卷组名] #把卷组中的VGDA信息备份到“/etc/lvmconf”目录中的文件
vgcfgrestore -n 卷组名 物理卷全路命名 #从备份文件中必得指定物理卷的信息卷组的建立与删除命令
vgcreate 卷组名 物理卷全路径名[物理卷全路径名]
vgmove 卷组名
```

### 卷组扩充与缩小

```bash
vgextend 卷组名 物理卷全路径名[物理卷全路径名]
vgreduce 卷组名 物理卷全路径名[物理卷全路径名]
```

### 卷组合并与拆分

```bash
vgsplit 现有卷组 新卷组 物理卷全路径名[物理卷全路径名]
```

### 卷组输入与输出

```bash
vgexport 卷组名
vgimport 卷组名 卷组中的物理卷[卷组中的物理卷]
```

### 逻辑卷命令

```bash
lvscan
lvdisplay 逻辑卷全路径名[逻辑卷全路径名]
lvrename 旧逻辑卷全路径名 新逻辑卷全路径名
lvrename 卷组名 旧逻辑卷名 新逻辑卷名
lvchange
e2fsadm -L +|- 逻辑卷增减量 逻辑卷全路径名
```

### 逻辑卷创建与删除

```bash
lvcreate
lvremove
```

### 逻辑卷扩充与缩小

```bash
lvextend -L|--size +逻辑卷大小增量 逻辑卷全路径名
lvreduce q -L|--size +逻辑卷减小量 逻辑卷全路径名
```

### 逻辑卷管理命令

```bash
lvmdiskscan #检测所有的SCSI、IDE等存储设备
lvmchange -R|--reset #复位逻辑卷管理器
lvmsadc [日志文件全路径名] #收信逻辑卷管理器读写统计信息，保存到日志文件中。
lvmsar 日志文件全路径名 #从lvmsadc命令生成的日志文件中读取并报告逻辑卷管理器的读写统计信息。
```




### 挂载方案一

> 直接挂载。但是是用逻辑卷的名称挂载。硬盘上的数据还在。

```bash
# 查看物理卷 pvscan
pvs
# 查看卷组 vgdisplay
vgs
# vgcreate vg名字 需要加入这个vg的pv分区
# vgextend  vg名称  pv分区
# 激活逻辑卷
vgchange -ay /dev/VolGroup00
# vgdisplay
# 创建分区
lvcreate -L 分区大小+单位  -n  lv分区名称   vg名称
# 删除分区
lvremove 分区位置(/dev/disk_lvm/name)
```

```bash
# 查看服务器物理分区，逻辑卷的信息
fdisk -l
# 查看逻辑卷的具体信息
lvdisplay
# 挂载
mount /dev/VolGroup/lv_home /store
```
 

### 挂载方案二

> 格式化再挂载。硬盘上的数据清除了。

```bash
# 直接格式化分区
mkfs -t ext4 -c /dev/sda3
# 挂载硬盘
mount /dev/sda3 /store
```


## 扩容


```bash
# 查看磁盘挂载信息
df -h
# 列出系统上所有的磁盘
lsblk
# 列出设备的uuid
blkid
# 查询文件系统状态
dumpe2fs
# 扩容
lvextend -L 50G /dev/mapper/ubuntu--vg-ubuntu--lv
# 全部空间都给这个盘
lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
# 重新计算磁盘大小
resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```


