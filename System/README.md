# System


[[toc]]




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


* [https://www.bt.cn](https://www.bt.cn)

* [https://www.xp.cn](https://www.xp.cn)


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





## 发卡系统

* [github search](https://github.com/search?q=%E5%8F%91%E5%8D%A1%E7%B3%BB%E7%BB%9F&type=Repositories)

* [https://github.com/zlkbdotnet/zfaka](https://github.com/zlkbdotnet/zfaka)

* [https://github.com/Tai7sy/card-system](https://github.com/Tai7sy/card-system)

* [https://github.com/assimon/shanhufaka](https://github.com/assimon/shanhufaka)

* [https://github.com/maddog888/kmxts](https://github.com/maddog888/kmxts)



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



## svp

* [https://github.com/ssrsub/ssr/tree/master](https://github.com/ssrsub/ssr/tree/master)

* [https://www.ssrtool.com](https://www.ssrtool.com)

* [https://ssr.tools](https://ssr.tools)

* [https://github.com/xiaotianwl/v2ray_vps](https://github.com/xiaotianwl/v2ray_vps)

* [https://github.com/selierlin/Share-SSR-V2ray](https://github.com/selierlin/Share-SSR-V2ray)

* [https://github.com/ThinkDevelop/Free-SS-SSR](https://github.com/ThinkDevelop/Free-SS-SSR)

* [https://github.com/Alvin9999/new-pac/wiki](https://github.com/Alvin9999/new-pac/wiki)

* [https://toutyrater.github.io/basic/vmess.html](https://toutyrater.github.io/basic/vmess.html)

* [https://github.com/max2max/freess](https://github.com/max2max/freess)

* [https://github.com/ntkernel/lantern/blob/master/vmess.txt](https://github.com/ntkernel/lantern/blob/master/vmess.txt)

* [https://fforever.github.io/v2rayfree](https://fforever.github.io/v2rayfree)

* [https://github.com/ugvf2009/Miles](https://github.com/ugvf2009/Miles)
[https://jiang.netlify.com](https://jiang.netlify.com)

* [https://github.com/EmilyEdna/SS-SSR-V2RAY](https://github.com/EmilyEdna/SS-SSR-V2RAY)

* [https://github.com/mwz1tn/free-v2ray](https://github.com/mwz1tn/free-v2ray#%E8%AF%B4%E5%A5%BD%E7%9A%84%E5%85%8D%E8%B4%B9V2ray)
[https://freev2ray.netlify.com](https://freev2ray.netlify.com)

* [https://lncn.org](https://lncn.org)

* [https://github.com/imba-tjd/freess/tree/dev](https://github.com/imba-tjd/freess/tree/dev)

* [https://github.com/fggfffgbg](https://github.com/fggfffgbg)

* [https://github.com/wenjiqiang/Subscribtion-SS-V2Ray](https://github.com/wenjiqiang/Subscribtion-SS-V2Ray)

* [https://github.com/fqshare/free-ssr-v2ray-vpn](https://github.com/fqshare/free-ssr-v2ray-vpn)

* [https://github.com/lasoychina/v2ray_booking](https://github.com/lasoychina/v2ray_booking)
[https://ssr.lasoy.cn](https://ssr.lasoy.cn)

* [https://free-ss.site](https://free-ss.site)

* [https://get.ishadowx.biz](https://get.ishadowx.biz)
[https://view.freev2ray.org](https://view.freev2ray.org)

* [https://haobang.yangwang.workers.dev](https://haobang.yangwang.workers.dev)

* [https://github.com/bingshengyang/v2ray-ssr](https://github.com/bingshengyang/v2ray-ssr)

* [https://github.com/djdf/v2ray_ss](https://github.com/djdf/v2ray_ss)

* [https://github.com/Flyju/v2ray](https://github.com/Flyju/v2ray)

* [https://github.com/fanite/v2](https://github.com/fanite/v2)

* [https://github.com/t9080](https://github.com/t9080)

* [https://github.com/thdg21/v2ray](https://github.com/thdg21/v2ray)

* [https://github.com/huangkuainiang/v2ray](https://github.com/huangkuainiang/v2ray)

* [https://github.com/huangdesen168/VMESS](https://github.com/huangdesen168/VMESS)

* [https://github.com/CSE2018-2019/VMESS](https://github.com/CSE2018-2019/VMESS)

* [https://github.com/12345678998765/Vmess](https://github.com/12345678998765/Vmess)

* [https://github.com/nullhan/HomePage/blob/master/ssr](https://github.com/nullhan/HomePage/blob/master/ssr)

* [https://github.com/akatokikwok/personalVpsChnInit/blob/v2ray/config.json](https://github.com/akatokikwok/personalVpsChnInit/blob/v2ray/config.json)

* [https://github.com/Sean-Snow/good-good-study-day-day-up](https://github.com/Sean-Snow/good-good-study-day-day-up)

* [https://gist.githubusercontent.com/2dust/d3cc2d0e591e647db226731ffcb7da9e/raw](https://gist.githubusercontent.com/2dust/d3cc2d0e591e647db226731ffcb7da9e/raw)


---


* [Telegram](https://github.com/telegramdesktop/tdesktop/releases)

* [https://t.me/s/ssrshares](https://t.me/s/ssrshares)

* [https://t.me/s/mtplinks](https://t.me/s/mtplinks)

* [https://t.me/s/socks5list](https://t.me/s/socks5list)

* [https://t.me/s/SSRSUB](https://t.me/s/SSRSUB)

* [https://t.me/s/mtpclub](https://t.me/s/mtpclub)

* [https://t.me/s/FQ_FREE](https://t.me/s/FQ_FREE)


---


* [燕子VPN : 永久免费的VPN](https://apkcombo.com/zh-cn/%E7%87%95%E5%AD%90vpn-%E6%B0%B8%E4%B9%85%E5%85%8D%E8%B4%B9%E7%9A%84vpn/com.stone.vssr)

* [宝岛VPN(一键连接,永久免费)](https://apkcombo.com/zh-cn/formosavpn-one-story-connection-free/com.FormosaVPN.ang)

* [老王VPN(永久免费佛系VPN)](https://apkcombo.com/zh-cn/wang-vpn-%E2%9D%A4%EF%B8%8F-free-fast-stable-best-vpn-just-try-it/com.findtheway)

* [免费ss vpn(永久免费)](https://apkcombo.com/zh-cn/free-ss-vpn/com.mika.yangvpn)



**shadowsocks**

* [shadowsocks-windows](https://github.com/shadowsocks/shadowsocks-windows/releases)

* [shadowsocks-android](https://github.com/shadowsocks/shadowsocks-android/releases)

* [https://github.com/ShadowsocksR-Live/shadowsocksr-native/wiki](https://github.com/ShadowsocksR-Live/shadowsocksr-native/wiki)

* [https://github.com/zhaoweih/Shadowsocks-Tutorial](https://github.com/zhaoweih/Shadowsocks-Tutorial)



**v2ray**

* [v2ray-tools](https://www.v2ray.com/awesome/tools.html)

* [v2ray-core](https://github.com/v2ray/v2ray-core/releases)

* [v2rayNG-android](https://github.com/2dust/v2rayNG/releases)

* [v2rayN-Windows](https://github.com/2dust/v2rayN/releases)

* [V2RayW-Windows](https://github.com/Cenmrev/V2RayW/releases)


* [v2ray教程](https://yuan.ga/v2ray-complete-tutorial)
* [https://github.com/233boy/v2ray/tree/master](https://github.com/233boy/v2ray/tree/master)

* [multi-v2ray](https://github.com/Jrohy/multi-v2ray)

* [https://github.com/wulabing/V2Ray_ws-tls_bash_onekey](https://github.com/wulabing/V2Ray_ws-tls_bash_onekey)

* [https://github.com/FunctionClub/V2ray.Fun](https://github.com/FunctionClub/V2ray.Fun)

* [https://github.com/sprov065/v2-ui](https://github.com/sprov065/v2-ui)

* [https://github.com/pengchujin/v2rayDocker](https://github.com/pengchujin/v2rayDocker)

* [https://github.com/htfy96/v2ray-config-gen](https://github.com/htfy96/v2ray-config-gen)

* [https://github.com/leitbogioro/v2ray.fun](https://github.com/leitbogioro/v2ray.fun)

* [https://tools.sprov.xyz](https://tools.sprov.xyz)


### PAC

* [https://github.com/lbp0200/mono_pac](https://github.com/lbp0200/mono_pac)

* [https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt](https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt)

* [https://github.com/ACL4SSR/ACL4SSR](https://github.com/ACL4SSR/ACL4SSR)

