# Go使用

> go语言中的函数可以有多个返回值

> go语言是一种函数式编程语言，函数是go语言中的一等公民，函数的参数，返回值以及函数体内都可以存在函数 

> go中的函数没有默认参数、可选参数也没有函数重载、操作符重载，但有可变参数列表，即（变量　...类型），此时类型钱的变量是一个此类型的数组


* [strconv包使用](https://my.oschina.net/byonds/blog/488492)

* [runtime包](https://www.jianshu.com/p/84bac7932394)

* [File操作](https://blog.csdn.net/TDCQZD/article/details/81835149)

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
