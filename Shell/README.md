# Shell


[[toc]]



## Flag

> Shell俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器），
> Shell也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面

> 终端（Terminal）是控制台（Console）设备内的软件程序。shell是终端向用户发送输入的程序。shell生成输出并将其传回终端进行显示。

* [https://en.wikipedia.org/wiki/Shell_(computing)](https://en.wikipedia.org/wiki/Shell_(computing))

- 命令行参考大全（Linux、macOS、CMD、PowerShell、VB Script）[https://ss64.com](https://ss64.com)
- [https://www.robvanderwoude.com](https://www.robvanderwoude.com)
- [流行的 Linux 发行版包管理器命令的对应关系](https://wiki.archlinux.org/index.php/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Rosetta_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
- [Linux包管理器及包安装工具基础知识](https://blog.csdn.net/u013430110/article/details/107329350)
- GUI [什么是X11-Forwarding](https://blog.csdn.net/weixin_41668084/article/details/113361765)

+ 包管理器 [https://github.com/Homebrew](https://github.com/Homebrew)
+ [https://github.com/AppImage](https://github.com/AppImage)
+ [https://github.com/flatpak/flatpak](https://github.com/flatpak/flatpak)
+ [https://github.com/snapcore/snapd](https://github.com/snapcore/snapd)
+ 多个shell软件包镜像 [https://github.com/mirror](https://github.com/mirror)
+ [https://github.com/nushell/nushell](https://github.com/nushell/nushell)

- 命令补全 [https://github.com/scop/bash-completion](https://github.com/scop/bash-completion)
- [https://sourceforge.net/projects/zsh](https://sourceforge.net/projects/zsh)
- [https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
- [https://github.com/Bash-it/bash-it](https://github.com/Bash-it/bash-it)
- [https://github.com/0dayCTF/reverse-shell-generator](https://github.com/0dayCTF/reverse-shell-generator)
- 命令执行演示 [https://github.com/maaslalani/slides](https://github.com/maaslalani/slides)
- [https://github.com/d0c-s4vage/lookatme](https://github.com/d0c-s4vage/lookatme)
- [https://github.com/mobile-shell/mosh](https://github.com/mobile-shell/mosh)



**第三方的软件包搜索引擎：**

- http://pkgs.org
- http://rpmfind.net
- http://rpm.pbone.net



**推荐所有shell脚本都使用sh实现，[Windows可安装Git（集成MinGW-w64）、MinGW-w64、MSYS2、Cygwin](/Shell/ShellWindows.md)**
**Windows10下推荐使用WSL**



## 行尾序列

> 又叫行尾符、换行符

* [https://zh.wikipedia.org/wiki/換行](https://zh.wikipedia.org/wiki/%E6%8F%9B%E8%A1%8C)
* [https://zh.wikipedia.org/wiki/控制字符](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%AD%97%E7%AC%A6)

- `CR`：Carriage Return，对应ASCII十进制是`13`, 十六进制`0x0D`，转义字符`\r`，表示回车，MacIntosh操作系统（Mac OSX 10.9之前）使用
- `LF`：Linefeed，对应ASCII十进制是`10`, 十六进制`0x0A`，转义字符`\n`，表示换行，Unix/Linux/MacOSX使用
- `CRLF`：Carriage Return & Linefeed，`\r\n`，表示回车并换行，Dos和Windows使用

**Linux**

```vim
# 显示格式。
:set ff
# 设置为unix格式
:set ff=unix
# 保存
:wq
```

**[GIT处理换行符](/IDE/Git使用.md#换行符与大文件处理)**




## batch与shell同义操作符

| batch                  	| Shell                   	| 作用                             	|
|------------------------	|-------------------------	|----------------------------------	|
| %                      	| $                       	| 命令行参数前缀                   	|
| /                      	| -                       	| 命令选项标记                     	|
| \                      	| /                       	| 目录路径分隔符                   	|
| ==                     	| =                       	| (等于)字符串比较测试             	|
| !==!                   	| !=                      	| (不等)字符串比较测试             	|
| \|                     	| \|                     	| 管道：前一条命令的输出，作为后一条命令参数 |
| \|\|                      | \|\|                     	| 前一条命令执行失败，才执行后一条命令	|
| &                      	| &                       	| 前后所有命令都执行，不管成功与否 	|
| &&                     	| &&                      	| 前一个命令执行成功，才执行后一个 	|
| ;                      	| ;                       	| 前后所有命令都执行，不管成功与否 	|
| @                      	| set +v                  	| 不打印当前命令                   	|
| *                      	| *                       	| 文件名"通配符"                   	|
| >                      	| >                       	| 文件重定向(覆盖)                 	|
| >>                     	| >>                      	| 文件重定向(附加)                 	|
| <                      	| <                       	| 重定向stdin                      	|
| ^                      	| \\                       	| 命令换行执行，PowerShell为`(反引号) |
| %VAR%                  	| $VAR                    	| 环境变量                         	|
| REM                    	| #                       	| 注释                             	|
| NOT                    	| !                       	| 取反                             	|
| NUL                    	| /dev/null               	| "黑洞"用来阻止命令输出           	|
| ECHO                   	| echo                    	| 打印(Bash中有更多选项)           	|
| ECHO.                  	| echo                    	| 打印空行                         	|
| ECHO OFF               	| set +v                  	| 不打印后续的命令                 	|
| FOR %%VAR IN (LIST) DO 	| for var in [list]; do   	| "for"循环                        	|
| :LABEL                 	| 没有等价物(多余)        	| 标签                             	|
| GOTO                   	| 没有等价物(使用函数)    	| 跳转到脚本的另一个位置           	|
| PAUSE                  	| sleep                   	| 暂停或等待一段时间               	|
| CHOICE                 	| case or select          	| 菜单选择                         	|
| IF                     	| if                      	| if条件语句                       	|
| IF EXIST FILENAME      	| if [ -e filename ]      	| 测试文件是否存在                 	|
| IF !%N==!              	| if [ -z "$N" ]          	| 参数"N"是否存在                  	|
| CALL                   	| source命令或.(点操作符) 	| "include"另一个脚本              	|
| COMMAND /C             	| source命令或.(点操作符) 	| "include"另一个脚本(与CALL相同)  	|
| SET                    	| export                  	| 设置一个环境变量                 	|
| SHIFT                  	| shift                   	| 左移命令行参数列表               	|
| SGN                    	| -lt或-gt                	| (整形)符号                       	|
| ERRORLEVEL             	| $?                      	| 退出状态                         	|
| CON                    	| stdin                   	| "控制台"(stdin)                  	|
| PRN                    	| /dev/lp0                	| (一般的)打印设备                 	|
| LPT1                   	| /dev/lp0                	| 第一个打印设备                   	|
| COM1                   	| /dev/ttyS0              	| 第一个串口                       	|



## batch与shell同义命令

|   DOS    |   UNIX       |      作用     |
|---------|-----------------|--------------|
| ASSIGN  | ln              | 链接文件或目录      |
| ATTRIB  | chmod           | 修改文件权限       |
| CD      | cd              | 更换目录         |
| CHDIR   | cd              | 更换目录         |
| CLS     | clear           | 清屏           |
| COMP    | diff, comm, cmp | 文件比较         |
| COPY    | cp              | 文件拷贝         |
| Ctl-C   | Ctl-C           | 中断(信号)       |
| Ctl-Z   | Ctl-D           | EOF(文件结束)    |
| DEL     | rm              | 删除文件         |
| DELTREE | rm -rf          | 递归删除目录       |
| DIR     | ls -l           | 列出目录内容       |
| ERASE   | rm              | 删除文件         |
| EXIT    | exit            | 退出当前进程       |
| FC      | comm, cmp       | 文件比较         |
| FIND    | grep            | 在文件中查找字符串    |
| MD      | mkdir           | 新建目录         |
| MKDIR   | mkdir           | 新建目录         |
| MORE    | more            | 分页显示文本文件     |
| MOVE    | mv              | 移动文件         |
| PATH    | $PATH           | 可执行文件的路径     |
| REN     | mv              | 重命名(移动)      |
| RENAME  | mv              | 重命名(移动)      |
| RD      | rmdir           | 删除目录         |
| RMDIR   | rmdir           | 删除目录         |
| SORT    | sort            | 排序文件         |
| TIME    | date            | 显示系统时间       |
| TYPE    | cat             | 将文件输出到stdout |
| XCOPY   | cp              | (扩展的)文件拷贝    |




## Windows第三方工具

+ 扫描任何32位或64位Windows模块（exe，dll，ocx，sys等）的函数：[http://www.dependencywalker.com](http://www.dependencywalker.com)
+ DLL导出查看器：[http://www.nirsoft.net/utils/dll_export_viewer.html](http://www.nirsoft.net/utils/dll_export_viewer.html)
+ RegDllView-查看系统上已注册的dll/ ocx/exe文件，从资源管理器注册dll文件：
    + [http://www.nirsoft.net/utils/registered_dll_view.html](http://www.nirsoft.net/utils/registered_dll_view.html)
+ Windows 10的system32目录中的所有DLL文件信息：[http://windows10dll.nirsoft.net](http://windows10dll.nirsoft.net)
+ [https://github.com/jas502n/IDA_Pro_7.2](https://github.com/jas502n/IDA_Pro_7.2)
+ 下载– NTCore：[https://ntcore.com/?page_id=345](https://ntcore.com/?page_id=345)
+ 小型命令行实用程序：[http://www.ltr-data.se/opencode.html/#CmdUtils](http://www.ltr-data.se/opencode.html/#CmdUtils)
* wget-网络请求工具 [https://eternallybored.org/misc/wget](https://eternallybored.org/misc/wget)
* curl-网络请求工具 [https://github.com/curl/curl](https://github.com/curl/curl)
* jq-解析json工具 [https://github.com/stedolan/jq](https://github.com/stedolan/jq)
* 转换位图图像 [https://github.com/ImageMagick](https://github.com/ImageMagick)
* [https://github.com/ritchielawrence/cmdow](https://github.com/ritchielawrence/cmdow)




## SSH

> Secure Shell（SSH）/bourne shell(sh或bsh)/KornShell(ksh)

> OpenSSH 私钥后缀是`pem`，PuTTY 私钥后缀是`ppk`

* [https://github.com/alebcay/awesome-shell](https://github.com/alebcay/awesome-shell)
* [https://github.com/topics/fish](https://github.com/topics/fish)
* [https://github.com/topics/terminal](https://github.com/topics/terminal)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/topics/ssh-client](https://github.com/topics/ssh-client)
* [https://github.com/topics/ssh2](https://github.com/topics/ssh2)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/topics/remote-access](https://github.com/topics/remote-access)
* [https://github.com/mskyaxl/wsl-terminal](https://github.com/mskyaxl/wsl-terminal)

- [https://github.com/topics/sftp](https://github.com/topics/sftp)
- [https://github.com/topics/sftp-client](https://github.com/topics/sftp-client)
- [https://github.com/topics/ftp-client](https://github.com/topics/ftp-client)

* [https://github.com/janmojzis/tinyssh](https://github.com/janmojzis/tinyssh)
* [https://github.com/mkj/dropbear](https://github.com/mkj/dropbear)
* [https://github.com/HaleyWang/SpringRemote](https://github.com/HaleyWang/SpringRemote)
* OpenSSH [https://github.com/openssl](https://github.com/openssl)
* [https://github.com/openssh](https://github.com/openssh)
    * [https://www.openssh.com](https://www.openssh.com)
* [https://github.com/electerm/electerm](https://github.com/electerm/electerm)
* [https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck)


**WEB**

* [https://github.com/xtermjs/xterm.js](https://github.com/xtermjs/xterm.js)
* [https://github.com/huashengdun/webssh](https://github.com/huashengdun/webssh)
* [https://github.com/billchurch/WebSSH2](https://github.com/billchurch/WebSSH2)
* [https://github.com/mscdex/ssh2](https://github.com/mscdex/ssh2)


**Android**

+ [SSH client for Android](https://github.com/search?q=SSH+client+for+Android)

* [https://github.com/topics/termux](https://github.com/topics/termux)
    * [https://github.com/termux](https://github.com/termux)
* [https://github.com/connectbot/connectbot](https://github.com/connectbot/connectbot)
* [https://www.juicessh.com](https://www.juicessh.com)
* [https://github.com/niklas-8/RemoteFiles](https://github.com/niklas-8/RemoteFiles)



**Windows终端复用器**

+ [https://github.com/topics/windows](https://github.com/topics/windows)
+ [https://github.com/topics/putty](https://github.com/topics/putty)
+ [https://github.com/topics/kitty](https://github.com/topics/kitty)

- [https://docs.microsoft.com/zh-cn/documentation](https://docs.microsoft.com/zh-cn/documentation)

* [https://github.com/PowerShell/openssh-portable](https://github.com/PowerShell/openssh-portable)
    * [https://github.com/PowerShell/Win32-OpenSSH/wiki](https://github.com/PowerShell/Win32-OpenSSH/wiki)
* [https://github.com/microsoft/terminal](https://github.com/microsoft/terminal)
    * [https://docs.microsoft.com/zh-cn/windows/terminal](https://docs.microsoft.com/zh-cn/windows/terminal)
* [https://github.com/appget](https://github.com/appget)
* [https://github.com/x64dbg](https://github.com/x64dbg)
* [https://github.com/Maximus5/ConEmu](https://github.com/Maximus5/ConEmu)
* [https://github.com/Eugeny/terminus](https://github.com/Eugeny/terminus)
* [https://github.com/Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater)
* [https://github.com/vercel/hyper](https://github.com/vercel/hyper)
* PuTTY [https://www.chiark.greenend.org.uk/~sgtatham/putty](https://www.chiark.greenend.org.uk/~sgtatham/putty)
* [https://github.com/portapps/kitty-portable](https://github.com/portapps/kitty-portable)
* [https://github.com/cyd01/KiTTY](https://github.com/cyd01/KiTTY)
* MobaXterm [https://www.mobatek.net](https://www.mobatek.net)




