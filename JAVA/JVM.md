
# JVM参数的优化
#### 因为Tomcat运行在JAVA虚拟机之上,适当调整Tomcat的运行JVM参数可以提升整体性能。
### 常用参数

| 参数 | 说明  |
| ------------ | ------------ |
|  file.encoding |  默认文件编码 |
|  -Xmx1024m | 设置JVM最大可用内存为1024MB  |
|  -Xms1024m | 设置JVM最小内存为1024m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。  |
|  -XX:NewSize | 设置年轻代大小  |
|  -XX:MaxNewSize | 设置最大的年轻代大小 |
|  -XX:PermSize | 设置永久代大小  |
|  -XX:MaxPermSize| 设置最大永久代大小 |
|-XX:NewRatio=4|设置年轻代（包括Eden和两个Survivor区）与终身代的比值（除去永久代）。设置为4，则年轻代与终身代所占比值为1：4，年轻代占整个堆栈的1/5|
|-XX:MaxTenuringThreshold|设置垃圾最大年龄，默认为：15。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。 |
|-XX:+DisableExplicitGC|这个将会忽略手动调用GC的代码使得System.gc()的调用就会变成一个空调用，完全不会触发任何GC|
| -XX:MetaspaceSize=64m | 元数据空间，专门用来存元数据的，它是jdk8里特有的数据结构用来替代perm |
| -XX:MaxMetaspaceSize=128m | 最大元数据空间，专门用来存元数据的，它是jdk8里特有的数据结构用来替代perm |

### 参考
```shell
-Xms :初始堆大小
-Xmx :最大堆大小
-XX:NewSize=n :设置年轻代大小
-XX:NewRatio=n: 设置年轻代和年老代的比值。如:为3，表示年轻代与年老代比值为1：3，年轻代占整个年轻代年老代和的1/4
-XX:SurvivorRatio=n :年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5
-XX:MaxPermSize=n :设置持久代大小
收集器设置
-XX:+UseSerialGC :设置串行收集器
-XX:+UseParallelGC :设置并行收集器
-XX:+UseParalledlOldGC :设置并行年老代收集器
-XX:+UseConcMarkSweepGC :设置并发收集器
垃圾回收统计信息
-XX:+PrintHeapAtGC GC的heap详情
-XX:+PrintGCDetails  GC详情
-XX:+PrintGCTimeStamps  打印GC时间信息
-XX:+PrintTenuringDistribution    打印年龄信息等
-XX:+HandlePromotionFailure   老年代分配担保（true  or false）
并行收集器设置
-XX:ParallelGCThreads=n :设置并行收集器收集时使用的CPU数。并行收集线程数。
-XX:MaxGCPauseMillis=n :设置并行收集最大暂停时间
-XX:GCTimeRatio=n :设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)
并发收集器设置
-XX:+CMSIncrementalMode :设置为增量模式。适用于单CPU情况。
-XX:ParallelGCThreads=n :设置并发收集器年轻代收集方式为并行收集时，使用的CPU数。并行收集线程数
```

### windows
#### 修改bin/catalina.bat文件,在setlocal下面一行添加
##### jdk8之前
```shell
set JAVA_OPTS=
    -Dfile.encoding=UTF-8
    -server-Xms1024m
    -Xmx2048m
    -XX:NewSize=512m
    -XX:MaxNewSize=1024m
    -XX:MetaspaceSize=512m
    -XX:MaxMetaspaceSize=1024m
    -XX:MaxTenuringThreshold=10
    -XX:NewRatio=2
    -XX:+DisableExplicitGC
```
##### jdk8
```shell
set JAVA_OPTS="
    -Dfile.encoding=UTF-8
    -server-Xms1024m
    -Xmx2048m
    -XX:NewSize=512m
    -XX:MaxNewSize=1024m
    -XX:PermSize=256m
    -XX:MaxPermSize=256m
    -XX:MaxTenuringThreshold=10
    -XX:NewRatio=2
    -XX:+DisableExplicitGC"
```
![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Windows.png)

