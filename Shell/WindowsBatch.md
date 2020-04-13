# WindowsBatch


[[toc]]




## flag

* [Windows 命令-官方文档](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)
* [windows常用命令](https://www.cnblogs.com/kekec/p/3662125.html)
* [windows批处理语法](https://www.cnblogs.com/kekec/p/3937530.html)
* [windows之四十个bat脚本命令](https://juejin.im/post/5d50c631518825378d5d6121)
* [windows bat脚本总结](https://segmentfault.com/a/1190000018614430)
* [Windows 10/8/7的Rundll32命令列表](https://www.thewindowsclub.com/rundll32-shortcut-commands-windows)
* [https://gitlab.com/jarv/cmdchallenge](https://gitlab.com/jarv/cmdchallenge)
[https://cmdchallenge.com](https://cmdchallenge.com)


+ [添加快捷方式](/files/添加快捷方式.bat)
+ [设置必应壁纸](/files/设置必应壁纸.bat)
+ [设置GitHub的Hosts](/files/设置github的hosts.bat)
+ [frpc.bat](/files/frpc.bat)

> 会自动检测本地`fprc`是否为最新版本，如果不是或者没有则下载最新版


- `if`和`for`的条件与后面跟的`(`之间必须要有一个空格，否则会出现`命令语法不正确`的问题！
- 使用cd切换目录时，如果带盘符一定要加`/d`参数，否则切换无效
- 双引号中包含双引号最里层的要用三个`"""`转义，`&`符号要用`^`转义
  - 示例:使用`curl`配合`jq`获取必应壁纸下载地址
  
```batch
curl "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1" | jq-win64.exe ".images[0].url | """https://cn.bing.com""" + .[0:index("""^&""")]" >> bing.txt
```


## 文件操作

### 列出文件

> 类似于linux下的ls

```batch
dir
```

### 创建目录

```batch
md 目录名（文件夹）
```

### 删除目录

```batch
rd  目录名（文件夹）
```

### 拷贝文件

```batch
copy 路径\文件名 路径\文件名
```

### 移动文件

```batch
move 路径\文件名 路径\文件名
```

### 删除文件

> 不能删除文件夹

```batch
del 文件名
```

### 获取目录名

```batch
:: 顺序循环，设置最后一个为当前目录
for /f "delims=" %%i in ("%cd%") do set folder=%%~ni
echo %folder%

:: 仅将 %0 扩充到一个路径
set currentPath=%~dp0
:: 替换\为,号，也可以替换为空格
set currentPath=%currentPath:\=,%
:: 顺序循环，设置最后一个为当前目录
for %%a in (%currentPath%) do set folder=%%a
echo %folder%
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



### 解压MSI

```batch
msiexec /a "MSI文件路径" /qn TARGETDIR="解压输出目录绝对路径"
```



## 环境变量

* [set](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/set_1)
* [setx](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/setx)
**`SET`与`SETX`的区别**

- `SET` 用于设置临时环境变量和查看环境变量

- `SETX` 用于设置用户环境变量和系统环境变量

> 变量值有空格或`%`等特殊字符时必须用`"`包括起来

> `SETX 变量名 变量值` 设置用户环境变量，记录在注册表`HKEY_CURRENT_USER`

> `SETX /M 变量名 变量值` 设置系统环境变量，记录在注册表`HKEY_LOCAL_MACHINE`


### 查看环境变量

- 查看所有环境变量

```batch
:: 在末尾输入变量名就是查询单个变量
SET
:: 或者这样查询单个环境变量
ECHO %PATH%
```

- 查看用户环境变量

```batch
:: 替换最后的*号为变量名就是查询单个变量
REG QUERY "HKCU\Environment" /v *
```

- 查看系统环境变量

```batch
:: 替换最后的*号为变量名就是查询单个变量
REG QUERY "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v *
```

### 设置环境变量

- 临时有效

```batch
set path=%path%;D:\test
```

- 永久有效

```batch
setx path "%path%;D:\test"
setx /m path "%path%;D:\test"
```


## 清除屏幕

> 类似于linux下的clear

```batch
cls
```


## IP端口DNS进程

**查看本机ip**

```batch
ipconfig
```


### DNS

```batch
nslookup 域名
```

**刷新DNS**

> `C:\Windows\System32\drivers\etc\hosts`

```batch
ipconfig /flushdns
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

**查看被占用端口的`pid`**

```batch
netstat -ano | findstr 80
```

### 结束进程

```batch
taskkill /pid 进程号 /f
taskkill /f /im 程序名
```


## 延时

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

## 判断字符串

> 注意：在|两端不能有空格，如果有空格则会出现匹配不正确
> 
> 这里有个BUG不能取反匹配，比如用`[^0-9]`匹配不是纯数字的字符，匹配到`.`会通过

**判断是否为数字、字母**

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

**判断是否为纯数字**

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

**判断字符串是否包含子字符串**

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

- Windows10启用管理员

> 快捷键<kbd>Win</kbd> + <kbd>r</kbd> 打开“运行”输入`gpedit.msc`并运行 -> `Windows 设置` -> `安全设置` -> `安全选项`

> 禁用：`用户账户控制：以管理员批准模式运行所有管理员`

> 禁用：`用户账户控制：用于内置管理员账户的管理员批准模式`

> 启用：`账户：管理员账户状态`


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


## 隐藏窗口运行


**[vbs脚本](/System/WindowsScript.md#vbs函数封装)**

> 此方式完全不会显示`CMD`窗口（包括闪现）


**bat脚本**

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

> 可利用[脚本添加快捷方式](/files/添加快捷方式.bat)直接在启动文件夹中生成快捷方式

> 按`win+r`打开运行窗口，输入`shell:startup`打开启动文件夹，把快捷方式或者软件放入


- Win7及以上（当前用户）: `%AppData%\Microsoft\Windows\Start Menu\Programs\Startup`

- 启动目录（所有用户）: `%ProgramData%\Microsoft\Windows\Start Menu\Programs\StartUp`



## 注册表

> 注册表被称为Windows操作系统的核心，它的工作原理实质是一个庞大的数据库，存放了关于计算机硬件的配置信息、
> 系统和应用软件的初始化信息、应用软件和文档文件的关联关系、硬件设备的说明以及各种状态信息和数据，包括Windows操作时不断引用的信息。

> 例如：系统中的硬件资源、硬件信息、分配正在使用的端口、每个用户的配置文件、计算机上安装的应用程序以及每个应用程序可以创建的文件类型等。

> 组策略设置的实质是修改注册表中的配置

**主要作用**

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


**注册表的分支结构**

| 注册表短根键名      	| 注册表长根键名      	| 作用                                                      	|
|---------------------	|---------------------	|-----------------------------------------------------------	|
| HKCU                	| HKEY_CURRENT_USER   	| 存储当前用户设置的信息。当前用户登录后才执行的操作              	|
| HKLM                	| HKEY_LOCAL_MACHINE  	| 包括安装在计算机上的硬件和软件的信息。所有操作在用户登录前就执行了	|
| HKCR                	| HKEY_CLASSES_ROOT   	| 存储Windows可识别的文件类型的详细列表，以及相关联的程序。 	|
| HKEY_USERS          	| HKEY_USERS          	| 包含使用计算机的用户的信息。                              	|
| HKEY_CURRENT_CONFIG 	| HKEY_CURRENT_CONFIG 	| 这个分支包含计算机当前的硬件配置信息。                    	|


**系统默认注册表位置**


- 为所有用户安装的程序：`HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`

- 为当前用户安装的程序：`HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall`

- 64位系统中的32位程序：`HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall`

> 这3个注册表总有一个包含你要找的程序，不包括UWP应用。

> 隐藏指定的程序：在右边空白处（或左边的项名称）点击右键->新建->DWORD（32位）值，命名为`SystemComponent`，
> 并修改数据为`1`（新建后双击名称或右键点击选择修改，默认为`0`）。

> 如果注册表项下面有"SystemComponent"字段并且值等于`1`时，表示这是个系统组件，而不是应用软件。

> 如果注册表项下面有"ParentKeyName"字段则表示该项是某个分类下的子项，一般情况补丁才会有"ParentKeyName"字段。





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
REG ADD "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"记事本程序路径\" -z" /f
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

* [wget-网络请求工具](https://eternallybored.org/misc/wget)
* [curl-网络请求工具](https://curl.haxx.se/dlwiz/?type=bin) [curl-GitHub](https://github.com/curl/curl)
* [jq-解析json工具](https://github.com/stedolan/jq)
* [Batch-CN-在线第三方管理](http://www.bathome.net/thread-32322-1-1.html) [bcn](http://bcn.bathome.net/s/tool/index.html)
* [转换位图图像](https://imagemagick.org/index.php)


## 下载文件

- 推荐使用`bat`脚本执行`JavaScript`脚本下载文件

* [从github下载文件的多种方法](https://3gstudent.github.io/3gstudent.github.io/%E6%B8%97%E9%80%8F%E6%8A%80%E5%B7%A7-%E4%BB%8Egithub%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E7%9A%84%E5%A4%9A%E7%A7%8D%E6%96%B9%E6%B3%95)


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

