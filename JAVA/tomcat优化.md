## 执行器（线程池）
##### 默认的tomcat没有启用线程池,在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。这里前台其实有一个调度线程，然后调度线程会放入线程池内，然后到到一定的时候线程池的任务变成工作线程。
### 找到以下位置代码
![](https://github.com/claer-ding/UseNotes/blob/master/images/tomcat%E5%BC%80%E5%90%AF%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)
### 更改为以下代码
```
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="800" minSpareThreads="100"  maxQueueSize="100" prestartminSpareThreads="true" />
```
#### 参数说明
```
threadPriority （优先级）
daemon（守护进程）
namePrefix（名称前缀）
maxThreads（最大线程数）
minSpareThreads（最小活跃线程数）
maxIdleTime（空闲线程等待时间）
maxQueueSize（最大的等待队里数，超过则请求拒绝）
prestartminSpareThreads（是否在启动时就生成minSpareThreads个线程）
threadRenewalDelay（重建线程的时间间隔）
```
### 指定线程池
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E5%90%AF%E7%94%A8%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)

## 连接器（Connector）优化
#####  Connector是连接器，负责接收客户的请求，以及向客户端回送响应的消息。所以 Connector的优化是重要部分。默认情况下 Tomcat只支持200线程访问，超过这个数量的连接将被等待甚至超时放弃，所以我们需要提高这方面的处理能力。
#####  其中port代表服务接口；protocol代表协议类型；connectionTimeout代表连接超时时间，单位为毫秒；redirectPort代表安全通信（https）转发端口，一般配置成443。
![](https://github.com/claer-ding/UseNotes/blob/master/images/Tomcat%E8%BF%9E%E6%8E%A5%E5%99%A8%E4%BC%98%E5%8C%96.png)

### 常用的参数如下
```
<Connector port="8080"
         protocol="HTTP/1.1"
         maxThreads="1000"
         minSpareThreads="100"
         acceptCount="1000"
         maxConnections="1000"
         connectionTimeout="20000"
         maxHttpHeaderSize="8192"
         tcpNoDelay="true"
         compression="on"
         compressionMinSize="2048"
         disableUploadTimeout="true"
         redirectPort="8443"
         enableLookups="false"
         URIEncoding="UTF-8" />
```
### 最好实例
```
<Connector executor="tomcatThreadPool"
        connectionTimeout="20000"
        port="8090"
        protocol="HTTP/1.1"
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


