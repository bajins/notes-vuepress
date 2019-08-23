# PythonGUI








## `wxPython`

[https://wxpython.org/pages/overview/](https://wxpython.org/pages/overview/)

> `wxPython`是一个用于`Python`编程语言的跨平台`GUI`工具包。包含流行的`wxWidgets`跨平台库的`GUI`组件，该库是用`C++`编写的。

> 目前支持的平台是`Windows`、`Mac OS X`、`macOS`、`Linux`或其他具有`GTK2`或`GTK3`库的类`Unix`系统。

* [http://thisis.yorven.site/blog/index.php/2017/09/16/wxpython-jiaocheng-yi/](http://thisis.yorven.site/blog/index.php/2017/09/16/wxpython-jiaocheng-yi/)
* [https://github.com/necan/wxPython-tutorial/blob/master/1.%E4%BB%8B%E7%BB%8D.md](https://github.com/necan/wxPython-tutorial/blob/master/1.%E4%BB%8B%E7%BB%8D.md)
* [WxPython教程](https://www.yiibai.com/wxpython)
* [WxPython控件](http://xoomer.virgilio.it/infinity77/wxPython/widgets.html)

* [https://www.jianshu.com/p/a3803f130c99](https://www.jianshu.com/p/a3803f130c99)
* [https://blog.csdn.net/mist99/article/details/80742548](https://blog.csdn.net/mist99/article/details/80742548)
* [https://blog.csdn.net/xufive/article/details/82665460](https://blog.csdn.net/xufive/article/details/82665460)
* [https://blog.csdn.net/u014647208/article/details/77895274](https://blog.csdn.net/u014647208/article/details/77895274)

* [https://jusene.github.io/2017/12/26/wxpython/](https://jusene.github.io/2017/12/26/wxpython/)
* [http://www.17python.com/?c=9](http://www.17python.com/?c=9)

> `wx.Window` 是一个基类，许多构件从它继承。包括`wx.Frame`构件。可以在所有的子类中使用`wx.Window`的方法。
>
> `wx.adv`模块包含比核心命名空间中更高级和/或更少使用的类。
> 它们在单独的模块中提供，以帮助减少那些不需要任何这些类的应用程序的开销和依赖性。

### 方法
* `SetTitle( string title )` — 设置窗口标题。只可用于框架和对话框
* `SetToolTip( wx.ToolTip tip )` — 为窗口添加提示
* `SetSize( wx.Size size )` — 设置窗口的尺寸
* `SetPosition( wx.Point pos )` — 设置窗口出现的位置
* `Show( show = True )` — 显示或隐藏窗口。其中的参数可以为`True`或`False`
* `Move( wx.Point pos )` — 将窗口移动到指定位置
* `SetCursor( wx.StockCursor id )` — 设置窗口的鼠标指针样式

### `wx.Event`的子类

* `wx.CloseEvent`:框架关闭时触发，事件类型有普通框架关闭和系统关闭事件。
* `wx.CommandEvent`：与窗口部件的简单的交互都会触发此事件，如按钮单击，菜单项选择等。
* `wx.KeyEvent`:按键动作。
* `wx.MouseEvent`：鼠标事件。
* `wx.PaintEvent`:当窗口内容被重画时触发。
* `wx.SizeEvent`:窗口大小或布局改变时触发。
* `wx.TimerEvent`:由类wx.Timer创建，定期事件。



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

```python
import wx
#自定义一个窗口类MyFrame
class MyFrame(wx.Frame):
    def __init__(self):
        super().__init__(parent=None,title="下拉列表",size=(400,130))
        self.Center() #设置窗口居中
        #放一个面板，用于布局其他控件
        panel=wx.Panel(parent=self)
        hbox1=wx.BoxSizer(wx.HORIZONTAL)
        #创建静态文本
        statictext=wx.StaticText(panel,label='选择你喜欢的编程语言：')
        list1=['Python','Java',"C++"]
        ch1=wx.ComboBox(panel,-1,value='C',choices=list1,style=wx.CB_SORT)
        #添加事件处理
        self.Bind(wx.EVT_COMBOBOX,self.on_combobox,ch1)

        hbox1.Add(statictext,1,flag=wx.LEFT |wx.RIGHT|wx.FIXED_MINSIZE,border=5)
        hbox1.Add(ch1,1,flag=wx.LEFT |wx.RIGHT|wx.FIXED_MINSIZE,border=5)

        hbox2=wx.BoxSizer(wx.HORIZONTAL)
        statictext=wx.StaticText(panel,label='选择性别：')
        list2=['男','女']
        ch2=wx.Choice(panel,-1,choices=list2)
        hbox2.Add(statictext,1,flag=wx.LEFT |wx.RIGHT|wx.FIXED_MINSIZE,border=5)
        hbox2.Add(ch2,1,flag=wx.LEFT |wx.RIGHT|wx.FIXED_MINSIZE,border=5)

        #添加事件处理
        self.Bind(wx.EVT_CHOICE,self.on_choice,ch2)
        vbox=wx.BoxSizer(wx.VERTICAL)
        vbox.Add(hbox1,1,flag=wx.ALL|wx.EXPAND,border=5)
        vbox.Add(hbox2,1,flag=wx.ALL|wx.EXPAND,border=5)
        

        #ListBox类实例
        self.listbox1 = wx.ListBox(panel,-1,(50,80),(200, 60),list1,wx.LB_SINGLE)  #wx.LB_SINGLE只能选择单个
        self.listbox2 = wx.ListBox(panel, -1,(50, 150), (200, 60), list2, wx.LB_MULTIPLE)#多选
        #CheckListBox类实例
        self.listbox3 = wx.CheckListBox(panel,-1,(300,80),(200, 60),list1)
        #Choice类实例
        self.listbox4 = wx.Choice(panel,-1,(300,200),(200, 40),list2)
        self.listbox4.Bind(wx.EVT_CHOICE,self.One_Play)
        #进度条展示
        self.gauge1 = wx.Gauge(panel,-1,100,(50, 250), (200, 60))
        self.value = 1
        self.gauge1.SetValue(self.value)
        #将wx空闲的事件绑定到进度条上
        self.Bind(wx.EVT_IDLE,self.Gauge_Test)
        #滑块
        self.slider = wx.Slider(panel,-1,10,10,100,(300, 350), (200, 60))
        self.slider.Bind(wx.EVT_SCROLL,self.Slider_Test)

        panel.SetSizer(vbox)

    def on_combobox(self,event):
        print("选择{0}".format(event.GetString()))

    def on_choice(self,event):
        print("选择{0}".format(event.GetString()))

#自定以一个应用程序类
class App(wx.App):
    def OnInit(self):
        #创建窗口对象
        frame=MyFrame()
        frame.Show()
        return True
    def OnExit(self):
        print("应用程序退出")
        return 0

if __name__=='__main__':
    app=App()#创建自定以对象App
    app.MainLoop()
```


## `PySide`

[https://wiki.qt.io/Qt_for_Python/zh](https://wiki.qt.io/Qt_for_Python/zh)

[https://gaianote.github.io/2018/09/15/PyQt5%E5%AD%A6%E4%B9%A0%E4%B9%8Bline-edit/](https://gaianote.github.io/2018/09/15/PyQt5%E5%AD%A6%E4%B9%A0%E4%B9%8Bline-edit/)

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

