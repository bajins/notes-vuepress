# IDEA

## 目录
* [设置每次启动进入欢迎界面](#设置每次启动进入欢迎界面)
* [设置格式化代码时自动换行](#设置格式化代码时自动换行)
* [设置去掉提示重复代码](#设置去掉提示重复代码)
* [去掉大小写敏感提示](#去掉大小写敏感提示)
* [创建文件时的注释](#创建文件时的注释)
* [方法注释设置](#方法注释设置)
  * [示例](#示例)
* [设置类文件创建模板](#设置类文件创建模板)
* [鼠标悬停查看方法注释](#鼠标悬停查看方法注释)
* [自动优化导包](#自动优化导包)
* [热部署策略](#热部署策略)
* [自动编译](#自动编译)
* [去掉MybatisXML局部背景颜色](#去掉mybatisxml局部背景颜色)
* [项目目录设置](#项目目录设置)
* [错误解决](#错误解决)
  * [idea无限indexing解决方法](#idea无限indexing解决方法)
  * [OutOfMemoryError](#outofmemoryerror)
* [IDEA插件](#idea插件)
  * [Free Mybatis plugin](#free-mybatis-plugin)
  * [mybatis-plus](#mybatis-plus)
  * [MyBatisCodeHelper-Pro](#mybatiscodehelper-pro)
  * [.ignore](#ignore)
  * [Maven Helper](#maven-helper)
  * [GsonFormat](#gsonformat)
  * [FindBugs-IDEA](#findbugs-idea)
  * [Lombok plugin](#lombok-plugin)
  * [p3c](#p3c)
  * [VisualVM Launcher](#visualvm-launcher)
  * [GenerateAllSetter](#generateallsetter)
  * [Rainbow Brackets](#rainbow-brackets)
  * [Translation](#translation)
  * [Markdown Navigator](#markdown-navigator)



## 设置每次启动进入欢迎界面

![IDEA_startup](/images/IDEA_startup.png)

## 设置格式化代码时自动换行

![](/images/IDEA设置格式化代码时自动换行.PNG)

## 设置去掉提示重复代码

![](/images/IDEA设置去掉提示重复代码.png)

## 去掉大小写敏感提示

![](/images/IDEA去掉大小写区分提示.png)

## 创建文件时的注释

```java
/**
 * 
 * 
 * @program ${PACKAGE_NAME}
 * @description ${NAME} 
 * @author claer bajins.com
 * @create ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 *
 */
```

![](/images/IDEA设置创建文件时的注释.png)

## 方法注释设置

> Template text：
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

> `@param`参数获取代码Groovy脚本：
```groovy
// 使用tab作为参数后缀间隔符
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i]+'\\b'+ ((i < params.size() - 1) ? '\\n    ' : '')}; return result", methodParameters())
// 使用一个空格作为参数后缀间隔符，格式化时可以自动把所有参数对齐（推荐）
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i]+' '+ ((i < params.size() - 1) ? '\\n    ' : '')}; return result", methodParameters())
```

> `@return`参数获取代码Groovy脚本：
```groovy
// 如果有返回参数使用一个空格作为参数后缀间隔符
groovyScript("def result=\"${_1}\"; if(result == 'void'){return '';}else{return result+' ';}", methodReturnType())
```

> 使用时，直接在方法上输入/加上你的Abbreviation名字，再按Tab键即可获取方法上的参数

![](/images/IDEA方法注释设置.png)

### 示例

> 使用时，直接在方法上输入/加上你的Abbreviation名字，再按Tab键即可获取方法上的参数

![](/images/IDEA方法注释示例.png)

## 设置类文件创建模板

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


## 鼠标悬停查看方法注释

![](/images/IDEA鼠标悬停查看方法注释.png)


## 自动优化导包

> `Add unambiguous imports on the fly` 自动帮我们优化导入的包，比如自动去掉一些没有用到的包。 

> `Optimize imports on the fly` 自动帮我们导入需要用到的包。但是对于同名的包，需要手动`Alt + Enter`进行导入。

![](/images/IDEA自动优化导包.png)

## 热部署策略

> 顶部菜单`Run`->`Edit Configurations`->`SpringBoot`->`目标项目`->勾选`Update classes and resources`。

![](/images/IDEA的热部署策略.png)

## 自动编译

> 同时按住`Ctrl + Shift + Alt + /`然后进入`Registry`，勾选自动编译并调整延时参数。

![](/images/IDEA自动编译-动态.png)

> 打开顶部工具栏`File`->`Settings`->`Default Settings`->`Build`->`Compiler` 然后勾选`Build project automatically`

![](/images/IDEA自动编译-静态.png)

## 去掉MybatisXML局部背景颜色

> 1.快捷键`ctrl + alt+ s`打开Settings。找到`Editor -> Inspections`的配置页面，去掉SQL中`No data sources configured`（没有配置数据源） 选项 和 `SQL dialect detection`（SQL方言检测） 选项。

![](/images/IDEA去掉SQL选项.png)

> 2.去掉背景。找到`Editor -> Color -> General`的配置页面，选择`Code -> Injected language fragment`，去掉最右边的`Background`选项。

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

#### 在`Vm options`中输入
```
-Xms2048m -Xmx2048m -XX:MaxPermSize=4096m -Drebel.spring_plugin=true -Drebel.spring_mvc_plugin=true -Drebel.hibernate_plugin=true
```

![](/images/IDEA设置VmOptions.png)











*********************************************************************************

## IDEA插件

### Free Mybatis plugin
[https://github.com/wuzhizhan/free-idea-mybatis](https://github.com/wuzhizhan/free-idea-mybatis)

### mybatis-plus
[https://github.com/mustfun/mybatis-plus](https://github.com/mustfun/mybatis-plus)

### MyBatisCodeHelper-Pro
[](https://gejun123456.github.io/MyBatisCodeHelper-Pro/#/)
[MybatisCodeHelperPro试用key获取](http://brucege.com/pay/getfreetrial?)

### .ignore
[https://plugins.jetbrains.com/plugin/7495--ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

> 生成各种ignore文件，一键创建git ignore文件的模板，免得自己去写

![](/images/ignore.gif)

### Maven Helper
[https://plugins.jetbrains.com/plugin/7179-maven-helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

> 一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖

![](/images/MavenHelper.png)

### GsonFormat
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F7654-gsonformat](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F7654-gsonformat)

> google出的一键根据json文本生成java类，非常方便

![](/images/GsonFormat.gif)

### FindBugs-IDEA
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F3847-findbugs-idea](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F3847-findbugs-idea)

> 检测代码中可能的bug及不规范的位置，检测的模式相比p3c更多，写完代码后检测下 避免低级bug，强烈建议用一下，一不小心就发现很多老代码的bug

![](/images/FindBugs-IDEA.gif)

### Lombok plugin
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F6317-lombok-plugin](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F6317-lombok-plugin)

> 支持lombok的各种注解，从此不用写getter setter这些 可以把注解还原为原本的java代码,除此之外还有其他更多注解以减少代码

![](/images/lombok.gif)

### p3c
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F10046-alibaba-java-coding-guidelines](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F10046-alibaba-java-coding-guidelines)

> 阿里巴巴出品的java代码规范插件,可以扫描整个项目 找到不规范的地方 并且大部分可以自动修复 

![]()

### VisualVM Launcher
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F7115-visualvm-launcher](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F7115-visualvm-launcher)

> 运行java程序的时候启动visualvm，方便查看jvm的情况 比如堆内存大小的分配，某个对象占用了多大的内存，jvm调优必备工具

![](/images/VisualVM-Launcher.gif)

### GenerateAllSetter
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F9360-generateallsetter](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F9360-generateallsetter)

> 一键调用一个对象的所有set方法并且赋予默认值 在对象字段多的时候非常方便

![](/images/GenerateAllSetter.gif)

### Rainbow Brackets
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F10080-rainbow-brackets](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F10080-rainbow-brackets)

> 彩虹颜色的括号，看着很舒服 敲代码效率变高

![](/images/RainbowBrackets.png)

### Translation
[https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F8579-translation](https://link.jianshu.com/?t=https%3A%2F%2Fplugins.jetbrains.com%2Fplugin%2F8579-translation)

> 最好用的翻译插件，功能很强大，界面很漂亮

![](/images/Translation.gif)

### Markdown Navigator
[https://github.com/vsch/idea-multimarkdown](https://github.com/vsch/idea-multimarkdown)

> 带有GFM 的Markdown插件和匹配的预览样式。

![](https://github.com/vsch/idea-multimarkdown/blob/master/assets/images/capabilities2.png)




