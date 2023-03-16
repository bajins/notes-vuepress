# WindowsBatch

[[toc]]


## Flag

* [Windows 命令-官方文档](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/windows-commands)
* [windows常用命令](https://www.cnblogs.com/kekec/p/3662125.html)
* [windows批处理语法](https://www.cnblogs.com/kekec/p/3937530.html)
* [windows之四十个bat脚本命令](https://juejin.im/post/5d50c631518825378d5d6121)
* [windows bat脚本总结](https://segmentfault.com/a/1190000018614430)
* [Windows 10/8/7的Rundll32命令列表](https://www.thewindowsclub.com/rundll32-shortcut-commands-windows)
* [https://gitlab.com/jarv/cmdchallenge](https://gitlab.com/jarv/cmdchallenge)
    * [https://cmdchallenge.com](https://cmdchallenge.com)
* 打包成exe [https://github.com/jeremyben/thebatchman](https://github.com/jeremyben/thebatchman)
* [https://github.com/npocmaka/batch.scripts](https://github.com/npocmaka/batch.scripts)


+ [添加快捷方式](/files/添加快捷方式.bat)
+ [设置必应壁纸](/files/设置必应壁纸.bat)
+ [设置GitHub的Hosts](/files/设置github的hosts.bat)
+ [frpc.bat](/files/frpc.bat) 会自动检测本地`fprc`是否为最新版本，如果不是或者没有则下载最新版


- `if`和`for`的条件与后面跟的`(`之间必须要有一个空格，否则会出现`命令语法不正确`的问题！
- 使用cd切换目录时，如果带盘符一定要加`/d`参数，否则切换无效
- 双引号中包含双引号最里层的要用三个`"""`转义，`&`符号要用`^`转义
  - 示例:使用`curl`配合`jq`获取必应壁纸下载地址
  
```batch
curl "http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1" ^
 | jq-win64.exe ".images[0].url | """https://cn.bing.com""" + .[0:index("""^&""")]" >> bing.txt
```

```batch
:: 解压MSI
msiexec /a "MSI文件路径" /qn TARGETDIR="解压输出目录绝对路径"
:: 弹窗
msg %username% /time:60 "WARNING:a backdoor account is created"
```

- Windows10当前桌面壁纸：`%AppData%\Microsoft\Windows\Themes\CachedFiles\CachedImage_1920_1080_POS4.jpg`
- Windows7当前桌面壁纸：`%AppData%\Microsoft\Windows\Themes\TranscodedWallpaper.jpg`
- 事件日志目录：`%SystemRoot%\System32\Winevt\Logs`


**获取用户名**

```batch
echo %username%
net user
whoami
query user
quser
```




## 文件操作

* [robocopy复制文件及目录结构](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/robocopy)

```batch
:: 路径都为文件所在顶级文件夹
robocopy /ndl /njh /njs /s 源路径 目的路径 复制的文件多个以空格分隔
```

* [xcopy复制文件及目录结构](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/xcopy)
* [forfiles遍历文件夹](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/forfiles)

```batch
:: 列出文件，类似于linux下的ls
dir
:: 创建目录
md 目录名（文件夹）
:: 删除目录
rd  目录名（文件夹）
:: 拷贝文件
copy 路径\文件名 路径\文件名
:: 移动文件
move 路径\文件名 路径\文件名
:: 删除文件，不能删除文件夹
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

### 查看占用的pid

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


## 延时定时事件任务

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

### 任务计划

* [Schtasks命令详解](https://www.cnblogs.com/daimaxuejia/p/12957644.html)
* [任务计划程序参考](https://docs.microsoft.com/zh-cn/windows/win32/taskschd/task-scheduler-reference)

+ [https://github.com/dahall/TaskScheduler](https://github.com/dahall/TaskScheduler)
+ [https://github.com/fireeye/SharPersist](https://github.com/fireeye/SharPersist)

**更高级用法见[创建任务计划](/Shell/WindowsJScript.md#创建任务计划)**

> 如果任务计划运行没反应，去掉`/RU SYSTEM`试试

```batch
taskschd
SCHTASKS /? 查看帮助

:: /sc 指定计划频率：MINUTE、 HOURLY、DAILY、WEEKLY、MONTHLY, ONCE, ONSTART, ONLOGON, ONIDLE, ONEVENT
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /tr "运行程序路径" /sc DAILY
:: 开机自启动
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /tr "运行程序路径" /sc ONSTART
:: 每天 12:30 运行
schtasks /Create /RU SYSTEM /RL Highest /tn 定时任务名 /tr "运行程序路径" /sc DAILY /st 12:30
:: 一分钟执行一次
schtasks /Create /RU SYSTEM /RL Highest /tn 定时任务名 /tr "运行程序路径" /sc MINUTE /mo 1
:: 在指定的开始日期和结束日期之间，每天 12:00 点开始到 14:00 点，每隔5分钟运行
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /TR "运行程序路径" /SD 开始日期 /ED 结束日期 ^
 /ST 12:00 /ET 14:00 /SC MINUTE /MO 5
:: 每天 12:00 点开始到 14:00 点自动结束
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /TR "运行程序路径" /ST 12:00 /ET 14:00 /K /SC DAILY
:: 将任务附加到事件上：登录成功事件，运行事件查看器
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /TR eventvwr /SC ONEVENT /EC Security ^
 /MO "*[System[Provider[@Name='Microsoft-Windows-Security-Auditing'] and EventID=4624]]"
:: 将任务附加到事件上：系统已从低功耗状态中恢复，运行事件查看器
SCHTASKS /Create /RU SYSTEM /RL Highest /tn 定时任务名 /TR eventvwr /SC ONEVENT /EC System ^
 /MO "*[System[Provider[@Name='Microsoft-Windows-Power-Troubleshooter'] and EventID=1]]"

:: 查询任务
SCHTASKS /Query /fo LIST /v /TN 任务名称
:: 强制删除任务
SCHTASKS /Delete /F /TN 任务名称
:: 手动运行任务
SCHTASKS /run /TN 任务名称
```


### 事件

* [https://docs.microsoft.com/zh-cn/windows/win32/events/windows-events](https://docs.microsoft.com/zh-cn/windows/win32/events/windows-events)
* [https://docs.microsoft.com/zh-cn/previous-versions//aa385231(v=vs.85)]( https://docs.microsoft.com/zh-cn/previous-versions//aa385231(v=vs.85))
* [https://docs.microsoft.com/zh-cn/windows/win32/wes/windows-event-log](https://docs.microsoft.com/zh-cn/windows/win32/wes/windows-event-log)

- `eventvwr` 打开事件查看器
    - 打开eventvwr -> Windows 日志 -> 系统 右键打开菜单 -> 将所有事件另存为(E) -> 选择保存类型为xml
- `eventcreate` 该命令行工具使管理员能够创建一个自定义事件 ID 和消息于某指定事件日志里。
- `wmic ntevent /?`
    - `wmic ntevent list full` 查看所有事件日志
- `wmic nteventlog /?`
- `wevtutil.exe qe Application /c:3 /rd:true /f:text`
- `(get-winevent -listlog Application).providernames` 或者 `wevtutil el` 查看所有事件名
- `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WINEVT\Publishers` 注册表中所有事件


| 事件源               	| 事件ID 	| 说明                                                	|
|----------------------	|--------	|-----------------------------------------------------	|
| Power-Troubleshooter 	| 1      	| 系统已从低功耗状态中恢复。                          	|
| Kernel-Power         	| 42     	| 系统正在进入睡眠状态。                              	|
| Kernel-Power         	| 105    	| 电源更改。                                          	|
| Kernel-Power         	| 107    	| 系统已从睡眠状态恢复。（已进入睡眠状态）            	|
| Kernel-Power         	| 130    	| 系统开机恢复                                        	|
| Kernel-Power         	| 131    	| 系统开机恢复                                        	|
| Kernel-General       	| 1      	| 更改系统时间                                        	|
| Kernel-General       	| 24     	| 已刷新时区信息，退出原因为 0。当前时区偏差为 -480。 	|
| EventLog             	| 6013   	| 系统启动时间为 178611 秒。                          	|




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



## 管理员权限

- Windows10启用管理员：快捷键<kbd>Win</kbd> + <kbd>r</kbd> 打开“运行”输入`gpedit.msc`并运行 -> `Windows 设置` -> `安全设置` -> `安全选项`
    - 禁用：`用户账户控制：以管理员批准模式运行所有管理员`
    - 禁用：`用户账户控制：用于内置管理员账户的管理员批准模式`
    - 启用：`账户：管理员账户状态`


- 判断

```batch
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"
```

```batch
@echo off
:: 检查权限
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
:: 如果没有管理员权限，就请求管理权限
if '%errorlevel%' NEQ '0' (
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
)
```

```batch
@echo off
:: 检查权限
net session >nul 2>&1 
if not "%errorLevel%" == "0" ( 
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
)
```

```batch
reg query HKU\S-1-5-20>nul 2>nul
if not "%errorLevel%" == "0" ( 
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
)
```


**获取管理员权限**

```batch
@echo off
fltmc>nul||cd/d %~dp0 && mshta vbscript:CreateObject("Shell.Application").ShellExecute("%~nx0","%1","","runas",0)(window.close)

:: 下面为执行命令

```

```batch
@echo off
::-------------------------------------------------------------------------------
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' ( goto UACPrompt ) else ( goto GetAdmin )
:UACPrompt
    ::if not "%~1"=="" set file= ""%~1""
    ::echo CreateObject("Shell.Application").ShellExecute "cmd.exe", "/c %~s0%file%", "", "runas", 0 > "%temp%\getadmin.vbs"
    echo CreateObject^("Shell.Application"^).ShellExecute "%~s0", "%*", "", "runas", 0 > "%temp%\getadmin.vbs" 
    "%temp%\getadmin.vbs"
    exit /B
:GetAdmin
    if exist "%temp%\getadmin.vbs" ( del "%temp%\getadmin.vbs" )
    pushd "%CD%"
    CD /D "%~dp0"
:StartCommand
::-------------------------------------------------------------------------------

:: 下面为执行命令

```



## 隐藏窗口运行

**此方式完全不会显示`CMD`窗口（包括闪现） [vbs脚本](/Shell/WindowsScript.md#vbs函数封装)**

**此方式会闪现`CMD`窗口 bat脚本**

> 如果运行的批处理名为`a.bat`，在`C:\`下，那`%~0`代表`C:\a.bat`，`%~nx0`代表`a.bat`。`h`极为参数`%1`，`0`表示隐藏运行。
>
> 由于你双击运行，故第一次批处理`%1`为空，`if`不成立，转而运行下一句。
> 然后再次打开自己，并传递参数`h`，此时`if`成立，跳转至`begin`开始运行。

```batch
@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~0 h",0)(window.close)&&exit
::mshta "javascript:new ActiveXObject('WScript.Shell').Run('%~0 h',0);window.close()"&&exit
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


## 刷新桌面

```batch
REM taskkill 用户窗口被关闭
taskkill /f /im explorer.exe >nul 2>nul&start explorer.exe

REM regsvr32.exe 图标有白块
regsvr32.exe /s /n /i:/UserInstall %SystemRoot%\system32\themeui.dll

:: 效果不太好，有时刷新成功，有时失败
RunDll32 USER32,UpdatePerUserSystemParameters

:: assoc文件关联有多余添加，可能报错，exe 类型几乎不会被修改成其他类型
assoc exe=exefile
:: .=. 应该比较保险
assoc .=.
```

- 刷新桌面图标

```batch
@echo off

REM inf 代码太多
>%tmp%\tmp.inf (
    echo;[Version]
    echo;Signature=$Chicago$
    echo;[DefaultInstall]
)
rundll32 SETUPAPI.DLL,InstallHinfSection DefaultInstall 128 %tmp%\tmp.inf
REM inf 需要%1是有效inf，win7报错：您选中INF文件不支持此安装方法
REM %SystemRoot%\System32\InfDefaultInstall.exe "%1"
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

- `/v` 设置键名(value)
- `/t` 设置数据类型(type)
- `/d` 设置添加的值(data)
- `/f` 表示强制(forbidden)

* 删除桌面IE图标

```batch
REG DELETE "HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Desktop\NameSpace\{B416D21B-3B22-B6D4-BBD3-BBD452DB3D5B}" /f
```

+ 修改开机时小数字键盘不开启的问题

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
REG ADD "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" ^
 /v "Debugger" /t REG_SZ /d "\"记事本程序路径\" -z" /f
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

sc create frp内网穿透 binPath= "cmd.exe /c D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini" ^
 start= auto displayname= "frp内网穿透"
```


### 删除服务

```batch
sc delete 服务名称
```


## 下载文件

- `certutil`

> 用户备份证书服务管理，每次下载都会有缓存，缓存目录：`%USERPROFILE%\AppData\LocalLow\Microsoft\CryptnetUrlCache\Content`

```batch
certutil -urlcache -split -f https://blog-static.cnblogs.com/files/gayhub/bcn.js C:\Windows\bcn.bat
```

- `bitsadmin`

> `bitsadmin.exe` 是`windows`后台智能传输服务的一个工具，`windows`的自动更新，补丁之类的下载就是用这个工具来实现的。

```batch
:: /priority normal进度条等信息
bitsadmin /transfer 任务名 /download /priority normal https://blog-static.cnblogs.com/files/gayhub/bcn.js C:\Windows\bcn.bat
```

