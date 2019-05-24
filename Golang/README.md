# Golang
[官网](https://golang.google.cn/dl/)
[学习路线](https://github.com/Quorafind/golang-developer-roadmap-cn)

## 框架
### WEB
[beego](https://beego.me/docs/intro/)

[gin](https://gin-gonic.com/zh-cn/docs/introduction/)

[go-macaron](https://github.com/go-macaron)

[gin-jwt](https://github.com/appleboy/gin-jwt)

[peachdocs](https://github.com/peachdocs)

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
[goproxy.io](https://goproxy.io)

[Athens](https://docs.gomods.io/zh/)


## beego

```go
// 生成脚手架 user表
bee generate scaffold user -fields="id:int34,name:string,gender:int,age:int" -driver=mysql -conn="root:asd123@tcp(127.0.0.1:3306)/user
