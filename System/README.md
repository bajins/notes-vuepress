# System


[[toc]]


## Flag

* [http://github.lesschina.com/linux](http://github.lesschina.com/linux)
* [speedtest](https://github.com/adolfintel/speedtest)
* ssl免费的证书 [https://letsencrypt.org](https://letsencrypt.org)
    * [https://github.com/acmesh-official](https://github.com/acmesh-official)
        * [HTTPS之acme.sh申请证书](https://www.cnblogs.com/tu240302975/p/13370867.html)
    * [https://github.com/win-acme](https://github.com/win-acme)
    * [https://github.com/certbot](https://github.com/certbot)
        * [https://certbot.eff.org](https://certbot.eff.org)
        * [https 证书手动获取 windows版](https://blog.csdn.net/m0_45452817/article/details/107249677)
* 像libevent，libev和libuv一样，libhv提供具有非阻塞IO和计时器的事件循环: [https://github.com/ithewei/libhv](https://github.com/ithewei/libhv)

+ 带仪表盘的实时性能监控：[https://github.com/netdata/netdata](https://github.com/netdata/netdata)
+ 云探针、云监控、服务器云监控、多服务器探针 [https://github.com/cppla/ServerStatus](https://github.com/cppla/ServerStatus)


- [https://www.gnome.org](https://www.gnome.org)

* [有人说超威半导体（AMD）没有512位高级矢量扩展指令集（AVX512），属于残废，是真的吗？](https://www.zhihu.com/question/367281009)
* [如何看待Linus Torvalds对AVX512的评价？](https://www.zhihu.com/question/406517759)



**云平台**

* [虚拟化与云计算有什么区别？](https://www.zhihu.com/question/22793847)

> 云服务器（VM，VIRTUAL MACHINE，IAAS）：是在一组集群物理服务器上虚拟出多个类似独立主机的部分，集群中每个主机上都有云主机的一个镜像，
> 从而大大提高了虚拟主机的安全稳定性。

> 虚拟专用服务器（VPS，VIRTUAL专用服务器，VDS）：采用虚拟软件，VZ或VM在一台物理服务器上虚拟出多个类似独立主机的部分，
> 能够实现单机多用户，每个部分都可以做单独的操作系统，管理方法同主机一样。

* GCP (Google Cloud Platform) [https://github.com/GoogleCloudPlatform](https://github.com/GoogleCloudPlatform)
    * [https://cloud.google.com](https://cloud.google.com)
* AWS [https://aws.amazon.com](https://aws.amazon.com)
* Azure [https://azure.microsoft.com](https://azure.microsoft.com)
* Vultr
* Digital Ocean


**管理面板**

* [https://github.com/aaPanel/BaoTa](https://github.com/aaPanel/BaoTa)
    * [https://www.bt.cn](https://www.bt.cn)
* [https://www.xp.cn](https://www.xp.cn)


**发行版本**

* [Linux发行版本排行](https://distrowatch.com/dwres.php?resource=popularity)
* [Linux主流发行版本](https://distrowatch.com/dwres.php?resource=major)



## Windows10设置

* [小米笔记本Pro黑苹果Win10双系统](https://www.ikxin.com/465.html)

> 打开后，随便点一个进程右键，查看-查看进程热键-再右键-显示所有进程热键

> 当分区后应该设置主分区为活动分区（选中该主分区右键选择激活分区）

* [比较 Windows 10 的不同版本](https://www.microsoft.com/zh-cn/windowsforbusiness/compare)
* [Windows 10 版本的版本信息](https://docs.microsoft.com/zh-cn/windows/release-information)


**Wifi频繁断线**

> 打开`设备管理器` ——> 点开`网络适配器` ——> 选中网卡 ——> 鼠标右键打开菜单 ——> 点击`属性` ——> 点击`电源管理` ——> 
> 取消勾选`允许计算机关闭此设备以节约电源`

> 点击`网络和共享中心` ——> `更改适配器设置` ——> 双击`WLAN` ——> 点击`无线属性` ——> 勾选`即使网络未广播其名称也连接` 


**MSTSC删除记录**

- Windows键 + <kbd>R</kbd>打开`运行` 输入`regedit` 找到 `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Terminal Server Client\Default`
- 进入 `%USERPROFILE%\Documents` (或`%HOMEPATH%\Documents`) 删除`Default.rdp`文件（默认隐藏）


**此电脑中的7个文件夹**

> win10删除此电脑中六个文件夹：按<kbd>Win</kbd> + <kbd>r</kbd>输入`regedit`进入注册表编辑器，输入并删除其中带`{}`的
> `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace`

```batch
:: 删除我的电脑"视频"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{f86fa3ab-70d2-4fc7-9c99-fcbf05467f3a}" /f
:: 删除我的电脑"文档"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{d3162b92-9365-467a-956b-92703aca08af}" /f
:: 删除我的电脑"桌面"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{B4BFCC3A-DB2C-424C-B029-7FE99A87C641}" /f
:: 删除我的电脑"音乐"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{3dfdf296-dbec-4fb4-81d1-6a3438bcf4de}" /f
:: 删除我的电脑"下载"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{088e3905-0323-4b02-9826-5d99428e115f}" /f
:: 删除我的电脑"图片"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{24ad3ad4-a569-4530-98e1-ab02f9417aa8}" /f
:: 删除我的电脑"3D对象"文件夹
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace\{0DB7E03F-FC29-4DC6-9020-FF41B59E513A}" /f
```


## CloudFlare Workers

+ [https://subdomainfinder.c99.nl](https://subdomainfinder.c99.nl) 搜索框输入`workers.dev`点击`Start Scan`，
再按<kbd>Ctrl</kbd> + <kbd>f</kbd> 输入`github`
+ [用Cloudflare CDN 如何自定义节点（CF自选IP）/撸CloudFlare Pro](https://www.moeelf.com/archives/10.html)


- [https://github.com/cloudflare/wrangler](https://github.com/cloudflare/wrangler)
- [https://github.com/search?q=Cloudflare+Workers](https://github.com/search?q=Cloudflare+Workers)
- [https://github.com/topics/cloudflare-workers](https://github.com/topics/cloudflare-workers)
- [Cloudflare Workers 创建自定义域名的项目](https://blog.16lab.io/workers-custom-domain)
- Cloudflare CNAME接入 [https://github.com/ZE3kr/Cloudflare-CNAME-Setup](https://github.com/ZE3kr/Cloudflare-CNAME-Setup)


* [https://github.com/netnr/workers](https://github.com/netnr/workers)
* [https://github.com/aploium/zmirror](https://github.com/aploium/zmirror)
* 动态博客系统 [https://github.com/kasuganosoras/cloudflare-worker-blog](https://github.com/kasuganosoras/cloudflare-worker-blog)
* 个人导航网站 [https://github.com/sleepwood/CF-Worker-Dir](https://github.com/sleepwood/CF-Worker-Dir)
* 一个极简风格的短网址转换 [https://github.com/Closty/duanwangzhi](https://github.com/Closty/duanwangzhi)
* [基于 Telegraf 框架的 Telegram Bot](https://moe.best/tutorial/cfworker-telegraf-tgbot.html)
* [使用CloudFlare Workers搭建网站状态监控](https://www.raycoder.me/p/cloudflare-workers-website-monitoring)


**代理**

- [https://github.com/topics/reverse-proxy](https://github.com/topics/reverse-proxy)
- JS 实现的在线代理 [https://github.com/EtherDream/jsproxy](https://github.com/EtherDream/jsproxy)
- 轻量级Javascript反向代理 [https://github.com/Berkeley-Reject/workers-proxy](https://github.com/Berkeley-Reject/workers-proxy)
    - [https://github.com/yenpou/Workers-Proxy](https://github.com/yenpou/Workers-Proxy)
- github release、archive以及项目文件的加速项目 [https://github.com/hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
- [https://github.com/netnr/workers](https://github.com/netnr/workers)
- [https://github.com/ryanking13/cors](https://github.com/ryanking13/cors)
- [https://github.com/AlejandroAkbal/Cloudflare-Worker-Cors-Proxy](https://github.com/AlejandroAkbal/Cloudflare-Worker-Cors-Proxy)




## SSH

* [https://github.com/alebcay/awesome-shell](https://github.com/alebcay/awesome-shell)
* [https://github.com/topics/terminal](https://github.com/topics/terminal)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/topics/ssh-client](https://github.com/topics/ssh-client)
* [https://github.com/topics/ssh2](https://github.com/topics/ssh2)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)


- [https://github.com/topics/sftp](https://github.com/topics/sftp)
- [https://github.com/topics/sftp-client](https://github.com/topics/sftp-client)
- [https://github.com/topics/ftp-client](https://github.com/topics/ftp-client)


* [https://github.com/electerm/electerm](https://github.com/electerm/electerm)
* [https://www.mobatek.net](https://www.mobatek.net)


**WEB**

* [xterm.js](https://github.com/xtermjs/xterm.js)
* [webssh](https://github.com/huashengdun/webssh)
* [WebSSH2](https://github.com/billchurch/WebSSH2)
* [https://github.com/mscdex/ssh2](https://github.com/mscdex/ssh2)


**Android**

* [https://github.com/termux](https://github.com/termux)
* [https://github.com/connectbot/connectbot](https://github.com/connectbot/connectbot)
* [https://github.com/niklas-8/RemoteFiles](https://github.com/niklas-8/RemoteFiles)



**Windows**

* [https://github.com/topics/windows](https://github.com/topics/windows)
* [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
* [https://github.com/appget](https://github.com/appget)
* [https://github.com/x64dbg](https://github.com/x64dbg)
* [https://github.com/Maximus5/ConEmu](https://github.com/Maximus5/ConEmu)
* [https://github.com/Eugeny/terminus](https://github.com/Eugeny/terminus)
* [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)
* [https://github.com/Wox-launcher/Wox](https://github.com/Wox-launcher/Wox)
* [https://github.com/vercel/hyper](https://github.com/vercel/hyper)




## 建站资源

* [萌音影视 - 在线影视应用](https://github.com/178146582/moeins)
    * [安装教程](https://www.moerats.com/archives/744)
* [使用FileManager+基于Python3的爬虫程序建立影音图片库](https://www.moerats.com/archives/501)
* [使用PlayTube搭建私人的视频网站](https://www.moerats.com/archives/644)
* [开源有态度的漫画CMS](https://github.com/hiliqi/xiaohuanxiong)
* 冷曦博客 - 源码之家-草根站长的资源共享平台: [https://www.lengxi.net](https://www.lengxi.net)
* [https://github.com/Youngxj/YoungxjTools](https://github.com/Youngxj/YoungxjTools)
* [https://github.com/netnr/scriptservices](https://github.com/netnr/scriptservices)


**发卡系统**

* [github search](https://github.com/search?q=%E5%8F%91%E5%8D%A1%E7%B3%BB%E7%BB%9F&type=Repositories)
* [https://github.com/zlkbdotnet/zfaka](https://github.com/zlkbdotnet/zfaka)
* [https://github.com/Tai7sy/card-system](https://github.com/Tai7sy/card-system)
* [https://github.com/assimon/shanhufaka](https://github.com/assimon/shanhufaka)
* [https://github.com/maddog888/kmxts](https://github.com/maddog888/kmxts)




## 路由跟踪

**`ping`、`tcptraceroute`、`traceroute`、`mtr`**

* [https://www.cnblogs.com/xzkzzz/p/7413177.html](https://www.cnblogs.com/xzkzzz/p/7413177.html)
* [https://www.jianshu.com/p/802010d54849](https://www.jianshu.com/p/802010d54849)
* [https://cloud.tencent.com/developer/article/1332118](https://cloud.tencent.com/developer/article/1332118)
* [http://winmtr.net/download-winmtr](http://winmtr.net/download-winmtr)

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

