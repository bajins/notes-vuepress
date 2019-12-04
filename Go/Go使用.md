# Go使用


## flag


> go语言中的函数可以有多个返回值

> go语言是一种函数式编程语言，函数是go语言中的一等公民，函数的参数，返回值以及函数体内都可以存在函数 

> go中的函数没有默认参数、可选参数也没有函数重载、操作符重载，但有可变参数列表，即（变量　...类型），此时类型钱的变量是一个此类型的数组


* [strconv包使用](https://my.oschina.net/byonds/blog/488492)

* [runtime包](https://www.jianshu.com/p/84bac7932394)

* [File操作](https://blog.csdn.net/TDCQZD/article/details/81835149)

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

## Module

| 命令     	| 说明                                                                  	|
|----------	|-----------------------------------------------------------------------	|
| init     	| initialize new module in current directory（在当前目录初始化mod）     	|
| download 	| download modules to local cache(下载依赖包)                           	|
| edit     	| edit go.mod from tools or scripts（编辑go.mod                         	|
| graph    	| print module requirement graph (打印模块依赖图)                       	|
| tidy     	| add missing and remove unused modules(拉取缺少的模块，移除不用的模块) 	|
| vendor   	| make vendored copy of dependencies(将依赖复制到vendor下)              	|
| verify   	| verify dependencies have expected content (验证依赖是否正确）         	|
| why      	| explain why packages or modules are needed(解释为什么需要依赖)        	|


- 添加依赖

> 添加依赖: `go get github.com/xxx/xxx`

> 添加指定版本: `go get github.com/xxx/xxx@v1.6.2`

> 添加指定版本范围: `go get github.com/xxxx/xxx@'<v1.6.2'`

> 添加指定`commit`的版本：`go get github.com/xxxx/xxx@q2516faf3`

- 查看所有可升级依赖版本

> `go list -u -m all`

- 升级依赖

> 升级`Major`: `go get -u github.com/xxx/xxx`

> 升级全部依赖的`Minor`或`PATCH`版本: `go get -u`

> 升级全部依赖的`PATCH`版本: `go get -u=patch`





## 运行命令

- 测试文件中单个函数

```bash
go test -v 文件名_test.go -test.run 函数名
# 直接指定函数不指定文件运行
go test -v -test.run 函数名
```

| 关键点             	| 说明                                                                                          	|
|--------------------	|-----------------------------------------------------------------------------------------------	|
| 导入需要的包       	| import testing (如果你是goland,那么可以忽略，因为ide就自动帮你加上)                           	|
| 执行命令           	| go test file_test.go                                                                          	|
| 测试文件命名       	| 必须以_test.go结尾                                                                            	|
| 功能测试的用力函数 	| 必须以Test开头&&后头跟着的函数名不能以小写字母开头，比如：Testcbs 就是不行的，TestCbs就是ok的 	|
| 功能测试参数       	| testing.T                                                                                     	|
| 压力测试用例函数   	| 必须以Benchmark开头&&其后的函数名不能以小写字母开头(例子同上)                                 	|
| 压力测试参数       	| testing.B                                                                                     	|
| 测试信息           	| .Log方法，默认情况下是不会显示的，只有在go test -v的时候显示                                  	|
| 测试控制           	| 通过Error/Errorf/FailNow/Fatal等来进行测试是否是失败，或者在失败的情况下的控制                	|
| 压力测试命令       	| go test -test.bench file_test.go                                                              	|
| 压力测试的循环体   	| 使用test.B.N                                                                                  	|




## 字符串


### `strings`包API

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



## 路径操作

> Go标准库中还有`path`和`path/filepath`函数有点重复,大部分情况下建议使用`path/filepath`

> 两者区别是：`path`使用`/`作为路径分隔符，`path/filepath`判断系统使用不同的路径分隔符



### `path`包


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



### `filepath`包


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


## 异常panic和恢复recover

> Go语言追求简洁优雅，所以，Go语言不支持传统的`try…catch…finally` 这种异常，因为Go语言的设计者们认为，
> 将异常与控制结构混在一起会很容易使得代码变得混乱。因为开发者很容易滥用异常，甚至一个小小的错误都抛出一个异常。

> 在Go语言中，使用多值返回来返回错误。不要用异常代替错误，更不要用来控制流程。在极个别的情况下，
> 才使用Go中引入的`Exception`处理：`defer`、`panic`、`recover`。


### panic

- 1、内建函数

- 2、假如函数F中书写了`panic`语句，会终止其后要执行的代码，在`panic`所在函数F内如果存在要执行的`defer`函数列表，按照`defer`的逆序执行

- 3、返回函数F的调用者G，在G中，调用函数F语句之后的代码不会执行，假如函数G中存在要执行的`defer`函数列表，按照`defer`的逆序执行，
这里的`defer`有点类似`try-catch-finally`中的`finally`

- 4、直到goroutine整个退出，并报告错误

### recover

- 1、内建函数

- 2、用来控制一个`goroutine`的`panicking`行为，捕获`panic`，从而影响应用的行为

- 3、一般的调用建议
    - a). 在defer函数中，通过`recever`来终止一个`goroutine`的`panicking`过程，从而恢复正常代码的执行
    - b). 可以获取通过`panic`传递的`error`

> 简单来讲：go可以抛出一个`panic`的异常，然后在`defer`中通过`recover`捕获这个异常，然后正常处理。

> 注意：利用`recover`处理`panic`指令，`defer`必须在`panic`之前声明，否则当panic时，`recover`无法捕获到`panic`


- 示例

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


## http

* [关于golang 的readall清空reader](https://www.jianshu.com/p/2ecda118336f)



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
// 读取Body会清空对应Reader，这里使用了result后会被清空
resp.Body = ioutil.NopCloser(result)
//resp.Body = ioutil.NopCloser(bytes.NewBuffer(result))

// 解析参数，填充到Form、PostForm
resp.Request.ParseForm()
// 解析文件上传表单的post参数
resp.Request.ParseMultipartForm(1024)
```


