# CMD命令

## 查看当前目录下的文件，类似于linux下的ls
```batch
dir
```
## 创建目录
```batch
md 目录名（文件夹）
```
## 删除目录
```batch
rd  目录名（文件夹）
```
## 查看本机ip
```batch
ipconfig
```

## 查DNS
```batch
nslookup 域名
```

## 清除屏幕,类似于linux下的clear
```batch
cls
```
## 把一个文件拷贝到另一个地方
```batch
copy 路径\文件名 路径\文件名
```
## 把一个文件移动到另一个地方
```batch
move 路径\文件名 路径\文件名
```
## 删除文件，不能删除文件夹
```batch
del 文件名
```


## 常用
### 查看是否某个端口被占用
```batch
netstat -an | find "0.0.0.0:80"
```
### 查看占用的`pid`
```batch
# 直接用参数过滤
tasklist /fi "imagename eq 程序名*"
# 用findstr命令搜索
tasklist | findstr /i "程序名"
# 只输出PID编号
for /f "skip=3 tokens=2" %a in ('tasklist /fi "imagename eq 程序名*"') do @echo %a
```

### 查看被占用端口的`pid`
```batch
netstat -ano | findstr 80
```

### 结束进程
```batch
taskkill /pid 进程号 /f
```