# Eclipse

[[toc]]


## Flag

+ [https://gitlab.eclipse.org](https://gitlab.eclipse.org)
+ [https://github.com/eclipse/eclipse](https://github.com/eclipse/eclipse)
   + [https://github.com/eclipse-platform](https://github.com/eclipse-platform)
   + [https://github.com/eclipse-jdt](https://github.com/eclipse-jdt)
   + [https://github.com/eclipse-cdt](https://github.com/eclipse-cdt)
   + [https://github.com/eclipse-pde](https://github.com/eclipse-pde)
   + [https://github.com/eclipse-m2e](https://github.com/eclipse-m2e)
   + [https://github.com/eclipse-tycho](https://github.com/eclipse-tycho)
   + [https://github.com/eclipse-windowbuilder](https://github.com/eclipse-windowbuilder)
   + [https://github.com/eclipse-wildwebdeveloper](https://github.com/eclipse-wildwebdeveloper)
   + [https://github.com/eclipse-linuxtools](https://github.com/eclipse-linuxtools)
   + [https://github.com/eclipse-oomph](https://github.com/eclipse-oomph)
   + [https://github.com/eclipse-cbi](https://github.com/eclipse-cbi)
   + [https://github.com/eclipse-simrel](https://github.com/eclipse-simrel)
   + [https://www.eclipse.org/ide](https://www.eclipse.org/ide)
   + [https://www.eclipse.org/downloads/packages](https://www.eclipse.org/downloads/packages)
+ 设置 [https://github.com/vorburger/opendaylight-eclipse-setup](https://github.com/vorburger/opendaylight-eclipse-setup)
+ Spring Tools[https://github.com/spring-projects/sts4](https://github.com/spring-projects/sts4)
   + [https://spring.io/tools](https://spring.io/tools)


* [单行注释自动靠左](https://blog.csdn.net/mp9105/article/details/93343403)
* [Eclipse的Debug各种视图介绍](https://www.cnblogs.com/ZeGod/p/10114049.html)
* [STS(eclipse)中文注释错位、缩进、被放大BUG解决](https://blog.csdn.net/u013600314/article/details/85262257)
* [Eclipse的设置、调优、使用（解决启动卡顿等问题）](https://lexsaints.blog.csdn.net/article/details/80661377)
* [多模块打包后，扫描不到@controller和@service](https://www.cnblogs.com/antis/p/6138331.html)
   * [https://stackoverflow.com/a/47378392](https://stackoverflow.com/a/47378392)
   * [spring注解在自定义jar包中无法被扫描问题](https://www.jianshu.com/p/2f088388783d)
   * [spring 扫描不到jar中class文件的原因和解决方法](https://blog.csdn.net/xlxxcc/article/details/51142585)


> 创建`Dynamic Web Project`项目结构静态资源目录为：`WebContent`/`WebRoot`，idea创建的为`web`
> 导入的项目没有正确自动识别：在项目上右键选择`Properties`然后检查`Project Facets`和`Project Natures`



**快捷生成调用实例set方法**

1. 进入实例类，打开`Type Hierarchy`视图并在视图中选中所有set方法复制，快捷键<kbd>F4</kbd>
2. [使用反射获取方法生成](https://github.com/bajins/java-clazz/blob/master/src/com/bajins/clazz/JavaFxLearning.java#L63)



**xml文件头部文件报错**

- `%USERPROFILE%\.lemminx\cache\头部文件的链接地址路径`

> 示例：链接地址为`http://mybatis.org/dtd/mybatis-3-config.dtd`
> 文件路径为`%USERPROFILE%\.lemminx\cache\http\mybatis.org\dtd\mybatis-3-config.dtd`



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



## 右键菜单

- `Window` -> `Perspective` -> `Customize Perspective`
   - `Shortcuts` 新建选项



## 安装Java EE开发插件

> 默认没有 `Dynamic Web Project`

- `Help` -> `Install New Software` -> `Work with` 选择 `All available Sites` -> 
勾选 `Web,XML,Java EE and OSGi Enterprise Development` -> `Next` -> `I accept the terms of the licence agreement`


## 字体大小和背景色

- 调节控制台字体大小 `Window` -> `Preferences` -> `General` -> `Appearance` -> `Colors and Fonts` -> `Basic` -> `Text Font` -> `Edit`
- 调节主窗口字体大小 `Window` -> `Preferences` -> `General` -> `Appearance` -> `Colors and Fonts` -> `Java` -> `Java Editor Text Font` -> `Edit`
- 设置眼睛保护色 `Window` -> `Prefences` -> `General` -> `Editors` -> `Text Editors` -> `Appearance color optins`



## 代码格式化

* [General > Editors > Text Editors](https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.platform.doc.user%2Freference%2Fref-texteditorprefs.htm)


- 顶部菜单 -> `Source` -> `Clean Up` 针对代码的内容进行整理，比如去除无用代码或者引用包。
- 顶部菜单 -> `Source` -> `Format` 对代码的格式进行整理，比如设置了`Table`为4个空格，那么将会转换。
- 顶部菜单 -> `Source` -> `Organize Imports` 去除单个类中无用的引用包信息<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>O</kbd>


**垂直标尺**

+ `Window` -> `Preferences` -> `General` -> `Editors` -> `Text Editors` -> `Show Print Margin`
   + `Print margin column` 行宽
   + `Allow editors to override the margin column` 


**Java 格式化**

- `Window` -> `Preferences` -> `Java` -> `Code Style` -> `Formatter` -> `New` -> `Edit`
   - -> `Line Wrapping`
      - `Maximum Line width` 控制每行的最大字符数
      - `Set line width for preview window` 设置预览窗口的线宽
      - -> `Wrapping settings` -> `Binary expressions` -> `Line wrapping policy` -> `Wrap all elements,every elements on a new line` 将所有元素换行，每个元素都换行
      - -> `Function Calls` -> `Qualified invocations` -> `Wrap all elements,every elements on a new line` 连续调用不换行
      - `Never join already wrapped lines` 不格式化已换行的
   - -> `Comments` 注释
      - `Maximum line width for comments` 注释的最大行宽
         - `Count width from comment's starting position` 从注释的开始位置计算宽度
      - `Enable Javadoc comment formatting` 启用Javadoc注释格式
      - `Enable block comment formatting` 启用块注释格式（每一行以`*`开头）
      - `Enable line comment formatting` 启用行注释格式
         - `Format line comments on first column` 格式化代码与注释符之间的间距
      - `Enable header comment formatting` 启用标题注释格式
      - `Preserve whitespace between code and line comments` 保留代码和行注释之间的空格
      - `Never indent line comments on first column` 切勿在第一列缩进行注释
      - `Never indent block comments on first column` 切勿在第一列缩进块注释
      - `Never join lines` 从不连接线


**JavaScript 格式化**

- `Window` -> `Preferences` -> `Web` -> `Client-side JavaScript` -> `Code Style` -> `Formatter` -> `New` -> `Edit`
   - -> `Line Wrapping` 行宽
      - `Maximum Line width` 
      - `Set line width for preview window` 设置预览窗口的线宽
   - -> `Comments`
      - `Maximum line width for comments`


**JSP|HTML|CSS 格式化**

- `Window` -> `Preferences` -> `Web` -> `HTML Files` / `CSS Files` -> `Editor`
   - `Line width` 行宽
   - `Inline Elements` 选中所有 -> `Remove`
   - `Indent using spaces` 缩进使用空格
   - `Indentation size` 缩进使用多少个字符


**XML**

- `Window` -> `Preferences` -> `Web` -> `XML` -> `XML Files` -> `Editor`
   - `Formatting` -> `Line width` 行宽



## 设置编码格式

- 设置工作空间编码 `Window` -> `Preferences` -> `General` -> `Workspace` -> `Text file encoding` -> `Other`选择`UTF-8`
- 设置文档编码 `Window` -> `Preferences` -> `General` -> `Content Type` -> `Text`（填入编码后一定要点击`Update`）
   - -> `Default encoding`填入`UTF-8`
   - -> 展开`Text` -> 选中`Java Properties File` -> `Default encoding`填入`UTF-8` 设置Properties编码
   - -> 展开`Text` -> 选中`Spring Properties File` -> `Default encoding`填入`UTF-8`
   - -> 展开`Text` -> 选中`JSP` -> `Default encoding`填入`UTF-8` 设置JSP编码
   - -> 展开`Text` -> 展开`JSP` -> `JSP Fragment` -> `Default encoding`填入`UTF-8`
   - -> 展开`Text` -> 展开`JSP` -> `JSP Tag Definition` -> `Default encoding`填入`UTF-8`
   - -> 展开`Text` -> 展开`JSP` -> 展开`JSP Tag Definition` -> `XML JSP Tag Definition` -> `Default encoding`填入`UTF-8`
- 设置Web编码 `Window` -> `Preferences` -> `Web` -> `CSS Files`、`HTML Files`、`JSP Files` -> `Encoding`选择`ISO 10646/Unicode(UTF-8)`
- 设置项目的文档编码：选中项目右键 -> `Properties` -> `Resource` -> `Other`选择`UTF-8`



## 设置Tab为空格

- `Window` -> `Preferences` -> `General` -> `Editors` -> `Text Editors` -> 勾选 `Insert spaces for tabs`
   - `Remove multiple spaces on backspace/delete` 删除退格键/删除多个空格
- `Window` -> `Preference` -> `Java` -> `Code Style` -> `Formatter` -> `Edit` -> `Indentation` -> `Tab policy` 选择 `Spaces only`
- `Window` -> `Preferences` -> `Web` -> `CSS Files`、`HTML Files`、`JSP Files` -> `Editor`
   - `lndent using spaces` 选中
   - `lndentation size` 空格数



## 自动提示

* [Eclipse 开启代码提示与关闭变量命名补全](https://xienaoban.github.io/posts/32764)

- `Window` -> `Preferences` -> `Java` -> `Editor` -> `Content Assist`
   - `Auto Activation`
      - `Auto activation delay(ms)` 提示的延迟时间
      - ` Auto Activation triggers for java` 填入 `._abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ(,'"@`
   - `Advanced`
      - 勾选`Java Proposals (Task-Focused)`
      - 勾选`Template Proposals`
   - 解决输入`=`或`;`变量自动补全问题：勾选 `Disable insertion triggers except 'Enter'` (按<kbd>Enter</kbd>键才自动补全)
- XML自动补全 `Windows` -> `preferance` -> `XML` -> `XML Files` -> `Editor` -> `Content Assist`
   - `Auto Activation`下面的`Prompt when these characters are inserted` 填入 `<=:.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ `（注意后面有一个空格）
- 按`@`不提示注解：`Window` -> `Preferences` -> `Java` -> `Editor` -> `Content Assist`
   - `Advanced` 下把`java Proposals`勾上
   - `Enable non-blocking completion(does not affect open editors)` 启用非阻塞完成（不影响打开的编辑器）
- 高亮显示 `Window` -> `Preferences` -> `Java` -> `Editor` -> `Mark Occurences`
   - `Mark occurrences of the selected element in the current file.` 高亮显示选中的相同变量



## 清除缓存


- 顶部菜单 -> `Project` -> `Clean` 根据项目`.classpath`文件，清除编译信息，重新部署到`Java Build Path`下的`Default output folder`中。
- `Servers` -> `Clean` 是指原先编译到tomcat服务器上的程序，先清除掉，然后再重新编译。
- `Servers` -> `Clean Tomcat Work Directory...` 将已发布项目中存放jsp转译后的class文件的work目录删除


## 自动刷新

- `Windows` -> `Preference` -> `General`
   - `Workspace`
      - `Build`
         - `Save automatically before manual build` 在手动构建之前自动保存
         - `Build automatically`（同`Project`菜单下的按钮） 自动编译
      - `Refresh using native hooks or polling` 自动刷新文件
      - `Refresh on access` 访问时刷新
      - `Always close unrelated projects without prompt` 总是在不提示的情况下关闭不相关项目
      - `Workspace save interval (in minutes)` 工作区保存时间间隔(分钟)
   - `Startup and Shutdown`
      - `Refresh workspace on startup` 启动时刷新工作空间


## 查看类图及继承关系

+ 选中类，右键然后有以下选项
   + `Open Declaration` <kdb>F3</kdb>
   + `Open Type Hierarchy` <kdb>F4</kdb> 打开类层次结构查看窗口，显示包括它的父类和子类
      + `Show the Subtype Hierarchy` 只查看子类
      + `Show the Supertype Hierarchy` 只查看父类
   + `Open Call Hierarchy` <kdb>Ctrl</kdb>+<kdb>Alt</kdb>+<kdb>H</kdb>
   + `Show in Breadcrumb` <kdb>Alt</kdb>+<kdb>Shift</kdb>+<kdb>B</kdb> 面包屑导航
   + `Quick Outline` <kdb>Ctrl</kdb>+<kdb>O</kdb>
   + `Quick Type Hierarchy` <kdb>Ctrl</kdb>+<kdb>T</kdb>  打开类层次结构查看弹窗，显示包括它的父类和子类


## 项目显示结构

- `Windows` -> `Show View` -> `Other` -> 搜索 `Package Exploer`
- `Windows` -> `Show View` -> `Other` -> 搜索 `Tasks` 查看待办任务

+ `Window` -> `Preferences` -> `Java` -> `Compiler` -> `Task tags` 定义任务标签
   + `// TODO` 表示尚未完成的待办事项。
   + `// XXX` 表示被注释的代码虽然实现了功能，但是实现方案有待商榷，希望将来能改进。
   + `// FIXME` 表示被注释的代码需要被修正。


## 显示内存

> 在eclipse中打开heap状态 `Windows` -> `Preference` -> `General` –> 勾选`show heap status`


## 解决卡死现象

> Eclipse中jsp、js文件编辑时，卡死现象解决

- 取消验证 `Windows` -> `Preference` –> `validation` -> 点击`Disable All`然后勾选`classpath dependency Validator`
    - `Allow projects to override these preference settings` 允许项目覆盖这些首选项设置
    - `Suspend all validators` 暂停所有验证器
    - `Save all modified resources automatically prior to validating` 验证之前自动保存所有修改的资源
    - `Show a confirmation dialog when performing manual validations` 执行手动验证时显示确认对话框
- 关闭拼写检查 `Windows` -> `Preference` -> `General` –> `editors` -> `Text Editors` -> `spelling`
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



## 快捷键设置

- `Window` -> `Preference` -> `General` -> `Keys`
- 设置复制一行 搜索`Ctrl+Alt+Down`或者`Copy Lines`即可修改



## 自动导包

- `Window` -> `Preferences` -> `Java` -> `Editor` -> `Save Actions` -> 勾选 `Preform the selected actions on save`
    - `Format edited lines` 自动格式化修改的行
    - `Organize impots` 自动优化管理导入的包


## 右键new选项

- `Window` -> `Perspective` -> `Customize Perspective...` -> `Shortcuts`界面 -> `Submenus`列中选中`Java`


### SUN内部包不存在

> `sun.misc`（sun公司的内部方法，不属于JDK标准库范畴）包下的`BASE64Encoder`及`BASE64Decoder`来进行的

- 项目右键 -> `Build Path` -> `Configure Build Path` -> `Java Build Path` -> `Libraries` -> 展开`JRE System Libraries`
-> 选中`Access rules` -> 点击`Edit` -> 弹窗点击`Add` -> `Resolution`选择`Accessible` -> `Rule Pattern`输入`**` -> 点击`OK`



## 注释模板

+ `Help` -> `Help Contents` -> 搜索`Java Editor Template Variables`
+ `Window` -> `Preference` -> `Java` -> `Code Style` -> `Code Templates`
   + 展开`Comments` -> 点击选中子项（`files`、`Types`） -> `Pattern`填入注释模板
   + 勾选 `Automatically add comments for new methods and types` 自动为新方法和类型添加注释
+ 注释的使用：输入`/**`然后回车自动出来

- 创建新文件(New Java files)注释标签（在文件第一行）
- 类型(Types)注释标签（在主体声明上）

```java
/**
 * @Title ${file_name}
 * @Package ${package_name}
 * @Description 
 * @author bajins.com
 * @date ${date} ${time}
 * @version V1.0
 * @Copyright ${year} bajins.com Inc. All rights reserved.
 */
```

- 字段(Fields)注释标签

```java
 /** ${field} */
```

- 构造函数(Constructors)标签

```java
/**
 * @Title ${enclosing_type}
 * ${tags}
 * @author bajins.com
 * @date ${date} ${time}
 */
```

- 方法(Methods)标签

```java
/**
 * 
 * ${tags} ${return_type}
 * @author bajins.com
 * @date ${date} ${time}
 */
```

- 覆盖方法(Overriding Methods)标签

```java
/**
 * @Title ${enclosing_method}
 * @Description
 * ${tags}
 * ${see_to_overridden}
 * @author bajins.com
 * @date ${date} ${time}
 */
```

- 代表方法(Delegate Methods)标签

```java
/**
 * ${tags}
 * ${see_to_target}
 * @author bajins.com
 * @date ${date} ${time}
 */
```

- getter方法标签

```java
/**
 * @Title ${enclosing_method}
 * @Description 获取字段“${bare_field_name}”的值
 * @return ${field_type}
 * @author bajins.com
 * @date ${date} ${time}
 */
```

- setter方法标签

```java
/**
 * @Title ${enclosing_method}
 * @Description 设置字段“${bare_field_name}”的值
 * @param ${param}
 * @author bajins.com
 * @date ${date} ${time}
 */
```


## 命令执行


**eclipsec应用程序**

- `org.eclipse.jdt.core.JavaCodeFormatter` 格式化 Java 代码
   - `-config`
- `org.eclipse.jdt.core.JavaCompiler` 编译 Java 代码
   - `-sourcepath`
   - `-classpath`
- `org.eclipse.equinox.p2.director` 安装、更新或卸载 Eclipse 插件
   - `-repository`
   - `-installIU`
   - `-`
   - `-`
- `org.eclipse.ant.core.antRunner` 运行 Apache Ant 构建脚本
   - `-buildfile`
- `org.eclipse.ui.ide.workbench` 启动 Eclipse IDE 工作台
- `org.eclipse.jdt.apt.core.aptBuild` 运行 Java 注解处理器（Annotation Processing Tool）
   - `-sourcepath`
   - `-classpath`
- `org.eclipse.jdt.core.JavaIndexer` 索引 Java 项目
   - `-sourcepath`
- `org.eclipse.jdt.core.JavaModelManager` 管理 Java 模型
   - `-sourcepath`
- `org.eclipse.update.core.standaloneUpdate` 更新 Eclipse 安装
   - `-command install`
   - `-featureId org.eclipse.platform`
- `org.eclipse.core.launcher.Main` 启动 Eclipse 主应用程序


**启动**

- `eclipse -consoleLog -nosplash -data <workspace>`


**格式化代码**

- ` eclipsec -data <workspace> -application org.eclipse.jdt.core.JavaCodeFormatter [ OPTIONS: -help、-quiet、-verbose ] -config <configFile> <files>`
- `Window` -> `Preferences` -> `Java` -> `Code Style` -> `Formatter` -> `Export All` 导出格式化代码的配置XML文件


**编译构建**

- `eclipsec -nosplash -data <workspace> -application org.eclipse.ant.core.antRunner -buildfile <buildFile>`

```xml
<!-- build xml 格式化代码，使用ant format命令 -->
<project name="FormatCode" default="format" basedir=".">
    <property name="eclipse.home" value="eclipse文件夹" />
    <property name="src.dir" value="src" />

    <target name="format">
        <java classname="org.eclipse.jdt.core.formatter.CodeFormatter" fork="true">
            <classpath>
                <pathelement location="${eclipse.home}/plugins/org.eclipse.jdt.core_*.jar"/>
            </classpath>
            <arg value="-process"/>
            <arg value="${src.dir}"/>
        </java>
    </target>
</project>
```




## 插件安装使用

> 一般插件都有`plugins`和`features`两个文件夹，复制到eclipse安装目录即可

* [Eclipse插件开发](https://blog.csdn.net/chenhangx/article/details/119863089)
* [https://github.com/open-archetypes](https://github.com/open-archetypes)

+ `-vmargs -DproxySet=true -DproxyHost=aProxyAddress -DproxyPort=aProxyPort` 启动代理参数
+ `Eclipse Web Developer Tools`

- [https://marketplace.eclipse.org/metrics/successful_installs/last30days](https://marketplace.eclipse.org/metrics/successful_installs/last30days)
- [https://github.com/de-jcup](https://github.com/de-jcup)
- [https://github.com/eclipse-mylyn](https://github.com/eclipse-mylyn)
- SVN [https://www.eclipse.org/subversive](https://www.eclipse.org/subversive)
   - [https://polarion.plm.automation.siemens.com/products/svn](https://polarion.plm.automation.siemens.com/products/svn)
- [https://github.com/subclipse](https://github.com/subclipse)
   - [https://subclipse.github.io/snapshots](https://subclipse.github.io/snapshots)
   - [http://subversion.apache.org/packages.html](http://subversion.apache.org/packages.html)
   - Subversion for Java [https://svnkit.com](https://svnkit.com)
- 代码覆盖率 [https://github.com/eclipse/eclemma](https://github.com/eclipse/eclemma)
   - [https://sourceforge.net/projects/eclemma](https://sourceforge.net/projects/eclemma)
- 数据库 [https://dbeaver.io/download](https://dbeaver.io/download)
- 折叠代码块 [https://github.com/stefaneidelloth/EclipseFolding](https://github.com/stefaneidelloth/EclipseFolding)
   - [https://sourceforge.net/projects/coffeeby1](https://sourceforge.net/projects/coffeeby1)
   - [user-defined-code-folding-regions-in-eclipse](https://stackoverflow.com/questions/53229638/user-defined-code-folding-regions-in-eclipse)
   - [https://github.com/sky1983/EclipseFolding](https://github.com/sky1983/EclipseFolding)
   > 将插件放在`eclipse\dropins`，重启eclipse，`Window` -> `Preferences` -> `Java` -> `Editor` -> `Folding`
   > 在`Select folding to use`项选择：`Coffee Bytes Java Folding`
- [https://github.com/GrowThinky/AnnotationSupportEclipsePlugin](https://github.com/GrowThinky/AnnotationSupportEclipsePlugin)
- [https://github.com/qiangitchen/tlv8ide](https://github.com/qiangitchen/tlv8ide)
- [https://github.com/gildur/SimplePropertiesEditor](https://github.com/gildur/SimplePropertiesEditor)
- [https://github.com/FeatureIDE/FeatureIDE](https://github.com/FeatureIDE/FeatureIDE)
- [https://github.com/nodj/AutoDeriv](https://github.com/nodj/AutoDeriv)
- [https://www.esito.no/en/promo-g9](https://www.esito.no/en/promo-g9)
- 文本编辑器 [https://github.com/fabioz/LiClipseText](https://github.com/fabioz/LiClipseText)
- GUI设计 [https://github.com/eclipse/windowbuilder](https://github.com/eclipse/windowbuilder)
- 开发风格 [https://www.genuitec.com/products/devstyle](https://www.genuitec.com/products/devstyle)
- [http://kurucz-grafika.de/fatjar](http://kurucz-grafika.de/fatjar)
   - [eclipse中将项目打包成jar的两种方法，及其问题与解决方法](https://www.cnblogs.com/tianyanzhi/p/8067239.html)
- [https://sourceforge.net/projects/eclipsetidy](https://sourceforge.net/projects/eclipsetidy)
- [https://sourceforge.net/projects/eclipse-tools](https://sourceforge.net/projects/eclipse-tools)
- [https://github.com/sebthom/findview-eclipse-plugin](https://github.com/sebthom/findview-eclipse-plugin)
- Prettier [https://github.com/TheGreatGooo/EclipsePrettierPlugin](https://github.com/TheGreatGooo/EclipsePrettierPlugin)
- [https://github.com/AObuchow/Eclipse-Spectrum-Theme](https://github.com/AObuchow/Eclipse-Spectrum-Theme)



**反编译Decompiler**

+ `Window` -> `Preferences` -> `General` -> `Editors` -> `File Associations`
   + 在`File types`选中`*.class` 或 `*.class without source`
   + 在`Associated editors`选中`Class Decompiler Viewer`点击`Default`
+ `Window` -> `Preferences` -> `Java` -> `Decompiler`
   + `Escape unicode characters` 转义unicode字符
   + `Realign line numbers` 重新对齐行号
   + `Show original line numbers` 显示原始行号
   + `Show metadata` 显示元数据

- [https://github.com/ecd-plugin/ecd](https://github.com/ecd-plugin/ecd)
   - [https://ecd-plugin.github.io/update](https://ecd-plugin.github.io/update)
- [https://github.com/iloveeclipse/plugins/wiki](https://github.com/iloveeclipse/plugins/wiki)
- [https://github.com/java-decompiler/jd-eclipse](https://github.com/java-decompiler/jd-eclipse)
- [https://github.com/cnfree/Eclipse-Class-Decompiler](https://github.com/cnfree/Eclipse-Class-Decompiler)
- [https://github.com/helospark/import-jar-as-project](https://github.com/helospark/import-jar-as-project)
- [https://sourceforge.net/projects/drgarbagetools](https://sourceforge.net/projects/drgarbagetools)
- [https://github.com/helospark/import-jar-as-project](https://github.com/helospark/import-jar-as-project)
- 测试 [https://github.com/ot4i/perf-harness](https://github.com/ot4i/perf-harness)



**Cloud Toolkit**

> 帮助开发者更高效地开发、测试、诊断并部署应用。通过插件，可以将本地应用一键部署到任意服务器

* [http://toolkit.aliyun.com/eclipse](http://toolkit.aliyun.com/eclipse)
* [https://github.com/HPCToolkit/hpcviewer.e4](https://github.com/HPCToolkit/hpcviewer.e4)
