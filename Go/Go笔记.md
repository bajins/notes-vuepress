# Go笔记

[[toc]]


## Flag


> go语言中的函数可以有多个返回值

> go语言是一种函数式编程语言，函数是go语言中的一等公民，函数的参数，返回值以及函数体内都可以存在函数 

> go中的函数没有默认参数、可选参数也没有函数重载、操作符重载，但有可变参数列表，即（变量　...类型），此时类型钱的变量是一个此类型的数组


* [strconv包使用](https://my.oschina.net/byonds/blog/488492)
* [runtime包](https://www.jianshu.com/p/84bac7932394)
* [File操作](https://blog.csdn.net/TDCQZD/article/details/81835149)
* [golang的指针类型,unsafe.Pointer类型和uintptr类型的区别](https://www.jianshu.com/p/1a49b361d2a1)
* [CGO封装CPP库的一些最佳实践](https://tecknight.xyz/blog/cgo%E5%B0%81%E8%A3%85cpp%E5%BA%93%E7%9A%84%E4%B8%80%E4%BA%9B%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)


<details>
<summary><b>展开查看初始化顺序</b></summary>
<img src="/images/go的man和init执行过程.png" alt>
</details>


**日志**

```go
func (l *Logger) Log(level Level, format string, args ...interface{}) {
	l.mu.Lock()
	defer l.mu.Unlock()
	// 设置日志初始化参数
	// log.Lshortfile 简要文件路径，log.Llongfile 完整文件路径
	//log.SetFlags(log.Lshortfile | log.LstdFlags)
	dbgLogger := log.New(l.file, "", log.Llongfile|log.LstdFlags)
	// 传入0为获取当前行数,文件名,函数名(方法名)
	funcName, file, line, ok := runtime.Caller(2)
	if !ok {
		file = "???"
		line = 0
	}
	info := []string{
		"[" + string(level) + "]",
		runtime.FuncForPC(funcName).Name(),
		format,
	}
	dbgLogger.Output(3, strings.Join(info, ".")+"\n")
}
```


**判断**

- 判断结构体是否为空

```go
if reflect.DeepEqual(a, A{}) {
    fmt.Println("a == A{} empty")
}
// 括号不能去
if a == (A{}) {
    fmt.Println("a == A{} empty")
}
```

- 判断数组不能使用`a == nil`，应该使用`len(a) == 0`


**默认值**

- 整型和浮点型变量的默认值为`0`。
- 字符串变量的默认值为`""`。
- 布尔型`bool`默认值为`false`。
- 指针、切片、字典、通道、接口、错误`error`的默认为`nil`。
- 复数类型如`complex64`、`complex128`默认值为`0+0i`。
- 数组的默认值要根据其数据类型来确定。 例如：`var a [4]int`，其默认值为`[0 0 0 0]`



## 字符串

* [高性能 golang 生成指定长度随机字符串](https://blog.csdn.net/lsmsrc/article/details/104652533)
* [https://github.com/gohouse/random](https://github.com/gohouse/random)


### strings包API

- `strings.HasPrefix(s string, prefix string) bool`：判断字符串s是否以prefix开头
- `strings.HasSuffix(s string, suffix string) bool`：判断字符串s是否以suffix结尾。
- `strings.Index(s string, str string) int`：判断str在s中首次出现的位置，如果没有出现，则返回-1
- `strings.LastIndex(s string, str string) int`：判断str在s中最后出现的位置，如果没有出现，则返回-1
- `strings.Replace(str string, old string, new string, n int)`：字符串替换
- `strings.Count(str string, substr string)int`：字符串计数
- `strings.Repeat(str string, count int)string`：重复count次str
- `strings.ToLower(str string)string`：转为小写
- `strings.ToUpper(str string)string`：转为大写
- `strings.TrimSpace(str string)`：去掉字符串首尾空白字符
- `strings.Trim(str string, cut string)`：去掉字符串首尾cut字符
- `strings.TrimLeft(str string, cut string)`：去掉字符串首cut字符
- `strings.TrimRight(str string, cut string)`：去掉字符串首cut字符
- `strings.Field(str string)`：返回str空格分隔的所有子串的slice
- `strings.Split(str string, split string)`：返回str split分隔的所有子串的slice
- `strings.Join(s1 []string, sep string)`：用sep把s1中的所有元素链接起来
- `strings.Itoa(i int)`：把一个整数i转成字符串
- `strings.Atoi(str string)(int, error)`：把一个字符串转成整数


### 字符串拼接

- `+` 连接适用于短小的、常量字符串（明确的，非变量），因为编译器会给我们优化。
- `Join`是比较统一的拼接，不太灵活
- `fmt`和`buffer`基本上不推荐
- `builder`从性能和灵活性上，都是上佳的选择。


```go
func StringPlus(p []string) string{
	var s string
	l:=len(p)
	for i:=0;i<l;i++{
		s+=p[i]
	}
	return s
}

func StringFmt(p []interface{}) string{
	return fmt.Sprint(p...)
}

func StringJoin(p []string) string{
	return strings.Join(p,"")
}

func StringBuffer(p []string) string {
	var b bytes.Buffer
	l:=len(p)
	for i:=0;i<l;i++{
		b.WriteString(p[i])
	}
	return b.String()
}

func StringBuilder(p []string) string {
	var b strings.Builder
	l:=len(p)
	for i:=0;i<l;i++{
		b.WriteString(p[i])
	}
	return b.String()
}
```



## IO操作

> Go标准库中还有`path`和`path/filepath`函数有点重复,大部分情况下建议使用`path/filepath`

> 两者区别是：`path`使用`/`作为路径分隔符，`path/filepath`判断系统使用不同的路径分隔符


**从 Go 1.16 开始会废弃 io/ioutil 包，相关的功能会挪到 io 包或 os 包**

* [https://github.com/golang/go/issues/40025](https://github.com/golang/go/issues/40025)
* [https://github.com/golang/go/issues/42026](https://github.com/golang/go/issues/42026)


### path包


| 函数                                                  	| 说明                                 	|
|-------------------------------------------------------	|--------------------------------------	|
| IsAbs(path string) bool                               	| 判断是否是一个绝对路径               	|
| Split(path string) (dir, file string)                 	| 将路径分割为路径和文件名             	|
| Join(elem ...string) string                           	| 将多个字符串合并为一个路径           	|
| Ext(path string) string                               	| 返回路径中扩展部分                   	|
| Base(path string) string                              	| 返回路径的最后一个元素               	|
| Dir(path string) string                               	| 返回路径中目录部分                   	|
| Clean(path string) string                             	| 返回同目录的最短路径                 	|
| Match(pattern, name string) (matched bool, err error) 	| 正则是否匹配路径（shell 文件名匹配） 	|



### filepath包


| 函数                                                  	| 说明                                    	|
|-------------------------------------------------------	|-----------------------------------------	|
| filepath.ListSeparator                                	| 预定义变量，表示环境变量分隔符 :        	|
| filepath.Separator                                    	| 预定义变量，表示路径分隔符/             	|
| Abs(path string) (string, error)                      	| 返回path 相对当前路径的绝对路径         	|
| Base(path string) string                              	| 返回路径最后一个元素                    	|
| Clean(path string) string                             	| 返回path 的最短路径                     	|
| Dir(path string) string                               	| 返回路径最后一个元素的目录              	|
| EvalSymlinks(path string) (string, error)             	| 返回软链指向的路径                      	|
| Ext(path string) string                               	| 返回路径中的扩展名，如果没有点返回空    	|
| FromSlash(path string) string                         	| /替换为路径分隔符                       	|
| Join(elem ...string) string                           	| 连接路径，返回已经clean过的路径         	|
| Rel(basepath, targpath string) (string, error)        	| 返回targpath 相对 basepath路径          	|
| Split(path string) (dir, file string)                 	| 分割路径中的目录与文件                  	|
| SplitList(path string) []string                       	| 分隔环境变量里面的路径                  	|
| ToSlash(path string) string                           	| 路径分隔符替换为/                       	|
| VolumeName(path string) string                        	| 返回路径最前面的卷名                    	|
| Walk(root string, walkFn WalkFunc) error              	| 遍历 root 目录下的文件树，并调用 walkFn 	|
| Glob(pattern string) (matches []string, err error)    	| 返回所有匹配的文件                      	|
| IsAbs(path string) (b bool)                           	| 判断路径是不是绝对路径                  	|
| Match(pattern, name string) (matched bool, err error) 	| 匹配文件名，完全匹配则返回true          	|






## 异常和恢复

> Go语言追求简洁优雅，所以，Go语言不支持传统的`try…catch…finally` 这种异常，因为Go语言的设计者们认为，
> 将异常与控制结构混在一起会很容易使得代码变得混乱。因为开发者很容易滥用异常，甚至一个小小的错误都抛出一个异常。

> 在Go语言中，使用多值返回来返回错误。不要用异常代替错误，更不要用来控制流程。在极个别的情况下，
> 才使用Go中引入的`Exception`处理：`defer`、`panic`、`recover`。


**panic**

> 函数中书写了`panic`语句，会终止其后要执行的代码，直到`goroutine`整个退出，并报告错误

> 如果在`panic`函数之前存在`defer`函数，则执行`defer`函数，这里的`defer`有点类似`try…catch…finally`中的`finally`，
>> 如果`defer`函数内不包含`recover`会直到`goroutine`整个退出，并报告错误
>>
>> 相反则会捕获这个`panic`类似于其他语言中`try…catch…finally`的`try`角色


**defer**

> 可以将一个方法延迟到包裹该方法的方法返回时执行，`defer`类似于其他语言中`try…catch…finally`的`finally`角色，
> 它常用于释放资源（如文件句柄、锁等）或确保某些清理逻辑一定会被执行。

1. 包裹`defer`的函数返回时
2. 包裹`defer`的函数执行到末尾时
3. 所在的`goroutine`发生`panic`时


> 当一个方法中有多个`defer`时，`defer`会将要延迟执行的方法`压栈`，当`defer`被触发时，将所有`压栈`的方法`出栈`并执行。
> 所以`defer`的执行顺序是`LIFO`(后进先出)的。



**recover**

1. 用来控制一个`goroutine`的`panicking`行为，捕获`panic`，从而影响应用的行为

> 在`defer`函数中，通过`recever`来终止一个`goroutine`的`panicking`过程，从而恢复正常代码的执行，可以获取通过`panic`传递的`error`
> `defer`类似于其他语言中`try…catch…finally`的`catch`角色



**简单来讲：可以抛出一个`panic`的异常，然后在`defer`中通过`recover`捕获这个异常，然后正常处理。**

**注意：利用`recover`处理`panic`指令，`defer`必须在`panic`之前声明，否则`recover`无法捕获到`panic`**


**示例**

```go
func main() {
	fmt.Println("++++++++++++++++++++")
	// 必须要先声明defer，否则不能捕获到panic异常
	defer func() {
		fmt.Println("=============")
		if err := recover(); err != nil {
			// 这里的err其实就是panic传入的内容
			fmt.Println(err)
		}
		fmt.Println("=============")
	}()
	// 开始调用test
	test()
	// 这里开始下面代码不会再执行
	fmt.Println("+++++++++++++++++++")
}

func test() {
	fmt.Println("*******************")
	panic("异常信息")
	//这里开始下面代码不会再执行
	fmt.Println("b")
}
```


## HTTP

* [关于golang 的readall清空reader](https://www.jianshu.com/p/2ecda118336f)
* [multipart/form-data POST上传文件](https://my.oschina.net/bianweiall/blog/544355)
* [Golang模拟客户端POST表单功能文件上传](http://hacktech.cn/2017/07/07/Golang%E6%A8%A1%E6%8B%9F%E5%AE%A2%E6%88%B7%E7%AB%AFPOST%E8%A1%A8%E5%8D%95%E5%8A%9F%E8%83%BD%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.html)
* [go语言模拟multipart/form-data提交数据](https://1024coder.com/14845548548981.html)
* [https://github.com/xuanbo/requests](https://github.com/xuanbo/requests)
* [从 HTTP 角度看 Go 如何实现文件上传](https://zhuanlan.zhihu.com/p/96491484)
* [Golang net/http包 同时监听多个端口](https://blog.csdn.net/zkt286468541/article/details/81203046)


```go
var buffer [512]byte
result := bytes.NewBuffer(nil)
for {
    n, err := resp.Body.Read(buffer[0:])
    result.Write(buffer[0:n])
    if err != nil && err == io.EOF {
        break
    } else if err != nil {
        panic(err)
    }
}
//result, _ := ioutil.ReadAll(resp.Body)
// 必须关闭
defer resp.Body.Close()
// 使用ioutil.ReadAll 会清空对应Reader，重新赋值对应Reader
//resp.Body = ioutil.NopCloser(bytes.NewBuffer(result))

// 解析参数，填充到Form、PostForm，这里也会清空对应Reader
resp.Request.ParseForm()
// 解析文件上传表单的post参数
resp.Request.ParseMultipartForm(1024)
```


```go
// http.Client发送请求，此方式是封装的http.NewRequest方法
//
// method:	请求方法：POST、GET、PUT、DELETE
// urlText:		请求地址
// contentType: 请求数据类型，首字母简写，如：axwfu
// params:	请求参数
func HttpClient(method, urlText, contentType string, params map[string]string) (*http.Response, error) {
	if urlText == "" {
		panic(errors.New("url不能为空"))
	}
	client := http.Client{Timeout: 30 * time.Second}

	var resp *http.Response
	var err error

	method = strings.ToUpper(method)
	if method == http.MethodPost || method == http.MethodPatch || method == http.MethodPut {
		if params != nil {
			switch contentType {
			case "axwfu": // application/x-www-form-urlencoded
				data := make(url.Values)
				//data := url.Values{}
				for k, v := range params {
					data[k] = []string{v}
					//data.Set(k, v)
				}
				resp, err = client.PostForm(urlText, data)
			case "mf": // multipart/form-data
				bodyBuf := &bytes.Buffer{}
                writer := multipart.NewWriter(bodyBuf)
                for k, v := range params {
                    if err = writer.WriteField(k, v); err != nil {
                        return nil, err
                    }
                }
                if err = writer.Close(); err != nil {
                    return nil, err
                }
				resp, err = client.Post(urlText, writer.FormDataContentType(), bodyBuf)
			case "tx": // text/xml
				jsonStr, err := json.Marshal(params)
				if err != nil {
					return nil, err
				}
				data := strings.ReplaceAll(string(jsonStr), " ", "+")
				resp, err = client.Post(urlText, contentType, bytes.NewBuffer([]byte(data)))
			default: // application/json
				jsonStr, err := json.Marshal(params)
				if err != nil {
					return nil, err
				}
				resp, err = client.Post(urlText, "application/json", bytes.NewBuffer(jsonStr))
			}
		} else {
			resp, err = client.Post(urlText, contentType, nil)
		}
	} else {
		if params != nil {
			urlText = urlText + "?"
			for key, value := range params {
				urlText += key + "=" + value + "&"
			}
		}
		// url编码
		//urlText=urlText.QueryEscape(urlText)
		if method == "HEAD" {
			resp, err = client.Head(urlText)
		} else {
			resp, err = client.Get(urlText)
		}
	}
	return resp, err
}
```



## 作业调度

- `ticker`只要定义完成，从此刻开始计时，不需要任何其他的操作，每隔固定时间都会触发。
- `timer`定时器，是到固定时间后会执行一次

> 如果timer定时器要每隔间隔的时间执行，实现ticker的效果，使用 func (t *Timer) Reset(d Duration) bool

* [go timer 和 ticker 的区别](https://learnku.com/articles/23578/the-difference-between-go-timer-and-ticker)


**固定到每天的Duration**

```go
now := time.Now()
// 计算下一个时间点
next := now.Add(duration)
next = time.Date(next.Year(), next.Month(), next.Day(), 0, 0, 0, 0, next.Location())
if next.Sub(now) <= 0 {
    next = next.Add(time.Hour * 24)
}
ticker := time.NewTicker(next.Sub(now))
timer := time.NewTimer(next.Sub(now))
```



**Ticker**

> ticker只要定义完成，从此刻开始计时，不需要任何其他的操作，每隔固定时间都会触发。

> NewTicker返回一个新的 Ticker，该 Ticker 包含一个通道字段，并会每隔时间段 d 就向该通道发送当时的时间。它会调  
> 整时间间隔或者丢弃 tick 信息以适应反应慢的接收者。如果d <= 0会触发panic。关闭该 Ticker 可以释放相关资源

```go
// 启动的时候执行一次，滚动间隔时间执行
func SchedulerIntervalsTicker(f func(), duration time.Duration) {
    // 创建一个 Timer，它会在最少过去时间段 d后到期，向其自身的 C 字段发送当时的时间
    ticker := time.NewTicker(duration)
	for {
		go f()
		<-ticker.C
	}
}

func SchedulerIntervalsTicker(f func(), duration time.Duration) {
	var ch chan int
	// 定时任务
	ticker := time.NewTicker(duration)
	go func() {
		for range ticker.C {
			f()
		}
		ch <- 1
	}()
	<-ch
}

func SchedulerIntervalsTicker(f func(), duration time.Duration) {
	// 定时任务
	ticker := time.NewTicker(duration)
	for range ticker.C {
		go f()
	}
}
```

**Timer**

> `timer`定时器，是到固定时间后会执行一次，它会在最少过去时间段 d 后到期，向其自身的 C 字段发送当时的时间

```go
// 启动的时候执行一次
func SchedulerFixedTimer(f func(), duration time.Duration) {
    timer := time.NewTimer(duration)
    for {
        go f()
        <-timer.C
        // Reset 使 ticker 重新开始计时，否则会导致通道堵塞，（本方法返回后再）等待时间段 d 过去后到期。
        // 如果调用时t还在等待中会返回真；如果 t已经到期或者被停止了会返回假
        timer.Reset(duration)
    }
}

func SchedulerFixedTimer(f func(), duration time.Duration) {
	timer := time.NewTimer(duration)
	go func() {
		for range timer.C {
			f()
		}
		ch <- 1
	}()
	<-ch
}

func SchedulerFixedTimer(f func(), duration time.Duration) {
	timer := time.NewTimer(duration)
	for range timer.C {
		go f()
	}
}
```


## 进程线程协程

> GO程序是单进程的（手动`fork/exec`不算），但是调度器是多线程的。

* [go 开多个goroutine，是在一个进程中完成，还是可能在多个进程中完成](https://segmentfault.com/q/1010000007372739)
* [golang多进程并发](https://chierqj.github.io/golang-duo-jin-cheng-bing-fa)


### 进程

> `exec`包执行外部命令，它将`os.StartProcess`进行包装使得它更容易映射到`stdin`和`stdout`，并且利用`pipe`连接`i/o`

> 这和`python``下的command`、`os.system`等功能一样。可以调用类`LINUX`系统下的`shell`命令，也可以在`windows`下调用`cmd`命令。

> os包中实现了平台无关的接口，设计向Unix风格，但是错误处理是go风格，当os包使用时，如果失败之后返回错误类型而不是错误数量．

* [golang中os包用法](https://blog.csdn.net/chenbaoke/article/details/42494851)

```go
proc, err = os.StartProcess("test.exe", nil, &os.ProcAttr{Files: []*os.File{os.Stdin, os.Stdout, os.Stderr}})
```


### 协程

* [多线程](https://www.jianshu.com/p/c3d65105fa46)
* [Go 并发 、并行、线程池](https://blog.csdn.net/sun_hongtao/article/details/76972156)
* [多线程 并发](https://blog.csdn.net/ytd7777/article/details/85004371)
* [Go 并发控制](https://segmentfault.com/a/1190000019229973)
* [多任务线程池并发](https://blog.csdn.net/github_37320188/article/details/93909877)
* [深度剖析 Go 中的 Go 协程 (goroutines) -- Go 的并发](https://studygolang.com/articles/17944)



```go
go 函数
```

- 匿名`Go`协程

```go
go func() {
    // 业务逻辑
}()
```

- 协程的调度

```go
func TestGorutine(t *testing.T) {
    // 指定最大 P 为 1，从而管理协程最多的线程为 1 个    
    runtime.GOMAXPROCS(1)
    // 显式地让出CPU时间给其他goroutine
    //runtime.Gosched()
    // 控制等待所有协程都执行完再退出程序    
    wg := sync.WaitGroup{}
    wg.Add(2)
    // 运行一个协程
    go func() {
        fmt.Println(1)
        fmt.Println(2)
        fmt.Println(3)
        wg.Done()
    }()

    // 运行第二个协程
    go func() {
        fmt.Println(65)
        fmt.Println(66)
        // 设置个睡眠，让该协程执行超时而被挂起，引起超时调度
        time.Sleep(time.Second)
        fmt.Println(67)
        wg.Done()
    }()
    wg.Wait()
}
```


## ORM

> `Object-Relational Mapping`，把关系数据库的表结构映射到对象上。

+ [orm对比](https://segmentfault.com/a/1190000015606291)


* [https://github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)
* [https://github.com/jinzhu/gorm](https://github.com/jinzhu/gorm)
* [https://github.com/go-xorm/xorm](https://github.com/go-xorm/xorm)
* [https://github.com/gohouse/gorose](https://github.com/gohouse/gorose)
* [https://github.com/go-gorp/gorp](https://github.com/go-gorp/gorp)


## Daemon

* [https://github.com/takama/daemon](https://github.com/takama/daemon)



**Cgo实现**

```go
package main

import (
    "fmt"
    "net"
    "runtime"
)

/*
#include <unistd.h>
*/
import "C"

func main() {
    // 守护进程
    C.daemon(1, 1)
    runtime.GOMAXPROCS(runtime.NumCPU())
    fmt.Println("Starting the server ...")
    listener, err := net.Listen("tcp", "localhost:8080")
    if err != nil {
        fmt.Println("Error listening", err.Error())
        return
    }

    for {
        conn, err := listener.Accept()
        if err != nil {
            fmt.Println("error accepting", err.Error())
            return
        }

        go doServerStuff(conn)
    }
}

func doServerStuff(conn net.Conn) {
    for {
        buf := make([]byte, 512)
        _, err := conn.Read(buf)
        if err != nil {
            fmt.Println("Error reading", err.Error())
            return
        }
        fmt.Printf("Received data: %v", string(buf))
    }
}
```


**支持goroutine和系统信号监听**

> go通过syscall调用fork实现(这个和Cgo deamon函数原理一样)

```go
package main
 
import (
    "os"
    "fmt"
    "os/signal"
    "syscall"
    "time"
    "log"
    "os/exec"
)
func init() {
    if os.Getppid() != 1{
        cmd := exec.Command(os.Args[0], os.Args[1:]...)
        cmd.Start()
        os.Exit(0)
    }
 
    // 监听系统信号
    go func() {
        _c := make(chan os.Signal, 1)
        signal.Notify(_c, os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGKILL, syscall.SIGTSTP)
        msg := <- _c
        log.Println(msg)
        os.Exit(0)
    }()
}
 
func main()  {
 
    go func(){
        fp, _ := os.OpenFile("log", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
        log.SetOutput(fp)
        for{
            log.Println(fmt.Sprint("hello ", os.Getpid()))
            time.Sleep(time.Second * 5)
        }
    }()
 
    for{
        time.Sleep(time.Second * 1000)
    }
 
}
```