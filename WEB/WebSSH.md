# WebSSH2
## 安装 NVM
```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
```
## 安装稳定版 Nodejs
### 查询最新版本号
```shell
nvm ls-remote --lts
nvm install <最新的版本号>
```
## 下载 Webssh2
```sehll
git clone https://github.com/billchurch/WebSSH2
cd WebSSH2
npm install --production
```
## 修改 webssh 源码使其支持 秘钥登录
```shell
vi /usr/local/WebSSH2/server/socket.js
# 文件开头添加
var fs = require(‘fs‘)
# 修改 conn.connect 方法
username: ‘root‘,
privateKey: fs.readFileSync(‘/root/.ssh/id_rsa‘)
```
## 运行 Webssh2
```shell
npm start
```
#### 使用浏览器打开http://Webssh服务器IP:Webssh端口/ssh/host/SSH服务器IP
#### 默认端口号是2222
#### 可以通过修改config.json中的listen.port修改端口


