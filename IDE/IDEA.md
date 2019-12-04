# IDEA

* [每次启动进入欢迎界面](#每次启动进入欢迎界面)
* [格式化代码时自动换行](#格式化代码时自动换行)
* [去掉提示重复代码](#去掉提示重复代码)
* [去掉大小写敏感提示](#去掉大小写敏感提示)
* [自定义创建文件头部注释](#自定义创建文件头部注释)
  * [预定义模板变量](#预定义模板变量)
* [自定义类文件创建模板](#自定义类文件创建模板)
* [自定义方法注释模板](#自定义方法注释模板)
* [鼠标悬停查看方法注释](#鼠标悬停查看方法注释)
* [自动优化导包](#自动优化导包)
* [热部署策略](#热部署策略)
* [自动编译](#自动编译)
* [去掉SQLXML局部背景色](#去掉sqlxml局部背景色)
* [项目目录设置](#项目目录设置)
* [错误解决](#错误解决)
  * [idea无限indexing解决方法](#idea无限indexing解决方法)
  * [OutOfMemoryError](#outofmemoryerror)
* [插件](#插件)
* [PyCharm](#pycharm)
  * [`Python Script`生成文件头注释](#python-script生成文件头注释)
  * [自动导包](#自动导包)
* [GoLand](#goland)
  * [`Go File`生成文件头注释](#go-file生成文件头注释)
* [WebStorm](#webstorm)
  * [`JavaScript File`生成文件头注释](#javascript-file生成文件头注释)





## flag

* [https://www.jetbrains.com/products.html](https://www.jetbrains.com/products.html)



## 每次启动进入欢迎界面

![IDEA_startup](/images/IDEA_startup.png)

## 格式化代码时自动换行

![](/images/IDEA设置格式化代码时自动换行.PNG)

## 去掉提示重复代码

![](/images/IDEA设置去掉提示重复代码.png)

## 去掉大小写敏感提示

![](/images/IDEA去掉大小写区分提示.png)

## 自定义创建文件头部注释

- 在`File`->`Settings`->`Editor`->`File and Code Templates`->`Includes`->`File Header`中添加

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

- 在文件模板中引用：`#parse("File Header.java")`

![](/images/IDEA设置创建文件时的注释.png)

- JavaScript头部注释

> 在`File`->`Settings`->`Editor`->`File and Code Templates`->`Includes`->`+`中添加一个`File Header`后缀为`js`

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

![](/images/IDEA-JavaScriptHeader.png)

- 在`JavaScript File`文件模板中引用：`#parse("JavaScript Header.js")`

![](/images/IDEA-JavaScriptHeaderParse.png)

### 预定义模板变量

- `${PROJECT_NAME}` - 当前项目的名称
 
- `${PACKAGE_NAME}` - 当前所在包名

- `${NAME}` - 在创建文件期间在新建文件对话框中指定的文件名称

- `${USER}` - 系统的当前用户登录名称

- `${DATE}` - 当前系统日期

- `${TIME}` - 当前系统时间

- `${YEAR}` - 当前年份

- `${MONTH}` - 当前月份

- `${DAY}` - 当前月的日期

- `${HOUR}` - 当前时刻

- `${MINUTE}` - 当前分钟

- `${PRODUCT_NAME}` - 将被创建文件所在的IDE名称

- `${MONTH_NAME_SHORT}` - 月份名称的前3个字母，例如: Jan, Feb, etc.

- `${MONTH_NAME_FULL}` - 月份全称，例如: January, February, etc.



## 自定义类文件创建模板



```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} 
!= "")package ${PACKAGE_NAME};#end


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

#parse("File Header.java")

public class ${NAME} {

     private static final Logger logger = LoggerFactory.getLogger(${NAME}.class);
     
     
}
```

![](/images/IDEA设置类文件创建模板.png)


## 自定义方法注释模板

- 默认方法注释快捷键：`/**`+`Enter`

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

> 使用时，直接在方法上输入`/`加上你的`Abbreviation`名字，再按`Tab`键即可获取方法上的参数

![](/images/IDEA方法注释设置.png)

- 示例


![](/images/IDEA方法注释示例.png)


## 鼠标悬停查看方法注释

![](/images/IDEA鼠标悬停查看方法注释.png)


## 自动优化导包

- `File`→`Settings`→`General`→`Auto Import`→`Python`→`Show import popup`

> `Add unambiguous imports on the fly` 自动帮我们优化导入的包，比如自动去掉一些没有用到的包。 

> `Optimize imports on the fly` 自动帮我们导入需要用到的包。但是对于同名的包，需要手动`Alt + Enter`进行导入。

![](/images/IDEA自动优化导包.png)

## 热部署策略

- 顶部菜单`Run`->`Edit Configurations`->`SpringBoot`->`目标项目`->勾选`Update classes and resources`。

![](/images/IDEA的热部署策略.png)

## 自动编译

- 同时按住`Ctrl + Shift + Alt + /`然后进入`Registry`，勾选自动编译并调整延时参数。

![](/images/IDEA自动编译-动态.png)

- 打开顶部工具栏`File`->`Settings`->`Default Settings`->`Build`->`Compiler` 然后勾选`Build project automatically`

![](/images/IDEA自动编译-静态.png)

## 去掉SQLXML局部背景色

- 1.快捷键`ctrl + alt+ s`打开Settings。找到`Editor -> Inspections`的配置页面，去掉SQL中`No data sources configured`（没有配置数据源） 选项 和 `SQL dialect detection`（SQL方言检测） 选项。

![](/images/IDEA去掉SQL选项.png)

- 2.去掉背景。找到`Editor -> Color -> General`的配置页面，选择`Code -> Injected language fragment`，去掉最右边的`Background`选项。

![](/images/IDEA去掉代码背景.png)

## 项目目录设置

![](/images/IDEA目录结构说明.png)

![](/images/IDEA项目目录指定.png)






## 错误解决

### idea无限indexing解决方法

[tengj](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)

![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

### OutOfMemoryError

> idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space

- 在`Vm options`中输入

```
-Xms2048m -Xmx2048m -XX:MaxPermSize=4096m -Drebel.spring_plugin=true -Drebel.spring_mvc_plugin=true -Drebel.hibernate_plugin=true
```

![](/images/IDEA设置VmOptions.png)








## 插件

- Free Mybatis plugin

[https://github.com/wuzhizhan/free-idea-mybatis](https://github.com/wuzhizhan/free-idea-mybatis)

- mybatis-plus

[https://github.com/mustfun/mybatis-plus](https://github.com/mustfun/mybatis-plus)

- MyBatisCodeHelper-Pro

[](https://gejun123456.github.io/MyBatisCodeHelper-Pro/#/)
[MybatisCodeHelperPro试用key获取](http://brucege.com/pay/getfreetrial?)

- .ignore

[https://plugins.jetbrains.com/plugin/7495--ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

> 生成各种ignore文件，一键创建git ignore文件的模板，免得自己去写

![](/images/ignore.gif)

- Maven Helper

[https://plugins.jetbrains.com/plugin/7179-maven-helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

> 一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖

![](/images/MavenHelper.png)

- GsonFormat

[https://plugins.jetbrains.com/plugin/7654-gsonformat](https://plugins.jetbrains.com/plugin/7654-gsonformat)

> google出的一键根据json文本生成java类，非常方便

![](/images/GsonFormat.gif)

- FindBugs-IDEA

[https://plugins.jetbrains.com/plugin/3847-findbugs-idea](https://plugins.jetbrains.com/plugin/3847-findbugs-idea)

> 检测代码中可能的bug及不规范的位置，检测的模式相比p3c更多，写完代码后检测下 避免低级bug，强烈建议用一下，一不小心就发现很多老代码的bug

![](/images/FindBugs-IDEA.gif)

- Lombok plugin

[https://plugins.jetbrains.com/plugin/6317-lombok-plugin](https://plugins.jetbrains.com/plugin/6317-lombok-plugin)

> 支持lombok的各种注解，从此不用写getter setter这些 可以把注解还原为原本的java代码,除此之外还有其他更多注解以减少代码

![](/images/lombok.gif)

- p3c

[https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)

> 阿里巴巴出品的java代码规范插件,可以扫描整个项目 找到不规范的地方 并且大部分可以自动修复 



- VisualVM Launcher

[https://plugins.jetbrains.com/plugin/7115-visualvm-launcher](https://plugins.jetbrains.com/plugin/7115-visualvm-launcher)

> 运行java程序的时候启动visualvm，方便查看jvm的情况 比如堆内存大小的分配，某个对象占用了多大的内存，jvm调优必备工具

![](/images/VisualVM-Launcher.gif)

- GenerateAllSetter

[https://plugins.jetbrains.com/plugin/9360-generateallsetter](https://plugins.jetbrains.com/plugin/9360-generateallsetter)

> 一键调用一个对象的所有set方法并且赋予默认值 在对象字段多的时候非常方便

![](/images/GenerateAllSetter.gif)

- Rainbow Brackets

[https://plugins.jetbrains.com/plugin/10080-rainbow-brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)

> 彩虹颜色的括号，看着很舒服 敲代码效率变高

![](/images/RainbowBrackets.png)

- Translation

[https://plugins.jetbrains.com/plugin/8579-translation](https://plugins.jetbrains.com/plugin/8579-translation)

> 最好用的翻译插件，功能很强大，界面很漂亮

![](/images/Translation.gif)

- Markdown Navigator

[https://github.com/vsch/idea-multimarkdown](https://github.com/vsch/idea-multimarkdown)

> 带有GFM 的Markdown插件和匹配的预览样式。

![](https://github.com/vsch/idea-multimarkdown/blob/master/assets/images/capabilities2.png)




## PyCharm

### `Python Script`生成文件头注释

[预定义模板变量](#预定义模板变量)

- 在`File`->`Settings`->`Editor`->`File and Code Templates`->`Includes`->`File Header`中添加

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

- 在`Python Script`文件模板中引用：`#parse("File Header")`

- 默认函数注释快捷键：`"""`+`Enter`

### 自动导包

- `File`→`Settings`→`General`→`Auto Import`→`Python`→`Show import popup`

![](/images/PyCharm自动导包.png)


## GoLand

### `Go File`生成文件头注释

[预定义模板变量](#预定义模板变量)

- 在`File`->`Settings`->`Editor`->`File and Code Templates`->`Includes`->`File Header`中添加

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

- 在`Go File`文件模板中引用：`#parse("File Header")`



## WebStorm

### `JavaScript File`生成文件头注释

[预定义模板变量](#预定义模板变量)

- 在`File`->`Settings`->`Editor`->`File and Code Templates`->`Includes`->`File Header`中添加

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

- 在`JavaScript File`文件模板中引用：`#parse("File Header")`


- 默认函数注释快捷键：`/**`+`Enter`