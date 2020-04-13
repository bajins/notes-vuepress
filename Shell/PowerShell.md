# PowerShell


[[toc]]



## flag

> `PowerShell`的命令叫做`cmdlet`(`command-let`), 采用了“动词-名词”的命名方式，动词部分取自于一个制定的动词集合，
> 名词部分则描述了命令要操作的对象。例如，`Get-Command`就是指获取`PowerShell`中所有`cmdlet`命令。

> `PowerShell`提供对`COM`（组件对象模型）和`WMI`（Windows管理规范）的完全访问，具有丰富的控制与自动化的系统管理能力，
> 能够轻松地做到实时、大规模的管理系统。获取本机所有`COM`组件对象脚本 [Get-COM-Objects.ps1](/files/Get-COM-Objects.ps1)

* [PowerShell 与 cmd 有什么不同？](https://www.zhihu.com/question/22611859/answers/updated)
* [PowerShell为什么强大](https://www.pstips.net/why-is-powershell-powerful.html)

- [如何使用 PowerShell 文档](https://docs.microsoft.com/zh-cn/powershell/scripting/how-to-use-docs)
- [PowerShell 在线教程](https://www.pstips.net/powershell-online-tutorials)

* [https://github.com/PowerShell](https://github.com/PowerShell)
* [安装适用于 Linux 的 Windows 子系统](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)


**包管理**

* [https://github.com/oneget/oneget](https://github.com/oneget/oneget) [https://www.nuget.org](https://www.nuget.org)
* [https://github.com/chocolatey](https://github.com/chocolatey)
* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)
* [https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder)



**终端**

* [https://github.com/topics/windows](https://github.com/topics/windows)
* [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
* [https://github.com/appget](https://github.com/appget)
* [https://github.com/x64dbg](https://github.com/x64dbg)
* [https://github.com/Maximus5/ConEmu](https://github.com/Maximus5/ConEmu)
* [https://github.com/Eugeny/terminus](https://github.com/Eugeny/terminus)
* [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)




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


## 命令

* [压缩解压文件](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.archive)

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

- 恢复计算器

```powershell
Get-AppxPackage *calculator* -AllUsers| Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
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

### 系统环境变量


- 列出所有的环境变量：`Get-ChildItem env:` 同 `dir env:`

- 获取环境变量的值：`$env:变量名`


