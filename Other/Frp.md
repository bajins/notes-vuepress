# Frp


## 目录

* [获取frp最新版本号](#获取frp最新版本号)
* [一键安装脚本](#一键安装脚本)
  * [frp-onekey](#frp-onekey)
    * [设置参数说明](#设置参数说明)
  * [管理命令](#管理命令)
* [服务端配置](#服务端配置)
* [客户端脚本](#客户端脚本)





* [https://github.com/fatedier/frp/releases](https://github.com/fatedier/frp/releases)


## 获取frp最新版本号
```bash
wget -qO- https://github.com/fatedier/frp/releases/latest | grep '<title>' | awk '{print $2}'
curl -s https://github.com/fatedier/frp/releases/latest | cut -d \" -f 2 | awk -F "/" '{print $NF}'
```
```bash
curl -s https://api.github.com/repos/fatedier/frp/releases/latest | grep 'tag_name' | cut -d \" -f 4
wget -qO- https://api.github.com/repos/fatedier/frp/releases/latest | grep 'tag_name' | cut -d \" -f 4
```
## 一键安装脚本
* [onekey-install-shell](https://github.com/clangcn/onekey-install-shell/tree/master/frps)

* [frpspro](https://github.com/dylanbai8/frpspro)

* [https://github.com/MvsCode/frp-onekey](https://github.com/MvsCode/frp-onekey)

### frp-onekey

```bash
# 下载脚本
wget https://raw.githubusercontent.com/MvsCode/frp-onekey/master/install-frps.sh
# 脚本授权
chmod 700 ./install-frps.sh
# 运行脚本安装
./install-frps.sh install
# 升级
bash install-frps.sh update
# 卸载
bash install-frps.sh uninstall
```


#### 设置参数说明

- `Please input frps bind_port [1-65535](Default Server Port: 5443):`
> 输入frp提供服务的端口，用于服务器端和客户端通信

* `Please input frps vhost_http_port [1-65535](Default vhost_http_port: 80):`
> 输入frp进行http穿透的http服务端口

* `Please input frps vhost_https_port [1-65535](Default vhost_https_port: 443):`
> 输入frp进行https穿透的https服务端口

* `Please input frps dashboard_port [1-65535](Default dashboard_port: 6443):`
> 输入frp的控制台服务端口，用于查看frp工作状态

* `Please input dashboard_user (Default: admin):`
> 输入控制台账号，默认admin

* `Please input dashboard_pwd (Default: d5Ai7XhC):`
> 输入控制台密码，默认随机

* `Please input token (Default: QZwoVJKgfLMhSQ1B):`
> 输入frp服务器和客户端通信的密码，默认是随机生成的

* `Please input frps max_pool_count [1-200](Default max_pool_count: 50):`
> 设置每个代理可以创建的连接池上限，默认50

* `Please select log_level`
  * `1: info(default)`
  * `2: warn`
  * `3: error`
  * `4: debug`
> 设置日志等级，4个选项，默认是`info`

* `Please input frps log_max_days [1-30](Default log_max_days: 3 day):`
> 设置日志保留天数，范围是1到30天，默认保留3天。


* `Please select log_file`
  * `1: enable(default)`
  * `2: disable`
  
> 设置是否开启日志记录，默认开启，开启后日志等级及保留天数生效，否则等级和保留天数无效

* `Please select tcp_mux`
  * `1: enable (default)`
  * `2: disable`

* `Please select kcp support`
  * `1: enable (default)`
  * `2: disable`


### 管理命令
```bash
/etc/init.d/frps start
/etc/init.d/frps stop
/etc/init.d/frps restart
/etc/init.d/frps status
/etc/init.d/frps config
/etc/init.d/frps version
```

## 服务端配置
```ini
[common]
# 服务器IP，0.0.0.0为服务器全局所有IP可用，
# 假如你的服务器有多个IP则可以这样做，或者填写为指定其中的一个服务器IP,支持IPV6
bind_addr = 0.0.0.0

# 通讯端口，用于和客户端内网穿透传输数据的端口，可自定义
bind_port = 7000

# UDP通讯端口，用于点对点内网穿透
bind_udp_port = 7001

# 用于KCP协议UDP通讯端口，在弱网环境下传输效率提升明显，
# 但是会有一些额外的流量消耗。设置后frpc客户端须设置protocol = kcp
kcp_bind_port = 7000

# http监听端口，注意可能和服务器上其他服务用的80冲突，
# 比如centos有些默认有Apache，可自定义
vhost_http_port = 7552

# https监听端口，可自定义
vhost_https_port = 446

# 通过浏览器查看 frp 的状态以及代理统计信息展示端口，可自定义
dashboard_port = 7500
# 信息展示面板用户名
dashboard_user = admin
# 信息展示面板密码
dashboard_pwd = admin

# AdminUI可以帮助用户通过浏览器来查询和管理客户端的proxy状态和配置。
admin_addr = 127.0.0.1
admin_port = 7400
admin_user = admin
admin_pwd = admin

# 特权模式认证密钥
token = woytu.com

# 端口白名单，为了防止端口被滥用，可以手动指定允许哪些端口被使用
#allow_ports = 1-65535

# 每个内网穿透服务限制最大连接池上限，避免大量资源占用，可自定义
max_pool_count = 100

# frpc所在机器和frps所在机器的时间相差不能超过15分钟，因为时间戳会被用于加密验证中，
# 防止报文被劫持后被其他人利用,单位为秒，默认值为900，即 15 分钟。
# 如果修改为0，则frps将不对身份验证报文的时间戳进行超时校验。
# 国外服务器由于时区的不同，时间会相差非常大，这里需要注意同步时间或者设置此值为0
authentication_timeout = 0

# 配置了此参数，则custom_domains中不能是属于此参数的子域名或者泛域名。
# 客户端使用subdomain指定子域名前缀，custom_domains指定子域名全路径
subdomain_host = zd966.com

# 最多保存多少天日志
log_max_days = 7
# 指定日志输出文件
log_file = frps.log
# 指定日志输出级别
log_level = info
```




## 客户端脚本

* [客户端配置](https://github.com/fatedier/frp/blob/master/README_zh.md#%E9%80%9A%E8%BF%87%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9F%9F%E5%90%8D%E8%AE%BF%E9%97%AE%E9%83%A8%E7%BD%B2%E4%BA%8E%E5%86%85%E7%BD%91%E7%9A%84-web-%E6%9C%8D%E5%8A%A1)

### 自动下载最新版

```batch
1>1/* ::
:: by bajins https://www.bajins.com

@ECHO OFF
color 0a
Title FRPC启动工具 by:bajins.com
Mode con cols=105 lines=35
:: 窗口宽高120*40
::REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v WindowSize /d 0x00280078 /f >nul
:: 屏幕缓冲区宽高120*2000
REG ADD "HKEY_CURRENT_USER\Console" /t REG_DWORD /v ScreenBufferSize /d 0x07d00078 /f >nul

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


set serverHost=zd966.com
set serverProt=7000
set token=woytu.com
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
echo %clientid%|findstr "^[a-z0-9]*$" >nul || (
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
echo %port%|findstr "^[0-9]*$" >nul || (
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
for (i = 0; i < Argv.Length; i++) {
    info("参数：" + Argv(i));
}
var ArgvName = Argv.Named;

if (ArgvName.Item("help") != "" && ArgvName.Item("help") != null) {
    help();
    // 正常退出
    WScript.Quit(0);
}

if (ArgvName.Item("autoRun") == "1") {
    // 设置开机启动
    var shell = new ActiveXObject("WScript.shell");
    // HKEY_CURRENT_USER
    shell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\frpc", WScript.ScriptFullName);
}

try {
    run();
} catch (err) {
    error("错误：" + err.message);
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

    info("开始获取线上最新版本号......");
    info("");

    // 请求获取最新版本信息
    var json = request("get", "https://api.github.com/repos/fatedier/frp/releases/latest", "json");
    // 最新版本号
    var version = json.name.substring(1);

    info("当前线上最新版本号：" + version);
    info("");

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
        // 如果已经是最新版本
        if (version == out) {
            info("已经是最新版本：" + out);
            info("");
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
        info("当前目录存在最新版压缩文件，开始解压......");
        info("");
        decompression(cmd, shell, fso, currentDirectory, zipName, exeFolder);
        return;
    }

    info("开始下载最新版程序......");
    info("");

    download(url, currentDirectory);

    info("下载完成，开始解压......");
    info("");

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
    get7z();
    shell.Run(cmd + "7za e " + zipName + exeName, 0, true);
    // 如果文件不存在
    if (!fso.FileExists(currentDirectory + "\\frpc.exe")) {
        throw new Error("解压失败！");
    }
    // 删除下载的zip
    fso.DeleteFile(zipName);
    info("解压完成！");
    info("");
}


function error(msg) {
    WScript.StdErr.WriteLine(msg);
}

function info(msg) {
    WScript.StdOut.WriteLine(msg);
}

function help() {
    info("基本用法:");
    info("   下载: " + WScript.ScriptName + " autoRun");
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
 * 获取7z
 *
 */
function get7z() {
    var shell = new ActiveXObject("WScript.shell");
    // 执行7z命令判断是否执行成功
    var out = shell.Run("cmd /c 7za", 0, true);
    var directory = "c:\\windows";
    // 如果执行失败说明7z不存在
    if (out == 1) {
        var url = "https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe"
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
```

