# idea基本设置

## 设置格式化代码时自动换行
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227174027.png)
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180308180140.png)

## 设置去掉提示重复代码
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227175329.png)

## [idea无限indexing解决方法](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)
![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

## idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space
### 在Vm options中输入以下代码：
```
-Xms2048m -Xmx2048m -XX:MaxPermSize=4096m -Drebel.spring_plugin=true -Drebel.spring_mvc_plugin=true -Drebel.hibernate_plugin=true
```
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180323100217.png)
