# PowerShell

[[toc]]


## Flag

> `PowerShell`的命令叫做`cmdlet`(`command-let`), 采用了“动词-名词”的命名方式，动词部分取自于一个制定的动词集合，
> 名词部分则描述了命令要操作的对象。例如，`Get-Command`就是指获取`PowerShell`中所有`cmdlet`命令。

> `PowerShell`提供对`COM`（组件对象模型）和`WMI`（Windows管理规范）的完全访问，具有丰富的控制与自动化的系统管理能力，
> 能够轻松地做到实时、大规模的管理系统。获取本机所有`COM`组件对象脚本 [Get-COM-Objects.ps1](/files/Get-COM-Objects.ps1)

+ [https://github.com/janikvonrotz/awesome-powershell](https://github.com/janikvonrotz/awesome-powershell)
+ [https://github.com/PowerShell](https://github.com/PowerShell)

* [PowerShell 与 cmd 有什么不同？](https://www.zhihu.com/question/22611859/answers/updated)

- [https://docs.microsoft.com/zh-cn/powershell](https://docs.microsoft.com/zh-cn/powershell)
- [PowerShell参考文档](https://docs.microsoft.com/zh-cn/powershell/module/cimcmdlets/?view=powershell-7.1)
- [PowerShell为什么强大](https://www.pstips.net/why-is-powershell-powerful.html)
- [PowerShell 在线教程](https://www.pstips.net/powershell-online-tutorials)
- [Powershell入门指南(一)·PowerShell及CLI发展](https://zhuanlan.zhihu.com/p/60797627)
- [PowerShell入门指南(二)·挑战CMD和Bash的PowerShell](https://zhuanlan.zhihu.com/p/60798130)
- [PowerShell入门指南(三)·一门新的编程语言](https://zhuanlan.zhihu.com/p/76708298)
- [PowerShell提速和多线程](https://www.pstips.net/speeding-up-powershell-multithreading.html)
- [PowerShell - 随笔分类 - 门前有根大呲花 - 博客园](https://www.cnblogs.com/MerLin-LiuNian/category/2027025.html)
- WMIC替代品 [https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject)
- [https://docs.microsoft.com/zh-cn/powershell/module/cimcmdlets/get-ciminstance](https://docs.microsoft.com/zh-cn/powershell/module/cimcmdlets/get-ciminstance)
- [https://learn.microsoft.com/zh-cn/windows/win32/wmisdk](https://learn.microsoft.com/zh-cn/windows/win32/wmisdk)
- [https://forsenergy.com](https://forsenergy.com)
- [https://www.yiibai.com/powershell](https://www.yiibai.com/powershell)


* [https://github.com/R3MRUM/PSDecode](https://github.com/R3MRUM/PSDecode)
* [https://github.com/rootclay/Powershell-Attack-Guide](https://github.com/rootclay/Powershell-Attack-Guide)
* [https://github.com/rootclay/Windows-Access-Control](https://github.com/rootclay/Windows-Access-Control)
* [https://github.com/setupfw/win-sf](https://github.com/setupfw/win-sf)



## 包管理

* [https://github.com/microsoft/winget-cli](https://github.com/microsoft/winget-cli)
    * [https://github.com/microsoft/winget-pkgs](https://github.com/microsoft/winget-pkgs)
    * [https://docs.microsoft.com/zh-cn/windows/package-manager/winget](https://docs.microsoft.com/zh-cn/windows/package-manager/winget)
    * [https://github.com/marticliment/WingetUI](https://github.com/marticliment/WingetUI)
* [https://github.com/oneget/oneget](https://github.com/oneget/oneget)
    * [https://www.nuget.org](https://www.nuget.org)
    * [https://www.powershellgallery.com](https://www.powershellgallery.com)
* [https://github.com/chocolatey](https://github.com/chocolatey)
    * [https://chocolatey.org](https://chocolatey.org)
* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)
    * [https://github.com/ScoopInstaller](https://github.com/ScoopInstaller)
    * [https://github.com/lukesampson/scoop-extras](https://github.com/lukesampson/scoop-extras)
* [https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder)
* [https://github.com/appget](https://github.com/appget)





## 在batch中嵌入运行

* [PowerShell常用命令及使用方法](https://blog.csdn.net/Captain_RB/article/details/111604033)

> 由于Power Shell默认没有开启运行脚本策略，可以以此方式解决

> 正则表达式排除以`@`和`:`开头的行，并将其他所有内容传递给Power Shell

```batch
@findstr /v "^@.* ^:.*" "%~f0"|powershell -WindowStyle Hidden -ExecutionPolicy Bypass -&goto:eof
<# 从这里开始是 Power Shell代码 #>
```

> 这里巧妙的借用Power Shell的注释把bat脚本命令包裹，把整个脚本内容传入Power Shell并执行

```batch
<# ::
@powershell -WindowStyle Hidden -ExecutionPolicy Bypass -<%~f0 &goto:eof
#>
# 保存到bat文件中可以双击执行，从这里开始是Power Shell代码
```


## Windows10自带应用

> 注意空格和英文标点

- 查看已安装应用

```powershell
Get-AppxPackage | Select Name,PackageFullName

# 查看Windows已装的自带应用
Get-AppxProvisionedPackage -online | % {
    # 使用清单获取安装位置
    $loc = Split-Path ( [Environment]::ExpandEnvironmentVariables($_.InstallLocation) ) -Parent
    If ((Split-Path $loc -Leaf) -ieq 'AppxMetadata') {
        $loc = Split-Path $loc -Parent
    }
    # 获取查找相关文件夹的模式
    $matching = Join-Path -Path (Split-Path $loc -Parent) -ChildPath "$($_.DisplayName)*"
    $size = "{0:N2}MB" -f ((
        Get-ChildItem $matching -Recurse -ErrorAction Ignore | Measure-Object -Property Length -Sum
        ).Sum / 1MB)
    # 将结果添加到输出
    $_ | Add-Member -NotePropertyName Size -NotePropertyValue $size
    $_ | Add-Member -NotePropertyName InstallFolder -NotePropertyValue $loc
    $_
} | Select DisplayName, PackageName, Version, InstallFolder, Size
```

- 卸载应用程序

```powershell
# 卸载所有账户中的应用
Get-AppxPackage -AllUsers | Remove-AppxPackage
# 从系统账户中卸载应用
Get-AppXProvisionedPackage -online | Remove-AppxProvisionedPackage –online
# 应用商店
get-appxpackage *store* | remove-Appxpackage
# 日历、邮件
Get-AppxPackage Microsoft.windowscommunicationsapps | Remove-AppxPackage
get-appxpackage *communicationsapps* | remove-appxpackage
# 从系统账户中卸载日历、邮件应用
Get-AppXProvisionedPackage –online where-object {$_.packagename –like "*windowsmunicationsapps*"} | remove-appxprovisionedpackage –online
# 人脉
get-appxpackage *people* | remove-appxpackage
# Groove 音乐
get-appxpackage *zunemusic* | remove-appxpackage
# 电影和电视
get-appxpackage *zunevideo* | remove-appxpackage
# 财经
get-appxpackage *bingfinance* | remove-appxpackage
# 资讯
get-appxpackage *bingnews* | remove-appxpackage
# 体育
get-appxpackage *bingsports* | remove-appxpackage
# 天气
get-appxpackage *bingweather* | remove-appxpackage
# OneNote
get-appxpackage *onenote* | remove-appxpackage
# 便笺 https://onenote.com/stickynotes
get-appxpackage *stickynotes* | remove-appxpackage
# TODO https://to-do.microsoft.com
# https://www.microsoft.com/zh-cn/microsoft-365/microsoft-to-do-list-app
get-appxpackage *todo* | remove-appxpackage
# 闹钟和时钟
get-appxpackage *alarms* | remove-appxpackage
# 计算器
get-appxpackage *calculator* | remove-appxpackage
# 相机
get-appxpackage *camera* | remove-appxpackage
# 照片
get-appxpackage *photos* | remove-appxpackage
# 地图
get-appxpackage *maps* | remove-appxpackage
# 录音机
get-appxpackage *soundrecorder* | remove-appxpackage
# XBox
get-appxpackage *xbox* | remove-appxpackage
```

- 恢复应用程序

```powershell
# 应用商店
add-appxpackage -register "C:\Program Files\WindowsApps\*Store*\AppxManifest.xml" -disabledevelopmentmode
# 计算器
Get-AppxPackage *calculator* -AllUsers| Foreach {`
Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
# 日历、邮件
Get-AppxPackage Microsoft.windowscommunicationsapps -AllUsers| Foreach {`
Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
```


- 排除Windows Defender检查

```powershell
$exclusions=@("C:\Users\claer\Desktop\desktop-wallpaper-rust.exe"); `
$existingExclusions=[Collections.Generic.HashSet[String]](Get-MpPreference).ExclusionProcess; `
if($existingExclusions -eq $null) { $existingExclusions = New-Object Collections.Generic.HashSet[String] }; `
$exclusionsToAdd=[Linq.Enumerable]::ToArray([Linq.Enumerable]::Where($exclusions,[Func[object,bool]]{param($ex)!$existingExclusions.Contains($ex)})); `
if($exclusionsToAdd.Length -gt 0){ Add-MpPreference -ExclusionProcess $exclusionsToAdd }
```



## 随机字符串

> `48..57`是数字0-9，powershell的范围操作符是`..`，`65..90`是大写字符A到Z，`97..122`是小写字母。
> 如果需要获取多有的可打印字符（包括空格）的话，范围是`32..127`。

> `[char]`把对应数字转换成字符，例如 `[char](66)`就是B(大写字母B)，C语言使用的小括号来进行类型强制转换。

```powershell
# 如果不指定-count参数，则前面的list有多少个字符
# get-random就会获取多少个字符，只是顺序打乱了
-join((48..57 + 65..90 + 97..122) | get-random -count 6 | %{[char]$_})

# 输出19位数字字符串并在开头拼接x
(0..13|Get-Random -count 19) -join $null | %{-join ("X",$_)}

# 这里的0..1024相当于循环控制，每循环一次|后面的代码执行一次，
# 其中在数字字母中随机选一个字符 0..1024, like Perl, loop controller
-join(0..1024|%{[char][int]((48..57 + 65..90 + 97..122)| Get-Random)})

-join ([char[]](65..90+97..122) | Get-Random -Count 6)

Add-Type -AssemblyName System.Web;[System.Web.Security.Membership]::GeneratePassword(20, 0)

function Get-RandomString() {
    param(
    [int]$length=10,
    # 这里的[int]是类型指定
    [char[]]$sourcedata
    )

    for($loop=1; $loop –le $length; $loop++) {
            $TempPassword+=($sourcedata | GET-RANDOM | %{[char]$_})
    }
    return $TempPassword
}

Get-RandomString -length 14 -sourcedata (48..127)
```


## HTTP服务

```ps1
start-job { 
    $p="d:\"
    #$p = Get-Location.path #获取当前用户的目录
    $H=New-Object Net.HttpListener
    $H.Prefixes.Add("http://+:8889/")
    $H.Start()
    While ($H.IsListening) {
        $HC=$H.GetContext()
        $HR=$HC.Response
        $HR.Headers.Add("Content-Type","text/plain")

        $file=Join-Path $p ($HC.Request).RawUrl
        $text=[IO.File]::ReadAllText($file)
        $text=[Text.Encoding]::UTF8.GetBytes($text)

        $HR.ContentLength64 = $text.Length
        $HR.OutputStream.Write($text,0,$text.Length)
        $HR.Close()
    }
    $H.Stop()
}
```

## 弹窗

```ps1
$xaml = @"
<Window xmlns='http://schemas.microsoft.com/winfx/2006/xaml/presentation'>
 <Border BorderThickness='20' BorderBrush='Yellow' CornerRadius='9' Background='Red'>
  <StackPanel>
   <Label FontSize='50' FontFamily='Stencil' Background='Red' Foreground='White' BorderThickness='0'>
    System will be rebooted in 15 minutes!
   </Label>
   <Label HorizontalAlignment='Center' FontSize='15' FontFamily='Consolas' Background='Red' Foreground='White' BorderThickness='0'>
    Worried about losing data? Talk to your friendly help desk representative and freely share your concerns!
   </Label>
  </StackPanel>
 </Border>
</Window>
"@;
Add-Type -assemblyName PresentationFramework;
$reader = [System.XML.XMLReader]::Create([System.IO.StringReader] $xaml);
$window = [System.Windows.Markup.XAMLReader]::Load($reader);
$Window.AllowsTransparency = $True;
$window.SizeToContent = 'WidthAndHeight';
$window.ResizeMode = 'NoResize';
$Window.Opacity = .7;
$window.Topmost = $true;
$window.WindowStartupLocation = 'CenterScreen';
$window.WindowStyle = 'None';
$null = $window.Show();
Start-Sleep -Seconds 10;
$window.Close();
```

**单行输入框**

```powershell
# 首先，加载 System.Windows.Forms 程序集
Add-Type -AssemblyName System.Windows.Forms

# 创建输入框
$InputBox = New-Object System.Windows.Forms.Form
$InputBox.StartPosition = 'CenterScreen'
$InputBox.Size = New-Object System.Drawing.Size(300,200)
$InputBox.Topmost = $True

# 创建文本框并设置属性
$TextBox = New-Object System.Windows.Forms.TextBox
$TextBox.Location = New-Object System.Drawing.Point(10,10)
$TextBox.Size = New-Object System.Drawing.Size(260,20)
$InputBox.Controls.Add($TextBox)

# 创建确定按钮并设置属性
$OKButton = New-Object System.Windows.Forms.Button
$OKButton.Location = New-Object System.Drawing.Point(75,50)
$OKButton.Size = New-Object System.Drawing.Size(75,25)
$OKButton.Text = "OK"
$OKButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
$InputBox.Controls.Add($OKButton)
$InputBox.AcceptButton = $OKButton

# 显示输入框并等待用户操作
$Show = $InputBox.ShowDialog()

# 检查用户是否点击了确定按钮
if ($Show -eq [System.Windows.Forms.DialogResult]::OK)
{
    # 用户数据在这里
    $UserInput = $TextBox.Text
    $InputBox.Close()
    Write-Host "You entered: $UserInput"
}
else
{
    $InputBox.Close()
}
```

**多行输入框**

```powershell
# 引入 System.Windows.Forms 组件
Add-Type -AssemblyName System.Windows.Forms

# 创建一个新的表单（窗体）
$form = New-Object System.Windows.Forms.Form
$form.Text = 'Multi-line Input Box'
$form.Size = New-Object System.Drawing.Size(300,200)
$form.StartPosition = 'CenterScreen'

# 创建一个 Label，用来展示信息
$label = New-Object System.Windows.Forms.Label
$label.Location = New-Object System.Drawing.Point(10,10)
$label.Size = New-Object System.Drawing.Size(280,20)
$label.Text = 'Please enter your text:'
$form.Controls.Add($label)

# 创建一个 TextBox，用户可以在其中输入文字
$textbox = New-Object System.Windows.Forms.TextBox
$textbox.Location = New-Object System.Drawing.Point(10,40)
$textbox.Size = New-Object System.Drawing.Size(260,100)
$textbox.AcceptsReturn = $true
$textbox.Multiline = $true
$form.Controls.Add($textbox)

# 创建一个 OK 按钮来提交输入内容
$okButton = New-Object System.Windows.Forms.Button
$okButton.Location = New-Object System.Drawing.Point(10,150)
$okButton.Size = New-Object System.Drawing.Size(75,23)
$okButton.Text = 'OK'
$okButton.DialogResult = [System.Windows.Forms.DialogResult]::OK
$form.AcceptButton = $okButton
$form.Controls.Add($okButton)

# 展示表单
$form.Topmost = $true
$result = $form.ShowDialog()

# 按下 OK 按钮后获取 TextBox 中的内容
if ($result -eq [System.Windows.Forms.DialogResult]::OK)
{
    $input = $textbox.Text
    $form.Close()
    Write-Host "You entered: $input"
}
```



### 获取所有COM组件

```ps1
gci HKLM:\Software\Classes -ea 0| ? {$_.PSChildName -match '^\w+\.\w+$' -and (gp "$($_.PSPath)\CLSID" -ea 0)} | ft PSChildName
```

