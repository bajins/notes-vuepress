# IDEA基本设置

****
## 目录
* [设置IDEA每次启动进入欢迎界面](#设置IDEA每次启动进入欢迎界面)
* [设置格式化代码时自动换行](#设置格式化代码时自动换行)
* [设置去掉提示重复代码](#设置去掉提示重复代码)
* [去掉大小写敏感提示](#去掉大小写敏感提示)
* [创建文件时的注释](#创建文件时的注释)
* [方法注释设置](#方法注释设置)
* [设置类文件创建模板](#设置类文件创建模板)
* [鼠标悬停查看方法注释](#鼠标悬停查看方法注释)
****
## 设置IDEA每次启动进入欢迎界面
> [回到顶部](#readme)

![IDEA_startup](/images/IDEA_startup.png)

## 设置格式化代码时自动换行
> [回到顶部](#readme)

![](https://github.com/claer-ding/UseNotes/blob/master/images/Line_breaks%3Dtrue.PNG)
~~https://github.com/claer-ding/UseNotes/blob/master/images/20180308180140.png~~

## 设置去掉提示重复代码
> [回到顶部](#readme)

![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227175329.png)

## 去掉大小写敏感提示
> [回到顶部](#readme)

![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E5%8E%BB%E6%8E%89%E5%A4%A7%E5%B0%8F%E5%86%99%E5%8C%BA%E5%88%86%E6%8F%90%E7%A4%BA.png)

## 创建文件时的注释
> [回到顶部](#readme)

```java
/**
 * @program ${PACKAGE_NAME}
 * @description ${NAME}
 * @author claer claer@ichangg.com
 * @create ${YEAR}-${MONTH}-${DAY} ${HOUR}:${MINUTE}
 *
 */
```
![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E8%AE%BE%E7%BD%AE%E5%88%9B%E5%BB%BA%E6%96%87%E4%BB%B6%E6%97%B6%E7%9A%84%E6%B3%A8%E9%87%8A.png)

## 方法注释设置
> [回到顶部](#readme)

#### Template text：
```java
**
$params$
 * @return $ruturns$
 * @Description TODO $todo$ 
 * @author $user$
 * @date $date$ $time$
 */
```
#### @param参数获取代码：
```java
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); for(i = 0; i < params.size(); i++) {result+=' * @param ' + params[i]+'\\b'+ ((i < params.size() - 1) ? '\\n	' : '')}; return result", methodParameters())
```
#### 使用时，直接在方法上输入/加上你的Abbreviation名字，再按Tab键即可获取方法上的参数
![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E6%96%B9%E6%B3%95%E6%B3%A8%E9%87%8A%E8%AE%BE%E7%BD%AE.png)

### 示例：
#### 使用时，直接在方法上输入/加上你的Abbreviation名字，再按Tab键即可获取方法上的参数
![](https://github.com/claer-ding/UseNotes/blob/master/images/idea%E6%96%B9%E6%B3%95%E6%B3%A8%E9%87%8A%E7%A4%BA%E4%BE%8B.png)

## 设置类文件创建模板
> [回到顶部](#readme)

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end


import org.slf4j.Logger;

#parse("File Header.java")

public class ${NAME} {

     private static final Logger logger = org.slf4j.LoggerFactory.getLogger(${NAME}.class);
     
     
}
```
![](https://github.com/claer-ding/UseNotes/blob/master/images/%E8%AE%BE%E7%BD%AE%E7%B1%BB%E6%96%87%E4%BB%B6%E5%88%9B%E5%BB%BA%E6%A8%A1%E6%9D%BF.png)


## 鼠标悬停查看方法注释
> [回到顶部](#readme)

![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E9%BC%A0%E6%A0%87%E6%82%AC%E5%81%9C%E6%9F%A5%E7%9C%8B%E6%96%B9%E6%B3%95%E6%B3%A8%E9%87%8A.png)


*******************
> [回到顶部](#readme)
