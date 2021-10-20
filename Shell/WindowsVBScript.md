# WindowsVBScript


[[toc]]




## Flag

+ 批处理之家 [http://www.bathome.net](http://www.bathome.net)
+ 中国DOS联盟 [DOS批处理 & 脚本技术（批处理室）](http://cndos.fam.cx/forum/forumdisplay.php?fid=23)

* [VBScript](https://docs.microsoft.com/zh-cn/previous-versions//t0aew7h6(v=vs.85))
* [Visual Basic 指南](https://docs.microsoft.com/zh-cn/dotnet/visual-basic)
* [VBScript语言参考](https://docs.microsoft.com/zh-cn/previous-versions//d1wf56tt%28v%3dvs.85%29)
* [VBScript基础知识](https://docs.microsoft.com/zh-cn/previous-versions//0ad0dkea%28v%3dvs.85%29)
* [VBScript 语言](https://www.tcoline.com/resource/vbs/top_vbs_0.htm)
* [VBScript 教程](https://code.ziqiangxuetang.com/vbscript/vbscript-tutorial.html)
* [VBScript 函数](https://www.w3school.com.cn/vbscript/vbscript_ref_functions.asp)
* [https://github.com/MishaVernik/WScirpt](https://github.com/MishaVernik/WScirpt)

- [VBScript MsgBox 函数](https://www.runoob.com/vbscript/func-msgbox.html)



## 特殊符号

* [String Constants](https://docs.microsoft.com/zh-cn/previous-versions//hh277t8e%28v%3dvs.85%29)

| 常数          	| 值                       	| 描述                                       	|
|---------------	|--------------------------	|--------------------------------------------	|
| vbCr          	| Chr(13)                  	| 回车符 `\r`                                	|
| vbLf          	| Chr(10)                  	| 换行符 `\n`                                	|
| vbCrLf        	| Chr(13)&Chr(10)          	| 回车符与换行符 `\r\n`                      	|
| vbFormFeed    	| Chr(12)                  	| 换页符；在MicrosoftWindows中不适用。       	|
| vbNewLine     	| Chr(13)&Chr(10)或Chr(10) 	| 平台指定的新行字符；适用于任何平台。       	|
| vbNullChar    	| Chr(0)                   	| 值为0的字符。                              	|
| vbNullString  	| 值为0的字符串            	| 与零长度字符串("")不同；用于调用外部过程。 	|
| vbTab         	| Chr(9)                   	| 水平附签。                                 	|
| vbVerticalTab 	| Chr(11)                  	| 垂直附签；在MicrosoftWindows中不用         	|



## 函数封装

* [https://github.com/eklam/VbsJson](https://github.com/eklam/VbsJson)
* [进度条](https://stackoverflow.com/questions/18216027/vbscript-script-progress-notification)
* [进度条](https://stackoverflow.com/questions/50514348/how-do-i-make-a-fake-progress-bar-in-vbscript)


```vb
Set regex = New RegExp
Set regex = CreateObject("VBScript.RegExp")
regex.Global = True
regex.MultiLine = True
regex.Pattern = "^\s*\n"
str = regex.Replace(str, "")
```


### 自动关闭弹窗

```vb
' TimeOut 单位为秒
Public Sub MsgBoxTimeout(Text, Title, TimeOut)
    Set WshShell = CreateObject("WScript.Shell")
    WshShell.Popup Text, TimeOut, Title
End Sub
```



### 数组转换为字符串

```vb
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


### 获取对象的属性和值

```vb
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

### 获取系统信息

> 此方式完全不会显示`CMD`窗口（包括闪现）

```vb
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


### 隐藏窗口运行

```vb
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


**Shell.Application**

```vb
CreateObject("Shell.Application").ShellExecute "demo.exe","","c:/","", 0
```



### 查看进程是否存在

```vb
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



### Ping

```vb
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


### 监视网络连接

```vb
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

### 监视网络断开

```vb
Set objWMIService = GetObject("winmgmts:\\.\root\wmi")
' 执行事件订阅查询以接收事件。事件订阅查询定义了要监视的托管环境的更改。发生更改时，WMI基础结构会将事件描述为调用脚本。
Set colMonitoredEvents = objWMIService.ExecNotificationQuery("Select * from MSNdis_StatusMediaDisconnect") 
Do While True 
    Set strLatestEvent = colMonitoredEvents.NextEvent 
    Wscript.Echo "网络连接已丢失："
    WScript.Echo strLatestEvent.InstanceName, Now
Loop
```


### 设置壁纸

> 使用API触发图片文件右键菜单上的 `设置为桌面背景(B)`

```vb
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


### 刷新桌面

```vb
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


### 字符编码转换

```vb
' 将UTF8编码文字转换为GB编码文字
function UTF2GB(UTFStr)
    for Dig=1 to len(UTFStr)
    '如果UTF8编码文字以%开头则进行转换
    if mid(UTFStr,Dig,1)="%" then
        'UTF8编码文字大于8则转换为汉字
        if len(UTFStr) >= Dig+8 then
            GBStr=GBStr & ConvChinese(mid(UTFStr,9))
            Dig=Dig+8
        else
            GBStr=GBStr & mid(UTFStr,1)
        end if
    else
        GBStr=GBStr & mid(UTFStr,1)
    end if
    next
    UTF2GB=GBStr
end function

' UTF8编码文字将转换为汉字
function ConvChinese(x)
     A=split(mid(x,2),"%")
     i=0
     j=0
  for i=0 to ubound(A)
       A(i)=c16to2(A(i))
  next
  for i=0 to ubound(A)-1
      DigS=instr(A(i),"0")
      Unicode=""
    for j=1 to DigS-1
      if j=1 then
          A(i)=right(A(i),len(A(i))-DigS)
          Unicode=Unicode & A(i)
      else
           i=i+1
           A(i)=right(A(i),len(A(i))-2)
           Unicode=Unicode & A(i)
      end if
    next
 
    if len(c2to16(Unicode))=4 then
         ConvChinese=ConvChinese & chrw(int("&H" & c2to16(Unicode)))
    else
         ConvChinese=ConvChinese & chr(int("&H" & c2to16(Unicode)))
    end if
  next
end function
 
'二进制代码转换为十六进制代码
function c2to16(x)
    i=1
    for i=1 to len(x) step 4
            c2to16=c2to16 & hex(c2to10(mid(x,i,4)))
    next
end function
'二进制代码转换为十进制代码
function c2to10(x)
    c2to10=0
    if x="0" then exit function
        i=0
    for i= 0 to len(x) -1
        if mid(x,len(x)-i,1)="1" then c2to10=c2to10+2^(i)
    next
end function
 
'十六进制代码转换为二进制代码
function c16to2(x)
    i=0
    for i=1 to len(trim(x))
        tempstr= c10to2(cint(int("&h" & mid(x,1))))
        do while len(tempstr)<4
            tempstr="0" & tempstr
        loop
        c16to2=c16to2 & tempstr
    next
end function
 
'十进制代码转换为二进制代码
function c10to2(x)
    mysign=sgn(x)
    x=abs(x)
    DigS=1
    do
        if x<2^DigS then
        exit do
        else
            DigS=DigS+1
        end if
    loop
        tempnum=x

        i=0
    for i=DigS to 1 step-1
        if tempnum>=2^(i-1) then
            tempnum=tempnum-2^(i-1)
            c10to2=c10to2 & "1"
        else
            c10to2=c10to2 & "0"
        end if
    next
    if mysign=-1 then c10to2="-" & c10to2
end function
 
'GB转unicode---将GB编码文字转换为unicode编码文字
function chinese2unicode(Str)
  dim i
  dim Str_one
  dim Str_unicode
  if(isnull(Str)) then
     exit function
  end if
  for i=1 to len(Str)
     Str_one=Mid(Str,1)
     Str_unicode=Str_unicode&chr(38)
     Str_unicode=Str_unicode&chr(35)
     Str_unicode=Str_unicode&chr(120)
     Str_unicode=Str_unicode& Hex(ascw(Str_one))
     Str_unicode=Str_unicode&chr(59)
  next
   chinese2unicode=Str_unicode
end function   
 
'URL解码
Function URLDecode(enStr)
dim deStr
dim c,v
deStr=""
for i=1 to len(enStr)
    c=Mid(enStr,1)
    if c="%" then
    v=eval("&h"+Mid(enStr,i+1,2))
    if v<128 then
        deStr=deStr&chr(v)
        i=i+2
    else
    if isvalidhex(mid(enstr,3)) then
        if isvalidhex(mid(enstr,i+3,3)) then
        v=eval("&h"+Mid(enStr,2)+Mid(enStr,i+4,2))
        deStr=deStr&chr(v)
        i=i+5
        else
        v=eval("&h"+Mid(enStr,2)+cstr(hex(asc(Mid(enStr,1)))))
        deStr=deStr&chr(v)
        i=i+3
        end if
    else
        destr=destr&c
    end if
    end if
    else
    if c="+" then
        deStr=deStr&" "
    else
        deStr=deStr&c
    end if
    end if
next
URLDecode=deStr
end function
 
'判断是否为有效的十六进制代码
function isvalidhex(str)
    dim c
    isvalidhex=true
    str=ucase(str)
    if len(str)<>3 then isvalidhex=false:exit function
    if left(str,1)<>"%" then isvalidhex=false:exit function
    c=mid(str,2,1)
    if not (((c>="0") and (c<="9")) or ((c>="A") and (c<="Z"))) then isvalidhex=false:exit function
    c=mid(str,3,1)
    if not (((c>="0") and (c<="9")) or ((c>="A") and (c<="Z"))) then isvalidhex=false:exit function
end function
```


### 选择文件对话框

```vb
Function SelectFile()
    Set WshShell = WScript.CreateObject("WScript.Shell")
    Set oExec = WshShell.Exec("powershell -WindowStyle Hidden -ExecutionPolicy Bypass " & _
    "[void][System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms');" & _
    "$dialog = New-Object 'System.Windows.Forms.OpenFileDialog';" & _
    "$dialog.Title ='请选择文件';" & _
    "$dialog.filter ='All|*.*|PowerShell|*.ps1';" & _
    "if ($dialog.ShowDialog() -eq 'OK') {$dialog.FileName;} Else {Out-Null}")
    SelectFile = oExec.StdOut.ReadAll
End Function

Function SelectFile()
    ' GetStandardStream获取TextStream对象.参数：0输入流,1输出流,2错误流.
    ' "new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).Write(f.value);" & _
    hta="""about:<input type=file id=f><script>f.click();" & _
        "new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).WriteLine(f.value);" & _
        "close();resizeTo(0,0);</script>"""
    ' 打开对话框
    Set oExec = CreateObject("WScript.Shell").Exec("mshta.exe " & hta)

    StrLine = oExec.StdOut.ReadLine
    ' StrLine = oExec.StdOut.ReadAll
    If StrLine <> "" And InStr(StrLine, Chr(13)) > 0 Then
        ' SelectFile = Left(StrLine, Pos - 1)
        SelectFile = StrLine
    Else
        SelectFile = ""
    End If
End Function

' sIniDir 为初始化目录
' sFilter 为文件后缀 示例："*.*,*.txt"
Function GetFileDlgEx(sIniDir, sFilter, sTitle)
    sIniDir = Replace(sIniDir, "\", "\\")
    ' Set regex = New RegExp
    Set regex = CreateObject("VBScript.RegExp")
    regex.Global = True
    regex.MultiLine = True
    regex.Pattern = ";|\|"
    sFilter = regex.Replace(sFilter, ",")
    DIM sf
    For Each i In Split(sFilter, ",")
        sf = sf & i & "|" & i & "|"
    Next
    sFilter = sf
    hta="""about:<object id=d classid=clsid:3050f4e1-98b5-11cf-bb82-00aa00bdce0b></object>" & _
    "<script>moveTo(0,-9999);" & _
    "eval(new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(0)" & _
    ".Read("&Len(sIniDir)+Len(sFilter)+Len(sTitle)+41&"));" & _
    "function window.onload(){" & _
    "var p=/[^\0]*/;" & _
    "new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1)" & _
    ".Write(p.exec(d.object.openfiledlg(iniDir,null,filter,title)));" & _
    "close();" & _
    "}</script><hta:application showintaskbar=no />"""
    Set oDlg = CreateObject("WScript.Shell").Exec("mshta.exe " & hta) 
    oDlg.StdIn.Write "var iniDir='" & sIniDir & "';var filter='" & sFilter & "';var title='" & sTitle & "';" 
    GetFileDlgEx = oDlg.StdOut.ReadAll 
End Function


Function BrowseForFile()
    With CreateObject("WScript.Shell")
        Dim fso : Set fso = CreateObject("Scripting.FileSystemObject")
        Dim tempFolder : Set tempFolder = fso.GetSpecialFolder(2)
        Dim tempName : tempName = fso.GetTempName() & ".hta"
        Dim path : path = "HKCU\Volatile Environment\MsgResp"
        With tempFolder.CreateTextFile(tempName)
            .Write "<input type=file name=f>" & _
            "<script>f.click();(new ActiveXObject('WScript.Shell'))" & _
            ".RegWrite('HKCU\\Volatile Environment\\MsgResp', f.value);" & _
            "close();</script>"
            .Close
        End With
        .Run tempFolder & "\" & tempName, 1, True
        BrowseForFile = .RegRead(path)
        .RegDelete path
        fso.DeleteFile tempFolder & "\" & tempName
    End With
End Function


Function SelectFolder(default)
    Set objShell = CreateObject("Shell.Application")
    If IsNull(default) Then
        ' Set objFolder = objShell.Namespace(&H11) ' 获取当前计算机
        ' default = objFolder.Self.Path
        default = 0
    End If
    ' https://docs.microsoft.com/zh-cn/windows/win32/shell/shell-browseforfolder
    ' 第一个参数：为对话框的窗体句柄，一般设置为0
    ' 第二个参数：为打开窗体的说明
    ' 第三个参数：0/1/2/3/257/4097/8193/12289/16385/20481只从列表进行选择（列表内容不一样），
    '       529没有路径输入框，513没有路径输入框和新建文件夹按钮，&H10（17）有路径输入框，
    '       &H4000可看到文件但选择将报错;
    ' 第四个参数：起始路径根文件夹，0/12/15/16为桌面，1/2/3/4/5/6/7/8/9/10/11/13/14/17/18/19/20/21/22
    Set Folder = objShell.BrowseForFolder(0, "请选择一个文件夹:", &H10 , default) 
    If Folder Is Nothing Then 
        SelectFolder = ""
    Else
        SelectFolder = Folder.Self.Path
    End If
End Function
```


### 文件编码转换

- [VBS处理UTF-8文本之ADODB.stream](https://blog.csdn.net/chuhe163/article/details/103549144)
- [文件编码转换.vbs](/files/文件编码转换.vbs)


**转换编码和换行符**

```vb
Set read = CreateObject("Adodb.Stream")
read.Type = 2
read.mode = 3
read.charset = "UTF-8"
read.Open
read.loadfromfile fdpath
text = read.ReadText(-1)
read.flush
read.Close
Set save = CreateObject("Adodb.Stream")
save.Type = 2
save.mode = 3
save.charset = "GB2312"
save.Open
save.WriteText replace(text,vbLf,vbCrLf)
save.SaveToFile fdpath, 2
save.flush
save.Close
```



## VBA

+ [Visual Basic for Applications (VBA) 语言参考](https://docs.microsoft.com/zh-cn/office/vba/api/overview/language-reference)
+ Microsoft Office Development [https://bettersolutions.com](https://bettersolutions.com)
+ [VBA学习笔记](https://www.zhihu.com/people/xia-xi-lan/posts)
+ [xcel之VBA简单宏编程](https://blog.csdn.net/wordsin/article/details/80575615)
+ [VBA学习笔记](https://www.zhihu.com/people/xia-xi-lan/posts)
+ [xcel之VBA简单宏编程](https://blog.csdn.net/wordsin/article/details/80575615)

- 匹配单元格左边英文及其他字符=RegexString(A1,"[^\u4e00-\u9fa5]+")
- 匹配单元格右边中文及其他字符=RegexString(A1,"[\u4e00-\u9fa5].*")

```vb
Function RegexString(rng As Range, str As String)
'第一个参数rng为区域保持不变， 添加第二个参数str（作为正则表达式）
  With CreateObject("VBscript.regexp")
    .Global = True
    .Pattern = str '表达式,直接从用户函数的第二个参数中调用
    If .Execute(rng).Count = 0 Then
    RegexString = ""
    Else
    RegexString = .Execute(rng)(0)
    End If
  End With
End Function
```

- 分割字符串并统计

```vb
'https://blog.csdn.net/wordsin/article/details/80575615
'自定义函数用于工作表时，必须是被动式的，只是返回一个值，不能处理单元格或在工作表上修改，批注是个例外，不能调用range的方法，如：Find，Range.Replace例外
Function ReSplit(rng As Range)
    Dim newStr As String
    Dim countNum As Integer
    
    old = Strings.Split(rng, " ")
    For Each e In old
        If e <> "" Then
            'MsgBox TypeName(e)
            'Replace(, "/", "")
            With CreateObject("VBSCRIPT.REGEXP")
                .Global = True
                .IgnoreCase = True
                .Pattern = "([a-zA-Z]+)([0-9]+)-([0-9]+)"
                If .test(e) Then
                    '执行正则表达式，获取子匹配列表
                    Set da = .Execute(e)(0).SubMatches
                    last = da(0)
                    st = da(1)
                    en = da(2)
                    'Debug.Print last, st, en
                    For i = st To en
                        newStr = newStr & "," & last & i
                        countNum = countNum + 1
                    Next
                Else
                    newStr = newStr & "," & e
                    countNum = countNum + 1
                End If
            End With
        End If
    Next
    If InStr(newStr, ",") Then
        newStr = Right(newStr, Len(newStr) - 1)
    End If
    Debug.Print newStr
    Debug.Print countNum
    
    ReSplit = newStr
    
    'ActiveCell.Address '这是当前单元格地址
    'Selection.Offset(1, 0).Select '这是向下跳1格
    'Selection.Offset(-1, 0).Select '这是向上跳1格
    'Selection.Offset(0, -1).Select '这是向左跳1格
    'Selection.Offset(0, 1).Select '这是向右跳1格

End Function


Function SplitCount(rng As Range, delimiter As String)
   SplitCount = Len(Strings.Split(rng, delimiter))
End Function

Sub SetValue(offset As Range, value)
    offset = value
End Sub


Sub run()
    Set rng = Application.InputBox(prompt:="请选择区域", Type:=8)
    If rng.Count = 0 Then
        MsgBox "请至少选择一个单元格！", , "提示":
        Exit Sub
    End If
    'If rng.Count <> 1 Then
        'MsgBox "只能选择一个单元格！", , "提示":
        'Exit Sub
    'End If
    Debug.Print "当前选择：", rng.Address(1, 1)
    
    rngs = Strings.Split(rng.Address(1, 1), ":")
    st = Strings.Split(rngs(0), "$")(1)
    sta = Replace(rngs(0), "$", "")
    'Debug.Print rngs(0), st, sta
    
    of1Content = "整理后的数据"
    of2Content = "整理后的统计"
    If Range(st & "1").offset(0, 1) <> of1Content Then
        '插入空列
        Range(sta).offset(0, 1).EntireColumn.Insert
        Range(st & "1").offset(0, 1) = of1Content
    End If
    If Range(st & "1").offset(0, 2) <> of2Content Then
        Range(sta).offset(0, 2).EntireColumn.Insert
        Range(st & "1").offset(0, 2) = of2Content
    End If
    
    For Each im In rng
        
        If im <> "" Then
            'Debug.Print TypeName(im), im.Address
            
            str1 = ReSplit(Range(Replace(im.Address, "$", "")))
            im.offset(0, 1) = str1
            im.offset(0, 2) = Application.CountA(Strings.Split(str1, ","))
        End If
    Next
End Sub
```