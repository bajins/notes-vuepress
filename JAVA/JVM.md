# JVM

# 目录
* [JVM参数的优化](#JVM参数的优化)
  * [jstat命令](#jstat命令)
* [生成Dump文件](#生成Dump文件)
* [监控工具](#监控工具)
  * [三方工具](#三方工具)
--------------------------------------------------


## JVM参数的优化
#### 因为Tomcat运行在JAVA虚拟机之上,适当调整Tomcat的运行JVM参数可以提升整体性能。
### 常用参数

|      参数    |      说明    |
| ------------ | ------------ |
|file.encoding |  默认文件编码 |
|-Xmx1024m | 初始堆大小为1024m |
|-Xms1024m | 最大堆大小为1024m |
|-Xmn366m | 设置年轻代大小为366m,Sun官方推荐配置为整个堆的3/8（35.7%）  |
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
```bash
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
```bash
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_191
set JRE_HOME=C:\Program Files\Java\jre1.8.0_201
```
#### 修改bin/catalina.bat文件,在setlocal下面一行添加，注意代码格式

![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Windows.png)

### linux
#### 修改bin/catalina.sh文件,在最前面添加，注意代码格式
![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Linux.png)

## jstat命令

> jstat [ generalOption | outputOptions vmid [interval[s|ms] [count]] ]
>
> 参数：
>> generalOption: 一般使用-gcutil查看GC情况
>> 
>> vmid: 虚拟机进程号，即当前运行的java进程号
>> 
>> interval: 间隔时间，单位为秒或毫秒
>> 
>> count: 打印次数，如果缺省则打印无数次

```bash
# 每2秒输出一次内存情况，连续输出100次
jstat -gcutil <pid> 2000 100
jstat -gcutil $(pgrep java) 2000 100

# 输出heap各个分区大小
jstat -gc <pid>
jstat -gc $(pgrep java)

# 获取到线程的dump日志
jstack -l $(pgrep java)  >> dump.log
```
### 观察jvm中当前所有线程的运行情况和线程当前状态
```bash
jstack -F 进程ID
jstack -F $(pgrep java)

# 将所有线程信息输入到指定文件中
jstack -F 进程ID > jvm.log
jstack -F $(pgrep java) > jvm.log
```
## other
```bash
# 查看本机所有java进程pid
jps -l

# 查看运行时jvm参数
jinfo -flag <jvm参数> <pid>

# 获取当前JVM默认参数
java -XX:+PrintFlagsFinal -version | grep MaxHeapSize

# 找出占用cpu高（或执行时间长）的线程pid 
top -H -p <pid>
top -H -p $(pgrep java)

# 打印等待回收的对象信息
jmap -finalizerinfo <pid>
jmap -finalizerinfo $(pgrep java)
```
[JVM调优命令-jmap](https://www.cnblogs.com/myna/p/7573843.html)



## 生成Dump文件
### JVM在遇到OOM(OutOfMemoryError)时生成Dump文件
### 命令：
```bash
jmap -dump:live,format=b,file=d:\dump\heap.hprof <pid>
```

> file：保存路径及文件名
>
> pid：进程编号（windows通过任务管理器查看，linux通过ps aux查看）
>
> dump文件可以通过MemoryAnalyzer(MAT)分析查看,可以查看dump时对象数量，内存占用，线程情况等。


## 监控工具

### jvisualvm

#### 在jvm启动参数中加入或在Tomcat的/bin/catalina.sh文件中加入
```bash
-Djava.rmi.server.hostname=主机的IP
-Dcom.sun.management.jmxremote.port=18999
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```
#### 启动
> 到JDK安装目录/bin目录下，双击jvisualvm.exe文件启动
>
> C:\Program Files\Java\jdk1.8.0_191\bin目录下找到jvisualvm.exe

#### 需要注意的是:当OS所在分区是FAT格式时，VisualVM无法获取相关信息！

http://blog.51cto.com/zero01/2141942

https://blog.csdn.net/u010004317/article/details/82948040

### 解决Visual GC提示”不受此JVM支持“，要监控的主机没有配置jstatd
#### 先查看jstatd服务是否可用
```bash
jps -l 127.0.0.1
```
#### 一、在原有配置文件`java.policy`中添加
```bash
vi $JAVA_HOME/jre/lib/security/java.policy
```
##### 在文件末位的 `};` 前添加
```java
permission java.security.AllPermission;
```
##### 启动jstatd
```bash
cd $JAVA_HOME/bin
./jstatd -J-Djava.security.policy=all.policy -J-Djava.rmi.server.hostname=本服务器IP -p 端口 &
```
##### 查看运行端口情况
```bash
netstat -anp | grep jstatd
netstat -ntlp
lsof -i:1099
```

#### 二、（推荐）新建一个配置文件`jstatd.all.policy`
```bash
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
```bash
chmod +x jstatd.all.policy
```
##### 在Java的bin目录下用以下命令启动
```bash
./jstatd -J-Djava.security.policy=jstatd.all.policy -J-Djava.rmi.server.hostname=本服务器IP -p 端口 -J-Djava.rmi.server.logCalls=true &
```

> -J-Djava.security.policy=jstatd.all.policy 文件的绝对路径；
>
> -J-Djava.rmi.server.logCalls=true 打开日志,如果客户端有连接过来的请求,可以监控到,便于排错；
>
> -J-Djava.rmi.server.hostname=本服务器IP 指明本机 hostname 对应的本机地址,确保该地址可以给客户机访问。
因为有的服务器 hostname 对应的 ip 不一定是外网能连上的，最好在这里直接明确指定；
>
> -p 3333 指定服务的端口号，默认是1099。也是可选参数。


https://blog.csdn.net/liupeifeng3514/article/details/78998161

### jconsole

#### 查看hostname
```bash
hostname -i
```
> #### 如果hostname为127.0.0.1就需要修改

#### 修改hostname

> `vi /etc/hosts`将其第一行`127.0.0.1 localhost.localdomain localhost`中的`127.0.0.1`修改为：`本服务器IP`
>
> 重启Linux，在服务器上输入`hostname -i`，查看实际设置的IP地址是否为你设置的

#### 启动服务的参数
```bash
java -jar -Djava.rmi.server.hostname=本服务器IP -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=端口 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false jar包
```

### 远程Debug
#### 启动参数
```bash
java -Djavax.net.debug=all -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=端口 -jar jar包
```
#### 参数说明
> `-Djavax.net.debug` 查看调试信息
>> `all` 代表所有，其他有`SSL`,`handshake`,`date`,`trust manager`
>
> `-Xdebug` 是通知JVM工作在DEBUG模式下
> `-Xnoagent` 禁用默认sun.tools.debug调试器。
>
> `-Djava.compiler=NONE` 为了加快debug的速度，禁止JIT编译器的加载，[详细说明](https://www.iteye.com/problems/89141)
>
> `-Xrunjdwp` 是通知JVM使用(Java debug wire protocol)来运行调试环境。该参数同时了一系列的调试选项：
>> `transport`指定了调试数据的传送方式，`dt_socket`是指用SOCKET模式，`dt_shmem`指用共享内存方式，`dt_shmem`只适用于Windows平台。
>
> `server=y/n` VM是否需要作为调试服务器执行。
>
> `suspend=y/n` 是否在调试客户端建立连接之后启动 VM 。(设置为y时启动不了)
>
> `onthrow=java.io.IOException` 指明，当产生该类型的Exception时，JVM就会中断下来，进行调式。可选参数
>
> `launch=/sbin/echo` 指明，当JVM被中断下来时，执行的可执行程序。可选参数
>
> `onuncaught=y/n` 指明，出现uncaught exception 后，是否中断JVM的执行.

#### 客户端使用
> #### 在IDEA中，点击顶部菜单`Run`点击`Edit Configuration`按钮-->出现弹窗，点击`+`按钮，找到`Remote`选项。
> #### 在`Name`中填入Remote项目名称，在`Host`中填IP地址，在`Port`中填端口号，在`Use Module classpath`选择远程调试的项目module，配置完成后点击OK即可
> 
> 启动项目时选择刚刚填的Remote项目名称

![](/images/IDEA远程debug调试.png)

## 三方工具
### [无侵入式的jvm监控工具MyPerf4J](https://github.com/ThinkpadNC5/MyPerf4J)

### [Alibaba Java诊断利器Arthas](https://github.com/alibaba/arthas)