### linux
#### 修改bin/catalina.sh文件,在os400=false之前添加
##### jdk8之前
```shell
JAVA_OPTS=
    -Dfile.encoding=UTF-8-server
    -Xms1024m -Xmx2048m
    -XX:NewSize=512m
    -XX:MaxNewSize=1024m
    -XX:PermSize=256m
    -XX:MaxPermSize=256m
    -XX:MaxTenuringThreshold=10
    -XX:NewRatio=2
    -XX:+DisableExplicitGC
```
##### jdk8
```shell
JAVA_OPTS="
    -Dfile.encoding=UTF-8-server
    -Xms1024m -Xmx2048m
    -XX:NewSize=512m
    -XX:MaxNewSize=1024m
    -XX:MetaspaceSize=512m
    -XX:MaxMetaspaceSize=1024m
    -XX:MaxTenuringThreshold=10
    -XX:NewRatio=2
    -XX:+DisableExplicitGC"
```
![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Linux.png)


# 监控工具

## jvisualvm

### 在jvm启动参数中加入或在Tomcat的/bin/catalina.sh文件中加入
```shell
-Djava.rmi.server.hostname=主机的IP
-Dcom.sun.management.jmxremote.port=18999
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```
### 启动
#### 到JDK安装目录/bin目录下，双击jvisualvm.exe文件启动
##### C:\Program Files\Java\jdk1.8.0_191\bin目录下找到jvisualvm.exe

### 需要注意的是:当OS所在分区是FAT格式时，VisualVM无法获取相关信息！

http://blog.51cto.com/zero01/2141942

https://blog.csdn.net/u010004317/article/details/82948040

### 解决Visual GC提示”不受此JVM支持“，要监控的主机没有配置jstatd
#### 先查看jstatd服务是否可用
```shell
jps -l 127.0.0.1
```
#### 一、在原有配置文件java.policy中添加
```shell
vi $JAVA_HOME/jre/lib/security/java.policy
```
##### 在文件末位的 }; 前添加
```java
permission java.security.AllPermission;
```
##### 启动jstatd
```shell
cd $JAVA_HOME/bin
./jstatd -J-Djava.security.policy=all.policy -J-Djava.rmi.server.hostname=主机的IP -p 1099 &
```
##### 查看运行端口情况
```shell
netstat -anp | grep jstatd
netstat -ntlp
lsof -i:1099
```

#### 二、（推荐）新建一个配置文件 jstatd.all.policy
```sehll
cd $JAVA_HOME/bin/
vi jstatd.all.policy
```
##### 添加以下代码
```java
grant codebase "file:${java.home}/../lib/tools.jar" {
   permission java.security.AllPermission;
};
```
##### 给文件加上执行权限
```shell
chmod +x jstatd.all.policy
```
##### 在Java的bin目录下用以下命令启动
```shell
./jstatd -J-Djava.security.policy=jstatd.all.policy -J-Djava.rmi.server.hostname=主机的IP -p 1099 -J-Djava.rmi.server.logCalls=true &
```
```diff
-J-Djava.security.policy=jstatd.all.policy 文件的绝对路径；
-J-Djava.rmi.server.logCalls=true 打开日志,如果客户端有连接过来的请求,可以监控到,便于排错；
-J-Djava.rmi.server.hostname=192.168.134.128 指明本机 hostname 对应的本机地址,确保该地址可以给客户机访问。因为有的服务器 hostname 对应的 ip 不一定是外网能连上的，最好在这里直接明确指定；
-p 3333 指定服务的端口号，默认是1099。也是可选参数。
```

https://blog.csdn.net/liupeifeng3514/article/details/78998161


## MyPerf4J
#### 无侵入式的jvm监控工具
https://github.com/ThinkpadNC5/MyPerf4J
