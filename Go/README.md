# Golang


* [官网](https://golang.google.cn/dl/)
* [Go 开发者路线图](https://github.com/Quorafind/golang-developer-roadmap-cn)
* [Go 学习之路](https://github.com/developer-learning/learning-golang)
* [Go 标准库中文文档](http://cngolib.com/)
* [Go基本类型说明](https://golangbot.com/types/)

## 框架
### WEB

[gin](https://gin-gonic.com/zh-cn/docs/introduction/)
[https://gin-gonic.com/zh-cn/docs/introduction/](https://gin-gonic.com/zh-cn/docs/introduction/)

[gin-jwt](https://github.com/appleboy/gin-jwt)

[echo](http://go-echo.org/)
[http://go-echo.org/](http://go-echo.org/)

[Iris](https://studyiris.com/doc/)

### other
[TiDB](https://pingcap.com/docs-cn/)

[kingshard](https://github.com/flike/kingshard/blob/master/README_ZH.md)

[Open-Falcon](https://github.com/open-falcon)

[mail-provider](https://github.com/open-falcon/mail-provider)

[chat](https://github.com/Yanjunhui/chat)

[gocron](https://github.com/ouqiang/gocron)

[delay-queue](https://github.com/ouqiang/delay-queue)

[grpc](https://github.com/grpc)
[gRPC 官方文档中文版](http://doc.oschina.net/grpc?t=56831)

[go-xorm](https://github.com/go-xorm)

[gpmgo](https://github.com/gpmgo)

## 代理
[aliyun](https://mirrors.aliyun.com/goproxy/)

[goproxy.io](https://goproxy.io)

[Athens](https://docs.gomods.io/zh/)

[gocenter.io](https://gocenter.io)

[https://gopm.io/](https://gopm.io)

[goproxy.cn](https://goproxy.cn)



## 安装最新环境
```bash
# 到官网下载最新版并解压 https://golang.google.cn/dl/
# 查看当前路径
pwd
# 添加环境变量
vi /etc/profile
# 在末尾添加以下命令
export GOROOT=这里为go文件夹路径
export PATH=$PATH:$GOROOT/bin

# 刷新一下
source /etc/profile
```