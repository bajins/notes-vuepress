# Eclipse

## 目录
* [显示内存](#显示内存)
* [Eclipse中jsp、js文件编辑时，卡死现象解决](#eclipse中jspjs文件编辑时卡死现象解决)
  * [1、取消验证](#1取消验证)
  * [2、关闭拼写检查](#2关闭拼写检查)
* [调整Eclipse运行内存](#调整eclipse运行内存)
* [Eclipse自动导包设置](#eclipse自动导包设置)
* [Eclipse注释模板设置](#eclipse注释模板设置)
  * [1.创建新文件(New Java files)注释标签：](#1创建新文件new-java-files注释标签)
  * [2.字段(Fields)注释标签：](#2字段fields注释标签)
  * [3.构造函数(Constructors)标签：](#3构造函数constructors标签)
  * [4.方法(Methods)标签：](#4方法methods标签)
  * [5.覆盖方法(Overriding Methods)标签:](#5覆盖方法overriding-methods标签)
  * [6.代表方法(Delegate Methods)标签：](#6代表方法delegate-methods标签)
  * [7.getter方法标签：](#7getter方法标签)
  * [8.setter方法标签：](#8setter方法标签)
* [Eclipse设置不格式化注释](#eclipse设置不格式化注释)
* [设置编码格式](#设置编码格式)
  * [1、设置工作空间编码格式](#1设置工作空间编码格式)
  * [2、设置文档编码格式](#2设置文档编码格式)
  * [3、设置Web编码格式](#3设置web编码格式)
  * [4、设置项目的文档编码格式](#4设置项目的文档编码格式)



## 显示内存
> 在eclipse中打开heap状态`windows->perference->general->右边show heap status打上勾->OK `，这时会在Eclipse最下面显示一个内存显示了

## Eclipse中jsp、js文件编辑时，卡死现象解决
### 1、取消验证
> `windows`–>`perferences`–>`validation`
>
> 把除了`manual`下面的全部点掉，`build`下只留`classpath dependency Validator`
 
### 2、关闭拼写检查
> `windows`–>`perferences`–>`general`–>`editors`->`Text Editors`->`spelling`

## 调整Eclipse运行内存
> 在eclipse的安装目录下编辑`eclipse.ini`文件
 
[JVM参数设置](/JAVA/Tomcat优化.md#四)
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
![](/images/Eclipse中JDK的JVM参数设置.png)

#### 设置Tomcat参数
![](/images/Eclipse中Tomcat的JVM参数设置.png)



## Eclipse自动导包设置
> 在Eclispe中，打开`Window`->`Preferences`->`Java`->`Editor`->`Save Actions`然后选中`Organize impots`

![](/images/Eclipse保存自动优化设置.png)



## Eclipse注释模板设置
> 编辑注释模板的方法：`Window`->`Preference`->`Java`->`Code Style`->`Code Template`然后展开`Comments`节点就是所有需设置注释的元素

#### 注释的使用：输入`/**`然后回车自动出来
![](/images/Eclipse自动添加注释.png)

### 1.创建新文件(New Java files)注释标签：
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

### 2.字段(Fields)注释标签：
 ```java
 /**
 * @Fields ${field} : 
 * @author: woytu.com
 * @date: ${date} ${time}
 */
 ```
### 3.构造函数(Constructors)标签：
```java
/**
 * @Title: ${enclosing_type}
 * ${tags}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 4.方法(Methods)标签：
```java
/**
 * 
 * ${tags} ${return_type}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
 ```
### 5.覆盖方法(Overriding Methods)标签:
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
### 6.代表方法(Delegate Methods)标签：
```java
/**
 * ${tags}
 * ${see_to_target}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 7.getter方法标签：
```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 8.setter方法标签：
```java
/**
 * @Title: ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```

# Eclipse代码格式化设置

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


## Eclipse设置不格式化注释
> Eclipse默认自带的风格模板不能直接操作，需要先创建一个新的风格模板才能操作

![](/images/Eclipse不格式化注释.png)

## 设置编码格式
### 1、设置工作空间编码格式
> 在`Window`->`Preferences`->`General`->`Workspace下`，面板`Text file encoding`选择`UTF-8`

>![](/images/Eclipse设置工作空间编码.png)

### 2、设置文档编码格式
> 在`Window`->`Preferences`->`General`->`Content Type`->`Text`的最下面设置为编码格式为`UTF-8`

![](/images/Eclipse设置文档编码.png)

### 3、设置Web编码格式
> 在`Window`->`Preferences`->`Web`->`CSS Files、HTML Files、JSP Files` 面板选择`ISO 10646/Unicode(UTF-8)`

![](/images/Eclipse设置Web文件编码.png)

### 4、设置项目的文档编码格式
> 选择`项目`->`右键`->`Properties`->`Resource`设置编码为`UTF-8`


