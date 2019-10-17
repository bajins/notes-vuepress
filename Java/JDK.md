# JDK




* [OpenJDK](#openjdk)
* [JDK工具](#jdk工具)
  * [基本工具](#基本工具)
  * [安全工具](#安全工具)
  * [Java国际化工具](#java国际化工具)
  * [远程方法调用工具](#远程方法调用工具)
  * [IDL和RMI-IIOP工具](#idl和rmi-iiop工具)
  * [Java部署工具](#java部署工具)
  * [Java web工具](#java-web工具)
  * [JDK监控工具](#jdk监控工具)
    * [VisualVM](#visualvm)
    * [JConsole](#jconsole)
    * [jps](#jps)
    * [jstat](#jstat)
    * [JMC](#jmc)
  * [故障检测和修理工具](#故障检测和修理工具)
    * [jinfo](#jinfo)
    * [jmap](#jmap)
    * [jstack](#jstack)
    * [jcmd](#jcmd)
  * [Java脚本工具](#java脚本工具)
  * [其他工具](#其他工具)
* [JVM](#jvm)
  * [JVM参数优化](#jvm参数优化)
  * [常用参数](#常用参数)
  * [参考](#参考)
  * [windows](#windows)
  * [linux](#linux)
  * [其他命令](#其他命令)
  * [远程监控配置`JMX`](#远程监控配置jmx)
* [远程Debug](#远程debug)
  * [启动参数](#启动参数)
  * [参数说明](#参数说明)
  * [客户端使用](#客户端使用)
* [三方工具](#三方工具)
  * [无侵入式的jvm监控工具MyPerf4J](#无侵入式的jvm监控工具myperf4j)
  * [Alibaba Java诊断利器Arthas](#alibaba-java诊断利器arthas)






## OpenJDK

[AdoptOpenJDK](https://adoptopenjdk.net/archive.html?variant=openjdk8&jvmVariant=hotspot)

[Amazon Corretto](https://aws.amazon.com/cn/corretto/)
[corretto](https://github.com/corretto)

[Red Hat OpenJDK](https://developers.redhat.com/products/openjdk/download)

[Dragonwell8](https://github.com/alibaba/dragonwell8)


## JDK工具

> 细心的可能会发现，`jdk/bin`目录下的这些工具都非常小，
> 是因为这些工具大多是`jdk/lib/tools.jar`类库的一层包装而已，他们主要的功能代码是在`tools`类库中实现的。

![](/images/JDKBin.png)

### 基本工具

> 这些工具是JDK的基础，用这些工具来编写应用程序。

| 工具名称             | 用途                                                       |
|:-----------------|:---------------------------------------------------------|
| javac.exe        | Java语言编译器                                                |
| java.exe         | Java应用程序启动器                                              |
| javaw.exe        | Java运行工具，用于运行.class字节码文件或.jar文件，但不会显示控制台输出信息，适用于运行图形化程序。 |
| javadoc.exe      | Java API文档生成器                                            |
| apt.exe          | java 注释处理器                                               |
| appletviewer.exe | java applet小程序查看器                                        |
| jar.exe          | java文件压缩打包工具                                             |
| jdb.exe          | Java调试器                                                  |
| javah.exe        | C头文件和stub生成器，用于写本地化方法，例如生产JNI样式的头文件                      |
| javap.exe        | class文件反编译工具                                             |
| extcheck.exe     | 用于检测jar包中的问题                                             |
| jcmd.exe         | Java命令行(Java Command)，用于向正在运行的JVM发送诊断命令请求。               |

### 安全工具

> 这些工具用于设置系统的安全规则和生产可以工作在远端的安全规则下的应用程序

| 工具名称           | 用途                            |
|----------------|-------------------------------|
| keytool.exe    | 管理密钥库和证书                      |
| jarsigner.exe  | 生产和校验JAR签名                    |
| policytool.exe | 有用户界面的规则管理工具                  |
| kinit.exe      | 用于获得和缓存网络认证协议Kerberos 票证的授予票证 |
| klist.exe      | 凭据高速缓存和密钥表中的 Kerberos 显示条目    |
| ktab.exe       | 密钥和证书管理工具                     |


### Java国际化工具

> 这些工具可以帮助你创建可本地化的应用程序

| 工具名称             | 用途                     |
|------------------|------------------------|
| native2ascii.exe | 将文本转化为 Unicode Latin-1 |


### 远程方法调用工具

> 这些工具可以帮助创建可以和web和网络交互的应用程序

| 工具名称            | 用途                                                               |
|-----------------|------------------------------------------------------------------|
| rmic.exe        | 生成远程对象的stubs and skeletons(存根和框架)                                |
| rmid.exe        | Java远程方法调用(RMI:Remote Method Invocation)活化系统守护进程                 |
| rmiregistry.exe | Java远程对象注册表                                                      |
| serialver.exe   | 返回类的 serialVersionUID                                            |
| java-rmi.exe    | Java远程方法调用(Java Remote Method Invocation)工具，主要用于在客户机上调用远程服务器上的对象 |

### IDL和RMI-IIOP工具

> 这些工具用于创建使用OMG-Standard IDL 和 CORBA/IIOP 的应用程序

| 工具名称           | 用途                                       |
|----------------|------------------------------------------|
| tnameserv.exe  | Java IDL瞬时命名服                            |
| idlj.exe       | 生产映射到OMG IDL接口可以使Java应用程序使用CORBA的.java文件 |
| orbd.exe       | 为客户可以在CORBA环境下透明的定位和调用服务器的稳定的对象提供支持      |
| servertool.exe | 为应用程序提供易于使用的接口用于注册，注销，启动，关闭服务器           |

### Java部署工具

> 

| 工具名称          | 用途                                                                  |
|---------------|---------------------------------------------------------------------|
| pack200.exe   | 使用java gzip压缩工具将JAR文件转换为压缩的pack200文件，生产打包文件是高度压缩的JAR包，可以直接部署，减少下载时间 |
| unpack200.exe | 解包pack200文件为JARs                                                    |

### Java web工具

>

| 工具名称          | 用途                   |
|---------------|----------------------|
| javaws.exe    | Java web 启动命令行工具     |
| schemagen.exe | Java构架的XML Schema生成器 |
| wsgen.exe     | 生成 JAX-WS            |
| wsimport.exe  | 生成 JAX-WS            |
| xjc.exe       | 绑定编译器                |

### JDK监控工具

> Java故障检修，程序概要分析，监视和管理工具

| 工具名称          | 用途                                                             |
|---------------|----------------------------------------------------------------|
| [jvisualvm.exe](https://github.com/oracle/visualvm/releases) | 一个图形化的Java虚拟机。从OracleJDK9开始，不再包含。 |
| jconsole.exe  | java监视台和管理控制台                                                  |
| jps.exe       | JVM Process Status进程状态工具。列出目标系统的HotSpot JVM                   |
| jstat.exe     | 按照命令行的具体要求记录和收集一个JVM的性能数据                                      |
| jstatd.exe    | JVM jstat 的守护进程                                                |
| jmc.exe       | Java任务控制工具(Java Mission Control)，主要用于HotSpot JVM的生产时间监测、分析、诊断。从OracleJDK9开始，不再包含。 |



#### VisualVM

> 从`Oracle JDK 9`开始，不再包含。需到GitHub下载[https://github.com/oracle/visualvm/releases](https://github.com/oracle/visualvm/releases)

> `Oracle JDK 8`及以下版本在`/jdk/bin`目录下`jvisualvm.exe`

> 需要注意的是:当OS所在分区是FAT格式时，VisualVM无法获取相关信息！

- 显示虚拟机进程以及进程的`配置`、`环境信息`（`jps`、`jinfo`）。
- 监视应用程序的`CPU`、`GC`、`堆`、方法区(1.7及以前)，`元空间`（JDK1.8及以后）以及`线程`的信息（`jstat`、`jstack`）。
- dump以及分析`堆转储快照`（`jmap`、`jhat`）。
- 方法级的`程序运行性能分析`，**找出被调用最多、运行时间最长的方法**。
- 离线程序快照：收集程序的运行时配置、线程dump、内存dump等信息建立一个快照

![](/images/JavaVisualVM.png)

> 参考：
>> [基于JVisualVM的可视化监控](http://blog.51cto.com/zero01/2141942)
>>
>> [VisualVM监控远程阿里云主机](https://blog.csdn.net/u010004317/article/details/82948040)

##### 不受此JVM支持

> 解决`Visual GC`提示`不受此JVM支持`，要监控的主机没有配置`jstatd`

> 参考：[jvisualvm 连接 jstatd 远程监控 jvm 或 Visual GC提示"不受此JVM支持“](https://blog.csdn.net/liupeifeng3514/article/details/78998161)


- 先查看`jstatd`服务是否可用

```bash
jps -l 127.0.0.1
```

- 一、在原有配置文件`java.policy`中添加

```bash
vi $JAVA_HOME/jre/lib/security/java.policy
```

- 在文件末位的 `};` 前添加

```java
permission java.security.AllPermission;
```

- 启动jstatd

```bash
cd $JAVA_HOME/bin
./jstatd -J-Djava.security.policy=all.policy -J-Djava.rmi.server.hostname=本服务器IP -p 端口 &
```

- 查看运行端口情况

```bash
netstat -anp | grep jstatd
netstat -ntlp
lsof -i:1099
```

- 二、（推荐）新建一个配置文件`jstatd.all.policy`

```bash
cd $JAVA_HOME/bin/
vi jstatd.all.policy
```

- 添加以下代码

```java
grant codebase "file:${java.home}/../lib/tools.jar" {
   permission java.security.AllPermission;
};
```

- 给文件加上执行权限

```bash
chmod +x jstatd.all.policy
```

- 在Java的bin目录下用以下命令启动

```bash
./jstatd -J-Djava.security.policy=jstatd.all.policy -J-Djava.rmi.server.hostname=本服务器IP -p 端口 -J-Djava.rmi.server.logCalls=true &
```

> `-J-Djava.security.policy=jstatd.all.policy` 文件的绝对路径；

> `-J-Djava.rmi.server.logCalls=true` 打开日志,如果客户端有连接过来的请求,可以监控到,便于排错；

> `-J-Djava.rmi.server.hostname=本服务器IP` 指明本机 hostname 对应的本机地址,确保该地址可以给客户机访问。
>> 因为有的服务器 hostname 对应的 ip 不一定是外网能连上的，最好在这里直接明确指定；

> `-p 3333` 指定服务的端口号，默认是1099。也是可选参数。



#### JConsole

> 在`/jdk/bin`目录下`jconsole.exe`

> 如果上面的`内存`页签相当于可视化的`jstat`命令的话，`线程`页签的功能相当于可视化的`jstack`命令，遇到线程停顿时可以使用这个页签进行监控分析。
>
> 线程长时间停顿的主要原因主要有：等待外部资源（数据库连接、网络资源、设备资源等）、死循环、锁等待（活锁和死锁）

![](/images/JConsole.png)


##### 查看hostname

```bash
hostname -i
```
- 如果hostname为`127.0.0.1`就需要修改

> `vi /etc/hosts`将其第一行`127.0.0.1 localhost.localdomain localhost`中的`127.0.0.1`修改为：`本服务器IP`
>
> 重启Linux，在服务器上输入`hostname -i`，查看实际设置的IP地址是否为你设置的



#### jps
> `jps`命令（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jps.html#GUID-6EB65B96-F9DD-4356-B825-6146E9EEC81E)）
> 用于列出正在运行的虚拟机进程信息，

##### 命令格式如下：

```bash
jps [ -q ] [ -mlvV ][hostid ]
jps [ -help ]
```

> 在默认情况下，jps的输出信息包括 Java 进程的进程ID以及主类名。jps还提供一些参数用于打印详细的信息。

##### 其中`-q`仅显示虚拟机的进程id，`-mlvV`的意义如下：

- `-m` 将打印传递给主类的参数
- `-l` 将打印模块名以及包名
- `-v` 将打印传递给虚拟机的参数
- `-V` 将打印传递给主类的参数、jar文件名等





#### jstat

> `jstat`（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jstat.html#GUID-5F72A7F9-5D5A-4486-8201-E1D1BA8ACCB5)）
> 是用于监视虚拟机各种运行状态信息的命令行工具，它可以显示本地或者远程虚拟机进程中的类加载、内存、垃圾回收等信息

##### 命令格式如下

```
用法：jstat -help|-options
     jstat -<option> [-t] [-h<lines>] <vmid> [<interval> [<count>]]

定义：
  <option> -options选项报告的选项
  <vmid>虚拟机标识符。 vmid采用以下形式：
                     <lvmid> [@ <主机名> [：<端口>]]
                其中<lvmid>是目标的本地vm标识符
                Java虚拟机，通常是进程ID; <hostname>是
                运行目标Java虚拟机的主机的名称;
                和<port>是rmiregistry的端口号
                目标主持人。有关更完整的信息，请参阅jvmstat文档
                虚拟机标识符的描述。
  <lines>标题行之间的样本数。
  <interval>采样间隔。允许以下表格：
                    <N> [ “MS” | “S”]
                其中<n>是一个整数，后缀指定单位为
                毫秒（“ms”）或秒（“s”）。默认单位为“ms”。
  <count>终止前要采取的样本数。
  -J <flag>将<flag>直接传递给运行时系统。
```

> 其中`vmid`全称是`Virtual Machine Identifier`，就是jps命令显示的进程id，如果是远程虚拟机进程

##### `vmid`的格式如下

```
[protocol:][//]lvmid[@hostname[:port]/servername]
```

##### `jstat`命令包含很多的子命令，主要分为3类

- 类加载（`-class`）
- 即时编译（`-compiler`和`-printcompilation`）
- 垃圾回收（`-gc*`）

##### 输入`jstat -options`显示如下

```
-class
-compiler
-gc
-gccapacity
-gccause
-gcmetacapacity
-gcnew
-gcnewcapacity
-gcold
-gcoldcapacity
-gcutil
-printcompilation
```

> `jstat [ generalOption | outputOptions vmid [interval[s|ms] [count]] ]`
>
> 参数：
>> `generalOption` 一般使用-gcutil查看GC情况
>> 
>> `vmid` 虚拟机进程号，即当前运行的java进程号
>> 
>> `interval` 间隔时间，单位为秒或毫秒
>> 
>> `count` 打印次数，如果缺省则打印无数次


```bash
# 每2秒输出一次内存情况，连续输出100次
jstat -gcutil <pid> 2000 100
jstat -gcutil $(pgrep java) 2000 100

# 输出heap各个分区大小，垃圾收集情况
# 每隔2秒打印一次，共打印2次
jstat -gc <pid> 2s 2
jstat -gc $(pgrep java) 2s 2
```
> JVM堆是分代的，前四个表示`Survivor`区的容量（Capacity）和已使用量（Utilization），EC表示当前Eden的容量，在翻阅文档的时候，
> 发现没有`CGC`和`CGCT`的解释，它们分别代表并发`GC Stop-The-World`的次数和时间。






#### JMC

> 从`Oracle JDK 9`开始，不再包含。

> `Oracle JDK 8`及以下版本在`/jdk/bin`目录下`jmc.exe`

![](/images/JavaMissionControl.png)





### 故障检测和修理工具

* [Java虚拟机的监控及诊断工具（命令行）](https://mingshan.fun/2018/10/21/monitoring-diagnostic-tools-for-jvm-cmd/)

| 工具名称          | 用途                                    |
|---------------|---------------------------------------|
| jinfo.exe     | 配置或打印某个Java进程VM flag                  |
| jhat.exe      | 堆储存查看器                                |
| jmap.exe      | Java内存图                               |
| jsadebugd.exe | Java的 Serviceability Agent Debug的守护进程 |
| jstack.exe    | Java堆栈跟踪                              |


#### jinfo

> `jinfo`命令（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jinfo.html#GUID-69246B58-28C4-477D-B375-278F5F9830A5)）
> 用来实时地查看和调整虚拟机的各项参数。

> 我们可以使用`jps -v`来查看传递给虚拟机的参数，即`System.getProperty`获取的`-D`参数，现在我们可以利用`jinfo`命令来获取了。

##### 命令格式如下

```bash
jinfo [option] pid
```

##### 它也包括了许多子命令，具体如下

- 1. `-flag name`

> 打印指定的虚拟机参数的名称和值

- 2. `-flag [+|-]name`

> 用来修改目标`Java`进程的`manageable`虚拟机参数。其中`+`代表开启，`-`代表关闭。

> 命令：`java -XX:+PrintFlagsFinal -version | grep manageable`

- 3. `-flag name=value`

> 设置指定的虚拟机参数的值

- 4. `-flags`

> 打印全部的虚拟机参数
>> 例如：`jinfo -flags 26792`

- 5. `-sysprops`

> 打印`java`系统参数（`Java System Properties`）



#### jmap

> `jmap`命令（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jmap.html#GUID-D2340719-82BA-4077-B0F3-2803269B7F41)）
> 用于生成堆转储快照，用于分析Java虚拟机堆中的对象。

##### 命令格式为

```bash
jmap [options] pid
```

##### 参数选项

- 1. `-clstats`

> 连接到正在运行的进程并打印Java堆被加载类的统计信息

- 2. `-finalizerinfo`

> 连接到正在运行的进程并打印所有待 finalize 的对象。

- 3. `-histo[:live]`

> 连接到正在运行的进程并统计各个类的实例数目以及占用内存，并按照内存使用量从多至少的顺序排列。
> 此外，`-histo:live`只统计堆中还在存活的对象。

- 4. `-dump`

> 连接到正在运行的进程并导出Java虚拟机堆内存的快照。

> 该子命令该包含如下参数：

>> `live` 只保存堆中存活的对象

>> `format=b` 将使`jmap`导出与`hprof`（在`Java 9`中已被移除）`-XX:+HeapDumpAfterFullGC`、`-XX:+HeapDumpOnOutOfMemoryError`格式一样的文件

>> `file=filename` 指定导出堆内存快照的位置

> 示例命令如下

```bash
# 生成dump文件
jmap -dump:live,format=b,file=heap.hprof $(pgrep java)
```







#### jstack

> `jstack`命令（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jstack.html#GUID-721096FC-237B-473C-A461-DBBBB79E4F6A)）
> 可以用来打印目标`Java`进程中各个线程的栈轨迹，以及这些线程所持有的锁。

> 通过线程的栈轨迹可以定位线程长时间停顿的原因，如线程间死锁、死循环、请求外部资源导致长时间等待等。

##### 命令格式如下

```
用法：
     jstack [-l] <pid>
         （连接到正在运行的进程）
     jstack -F [-m] [-l] <pid>
         （连接到挂起的进程）
     jstack [-m] [-l] <executable> <core>
         （连接到核心文件）
     jstack [-m] [-l] [server_id @] <远程服务器IP或主机名>
         （连接到远程调试服务器）

选项：
     -F强制进行线程转储。 当jstack <pid>没有响应时（进程挂起）时使用
     -m打印java和本机帧（混合模式）
     -l长列表。 打印有关锁的其他信息
     -h或-help打印此帮助消息
```

##### 线程的状态

> 在输出的信息中，会包含，下面是常见的线程状态：

- `RUNNABLE` 线程处于执行中
- `BLOCKED` 线程被阻塞
- `WAITING` 线程正在等待
- `TIMED_WAITING` 超时等待

##### 示例

```bash
# 获取到线程的dump日志
jstack -l $(pgrep java) >dump.log

# 将所有线程信息输入到指定文件中
jstack -F $(pgrep java) > jvm.log
```

#### jcmd

> `jcmd`命令（[帮助文档](https://docs.oracle.com/en/java/javase/11/tools/jcmd.html#GUID-59153599-875E-447D-8D98-0078A5778F05)）
> 可以向运行中的`Java`虚拟机(`JVM`)发送诊断命令。

##### 命令格式如下

```bash
jcmd <pid | main class> <command ... | PerfCounter.print | -f  file>
jcmd -l
jcmd -h
```

##### 参数

- `pid`
> 虚拟机的进程id

- `main class`
> 接收诊断命令请求的进程的main类。

- `command`
> 该命令必须是针对所选JVM的有效`jcmd`命令。

> `jcmd`的可用命令列表是通过运行`help`命令(`jcmd pid help`)获得的，其中`pid`是运行`Java`进程的进程ID。

> 如果`pid`为0，命令将被发送到所有的`Java`进程。`main class`参数将用于部分或完全匹配用于启动`Java`的类。

> 如果没有提供任何选项，会列出正在运行的`Java`进程标识符以及用于启动进程的主类和命令行参数(与使用`-l`相同)。

- `Perfcounter.print`
> 打印目标`Java`进程上可用的性能计数器。性能计数器的列表可能会随着`Java`进程的不同而产生变化。

- `-f file`
> 从文件file中读取命令，然后在目标`Java`进程上调用这些命令。

- `-l`
> 查看所有的进程列表信息。

- `-h`
> 查看帮助信息。（同`-help`）

##### 查看可用命令

```bash
jcmd $(pgrep java) help
```

##### 示例

```bash
# 生成dump文件
jcmd <pid> GC.heap_dump /home/heap.hprof
```




### Java脚本工具


| 工具名称           | 用途   |
|----------------|------|
| jrunscript.exe | 运行脚本 |

### 其他工具

>

| 工具名称               | 用途                                                                                                                   |
|--------------------|----------------------------------------------------------------------------------------------------------------------|
| jabswitch.exe      | Java Access Bridge Switch的简称，用于控制Java访问桥的开/关。Java访问桥是一种技术，让Java应用程序实现Accessibility API，以供Microsoft Windows系统的辅助技术访问。 |
| javafxpackager.exe | JavaFX打包工具                                                                                                           |







## JVM


### JVM参数优化
> 因为Tomcat运行在JAVA虚拟机之上,适当调整Tomcat的运行JVM参数可以提升整体性能。

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


### 参考

> 根据JDK8-4G内存-4核CPU生成的`JVM`参数，打印了`gc`各个阶段的日志

> 看看`ygc`的回收时间，以及`old`区大小，最后看`FGC`

```bash
export JAVA_OPTS="
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

### windows

- 添加JAVA_HOME和JRE_HOME

```bash
set JAVA_HOME=C:\Program Files\Java\jdk1.8.0_191
set JRE_HOME=C:\Program Files\Java\jre1.8.0_201
```

> 修改`bin/catalina.bat`文件,在setlocal下面一行添加，注意代码格式

![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Windows.png)



### linux

> 修改`bin/catalina.sh`文件,在最前面添加，注意代码格式

![](/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Linux.png)


### 其他命令

```bash
# 获取当前JVM默认参数
java -XX:+PrintFlagsFinal -version | grep MaxHeapSize

# 找出占用CPU高（或执行时间长）的线程PID
top -H -p $(pgrep java)
top -Hp $(pgrep java)
# TID等同PID
ps -mp $(pgrep java) -o THREAD,tid,time | sort -rn

# 打印堆栈异常信息，过滤转换为16进制的PID，-A 30显示后30行
jstack PID | grep $(printf "%x\n" PID) -A 30
jstack PID | grep -A 10 $(printf "%x\n" PID)

# nid：对应的linux操作系统下的TID，就是前面转化的16进制数字
# tid：这个应该是jvm的jmm内存规范中的唯一地址定位
```

### 远程监控配置`JMX`

> 在jvm启动参数中加入或在Tomcat的`/bin/catalina.sh`文件中加入

```bash
-Djava.rmi.server.hostname=主机的IP
-Dcom.sun.management.jmxremote.port=端口号
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```





## 远程Debug

### 启动参数

```bash
java -Djavax.net.debug=all -Xdebug -Xnoagent -Djava.compiler=NONE -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=端口 -jar jar包
```

### 参数说明

- `-Djavax.net.debug` 查看调试信息
> `all` 代表所有，其他有`SSL`,`handshake`,`date`,`trust manager`

- `-Xdebug` 是通知JVM工作在DEBUG模式下
- `-Xnoagent` 禁用默认sun.tools.debug调试器。

- `-Djava.compiler=NONE` 为了加快debug的速度，禁止JIT编译器的加载，[详细说明](https://www.iteye.com/problems/89141)

- `-Xrunjdwp` 是通知JVM使用(Java debug wire protocol)来运行调试环境。该参数同时了一系列的调试选项：
> `transport`指定了调试数据的传送方式，`dt_socket`是指用SOCKET模式，`dt_shmem`指用共享内存方式，`dt_shmem`只适用于Windows平台。

- `server=y/n` VM是否需要作为调试服务器执行。

- `suspend=y/n` 是否在调试客户端建立连接之后启动 VM 。(设置为y时启动不了)

- `onthrow=java.io.IOException` 指明，当产生该类型的Exception时，JVM就会中断下来，进行调式。可选参数

- `launch=/sbin/echo` 指明，当JVM被中断下来时，执行的可执行程序。可选参数

- `onuncaught=y/n` 指明，出现uncaught exception 后，是否中断JVM的执行.

### 客户端使用

- 在IDEA中，点击顶部菜单`Run`点击`Edit Configuration`按钮-->出现弹窗，点击`+`按钮，找到`Remote`选项。

- 在`Name`中填入Remote项目名称，在`Host`中填IP地址，在`Port`中填端口号，在`Use Module classpath`选择远程调试的项目module，配置完成后点击OK即可

> 启动项目时选择刚刚填的Remote项目名称

![](/images/IDEA远程debug调试.png)


## 三方工具

### 无侵入式的jvm监控工具MyPerf4J

[https://github.com/ThinkpadNC5/MyPerf4J](https://github.com/ThinkpadNC5/MyPerf4J)

### Alibaba Java诊断利器Arthas

[https://github.com/alibaba/arthas](https://github.com/alibaba/arthas)


