#!/bin/bash
##需要手动安装expect包：yum -y install  expect  expect-devel
## 密码设置
des_pass=123456
expect -c "
##设置拷贝的时间，超时时间-1为永不超时
set timeout -1
## 设置上传配置：文件或文件夹、IP
spawn scp -P 965 -p -r /www/wwwroot/file root@192.168.1.1:/www/wwwroot/test
expect \"password:\"
send \"${des_pass}\r\"
expect eof
"
