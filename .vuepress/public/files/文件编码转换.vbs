'用法：将文件夹拖到该vbs上（或者双击选择文件），输入要转换成的字符编码
Call Run

Function Run()
    Dim fdpath,charset
    On Error Resume Next
    If WScript.Arguments.Length>=1 Then
        fdpath = WScript.Arguments(0)
    Else
        hta="""about:<input type=file id=f><script>f.click();" & _
        "new ActiveXObject('Scripting.FileSystemObject').GetStandardStream(1).WriteLine(f.value);" & _
        "close();resizeTo(0,0);</script>"""
        ' 打开对话框，并输出选择的，文件的路径
        fdpath = CreateObject("WScript.Shell").Exec("mshta.exe " & hta ).StdOut.ReadLine
        If fdpath = "" Then
            WScript.echo "必须输入文件路径"
            WScript.Quit
        End If
    End If
    If WScript.Arguments.Length>=2 Then
        charset = WScript.Arguments(1)
    Else
        charset = InputBox("字符编码，默认UTF-8","请输入字符编码","UTF-8")
        if charset = "" then
            WScript.echo "必须输入字符编码"
            WScript.Quit
        End If
        charset = UCase(charset)
        if StrComp(replace(charset,"-",""), "UTF8") <> 0 _
            and StrComp(replace(charset,"-",""), "UTF8BOM") <> 0 _
            and StrComp(charset, "GB2312") <> 0 _
            and StrComp(charset, "UNICODE") <> 0 _
            and StrComp(charset, "ANSI") <> 0 then
                WScript.echo "不支持的格式: " & charset
                WScript.Quit
        End if
        ' ANSI 并不是一种编码，ANSI 实际对应的编码跟系统设置的代码页有关，
        ' 在简体中文系统中代码页默认是936，对应 GB2312 编码
        if charset = "ANSI" then charset = "GB2312"
    End If
    ' Set fso = CreateObject("scripting.filesystemobject")
    ' Set fd = fso.GetFolder(fdpath)
    ' Set fl=fd.Files
    ' For each f in fl
    '     WriteToFile f.Path,replace(ReadFile(fdpath,CheckCode(fdpath)),vbLf,vbCrLf),charset
    ' Next

    oldCharSet = UCase(CheckCode(fdpath))
    WScript.echo "当前编码 "& oldCharSet &" 转换成编码" & charset
    If StrComp(charset, oldCharSet) = 0 Then
        MsgBox charset & " == " & oldCharSet,,"字符编码相同提示"
        WScript.Quit
    End If

    If StrComp(oldCharSet, "UTF-8-BOM") =0 and StrComp(replace(charset,"-",""), "UTF-8") = 0 Then
        MsgBox replace(ReadFile(fdpath,oldCharSet),vbLf,vbCrLf)
        UF8NoBOM fdpath
    Else
        WriteToFile fdpath,replace(ReadFile(fdpath,oldCharSet),vbLf,vbCrLf),charset
    End If
    MsgBox "转换后编码：" & CheckCode(fdpath),,"字符编码转换结束提示"
End Function

' UTF-8-BOM 转 UTF8
Function UF8NoBOM(Path)
    Set UTFStream = CreateObject("ADODB.Stream")
    UTFStream.Type = 1
    UTFStream.Mode = 3
    UTFStream.Open
    UTFStream.Position = 0
    UTFStream.loadfromfile Path
    ' Bin=UTFStream.read(2)

    Set BinaryStream = CreateObject("ADODB.Stream")
    ' 移动首字符的字节数据至流开始位置，去除BOM（前3个字节）
    UTFStream.Position = 3
    BinaryStream.Type = 1
    BinaryStream.Mode = 3
    BinaryStream.Open
    UTFStream.CopyTo BinaryStream
    BinaryStream.SaveToFile Path, 2
    BinaryStream.Flush
    BinaryStream.Close
    UTFStream.Flush
    UTFStream.Close
End Function

