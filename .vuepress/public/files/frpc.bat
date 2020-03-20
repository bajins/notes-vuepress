1>1/* ::
:: by bajins https://www.bajins.com

@ECHO OFF
color 0a
Title FRPC启动工具 by:bajins.com
:: 窗口高宽40*120
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v WindowSize /d 0x00280078 /f >nul
:: 屏幕缓冲区高宽1000*120
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v ScreenBufferSize /d 0x03e80078 /f >nul

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

if "%~1"=="/?" (
    cscript -nologo -e:jscript "%~f0" /help:%1
    goto :EXIT
)
if "%~1"=="/help" (
    cscript -nologo -e:jscript "%~f0" /help:%1
    goto :EXIT
)


set serverHost=woetu.com
set serverProt=5443
set token=woetu
set httpPort=7552

:START
ECHO.
ECHO             ==========================================================================
ECHO.
ECHO                                      Bajins FRPC客户端启动工具
ECHO.
ECHO                                      作者邮箱：admin@woytu.com
ECHO.
ECHO                                  个人主页：https://www.bajins.com
ECHO.
ECHO                                  github：https://github.com/woytu
ECHO.
ECHO                                      免费使用！禁止用于非法用途！
ECHO.
ECHO             ==========================================================================
ECHO.
ECHO.

:: 执行JavaScript脚本
cscript -nologo -e:jscript "%~f0"

if not "%errorlevel%" == "0" (
    @cmd /k
)

:TUNNEL
ECHO.
ECHO.
ECHO             输入自定义二级域名，如“aa” ，即分配给你的穿透域名为：“aa.%serverHost%”
ECHO.
ECHO.

:CID
set /p clientid=请输入自定义二级域名：
if "%clientid%"=="" (
    goto :CID
)

:: 判断是否为数字、字母，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
ECHO %clientid%|findstr "^[a-z0-9]*$" >nul || (
    ECHO.
    ECHO.二级域名必须为小写字母或数字！
    ECHO.
    goto :CID
)

ECHO.
ECHO.

:PT
set /p port=请输入本地端口：
if "%port%"=="" (
    goto :PT
)

:: 判断是否为纯数字，在|两端不能有空格
:: 注意这里有个bug不能用[^0-9]取反，匹配到.会通过
ECHO %port%|findstr "^[0-9]*$" >nul || (
    ECHO.
    ECHO.端口必须为纯数字！
    ECHO.
    goto :PT
)

ECHO.
ECHO.

ECHO 访问地址：http://%clientid%.%serverHost%:%httpPort%

:: 配置文件
set iniFile="frpc.ini"
:: 日志文件
set logFile=frpc.log

if exist %iniFile% del frpc.ini >nul

(
    ECHO [common]
    ECHO # frps地址
    ECHO server_addr = %serverHost%
    ECHO # frps端口
    ECHO server_port = %serverProt%
    ECHO # frps认证密码
    ECHO token = %token%
    ECHO # 登录失败重试
    ECHO login_fail_exit = true
    ECHO # 指定日志文件
    ECHO log_file = %logFile%
    ECHO # 指定日志打印级别
    ECHO log_level = info
    ECHO # 指定日志存储最大天数
    ECHO log_max_days = 7
    ECHO. 
    ECHO. 
    ECHO # 隧道名称
    ECHO [web_%clientid%]
    ECHO # 访问类型
    ECHO type = http
    ECHO # 本地IP
    ECHO local_ip = 127.0.0.1
    ECHO # 本地端口
    ECHO local_port = %port%
    ECHO # 自定义二级域名
    ECHO subdomain = %clientid%
    ECHO # 自定义域名,subdomain设置后无法使用此参数
    ECHO # custom_domains = %clientid%.%serverHost%
    ECHO. 
) > %iniFile%

ECHO.
ECHO.


cd %~dp0
:: 结束进程
taskkill /f /im frpc.exe 1>nul 2>nul
:: 如果日志文件存在则删除
if exist %logFile% del %logFile% >nul

:: 运行VisualBasicScript命令不显示vbs窗口
mshta vbscript:CreateObject("WScript.Shell").Run("cmd /c frpc.exe -c frpc.ini",0,false)(window.close)

ECHO.正在启动frpc，请稍后......

:: 延时等待10秒
timeout /T 10 /NOBREAK >nul

ECHO.
ECHO.

:: 获取程序运行PID
for /f "skip=3 tokens=2" %%a in ('tasklist /fi "imagename eq frpc*"') do set taskReslut= %%a
:: 判断PID是否为空
if "%taskReslut%"=="" (
    ECHO.
    ECHO.运行失败！
    ECHO.
    @cmd /k
) else (
    ECHO 运行成功PID：%taskReslut%
)

if not exist %logFile% (
    ECHO.
    ECHO.日志文件不存在！请手动检测是否运行成功！
    ECHO.
    @cmd /k
)


findstr /i /c:"login to server failed" %logFile% >nul && (
    ECHO.
    ECHO.登录到服务器失败！
    ECHO.
    @cmd /k
)

findstr /i /c:"start proxy error" %logFile% >nul && (
    ECHO.
    ECHO.启动失败，请检查配置或重新配置！
    ECHO.
    @cmd /k
)

findstr /i /c:"login to server success" %logFile% >nul && (
    ECHO.
    ECHO.登录frps成功！
    ECHO.
) || (
    ECHO.
)

findstr /i /c:"start proxy success" %logFile% >nul && (
    ECHO.
    ECHO.后台启动frpc完成！
    ECHO.
) || (
    ECHO.
)


ECHO.
ECHO.下面是frpc日志信息：
ECHO.
type %logFile%
ECHO.

pause

goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%

*/

