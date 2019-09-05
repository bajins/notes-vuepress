# Go打包





## 打包命令

### 在windows下打包
#### 设置环境
> `GOOS` 目标可执行程序运行操作系统，支持`darwin`、`freebsd`、`linux`、`windows`

```batch
# 打包Linux 执行文件
SET GOOS=linux
# 打包win执行文件
SET GOOS=windows
# 打包mac执行文件
SET GOOS=darwin
# 打包freebsd执行文件
SET GOOS=freebsd
```
> `GOARCH` 目标可执行程序操作系统构架，包括`386`、`amd64`、`arm`

```batch
# 打包386执行文件
SET GOARCH=386
# 打包amd64执行文件
SET GOARCH=amd64
# 打包arm执行文件
SET GOARCH=arm
```
#### 执行编译
```batch
go build main.go
# 打包文件成其他名字
go build -o key-gin.exe main.go
```



## 打包脚本

### 在项目中新建
> 只需在项目目录中新建一个bat文件把以下脚本命令放入，且修改`files`变量执行脚本即可打包

```batch
1>1/* ::
:: by bajins https://www.bajins.com

@echo off
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo bajins不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

:: 执行7z命令，但是不输出，这是为了判断
7za > nul
:: 如果7z压缩命令行不存在，则下载
if not "%errorlevel%" == "0" (
    :: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数（组成方式：/key:value）
    :: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
    cscript -nologo -e:jscript "%~f0" https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe C:\Windows
)
:: 需要打包的文件或文件夹根目录
set root=%~dp0
:: 需要打包的文件或文件夹
set files=pyutils static templates

:: 仅将 %0 扩充到一个路径
set currentPath=%~p0
:: 替换\为,号，也可以替换为空格
set currentPath=%currentPath:\=,%
:: 顺序循环，设置最后一个为当前目录
for %%a in (%currentPath%) do set CurrentDirectoryName=%%a
:: 打包完成的文件命名前一部分
set project=%CurrentDirectoryName%
:: 打包完成的文件命名后一部分，与前一部分进行组合
set allList=_darwin_386,_darwin_amd64,_freebsd_386,_freebsd_amd64,_freebsd_arm,_netbsd_386,_netbsd_amd64,_netbsd_arm,
set allList=%allList%_openbsd_386,_openbsd_amd64,_windows_386.exe,_windows_amd64.exe,
set allList=%allList%_linux_386,_linux_amd64,_linux_arm,_linux_mips,_linux_mips64,_linux_mips64le,_linux_mipsle,_linux_s390x

for %%i in (%allList%) do (
    :: 如果二进制文件不存在则重新打包
    if not exist "%project%%%i" (
        go get github.com/mitchellh/gox
        gox
        :: 删除旧的压缩包文件
        del *.zip *.tar *.gz
    )
)


:: 使用7z压缩
for %%i in (%allList%) do (
    set runFile=%project%%%i
    :: !!和%%都是取变量的值，用这种方法的批处理文件前面一般有setlocal EnableDelayedExpansion（延迟环境变量扩展）语句
    if exist "!runFile!" (
        :: 判断变量字符串中是否包含字符串
        echo %%i | findstr linux >nul && (
            :: 用7z压缩成tar
            7za a -ttar %project%%%i.tar %files% !runFile!
            :: 用7z把tar压缩成gz
            7za a -tgzip %project%%%i.tar.gz %project%%%i.tar
            :: 删除tar文件和二进制文件
            del *.tar !runFile!
            
        ) || (
            :: 用7z压缩文件为zip
            7za a %project%%%i.zip %files% !runFile!
            :: 删除二进制文件
            del !runFile!
        )
    )
)



goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************


var iRemote = WScript.Arguments(0);
iRemote = iRemote.toLowerCase();
var iLocal = WScript.Arguments(1);
iLocal = iLocal.toLowerCase()+"\\"+ iRemote.substring(iRemote.lastIndexOf("/") + 1);
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

### 在任意目录新建

> 基本用法:`脚本名 rootPath files project`
>> `rootPath` 打包的根目录，路径必须完整
>>
>> `files` 需要打包的文件或文件夹，用双引号括起来
>>
>> `project` 打包完成后的压缩文件命名的前部分，可以不输入，默认为打包根目录的名称

> 示例：`脚本名 f:\\key-gin "pyutils static templates" key-gin`

* [脚本文件](/files/7z_pack_go.bat)

```batch
1>1/* ::
:: by bajins https://www.bajins.com

@echo off
md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo bajins不具备所在目录的写入权限! >&2
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

:: 执行7z命令，但是不输出，这是为了判断
7za > nul
:: 如果7z压缩命令行不存在，则下载
if not "%errorlevel%"=="0" (
    :: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数
    :: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
    cscript -nologo -e:jscript "%~f0" download https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe C:\Windows
)

:: bat所在目录
set batPath=%~dp0
:: 使用 /D 开关，除了改变驱动器的当前目录之外，还可改变当前驱动器。
:: 切换到需要打包的根目录
cd /d %~1
:: 如果路径不正确
if not "%errorlevel%"=="0" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)
:: 需要打包的文件或文件夹
set files=%~2
:: 打包完成的文件命名前一部分
set project=%~3
if "%project%"=="" (
    :: 仅将 %0 扩充到一个路径
    set currentPath=%~p0
    :: 替换\为,号，也可以替换为空格
    set currentPath=%currentPath:\=,%
    :: 顺序循环，设置最后一个为当前目录
    for %%a in (%currentPath%) do set CurrentDirectoryName=%%a
    :: 打包完成的文件命名前一部分
    set project=%CurrentDirectoryName%
)
:: 打包完成的文件命名后一部分，与前一部分进行组合
set allList=_darwin_386,_darwin_amd64,_freebsd_386,_freebsd_amd64,_freebsd_arm,_netbsd_386,_netbsd_amd64,_netbsd_arm,
set allList=%allList%_openbsd_386,_openbsd_amd64,_windows_386.exe,_windows_amd64.exe,
set allList=%allList%_linux_386,_linux_amd64,_linux_arm,_linux_mips,_linux_mips64,_linux_mips64le,_linux_mipsle,_linux_s390x

for %%i in (%allList%) do (
    :: 如果二进制文件不存在则重新打包
    if not exist "%project%%%i" (
        go get github.com/mitchellh/gox
        gox
        :: 删除旧的压缩包文件
        del *.zip *.tar *.gz
    )
)


:: 使用7z压缩
for %%i in (%allList%) do (
    set runFile=%project%%%i
    :: !!和%%都是取变量的值，用这种方法的批处理文件前面一般有setlocal EnableDelayedExpansion（延迟环境变量扩展）语句
    if exist "!runFile!" (
        :: 判断变量字符串中是否包含字符串
        echo %%i | findstr linux >nul && (
            :: 用7z压缩成tar
            7za a -ttar %project%%%i.tar %files% !runFile!
            :: 用7z把tar压缩成gz
            7za a -tgzip %project%%%i.tar.gz %project%%%i.tar
            :: 删除tar文件和二进制文件
            del *.tar !runFile!

        ) || (
            :: 用7z压缩文件为zip
            7za a %project%%%i.zip %files% !runFile!
            :: 删除二进制文件
            del !runFile!
        )
    )
)

:: 使用 /D 开关，除了改变驱动器的当前目录之外，还可改变当前驱动器。
:: 切换到bat所在目录
cd /d %batPath%

goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************

var Argv = WScript.Arguments;
//for (i = 0; i < Argv.Length; i++) {
//info("参数：" + Argv(i));
//}
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
    info("   打包: 脚本名 rootPath files project");
    info("     rootPath 打包的根目录，路径必须完整");
    info("     files 需要打包的文件或文件夹，用双引号括起来");
    info("     project 打包完成后的压缩文件命名的前部分，可以不输入，默认为打包根目录的名称");
    info("   示例：");
    info("     脚本名 f:\\key-gin \"pyutils static templates\" key-gin");
}


function download(iRemote, iLocal) {
    iRemote = iRemote.toLowerCase();
    iLocal = iLocal.toLowerCase() + "\\" + iRemote.substring(iRemote.lastIndexOf("/") + 1);
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
}
```