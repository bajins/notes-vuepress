# Batch执行WScript



* [JScript](#jscript)
  * [ActiveXObject](#activexobject)
  * [参数传递](#参数传递)
  * [js函数封装](#js函数封装)
* [VBScript](#vbscript)
  * [vbs特殊符号](#vbs特殊符号)
  * [vbs函数封装](#vbs函数封装)





## JScript

> `JScript`实现的`ECMAScript Edition 3`，也是`IE8`使用的引擎。然而，随着`V8`大放光彩，
> 微软放弃了之前规划的托管`JavaScript`计划（同期规划的`VB`变身为`VB.NET`活了下来），
> `JScript`开发组另起炉灶搞了`Chakra`与`Node.js`一争长短，这也是`IE9`之后使用的`JS`引擎。

> 在`JScript`中，永远不需要去实例化根对象`WScript`，正如同浏览器中的直接全局对象一样。

- `BAT`执行`JScript`原理

> 把`batch`命令用`JavaScript`注释`/**/`包裹住，然后用`batch`命令执行文件中的`JavaScript`代码时就不会编译`batch`命令了
>> `1>1/* ::`文件的开头
>>
>> `*/` `batch`命令的结尾

> 执行当前脚本中的JavaScript脚本：`cscript -nologo -e:jscript "%~f0"`
>> %~f0 表示当前批处理的绝对路径,去掉引号的完整路径


* [microsoft.jscript](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.jscript)

* [JScript参考手册](https://www.php.cn/manual/view/14969.html)

* [JScript](https://www.itminus.com/blog/categories/%E9%A3%8E%E8%AF%AD/ECMAScript/JScript/)


### ActiveXObject

* [ActiveXObject](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Microsoft_Extensions/ActiveXObject)

* [ActiveXObject对象使用整理](https://blog.csdn.net/chen_zw/article/details/9336375)

- `JScript`中`ActiveXObject`对象是启用并返回`Automation`对象的引用。

> 使用方法：`var newObj = new ActiveXObject( servername.typename[, location])`
>> 其中`newObj`是必选项。要赋值为`ActiveXObject`的变量名。
>>
>> `servername`是必选项。提供该对象的应用程序的名称。
>>
>> `typename`是必选项。要创建的对象的类型或类。
>>
>> `location`是可选项。创建该对象的网络服务器的名称。



### 参数传递


- 方式二

> 传参时指定键值，组成方式：/key:value

```batch
1>1/* ::
::  by bajins https://www.bajins.com

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

var func = ArgvName.Item("func");
var path = ArgvName.Item("path");

```

- 方式三

> 无键，直接传入值

```batch
1>1/* ::
::  by bajins https://www.bajins.com

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
var url = Argv(1);
var path = Argv(2);

```



### js函数封装

- HTTP请求

```js
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
```


- 解析XML

```js
/**
 * 解析XML
 *
 * @param xml xml字符串或者文件路径
 * @returns {*}
 * @constructor
 */
function XMLParsing(xml) {
    if (xml == "" || xml == null || xml.length <= 0) {
        throw new Error("xml字符串或者文件路径不能为空！");
    }
    var xmlDomVersions = [
        'Msxml2.DOMDocument.6.0',
        'Msxml2.DOMDocument.5.0',
        'Msxml2.DOMDocument.4.0',
        'MSXML2.DOMDocument.3.0',
        'MSXML2.DOMDocument',
        'Microsoft.XMLDOM'
    ];
    var xmlParser;
    for (var i = 0; i < xmlDomVersions.length; i++) {
        try {
            xmlParser = new ActiveXObject(xmlDomVersions[i]);
            break;
        } catch (e) {
            WScript.StdOut.Write(xmlDomVersions[i]);
            WScript.StdOut.WriteLine("：" + e.message);
        }
    }
    xmlParser.async = false;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(xml)) {
        // 载入xml字符串
        xmlParser.loadXML(xml);
        return xmlParser;
    }
    // 载入xml文件
    xmlParser.load(xml);
    return xmlParser;
}
```



- 解析HTML

```js
/**
 * 解析HTML
 *
 * @param html html字符串或者文件路径
 * @returns {any}
 * @constructor
 */
function HtmlParsing(html) {
    if (html == "" || html == null || html.length <= 0) {
        throw new Error("html字符串或者文件路径不能为空！");
    }
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (fso.FileExists(html)) {
        var htmlFile = fso.OpenTextFile(html, ForReading);
        html = htmlFile.ReadAll;
        htmlFile.Close();
    }
    // mhtmlfile
    var htmlParser = new ActiveXObject("htmlfile");
    htmlParser.designMode = "on";
    htmlParser.write(html);
    return htmlParser;
}
```




- 图片格式转换

```js
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

```

- 设置壁纸

```js
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

    var shadowReg = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion";
    shadowReg = shadowReg + "\\Explorer\\Advanced\\ListviewShadow";
    shell.RegWrite(shadowReg, "1", "REG_DWORD");

    // 如果桌面图标未透明，需要刷新组策略
    //shell.Run("gpupdate /force", 0);

    // 上面已经通过注册表设置了壁纸的参数，调用Windows api SystemParametersInfo刷新配置
    var spi = "RunDll32 USER32,SystemParametersInfo SPI_SETDESKWALLPAPER 0 \"";
    spi = spi + imagesPath + "\" SPIF_SENDWININICHANGE+SPIF_UPDATEINIFILE";
    shell.Run(spi);

    // 结束资源管理器进程
    //shell.Run("taskkill /f /im explorer.exe");

    for (var i = 0; i < 10; i++) {
        // 实时刷新桌面
        shell.Run("RunDll32 USER32,UpdatePerUserSystemParameters");
    }

    // 启动资源管理器
    //shell.Run("start explorer.exe");
}
```

- 获取系统信息

```js
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
```

```js
/**
 * 获取当前系统位数
 * 
 * @returns {string}
 */
function systemDigits() {
    var locator = new ActiveXObject("WbemScripting.SWbemLocator");
    // 连接本地电脑
    var service = locator.ConnectServer(".");

    // 获取系统版本
    var csResult = service.ExecQuery("Select * from Win32_ComputerSystem");
    // 创建一个可枚举的对象
    var cs = new Enumerator(csResult).item();
    var digits = cs.SystemType;

    if (digits.indexOf("86") != -1) {
        return "i386";
    } else if (digits.indexOf("64") != -1) {
        return "amd64";
    }
    wscript.echo("不知道32位还是64位的");
    wscript.quit(1);
}

/**
 * 获取当前系统版本
 * 
 * @returns {string}
 */
function osVersion() {
    var locator = new ActiveXObject("WbemScripting.SWbemLocator");
    // 连接本地电脑
    var service = locator.ConnectServer(".");

    // 获取系统版本
    var osResult = service.ExecQuery("Select * from Win32_OperatingSystem");
    // 创建一个可枚举的对象
    var os = new Enumerator(osResult).item();

    var caption = os.Caption;
    var version = os.Version;
    // 截取version最后一个"."的左面部分
    version = version.substring(0, version.lastIndexOf("."));

    switch (version) {
        case "5.2":
            return "Windows Server 2003";
            break;
        case "5.0":
            return "Windows 2000";
            break;
        case "5.1":
            return "Windows XP";
            break;
        case "6.0":
            return "windows visita";
            break;
        case "6.1":
            return "windows 7";
            break;
        case "10.0":
            return "windows 10";
            break;
        defult:
            return version;
    }
}
```



- 解压zip

```js
/**
 * 解压zip
 * 
 * @param zipFile       zip文件全路径
 * @param unDirectory   解压目录
 */
function unZip(zipFile, unDirectory) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(zipFile)) {
        throw new Error("压缩文件不存在！");
    }
    if (fso.GetExtensionName(zipFile) != "zip") {
        throw new Error("压缩文件后缀不为zip！");
    }
    // 如果解压目录不存在
    if (!fso.FolderExists(unDirectory)){
        // 创建目录
        fso.CreateFolder(unDirectory);
    }

    var objShell = new ActiveXObject("Shell.Application");
    var objSource = objShell.NameSpace(zipFile);
    if (objSource == null) {
        throw new Error("无法解压文件！");
    }
    objShell.NameSpace(unDirectory).CopyHere(objSource.Items(), 256);
}
```



- 7z

```js
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

/**
 * 下载7-Zip
 */
function download7z() {
    var srcUrl = "https://sourceforge.net/projects/sevenzip/rss?path=/7-Zip";
    var txt = request("get", srcUrl, "text", "", "");
    var dlUrl = "https://www.7-zip.org/a/";
    var filename;
    try {
        var xmlDoc = XMLParser(txt);
        var links = xmlDoc.getElementsByTagName("link");
        if (links.length <= 0) {
            txt = request("get", srcUrl, "text", "", "");
        }
        var link = links[5].firstChild.nodeValue.split("/");
        filename = link[link.length - 2];
    } catch (e) {
        WScript.StdOut.WriteLine(e.message);
        srcUrl = "https://www.7-zip.org/download.html";
        txt = request("get", srcUrl, "text", "", "");
        var html = HtmlParsing(txt);
        var tbody = html.getElementsByTagName("tbody")(4);
        var href = tbody.children(3).firstChild.firstChild.getAttribute("href");
        href = href.split("/");
        filename = href[href - 1];
    }
    dlUrl += filename;
    // 当前文件所在目录
    var currentDir = fso.GetFile(WScript.ScriptFullName).ParentFolder;
    try {
        download(dlUrl, currentDir, filename);
    } catch (e) {
        throw new Error("下载7z错误：" + e.message);
    }
}
```




- 数据库

```js
function db(){
    // 创建数据库对象   
    var objdbConn = new ActiveXObject("ADODB.Connection");
    var strdsn = "Driver={SQL Server}; Server=(local); Database=Test;UID=sa;PWD=123456";
    // 打开数据源   
    objdbConn.Open(strdsn);
    // 执行SQL的数据库查询   
    var objrs = objdbConn.Execute("Select * from test");
    // 获取字段数目   
    var fdCount = objrs.Fields.Count - 1;

    // 显示数据库内容   
    while (!objrs.EOF) {
        // 显示每笔记录的字段
        for (i = 0; i <= fdCount; i++){
            WScript.StdOut.WriteLine(objrs.Fields(i).Value);
        }
        // 移到下一笔记录
        objrs.moveNext();
    }
    // 关闭记录集合
    objrs.Close();
    // 关闭数据库链接
    objdbConn.Close();
}
```


- 开机启动

```js
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
```


## VBScript

* [Visual Basic 指南](https://docs.microsoft.com/zh-cn/dotnet/visual-basic/)

* [VBScript 语言](https://www.tcoline.com/resource/vbs/top_vbs_0.htm)

* [VBScript 教程](https://code.ziqiangxuetang.com/vbscript/vbscript-tutorial.html)

* [VBScript 函数](https://www.w3school.com.cn/vbscript/vbscript_ref_functions.asp)




### vbs特殊符号

| 常数            | 值                             | 描述                         |
|---------------|-------------------------------|----------------------------|
| vbCr          | Chr\(13\)                     | 回车符。                       |
| vbCrLf        | Chr\(13\)&Chr\(10\)           | 回车符与换行符。                   |
| vbFormFeed    | Chr\(12\)                     | 换页符；在MicrosoftWindows中不适用。 |
| vbLf          | Chr\(10\)                     | 换行符。                       |
| vbNewLine     | Chr\(13\)&Chr\(10\)或Chr\(10\) | 平台指定的新行字符；适用于任何平台。         |
| vbNullChar    | Chr\(0\)                      | 值为0的字符。                    |
| vbNullString  | 值为0的字符串                       | 与零长度字符串\(""\)不同；用于调用外部过程。  |
| vbTab         | Chr\(9\)                      | 水平附签。                      |
| vbVerticalTab | Chr\(11\)                     | 垂直附签；在MicrosoftWindows中不用  |




### vbs函数封装

- **数组转换为字符串**

```visual-basic
'数组转换为字符串
'Writer         Bajins
'Create Date    2019-10-22
'arrayName      数组
'separator      separator
'Example        ConvertArrayToString(array, ",")
Public Function ConvertArrayToString(array, separator)
    Dim elementString

    For Each element In array
        elementString = elementString + Cstr(element) + separator
    Next

    elementString = StrReverse(elementString)
    elementString = Replace(elementString, separator,"",1,1)
    elementString = StrReverse(elementString)
    ' 设置返回值
    ConvertArrayToString = elementString
End Function
```


- **获取对象的属性和值**

```visual-basic
' 获取对象的属性和值
'Writer         Bajins
'Create Date    2019-10-22
'obj            对象
'Example        GetObjectPropertieValue(obj)
Public Function GetObjectPropertieValue(obj)
    IF Not IsObject(obj) Then
        'Exit Function
        Err.Raise Err.Number
    END IF
    
    Dim kv
    
    For Each Propertie in obj.Properties_
       kv = kv & Propertie.name & " : " & Propertie.value & vbCrLf
    Next
    
    kv = "属性数量：" & obj.Properties_.count & vbCrLf & kv
    
    ' 设置返回值
    GetObjectPropertieValue = kv
End Function
```

- **获取系统信息**

```visual-basic
' 获取系统位数
'Writer         Bajins
'Create Date    2019-10-22
'Example        GetSystemBit()
Public Function GetSystemBit()
    'Set WMIService = GetObject("winmgmts:\\.\root\cimv2")
    'Set ComputerSystem = WMIService.ExecQuery("select * from Win32_ComputerSystem")

    'Set locator = CreateObject("WbemScripting.SWbemLocator")
    'Set WMIService = locator.ConnectServer(, "root\cimv2")
    'Set ComputerSystem = WMIService.ExecQuery("select * from Win32_ComputerSystem")

    Set WMIService = GetObject("winmgmts:{impersonationlevel=impersonate}!\\.\root\cimv2")
    Set ComputerSystem = WMIService.InstancesOf("Win32_ComputerSystem")

    For Each System in ComputerSystem
        IF InStr(System.SystemType,"86") > 0 Then
            GetSystemBit = "i386"
            Exit For
        End IF
        
        IF InStr(System.SystemType,"64") > 0 Then
            GetSystemBit = "amd64"
            Exit For
        End IF
    Next

End Function
```


