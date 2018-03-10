# 腾讯COS完全版插件for宝塔面板by [蔚蓝触点Azuretouch](https://blog.azpro.cn/index.php/archives/18/)

## 功能：
#### 1.一键安装，可以在软件管理界面里配置插件，及删除远程腾讯COS里的文件及新建文件夹。
#### 1.可以在计划任务里，直接选择腾讯COS作为备份路径。
#### 3.可以设置保留备份的数量，自动从服务器端删除。
#### 4.不能设置宝塔首页显示(不考虑此功能，因为要修改宝塔的系统配置文件)。
#### 5.不能卸载腾讯COS插件(不考虑此功能，因为卸载插件，需要从宝塔官方服务器上下载脚本)。
## 安装脚本：
```
wget -O /www/server/panel/script/txcos_install.sh http://blog.azpro.cn/txcos/txcos_install.sh && sudo sh /www/server/panel/script/txcos_install.sh install
```
## 卸载脚本：
```
sudo sh /www/server/panel/script/txcos_install.sh
```
