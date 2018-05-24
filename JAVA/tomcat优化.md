## 执行器（线程池）
##### 默认的tomcat没有启用线程池,在tomcat中每一个用户请求都是一个线程，所以可以使用线程池提高性能。这里前台其实有一个调度线程，然后调度线程会放入线程池内，然后到到一定的时候线程池的任务变成工作线程。
### 找到以下位置代码
![](https://github.com/claer-ding/UseNotes/blob/master/images/tomcat%E5%BC%80%E5%90%AF%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)
### 更改为以下代码
```
<Executor name="tomcatThreadPool" namePrefix="catalina-exec-"
        maxThreads="800" minSpareThreads="100"  maxQueueSize="100" prestartminSpareThreads="true" />
```
