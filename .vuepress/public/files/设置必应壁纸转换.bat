1>1/* ::
:: -------------------------------------------------------------------
::                          自动设置Bing壁纸
::                     by https://www.bajins.com
::                   GitHub https://woytu.github.io
:: -------------------------------------------------------------------


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

if "%~1"=="1" (
    goto :START
)

cscript -nologo -e:jscript "%~f0" startup

:START
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

var fso = new ActiveXObject("Scripting.FileSystemObject");
// 当前文件所在目录
var currentDirectory = fso.GetFile(WScript.ScriptFullName).ParentFolder;

if (Argv.length > 0) {
    switch (Argv(0)) {
        case "startup":
            var fileName = autoStart("startup", "1");
            createSchedule("SetBingWallpaper", "设置必应壁纸", "bajins", "wscript", '"' + fileName + '" 1');
            break;
        case "?", "help":
        default:
            help();
    }
    // 正常退出
    WScript.Quit(0);
}

var json = request("GET", "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", "json");

var imageUrl = "https://cn.bing.com" + json.images[0].url.split("&")[0];
var imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1).split("=")[1];

var oldImagePath = download(imageUrl, currentDirectory, imageName);
// 如果转换后文件不存在
if (!fso.FileExists(oldImagePath)) {
    WScript.Echo("图片下载失败");
    WScript.Quit(1);
}
var imagePath = imageTransform(oldImagePath, "bmp");
if (fso.FileExists(imagePath)) {
    setWallpaper(imagePath);
    WScript.Sleep(5000);
    fso.DeleteFile(imagePath);
    fso.DeleteFile(oldImagePath);
    WScript.Echo("设置壁纸成功！", imagePath);
    WScript.Quit(0);
} else {
    WScript.Echo("下载壁纸失败！");
    WScript.Quit(1);
}


function help() {
    WScript.Echo("基本用法:");
    WScript.Echo("   " + WScript.ScriptName, "autoRun");
    WScript.Echo("      autoRun 是否开启开机自动运行：默认0不开启,1开启");
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
    imgps.Apply(img).SaveFile(formatPath);
    // 如果文件不存在,就说明没有转换成功
    if (!fso.FileExists(formatPath)) {
        throw new Error("图片格式转为" + format + "失败");
    }
    return formatPath;
}

/**
 * 设置桌面壁纸
 *
 * @param imagesPath 图片全路径
 */
function setWallpaper(imagesPath) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 如果文件不存在,就说明没有转换成功
    if (!fso.FileExists(imagePath)) {
        throw new Error("图片不存在或路径错误！");
    }
    var shell = new ActiveXObject("WScript.shell");
    // HKEY_CURRENT_USER
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\TileWallpaper", "0");
    // 设置壁纸全路径
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\Wallpaper", imagesPath);
    shell.RegWrite("HKCU\\Control Panel\\Desktop\\WallpaperStyle", "2", "REG_DWORD");
    var shadowReg = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion";
    shell.RegWrite(shadowReg + "\\Explorer\\Advanced\\ListviewShadow", "1", "REG_DWORD");
    // 如果桌面图标未透明，需要刷新组策略
    //shell.Run("gpupdate /force", 0, true);
    // 上面已经通过注册表设置了壁纸的参数，调用Windows api SystemParametersInfo刷新配置
    var spi = "RunDll32 USER32,SystemParametersInfo SPI_SETDESKWALLPAPER 0 \"";
    shell.Run(spi + imagesPath + "\" SPIF_SENDWININICHANGE+SPIF_UPDATEINIFILE", 0, true);
    // for (var i = 0; i < 30; i++) {
    //     // 实时刷新桌面
    //     shell.Run("RunDll32 USER32,UpdatePerUserSystemParameters", 0, true);
    // }
    shell.Run("regsvr32.exe /s /n /i:/UserInstall %SystemRoot%\\system32\\themeui.dll", 0, true);
}

/**
 * 开机启动
 *
 * @param mode 为startup时是在开机启动目录中创建vbs脚本，否则添加开机启动注册表
 * @param arguments 向执行的程序或脚本传递相关联的参数
 */
