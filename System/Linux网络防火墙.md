# Linux网络防火墙

[[toc]]


## Flag

* 网络测试 [https://github.com/topics/speedtest](https://github.com/topics/speedtest)
* [https://github.com/Microsoft/ntttcp-for-linux](https://github.com/Microsoft/ntttcp-for-linux)
* [https://github.com/mellanox/sockperf](https://github.com/mellanox/sockperf)
* [https://iperf.fr](https://iperf.fr)
    * [https://sourceforge.net/projects/iperf](https://sourceforge.net/projects/iperf)
    * [https://sourceforge.net/projects/iperf2](https://sourceforge.net/projects/iperf2)
    * [https://github.com/search?q=iPerf3](https://github.com/search?q=iPerf3)
    * [https://github.com/esnet/iperf](https://github.com/esnet/iperf)
* [https://github.com/n-st/nench](https://github.com/n-st/nench)
* 测速 [https://github.com/adolfintel/speedtest](https://github.com/adolfintel/speedtest)
* [https://www.speedtest.net](https://www.speedtest.net)
* [https://www.nperf.com/zh_CN](https://www.nperf.com/zh_CN)
* [https://speed.cloudflare.com](https://speed.cloudflare.com)
* [https://fast.com](https://fast.com)
* [https://test.ustc.edu.cn](https://test.ustc.edu.cn)
* [https://fiber.google.com/speedtest](https://fiber.google.com/speedtest)
* [https://speedtestgo.com](https://speedtestgo.com)
* [局域网怎么实现内外网隔离？](https://www.zhihu.com/question/489849459)
* 防火墙 [https://github.com/pfsense/pfsense](https://github.com/pfsense/pfsense)
* [https://github.com/opnsense](https://github.com/opnsense)
* 广告拦截 [https://github.com/pi-hole/pi-hole](https://github.com/pi-hole/pi-hole)



## 查看网络

```bash
# 查询系统中缓存的ARP表，ARP表用来维护IP地址与MAC地址的对应关系
arp -an
# 
ip a
ifconfig
# 提取主机上的IP信息
ip add|grep "global"|awk'{print $2}'|awk -F/'{print $1}'

# 输出当前的ESTABLISHED和TIME_WAIT数
netstat -n | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'
netstat -ant | awk '
    {++s[$NF]} END {for(k in s) print k,s[k]}
'
ss -ant | awk '
    {++s[$1]} END {for(k in s) print k,s[k]}
'

# 详情
netstat -antp

# 打印所有进程及其线程
pstree -p

# 打印某个进程的线程数
pstree -p {pid} | wc -l

# 打印当前地址IP链接情况
netstat -antp |grep "ESTABLISHED" |awk '{print $5}'|awk -F : '{print $4}'|sort |uniq -c

```



## iptables

+ iptables [https://www.netfilter.org](https://www.netfilter.org)

> iptables是Linux从2.4.x版本内核开始，系统自带的防火墙。随着Linux内核的不断更新，Linux的防火墙在iptables基础上泛生出
> UFW和Firewalld，并且在一些发行版中已经替代iptables。

```bash
#永久关闭防火墙
chkconfig iptables off
# 永久关闭后启用
chkconfig iptables on

# 查看防火墙规则
iptables -L
# 查出所有的规则信息
iptables -nvl
iptables -L -n --line-number

# 清空已存在的规则
iptables -F
iptables --flush


# sudo iptables -I INPUT -p tcp --dport [端口号] -j ACCEPT
# --dport 目标端口，数据从外部进入服务器
# --sport 数据源端口，数据从服务器出去
sudo iptables -I INPUT -p tcp --dport 3306 -j ACCEPT

# 保存iptables设置规则
iptables-save


# 安装iptables-persistent工具，使端口配置持久化
sudo apt-get install iptables-persistent

# 端口配置永久生效 
sudo netfilter-persistent save
sudo netfilter-persistent reload

# 生成的规则将被存储在以下文件中:
# /etc/iptables/rules.v4
# /etc/iptables/rules.v6

```



## UFW



```bash
# 安装
sudo apt install ufw
# 检查 UFW 的状态
sudo ufw status verbose

# 打开防火墙
ufw enable
# 关闭防火墙
ufw disable
#重启防火墙
ufw reload
# 查看已经定义的ufw规则
ufw status
# 外来访问默认允许
ufw default allow
# 外来访问默认拒绝
ufw default deny
# 允许访问20端口，20后可跟/tcp或/udp，表示tcp或udp封包。
ufw allow 20
# 拒绝访问20端口，20后可跟/tcp或/udp，表示tcp或udp封包。
ufw deny 20
# 允许自192.168.0.0/24的tcp封包访问本机的22端口。
sudo ufw allow proto tcp from 192.168.0.0/24 to any port 22
# 删除以前定义的"允许访问20端口"的规则
ufw delete allow 20
# 删除以前定义的"拒绝访问20端口"的规则
ufw delete deny 20
```



## firewalld

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

# 开启80端口
firewall-cmd --zone=public --add-port=80/tcp --permanent
# 开启8080-8089的IP端
firewall-cmd --zone=public --add-port=8080-8089/tcp --permanent
# 开启3306端口
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

- `--zone` 作用域
- `--add-port=80/tcp` 添加端口，格式为：端口/通讯协议
- `--permanent` 永久生效，没有此参数重启后失效


**配置`firewalld-cmd`**

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




## 路由跟踪

- 查询IP地理信息 [https://github.com/zu1k/nali](https://github.com/zu1k/nali)
- [https://github.com/ihmily/ip-info-api](https://github.com/ihmily/ip-info-api)
- [https://github.com/jason5ng32/MyIP](https://github.com/jason5ng32/MyIP)
- [https://ip.guide](https://ip.guide)
- [https://github.com/hackclub/how-did-i-get-here](https://github.com/hackclub/how-did-i-get-here)
    - [https://github.com/hackclub/ktr](https://github.com/hackclub/ktr)
- [https://github.com/lionsoul2014/ip2region](https://github.com/lionsoul2014/ip2region)
    - [https://gitee.com/lionsoul/ip2region](https://gitee.com/lionsoul/ip2region)
- [https://ifconfig.me](https://ifconfig.me)
    - [https://github.com/pmarques/ifconfig.me](https://github.com/pmarques/ifconfig.me)
- [https://github.com/georgyo/ifconfig.io](https://github.com/georgyo/ifconfig.io)
- [https://github.com/missdeer/ifconfig](https://github.com/missdeer/ifconfig)
- [https://github.com/ipinfo](https://github.com/ipinfo)
- [https://github.com/pronto/ifconfig.pro](https://github.com/pronto/ifconfig.pro)
- [https://github.com/ngoduykhanh/ifconfig.top](https://github.com/ngoduykhanh/ifconfig.top)
- [https://github.com/ftao/python-ifcfg](https://github.com/ftao/python-ifcfg)
- [https://github.com/sanketsudake/ifconfig-parser](https://github.com/sanketsudake/ifconfig-parser)
- [https://www.browserscan.net](https://www.browserscan.net)
- [https://www.ipip.net](https://www.ipip.net)
    - [https://www.myip.la](https://www.myip.la)
- [https://cloud.magiclen.org/cn/myip](https://cloud.magiclen.org/cn/myip)
- [https://dns.fish](https://dns.fish)
- [https://ipquery.io](https://ipquery.io)
- [https://ip.aolifu.org](https://ip.aolifu.org)
- 可用性检查 [https://github.com/funilrys/PyFunceble](https://github.com/funilrys/PyFunceble)
- [https://github.com/hatoo/oha](https://github.com/hatoo/oha)


**`ping`、`tcptraceroute`、`traceroute`、`mtr`**

* [https://github.com/fujiapple852/trippy](https://github.com/fujiapple852/trippy)
* [https://www.cnblogs.com/xzkzzz/p/7413177.html](https://www.cnblogs.com/xzkzzz/p/7413177.html)
* [https://www.jianshu.com/p/802010d54849](https://www.jianshu.com/p/802010d54849)
* [https://cloud.tencent.com/developer/article/1332118](https://cloud.tencent.com/developer/article/1332118)
* [http://winmtr.net/download-winmtr](http://winmtr.net/download-winmtr)
* [Netcat详解](https://www.cnblogs.com/dalianpai/p/12505678.html)
* [http://www.dest-unreach.org/socat](http://www.dest-unreach.org/socat)
* [https://github.com/vi/websocat](https://github.com/vi/websocat)
* [https://github.com/pouriyajamshidi/tcping](https://github.com/pouriyajamshidi/tcping)
* [https://github.com/hanshuaikang/Nping](https://github.com/hanshuaikang/Nping)

> 在Linux中有一个更好的网络连通性判断工具，它可以结合ping | nslookup | tracert 来判断网络的相关特性，这个命令就是mtr。

> 注意：MTR使用的raw sockets是绕过TCP/IP协议，需要ROOT权限来执行，因此如果以普通用户身份来执行mtr会出错，
> 提示“mtr: unable to get raw sockets”

* [tcpping- 禁止了ICMP协议（ping命令）也能用](http://www.vdberg.org/~richard/tcpping.html)
    * [https://github.com/deajan/tcpping](https://github.com/deajan/tcpping)

> `tcpping`脚本依赖`tcptraceroute` 组件，所以必须先安装`yum install tcptraceroute`


* [https://elifulkerson.com/projects/](https://elifulkerson.com/projects/)

> 注意`tcpping`与`tcping` 是不同的两款工具

* [https://docs.microsoft.com/zh-cn/sysinternals/downloads/psping](https://docs.microsoft.com/zh-cn/sysinternals/downloads/psping)
* [https://code.google.com/archive/p/paping/downloads](https://code.google.com/archive/p/paping/downloads)

> `PsPing` 是微软 `PSTools` 工具套件中的其中一个命令。除了 `ICMP` ping 测试，主要用来测试 TCP 端口的连通性，
> 还可以测试 `TCP/UDP` 网络时延和带宽。不过， `PsPing` 只能在 Windows 中运行。Linux 可以使用 `PaPing` （跨平台的开源工具）。

* [https://github.com/antirez/hping](https://github.com/antirez/hping)


**常用网站**

* [http://ipcheck.need.sh](http://ipcheck.need.sh)
* [https://torch.njs.app](https://torch.njs.app)
* 瓦工的全球ping工具 [http://ping.pe](http://ping.pe)
* [https://www.yougetsignal.com/tools/open-ports](https://www.yougetsignal.com/tools/open-ports)
* [http://tool.chinaz.com/port](http://tool.chinaz.com/port)
* [https://www.websitepulse.com/tools/china-firewall-test](https://www.websitepulse.com/tools/china-firewall-test)
* [https://www.vps234.com/ipchecker](https://www.vps234.com/ipchecker)
* [https://tools.ipip.net/traceroute.php](https://tools.ipip.net/traceroute.php)
* IP范围转换CIDR [https://ip2cidr.com](https://ip2cidr.com)
* [http://apps.neu.edu.cn/netaggr](http://apps.neu.edu.cn/netaggr)
* [无类别域间路由（CIDR）网络地址计算器](https://www.sioe.cn/xinqing/CIDR.php)
* [IPv4 / IPv6 CIDR计算器 | RAKKOTOOLS🔧](https://zh.rakko.tools/tools/27)
* [http://ip.chacuo.net/ipconvert](http://ip.chacuo.net/ipconvert)
* [https://github.com/3th1nk/cidr](https://github.com/3th1nk/cidr)
* [https://www.oldking.net](https://www.oldking.net)


**tracert**

> `Tracert` 列出分组经过的路由节点，以及它在IP 网络中每一跳的延迟（这里的延迟是指：分组从信息源发送到目的地所需的时间，
> 延迟也分为许多的种类——传播延迟、传输延迟、处理延迟、排队延迟等，是大多数网站性能的瓶颈之一）.

```batch
tracert [-d] [-h maximum_hops] [-j host-list] [-w timeout] [-R] [-S srcaddr] [-4] [-6] target_name
```

**选项**

- `-d` 指定不将 IP 地址解析到主机名称。
- `-h maximum_hops` 指定跃点数以跟踪到称为 target_name 的主机的路由。
- `-j host-list` 指定 Tracert 实用程序数据包所采用路径中的路由器接口列表。
- `-w timeout` 等待 timeout 为每次回复所指定的毫秒数。
- `target_name` 目标主机的名称或 IP 地址。

**示例**

```bash
tracert www.bajins.com
```



## 网卡

### MTU

> MTU经过网卡传输的数据包的最大传输单元,传输设备的MTU值不规范造成传输失败的情况

**查看MTU值**

```bash
cat /sys/class/net/eth0/mtu
```

**临时更改MTU值**

```bash
echo "1476" > /sys/class/net/eth0/mtu
# 或者
# ifconfig 网口名 mtu 数值
ifconfig eth0 mtu 1476
```

**永久更改MTU值**

```bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0
# 在DEVICE=eth0下面加入
MTU=1476
# 启用IPv6地址的，修改IPv6 mtu的参数为
IPV6_MTU="1280"
```

**重启网络接口**

```bash
service network restart
```

