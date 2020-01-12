# PowerShell


[[toc]]



## flag

* [Windows PowerShell,VBScript,JScript-Google趋势](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F03790v,%2Fm%2F080l1,%2Fm%2F01n3qp)

> 在`CMD`中执行`PowerShell`命令只需在命令前加`PowerShell`执行即可

* [https://github.com/PowerShell](https://github.com/PowerShell)

* [如何使用 PowerShell 文档](https://docs.microsoft.com/zh-cn/powershell/scripting/how-to-use-docs)

* [https://github.com/chocolatey](https://github.com/chocolatey)

* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)


## 命令

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
(New-Object System.Net.WebClient).DownloadFile('https://github.com/woytu/woytu.github.io/releases/download/v1.0/7za.exe','d:\\7za.exe')
```

- 恢复计算器

```powershell
Get-AppxPackage *calculator* -AllUsers| Foreach {Add-AppxPackage -DisableDevelopmentMode -Register "$($_.InstallLocation)\AppXManifest.xml"}
```
