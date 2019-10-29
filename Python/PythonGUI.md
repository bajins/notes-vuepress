# PythonGUI


* [`wxPython`](#wxpython)
  * [方法](#方法)
  * [`wx.Event`的子类](#wxevent的子类)
  * [`style`样式常量](#style样式常量)
  * [欢迎界面](#欢迎界面)
  * [多线程防假死与线程间传递消息](#多线程防假死与线程间传递消息)
* [`PySide`](#pyside)
  * [多线程防假死动态刷新界面的模板](#多线程防假死动态刷新界面的模板)
* [`PyGObject`](#pygobject)
* [打包](#打包)
  * [`PyInstalle`](#pyinstalle)
    * [安装`pyinstalle`](#安装pyinstalle)
    * [生成单文件](#生成单文件)
    * [生成安装目录](#生成安装目录)
    * [静态文件处理](#静态文件处理)
    * [`pyinstalle`参数](#pyinstalle参数)
    * [问题](#问题)
  * [`py2exe`](#py2exe)
    * [`setup.py`](#setuppy)



## flag

* [winreg --- Windows 注册表访问](https://docs.python.org/zh-cn/3/library/winreg.html)



## `wxPython`

* [示例项目tool-gui-python](https://github.com/woytu/tool-gui-python)


* [https://wxpython.org/pages/overview/](https://wxpython.org/pages/overview/)

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

* `SetTitle( string title )` 设置窗口标题。只可用于框架和对话框
* `SetToolTip( wx.ToolTip tip )` 为窗口添加提示
* `SetSize( wx.Size size )` 设置窗口的尺寸
* `SetPosition( wx.Point pos )` 设置窗口出现的位置
* `Show( show = True )` 显示或隐藏窗口。其中的参数可以为`True`或`False`
* `Move( wx.Point pos )` 将窗口移动到指定位置
* `SetCursor( wx.StockCursor id )` 设置窗口的鼠标指针样式
* `Refresh` 刷新窗口

* `wx.CallLater(millis, callableObj, *args, **kwargs)`

> 最抽象的线程安全函数


* `wx.CallAfter(callable, *args, **kwargs)`

> 该函数是在当前和待处理事件处理程序完成后调用指定的函数。
>
> 这个方法是利用PostEvent()来实现的。执行这个方法后，将在主事件循环中加入一个事件，然后通过事件循环进行处理。
> 这其实是一种异步的方法，适用于一个非GUI的处理过程要调用GUI的方法，或子线程调用主线程的方法，
> 或在一个事件处理函数中异步调用另一个事件处理，还有就是上面的问题。这个方法使用很方便，不需要自定义事件，绑定事件，Post事件。

> 示例：`wx.CallAfter(pub.sendMessage, "update", msg=text)`
>> 订阅update主题并发送消息


* `wx.FutureCall(milliseconds, callable, *args, **kwargs)`

> 从wx.Timer中派生出来的，它的作用是在指定时间之后执行一个方法。

* `pub.subscribe(self.update_display, "update")`

> 发布一个叫update的主题，触发update_display函数

* `pub.sendMessage("update", msg='测试', status=0)`

> 给update主题发送消息，`msg`和`status`都是自定义键值对


### `wx.Event`的子类

* `wx.CloseEvent`:框架关闭时触发，事件类型有普通框架关闭和系统关闭事件。
* `wx.CommandEvent`：与窗口部件的简单的交互都会触发此事件，如按钮单击，菜单项选择等。
* `wx.KeyEvent`:按键动作。
* `wx.MouseEvent`：鼠标事件。
* `wx.PaintEvent`:当窗口内容被重画时触发。
* `wx.SizeEvent`:窗口大小或布局改变时触发。
* `wx.TimerEvent`:由类wx.Timer创建，定期事件。

### `style`样式常量

- Frame

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


- StaticText

| 参数                     | 描述                          | 说明 |
|------------------------|-----------------------------|----|
| wx.ALIGN_LEFT          | 控制标签的大小及对齐                  |
| wx.ALIGN_RIGHT         | 控制标签的大小及对齐                  |
| wx.ALIGN_CENTER        | 控制标签的大小及对齐                  |
| wx.ST_NO_AUTORESIZE    | 防止标签的自动调整大小                 |
| wx.ST_ELLIPSIZE_START  | 省略号(...)显示在开始，如果文本的大小大于标签尺寸 |
| wx.ST_ELLIPSIZE_MIDDLE | 省略号(...)显示在中间，如果文本的大小大于标签尺寸 |
| wx.ST_ELLIPSIZE_END    | 省略号(...)显示在结尾，如果文本的大小大于标签尺寸 |



- Font

| 参数                   | 描述              | 说明           |
|----------------------|-----------------|--------------|
| Wx.FONTSTYLE_NORMAL  | 字体绘制不使用倾斜       | fontfamiy参数  |
| wx.FONTSTYLE_ITALIC  | 字体是斜体           | fontfamiy参数  |
| wx.FONTSTYLE_SLANT   | 字体是倾斜的，但以罗马风格形式 | fontfamiy参数  |
| Wx.FONTWEIGHT_NORMAL | 普通字体            | fontweight参数 |
| wx.FONTWEIGHT_LIGHT  | 高亮字体            | fontweight参数 |
| wx.FONTWEIGHT_BOLD   | 粗体              | fontweight参数 |



- TextCtrl

| 参数              | 描述                              | 说明 |
|-----------------|---------------------------------|----|
| wx.TE_MULTILINE | 文本控件允许多行，如果未指定该样式，换行字符不应该在控件中使用 |
| wx.TE_PASSWORD  | 文本将回显星号                         |
| wx.TE_READONLY  | 文本将不可编辑                         |
| wx.TE_LEFT      | 在控件中的文本将左对齐                     |
| wx.TE_CENTER    | 在控件中的文本将居中对齐                    |
| wx.TE_RIGHT     | 在控件中的文本将居右对齐                    |
| wx.HSCROLL      | 如果文字控制元件是多行的，并且如果该样式被声明了，那么长的行将不会自动换行，并显示水平滚动条。该选项在GTK+中被忽略。       |
| wx.TE_AUTO_URL  | 如果丰富文字选项被设定并且平台支援的话，那么当用户的鼠标位于文字中的一个URL上或在该URL上敲击时，这个样式将导致一个事件被生成。 |
| wx.TE_DONTWRAP  | wx.HSCROLL的别名。                                                     |
| wx.TE_LINEWRAP  | 对于太长的行，以字元为界换行。某些操作系统可能会忽略该样式。                                     |
| wx.TE_RICH      | 用于Windows下，丰富文字控制元件用作基本的视窗部件。这允许样式文字的使用。                           |
| wx.TE_RICH2     | 用于Windows下，把最新版本的丰富文字控制元件用作基本的视窗部件。                                |
| wx.TE_WORDWRAP  | 对于太长的行，以单词为界换行。许多操作系统会忽略该样式。                                       |



- CheckBox

| 参数             | 描述              | 说明 |
|----------------|-----------------|----|
| wx.CHK_2STATE  | 创建两个状态复选框，默认    |
| wx.CHK_3STATE  | 创建三态复选框         |
| wx.ALIGN_RIGHT | 把一个盒子标签放在复选框的左侧 |



- ComboBox

| 参数             | 描述          | 说明 |
|----------------|-------------|----|
| wx.CB_SIMPLE   | 组合框与永久显示的列表 |
| wx.CB_DROPDOWN | 组合框与下拉列表    |
| wx.CB_READONLY | 选择的项目是不可编辑  |
| wx.CB_SORT     | 列表显示按字母顺序   |



- Guage

| 参数               | 描述                  | 说明 |
|------------------|---------------------|----|
| wx.GA_HORIZONTAL | 进度条的横向布局            |
| wx.GA_VERTICAL   | 进度条的垂直布局            |
| wx.GA_SMOOTH     | 平滑的进度条使用一个像素宽度的更新步骤 |
| wx.GA_TEXT       | 显示当前值在百分比形式         |



- Slider

| 参数                   | 描述             | 说明 |
|----------------------|----------------|----|
| wx.SL_HORIZONTAL     | 水平滑块           |
| wx.SL_VERTICAL       | 垂直滑块           |
| wx.SL_AUTOTICKS      | 在滑块显示tickmarks |
| wx.SL_LABELS         | 显示最小值，最大值和当前值  |
| wx.SL_MIN_MAX_LABELS | 显示最小值和最大值      |
| wx.SL_VALUE_LABEL    | 只显示当前值         |



- ToolBar

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




- Dialog

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


- FileDialog

| 参数                     | 描述                           | 说明 |
|------------------------|------------------------------|----|
| wx.FD_DEFAULT_STYLE    | 相当于wx.FD_OPEN                |
| wx.FD_OPEN             | 这是一个打开的对话框，该对话框的默认按钮的标签是‘打开’ |
| wx.FD_SAVE             | 这是一个保存对话框，该对话框的默认按钮的标签是‘保存’  |
| wx.FD_OVERWRITE_PROMPT | 对于只保存的对话框，如果一个文件将被覆盖，提示进行确认  |
| wx.FD_MULTIPLE         | 仅适合打开的对话框，允许选择多个文件           |
| wx.FD_CHANGE_DIR       | 更改当前工作目录到用户选择的文件目录           |


- SplitterWindow

| 参数                   | 描述                      | 说明 |
|----------------------|-------------------------|----|
| wx.SP_3D             | 绘制3d效果边框和窗扇             |
| wx.SP_THIN_SASH      | 绘制一个薄窗扇                 |
| wx.SP_3DSASH         | 绘制3d效果窗扇                |
| wx.SP_BORDER         | 绘制标准边框                  |
| wx.SP_NOBORDER       | 无边框                     |
| wx.SP_PERMIT_UNSPLIT | 总是允许取消分割，即使采用最小的窗格大小不为零 |


- HTMLWindow

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
        

        #ListBox类实例 wx.LB_SINGLE只能选择单个
        self.listbox1 = wx.ListBox(panel,-1,(50,80),(200, 60),list1,wx.LB_SINGLE)
        # wx.LB_MULTIPLE多选
        self.listbox2 = wx.ListBox(panel, -1,(50, 150), (200, 60), list2, wx.LB_MULTIPLE)
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

* [wxpython线程安全方法](http://codingdict.com/blog/article/2019/7/11/10556.html)

> `WxPython4.0`以后不用`wx.lib.pubsub`来做消息通讯了，改用`pubsub`，如果继续用`wx.lib.pubsub`，会有警告提示

```bash
pip install pypubsub
```

- 示例一

```python
import time
import wx
from threading import Thread
from pubsub import pub


def work_proc():
    """
    耗时长的代码
    :return:
    """
    sum_x = 0
    for i in range(1, 101):
        sum_x = sum_x + i
        time.sleep(0.1)
        pub.sendMessage("update", msg='计算{} , 合计 {}'.format(i, sum_x), status=1)
    return sum_x


class WorkThread(Thread):
    """
    线程调用耗时长代码
    """

    def __init__(self):
        """
        线程实例化时立即启动
        """
        Thread.__init__(self)
        self.start()

    def run(self):
        """
        线程执行的代码
        :return:
        """
        result = work_proc()
        time.sleep(2)
        pub.sendMessage("update", msg='计算完成，结果 {}'.format(result), status=0)


class MainForm(wx.Frame):
    def __init__(self, parent=None):
        wx.Frame.__init__(self, parent, id=wx.ID_ANY, title="Bajins工具", pos=wx.DefaultPosition,
                          style=wx.DEFAULT_FRAME_STYLE | wx.TAB_TRAVERSAL)
        # 允许指定最小和最大窗口大小以及窗口大小增量。
        self.SetSizeHints(wx.Size(400, 30), wx.DefaultSize, wx.DefaultSize)
        self.CreateStatusBar()
        self.SetStatusText("启动完成!")

        sizer2 = wx.GridSizer(0, 3, 0, 0)
        self.m_button2 = wx.Button(self, wx.ID_ANY, "开始计算", wx.DefaultPosition, wx.DefaultSize, 0)
        sizer2.Add(self.m_button2, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)

        self.st = wx.StaticText(self, label="测试", pos=(50, 50))
        font = self.st.GetFont()
        font.PointSize += 5
        font = font.Bold()
        self.st.SetFont(font)
        sizer2.Add(self.st, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)

        self.SetSizer(sizer2)
        self.Layout()
        sizer2.Fit(self)
        self.Centre(wx.BOTH)
        self.m_button2.Bind(wx.EVT_BUTTON, self.on_button)
        # 发布一个叫update的主题，触发update_display函数
        pub.subscribe(self.update_display, "update")

    def update_display(self, msg, status):
        """
        从线程接收数据并更新显示
        """
        if status == 0:
            self.SetStatusText('完成！')
            # 启用按钮
            # self.m_button2.Enable(True)
            self.m_button2.Enable()
        elif status == 1:
            self.st.SetLabel(msg)

    def on_button(self, event):
        WorkThread()
        self.SetStatusText('开始计算，代码不提供中断线程语句，请等待计算结束！')
        # 禁用按钮
        # self.m_button2.Enable(False)
        event.GetEventObject().Disable()


if __name__ == "__main__":
    app = wx.App()
    MainForm().Show()
    app.MainLoop()

```



- 示例二

```python
import time
import wx
from threading import Thread
from pubsub import pub


class MainThread(Thread):
    def __init__(self):
        # 线程实例化时立即启动
        Thread.__init__(self)
        self.start()

    def run(self):
        # 线程执行的代码
        for i in range(101):
            time.sleep(0.03)
            # 订阅update主题
            wx.CallAfter(pub.sendMessage, "update", msg=i)
            time.sleep(0.5)


class MainForm(wx.Frame):
    def __init__(self, parent=None):
        wx.Frame.__init__(self, parent, id=wx.ID_ANY, title="Bajins工具", pos=wx.DefaultPosition,
                          style=wx.DEFAULT_FRAME_STYLE | wx.TAB_TRAVERSAL)
        # 允许指定最小和最大窗口大小以及窗口大小增量。
        self.SetSizeHints(wx.Size(400, 30), wx.DefaultSize, wx.DefaultSize)

        self.CreateStatusBar()
        self.SetStatusText("启动完成!")

        sizer = wx.BoxSizer(wx.HORIZONTAL)
        self.m_button2 = wx.Button(self, wx.ID_ANY, "执行线程")
        sizer.Add(self.m_button2, 0, wx.ALL | wx.ALIGN_CENTER_HORIZONTAL | wx.ALIGN_CENTER_VERTICAL, 5)

        self.m_staticText2 = wx.StaticText(self, wx.ID_ANY, "0%")
        self.m_staticText2.Wrap(-1)
        sizer.Add(self.m_staticText2, 0, wx.ALL | wx.SIZE_FORCE | wx.ALIGN_CENTER_VERTICAL, 5)

        self.m_gauge1 = wx.Gauge(self, wx.ID_ANY, 100)
        self.m_gauge1.SetValue(0)
        sizer.Add(self.m_gauge1, 0, wx.ALL | wx.ALIGN_CENTER_VERTICAL, 5)

        self.SetSizer(sizer)
        self.Layout()
        sizer.Fit(self)
        self.Centre(wx.BOTH)
        self.m_button2.Bind(wx.EVT_BUTTON, self.on_button)
        # 发布一个叫update的主题，触发update_display函数
        pub.subscribe(self.update_display, "update")

    def update_display(self, msg):
        # 如果是数字，说明线程正在执行，显示数字
        if isinstance(msg, int):
            self.m_staticText2.SetLabel("%s%%" % msg)
            self.m_gauge1.SetValue(msg)
        else:
            # 否则线程未执行，将按钮重新开启
            self.m_staticText2.SetLabel("%s" % msg)
            self.m_button2.Enable()

    def on_button(self, event):
        MainThread()
        self.SetStatusText("线程开始")
        # 禁用按钮
        event.GetEventObject().Disable()


if __name__ == "__main__":
    app = wx.App()
    MainForm().Show()
    app.MainLoop()

```



## `PySide`

* [https://wiki.qt.io/Qt_for_Python/zh](https://wiki.qt.io/Qt_for_Python/zh)

* [https://gaianote.github.io/2018/09/15/PyQt5%E5%AD%A6%E4%B9%A0%E4%B9%8Bline-edit/](https://gaianote.github.io/2018/09/15/PyQt5%E5%AD%A6%E4%B9%A0%E4%B9%8Bline-edit/)

> `Pyside`最初是为诺基亚开发的，而它是Qt技术的所有者。
> 当诺基亚将Qt出售给`Digia`（现在是Qt公司）时，Qt4原始`Pyside`代码的所有版权也转移到了Qt公司。

> `Qt for Python`项目旨在为`Qt5`提供`PySide`模块的完整端口。该开发于2015年5月在GitHub上开始。
> 该项目设法将`Pyside`移植到`Qt5.3`,`5.4`和`5.5`。

> 该`PySide2`模块于2018年6月中旬作为技术预览版发布（支持`Qt5.11`）。并在同年12月支持`Qt5.12`并正式发布

> `PySide2`模块提供对`QtCore`，`QtGui`等各个Qt模块的访问。还附带了`Shiboken2`、`CPython`绑定代码生成器，
> 可用于为`C`或`C++`代码生成`Python`绑定。



### 多线程防假死动态刷新界面的模板

```python
from PyQt5 import QtWidgets, QtCore
import sys
from PyQt5.QtCore import *
import time
 
 
# 继承QThread
class Runthread(QtCore.QThread):
    #  通过类成员对象定义信号对象
    _signal = pyqtSignal(str)
 
    def __init__(self):
        super(Runthread, self).__init__()
 
    def __del__(self):
        self.wait()
 
    def run(self):
        for i in range(100):
            time.sleep(0.2)
            # 注意这里与_signal = pyqtSignal(str)中的类型相同
            self._signal.emit(str(i))
 
 
class Example(QtWidgets.QWidget):
 
    def __init__(self):
        super().__init__()
        # 按钮初始化
        self.button = QtWidgets.QPushButton('开始', self)
        self.button.setToolTip('这是一个 <b>QPushButton</b> widget')
        self.button.resize(self.button.sizeHint())
        self.button.move(120, 80)
        # 绑定多线程触发事件
        self.button.clicked.connect(self.start_login)
 
        # 进度条设置
        self.pbar = QtWidgets.QProgressBar(self)
        self.pbar.setGeometry(50, 50, 210, 25)
        self.pbar.setValue(0)
 
        # 窗口初始化
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('OmegaXYZ.com')
        self.show()
 
        self.thread = None  # 初始化线程
 
    def start_login(self):
        # 创建线程
        self.thread = Runthread()
        # 连接信号,进程连接回传到GUI的事件
        self.thread._signal.connect(self.call_backlog)
        # 开始线程
        self.thread.start()
 
    def call_backlog(self, msg):
        # 将线程的参数传入进度条
        self.pbar.setValue(int(msg))
 
 
if __name__ == "__main__":
    app = QtWidgets.QApplication(sys.argv)
    myshow = Example()
    myshow.show()
    sys.exit(app.exec_())

```




## `PyGObject`

* [https://pygobject.readthedocs.io/en/latest/](https://pygobject.readthedocs.io/en/latest/)

> `PyGObject`是一个`Python`包，它为基于`GObject`的库提供绑定，例如`GTK`、`GStreamer`、`WebKitGTK`、`GLib`、`GIO`等等。

> 它支持`Linux`，`Windows`和`macOS`，适用于`Python2.7+`、`Python3.5+`、`PyPy`和`PyPy3`。



## 打包

### `PyInstalle`

> PyInstaller 是一个十分有用的第三方库，可以用来打包`Python`应用程序，
> 打包完的程序就可以在没有安装`Python`解释器的机器上运行了。
>
> 它能够在`Windows`、`Linux`、`Mac OS X`等操作系统下将`Python`源文件打包，通过对源文件打包，
> `Python`程序可以在没有安装`Python`的环境中运行，也可以作为一个独立文件方便传递和管理。

> `PyInstaller`支持`Python 2.7`和`Python 3.4 +`。可以在`Windows`、`Mac OS X`和`Linux`上使用，
> 但是并不是跨平台的，而是说你要是希望打包成`.exe`文件，需要在`Windows`系统上运行`PyInstaller`进行打包工作。

* [https://github.com/pyinstaller](https://github.com/pyinstaller)

* [https://hoxis.github.io/python-pyinstaller.html](https://hoxis.github.io/python-pyinstaller.html)

#### 安装`pyinstalle`

```bash
pip install pyinstaller
```

#### 生成单文件

```bash
pyinstaller -F app.py
# windows打包为运行不显示命令行窗口的程序
pyinstaller -F -w -n=BajinsWallpaper app.py
```

#### 生成安装目录

> 此方式可借用其他第三方封包工具封装为exe安装程序，比如`NSIS`、`InnoSetup`
>
> 注意：执行命令前先将目录下`build`、`dist`目录删除，并将`spec`后缀的文件也删除

```bash
pyinstaller -D -w -n=BajinsWallpaper app.py
```

#### 静态文件处理

- 在`.spec`后缀文件中修改`datas=[]`

> 每一个文件用`(a,b)`进行描述，其中`a`是源文件，`b`是目标路径
> 也就是最终打包`exe`执行时，它需要把这些静态资源解压出来，那么解压到哪里呢就需要`b`来指定，它是一个文件夹

```bash
datas=[('view/imges/*', '.'), ('view/static/logo.png','view/static/')],
```

- 使用`--add-data`命令参数

> 其实就是修改`.spec`后缀文件中的`datas=[]`

> `;`前面是本地文件路径，后面是打包中所处的位置

```bash
--add-data view\static\*;view\static --add-data "list.txt;."
```

#### `pyinstalle`参数

* [https://pyinstaller.readthedocs.io/en/latest/usage.html#options](https://pyinstaller.readthedocs.io/en/latest/usage.html#options)

- 通用参数

| 参数名              | 描述                             | 说明                                                                                |
|------------------|--------------------------------|-----------------------------------------------------------------------------------|
| -h               | 显示帮助                           | 无                                                                                 |
| -v               | 显示版本号                          | 无                                                                                 |
| –distpath        | 生成文件放在哪里                       | 默认：当前目录的dist文件夹内                                                                  |
| –workpath        | 生成过程中的中间文件放在哪里                 | 默认：当前目录的build文件夹内                                                                 |
| -y               | 如果dist文件夹内已经存在生成文件，则不询问用户，直接覆盖 | 默认：询问是否覆盖                                                                         |
| –upx-dir UPX_DIR | 指定upx工具的目录                     | 默认：execution path                                                                 |
| -a               | 不包含unicode支持                   | 默认：尽可能支持unicode                                                                   |
| –clean           | 在本次编译开始时，清空上一次编译生成的各种文件        | 默认：不清除                                                                            |
| –log-level LEVEL | 控制编译时pyi打印的信息                  | 一共有6个等级，由低到高分别为TRACE DEBUG INFO(默认) WARN ERROR CRITICAL。也就是默认清空下，不打印TRACE和DEBUG信息 |



- 与生成结果有关的参数

| 参数名       | 描述                  | 说明                                    |
|-----------|---------------------|---------------------------------------|
| -D        | 生成one-folder的程序（默认） | 生成结果是一个目录，各种第三方依赖、资源和exe同时存储在该目录      |
| -F        | 生成one-file的程序       | 生成结果是一个exe文件，所有的第三方依赖、资源和代码均被打包进该exe内 |
| –specpath | 指定.spec文件的存储路径      | 默认：当前目录                               |
| -n        | 生成的.exe文件和.spec的文件名 | 默认：用户脚本的名称，即main.py和main.spec         |



- 指定打包哪些资源、代码

| 参数名                   | 描述                            | 说明                                                               |
|-----------------------|-------------------------------|------------------------------------------------------------------|
| –add-data             | 打包额外资源                        | 用法：pyinstaller main.py --add-data=src;dest。windows以;分割，linux以:分割 |
| –add-binary           | 打包额外的代码                       | 用法：同–add-data。与–add-data不同的是，用binary添加的文件，pyi会分析它引用的文件并把它们一同添加进来 |
| -p                    | 指定额外的import路径，类似于使用PYTHONPATH | 参见PYTHONPATH                                                     |
| –hidden-import        | 打包额外py库                       | pyi在分析过程中，有些import没有正确分析出来，运行时会报import error，这时可以使用该参数           |
| –additional-hooks-dir | 指定用户的hook目录                   | hook用法参见其他，系统hook在PyInstaller\hooks目录下                           |
| –runtime-hook         | 指定用户runtime-hook              | 如果设置了此参数，则runtime-hook会在运行main.py之前被运行                           |
| –exclude-module       | 需要排除的module                   | pyi会分析出很多相互关联的库，但是某些库对用户来说是没用的，可以用这个参数排除这些库，有助于减少生成文件的大小         |
| –key                  | pyi会存储字节码，指定加密字节码的key         | 16位的字符串                                                          |



- 生成参数

| 参数名    | 描述                                | 说明                   |
|--------|-----------------------------------|----------------------|
| -d     | 执行生成的main.exe时，会输出pyi的一些log，有助于查错 | 默认：不输出pyi的log        |
| -s     | 优化符号表                             | 原文明确表示不建议在windows上使用 |
| –noupx | 强制不使用upx                          | 默认：尽可能使用。            |



- 其他

| 参数名             | 描述         | 说明          |
|-----------------|------------|-------------|
| –runtime-tmpdir | 指定运行时的临时目录 | 默认：使用系统临时目录 |



- Windows和Mac特有的参数

| 参数名 | 描述            | 说明                                |
|-----|---------------|-----------------------------------|
| -c  | 显示命令行窗口       | 与-w相反，默认含有此参数                     |
| -w  | 不显示命令行窗口      | 编写GUI程序时使用此参数有用。                  |
| -i  | 为main.exe指定图标 | pyinstaller -i beauty.ico main.py |

> 使用`-i`参数设置图标后，由于有缓存，需要移动一下生成的可执行程序的位置，才会显示自定义图标


- Windows特有的参数

| 参数名            | 描述           | 说明                                 |
|----------------|--------------|------------------------------------|
| –version-file  | 添加版本信息文件     | pyinstaller --version-file ver.txt |
| -m, --manifest | 添加manifest文件 | pyinstaller -m main.manifest       |
| -r RESOURCE    | 请参考原文        |                                    |
| –uac-admin     | 请参考原文        |                                    |
| –uac-uiaccess  | 请参考原文        |                                    |




#### 问题

- 多进程multiprocessing，我们需要创建一个模块

```python
import os
import sys
import multiprocessing
 
# Module multiprocessing is organized differently in Python 3.4+
try:
    # Python 3.4+
    if sys.platform.startswith('win'):
        import multiprocessing.popen_spawn_win32 as forking
    else:
        import multiprocessing.popen_fork as forking
except ImportError:
    import multiprocessing.forking as forking
 
if sys.platform.startswith('win'):
    # First define a modified version of Popen.
    class _Popen(forking.Popen):
        def __init__(self, *args, **kw):
            if hasattr(sys, 'frozen'):
                # We have to set original _MEIPASS2 value from sys._MEIPASS
                # to get --onefile mode working.
                os.putenv('_MEIPASS2', sys._MEIPASS)
            try:
                super(_Popen, self).__init__(*args, **kw)
            finally:
                if hasattr(sys, 'frozen'):
                    # On some platforms (e.g. AIX) 'os.unsetenv()' is not
                    # available. In those cases we cannot delete the variable
                    # but only set it to the empty string. The bootloader
                    # can handle this case.
                    if hasattr(os, 'unsetenv'):
                        os.unsetenv('_MEIPASS2')
                    else:
                        os.putenv('_MEIPASS2', '')
 
    # Second override 'Popen' class with our modified version.
    forking.Popen = _Popen
 
```


### `py2exe`

[http://www.py2exe.org/](http://www.py2exe.org/)

[https://hoxis.github.io/python-py2exe.html](https://hoxis.github.io/python-py2exe.html)

> `py2exe`是一个将`python`脚本转换成`Windows`上的可独立执行的可执行程序（`*.exe`）的工具，
> 这样就可以不用装`python`而在`Windows`系统上运行这个可执行程序

> `py2exe`新版本只支持`python3.3`以上，可以使用`pip install py2exe_py2`来安装兼容`python2`版本；
>
> 若在`python3.6`版本下运行报错，请切换到`python3.4`尝试；
>
> `python3`如果是`64 位`，生成的`exe`只能在`64 位`操作系统下运行，使用`32 位` `python`可以解决；
>
> 从`Python 3.3`，`Windows`在构建`Python`时使用的是`Visual Studio 2010`，因此生成后，
> 需要手动将`msvcr100.dll`拷到生成目录下（`dist`目录），否则最终的文件运行时可能会报错；
> 或者通过`data_files=[("",["MSVCR100.dll"])]`, 打包其中；


#### `setup.py`

```python

from distutils.core import setup
import py2exe
import sys
 
# 允许程序通过双击的形式执行。
sys.argv.append('py2exe')
 
py2exe_options = {
        # 需要包含的文件，这里的"sip"是PyQt程序打包时需要添加的，如果不是PyQt程序不需要此项。
        "includes": ["sip"],
        # 需要排除的dll文件，这里的"MSVCP90.dll"文件，
        # 如果不排除的话会报error: MSVCP90.dll: No such file or directory错误。
        "dll_excludes": ["MSVCP90.dll",],
        # 为1，则压缩文件
        "compressed": 1,
        # 为优化级别，默认为0。
        "optimize": 2,
        # 不自动包含encodings和codecs。
        "ascii": 0,
        """
        将程序打包成单文件（同时还会生成一个zip文件，可设置zipfile = None去除）。
        1：表示pyd和dll文件会被打包到单文件中，且不能从文件系统中加载python模块；
        2：表示pyd和dll文件会被打包到单文件中，但是可以从文件系统中加载python模块。
        64位的Py2exe不要添加本句。
        """
        "bundle_files": 1,
        }
 
setup(
      name = 'PyQt Demo',
      version = '1.0',
      """
      这里使用的是windows，即没有命令行窗口出现，如果使用console则表示有命令行窗口出现。
      "myico.ico"是程序图标
      """
      windows = [{ "script":'wordreplace.py',"icon_resources":[(1,"myico.ico")]}], 
      """
      把images目录中所有的jpg文件打包到dist/images子目录中。
      把public目录下的test.bat文件打包到dist/static子目录中。
      """
      data_files = [('images',['images\*.jpg']),('static',['public\\test.bat'])],
      # 如果没有此句，会生成一个`library.zip`文件。
      zipfile = None,
      options = {'py2exe': py2exe_options}
      )
```

> 执行该脚本，会得到一个build文件夹和一个dist文件夹。其中，dist文件夹，就是你得到的打包程序。

> 如果按照上述代码执行成功，则应该dist文件夹中，只包括程序的exe文件和`w9xpopen.exe`。`w9xpopen.exe`是针对`windows9x`版本的，
> 一般来说该文件并不需要。

> 如果`bundle_files`不为`1`、`2`，则`dist`文件夹中还会包括一些dll文件和pyd文件（`Python Dll`文件）。
> 如果`bundle_files`为`2`，`dist`文件夹会包括一个`python##.dll`文件，如果为1则不会。
