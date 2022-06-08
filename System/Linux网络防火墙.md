# Linux网络防火墙


[[toc]]



## Flag

- `nethogs`: 按进程查看流量占用
- `ethtool`: 诊断工具
- `tcpdump`: 抓包工具
- 监控总体带宽使用：`nload`、`bmon`、`slurm`、`bwm-ng`、`cbm`、`speedometer`、`netload`
- 监控总体带宽使用（批量式输出）：`vnstat`、`ifstat`、`dstat`、`collectl`
- 每个套接字连接的带宽使用：`iftop`、`iptraf`、`tcptrack`、`pktstat`、`netwatch`、`trafshow`、`jnettop`
- `ntopng`
- perf、sar、ksar、mpstat、uptime、vmstat、pidstat、time、cpustat、munin、glances、atop、nmon、pcp-gui、nfsstat、netstat、iostat
- [https://github.com/htop-dev/htop](https://github.com/htop-dev/htop)
- 视图监视器 [https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet](https://github.com/paradoxxxzero/gnome-shell-system-monitor-applet)
- [https://github.com/aristocratos](https://github.com/aristocratos)




## 查看网络

```bash
# 查询系统中缓存的ARP表，ARP表用来维护IP地址与MAC地址的对应关系
arp -an
# 
ip a
ifconfig

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
