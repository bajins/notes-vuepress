# 监控工具

## jvisualvm

### 在jvm启动参数中加入或在Tomcat的/bin/catalina.sh文件中加入
```shell
-Djava.rmi.server.hostname=112.74.16.238
-Dcom.sun.management.jmxremote.port=18999
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false
```
### 启动
#### 到JDK安装目录/bin目录下，双击jvisualvm.exe文件启动
##### C:\Program Files\Java\jdk1.8.0_191\bin目录下找到jvisualvm.exe

### 需要注意的是:当OS所在分区是FAT格式时，VisualVM无法获取相关信息！

http://blog.51cto.com/zero01/2141942

### 解决Visual GC提示”不受此JVM支持“，要监控的主机没有配置jstatd
#### 一、在java.policy中添加配置
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

#### 二、新建一个配置文件 jstatd.all.policy
```sehll
cd $JAVA_HOME/bin/
touch jstatd.all.policy
vi jstatd.all.policy
```
##### 添加以下代码
```java
grant codebase "file:${java.home}/../lib/tools.jar" {
   permission java.security.AllPermission;
};
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
