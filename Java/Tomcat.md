# Tomcat


[[toc]]



## Flag

+ [https://github.com/topics/tomcat](https://github.com/topics/tomcat)
+ [https://github.com/apache/tomcat](https://github.com/apache/tomcat)
+ [https://github.com/wildfly/wildfly](https://github.com/wildfly/wildfly)
+ [https://github.com/undertow-io/undertow](https://github.com/undertow-io/undertow)
+ [https://github.com/eclipse/jetty.project](https://github.com/eclipse/jetty.project)
+ [https://github.com/eclipse-ee4j/grizzly](https://github.com/eclipse-ee4j/grizzly)


* Tomcat集群Redis会话管理器 [https://github.com/ran-jit/tomcat-cluster-redis-session-manager](https://github.com/ran-jit/tomcat-cluster-redis-session-manager)
* Tomcat监控 [https://github.com/psi-probe](https://github.com/psi-probe)


- [归档 | 回忆飘如雪](http://gv7.me/archives)
- [Shiro的反序列化漏洞，以及内存马技术](https://blog.csdn.net/localhost01/article/details/107340698)
- [Java Agent 从入门到内存马](https://xz.aliyun.com/t/9450)
- [Tomcat性能监控与调优](https://blog.51cto.com/zero01/2145077)
- [超详细的Tomcat性能监控及调优教程](https://zhuanlan.zhihu.com/p/150135605)
- [Gzip无法压缩48k以上的资源？](https://blog.csdn.net/qq_29534483/article/details/80744027)



* [java编译器编码和JVM编码问题？](https://www.zhihu.com/question/30977092)
* Linux中，JVM默认编码为UTF-8，在`catalina.sh`配置`JAVA_OPTS="$JAVA_OPTS -Dfile.encoding=UTF-8"`
* Windows中，JVM默认编码为GBK，在`catalina.bat`配置`set JAVA_OPTS=%JAVA_OPTS% -Dfile.encoding=UTF-8`



## 执行器（线程池）

> `Executor` Tomcat默认没有启用线程池，在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。
> 这里前台其实有一个调度线程，然后调度线程会放入线程池内，然后到到一定的时候线程池的任务变成工作线程。

- 在`server.xml`中找到`<Service name="Catalina">`节点下的`Executor`标签取消注释

```xml
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="800" minSpareThreads="100"  maxQueueSize="100" prestartminSpareThreads="true" />
```

| 参数 | 说明  |
| ------------ | ------------ |
|name|命名线程池|
|threadPriority|优先级|
|daemon|守护进程|
|namePrefix|名称前缀|
|maxThreads|最大线程数|
|minSpareThreads|最小活跃线程数|
|maxIdleTime|空闲线程等待时间|
|maxQueueSize|最大的等待队里数，超过则请求拒绝|
|prestartminSpareThreads|是否在启动时就生成minSpareThreads个线程|
|threadRenewalDelay|重建线程的时间间隔|

- 连接器指定线程池：在`server.xml`中找到`<Service name="Catalina">`节点下的`Connector`，使用`executor="线程池名称"`



## 连接器优化

> Connector是连接器，负责接收客户的请求，以及向客户端回送响应的消息。所以 Connector的优化是重要部分。
默认情况下 Tomcat只支持200线程访问，超过这个数量的连接将被等待甚至超时放弃，所以我们需要提高这方面的处理能力。

- [Tomcat 连接器Connector 的三种运行模式 Bio、Nio、Apr](https://blog.csdn.net/qq_34556414/article/details/109176069)



| 参数 | 说明  |
| ------------ | ------------ |
|maxPostSize|参数形式处理的最大长度，默认值为2097152（2兆字节）。上传提交的时候可以用的|
|acceptCount|请求的最大队列长度，当队列满时收到的任何请求将被拒绝|
|acceptorThreadCount|用于接受连接的线程的数量|
|disableUploadTimeout|此标志允许servlet容器在数据上传时使用不同的连接超时，通常较长。如果没有指定，该属性被设置为true，禁用上传超时。|
|connectionUploadTimeout|上传数据过程中，指定的以毫秒为单位超时时间。只有在设置disableUploadTimeout为false有效。|
|connectionTimeout|在将提交的请求URI行呈现之后，连接器将等待接受连接的毫秒数。使用值-1表示没有超时（即无限）。默认值是60000（60秒），但请注意，Tomcat的标准server.xml中，设置为20000（即20秒）。|
|maxConnections|服务器接受并处理的最大连接数|
|SSLEnabled|在连接器上使用此属性来启用SSL加密传输|
|port|TCP端口号，连接器利用该端口号将创建一个服务器套接字，并等待传入的连接。|
|protocol|设置协议来处理传入流量。默认值是 HTTP/1.1，将使用自动切换机制来选择阻塞的基于Java的连接器或APR /native 为基础的连接器。可用以下值：org.apache.coyote.http11.Http11Protocol -阻塞式的Java连接器;org.apache.coyote.http11.Http11NioProtocol -不阻塞Java连接器;org.apache.coyote.http11.Http11AprProtocol的 -的APR / native 连接器|
|maxThreads|最多同时处理的连接数，Tomcat使用线程来处理接收的每个请求。这个值表示Tomcat可创建的最大的线程数。如果没有指定，该属性被设置为200。如果使用了execute将忽略此连接器的该属性，连接器将使用execute，而不是一个内部线程池来处理请求。|
|minSpareThreads|始终保持运行最小线程数。如果没有指定，则默认为10。|
|maxHttpHeaderSize|请求和响应的HTTP头的（以字节为单位的）最大尺寸。如果没有指定，该属性被设置为8192（8 KB）。|
|tcpNoDelay|如果设置为true，TCP_NO_DELAY选项将被设置在服务器上的套接字上，在大多数情况下，这样可以提高性能。默认设置为true。|
|compression| 通常会在ngnix里面配置压缩开启压缩GZIP，当值是“off ”（禁用压缩），“on ”（允许压缩，这会导致文本数据被压缩），“force ”（强制在所有的情况下压缩），或者一个整数值（这是相当于为“on”，但指定了输出之前被压缩的数据最小量）。如果不知道内容长度但被设置为“on”或更积极的压缩，输出的数据也将被压缩。如果没有指定，该属性被设置为“off”。|
|compressionMinSize|如果压缩被设置为“on”，那么该属性可以用于指定在输出之前被压缩的数据的最小量。如果未指定，此属性默认为“2048”。|
|redirectPort|如果该连接器支持非SSL请求，并且接收到的请求为满足安全约束需要SSL传输， Catalina 将自动将请求重定向到指定的端口号。|
|enableLookups|设置为false时跳过DNS查找，并返回字符串情势的IP地址（从而提高性能）。默认景象下，禁用DNS查找。|
|URIEncoding|指定使用的字符编码，来解码URI字符。如果没有指定，ISO-8859-1将被使用。|
|executor|指向Executor元素的引用。|
|compressableMimeType| 可以在`conf/web.xml`中的`Default MIME Type Mappings`部分找到|


```xml     
<Connector executor="tomcatThreadPool"
        connectionTimeout="20000"
        port="8080"
        protocol="org.apache.coyote.http11.Http11Nio2Protocol"
        redirectPort="8443"
        maxHttpHeaderSize="8192"
        enableLookups="false"
        maxPostSize="1048576000"
        URIEncoding="UTF-8"
        acceptCount="1000"
        acceptorTreadCount="100"
        disableUploadTimeout="true"
        maxConnections="10000"
        SSLEnabled="false"
        compression="on"
        compressionMinSize="2048"
        noCompressionUserAgents="gozilla,traviata"
        compressableMimeType="text/html,text/xml,application/javascript,text/javascript,text/css,text/plain,text/json"
        />
```


## 禁用AJP连接器

- 如果是使用`Nginx`+`tomcat`的架构，所以用不着`AJP`协议，所以把`AJP`连接器禁用。

> AJPv13协议是面向包的。WEB服务器和Servlet容器通过TCP连接来交互；为了节省SOCKET创建的昂贵代价，
> WEB服务器会尝试维护一个永久TCP连接到servlet容器，并且在多个请求和响应周期过程会重用连接。

- 在`server.xml`中找到`<Service name="Catalina">`节点下的`Connector`标签带有`protocol="AJP/1.3"`属性的注释掉


## http头的验证

> Tomcat在 `7.0.73`、`8.0.39`、以及`8.5.7`版本后，添加了对于`http`头的验证。

- 在`conf/catalina.properties`文件的末尾添加或者修改最后一行

```properties
tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}
```

## Tomcat热部署

- 在`/conf/context.xml`的`Context`标签中配置会使全局生效

* [https://tomcat.apache.org/tomcat-9.0-doc/config/context.html#Attributes](https://tomcat.apache.org/tomcat-9.0-doc/config/context.html#Attributes)

- 在`/conf/server.xml`的`Host`标签中配置

> 替换`WEB-INF/lib`目录中的`jar`文件或`WEB-INF/classes`目录中的`class`文件时，
> `reloadable="true"`会让修改生效（但代价不小），该选项适合调试。

> 在`webapps`目录中增加新的目录、`war`文件、修改`WEB-INF/web.xml`，`autoDeploy="true"`会新建或重新部署应用，该选项方便部署。

```xml
<Context docBase="xxx" path="/xxx" reloadable="true" autoDeploy="true"/> 
```




## 403AccessDenied

> `tomcat8`以上管理页面提示`403 Access Denied`问题

- 修改`conf/tomcat-users.xml`

```bash
vi conf/tomcat-users.xml
```

- 按`shift+g`跳到末尾,在`</tomcat-users>`前添加

```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<user username="tomcat" password="密码" roles="manager-gui,manager-script,admin-gui,admin-script"/>
```

- 修改`context.xml`

> 打开`webapps`下的`host-manager`和`manager`，在`META-INF`里面都有`context.xml`

```bash
vi webapps/manager/META-INF/context.xml
vi webapps/host-manager/META-INF/context.xml
```

> 修改`<Context antiResourceLocking="false" privileged="true" >`节点

> 这段代码的作用是限制来访IP的，`127.d+.d+.d+|::1|0:0:0:0:0:0:0:1`是正则表达式，表示`IPv4`和`IPv6`的本机环回地址

```xml
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
     allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1|\d+\.\d+\.\d+\.\d+" />
```





## CentOS安装Tomcat

* [https://tomcat.apache.org](https://tomcat.apache.org)

**解压**

```bash
tar -zxvf apache-tomcat-8.5.31.tar.gz
```

**重命名目录**

```bash
mv apache-tomcat-8.5.31 tomcat-8080
```

**复制目录**

```bash
cp -r tomcat-8080 tomcat-8082
```


**修改第二个Tomcat配置**

> 进入tomcat-8082的`bin`目录，修改`startup.sh`和`shutdown.sh`两个文件，都添加如下内容

```bash
######### tomcat 2 ##########
export JAVA_HOME=JDK安装目录
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/lib
export CATALINA_HOME=$CATALINA_2_HOME
export CATALINA_BASE=$CATALINA_2_BASE
######### tomcat 2 ##########
```

- 修改第二个tomcat端口,第一个不变

> 进入`/tomcat-8082/conf`中修改`server.xml`修改后示例如下

```xml
<!-- 关闭端口：8005->9005 -->
<Server port="9005" shutdown="SHUTDOWN">

<!-- Web端口：8080->8181 -->
<Connector port="8181" maxHttpHeaderSize="8192"
maxThreads="150" minSpareThreads="25" maxSpareThreads="75"
enableLookups="false" redirectPort="8443" acceptCount="100"
connectionTimeout="20000" disableUploadTimeout="true" />

<!-- 监听端口：8009->9009 -->
<Connector port="9009" enableLookups="false" redirectPort="8443" protocol="AJP/1.3" />
```


**添加环境变量**

> 在`/etc/profile`文件中加入下面内容配置环境变量

```bash
########## tomcat 1 ###########
CATALINA_BASE=/home/tomcat-8080
CATALINA_HOME=/home/tomcat-8080
TOMCAT_HOME=/home/tomcat-8080
export CATALINA_BASE CATALINA_HOME TOMCAT_HOME
########## tomcat 1############

######### tomcat 2 ##########
CATALINA_2_BASE=/home/tomcat-8082
CATALINA_2_HOME=/home/tomcat-8082
TOMCAT_2_HOME=/home/tomcat-8082
export CATALINA_2_BASE CATALINA_2_HOME TOMCAT_2_HOME
########## tomcat 2##########
```

- 刷新环境变量

> `source`命令也称为“点命令”，也就是一个点符号`.`。`source`命令通常用于重新执行刚修改的初始化文件，使之立即生效
 
```bash
source /etc/profile 
# 或者
. /etc/profile
```


## window运行

* [在文件头部添加隐藏窗口运行](/Shell/WindowsBatch.md#隐藏窗口运行)并修改以下文件，执行不显示dos窗口

```batch
:: window下tomcat在当前窗口启动，不在一个新的窗口启动：把start改为run
call "%EXECUTABLE%" start %CMD_LINE_ARGS%
call "%EXECUTABLE%" run %CMD_LINE_ARGS%
```