# Utils

## string
```go

import (
	"bytes"
	"fmt"
	"regexp"
	"strings"
	"unicode"
)

/**
 * 驼峰转下划线
 * // 1. 普通使用
 * log.Println(CamelCase("AAAA"))
 * log.Println(CamelCase("IconUrl"))
 * log.Println(CamelCase("iconUrl"))
 * log.Println(CamelCase("parentId"))
 * log.Println(CamelCase("a9b9Ba"))
 * log.Println(CamelCase("_An"))
 * // s输出
 * //2019/03/20 16:34:25 a_a_a_a
 * //2019/03/20 16:34:25 icon_url
 * //2019/03/20 16:34:25 icon_url
 * //2019/03/20 16:34:25 parent_id
 * //2019/03/20 16:34:25 a9b9ba
 * //2019/03/20 16:34:25 Xan
 *
 * @param s string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:24
 */
func CamelCase(s string) string {
	if s == "" {
		return ""
	}
	t := make([]byte, 0, 32)
	i := 0
	if s[0] == '_' {
		t = append(t, 'X')
		i++
	}
	for ; i < len(s); i++ {
		c := s[i]
		if c == '_' && i+1 < len(s) && isASCIIUpper(s[i+1]) {
			continue
		}
		if isASCIIDigit(c) {
			t = append(t, c)
			continue
		}

		if isASCIIUpper(c) {
			c ^= ' '
		}
		t = append(t, c)

		for i+1 < len(s) && isASCIIUpper(s[i+1]) {
			i++
			t = append(t, '_')
			t = append(t, bytes.ToLower([]byte{s[i]})[0])
		}
	}
	return string(t)
}

/**
 * 判断为ASCII编码大写
 *
 * @param c byte
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:26
 */
func isASCIIUpper(c byte) bool {
	return 'A' <= c && c <= 'Z'
}

/**
 * 判断为ASCII编码数字
 *
 * @param c byte
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:27
 */
func isASCIIDigit(c byte) bool {
	return '0' <= c && c <= '9'
}

/**
 * 转换为snake
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:27
 */
func ToSnakeCase(str string) string {
	var matchAllCap = regexp.MustCompile("([a-z0-9])([A-Z])")
	snake := matchAllCap.ReplaceAllString(str, "${1}_${2}")
	fmt.Println(snake)
	return strings.ToLower(snake)
}

/**
 * 转换为驼峰
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:28
 */
func ToCamelCase(str string) string {
	temp := strings.Split(str, "-")
	for i, r := range temp {
		if i > 0 {
			temp[i] = strings.Title(r)
		}
	}
	return strings.Join(temp, "")
}

/**
 * 转换为驼峰，使用正则
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:30
 */
func ToCamelCaseRegexp(str string) string {
	var reg = regexp.MustCompile("(_|-)([a-zA-Z]+)")
	camel := reg.ReplaceAllString(str, " $2")
	camel = strings.Title(camel)
	camel = strings.Replace(camel, " ", "", -1)
	return camel
}

/**
 * 驼峰式写法转为下划线写法
 *
 * @param name string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:30
 */
func UnderscoreName(name string) string {
	buffer := NewBuffer()
	for i, r := range name {
		if unicode.IsUpper(r) {
			if i != 0 {
				buffer.Append('_')
			}
			buffer.Append(unicode.ToLower(r))
		} else {
			buffer.Append(r)
		}
	}
	return buffer.String()
}

/**
 * 下划线写法转为驼峰写法
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:31
 */
func CamelName(str string) string {
	str = strings.Replace(str, "_", " ", -1)
	str = strings.Title(str)
	return strings.Replace(str, " ", "", -1)
}

/**
 * 搜索字符串数组中是否存在指定字符串
 *
 * @param slice []string
 * @param s string
 * @return int 返回-1为未搜寻到
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:32
 */
func SearchString(slice []string, s string) int {
	for i, v := range slice {
		if s == v {
			return i
		}
	}
	return -1
}

/**
 * 蛇形字符串
 * snake string, XxYy to xx_yy , XxYY to xx_yy
 *
 * @param s string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:33
 */
func SnakeString(s string) string {
	data := make([]byte, 0, len(s)*2)
	j := false
	num := len(s)
	for i := 0; i < num; i++ {
		d := s[i]
		if i > 0 && d >= 'A' && d <= 'Z' && j {
			data = append(data, '_')
		}
		if d != '_' {
			j = true
		}
		data = append(data, d)
	}
	return strings.ToLower(string(data[:]))
}

/**
 * 驼峰字符串转换
 *
 * @param s string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:35
 */
func CamelString(s string) string {
	data := make([]byte, 0, len(s))
	j := false
	k := false
	num := len(s) - 1
	for i := 0; i <= num; i++ {
		d := s[i]
		if k == false && d >= 'A' && d <= 'Z' {
			k = true
		}
		if d >= 'a' && d <= 'z' && (j || k == false) {
			d = d - 32
			j = false
			k = true
		}
		if k && d == '_' && num > i && s[i+1] >= 'a' && s[i+1] <= 'z' {
			j = true
			continue
		}
		data = append(data, d)
	}
	return string(data[:])
}

/**
 * 判断字符串是否为空
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:36
 */
func IsStringEmpty(str string) bool {
	if str == "" || len(str) == 0 || strings.TrimSpace(str) == "" {
		return true
	}
	//isNil := reflect.ValueOf(str).IsNil()
	//if isNil {
	//	return true
	//}
	return false
}

/**
 * 字符串截取
 *
 * @param str 字符串
 * @param pos 开始位置
 * @param length 结束位置
 * @return
 * @author claer woytu.com
 * @date 2019/6/29 3:27
 */
func Substring(str string, pos, length int) string {
	runes := []rune(str)
	l := pos + length
	if l > len(runes) {
		l = len(runes)
	}
	return string(runes[pos:l])
}

/**
 * 首字母转大写
 *
 * @param null
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:19
 */
func ToUpper(str string) string {
	for i, v := range str {
		return string(unicode.ToUpper(v)) + str[i+1:]
	}
	return ""
}

/**
 * 首字母转小写
 *
 * @param null
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:19
 */
func ToLower(str string) string {
	for i, v := range str {
		return string(unicode.ToLower(v)) + str[i+1:]
	}
	return ""
}

```