// ****************************  JavaScript  *******************************


var Argv = WScript.Arguments;
for (i = 0; i < Argv.length; i++) {
    WScript.Echo("参数：", Argv(i));
}
var ArgvName = Argv.Named;

if (ArgvName.Item("help") != "" && ArgvName.Item("help") != null) {
    help();
    // 正常退出
    WScript.Quit(0);
}

if (ArgvName.Item("autoRun") == "1") {
    autoStart("startup");
}

try {
    run();
} catch (err) {
    WScript.Echo("错误：", err.message);
    // 异常退出
    WScript.Quit(1);
}

function run() {
    // 创建shell对象
    var shell = new ActiveXObject("WScript.shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 当前文件所在目录
    var currentDirectory = fso.GetFile(WScript.ScriptFullName).ParentFolder;

    var cmd = "cmd /c ";

    WScript.Echo("开始获取线上最新版本号......\n");

    // 请求获取最新版本信息
    var json = request("get", "https://api.github.com/repos/fatedier/frp/releases/latest", "json");
    // 最新版本号
    var version = json.name.substring(1);

    WScript.Echo("当前线上最新版本号：", version, "\n");

    var sys = getSystem();
    var url = "";
    for (var i = 0; i < json.assets.length; i++) {
        var os = json.assets[i];
        var v = os.name.split("_");
        if (v[1] == version && v[2] == sys.os && v[3].split(".")[0] == sys.cpu_digits) {
            url = os.browser_download_url;
        }
    }

    // 最新版本文件名
    var zipName = url.split("/");
    zipName = zipName[zipName.length - 1];

    var thisExe = currentDirectory + "\\frpc.exe";
    // 如果当前目录存在文件
    if (fso.FileExists(thisExe)) {
        // 执行命令，并去掉执行结果中的换行符
        var out = shell.Exec(cmd + thisExe + " -v").StdOut.ReadAll().replace(/\n/ig, "");
        WScript.Echo("本地当前目录下程序版本：", out, "\n");
        // 如果已经是最新版本
        if (version == out) {
            return;
        }
    }

    // 最新版程序目录
    var exeFolder = currentDirectory + "\\" + zipName.substring(0, zipName.length - 4);
    // 判断最新版程序目录是否存在
    if (fso.FolderExists(exeFolder)) {
        // 移动文件到当前目录
        shell.Run(cmd + "move " + exeFolder + "\\frpc.exe " + currentDirectory, 0, true);
        return;
    }

    // 如果当前目录存在压缩文件
    if (fso.FileExists(zipName)) {
        WScript.Echo("当前目录存在最新版压缩文件，开始解压......\n");
        decompression(cmd, shell, fso, currentDirectory, zipName, exeFolder);
        return;
    }

    WScript.Echo("开始下载最新版程序......\n");

    try {
        download(url, currentDirectory);
    } catch (e) {
        throw new Error("下载文件错误：" + e.message);
    }

    WScript.Echo("下载完成，开始解压......\n");

    decompression(cmd, shell, fso, currentDirectory, zipName, exeFolder);

}


/**
 * 解压
 *
 * @param cmd
 * @param shell
 * @param fso
 * @param currentDirectory
 * @param zipName
 * @param exeFolder
 */
function decompression(cmd, shell, fso, currentDirectory, zipName, exeFolder) {
    zipName = currentDirectory + "\\" + zipName;
    var sp = exeFolder.split("\\");
    var exeName = " " + sp[sp.length - 1] + "\\frpc.exe ";
    download7z();
    // -aoa解压并覆盖文件
    shell.Run(cmd + "7za e -aoa " + zipName + exeName, 0, true);
    // 如果文件不存在
    if (!fso.FileExists(currentDirectory + "\\frpc.exe")) {
        throw new Error("解压失败！");
    }
    // 删除下载的zip
    fso.DeleteFile(zipName);
    WScript.Echo("解压完成！\n");
}

function help() {
    WScript.Echo("基本用法:");
    WScript.Echo("   下载: " + WScript.ScriptName, " autoRun");
    WScript.Echo("     autoRun 是否开启开机自动运行：默认0不开启,1开启");
}


/**
 * HTTP请求
 * 查看方法属性：New-Object -ComObject "WinHttp.WinHttpRequest.5.1" | Get-Member
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
        contentType = "application/x-www-form-unlenconded";
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
            WScript.Echo(XMLHTTPVersions[i] + ":", e.message);
        }
    }
    XMLHTTP.SetTimeouts(0, 1800000, 1800000, 1800000);
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
        case "json":
            return eval("(" + XMLHTTP.responseText + ")");
            break;
        default:
            return XMLHTTP.responseBody;
    }
}


/**
 * 下载文件
 * 查看方法属性：New-Object -ComObject "ADODB.Stream" | Get-Member
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
        throw new Error("文件下载失败");
    }
    return path;
}


/**
 * 获取系统信息
 *
 * @returns {{cpu_digits: *, cpu_core_number: *, system: string, os: *}}
 */
function getSystem() {
    var shell = new ActiveXObject("WScript.shell");
    var system = shell.Environment("SYSTEM");
    // 操作系统
    var os = system("OS").toLowerCase().split("_")[0];
    // CPU位数
    var cpuDigits = system("PROCESSOR_ARCHITECTURE").toLowerCase();
    // CPU核心数
    var cpuCoreNumber = system("NUMBER_OF_PROCESSORS");
    return {
        "os": os,
        "cpu_digits": cpuDigits,
        "cpu_core_number": cpuCoreNumber,
        "system": os + "_" + cpuDigits
    };
}


/**
 * 下载7-Zip
 *
 * @param mode 下载模式：默认0不覆盖下载，1覆盖下载
 */
function download7z(mode) {
    var shell = new ActiveXObject("WScript.shell");
    // 执行7z命令判断是否存在
    if (shell.Run("cmd /c 7za", 0, true) == 0 && (!mode || mode == 0)) {
        return;
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var storage = "c:\\windows";
    var exe = storage + "\\7z.exe";
    var dll = storage + "\\7z.dll";
    var filename = "";
    var reg = new RegExp("7z.*\-x64.msi", "igm");
    try {
        var url = "https://sourceforge.net/projects/sevenzip/rss?path=/7-Zip";
        filename = reg.exec(request("get", url, "text", "", ""));
    } catch (e) {
        WScript.Echo(e.message);
        var url = "https://www.7-zip.org/download.html";
        filename = reg.exec(request("get", url, "text", "", ""));
    }
    // 当前文件所在目录
    var dir = fso.GetFile(WScript.ScriptFullName).ParentFolder;
    var msi = dir + '\\' + filename;
    if (fso.FileExists(msi)) {
        fso.DeleteFile(msi);
    }
    var zipDir = dir + '\\7zip';
    if (fso.FolderExists(zipDir)) {
        fso.DeleteFolder(zipDir);
    }
    download("https://www.7-zip.org/a/" + filename, dir, filename);
    // 解压msi文件
    shell.Run('msiexec /a "' + msi + '" /qn TARGETDIR="' + zipDir + '"', 0, true);
    fso.CopyFile(dir + "\\7zip\\Files\\7-Zip\\7z.exe", exe);
    fso.CopyFile(dir + "\\7zip\\Files\\7-Zip\\7z.dll", dll);
    fso.DeleteFolder(dir + "\\7zip");
    fso.DeleteFile(msi);
    filename = filename.toString().replace("x64.msi", "extra.7z");
    var exetra = dir + '\\' + filename;
    if (fso.FileExists(exetra)) {
        fso.DeleteFile(exetra);
    }
    download("https://www.7-zip.org/a/" + filename, dir, filename);
    // -aoa解压并覆盖文件，-o参数必须与值之间不能有空格
    shell.Run('7z x -aoa "' + exetra + '" -o"' + storage + '" 7za.exe 7za.dll', 0, true);
    fso.DeleteFile(exetra);
}

/**
 * 开机启动
 *
 * @param mode 为startup时是在开机启动目录中创建vbs脚本，否则添加开机启动注册表
 */
function autoStart(mode) {
    var fileName = WScript.ScriptName;
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
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