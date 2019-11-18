# VPS


* [flag](#flag)
* [资源网站建立](#资源网站建立)
* [WebSSH2](#webssh2)
  * [下载](#下载)
  * [修改源码使其支持秘钥登录](#修改源码使其支持秘钥登录)
  * [运行](#运行)
* [batch与shell同等意义操作符](#batch与shell同义操作符)
* [batch与shell同等意义命令](#batch与shell同义命令)




> CentOS官方已宣布在2020年停止对CentOS6的维护更新，各大软件开发商也逐渐停止对CentOS6的兼容，建议使用CentOS7


## flag

* [思维导图](https://github.com/search?o=desc&q=%E6%80%9D%E7%BB%B4%E5%AF%BC%E5%9B%BE&s=updated&type=Repositories)

* [http://github.lesschina.com/linux](http://github.lesschina.com/linux)

* [https://mm.edrawsoft.cn/community/15/1](https://mm.edrawsoft.cn/community/15/1)

* [https://github.com/cmderdev/cmder](https://github.com/cmderdev/cmder)

* [showdoc](https://github.com/star7th/showdoc)

* [https://github.com/connectbot/connectbot](https://github.com/connectbot/connectbot)



* [speedtest](https://github.com/adolfintel/speedtest)

* [acme.sh 实现了acme 协议, 可以从 letsencrypt 生成免费的证书.](https://github.com/Neilpang/acme.sh)




## 资源网站建立

* [php-zdir本地网盘](https://github.com/helloxz/zdir)

* [rclone](https://github.com/ncw/rclone)

* [ShareList 是一个易用的网盘工具，支持快速挂载 GoogleDrive、OneDrive ](https://github.com/reruin/sharelist)

* [OLAINDEX OneDrive目录文件索引应用](https://github.com/WangNingkai/OLAINDEX)

* [PyOne基于Python的onedrive文件本地化浏览系统](https://github.com/abbeyokgo/PyOne)

* [萌音影视 - 在线影视应用](https://github.com/178146582/moeins)
[安装教程](https://www.moerats.com/archives/744/)

* [使用FileManager+基于Python3的爬虫程序建立影音图片库](https://www.moerats.com/archives/501/)

* [使用PlayTube搭建私人的视频网站](https://www.moerats.com/archives/644/)

* [开源有态度的漫画CMS](https://github.com/hiliqi/xiaohuanxiong)







## WebSSH2

* [xterm.js](https://github.com/xtermjs/xterm.js)

* [webssh](https://github.com/huashengdun/webssh)

* [WebSSH2](https://github.com/billchurch/WebSSH2)

* [https://github.com/MoePlayer/DPlayer](https://github.com/MoePlayer/DPlayer)


### 下载

```bash
git clone https://github.com/billchurch/WebSSH2
cd WebSSH2
npm install --production
```

### 修改源码使其支持秘钥登录

```bash
vi app/server/socket.js
# 文件开头添加
var fs = require('fs')
# 修改 conn.connect 方法
username: 'root',
privateKey: fs.readFileSync('/root/.ssh/id_rsa')
```

### 运行

```bash
yum install screen
screen -S Webssh2
npm start
```
- 使用浏览器打开`http://Webssh服务器IP:Webssh端口/ssh/host/SSH服务器IP`

- 默认端口号是2222

- 可以通过修改`app/config.json`中的`listen.port`修改端口







## batch与shell同义操作符

|        batch              |        Shell         |          作用            |
|------------------------|-----------------------|-------------------------|
| %                      | $                     | 命令行参数前缀                 |
| /                      | -                     | 命令选项标记                  |
| \                      | /                     | 目录路径分隔符                 |
| ==                     | =                     | (等于)字符串比较测试             |
| !==!                   | !=                    | (不等)字符串比较测试             |
| |                      | |                     | 管道                      |
| @                      | set +v                | 不打印当前命令                 |
| *                      | *                     | 文件名"通配符"                |
| >                      | >                     | 文件重定向(覆盖)               |
| >>                     | >>                    | 文件重定向(附加)               |
| <                      | <                     | 重定向stdin                |
| %VAR%                  | $VAR                  | 环境变量                    |
| REM                    | #                     | 注释                      |
| NOT                    | !                     | 取反                      |
| NUL                    | /dev/null             | "黑洞"用来阻止命令输出            |
| ECHO                   | echo                  | 打印(Bash中有更多选项)          |
| ECHO.                  | echo                  | 打印空行                    |
| ECHO OFF               | set +v                | 不打印后续的命令                |
| FOR %%VAR IN (LIST) DO | for var in [list]; do | "for"循环                 |
| :LABEL                 | 没有等价物(多余)             | 标签                      |
| GOTO                   | 没有等价物(使用函数)           | 跳转到脚本的另一个位置             |
| PAUSE                  | sleep                 | 暂停或等待一段时间               |
| CHOICE                 | case or select        | 菜单选择                    |
| IF                     | if                    | if条件语句                  |
| IF EXIST FILENAME      | if [ -e filename ]    | 测试文件是否存在                |
| IF !%N==!              | if [ -z "$N" ]        | 参数"N"是否存在               |
| CALL                   | source命令或.(点操作符) | "include"另一个脚本          |
| COMMAND /C             | source命令或.(点操作符) | "include"另一个脚本(与CALL相同) |
| SET                    | export                | 设置一个环境变量                |
| SHIFT                  | shift                 | 左移命令行参数列表               |
| SGN                    | -lt或-gt               | (整形)符号                  |
| ERRORLEVEL             | $?                    | 退出状态                    |
| CON                    | stdin                 | "控制台"(stdin)            |
| PRN                    | /dev/lp0              | (一般的)打印设备               |
| LPT1                   | /dev/lp0              | 第一个打印设备                 |
| COM1                   | /dev/ttyS0            | 第一个串口                   |

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
