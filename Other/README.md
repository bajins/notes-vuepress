# Other



## flag

* [饭饭的个人主页](https://github.com/noisky/Homepage)


https://github.com/justjavac/awesome-wechat-weapp?utm_source=gold_browser_extension



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



## Google账号数据迁移

* [Google账号数据迁移指南](https://mabutou.me/archives/266)



![](/images/谷歌账号数据迁移.png)