# Visual Basic Script

## [WScript对象属性](https://www.cnblogs.com/wakey/p/5795845.html)

## 输入内容到记事本
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
## Windows特殊文件夹
```visual-basic
' 设置对脚本宿主对象引用赋给变量
Set Wshshell = Wscript.CreateObject("Wscript.Shell")
' WshShell对象的SpecialFolders属性返WshSpecialFolders 对象，该对象是一个特殊文件夹集合，其中包含整套Windows特殊文件夹
Set sf = Wshshell.SpecialFolders
Msgbox("公共桌面： " & sf("AllUsersDesktop"))
Msgbox("公共程式： " & sf("AllUsersStartMenu"))
Msgbox("公共程序： " & sf("AllUsersPrograms"))
Msgbox("公共启动： " & sf("AllUsersStartup"))
Msgbox("桌面： " & sf("Desktop"))
Msgbox("收藏： " & sf("Favorites"))
Msgbox("字体： " & sf("Fonts"))
Msgbox("我的文档： " & sf("MyDocuments"))
Msgbox("网络： " & sf("NetHood"))
Msgbox("打印机： " & sf("PrintHood"))
Msgbox("程序： " & sf("Programs"))
Msgbox("最近： " & sf("Recent"))
Msgbox("发给： " & sf("SendTo"))
Msgbox("开始菜单： " & sf("StartMenu"))
Msgbox("启动： " & sf("Startup"))
Msgbox("模板： " & sf("Templates"))
Msgbox("应用程序数据： " & sf("AppData"))
```

## 隐藏运行
```visual-basic
'在运行窗口输入shell:startup点击确定后打开一个文件夹，把此文件放在文件夹中

'运行命令
runCommand = "D:\frp内网穿透工具\frpc.exe -c D:\frp内网穿透工具\frpc.ini"

'调用运行函数
call run(folderPath)

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