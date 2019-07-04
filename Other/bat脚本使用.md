# bat脚本使用

## 获取管理员权限
### 方式一
```powershell
@echo off
cacls.exe "%SystemDrive%\System Volume Information" >nul 2>nul
if exist "%temp%\getadmin.vbs" del /f /q "%temp%\getadmin.vbs"

:: 下面为执行命令

```

### 方式二
```powershell
fltmc>nul||cd/d %~dp0 && mshta vbscript:CreateObject("Shell.Application").ShellExecute("%~nx0","%1","","runas",1)(window.close)

:: 下面为执行命令

```


### 方式三
```powershell
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
```powershell
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)
cd /d "%~dp0"

:: 下面为执行命令

```


## 隐藏窗口运行（静默运行）
```powershell
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close) && exit
:begin

:: 下面为执行命令

```
```powershell
:: 静默运行软件
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /S
```
````powershell
:: 添加开机静默启动
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /ADD
````
````powershell
:: 删除开机静默启动
Pushd %~dp0
start /wait /B "" "%~dp0软件名称" /DEL
````


## 修改注册表
```powershell
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
```powershell
::等号后面的空格必须
sc create 服务名称 binPath= 路径 start= auto
```
### 删除服务:
```powershell
sc delete 服务名称
```

### 例一：
```powershell
sc create frp内网穿透 binPath= D:\frp\frps.bat start= auto displayname= "frp内网穿透"
```

### 例二：
```powershell
sc create frp内网穿透 binPath= "cmd.exe /c D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini" start= auto displayname= "frp内网穿透"
```

## 添加快捷方式
```powershell
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

## VBScript
[WScript对象属性](https://www.cnblogs.com/wakey/p/5795845.html)
### 输入内容到记事本
```visual-basic
' 进行变量声明
Dim Wshshell,Msg

' InputBox 弹窗输入
' inputbox(“”,”“,”“) 有三个参数，第一个参数提醒用，第二个参数提示用，第三个参数为默认框
Msg=InputBox("请输入要发送的语句.", "语句")

' Msgbox() 输出了你输入进来的东西
Msgbox(Msg)
' Wscript.Echo() 同Msgbox()
Wscript.Echo(Msg)

' 设置对脚本宿主对象引用赋给变量
Set Wshshell = Wscript.CreateObject("Wscript.Shell")

' 运行命令参数 （这里打开系统自带的记事本程序）
Wshshell.run "notepad"

' 暂停 200 毫秒
Wscript.Sleep 200

' 激活具有指定标题的窗口（确保要激活指定标题的窗体已经运行）
Wshshell.AppActivate "无标题-记事本"

' SendKeys 键击 参数说明
' 如 Enter 回车建 表示 {Enter} 、 字母 A 表示 {A} 、 数字 2 表示 {2} 等
' 示例 Wshshell.SendKeys "{Enter}" Wshshell.SendKeys "{A}"    Wshshell.SendKeys "{2}"
' 组合键 Shift 用 + 代替 、 Ctrl 用 ^ 代替 、Alt 用 % 代替
' 示例 Wshshell.SendKeys "+%{DELETE}"  Wshshell.SendKeys "^{C}"   Wshshell.SendKeys "^{V}"
' 模拟按键 （键入变量 Msg 的内容）
Wshshell.SendKeys Msg

' 模拟快捷键 Ctrl + S （保存内容）
Wshshell.SendKeys "^{s}"

' 退出执行
WScript.Quit
```
### Windows特殊文件夹
```visual-basic
' 设置对脚本宿主对象引用赋给变量
Set Wshshell = Wscript.CreateObject("Wscript.Shell")
' WshShell对象的SpecialFolders属性返WshSpecialFolders 对象，该对象是一个特殊文件夹集合，其中包含整套Windows特殊文件夹
Set sf = Wshshell.SpecialFolders
Msgbox("公共桌面： " & sf("AllUsersDesktop"))
Msgbox("公共程式： " & sf("AllUsersStartMenu"))
Msgbox("公共程序： " & sf("AllUsersPrograms"))
Msgbox("公共启动： " & sf("AllUsersStartup"))
Msgbox("桌面： " & sf("Desktop"))
Msgbox("收藏： " & sf("Favorites"))
Msgbox("字体： " & sf("Fonts"))
Msgbox("我的文档： " & sf("MyDocuments"))
Msgbox("网络： " & sf("NetHood"))
Msgbox("打印机： " & sf("PrintHood"))
Msgbox("程序： " & sf("Programs"))
Msgbox("最近： " & sf("Recent"))
Msgbox("发给： " & sf("SendTo"))
Msgbox("开始菜单： " & sf("StartMenu"))
Msgbox("启动： " & sf("Startup"))
Msgbox("模板： " & sf("Templates"))
Msgbox("应用程序数据： " & sf("AppData"))
```

## Windows启动运行
### 增加注册表方式
```powershell
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d 软件路径 /f
:: 或者
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v 软件名 /d "软件路径" /background /f
```
> 按`win+r`打开运行窗口，输入以下命令`shell:startup`打开启动文件夹，把快捷方式放入
>
> 可利用[脚本添加快捷方式](#添加快捷方式)直接在启动文件夹中生成快捷方式

## 命令
### 获取为指定后缀的文件
```powershell
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
```powershell
::获取不为指定后缀的文件
for /f "delims=" %%i in ('dir /s /b /a  %~dp0 ^| findstr /v "\.bat\> \.text\> \.exe\>"') do (
	::把文件后缀写入文件
	echo %%~dpnxi >> test.txt
)
```