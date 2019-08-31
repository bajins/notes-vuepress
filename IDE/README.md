# IDE


* [navicat激活By DoubleLabyrinth](https://github.com/DoubleLabyrinth/navicat-keygen)

* [navicat激活By DeltaFoX/TeamURET](https://dfox.it/DeFconX/tags/navicat/)

* [Netsarang激活By DeltaFoX/TeamURET](https://dfox.it/DeFconX/tags/xmanager/)

* [IntelliJ IDEA 辅助工具](https://github.com/mrshawnho/ideaagent)

* [SublimeText插件](/IDE/SublimeText插件.md)

* [VisualStudioCode插件](/IDE/VisualStudioCodePlugins.md)


## Notepad

### 设置文本默认程序
- 替换Windows默认记事本
```batch
reg add "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /t REG_SZ /d "\"%ProgramFiles(x86)%\Notepad++\notepad++.exe\" -notepadStyleCmdline -z" /f
```

- 恢复系统记事本
```batch
reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
reg delete "HKLM\Software\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
reg delete "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /f
```

### `Tab`替换为空格
> 设置->首选项->语言->制表符设置->(勾选上)替换为空格

### 显示特殊字符
> 显示回车符，换行符，TAB键，行首，行尾等特殊字符

> 视图(V) ⇒ 显示符号 ⇒ 显示空格与制表符