function autoStart(mode, arguments) {
    if (arguments != null && arguments != "") {
        arguments = " " + arguments;
    }
    var fileName = WScript.ScriptName;
    fileName = fileName.substring(0, fileName.lastIndexOf('.'));
    //fileName = fileName.substring(0, fileName.length-4);
    var vbsFileName = WScript.ScriptFullName.replace(".bat", ".vbs");
    if ("startup" == mode.toLowerCase()) {
        // 开机启动目录
        var runDir = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\";
        vbsFileName = runDir + fileName + ".vbs";
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    // 创建文件
    var vbsFile = fso.CreateTextFile(vbsFileName, true);
    // 填写数据，并增加换行符
    vbsFile.WriteLine("Set shell = WScript.CreateObject(\"WScript.Shell\")");
    vbsFile.WriteLine('shell.Run "cmd /c ' + WScript.ScriptFullName + arguments + '", 0, false');
    // 关闭文件
    vbsFile.Close();
    if ("startup" != mode.toLowerCase()) {
        // 添加开机启动注册表
        var shell = new ActiveXObject("WScript.shell");
        var runRegBase = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\";
        shell.RegWrite(runRegBase + fileName, vbsFileName + arguments);
    }
    return vbsFileName;
}

/**
 * 创建任务计划
 *
 * @param name 任务计划名
 * @param desc 任务计划描述
 * @param author 任务计划创建人
 * @param path 执行的程序或脚本路径
 * @param arguments 向执行的程序或脚本传递相关联的参数
 */
function createSchedule(name, desc, author, path, arguments) {
    // 创建TaskService对象，提供对任务计划程序服务的访问权限，以管理已注册的任务
    var service = new ActiveXObject("Schedule.Service");
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/taskservice-connect
    service.Connect();

    // 获取一个文件夹以在其中创建任务定义。
    var rootFolder = service.GetFolder("\\");
    // 返回一个空的任务定义对象，参数保留供将来使用，必须设置为0
    var taskDefinition = service.NewTask(0);

    // 创建RegistrationInfo对象，设置任务的注册信息
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/registrationinfo
    var regInfo = taskDefinition.RegistrationInfo;
    // 任务说明
    regInfo.Description = desc;
    // 创建人
    regInfo.Author = author;

    // 操作集合，运行程序/脚本等动作的集合，最多32个动作
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/actioncollection
    var actions = taskDefinition.Actions;
    // 创建要执行的任务的动作：0运行脚本或程序，5触发处理程序，6发送邮件，7显示一个消息框
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/actioncollection-create
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/action#remarks
    
    // 向任务添加操作 https://docs.microsoft.com/zh-cn/windows/win32/taskschd/execaction
    var action = actions.Create(0);
    // 向任务添加操作
    action.Path = path;
    // 向操作实例传递参数
    action.Arguments = arguments;

    // 提供主体安全证书的脚本对象。这些安全凭证为与委托人关联的任务定义了安全上下文。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/principal
    var principal = taskDefinition.Principal;
    // 将登录类型设置为交互式登录
    // principal.LogonType = 3;
    // 获取或设置标识符，该标识符用于指定运行与主体相关联的任务所需的特权级别。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/principal-runlevel
    principal.RunLevel = 1;

    // 创建一个TaskSettings对象，设置任务计划程序的任务设置信息
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/tasksettings
    var settings = taskDefinition.Settings;
    // 该值指示任务计划程序可以在计划时间过去之后的任何时间启动任务
    settings.StartWhenAvailable = true;
    settings.Enabled = true;
    settings.Hidden = false;

    // 获取或设置用于启动任务的触发器的集合。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/trigger
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/triggercollection-create
    var triggers = taskDefinition.Triggers;
    // 创建事件触发器
    // https://docs.microsoft.com/en-us/previous-versions//aa446887(v=vs.85)
    var trigger = triggers.Create(0);
    // 定义事件查询。触发器将启动任务，当收到事件时。
    trigger.Subscription = "<QueryList>" +
        "<Query Id='0'><Select Path='System'>" +
        "*[System[Provider[@Name='Microsoft-Windows-Power-Troubleshooter'] and EventID=1]]" +
        "</Select></Query>" +
        "<Query Id='1'><Select Path='System'>" +
        "*[System/Level=2]" +
        "</Select></Query>" +
        "</QueryList>";
    // 创建闲置触发，在发生空闲情况时启动任务的触发器
    //triggers.Create(6);
    // 创建注册触发器
    triggers.Create(7);
    // 创建启动触发器
    triggers.Create(8);
    // 创建登录触发器
    triggers.Create(9);
    // 用于触发控制台连接或断开连接，远程连接或断开连接或工作站锁定或解锁通知的任务。
    var task_console_connect = triggers.Create(11);
    // 获取或设置连接到会话的状态更改类型：1本地连接，2断开本地连接，3远程连接，4断开远程连接，7锁定，8解锁
    task_console_connect.StateChange = 1;
    //var task_remote_connect = triggers.Create(11);
    //task_remote_connect.StateChange = 3;
    var task_session_unlock = triggers.Create(11);
    task_session_unlock.StateChange = 8;

    // 使用ITaskDefinition接口在指定位置注册（创建）任务以定义任务
    // 用户ID有：Local Service ; SYSTEM ; null为当前登录的用户名
    // 最后一位参数影响任务计划运行
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/taskfolder-registertaskdefinition
    rootFolder.RegisterTaskDefinition(name, taskDefinition, 6, null, null, 3);
}