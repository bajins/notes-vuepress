# JDK安装配置


[[toc]]



## Flag

* [https://www.ej-technologies.com](https://www.ej-technologies.com)
* [https://github.com/oracle/graal](https://github.com/oracle/graal)
* [http://openjdk.java.net/jeps/333](http://openjdk.java.net/jeps/333)

- 通用VM [https://github.com/graalvm](https://github.com/graalvm)
- [https://github.com/oracle/graal](https://github.com/oracle/graal)



## OpenJDK

* [https://github.com/openjdk](https://github.com/openjdk)
    * [http://hg.openjdk.java.net](http://hg.openjdk.java.net)
    * [https://github.com/unofficial-openjdk/openjdk](https://github.com/unofficial-openjdk/openjdk)
* [https://github.com/AdoptOpenJDK](https://github.com/AdoptOpenJDK)
* [https://github.com/corretto](https://github.com/corretto)
    * [https://aws.amazon.com/cn/corretto](https://aws.amazon.com/cn/corretto)
* [https://github.com/zulu-openjdk](https://github.com/zulu-openjdk)
    * [https://www.azul.com/downloads/zulu](https://cn.azul.com/downloads/zulu)
    * [https://cdn.azul.com/zulu/bin](https://cdn.azul.com/zulu/bin)
* [https://github.com/ojdkbuild/ojdkbuild](https://github.com/ojdkbuild/ojdkbuild)
* [Red Hat OpenJDK](https://developers.redhat.com/products/openjdk/download)
* [https://github.com/SAP/SapMachine](https://github.com/SAP/SapMachine)
    * [https://sap.github.io/SapMachine](https://sap.github.io/SapMachine)
* [https://github.com/bell-sw](https://github.com/bell-sw)
    * [https://bell-sw.com/java](https://bell-sw.com/java)
* [https://github.com/sdkman](https://github.com/sdkman)
    * [https://sdkman.io](https://sdkman.io)
* [https://github.com/ScoopInstaller/Java](https://github.com/ScoopInstaller/Java)
* [https://github.com/alibaba/dragonwell8](https://github.com/alibaba/dragonwell8)
* [https://developer.ibm.com/javasdk/downloads](https://developer.ibm.com/javasdk/downloads)

+ [https://github.com/oracle/graal](https://github.com/oracle/graal)
    + [https://www.graalvm.org](https://www.graalvm.org)



## 源码包

- JavaFX源码：JDK安装目录下的`javafx-src.zip`文件
- Java源码：JDK安装目录下的`src.zip`文件

> IDEA查看源码都是从这两个ZIP文件加载，查看源码解压ZIP到`Maven`项目的`src/main/java`下，或者直接解压到普通项目`src`下

> `rt.jar` 是JAVA基础类库，包含`lang`在内的大部分功能，而且`rt.jar`默认就在根`classloader`的加载路径里面

> 在 `java.util.concurrent`、`java.security`、`javax.cropty`、`javax.security` 四个包中就占了两个（多线程、安全）

**多线程（multi-threading and concurrent）**

1. 关键词：volatile, sychronized
2. 传统的线程 API：java.lang.Thread, java.lang.Runnable, java.lang.ThreadGroup, Object#wait, Object#notify, Object#notifyAll
3. JDK 5 并发包（java.util.concurrent）API：线程池、任务执行器、计数信号量、倒计数门闩、并发集合（并发 Map、阻塞队列等）、
基于 CPU CAS 指令的原子 API（java.util.concurrent.atomic）、锁 API（java.util.concurrent.lock）和条件对象等。
4. 作为个人知识提升，还需要理解诸如自旋锁、分离锁、分拆锁、读写锁等的同步锁策略，以及可重入锁、锁的公平性的意义。
以及各种并发锁的算法，比如：Peterson锁、Bakery锁 等等，以及现代 CPU 体系结构

> 涉及多线程及并发的 API 在 java.lang 中及 java.util.concurrent.* 中。

**网络（network communication）**

> java.net、javax.net

1. 阻塞 TCP 通信、阻塞 UDP 通信、组播
2. 非阻塞 TCP 通信、非阻塞 UDP 通信
3. 客户端通信 API（java.net.URL, java.net.URLConnection 等类库）

涉及网络通信的 API 都在 java.net 和 java.nio.channels 包中。这里的网络已经将 RMI 相关包 java.rmi, javax.rmi 都排除了。

**安全（security, cryptography and AAA）**

1. Java 加密类库 JCA
2. Java 加密类库扩展 JCE
3. 涉及密码学知识点的消息摘要、消息认证码、对称加密、非对称加密、数字签名
4. 涉及网络通信证书管理工具（keytool）及 API（PKI、X.509证书）
5. 基于 SSL/TLS 的安全网络通信 API（JSSE），包括：密钥库管理、信任库管理、阻塞 SSL 通信和非阻塞 SSL 通信等等
6. Java 认证及授权服务（JAAS）API

涉及安全的东西都在：

- java.security（JCA、JCE、数字证书，以及 JCE 的 SPI）
- javax.net（SSL/TLS）
- javax.security（JAAS）
- javax.crypto（密码学）
- keytool 的 JDK 工具 


**`java`、`javax`、`sun`、`org`包有什么区别**

> 都是jdk提供的类包，且都是在`rt.jar`中。

- `java.*` java标准的一部分，是对外承诺的java开发接口，通常要保持向后兼容，一般不会轻易修改。
- `javax.*` java标准的一部分，但是没有包含在标准库中，一般属于标准库的扩展。通常属于某个特定领域，不是一般性的api。

> 以扩展的方式提供api，以避免jdk的标准库过大。当然某些早期的javax，后来被并入到标准库中，所有也应该属于新版本JDK的标准库。
> 比如jmx，java 5以前是以扩展方式提供，但是jdk5以后就做为标准库的一部分了，所有javax.management也是jdk5的标准库的一部分。

- `com.sun.*` 是sun的hotspot虚拟机中`java.*` 和 `javax.*`的实现类。

> 因为不是sun对外公开承诺的接口，所以根据根据实现的需要随时增减，因此在不同版本的hotspot中可能是不同的，
> 而且在其他的jdk实现中是没有的，调用这些类，可能不会向后兼容，所以一般不推荐使用。

- `org.omg.*` 是由企业或者组织提供的java类库，大部分不是sun公司提供的，同`com.sun.*`，不具备向后兼容性，会根据需要随时增减。

> 其中比较常用的是w3c提供的对XML、网页、服务器的类和接口。




## JVM

+ [https://github.com/topics/jvm](https://github.com/topics/jvm)
+ [有关Java HotSpot VM的常见问题](https://www.oracle.com/java/technologies/hotspotfaq.html)
+ [JVM的那些常用参数以及命令](https://segmentfault.com/a/1190000020656202)

* [http://jdk.java.net/zgc/](http://jdk.java.net/zgc/)
* [https://wiki.openjdk.java.net/display/zgc/Main](https://wiki.openjdk.java.net/display/zgc/Main)
* [G1垃圾收集器入门](https://www.oracle.com/technetwork/tutorials/tutorials-1876574.html)
* [Java平台，标准版HotSpot虚拟机垃圾收集调优指南](https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/introduction.html)
* [Java HotSpot VM选项 - 仅适用于JDK 7和早期版本](https://www.oracle.com/java/technologies/javase/vmoptions-jsp.html)
* [Java SE 6 HotSpot 虚拟机垃圾收集优化](https://www.oracle.com/java/technologies/javase/gc-tuning-6.html)

- JVM配置工具 [https://render.alipay.com/p/s/jvm-generate/JvmGenerate](https://render.alipay.com/p/s/jvm-generate/JvmGenerate)
- [http://jvmmemory.com](http://jvmmemory.com)
- [https://console.perfma.com](https://console.perfma.com)


![](/images/jvm参数统计.png)


> 因为Tomcat运行在JAVA虚拟机之上,适当调整运行JVM参数可以提升整体性能。

- Windows：修改`bin/catalina.bat`文件，文件中有注释说明
- Linux：修改`bin/catalina.sh`文件，文件中有注释说明


### 常用参数

| 参数                                  	| 说明                                                                                                                                                                                                                                                                    	|
|---------------------------------------	|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| file.encoding                         	| 默认文件编码                                                                                                                                                                                                                                                            	|
| -Xmx1024m                             	| 初始堆大小为1024m                                                                                                                                                                                                                                                       	|
| -Xms1024m                             	| 最大堆大小为1024m                                                                                                                                                                                                                                                       	|
| -Xmn366m                              	| 设置年轻代大小为366m,Sun官方推荐配置为整个堆的3/8（35.7%）                                                                                                                                                                                                              	|
| -XX:NewSize=n                         	| 设置年轻代大小                                                                                                                                                                                                                                                          	|
| -XX:MaxNewSize=n                      	| 设置最大的年轻代大小                                                                                                                                                                                                                                                    	|
| -XX:PermSize=n                        	| JDK1.7设置永久代大小                                                                                                                                                                                                                                                    	|
| -XX:MaxPermSize=n                     	| JDK1.7设置最大永久代大小                                                                                                                                                                                                                                                	|
| -XX:MetaspaceSize=n                   	| JDK1.8设置元空间大小                                                                                                                                                                                                                                                    	|
| -XX:MaxMetaspaceSize=n                	| JDK1.8设置最大元空间大小,最好与-XX:MetaspaceSize一致                                                                                                                                                                                                                    	|
| -XX:NewRatio=4                        	| 设置年轻代（包括Eden和两个Survivor区）与终身代的比值（除去永久代）。设置为4，则年轻代与终身代所占比值为1：4，年轻代占整个堆栈的1/5                                                                                                                                      	|
| -XX:SurvivorRatio=n                   	| 年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5                                                                                                                                             	|
| -XX:MaxTenuringThreshold              	| 设置垃圾最大年龄，默认为：15。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。 	|
| -XX:+CMSScavengeBeforeRemark          	| CMS并发标记阶段与用户线程并发进行，此阶段会产生已经被标记了的对象又发生变化的情况，若打开此开关，可在一定程度上降低CMS重新标记阶段对上述“又发生变化”对象的扫描时间，当然，“清除尝试”也会消耗一些时间。注：开启此开关并不会保证在标记阶段前一定会进行清除操作            	|
| -XX:+UseSerialGC                      	| 设置串行收集器                                                                                                                                                                                                                                                          	|
| -XX:+UseParallelGC                    	| 设置并行收集器                                                                                                                                                                                                                                                          	|
| -XX:ParallelGCThreads=n               	| 设置并行收集线程数                                                                                                                                                                                                                                                      	|
| -XX:+UseParalledlOldGC                	| 设置并行年老代收集器                                                                                                                                                                                                                                                    	|
| -XX:MaxGCPauseMillis=n                	| 设置并行收集最大暂停时间                                                                                                                                                                                                                                                	|
| -XX:GCTimeRatio=n                     	| 设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)                                                                                                                                                                                                                   	|
| -XX:+UseConcMarkSweepGC               	| 设置年老代为并发收集。测试中配置这个以后，-XX:NewRatio=4的配置失效了，原因不明。所以，此时年轻代大小最好用-Xmn设置。                                                                                                                                                    	|
| -XX:CMSInitiatingOccupancyFraction=70 	| CMS垃圾收集器，当老年代达到70%时，触发CMS垃圾回收。                                                                                                                                                                                                                     	|
| -XX:+UseCMSInitiatingOccupancyOnly    	| 指定使用CMSInitiatingOccupancyFraction的值,如果不指定,JVM仅在第一次使用设定值,后续则自动调整。                                                                                                                                                                          	|
| -XX:+ParallelRefProcEnabled           	| 并行处理Reference，加快处理速度，缩短耗时                                                                                                                                                                                                                               	|


### 参考参数

> 根据JDK8-4G内存-4核CPU生成的`JVM`参数，打印了`gc`各个阶段的日志

> 看看`ygc`的回收时间，以及`old`区大小，最后看`FGC`

```bash
JAVA_OPTS="
-server
-Xmx2688M
-Xms2688M
-Xmn960m
-XX:MaxMetaspaceSize=512M
-XX:MetaspaceSize=512M
-XX:+UseConcMarkSweepGC
-XX:CMSInitiatingOccupancyFraction=70
-XX:+UseCMSInitiatingOccupancyOnly
-XX:+ExplicitGCInvokesConcurrentAndUnloadsClasses
-XX:+ParallelRefProcEnabled
-XX:+CMSScavengeBeforeRemark
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/home/jvm_logs/heap.hprof
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



## CentOS安装JDK

**查看已安装**

```bash
rpm -qa | grep java
```

**卸载JDK**

```bash
rpm -e --nodeps 查出来的名称
```

**查看JDK软件包列表**

```bash
yum -y list java*
# 或者
yum search java | grep -i --color JDK
```

**yum安装JDK**

```bash
yum -y install java-1.7.0-openjdk java-1.7.0-openjdk-devel.x86_64
```

> 通过yum默认安装的路径为`/usr/lib/jvm`

**配置环境变量**

- 在`/etc/profile`文件中加入

```bash
########## jdk  environment ######################
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.181-2.6.14.8.el7_5.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
########## jdk  environment ######################
```

- 刷新环境变量文件

```bash
source /etc/profile
```

- 查看变量是否生效

```bash
echo $JAVA_HOME && echo $CLASSPATH
```

**查看Java版本信息**

```bash
java -version
```




