# PowerShell


[[toc]]



## Flag

> `PowerShell`的命令叫做`cmdlet`(`command-let`), 采用了“动词-名词”的命名方式，动词部分取自于一个制定的动词集合，
> 名词部分则描述了命令要操作的对象。例如，`Get-Command`就是指获取`PowerShell`中所有`cmdlet`命令。

> `PowerShell`提供对`COM`（组件对象模型）和`WMI`（Windows管理规范）的完全访问，具有丰富的控制与自动化的系统管理能力，
> 能够轻松地做到实时、大规模的管理系统。获取本机所有`COM`组件对象脚本 [Get-COM-Objects.ps1](/files/Get-COM-Objects.ps1)

* [PowerShell 与 cmd 有什么不同？](https://www.zhihu.com/question/22611859/answers/updated)
* [PowerShell为什么强大](https://www.pstips.net/why-is-powershell-powerful.html)

- [PowerShell参考文档](https://docs.microsoft.com/zh-cn/powershell/module/cimcmdlets/?view=powershell-7.1)
- [PowerShell 在线教程](https://www.pstips.net/powershell-online-tutorials)

* [https://github.com/PowerShell](https://github.com/PowerShell)
* [安装适用于 Linux 的 Windows 子系统](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)

- WMIC 已弃用替代品 [Get-WmiObject](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject)
- WMIC 已弃用替代品 [Get-CimInstance](https://docs.microsoft.com/zh-cn/powershell/module/cimcmdlets/get-ciminstance)



## 包管理

* [https://github.com/microsoft/winget-cli](https://github.com/microsoft/winget-cli)
* [https://github.com/oneget/oneget](https://github.com/oneget/oneget)
    * [https://www.nuget.org](https://www.nuget.org)
    * [https://www.powershellgallery.com](https://www.powershellgallery.com)
* [https://github.com/chocolatey](https://github.com/chocolatey)
    * [https://chocolatey.org](https://chocolatey.org)
* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)
    * [https://github.com/ScoopInstaller](https://github.com/ScoopInstaller)
    * [https://github.com/lukesampson/scoop-extras](https://github.com/lukesampson/scoop-extras)
* [https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder)
* [https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)





## 在batch中嵌入运行

> 由于Power Shell默认没有开启运行脚本策略，可以以此方式解决

> 正则表达式排除以`@`和`:`开头的行，并将其他所有内容传递给Power Shell

```batch
@findstr /v "^@.* ^:.*" "%~f0"|powershell -&goto:eof
<# 从这里开始是 Power Shell代码 #>
```

> 这里巧妙的借用Power Shell的注释把bat脚本命令包裹，把整个脚本内容传入Power Shell并执行

```batch
<# ::
@powershell -<%~f0 &goto:eof
#>
# 从这里开始是 Power Shell代码
```


## Windows10自带应用

> 注意空格和英文标点

- 查看已安装应用

```powershell
Get-AppxPackage | Select Name,PackageFullName
```

- 恢复应用程序

```powershell
# 应用商店
add-appxpackage -register "C:\Program Files\WindowsApps\*Store*\AppxManifest.xml" -disabledevelopmentmode
# 计算器
Get-AppxPackage *calculator* -AllUsers| Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
# 日历、邮件
Get-AppxPackage Microsoft.windowscommunicationsapps -AllUsers| Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
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



## 命令

> `ASCII` 为无BOM`UTF-8`编码

```powershell
# 查看输出的命令集
Get-Command -verb out

Export-Csv
Export-CliXML
Out-file
Out-GridView
ConvertTo-HTML | Out-file
```

- 查看版本

```powershell
# 查看Power Shell版本
$PSVersionTable.PSVersion
$host.Version.Major

# 查看当前PowerShell的.Net运行版本
$PSVersionTable.CLRVersion
# 查看所有安装的.Net 版本
dir 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' | sort-object name -Descending | select-object -ExpandProperty PSChildName

# 查看安装的.Net 客户端版本
(Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Client' -Name Version).Version
```

- 为本账户启用执行脚本策略

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

- 下载代码并通过`Invoke-Expression`执行

```powershell
Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')
```

- 下载文件

```powershell
(New-Object System.Net.WebClient).DownloadFile('https://git.io/JvYAg','d:\\7za.exe')
```

- 选择文件夹弹窗

```powershell
function Select-FolderDialog{
    param([string]$Directory,[string]$Description,[boolean]$ShowNewFolderButton)
    [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") | Out-Null
    $objForm = New-Object System.Windows.Forms.FolderBrowserDialog
    $objForm.RootFolder = $Directory
    $objForm.Description = $Description
    $objForm.ShowNewFolderButton = $ShowNewFolderButton
    $Show = $objForm.ShowDialog()
    If ($Show -eq "OK") {
        Return $objForm.SelectedPath
    } Else {
        # 输出错误信息
        Write-Error "error information here"
    }
}
```


- 循环目录

```powershell
# 获取子目录和文件并遍历
Get-ChildItem . | ForEach-Object -Process {
    $project_name = $_.Name
    # 如果为子目录
    if ($_ -is [System.IO.DirectoryInfo]) {
        # 切换到子目录
        Set-location $_.FullName
        # 判断目录是否存在
        if (Test-Path .git) {
            git remote -v
            Write-Host("".PadLeft(15, "*") + "开始更新 $project_name ".PadRight(30, "*"));
            git pull
        }
        Set-Location ..
    }
}
```

- 创建文件夹

```powershell
New-Item -ItemType directory -Path 目录的路径
```

- 复制文件及目录结构

```powershell
# 源路径最后一个文件夹名为需要复制的目录结构的顶级文件夹名
Copy-Item -Force -Recurse 源路径 目标路径 -Filter 文件名
```

- 删除空目录

```powershell
Get-ChildItem -Path 路径 -Recurse -Force `
| Where-Object { $_.PSIsContainer -and `
    (Get-ChildItem -Path $_.FullName -Recurse -Force `
    | Where-Object { !$_.PSIsContainer }) -eq $null } `
| Remove-Item -Force -Recurse

Get-ChildItem -recurse | Where {$_.PSIsContainer -and `
@(Get-ChildItem -Lit $_.Fullname -r | Where {!$_.PSIsContainer}).Length -eq 0} `
| Remove-Item -recurse -whatif

get-childitem -recurse | ? {$_.GetType() -match"DirectoryInfo"} `
| ?{ $_.GetFiles().Count -eq 0 -and $_.GetDirectories().Count -eq 0 } | rm -whatif

ls -recurse | where {!@(ls -force $_.fullname)} | rm -whatif -Force
```

- 递归删除排除之外的文件

```powershell
dir -Path 源路径 -Include *.* -Exclude @('test.js','test.css','a*') -Recurse | del -Recurse
```

- 删除旧文件（指定日期之前的）

```powershell
Get-ChildItem -recurse | Where {!$_.PSIsContainer -and `
$_.LastWriteTime -lt (get-date).AddDays(-31)} | Remove-Item -whatif

Get-ChildItem -Path 路径 -Recurse -Force `
| Where-Object { !$_.PSIsContainer -and $_.CreationTime -lt (Get-Date).AddDays(-15) } `
| Remove-Item -Force

get-childitem -recurse | ? {$_.GetType() -match"FileInfo"} `
| ?{ $_.LastWriteTime -lt [datetime]::now.adddays(-30) } | rm -whatif -Force
```

- 格式化时间

```powershell
Get-Date -Format 'yyy-MM-dd hh:mm:ss'
```

- 下载安装7z

```powershell
$response = Invoke-WebRequest -Uri https://www.7-zip.org/download.html
# 获取文件名
$match = $response.Content | Select-String -Pattern '<A href="(?<url>a\/7z\d+-x64\.msi)">Download<\/A>'
# 拼接下载url
$url = "https://www.7-zip.org/" + $match.Matches[0].Groups['url'].Value
# 请求下载
Invoke-WebRequest -Uri $url -OutFile 7zip.msi
# 使用msiexec解压msi到7zip目录
$process = Start-Process msiexec -ArgumentList "/a 7zip.msi /qn TARGETDIR=`"$(Get-Location)\7zip`"" -PassThru
Wait-Process -Id $process.id
Move-Item 7zip/Files/7-Zip/7z.exe 7z.exe -Force
Move-Item 7zip/Files/7-Zip/7z.dll 7z.dll -Force
Remove-Item –path 7zip –Recurse
Remove-Item –path 7zip.msi
```


**调用DLL**

```powershell
[DllImport("kernel32.dll")]
private static extern int GetPrivateProfileSection(string lpAppName, byte[] lpszReturnBuffer, int nSize, string lpFileName);

Function Lock-WorkStation {
    $signature = @"
        [DllImport("user32.dll", SetLastError = true)]
        public static extern bool LockWorkStation();
    "@
    
    $LockWorkStation = Add-Type -memberDefinition $signature -name "Win32LockWorkStation" -namespace Win32Functions -passthru
    $LockWorkStation::LockWorkStation() | Out-Null
}
```




**解压zip**

* [压缩解压文件](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.archive)
* [PowerShell-压缩解压缩文件](https://blog.csdn.net/ahxdyz/article/details/93534213)

- PowerShell 5.0或更高版本(已预安装Windows 10和Windows Server 2016)

```powershell
Compress-Archive -Path 解压到目录路径 -DestinationPath 压缩文件路径
Expand-Archive -Path 解压到目录路径 -DestinationPath 压缩文件路径 -Force:$Overwrite
```

- 需要.net 4.5以上

```powershell
Add-Type -assembly "system.io.compression.filesystem"
[io.compression.zipfile]::ExtractToDirectory(压缩文件路径, 解压到目录路径)
```

- PowerShell 2.0以上

```powershell
function UnzipFile([string]$sourceFile, [string]$targetFolder){
    if(!(Test-Path $targetFolder)){
        mkdir $targetFolder
    }
    $shellApp = New-Object -ComObject Shell.Application
    $files = $shellApp.NameSpace($souceFile).Items()
    # foreach ($item in $files) {
    #     $shell.Namespace($targetFolder).CopyHere($item)
    # }
    $shellApp.NameSpace($targetFolder).CopyHere($files)
}
```


### 事件计划任务

* [Scheduled Tasks（计划任务）](https://www.holoem.com/?p=1974)


**使用Get-WinEvent**

* [Get-WinEvent](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.diagnostics/get-winevent)

```powershell
Get-Help Get-WinEvent

Get-WinEvent @{logname='application','system'} -MaxEvents 1
# 列出所有事件日志
Get-WinEvent -ListLog *
# powershell管理员权限下获取安全事件日志
Get-WinEvent -FilterHashtable @{LogName='Security'}
# 过滤安全事件ID 4624
Get-WinEvent -FilterHashtable @{LogName='Security';ID='4624'}
# 查询今天的应用和系统日志，显示前2条
Get-WinEvent @{logname='application','system';starttime=[datetime]::today } -MaxEvents 2
# 根据ID查询事件
Get-WinEvent -LogName Microsoft-Windows-PowerShell/Operational | Where-Object {$_.ID -eq "4100" -or $_.ID -eq "4104"}
# 查询指定时间内的事件
$StartTime=Get-Date  -Year  2020  -Month  3  -Day  1  -Hour  15  -Minute  30
$EndTime=Get-Date  -Year  2020  -Month  3  -Day  15  -Hour  20  -Minute  00
Get-WinEvent -FilterHashtable @{LogName='System';StartTime=$StartTime;EndTime=$EndTime}
```

**使用Get-EventLog**

* [Get-EventLog](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-eventlog)
* [PowerShell 监听事件日志](https://www.pstips.net/monitoring-eventlog.html)
* [Powershell获取睡眠时间](https://www.pstips.net/get-sleep-and-hibernation-times.html)

```powershell
Get-Help Get-EventLog

Get-EventLog -LogName system -Source user32
# 按 EventID 将事件进行分组
Get-EventLog -LogName system -Source user32 | group EventID
# fl 是 Format-List 的别名
Get-EventLog -LogName system -Source user32 -Newest 1 | fl *
Get-EventLog -LogName system -Source user32 | Select TimeGenerated, Message
Get-EventLog -LogName system -Source user32 | Select TimeGenerated, Message | sort message
Get-EventLog -LogName system -Source user32 | Select TimeGenerated, Message | sort message | ft -Wrap
```

**定时任务**

- 查看支持的命令

```powershell
Get-Command -Module ScheduledTasks
```

```powershell
# 此例子为每5分钟一次的定时任务，通过设置$step和$add可以实现延时执行任务。 
function waitsec{
    $step=300 #设置间隔
    $add=0 #设置延时
    $t=(get-date)
    $step-(($t.Hour*3600+$t.Minute*60+$t.Second)%$step)+$add
}
 
write-host "running...... please wait" (waitsec)"S" 
Start-Sleep -s (waitsec)
while(1){
    # 执行代码
    get-date
    Start-Sleep -s (waitsec)
}
```



### 系统环境变量


- 列出所有的环境变量：`Get-ChildItem env:` 同 `dir env:`

- 获取环境变量的值：`$env:变量名`


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