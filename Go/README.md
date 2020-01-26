# Go


[[toc]]




## flag

* [https://golang.google.cn/dl](https://golang.google.cn/dl)

* [https://gomirrors.org](https://gomirrors.org)

* [https://github.com/golang](https://github.com/golang)

* [https://go-zh.org](https://go-zh.org)

* [Go 标准库中文文档](https://github.com/huangz1990/cngolib.com)

* [https://github.com/taigacute/GoDoc-CN](https://github.com/taigacute/GoDoc-CN)

* [https://github.com/golang-china/gopl-zh](https://github.com/golang-china/gopl-zh)

* [Go 语言中文开源图书、资料或文档](https://books.studygolang.com)

* [Go 开发者路线图](https://github.com/Quorafind/golang-developer-roadmap-cn)

* [Go 学习之路](https://github.com/developer-learning/learning-golang)

* [Go Web 编程](https://github.com/astaxie/build-web-application-with-golang)

* [Go基本类型说明](https://golangbot.com/types)

* [Go语言小册](https://golang.fasionchan.com/zh_CN/latest/index.html)

* [模板语法指南](https://www.kancloud.cn/hello123/beego/126115)

* [Go 入门指南](https://github.com/unknwon/the-way-to-go_ZH_CN)

* [golang 学习笔记](https://sushengbuhuo.github.io/2019/03/18/golang-%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0)

* [https://doc.xuwenliang.com/docs/go](https://doc.xuwenliang.com/docs/go)


## 开源项目

* [https://github.com/avelino/awesome-go](https://github.com/avelino/awesome-go)

* [https://github.com/yinggaozhen/awesome-go-cn](https://github.com/yinggaozhen/awesome-go-cn)


| 框架    	| GitHub                                                         	| 官网                                        	|
|---------	|----------------------------------------------------------------	|---------------------------------------------	|
| gin     	| https://github.com/gin-gonic/gin <br/> https://github.com/gin-contrib 	| https://gin-gonic.com                       	|
| echo    	| https://github.com/labstack/echo                               	| https://echo.labstack.com <br/> http://go-echo.org 	|
| GoFrame 	| https://github.com/gogf/gf                                     	| https://goframe.org                        	|
| iris    	| https://github.com/kataras/iris                                	| https://iris-go.com <br/> https://studyiris.com   	|
| grbac   	| https://github.com/storyicon/grbac                             	|                                             	|
| gin-jwt 	| https://github.com/appleboy/gin-jwt                            	|                                             	|
| kit     	| https://github.com/go-kit/kit                                  	| https://gokit.io                           	|




### other

* [golang worker pool ,线程池 , 工作池](https://github.com/xxjwxc/gowp)

* [模板功能](https://github.com/Masterminds/sprig)

* [TiDB](https://pingcap.com/docs-cn)

* [kingshard](https://github.com/flike/kingshard/blob/master/README_ZH.md)

* [Open-Falcon](https://github.com/open-falcon)

* [mail-provider](https://github.com/open-falcon/mail-provider)

* [chat](https://github.com/Yanjunhui/chat)

* [https://github.com/ouqiang/gocron](https://github.com/ouqiang/gocron)

* [https://github.com/robfig/cron](https://github.com/robfig/cron)

* [https://github.com/jasonlvhit/gocron](https://github.com/jasonlvhit/gocron)

* [delay-queue](https://github.com/ouqiang/delay-queue)

* [grpc](https://github.com/grpc) [gRPC 官方文档中文版](http://doc.oschina.net/grpc?t=56831)

* [go-xorm](https://github.com/go-xorm)

* [gpmgo](https://github.com/gpmgo)

* [管理大量SSH连接配置](https://github.com/libragen/felix)



## 代理

> 查看Go的环境信息`go env`

**GOPROXY**

> `GO 1.13`版本开始`GOPROXY`支持多代理设置，通过`,`隔开

- Linux

```bash
export GOPROXY=https://goproxy.io,https://goproxy.cn,direct
# 或者
go env -w GOPROXY=https://goproxy.io,https://goproxy.cn,direct
```

- Windows

```batch
setx /m GOPROXY "https://goproxy.io,https://goproxy.cn,direct"
:: 或者
go env -w GOPROXY=https://goproxy.io,https://goproxy.cn,direct
```

> 当第一个`proxy`在处理`ge get`所发出的`HTTP`请求时，返回`HTTP`状态码为`404`或`410`时，就会查找下一个`proxy`


**GOPRIVATE**

> 设置`GOPRIVATE`来跳过私有库，比如常用的`Github`、`Gitlab`、`Gitee`，中间使用`,`分隔

```bash
go env -w GOPRIVATE=*.github.com,*.gitlab.com,*.gitee.com
```


**GOSUMDB**

> 如果在运行`go mod vendor`时，提示`Get https://sum.golang.org/lookup/xxxxxx: dial tcp 216.58.200.49:443: i/o timeout`，
> 则是因为`Go 1.13`设置了默认的`GOSUMDB=sum.golang.org`，这个网站是被墙了的，用于验证包的有效性，可以通过如下命令关闭

```bash
go env -w GOSUMDB=off
```

* [https://github.com/golang/go/wiki/Modules#are-there-always-on-module-repositories-and-enterprise-proxies](https://github.com/golang/go/wiki/Modules#are-there-always-on-module-repositories-and-enterprise-proxies)


* [https://mirrors.aliyun.com/goproxy](https://mirrors.aliyun.com/goproxy)

* [https://mirrors.cloud.tencent.com/help/go.html](https://mirrors.cloud.tencent.com/help/go.html)

* [https://goproxy.cn](https://goproxy.cn)

* [https://goproxy.io](https://goproxy.io)

* [Athens](https://docs.gomods.io/zh)

* [https://gocenter.io](https://gocenter.io)

* [https://gopm.io](https://gopm.io)

