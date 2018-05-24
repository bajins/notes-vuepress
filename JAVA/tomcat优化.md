# 执行器（线程池）
##### 默认的tomcat没有启用线程池,在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。这里前台其实有一个调度线程，然后调度线程会放入线程池内，然后到到一定的时候线程池的任务变成工作线程。
### 找到以下位置代码
![](https://github.com/claer-ding/UseNotes/blob/master/images/tomcat%E5%BC%80%E5%90%AF%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)
### 更改为以下代码
```
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="800" minSpareThreads="100"  maxQueueSize="100" prestartminSpareThreads="true" />
```
#### 参数说明
| 参数 | 说明  |
| ------------ | ------------ |
|threadPriority|优先级|
|daemon|守护进程|
|namePrefix|名称前缀|
|maxThreads|最大线程数|
|minSpareThreads|最小活跃线程数|
|maxIdleTime|空闲线程等待时间|
|maxQueueSize|最大的等待队里数，超过则请求拒绝|
|prestartminSpareThreads|是否在启动时就生成minSpareThreads个线程|
|threadRenewalDelay|重建线程的时间间隔|

### 指定线程池
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E5%90%AF%E7%94%A8%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)

# 连接器（Connector）优化
#####  Connector是连接器，负责接收客户的请求，以及向客户端回送响应的消息。所以 Connector的优化是重要部分。默认情况下 Tomcat只支持200线程访问，超过这个数量的连接将被等待甚至超时放弃，所以我们需要提高这方面的处理能力。
#####  其中port代表服务接口；protocol代表协议类型；connectionTimeout代表连接超时时间，单位为毫秒；redirectPort代表安全通信（https）转发端口，一般配置成443。
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E8%BF%9E%E6%8E%A5%E5%99%A8%E4%BC%98%E5%8C%96.png)

### 常用的参数如下
| 参数 | 说明  |
| ------------ | ------------ |
|maxPostSize|参数形式处理的最大长度，如果没有指定，该属性被设置为2097152（2兆字节）。上传提交的时候可以用的|
|acceptCount|请求的最大队列长度，当队列满时收到的任何请求将被拒绝|
|acceptorThreadCount|用于接受连接的线程的数量|
|disableUploadTimeout|禁用上传超时|
|maxConnections|服务器接受并处理的最大连接数|
|SSLEnabled|在连接器上使用此属性来启用SSL加密传输|
|port|端口|
|protocol||
|maxThreads|最大线程数|
|minSpareThreads|最小活跃线程数|
|connectionTimeout|连接超时时间|
|maxHttpHeaderSize|HTTP请求头大小|
|tcpNoDelay||
|compression||
|compressionMinSize||
|redirectPort||
|enableLookups||
|URIEncoding|字符集|
### 最好实例
```
        <!-- maxPostSize 参数形式处理的最大长度，如果没有指定，该属性被设置为2097152（2兆字节）,上传提交的时候可以用的
             acceptCount 请求的最大队列长度，当队列满时收到的任何请求将被拒绝
             acceptorThreadCount 用于接受连接的线程的数量
             disableUploadTimeout 禁用上传超时
             maxConnections 服务器接受并处理的最大连接数
             SSLEnabled 在连接器上使用此属性来启用SSL加密传输 -->
        <Connector executor="tomcatThreadPool"
                connectionTimeout="20000"
                port="8090"
                protocol="org.apache.coyote.http11.Http11NioProtocol"
                redirectPort="8443"
                enableLookups="false"
                maxPostSize="10485760"
                URIEncoding="UTF-8"
                acceptCount="100"
                acceptorTreadCount="22"
                disableUploadTimeout="true"
                maxConnections="10000"
                SSLEnabled="false"/>
```
# 禁用AJP连接器
#### 如果是使用Nginx+tomcat的架构，所以用不着AJP协议，所以把AJP连接器禁用。
##### AJPv13协议是面向包的。WEB服务器和Servlet容器通过TCP连接来交互；为了节省SOCKET创建的昂贵代价，WEB服务器会尝试维护一个永久TCP连接到servlet容器，并且在多个请求和响应周期过程会重用连接。
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E7%A6%81%E7%94%A8AJP.png)

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
|-XX:MaxTenuringThreshold=0 |设置垃圾最大年龄，默认为：15。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概论。 |
|-XX:+DisableExplicitGC|这个将会忽略手动调用GC的代码使得System.gc()的调用就会变成一个空调用，完全不会触发任何GC|

### windows
#### 修改bin/catalina.bat文件,在setlocal下面一行添加
```
set JAVA_OPTS=-Dfile.encoding=UTF-8 -server-Xms1024m -Xmx2048m -XX:NewSize=512m -XX:MaxNewSize=1024m -XX:PermSize=256m-XX:MaxPermSize=256m -XX:MaxTenuringThreshold=10 -XX:NewRatio=2-XX:+DisableExplicitGC
```
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Windows.png)

### linux
#### 修改bin/catalina.sh文件,在os400=false之前添加
```
JAVA_OPTS="-Dfile.encoding=UTF-8-server -Xms1024m -Xmx2048m -XX:NewSize=512m -XX:MaxNewSize=1024m-XX:PermSize=256m -XX:MaxPermSize=256m -XX:MaxTenuringThreshold=10-XX:NewRatio=2 -XX:+DisableExplicitGC"
```
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E4%BF%AE%E6%94%B9JVM%E5%8F%82%E6%95%B0Linux.png)





