# ExcelScript


[[toc]]




## Flag

+ [Visual Basic for Applications (VBA) 语言参考](https://docs.microsoft.com/zh-cn/office/vba/api/overview/language-reference)
+ Microsoft Office Development [https://bettersolutions.com](https://bettersolutions.com)
+ [VBA学习笔记](https://www.zhihu.com/people/xia-xi-lan/posts)
+ [xcel之VBA简单宏编程](https://blog.csdn.net/wordsin/article/details/80575615)
+ [VBA学习笔记](https://www.zhihu.com/people/xia-xi-lan/posts)
+ [xcel之VBA简单宏编程](https://blog.csdn.net/wordsin/article/details/80575615)
+ [https://docs.microsoft.com/zh-cn/javascript/api](https://docs.microsoft.com/zh-cn/javascript/api)
+ [https://docs.microsoft.com/zh-cn/office/dev/add-ins/excel](https://docs.microsoft.com/zh-cn/office/dev/add-ins/excel)


- `=IF(IFERROR(FIND("不良",B2),0),"不良品仓",IF(IFERROR(FIND("待检",B2),0),"待检仓",IF(IFERROR(FIND("报废",B2),0),"报废仓",IF(IFERROR(FIND("良",B2),0),"良品仓",""))))`
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