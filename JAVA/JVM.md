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

