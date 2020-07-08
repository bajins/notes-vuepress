# Eclipse


[[toc]]



## flag

* [http://www.eclipse.org/downloads/packages](http://www.eclipse.org/downloads/packages)
* [单行注释自动靠左](https://blog.csdn.net/mp9105/article/details/93343403)


**项目显示结构**

- `Windows` -> `Show View` -> `Other` -> 搜索 `Package Exploer`



## 版本对应关系

* [http://www.eclipse.org/downloads/packages](http://www.eclipse.org/downloads/packages)
* [https://zh.wikipedia.org/wiki/Eclipse](https://zh.wikipedia.org/wiki/Eclipse)


| 版本代号 	| 版本 	| 主要发行日期 	| SR1发行日期   	| SR2发行日期    	| N/A           	| JDK最低版本 	|
|----------	|----------	|------------------	|---------------	|----------------	|---------------	|-------------------	|
| Callisto 	| 3.2      	| 2006年6月26日    	| N/A           	| N/A            	| N/A           	| JDK1.4            	|
| Europa   	| 3.3      	| 2007年6月27日    	| 2007年9月28日 	| 2008年2月29日  	| N/A           	| JDK1.5            	|
| Ganymede 	| 3.4      	| 2008年6月25日    	| 2008年9月24日 	| 2009年2月25日  	| N/A           	| JDK1.5            	|
| Galileo  	| 3.5      	| 2009年6月24日    	| 2009年9月25日 	| 2010年2月26日  	| N/A           	| JDK1.5            	|
| Helios   	| 3.6      	| 2010年6月23日    	| 2010年9月24日 	| 2011年2月25日  	| N/A           	| JDK1.5            	|
| Indigo   	| 3.7      	| 2011年6月22日    	| 2011年9月23日 	| 2012年2月24日  	| N/A           	| JDK1.5            	|
| Juno     	| 3.8及4.2 	| 2012年6月27日    	| 2012年9月28日 	| 2013年3月1日   	| N/A           	| JDK1.5            	|
| Kepler   	| 4.3      	| 2013年6月26日    	| 2013年9月27日 	| 2014年2月28日  	| N/A           	| JDK1.6            	|
| Luna     	| 4.4      	| 2014年6月25日    	| 2014年9月25日 	| 2015年2月27日  	| N/A           	| JDK1.6            	|
| Mars     	| 4.5      	| 2015年6月24日    	| 2015年9月22日 	| 2016年2月24日  	| N/A           	| JDK1.7            	|
| 版本代号 	| 版本 	| 主要发行日期 	| 9月份 (*.1)   	| 12月份 (*.2)   	| 3月份 (*.3)   	| JDK最低版本 	|
| Neon     	| 4.6      	| 2016年6月22日    	| 2016年9月28日 	| 2016年12月21日 	| 2017年3月23日 	| JDK1.8            	|
| Oxygen   	| 4.7      	| 2017年6月28日    	| 2017年9月27日 	| 2017年12月20日 	| 2018年3月21日 	| JDK1.8      	|
| Photon   	| 4.8      	| 2018年6月27日    	| 2018年9月     	| 2018年12月     	| 2019年3月     	| JDK1.8      	|


## 安装Java EE开发插件

> 默认没有 `Dynamic Web Project`

- `Help` -> `Install New Software` -> `Work with` 选择 `All available Sites` -> 
勾选 `Web,XML,Java EE and OSGi Enterprise Development` -> `Next` -> `I accept the terms of the licence agreement`


## 字体大小和背景色

- 调节控制台字体大小 Window -> Preferences -> General -> Appearance -> Colors and Fonts -> Basic -> Text Font -> Edit
- 调节主窗口字体大小 Window -> Preferences -> General -> Appearance -> Colors and Fonts -> Java -> Java Editor Text Font -> Edit
- 设置眼睛保护色 Window -> Prefences -> General -> Editors -> Text Editors -> Appearance color optins


## 自动提示

* [Eclipse 开启代码提示与关闭变量命名补全](https://xienaoban.github.io/posts/32764)

- Window > Preferences > Java > Editor > Content Assist -> Auto Activation 下的 Auto Activation triggers for java 
填入 `._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
- 解决输入`=`或`;`变量自动补全问题 Window -> Preference ->Java -> Editor -> Content Assist -> 
勾选 Disable insertion triggers except 'Enter' (按<kbd>Enter</kbd>键才自动补全)
- XML自动补全 Windows -> preferance -> XML -> XML Files -> Editor -> Content Assist -> Auto Activation下面的
Prompt when these characters are inserted 填入 `<=:abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ `（注意后面有一个空格）


## 显示内存

> 在eclipse中打开heap状态 `Windows` -> `Preference` -> `General` –> 勾选`show heap status`


## 解决卡死现象

> Eclipse中jsp、js文件编辑时，卡死现象解决

- 取消验证 `Windows` -> `Preference` –> `validation` -> 点击`Disable All`然后勾选`classpath dependency Validator`
    - `Allow projects to override these preference settings` 允许项目覆盖这些首选项设置
- 关闭拼写检查 `Windows` -> `Preference` -> `General` –> `editors` -> `Text Editors` -> `spelling`
- `Windows` -> `Preference` -> `General` -> `Workspace` -> 取消勾选`Build automatically`
- 选中项目点击右键 -> `Properties` -> `Builders` 在右边取消勾选除`Java Builder`以外的其他选项




## 调整运行内存

- 在eclipse的安装目录下编辑`eclipse.ini`文件
 
[JVM参数设置](/Java/Tomcat.md#四)

```bash
# JDK8以下
-Xms128M -Xmx512M -XX:PermSize=64M -XX:MaxPermSize=128M
# JDK8
-Xms128M -Xmx512M -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=1024m
```

```diff
-Xms128m JVM初始分配的堆内存
-Xmx512m JVM最大允许分配的堆内存，按需分配
-XX:PermSize=64M JVM初始分配的非堆内存，JDK8之前
-XX:MaxPermSize=128M JVM最大允许分配的非堆内存，按需分配，JDK8之前
-XX:MetaspaceSize=512m 元数据，JDK8
-XX:MaxMetaspaceSize=1024m 最大元数据，JDK8
```

#### 设置JDK参数

- `Windows` -> `Preference` -> `Java` –> `Installed JREs` -> 选中使用的JDK -> `Edit` -> `Default VM arguments`

#### 设置Tomcat参数

- `Run` -> `Run Configurations` -> 选中已添加的Tomcat -> `Arguments` -> 在`VM arguments`中换行添加



## 自动导包

- `Window` -> `Preferences` -> `Java` -> `Editor` -> `Save Actions` -> 勾选 `Preform the selected actions on save`
    - `Format edited lines` 自动格式化修改的行
    - `Organize impots` 自动优化管理导入的包




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

## 代码格式化

```java
1.Window->Preferences

// Java 格式化
2.Java->Code Style->Formatter->New->Edit->Line Wrapping
3.Maximum Line width = 180
4.Set line width for preview window = 180

5.Java->Code Style->Formatter->New->Edit->Comments
6.Maximum line width for comments = 180

// JavaScript 格式化
2.JavaScript->Code Style->Formatter->New->Edit->Line Wrapping
3.Maximum Line width = 180
4.Set line width for preview window = 180

5.JavaScript->Code Style->Formatter->New->Edit->Comments
6.Maximum line width for comments = 180

// JSP|HTML页面 格式化
2.Web->HTML Files->Editor
3.Line width = 180
4.Inline Elements 选中所有-> Remove
```


## 设置不格式化注释

> Eclipse默认自带的风格模板不能直接操作，需要先创建一个新的风格模板才能操作

- `Windows` -> `Preference` -> `Java` –> `Code Style` -> `Formatter` -> `Edit` -> `Comments`
    - `Enable Javadoc comment formatting` 启用Javadoc注释格式
    - `Enable block comment formatting` 启用块注释格式
    - `Format line comments on first column` 格式化第一列上的行注释



## 设置编码格式

- 设置工作空间编码 `Window` -> `Preferences` -> `General` -> `Workspace` -> `Text file encoding` -> `Other`选择`UTF-8`

- 设置文档编码 `Window` -> `Preferences` -> `General` -> `Content Type` -> `Text` -> `Default encoding`填入`UTF-8`

- 设置Web编码 `Window` -> `Preferences` -> `Web` -> `CSS Files、HTML Files、JSP Files` -> `Encoding`选择`ISO 10646/Unicode(UTF-8)`

- 设置项目的文档编码：选中项目右键 -> `Properties` -> `Resource` -> `Other`选择`UTF-8`



## 设置Tab为空格

- `Window` -> `Preferences` -> `General` -> `Editors` -> `Text Editors` -> 勾选 `Insert spaces for tabs`

- `Window` -> `Preference` -> `Java` -> `Code Style` -> `Formatter` -> `Edit` -> `Indentation` -> `Tab policy` 选择 `Spaces only`


## 快捷键设置

- `Window` -> `Preference` -> `General` -> `Keys`

- 设置复制一行 搜索`Ctrl+Alt+Down`或者`Copy Lines`即可修改




## 插件

- 反编译`Eclipse Class Decompiler`



**Cloud Toolkit**

> 帮助开发者更高效地开发、测试、诊断并部署应用。通过插件，可以将本地应用一键部署到任意服务器

* [http://toolkit.aliyun.com/eclipse](http://toolkit.aliyun.com/eclipse)

