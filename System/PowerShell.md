# PowerShell


[[toc]]



## flag

* [Windows PowerShell,VBScript,JScript-Google趋势](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F03790v,%2Fm%2F080l1,%2Fm%2F01n3qp)

> 在`CMD`中执行`PowerShell`命令只需在命令前加`PowerShell`执行即可

* [PowerShell 与 cmd 有什么不同？](https://www.zhihu.com/question/22611859/answers/updated)

* [PowerShell为什么强大](https://www.pstips.net/why-is-powershell-powerful.html)


* [如何使用 PowerShell 文档](https://docs.microsoft.com/zh-cn/powershell/scripting/how-to-use-docs)

* [PowerShell 在线教程](https://www.pstips.net/powershell-online-tutorials)

---

* [https://github.com/PowerShell](https://github.com/PowerShell)

* [https://github.com/oneget/oneget](https://github.com/oneget/oneget) [https://www.nuget.org](https://www.nuget.org)

* [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
---

* [https://github.com/chocolatey](https://github.com/chocolatey)

* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)


* [安装适用于 Linux 的 Windows 子系统](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10)


---

* [https://github.com/topics/windows](https://github.com/topics/windows)

* [https://github.com/appget](https://github.com/appget)

* [https://github.com/x64dbg](https://github.com/x64dbg)

* [https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder)

* [https://github.com/Eugeny/terminus](https://github.com/Eugeny/terminus)

* [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)



## 命令

- 查看版本

```powershell
# 查看Power Shell版本
$PSVersionTable.PSVersion.Major
$host.Version.Major

# 查看当前PowerShell的.Net运行版本
$PSVersionTable.CLRVersion
# 查看所有安装的.Net 版本
dir 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' | sort-object name -Descending | select-object -ExpandProperty PSChildName

# 查看安装的.Net 客户端版本
(Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Client' -Name Version).Version
```

- 为本账户启用策略

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
