# WindowsJScript


[[toc]]



## Flag

* [https://www.wanweibaike.com/wiki-JScript](https://www.wanweibaike.com/wiki-JScript)

> `JScript`实现的`ECMAScript Edition 3`，也是`IE8`使用的引擎。然而，随着`V8`大放光彩，
> 微软放弃了之前规划的托管`JavaScript`计划（同期规划的`VB`变身为`VB.NET`活了下来），
> `JScript`开发组另起炉灶搞了`Chakra`与`Node.js`一争长短，这也是`IE9`之后使用的`JS`引擎。

> 在`JScript`中，永远不需要去实例化根对象`WScript`，正如同浏览器中的直接全局对象一样。

* [JScript (ECMAScript3)](https://docs.microsoft.com/zh-cn/previous-versions//hbxc2t98(v=vs.85))
* [JScript参考手册](https://www.php.cn/manual/view/14969.html)
* [JScript](https://www.itminus.com/blog/categories/%E9%A3%8E%E8%AF%AD/ECMAScript/JScript)
* [http://caibaojian.com/jscript](http://caibaojian.com/jscript)




## BAT和JS混合编程

* `BAT`执行`JScript`原理 [js/bat脚本混编新方案](http://www.bathome.net/thread-33125-1-1.html)

- 缺陷：修改了一个变量的值

```batch
@set @a=1/*
@echo off
start wscript -e:jscript "%~f0"
pause
goto :EOF
*/

// ****************************  JavaScript  *******************************

```

- 缺陷：会清屏

```batch
echo=1/*>nul&@cls
@echo off
start wscript -e:jscript "%~f0"
pause
goto :EOF
*/

// ****************************  JavaScript  *******************************

```

- 缺陷：暂时没有

```batch
@if (1==1) @end/*
@echo off
echo Hello World!
start wscript -e:jscript "%~f0"
pause
goto :EOF
*/

// ****************************  JavaScript  *******************************

```

- 缺陷：暂时没有

```batch
@if (0)==(0) echo off
cscript -nologo -e:jscript %~s0
goto :EOF
@end

// ****************************  JavaScript  *******************************

```

- 缺陷：暂时没有

> `1>1` 的运行结果是个 `Boolean` 值，而 js 允许这种无意义的语句（其实对 eval 来说是有意义的）

```batch
1>1/* :
@echo off
cscript -nologo -e:jscript %0
pause&exit
*/

// ****************************  JavaScript  *******************************

```

- 缺陷：需要包裹html标签


```batch
<!-- :
@echo off
::for /f "delims=" %%a in ('mshta "%~f0"') do echo;%%a
for /f "delims=" %%a in ('mshta "%~f0"') do ( set filePath=%%a)
echo %filePath%
pause&exit /b
-->

<input type=file id=f>
<script>

f.click();

alert(f.value);

var sfo = new ActiveXObject('Scripting.FileSystemObject');
// 获取TextStream对象.参数：0输入流,1输出流,2错误流.
sfo.GetStandardStream(1).Write(f.value);

var Shell = new ActiveXObject("Shell.Application");
// 起始目录为：桌面
var Folder = Shell.BrowseForFolder(0, "请选择文件夹", 0);
if (Folder != null) {
    Folder = Folder.items();
    Folder = Folder.item();
    Folder = Folder.Path;
    sfo.GetStandardStream(1).Write(Folder);
}
close();

</script>
```


### 参数传递

> 执行当前脚本中的JavaScript脚本：`cscript -nologo -e:jscript "%~f0"`，`%~f0`表示当前批处理的绝对路径,去掉引号的完整路径

```batch
1>1/* ::
::  by bajins https://www.bajins.com

@echo off

:: 开启延迟环境变量扩展
:: 解决for或if中操作变量时提示ECHO OFF问题，用!!取变量
:: 解决调用jscript提示命令错误问题
setlocal enabledelayedexpansion

:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径，后面的是参数（组成方式：/key:value）
cscript -nologo -e:jscript "%~f0" /func:download /url:%~1 /path:%~2

:: 无键，直接传入值
cscript -nologo -e:jscript "%~f0" download %~1 %~2 %~3 %~4 %~5 %~6 %~7 %~8 %~9
goto :EXIT

:EXIT
:: 结束延迟环境变量扩展和命令执行
endlocal&exit /b %errorlevel%
*/

// ****************************  JavaScript  *******************************

var Argv = WScript.Arguments;
for (i = 0; i < Argv.Length; i++) {
    WScript.Echo("参数：" + Argv(i));
}

// 传参时指定键值，组成方式：/key:value
var ArgvName = Argv.Named;
var func = ArgvName.Item("func");
var path = ArgvName.Item("path");

// 无键，直接传入值
var func = Argv(0);
var url = Argv(1);
var path = Argv(2);

```


## ActiveXObject

* [ActiveXObject](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Microsoft_Extensions/ActiveXObject)
* [ActiveXObject对象使用整理](https://blog.csdn.net/chen_zw/article/details/9336375)

- `JScript`中`ActiveXObject`对象是启用并返回`Automation`对象的引用。
- 使用方法：`var newObj = new ActiveXObject( servername.typename[, location])`
    - 其中`newObj`是必选项。要赋值为`ActiveXObject`的变量名。
    - `servername`是必选项。提供该对象的应用程序的名称。
    - `typename`是必选项。要创建的对象的类型或类。
    - `location`是可选项。创建该对象的网络服务器的名称。





## js函数封装

### HTTP请求

```js
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
```


### 解析XML

```js
/**
 * 解析XML
 * 查看方法属性：New-Object -ComObject "Msxml2.DOMDocument.6.0" | Get-Member
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
            WScript.Echo(XMLHTTPVersions[i] + ":",  e.message);
        }
    }
    xmlParser.async = false;
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    if (!fso.FileExists(xml)) {
        // 载入xml字符串
        xmlParser.loadXML(xml);
    }else {
        // 载入xml文件
        xmlParser.load(xml);
    }
    return xmlParser;
}
```



### 解析HTML

```js
/**
 * 解析HTML
 * 查看方法属性：New-Object -ComObject "htmlfile" | Get-Member
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




### 图片格式转换

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
    imgps.Apply(img).SaveFile(formatPath);
    // 如果文件不存在,就说明没有转换成功
    if (!fso.FileExists(formatPath)) {
        throw new Error("图片格式转为" + format + "失败");
    }
    return formatPath;
}
```

### 设置壁纸

```js
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
```

- 这种方式更稳定

> 使用API触发图片文件右键菜单上的 `设置为桌面背景(B)`

```js
/**
 * 设置桌面壁纸
 *
 * @param imagesPath 图片全路径
 */
function setWallpaper(imagesPath) {
    var shApp = new ActiveXObject("Shell.Application");
    // 获取文件
    var picFile = new ActiveXObject("Scripting.FileSystemObject").GetFile(imagesPath);
    // 获取文件上的所有右键菜单项
    //var items = shApp.NameSpace(picFile.ParentFolder.Path).ParseName(picFile.Name).Verbs();
    var items = shApp.NameSpace(picFile.ParentFolder.Path).Items().Item(picFile.Name).Verbs();
    // 遍历所有菜单项
    for (var i = 0; i < items.Count; i++) {
        var item = items.Item(i);
        // 注意执行的脚本文件需要为简体中文编码
        if (item.Name == "设置为桌面背景(&B)") {
            item.DoIt();
        }
    }
}
```

### 刷新桌面

```js
// 切换到桌面
new ActiveXObject("Shell.Application").ToggleDesktop();
// 刷新桌面
new ActiveXObject("WScript.Shell").SendKeys("{F5}");

var WSHShell = new ActiveXObject("WScript.Shell");
// 切换到桌面
//WSHShell.AppActivate("Program Manager")
WSHShell.AppActivate(WSHShell.SpecialFolders("Desktop"));
// 刷新桌面
WSHShell.SendKeys("{F5}");

// 刷新桌面、任务栏、OSD（相当于重启资源管理器）
var shell=new ActiveXObject("WScript.Shell");
shell.Run("regsvr32.exe /s /n /i:/UserInstall %SystemRoot%\\system32\\themeui.dll", 0, true);

// 效果不太好，有时刷新成功，有时失败
var shell=new ActiveXObject("WScript.Shell");
shell.Run("RunDll32 USER32,UpdatePerUserSystemParameters", 0, true);

// assoc文件关联时会自动刷新桌面，可能报错
var shell=new ActiveXObject("WScript.Shell");
shell.Run("assoc .=.", 0, true);


// 重启资源管理器并恢复打开的目录，暂时不能使用
function restartExplorer() {
    var arrURL = [];
    var shApp = new ActiveXObject("Shell.Application");
    // 遍历所有打开的窗口
    for (var i = 0; i < shApp.Windows().Count; i++) {
        var oWin = shApp.Windows().Item(i);
        // 如果打开的窗口为资源管理器
        if (oWin != null && oWin.FullName.indexOf("explorer.exe") != -1) {
            if (oWin.LocationURL != null) {
                arrURL.push(oWin.LocationURL);
            } else {
                arrURL.push("");
            }
            //oWin.Document.folder.title;
            // 关闭当前打开的文件夹
            //oWin.quit();
        }
    }
    // 结束资源管理器进程
    var shell = new ActiveXObject("WScript.Shell");
    shell.Run("taskkill /f /im explorer.exe >nul 2>nul&start explorer.exe", 0, true);
    // 遍历并打开之前的窗口
    for (var i = 0; i < arrURL.length; i++) {
        shApp.Open(arrURL[i]);
        shApp.Explore(arrURL[i]);
    }
}
```



### 获取系统信息

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
    WScript.Echo("不知道32位还是64位的");
    WScript.Quit(1);
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
    // 截取version最后一个"."的左面部分
    var version = os.Version.substring(0, version.lastIndexOf("."));
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



### 解压zip

```js
/**
 * 解压zip
 * 查看方法属性：New-Object -ComObject "Shell.Application" | Get-Member
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
    objShell.NameSpace(unDirectory).CopyHere(objSource.Items());
}
```



### 下载7z

```js
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
```



### 数据库

```js
/**
 * 数据库
 * 查看方法属性：New-Object -ComObject "ADODB.Connection" | Get-Member
 */
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
            WScript.Echo(objrs.Fields(i).Value);
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


### 开机启动

```js
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
```

### 获取所有COM组件

```js
// 列举本机所有的 com 组件 by http://www.bathome.net/thread-32948-1-1.html
function listcom() {
    var dict = new ActiveXObject('Scripting.Dictionary');
    var oLoc = new ActiveXObject("WbemScripting.SWbemLocator");

    var oReg = oLoc.ConnectServer(null, "root\\default").Get("StdRegProv");
    var oMethod = oReg.Methods_("EnumKey");
    var oInParam = oMethod.InParameters.SpawnInstance_();
    oInParam.hDefKey = 0x80000000;
    oInParam.sSubKeyName = '';
    var NameAndType = oReg.ExecMethod_(oMethod.Name, oInParam);
    var arrSubKeys = NameAndType.sNames.toArray();

    // 遍历HKEY_CLASSES_ROOT中所有键
    for (var i = 0; i < arrSubKeys.length; i++) {
        var key = arrSubKeys[i];
        if (key.search(/..\./) < 0) {
            continue;
        }
        if (key.search(/..\..*\./) > 0) {
            var independent = key.replace(/.+?$/, '');
            if (!dict.Exists(independent)) {
                dict.Add(key, 0);
            }
        } else {
            var vdpid = "";
            for (var element in dict) {
                if (element.length > key.length && element.substring(key.length) == key + ".") {
                        vdpid = element;
                        break;
                }
            }
            if (vdpid.length) {
                dict.Remove(vdpid);
            }
            dict.Add(key, '');
        }
    }
    var retArr = [];
    var arr = new VBArray(dict.Keys()).toArray();
    for (var i = 0; i < arr.length; i++) {
        retArr.push(arr[i]);
    }
    return retArr;
}
var fso = new ActiveXObject('Scripting.FileSystemObject');
var ts = fso.CreateTextFile('本机可用的com组件.txt', true);
ts.Write(listcom().join('\r\n'));
```


### 创建任务计划

**[Windows中的事件](/Shell/WindowsBatch.md#事件)**

**使用示例见[设置必应壁纸.bat](/files/设置必应壁纸.bat)文件**

```javascript
/**
 * 创建任务计划的常用API展示，在实现中需结合实际使用
 */
function createSchedule() {
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
    regInfo.Description = "任务说明描述";
    // 创建人
    regInfo.Author = "创建人";

    // 操作集合，运行程序/脚本等动作的集合，最多32个动作
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/actioncollection
    var actions = taskDefinition.Actions;
    // 创建要执行的任务的动作：0运行脚本或程序，5触发处理程序，6发送邮件，7显示一个消息框
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/actioncollection-create
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/action#remarks
    
    // 向任务添加操作 https://docs.microsoft.com/zh-cn/windows/win32/taskschd/execaction
    var action = actions.Create(0);
    action.Path = "wscript";
    action.Arguments = "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp\\设置必应壁纸.vbs";
    var action1 = actions.Create(0);
    action1.Path = "eventvwr";

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
    // 该值指示任务将在UI中不可见
    settings.Hidden = false;
    // 获取或设置任务的优先级。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/tasksettings-priority
    settings.Priority = 0;

    // 获取或设置用于启动任务的触发器的集合。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/trigger
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/triggercollection-create
    var triggers = taskDefinition.Triggers;

    
    // 创建事件触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/eventtrigger
    var task_trigger_event = triggers.Create(0);
    // 定义事件查询。触发器将启动任务，当收到事件时。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/eventtrigger-subscription
    task_trigger_event.Subscription = "<QueryList>" +
        "<Query Id='0'><Select Path='System'>" +
        "*[System[Provider[@Name='Microsoft-Windows-Power-Troubleshooter'] and EventID=1]]" +
        "</Select></Query>" +
        "<Query Id='1'><Select Path='System'>" +
        "*[System/Level=2]" +
        "</Select></Query>" +
        "</QueryList>";
    // 获取或设置命名XPath查询的集合
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/eventtrigger-valuequeries
    var valueQueries = task_trigger_event.ValueQueries;
    valueQueries.Create("eventID", "Event/System/EventRecordID");
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/showmessageaction
    var action7 = actions.Create(7);
    action7.Title = "标题";
    // 需要配合trigger.ValueQueries
    action7.MessageBody = "这是事件ID：$(eventID)";
    
    // 创建时间触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/timetrigger
    var task_trigger_time = triggers.Create(1);
    
    // 创建每日触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/dailytrigger
    var task_trigger_daily = triggers.Create(2);
    
    // 创建每周触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/weeklytrigger
    var task_trigger_weekly = triggers.Create(3);
    task_trigger_weekly.DaysOfWeek = 1;
    // 任务每周运行一次。
    task_trigger_weekly.WeeksInterval = 1;
    
    // 创建根据月度计划启动任务的触发器，在特定月份的特定日期开始
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/monthlytrigger
    var task_trigger_monthly = triggers.Create(4);
    
    // 创建每月DOWT触发器，按月星期几时间表启动任务的触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/monthlydowtrigger
    var task_trigger_monthlydow = triggers.Create(5);
    
    // 创建闲置触发，在发生空闲情况时启动任务的触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/idletrigger
    var task_trigger_idle = triggers.Create(6);
    
    // 创建注册触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/registrationtrigger
    var task_trigger_registration = triggers.Create(7);
    
    // 创建启动触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/boottrigger
    var task_trigger_boot = triggers.Create(8);
    
    // 创建登录触发器
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/logontrigger
    var task_trigger_logon = triggers.Create(9);
    // 登录指定用户时触发，必须是有效的用户帐户
    task_trigger_logon.UserId = "SYSTEM";
    
    // 用于触发控制台连接或断开连接，远程连接或断开连接或工作站锁定或解锁通知的任务。
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/sessionstatechangetrigger
    var task_session_unlock = triggers.Create(11);
    // 获取或设置连接到会话的状态更改类型：1本地连接，2断开本地连接，3远程连接，4断开远程连接，7锁定，8解锁
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/sessionstatechangetrigger-statechange
    task_session_unlock.StateChange = 8;
    // 继承自Trigger对象。获取触发器的类型。
    task_session_unlock.Type;


    /**
     * 以下为每一个trigger都有的通用属性
     */

    // 获取或设置触发器的标识符
    trigger.Id = "触发器ID";
    // 获取或设置一个布尔值，该值指示是否启用了触发器
    trigger.Enabled = true;
    // 获取或设置激活触发器的日期和时间。触发器可以在激活触发器后启动任务。
    trigger.StartBoundary = "2006-05-02T10:49:02";
    // 获取或设置停用触发器的日期和时间。触发器在停用后无法启动任务。
    trigger.EndBoundary = "2006-05-02T10:52:02";
    // 获取或设置允许触发器启动的任务运行的最长时间，5分钟
    trigger.ExecutionTimeLimit = "PT5M";
    // 延迟30秒
    trigger.Delay = "PT30S";

    // 使用ITaskDefinition接口在指定位置注册（创建）任务以定义任务
    // 用户ID有：Local Service ; SYSTEM ; null为当前登录的用户名
    // 最后一位参数影响任务计划运行
    // https://docs.microsoft.com/zh-cn/windows/win32/taskschd/taskfolder-registertaskdefinition
    rootFolder.RegisterTaskDefinition("任务计划名", taskDefinition, 6, "用户ID", null, 0);
}
```




