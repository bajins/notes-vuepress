# idea基本设置

## 设置格式化代码时自动换行
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227174027.png)
~~https://github.com/claer-ding/UseNotes/blob/master/images/20180308180140.png~~

## 设置去掉提示重复代码
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227175329.png)

## idea 去掉大小写敏感提示
![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E5%8E%BB%E6%8E%89%E5%A4%A7%E5%B0%8F%E5%86%99%E5%8C%BA%E5%88%86%E6%8F%90%E7%A4%BA.png)

## idea 方法注释设置
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
