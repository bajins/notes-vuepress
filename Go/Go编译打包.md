# Go编译打包

[[toc]]


## Flag

+ [Go语言-打包静态文件](https://c.isme.pub/2019/01/10/go-static)


> 下载打包脚本[go_7z_pack.bat](/files/go_7z_pack.bat)或[go_pack.sh](/files/go_pack.sh)文件并保存到项目根目录中，
> 且修改脚本中的`files`变量保存执行脚本即可


**cross compile**

> 交叉编译器（英语：Cross compiler）是指一个在某个系统平台下可以产生另一个系统平台的可执行文件的编译器。
> 交叉编译器在目标系统平台（开发出来的应用程序序所运行的平台）难以或不容易编译时非常有用。

> 交叉编译是在一个平台上生成另一个平台上的可执行代码。同一个体系结构可以运行不同的操作系统；
> 同样，同一个操作系统也可以在不同的体系结构上运行。




## 第三方库

* [https://github.com/mitchellh/gox](https://github.com/mitchellh/gox)
* [https://github.com/wheelcomplex/goxx](https://github.com/wheelcomplex/goxx)
* [https://github.com/goreleaser/goreleaser](https://github.com/goreleaser/goreleaser)
* [https://github.com/laher/goxc](https://github.com/laher/goxc)
* [https://github.com/karalabe/xgo](https://github.com/karalabe/xgo)
* [https://github.com/techknowlogick/xgo](https://github.com/techknowlogick/xgo)
* [https://github.com/storyicon/gos](https://github.com/storyicon/gos)
* [https://github.com/docker/golang-cross](https://github.com/docker/golang-cross)
* [https://github.com/im4x5yn74x/dropper2](https://github.com/im4x5yn74x/dropper2)
* [https://github.com/getporter/porter](https://github.com/getporter/porter)
* Go编译器 [https://github.com/tinygo-org/tinygo](https://github.com/tinygo-org/tinygo)



**嵌入静态资源**

* [https://github.com/go-bindata/go-bindata](https://github.com/go-bindata/go-bindata)
* [https://github.com/caixw/gobuild](https://github.com/caixw/gobuild)
* [https://github.com/shuLhan/go-bindata](https://github.com/shuLhan/go-bindata)
* [https://github.com/elazarl/go-bindata-assetfs](https://github.com/elazarl/go-bindata-assetfs)
* [https://github.com/rakyll/statik](https://github.com/rakyll/statik)
* [https://github.com/GeertJohan/go.rice](https://github.com/GeertJohan/go.rice)
* [https://github.com/mjibson/esc](https://github.com/mjibson/esc)
* [https://github.com/UnnoTed/fileb0x](https://github.com/UnnoTed/fileb0x)
* [https://github.com/gobuffalo/packr](https://github.com/gobuffalo/packr)
* [https://github.com/go-playground/statics](https://github.com/go-playground/statics)
* [https://github.com/knadh/stuffbin](https://github.com/knadh/stuffbin)
* [https://github.com/omeid/go-resources](https://github.com/omeid/go-resources)
* [https://github.com/phogolabs/parcello](https://github.com/phogolabs/parcello)
* [https://github.com/pyros2097/go-embed](https://github.com/pyros2097/go-embed)
* [https://github.com/shurcooL/vfsgen](https://github.com/shurcooL/vfsgen)
* [https://github.com/wlbr/templify](https://github.com/wlbr/templify)
* [https://perkeep.org/pkg/fileembed](https://perkeep.org/pkg/fileembed)
* [https://github.com/kevinburke/go-bindata](https://github.com/kevinburke/go-bindata)
* [https://github.com/markbates/pkger](https://github.com/markbates/pkger)




## embed内嵌文件

* [https://github.com/golang/proposal/blob/master/design/draft-embed.md](https://github.com/golang/proposal/blob/master/design/draft-embed.md)
* go:embed扩展 [https://github.com/alimy/embedx](https://github.com/alimy/embedx)


> 在go1.6版本之前要想把资源文件嵌入到编译的二进制包中必须用第三方包（除非你自己有实现），要么把所有文件压缩在一起

- embed一共有三种数据格式

| 数据类型 	| 说明                                                                                                	|
|----------	|-----------------------------------------------------------------------------------------------------	|
| []byte   	| 表示数据存储为二进制格式，如果只使用[]byte和string需要以import (_ "embed")的形式引入embed标准库     	|
| string   	| 表示数据被编码成utf8编码的字符串，因此不要用这个格式嵌入二进制文件比如图片，引入embed的规则同[]byte 	|
| embed.FS 	| 表示存储多个文件和目录的结构，[]byte和string只能存储单个文件                                        	|

* [Go1.16 中发布的内嵌静态资源功能](https://mp.weixin.qq.com/s/SiCTV7R2wA_I2nCQkC3GGQ)
* [golang1.16内嵌静态资源指南](https://www.cnblogs.com/apocelipes/p/13907858.html)




## 打包命令

* [https://golang.google.cn/doc/install/source#environment](https://golang.google.cn/doc/install/source#environment)
* [https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63](https://gist.github.com/asukakenji/f15ba7e588ac42795f421b48b8aede63)


### 设置编译环境

* [https://github.com/golang/go/blob/master/src/cmd/dist/build.go#L1513](https://github.com/golang/go/blob/master/src/cmd/dist/build.go#L1513)

- `go tool dist list` 获得所有受支持平台的列表
- `GOOS` 目标可执行程序运行操作系统，支持`darwin`、`freebsd`、`linux`、`windows`
- `GOARCH` 目标平台的体系架构，包括`386`、`amd64`、`arm`
- `CGO_ENABLED` CGO开关
- `-o` 参数为指定输出程序文件名
- `go clean -cache` 编译完成清理缓存
- `go env -w GOFLAGS=-buildvcs=false` 不将版本控制信息（如提交哈希、提交时间）嵌入到二进制文件中


**`-ldflags`选项**

* 用`ldflags`给go链接器传入参数，`go tool link`查看可用值 [https://golang.org/cmd/link](https://www.godoc.org/cmd/link)

> `-ldflags="-w -s"` 选项可以减小编译后的程序体积

> 注意因为`date`和`go version`的输出有空格，所以`main.BUILD_TIME`和`main.GO_VERSION`必须使用引号括起来

```bash
go build -ldflags "-X main.VERSION=1.0.0 -X 'main.BUILD_TIME=`date`' \
-X 'main.GO_VERSION=`go version`' -X 'main.commitHash=`git rev-parse HEAD`'"
```



### windows

> `-ldflags="-H windowsgui"` 能隐藏黑窗口

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


### 交叉编译代码


```go
package main

import (
	"flag"
	"fmt"
	"os"
	"os/exec"
	"path"
)

type syslist struct {
	GOOS   string
	GOARCH string
}

var syslists [32]syslist

func init() {
	syslists[0] = syslist{GOOS: "darwin", GOARCH: "386"}
	syslists[1] = syslist{GOOS: "darwin", GOARCH: "amd64"}
	syslists[2] = syslist{GOOS: "dragonfly", GOARCH: "amd64"}
	syslists[3] = syslist{GOOS: "freebsd", GOARCH: "386"}
	syslists[4] = syslist{GOOS: "freebsd", GOARCH: "amd64"}
	syslists[5] = syslist{GOOS: "freebsd", GOARCH: "arm"}
	syslists[6] = syslist{GOOS: "linux", GOARCH: "386"}
	syslists[7] = syslist{GOOS: "linux", GOARCH: "amd64"}
	syslists[8] = syslist{GOOS: "linux", GOARCH: "arm"}
	syslists[9] = syslist{GOOS: "linux", GOARCH: "arm64"}
	syslists[10] = syslist{GOOS: "linux", GOARCH: "ppc64"}
	syslists[11] = syslist{GOOS: "linux", GOARCH: "ppc64le"}
	syslists[12] = syslist{GOOS: "linux", GOARCH: "mips"}
	syslists[13] = syslist{GOOS: "linux", GOARCH: "mipsle"}
	syslists[14] = syslist{GOOS: "linux", GOARCH: "mips64"}
	syslists[15] = syslist{GOOS: "linux", GOARCH: "mips64le"}
	syslists[16] = syslist{GOOS: "linux", GOARCH: "s390x"}
	syslists[17] = syslist{GOOS: "nacl", GOARCH: "386"}
	syslists[18] = syslist{GOOS: "nacl", GOARCH: "amd64p32"}
	syslists[19] = syslist{GOOS: "nacl", GOARCH: "arm"}
	syslists[20] = syslist{GOOS: "netbsd", GOARCH: "386"}
	syslists[21] = syslist{GOOS: "netbsd", GOARCH: "amd64"}
	syslists[22] = syslist{GOOS: "netbsd", GOARCH: "arm"}
	syslists[23] = syslist{GOOS: "openbsd", GOARCH: "386"}
	syslists[24] = syslist{GOOS: "openbsd", GOARCH: "amd64"}
	syslists[25] = syslist{GOOS: "openbsd", GOARCH: "arm"}
	syslists[26] = syslist{GOOS: "plan9", GOARCH: "386"}
	syslists[27] = syslist{GOOS: "plan9", GOARCH: "amd64"}
	syslists[28] = syslist{GOOS: "plan9", GOARCH: "arm"}
	syslists[29] = syslist{GOOS: "solaris", GOARCH: "amd64"}
	syslists[30] = syslist{GOOS: "windows", GOARCH: "386"}
	syslists[31] = syslist{GOOS: "windows", GOARCH: "amd64"}
}

// 编译
func main() {
	// 文件存放目录
	var parentFolder string
	// 编译输出存放的子目录
	var subFolder string
	// 文件名前缀
	var filePrefix string
	// 要编译的源文件列表
	var files string
	// scanner := bufio.NewScanner(os.Stdin)
	// scanner.Scan()
	// fmt.Println(scanner.Text())
	//fmt.Println("请输文件存放目录：")
	// 当程序到此，会停止执行等待用户输入
	//fmt.Scanln(&parentFolder)

	flag.StringVar(&parentFolder, "p", "", "文件存放目录，默认：当前目录")
	flag.StringVar(&subFolder, "s", "", "编译输出存放子目录，默认：空")
	flag.StringVar(&filePrefix, "fp", "", "创建文件名前缀，默认：空")
	flag.StringVar(&files, "fs", "", "源文件列表，默认：空")
	flag.Parse()

	cmde := path.Join(parentFolder, subFolder, filePrefix)
	if filePrefix != "" && len(filePrefix) > 0 {
		cmde = cmde + "-"
	}
	for _, v := range syslists {
		ext := ""
		if v.GOOS == "windows" {
			ext = ".exe"
		}
		thisCmde := fmt.Sprintf("%v%v-%v%v", cmde, v.GOOS, v.GOARCH, ext)
		fmt.Println(thisCmde)
		cmd := exec.Command("go", "build", "-ldflags=-w", "-i", "-o", thisCmde, files)
		cmd.Env = append(os.Environ(), "GOARCH="+v.GOARCH, "GOOS="+v.GOOS)
		output, err := cmd.CombinedOutput()
		if err != nil {
			fmt.Println(fmt.Sprint(err) + ": " + string(output))
			return
		}
		fmt.Println(string(output))
	}
	fmt.Println("编译完成")
}
```

