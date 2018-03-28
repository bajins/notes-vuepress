# idea基本设置

## 设置格式化代码时自动换行
![](https://github.com/claer-ding/UseNotes/blob/master/images/20180227174027.png)
~~<del>![](https://github.com/claer-ding/UseNotes/blob/master/images/20180308180140.png)</del>~~

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

## idea 去掉大小写敏感提示
![](https://github.com/claer-ding/UseNotes/blob/master/images/IDEA%E5%8E%BB%E6%8E%89%E5%A4%A7%E5%B0%8F%E5%86%99%E5%8C%BA%E5%88%86%E6%8F%90%E7%A4%BA.png)
