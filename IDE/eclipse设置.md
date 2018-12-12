## 显示内存
#### 在eclipse中打开heap状态`windows->perference->general->右边show heap status打上勾->OK `，这时会在eclipse最下面显示一个内存显示了

## Eclipse中jsp、js文件编辑时，卡死现象解决
### 1、取消验证
#### windows–>perferences–>validation
#### 把除了manual 下面的全部点掉，build下只留 classpath dependency Validator
 
### 2、关闭拼写检查
#### windows–>perferences–>general–> editors->Text Editors->spelling

### 7、调整Eclipse运行内存。
#### 在eclipse的安装目录下用EditPlus编辑eclipse.ini文件，将其中的参数改成： 
##### 第一个版本：
```java
-vmargs
-Dosgi.requiredJavaVersion=1.6
-Xms512m
-Xmx512m
-XX:PermSize=256M 
-XX:MaxPermSize=256M
-XX:-UseGCOverheadLimit
```
##### 第二个版本：
```java
-Dosgi.requiredJavaVersion=1.6
-Xms1600m
-Xmx1600m
-XX:NewSize=800m
-XX:MaxNewSize=800m
-XX:PermSize=256m
-XX:MaxPermSize=256m
-XX:+DisableExplicitGC
-XX:CompileThreshold=100
-Xverify:none
-XX:+UseParNewGC
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=80
```

## Eclipse自动导包设置
#### 在eclispe中，打开 Window > Preferences > Java > Editor > Save Actions 然后选中 Organize impots
![](/images/Eclipse保存自动优化设置.png)

## Eclipse注释模板设置
#### 编辑注释模板的方法：`Window->Preference->Java->Code Style->Code Template` 然后展开Comments节点就是所有需设置注释的元素
#### 类注释/*然后回车自动出来，方法注释/然后回车自动出来
https://www.cnblogs.com/lr393993507/p/5867623.html
### 1.文件(Files)注释标签：
```java
/**
 * @Title:  ${file_name}
 * @Package ${package_name}
 * @Description:    ${todo}(用一句话描述该文件做什么)
 * @author: woytu
 * @date:   ${date} ${time}
 * @version V1.0
 * @Copyright: ${year} woytu.com Inc. All rights reserved.
 */
 ```
### 2.类型(Types)注释标签（类的注释）：
```java
/**
 * @ClassName:  ${type_name}
 * @Description:${todo}(这里用一句话描述这个类的作用)
 * @author: woytu
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
 */
 ```
### 4.构造函数标签：
```java
/**
 * @Title:  ${enclosing_type}
 * @Description:    ${todo}(这里用一句话描述这个方法的作用)
 * @param:  ${tags}
 * @throws
 */
```
### 5.方法(Methods)标签：
```java
/**
 * @Title: ${enclosing_method}
 * @Description: ${todo}(这里用一句话描述这个方法的作用)
 * @param: ${tags}
 * @return: ${return_type}
 * @throws
 */
 ```
### 6.覆盖方法(Overriding Methods)标签:
```java
/**
 * <p>Title: ${enclosing_method}</p>
 * <p>Description: </p>
 * ${tags}
 * ${see_to_overridden}
 */
```
### 7.代表方法(Delegate Methods)标签：
```java
/**
 * ${tags}
 * ${see_to_target}
 */
```
### 8.getter方法标签：
```java
/**
 * @Title:  ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 */
```
### 9.setter方法标签：
```java
/**
 * @Title:  ${enclosing_method} <BR>
 * @Description: please write your description <BR>
 * @return: ${field_type} <BR>
 */
```
### 
```java

```
### 
```java

```
## Eclipse自动生成注释
#### `window－>preference－>java－>code  styple－>code  template `当你选择到这部的时候就会看见右侧有一个框显示出code这个选项，你点开这个选项，点一下他下面的`New Java files`然后你点Edit按钮，把他的内容换成你的就可以了
![]()

