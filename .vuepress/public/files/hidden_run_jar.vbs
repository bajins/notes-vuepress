hta="""about:<input type=file id=f><script>f.click();" & _
    "new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).WriteLine(f.value);" & _
    "close();resizeTo(0,0);</script>"""
' 打开对话框
Set Shell = CreateObject("WScript.Shell")

Set oExec = Shell.Exec("mshta.exe " & hta)

jarPath = oExec.StdOut.ReadLine
If jarPath <> "" Then
    ' 输出选择的，文件的路径
    MsgBox "当前选择的文件：" & chr(13) & jarPath, 64

    arg = InputBox("JVM参数：", "请输入需要携带的JVM参数", "")

    Shell.Run "java -jar " & jarPath & " " & arg, 0, False

    MsgBox "执行成功！", 64
Else
    MsgBox "请选择文件！", 48
End If
