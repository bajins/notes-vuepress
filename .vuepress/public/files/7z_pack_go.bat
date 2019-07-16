1>1/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: by bajins https://www.bajins.com

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
if "%~3"=="" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)

:: 执行7z命令，但是不输出，这是为了判断
7za > nul
:: 如果7z压缩命令行不存在，则下载
if not "%errorlevel%"=="0" (
    :: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数（组成方式：/key:value）
    :: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
    cscript -nologo -e:jscript "%~f0" download https://woytu.github.io/files/7za.exe C:\Windows
)

:: bat所在目录
set batPath=%~dp0
:: 需要打包的文件或文件夹根目录
set root=%~1
:: 需要打包的文件或文件夹
set files=%~2
:: 打包完成的文件命名前一部分
set project=%~3
:: 打包完成的文件命名后一部分，与前一部分进行组合
set allList=_darwin_386,_darwin_amd64,_freebsd_386,_freebsd_amd64,_freebsd_arm,_netbsd_386,_netbsd_amd64,_netbsd_arm,
set allList=%allList%_openbsd_386,_openbsd_amd64,_windows_386.exe,_windows_amd64.exe,
set allList=%allList%_linux_386,_linux_amd64,_linux_arm,_linux_mips,_linux_mips64,_linux_mips64le,_linux_mipsle,_linux_s390x

:: 使用 /D 开关，除了改变驱动器的当前目录之外，还可改变当前驱动器。
:: 切换到需要打包的根目录
cd /d %root%

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
    info("   打包: 7z_pack rootPath files project");
    info("     rootPath 打包的根目录");
    info("     files 需要打包的文件或文件夹");
    info("     project 打包完成后的压缩文件命名的前部分");
    info("   示例：");
    info("     7z_pack f:\\key-gin  \"pyutils static templates\" key-gin");
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