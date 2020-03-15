# IDEA


[[toc]]




## flag

* [https://www.jetbrains.com/products.html](https://www.jetbrains.com/products.html)

* [JetBrains 系列软件汉化包](https://github.com/pingfangx/TranslatorX)

**Export Settings**

> 导出设置时一定取消以下选项

1. File templates
2. File templates(schemes)
3. Live templates
4. Live templates(schemes)
5. MavenVersion
6. SDK Table



## 每次启动进入欢迎界面

- 打开`File` -> `Settings` -> `Appearance & Behavior` -> `System Settings`

- 勾选`Startup/Shutdown`下的`Reopen last project on startup`选项


## 格式化代码自动换行

- 打开`File` -> `Settings` -> `Editor` -> `Code Style` -> `Java` -> `Wrapping and Braces`

- 勾选`Keep when reformatting`下的`Line breaks`去除每次格式化时自动添加`+`符号

- 勾选`Keep when reformatting`下的`Ensure right margin is not exceeded`自动换行


## 代码最大行宽和自动换行

- 打开`File` -> `Settings` -> `Editor` -> `Code Style`

- 设置`General`下的`Hard wrap at`行宽；

- 勾选`General`下的`Wrap on typing`在编码时，超出最大行宽，则自动换行


## 格式化代码注释处理

- 打开`File` -> `Settings` -> `Editor` -> `Code Style` -> `Java` -> 右边选择`JavaDoc`

1. `Enable JavaDoc Formatting`启用JavaDoc格式化

2. `Wrap at right margin`右边缘换行，当最后一个单词会超出边界时，自动换行

3. `Do not wrap one line comments`同一行注释不要换行

4. `Preserve line feeds`保留换行

- 右边选择`Wrapping and Braces`

1. `Comment at first column	false`代码格式化的时候保证`commet`符号在代码块附近


## 去掉提示重复代码

- 打开`File` -> `Settings` -> `Editor` -> `Inspections` -> `General`

- 取消勾选`Duplincated File Template Usage`选项


## 去掉大小写敏感提示

- 打开`File` -> `Settings` -> `Editor` -> `General` -> `Code Completion`

- 取消勾选`Match case`，或者`Case sensitive completion`选择`None`


## 设置编码

- 打开 `File` -> `Settings` -> `Editor` -> `File Encodings`

1. `Global Encoding` 全局编码

2. `Project Encoding` 项目编码

3. `Default encoding for properties files` 属性文件的默认编码

4. 勾选`Transparent native-to-ascii conversion` 从本地转换ASCII


## 设置序列化ID

- 打开 `File` -> `Settings` -> `Editor` -> `Inspections` -> `Java` -> `Serialization issues`

1. 勾选`Serializable class without 'serialVersionUID'`

2. 勾选`'serialVersionUID' field not declared 'private static final long'`


## 自定义头部注释和模板

### 自定义头部注释

- 打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Includes`

> 在`File Header`中添加

```java
/**
 * 
 * @Description: 
 * @Author: ${USER}
 * @File: ${NAME}.java
 * @Version: 1.0.0
 * @Time: ${DATE} ${TIME}
 * @Project: ${PROJECT_NAME}
 * @Package: ${PACKAGE_NAME}
 * @Software: ${PRODUCT_NAME}
 */
```

- 引用：打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files`

- 在`Class`、`Interface`、`Enum`三个模板中的`public class ${NAME} {`上一行添加

```java
#parse("File Header.java")
```


* [JavaScript头部注释](#javascript-file自定义头注释)



### 预定义模板变量

| 变量                	| 说明                                           	|
|---------------------	|------------------------------------------------	|
| ${DATE}             	| 当前系统日期                                   	|
| ${DAY}              	| 当前月的日期                                   	|
| ${HOUR}             	| 当前时刻                                       	|
| ${MINUTE}           	| 当前分钟                                       	|
| ${MONTH_NAME_FULL}  	| 月份全称，例如: January, February, etc.        	|
| ${MONTH_NAME_SHORT} 	| 月份名称的前3个字母，例如: Jan, Feb, etc.      	|
| ${MONTH}            	| 当前月份                                       	|
| ${NAME}             	| 在创建文件期间在新建文件对话框中指定的文件名称 	|
| ${PACKAGE_NAME}     	| 当前所在包名                                   	|
| ${PRODUCT_NAME}     	| 将被创建文件所在的IDE名称                      	|
| ${PROJECT_NAME}     	| 当前项目的名称                                 	|
| ${TIME}             	| 当前系统时间                                   	|
| ${USER}             	| 系统的当前用户登录名称                         	|
| ${YEAR}             	| 当前年份                                       	|



### 自定义模板

- 打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files`

- 在`Class`模板中粘贴

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

#parse("File Header.java")

public class ${NAME} {

     private static final Logger logger = LoggerFactory.getLogger(${NAME}.class);
     
     
}
```



## 自定义方法注释模板

- 默认方法注释快捷键：<kbd>/**</kbd> + <kbd>Enter</kbd>

- Template text

```java
**
 * 
 * 
$params$
 * @return $ruturns$
 * @Description 
 * @author claer bajins.com
 * @date $date$ $time$
 */
```

- `@param`参数获取代码Groovy脚本

```groovy
// 使用tab作为参数后缀间隔符
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i]+'\\b'+ ((i < params.size() - 1) ? '\\n    ' : '')}; return result", methodParameters())
// 使用一个空格作为参数后缀间隔符，格式化时可以自动把所有参数对齐（推荐）
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i]+' '+ ((i < params.size() - 1) ? '\\n    ' : '')}; return result", methodParameters())
```

- `@return`参数获取代码Groovy脚本

```groovy
// 如果有返回参数使用一个空格作为参数后缀间隔符
groovyScript("def result=\"${_1}\"; if(result == 'void'){return '';}else{return result+' ';}", methodReturnType())
```

> 使用时，直接在方法上输入<kbd>/</kbd>加上你的`Abbreviation`名字，再按<kbd>Tab</kbd>键即可获取方法上的参数

![](/images/IDEA方法注释设置.png)

- 示例


![](/images/IDEA方法注释示例.png)


## 鼠标悬停查看注释

- 打开`File` -> `Settings` -> `Editor` -> `General`

- 勾选`Other`下的`Show quick documentation on mouse move`选项

- 在`Other`下的`Tooltip delay`输入鼠标悬停时间单位`milliseconds(毫秒)`


## 注释自动缩进

> 注释默认靠左，可能代码前会有很大一段空格

- 打开`File` -> `Settings` -> `Editor` -> `Code Style` -> `JAVA`、`HTML`、`JavaScript`、`XML`、`TypeScript`、`Groovy`、`Kotlin`

- 右边选择`Code Generation` -> 取消勾选`Comment Code`下的`Line comment at first column`和`Block comment at first column`


## 自动优化导包

- 打开`File` -> `Settings` -> `Editor` -> `General` -> `Auto Import`

- 勾选`Add unambiguous imports on the fly`和`Optimize imports on the fly(for current project)`两个选项


> `Add unambiguous imports on the fly` 自动帮我们优化导入的包，比如自动去掉一些没有用到的包。 

> `Optimize imports on the fly(for current project)` 自动帮我们导入需要用到的包。
> 但是对于同名的包，需要手动<kbd>Alt</kbd> + <kbd>Enter</kbd>进行导入。


## 热部署策略

* [Updating Applications on Application Servers](https://www.jetbrains.com/help/idea/updating-applications-on-application-servers.html)

- 打开顶部菜单`Run` -> `Edit Configurations` -> 应用名称如`SpringBoot` -> `目标项目` -> `Configuration`

- 选择`Spring Boot` -> `Update classes and resources`下的`On 'Update' action`和`On frame deactivation`两个选项

> `On 'Update' action`当代码改变的时候做什么

> `On frame deactivation`当失去焦点，比如最小化IDEA窗口的时候做什么


## 自动编译

**动态**

- 同时按住<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>/</kbd>然后点击`Registry`，勾选自动编译并调整延时参数。

1. `compiler.automake.allow.when.app.running`自动编译（动态）
2. `compiler.automake.trigger.delay`触发自动生成以响应文件系统事件之前的延迟（单位毫秒），默认300
3. `compiler.document.save.trigger.delay`触发保存以响应文档更改之前的延迟（单位毫秒），默认1500
4. `compiler.build.report.statistics`显示构建器的执行时间
5. `compiler.document.save.enabled`是否启用项目保存以响应文档更改
6. `compiler.external.javac.keep.alive.timeout`如果在指定的时间段或更长时间内未使用，则IDE将关闭缓存的javac编译过程

> 修改完成后直接敲回车即保存


**静态**

- 打开`File` -> `Settings` -> `Build, Execution, Deployment` -> `Compiler`

- 勾选`Build project automatically`自动构建项目，仅在未运行/调试时有效，静态

- 勾选`Complie independent modules in parallel`并行编译独立模块，可能需要更大的堆大小


## 去掉局部背景色

**去掉SQL检测**

- 打开`File` -> `Settings` -> `Editor` -> `Inspections` -> `SQL`

- 取消勾选`No data sources configured`如果没有，则提示创建一个数据源。

- 取消勾选`SQL dialect detection`为<Generic>方言中的文件检测最匹配的SQL方言。



**去掉背景**

- 打开`File` -> `Settings` -> `Editor` -> `Color Scheme` -> `General` -> `Code`

- 点击`Injected language fragment`，去掉最右边的`Background`选项。


## 项目目录设置

![](/images/IDEA目录结构说明.png)

![](/images/IDEA项目目录指定.png)





## PyCharm


### `Python Script`自定义头注释

* [预定义模板变量](#预定义模板变量)

- 在`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Includes` -> `File Header`中添加

```python
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
#
# @Description: 
# @PreInstall: 
# @Author : ${USER}
# @File : ${NAME}.py
# @Version: 1.0.0
# @Time : ${DATE} ${TIME}
# @Project: ${PROJECT_NAME}
# @Package: ${PACKAGE_NAME}
# @Software: ${PRODUCT_NAME}
```

- 引用：打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files`

