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

## VBScript

### Windows启动运行

> 按`win+r`打开运行窗口，输入以下命令`shell:startup`打开启动文件夹，把vbs后缀文件放入


