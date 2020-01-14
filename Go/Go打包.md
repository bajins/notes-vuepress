# Go打包


[[toc]]




## flag

* [Go语言-打包静态文件](https://c.isme.pub/2019/01/10/go-static)


* [https://github.com/go-bindata/go-bindata](https://github.com/go-bindata/go-bindata)

* [https://github.com/shuLhan/go-bindata](https://github.com/shuLhan/go-bindata)

* [https://github.com/elazarl/go-bindata-assetfs](https://github.com/elazarl/go-bindata-assetfs)

* [https://github.com/rakyll/statik](https://github.com/rakyll/statik)

* [https://github.com/GeertJohan/go.rice](https://github.com/GeertJohan/go.rice)

* [https://github.com/mjibson/esc](https://github.com/mjibson/esc)

* [https://github.com/UnnoTed/fileb0x](https://github.com/UnnoTed/fileb0x)

* [https://github.com/gobuffalo/packr](https://github.com/gobuffalo/packr)



**cross compile**

> 交叉编译器（英语：Cross compiler）是指一个在某个系统平台下可以产生另一个系统平台的可执行文件的编译器。
> 交叉编译器在目标系统平台（开发出来的应用程序序所运行的平台）难以或不容易编译时非常有用。

> 交叉编译是在一个平台上生成另一个平台上的可执行代码。同一个体系结构可以运行不同的操作系统；
> 同样，同一个操作系统也可以在不同的体系结构上运行。

* [https://github.com/mitchellh/gox](https://github.com/mitchellh/gox)

* [https://github.com/wheelcomplex/goxx](https://github.com/wheelcomplex/goxx)

* [https://github.com/goreleaser/goreleaser](https://github.com/goreleaser/goreleaser)

* [https://github.com/laher/goxc](https://github.com/laher/goxc)

* [https://github.com/karalabe/xgo](https://github.com/karalabe/xgo)

* [https://github.com/storyicon/gos](https://github.com/storyicon/gos)

* [https://github.com/docker/golang-cross](https://github.com/docker/golang-cross)

* [https://github.com/im4x5yn74x/dropper2](https://github.com/im4x5yn74x/dropper2)


## 打包命令


* [https://golang.google.cn/doc/install/source#environment](https://golang.google.cn/doc/install/source#environment)

* [https://gist.githubusercontent.com/asukakenji/f15ba7e588ac42795f421b48b8aede63/raw](https://gist.githubusercontent.com/asukakenji/f15ba7e588ac42795f421b48b8aede63/raw)

**设置环境**

* [https://github.com/golang/go/blob/master/src/cmd/dist/build.go#L1513](https://github.com/golang/go/blob/master/src/cmd/dist/build.go#L1513)

- `go tool dist list` 获得所有受支持平台的列表

> `GOOS` 目标可执行程序运行操作系统，支持`darwin`、`freebsd`、`linux`、`windows`

> `GOARCH` 目标平台的体系架构，包括`386`、`amd64`、`arm`

> `CGO_ENABLED` CGO开关

> `-o` 参数为指定输出程序文件名


### windows

> `go build -ldflags="-H windowsgui"` 能隐藏黑窗口

```batch
# 交叉编译不支持 CGO 所以要禁用它
SET CGO_ENABLED=0
# 打包Linux 执行文件
SET GOOS=linux
# 打包386执行文件
SET GOARCH=amd64

go build main.go
# 打包文件成其他名字
go build -o test.exe main.go
```


### linux

```bash
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build main.go
```



## 打包脚本

### 保存到项目根目录中

> 只需下载[go_7z_pack.bat](/files/go_7z_pack.bat)文件并保存到项目根目录中，且修改脚本中的`files`变量保存执行脚本即可


### 在任意目录新建

> 基本用法:`脚本名 rootPath files project`
>> `rootPath` 打包的根目录，路径必须完整
>>
>> `files` 需要打包的文件或文件夹，用双引号括起来
>>
>> `project` 打包完成后的压缩文件命名的前部分，可以不输入，默认为打包根目录的名称

> 示例：`脚本名 f:\\key-gin "pyutils static templates" key-gin`

* [go_7z_pack_arbitrary.bat](/files/go_7z_pack_arbitrary.bat)