# CentOS7内核升级


## 目录
* [目录](#目录)
* [KVM安装最新内核并开启BBR](#kvm安装最新内核并开启bbr)
  * [手动安装](#手动安装)
  * [一键安装脚本](#一键安装脚本)
  * [查看内核版本](#查看内核版本)
  * [CentOS安装新版内核`headers`](#centos安装新版内核headers)
  * [内核升级方法](#内核升级方法)
* [shadowsocks](#shadowsocks)
* [v2ray](#v2ray)
* [PAC](#pac)




[OpenVZ魔改BBR的一键安装脚本](https://github.com/nanqinlang-tcp/tcp_nanqinlang-test)

[安装命令参考](https://github.com/tcp-nanqinlang/wiki/wiki/lkl-haproxy)

## KVM安装最新内核并开启BBR

### 手动安装
#### 检查当前CentOS系统版本
```bash
cat /etc/redhat-release
```
#### 检查当前CentOS系统内核版本
```bash
uname -sr
```
#### 运行yum命令升级
> CentOS中update命令可以一次性更新所有软件(包括系统版本)到最新版本。

```bash
# 先清除所有
yum clean all
# 再升级
yum update -y
# 升级内核
yum update kernel  -y
```

#### 在CentOS7.x上启用ELRepo仓库
```bash
# 首先导入elrepo的key
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
# 安装elrepo的yum
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm
```
#### 查看内核相关包
> 仓库启用后，你可以使用下面的命令列出可用的系统内核相关包，查看内核相关包

```bash
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available
```
#### 安装最新的主线稳定内核
```bash
yum -y --enablerepo=elrepo-kernel install kernel-ml
# 或者以下命令安装最新的主线稳定内核
yum -y --enablerepo=elrepo-kernel install kernel-ml.x86_64 kernel-ml-devel.x86_64
```
#### 查看可用内核
```bash
cat /boot/grub2/grub.cfg |grep menuentry 
```
#### 设置内核启动项

> 替换刚刚查看出来的内核名字执行，比如：`grub2-set-default 'CentOS Linux (4.15.13-1.el7.elrepo.x86_64) 7 (Core)'`
>> `grub2-set-default '内核名字'`

#### 查看内核启动项是否设置成功
```bash
grub2-editenv list
```

#### 重启机器
```bash
reboot
```

#### 检查当前CentOS系统内核版本
```bash
uname -sr
```

#### 查看多余的内核
```bash
rpm -qa | grep kernel
```

#### 删除多余的内核
```bash
yum remove 内核名字
```

### 一键安装脚本

[秋水逸冰](https://github.com/teddysun/across)

#### 下载并执行脚本
```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```
> 安装完成后，脚本会提示需要重启 VPS，输入`y`并回车后重启。

### 查看内核版本
> 显示为最新版就表示OK了
>
> 重启完成后，进入VPS，验证一下是否成功安装最新内核并开启`TCP BBR`

```bash
uname -r
```


```bash
sysctl net.ipv4.tcp_available_congestion_control
```
#### 返回值一般为

> `net.ipv4.tcp_available_congestion_control = bbr cubic reno`
> 
> 或者为：
> 
> `net.ipv4.tcp_available_congestion_control = reno cubic bbr`

```bash
sysctl net.ipv4.tcp_congestion_control
```
#### 返回值一般为

> `net.ipv4.tcp_congestion_control = bbr`
>
> `sysctl net.core.default_qdisc`

#### 返回值一般为

> `net.core.default_qdisc = fq`

```bash
lsmod | grep bbr
```
> 返回值有 tcp_bbr 模块即说明 bbr 已启动。
> 
> 注意：并不是所有的 VPS 都会有此返回值，若没有也属正常。

### CentOS安装新版内核`headers`
> 本来打算在脚本里直接安装 kernel-ml-headers，但会出现和原版内核 headers 冲突的问题。
> 因此在这里添加一个脚本执行完后，手动安装最新版内核 headers 之教程。

#### 执行以下命令
```bash
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```
> 根据 CentOS 版本的不同，此时一般会出现类似于以下的错误提示：
>> `Error: kernel-ml-headers conflicts with kernel-headers-2.6.32-696.20.1.el6.x86_64`
>>
>> `Error: kernel-ml-headers conflicts with kernel-headers-3.10.0-693.17.1.el7.x86_64`

#### 卸载原版内核`headers`
> 需要先卸载原版内核`headers`，然后再安装最新版内核`headers`。

```bash
yum remove kernel-headers -y
```

> 注意：有时候这么操作还会卸载一些对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的。
> 不过不要紧，我们可以在安装完最新版内核 headers 后再重新安装回来即可。

#### 再次执行安装命令。
```bash
yum --enablerepo=elrepo-kernel -y install kernel-ml-headers
```
> 成功安装后，再把那些之前对内核 headers 依赖的安装包，比如 gcc、gcc-c++ 之类的再安装一次即可。

> 为什么要安装最新版内核 headers 呢？
>> 这是因为`shadowsocks-libev`版有个`tcp fast open`功能，如果不安装的话，这个功能是无法开启的。

### 内核升级方法
#### CentOS系统升级内核
```bash
yum -y install kernel-ml kernel-ml-devel
```
#### 升级`headers`
```bash
yum -y install kernel-ml-headers
```
#### CentOS6执行命令
```bash
sed -i 's/^default=.*/default=0/g' /boot/grub/grub.conf
```
#### CentOS 7执行命令
```bash
grub2-set-default 0
```

#### 最后，重启VPS即可。



## shadowsocks
[shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases)

[shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)

## v2ray
[v2ray-tools](https://www.v2ray.com/awesome/tools.html)

[v2ray-core](https://github.com/v2ray/v2ray-core/releases)

[v2rayNG-android](https://github.com/2dust/v2rayNG/releases)

[v2rayN-Windows](https://github.com/2dust/v2rayN/releases)

[V2RayW-Windows](https://github.com/Cenmrev/V2RayW/releases)

[v2ray教程](https://yuan.ga/v2ray-complete-tutorial/)

[multi-v2ray](https://github.com/Jrohy/multi-v2ray)


## PAC
[https://github.com/lbp0200/mono_pac](https://github.com/lbp0200/mono_pac)

[https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)

[https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/other/pac.txt](https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/other/pac.txt)