# WebSSH2
## 安装 NVM
#### nodeJs版本管理工具,管理nodejs版本和npm版本
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
## 或者以下方式安装
##### npm与Node.js一起存在，这意味着当您下载并安装Node.js时，您会自动在计算机上安装npm
```shell
https://rpm.nodesource.com/setup_11.x | bash -
yum install -y nodejs
# 检查Node.js和NPM版本
node -v && npm -v
```


## 下载 Webssh2
```sehll
git clone https://github.com/billchurch/WebSSH2
cd WebSSH2
npm install --production
```
## 修改 webssh 源码使其支持 秘钥登录
```shell
vi app/server/socket.js
# 文件开头添加
var fs = require('fs')
# 修改 conn.connect 方法
username: 'root',
privateKey: fs.readFileSync('/root/.ssh/id_rsa')
```
## 运行 Webssh2
```shell
yum install screen
screen -S Webssh2
npm start
```
#### 使用浏览器打开`http://Webssh服务器IP:Webssh端口/ssh/host/SSH服务器IP`
#### 默认端口号是2222
#### 可以通过修改`app/config.json`中的`listen.port`修改端口


