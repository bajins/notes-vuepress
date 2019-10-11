# BAT脚本



## 添加快捷方式

```batch
:: -------------------------------------------------------------------
::                          添加快捷方式
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



### 设置必应壁纸

- [开机自启动可使用vbs脚本](/VPS/BAT命令.md#vbs脚本)

```batch
1>1/* ::
:: -------------------------------------------------------------------
::                          自动设置Bing壁纸
::                     by https://www.bajins.com
::                   GitHub https://woytu.github.io
:: -------------------------------------------------------------------


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
if "%~1"=="/help" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数（组成方式：/key:value）
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" %~1


goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************


var Argv = WScript.Arguments;
for (i = 0; i < Argv.length; i++) {
    info("参数：" + Argv(i));
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
// 当前文件所在目录
var currentDirectory = fso.GetFile(WScript.ScriptFullName).ParentFolder;

if (Argv.length > 0) {
    if (Argv(0) == "1") {
        autoStart("startup");
    } else if (Argv(0) == "?" || Argv(0) == "help") {
        help();
        // 正常退出
        WScript.Quit(0);
    }
}

var json = request("GET", "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", "json");

var imageUrl = "https://cn.bing.com" + json.images[0].url.split("&")[0];
var imageDir = currentDirectory + "\\images";
var imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
imageName = imageName.split("=")[1];

var imagePath = imageDir + "\\" + imageName.replace(/(.+)\.[^\.]+$/, "$1") + ".bmp";
// 如果转换后文件不存在
if (!fso.FileExists(imagePath)) {
    var imagePath = download(imageUrl, imageDir, imageName);
    imagePath = imageTransform(imagePath, "bmp");
    if (imagePath == "") {
        info("图片格式转为BMP失败");
        WScript.Quit(0);
    }
}


if (fso.FileExists(imagePath)) {
    setWallpaper(imagePath);

    info("设置壁纸成功！" + imagePath);
    WScript.Quit(0);
} else {
    error("下载壁纸失败！");
    WScript.Quit(1);
}


function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   " + WScript.ScriptName + " autoRun");
    info("     autoRun 是否开启开机自动运行：默认0不开启,1开启");
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
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();


    //将对象转化成为querystring形式
    var paramarray = [];
    for (key in data) {
        paramarray.push(key + "=" + data[key]);
    }
    var params = paramarray.join("&");

    var XMLHTTP = new ActiveXObject("WinHttp.WinHttpRequest.5.1");

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
                XMLHTTP.Open(method, url + "?" + datapost, 0);
            }
            XMLHTTP.SetRequestHeader("CONTENT-TYPE", contentType);
            XMLHTTP.Send();
    }

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
 * 图片格式转换
 *
 * @param imagePath 原始图片全路径
 * @param format    要转换的格式，后缀名
 * @returns {string}
 */
function imageTransform(imagePath, format) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 如果文件不存在,就说明没有转换成功
    if (!fso.FileExists(imagePath)) {
        throw new Error("图片不存在或路径错误！");
    }
    // 转换后格式文件全路径
    var formatPath = imagePath.replace(/(.+)\.[^\.]+$/, "$1") + "." + format;
    // 如果转换后文件已存在
    if (fso.FileExists(formatPath)) {
        throw new Error("要转换的格式文件已经存在！");
    }

    // 转小写
    format = format.toLowerCase();

    var wiaFormat = "";
    switch (format) {
        case "bmp":
            wiaFormat = "{B96B3CAB-0728-11D3-9D7B-0000F81EF32E}";
            break;
        case "png":
            wiaFormat = "{B96B3CAF-0728-11D3-9D7B-0000F81EF32E}";
            break;
        case "gif":
            wiaFormat = "{B96B3CB0-0728-11D3-9D7B-0000F81EF32E}";
            break;
        case "tiff":
            wiaFormat = "{B96B3CB1-0728-11D3-9D7B-0000F81EF32E}";
            break;
        default:
            // 默认JPEG
            wiaFormat = "{B96B3CAE-0728-11D3-9D7B-0000F81EF32E}";
    }


    var img = new ActiveXObject("WIA.ImageFile");
    img.LoadFile(imagePath);

    var imgps = new ActiveXObject("WIA.ImageProcess");
    imgps.Filters.Add(imgps.FilterInfos("Convert").FilterID);
    // 转换格式
    imgps.Filters(1).Properties("FormatID").Value = wiaFormat;
    // 图片质量
    //imgps.Filters(1).Properties("Quality").Value = 5
    var img = imgps.Apply(img);


    img.SaveFile(formatPath);

    // 如果文件不存在,就说明没有转换成功
    if (!fso.FileExists(formatPath)) {
        return "";
    }

    return formatPath;
}

