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
    WScript.Echo("参数：", Argv(i));
}

if (Argv.length > 0) {
    switch (Argv(0)) {
        case "1":
            autoStart("startup");
            break;
        case "?", "help":
        default:
            WScript.Echo("双击执行即可！");
    }
    // 正常退出
    WScript.Quit(0);
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
    "www.github.com",
    "raw.githubusercontent.com"
]


var newHosts = [];

for (var i = 0; i < hostsArray.length; i++) {
    if (!isInArray(githubDomain, hostsArray[i])) {
        newHosts.push(hostsArray[i]);
    }
}

for (var i = 0; i < githubDomain.length; i++) {
    var data = { "qtype": 1, "host": githubDomain[i], "qmode": -1 };
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

// for (var i = 0; i < githubDomain.length; i++) {
//     var data = { "server": "8.8.8.8", "rrtype": "A", "domain": githubDomain[i] };
//     var url = "https://shorttimemail.com/net/dns/query";
//     var json = request("GET", url, "json", data, null);
//     if (json.code == 0 && json.msg == "ok") {
//         var resultData = json.data;
//         if (resultData.length == 0) {
//             continue;
//         }
//         for (var j = 0; j < resultData.length; j++) {
//             newHosts.push(resultData[j] + " " + githubDomain[i]);
//         }
//     }
// }

// for (var i = 0; i < githubDomain.length; i++) {
//     // 获取token
//     var html = request("GET", "http://tool.chinaz.com/dns?type=1&host=" + githubDomain[i], "text", null, null);
//     var servers = new RegExp("var servers = (.*)", "ig").exec(html);
//     var sjson = eval("(" + servers + ")");
//     for (var j = 0; j < sjson.length; j++) {
//         // 获取DNS
//         var data = { "host": githubDomain[i], "type": 1, "total": 10, "process": 0, "right": 0 };
//         var url = "http://tool.chinaz.com/AjaxSeo.aspx?t=dns&server=" + sjson.ip + "&id=" + sjson.id;
//         var dnsJson = eval(request("POST", url, "text", data, null));
//         for (var k = 0; k < dnsJson.list.length; k++) {
//             newHosts.push(dnsJson.list[k].result + " " + githubDomain[i]);
//         }
//     }
// }

// for (var i = 0; i < githubDomain.length; i++) {
//     // 获取token
//     var member = request("GET", "https://www.dns.com/member", "json", null, null);
//     if (member.code == 1 && msg == "") {
//         // 获取IP和host
//         var getIp = request("POST", "https://www.dns.com/getIp?_token=" + member.data.tk, "json", null, null);
//         if (getIp.code == 1) {
//             // 查询DNS
//             var data = { "host": getIp.data.host, "url": githubDomain[i], "_token": member.data.tk };
//             var getDns = request("POST", "https://www.dns.com/getDns", "json", data, null);
//             if (getDns.code == 1) {
//                 for (var j = 0; j < resultData.length; j++) {
//                     newHosts.push(getDns.data.userip + " " + githubDomain[i]);
//                 }
//             }
//         }
//     }
// }

// https://www.boce.com/tool

// https://tools.ipip.net/dns.php

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

function help() {
    WScript.Echo("基本用法:");
    WScript.Echo("   " + WScript.ScriptName, "autoRun");
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