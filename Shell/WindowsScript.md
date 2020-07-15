# WindowsScript


[[toc]]




## flag

* [Scripting](https://docs.microsoft.com/zh-cn/previous-versions/ms950396(v=msdn.10))
* [Windows脚本和Windows Script Host的属性和方法及子对象](https://docs.microsoft.com/zh-cn/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/bstcxhf7(v=vs.84)#in-this-section)
* [https://github.com/mrpapercut/wscript](https://github.com/mrpapercut/wscript)

+ [Visual Basic for Applications (VBA) 语言参考](https://docs.microsoft.com/zh-cn/office/vba/api/overview/language-reference)
+ [VBA学习笔记](https://www.zhihu.com/people/xia-xi-lan/posts)
+ [xcel之VBA简单宏编程](https://blog.csdn.net/wordsin/article/details/80575615)
+ 批处理之家 [http://www.bathome.net](http://www.bathome.net)
+ 中国DOS联盟 [DOS批处理 & 脚本技术（批处理室）](http://cndos.fam.cx/forum/forumdisplay.php?fid=23)

- `JScript`、`VBScript`同属于官方支持的`Windows Script`，这俩脚本都需要依赖于特定的宿主(`Host`)才能执行，
`JavaScript`浏览器环境之外，还可以运行在`Windows Script Host`中。
- `Windows Script Host`是一个`language-independent`的脚本宿主环境，主要用于执行`Windows`管理任务
- Windows脚本宿主有两个版本：
    - 一个基于Windows的版本（[WScript.exe](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/wscript)）
    ，它提供用于设置脚本属性的属性表；运行以`vbs`为后缀的文件
    - 一个基于命令提示符的版本（[CScript.exe](https://docs.microsoft.com/zh-cn/windows-server/administration/windows-commands/cscript)
    直接执行可查看帮助），它提供命令行。用于设置脚本属性的开关。
        - `//E:engine` 使用执行脚本的引擎有：`VBScript`和`JScript`



## `WScript`对象

> 所有的`Wscript`对象都存放在`WSHOM.ocx`文件中

* [Windows Script Host APIS](https://github.com/microsoft/TypeScript/blob/master/lib/lib.scripthost.d.ts)


### `WScript`对象的属性

| 属性           	| 返回值类型       	| 说明                                                             	|
|----------------	|------------------	|------------------------------------------------------------------	|
| Application    	| Object           	| 返回 IHost_Class 对象（Wscript 对象）。                          	|
| Arguments      	| IArguments_Class 	| 返回 WshArguments 对象（参数集）。                               	|
| BuildVersion   	| Long             	| 返回 Windows 脚本宿主的内部版本。                                	|
| FullName       	| String           	| 返回宿主可执行文件（CScript.exe 或 WScript.exe）的全路径。       	|
| Interactive    	| Boolean          	| 设置或确定脚本模式。                                             	|
| Name           	| String           	| WScript 对象（宿主可执行文件）的名称。                           	|
| Path           	| String           	| 返回包含宿主可执行文件（CScript.exe 或 WScript.exe）的路径名称。 	|
| ScriptFullName 	| String           	| 返回当前运行脚本的完整路径。                                     	|
| ScriptName     	| String           	| 返回当前运行脚本的文件名。                                       	|
| StdIn          	| TextStream       	| 显示当前脚本的输入流。                                           	|
| StdErr         	| TextStream       	| 显示当前脚本的错误输出流。`Write`输出，`WriteLine`换行输出          	|
| StdOut         	| TextStream       	| 显示当前脚本的输出流。`Write`输出，`WriteLine`换行输出              	|
| Timeout        	| Long             	| 超时设定秒：允许脚本运行的最长时间。                             	|
| Version        	| String           	| 返回 Windows 脚本宿主的版本。                                    	|


### `WScript`对象的方法

| 方法             	| 参数                                                         	| 返回值 	| 说明                                             	|
|------------------	|--------------------------------------------------------------	|--------	|--------------------------------------------------	|
| ConnectObject    	| (Object As Object, Prefix As String)                         	| 无     	| 将对象的事件源连接到具有给定前缀的函数。         	|
| CreateObject     	| (ProgID As String, [Prefix As String])                       	| Object 	| 创建对象。                                       	|
| DisconnectObject 	| (Object As Object)                                           	| 无     	| 断开已连接对象的事件源的连接。                   	|
| Echo             	| (ParamArray pArgs() As Variant)                              	| 无     	| 将文本输出到消息框中或命令控制台窗口。           	|
| GetObject        	| (Pathname As String, [ProgID As String], [Prefix As String]) 	| Object 	| 检索现有的对象或从文件中创建新对象。             	|
| Quit             	| ([ExitCode As Long])                                         	| 无     	| 强制脚本停止执行。                               	|
| Sleep            	| (Time As Long)                                               	| 无     	| 在指定的时间长度内将脚本执行挂起，然后继续执行。 	|




## 常用组件对象

> 所有对象都可通过`Power Shell`命令查看属性和方法`New-Object -ComObject "对象名称" | Get-Member`，
> 获取本机所有`COM`组件对象脚本 [Get-COM-Objects.bat](/files/Get-COM-Objects.bat)

> 都在注册表`HKEY_CLASSES_ROOT`注册表项中，正常情况下项中带有`CLSID`键的是脚本可创建的

| 对象                         	| 说明                                 	|
|------------------------------	|--------------------------------------	|
| WScript.Shell                	| 脚本外壳                             	|
| Wscript.NetWork              	| 提供网络连接和远程打印机管理的函数。 	|
| AspSmartUpload.SmartUpload   	|                                      	|
| CDO.Configuration            	|                                      	|
| CDONTS.NewMail               	| 邮件发送的组件                       	|
| Huang.UploadFile             	|                                      	|
| InternetExplorer.application 	|                                      	|
| JMail.message                	| 邮件发送的组件                       	|
| MSWC.AdRotator               	|                                      	|
| MSWC.BrowserType             	|                                      	|
| MSWC.NextLink                	|                                      	|
| Shell.Application            	| Windows外壳                          	|
| SQLOLE.SQLServer             	|                                      	|
| WSHController                	|                                      	|
| System.IO.StringWriter        |                                       |
| Registry                      | 注册表                                 |


| ADODB对象        	| 说明                                             	|
|------------------	|--------------------------------------------------	|
| ADODB.Command    	|                                                  	|
| ADODB.Connection 	| 提供数据库连接对象                               	|
| ADODB.Error      	|                                                  	|
| ADODB.Parameter  	|                                                  	|
| ADODB.Record     	|                                                  	|
| ADODB.Recordset  	| 提供数据库返回结果集对象                         	|
| ADODB.Stream     	|                                                  	|
| ADOMD.Catalog    	|                                                  	|
| ADOMD.Cellset    	|                                                  	|
| ADOX.Catalog     	| 包含描述数据源模式目录的集合                     	|
| ADOX.Column      	| 表示表、索引或关键字的列                         	|
| ADOX.Group       	| 表示在安全数据库内有访问权限的组帐号             	|
| ADOX.Index       	| 表示数据库表中的索引                             	|
| ADOX.Key         	| 表示数据库表中的主关键字、外部关键字或唯一关键字 	|
| ADOX.Procedure   	| 表示存储的过程                                   	|
| ADOX.Table       	| 表示数据库表，包括列、索引和关键字               	|
| ADOX.User        	| 表示在安全数据库内具有访问权限的用户帐号         	|
| ADOX.View        	| 表示记录或虚拟表的过滤集                         	|


| office对象             	| 说明              	|
|------------------------	|-------------------	|
| Word.Application       	| office            	|
| Word.Document          	|                   	|
| Excel.Application      	| 提供EXCEL操作对象 	|
| Excel.Chart            	|                   	|
| Excel.Sheet            	|                   	|
| Outlook.Application    	| office            	|
| PowerPoint.Application 	| office            	|
| MSGraph.Application    	| office            	|


| WIA对象          	| 说明                       	|
|------------------	|----------------------------	|
| WIA.ImageFile    	| 图像处理组件：加载图片     	|
| WIA.ImageProcess 	| 图像处理组件：转换图片格式 	|
| WIA.Rational     	|                            	|
| WIA.Vector       	|                            	|


> 所有`Scripting`对象都存放在`SCRRUN.DLL`文件中

| Scripting对象              	| 说明                                                            	|
|----------------------------	|-----------------------------------------------------------------	|
| Scripting.Dictionary       	| 用来返回存放键值对的字典对象，读取DOS环境变量，读取链接中的设置 	|
| Scripting.Encoder          	| 编码                                                            	|
| Scripting.FileSystemObject 	| 提供一整套文件系统操作函数                                      	|
| Scripting.Signer           	| 签名                                                            	|



| Collections对象                   | 说明                                                                   	|
|-------------------------------	|------------------------------------------------------------------------	|
| System.Collections.ArrayList  	| 包含动态数组的添加元素、删除元素、遍历、统计元素个数、清空             	|
| System.Collections.Hashtable  	|                                                                        	|
| System.Collections.Queue      	| 包含队列的添加元素（入队）、删除元素（出队）、遍历、统计元素个数、清空 	|
| System.Collections.SortedList 	|                                                                        	|
| System.Collections.Stack      	| 包含堆栈的添加元素（压栈）、删除元素（出栈）、遍历、统计元素个数、清空 	|



## HTTP

> 微软提供了二套API：`WinINet`, `WinHTTP`（分别封装于`system32`目录下的`wininet.dll`和`winhttp.dll`内）
> 二者主要区别在于后者更为安全和稳定，可以说`WinHTTP`是`WinINet`的升级版

> `XMLHttpRequest`是基于`WinInet`封装的，而`WinHttpRequest`和`ServerXMLHTTPRequest`则是基于`WinHTTP`封装的
> 稳定性属`XMLHttpRequest`为最差,封装成`COM`形式主要是为了方便`js`、`vbs`等脚本的调用

> `XMLRequest`成员参考缺点：和浏览器挂钩，大多情况下会共享`cookies`、`session`、不支持单独设置代理。
> 优点：和浏览器挂钩，大多情况下会共享`cookies`、`session`
  
> `ServerXMLHTTP`成员参考缺点：系统没有对应`dll`的情况下程序需要外挂一个`dll`文件。优点：脱离浏览器，使用代理方便
  
> `WinHttpRequest`成员参考缺点：暂无。优点：脱离浏览器，使用代理方便，
> `WinHttp.WinHttpRequest.5.1`是`msxml4.0`的底层对象，也就是说`XMLHTTP`、`ServerXMLHTTP`也是在它的基础上封装而来


* [WinHttpRequest对象](https://docs.microsoft.com/zh-cn/windows/win32/winhttp/winhttprequest)
* [DOM参考](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/ms764730%28v%3dvs.85%29)


## 图像处理

> `WIA`全称：`WindowsImageAcquisition`，自动化层是一个功能齐全的图像处理组件，可提供端到端的图像处理功能。
> `WIA`自动化层可以轻松地从数码相机，扫描仪或网络摄像头获取图像，以及旋转，缩放和注释图像文件。
> `WIA Automation Layer`取代了`Windows Image Acquisition（WIA）1.0`提供的`WIA`脚本模型。

> `New-Object -ComObject "WIA.ImageFile" | Get-Member`

> `New-Object -ComObject "WIA.ImageProcess" | Get-Member`

* [Windows图像采集（WIA）](https://docs.microsoft.com/zh-cn/windows/win32/wia/-wia-startpage)
* [使用](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/wiaaut/-wiaaut-howto-use-filters)
* [常量](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/wiaaut/-wiaaut-vbscript-constants)
* [Windows Image Acquisition](https://blog.csdn.net/AMinfo/article/details/8100436)
* [WIA图片处理](https://blog.csdn.net/AMinfo/article/details/8100460)



## 操作文件

> `Scripting.FileSystemObject`对象提供的功能：`New-Object -ComObject "Scripting.FileSystemObject" | Get-Member`

* [FileSystemObject简介](https://docs.microsoft.com/zh-cn/previous-versions/windows/internet-explorer/ie-developer/windows-scripting/d6dw7aeh(v=vs.84))
* [FileSystemObject 对象](https://docs.microsoft.com/zh-cn/office/vba/language/reference/user-interface-help/filesystemobject-object)
* [FileSystemObject操作文件](https://blog.csdn.net/pl1612127/article/details/77862174)


**对象和集合**

| 对象/集合  	| 描述                                                  	|
|------------	|-------------------------------------------------------	|
| Drive      	| 包含储存设备的信息，包括硬盘、光驱、ram盘、网络驱动器 	|
| Drives     	| 提供一个物理和逻辑驱动器的列表                        	|
| File       	| 检查和处理文件                                        	|
| Files      	| 提供包含在文件夹内的所有文件的列表                    	|
| Folder     	| 检查和处理文件夹                                      	|
| Folders    	| 提供在 Folder 内的所有文件夹的列表                    	|
| TextStream 	| 对象。用来读写文本文件。                              	|

> 注意:`TextStream`对文件只可以从上往下读取，指针无法任意定位，也无法往回走。

- `fso.OpenTextFile(path,[mode,create,encoding])`
    - `mode` 模式,缺省为只读方式打开
        - `ForReading=1` 以只读方式打开
        - `ForWriting=2` 以读写方式打开
        - `ForAppending=8` 以附加方式打开
    -  `create` 不存在时是否创建缺省为否,即不创建文件
    - `encoding` 何种方式打开,缺省以`ASCII`方式
        - `TristateUseDefault=-2` 以系统默认方式打开
        - `TristateTrue=-1` 以`Unicode`方式打开
        - `TristateFalse=0` 以`ASCII`方式打开
- `fso.CreateTextFile(path,[overrwite,unicode])`
    - `overrwite` 是否覆盖,缺省为是
    - `unicode` 是否以`Unicode`方式创建,缺省为`false`,即以`ASCII`方式创建




## Shell

* [https://docs.microsoft.com/zh-cn/windows/win32/shell/shell-entry](https://docs.microsoft.com/zh-cn/windows/win32/shell/shell-entry)
* [https://docs.microsoft.com/zh-cn/windows/win32/shell/shell](https://docs.microsoft.com/zh-cn/windows/win32/shell/shell)
* [Wscript.Shell 对象详细介绍](https://www.jb51.net/article/5683_all.htm)
* [WshShell 对象](https://www.jb51.net/shouce/script56/script56_chs/html/wsobjwshshell.htm)

+ `Wscript.Shell`对象提供的功能：`New-Object -ComObject "Wscript.Shell" | Get-Member`
+ `Shell.Application`对象提供的功能：`New-Object -ComObject "Shell.Application" | Get-Member`

- `Run` `Exec` 执行`cmd`命令
- `CreateShortcut` 创建快捷方式
- `SpecialFolders` 访问`Windows`的`shell`文件夹
- `Environment` 操作环境变量
- `RegRead` 从注册表中返回指定的键或值
- `RegWrite` 在注册表中设置指定的键或值
- `RegDelete` 从注册表中删除指定的键或值
- `SendKeys` 模拟按键
- `Popup` 显示包含指定消息的消息弹出窗口
- `ExpandEnvironmentStrings` 返回环境变量的扩展值
    - `ExpandEnvironmentStrings("%USERNAME%")` 获取用户名
    - `ExpandEnvironmentStrings("%ComputerName%")` 获取计算机名

| 变量名                     | 说明                                       |
|-------------------------|------------------------------------------|
| NUMBER_OF_PROCESSORS    | 计算机上运行的处理器数目。                            |
| PROCESSOR_ARCHITECTURE  | 用户工作站使用的处理器类型。                           |
| PROCESSOR_IDENTIFIER    | 用户工作站的处理器 ID。                            |
| PROCESSOR_LEVEL         | 用户工作站的处理器级。                              |
| PROCESSOR_REVISION      | 用户工作站的处理器版本。                             |
| OS                      | 用户工作站所用的操作系统。                            |
| COMSPEC                 | 用于运行“命令提示”窗口的命令（通常为 cmd.exe）。            |
| HOMEDRIVE               | 本地主驱动器（通常为 C 驱动器）。                       |
| HOMEPATH                | 用户的默认路径（在 Windows NT 上通常为 usersdefault）。 |
| PATH                    | 路径环境变量。                                  |
| PATHEXT                 | 可执行文件的扩展名（通常为 .com、 .exe、.bat 或 .cmd）。   |
| PROMPT                  | 命令提示符（通常为 ＄P＄G）。                         |
| SYSTEMDRIVE             | 系统所在的本地驱动器（例如，c:）。                       |
| SYSTEMROOT              | 系统目录（例如，c:winnt）。和 WINDIR 相同。            |
| WINDIR                  | 系统目录（例如 c:winnt）。和 SYSTEMROOT 相同。        |
| TEMP                    | 存储临时文件的目录（例如，c:temp）。用户可更改。              |
| TMP                     | 存储临时文件的目录（例如，c:temp）。用户可更改。              |



### 执行命令

**`Run`**

> 执行命令完成后返回值是一个整数，就是`0`成功或`1`失败两个状态。

> `int Run(string, Variant, Variant)`第二个是`cmd`窗口的风格，第三个是否等待执行完成。

| 窗口风格 | 说明                                                            |
|------|---------------------------------------------------------------|
| 0    | 隐藏一个窗口并激活另一个窗口。                                               |
| 1    | 如果窗口处于最小化或最大化状态，则系统将其还原到原始大小和位置。第一次显示该窗口时，应用程序应指定此标志。 |
| 2    | 激活窗口并将其显示为最小化窗口。                                              |
| 3    | 激活窗口并将其显示为最大化窗口。                                              |
| 4    | 按最近的窗口大小和位置显示窗口。活动窗口保持活动状态。                                   |
| 5    | 激活窗口并按当前的大小和位置显示它。                                            |
| 6    | 最小化指定的窗口，并按照Z顺序激活下一个顶部窗口。                                     |
| 7    | 将窗口显示为最小化窗口。活动窗口保持活动状态。                                       |
| 8    | 将窗口显示为当前状态。活动窗口保持活动状态。                                        |
| 9    | 如果窗口处于最小化或最大化状态，则系统将其还原到原始大小和位置。还原最小化窗口时，应用程序应指定此标志。  |
| 10   | 根据启动应用程序的程序状态来设置显示状态                                          |


**`Exec`**

> 返回值是一个对象，从返回对象中可以获得控制台输出信息和控制台错误信息，即`StdOut` 和 `StdErr` 属性等。

> `Exec`类具有属性`ExitCode`、`ProcessID`、`Status`、`StdErr`、`StdIn`、`StdOut`以及一个函数`Terminate`
>> `Status`属性具有三个值：0为正在执行，1为完成，2为失败
>>
>> 获取输出信息：`StdOut.ReadAll()`


### 特殊文件夹

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


### 模拟按键

* [https://docs.microsoft.com/zh-cn/windows/win32/inputdev/user-input](https://docs.microsoft.com/zh-cn/windows/win32/inputdev/user-input)

- `SendKeys`键击参数说明
    - `Enter`回车建表示`{Enter}`、字母`A`表示`{A}`、数字`2`表示`{2}`等
        - 示例`Wshshell.SendKeys("{Enter}")`、`Wshshell.SendKeys("{A}")`、`Wshshell.SendKeys("{2}")`
    - 组合键`Shift`用`+`代替、`Ctrl`用`^`代替、`Alt`用`%`代替
        - 示例`Wshshell.SendKeys("+%{DELETE}")`、`Wshshell.SendKeys("^{C}")`、`Wshshell.SendKeys("^{V}")`
    - 模拟快捷键`Ctrl + S`保存内容：`Wshshell.SendKeys("^{s}")`
    - 使用`+{f10}`可以z有限制地方调用，如调用桌面菜单`{f5}+{f10}`



## WMI和MI

> Windows Management Instrumentation（WMI）的新版本是 Windows Management Infrastructure (MI)

> `SWBEM`脚本是可以用来访问和控制WMI内部对象的一系列可用在脚本中的对象，
> 脚本通过访问`wbemdisp.dll`这个`library`来访问`VMI`对象，这个仅被设计用来为脚本工作。

> 查询方式类似sql语句（其实系统信息也是存储在计算中一个类似数据库的文件中）获取我们需要的对象的记录集

* [WMI参考](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/wmi-reference)
* [Windows Management Instrumentation（WMI）](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/wmi-start-page)

- [为什么要使用Windows Management Infrastructure (MI)](https://docs.microsoft.com/zh-cn/previous-versions/windows/desktop/wmi_v2/why-use-mi-)

* [WbemScripting脚本API对象](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/scripting-api-objects)
* [系统注册表提供者](https://docs.microsoft.com/en-us/previous-versions/windows/desktop/regprov/system-registry-provider)
* [Win32 Provider-可以看到表对应的字段有哪些](https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-provider)

|           表名                    | 说明         |
|-----------------------------------|------------|
| Win32_BaseBoard                   | 主板         |
| Win32_BIOS                        | BIOS芯片     |
| Win32_BootConfiguration           | 系统启动配置     |
| Win32_CDROMDrive                  | 光盘驱动器      |
| Win32_ComputerSystem              | 操作系统信息，系统位数|
| Win32_DesktopMonitor              | 显示器        |
| Win32_DiskDrive                   | 硬盘驱动器      |
| Win32_DiskPartition               | 磁盘分区       |
| Win32_Group                       | 系统管理组      |
| Win32_GroupUser                   | 系统组帐号      |
| Win32_Keyboard                    | 键盘         |
| Win32_LogicalDisk                 | 逻辑磁盘       |
| Win32_LogicalMemoryConfiguration  | 逻辑内存配置     |
| Win32_NetworkAdapter              | 网络适配器      |
| Win32_NetworkAdapterConfiguration | 网络适配器设置    |
| Win32_NetworkClient               | 已安装的网络客户端  |
| Win32_NetworkProtocol             | 已安装的网络协议   |
| Win32_OperatingSystem             | 操作系统信息，系统版本|
| Win32_PageFile                    | 系统页文件信息    |
| Win32_PageFileSetting             | 页文件设置      |
| Win32_ParallelPort                | 并口         |
| Win32_PhysicalMemory              | 物理内存       |
| Win32_PointingDevice              | 点输入设备，如鼠标  |
| Win32_POTSModem                   | MODEM      |
| Win32_POTSModemToSerialPort       | MODEM端口    |
| Win32_Printer                     | 打印机        |
| Win32_PrinterConfiguration        | 打印机设置      |
| Win32_PrintJob                    | 打印机任务      |
| Win32_Process                     | 系统进程       |
| Win32_Processor                   | CPU处理器     |
| Win32_SerialPort                  | 串口         |
| Win32_Service                     | 系统安装的服务    |
| Win32_Share                       | 共享         |
| Win32_SoundDevice                 | 多媒体设置      |
| Win32_StartupCommand              | 系统自动启动程序   |
| Win32_SystemDriver                | 驱动程序       |
| Win32_TCPIPPrinterPort            | 打印机端口      |
| Win32_Thread                      | 系统线程       |
| Win32_TimeZone                    | 时区         |
| Win32_USBController               | USB控制器     |
| Win32_UserAccount                 | 用户帐号       |
| Win32_VideoController             | 显卡细节。      |
| Win32_VideoSettings               | 显卡支持的显示模式。 |
| Win32_ScheduledJob                | 创建一个作业AT命令（不是任务计划） |
| Win32_NetworkLoginProfile         | 一个特定的用户运行Windows的计算机系统上的网络登录信息。 |
| MSFT_NetAdapter                   | 逻辑网络适配器 |
| Win32_NetworkConnection           | 一个基于Windows的环境中活动的网络连接 |


**创建SWbemServices对象方式**

* [SWbemServices object](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/swbemservices)

```visual-basic
Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(".", "root\cimv2")

' 隐式使用本地计算机(.) 和默认名称空间("root\cimv2")
Set objWMIService = GetObject("winmgmts:")

Set objinst = GetObject("WinMgmts:Win32_LogicalDisk")

Set objWMIService = GetObject("winmgmts:root\cimv2")

Set objWMIService = GetObject("winmgmts://./root/cimv2")

Set objWMIService = GetObject("winmgmts:\\.\root\cimv2")

Set objWMIService = GetObject("winmgmts:{impersonationlevel=impersonate}!\\.\root\cimv2")

' wmi与cimv2不同
Set objWMIService = GetObject("winmgmts:\\.\root\wmi")
```

```js
// JScript.
var LoginProfiles = GetObject("winmgmts:").InstancesOf ("Win32_NetworkLoginProfile");
for(e = new Enumerator(LoginProfiles) ; !e.atEnd() ; e.moveNext()) {
   var Profile = e.item();
   WScript.Echo(Profile.Name);
   WScript.Echo(Profile.LastLogon);
}
```



## VBScript

* [VBScript](https://docs.microsoft.com/zh-cn/previous-versions//t0aew7h6(v=vs.85))
* [Visual Basic 指南](https://docs.microsoft.com/zh-cn/dotnet/visual-basic)
* [VBScript语言参考](https://docs.microsoft.com/zh-cn/previous-versions//d1wf56tt%28v%3dvs.85%29)
* [VBScript基础知识](https://docs.microsoft.com/zh-cn/previous-versions//0ad0dkea%28v%3dvs.85%29)
* [VBScript 语言](https://www.tcoline.com/resource/vbs/top_vbs_0.htm)
* [VBScript 教程](https://code.ziqiangxuetang.com/vbscript/vbscript-tutorial.html)
* [VBScript 函数](https://www.w3school.com.cn/vbscript/vbscript_ref_functions.asp)
* [https://github.com/MishaVernik/WScirpt](https://github.com/MishaVernik/WScirpt)


### vbs特殊符号

* [String Constants](https://docs.microsoft.com/zh-cn/previous-versions//hh277t8e%28v%3dvs.85%29)


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

* [https://github.com/eklam/VbsJson](https://github.com/eklam/VbsJson)

**数组转换为字符串**

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


**获取对象的属性和值**

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

**获取系统信息**

> 此方式完全不会显示`CMD`窗口（包括闪现）

```visual-basic
' 获取系统位数
'Writer         Bajins
'Create Date    2019-10-22
'Example        GetSystemBit()
Public Function GetSystemBit()
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


**隐藏窗口运行**

```visual-basic
' 创建运行命令数组
commands = Array("D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini")

' 创建运行命令动态数组
'Set commands = CreateObject("System.Collections.ArrayList")
'commands.Add "D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini"

' 启动项键名称
keyName = "frp"

Set shell = WScript.CreateObject("WScript.Shell")

For Each command In commands
    ' cmd /c运行之后关闭窗口，0隐藏运行，false不同步运行
    shell.Run "cmd /c " & command, 0, false
Next

' 注册表项
item = "HKCU\Software\Microsoft\Windows\CurrentVersion\Run\"

' 设置开机启动
shell.RegWrite item & keyName, WScript.ScriptFullName
```

**查看进程是否存在**

```visual-basic
ProcesseName="rclone.exe"

' 查找进程
Set WMIService = GetObject("winmgmts:{impersonationlevel=impersonate}!\\.\root\cimv2")
Set Processes = WMIService.ExecQuery("select * from win32_process where name='" & ProcesseName & "'")

For Each Process In Processes
    ' 比较两个字符串
    If InStr(UCase(Process.name), UCase(ProcesseName)) = 0 Then
        ' 如果进程存在就不重复执行后面的代码
        Exit for
    End If
    ' 运行程序
    Set WS = Wscript.CreateObject("Wscript.Shell")
    WS.Run "rclone mount GDrive:/ x: --cache-dir F:\Temp --vfs-cache-mode writes", 0
Next
```



**Ping**

```visual-basic
Function Ping(strHostName) 
  Dim colPingResults, objPingResult, strQuery 
  ' 定义WMI查询
  strQuery = "SELECT * FROM Win32_PingStatus WHERE Address = '" & strHostName & "'" 
  ' 运行WMI查询
  ' GetObject("winmgmts://./root/cimv2")
  Set colPingResults = GetObject("winmgmts:root\cimv2").ExecQuery(strQuery) 
  ' 将查询结果转换为True或False
  For Each objPingResult In colPingResults 
    If Not IsObject(objPingResult) Then 
      Ping = False 
    Else 
      If objPingResult.StatusCode = 0 Then 
        Ping = True 
      Else 
        Ping = False 
      End If 
      'WScript.Echo "Ping status code for " & strHostName & ": " & objPingResult.StatusCode 
    End If 
  Next 
  Set colPingResults = Nothing 
End Function
```


**监视网络连接**

```visual-basic
Set objWMIService = GetObject("winmgmts:\\.\root\wmi")
' 执行事件订阅查询以接收事件。事件订阅查询定义了要监视的托管环境的更改。发生更改时，WMI基础结构会将事件描述为调用脚本。
Set colMonitoredEvents = objWMIService.ExecNotificationQuery("Select * from MSNdis_StatusMediaConnect") 
Do While True 
    Set strLatestEvent = colMonitoredEvents.NextEvent 
    Wscript.Echo "已建立网络连接："
    WScript.Echo strLatestEvent.InstanceName, Now
    Wscript.Echo 
Loop
```

**监视网络断开**

```visual-basic
Set objWMIService = GetObject("winmgmts:\\.\root\wmi")
' 执行事件订阅查询以接收事件。事件订阅查询定义了要监视的托管环境的更改。发生更改时，WMI基础结构会将事件描述为调用脚本。
Set colMonitoredEvents = objWMIService.ExecNotificationQuery("Select * from MSNdis_StatusMediaDisconnect") 
Do While True 
    Set strLatestEvent = colMonitoredEvents.NextEvent 
    Wscript.Echo "网络连接已丢失："
    WScript.Echo strLatestEvent.InstanceName, Now
Loop
```


**设置壁纸**

> 使用API触发图片文件右键菜单上的 `设置为桌面背景(B)`

```visual-basic
Set shApp = CreateObject("Shell.Application")
' 获取文件
Set picFile = CreateObject("Scripting.FileSystemObject").GetFile("C:\Users\bajin\Desktop\CachedImage_1920_1080_POS4.jpg")
' 获取文件上的所有右键菜单项
' Set items = shApp.NameSpace(picFile.ParentFolder.Path).ParseName(picFile.Name).Verbs()
Set items = shApp.NameSpace(picFile.ParentFolder.Path).Items().Item(picFile.Name).Verbs()
' 遍历所有菜单项
' For i=0 To items.Count - 1
' Set item = items.Item(i)
For Each item In items
    ' 注意执行的脚本文件需要为简体中文编码
    If item.Name = "设置为桌面背景(&B)" Then
    ' If strcomp(item.Name,"设置为桌面背景(&B)") = 0 Then
        item.DoIt
    END IF
Next
```


**刷新桌面**

```visual-basic
' 切换到桌面
CreateObject("Shell.Application").ToggleDesktop()
' 刷新桌面
CreateObject("WScript.Shell").SendKeys("{F5}")

Set WSHShell = CreateObject("WScript.Shell")
' 切换到桌面
'WSHShell.AppActivate("Program Manager")
WSHShell.AppActivate(WSHShell.SpecialFolders("Desktop"))
' 刷新桌面
WSHShell.SendKeys("{F5}")

' 下面这两种方式没看出效果
CreateObject("shell.application").Namespace(0).Self.invokeVerb("R&efresh")
CreateObject("shell.application").Namespace(&H10).Self.invokeVerb("Refresh")

' 刷新桌面、任务栏、OSD（相当于重启资源管理器）
Set WSHShell = CreateObject("WScript.Shell")
WSHShell.Run "regsvr32.exe /s /n /i:/UserInstall %SystemRoot%\system32\themeui.dll", 0, True

' 效果不太好，有时刷新成功，有时失败
Set WSHShell = CreateObject("WScript.Shell")
WSHShell.Run "RunDll32 USER32,UpdatePerUserSystemParameters", 0, True

' assoc文件关联时会自动刷新桌面，可能报错
Set WSHShell = CreateObject("WScript.Shell")
WSHShell.Run "assoc .=.", 0, True

' 重启资源管理器并恢复打开的目录，暂时不可用
Function RestartExplorer()
    Dim arrURL()
    n = -1
    Set shApp = CreateObject("Shell.Application")
    ' 遍历所有打开的窗口
    For Each oWin In shApp.Windows
        ' 如果打开的窗口为资源管理器
        If Instr(1, oWin.FullName, "\explorer.exe", vbTextCompare) Then
            n = n + 1
            ReDim Preserve arrURL(n)
            arrURL(n) = oWin.LocationURL
            'oWin.Document.folder.title
            ' 关闭当前打开的文件夹
            'oWin.quit
        End If
    Next
    ' 结束资源管理器进程
    CreateObject("WScript.Shell").Run "taskkill /f /im explorer.exe >nul 2>nul&start explorer.exe", 0, True
    ' 遍历并打开之前的窗口
    For Each strURL In arrURL
        'shApp.Open strURL
        shApp.Explore strURL
    Next
End Function
```