/**
 * 设置桌面壁纸
 *
 * @param imagesPath 图片全路径
 */
function setWallpaper(imagesPath) {
    var shell = new ActiveXObject("WScript.shell");
    // HKEY_CURRENT_USER
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\TileWallpaper", "0");
    // 设置壁纸全路径
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\Wallpaper", imagesPath);
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\WallpaperStyle", "2", "REG_DWORD");
    var shadowReg = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\ListviewShadow";
    shell.RegWrite(shadowReg, "1", "REG_DWORD");

    // 如果桌面图标未透明，需要刷新组策略
    //shell.Run("gpupdate /force", 0);
    // 上面已经通过注册表设置了壁纸的参数，调用Windows api SystemParametersInfo刷新配置
    shell.Run("RunDll32 USER32,SystemParametersInfo SPI_SETDESKWALLPAPER 0 '' SPIF_UPDATEINIFILE");
    // 实时刷新桌面
    shell.Run("RunDll32 USER32,UpdatePerUserSystemParameters");
}

/**
 * 开机启动
 *
 * @param mode 为startup时是在开机启动目录中创建vbs脚本，否则添加开机启动注册表
 */
function autoStart(mode) {
    var fileName = WScript.ScriptName;
    fileName = fileName.substring(0, fileName.lastIndexOf('.') + 1);
    //fileName = fileName.substring(0, fileName.length-4);
    var vbsFileName = WScript.ScriptFullName.replace(".bat", ".vbs");
    if ("startup" == mode.toLowerCase()) {
        // 开机启动目录
        var runDir = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\";
        vbsFileName = runDir + fileName + ".vbs";
    } else {
        // 添加开机启动注册表
        var shell = new ActiveXObject("WScript.shell");
        var runRegBase = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\";
        shell.RegWrite(runRegBase + fileName, vbsFileName);
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 创建文件
    var vbsFile = fso.CreateTextFile(vbsFileName, true);
    // 填写数据，并增加换行符
    vbsFile.WriteLine("Set shell = WScript.CreateObject(\"WScript.Shell\")");
    vbsFile.WriteLine("shell.Run \"cmd /c " + WScript.ScriptFullName + "\", 0, false");
    // 关闭文件
    vbsFile.Close();
}
```

### 设置GitHub的Hosts

- [开机自启动可使用vbs脚本](/VPS/BAT命令.md#vbs脚本)

```batch
1>1/* ::
:: -------------------------------------------------------------------
::                          自动设置GitHubHosts
::                     by https://www.bajins.com
::                   GitHub https://woytu.github.io
:: -------------------------------------------------------------------


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
if "%~1"=="/help" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数（组成方式：/key:value）
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" %~1


goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************

var Argv = WScript.Arguments;
for (i = 0; i < Argv.length; i++) {
    info("参数：" + Argv(i));
}

if (Argv.length > 0) {
    if (Argv(0) == "1") {
        autoStart("startup");
    } else if (Argv(0) == "?" || Argv(0) == "help") {
        help();
        // 正常退出
        WScript.Quit(0);
    }
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
// 当前文件所在目录
var currentDirectory = fso.GetFile(WScript.ScriptFullName).ParentFolder;

var hostsPath = "C:\\Windows\\System32\\drivers\\etc\\hosts";

var hostsObject = fso.OpenTextFile(hostsPath, 1);
var hosts = hostsObject.ReadAll();
hostsObject.Close();
var hostsArray = hosts.split(/[\r\n]/);

var githubDomain = [
    "assets-cdn.github.com",
    "avatars.githubusercontent.com",
    "avatars0.githubusercontent.com",
    "avatars1.githubusercontent.com",
    "codeload.github.com",
    "documentcloud.github.com",
    "gist.github.com",
    "github.com",
    "github.global.ssl.fastly.net",
    "github.io",
    "github-cloud.s3.amazonaws.com",
    "global-ssl.fastly.net",
    "help.github.com",
    "nodeload.github.com",
    "raw.github.com",
    "status.github.com",
    "training.github.com",
    "www.github.com"
]


var newHosts = [];

for (var i = 0; i < hostsArray.length; i++) {
    if (!isInArray(githubDomain, hostsArray[i])) {
        newHosts.push(hostsArray[i]);
    }
}

for (var i = 0; i < githubDomain.length; i++) {
    var data = {"qtype": 1, "host": githubDomain[i], "qmode": -1};
    var url = "https://myssl.com/api/v1/tools/dns_query";
    var json = request("GET", url, "json", data, null);
    if (json.code == 0 && (json.error == null || json.error == "")) {
        var resultData = json.data;
        var addrUs = resultData["01"][0]["answer"]["records"];
        if (addrUs == null) {
            continue;
        }
        //var addrHk = resultData["852"][0].answer.records;
        //var addrCn = resultData["86"][0].answer.records;
        for (var j = 0; j < addrUs.length; j++) {
            newHosts.push(addrUs[j]["value"] + " " + githubDomain[i]);
        }
    }
}

hostsObject = fso.OpenTextFile(hostsPath, 2, true);
hostsObject.Write(newHosts.join("\r\n"));

var shell = new ActiveXObject("WScript.shell");
shell.Run("ipconfig /flushdns");


/**
 * 判断数组中是否包含指定字符串
 *
 * @param arr
 * @param obj
 * @returns {boolean}
 */
function isInArray(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (obj.match(RegExp("^.*" + arr[i] + ".*"))) {
            return true;
        }
    }
    return false;
}

