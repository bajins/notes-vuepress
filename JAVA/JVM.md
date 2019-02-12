# 目录
* [JVM参数的优化](#JVM参数的优化)
  * [jstat命令](#jstat命令)
* [生成Dump文件](#生成Dump文件)
* [监控工具](#监控工具)
--------------------------------------------------


# JVM参数的优化
#### 因为Tomcat运行在JAVA虚拟机之上,适当调整Tomcat的运行JVM参数可以提升整体性能。
### 常用参数

| 参数 | 说明  |
| ------------ | ------------ |
|file.encoding |  默认文件编码 |
|-Xmx1024m | 初始堆大小为1024m |
|-Xms1024m | 最大堆大小为1024m |
|-Xmn366m | 设置年轻代大小为366m  |
|-XX:NewSize=n | 设置年轻代大小  |
|-XX:MaxNewSize=n | 设置最大的年轻代大小 |
|-XX:PermSize=n | JDK1.7设置永久代大小  |
|-XX:MaxPermSize=n| JDK1.7设置最大永久代大小 |
|-XX:MetaspaceSize=n | JDK1.8设置元空间大小  |
|-XX:MaxMetaspaceSize=n| JDK1.8设置最大元空间大小,最好与-XX:MetaspaceSize一致 |
|-XX:NewRatio=4|设置年轻代（包括Eden和两个Survivor区）与终身代的比值（除去永久代）。设置为4，则年轻代与终身代所占比值为1：4，年轻代占整个堆栈的1/5|
|-XX:SurvivorRatio=n |年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5|
|-XX:MaxTenuringThreshold|设置垃圾最大年龄，默认为：15。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。 |
|-XX:+CMSScavengeBeforeRemark|CMS并发标记阶段与用户线程并发进行，此阶段会产生已经被标记了的对象又发生变化的情况，若打开此开关，可在一定程度上降低CMS重新标记阶段对上述“又发生变化”对象的扫描时间，当然，“清除尝试”也会消耗一些时间。注：开启此开关并不会保证在标记阶段前一定会进行清除操作|
|-XX:+UseSerialGC |设置串行收集器|
|-XX:+UseParallelGC |设置并行收集器|
|-XX:ParallelGCThreads=n|设置并行收集线程数|
|-XX:+UseParalledlOldGC |设置并行年老代收集器|
|-XX:+UseConcMarkSweepGC |设置并发收集器|
|-XX:MaxGCPauseMillis=n |设置并行收集最大暂停时间|
|-XX:GCTimeRatio=n |设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)|
|-XX:+UseConcMarkSweepGC | 设置年老代为并发收集。测试中配置这个以后，-XX:NewRatio=4的配置失效了，原因不明。所以，此时年轻代大小最好用-Xmn设置。|

### 参考
#### 根据JDK8-4G内存-4核生成的jvm参数，打印了gc各个阶段的日志
##### 看看ygc 的回收时间及 时间，已及old区大小，最后看FGC
```shell
export JAVA_OPTS="
-server
-Xmx2688M
-Xms2688M
-Xmn960m
-XX:MaxMetaspaceSize=512M
-XX:MetaspaceSize=512M
-XX:+UseConcMarkSweepGC
-XX:+UseCMSInitiatingOccupancyOnly
-XX:CMSInitiatingOccupancyFraction=70
-XX:+ExplicitGCInvokesConcurrentAndUnloadsClasses
-XX:+CMSClassUnloadingEnabled
-XX:+ParallelRefProcEnabled
-XX:+CMSScavengeBeforeRemark
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/home/jvm_logs/local
-XX:ErrorFile=/home/jvm_logs/hs_err_pid%p.log
-Xloggc:/home/jvm_logs/gc.log
-Djava.rmi.server.hostname=192.168.1.220
-Dcom.sun.management.jmxremote.port=18999
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-verbose:class
-XX:+PrintClassHistogramBeforeFullGC
-XX:+PrintClassHistogramAfterFullGC
-XX:+PrintCommandLineFlags
-XX:+PrintGCApplicationConcurrentTime
-XX:+PrintGCApplicationStoppedTime
-XX:+PrintTenuringDistribution
-XX:+PrintHeapAtGC
"
```

### windows
#### 添加JAVA_HOME和JRE_HOME
```sehll
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_191
set JRE_HOME=C:\Program Files\Java\jre1.8.0_201
```
#### 修改bin/catalina.bat文件,在setlocal下面一行添加，注意代码格式

![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Windows.png)

### linux
#### 修改bin/catalina.sh文件,在最前面添加，注意代码格式
![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Linux.png)

## jstat命令
```diff
jstat [ generalOption | outputOptions vmid [interval[s|ms] [count]] ]
参数：
generalOption: 一般使用-gcutil查看GC情况
vmid: 虚拟机进程号，即当前运行的java进程号
interval: 间隔时间，单位为秒或毫秒
count: 打印次数，如果缺省则打印无数次
```



# 生成Dump文件
## JVM在遇到OOM(OutOfMemoryError)时生成Dump文件
### 命令：
```shell
jmap -dump:live,format=b,file=d:\dump\heap.hprof <pid>
```
```diff
file：保存路径及文件名
pid：进程编号（windows通过任务管理器查看，linux通过ps aux查看）
dump文件可以通过MemoryAnalyzer(MAT)分析查看,可以查看dump时对象数量，内存占用，线程情况等。
```

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
