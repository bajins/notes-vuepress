检查当前 CentOS 系统版本
cat /etc/redhat-release

检查当前 CentOS 系统内核版本
uname -sr

运行yum命令升级,CentOS中update命令可以一次性更新所有软件(包括系统版本)到最新版本。
```shell
# 先清除所有
yum clean all
# 再升级
yum update
```

在 CentOS 7.x 上启用 ELRepo 仓库
```sehll
# 首先导入elrepo的key
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
# 安装elrepo的yum
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm
```
仓库启用后，你可以使用下面的命令列出可用的系统内核相关包，查看内核相关包
```sell
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```
接下来，安装最新的主线稳定内核
```sehll
yum --enablerepo=elrepo-kernel install kernel-ml
```
或者以下命令安装最新的主线稳定内核
```shell
yum -y --enablerepo=elrepo-kernel install kernel-ml.x86_64 kernel-ml-devel.x86_64
```
查看可用内核
```sehll
cat /boot/grub2/grub.cfg |grep menuentry 
```
设置内核启动项,替换刚刚查看出来的内核名字执行，比如：grub2-set-default 'CentOS Linux (4.15.13-1.el7.elrepo.x86_64) 7 (Core)'
grub2-set-default '内核名字'

查看内核启动项是否设置成功查看内核启动项是否设置成功
```sehll
grub2-editenv list
```
查看内核的启动项
```sehll
grub2-editenv list
```

重启机器
```sehll
reboot
```

检查当前 CentOS 系统内核版本
```shell
uname -sr
```

查看多余的内核
```sehll
rpm -qa | grep kernel
```

删除多余的内核
```sehll
yum remove 内核名字
```

----------------------------------------------------
## 使用[秋水逸冰](https://github.com/teddysun/across)的一键安装脚本
### 使用root用户登录，运行以下命令：
```sehll
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```
##### 安装完成后，脚本会提示需要重启 VPS，输入 y 并回车后重启。
### 重启完成后，进入 VPS，验证一下是否成功安装最新内核并开启 TCP BBR，输入以下命令：
```sehll
uname -r
```
### 查看内核版本，显示为最新版就表示 OK 了
```sehll
sysctl net.ipv4.tcp_available_congestion_control
```
#### 返回值一般为：
```diff
+net.ipv4.tcp_available_congestion_control = bbr cubic reno
# 或者为：
+net.ipv4.tcp_available_congestion_control = reno cubic bbr
```
```sehll
sysctl net.ipv4.tcp_congestion_control
```
#### 返回值一般为：
```diff
+net.ipv4.tcp_congestion_control = bbr
```
```sehll
sysctl net.core.default_qdisc
```
#### 返回值一般为：
```diff
+net.core.default_qdisc = fq
```
```sehll
lsmod | grep bbr
```
##### 返回值有 tcp_bbr 模块即说明 bbr 已启动。注意：并不是所有的 VPS 都会有此返回值，若没有也属正常。

### CentOS 下最新版内核 headers 安装方法
##### 本来打算在脚本里直接安装 kernel-ml-headers，但会出现和原版内核 headers 冲突的问题。因此在这里添加一个脚本执行完后，手动安装最新版内核 headers 之教程。
### 执行以下命令
```sehll
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```
#### 根据 CentOS 版本的不同，此时一般会出现类似于以下的错误提示：
```diff
-Error: kernel-ml-headers conflicts with kernel-headers-2.6.32-696.20.1.el6.x86_64
-Error: kernel-ml-headers conflicts with kernel-headers-3.10.0-693.17.1.el7.x86_64
```
### 因此需要先卸载原版内核 headers ，然后再安装最新版内核 headers。执行命令：
```sehll
yum remove kernel-headers
```
##### 确认无误后，输入 y，回车开始卸载。注意，有时候这么操作还会卸载一些对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的。不过不要紧，我们可以在安装完最新版内核 headers 后再重新安装回来即可。
### 卸载完成后，再次执行上面给出的安装命令。
```sehll
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```
#### 成功安装后，再把那些之前对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的再安装一次即可。

#### 为什么要安装最新版内核 headers 呢？
##### 这是因为 shadowsocks-libev 版有个 tcp fast open 功能，如果不安装的话，这个功能是无法开启的。

### 内核升级方法
#### 如果是 CentOS 系统，执行如下命令即可升级内核：
```sehll
yum -y install kernel-ml kernel-ml-devel
```
#### 如果你还手动安装了新版内核 headers ，那么还需要以下命令来升级 headers ：
```shell
yum -y install kernel-ml-headers
```
#### CentOS 6 的话，执行命令：
```sehll
sed -i 's/^default=.*/default=0/g' /boot/grub/grub.conf
```
#### CentOS 7 的话，执行命令：
```sehll
grub2-set-default 0
```
#### 如果是 Debian/Ubuntu 系统，则需要手动下载最新版内核来安装升级。
#### 去这里下载最新版的内核 deb 安装包。
##### 如果系统是 64 位，则下载 amd64 的 linux-image 中含有 generic 这个 deb 包；
##### 如果系统是 32 位，则下载 i386 的 linux-image 中含有 generic 这个 deb 包；
##### 安装的命令如下（以最新版的 64 位 4.12.4 举例而已，请替换为下载好的 deb 包）：
```sehll
dpkg -i linux-image-4.12.4-041204-generic_4.12.4-041204.201707271932_amd64.deb
```
#### 安装完成后，再执行命令：
```sehll
/usr/sbin/update-grub
```
最后，重启 VPS 即可。
