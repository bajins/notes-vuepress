# Java


[[toc]]



## flag

- [Java版本比较](https://mp.weixin.qq.com/s/NEfqPXrcq6O1p7RLf9LWCw)

+ [https://docs.oracle.com](https://docs.oracle.com)
    + [https://docs.oracle.com/javase/8/docs](https://docs.oracle.com/javase/8/docs)
    + [https://docs.oracle.com/javase/7/docs](https://docs.oracle.com/javase/7/docs)

* [https://www.oracle.com/cn/downloads](https://www.oracle.com/cn/downloads)
    * [https://www.oracle.com/java/technologies/javase-downloads.html](https://www.oracle.com/java/technologies/javase-downloads.html)
    * [https://www.oracle.com/java/technologies/java-ee-glance.html](https://www.oracle.com/java/technologies/java-ee-glance.html)


+ [https://github.com/javaee](https://github.com/javaee)
+ [https://github.com/eclipse-ee4j](https://github.com/eclipse-ee4j)
    + [https://projects.eclipse.org/jakartaee/releases/8](https://projects.eclipse.org/jakartaee/releases/8)
+ [https://github.com/jersey](https://github.com/jersey)
+ [http://www.apache.org/index.html#projects-list](http://www.apache.org/index.html#projects-list)
    + [下载地址镜像](/Other/README.md#通用镜像)

- [fastjson这么快老外为啥还是热衷 jackson?](https://www.zhihu.com/question/44199956)
- [JAX-WS与JAX-RS区别是什么？](https://blog.csdn.net/dogiant/article/details/54907506)
- [接口框架 : WebService与Jersey RESTful 要点梳理](https://blog.csdn.net/zzg19950824/article/details/80300501)
- [JAVA多线程使用场景和注意事项](https://www.jianshu.com/p/d670c6485ff9)
- Java持久性API(Java Persistence API) [https://en.wikipedia.org/wiki/Java_Persistence_API](https://en.wikipedia.org/wiki/Java_Persistence_API)
- [fork/join 全面剖析](https://www.cnblogs.com/linlinismine/p/9295701.html)
- [收集业务日志，提炼有效数据](https://mp.weixin.qq.com/s/mA8ZqShP0p_t1toTzqpW3Q)
- [通过filebeat、logstash、rsyslog采集nginx日志的几种方式](https://www.cnblogs.com/xiejava/p/12452434.html)
- [分布式系统唯一ID生成方案汇总](https://www.cnblogs.com/haoxinyue/p/5208136.html)

+ JMH（Java Microbenchmark Harness）是专门用于代码微基准测试的工具套件
+ [什么是JNDI？](https://blog.csdn.net/gybshen/article/details/82717578)

> JNDI是Java Naming and Directory Interface（Java命名与目录接口）其实和Spring依赖注入差不多的效果，
> 就是我们可以将我们需要的类注册进去，然后一般我们都是使用该类的实例对象，这时候因为刚才我们已经给每个类按照JNDI的规范进行了注入，
> 这时候我们直接通过JNDI的使用规则取出来我们想要的数据（实例对象）即可。


## 学习

- [技术集合归档](https://blog.52itstyle.vip/architecture.html)

+ [https://github.com/Snailclimb/awesome-java](https://github.com/Snailclimb/awesome-java)

* [https://github.com/Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)
* [https://github.com/crossoverJie/JCSprout](https://github.com/crossoverJie/JCSprout)
* [https://github.com/kdn251/interviews](https://github.com/kdn251/interviews)
* [https://github.com/doocs/advanced-java](https://github.com/doocs/advanced-java)
* [https://github.com/LingCoder/OnJava8](https://github.com/LingCoder/OnJava8)
* [https://github.com/CyC2018/CS-Notes](https://github.com/CyC2018/CS-Notes)
* [https://github.com/hollischuang/toBeTopJavaer](https://github.com/hollischuang/toBeTopJavaer)
* [https://github.com/topics/effective-java](https://github.com/topics/effective-java)
    * [https://github.com/clxering/Effective-Java-3rd-edition-Chinese-English-bilingual](https://github.com/clxering/Effective-Java-3rd-edition-Chinese-English-bilingual)
    * [Effective Java 第三版](https://www.jianshu.com/p/fc7b69608954)
    * [https://gitee.com/liuzidong/effctive-java-3rd-chinese](https://gitee.com/liuzidong/effctive-java-3rd-chinese)
* [https://github.com/hansonwang99/JavaCollection](https://github.com/hansonwang99/JavaCollection)
* [https://github.com/RedSpider1/concurrent](https://github.com/RedSpider1/concurrent)
* [https://github.com/javagrowing/JGrowing](https://github.com/javagrowing/JGrowing)
* [https://github.com/caison/java-knowledge-mind-map](https://github.com/caison/java-knowledge-mind-map)
* [https://github.com/qinxuewu/docs](https://github.com/qinxuewu/docs)
* [https://github.com/scalad/Note](https://github.com/scalad/Note)
* [https://github.com/stalary/Source-code-analysis](https://github.com/stalary/Source-code-analysis)
* [https://github.com/nibnait/algorithms](https://github.com/nibnait/algorithms)
* [https://github.com/Childe-Mu/java_notes](https://github.com/Childe-Mu/java_notes)
* [https://github.com/Childe-Mu/bio-nio-aio-netty-notes](https://github.com/Childe-Mu/bio-nio-aio-netty-notes)
* [https://github.com/whx123/JavaHome](https://github.com/whx123/JavaHome)

+ [https://github.com/sanshengshui/netty-learning-example](https://github.com/sanshengshui/netty-learning-example)



**Mime-Type/Content-Type/Media-Type**

- `com.google.common.net.MediaType` guava
- `javax.ws.rs.core.MediaType` Jersey框架
- `org.springframework.http.MediaType` spring框架


**HTTP**

- `HttpURLConnection` Java自带API
- `RestTemplate` 默认实现是`HttpURLConnection`，`ForEntity`返回响应码、响应消息体等，`ForObject`只返回消息体
- `WebClient`是`Spring 5.0`开始提供的非阻塞响应式编程的Http工具。
- `Apache HttpComponents` [http://hc.apache.org](http://hc.apache.org)
- `okHttp` [https://github.com/square/okhttp](https://github.com/square/okhttp)
- `Netty` 
- `google-http-java-client` [https://github.com/googleapis/google-http-java-client](https://github.com/googleapis/google-http-java-client)

* [HTTP客户端连接，选择HttpClient还是OkHttp？](https://juejin.im/post/5e156c80f265da5d3c6de72a)




## Maven

+ [Maven详细教程](https://segmentfault.com/a/1190000015077021)

* [http://mvnrepository.com](http://mvnrepository.com)
* [https://www.webjars.org](https://www.webjars.org)

+ maven-jar-plugin 默认的打包插件，用来打普通的project JAR包；
+ maven-shade-plugin 用来打可执行JAR包，也就是所谓的fat JAR包；
+ maven-assembly-plugin 支持自定义的打包结构，也可以定制依赖项等。


**Maven镜像**

* [maven镜像配置文件](/files/settings.xml)
* [https://maven.aliyun.com/mvn/view](https://maven.aliyun.com/mvn/view)



### Maven私服搭建

* [https://github.com/sonatype](https://github.com/sonatype)
    * [https://help.sonatype.com/repomanager3/download](https://help.sonatype.com/repomanager3/download)
    * [docker 快速搭建maven私服并上传jar包](https://www.cnblogs.com/yscec/p/12898226.html)
    * [Maven部署jar包到远程仓库](https://blog.csdn.net/ThinkWon/article/details/101483769)
    * [在 Docker 搭建 Maven 私有库](https://blog.csdn.net/oschina_40914891/article/details/100187825)
    * [利用 Docker 搭建 Nexus 仓库私服](https://blog.llxbh.xyz/2020/04/26/%E6%97%A5%E5%BF%97-%E5%88%A9%E7%94%A8_Docker_%E6%90%AD%E5%BB%BA_Nexus_%E4%BB%93%E5%BA%93%E7%A7%81%E6%9C%8D)
    * [docker 安装 maven 私有库 nexus3](https://www.cnblogs.com/lovling/p/12498612.html)
* [https://github.com/apache/archiva](https://github.com/apache/archiva)
    * [http://archiva.apache.org](http://archiva.apache.org)
    * [Apache Archiva 私服搭建](https://blog.csdn.net/qianhe_/article/details/99131372)
* [https://github.com/jfrog](https://github.com/jfrog)
    * Artifactory [https://jfrog.com/open-source](https://jfrog.com/open-source)

- 私有仓库maven-pulic代理的远程仓库：
    * jboss [http://repository.jboss.com/maven2](http://repository.jboss.com/maven2)
    * jitpack [https://jitpack.io](https://jitpack.io)
    * jcenter [http://jcenter.bintray.com](http://jcenter.bintray.com)




**打包编译到Docker部署**

- [https://github.com/spotify/docker-maven-plugin](https://github.com/spotify/docker-maven-plugin)
- [https://github.com/spotify/dockerfile-maven](https://github.com/spotify/dockerfile-maven)
- [https://github.com/fabric8io/docker-maven-plugin](https://github.com/fabric8io/docker-maven-plugin)
- [https://github.com/GoogleContainerTools/jib](https://github.com/GoogleContainerTools/jib)
- [https://github.com/lazyboyl/docker-develop-maven-plugin](https://github.com/lazyboyl/docker-develop-maven-plugin)
- [利用Maven打包docker镜像上传docker容器](https://blog.csdn.net/qq_24795205/article/details/106231144)
- [Maven插件构建Docker镜像](https://blog.csdn.net/MyronCham/article/details/106126418)
- [dockerfile-maven-plugin构建Docker镜像](https://zhuanlan.zhihu.com/p/90122357)
- [使用maven插件dockerfile-maven-plugin进行镜像的build和push](https://blog.csdn.net/catoop/article/details/90812876)
- [如何构建SpringBoot应用的Docker镜像](http://jaychang.cn/2019/12/02/%E4%BD%95%E6%9E%84%E5%BB%BASpringBoot%E5%BA%94%E7%94%A8%E7%9A%84Docker%E9%95%9C%E5%83%8F)
- [https://github.com/hariko1991/docker-demo](https://github.com/hariko1991/docker-demo)
- [https://github.com/gaochao-ncp/spring-boot-docker-example](https://github.com/gaochao-ncp/spring-boot-docker-example)



**打包部署到服务器**

+ [https://github.com/mojohaus](https://github.com/mojohaus)
+ [https://github.com/mojohaus/wagon-maven-plugin](https://github.com/mojohaus/wagon-maven-plugin)
+ [https://github.com/apache/tomcat-maven-plugin](https://github.com/apache/tomcat-maven-plugin)
+ [https://mvnrepository.com/artifact/org.apache.tomcat.maven](https://mvnrepository.com/artifact/org.apache.tomcat.maven)
+ [https://github.com/codehaus-cargo](https://github.com/codehaus-cargo)
+ [使用Maven插件wagon-maven-plugin自动化部署](https://blog.csdn.net/qq_37980436/article/details/105812671)
+ [java项目自动部署方案（1）：wagon-maven-plugin](https://dinghuiye.online/article/wagon-maven-plugin-auto-deploy.html)
+ [Jenkins+Maven+GitHub自动部署项目到远程服务器](https://blog.csdn.net/zhaowei5210/article/details/98790621)
+ [idea部署maven项目到远程tomcat](https://blog.csdn.net/Newbie_J/article/details/93332234)
+ [maven远程部署war包到tomcat8服务器](https://blog.csdn.net/qq_23994787/article/details/106161124)
+ [如何利用maven插件部署项目到远程运行环境](https://blog.csdn.net/lushuifa/article/details/106163624)
+ [使用site-maven-plugin在github上搭建公有仓库](http://www.flydean.com/apache-maven-git-repository)




## windows环境变量

```batch
setx /m JAVA_HOME "C:\Program Files\Java\jre1.8.0_171"

setx /m CATALINA_HOME "D:\apache-tomcat-8.5.30"

setx /m CLASSPATH ".;%JAVA_HOME%\lib;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;%CATALINA_HOME%\lib;"

setx /m Path "%PATH%;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;%MAVEN_HOME%\bin;%CATALINA_HOME%\bin;"
```

* [https://github.com/zq99299/java-tutorial](https://github.com/zq99299/java-tutorial)



## 第三方依赖

* [https://github.com/google/guava](https://github.com/google/guava)
* [https://github.com/SpringForAll](https://github.com/SpringForAll)
* [https://github.com/looly/hutool](https://github.com/looly/hutool)
* [https://github.com/houbb/heaven](https://github.com/houbb/heaven)
* [https://github.com/alibaba/easyexcel](https://github.com/alibaba/easyexcel)
* 输出word [https://github.com/Sayi/poi-tl](https://github.com/Sayi/poi-tl)
* [https://github.com/HtmlUnit/htmlunit](https://github.com/HtmlUnit/htmlunit)
* [https://github.com/cglib/cglib](https://github.com/cglib/cglib)
* 对配置内容加密：[https://github.com/ulisesbocchio/jasypt-spring-boot](https://github.com/ulisesbocchio/jasypt-spring-boot)
* 适用于Java8以下的时间替代项目`joda-time`：[https://github.com/JodaOrg](https://github.com/JodaOrg)
* Google加密 [https://github.com/google/tink](https://github.com/google/tink)
* bcprov-jdk15on [https://github.com/bcgit/bc-java](https://github.com/bcgit/bc-java)
* Apache Commons编解码器 [https://github.com/apache/commons-codec](https://github.com/apache/commons-codec)
* Headless Chrome For Java [https://github.com/fanyong920/jvppeteer](https://github.com/fanyong920/jvppeteer)

- Jakarta JSON处理规范，API和兼容的实现：[https://github.com/eclipse-ee4j/jsonp](https://github.com/eclipse-ee4j/jsonp)
- [https://github.com/FasterXML/jackson](https://github.com/FasterXML/jackson)
- [https://github.com/stleary/JSON-java](https://github.com/stleary/JSON-java)
- [https://github.com/google/gson](https://github.com/google/gson)

* jwt [https://github.com/jwtk/jjwt](https://github.com/jwtk/jjwt)
* [https://github.com/auth0/java-jwt](https://github.com/auth0/java-jwt)

+ [https://github.com/rabbitmq](https://github.com/rabbitmq)
+ [https://github.com/reactor](https://github.com/reactor)


- [https://github.com/xuxueli](https://github.com/xuxueli)

* [https://github.com/luxiaoxun/NettyRpc](https://github.com/luxiaoxun/NettyRpc)

- [https://github.com/elastic/elasticsearch](https://github.com/elastic/elasticsearch)

* [Kafka安装及入门](http://jaychang.cn/2020/03/15/afka%E5%AE%89%E8%A3%85%E5%8F%8A%E5%85%A5%E9%97%A8)

+ [https://sourceforge.net/projects/jsch](https://sourceforge.net/projects/jsch)
+ [JSch-用java实现服务器远程操作](https://segmentfault.com/a/1190000019967309)
+ [https://github.com/apache/maven-wagon](https://github.com/apache/maven-wagon)


**Cache**

* [https://github.com/ehcache/ehcache3](https://github.com/ehcache/ehcache3)
    - [http://www.ehcache.org/apidocs](http://www.ehcache.org/apidocs)
    - [Ehcache3配置使用](https://segmentfault.com/a/1190000022502212)
    - [JAVA中使用springBoot和Ehcache3.X无xml配置和xml配置](https://blog.csdn.net/Gentlemike/article/details/80403967)
    - [ehcache之offheap](http://www.luyixian.cn/news_show_332650.aspx)
    - [https://github.com/Terracotta-OSS/offheap-store](https://github.com/Terracotta-OSS/offheap-store)
* [https://github.com/ben-manes/caffeine](https://github.com/ben-manes/caffeine)
* GuavaCache使用示例 [https://github.com/songyaxu/guava-cache](https://github.com/songyaxu/guava-cache)


**Transaction**

* [https://github.com/Dromara](https://github.com/Dromara)
* [https://github.com/codingapi/tx-lcn](https://github.com/codingapi/tx-lcn)
* [https://github.com/seata/seata](https://github.com/seata/seata)
* [https://github.com/changmingxie/tcc-transaction](https://github.com/changmingxie/tcc-transaction)
* [https://github.com/QNJR-GROUP/EasyTransaction](https://github.com/QNJR-GROUP/EasyTransaction)
* [https://github.com/liuyangming/ByteTCC](https://github.com/liuyangming/ByteTCC)
* [https://github.com/wchswchs/Hulk](https://github.com/wchswchs/Hulk)



**延迟队列**

* [https://github.com/search?l=Java&o=desc&q=delayqueue&s=updated&type=Repositories](https://github.com/search?l=Java&o=desc&q=delayqueue&s=updated&type=Repositories)
* [https://github.com/dongzhuo0228/delayqueuetest](https://github.com/dongzhuo0228/delayqueuetest)
* [https://github.com/qjm201000/concurrent_delayqueue](https://github.com/qjm201000/concurrent_delayqueue)


**工具**

* [utf8+bom编码格式 java 文件 转换为 utf8 格式文件](https://github.com/andotorg/utf8bom-to-utf8)
* [从GBK到UTF8的某些路径中的文件编码转换](https://github.com/downgoon/gbk2utf8)


**地区数据**

* [https://github.com/topics/area](https://github.com/topics/area)
* [Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)
* [district](https://github.com/eduosi/district)
* [china_regions](https://github.com/wecatch/china_regions)



**文档**

* [https://github.com/springfox/springfox](https://github.com/springfox/springfox)
* [https://github.com/SpringForAll/spring-boot-starter-swagger](https://github.com/SpringForAll/spring-boot-starter-swagger)
* [https://github.com/Swagger2Markup/swagger2markup](https://github.com/Swagger2Markup/swagger2markup)
* [https://github.com/caspar-chen/swagger-ui-layer](https://github.com/caspar-chen/swagger-ui-layer)
* [https://github.com/xiaoymin/swagger-bootstrap-ui](https://github.com/xiaoymin/swagger-bootstrap-ui)

+ [https://github.com/spring-projects/spring-restdocs](https://github.com/spring-projects/spring-restdocs)
+ [https://github.com/YeDaxia/JApiDocs](https://github.com/YeDaxia/JApiDocs)


**测试**

* [https://github.com/junit-team/junit4](https://github.com/junit-team/junit4)
* [https://github.com/houbb/junitperf](https://github.com/houbb/junitperf)





## Dubbo

* [http://zookeeper.apache.org](http://zookeeper.apache.org) 下载带`bin`的压缩包，否则需要`maven`安装依赖
[下载地址镜像](/Other/README.md#通用镜像)
* [https://github.com/apache/dubbo](https://github.com/apache/dubbo)
* [https://github.com/apache/dubbo-spring-boot-project](https://github.com/apache/dubbo-spring-boot-project)
* [https://github.com/apache/dubbo-admin](https://github.com/apache/dubbo-admin)

> 官网`2.7.0`及以上由Apache（org.apache.dubbo）维护，旧版本还是由阿里巴巴团队（com.alibaba.dubbo）维护

* [dubbo客户端版本选择](https://blog.51cto.com/10759919/2405665)
* [Dubbo 一篇文章就够了：从入门到实战](https://segmentfault.com/a/1190000019896723)
* [Dubbo版本升级](https://www.cnblogs.com/TechSnail/p/11936862.html)
* [干货 | 聊聊携程升级Dubbo的踩坑历程](https://cloud.tencent.com/developer/article/1500148)
* [dubbo2.5.3升级到2.7.3记录](https://blog.csdn.net/chang_li/article/details/103266059)
* [dubbo2.5.3升级到2.7.3](https://blog.csdn.net/u013338798/article/details/100673697)
* [dubbox升级至apache-dubbo-2.7.2的兼容方案](https://blog.csdn.net/qq_29116427/article/details/100621126)
* [springboot整合dubbo2.7.x版本](https://blog.csdn.net/ycf921244819/article/details/103474394)
* [dubbo2.7.5整合spirngMVC入门demo（Apache）](https://blog.csdn.net/qq_45521013/article/details/103826507)




## 各种好的项目

* [MyBatis-Plus整合项目](http://mp.baomidou.com/guide/#%E4%BC%98%E7%A7%80%E6%A1%88%E4%BE%8B)
* [king-admin是一个基础权限管理后台，前端：angularJs+bootstrap+gulp，后端：spring-boot+mybatis-plus(分java版和kotlin版)](https://github.com/oukingtim/king-admin)
* [Guns基于SpringBoot,致力于做更简洁的后台管理系统,完美整合springmvc + shiro + mybatis-plus + beetl + flowable!](https://gitee.com/naan1993/guns)
* [springboot-plus一个基于SpringBoot 2的管理后台系统](https://gitee.com/xiandafu/springboot-plus)
* [SpringWind-SSM架构 mybatis-plus kisso 实战项目](https://gitee.com/baomidou/SpringWind)
* [AdminLTE+Spring+Shiro开发的后台基础系统](https://gitee.com/zhougaojun/KangarooAdmin)
* [iBase4J-JAVA分布式快速开发平台](https://gitee.com/iBase4J/iBase4J)
* [framework-后台管理框架，采用springboot+springsecurity+mybatis-plus+bootstrap](https://gitee.com/sunhan521/framework)
* [https://gitee.com/Morning_/Morning](https://gitee.com/Morning_/Morning)
* [https://gitee.com/shuzheng/zheng](https://gitee.com/shuzheng/zheng)
* [基础权限开发框架 BMS = Spring boot + Mybatis plus + Shiro](https://gitee.com/eric.xu/BMS)
* [spring-shiro-training=基于Maven构建的springmvc、spring、mybatis-plus、shiro、log4j2、easyui简单实用的权限脚手架。](https://gitee.com/wangzhixuan/spring-shiro-training)
* [center=使用kisso、mybatis-plus做的系统管理中心系统](https://gitee.com/willenfoo/center)
* [skeleton=springboot+mybatis+Shiro 脚手架](https://github.com/fengchangsheng/skeleton)
* [springboot_mybatisplus=springboot+mybatisplus+springmvc+jsp+shiro+redis+jqgrid美女图片爬虫](https://gitee.com/z77z/springboot_mybatisplus)
* [https://gitee.com/blind/maple](https://gitee.com/blind/maple)
* [JEEWEB Mybatis版本是一款基于SpringMVC+Spring+Mybatis+Mybatis Plus的JAVA WEB敏捷开发系统](https://gitee.com/dataact/jeeweb-mybatis)
* [https://gitee.com/fumiao/youngcms](https://gitee.com/fumiao/youngcms)
* [JeeFast 基于SpringBoot+Mybatis-Plus+Bootstrap+Vue](https://gitee.com/theodo/jeefast)
* [bing-upms=Spring Boot + Mybatis-Plus + Apache Shiro + FreeMarker 制作的通用权限管理](https://gitee.com/xiaobingby/bing-upms)
* [slife=Spring Boot+MySQL+Freemark+SiteMesh+Shiro+Bootstrap+mybatis+mybatisPlus+redis+Activiti](https://gitee.com/jamen/slife)
* [pig 基于Spring Cloud、oAuth2.0开发基于Vue前后分离的开发平台，支持账号、短信、SSO等多种登录](https://gitee.com/log4j/pig)
* [MSFM权限管理系统是基于springBoot开发的一套轻量级的系统脚手架](https://gitee.com/wanglingxiao/mysiteforme)
* [https://github.com/watchdog-framework/watchdog-framework](https://github.com/watchdog-framework/watchdog-framework)
* [iartisan-admin-template=spring-boot+shiro+sitemesh+mybatis-plus+layui+layuiCMS2.0](https://gitee.com/iartisan/iartisan-admin-template)
* [renren-security=采用Spring、MyBatis、Shiro框架，开发的一套权限系统](https://github.com/claer-ding/renren-security)
* [renren-fast-vue](https://github.com/daxiongYang/renren-fast-vue)
* [hsweb3-demo](https://github.com/hs-web/hsweb3-demo)
* [qiqiim=springmvc mybatis netty4在线IM，可用于公司内网、外网通讯，客服系统等](https://gitee.com/qiqiim/qiqiim-server)
* [LayIM=基于HTML5 WebSocket的一款IM即时通讯软件](https://github.com/scalad/LayIM)
* [https://github.com/Exrick/x-boot](https://github.com/Exrick/x-boot)
* [https://github.com/wuyouzhuguli/FEBS-Shiro](https://github.com/wuyouzhuguli/FEBS-Shiro)
* [https://github.com/wuyouzhuguli/FEBS-Cloud](https://github.com/wuyouzhuguli/FEBS-Cloud)
* [https://gitee.com/stylefeng/guns](https://gitee.com/stylefeng/guns)
* [mall-swarm是一套微服务商城系统](https://github.com/macrozheng/mall-swarm)
* [mall项目是一套电商系统，包括前台商城系统及后台管理系统](https://github.com/macrozheng/mall)
* [基于SpringBoot2.x、SpringCloud并采用前后端分离的多租户系统架构微服务开发平台](https://gitee.com/ibyte/M-Pass)
* [Hasor是一套基于 Java 语言的开发框架](https://github.com/zycgit/hasor)
* 行为验证码 [https://github.com/anji-plus/captcha](https://github.com/anji-plus/captcha)
* EL-ADMIN 后台管理系统 [https://github.com/elunez/eladmin](https://github.com/elunez/eladmin)
* SpringBlade SaaS多租户微服务开发平台 [https://github.com/chillzhuang/SpringBlade](https://github.com/chillzhuang/SpringBlade)
* 基于springboot的一款纯净脚手架 [https://github.com/fuce1314/Springboot_v2](https://github.com/fuce1314/Springboot_v2)




## JavaFX


* [JavaFX最新消息](http://fxexperience.com)
* [使用Java 9的模块化来构建零依赖的原生应用](https://www.tuicool.com/articles/eiu2EnR)
* [JavaFX、OSGi、Eclipse开源资料](http://www.javafxchina.net/main)
* [SceneBuilder](http://gluonhq.com/products/scene-builder)
* [SceneBuilder例子](http://gluonhq.com/developers/samples)
* [JavaFX 8 教程 - 第七部分：部署](http://code.makery.ch/library/javafx-8-tutorial/zh-cn/part7)
* [Gluon已经支持在IntelliJ IDEA中跨平台开发JavaFX](http://www.wingmei.cn/2018/04/18/gluon%E5%B7%B2%E7%BB%8F%E6%94%AF%E6%8C%81%E5%9C%A8intellij-idea%E4%B8%AD%E8%B7%A8%E5%B9%B3%E5%8F%B0%E5%BC%80%E5%8F%91javafx%E4%BA%86)
* [IntelliJ IDEA 中配置 SceneBuilder](https://yangfangs.github.io/2017/07/28/JavaFx-SceneBuilder/#intellij-idea-%E4%B8%AD%E9%85%8D%E7%BD%AE-scenebuilder)
* [JavaFx+Springboot+Maven 开发打包教程](https://segmentfault.com/a/1190000014037443)
* [JavaFX 实现截图](http://www.private-blog.com/2018/01/29/javafx-%E5%AE%9E%E7%8E%B0webview%E6%88%AA%E5%9B%BE)
* Java多线程下载GUI [https://github.com/fengxiaocan/Downloader](https://github.com/fengxiaocan/Downloader)
* [https://github.com/proxyee-down-org/proxyee-down](https://github.com/proxyee-down-org/proxyee-down)
