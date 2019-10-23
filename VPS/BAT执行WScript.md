# BAT执行WScript


* [WScript](#wscript)
  * [HTTP](#http)
    * [版本和封装位置](#版本和封装位置)
  * [图像处理](#图像处理)
  * [操作文件](#操作文件)
  * [Shell](#shell)
    * [执行命令](#执行命令)
    * [特殊文件夹](#特殊文件夹)
    * [模拟按键](#模拟按键)
  * [VMI](#vmi)
* [JScript](#jscript)
  * [ActiveXObject](#activexobject)
  * [参数传递](#参数传递)
  * [js函数封装](#js函数封装)
* [VBScript](#vbscript)
  * [vbs特殊符号](#vbs特殊符号)
  * [vbs函数封装](#vbs函数封装)






## WScript

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


> 所有`Scripting`对象都存放在`SCRRUN.DLL`文件中，所有的`Wscript`对象都存放在`WSHOM.ocx`文件中。

> `JScript`、`VBScript`同属于官方支持的`Windows Script`，当年，这俩脚本都需要依赖于特定的宿主(`Host`)才能执行，
> 比如，`JavaScript`浏览器环境之外，还可以运行在`Windows Script Host`中。

- 常用组件对象，都在注册表`HKEY_CLASSES_ROOT`注册表项中，正常情况下项中带有`CLSID`键的是脚本可创建的

| 对象                          	| 说明                                                            	|
|-------------------------------	|-----------------------------------------------------------------	|
| ADODB.Command                 	|                                                                 	|
| ADODB.Connection              	| 提供数据库连接对象                                              	|
| ADODB.Error                   	|                                                                 	|
| ADODB.Parameter               	|                                                                 	|
| ADODB.Record                  	|                                                                 	|
| ADODB.Recordset               	| 提供数据库返回结果集对象                                        	|
| ADODB.Stream                  	|                                                                 	|
| ADOMD.Catalog                 	|                                                                 	|
| ADOMD.Cellset                 	|                                                                 	|
| ADOX.Catalog                  	| 包含描述数据源模式目录的集合                                    	|
| ADOX.Column                   	| 表示表、索引或关键字的列                                        	|
| ADOX.Group                    	| 表示在安全数据库内有访问权限的组帐号                            	|
| ADOX.Index                    	| 表示数据库表中的索引                                            	|
| ADOX.Key                      	| 表示数据库表中的主关键字、外部关键字或唯一关键字                	|
| ADOX.Procedure                	| 表示存储的过程                                                  	|
| ADOX.Table                    	| 表示数据库表，包括列、索引和关键字                              	|
| ADOX.User                     	| 表示在安全数据库内具有访问权限的用户帐号                        	|
| ADOX.View                     	| 表示记录或虚拟表的过滤集                                        	|
| AspSmartUpload.SmartUpload    	|                                                                 	|
| CDO.Configuration             	| 邮件发送的组件                                                  	|
| CDONTS.NewMail                	|                                                                 	|
| Excel.Application             	| 提供EXCEL操作对象                                               	|
| Excel.Chart                   	|                                                                 	|
| Excel.Sheet                   	|                                                                 	|
| Huang.UploadFile              	|                                                                 	|
| InternetExplorer.application  	|                                                                 	|
| JMail.message                 	| 邮件发送的组件                                                  	|
| Microsoft.XMLDOM              	| 提供XML操作对象                                                 	|
| Microsoft.XMLHTTP             	|                                                                 	|
| MSGraph.Application           	| office                                                          	|
| MSWC.AdRotator                	|                                                                 	|
| MSWC.BrowserType              	|                                                                 	|
| MSWC.NextLink                 	|                                                                 	|
| Msxml2.DOMDocument            	|                                                                 	|
| Msxml2.DOMDocument.3.0        	|                                                                 	|
| MSXML2.XMLHTTP                	|                                                                 	|
| Outlook.Application           	| office                                                          	|
| PowerPoint.Application        	| office                                                          	|
| Scripting.Dictionary          	| 用来返回存放键值对的字典对象，读取DOS环境变量，读取链接中的设置 	|
| Scripting.Encoder             	| 编码                                                            	|
| Scripting.FileSystemObject    	| 提供一整套文件系统操作函数                                      	|
| Scripting.Signer              	| 签名                                                            	|
| Shell.Application             	| Windows外壳                                                     	|
| SQLOLE.SQLServer              	|                                                                 	|
| WbemScripting                 	|                                                                 	|
| WbemScripting.SWbemDateTime   	|                                                                 	|
| WbemScripting.SWbemLastError  	|                                                                 	|
| WbemScripting.SWbemLocator    	| `VMI`API对象                                                    	|
| WbemScripting.SWbemObjectPath 	|                                                                 	|
| WbemScripting.SWbemRefresher  	|                                                                 	|
| WebPlatStorage.WebPlatStorage 	|                                                                 	|
| WIA.ImageFile                 	| 图像处理组件：加载图片                                          	|
| WIA.ImageProcess              	| 图像处理组件：转换图片格式                                      	|
| WIA.Rational                  	|                                                                 	|
| WIA.Vector                    	|                                                                 	|
| WinHttp.WinHttpRequest.5.1    	|                                                                 	|
| Word.Application              	| office                                                          	|
| Word.Document                 	|                                                                 	|
| WScript.Arguments             	| 返回集合的WScript对象的参数属性                                 	|
| Wscript.NetWork               	| 提供网络连接和远程打印机管理的函数。                            	|
| WScript.Shell                 	| 脚本外壳                                                        	|
| WSHController                 	|                                                                 	|

- `WScript`对象的属性

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
| StdErr         	| TextStream       	| 显示当前脚本的错误输出流。                                       	|
| StdIn          	| TextStream       	| 显示当前脚本的输入流。                                           	|
| StdOut         	| TextStream       	| 显示当前脚本的输出流。                                           	|
| Timeout        	| Long             	| 超时设定秒：允许脚本运行的最长时间。                             	|
| Version        	| String           	| 返回 Windows 脚本宿主的版本。                                    	|

- `WScript`对象的方法

| 方法             	| 参数                                                         	| 返回值 	| 说明                                             	|
|------------------	|--------------------------------------------------------------	|--------	|--------------------------------------------------	|
| ConnectObject    	| (Object As Object, Prefix As String)                         	| 无     	| 将对象的事件源连接到具有给定前缀的函数。         	|
| CreateObject     	| (ProgID As String, [Prefix As String])                       	| Object 	| 创建对象。                                       	|
| DisconnectObject 	| (Object As Object)                                           	| 无     	| 断开已连接对象的事件源的连接。                   	|
| Echo             	| (ParamArray pArgs() As Variant)                              	| 无     	| 将文本输出到消息框中或命令控制台窗口。           	|
| GetObject        	| (Pathname As String, [ProgID As String], [Prefix As String]) 	| Object 	| 检索现有的对象或从文件中创建新对象。             	|
| Quit             	| ([ExitCode As Long])                                         	| 无     	| 强制脚本停止执行。                               	|
| Sleep            	| (Time As Long)                                               	| 无     	| 在指定的时间长度内将脚本执行挂起，然后继续执行。 	|



### HTTP

> 微软提供了二套API：`WinINet`, `WinHTTP`（分别封装于`system32`目录下的`wininet.dll`和`winhttp.dll`内）
> 二者主要区别在于后者更为安全和稳定，可以说`WinHTTP`是`WinINet`的升级版

> `XMLHttpRequest`是基于`WinInet`封装的，而`WinHttpRequest`和`ServerXMLHTTPRequest`则是基于`WinHTTP`封装的
> 稳定性属`XMLHttpRequest`为最差,封装成`COM`形式主要是为了方便`js`、`vbs`等脚本的调用

> `XMLRequest`成员参考缺点：和浏览器挂钩，大多情况下会共享`cookies`、`session`、不支持单独设置代理。
> 优点：和浏览器挂钩，大多情况下会共享`cookies`、`session`
  
> `ServerXMLHTTP`成员参考缺点：系统没有对应`dll`的情况下程序需要外挂一个`dll`文件。优点：脱离浏览器，使用代理方便
  
> `WinHttpRequest`成员参考缺点：暂无。优点：脱离浏览器，使用代理方便，
> `WinHttp.WinHttpRequest.5.1`是`msxml4.0`的底层对象，也就是说`XMLHTTP`、`ServerXMLHTTP`也是在它的基础上封装而来


* [WinHTTP版本](https://docs.microsoft.com/zh-cn/windows/win32/winhttp/winhttp-versions)

#### 版本和封装位置

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

* [FileSystemObject 对象](https://docs.microsoft.com/zh-cn/office/vba/language/reference/user-interface-help/filesystemobject-object)

* [FileSystemObject操作文件](https://blog.csdn.net/pl1612127/article/details/77862174)

- `Scripting.FileSystemObject`对象的对象和集合

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



- `Scripting.FileSystemObject`对象的方法和属性


| 方法和属性                                        	| 说明                                                                                          	|
|------------------------------------------------	|-----------------------------------------------------------------------------------------------	|
| fso.BuildPath(path,name)                       	| 将名称附加到现有路径。                                                                        	|
| fso.CopyFile(src,dst,[overwrite])              	| 复制文件，其中overwrite表示文件存在时是否替换，默认为true                                     	|
| fso.CopyFolder                                 	| 用法同CopyFile                                                                                	|
| fso.CreateFolder(path)                         	| 创建一个文件夹                                                                                	|
| fso.CreateTextFile(path)                       	| 创建一个文件                                                                                  	|
| fso.CreateTextFile(path,[overrwite,unicode])   	| 创建一个文本文件                                                                              	|
| fso.DeleteFile(path,[force])                   	| 删除文件，其中force表示是否删除只读文件，默认为false                                          	|
| fso.DeleteFolder(path,[force])                 	| 用法同DeleteFile                                                                              	|
| fso.DriveExists(drivespec)                     	| 检查指定的驱动器是否存在。                                                                    	|
| fso.FileExists(path)                           	| 判断文件是否存在,返回结果为真或假                                                             	|
| fso.FolderExists(path)                         	| 判断文件夹是否存在,返回结果为真或假                                                           	|
| fso.GetAbsolutePathname(path)                  	| 得到文件的绝对路径                                                                            	|
| fso.GetBaseName(path)                          	| 得到文件的不带扩展名的那个文件名                                                              	|
| fso.GetDrive(drivespec)                        	| 返回对应于指定路径中的驱动器的 Drive 对象。                                                   	|
| fso.GetDriveName(path)                         	| 返回指定路径的驱动器名称。                                                                    	|
| fso.GetExtensionName(path)                     	| 得到文件的扩展名                                                                              	|
| fso.GetFile(path)                              	| 获得指定路径下文件的File对象                                                                  	|
| fso.GetFileName(path)                          	| 得到文件的文件名                                                                              	|
| fso.GetFolder(path)                            	| 获得指定路径下目录的Folder对象                                                                	|
| fso.GetParentFolderName(path)                  	| 得到文件的父目录                                                                              	|
| fso.GetSpecialFolder(folderspec)               	| 返回某些 Windows 特殊文件夹的路径。                                                           	|
| fso.GetTempName()                              	| 返回随机生成的临时文件或文件夹。                                                              	|
| fso.MoveFile(src,dst)                          	| 移动文件，如果目标有同名文件则会有报错提示文件已存在，可以通过该方法给文件改名                	|
| fso.MoveFolder(src,dst)                        	| 用法同MoveFile                                                                                	|
| fso.OpenTextFile(path,[mode,create,encoding])  	| 打开一个文本文件                                                                              	|
| object.Attributes                              	| 表示文件的属性，用各个二制位置位组合表示。1标识只读，2标识隐藏，4标识系统。该属性部分位可读写 	|
| object.Close                                   	| 关闭文件                                                                                      	|
| object.Copy(dst,[overwrite])                   	| 复制文件，overwrite表示目标文件存在时是否覆盖，默认为true                                     	|
| object.Count                                   	| 目录下的项目数，该属性只读                                                                    	|
| object.DateCreated                             	| 文件创建时间，该属性只读                                                                      	|
| object.DateLastAccessed                        	| 最近访问时间，该属性只读                                                                      	|
| object.DateLastModified                        	| 最后修改时间，该属性只读                                                                      	|
| object.Delete([force])                         	| 删除文件，force表示是否删除只读文件，默认为false                                              	|
| object.Files                                   	| 得到目录下的所有文件对象集合                                                                  	|
| object.Move(dst)                               	| 移动文件，如果目标有同名文件则会有报错提示文件已存在                                          	|
| object.Name                                    	| 文件名称，该属性可读写                                                                        	|
| object.OpenAsTextStream([ iomode, [ format ]]) 	| 打开指定文件并返回可用于从该文件读取、写入该文件或追加到该文件的 TextStream 对象。            	|
| object.ParentFolder                            	| 父文件夹，该属性只读                                                                          	|
| object.Path                                    	| 文件路径                                                                                      	|
| object.Read(个数)                              	| 读取指定个数的字符                                                                            	|
| object.ReadAll                                 	| 读取文件中所有内容                                                                            	|
| object.ReadLine                                	| 读取一行内容                                                                                  	|
| object.Size                                    	| 文件大小，以字节计                                                                            	|
| object.Skip(个数)                              	| 跳过指定个数的字符SkipLine方法                                                                	|
| object.SkipLine                                	| 跳过文件中一行                                                                                	|
| object.SubFolders                              	| 得到目录下的所有文件夹对象集合                                                                	|
| object.Write(文本内容)                         	| 写入指定的字符串                                                                              	|
| object.WriteLine                               	| 写一行内容                                                                                    	|


- `fso.OpenTextFile(path,[mode,create,encoding])`

> `mode` 模式,缺省为只读方式打开
>> `ForReading=1` 以只读方式打开
>>
>> `ForWriting=2` 以读写方式打开
>>
>> `ForAppending=8` 以附加方式打开

> `create` 不存在时是否创建缺省为否,即不创建文件

> `encoding` 何种方式打开,缺省以`ASCII`方式
>> `TristateUseDefault=-2` 以系统默认方式打开
>>
>> `TristateTrue=-1` 以`Unicode`方式打开
>>
>> `TristateFalse=0` 以`ASCII`方式打开

- `fso.CreateTextFile(path,[overrwite,unicode])`

> `overrwite` 是否覆盖,缺省为是
>
> `unicode` 是否以`Unicode`方式创建,缺省为`false`,即以`ASCII`方式创建




### Shell

* [Wscript.Shell 对象详细介绍](https://www.jb51.net/article/5683_all.htm)

> `Wscript.Shell`对象提供的功能

- `Run` `Exec` 执行`cmd`命令
- `CreateShortcut` 创建快捷方式
- `SpecialFolders` 访问`Windows`的`shell`文件夹
- `Environment` 操作环境变量
- `RegRead` 从注册表中返回指定的键或值
- `RegWrite` 在注册表中设置指定的键或值
- `RegDelete` 从注册表中删除指定的键或值
- `SendKeys` 模拟按键
- `Popup` 显示包含指定消息的消息窗口

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


| 注册表短根键名       | 注册表长根键名        |
|---------------------|---------------------|
| HKCU                | HKEY_CURRENT_USER   |
| HKLM                | HKEY_LOCAL_MACHINE  |
| HKCR                | HKEY_CLASSES_ROOT   |
| HKEY_USERS          | HKEY_USERS          |
| HKEY_CURRENT_CONFIG | HKEY_CURRENT_CONFIG |



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




#### 特殊文件夹

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


#### 模拟按键

- `SendKeys`键击参数说明

> `Enter`回车建表示`{Enter}`、字母`A`表示`{A}`、数字`2`表示`{2}`等
>> 示例`Wshshell.SendKeys("{Enter}")`、`Wshshell.SendKeys("{A}")`、`Wshshell.SendKeys("{2}")`

> 组合键`Shift`用`+`代替、`Ctrl`用`^`代替、`Alt`用`%`代替
>> 示例`Wshshell.SendKeys("+%{DELETE}")`、`Wshshell.SendKeys("^{C}")`、`Wshshell.SendKeys("^{V}")`

> 模拟快捷键`Ctrl + S`保存内容：`Wshshell.SendKeys("^{s}")`





### VMI

> `SWBEM`脚本是可以用来访问和控制WMI内部对象的一系列可用在脚本中的对象，
> 脚本通过访问`wbemdisp.dll`这个`library`来访问`VMI`对象，这个仅被设计用来为脚本工作。

> 通过`WbemScripting.SWbemLocator`创建对象

> 查询方式类似sql语句（其实系统信息也是存储在计算中一个类似数据库的文件中）获取我们需要的对象的记录集

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


## VBScript

* [Visual Basic 指南](https://docs.microsoft.com/zh-cn/dotnet/visual-basic/)

* [VBScript 语言](https://www.tcoline.com/resource/vbs/top_vbs_0.htm)

* [VBScript 教程](https://code.ziqiangxuetang.com/vbscript/vbscript-tutorial.html)

* [VBScript 函数](https://www.w3school.com.cn/vbscript/vbscript_ref_functions.asp)


- `Scripting.Dictionary` 字典

> 包含字典的添加、删除、判断键是否存在、修改键、修改值、遍历、统计键值对个数

- `System.Collections.ArrayList` 动态数组

> 包含动态数组的添加元素、删除元素、遍历、统计元素个数、清空

- `System.Collections.Queue` 队列

> 包含队列的添加元素（入队）、删除元素（出队）、遍历、统计元素个数、清空

- `System.Collections.Stack` 堆栈

> 包含堆栈的添加元素（压栈）、删除元素（出栈）、遍历、统计元素个数、清空





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
'obj            对象
'Example        GetObjectPropertieValue(obj)
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


