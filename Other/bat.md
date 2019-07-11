# bat脚本使用

## 获取管理员权限
### 方式一
```batch
@echo off
cacls.exe "%SystemDrive%\System Volume Information" >nul 2>nul
if exist "%temp%\getadmin.vbs" del /f /q "%temp%\getadmin.vbs"

:: 下面为执行命令

```

### 方式二
```batch
fltmc>nul||cd/d %~dp0 && mshta vbscript:CreateObject("Shell.Application").ShellExecute("%~nx0","%1","","runas",1)(window.close)

:: 下面为执行命令

```


### 方式三
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

### 方式四
```batch
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)
cd /d "%~dp0"

:: 下面为执行命令

```


## 隐藏窗口运行（静默运行）
```batch
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close) && exit
:begin

:: 下面为执行命令

```
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


## 修改注册表
```batch
echo 删除桌面IE图标
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{B416D21B-3B22-B6D4-BBD3-BBD452DB3D5B}" /f

echo 修改开机时小数字键盘不开启的问题
REG ADD "HKU\.DEFAULT\Control Panel\Keyboard" /v InitialKeyboardIndicators /t REG_SZ /d 2 /f

```

> `/v` 设置键名(value)
> 
> `/t` 设置数据类型(type)
> 
> `/d` 设置添加的值(data)
> 
> `/f` 表示强制(forbidden)

## 注册Windows服务
https://www.cnblogs.com/pingming/p/5108947.html
### 加入服务:
```batch
::等号后面的空格必须
sc create 服务名称 binPath= 路径 start= auto
```
### 删除服务:
```batch
sc delete 服务名称
```

### 例一：
```batch
sc create frp内网穿透 binPath= D:\frp\frps.bat start= auto displayname= "frp内网穿透"
```

### 例二：
```batch
sc create frp内网穿透 binPath= "cmd.exe /c D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini" start= auto displayname= "frp内网穿透"
```

## 添加快捷方式
```batch
:: -------------------------------------------------------------------
::                          添加开机静默启动
::                     by https://www.bajins.com
::                   GitHub https://woytu.github.io
:: -------------------------------------------------------------------


@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close) && exit
:begin

::设置快捷方式名称（必选）
:: %~dp0 当前所在目录
:: %0 当前执行脚本路径
set LnkName=测试.exe

::设置快捷方式显示的说明（可选）
set Desc=测试

:: 设置快捷方式存放路径，DesKtop、Startup、AllUsersStartup、AllUsersDesktop
set folder=DesKtop


::设置程序或文件的完整路径（必选）
set Program=%~dp0%LnkName%

::设置程序的工作路径，一般为程序主目录，此项若留空，脚本将自行分析路径
set WorkDir=%~dp0

if not defined WorkDir call:GetWorkDir "%Program%"

::创建
(
	echo Set WshShell=CreateObject("WScript.Shell"^)
	echo folder=WshShell.SpecialFolders("%folder%"^)
	echo Set oShellLink=WshShell.CreateShortcut(folder^&"\%LnkName%.lnk"^)
	echo oShellLink.TargetPath="%Program%"
	echo oShellLink.WorkingDirectory="%WorkDir%"
	echo oShellLink.WindowStyle=1
	echo oShellLink.Description="%Desc%"
	echo oShellLink.Save
	echo Msgbox("快捷方式创建成功！"^)
) > makelnk.vbs

makelnk.vbs
del /f /q makelnk.vbs
exit

goto :eof

:GetWorkDir
	set WorkDir=%~dp1
	set WorkDir=%WorkDir:~,-1%

goto :eof
```

## Windows启动运行
### 增加注册表方式
```batch
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d 软件路径 /f
:: 或者，%号和"号不能使用转移字符^转义，%号转义%%，"号转义"""
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d """"软件路径""" /background" /f
```
> 按`win+r`打开运行窗口，输入以下命令`shell:startup`打开启动文件夹，把快捷方式放入
>
> 可利用[脚本添加快捷方式](#添加快捷方式)直接在启动文件夹中生成快捷方式

## 命令
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
### 获取不为指定后缀的文件
```batch
::获取不为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /v "\.bat\> \.text\> \.exe\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```

## 第三方工具
[wget-网络请求工具](https://eternallybored.org/misc/wget/)

[curl-网络请求工具](https://curl.haxx.se/download.html) [curl-GitHub](https://github.com/curl/curl)

[jq-解析json工具](https://github.com/stedolan/jq)

[Batch-CN-在线第三方管理](http://www.bathome.net/thread-32322-1-1.html)

## 下载文件
### certutil
> 用户备份证书服务管理，每次下载都会有缓存
>
> 缓存目录：`%USERPROFILE%\AppData\LocalLow\Microsoft\CryptnetUrlCache\Content`

```batch
certutil -urlcache -split -f https://www.xxx.com/test.bat d:\test.bat
```

### bitsadmin
> bitsadmin.exe 可以用来在windows 命令行下下载文件。bitsadmin是windows 后台智能传输服务的一个工具，windows 的自动更新，补丁之类的下载就是用这个工具来实现的。

```batch
:: 无进度条等信息
bitsadmin /rawreturn /transfer 任务名 https://www.xxx.com/test.bat d:\test.bat
:: 有进度条等信息
bitsadmin /transfer 任务名 /download /priority normal https://www.xxx.com/test.bat d:\test.bat
```