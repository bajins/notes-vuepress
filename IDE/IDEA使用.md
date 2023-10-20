# IDEA使用

[[toc]]


## Flag

+ [https://github.com/JetBrains](https://github.com/JetBrains)
     + [https://www.jetbrains.com/products.html#type=ide](https://www.jetbrains.com/products.html#type=ide)
     + [https://www.jetbrains.com/idea/download/other.html](https://www.jetbrains.com/idea/download/other.html)
+ 简体中文专题教程 [https://github.com/judasn/IntelliJ-IDEA-Tutorial](https://github.com/judasn/IntelliJ-IDEA-Tutorial)

- [教育邮箱免费申请JetBrains教育许可证](https://mp.weixin.qq.com/s/XFoOBeTaBwBAsRgadxMLfQ)
- [JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包](https://www.fuocu.cn/archives/jetbrains-crack)
- [JetBrains 2019.3系列软件汉化包](https://github.com/pingfangx/TranslatorX)

* [IntelliJ IDEA神器使用技巧](https://www.imooc.com/learn/924)
* [IDEA的基本使用：让你的IDEA有飞一般的感觉](https://blog.csdn.net/fly910905/article/details/77868300)
* [挑战idea社区版Javaweb开发](https://www.jianshu.com/p/dc8f3508a8ba)
* [无需破解，使用IDEA社区版开发Web项目](https://juejin.cn/post/6904998792999731207)
* [已经足够好用的IDEA社区版](https://www.jianshu.com/p/c98c8d75f71d)



**查看类类图及继承关系**

+ 选中类右键 -> `Diagram` -> `Show Diagram` <kdb>Ctrl</kdb>+<kdb>Alt</kdb>+<kdb>Shift</kdb>+<kdb>U</kdb>
    + 选中关系图中的名称，点击右键查看实现类 `Show Implementations` <kdb>Ctrl</kdb>+<kdb>Alt</kdb>+<kdb>B</kdb>
    + 选中关系图中的名称，点击右键查看父类 `Show Parents` <kdb>Ctrl</kdb>+<kdb>Alt</kdb>+<kdb>P</kdb>

- 蓝色实线箭头是指继承关系
- 绿色虚线箭头是指接口实现关系



<details>
<summary><b>展开查看思维导图</b></summary>
<img src="/images/IDEA使用技巧.png" alt>
</details>



**设置**

* [IDEA设置.zip](/files/IDEA设置.zip)

**Export Settings**

> 导出设置时一定取消以下选项

1. File templates
2. File templates(schemes)
3. Live templates
4. Live templates(schemes)
5. MavenVersion
6. SDK Table

> `File` -> `Power Save Mode`(节电模式) 勾选后将会导致提示、自动加载等都不生效



## 建立多级项目

> 特别说明：每个模块中的顶级包名（java目录下的包名）一定不能一样，否则编译器会把多个模块中的代码编译相互串连。
> 如：`src/main/java/com/bajins/demo`这里的`com/bajins/demo`就是顶级包名，
> 应该加上当前项目名`src/main/java/com/bajins/demo/admin`

**创建顶级项目（根项目）**

1. 点击顶部菜单栏 `File` -> `New` -> `Project`（或在欢迎页面点击`Create New Project`） -> `Maven`（不要勾选`Create from archetype`） -> `Next`
2. 填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名），点击 `Next`
3. 打开 `pom.xml` ，添加 `<packaging>pom</packaging>`（聚合工程或传递依赖用），如果有了就不用添加
4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子项目（二级项目）**

1. 在顶级项目名上点击<kbd>右键</kbd>弹出菜单（或点击顶部菜单`File`） -> `New` -> `Module` -> `Maven`（不要勾选`Create from archetype`） -> `Next`
2.  填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名） -> 点击 `Next` -> 选择 `Parent`（上级项目）放在最后操作是因为修改 `Name` 时会自动变化
3. 打开 `pom.xml` ，添加 `<packaging>pom</packaging>`（聚合工程或传递依赖用）
4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子模块（最后一级项目）**

> 如果还需要创建下级项目，重复创建子项目的操作即可

> 创建子模块只需要重复创建子项目，但是不要删除任何其他文件和目录，也不要添加`<packaging>pom</packaging>`


<details>
<summary style="font-size:130%">展开查看示例结构</summary>

```
demo                        # 顶级项目（根项目）
│  pom.xml
│  
├─admin                     # 二级项目
│  │  pom.xml
│  │  
│  ├─admin-api              # 二级项目模块
│  │  │  pom.xml
│  │  │  
│  │  └─src
│  │      ├─main
│  │      │  ├─java
│  │      │  └─resources
│  │      └─test
│  │          └─java
│  └─admin-web              # 二级项目模块
│      │  pom.xml
│      │  
│      └─src
│          ├─main
│          │  ├─java
│          │  └─resources
│          └─test
│              └─java
└─buyer                     # 二级项目
    │  pom.xml
    │  
    ├─shop                  # 三级项目
    │  │  pom.xml
    │  │  
    │  ├─shop-api           # 三级项目模块
    │  │  │  pom.xml
    │  │  │  
    │  │  └─src
    │  │      ├─main
    │  │      │  ├─java
    │  │      │  └─resources
    │  │      └─test
    │  │          └─java
    │  └─shop-client        # 三级项目模块
    │      │  pom.xml
    │      │  
    │      └─src
    │          ├─main
    │          │  ├─java
    │          │  └─resources
    │          └─test
    │              └─java
    └─user                  # 三级项目
        │  pom.xml
        │  
        ├─user-api          # 三级项目模块
        │  │  pom.xml
        │  │  
        │  └─src
        │      ├─main
        │      │  ├─java
        │      │  └─resources
        │      └─test
        │          └─java
        └─user-client       # 三级项目模块
            │  pom.xml
            │  
            └─src
                ├─main
                │  ├─java
                │  └─resources
                └─test
                    └─java
```
</details>









### 远程Debug

**首先要设置[启动JVM远程Debug参数](/Java/JDK工具.md#远程debug参数)**

- 点击顶部菜单`Run`点击`Edit Configuration`按钮 -> 出现弹窗，点击`+`按钮，找到`Remote`选项。
- 在`Name`中填入Remote项目名称，在`Host`中填IP地址，在`Port`中填端口号，在`Use Module classpath`选择远程调试的项目module，配置完成后点击OK即可

> 启动项目时选择刚刚填的Remote项目名称

![](/images/IDEA远程debug调试.png)




## 错误解决

### idea无限indexing解决方法

* [IntelliJ IDEA 缓存和索引介绍和清理方法](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)

![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

### OutOfMemoryError

> `idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space`

- 打开顶部菜单`Run` -> `Edit Configurations` -> 应用名称如`SpringBoot` -> `目标项目` -> `Configuration`

- 在`Vm options`中输入

```conf
-Xms2048m
-Xmx2048m
-XX:MaxPermSize=4096m
-Drebel.spring_plugin=true
-Drebel.spring_mvc_plugin=true
-Drebel.hibernate_plugin=true
```




## 启动进入欢迎界面

- 打开`File` -> `Settings` -> `Appearance & Behavior` -> `System Settings`
     - 勾选`Startup/Shutdown`下的`Reopen last project on startup`选项


## 格式化代码

- 打开`File` -> `Settings` -> `Editor` -> `Code Style`
     - -> `General`
          - `Hard wrap at` 设置行宽，会在格式化的时候强制插入换行符，形成显示效果上的换行
          - `Wrap on typing` 在编码时，超出最大行宽，则自动换行
          - `Appearance` -> `Show whitespaces` 设置显示空白字符
     - `Java` 在右侧的 `Use tab character` 不勾选，设置tab为4个空格
     - -> `Java` -> `Wrapping and Braces`
          - 勾选`Keep when reformatting`下的`Line breaks` 去除每次格式化时自动添加`+`符号
          - 勾选`Keep when reformatting`下的`Ensure right margin is not exceeded` 自动换行
          - `Comment at first column false` 代码格式化的时候保证`commet`符号在代码块附近
     - -> `Java` -> 右边选择`JavaDoc`
          - `Enable JavaDoc Formatting` 启用JavaDoc格式化
          - `Wrap at right margin` 右边缘换行，当最后一个单词会超出边界时，自动换行
          - `Do not wrap one line comments` 同一行注释不要换行
          - `Preserve line feeds` 保留换行

+  `File` -> `Settings` -> `Editor` -> `General` -> 右边`Soft wrap` （只会在 IDEA 的显示效果上有换行的效果，实际上并没有换行符）


**缩进参考线**

+ `File` -> `Settings` -> `Appearance & Behavior` -> `Appearance` -> 右边勾选 `Show indent guides`
+ `File` -> `Settings` -> `Editor` -> `General` -> `Appearance` -> 右边勾选 `Show indent guides`


**垂直标尺**

+ `File` -> `Settings` -> `Editor` -> `General` -> `Appearance`
     + 2018之前版本，右边勾选 `Show right margin`
     + 2018之后版本，右边勾选 `Show hard wrap guide` 或 `Show hard wrap and visual guides (configured in Code Style options)`



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
     - 勾选`Serializable class without 'serialVersionUID'`
     - 勾选`'serialVersionUID' field not declared 'private static final long'`


## 自定义头部注释

- 打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Includes` -> 在`File Header`中添加

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

```groovy
#parse("File Header.java")
```

* [JavaScript头部注释](#webStorm)


## 自定义模板

- 打开`File` -> `Settings` -> `Editor` -> `File and Code Templates` -> `Files` -> 在`Class`模板中粘贴

```groovy
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

#parse("File Header.java")

public class ${NAME} {

     //private static final Logger logger = LoggerFactory.getLogger(${NAME}.class);
     private Logger log = LoggerFactory.getLogger(this.getClass());
     
}
```


### 预定义模板变量

+ [https://www.jetbrains.com/help/idea/file-template-variables.html](https://www.jetbrains.com/help/idea/file-template-variables.html)
+ [https://www.jetbrains.com/help/idea/template-variables.html](https://www.jetbrains.com/help/idea/template-variables.html)


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



## 自定义方法注释

- 默认方法注释快捷键：<kbd>/**</kbd> + <kbd>Enter</kbd>
- Template text

```groovy
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
- 取消勾选`SQL dialect detection`为`<Generic>`方言中的文件检测最匹配的SQL方言。



**去掉背景**

- 打开`File` -> `Settings` -> `Editor` -> `Color Scheme` -> `General` -> `Code`
- 点击`Injected language fragment`，去掉最右边的`Background`选项。


## 项目目录设置

![](/images/IDEA目录结构说明.png)

![](/images/IDEA项目目录指定.png)





## PyCharm


**Python Script自定义头注释**

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


### 自动导包

- 打开`File` -> `Settings` -> `Editor` -> `General` -> `Auto Import`
     - 勾选`Python` -> `Show import popup`



### 函数注释

- 打开 `File` -> `Settings` -> `Tools` -> `Python Integrated Tools`

1. `Docstring format` 选择格式：默认`Plain`（空的）、`Epytext`（Python2）、`reStructuredText`、`NumPy`、`Google`
2. `Docstrings` -> `Analyze Python code in docstrings` 分析文档字符串中的python代码
3. `Render external documentation for stdlib` 渲染stdlib的外部文档

- 默认函数注释快捷键：<kbd>"""</kbd> + <kbd>Enter</kbd>

> 注意：如果使用函数注释时无法映射函数参数，在函数名中键入数遍光标，左上角亮起小灯泡，
> 点击小灯泡（或者使用快捷键<kbd>Alt</kbd> + <kbd>Enter</kbd>），再点击`Insert documentation string stub`选择注释格式


## GoLand

**Go File自定义头注释**

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

**JavaScript File自定义头注释**

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




