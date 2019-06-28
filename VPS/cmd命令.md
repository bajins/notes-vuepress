# CMD命令

## 查看当前目录下的文件，类似于linux下的ls
```powershell
dir
```
## 创建目录
```powershell
md 目录名（文件夹）
```
## 删除目录
```powershell
rd  目录名（文件夹）
```
## 查看本机ip
```powershell
ipconfig
```
## 清除屏幕,类似于linux下的clear
```powershell
cls
```
## 把一个文件拷贝到另一个地方
```powershell
copy 路径\文件名 路径\文件名
```
## 把一个文件移动到另一个地方
```powershell
move 路径\文件名 路径\文件名
```
## 删除文件，不能删除文件夹
```powershell
del 文件名
```


## 常用
### 查看是否某个端口被占用
```powershell
netstat -an | find "0.0.0.0:80"
```
### 查看占用的pid
```powershell
netstat –ano
```