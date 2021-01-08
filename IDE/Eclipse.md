# Eclipse


[[toc]]



## Flag

+ [https://github.com/eclipse/eclipse](https://github.com/eclipse/eclipse)

* [https://www.eclipse.org/ide](https://www.eclipse.org/ide)
* [http://www.eclipse.org/downloads/packages](http://www.eclipse.org/downloads/packages)
* [单行注释自动靠左](https://blog.csdn.net/mp9105/article/details/93343403)
* [Eclipse的Debug各种视图介绍](https://www.cnblogs.com/ZeGod/p/10114049.html)

- [STS(eclipse)中文注释错位、缩进、被放大BUG解决](https://blog.csdn.net/u013600314/article/details/85262257)


**Clean Up、Format、Clean**

- 顶部菜单 -> `Source` -> `Clean Up` 针对代码的内容进行整理，比如去除无用代码或者引用包。
- 顶部菜单 -> `Source` -> `Organize Imports` 去除单个类中无用的引用包信息<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>
- 顶部菜单 -> `Source` -> `Format` 对代码的格式进行整理，比如设置了`Table`为4个空格，那么将会转换。
- 顶部菜单 -> `Project` -> `Clean` 根据当前项目情况更新`.classpath`文件的内容，强制检查已安装插件，清除编译信息，重新部署项目。
- `Servers` -> `Clean` 移除部署应用后清理工程残留文件，如果是手动设置的启动工程路径，也会清理，默认Eclipse部署清理。


**项目显示结构**

- `Windows` -> `Show View` -> `Other` -> 搜索 `Package Exploer`


**WebStorm保存后跳过Eclipse自动同步到Tomcat**

- `File` -> `Settings` -> `Build, Execution, Deployment` -> `Deployment` （或顶部菜单 `Tools` -> `Deployment` -> `Configuration`）
- 配置一个应用：右侧点击`+`号 -> 点击`Local or mounted floder` -> 输入自定义名称 
   - 右侧`Connection`页签
      - `Floder` 选择Eclipse配置的Tomcat部署的当前项目路径
   - 右侧`Mappings`页签
      - `Local path` 需要部署的文件路径（相对项目根目录）
      - `Deployment path` 把`Local path`部署到指定路径（相对`Floder`的路径）一般为`\`
- 点击顶部菜单 `Tools` -> `Deployment` -> 选择 `Automatic Upload(always)` 自动构建

> 其实原理很简单：就是在保存源码文件的同时，实时编译构建同步的时候跳过Eclipse，直接同步到Tomcat部署的当前项目目录


## 安装Java EE开发插件

> 默认没有 `Dynamic Web Project`

- `Help` -> `Install New Software` -> `Work with` 选择 `All available Sites` -> 
勾选 `Web,XML,Java EE and OSGi Enterprise Development` -> `Next` -> `I accept the terms of the licence agreement`


## 字体大小和背景色

- 调节控制台字体大小 `Window` -> `Preferences` -> `General` -> `Appearance` -> `Colors and Fonts` -> `Basic` -> `Text Font` -> `Edit`
- 调节主窗口字体大小 `Window` -> `Preferences` -> `General` -> `Appearance` -> `Colors and Fonts` -> `Java` -> `Java Editor Text Font` -> `Edit`
- 设置眼睛保护色 `Window` -> `Prefences` -> `General` -> `Editors` -> `Text Editors` -> `Appearance color optins`


## 代码格式化

* [General > Editors > Text Editors](https://help.eclipse.org/2020-12/index.jsp?topic=%2Forg.eclipse.platform.doc.user%2Freference%2Fref-texteditorprefs.htm)

+ 垂直标尺： `Window` -> `Preferences` -> `General` -> `Editors` -> `Text Editors` -> `Show Print Margin`
   + `Print margin column` 行宽
   + `Allow editors to override the margin column` 

- Java 格式化： `Window` -> `Preferences` -> `Java` -> `Code Style` -> `Formatter` -> `New` -> `Edit`
   - -> `Line Wrapping`
      - `Maximum Line width` 控制每行的最大字符数
      - `Set line width for preview window` 设置预览窗口的线宽
      - -> `Binary expressions` -> `Line wrapping policy` -> `Wrap all elements,every elements on a new line` 将所有元素换行，每个元素都换行
      - -> `Function Calls` -> `Qualified invocations` -> `Wrap all elements,every elements on a new line` 连续调用不换行
      - `Never join already wrapped lines` 不格式化已换行的
   - -> `Comments`
      - `Maximum line width for comments` 注释的最大行宽
- JavaScript 格式化： `Window` -> `Preferences` -> `JavaScript` -> `Code Style` -> `Formatter` -> `New` -> `Edit` -> `Line Wrapping`
   - `Maximum Line width`
   - `Set line width for preview window`
- `Window` -> `Preferences` -> `JavaScript` -> `Code Style` -> `Formatter` -> `New` -> `Edit` -> `Comments`
   - `Maximum line width for comments`
- JSP|HTML页面 格式化： `Window` -> `Preferences` -> `Web` -> `HTML Files` -> `Editor`
   - `Line width`
   - `Inline Elements` 选中所有 -> `Remove`


**设置不格式化注释**

> Eclipse默认自带的风格模板不能直接操作，需要先创建一个新的风格模板才能操作

- `Windows` -> `Preference` -> `Java` –> `Code Style` -> `Formatter` -> `Edit` -> `Comments`
    - `Enable Javadoc comment formatting` 启用Javadoc注释格式
    - `Enable block comment formatting` 启用块注释格式
    - `Format line comments on first column` 格式化第一列上的行注释


## 自动提示

* [Eclipse 开启代码提示与关闭变量命名补全](https://xienaoban.github.io/posts/32764)

- `Window` -> `Preferences` -> `Java` -> `Editor` -> `Content Assist` -> `Auto Activation` 下的` Auto Activation triggers for java` 
填入 `._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
- 解决输入`=`或`;`变量自动补全问题 `Window` -> `Preference` ->`Java` -> `Editor` -> `Content Assist` -> 
勾选 `Disable insertion triggers except 'Enter'` (按<kbd>Enter</kbd>键才自动补全)
- XML自动补全 `Windows` -> `preferance` -> `XML` -> `XML Files` -> `Editor` -> `Content Assist` -> `Auto Activation`下面的
`Prompt when these characters are inserted` 填入 `<=:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ `（注意后面有一个空格）

* 解决按下`@`不提示注解：`Window` -> `Preferences` -> `Java` -> `Editor` -> `Content Assist` -> `Advanced` 下把`java Proposals`勾上


## 显示内存

> 在eclipse中打开heap状态 `Windows` -> `Preference` -> `General` –> 勾选`show heap status`


## 解决卡死现象

> Eclipse中jsp、js文件编辑时，卡死现象解决

- 取消验证 `Windows` -> `Preference` –> `validation` -> 点击`Disable All`然后勾选`classpath dependency Validator`
    - `Allow projects to override these preference settings` 允许项目覆盖这些首选项设置
- 关闭拼写检查 `Windows` -> `Preference` -> `General` –> `editors` -> `Text Editors` -> `spelling`
- `Windows` -> `Preference` -> `General` -> `Workspace` --> `Build` -> 取消勾选`Build automatically`
- 选中项目点击右键 -> `Properties` -> `Builders` 在右边取消勾选除`Java Builder`以外的其他选项


## 清除workspace历史记录

- `Windows` -> `Preference` -> `General` –> `Startup and Shuodown` -> `Prompt for workspace  on startup`/`Workspaces`
- 编辑eclipse下的`/configuration/.settings/org.eclipse.ui.ide.prefs` -> `RECENT_WORKSPACES` 删除不需要的目录，以`\n`分隔



## 调整运行内存

- 在eclipse的安装目录下编辑`eclipse.ini`文件
 
[JVM参数设置](/Java/Tomcat.md#四)

```conf
# JDK8以下
-Xms128M -Xmx512M -XX:PermSize=64M -XX:MaxPermSize=128M
# JDK8
-Xms128M -Xmx512M -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=1024m
```

- `-Xms128m` JVM初始分配的堆内存
- `-Xmx512m` JVM最大允许分配的堆内存，按需分配
- `-XX:PermSize=64M` JVM初始分配的非堆内存，JDK8之前
- `-XX:MaxPermSize=128M` JVM最大允许分配的非堆内存，按需分配，JDK8之前
- `-XX:MetaspaceSize=512m` 元数据，JDK8
- `-XX:MaxMetaspaceSize=1024m` 最大元数据，JDK8


**设置JDK参数**

- `Windows` -> `Preference` -> `Java` –> `Installed JREs` -> 选中使用的JDK -> `Edit` -> `Default VM arguments`

**设置Tomcat参数**

- `Run` -> `Run Configurations` -> 选中已添加的Tomcat -> `Arguments` -> 在`VM arguments`中换行添加




## 设置编码格式

- 设置工作空间编码 `Window` -> `Preferences` -> `General` -> `Workspace` -> `Text file encoding` -> `Other`选择`UTF-8`
- 设置文档编码 `Window` -> `Preferences` -> `General` -> `Content Type` -> `Text` -> `Default encoding`填入`UTF-8`
- 设置Web编码 `Window` -> `Preferences` -> `Web` -> `CSS Files、HTML Files、JSP Files` -> `Encoding`选择`ISO 10646/Unicode(UTF-8)`
- 设置项目的文档编码：选中项目右键 -> `Properties` -> `Resource` -> `Other`选择`UTF-8`



## 设置Tab为空格

- `Window` -> `Preferences` -> `General` -> `Editors` -> `Text Editors` -> 勾选 `Insert spaces for tabs`
   - `Remove multiple spaces on backspace/delete` 删除退格键/删除多个空格
- `Window` -> `Preference` -> `Java` -> `Code Style` -> `Formatter` -> `Edit` -> `Indentation` -> `Tab policy` 选择 `Spaces only`


## 快捷键设置

- `Window` -> `Preference` -> `General` -> `Keys`
- 设置复制一行 搜索`Ctrl+Alt+Down`或者`Copy Lines`即可修改



## 自动导包

- `Window` -> `Preferences` -> `Java` -> `Editor` -> `Save Actions` -> 勾选 `Preform the selected actions on save`
    - `Format edited lines` 自动格式化修改的行
    - `Organize impots` 自动优化管理导入的包


### SUN内部包不存在

> `sun.misc`（sun公司的内部方法，不属于JDK标准库范畴）包下的`BASE64Encoder`及`BASE64Decoder`来进行的

- 项目右键 -> `Build Path` -> `Configure Build Path` -> `Java Build Path` -> `Libraries` -> 展开`JRE System Libraries`
-> 选中`Access rules` -> 点击`Edit` -> 弹窗点击`Add` -> `Resolution`选择`Accessible` -> `Rule Pattern`输入`**` -> 点击`OK`



## 注释模板

- `Window` -> `Preference` -> `Java` -> `Code Style` -> `Code Template` -> 展开`Comments` -> 
点击需要设置的类型 -> `Pattern`填入注释模板 -> 勾选 `Automatically add comments for new methods and types`
- 注释的使用：输入`/**`然后回车自动出来
- 创建新文件(New Java files)注释标签

```java
${filecomment}
${package_declaration}


/**
 * @Title: ${file_name}
 * @Package ${package_name}
 * @Description: 
 * @author: woytu.com
 * @date: ${date} ${time}
 * @version V1.0
 * @Copyright: ${year} woytu.com Inc. All rights reserved.
 */
${typecomment}
${type_declaration}
```

- 字段(Fields)注释标签

```java
 /**
  * @Fields ${field} : 
  * @author: woytu.com
  * @date: ${date} ${time}
  */
```

- 构造函数(Constructors)标签

```java
/**
 * @Title: ${enclosing_type}
 * ${tags}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 方法(Methods)标签

```java
/**
 * 
 * ${tags} ${return_type}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 覆盖方法(Overriding Methods)标签

```java
/**
 * <p>Title: ${enclosing_method}</p>
 * <p>Description: </p>
 * ${tags}
 * ${see_to_overridden}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- 代表方法(Delegate Methods)标签

```java
/**
 * ${tags}
 * ${see_to_target}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- getter方法标签

```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

- setter方法标签

```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```





## 插件

- [SVN-Eclipse插件](https://github.com/subclipse/subclipse/wiki)
   - 对应`subversion 1.9.x` `http://subclipse.tigris.org/update_1.12.x/`
- 反编译 [https://github.com/cnfree/Eclipse-Class-Decompiler](https://github.com/cnfree/Eclipse-Class-Decompiler)


**Cloud Toolkit**

> 帮助开发者更高效地开发、测试、诊断并部署应用。通过插件，可以将本地应用一键部署到任意服务器

* [http://toolkit.aliyun.com/eclipse](http://toolkit.aliyun.com/eclipse)

