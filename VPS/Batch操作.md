# Batch操作


* [flag](#flag)
* [执行bash](#执行bash)
* [进制转换](#进制转换)
* [获取管理员权限](#获取管理员权限)
* [隐藏窗口运行](#隐藏窗口运行)
  * [bat脚本](#bat脚本)
  * [vbs脚本](#vbs脚本)
* [开机启动](#开机启动)
  * [添加注册表](#添加注册表)
  * [启动目录](#启动目录)
* [注册表](#注册表)
  * [修改](#修改)
  * [窗口设置](#窗口设置)
  * [查询](#查询)
* [注册服务](#注册服务)
  * [加入服务](#加入服务)
  * [删除服务](#删除服务)
* [第三方工具](#第三方工具)
* [下载文件](#下载文件)
* [路由跟踪](#路由跟踪)
  * [tracert](#tracert)




## flag

* [添加快捷方式](/files/添加快捷方式.bat)

* [设置必应壁纸](/files/设置必应壁纸.bat)

* [设置GitHub的Hosts](/files/设置github的hosts.bat)

* [frpc.bat](/files/frpc.bat)

> 会自动检测本地`fprc`是否为最新版本，如果不是或者没有则下载最新版



## 执行PowerShell

- 为本账户启用策略

```batch
PowerShell Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
```

- 下载代码并通过`Invoke-Expression`执行

```batch
PowerShell Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

- 下载文件

```batch
PowerShell (New-Object System.Net.WebClient).DownloadFile('https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe','d:\\7za.exe')
```



## 进制转换

- 十进制转十六进制

```batch
@echo off&setlocal enabledelayedexpansion
set /p 十进制=请输入要转换的十进制数：
for /l %%a in (1 1 8) do (
     set /a 余=十进制%%16,十进制/=16,tmp=余+100
     set yu=!tmp:~1! !yu!
)
set yu=%yu:00=0%
for %%a in (1 2 3 4 5 6 7 8 9 A B C D E F) do (
     set /a n+=101
     for %%b in (!n:~-2!) do (
         set yu=!yu: %%b= %%a!
     )
)
echo 0x%yu: =%
pause
```

- 十六进制转十进制

```batch
set /p 十六进制=请输入十六进制数字：
set /a 十进制=0x%十六进制:*x=%
echo %十进制%
```



## 获取管理员权限

- 方式一

```batch
@echo off
cacls.exe "%SystemDrive%\System Volume Information" >nul 2>nul
if exist "%temp%\getadmin.vbs" del /f /q "%temp%\getadmin.vbs"

:: 下面为执行命令

```

- 方式二

```batch
fltmc>nul||cd/d %~dp0 && mshta vbscript:CreateObject("Shell.Application").ShellExecute("%~nx0","%1","","runas",1)(window.close)

:: 下面为执行命令

```


- 方式三

```batch
@echo off
:: 检查权限
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
:: 如果没有管理员权限，就请求管理权限
if '%errorlevel%' NEQ '0' (
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
    "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"

:begin

:: 下面为执行命令

```

- 方式四

```batch
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)
cd /d "%~dp0"

:: 下面为执行命令

```

![](/images/Windows10启用管理员.png)

## 隐藏窗口运行

### bat脚本

> 此方式会闪现`CMD`窗口

```batch
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~0 h",0)(window.close)&&exit
::mshta "javascript:new ActiveXObject('WScript.Shell').Run('%~0 h',0);window.close()"&&exit
:begin

:: 下面为执行命令

```

> 如果运行的批处理名为`a.bat`，在`C:\`下，那`%~0`代表`C:\a.bat`，`%~nx0`代表`a.bat`。`h`极为参数`%1`，`0`表示隐藏运行。
>
> 由于你双击运行，故第一次批处理`%1`为空，`if`不成立，转而运行下一句。
> 然后再次打开自己，并传递参数`h`，此时`if`成立，跳转至`begin`开始运行。


```batch
:: 静默运行软件
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /S
```

````batch
:: 添加开机静默启动
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /ADD
````

````batch
:: 删除开机静默启动
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /DEL
````


### vbs脚本

> 此方式完全不会显示`CMD`窗口（包括闪现）

```visual-basic
' 创建运行命令数组
commands = Array("D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini")

' 创建运行命令动态数组
'Set commands = CreateObject("System.Collections.ArrayList")
'commands.Add "D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini"

' 启动项键名称
keyName = "frp"

Set shell = WScript.CreateObject("WScript.Shell")

For Each command In commands
    ' cmd /c运行之后关闭窗口，0隐藏运行，false不同步运行
    shell.Run "cmd /c " & command, 0, false
Next

' 注册表项
item = "HKCU\Software\Microsoft\Windows\CurrentVersion\Run\"

' 设置开机启动
shell.RegWrite item & keyName, WScript.ScriptFullName
```


```visual-basic
ProcesseName="rclone.exe"

' 查找进程
Set WMIService = GetObject("winmgmts:{impersonationlevel=impersonate}!\\.\root\cimv2")
Set Processes = WMIService.ExecQuery("select * from win32_process where name='" & ProcesseName & "'")

For Each Process In Processes
    ' 比较两个字符串
    If InStr(UCase(Process.name), UCase(ProcesseName)) = 0 Then
        Exit for
    End If
    ' 运行程序
    Set WS = Wscript.CreateObject("Wscript.Shell")
    WS.Run "rclone mount GDrive:/ x: --cache-dir F:\Temp --vfs-cache-mode writes", 0
Next
```






## 开机启动

### 添加注册表

> `Run`键值代表着开机启动项，也就是说在这个项下的键值会随着开机启动
> （这里的开机是指用户登录，也就是说只要有登录操作就会执行，注销然后登录，也会执行这个键值）。

> `RunOnce`键值类似于`Run`键值，唯一的区别在于，`RunOnce`键值只执行一次，操作执行后会被自动删除。

- 用户启动项
1. `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
2. `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`

- 本机启动项
1. `HKLM\SYSTEM\CurrentControlSet\Control\Session Manager`
2. `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
3. `HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce`
4. `HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run`
5. `HKLM\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\RunOnce`


```batch
REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d 软件路径 /f
:: 或者，%号和"号不能使用转移字符^转义，%号转义%%，"号转义"""
REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d """"软件路径""" /background" /f
```


### 启动目录

> 把软件的快捷方式或者软件直接放在以下目录中就会开机自动运行

> 可利用[脚本添加快捷方式](/VPS/BAT脚本.md#添加快捷方式)直接在启动文件夹中生成快捷方式

> 按`win+r`打开运行窗口，输入`shell:startup`打开启动文件夹，把快捷方式或者软件放入


- Win7及以上（当前用户）: `%AppData%\Microsoft\Windows\Start Menu\Programs\Startup`

- 启动目录（所有用户）: `%ProgramData%\Microsoft\Windows\Start Menu\Programs\StartUp`



## 注册表

> 注册表被称为Windows操作系统的核心，它的工作原理实质是一个庞大的数据库，存放了关于计算机硬件的配置信息、
> 系统和应用软件的初始化信息、应用软件和文档文件的关联关系、硬件设备的说明以及各种状态信息和数据，
> 包括Windows操作时不断引用的信息。

> 例如：系统中的硬件资源、硬件信息、分配正在使用的端口、
> 每个用户的配置文件、计算机上安装的应用程序以及每个应用程序可以创建的文件类型等。

> 组策略设置的实质是修改注册表中的配置

- 主要作用

1. 记录安装信息 
2. 设置硬件 
3. 设置软件 
4. 定制Windows 
5. 系统安全管理 
6. 自动运行程序 
7. 网络设置



* [Windows注册表内容详解](https://zhuanlan.zhihu.com/p/72194354)

* [简析Windows注册表](https://segmentfault.com/a/1190000016854021)

* [windows注册表](https://www.cnblogs.com/weiyinfu/p/10961872.html)


- 注册表的分支结构

| 注册表短根键名      	| 注册表长根键名      	| 作用                                                      	|
|---------------------	|---------------------	|-----------------------------------------------------------	|
| HKCU                	| HKEY_CURRENT_USER   	| 存储当前用户设置的信息。当前用户登录后才执行的操作              	|
| HKLM                	| HKEY_LOCAL_MACHINE  	| 包括安装在计算机上的硬件和软件的信息。所有操作在用户登录前就执行了	|
| HKCR                	| HKEY_CLASSES_ROOT   	| 存储Windows可识别的文件类型的详细列表，以及相关联的程序。 	|
| HKEY_USERS          	| HKEY_USERS          	| 包含使用计算机的用户的信息。                              	|
| HKEY_CURRENT_CONFIG 	| HKEY_CURRENT_CONFIG 	| 这个分支包含计算机当前的硬件配置信息。                    	|



### regini

* [regini和其他所有命令官方文档](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/regini)


| 权限 	| 说明                                	|
|------	|-------------------------------------	|
| 1    	| Administrators 完全访问             	|
| 2    	| Administrators 只读访问             	|
| 3    	| Administrators 读和写入访问         	|
| 4    	| Administrators 读、写入、删除访问   	|
| 5    	| Creator 完全访问                    	|
| 6    	| Creator 读和写入访问                	|
| 7    	| everyone 完全访问                   	|
| 8    	| everyone 只读访问                   	|
| 9    	| everyone 读和写入访问               	|
| 10   	| everyone 读、写入、删除访问         	|
| 11   	| Power Users 完全访问                	|
| 12   	| Power Users 读和写入访问            	|
| 13   	| Power Users 读、写入、删除访问      	|
| 14   	| System Operators 完全访问           	|
| 15   	| System Operators 读和写入访问       	|
| 16   	| System Operators 读、写入、删除访问 	|
| 17   	| System 完全访问                     	|
| 18   	| System 读和写入访问                 	|
| 19   	| System 只读访问                     	|
| 20   	| Administrators 读、写、执行访问     	|
| 21   	| Interactive User 完全访问           	|
| 22   	| Interactive User 读和写入访问       	|
| 23   	| Interactive User 读、写入、删除访问 	|



### 修改

> `/v` 设置键名(value)

> `/t` 设置数据类型(type)

> `/d` 设置添加的值(data)

> `/f` 表示强制(forbidden)

- 删除桌面IE图标

```batch
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{B416D21B-3B22-B6D4-BBD3-BBD452DB3D5B}" /f
```

- 修改开机时小数字键盘不开启的问题

```batch
REG ADD "HKU\.DEFAULT\Control Panel\Keyboard" /v InitialKeyboardIndicators /t REG_SZ /d 2 /f
```

- 把图片设置为壁纸

```batch
REG ADD "HKCU\Control Panel\Desktop" /v TileWallpaper /d "0" /f 
REG ADD "HKCU\Control Panel\Desktop" /v Wallpaper /d "图片绝对路径" /f
REG ADD "HKCU\Control Panel\Desktop" /v WallpaperStyle /t REG_DWORD /d 2 /f
RunDll32.exe USER32.DLL,UpdatePerUserSystemParameters
```

- 开机自动运行

```batch
REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 自定义命名 /d %0 /f

```

- 替换默认记事本

```batch
REG ADD "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%ProgramFiles(x86)%\Notepad3\notepad3.exe\" -notepadStyleCmdline -z" /f
```


- 恢复系统默认记事本

```batch
REG DELETE "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
REG DELETE "HKLM\Software\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
REG DELETE "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /f
```




- Windows Defender

```batch
:: 关闭“启用Windows安全中心服务”的通知
REG DELETE "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\ShellServiceObjects\{F56F6FDD-AA9D-4618-A949-C1B91AF43B1A}" /f

:: 关闭Windows Defender
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender" /v "DisableAntiSpyware" /d 1 /t REG_DWORD /f

:: 启用Windows Defender
REG ADD "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender" /v "DisableAntiSpyware" /d 0 /t REG_DWORD /f   
   
```




### 窗口设置

```batch
Mode con cols=宽分辨率 lines=高分辨率
```

> 窗口大小是被改成了你想要的, 可是屏幕缓冲区的大小也变成了一样，这让你无法追溯屏幕打印的历史，
> 也就是说`mode`对于窗口大小和屏幕缓冲区大小不能单独设置。

> 解决办法就是修改注册表，先要知道保存系统默认的`cmd`命令窗口的屏幕缓冲区大小的两个键值

```batch
:: 窗口大小
HKEY_CURRENT_USER\Console\ScreenBufferSize

:: 屏幕缓冲区大小
HKEY_CURRENT_USER\Console\WindowSize
```

> 值是用的十六进制值来表示的，十六进制可以前加零来补齐为8位来理解
>
> 十六进制的前四位是高，后四位是宽

```batch
:: 窗口高宽40*120
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v WindowSize /d 0x00280078 /f
:: 屏幕缓冲区高宽1000*120
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v ScreenBufferSize /d 0x03e80078 /f
```


### 查询

```bash
FOR /F "usebackq delims==" %i IN (`REG QUERY HKCU /v onedrive /s`) DO @echo %i
```

## 注册服务

* [https://www.cnblogs.com/pingming/p/5108947.html](https://www.cnblogs.com/pingming/p/5108947.html)

### 加入服务

```batch
:: 等号后面的空格必须
sc create 服务名称 binPath= 执行程序路径或者命令 start= auto displayname= "描述"
```

- 示例

```batch
sc create frp内网穿透 binPath= D:\frp\frps.bat start= auto displayname= "frp内网穿透"

sc create frp内网穿透 binPath= "cmd.exe /c D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini" start= auto displayname= "frp内网穿透"
```


### 删除服务

```batch
sc delete 服务名称
```



## 第三方工具

* [wget-网络请求工具](https://eternallybored.org/misc/wget/)

* [curl-网络请求工具](https://curl.haxx.se/dlwiz/?type=bin) [curl-GitHub](https://github.com/curl/curl)

* [jq-解析json工具](https://github.com/stedolan/jq)

* [Batch-CN-在线第三方管理](http://www.bathome.net/thread-32322-1-1.html) [bcn](http://bcn.bathome.net/s/tool/index.html)

* [转换位图图像](https://imagemagick.org/index.php)


## 下载文件

- 推荐使用`bat`脚本执行`JavaScript`脚本下载文件

* [从github下载文件的多种方法](https://3gstudent.github.io/3gstudent.github.io/%E6%B8%97%E9%80%8F%E6%8A%80%E5%B7%A7-%E4%BB%8Egithub%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%9A%E7%A7%8D%E6%96%B9%E6%B3%95/)


- `certutil`

> 用户备份证书服务管理，每次下载都会有缓存
>
> 缓存目录：`%USERPROFILE%\AppData\LocalLow\Microsoft\CryptnetUrlCache\Content`

```batch
certutil -urlcache -split -f https://blog-static.cnblogs.com/files/gayhub/bcn.js C:\Windows\bcn.bat
```

- `bitsadmin`

> `bitsadmin.exe` `bitsadmin`是`windows`后台智能传输服务的一个工具，`windows`的自动更新，补丁之类的下载就是用这个工具来实现的。

```batch
:: 无进度条等信息
bitsadmin /rawreturn /transfer 任务名 https://blog-static.cnblogs.com/files/gayhub/bcn.js C:\Windows\bcn.bat
:: 有进度条等信息
bitsadmin /transfer 任务名 /download /priority normal https://blog-static.cnblogs.com/files/gayhub/bcn.js C:\Windows\bcn.bat
```


## 路由跟踪

### tracert

> Tracert（跟踪路由）是一个简单的网络诊断工具，可以列出分组经过的路由节点，以及它在IP 网络中每一跳的延迟。（这里的延迟是指：分组从信息源发送到目的地所需的时间，延迟也分为许多的种类——传播延迟、传输延迟、处理延迟、排队延迟等，是大多数网站性能的瓶颈之一）.

```bash
tracert [-d] [-h maximum_hops] [-j host-list] [-w timeout] [-R] [-S srcaddr] [-4] [-6] target_name
```

- **选项**

- `-d` 指定不将 IP 地址解析到主机名称。
- `-h maximum_hops` 指定跃点数以跟踪到称为 target_name 的主机的路由。
- `-j host-list` 指定 Tracert 实用程序数据包所采用路径中的路由器接口列表。
- `-w timeout` 等待 timeout 为每次回复所指定的毫秒数。
- `target_name` 目标主机的名称或 IP 地址。

- **示例**

```bash
tracert www.woytu.com
```


