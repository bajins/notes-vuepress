# Go操作Windows



## 设置壁纸

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




- win.go

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

    // Writes the new system-wide parameter setting to the user profile.
    SPIF_UPDATEINIFILE = 1

    // Broadcasts the WM_SETTINGCHANGE message after updating the user profile.
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
    // Functions
    systemParametersInfo = MustGetProcAddress(libuser32, "SystemParametersInfoW")
    getVersion = MustGetProcAddress(libkernel32, "GetVersion")
}

func MustLoadLibrary(name string) uintptr {
    lib, err := syscall.LoadLibrary(name)
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

/* 通过调用Win32 API函数SystemParametersInfo 设置桌面壁纸
之前我们已经设置了壁纸的类型，但是壁纸图片的实际文件路径还没设置。
SystemParametersInfo 这个函数位于user32.dll中，它支持我们从系统中获得硬件和配置信息。
它有四个参数，第一个指明调用这个函数所要执行的操作，接下来的两个参数指明将要设置的数据，依据第一个参数的设定。
最后一个允许指定改变是否被保存。这里第一个参数我们应指定SPI_SETDESKWALLPAPER，指明我们是要设置壁纸。
接下来是文件路径。在Vista之前必须是一个.bmp的文件。Vista和更高级的系统支持.jpg格式。
SPI_SETDESKWALLPAPER参数使得壁纸改变保存并持续可见。
*/
func SystemParametersInfo(uiAction, uiParam uint32, pvParam unsafe.Pointer, fWinIni uint32) bool {
    ret, _, _ := syscall.Syscall6(systemParametersInfo, 4,
        uintptr(uiAction),
        uintptr(uiParam),
        uintptr(pvParam),
        uintptr(fWinIni),
        0,
        0)

    return ret != 0
}

func GetVersion() int64 {
    ret, _, _ := syscall.Syscall(getVersion, 0,
        0,
        0,
        0)
    return int64(ret)
}

func stringToPointer(str string) unsafe.Pointer {
    return unsafe.Pointer(syscall.StringToUTF16Ptr(str))
}
```