function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   " + WScript.ScriptName + " autoRun");
    info("     autoRun 是否开启开机自动运行：默认0不开启,1开启");
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
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();


    //将对象转化成为querystring形式
    var paramarray = [];
    for (key in data) {
        paramarray.push(key + "=" + data[key]);
    }
    var params = paramarray.join("&");

    var XMLHTTP = new ActiveXObject("WinHttp.WinHttpRequest.5.1");

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
 * 开机启动
 *
 * @param mode 为startup时是在开机启动目录中创建vbs脚本，否则添加开机启动注册表
 */
function autoStart(mode) {
    var fileName = WScript.ScriptName;
    fileName = fileName.substring(0, fileName.lastIndexOf('.') + 1);
    //fileName = fileName.substring(0, fileName.length-4);
    var vbsFileName = WScript.ScriptFullName.replace(".bat", ".vbs");
    if ("startup" == mode.toLowerCase()) {
        // 开机启动目录
        var runDir = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\";
        vbsFileName = runDir + fileName + ".vbs";
    } else {
        // 添加开机启动注册表
        var shell = new ActiveXObject("WScript.shell");
        var runRegBase = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\";
        shell.RegWrite(runRegBase + fileName, vbsFileName);
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 创建文件
    var vbsFile = fso.CreateTextFile(vbsFileName, true);
    // 填写数据，并增加换行符
    vbsFile.WriteLine("Set shell = WScript.CreateObject(\"WScript.Shell\")");
    vbsFile.WriteLine("shell.Run \"cmd /c " + WScript.ScriptFullName + "\", 0, false");
    // 关闭文件
    vbsFile.Close();
}
```