- 在`Python Script`模板中第一行引用：`#parse("File Header")`

> 默认函数注释快捷键：<kbd>"""</kbd> + <kbd>Enter</kbd>

> 注意：如果使用函数注释时无法映射函数参数，在函数名中键入数遍光标，左上角亮起小灯泡，
> 点击小灯泡（或者使用快捷键<kbd>Alt</kbd> + <kbd>Enter</kbd>），再点击`Insert documentation string stub`选择注释格式

### 自动导包

- 打开`File` -> `Settings` -> `Editor` -> `General` -> `Auto Import`

- 勾选`Python` -> `Show import popup`



### 函数注释

- 打开 `File` -> `Settings` -> `Tools` -> `Python Integrated Tools`

1. `Docstring format` 选择格式：默认`Plain`（空的）、`Epytext`（Python2）、`reStructuredText`、`NumPy`、`Google`

2. `Docstrings` -> `Analyze Python code in docstrings` 分析文档字符串中的python代码

3. `Render external documentation for stdlib` 渲染stdlib的外部文档


## GoLand

### `Go File`自定义头注释

* [预定义模板变量](#预定义模板变量)

- 在`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Includes` -> `File Header`中添加

```go
/**
 * 
 * @Description: 
 * @Author: ${USER}
 * @File: ${NAME}.go
 * @Version: 1.0.0
 * @Time: ${DATE} ${TIME}
 * @Project: ${PROJECT_NAME}
 * @Package: ${PACKAGE_NAME}
 * @Software: ${PRODUCT_NAME}
 */
```

- 引用：打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files`

- 在`Go File`模板中第一行引用：`#parse("File Header")`


## WebStorm

### `JavaScript File`自定义头注释

* [预定义模板变量](#预定义模板变量)

- 在`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Includes` -> `File Header`中添加

```js
/**
 * 
 * @Description: 
 * @Author: ${USER}
 * @File: ${NAME}.js
 * @Version: 1.0.0
 * @Time: ${DATE} ${TIME}
 * @Project: ${PROJECT_NAME}
 * @Package: ${PACKAGE_NAME}
 * @Software: ${PRODUCT_NAME}
 */
```


- 引用：打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files`

- 在`JavaScript File`模板中第一行引用：`#parse("File Header.js")`

- 默认函数注释快捷键：<kbd>/**</kbd> + <kbd>Enter</kbd>





## 错误解决

### idea无限indexing解决方法

* [IntelliJ IDEA 缓存和索引介绍和清理方法](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)

![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

### OutOfMemoryError

> `idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space`

- 打开顶部菜单`Run` -> `Edit Configurations` -> 应用名称如`SpringBoot` -> `目标项目` -> `Configuration`

- 在`Vm options`中输入

```
-Xms2048m
-Xmx2048m
-XX:MaxPermSize=4096m
-Drebel.spring_plugin=true
-Drebel.spring_mvc_plugin=true
-Drebel.hibernate_plugin=true
```



## 插件


* [实用IDEA工具](https://blog.csdn.net/weixin_37645838/article/details/85953193)


**Free Mybatis plugin**

* [https://gitee.com/wuzhizhan/free-idea-mybatis](https://gitee.com/wuzhizhan/free-idea-mybatis)


**mybatis-lite**

* [https://github.com/mustfun/mybatis-plus](https://github.com/mustfun/mybatis-plus)


**mybatis-plus**

* [https://github.com/kana112233/mybatis-plus-plugin](https://github.com/kana112233/mybatis-plus-plugin)


**MyBatisCodeHelper-Pro**

* [文档](https://gejun123456.github.io/MyBatisCodeHelper-Pro/#)

* [MybatisCodeHelperPro试用key获取](http://brucege.com/pay/getfreetrial?)


**.ignore**

* [https://plugins.jetbrains.com/plugin/7495--ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

> 生成各种ignore文件，一键创建git ignore文件的模板，免得自己去写

![](/images/ignore.gif)


**Maven Helper**

* [https://plugins.jetbrains.com/plugin/7179-maven-helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

> 一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖

* [使用Maven Helper解决Maven依赖冲突](https://segmentfault.com/a/1190000017542396)

![](/images/MavenHelper.png)


**GsonFormat**

* [https://plugins.jetbrains.com/plugin/7654-gsonformat](https://plugins.jetbrains.com/plugin/7654-gsonformat)

> google出的一键根据json文本生成java类，非常方便

![](/images/GsonFormat.gif)


**FindBugs-IDEA**

* [https://plugins.jetbrains.com/plugin/3847-findbugs-idea](https://plugins.jetbrains.com/plugin/3847-findbugs-idea)

> 检测代码中可能的bug及不规范的位置，检测的模式相比p3c更多，写完代码后检测下 避免低级bug，强烈建议用一下，一不小心就发现很多老代码的bug

![](/images/FindBugs-IDEA.gif)


**Lombok plugin**

* [https://plugins.jetbrains.com/plugin/6317-lombok-plugin](https://plugins.jetbrains.com/plugin/6317-lombok-plugin)

> 支持lombok的各种注解，从此不用写getter setter这些 可以把注解还原为原本的java代码,除此之外还有其他更多注解以减少代码

![](/images/lombok.gif)


**p3c**

* [https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)

> 阿里巴巴出品的java代码规范插件,可以扫描整个项目 找到不规范的地方 并且大部分可以自动修复 



**VisualVM Launcher**

* [https://plugins.jetbrains.com/plugin/7115-visualvm-launcher](https://plugins.jetbrains.com/plugin/7115-visualvm-launcher)

> 运行java程序的时候启动visualvm，方便查看jvm的情况 比如堆内存大小的分配，某个对象占用了多大的内存，jvm调优必备工具

![](/images/VisualVM-Launcher.gif)


**GenerateAllSetter**

* [https://plugins.jetbrains.com/plugin/9360-generateallsetter](https://plugins.jetbrains.com/plugin/9360-generateallsetter)

> 一键调用一个对象的所有set方法并且赋予默认值 在对象字段多的时候非常方便

![](/images/GenerateAllSetter.gif)


**Rainbow Brackets**

* [https://plugins.jetbrains.com/plugin/10080-rainbow-brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)

> 彩虹颜色的括号，看着很舒服 敲代码效率变高

![](/images/RainbowBrackets.png)


**Translation**

* [https://plugins.jetbrains.com/plugin/8579-translation](https://plugins.jetbrains.com/plugin/8579-translation)

> 最好用的翻译插件，功能很强大，界面很漂亮

![](/images/Translation.gif)


**Markdown Navigator**

* [https://github.com/vsch/idea-multimarkdown](https://github.com/vsch/idea-multimarkdown)

> 带有GFM 的Markdown插件和匹配的预览样式。

![](https://github.com/vsch/idea-multimarkdown/raw/master/assets/images/capabilities2.png)


**IDEA Mind Map**

* [https://github.com/raydac/netbeans-mmd-plugin](https://github.com/raydac/netbeans-mmd-plugin)

> 思维导图支持多种格式文件的导入和导出，同步更新时便于合并「以文本格式保存，支持 markdown 的语法，方便解决冲突」


**ASM Bytecode Outline**

* [https://github.com/melix/asm-bytecode-intellij](https://github.com/melix/asm-bytecode-intellij)

> 查看 Class 类的字节码


**stackoverflow**

* [https://github.com/gejun123456/IntellijGoToStackOverFlow](https://github.com/gejun123456/IntellijGoToStackOverFlow)

> 这个插件对于查找问题特别方便，定位异常，点击右键快速跳转到`stackoverflow`网站，每次至少为你节约了`10`秒。


