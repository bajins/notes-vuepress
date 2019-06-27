# CMD命令

## 网络
### 查看是否某个端口被占用
```cmd
netstat -an | find "0.0.0.0:80"
```
### 查看占用的pid
```cmd
netstat –ano
```