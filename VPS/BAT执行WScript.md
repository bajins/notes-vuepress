# BAT执行WScript

## 目录

* [JScript](#jscript)
  * [下载文件](#下载文件)
* [VisualBasicScript](#visualbasicscript)
  * [输入内容到记事本](#输入内容到记事本)
  * [Windows特殊文件夹](#windows特殊文件夹)
  * [隐藏运行](#隐藏运行)



## JScript

> `JScript`实现的`ECMAScript Edition 3`，也是`IE8`使用的引擎。然而，随着`V8`大放光彩，
> 微软放弃了之前规划的托管`JavaScript`计划（同期规划的`VB`变身为`VB.NET`活了下来），
> `JScript`开发组另起炉灶搞了`Chakra`与`Node.js`一争长短，这也是`IE9`之后使用的`JS`引擎。

- `JScript`与宿主
> `JScript`、`VBScript`同属于官方支持的`Windows Script`，当年，这俩脚本都需要依赖于特定的宿主(`Host`)才能执行，
> 比如，`JavaScript`大多时候运行在浏览器中。除了浏览器环境之外，他们，还可以运行在`Windows Script Host`中。

- `Windows Script Host`是一个`language-independent`的脚本宿主环境，主要用于执行`Windows`管理任务，其对象层级为

```bash
// WSH 对象模型层级
WScript
  |-- WshArguments
  |  |-- WshNamed
  |  |-- WshUnnamed
  |-- WshController
  |  |-- WshRemote
  |    |-- WshRemoteError
  |-- WshNetwork
  |-- WshShell
  |  |-- WshShortcut
  |  |-- WshUrlShortcut
  |  |-- WshEnvironment
  |  |-- WshSpecialFolders
  |  |-- WshScriptExec
```

- 在`JScript`中，永远不需要去实例化根对象`WScript`，正如同浏览器中的直接全局对象一样。

- 再如WshShell对象提供的功能
    - 在本地运行一个程序
    - 操作注册表
    - 创建快捷方式
    - 访问`system folder`
    - 操作环境变量，比如`WINDIR`、`PATH`、`PROMPT`

- 注意WshShell提供了操作注册表的功能
    - RegRead 读
    - RegWrite 写
    - RegDelete 删

- `WSH`对象模型提供的`COM`接口可以分为两类：
    - `Script Execution and Troubleshooting`：这类接口运行脚本执行`WSH`的基本的操作, 
    输出信息、执行基本的`COM`函数（如`CreateObject`、`GetObject`）
    - `Helper Functions`：执行诸如映射网络驱动器、连接打印机、获取/修改环境变量、操作注册表之类操作


- `BAT`执行`JScript`原理
> 把`batch`命令用`JavaScript`注释`/**/`包裹住，然后用`batch`命令执行文件中的`JavaScript`代码时就不会编译`batch`命令了

* [microsoft.jscript](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.jscript)

* [JScript参考手册](https://www.php.cn/manual/view/14969.html)

* [JScript](https://www.itminus.com/blog/categories/%E9%A3%8E%E8%AF%AD/ECMAScript/JScript/)

* [ActiveXObject](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Microsoft_Extensions/ActiveXObject)

### 下载文件

- 方式一

```batch
1>1/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  bajins 1.0.0  by bajins https://batch.bajins.com
:: 首发兼更新地址:https://batch.bajins.com
::
:: 使用时请将bajins.bat放入任意一个PATH中的目录以便调用
:: 但请确保bajins.bat拥有该目录的读写权限(因此最好不要选择system32)
:: 建议新建一个目录专供bajins.bat使用,再将这个目录添加到PATH中

@echo off
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" %~1 %~2
goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************

var iRemote = WScript.Arguments(0);
iRemote = iRemote.toLowerCase();
var iLocal = WScript.Arguments(1);
iLocal = iLocal.toLowerCase()+ "\\" + iRemote.substring(iRemote.lastIndexOf("/") + 1);
var xPost = new ActiveXObject("Microsoft.XMLHTTP");
xPost.Open("GET", iRemote, 0);
xPost.Send();
var sGet = new ActiveXObject("ADODB.Stream");
sGet.Mode = 3;
sGet.Type = 1;
sGet.Open();
sGet.Write(xPost.responseBody);
sGet.SaveToFile(iLocal, 2);
sGet.Close();
```



> 以下两种方式仅是传参和取参方式的不同

- 方式二

```batch
1>1/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  bajins 1.0.0  by bajins https://batch.bajins.com
:: 首发兼更新地址:https://batch.bajins.com
::
:: 使用时请将bajins.bat放入任意一个PATH中的目录以便调用
:: 但请确保bajins.bat拥有该目录的读写权限(因此最好不要选择system32)
:: 建议新建一个目录专供bajins.bat使用,再将这个目录添加到PATH中

@echo off
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

if "%~1"=="/?" (
    cscript -nologo -e:jscript "%~f0" /func:help
    goto :EXIT
)
if "%~1"=="" (
    cscript -nologo -e:jscript "%~f0" /func:help
    goto :EXIT
)
if "%~2"=="" (
    cscript -nologo -e:jscript "%~f0" /func:help
    goto :EXIT
)

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数（组成方式：/key:value）
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" /func:download /url:%~1 /path:%~2
goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************

var Argv = WScript.Arguments;
for (i = 0; i < Argv.Length; i++) {
    info("参数：" + Argv(i));
}
var ArgvName = Argv.Named;

var func = ArgvName.Item('func');
if (func == "help") {
    help();
} else if (func == "download") {
    download(ArgvName.Item('url'), ArgvName.Item('path'));
} else if (func == "error") {
    error(ArgvName.Item('msg'));
} else if (func == "info") {
    info(ArgvName.Item('msg'));
}
WScript.Quit(0);

function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   下载: bajins url path");
    info("     url 下载链接");
    info("     path 下载的文件保存地址，不传则保存到当前文件夹");
}

/**
 * HTTP请求
 *
 * @param method
 * @param url
 * @param dataType
 * @returns {string|Document|any}
 */
function request(method, url, dataType) {
    // 把字符串转换为大写
    method = method.toUpperCase();
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();

    if ((method != 'GET' && method != 'POST') || method == '') {
        throw new Error("请求方法错误！");
    }
    if (url == '') {
        throw new Error("请求url不能为空！");
    }

    var XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
    XMLHTTP.Open(method, url, 0);
    XMLHTTP.Send();

    if (dataType == '') {
        return XMLHTTP.responseBody;
    }
    if (dataType == 'text') {
        return XMLHTTP.responseText;
    }
    if (dataType == 'stream') {
        return XMLHTTP.responseStream;
    }
    if (dataType == 'xml') {
        return XMLHTTP.responseXML;
    }
    if (dataType == 'json') {
        return eval('(' + XMLHTTP.responseText + ')');
    }
}


function download(url, path) {
    var FSO = new ActiveXObject('Scripting.FileSystemObject');
    var SavePath = FSO.GetFile(WScript.ScriptFullName).ParentFolder.Path;
    if (path != '') {
        SavePath = path;
    }
    SavePath = SavePath + "\\" + url.substring(url.lastIndexOf("/") + 1);
    var ADO = new ActiveXObject('ADODB.Stream');
    ADO.Mode = 3;
    ADO.Type = 1;
    ADO.Open();
    ADO.Write(request('GET',url,''));
    ADO.SaveToFile(SavePath, 2);
    ADO.Close();
}
```

- 方式三
```batch
1>1/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  bajins 1.0.0  by bajins https://batch.bajins.com
:: 首发兼更新地址:https://batch.bajins.com
::
:: 使用时请将bajins.bat放入任意一个PATH中的目录以便调用
:: 但请确保bajins.bat拥有该目录的读写权限(因此最好不要选择system32)
:: 建议新建一个目录专供bajins.bat使用,再将这个目录添加到PATH中

@echo off
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo 不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

if "%~1"=="/?" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)
if "%~1"=="" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)
if "%~2"=="" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" download %~1 %~2 %~3 %~4 %~5 %~6 %~7 %~8 %~9
goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************


var Argv = WScript.Arguments;
for (i = 0; i < Argv.Length; i++) {
    info("参数：" + Argv(i));
}

var func = Argv(0);
if (func == "help") {
    help();
} else if (func == "download") {
    var url = Argv(1);
    var path = Argv(2);
    download(url, path);
} else if (func == "error") {
    error(Argv(1));
} else if (func == "info") {
    info(Argv(1));
}
WScript.Quit(0);

function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   下载: bajins url path");
    info("     url 下载链接");
    info("     path 下载的文件保存地址，不传则保存到当前文件夹");
}

/**
 * HTTP请求
 *
 * @param method
 * @param url
 * @param dataType
 * @returns {string|Document|any}
 */
function request(method, url, dataType) {
    // 把字符串转换为大写
    method = method.toUpperCase();
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();

    if ((method != 'GET' && method != 'POST') || method == '') {
        throw new Error("请求方法错误！");
    }
    if (url == '') {
        throw new Error("请求url不能为空！");
    }

    var XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
    XMLHTTP.Open(method, url, 0);
    XMLHTTP.Send();

    if (dataType == '') {
        return XMLHTTP.responseBody;
    }
    if (dataType == 'text') {
        return XMLHTTP.responseText;
    }
    if (dataType == 'stream') {
        return XMLHTTP.responseStream;
    }
    if (dataType == 'xml') {
        return XMLHTTP.responseXML;
    }
    if (dataType == 'json') {
        return eval('(' + XMLHTTP.responseText + ')');
    }
}


function download(url, path) {
    var FSO = new ActiveXObject('Scripting.FileSystemObject');
    var SavePath = FSO.GetFile(WScript.ScriptFullName).ParentFolder.Path;
    if (path != '') {
        SavePath = path;
    }
    SavePath = SavePath + "\\" + url.substring(url.lastIndexOf("/") + 1);
    var ADO = new ActiveXObject('ADODB.Stream');
    ADO.Mode = 3;
    ADO.Type = 1;
    ADO.Open();
    ADO.Write(request('GET',url,''));
    ADO.SaveToFile(SavePath, 2);
    ADO.Close();
}
```


## VisualBasicScript

* [WScript对象属性](https://www.cnblogs.com/wakey/p/5795845.html)

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

### 隐藏运行
```visual-basic
'在运行窗口输入shell:startup点击确定后打开一个文件夹，把此文件放在文件夹中

'运行命令
runCommand = "D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini"

'调用运行函数
call run(runCommand)

'WScript.Echo OSver()
'MsgBox(OSver())

'运行，传参为运行命令
Function run(runCommand)
    dim ws
	'Windows10之前的系统创建一个脚本命令窗口
    Set ws = CreateObject("Wscript.Shell")

    dim wsh
	'Windows10创建一个脚本命令窗口
    Set wsh=WScript.CreateObject("WScript.Shell")
	
	'拼接Windows10之前的系统运行命令
    runWs= "cmd /c " & runCommand
	
	'Windows10运行命令
    runWsh= runCommand
    
    '获取系统信息
    'infoItem = showOsInfo()
    infoItem = OSver()
    
    select case infoItem
        case "Windows Server 2003"
            ws.run runWs,vbhide
        
        case "Windows 2000"
            ws.run runWs,vbhide
        
        case "Windows XP"
            ws.run runWs,vbhide
        
        case "windows visita"
            ws.run runWs,vbhide
        
        case "windows 7"
            ws.run runWs,vbhide
            
        case "windows 10"
            wsh.Run runWsh,0
        
        case else
            wscript.echo infoItem
            wscript.quit
    end select
End Function

'系统版本与系统位数拼接
Function showOsInfo()
    'wscript.echo OSver() & X86orX64()
    showOsInfo = OSver() & X86orX64()
End Function

'获取当前系统位数
Function X86orX64()
    Set objWMIService = GetObject("winmgmts:!\\.\root\cimv2")
    Set colItems = objWMIService.ExecQuery("Select * from Win32_ComputerSystem")
    For Each objItem in colItems
        strOSsystype=objitem.SystemType
    Next
    set objWMIService = nothing
    set colItems = nothing
    If InStr( strOSsystype, "86") <> 0 Then
        X86orX64 = "_x86"
    elseif InStr(strOSsystype, "64") <> 0 Then
        X86orX64 = "_x64"
    else
        wscript.echo "不知道32位还是64位的"
        wscript.quit
    end if
End Function

'获取当前系统版本
Function OSver()
    Set objWMIService = GetObject("winmgmts:!\\.\root\cimv2")
    Set colItems = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")
    For Each objItem in colItems
        strOScaption=objitem.Caption
        strOSversion=objitem.Version
    Next
    set objWMIService = nothing
    set colItems = nothing
    '截取strOSversion为最后一个"."的左面部分
    strOSversion=left(strOSversion,InStrRev(strOSversion,".",-1,1) - 1)
    select case strOSversion
        case "5.2" '"5.2.3790"
            OSver = "Windows Server 2003"
        case "5.0" '"5.0.2195"
            OSver = "Windows 2000"
        case "5.1" '"5.1.2600"
            OSver = "Windows XP"
        case "6.0" '"6.0.6001"
            OSver = "windows visita"
        case "6.1" '"6.1.7601"
            OSver = "windows 7"
        case "10.0"
            OSver = "windows 10"
        case else
            OSver = strOSversion
            'wscript.quit
    end select
End Function
```