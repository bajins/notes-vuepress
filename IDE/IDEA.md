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
