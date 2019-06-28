# Golang命令

## 打包

### 在windows下打包
#### 切换到go项目目录
#### 设置环境
##### `GOOS` 目标可执行程序运行操作系统，支持`darwin`、`freebsd`、`linux`、`windows`
```powershell
# 打包Linux 执行文件
SET GOOS=linux
# 打包win执行文件
SET GOOS=windows
# 打包mac执行文件
SET GOOS=darwin
# 打包freebsd执行文件
SET GOOS=freebsd
```
##### `GOARCH` 目标可执行程序操作系统构架，包括`386`、`amd64`、`arm`
```powershell
# 打包386执行文件
SET GOARCH=386
# 打包amd64执行文件
SET GOARCH=amd64
# 打包arm执行文件
SET GOARCH=arm
```
#### 执行编译
```powershell
go build main.go
# 打包文件成其他名字
go build -o key-gin.exe main.go
```
