# idea错误解决

## [idea无限indexing解决方法](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)
![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

## idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space
### 在Vm options中输入以下代码：
```
-Xms2048m -Xmx2048m -XX:MaxPermSize=4096m -Drebel.spring_plugin=true -Drebel.spring_mvc_plugin=true -Drebel.hibernate_plugin=true
```
![](/images/20180323100217.png)
