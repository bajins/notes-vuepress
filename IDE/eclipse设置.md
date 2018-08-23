## 在eclipse中打开heap状态（windows->perference->general->右边show heap status打上勾->OK ），这时会在eclipse最下面显示一个内存显示了
# Eclipse中jsp、js文件编辑时，卡死现象解决
## 1、取消验证
### windows–>perferences–>validation
### 把除了manual 下面的全部点掉，build下只留 classpath dependency Validator
 
## 2、关闭拼写检查
### windows–>perferences–>general–> editors->Text Editors->spelling

## 7、调整Eclipse运行内存。
### 在eclipse的安装目录下用EditPlus编辑eclipse.ini文件，将其中的参数改成： 
#### 第一个版本：
```java
-vmargs
-Dosgi.requiredJavaVersion=1.6
-Xms512m
-Xmx512m
-XX:PermSize=256M 
-XX:MaxPermSize=256M
-XX:-UseGCOverheadLimit
```
#### 第二个版本：
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
