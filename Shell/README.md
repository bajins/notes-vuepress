# Shell


[[toc]]



## Flag

* [https://en.wikipedia.org/wiki/Shell_(computing)](https://en.wikipedia.org/wiki/Shell_(computing))

- 命令行参考大全（Linux、macOS、CMD、PowerShell、VB Script）[https://ss64.com](https://ss64.com)
- [https://www.robvanderwoude.com](https://www.robvanderwoude.com)
- GUI [什么是X11-Forwarding](https://blog.csdn.net/weixin_41668084/article/details/113361765)




**命令助手**

- 命令补全 [https://github.com/scop/bash-completion](https://github.com/scop/bash-completion)
* [https://github.com/junegunn/fzf](https://github.com/junegunn/fzf)
* [https://github.com/beyondgrep/ack3](https://github.com/beyondgrep/ack3)
- [https://sourceforge.net/projects/zsh](https://sourceforge.net/projects/zsh)
- [https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
- [https://github.com/zsh-users/zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)
- [https://github.com/Bash-it/bash-it](https://github.com/Bash-it/bash-it)
- [https://github.com/0dayCTF/reverse-shell-generator](https://github.com/0dayCTF/reverse-shell-generator)
- 命令执行演示 [https://github.com/maaslalani/slides](https://github.com/maaslalani/slides)
- [https://github.com/d0c-s4vage/lookatme](https://github.com/d0c-s4vage/lookatme)
- [https://github.com/mobile-shell/mosh](https://github.com/mobile-shell/mosh)


* [https://github.com/google/zx](https://github.com/google/zx)



**`terminal`、`shell`、`tty`、`console` 之间的区别**

+ [`terminal`、`shell`、`tty`、`console` 之间的确切区别是什么？](https://unix.stackexchange.com/questions/4126/what-is-the-exact-difference-between-a-terminal-a-shell-a-tty-and-a-con)

- Kernel：任何现代操作系统的最内部，它直接与实际硬件交互
- terminal：真实用户坐在它后面的东西。 可能是物理终端（罕见）或伪终端（xterm、ssh）或虚拟终端（Linux 中的 vty）
- shell：俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器），帮助用户与系统交互的应用程序（bash、tcsh 等）。
- tty：支持终端的终端或内核子系统。
- console：报告状态和错误的东西 (/dev/console) 或连接到计算机的物理键盘和视频显示器。

* terminal = tty = text input/output environment
* console = physical terminal
* shell = command line interpreter


> 终端（Terminal）是控制台（Console）设备内的软件程序。shell是终端向用户发送输入的程序。shell生成输出并将其传回终端进行显示。



**sh、dash、bash、tcsh、csh、ash、bsh、ksh的区别**

> 文件头定义为`#!/bin/bash`, 且使用`bash xx.sh`执行； 文件头定义为`#!/bin/sh`, 且使用`sh xx.sh`执行遵照 POSIX 规范

- Bourne shell (sh)

> UNIX 最初使用，且在每种 UNIX 上都可以使用。在 shell 编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种shell

- C shell (csh) 一个语法上接近于C语言的shell
- Korn shell (ksh) 完全向上兼容 Bourne shell 并包含了 C shell 的很多特性
- Bourne Again shell (bash)

> Linux默认缺省shell。即 bash 是 Bourne shell 的扩展，与 Bourne shell 完全向后兼容，包含了很多 C shell 和 Korn shell 中的优点

- Debian Almquist Shell(dash)

> GNU/Linux 操作系统中的 /bin/sh 本是 bash (Bourne-Again Shell) 的符号链接，但鉴于 bash 过于复杂
> ，有人把 bash 从 NetBSD 移植到 Linux 并更名为 dash (Debian Almquist Shell)，并建议将 /bin/sh 指向它
> ，以获得更快的脚本执行速度。Dash Shell 比 Bash Shell 小的多，符合POSIX标准




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
# 设置为unix格式，dos为windows
:set ff=unix
# 保存
:wq
```

**[GIT处理换行符](/IDE/Git使用.md#换行符与大文件处理)**



## 文件编码转换

- [如何在 Linux 中将文件编码转换为 UTF-8](https://linux.cn/article-7959-1.html)
- [https://www.gnu.org/software/libiconv](https://www.gnu.org/software/libiconv)
    - [https://github.com/winlibs/libiconv](https://github.com/winlibs/libiconv)
    - [https://github.com/processone/iconv](https://github.com/processone/iconv)
- [https://github.com/qiniu/iconv](https://github.com/qiniu/iconv)
- [https://github.com/ashtuchkin/iconv-lite](https://github.com/ashtuchkin/iconv-lite)


**跨平台**

| 工具                  | 描述                 |
|---------------------|--------------------|
| iconv               | 提供标准的程序和API来进行编码转换 |
| convert_encoding.py | 基于Python的文本文件转换工具  |
| decodeh.py          | 提供算法和模块来谈测字符的编码    |


**Linux**

| 工具     | 描述               | 使用                      |
|--------|------------------|-------------------------|
| vim    | 转换文件编码      | `:set fileencoding=utf-8` |
| recode | 转换文件编码           |                         |
| Utrac  | 转换文件编码           |                         |
| cstocs | 转换文件编码           |                         |
| convmv | 转换文件名编码          | `convmv -f GBK -t UTF-8 --notest * -r` |
| enca   | 分析给定文件的编码        |                         |



**Windows**

| 工具    | 描述      |
|-------|---------|
| cscvt | 字符集转换工具 |




## 第三方SSH

> Secure Shell（SSH）/bourne shell(sh或bsh)/KornShell(ksh)

> OpenSSH 私钥后缀是`pem`，PuTTY 私钥后缀是`ppk`

* [https://github.com/alebcay/awesome-shell](https://github.com/alebcay/awesome-shell)
* [https://github.com/topics/fish](https://github.com/topics/fish)
* [https://github.com/topics/terminal](https://github.com/topics/terminal)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/topics/ssh-client](https://github.com/topics/ssh-client)
* [https://github.com/topics/ssh2](https://github.com/topics/ssh2)
* [https://github.com/topics/ssh](https://github.com/topics/ssh)
* [https://github.com/mskyaxl/wsl-terminal](https://github.com/mskyaxl/wsl-terminal)
* 主题配色 [https://github.com/mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)


- [https://github.com/topics/sftp](https://github.com/topics/sftp)
- [https://github.com/topics/sftp-client](https://github.com/topics/sftp-client)
- [https://github.com/topics/ftp-client](https://github.com/topics/ftp-client)


* [https://github.com/kingToolbox/WindTerm](https://github.com/kingToolbox/WindTerm)
* [https://github.com/janmojzis/tinyssh](https://github.com/janmojzis/tinyssh)
* [https://github.com/mkj/dropbear](https://github.com/mkj/dropbear)
* [https://github.com/nxshell](https://github.com/nxshell)
    * [https://sourceforge.net/projects/nxshell](https://sourceforge.net/projects/nxshell)
* [https://github.com/HaleyWang/SpringRemote](https://github.com/HaleyWang/SpringRemote)
* OpenSSH [https://github.com/openssl](https://github.com/openssl)
* [https://github.com/sfackler/rust-openssl](https://github.com/sfackler/rust-openssl)
* [https://github.com/openssh](https://github.com/openssh)
    * [https://www.openssh.com](https://www.openssh.com)
* [https://github.com/electerm/electerm](https://github.com/electerm/electerm)
* [https://github.com/nvbn/thefuck](https://github.com/nvbn/thefuck)
* [https://github.com/Eugeny/tabby](https://github.com/Eugeny/tabby)


- [https://www.termius.com](https://www.termius.com)


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


