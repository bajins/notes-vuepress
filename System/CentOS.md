# CentOS


[[toc]]


## Flag

* RHEL衍生版本升级 [https://github.com/oamg/leapp](https://github.com/oamg/leapp)
    * [https://almalinux.org/elevate](https://almalinux.org/elevate)
* [https://github.com/upgrades-migrations/redhat-upgrade-tool](https://github.com/upgrades-migrations/redhat-upgrade-tool)
* [Upgrading CentOS 7 to Stream 9](https://blog.motofans.club/post/upgrade-centos-7-to-centos-stream-9.html)
* [如何使用 Leapp 为 RHEL PAYG 虚拟机执行升级](https://learn.microsoft.com/zh-cn/troubleshoot/azure/virtual-machines/linux/leapp-upgrade-process-rhel-7-and-8)
* [使用 Leapp 升级 Oracle Linux](https://docs.oracle.com/zh-cn/learn/ol-linux-leapp/index.html)
    * CentOS切换Oracle脚本 [https://github.com/oracle/centos2ol](https://github.com/oracle/centos2ol)
* [https://github.com/Ink-33/OhMyStream9](https://github.com/Ink-33/OhMyStream9)




**下载almalinux所有RPM包**

```bash
# 下载 Packages 页面的 HTML 内容，提取所有 RPM 文件名（包含 dnf 或 python）
curl -s https://repo.almalinux.org/almalinux/8/BaseOS/x86_64/os/Packages/ | grep -oP 'href="\K[^"]+\.rpm' | grep -E 'dnf|*python' | grep -v 'x86_64' > rpm-list.txt
while read -r pkg; do
  curl -O https://repo.almalinux.org/almalinux/8/BaseOS/x86_64/os/Packages/"$pkg"
done < rpm_list.txt

cat rpm-list.txt | xargs -I {} -P 8 curl -O https://repo.almalinux.org/almalinux/8/BaseOS/x86_64/os/Packages/{}
```



**升级GLBC后删除目录导致系统崩溃**

* [/lib64/libc.so.6 错误导致的系统崩溃](https://www.cnblogs.com/hefeng2014/p/17916585.html)

```bash
sln /usr/lib64/ld-2.17.so /usr/lib64/ld-linux-x86-64.so.2
sln /usr/lib64/libc-2.17.so /usr/lib64/libc.so.6
sln /usr/lib64/libdl-2.17.so /usr/lib64/libdl.so.2
sln /usr/lib64/libpthread-2.17.so /usr/lib64/libpthread.so.0
```

**yum、dnf、python都被卸载后如何装回dnf**

> yum依赖dnf，dnf依赖python，当rpm还在时如何救回dnf

* [https://repo.almalinux.org/almalinux/8/BaseOS/x86_64/os/Packages/](https://repo.almalinux.org/almalinux/8/BaseOS/x86_64/os/Packages/)
* [https://rpmfind.net/linux/rpm2html/search.php](https://rpmfind.net/linux/rpm2html/search.php)


- [Centos Stream9下重新安装yum和DNF以及python3](https://cloud.tencent.com/developer/article/2442683)
- [rpm: /lib64/liblzma.so.5: version `XZ_5.1.2alpha' not found (required by /lib/librpmio.so.3)](https://stackoverflow.com/questions/47633870/rpm-lib64-liblzma-so-5-version-xz-5-1-2alpha-not-found-required-by-lib-li)


```bash
# 忽略依赖强制安装python及dnf相关依赖
rpm -i --nodeps --force rpm的地址
```




## YUM和RPM操作

- `yum -y install 包名`（支持*） ：自动选择y，全自动
- `yum install 包名`（支持*） ：手动选择y or n
- `yum remove 包名`（不支持*）
- `rpm -ivh 包名`（支持*）：安装rpm包
- `rpm -e 包名`（不支持*）：卸载rpm包
- `yum info nginx`(查看当前版本可选)
- `yum list installed | grep 包名`（不支持*）：确认是否安装过包
- `yum -y update` 更新yum源包


```bash
# 安装EPEL源
yum -y install epel-release 
```

```bash
# 查询已安装软件包信息
rpm -qi 软件名
# 查询已安装软件包安装位置
rpm -ql 软件名
# 查看已安装软件依赖
rpm -qR 软件名
# 查看已安装软件的配置文件
rpm -qc 软件名
# 查询已安装文件所属软件包
rpm -qf 文件名的绝对路径
# 安装软件包数量
rpm -qa | wc -l 
rpm -qa | grep 软件名称
rpm -e --nodeps 列出的软件全名
```


## systemctl

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



## 内核升级

```bash
# 检查当前CentOS系统版本
cat /etc/redhat-release
# 检查当前CentOS系统内核版本
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
# 重启
reboot
# 检查当前CentOS系统内核版本
uname -sr
# 查看多余的内核
rpm -qa | grep kernel
# 删除多余的内核
yum remove 内核名字
```



## 一键安装BBR

+ [https://github.com/ylx2016/Linux-NetSpeed](https://github.com/ylx2016/Linux-NetSpeed)

* [秋水逸冰](https://github.com/teddysun/across)

- 下载并执行脚本

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
```

> 安装完成后，脚本会提示需要重启 VPS，输入`y`并回车后重启。

- 查看内核版本

> 显示为最新版就表示OK了，重启完成后，进入VPS，验证一下是否成功安装最新内核并开启`TCP BBR`


```bash
uname -r
sysctl net.ipv4.tcp_available_congestion_control
```

> 返回值一般为`net.ipv4.tcp_available_congestion_control = bbr cubic reno`，
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

### 安装新版内核headers

```bash
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```

- 根据`CentOS`版本的不同，此时一般会出现类似于以下的错误提示：
    - `Error: kernel-ml-headers conflicts with kernel-headers-2.6.32-696.20.1.el6.x86_64`
    - `Error: kernel-ml-headers conflicts with kernel-headers-3.10.0-693.17.1.el7.x86_64`

**卸载原版内核`headers`**

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





## 三方工具

```bash
yum install -y which gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel lrzsz \
lrzsz-devel p7zip p7zip-devel net-tools net-tools-devel vim vim-devel libaio libaio-devel
```

**`figlet`**

> Linux下的命令行工具，我们经常会看到一些终端工具有一个字符Logo,这些Logo可以通过`Figlet`生成：

```bash
yum install -y figlet
```

- 居中显示用 `-c`
- 从文件导入用 `-p`， 比如从testFile导入`figlet -c -p < testFile`
- 还可以用`-w`指定宽度。
- 实时显示时间`watch -n1 "date '+%D%n%T' |figlet -k"`


**`boxes`**

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

**`Toilet`**

> 可以输出更丰富的样式，它比 `figlet` 命令的效果更有艺术感。

```bash
echo "Hello World" | toilet -f term -F border --gay
# 可以有颜色
toilet -f mono12 -F metal Linux
# 多种样式
while true; do echo "$(date '+%D %T' | toilet -f term -F border --gay)"; sleep 1; done
```



## Chrome

* [chrome其他安装方式](https://intoli.com/blog/installing-google-chrome-on-centos)

- [http://dist.control.lth.se/public/CentOS-7/x86_64/google.x86_64/](http://dist.control.lth.se/public/CentOS-7/x86_64/google.x86_64/)


**rpm包安装**


```bash
# 下载rpm包
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm
# 安装依赖
yum install -y lsb libXScrnSaver libappindicator-gtk3 liberation-fonts libvulkan*\
 atk cups-libs gtk3 libXcomposite libXdamage libXrandr libdrm mesa-libgbm alsa-lib libX11 nss

# 安装chrome
rpm -ivh google-chrome-stable_current_x86_64.rpm
# 或者使用yum安装chrome
yum install -y google-chrome-stable_current_x86_64.rpm

# 查看版本
google-chrome --version

# 安装chromedriver：一个用来和chrome交互的接口
yum install -y chromedriver
# 查看安装的chromedriver版本
chromedriver --version
```


**Cent OS7安装Google Chrome**

```bash
wget http://dist.control.lth.se/public/CentOS-7/x86_64/google.x86_64/google-chrome-stable-125.0.6422.141-1.x86_64
yum install -y google-chrome-stable-125.0.6422.141-1.x86_64.rpm
```


**在线安装**

- 创建repo文件

```bash
vi /etc/yum.repos.d/google-chrome.repo
```

- 添加内容

```conf
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
```

- 安装

```bash
yum install -y google-chrome-stable
# 如果安装失败
yum install google-chrome-stable --nogpgcheck
```



