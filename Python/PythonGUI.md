# PythonGUI








## `wxPython`

[https://wxpython.org/pages/overview/](https://wxpython.org/pages/overview/)

> `wxPython`是一个用于`Python`编程语言的跨平台`GUI`工具包。包含流行的`wxWidgets`跨平台库的`GUI`组件，该库是用`C++`编写的。

> 目前支持的平台是`Windows`、`Mac OS X`、`macOS`、`Linux`或其他具有`GTK2`或`GTK3`库的类`Unix`系统。


* [WxPython教程](https://www.yiibai.com/wxpython)
* [WxPython控件](http://xoomer.virgilio.it/infinity77/wxPython/widgets.html)

* [https://www.jianshu.com/p/a3803f130c99](https://www.jianshu.com/p/a3803f130c99)
* [https://blog.csdn.net/mist99/article/details/80742548](https://blog.csdn.net/mist99/article/details/80742548)
* [https://blog.csdn.net/xufive/article/details/82665460](https://blog.csdn.net/xufive/article/details/82665460)


### 欢迎界面
```python
import wx.adv
import time
def creat_splash():
    # create a welcome screen
    screen = wx.Image("file.png").ConvertToBitmap()
    # 参数1000代表 界面显示1s，后面添加1s延时，等欢迎界面结束后再启动主界面。
    wx.adv.SplashScreen(screen, wx.adv.SPLASH_CENTRE_ON_SCREEN | wx.adv.SPLASH_TIMEOUT, 1000, None, -1)
    time.sleep(1)
```

### 最小化任务栏
```python
import wx
import wx.adv
 
class TaskBarIcon(wx.adv.TaskBarIcon):
    ID_EXIT = wx.NewId()
 
    def __init__(self, frame):
        wx.adv.TaskBarIcon.__init__(self)
        self.frame = frame
        self.SetIcon(wx.Icon(name='favicon.ico', type=wx.BITMAP_TYPE_ICO), 'TaskBarIcon!')
        self.Bind(wx.adv.EVT_TASKBAR_LEFT_DCLICK, self.OnTaskBarLeftDClick)
        self.Bind(wx.EVT_MENU, self.OnExit, id=self.ID_EXIT)
 
    #双击托盘图标打开界面
    def OnTaskBarLeftDClick(self, event):
        if self.frame.IsIconized():
            self.frame.Iconize(False)
        if not self.frame.IsShown():
            self.frame.Show(True)
        self.frame.Raise()
 
    def OnExit(self, event):
        self.Destroy()
 
    # override
    def CreatePopupMenu(self):
        menu = wx.Menu()
        menu.Append(self.ID_EXIT, 'Exit')
        return menu
 
class Frame(wx.Frame):
    def __init__(
            self, parent=None, id=wx.ID_ANY, title='TaskBarIcon', pos=wx.DefaultPosition,
            size=wx.DefaultSize, style=wx.DEFAULT_FRAME_STYLE
    ):
        wx.Frame.__init__(self, parent, id, title, pos, size, style)
        #在init中创建一个系统托盘实例即可
        self.taskBarIcon = TaskBarIcon(self)
```



## `PySide`

[https://wiki.qt.io/Qt_for_Python/zh](https://wiki.qt.io/Qt_for_Python/zh)


> `Pyside`最初是为诺基亚开发的，而它是Qt技术的所有者。
> 当诺基亚将Qt出售给`Digia`（现在是Qt公司）时，Qt4原始`Pyside`代码的所有版权也转移到了Qt公司。

> `Qt for Python`项目旨在为`Qt5`提供`PySide`模块的完整端口。该开发于2015年5月在GitHub上开始。
> 该项目设法将`Pyside`移植到`Qt5.3`,`5.4`和`5.5`。

> 该`PySide2`模块于2018年6月中旬作为技术预览版发布（支持`Qt5.11`）。并在同年12月支持`Qt5.12`并正式发布

> `PySide2`模块提供对`QtCore`，`QtGui`等各个Qt模块的访问。还附带了`Shiboken2`、`CPython`绑定代码生成器，
> 可用于为`C`或`C++`代码生成`Python`绑定。



## `PyGObject`

[https://pygobject.readthedocs.io/en/latest/](https://pygobject.readthedocs.io/en/latest/)

> `PyGObject`是一个`Python`包，它为基于`GObject`的库提供绑定，例如`GTK`、`GStreamer`、`WebKitGTK`、`GLib`、`GIO`等等。

> 它支持`Linux`，`Windows`和`macOS`，适用于`Python2.7+`、`Python3.5+`、`PyPy`和`PyPy3`。