## 时间
```go

import (
	"time"
)

/**
 * 转换为自定义格式
 *
 * @param timestamp uint32
 * @param format string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:38
 */
func GetDateFormat(timestamp uint32, format string) string {
	if timestamp <= 0 {
		return ""
	}
	tm := time.Unix(int64(timestamp), 0)
	return tm.Format(format)
}

/**
 * 获取时间，使用默认格式
 *
 * @param timestamp uint32
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:38
 */
func GetDate(timestamp uint32) string {
	if timestamp <= 0 {
		return ""
	}
	tm := time.Unix(int64(timestamp), 0)
	return tm.Format("2006-01-02")
}

/**
 * 获取时间，格式yyyy-MM-dd HH:mm
 *
 * @param timestamp uint32
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:39
 */
func GetyyyyMMddHHmm(timestamp uint32) string {
	if timestamp <= 0 {
		return ""
	}
	tm := time.Unix(int64(timestamp), 0)
	return tm.Format("2006-01-02 15:04")
}

/**
 * 解析字符串时间为系统格式
 *
 * @param times string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:42
 */
func GetTimeParse(times string) int64 {
	if "" == times {
		return 0
	}
	loc, _ := time.LoadLocation("Local")
	parse, _ := time.ParseInLocation("2006-01-02 15:04", times, loc)
	return parse.Unix()
}

/**
 * 解析字符串日期为系统格式
 *
 * @param dates string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:42
 */
func GetDateParse(dates string) int64 {
	if "" == dates {
		return 0
	}
	loc, _ := time.LoadLocation("Local")
	parse, _ := time.ParseInLocation("2006-01-02", dates, loc)
	return parse.Unix()
}

/**
 * 判断时间是否为空
 *
 * @param t time.Time
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:43
 */
func IsTimeEmpty(t time.Time) bool {
	if !t.IsZero() {
		return false
	}
	return true
}

/**
 * 时间转字符串，格式yyyy-MM-dd HH:mm:ss
 *
 * @param t time.Time
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:43
 */
func TimeToString(t time.Time) string {
	if IsTimeEmpty(t) {
		t = time.Now()
	}
	format := t.Format("2006-01-02 15:04:05")
	return format
}

/**
 * 字符串转时间
 *
 * @param str string
 * @return
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:45
 */
func StringToTime(str string) time.Time {
	if IsStringEmpty(str) {
		return time.Now()
	}
	local, _ := time.LoadLocation("Local")
	t, _ := time.ParseInLocation("2006-01-02 15:04:05", "2017-06-20 18:16:15", local)
	return t
}
```

## 执行外部命令

```go
/**
 * 执行python脚本
 *
 * @param script string 要执行的Python脚本，应该是完整的路径
 * @param args ...string 命令参数
 * @return result string 执行的结果
 * @return err error 错误
 * @Description
 * @author claer www.bajins.com
 * @date 2019/7/16 16:52
 */
func ExecutePython(script string, args ...string) (result string, err error) {
	if !IsFile(script) {
		err = errors.New(fmt.Sprintf(script, "error：%s", "文件不存在"))
		return "", err
	}
	name := "python"
	if runtime.GOOS == "linux" {
		name = "python3"
	}
	// 把脚本和参数组合到一个字符串数组
	args = append([]string{script}, args...)
	out, err := exec.Command(name, args...).Output()
	// exit status 2 一般是文件没有找到
	// exit status 1 一般是命令执行错误
	if err != nil {
		return string(out), err
	}
	result = string(out)

	return result, nil
}
```