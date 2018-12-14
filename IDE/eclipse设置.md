# 目录
* [显示内存](#显示内存)
* [Eclipse中jsp、js文件编辑时，卡死现象解决](#一)
* [调整Eclipse运行内存](#调整Eclipse运行内存)
* [Eclipse自动导包设置](#Eclipse自动导包设置)
* [Eclipse注释模板设置](#Eclipse注释模板设置)
* [Eclipse设置不格式化注释](#Eclipse设置不格式化注释)
***************************************************************************************

# 显示内存
#### 在eclipse中打开heap状态`windows->perference->general->右边show heap status打上勾->OK `，这时会在eclipse最下面显示一个内存显示了

###### 一
# Eclipse中jsp、js文件编辑时，卡死现象解决
### 1、取消验证
#### windows–>perferences–>validation
#### 把除了manual 下面的全部点掉，build下只留 classpath dependency Validator
 
### 2、关闭拼写检查
#### windows–>perferences–>general–> editors->Text Editors->spelling

# 调整Eclipse运行内存
#### 在eclipse的安装目录下用EditPlus编辑eclipse.ini文件，将其中的参数改成： 
[JVM参数设置](/JAVA/Tomcat优化.md#四)
```shell
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



# Eclipse自动导包设置
#### 在eclispe中，打开 Window > Preferences > Java > Editor > Save Actions 然后选中 Organize impots
![](/images/Eclipse保存自动优化设置.png)



# Eclipse注释模板设置
#### 编辑注释模板的方法：`Window->Preference->Java->Code Style->Code Template` 然后展开Comments节点就是所有需设置注释的元素
#### 注释的使用：输入`/**`然后回车自动出来
![](/images/Eclipse自动添加注释.png)

### 1.文件(Files)注释标签：
```java
/**
 * @Title:  ${file_name}
 * @Package ${package_name}
 * @Description: ${todo}(用一句话描述该文件做什么)
 * @author: woytu.com
 * @date:   ${date} ${time}
 * @version V1.0
 * @Copyright: ${year} woytu.com Inc. All rights reserved.
 */
 ```
### 2.类型(Types)注释标签（类的注释）：
```java
/**
 * @ClassName:  ${type_name}
 * @Description: ${todo}(这里用一句话描述这个类的作用)
 * @author: woytu.com
 * @date:   ${date} ${time}
 * 
 * ${tags}
 * @Copyright: ${year} woytu.com Inc. All rights reserved.
 */
 ```
 ### 3.字段(Fields)注释标签：
 ```java
 /**
 * @Fields ${field} : ${todo}(用一句话描述这个变量表示什么)
 * @author: woytu.com
 * @date: ${date} ${time}
 */
 ```
### 4.构造函数(Constructors)标签：
```java
/**
 * @Title:  ${enclosing_type}
 * @Description:    ${todo}(这里用一句话描述这个方法的作用)
 * @param:  ${tags}
 * @throws
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 5.方法(Methods)标签：
```java
/**
 * @Title: ${enclosing_method}
 * @Description: ${todo}(这里用一句话描述这个方法的作用)
 * ${tags} ${return_type}
 * @throws
 * @author: woytu.com
 * @date: ${date} ${time}
 */
 ```
### 6.覆盖方法(Overriding Methods)标签:
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
### 7.代表方法(Delegate Methods)标签：
```java
/**
 * ${tags}
 * ${see_to_target}
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 8.getter方法标签：
```java
/**
 * @Title:  ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
### 9.setter方法标签：
```java
/**
 * @Title:  ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 * @author: woytu.com
 * @date: ${date} ${time}
 */
```
# Eclipse设置不格式化注释
#### eclipse默认自带的风格模板不能直接操作，需要先创建一个新的风格模板才能操作
![](/images/Eclipse不格式化注释.png)


