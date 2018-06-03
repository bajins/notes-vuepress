# OpenVZ魔改BBR的一键安装脚本 by [南琴浪博客](https://github.com/nanqinlang-tcp/tcp_nanqinlang-test)

## 安装命令
### Debian、Ubuntu 64 bit：
```
1. wget https://raw.githubusercontent.com/nanqinlang-tcp/tcp_nanqinlang/master/Rinetd/bash/tcp_nanqinlang-rinetd-debianorubuntu.sh
2. bash tcp_nanqinlang-rinetd-debianorubuntu.sh
```

### CentOS 7 64 bit:
```
1. wget https://raw.githubusercontent.com/nanqinlang-tcp/tcp_nanqinlang/master/Rinetd/bash/tcp_nanqinlang-rinetd-centos.sh
2. bash tcp_nanqinlang-rinetd-centos.sh
```
## 使用说明
### 运行安装命令后会出现以下三个选项：
### 1、安装 rinetd-bbr

#### 由于Rinetd OpenVZ魔改BBR一键安装脚本不能批量端口或端口段加速，所以在安装过程当中会提示需要输入端口号，我们根据自己需要输入即可，如果需要开启多个端口加速，那就用空格隔开。使用一键安装包安装完成后会自动开启rinetd-bbr，并且之后重启VPS后也会自动开启。

### 2、检查 rinetd-bbr 运行状态

#### 第二个选项是检测rinetd-bbr是否正常运行，如果返回“[Info] tcp_nanqinlang is running !”表示成功安装。

### 3、卸载 rinetd-bbr

#### 卸载 rinetd-bbr通过字面意思大家都知道是做什么的了，它可以自动卸载开机启动项目和iptables raw表，无需重启VPS就能达到完全卸载，无残留项目。



# 一键安装最新内核并开启 BBR 脚本 by [秋水逸冰](https://teddysun.com/489.html)



# 各类VPS网络加速软件一键安装脚本整理 by [荒岛](https://lala.im/638.html)

https://github.com/shadowsocks/shadowsocks-windows/releases

https://github.com/shadowsocks/shadowsocks-android/releases

http://www.vspeed.org/?vs
