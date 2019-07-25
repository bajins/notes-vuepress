# bat执行JavaScript

> 原理：把bat命令用JavaScript注释`/**/`包裹住，然后用bat命令执行文件中的JavaScript代码时就不会编译bat命令了

## 下载文件
### 方式一
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
    echo bajins不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
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
### 方式二
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
    echo bajins不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
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

function download(url, path) {
    var FSO = new ActiveXObject('Scripting.FileSystemObject');
    var SavePath = FSO.GetFile(WScript.ScriptFullName).ParentFolder.Path;
    if (path != '') {
        SavePath = path;
    }
    SavePath = SavePath + "\\" + url.substring(url.lastIndexOf("/") + 1);
    //下载方式,留空则使用内建下载.可以使用其他第三方,例:'wget -q "$URL" -O "$SavePath"'
    var DownMode = '';
    if (DownMode == '') {
        var XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
        XMLHTTP.Open('GET', url, 0);
        XMLHTTP.Send();
        var ADO = new ActiveXObject('ADODB.Stream');
        ADO.Mode = 3;
        ADO.Type = 1;
        ADO.Open();
        ADO.Write(XMLHTTP.ResponseBody);
        ADO.SaveToFile(SavePath, 2);
        ADO.Close();
    } else {
        var WShell = new ActiveXObject('WScript.Shell');
        WShell.Run(DownMode.replace(/\$URL/, url).replace(/\$SavePath/, SavePath), 0, true);
    }
}
```

### 方式三
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
    echo bajins不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
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

function download(url, path) {
    var FSO = new ActiveXObject('Scripting.FileSystemObject');
    var SavePath = FSO.GetFile(WScript.ScriptFullName).ParentFolder.Path;
    if (path != '') {
        SavePath = path;
    }
    SavePath = SavePath + "\\" + url.substring(url.lastIndexOf("/") + 1);
    //下载方式,留空则使用内建下载.可以使用其他第三方,例:'wget -q "$URL" -O "$SavePath"'
    var DownMode = '';
    if (DownMode == '') {
        var XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
        XMLHTTP.Open('GET', url, 0);
        XMLHTTP.Send();
        var ADO = new ActiveXObject('ADODB.Stream');
        ADO.Mode = 3;
        ADO.Type = 1;
        ADO.Open();
        ADO.Write(XMLHTTP.ResponseBody);
        ADO.SaveToFile(SavePath, 2);
        ADO.Close();
    } else {
        var WShell = new ActiveXObject('WScript.Shell');
        WShell.Run(DownMode.replace(/\$URL/, url).replace(/\$SavePath/, SavePath), 0, true);
    }
}
```