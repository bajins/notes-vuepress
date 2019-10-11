# BAT脚本使用


* [常见问题](#常见问题)
* [执行bash](#执行bash)
  * [安装Git](#安装git)
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
* [添加快捷方式](#添加快捷方式)
* [命令](#命令)
  * [文件操作](#文件操作)
  * [查看本机ip](#查看本机ip)
  * [查DNS](#查dns)
  * [刷新DNS](#刷新dns)
  * [清除屏幕](#清除屏幕)
  * [查看端口占用](#查看端口占用)
  * [查看占用的`pid`](#查看占用的pid)
  * [查看被占用端口的`pid`](#查看被占用端口的pid)
  * [结束进程](#结束进程)
  * [延时](#延时)
  * [判断变量字符串](#判断变量字符串)
  * [获取为指定后缀的文件](#获取为指定后缀的文件)
  * [获取不为指定后缀的文件](#获取不为指定后缀的文件)
  * [判断字符串是否包含子字符串](#判断字符串是否包含子字符串)
  * [替换文件中指定内容](#替换文件中指定内容)
  * [判断是文件还是文件夹](#判断是文件还是文件夹)
* [第三方工具](#第三方工具)
* [下载文件](#下载文件)
* [路由跟踪](#路由跟踪)
  * [tracert](#tracert)






## 常见问题

- `if`和`for`的条件与后面跟的`(`之间必须要有一个空格，否则会出现`命令语法不正确`的问题！

- 使用cd切换目录时，如果带盘符一定要加`/d`参数，否则切换无效

- 双引号中包含双引号最里层的要用三个`"""`转义，`&`符号要用`^`转义
  - 示例:使用`curl`配合`jq`获取必应壁纸下载地址
  
```batch
curl "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1" | jq-win64.exe ".images[0].url | """https://cn.bing.com""" + .[0:index("""^&""")]" >> bing.txt
```


## 执行bash

### 安装Git

* [https://git-scm.com/download/win](https://git-scm.com/download/win)

```batch
"%ProgramFiles%\Git\bin\bash.exe" -c "命令"
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

## 开机启动

### 添加注册表

```batch
REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d 软件路径 /f
:: 或者，%号和"号不能使用转移字符^转义，%号转义%%，"号转义"""
REG ADD "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d """"软件路径""" /background" /f
```


### 启动目录

> 把软件的快捷方式或者软件直接放在以下目录中就会开机自动运行

> 可利用[脚本添加快捷方式](/VPS/BAT脚本.md#添加快捷方式)直接在启动文件夹中生成快捷方式

> 按`win+r`打开运行窗口，输入`shell:startup`打开启动文件夹，把快捷方式或者软件放入

- WinXP: `C:/Documents and Settings/Administrator/「开始」菜单/程序/启动`

- Win10和Win7: `%AppData%\Microsoft\Windows\Start Menu\Programs\Startup`

- 通用启动目录: `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`



## 注册表

| 注册表短根键名       | 注册表长根键名        |
|---------------------|---------------------|
| HKCU                | HKEY_CURRENT_USER   |
| HKLM                | HKEY_LOCAL_MACHINE  |
| HKCR                | HKEY_CLASSES_ROOT   |
| HKEY_USERS          | HKEY_USERS          |
| HKEY_CURRENT_CONFIG | HKEY_CURRENT_CONFIG |


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

- 默认记事本

```batch
:: 替换Windows默认记事本
REG ADD "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%ProgramFiles(x86)%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f

:: 恢复系统记事本
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
:: 窗口宽高120*40
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v WindowSize /d 0x00280078 /f
:: 屏幕缓冲区宽高120*2000
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v ScreenBufferSize /d 0x07d00078 /f
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


## 命令


### 文件操作

#### 查看目录下的文件

> 类似于linux下的ls

```batch
dir
```

#### 创建目录

```batch
md 目录名（文件夹）
```

#### 删除目录

```batch
rd  目录名（文件夹）
```

#### 拷贝文件

```batch
copy 路径\文件名 路径\文件名
```

#### 移动文件

```batch
move 路径\文件名 路径\文件名
```
#### 删除文件

> 不能删除文件夹

```batch
del 文件名
```

### 查看本机ip

```batch
ipconfig
```

### 查DNS

```batch
nslookup 域名
```

### 刷新DNS

> `C:\Windows\System32\drivers\etc\hosts`

```batch
ipconfig /flushdns
```


### 清除屏幕

> 类似于linux下的clear

```batch
cls
```


### 查看端口占用

```batch
netstat -an | find "0.0.0.0:80"
```

### 查看占用的`pid`

> 在`windows`系统下，不能直接使用反引号执行命令，要使用`for`循环变通下，在`for`循环中使用单`'`括起来执行命令

> 在`cmd`命令窗口中直接使用`for`循环只能使用单`%`设置变量
>
> 而在`bat`脚本文件中只能用双`%%`设置变量
>
> 而且在`for`循环中执行的命令带有`|`等特殊符号需要使用`^`转义


```batch
:: 用findstr命令搜索
for /f %%i in ('tasklist ^| findstr /i "程序名"') do set reslut=%%i

:: 只输出PID编号
for /f "skip=3 tokens=2" %a in ('tasklist /fi "imagename eq 程序名*"') do @echo %a
```

### 查看被占用端口的`pid`

```batch
netstat -ano | findstr 80
```

### 结束进程

```batch
taskkill /pid 进程号 /f
```


### 延时

```batch
:: 延时等待10秒
choice /t 10 /d y /n >nul
:: 延时等待10秒
timeout /T 10 /NOBREAK
:: 持续等待，直到按下任意按键，类似于pause
timeout /T -1
:: 持续等待，直到你按下CTRL+C按键
timeout /T -1 /NOBREAK
```

### 判断变量字符串

> 注意：在|两端不能有空格，如果有空格则会出现匹配不正确
> 
> 这里有个BUG不能取反匹配，比如用`[^0-9]`匹配不是纯数字的字符，匹配到`.`会通过

- 判断是否为数字、字母

```batch
:: 判断是否为数字、字母，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
echo %var%|findstr "^[a-z0-9]*$" >nul && (
    ECHO.
    ECHO.输入的：%var%
    ECHO.
) || (
    ECHO.
    ECHO.输入的必须为纯小写字母或数字！
    ECHO.
)
```

- 判断是否为纯数字

```batch
:: 判断是否为纯数字，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
echo %port%|findstr "^[0-9]*$" >nul && (
    ECHO.
    ECHO.输入的端口：%port%
    ECHO.
) || (
    ECHO.
    ECHO.端口必须为纯数字！
    ECHO.
)
```




### 获取为指定后缀的文件

```batch
::获取为指定后缀的文件
for /r %~dp0 %%a in (*.jpg,*.png) do (
	::把文件后缀赋值给变量
	set suffix = %%~xa
	::把文件名赋值给变量（没有后缀）
	set name = %%~na
	::把路径赋值给变量（不带驱动号和文件名）
	set path = %%~pa
	::把驱动号赋值给变量
	set drive = %%~da
	
	::判断后缀
	if /i "!suffix!" neq ".bmp" (
		ren "%%~a" "%%~na.bmp"
	)
)
```
```batch
::获取为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /e "\.jpg\> \.png\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```

### 获取不为指定后缀的文件

```batch
::获取不为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /v "\.bat\> \.text\> \.exe\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```

### 判断字符串是否包含子字符串

```batch
:: 判断变量字符串中是否包含字符串
echo %字符串% | findstr %子串% >nul && (
    echo 包含
) || (
    echo 不包含
)
```
```batch
set error=1
:: 判断文件中是否包含字符串
findstr/i "123" 1.txt >nul 2>nul&&set "error="
if defined error (
    echo 不包含
) else (
    echo 包含
)
```

### 替换文件中指定内容

```batch
@echo off
:: 解决把中文写入文件乱码问题（声明采用UTF-8编码），936为GBK，437为美国英语
:: https://blog.csdn.net/python_class/article/details/81560470
chcp 65001

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal EnableDelayedExpansion

set file=%~dp0nav.md
:: 替换文件中指定内容
(
    for /f "tokens=*" %%i in (%file%) do (
        :: 把当前行的内容赋值到变量
        set s=%%i
        :: 不为空行时
        if not !s!.==. (
            :: 替换内容中的反斜杠为正斜杠
            set s=!s:\=/!
            echo !s!
        )
    )
)>%file%

goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
```

### 判断是文件还是文件夹

> 如果是文件夹，则`test`和`test\`、`test\.`、`test\nul`是等同的；
> 如果是文件，则`test`不等同于三者中的任何一个

```batch
if exist test\ (
    echo test 是文件夹
) else (
    echo test 是文件
)
```

```batch
dir /ad test >nul 2>nul && (
    echo test 是文件夹
) || (
    echo test 是文件
)
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

#### 选项

- `-d` 指定不将 IP 地址解析到主机名称。
- `-h maximum_hops` 指定跃点数以跟踪到称为 target_name 的主机的路由。
- `-j host-list` 指定 Tracert 实用程序数据包所采用路径中的路由器接口列表。
- `-w timeout` 等待 timeout 为每次回复所指定的毫秒数。
- `target_name` 目标主机的名称或 IP 地址。

#### 示例

```bash
tracert www.woytu.com
```