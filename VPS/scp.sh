#!/bin/bash
## 需要手动安装expect包：yum -y install expect expect-devel
## 远程IP的密码设置，用${des_pass}获取
des_pass=123456
expect -c "
## 设置拷贝的时间，超时时间-1为永不超时
set timeout -1
## 设置上传配置：文件或文件夹、IP、端口。
## IP在前文件路径在后的是从远端下载到本地，文件路径在前IP在后是从本地上传到远端
## 从本地上传到远端
## spawn scp -P 223 -p -r /www/wwwroot/file root@192.168.1.2:/www/wwwroot/test
## 从远端下载到本地
spawn scp -P 223 -p -r root@192.168.1.1:/www/wwwroot/file /www/wwwroot/test
## expect \"password:\"
## send \"${des_pass}\r\"
expect {
  \"*yes/no*\" {send \"yes\r\"; exp_continue}
  \"*password*\" {send \"${des_pass}\r\";}
}
expect eof
"
