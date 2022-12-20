# GoGUI

[[toc]]


## Flag

> Golang调用windows下的dll动态库中的函数使用`syscall`调用

* GUI [https://github.com/lxn/walk](https://github.com/lxn/walk)
* [https://github.com/lxn/win](https://github.com/lxn/win)
* [https://github.com/chzyer/readline](https://github.com/chzyer/readline)
* [https://github.com/go-ole/go-ole](https://github.com/go-ole/go-ole)
* [https://github.com/yusufpapurcu/wmi](https://github.com/yusufpapurcu/wmi)
* [https://github.com/akavel/rsrc](https://github.com/akavel/rsrc)
* [https://github.com/tc-hib/winres](https://github.com/tc-hib/winres)
    * [https://github.com/tc-hib/go-winres](https://github.com/tc-hib/go-winres)
* [https://github.com/josephspurrier/goversioninfo](https://github.com/josephspurrier/goversioninfo)
* [https://github.com/fyne-io/fyne](https://github.com/fyne-io/fyne)
* [https://github.com/visualfc/atk](https://github.com/visualfc/atk)
* [https://github.com/vugu/vugu](https://github.com/vugu/vugu)


- [golang windows程序获取管理员权限（UAC ）](https://blog.csdn.net/hejingdong123/article/details/105070150)
- [how-do-i-force-my-net-application-to-run-as-administrator](https://stackoverflow.com/questions/2818179/how-do-i-force-my-net-application-to-run-as-administrator)
- [https://docs.microsoft.com/zh-cn/previous-versions/bb756929(v=msdn.10)](https://docs.microsoft.com/zh-cn/previous-versions/bb756929(v=msdn.10))



## 设置壁纸

* [https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-systemparametersinfoa](https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-systemparametersinfoa)


- main.go

```go
package main

import (
    "errors"
    "flag"
    "image/jpeg"
    "log"
    "os"
    "path/filepath"

    "github.com/golang/sys/windows/registry"
    "golang.org/x/image/bmp"
)

type WallpaperStyle uint

func (wps WallpaperStyle) String() string {
    return wallpaperStyles[wps]
}

const (
    Fill    WallpaperStyle = iota // 填充
    Fit                           // 适应
    Stretch                       // 拉伸
    Tile                          // 平铺
    Center                        // 居中
    Cross                         // 跨区

)

var wallpaperStyles = map[WallpaperStyle]string{
    0: "填充",
    1: "适应",
    2: "拉伸",
    3: "平铺",
    4: "居中",
    5: "跨区"}

var (
    bgFile       string
    bgStyle      int
    sFile        string
    waitTime     int
    activeScreen bool
    passwd       bool
)

var (
    regist registry.Key
)

func init() {
    flag.StringVar(&bgFile, "b", "", "set bg file path.")
    flag.IntVar(&bgStyle, "style", 2, "set desktop WallpaperStyle")

    flag.BoolVar(&activeScreen, "a", true, "set screen active.")
    flag.StringVar(&sFile, "s", "", "set screen save file path.")
    flag.IntVar(&waitTime, "t", 0, "set screen save wait time.")
    flag.BoolVar(&passwd, "p", true, "sets whether the screen saver requires the user to enter a password to display the Windows desktop. ")

}

func main() {
    flag.Parse()

    var err error
    regist, err = registry.OpenKey(registry.CURRENT_USER, `Control Panel\Desktop`, registry.ALL_ACCESS)
    checkErr(err)
    defer regist.Close()

    // 设置桌面背景
    if bgFile != "" {
        style := WallpaperStyle(bgStyle)
        if bgStyle < 0 || bgStyle > 5 {
            style = Stretch
        }
        setDesktopWallpaper(bgFile, style)
        log.Printf("设置桌面背景和位置 --> %s, %s\n", bgFile, style)
    }

    ok := getScreenSaver()
    log.Printf("获取屏幕保护开关 --> %t\n", ok)
    // 关闭屏幕保护
    if ok && !activeScreen {
        regist.DeleteValue("SCRNSAVE.EXE")
        log.Println("关闭屏幕保护")
        return
    }

    // 设置屏幕保护
    if sFile != "" && activeScreen {
        err = regist.SetStringValue("SCRNSAVE.EXE", sFile)
        checkErr(err)
        setScreenSaver(SPI_SETSCREENSAVEACTIVE, TRUE)
        log.Printf("设置屏幕保护 --> %s\n", sFile)
        ok = getScreenSaver()
    }

    if ok {
        // 设置屏幕保护时间
        if waitTime > 0 {
            setScreenSaver(SPI_SETSCREENSAVETIMEOUT, uint32(60*waitTime))
            log.Printf("设置屏幕保护等待时间 --> %d分钟\n", waitTime)
        }

        // 设置屏幕保护 在恢复时使用密码
        var (
            passwdSwitch string
            passwdBool   uint32
        )
        if passwd {
            passwdSwitch = "1"
            passwdBool = TRUE
        } else {
            passwdSwitch = "0"
            passwdBool = FALSE
        }
        // XP / server 2003
        setRegistString("ScreenSaverIsSecure", passwdSwitch)
        // vista or later
        if checkVersion() {
            setScreenSaver(SPI_SETSCREENSAVESECURE, passwdBool)
        }
        log.Printf("设置屏幕保护恢复时是否使用密码 --> %t\n", passwd)
    }
}

func checkErr(err error) {
    if err != nil {
        log.Fatal(err)
    }
}

// http://blog.csdn.net/kfysck/article/details/8153264
// Check that the OS is Vista or later (Vista is v6.0).
func checkVersion() bool {
    version := GetVersion()
    major := version & 0xFF
    if major < 6 {
        return false
    }
    return true
}

// jpg转换为bmp
func ConvertedWallpaper(bgfile string) string {
    file, err := os.Open(bgfile)
    checkErr(err)
    defer file.Close()

    img, err := jpeg.Decode(file) //解码
    checkErr(err)

    bmpPath := os.Getenv("USERPROFILE") + `\Local Settings\Application Data\Microsoft\Wallpaper1.bmp`
    bmpfile, err := os.Create(bmpPath)
    checkErr(err)
    defer bmpfile.Close()

    err = bmp.Encode(bmpfile, img)
    checkErr(err)
    return bmpPath
}

func setDesktopWallpaper(bgFile string, style WallpaperStyle) error {
    ext := filepath.Ext(bgFile)
    // vista 以下的系统需要转换jpg为bmp（xp、2003）
    if !checkVersion() && ext != ".bmp" {
        setRegistString("ConvertedWallpaper", bgFile)
        bgFile = ConvertedWallpaper(bgFile)
    }

    // 设置桌面背景
    setRegistString("Wallpaper", bgFile)

    /* 设置壁纸风格和展开方式
    在Control Panel\Desktop中的两个键值将被设置
    TileWallpaper
     0: 图片不被平铺
     1: 被平铺
    WallpaperStyle
     0:  0表示图片居中，1表示平铺
     2:  拉伸填充整个屏幕
     6:  拉伸适应屏幕并保持高度比
     10: 图片被调整大小裁剪适应屏幕保持纵横比
     22: 跨区
    */
    var bgTileWallpaper, bgWallpaperStyle string
    bgTileWallpaper = "0"
    switch style {
    case Fill: // (Windows 7 or later)
        bgWallpaperStyle = "10"
    case Fit: // (Windows 7 or later)
        bgWallpaperStyle = "6"
    case Stretch:
        bgWallpaperStyle = "2"
    case Tile:
        bgTileWallpaper = "1"
        bgWallpaperStyle = "0"
    case Center:
        bgWallpaperStyle = "0"
    case Cross: // win10 or later
        bgWallpaperStyle = "22"
    }

    setRegistString("WallpaperStyle", bgWallpaperStyle)
    setRegistString("TileWallpaper", bgTileWallpaper)

    ok := SystemParametersInfo(SPI_SETDESKWALLPAPER, FALSE, nil, SPIF_UPDATEINIFILE|SPIF_SENDWININICHANGE)
    if !ok {
        return errors.New("Desktop background Settings fail.")
    }
    return nil
}

func setRegistString(name, value string) {
    err := regist.SetStringValue(name, value)
    checkErr(err)
}

func setScreenSaver(uiAction, uiParam uint32) {
    ok := SystemParametersInfo(uiAction, uiParam, nil, SPIF_UPDATEINIFILE|SPIF_SENDWININICHANGE)
    if !ok {
        log.Fatal("Screen saver Settings fail.")
    }
}

func getScreenSaver() bool {
    _, _, err := regist.GetStringValue("SCRNSAVE.EXE")
    if err != nil {
        return false
    }
    return true
}
```




**win.go**

* [https://github.com/golang/go/wiki/WindowsDLLs](https://github.com/golang/go/wiki/WindowsDLLs)
* [https://github.com/rainycape/dl](https://github.com/rainycape/dl)
* [golang syscall原理](https://blog.csdn.net/u010853261/article/details/88312904)
* [https://gitlab.com/gitlab-org/gitlab-runner/-/blob/main/vendor/golang.org/x/sys/windows/dll_windows.go](https://gitlab.com/gitlab-org/gitlab-runner/-/blob/main/vendor/golang.org/x/sys/windows/dll_windows.go)
* [Breaking all the rules: Using Go to call Windows API](https://medium.com/@justen.walker/breaking-all-the-rules-using-go-to-call-windows-api-2cbfd8c79724)


```go
package main

import (
    "syscall"
    "unsafe"
)

const (
    // 获取屏幕保护开关
    SPI_GETSCREENSAVEACTIVE = 0x0010
    // 设置屏保开关
    SPI_SETSCREENSAVEACTIVE = 0x0011
    // 设置屏保等待时间
    SPI_SETSCREENSAVETIMEOUT = 0x000F
    // 设备屏保在恢复时显示屏幕
    SPI_SETSCREENSAVESECURE = 0x0077

    // 设置桌面背景
    SPI_SETDESKWALLPAPER = 0x0014

    // 将新的系统范围的参数设置写入用户配置文件。
    SPIF_UPDATEINIFILE = 1

    // 更新用户配置文件后广播WM_SETTINGCHANGE消息。
    SPIF_SENDWININICHANGE = 2

    FALSE = 0
    TRUE  = 1
)

var (
    // Library
    libuser32   uintptr
    libkernel32 uintptr

    // Functions
    systemParametersInfo uintptr
    getVersion           uintptr
)

func init() {
    // Library
    libuser32 = MustLoadLibrary("user32.dll")
    libkernel32 = MustLoadLibrary("kernel32.dll")
    // SystemParametersInfo有两个子函数针对不同的字符集：
    // SystemParametersInfoW（Unicode）和SystemParametersInfoA（ANSI）
    systemParametersInfo = MustGetProcAddress(libuser32, "SystemParametersInfoW")
    getVersion = MustGetProcAddress(libkernel32, "GetVersion")
}

func MustLoadLibrary(name string) uintptr {
    lib, err := syscall.LoadLibrary(name)
    //modwinspool    = syscall.NewLazyDLL("winspool.drv")
    //modwinspool, err = syscall.LoadDLL("winspool.drv")
    //kernel32, err = syscall.LoadLibrary("winspool.drv")
    //modwinspool    = windows.NewLazySystemDLL("winspool.drv")
    // procClosePrinter = modwinspool.NewProc("ClosePrinter")
    //h = syscall.MustLoadDLL("kernel32.dll")
    //c = h.MustFindProc("GetDiskFreeSpaceExW")
    if err != nil {
        panic(err)
    }

    return uintptr(lib)
}

func MustGetProcAddress(lib uintptr, name string) uintptr {
    addr, err := syscall.GetProcAddress(syscall.Handle(lib), name)
    if err != nil {
        panic(err)
    }

    return uintptr(addr)
}

/*
之前已经通过注册表设置了壁纸的参数，但是还没有刷新配置。
调用Win32 API位于user32.dll中函数SystemParametersInfo设置桌面壁纸，它支持我们从系统中获得硬件和配置信息。
它有四个参数，第一个指明调用这个函数所要执行的操作，接下来的两个参数指明将要设置的数据，依据第一个参数的设定。
*/
// uiAction：该参数指定要查询或设置的参数，换壁纸是SPI_SETDESKWALLPAPER（使得壁纸改变保存并持续可见）
// uiParam：附加值
// pvParam：要修改或者查询的缓冲区
// fWinIni：指定用户配置文件是否被更新，如果是这样，则指定是否 WM_SETTINGCHANGE 将消息广播到所有的顶层窗口的更改通知他们，可以是0也可以是下列值：
//      SPIF_UPDATEINIFILE：把新的系统参数的设置内容写入用户配置文件。
//      SPIF_SENDCHANGE：在更新用户配置文件之后发送WM_SETTINGCHANGE消息。
//      SPI_SENDWININICHANGE：与SPIF_SENDCHANGE一样。
// 换壁纸我们要给uiAction指定SPI_SETDESKWALLPAPER标志位，然后把SPIF_UPDATEINIFILE传递给fWinIni。
func SystemParametersInfo(uiAction, uiParam uint32, pvParam unsafe.Pointer, fWinIni uint32) bool {
    // nargs 即参数的个数,一旦传错, 轻则调用失败,重者直接APPCARSH,多余的参数,用0代替
    ret, _, _ := syscall.Syscall6(systemParametersInfo, 4, uintptr(uiAction), uintptr(uiParam), uintptr(pvParam),
        uintptr(fWinIni), 0, 0)
    return ret != 0
}

func GetVersion() int64 {
    ret, _, _ := syscall.Syscall(getVersion, 0, 0, 0, 0)
    return int64(ret)
}

func stringToPointer(str string) unsafe.Pointer {
    return unsafe.Pointer(syscall.StringToUTF16Ptr(str))
}
```


## 操作注册表

```go
package main

import (
    "golang.org/x/sys/windows/registry"
)

func main() {
    // 创建：指定路径的项
    // 路径：HKEY_CURRENT_USER\Software\Hello Go
    key, exists, _ := registry.CreateKey(registry.CURRENT_USER, `SOFTWARE\Hello Go`, registry.ALL_ACCESS)
    defer key.Close()

    // 判断是否已经存在了
    if exists {
        println(`键已存在`)
    } else {
        println(`新建注册表键`)
    }

    // 写入：32位整形值
    key.SetDWordValue(`32位整形值`, uint32(123456))
    // 写入：64位整形值
    key.SetQWordValue(`64位整形值`, uint64(123456))
    // 写入：字符串
    key.SetStringValue(`字符串`, `hello`)
    // 写入：字符串数组
    key.SetStringsValue(`字符串数组`, []string{`hello`, `world`})
    // 写入：二进制
    key.SetBinaryValue(`二进制`, []byte{0x11, 0x22})

    // 读取：字符串
    s, _, _ := key.GetStringValue(`字符串`)
    println(s)

    // 读取：一个项下的所有子项
    keys, _ := key.ReadSubKeyNames(0)
    for _, key_subkey := range keys {
        // 输出所有子项的名字
        println(key_subkey)
    }

    // 创建：子项
    subkey, _, _ := registry.CreateKey(key, `子项`, registry.ALL_ACCESS)
    defer subkey.Close()

    // 删除：子项
    // 该键有子项，所以会删除失败
    // 没有子项，删除成功
    registry.DeleteKey(key, `子项`)
}
```



