# BAT执行WScript

## 目录

* [WindowsScript](#windowsscript)
  * [HTTP](#http)
    * [对象版本和封装位置](#对象版本和封装位置)
  * [图像处理](#图像处理)
  * [操作文件](#操作文件)
  * [Shell](#shell)
    * [执行命令](#执行命令)
    * [Windows特殊文件夹](#windows特殊文件夹)
* [JScript](#jscript)
  * [ActiveXObject](#activexobject)
  * [参数传递](#参数传递)
  * [函数封装](#函数封装)
  * [下载文件](#下载文件)
  * [设置必应壁纸](#设置必应壁纸)
* [VisualBasicScript](#visualbasicscript)
  * [输入内容到记事本](#输入内容到记事本)
  * [隐藏运行](#隐藏运行)




## WindowsScript

* [属性和方法及子对象](https://docs.microsoft.com/zh-cn/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/x66z77t4(v=vs.84)#language-element-table)


- `Windows Script Host`是一个`language-independent`的脚本宿主环境，主要用于执行`Windows`管理任务，其对象层级为

```bash
// WSH 对象模型层级
WScript
  |-- WshArguments
  |  |-- WshNamed
  |  |-- WshUnnamed
  |-- WshController
  |  |-- WshRemote
  |    |-- WshRemoteError
  |-- WshNetwork
  |-- WshShell
  |  |-- WshShortcut
  |  |-- WshUrlShortcut
  |  |-- WshEnvironment
  |  |-- WshSpecialFolders
  |  |-- WshScriptExec
```
- `WSH`对象模型提供的`COM`接口可以分为两类：
    - `Script Execution and Troubleshooting`：这类接口运行脚本执行`WSH`的基本的操作, 
    输出信息、执行基本的`COM`函数（如`CreateObject`、`GetObject`）
    - `Helper Functions`：执行诸如映射网络驱动器、连接打印机、获取/修改环境变量、操作注册表之类操作

- 再如WshShell对象提供的功能
    - 在本地运行一个程序
    - 操作注册表
    - 创建快捷方式
    - 访问`system folder`
    - 操作环境变量，比如`WINDIR`、`PATH`、`PROMPT`

- 注意WshShell提供了操作注册表的功能
    - RegRead 读
    - RegWrite 写
    - RegDelete 删

> 所有`Scripting`对象都存放在`SCRRUN.DLL`文件中，所有的`Wscript`对象都存放在`WSHOM.ocx`文件中。

- 常用组件对象，都在注册表`HKEY_CLASSES_ROOT`注册表项中

| 对象                         | 说明                                                            |
|------------------------------|-----------------------------------------------------------------|
| ADODB.Command                |                                                                 |
| ADODB.Connection             | 提供数据库连接对象                                              |
| ADODB.Error                  |                                                                 |
| ADODB.Parameter              |                                                                 |
| ADODB.Record                 |                                                                 |
| ADODB.Recordset              | 提供数据库返回结果集对象                                        |
| ADODB.Stream                 |                                                                 |
| ADOMD.Catalog                |                                                                 |
| ADOMD.Cellset                |                                                                 |
| ADOX.Catalog                 | 包含描述数据源模式目录的集合                                    |
| ADOX.Column                  | 表示表、索引或关键字的列                                        |
| ADOX.Group                   | 表示在安全数据库内有访问权限的组帐号                            |
| ADOX.Index                   | 表示数据库表中的索引                                            |
| ADOX.Key                     | 表示数据库表中的主关键字、外部关键字或唯一关键字                |
| ADOX.Procedure               | 表示存储的过程                                                  |
| ADOX.Table                   | 表示数据库表，包括列、索引和关键字                              |
| ADOX.User                    | 表示在安全数据库内具有访问权限的用户帐号                        |
| ADOX.View                    | 表示记录或虚拟表的过滤集                                        |
| AspSmartUpload.SmartUpload   |                                                                 |
| CDONTS.NewMail               | 提供EXCEL操作对象                                               |
| Excel.Application            |                                                                 |
| Excel.Chart                  |                                                                 |
| Excel.Sheet                  |                                                                 |
| Huang.UploadFile             |                                                                 |
| InternetExplorer.application |                                                                 |
| JMail.message                | 提供XML操作对象                                                 |
| Microsoft.XMLDOM             |                                                                 |
| Microsoft.XMLHTTP            |                                                                 |
| MSWC.AdRotator               |                                                                 |
| MSWC.BrowserType             |                                                                 |
| MSWC.NextLink                |                                                                 |
| Msxml2.DOMDocument           |                                                                 |
| Msxml2.DOMDocument.3.0       |                                                                 |
| MSXML2.XMLHTTP               |                                                                 |
| Outlook.Application          |                                                                 |
| powerpoint.Application       | 用来返回存放键值对的字典对象，读取DOS环境变量，读取链接中的设置 |
| Scripting.Dictionary         |                                                                 |
| Scripting.Encoder            | 提供一整套文件系统操作函数                                      |
| Scripting.FileSystemObject   | 签名                                                            |
| Scripting.Signer             |                                                                 |
| Shell.Application            |                                                                 |
| SQLOLE.SQLServer             |                                                                 |
| WinHttp.WinHttpRequest.5.1   |                                                                 |
| Word.Document                | 返回集合的WScript对象的参数属性                                 |
| WScript.Arguments            | 提供网络连接和远程打印机管理的函数。                            |
| Wscript.NetWork              |                                                                 |
| WScript.Shell                |                                                                 |
| WSHController                |                                                                 |




> `JScript`、`VBScript`同属于官方支持的`Windows Script`，当年，这俩脚本都需要依赖于特定的宿主(`Host`)才能执行，
> 比如，`JavaScript`大多时候运行在浏览器中。除了浏览器环境之外，他们，还可以运行在`Windows Script Host`中。



### HTTP

> `XMLHttpRequest`是基于`WinInet`封装的，而`WinHttpRequest`和`ServerXMLHTTPRequest`则是基于`WinHTTP`封装的
> 稳定性属`XMLHttpRequest`为最差,封装成`COM`形式主要是为了方便`js`、`vbs`等脚本的调用，还具有易书写、降低开发难度等许多特点

> 微软提供了二套API：`WinINet`, `WinHTTP`（分别封装于`system32`目录下的`wininet.dll`和`winhttp.dll`内）
> 二者主要区别在于后者更为安全和稳定，可以说`WinHTTP`是`WinINet`的升级版

> `XMLRequest`成员参考缺点：和浏览器挂钩，大多情况下会共享`cookies`、`session`，不支持单独设置代理。
> 优点：和浏览器挂钩，大多情况下会共享`cookies`、`session`
  
> `ServerXMLHTTP`成员参考缺点：系统没有对应`dll`的情况下程序需要外挂一个`dll`文件。优点：脱离浏览器，使用代理方便
  
> `WinHttpRequest`成员参考缺点：暂无。优点：脱离浏览器，使用代理方便，
> `WinHttp.WinHttpRequest.5.1`是`msxml4.0`的底层对象，也就是说`XMLHTTP`、`ServerXMLHTTP`也是在它的基础上封装而来


* [WinHTTP版本](https://docs.microsoft.com/zh-cn/windows/win32/winhttp/winhttp-versions)

#### 对象版本和封装位置

- `XMLHttpRequest`对象版本和对应的封装dll文件
    - `Microsoft.XMLHTTP` 对应 `msxml.dll`
    - `MSXML2.XMLHTTP` 对应 `msxml2.dll`
    - `MSXML2.XMLHTTP.3.0` 对应 `msxml3.dll`
    - `MSXML2.XMLHTTP.4.0` 对应 `msxml4.dll`
    - `MSXML2.XMLHTTP.5.0` 对应 `msxml5.dll`（此版本是伴随office2007发布的，所以目录下可能找不到该版本的dll）
    - `MSXML2.XMLHTTP.6.0` 对应 `msxml6.dll`

> 如上各个dll的发布一般都是以补丁的形式发布，win7默认都集成

- `ServerXMLHTTP`对象版本和对应的封装dll文件
    - `Msxml2.ServerXMLHTTP` 对应 `msxml2.dll`（win7自带，下同！）
    - `Msxml2.ServerXMLHTTP.3.0` 对应 `msxml3.dll`
    - `Msxml2.ServerXMLHTTP.4.0` 对应 `msxml4.dll`
    - `Msxml2.ServerXMLHTTP.5.0` 对应 `msxml5.dll`
    - `Msxml2.ServerXMLHTTP.6.0` 对应 `msxml6.dll`

- `WinHttpRequest`对象`WinHttp.WinHttpRequest.5.1` 对应 `Winhttp.dll`

### 图像处理

> `WIA`全称：`WindowsImageAcquisition`，自动化层是一个功能齐全的图像处理组件，可提供端到端的图像处理功能。
> `WIA`自动化层可以轻松地从数码相机，扫描仪或网络摄像头获取图像，以及旋转，缩放和注释图像文件。
> `WIA Automation Layer`取代了`Windows Image Acquisition（WIA）1.0`提供的`WIA`脚本模型。

* [Windows图像采集（WIA）](https://docs.microsoft.com/zh-cn/windows/win32/wia/-wia-startpage)

* [使用](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/wiaaut/-wiaaut-howto-use-filters)

* [常量](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/wiaaut/-wiaaut-vbscript-constants)

* [Windows Image Acquisition](https://blog.csdn.net/AMinfo/article/details/8100436)
* [WIA图片处理](https://blog.csdn.net/AMinfo/article/details/8100460)



### 操作文件

* [FileSystemObject简介](https://docs.microsoft.com/zh-cn/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/d6dw7aeh(v=vs.84))

* [FileSystemObject操作文件](https://blog.csdn.net/pl1612127/article/details/77862174)



### Shell

* [Wscript.Shell 对象详细介绍](https://www.jb51.net/article/5683_all.htm)


#### 执行命令


- `Run`

> 执行命令完成后返回值是一个整数，就是`0`成功或`1`失败两个状态。

> `Run`的后两个参数，一个是`cmd`窗口的风格，一个是是否等待执行完成。

| 窗口风格 | 说明                                                            |
|------|---------------------------------------------------------------|
| 0    | 隐藏一个窗口并激活另一个窗口。                                               |
| 1    | 激活并显示窗口。如果窗口处于最小化或最大化状态，则系统将其还原到原始大小和位置。第一次显示该窗口时，应用程序应指定此标志。 |
| 2    | 激活窗口并将其显示为最小化窗口。                                              |
| 3    | 激活窗口并将其显示为最大化窗口。                                              |
| 4    | 按最近的窗口大小和位置显示窗口。活动窗口保持活动状态。                                   |
| 5    | 激活窗口并按当前的大小和位置显示它。                                            |
| 6    | 最小化指定的窗口，并按照Z顺序激活下一个顶部窗口。                                     |
| 7    | 将窗口显示为最小化窗口。活动窗口保持活动状态。                                       |
| 8    | 将窗口显示为当前状态。活动窗口保持活动状态。                                        |
| 9    | 激活并显示窗口。如果窗口处于最小化或最大化状态，则系统将其还原到原始大小和位置。还原最小化窗口时，应用程序应指定此标志。  |
| 10   | 根据启动应用程序的程序状态来设置显示状态                                          |



-`Exec`

> 返回值是一个对象，从返回对象中可以获得控制台输出信息和控制台错误信息，即`StdOut` 和 `StdErr` 属性等。

> `Exec`类具有属性`ExitCode`、`ProcessID`、`Status`、`StdErr`、`StdIn`、`StdOut`以及一个函数`Terminate`
>> `Status`属性具有三个值：0为正在执行，1为完成，2为失败
>>
>> 获取输出信息：`StdOut.ReadAll()`




#### Windows特殊文件夹

> `SpecialFolders`属性提供`WshSpecialFolders`对象以便访问`Windows`的`shell`文件夹

> 使用：`WshShell.SpecialFolders("strFolderName")`，如果没有查询的目录则返回`NULL`

| 变量名               | 说明     |
|-------------------|--------|
| AllUsersDesktop   | 公共桌面   |
| AllUsersStartMenu | 公共程式   |
| AllUsersPrograms  | 公共程序   |
| AllUsersStartup   | 公共启动   |
| Desktop           | 桌面     |
| Favorites         | 收藏     |
| Fonts             | 字体     |
| MyDocuments       | 我的文档   |
| NetHood           | 网络     |
| PrintHood         | 打印机    |
| Programs          | 程序     |
| Recent            | 最近     |
| SendTo            | 发给     |
| StartMenu         | 开始菜单   |
| Startup           | 启动     |
| Templates         | 模板     |
| AppData           | 应用程序数据 |





## JScript

> `JScript`实现的`ECMAScript Edition 3`，也是`IE8`使用的引擎。然而，随着`V8`大放光彩，
> 微软放弃了之前规划的托管`JavaScript`计划（同期规划的`VB`变身为`VB.NET`活了下来），
> `JScript`开发组另起炉灶搞了`Chakra`与`Node.js`一争长短，这也是`IE9`之后使用的`JS`引擎。

> 在`JScript`中，永远不需要去实例化根对象`WScript`，正如同浏览器中的直接全局对象一样。

- `BAT`执行`JScript`原理
> 把`batch`命令用`JavaScript`注释`/**/`包裹住，然后用`batch`命令执行文件中的`JavaScript`代码时就不会编译`batch`命令了
>> `1>1/* ::`文件的开头
>>
>> `*/``batch`命令的结尾

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



### 函数封装
- HTTP请求
```js
/**
 * HTTP请求
 *
 * @param method        GET,POST
 * @param url           请求地址
 * @param dataType      "",text,stream,xml,json
 * @param data          数据，{key:value}格式
 * @param contentType   发送的数据类型：默认application/x-www-form-urlencoded、multipart/form-data、text/plain
 * @returns {string|Document|any}
 */
function request(method, url, dataType, data, contentType) {
    // 把字符串转换为大写
    method = method == null ? "GET" : method.toUpperCase();
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();
    contentType = contentType == null ? "application/x-www-form-unlenconded;charset=utf-8" : contentType;

    if (url == "" || url == null || url.length <= 0) {
        throw new Error("请求url不能为空！");
    }

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
    if (directory == "" || directory == null || directory.length <= 0) {
        throw new Error("文件存储目录不能为空！");
    }

    var objFSO = new ActiveXObject("Scripting.FileSystemObject");
    // 如果目录不存在
    if (!objFSO.FolderExists(directory)) {
        // 创建目录
        var strFolderName = objFSO.CreateFolder(directory);
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
    if (!objFSO.FileExists(path)) {
        return "";
    }
    return path;
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
    var objFSO = new ActiveXObject("Scripting.FileSystemObject");
    // 如果文件不存在,就说明没有转换成功
    if (!objFSO.FileExists(imagePath)) {
        throw new Error("图片不存在或路径错误！");
    }
    // 转换后格式文件全路径
    var formatPath = imagePath.replace(/(.+)\.[^\.]+$/, "$1") + "." + format;
    // 如果转换后文件已存在
    if (objFSO.FileExists(formatPath)) {
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
    if (!objFSO.FileExists(formatPath)) {
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
    shell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\ListviewShadow", "1", "REG_DWORD");

    // 如果桌面图标未透明，需要刷新组策略
    shell.Run("gpupdate /force", 0);
    // 实时刷新桌面
    shell.Run("RunDll32.exe USER32.DLL,UpdatePerUserSystemParameters");
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
    objShell.NameSpace(unDirectory).CopyHere(objSource.Items(), 256);
}
```



### 下载文件

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

if "%~1"=="/?" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)
if "%~1"=="/help" (
    cscript -nologo -e:jscript "%~f0" help
    goto :EXIT
)

:: cscript -nologo -e:jscript "%~f0" 这一段是执行命令，后面的是参数
:: %~f0 表示当前批处理的绝对路径,去掉引号的完整路径
cscript -nologo -e:jscript "%~f0" %~1 %~2
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
if (func == "?" || func == "help") {
    help();
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
    info("   下载: BajinsTool url path");
    info("     url  下载链接地址");
    info("     path 存储文件位置");
}

var iRemote = Argv(0);
iRemote = iRemote.toLowerCase();
var iLocal = Argv(1);
iLocal = iLocal.toLowerCase()+ "\\" + iRemote.substring(iRemote.lastIndexOf("/") + 1);
var xPost = new ActiveXObject("WinHttp.WinHttpRequest.5.1");
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



### 设置必应壁纸
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
for (i = 0; i < Argv.Length; i++) {
    info("参数：" + Argv(i));
}

var fso = new ActiveXObject("Scripting.FileSystemObject");
// 当前文件所在目录
var currentDirectory = fso.GetFile(WScript.ScriptFullName).ParentFolder.Path;
// 当前文件路径
var thisPath = fso.GetFile(WScript.ScriptFullName).path;

if (Argv(0) == "1") {
    // 设置开机启动
    var shell = new ActiveXObject("WScript.shell");
    // HKEY_CURRENT_USER
    shell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\BajinsWallpaper", thisPath);
} else if (Argv(0) == "?" || Argv(0) == "help") {
    help();
    // 正常退出
    WScript.Quit(0);
}

var json = request("GET", "https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1", "json");

var imageUrl = "https://cn.bing.com" + json.images[0].url.split("&")[0];
var imageDir = currentDirectory + "\\images";
var imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
imageName = imageName.split("=")[1];

var imagePath = download(imageUrl, imageDir, imageName);


imagePath = imageTransform(imagePath, "bmp");
if (imagePath == "") {
    info("图片格式转为BMP失败");
    WScript.Quit(0);
}

if (imagePath != "") {
    setWallpaper(imagePath);

    info("设置壁纸成功！");
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
    info("   下载: BajinsWallpaper autoRun");
    info("     autoRun 是否开启开机自动运行：默认0不开启,1开启");
}


/**
 * HTTP请求
 *
 * @param method        GET,POST
 * @param url           请求地址
 * @param dataType      "",text,stream,xml,json
 * @param data          数据，{key:value}格式
 * @param contentType   发送的数据类型：默认application/x-www-form-urlencoded、multipart/form-data、text/plain
 * @returns {string|Document|any}
 */
function request(method, url, dataType, data, contentType) {
    // 把字符串转换为大写
    method = method == null ? "GET" : method.toUpperCase();
    // 把字符串转换为小写
    dataType = dataType.toLowerCase();
    contentType = contentType == null ? "application/x-www-form-unlenconded;charset=utf-8" : contentType;

    if (url == "" || url == null || url.length <= 0) {
        throw new Error("请求url不能为空！");
    }

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
    if (directory == "" || directory == null || directory.length <= 0) {
        throw new Error("文件存储目录不能为空！");
    }

    var objFSO = new ActiveXObject("Scripting.FileSystemObject");
    // 如果目录不存在
    if (!objFSO.FolderExists(directory)) {
        // 创建目录
        var strFolderName = objFSO.CreateFolder(directory);
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
    if (!objFSO.FileExists(path)) {
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
    var objFSO = new ActiveXObject("Scripting.FileSystemObject");
    // 如果文件不存在,就说明没有转换成功
    if (!objFSO.FileExists(imagePath)) {
        throw new Error("图片不存在或路径错误！");
    }
    // 转换后格式文件全路径
    var formatPath = imagePath.replace(/(.+)\.[^\.]+$/, "$1") + "." + format;
    // 如果转换后文件已存在
    if (objFSO.FileExists(formatPath)) {
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
    if (!objFSO.FileExists(formatPath)) {
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
    shell.RegWrite("HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced\\ListviewShadow", "1", "REG_DWORD");

    // 如果桌面图标未透明，需要刷新组策略
    shell.Run("gpupdate /force", 0);
    // 实时刷新桌面
    shell.Run("RunDll32.exe USER32.DLL,UpdatePerUserSystemParameters");
}
```

## VisualBasicScript



### 输入内容到记事本
```visual-basic
' 进行变量声明
Dim Wshshell,Msg

' InputBox 弹窗输入
' inputbox(“”,”“,”“) 有三个参数，第一个参数提醒用，第二个参数提示用，第三个参数为默认框
Msg=InputBox("请输入要发送的语句.", "语句")

' Msgbox() 输出了你输入进来的东西
Msgbox(Msg)
' Wscript.Echo() 同Msgbox()
Wscript.Echo(Msg)

' 设置对脚本宿主对象引用赋给变量
Set Wshshell = Wscript.CreateObject("Wscript.Shell")

' 运行命令参数 （这里打开系统自带的记事本程序）
Wshshell.run "notepad"

' 暂停 200 毫秒
Wscript.Sleep 200

' 激活具有指定标题的窗口（确保要激活指定标题的窗体已经运行）
Wshshell.AppActivate "无标题-记事本"

' SendKeys 键击 参数说明
' 如 Enter 回车建 表示 {Enter} 、 字母 A 表示 {A} 、 数字 2 表示 {2} 等
' 示例 Wshshell.SendKeys "{Enter}" Wshshell.SendKeys "{A}"    Wshshell.SendKeys "{2}"
' 组合键 Shift 用 + 代替 、 Ctrl 用 ^ 代替 、Alt 用 % 代替
' 示例 Wshshell.SendKeys "+%{DELETE}"  Wshshell.SendKeys "^{C}"   Wshshell.SendKeys "^{V}"
' 模拟按键 （键入变量 Msg 的内容）
Wshshell.SendKeys Msg

' 模拟快捷键 Ctrl + S （保存内容）
Wshshell.SendKeys "^{s}"

' 退出执行
WScript.Quit
```


### 隐藏运行
```visual-basic
'在运行窗口输入shell:startup点击确定后打开一个文件夹，把此文件放在文件夹中

'运行命令
runCommand = "D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini"

'调用运行函数
call run(runCommand)

'WScript.Echo OSver()
'MsgBox(OSver())

'运行，传参为运行命令
Function run(runCommand)
    dim ws
	'Windows10之前的系统创建一个脚本命令窗口
    Set ws = CreateObject("Wscript.Shell")

    dim wsh
	'Windows10创建一个脚本命令窗口
    Set wsh=WScript.CreateObject("WScript.Shell")
	
	'拼接Windows10之前的系统运行命令
    runWs= "cmd /c " & runCommand
	
	'Windows10运行命令
    runWsh= runCommand
    
    '获取系统信息
    'infoItem = showOsInfo()
    infoItem = OSver()
    
    select case infoItem
        case "Windows Server 2003"
            ws.run runWs,vbhide
        
        case "Windows 2000"
            ws.run runWs,vbhide
        
        case "Windows XP"
            ws.run runWs,vbhide
        
        case "windows visita"
            ws.run runWs,vbhide
        
        case "windows 7"
            ws.run runWs,vbhide
            
        case "windows 10"
            wsh.Run runWsh,0
        
        case else
            wscript.echo infoItem
            wscript.quit
    end select
End Function

'系统版本与系统位数拼接
Function showOsInfo()
    'wscript.echo OSver() & X86orX64()
    showOsInfo = OSver() & X86orX64()
End Function

'获取当前系统位数
Function X86orX64()
    Set objWMIService = GetObject("winmgmts:!\\.\root\cimv2")
    Set colItems = objWMIService.ExecQuery("Select * from Win32_ComputerSystem")
    For Each objItem in colItems
        strOSsystype=objitem.SystemType
    Next
    set objWMIService = nothing
    set colItems = nothing
    If InStr( strOSsystype, "86") <> 0 Then
        X86orX64 = "_x86"
    elseif InStr(strOSsystype, "64") <> 0 Then
        X86orX64 = "_x64"
    else
        wscript.echo "不知道32位还是64位的"
        wscript.quit
    end if
End Function

'获取当前系统版本
Function OSver()
    Set objWMIService = GetObject("winmgmts:!\\.\root\cimv2")
    Set colItems = objWMIService.ExecQuery("Select * from Win32_OperatingSystem")
    For Each objItem in colItems
        strOScaption=objitem.Caption
        strOSversion=objitem.Version
    Next
    set objWMIService = nothing
    set colItems = nothing
    '截取strOSversion为最后一个"."的左面部分
    strOSversion=left(strOSversion,InStrRev(strOSversion,".",-1,1) - 1)
    select case strOSversion
        case "5.2" '"5.2.3790"
            OSver = "Windows Server 2003"
        case "5.0" '"5.0.2195"
            OSver = "Windows 2000"
        case "5.1" '"5.1.2600"
            OSver = "Windows XP"
        case "6.0" '"6.0.6001"
            OSver = "windows visita"
        case "6.1" '"6.1.7601"
            OSver = "windows 7"
        case "10.0"
            OSver = "windows 10"
        case else
            OSver = strOSversion
            'wscript.quit
    end select
End Function
```