' 将读取的文件内容以指定编码写入文件 UF8WithoutBOM
Function WriteToFile(Path, Str, CharSet)
    ' 由于UTF8会自动写BOM，所以使用UTF-8
    If StrComp(replace(charset,"-",""), "UTF8BOM") =0 Then
        CharSet = "UTF-8"
    End If
    Set stm = CreateObject("Adodb.Stream")
    ' 这里1为二进制，2为文本型
    stm.Type = 2
    stm.mode = 3
    stm.charset = CharSet
    stm.Open
    ' 如果为文本型只能指定为Size，写入文本后需要去掉BOM
    ' stm.Position = stm.Size
    ' write写二进制,writetext写文本型，
    ' stream会自动先在流的最开始插入3个字节的BOM
    stm.WriteText Str
    stm.SaveToFile Path, 2
    ' stm.SetEOS
    stm.flush
    stm.Close
    Set stm = Nothing
End Function

' 以文件本身编码读取文件
Function ReadFile(Path, CharSet)
    Set stm = CreateObject("Adodb.Stream")
    stm.Type = 2
    stm.mode = 3
    stm.charset = CharSet
    stm.Open
    stm.loadfromfile Path
    ReadFile = stm.ReadText(-1)
    stm.Close
    Set stm = Nothing
End Function

'该函数检查并返回文件的编码类型
Function CheckCode(Path)
    Dim slz
    set slz = CreateObject("Adodb.Stream")
    slz.Type = 1
    slz.Mode = 3
    slz.Open
    slz.Position = 0
    slz.Loadfromfile Path
    Bin=slz.read(2)
    If AscB(MidB(Bin, 1, 1)) = &HEF and AscB(MidB(Bin, 2, 1)) = &HBB Then
        Codes="UTF-8-BOM"
    ElseIf is_valid_utf8(read(Path)) Then
        Codes="UTF-8"
    ElseIf AscB(MidB(Bin,1,1))=&HFF and AscB(MidB(Bin,2,1))=&HFE Then
        Codes="Unicode"
    Else
        Codes="GB2312"
    End if
    slz.Flush
    slz.Close
    Set slz = Nothing
    CheckCode = Codes
End Function

'将Byte()数组转成String字符串
Function read(path)
    Dim ado, a(), i, n
    Set ado = CreateObject("ADODB.Stream")
    ado.Type = 1 : ado.Open
    ado.LoadFromFile path
    n = ado.Size - 1
    ReDim a(n)
    For i = 0 To n
        a(i) = ChrW(AscB(ado.Read(1)))
    Next
    read = Join(a, "")
End Function

'准确验证文件是否为utf-8（能验证无BOM头的uft-8文件）
Function is_valid_utf8(ByRef input) 'ByRef以提高效率
    Dim s, re
    Set re = New Regexp
    s = "[\xC0-\xDF]([^\x80-\xBF]|$)"
    s = s & "|[\xE0-\xEF].{0,1}([^\x80-\xBF]|$)"
    s = s & "|[\xF0-\xF7].{0,2}([^\x80-\xBF]|$)"
    s = s & "|[\xF8-\xFB].{0,3}([^\x80-\xBF]|$)"
    s = s & "|[\xFC-\xFD].{0,4}([^\x80-\xBF]|$)"
    s = s & "|[\xFE-\xFE].{0,5}([^\x80-\xBF]|$)"
    s = s & "|[\x00-\x7F][\x80-\xBF]"
    s = s & "|[\xC0-\xDF].[\x80-\xBF]"
    s = s & "|[\xE0-\xEF]..[\x80-\xBF]"
    s = s & "|[\xF0-\xF7]...[\x80-\xBF]"
    s = s & "|[\xF8-\xFB]....[\x80-\xBF]"
    s = s & "|[\xFC-\xFD].....[\x80-\xBF]"
    s = s & "|[\xFE-\xFE]......[\x80-\xBF]"
    s = s & "|^[\x80-\xBF]"
    re.Pattern = s
    is_valid_utf8 = (Not re.Test(input))
End Function
