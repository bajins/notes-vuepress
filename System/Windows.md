# Windows


[[toc]]



## Flag


* 搜索更新补丁下载 [http://www.catalog.update.microsoft.com](http://www.catalog.update.microsoft.com)
* [小米笔记本Pro黑苹果Win10双系统](https://www.ikxin.com/465.html)
* 恢复Win10任务菜单 [https://github.com/valinet/ExplorerPatcher](https://github.com/valinet/ExplorerPatcher)
* 手机运行Win10 [https://github.com/edk2-porting](https://github.com/edk2-porting)
* [https://github.com/WOA-Project](https://github.com/WOA-Project)
* 删除预安装 [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)



> 打开后，随便点一个进程右键，查看-查看进程热键-再右键-显示所有进程热键

> 当分区后应该设置主分区为活动分区（选中该主分区右键选择激活分区）

* [比较 Windows 10 的不同版本](https://www.microsoft.com/zh-cn/windowsforbusiness/compare)
* [Windows 10 版本的版本信息](https://docs.microsoft.com/zh-cn/windows/release-information)
* [Windows 10 更新历史记录](https://support.microsoft.com/zh-cn/help/4555932)
* [Windows 生命周期说明书](https://support.microsoft.com/zh-cn/help/13853/windows-lifecycle-fact-sheet)
* [将 MBR 分区转换为 GPT](https://docs.microsoft.com/zh-cn/windows/deployment/mbr-to-gpt)
* [Window环境下的内网NTP时间同步配置](https://blog.csdn.net/qq_36141369/article/details/109215318)
* [局域网中主机间的时间同步](https://blog.csdn.net/antony1776/article/details/108358147)
* [Windows云服务器如何配置多用户登录？（Windows 2012）](https://support.huaweicloud.com/trouble-ecs/zh-cn_topic_0138876622.html)
* [https://github.com/stascorp/rdpwrap](https://github.com/stascorp/rdpwrap)
    * [Windows远程桌面单/多用户同时登录](https://blog.csdn.net/Aaron_Miller/article/details/109534277)
* [英特尔® 显卡控制面板从 Microsoft* Store 中下架](https://www.intel.cn/content/www/cn/zh/support/articles/000058733/graphics.html)



- [https://sdi-tool.org](https://sdi-tool.org)
- [https://www.iobit.com/en/driver-booster.php](https://www.iobit.com/en/driver-booster.php)


**Windows11右键菜单**

```batch
:: 恢复Win10右键菜单
reg add HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32 /f /ve
:: 恢复Win11右键菜单
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
:: 在任务管理器中，重启资源管理器
taskkill /f /im explorer.exe & start explorer.exe
```

* [Windows 11 Classic Context menu](https://www.sordum.org/14479/windows-11-classic-context-menu-v1-1)


**软件配置注册表**

- `计算机\HKEY_CLASSES_ROOT\Local Settings\Software\Microsoft\Windows\Shell\MuiCache`
- `计算机\HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Compatibility Assistant\Store`
- `计算机\HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Search\JumplistData`
- `计算机\HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\FeatureUsage`
- `计算机\HKEY_CURRENT_USER\SOFTWARE\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache`


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

* [win10简单脚本一步卸载Cortana](https://www.wenjinyu.me/zh/an-easy-step-to-uninstall-cortana-in-win10)


**系统相关**

* [在Windows 10 10586版本手动挂载WIM文件以修复DISM源的方法](https://answers.microsoft.com/zh-hans/windows/forum/windows_10-performance/windows-10/7d43c552-e005-40ac-bde7-9f1a9029573a)
* [清理 WinSxS 文件夹](https://docs.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/clean-up-the-winsxs-folder)
    - `Dism.exe /online /Cleanup-Image /StartComponentCleanup /ResetBase;Dism.exe /online /Cleanup-Image /SPSuperseded` 清理
* [Windows 10 DISM Command-Line 选项](https://docs.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/deployment-image-servicing-and-management--dism--command-line-options)

- 检查映像是否完整：`DISM.exe /Online /Cleanup-image /Scanhealth`
- 完成后再修复映像：`DISM.exe /Online /Cleanup-image /Checkhealth`
- 然后再修复系统：`DISM.exe /Online /Cleanup-image /Restorehealth`
- 最后检查系统是否修复：`sfc /scannow`


**密码修改/破解/清除**

* [https://github.com/search?q=chntpw](https://github.com/search?q=chntpw)
* [http://pogostick.net/~pnh/ntpasswd](http://pogostick.net/~pnh/ntpasswd)

>  ch＝change ；nt＝window NT；pw＝password；

* NTPWEdit [http://cdslow.org.ru](http://cdslow.org.ru)
* PassFab 4WinKey
* Passper WinSenior

- [Windows10登陆密码破解](https://zhuanlan.zhihu.com/p/166349447)
- [Win10 开机密码破解](https://blog.csdn.net/qq_46620129/article/details/113204312)



### MSDN

* [https://www.microsoft.com/zh-cn/software-download](https://www.microsoft.com/zh-cn/software-download)
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

* iCura [iCura的帖子  - 远景论坛 - 微软极客社区](http://i.pcbeta.com/home.php?mod=space&uid=4631987&do=thread&view=me&from=space)
    * [OneDrive](https://tpedutw-my.sharepoint.com/:f:/g/personal/icura_tp_edu_tw/Ek5lPsUrc_ZJqSDKi7oxsdoBNjbbncnvi8p-90jI0OqUVA)
* WINOS [https://www.winos.me](https://www.winos.me)
* 绿色系统 [http://lvsexitong.com](http://lvsexitong.com)
* 网吧系统 [http://down.lansedongli.com](http://down.lansedongli.com)
* [twm000-导航页被定制可修改](http://twm000.top)
* [Y-OS工作室-导航页被定制可修改](http://y-os.net)
* [十二星座-导航页被定制可修改](http://www.12xzzx.com)
* win7 [https://www.newxitong.com](https://www.newxitong.com)
* 网吧无盘 [http://www.wupanbao.com](http://www.wupanbao.com)
* [https://www.sysmini.com](https://www.sysmini.com)



### WinPE

+ [Windows PE (WinPE)](https://docs.microsoft.com/zh-cn/windows-hardware/manufacture/desktop/winpe-intro)
+ [Windows USB/DVD 下载工具](https://www.microsoft.com/zh-cn/download/windows-usb-dvd-download-tool)

* 微PE [http://www.wepe.com.cn](http://www.wepe.com.cn)
* [USBOS](http://bbs.wuyou.net/forum.php?mod=viewthread&tid=349965&extra=page%3D1)
* [光卡自己的 PE 项目](https://hikaricalyx.com)
* [优启时代](http://www.uqi.me/catalog.asp?cate=1)
* [https://github.com/ventoy/Ventoy](https://github.com/ventoy/Ventoy)
* [http://wintool.cc](http://wintool.cc)



## MS相关激活

> 在PowerShell（也可在CMD）中输入命令运行`slmgr.vbs /dti`，按<kbd>Ctrl</kbd> + <kbd>C</kbd>复制，
> 并粘贴到在线获取确认ID网站：[http://webact.185.hk](http://webact.185.hk)

> 使用命令有两种方式：第一种：按<kbd>Win</kbd> + <kbd>x</kbd> + <kbd>a</kbd>进入PowerShell（也可在CMD中）输入命令运行；
> 第二种：按<kbd>Win</kbd> + <kbd>r</kbd>输入命令运行，如`slmgr.vbs /dti`，此方式必须有`.vbs`后缀，（推荐使用第一种方式）

* 小爱激活助手 [https://pan.baidu.com/s/1tOEa-uMGTKsTFDzJihFkVA](https://pan.baidu.com/s/1tOEa-uMGTKsTFDzJihFkVA) 提取码: gia8
* 密钥检测的小工具 [https://github.com/FHWWC/KeyCheck](https://github.com/FHWWC/KeyCheck)
* https://api.jike.info/ms_pid/密钥
* [https://webact.sjjzm.com](https://webact.sjjzm.com)
* [https://key.sjjzm.com](https://key.sjjzm.com)


- [Win10/Office安装与激活](https://www.cherishspring.cn/archives/woactive.html)
- [Windows和Office通用批量许可证密钥 (GVLK)](https://www.cherishspring.cn/archives/gvlk.html)


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

* [用于管理 Office 批量激活的工具](https://docs.microsoft.com/zh-cn/DeployOffice/vlactivation/tools-to-manage-volume-activation-of-office)

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

> 所谓的win10数字权利激活，是一种win10授权方法。该激活方法会记录你的电脑硬件信息，并保存到微软的服务器，
> 无需什么激活密钥。这次激活了，下次重装，联网后就能自动激活，只要你不换电脑主板和cpu，就是永久激活了。

* [https://cherishspring.cn/journals](https://cherishspring.cn/journals)
* [https://jihuo.ma/tool](https://jihuo.ma/tool)
* [http://www.aihao.cc](http://www.aihao.cc)
* [https://jike.info/category/16/账号密钥](https://jike.info/category/16/%E8%B4%A6%E5%8F%B7%E5%AF%86%E9%92%A5)

- [https://github.com/massgravel/Microsoft-Activation-Scripts](https://github.com/massgravel/Microsoft-Activation-Scripts)


**KMS**

* [https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys](https://docs.microsoft.com/zh-cn/windows-server/get-started/kmsclientkeys)
* [https://github.com/search?q=数字权利](https://github.com/search?q=%E6%95%B0%E5%AD%97%E6%9D%83%E5%88%A9)

+ [Windows 10 Digital Activation](http://forum.ru-board.com/topic.cgi?forum=2&topic=5820&start=0)
    * [https://www.solidfiles.com/folder/bd7165a0d4/](https://www.solidfiles.com/folder/bd7165a0d4/)
+ 云萌 [https://github.com/TGSAN/CMWTAT_Digital_Edition](https://github.com/TGSAN/CMWTAT_Digital_Edition)
    + [https://tgsan.github.io/CMWTAT_Digital_Edition](https://tgsan.github.io/CMWTAT_Digital_Edition)
+ [https://github.com/ahkscript/awesome-AutoHotkey](https://github.com/ahkscript/awesome-AutoHotkey)
+ [https://github.com/zbezj/HEU_KMS_Activator](https://github.com/zbezj/HEU_KMS_Activator)
+ [https://github.com/abbodi1406/WHD](https://github.com/abbodi1406/WHD)
+ [https://github.com/Wind4/vlmcsd](https://github.com/Wind4/vlmcsd)
+ [https://github.com/Mr-xn/kms-server-deploy](https://github.com/Mr-xn/kms-server-deploy)
+ [Windows激活之路](https://51.ruyo.net/tag/windows%e6%bf%80%e6%b4%bb%e4%b9%8b%e8%b7%af)
+ [https://github.com/netnr/kms](https://github.com/netnr/kms)
+ [https://official-kmspico.com](https://official-kmspico.com)

* [MicroKMS 神龙版](http://www.yishimei.cn/network/319.html)
* [人人客-微软产品](https://rrkee.com/microsoft)
* [03k.orgKMS服务](https://03k.org/kms.html)
* [kmsfiles](https://www.solidfiles.com/folder/bd7165a0d4)
* [零散坑KMS服务](https://03k.org/kms.html)
* [kms.mogeko.me](https://mogeko.me/2019/054)
* [https://kms.cangshui.net](https://kms.cangshui.net)
* [https://kms.loli.beer](https://kms.loli.beer)
* [https://www.moerats.com/kms](https://www.moerats.com/kms)
* [kmsfiles](https://www.solidfiles.com/folder/bd7165a0d4/)
* [https://kms.cangshui.net](https://kms.cangshui.net)
* [https://www.ghpym.com/kms.html](https://www.ghpym.com/kms.html)
* [https://github.com/EDragon007/EDragonKMS](https://github.com/EDragon007/EDragonKMS)



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

## 快捷键

1. <kdb>Win</kdb>+<kdb>A</kdb> 打开快速设置面板
2. <kdb>Win</kdb>+<kdb>B</kdb> 快速跳转系统托盘
3. <kdb>Win</kdb>+<kdb>C</kdb> 打开 Microsoft Teams
4. <kdb>Win</kdb>+<kdb>D</kdb> 快速显示桌面
5. <kdb>Win</kdb>+<kdb>E</kdb> 打开资源管理器
6. <kdb>Win</kdb>+<kdb>F</kdb> 一键提交反馈
7. <kdb>Win</kdb>+<kdb>G</kdb> 启动 Xbox Game Bar
8. <kdb>Win</kdb>+<kdb>H</kdb> 语音听写
9. <kdb>Win</kdb>+<kdb>I</kdb> 打开设置
10. <kdb>Win</kdb>+<kdb>K</kdb> 投屏到其他设备
11. <kdb>Win</kdb>+<kdb>L</kdb> 锁屏
12. <kdb>Win</kdb>+<kdb>M</kdb> 窗口最小化
13. <kdb>Win</kdb>+<kdb>N</kdb> 打开通知面板/月历面板
14. <kdb>Win</kdb>+<kdb>P</kdb> 修改投影模式
15. <kdb>Win</kdb>+<kdb>Q</kdb>/<kdb>Win</kdb>+<kdb>S</kdb> 一键搜索
16. <kdb>Win</kdb>+<kdb>R</kdb> 运行
17. <kdb>Win</kdb>+<kdb>T</kdb> 查看已打开程序缩略图
18. <kdb>Win</kdb>+<kdb>V</kdb> 打开云剪贴板
19. <kdb>Win</kdb>+<kdb>W</kdb> 呼出资讯与兴趣栏
20. <kdb>Win</kdb>+<kdb>X</kdb> 呼出简易开始菜单
21. <kdb>Win</kdb>+<kdb>Z</kdb> 打开窗口布局
22. <kdb>Win</kdb>+<kdb>空格</kdb> 切换输入法
23. <kdb>Win</kdb>+<kdb>→</kdb>/<kdb>↑</kdb>/<kdb>←</kdb>/<kdb>↓</kdb> 窗口排版
24. <kdb>Win</kdb>+<kdb>TAB</kdb> 虚拟桌面切换
25. <kdb>Win</kdb>+<kdb>Ctrl</kdb>+<kdb>D</kdb> 新建虚拟桌面
26. <kdb>Win</kdb>+<kdb>Prtscn</kdb> 一键截屏
27. <kdb>Win</kdb>+<kdb>Shift</kdb>+<kdb>S</kdb> 专业屏幕
28. <kdb>Win</kdb>+<kdb>Home</kdb> 最小化非活动窗口
29. <kdb>Win</kdb>+<kdb>1~9</kdb> 切换任务栏左起第1~9个程序
30. <kdb>Alt</kdb>+<kdb>Shift</kdb>+<kdb>←</kdb>/<kdb>→</kdb> 虚拟桌面窗口移动