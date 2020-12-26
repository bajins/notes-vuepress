# System


[[toc]]


## Flag

+ [https://github.com/openbsd](https://github.com/openbsd)
    + [https://www.openbsd.org](https://www.openbsd.org)

* [speedtest](https://github.com/adolfintel/speedtest)
* ssl免费的证书 [https://letsencrypt.org](https://letsencrypt.org)
    * [https://github.com/acmesh-official](https://github.com/acmesh-official)
        * [HTTPS之acme.sh申请证书](https://www.cnblogs.com/tu240302975/p/13370867.html)
    * [https://github.com/win-acme](https://github.com/win-acme)
    * [https://github.com/certbot](https://github.com/certbot)
        * [https://certbot.eff.org](https://certbot.eff.org)
        * [获取证书（并选择插件）-官方文档](https://certbot.eff.org/docs/using.html#getting-certificates-and-choosing-plugins)
    * [临时处理OCSP域名无法访问的问题](https://holmesian.org/letsencrypt-ocsp-fix)
    * [「Certbot」- ocsp.int-x3.letsencrypt.org Read timed out](http://blog.k4nz.com/%E3%80%8Ccertbot%E3%80%8D-ocsp-int-x3-letsencrypt-org-read-timed-out)
* 像libevent，libev和libuv一样，libhv提供具有非阻塞IO和计时器的事件循环: [https://github.com/ithewei/libhv](https://github.com/ithewei/libhv)


- [https://www.gnome.org](https://www.gnome.org)

* [有人说超威半导体（AMD）没有512位高级矢量扩展指令集（AVX512），属于残废，是真的吗？](https://www.zhihu.com/question/367281009)
* [如何看待Linus Torvalds对AVX512的评价？](https://www.zhihu.com/question/406517759)


- [https://github.com/rocky-linux](https://github.com/rocky-linux)


**管理面板**

* [https://github.com/aaPanel/BaoTa](https://github.com/aaPanel/BaoTa)
    * [https://www.bt.cn](https://www.bt.cn)
* [https://www.xp.cn](https://www.xp.cn)
* [https://cockpit-project.org](https://cockpit-project.org)




## 云平台

* [虚拟化与云计算有什么区别？](https://www.zhihu.com/question/22793847)

> 云服务器（VM，VIRTUAL MACHINE，IAAS）：是在一组集群物理服务器上虚拟出多个类似独立主机的部分，集群中每个主机上都有云主机的一个镜像，
> 从而大大提高了虚拟主机的安全稳定性。

> 虚拟专用服务器（VPS，VIRTUAL专用服务器，VDS）：采用虚拟软件，VZ或VM在一台物理服务器上虚拟出多个类似独立主机的部分，
> 能够实现单机多用户，每个部分都可以做单独的操作系统，管理方法同主机一样。

**[修改为root登录](/System/Linux配置.md#修改为root登录)**

* GCP (Google Cloud Platform) [https://github.com/GoogleCloudPlatform](https://github.com/GoogleCloudPlatform)
    * [https://cloud.google.com/free](https://cloud.google.com/free)
    * [谷歌云搭建免费服务器并翻墙 | Levon's Blog](https://www.liuvv.com/p/b7e5827a)
* [https://www.oracle.com/cn/cloud/free](https://www.oracle.com/cn/cloud/free)
    * [Always Free Resources](https://docs.cloud.oracle.com/en-us/iaas/Content/FreeTier/freetier.htm#resources)
    * [申请Oracle Cloud永久免费服务+300美元试用额度](https://51.ruyo.net/14138.html)
    * 不建议使用用Oracle Linux镜像，无法设置root密码登录
    ```bash
    # 移除或禁用后台监控
    yum remove oracle-cloud-agent
    snap remove oracle-cloud-agent

    systemctl stop oracle-cloud-agent
    systemctl disable oracle-cloud-agent
    systemctl stop oracle-cloud-agent-updater
    systemctl disable oracle-cloud-agent-updater

    systemctl stop snap.oracle-cloud-agent.oracle-cloud-agent-updater.service
    systemctl disable snap.oracle-cloud-agent.oracle-cloud-agent-updater.service
    systemctl stop snap.oracle-cloud-agent.oracle-cloud-agent.service
    systemctl disable snap.oracle-cloud-agent.oracle-cloud-agent.service
    ```
* Azure [https://azure.microsoft.com/free](https://azure.microsoft.com/free)
    * [https://portal.azure.com](https://portal.azure.com)
    * [申请微软Azure服务免费12个月+$200 额度+永久免费(25+项服务)](https://www.daniao.org/7057.html)
* AWS 免费套餐 [https://console.aws.amazon.com/billing/home#/freetier](https://console.aws.amazon.com/billing/home#/freetier)
    * [https://www.cloudping.info](https://www.cloudping.info)
    * [手把手教你撸12个月亚马逊（AWS）的云服务器](https://www.zhunaozi.com/411.html)
    * [SSH 密钥对丢失时连接到 Amazon EC2 实例](https://aws.amazon.com/cn/premiumsupport/knowledge-center/user-data-replace-key-pair-ec2)
    * [如果丢失私钥，连接到Linux实例](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/replacing-lost-key-pair.html)
    * [对连接到实例进行故障排除](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html)
    * [如何重试失败的付款？](https://aws.amazon.com/cn/premiumsupport/knowledge-center/retry-unsuccessful-payment)
* Vultr
* Digital Ocean





## Windows

* 搜索更新补丁下载 [http://www.catalog.update.microsoft.com](http://www.catalog.update.microsoft.com)
* [小米笔记本Pro黑苹果Win10双系统](https://www.ikxin.com/465.html)

> 打开后，随便点一个进程右键，查看-查看进程热键-再右键-显示所有进程热键

> 当分区后应该设置主分区为活动分区（选中该主分区右键选择激活分区）

* [比较 Windows 10 的不同版本](https://www.microsoft.com/zh-cn/windowsforbusiness/compare)
* [Windows 10 版本的版本信息](https://docs.microsoft.com/zh-cn/windows/release-information)
* [Windows 10 更新历史记录](https://support.microsoft.com/zh-cn/help/4555932)
* [Windows 生命周期说明书](https://support.microsoft.com/zh-cn/help/13853/windows-lifecycle-fact-sheet)
* [将 MBR 分区转换为 GPT](https://docs.microsoft.com/zh-cn/windows/deployment/mbr-to-gpt)


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


**系统相关**

* [在Windows 10 10586版本手动挂载WIM文件以修复DISM源的方法](https://answers.microsoft.com/zh-hans/windows/forum/windows_10-performance/windows-10/7d43c552-e005-40ac-bde7-9f1a9029573a)

- 检查映像是否完整：`DISM.exe /Online /Cleanup-image /Scanhealth`
- 完成后再修复映像：`DISM.exe /Online /Cleanup-image /Checkhealth`
- 然后再修复系统：`DISM.exe /Online /Cleanup-image /Restorehealth `
- 最后检查系统是否修复：`sfc /scannow`
- `Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase`


### MSDN

* [https://www.microsoft.com/zh-cn/software-download/windows10](https://www.microsoft.com/zh-cn/software-download/windows10)
* [http://msdn.itellyou.cn](http://msdn.itellyou.cn)
* [https://www.iruanmi.com/msdn](https://www.iruanmi.com/msdn)
* [http://www.imsdn.cn](http://www.imsdn.cn)
* [https://uup.rg-adguard.net](https://uup.rg-adguard.net)
* [https://www.repaik.com/win.html](https://www.repaik.com/win.html)
* [https://uupdump.ml](https://uupdump.ml)
* [https://msdn.sjjzm.com](https://msdn.sjjzm.com)


### 绿色精简

+ MSMG Toolkit [https://msmgtoolkit.in](https://msmgtoolkit.in)
+ NTLite [https://www.ntlite.com](https://www.ntlite.com)

* [WINOS ](https://www.winos.me)
* [绿色系统](http://lvsexitong.com)
* [网吧系统](http://down.lansedongli.com)
* [twm000-导航页被定制可修改](http://twm000.top)
* [Y-OS工作室-导航页被定制可修改](http://y-os.net)
* [十二星座-导航页被定制可修改](http://www.12xzzx.com)
* [https://icura.lofter.com](https://icura.lofter.com)
    * [OneDrive](https://tpedutw-my.sharepoint.com/:f:/g/personal/icura_tp_edu_tw/Ek5lPsUrc_ZJqSDKi7oxsdoBNjbbncnvi8p-90jI0OqUVA)



### WinPE

* [http://rufus.ie](http://rufus.ie)
* [https://github.com/balena-io/etcher](https://github.com/balena-io/etcher)
* 微PE [http://www.wepe.com.cn](http://www.wepe.com.cn)
* [USBOS](http://bbs.wuyou.net/forum.php?mod=viewthread&tid=349965&extra=page%3D1)
* [光卡自己的 PE 项目](https://hikaricalyx.com)
* [优启时代](http://www.uqi.me/catalog.asp?cate=1)




## MS相关激活

> 在PowerShell（也可在CMD）中输入命令运行`slmgr.vbs /dti`，按<kbd>Ctrl</kbd> + <kbd>C</kbd>复制，
> 并粘贴到在线获取确认ID网站：[http://webact.185.hk](http://webact.185.hk)

> 使用命令有两种方式：第一种：按<kbd>Win</kbd> + <kbd>x</kbd> + <kbd>a</kbd>进入PowerShell（也可在CMD中）输入命令运行；
> 第二种：按<kbd>Win</kbd> + <kbd>r</kbd>输入命令运行，如`slmgr.vbs /dti`，此方式必须有`.vbs`后缀，（推荐使用第一种方式）

* 小爱激活助手 [https://pan.baidu.com/s/1tOEa-uMGTKsTFDzJihFkVA](https://pan.baidu.com/s/1tOEa-uMGTKsTFDzJihFkVA) 提取码: gia8
* 密钥检测的小工具 [https://github.com/FHWWC/KeyCheck](https://github.com/FHWWC/KeyCheck)
* https://api.jike.info/ms_pid/密钥


**Windows命令**

> 在CMD中输入`slmgr`或`slmgr.exe`即可查看所有命令

- `systeminfo` 系统信息
- `slui 4` 调出电话激活窗口
- `slmgr.vbs /ipk 密钥` 安装产品密钥
- `slmgr.vbs /upk` 卸载密钥
- `slmgr.vbs /ato` 激活密钥
- `slmgr.vbs /dti` 显示安装ID
- `slmgr.vbs /atp 确认ID` 输入确认ID（注意这里的ID没有`-`符号）
- `slmgr.vbs /dlv` 显示详细的许可证信息
- `slmgr.vbs /xpr` 当前许可证状态的截止日期
- `slmgr.vbs /dli [激活 ID | All]` 显示许可证信息（默认：当前许可证）
- `slmgr.vbs /dlv [激活 ID | All]` 显示详细的许可证信息
- `slmgr.vbs /cpky` 从注册表中清除产品密钥（阻止泄露引起的攻击）
- `slmgr.vbs /ilc` 许可证文件 安装许可证
- `slmgr.vbs /rilc` 重新安装系统许可证文件
- `slmgr.vbs /rearm` 重置计算机的授权状态 （去除水印）
- `slmgr.vbs /skms` 设置KMS服务器
- `slmgr.vbs /ckms` 清除KMS服务器名和端口号并设为初始状态


**Office命令**

> 在PowerShell（也可在CMD）中输入命令运行并切换到office安装目录
> `cd "C:\Program Files (x86)\Microsoft Office\Office16"`，如果安装的64位去掉` (x86)`

- `cscript ospp.vbs /inpkey:密钥` 安装产品密钥
- `cscript ospp.vbs /unpkey:密钥最后五位` 卸载密钥
- `cscript ospp.vbs /dinstid` 显示安装ID
- `cscript ospp.vbs /actcid:确认ID` 输入确认ID（注意这里的ID没有`-`符号）
- `cscript ospp.vbs /act` 在线激活
- `cscript ospp.vbs /dstatus` 验证激活


**错误代码**

- `0xC004C008` 是零售版可以电话激活、网页激活
- `0xC004C020` 是批量版可以电话激活、运气好可以网页激活
- `0xC004C060` 已失效
- `0xC004C003` 已失效
- `0x80072EE2` 因网络阻塞导致错误,稍等10分钟再重试


**office key**

```
# OFFICE 2019 专业增强版激活码
W8W6K-3N7KK-PXB9H-8TD8W-BWTH9

# Office19_RTM19_ProPlus2019VL_MAK_AE
GP3YN-RPX2T-FVYT8-4TPFY-7MKG3
N9J9Q-Q7MMP-XDDM6-63KKP-76FPM
6NCGF-GQQ2F-H83HF-9DWMY-92GTG
```


**Windows Key**

* [https://cherishspring.cn/archives/active-win10-office.html](https://cherishspring.cn/archives/active-win10-office.html)
* [https://notys.xyz](https://notys.xyz)
* [https://jihuo.ma/tool](https://jihuo.ma/tool)
* [http://www.aihao.cc](http://www.aihao.cc)
* [https://jike.info/category/16/账号密钥](https://jike.info/category/16/%E8%B4%A6%E5%8F%B7%E5%AF%86%E9%92%A5)


**KMS**

* [https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys)

+ [https://github.com/Wind4/vlmcsd](https://github.com/Wind4/vlmcsd)
+ [https://github.com/Mr-xn/kms-server-deploy](https://github.com/Mr-xn/kms-server-deploy)
+ [Windows激活之路](https://51.ruyo.net/tag/windows%e6%bf%80%e6%b4%bb%e4%b9%8b%e8%b7%af)
+ [https://github.com/netnr/kms](https://github.com/netnr/kms)


* [可用的 KMS 列表](https://www.coolhub.top/archives/14)
* [MicroKMS 神龙版](http://www.yishimei.cn/network/319.html)
* [人人客-微软产品](https://rrkee.com/microsoft)
* [03k.orgKMS服务](https://03k.org/kms.html)
* [kmsfiles](https://www.solidfiles.com/folder/bd7165a0d4)
* [云萌 Windows 10 激活工具](https://tgsan.github.io/CMWTAT_Digital_Edition)
* [零散坑KMS服务](https://03k.org/kms.html)
* [kms.mogeko.me](https://mogeko.me/2019/054)
* [https://kms.cangshui.net](https://kms.cangshui.net)
* [https://kms.loli.beer](https://kms.loli.beer)
* [https://www.moerats.com/kms](https://www.moerats.com/kms)
* [kmsfiles](https://www.solidfiles.com/folder/bd7165a0d4/)
* [https://kms.cangshui.net](https://kms.cangshui.net)
* [https://www.ghpym.com/kms.html](https://www.ghpym.com/kms.html)
* [https://github.com/EDragon007/EDragonKMS](https://github.com/EDragon007/EDragonKMS)



**数字激活**

> 所谓的win10数字权利激活，是一种win10授权方法。该激活方法会记录你的电脑硬件信息，并保存到微软的服务器，
> 无需什么激活密钥。这次激活了，下次重装，联网后就能自动激活，只要你不换电脑主板和cpu，就是永久激活了。

> 避免在vpn状态下使用本软件。激活前电脑必须联网，而且必须开启`Windows Update`服务，否则无法激活。



### 家庭升专业

> 注意：Windows10家庭版升级Windows10专业版的密钥不是激活密钥

1. 升级：设置 -> 更新和安全 -> 激活 -> 更改产品秘钥，断网后，填入 下方的升级密钥，重启

```
4N7JM-CV98F-WY9XX-9D8CF-369TT
FMPND-XFTD4-67FJC-HDR8C-3YH26
4N894-WMB2D-PRGHC-BVYW8-CPQGT
VK7JG-NPHTM-C97JM-9MPGT-3V66T
W269N-WFGWX-YVC9B-4J6C9-T83GX
MH37W-N47XK-V7XM9-C7227-GCQG9
NYW94-47Q7H-7X9TT-W7TXD-JTYPM
NJ4MX-VQQ7Q-FP3DB-VDGHX-7XM87
```

2. 联网激活：以管理员打开CMD执行以下命令

```batch
slmgr.vbs /upk
slmgr /ipk 激活密钥
slmgr /skms zh.us.to
slmgr /ato
```





## SSH

> Secure Shell（SSH）

> OpenSSH 私钥后缀是`pem`，PuTTY 私钥后缀是`ppk`

* [https://github.com/alebcay/awesome-shell](https://github.com/alebcay/awesome-shell)
* [https://github.com/topics/terminal](https://github.com/topics/terminal)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/topics/ssh-client](https://github.com/topics/ssh-client)
* [https://github.com/topics/ssh2](https://github.com/topics/ssh2)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)


- [https://github.com/topics/sftp](https://github.com/topics/sftp)
- [https://github.com/topics/sftp-client](https://github.com/topics/sftp-client)
- [https://github.com/topics/ftp-client](https://github.com/topics/ftp-client)

* [https://github.com/openssh](https://github.com/openssh)
    * [https://www.openssh.com](https://www.openssh.com)
* [https://github.com/electerm/electerm](https://github.com/electerm/electerm)
* [https://www.mobatek.net](https://www.mobatek.net)


**WEB**

* [xterm.js](https://github.com/xtermjs/xterm.js)
* [webssh](https://github.com/huashengdun/webssh)
* [WebSSH2](https://github.com/billchurch/WebSSH2)
* [https://github.com/mscdex/ssh2](https://github.com/mscdex/ssh2)


**Android**

+ [SSH client for Android](https://github.com/search?o=desc&q=SSH+client+for+Android&s=updated&type=Repositories)

* [https://github.com/topics/termux](https://github.com/topics/termux)
    * [https://github.com/termux](https://github.com/termux)
* [https://github.com/connectbot/connectbot](https://github.com/connectbot/connectbot)
* [https://www.juicessh.com](https://www.juicessh.com)
* [https://github.com/niklas-8/RemoteFiles](https://github.com/niklas-8/RemoteFiles)



**Windows**

+ [https://github.com/topics/windows](https://github.com/topics/windows)
+ [https://github.com/topics/putty](https://github.com/topics/putty)
+ [https://github.com/topics/kitty](https://github.com/topics/kitty)

* [https://github.com/PowerShell/openssh-portable](https://github.com/PowerShell/openssh-portable)
    * [https://github.com/PowerShell/Win32-OpenSSH/wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki)
* [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
* [https://github.com/appget](https://github.com/appget)
* [https://github.com/x64dbg](https://github.com/x64dbg)
* [https://github.com/Maximus5/ConEmu](https://github.com/Maximus5/ConEmu)
* [https://github.com/Eugeny/terminus](https://github.com/Eugeny/terminus)
* [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)
* [https://github.com/vercel/hyper](https://github.com/vercel/hyper)
* PuTTY [https://www.chiark.greenend.org.uk/~sgtatham/putty](https://www.chiark.greenend.org.uk/~sgtatham/putty)
* [https://github.com/portapps/kitty-portable](https://github.com/portapps/kitty-portable)
* [https://github.com/cyd01/KiTTY](https://github.com/cyd01/KiTTY)




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

- 查询IP地理信息 [https://github.com/zu1k/nali](https://github.com/zu1k/nali)

**`ping`、`tcptraceroute`、`traceroute`、`mtr`**

* [https://www.cnblogs.com/xzkzzz/p/7413177.html](https://www.cnblogs.com/xzkzzz/p/7413177.html)
* [https://www.jianshu.com/p/802010d54849](https://www.jianshu.com/p/802010d54849)
* [https://cloud.tencent.com/developer/article/1332118](https://cloud.tencent.com/developer/article/1332118)
* [http://winmtr.net/download-winmtr](http://winmtr.net/download-winmtr)
* [Netcat详解](https://www.cnblogs.com/dalianpai/p/12505678.html)

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

