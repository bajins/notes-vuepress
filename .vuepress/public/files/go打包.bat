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
    @cmd /k
    goto :EXIT
)
if "%~1"=="" (
    cscript -nologo -e:jscript "%~f0" help
    @cmd /k
    goto :EXIT
)
if "%~2"=="" (
    cscript -nologo -e:jscript "%~f0" help
    @cmd /k
    goto :EXIT
)

:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" get7z
if not "%errorlevel%" == "0" (
    @cmd /k
    goto :EXIT
)

:: bat所在目录
set batPath=%~dp0
:: 使用 /D 开关，除了改变驱动器的当前目录之外，还可改变当前驱动器。
:: 切换到需要打包的根目录
cd /d %~1
:: 如果路径不正确
if not "%errorlevel%"=="0" (
    cscript -nologo -e:jscript "%~f0" help
    @cmd /k
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
set allList=_darwin_386,_darwin_amd64,_freebsd_386,_freebsd_amd64,_freebsd_arm,
set allList=%allList%_netbsd_386,_netbsd_amd64,_netbsd_arm,_openbsd_386,
set allList=%allList%_openbsd_amd64,_windows_386.exe,_windows_amd64.exe,
set allList=%allList%_linux_386,_linux_amd64,_linux_arm,_linux_mips,
set allList=%allList%_linux_mips64,_linux_mips64le,_linux_mipsle,_linux_s390x

:GETGOX
set GOPROXY=https://goproxy.io
go get github.com/mitchellh/gox


for %%i in (%allList%) do (
    :: 如果二进制文件不存在则重新打包
    if not exist "%project%%%i" (
        go get github.com/mitchellh/gox
        gox
        if not %errorlevel% == 0 (
            goto :GETGOX
        )
        :: 删除旧的压缩包文件
        del *.zip *.tar *.gz
    )
)


:: 使用7z压缩
for %%i in (%allList%) do (
    set runFile=%project%%%i
    :: !!为setlocal EnableDelayedExpansion取变量的值
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
for (i = 0; i < Argv.length; i++) {
    WScript.StdOut.WriteLine("参数：" + Argv(i));
}

if (Argv.length > 0) {
    switch (Argv(0)) {
        case "get7z":
            try {
                get7z();
            } catch (e) {
                error(e.message);
                // 非正常退出
                WScript.Quit(1);
            }
            break;
        case "?", "help":
            help();
            break;
        default:
            help();
    }
    // 正常退出
    WScript.Quit(0);
}


function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   打包: " + WScript.ScriptName + " rootPath files project");
    info("     rootPath 打包的根目录，路径必须完整");
    info("     files 需要打包的文件或文件夹，用双引号括起来");
    info("     project 打包完成后的压缩文件命名的前部分，可以不输入，默认为打包根目录的名称");
    info("   示例：");
    info("     " + WScript.ScriptName + " f:\\key-gin \"pyutils static templates\" key-gin");
}

/**
 * HTTP请求
 *
 * @param method        GET,POST
 * @param url           请求地址
 * @param dataType      "",text,stream,xml,json
 * @param data          数据，{key:value}格式
 * @param contentType   发送的数据类型：multipart/form-data、
 * application/x-www-form-urlencoded（默认）、text/plain
 * @returns {string|Document|any}
 */
function request(method, url, dataType, data, contentType) {
    if (url == "" || url == null || url.length <= 0) {
        throw new Error("请求url不能为空！");
    }
    if (method == "" || method == null || method.length <= 0) {
        method = "GET";
    } else {
        // 把字符串转换为大写
        method = method.toUpperCase();
    }
    if (contentType == "" || contentType == null || contentType.length <= 0) {
        contentType = "application/x-www-form-unlenconded;charset=utf-8";
    }
    var XMLHTTPVersions = [
        'WinHttp.WinHttpRequest.5.1',
        'WinHttp.WinHttpRequest.5.0',
        'Msxml2.ServerXMLHTTP.6.0',
        'Msxml2.ServerXMLHTTP.5.0',
        'Msxml2.ServerXMLHTTP.4.0',
        'Msxml2.ServerXMLHTTP.3.0',
        'Msxml2.ServerXMLHTTP',
        'MSXML2.XMLHTTP.6.0',
        'MSXML2.XMLHTTP.5.0',
        'MSXML2.XMLHTTP.4.0',
        'MSXML2.XMLHTTP.3.0',
        'MSXML2.XMLHTTP',
        'Microsoft.XMLHTTP'
    ];
    var XMLHTTP;
    for (var i = 0; i < XMLHTTPVersions.length; i++) {
        try {
            XMLHTTP = new ActiveXObject(XMLHTTPVersions[i]);
            break;
        } catch (e) {
            WScript.StdOut.Write(XMLHTTPVersions[i]);
            WScript.StdOut.WriteLine("：" + e.message);
        }
    }

    //将对象转化成为querystring形式
    var paramarray = [];
    for (key in data) {
        paramarray.push(key + "=" + data[key]);
    }
    var params = paramarray.join("&");

    switch (method) {
        case "POST":
            // 0异步、1同步
            XMLHTTP.Open(method, url, 0);
            XMLHTTP.SetRequestHeader("CONTENT-TYPE", contentType);
            XMLHTTP.Send(params);
            break;
        default:
            // 默认GET请求
            if (params == "" || params.length == 0 || params == null) {
                // 0异步、1同步
                XMLHTTP.Open(method, url, 0);
            } else {
                XMLHTTP.Open(method, url + "?" + params, 0);
            }
            XMLHTTP.SetRequestHeader("CONTENT-TYPE", contentType);
            XMLHTTP.Send();
    }

    // 把字符串转换为小写
    dataType = dataType.toLowerCase();
    switch (dataType) {
        case "text":
            return XMLHTTP.responseText;
            break;
        case "stream":
            return XMLHTTP.responseStream;
            break;
        case "xml":
            return XMLHTTP.responseXML;
            break;
        case "json":
            return eval("(" + XMLHTTP.responseText + ")");
            break;
        default:
            return XMLHTTP.responseBody;
    }
}


/**
 * 下载文件
 *
 * @param url
 * @param directory 文件存储目录
 * @param filename  文件名，为空默认截取url中的文件名
 * @returns {string}
 */
function download(url, directory, filename) {
    if (url == "" || url == null || url.length <= 0) {
        throw new Error("请求url不能为空！");
    }
    if (directory == "" || directory == null || directory.length <= 0) {
        throw new Error("文件存储目录不能为空！");
    }

    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 如果目录不存在
    if (!fso.FolderExists(directory)) {
        // 创建目录
        var strFolderName = fso.CreateFolder(directory);
    }

    if (filename == "" || filename == null || filename.length <= 0) {
        filename = url.substring(url.lastIndexOf("/") + 1);
        // 去掉文件名的特殊符号（包括之前的）字符
        filename = filename.replace(/^.*(\&|\=|\?|\/)/ig, "");
    }
    var path = directory + "\\" + filename;

    var ADO = new ActiveXObject("ADODB.Stream");
    ADO.Mode = 3;
    ADO.Type = 1;
    ADO.Open();
    ADO.Write(request("GET", url, ""));
    ADO.SaveToFile(path, 2);
    ADO.Close();

    // 如果文件不存在
    if (!fso.FileExists(path)) {
        return "";
    }
    return path;
}

/**
 * 获取7-Zip
 *
 */
function get7z() {
    var shell = new ActiveXObject("WScript.shell");
    // 执行7z命令判断是否执行成功
    var out = shell.Run("cmd /c 7za", 0, true);
    var directory = "c:\\windows";
    var url = "https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe";
    // 如果执行失败说明7z不存在
    if (out == 1) {
        download(url, directory);
    }
    // 执行7z命令判断是否执行成功
    out = shell.Run("cmd /c 7za", 0, true);
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 如果执行失败，或者文件不存在
    if (out == 1 || !fso.FileExists(directory + "\\7za.exe")) {
        get7z();
    }
}