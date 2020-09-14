# Linux配置


[[toc]]



# Flag

* 各个版本控件支持库 [https://pkgs.org](https://pkgs.org)




## 源码安装卸载软件

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

- `vi /etc/motd`这个文件，可以在里面加入自己喜欢的任何欢迎信息，这段信息将会在登录成功后显示！
- `/etc/profile`中设定的变量(全局)的可以作用于任何用户,
- `/.bashrc`设定的变量(局部)只能继承`/etc/profile`中的变量,他们是”父子”关系


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

```bash
# 当root用户登录时执行
vi /root/.bash_profile
# 当每次root用户退出系统(退出bash shell)时,执行该文件
vi /root/.bash_logout
# 当root用户登录时以及每次打开新的shell时,该该文件被读取。
vi /root/.bashrc
```



### ssh欢迎信息

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
```



## 修改为root登录


```bash
# 重置root密码，其他账户都一样按此方法修改root为指定账户即可
sudo passwd root
echo root:密码 |sudo chpasswd root
# 切换到root账号
su
sudo -i
```

**修改sshd_config中的参数**

```bash
# 编辑sshd_config文件
vi /etc/ssh/sshd_config
```

- `PermitRootLogin` 修改为`yes`
- `PasswordAuthentication` 修改为`yes`

**或者执行命令直接修改**

```bash
# -r 支持扩展表达式，-i 直接修改文件内容
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -ri 's/^#?(PasswordAuthentication)\s+(yes|no)/\1 yes/' /etc/ssh/sshd_config;
# 修改authorized_keys文件（即ssh证书），把ssh-rsa之前的内容都删除掉
sudo sed -ri 's/^/#/;s/sleep 10"\s+/&\n/' /root/.ssh/authorized_keys;
```

**重启ssh**

```bash
sudo service sshd restart
```




## 物理资源占用

> 各Linux服务器主流发行版物理资源占用（磁盘和内存），`df -h && free -h`

- CentOS 7.6 64位

```bash
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        485M     0  485M   0% /dev
tmpfs           496M     0  496M   0% /dev/shm
tmpfs           496M  424K  496M   1% /run
tmpfs           496M     0  496M   0% /sys/fs/cgroup
/dev/vda1        50G  1.8G   46G   4% /
tmpfs           100M     0  100M   0% /run/user/0

              total        used        free      shared  buff/cache   available
Mem:           991M         68M        631M        428K        290M        787M
Swap:            0B          0B          0B
```

- Debian 9.0 64位

```bash
Filesystem      Size  Used Avail Use% Mounted on
udev            424M     0  424M   0% /dev
tmpfs            87M  1.8M   86M   3% /run
/dev/vda1        50G  923M   46G   2% /
tmpfs           435M     0  435M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           435M     0  435M   0% /sys/fs/cgroup
tmpfs            87M     0   87M   0% /run/user/0

              total        used        free      shared  buff/cache   available
Mem:           868M         32M        734M        1.8M        101M        717M
Swap:            0B          0B          0B
```

- Ubuntu Server 18.04.1 LTS 64位

```bash
Filesystem      Size  Used Avail Use% Mounted on
udev            462M     0  462M   0% /dev
tmpfs            99M  5.2M   94M   6% /run
/dev/vda1        50G  2.3G   45G   5% /
tmpfs           493M     0  493M   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           493M     0  493M   0% /sys/fs/cgroup
tmpfs            99M     0   99M   0% /run/user/500

              total        used        free      shared  buff/cache   available
Mem:           985M         95M        355M        5.1M        533M        743M
Swap:            0B          0B          0B
```



