# Java


[[toc]]





## flag

* [https://www.oracle.com/cn/downloads](https://www.oracle.com/cn/downloads)

* [http://www.apache.org/index.html#projects-list](http://www.apache.org/index.html#projects-list)

* [mybatis](https://mybatis.org/mybatis-3/zh/index.html)

* [http://www.rabbitmq.com](http://www.rabbitmq.com)

* [https://github.com/ehcache/ehcache3](https://github.com/ehcache/ehcache3)


## OpenJDK

[https://jdk.java.net](https://jdk.java.net)

[AdoptOpenJDK](https://adoptopenjdk.net/archive.html?variant=openjdk8&jvmVariant=hotspot)

[Amazon Corretto](https://aws.amazon.com/cn/corretto/)
[corretto](https://github.com/corretto)

[Red Hat OpenJDK](https://developers.redhat.com/products/openjdk/download)

[Dragonwell8](https://github.com/alibaba/dragonwell8)



## maven镜像

* [https://mirrors.cloud.tencent.com/help/maven.html](https://mirrors.cloud.tencent.com/help/maven.html)


**阿里云**

* [https://maven.aliyun.com](https://maven.aliyun.com)

```xml
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**ibiblio**

```xml
<mirror>
    <id>ibiblio</id>
    <name>Mirror from Maven ibiblio</name>
    <url>http://mirrors.ibiblio.org/pub/mirrors/maven2/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**华为**

```xml
<mirror>
    <id>huaweicloud</id>
    <name>mirror from maven huaweicloud</name>
    <url>https://mirror.huaweicloud.com/repository/maven/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

> 使用华为Maven中央仓库时，需要在servers节点增加一个server子节点

```xml
<server>
    <id>huaweicloud</id>
    <username>anonymous</username>
    <password>devcloud</password>
</server>
```

**repo1.maven.org**

```xml
<mirror>
    <id>central</id>
    <name>Maven Repository Switchboard</name>
    <url>http://repo1.maven.org/maven2/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**repo1.maven.apache.org**

```xml
<mirror>
    <id>central</id>
    <name>Maven Repository Switchboard</name>
    <url>http://repo1.maven.apache.org/maven2/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**repo2.maven.org**

```xml
<mirror>
    <id>repo2</id>
    <name>Mirror from Maven Repo2</name>
    <url>http://repo2.maven.org/maven2/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**spring.io**

```xml
<mirror>
	<id>sprintio</id>
	<mirrorOf>central</mirrorOf>
	<name>Human Readable Name for this Mirror.</name>
	<url>https://repo.spring.io/libs-snapshot/</url>
</mirror>
```

**uk.maven.org**

```xml
<mirror>
    <id>ui</id>
    <name>Mirror from UK</name>
    <url>http://uk.maven.org/maven2/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**repository.jboss.org**

```xml
<mirror>
    <id>jboss-public-repository-group</id>
    <name>JBoss Public Repository Group</name>
    <url>http://repository.jboss.org/nexus/content/groups/public</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**Google**

```xml
<mirror>
    <id>google</id>
    <name>google maven</name>
    <url>https://maven.google.com/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**Maven china**

```xml
<mirror>
    <id>maven.net.cn</id>
    <name>Mirror from Maven in china</name>
    <url>http://maven.net.cn/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

**Maven oschina**

```xml
<mirror>
    <id>CN</id>
    <name>OSChinaCentral</name>
    <url>http://maven.oschina.net/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```




## windows环境变量

```batch
JAVA_HOME
C:\Program Files\Java\jre1.8.0_171

CATALINA_HOME
D:\apache-tomcat-8.5.30

CLASSPATH
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;%CATALINA_HOME%\lib;

Path
;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;%MAVEN_HOME%\bin;%CATALINA_HOME%\bin;
```

* [https://github.com/zq99299/java-tutorial](https://github.com/zq99299/java-tutorial)

## 后端框架

[dubbo](https://github.com/apache/incubator-dubbo)

[tcc-transaction是TCC型事务java实现](https://github.com/changmingxie/tcc-transaction)

[fastjson](https://github.com/alibaba/fastjson)

### 延迟队列

[https://github.com/search?l=Java&o=desc&q=delayqueue&s=updated&type=Repositories](https://github.com/search?l=Java&o=desc&q=delayqueue&s=updated&type=Repositories)

[https://github.com/dongzhuo0228/delayqueuetest](https://github.com/dongzhuo0228/delayqueuetest)

[https://github.com/qjm201000/concurrent_delayqueue](https://github.com/qjm201000/concurrent_delayqueue)


## 工具

[utf8+bom编码格式 java 文件 转换为 utf8 格式文件](https://github.com/andotorg/utf8bom-to-utf8)

[从GBK到UTF8的某些路径中的文件编码转换](https://github.com/downgoon/gbk2utf8)

[JVM监控](/Java/JVM.md#监控工具)

## 地区数据

[district](https://github.com/eduosi/district)

[Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)

[Region](https://github.com/Longjianghu/Region)

[china_regions](https://github.com/wecatch/china_regions)


## Java面试题

[https://github.com/Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)

[https://github.com/crossoverJie/Interview-Notebook](https://github.com/crossoverJie/Interview-Notebook)

[https://github.com/crossoverJie/JCSprout](https://github.com/crossoverJie/JCSprout)

[https://github.com/kdn251/interviews](https://github.com/kdn251/interviews)
