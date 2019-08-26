# PythonGUI








## `wxPython`

[https://wxpython.org/pages/overview/](https://wxpython.org/pages/overview/)

> `wxPython`是一个用于`Python`编程语言的跨平台`GUI`工具包。包含流行的`wxWidgets`跨平台库的`GUI`组件，该库是用`C++`编写的。

> 目前支持的平台是`Windows`、`Mac OS X`、`macOS`、`Linux`或其他具有`GTK2`或`GTK3`库的类`Unix`系统。

* [http://thisis.yorven.site/blog/index.php/2017/09/16/wxpython-jiaocheng-yi/](http://thisis.yorven.site/blog/index.php/2017/09/16/wxpython-jiaocheng-yi/)
* [https://github.com/necan/wxPython-tutorial/blob/master/1.%E4%BB%8B%E7%BB%8D.md](https://github.com/necan/wxPython-tutorial/blob/master/1.%E4%BB%8B%E7%BB%8D.md)
* [https://jusene.github.io/2017/12/26/wxpython/](https://jusene.github.io/2017/12/26/wxpython/)
* [http://www.17python.com/?c=9](http://www.17python.com/?c=9)
* [WxPython教程](https://www.yiibai.com/wxpython)



- [https://www.jianshu.com/p/a3803f130c99](https://www.jianshu.com/p/a3803f130c99)
- [https://blog.csdn.net/mist99/article/details/80742548](https://blog.csdn.net/mist99/article/details/80742548)
- [https://blog.csdn.net/xufive/article/details/82665460](https://blog.csdn.net/xufive/article/details/82665460)
- [https://blog.csdn.net/u014647208/article/details/77895274](https://blog.csdn.net/u014647208/article/details/77895274)


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

### `style`样式常量
#### Frame
| 参数                       | 描述      | 说明 |
|--------------------------|---------|----|
| wx.DEFAULT_FRAME_STYLE   | 默认的框架样式 |
| wx.CAPTION               | 标题      |
| wx.MINIMIZE_BOX          | 缩小      |
| wx.MAXIMIZE_BOX          | 放大      |
| wx.CLOSE_BOX             | 关闭      |
| wx.SYSTEM_MENU           | 系统菜单    |
| wx.RESIZE_BORDER         | 恢复窗口大小  |
| wx.STAY_ON_TOP           | 固定不能移动  |
| wx.FRAME_FLOAT_ON_PARENT |


#### StaticText
| 参数                     | 描述                          | 说明 |
|------------------------|-----------------------------|----|
| wx.ALIGN_LEFT          | 控制标签的大小及对齐                  |
| wx.ALIGN_RIGHT         | 控制标签的大小及对齐                  |
| wx.ALIGN_CENTER        | 控制标签的大小及对齐                  |
| wx.ST_NO_AUTORESIZE    | 防止标签的自动调整大小                 |
| wx.ST_ELLIPSIZE_START  | 省略号(...)显示在开始，如果文本的大小大于标签尺寸 |
| wx.ST_ELLIPSIZE_MIDDLE | 省略号(...)显示在中间，如果文本的大小大于标签尺寸 |
| wx.ST_ELLIPSIZE_END    | 省略号(...)显示在结尾，如果文本的大小大于标签尺寸 |



#### Font
| 参数                   | 描述              | 说明           |
|----------------------|-----------------|--------------|
| Wx.FONTSTYLE_NORMAL  | 字体绘制不使用倾斜       | fontfamiy参数  |
| wx.FONTSTYLE_ITALIC  | 字体是斜体           | fontfamiy参数  |
| wx.FONTSTYLE_SLANT   | 字体是倾斜的，但以罗马风格形式 | fontfamiy参数  |
| Wx.FONTWEIGHT_NORMAL | 普通字体            | fontweight参数 |
| wx.FONTWEIGHT_LIGHT  | 高亮字体            | fontweight参数 |
| wx.FONTWEIGHT_BOLD   | 粗体              | fontweight参数 |



#### TextCtrl
| 参数              | 描述                              | 说明 |
|-----------------|---------------------------------|----|
| wx.TE_MULTILINE | 文本控件允许多行，如果未指定该样式，换行字符不应该在控件中使用 |
| wx.TE_PASSWORD  | 文本将回显星号                         |
| wx.TE_READONLY  | 文本将不可编辑                         |
| wx.TE_LEFT      | 在控件中的文本将左对齐                     |
| wx.TE_CENTER    | 在控件中的文本将居中对齐                    |
| wx.TE_RIGHT     | 在控件中的文本将居右对齐                    |



#### CheckBox
| 参数             | 描述              | 说明 |
|----------------|-----------------|----|
| wx.CHK_2STATE  | 创建两个状态复选框，默认    |
| wx.CHK_3STATE  | 创建三态复选框         |
| wx.ALIGN_RIGHT | 把一个盒子标签放在复选框的左侧 |



#### ComboBox
| 参数             | 描述          | 说明 |
|----------------|-------------|----|
| wx.CB_SIMPLE   | 组合框与永久显示的列表 |
| wx.CB_DROPDOWN | 组合框与下拉列表    |
| wx.CB_READONLY | 选择的项目是不可编辑  |
| wx.CB_SORT     | 列表显示按字母顺序   |



#### Guage
| 参数               | 描述                  | 说明 |
|------------------|---------------------|----|
| wx.GA_HORIZONTAL | 进度条的横向布局            |
| wx.GA_VERTICAL   | 进度条的垂直布局            |
| wx.GA_SMOOTH     | 平滑的进度条使用一个像素宽度的更新步骤 |
| wx.GA_TEXT       | 显示当前值在百分比形式         |



#### Slider
| 参数                   | 描述             | 说明 |
|----------------------|----------------|----|
| wx.SL_HORIZONTAL     | 水平滑块           |
| wx.SL_VERTICAL       | 垂直滑块           |
| wx.SL_AUTOTICKS      | 在滑块显示tickmarks |
| wx.SL_LABELS         | 显示最小值，最大值和当前值  |
| wx.SL_MIN_MAX_LABELS | 显示最小值和最大值      |
| wx.SL_VALUE_LABEL    | 只显示当前值         |



#### ToolBar
| 参数                  | 描述                            | 说明 |
|---------------------|-------------------------------|----|
| wx.TB_FLAT          | 提供该工具栏平面效果                    |
| wx.TB_HORIZONTAL    | 指定水平布局(默认)                    |
| wx.TB_VERTICAL      | 指定垂直布局                        |
| wx.TB_DEFAULT_STYLE | 结合wx.TB_FLAT和wx.TB_HORIZONTAL |
| wx.TB_DOCKABLE      | 使工具栏浮动和可停靠                    |
| wx.TB_NO_TOOLTIPS   | 当鼠标悬停在工具栏不显示简短帮助工具提示          |
| wx.TB_NOICONS       | 指定工具栏按钮没有图标，默认显示              |
| wx.TB_TEXT          | 显示在工具栏按钮上的文本，默认只有图标显示         |




#### Dialog
| 参数                      | 描述                             | 说明 |
|-------------------------|--------------------------------|----|
| wx.CAPTION              | 对话框的文字说明                       |
| wx.DEFAULT_DIALOG_STYLE | wx.CLOSE_BOX和wx.SYSTEM_MENU的组合 |
| wx.RESIZE_BORDER        | 显示可调整窗口的大小                     |
| wx.SYSTEM_MENU          | 显示系统菜单                         |
| wx.CLOSE_BOX            | 框架上显示关闭                        |
| wx.MAXIMIZE_BOX         | 在对话框中显示一个最大化框                  |
| wx.MINIMIZE_BOX         | 在对话框中显示一个最小化框                  |
| wx.STAY_ON_TOP          | 确保对话框停留在所有其他窗口的顶部              |
| wx.DIALOG_NO_PARENT     | 为防止产生无看管对话框，不推荐使用模态对话框         |


#### FileDialog
| 参数                     | 描述                           | 说明 |
|------------------------|------------------------------|----|
| wx.FD_DEFAULT_STYLE    | 相当于wx.FD_OPEN                |
| wx.FD_OPEN             | 这是一个打开的对话框，该对话框的默认按钮的标签是‘打开’ |
| wx.FD_SAVE             | 这是一个保存对话框，该对话框的默认按钮的标签是‘保存’  |
| wx.FD_OVERWRITE_PROMPT | 对于只保存的对话框，如果一个文件将被覆盖，提示进行确认  |
| wx.FD_MULTIPLE         | 仅适合打开的对话框，允许选择多个文件           |
| wx.FD_CHANGE_DIR       | 更改当前工作目录到用户选择的文件目录           |


#### SplitterWindow
| 参数                   | 描述                      | 说明 |
|----------------------|-------------------------|----|
| wx.SP_3D             | 绘制3d效果边框和窗扇             |
| wx.SP_THIN_SASH      | 绘制一个薄窗扇                 |
| wx.SP_3DSASH         | 绘制3d效果窗扇                |
| wx.SP_BORDER         | 绘制标准边框                  |
| wx.SP_NOBORDER       | 无边框                     |
| wx.SP_PERMIT_UNSPLIT | 总是允许取消分割，即使采用最小的窗格大小不为零 |


#### HTMLWindow
| 参数                    | 描述                 | 说明 |
|-----------------------|--------------------|----|
| wx.HW_SCROLLBAR_NEVER | 永远不显示滚动条，即使是页面比窗口大 |
| wx.HW_SCROLLBAR_AUTO  | 只在页面大小超过窗口大小显示滚动条  |
| wx.HW_NO_SELECTION    | 不要让用户选择文本          |



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

### 多线程防假死与线程间传递消息

```python
import time
import wx
from threading import Thread
from wx.lib.pubsub import pub


class TestThread(Thread):
    def __init__(self):
        # 线程实例化时立即启动
        Thread.__init__(self)
        self.start()

    def run(self):
        # 线程执行的代码
        for i in range(101):
            time.sleep(0.03)
            wx.CallAfter(pub.sendMessage, "update", msg=i)
            time.sleep(0.5)


class MyForm(wx.Frame):
    def __init__(self, parent):
        wx.Frame.__init__(self, parent, id=wx.ID_ANY, title="Bajins工具", pos=wx.DefaultPosition,
                          size=wx.Size(-1, -1), style=wx.DEFAULT_FRAME_STYLE | wx.TAB_TRAVERSAL)
        self.SetSizeHintsSz(wx.DefaultSize, wx.DefaultSize)
        gSizer2 = wx.GridSizer(0, 3, 0, 0)
        self.m_button2 = wx.Button(self, wx.ID_ANY, "执行线程", wx.DefaultPosition, wx.DefaultSize, 0)
        gSizer2.Add(self.m_button2, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)
        self.m_staticText2 = wx.StaticText(self, wx.ID_ANY, "MyLabel", wx.DefaultPosition, wx.DefaultSize, 0)
        self.m_staticText2.Wrap(-1)
        gSizer2.Add(self.m_staticText2, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)
        self.m_gauge1 = wx.Gauge(self, wx.ID_ANY, 100, wx.DefaultPosition, wx.DefaultSize, wx.GA_HORIZONTAL)
        self.m_gauge1.SetValue(0)
        gSizer2.Add(self.m_gauge1, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)
        self.SetSizer(gSizer2)
        self.Layout()
        gSizer2.Fit(self)
        self.Centre(wx.BOTH)
        self.m_button2.Bind(wx.EVT_BUTTON, self.onButton)

        pub.subscribe(self.updateDisplay, "update")

    def updateDisplay(self, msg):
        t = msg
        if isinstance(t, int):  # 如果是数字，说明线程正在执行，显示数字
            self.m_staticText2.SetLabel("%s%%" % t)
            self.m_gauge1.SetValue(t)
        else:  # 否则线程未执行，将按钮重新开启
            self.m_staticText2.SetLabel("%s" % t)
            self.m_button2.Enable()

    def onButton(self, event):
        TestThread()
        self.m_staticText2.SetLabel("线程开始")
        event.GetEventObject().Disable()


if __name__ == "__main__":
    app = wx.App()
    MyForm(None).Show()
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

