# Spring

[[toc]]


## Flag

> [是时候给大家介绍 Spring Boot/Cloud 背后豪华的研发团队了](https://github.com/ityouknow/ityouknow.github.io/blob/master/_posts/2019/releases/2019-01-03-spring-pivotal.md)

+ [https://github.com/topics/spring](https://github.com/topics/spring)
+ [https://github.com/topics/spring-boot](https://github.com/topics/spring-boot)
+ [https://github.com/topics/spring-cloud](https://github.com/topics/spring-cloud)


* [https://github.com/spring-projects](https://github.com/spring-projects)
    * [https://spring.io/projects](https://spring.io/projects)
* [https://github.com/spring-projects-experimental](https://github.com/spring-projects-experimental)
* [https://github.com/spring-guides](https://github.com/spring-guides)
* [https://github.com/fmarchioni/masterspringboot](https://github.com/fmarchioni/masterspringboot)
* 启动分析器 [https://github.com/linyimin0812/spring-startup-analyzer](https://github.com/linyimin0812/spring-startup-analyzer)
* 配置中心对比 [https://github.com/hxz393/ConfigCenterComparer](https://github.com/hxz393/ConfigCenterComparer)


- [https://github.com/wuyouzhuguli/SpringAll](https://github.com/wuyouzhuguli/SpringAll)
    - [http://www.spring4all.com](http://www.spring4all.com)
- [https://github.com/mingyang66/spring-parent](https://github.com/mingyang66/spring-parent)
- [https://github.com/xuchengsheng/spring-reading](https://github.com/xuchengsheng/spring-reading)
- Spring源码阅读 [https://github.com/seaswalker/spring-analysis](https://github.com/seaswalker/spring-analysis)
- [https://github.com/DerekYRC/mini-spring](https://github.com/DerekYRC/mini-spring)
- Spring 实战第五版中文翻译 [https://github.com/PotoYang/spring-in-action-v5-translate](https://github.com/PotoYang/spring-in-action-v5-translate)
- [https://github.com/dunwu/spring-tutorial](https://github.com/dunwu/spring-tutorial)
- [https://github.com/piomin](https://github.com/piomin)


* [spring boot项目，需要写一个接口吗？](https://www.cnblogs.com/pickupmemories/p/16570511.html)
* [SpringCloud和Dubbo](https://www.jianshu.com/p/9fa24196d2ad)
* [SpringCache自定义过期时间及自动刷新](https://www.cnblogs.com/top-housekeeper/p/11980973.html)
* [Spring揭秘学习笔记](https://blog.csdn.net/qq_34626094/category_11731455.html)



**webmvc与webflux**

<details>
<summary><b>展开查看示例结构</b></summary>
<img src="/images/spring-web-client.png" alt>
</details>

- webmvc是servlet stack based，基于同步阻塞的IO模型
    - 在`org.springframework.web`包下
    - `artifactId`：`spring-boot-starter-web`
    - `RestTemplate` 阻塞式客户端，默认使用`HttpURLConnection`实现
- webflux是reactive stack based，一个完全的reactive并且非阻塞的web框架，API公开了`Reactor Flux`和`Mono`类型
    - 在`org.springframework.web.reactive`包下
    - `artifactId`：`spring-boot-starter-webflux`
    - `WebClient` 非阻塞式客户端，默认使用`Reactor Netty`实现

+ [Spring WebFlux快速上手](https://blog.csdn.net/get_set/article/details/79480233)

* [Spring MVC or WebFlux?](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#webflux-framework-choice)
* [让Spring MVC返回HTML类型的视图](https://juejin.cn/post/6844903747089334285)


**注解生成Bean默认命名规则**

> 在使用`@Component`、`@Repository`、`@Service`、`@Controller`等注解创建bean时，如果不指定bean名称，默认类名的首字母小写

> 如果类名前两个及以上字母都是大写，那么bean名称与类名一样，如： RBACAuthorityService - RBACAuthorityService

* [修改Spring注解生成Bean时候的命名方式](https://github.com/cznno/doc/blob/master/doc/%E4%BF%AE%E6%94%B9Spring%E6%B3%A8%E8%A7%A3%E7%94%9F%E6%88%90Bean%E6%97%B6%E5%80%99%E7%9A%84%E5%91%BD%E5%90%8D%E6%96%B9%E5%BC%8F.md)



**启动错误**

> `NoClassDefFoundError: Could not initialize class org.springframework.beans.factory.BeanCreationException`
>
> 可能是内存大小不够，加参数：`-Xms1024M -Xmx2048M -XX:MetaspaceSize=512m -XX:MaxMetaspaceSize=2048m -Xss5120k`


## 事务

+ [org.springframework.transaction.annotation.Propagation](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Propagation.html)

* [Spring事务嵌套导致的异常,Transaction rolled back because it has been marked as rollback-only](https://blog.csdn.net/qq_42216791/article/details/105684663)
* [Spring事务嵌套引发的血案---Transaction rolled back because it has been marked as rollback-only](https://blog.csdn.net/f641385712/article/details/80445912)
* [Spring事务方法嵌套引发的异常与问题分析](https://zhuanlan.zhihu.com/p/69215235)
* [Spring事务管理嵌套事务详解 : 同一个类中，一个方法调用另外一个有事务的方法](https://blog.csdn.net/levae1024/article/details/82998386)
* [Spring 事务嵌套无效](https://blog.csdn.net/m0_37701381/article/details/85066711)
* [spring嵌套事务问题](https://blog.csdn.net/qq_32300143/article/details/116162515)


```java
/*
Propagation.REQUIRED	如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。这是默认值。
Propagation.REQUIRES_NEW	创建一个新的事务，如果当前存在事务，则把当前事务挂起。
Propagation.SUPPORTS	如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
Propagation.NOT_SUPPORTED	以非事务方式运行，如果当前存在事务，则把当前事务挂起。
Propagation.NEVER	以非事务方式运行，如果当前存在事务，则抛出异常。
Propagation.MANDATORY	如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。
Propagation.NESTED	如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于Propagation.REQUIRED
*/
// REQUIRES_NEW 与 NESTED 前者是内层异常影响外层，外层不影响内层；后者正好相反，内层加try catch后 异常不影响外层，外层会影响内层
@Transactional(rollbackFor = Exception.class, propagation = Propagation.REQUIRES_NEW)

@Autowired
private TransactionTemplate transactionTemplate;


// 手动管理事务
@Autowired
private DataSourceTransactionManager transactionManager;
/*@Autowired
private PlatformTransactionManager platformTransactionManager;*/
/*@Autowired
private TransactionDefinition transactionDefinition;*/

// 设置事务隔离级别，开启新事务
DefaultTransactionDefinition def = new DefaultTransactionDefinition(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
//def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);

// foreach start

// 获得事务状态
TransactionStatus status = transactionManager.getTransaction(def);
try {
    
} catch (Exception e) {
    if(!TransactionAspectSupport.currentTransactionStatus().isRollbackOnly()){ // 获取当前最大事务
        TransactionAspectSupport.currentTransactionStatus().setRollbackOnly(); // 标记事务回滚
    }
    if(!status.isRollbackOnly()){
        status.setRollbackOnly(); // 标记事务回滚
    }
    // https://www.cnblogs.com/yaohuiqin/p/9486975.html
    transactionManager.rollback(status); // 回滚事务，设置completed为完成状态，清理事务资源
} finally {
    if (status !=null && status.isNewTransaction() && !status.isCompleted() && !status.isRollbackOnly()){
        transactionManager.commit(status); // 如果rollBackOnly状态被设置将回滚，否则执行正常的事务提交操作
    }
}
// foreach end
```




## 依赖注入

- @Autowired
    - Field （属性变量）[Field injection is not recommended（不再推荐使用字段注入）](https://zhuanlan.zhihu.com/p/92395282)
    - 构造器注入适合强制性的注入旨在不变性
    - Setter 注入适合可变性的注入。
- @Resource
- @Inject

* [这几个关于Spring 依赖注入的问题你清楚吗？](https://juejin.im/post/5e3811d26fb9a07ca24f3e55)
* [Field injection is not recommended（Spring IOC不再推荐使用属性注入）](https://segmentfault.com/a/1190000021044999)
* [IDEA 警告 Field injection is not recommended](https://boris1993.github.io/projects/java/coding-tips/idea-warninig-field-injection-is-not-recommended.html)
* [Field injection is not recommended](https://www.jianshu.com/p/7f20176f2a40)
* [@Autowired警告：Field injection is not recommended](https://www.jianshu.com/p/36db3e167958)
* [使用@Autowired注解警告Field injection is not recommended](https://blog.csdn.net/zhangjingao/article/details/81094529)

- [Spring中获取request的几种方法，及其线程安全性分析](https://www.cnblogs.com/kismetv/p/8757260.html)




## Spring Boot

* [https://github.com/dyc87112/SpringBoot-Learning](https://github.com/dyc87112/SpringBoot-Learning)
* [https://github.com/macrozheng/mall-learning](https://github.com/macrozheng/mall-learning)
    * [https://macrozheng.github.io/mall-learning](https://macrozheng.github.io/mall-learning)
* [https://github.com/vector4wang/spring-boot-quick](https://github.com/vector4wang/spring-boot-quick)
* [https://github.com/kanyways/learning-spring](https://github.com/kanyways/learning-spring)
* [https://github.com/gf-huanchupk/SpringBootLearning](https://github.com/gf-huanchupk/SpringBootLearning)
* [https://github.com/lyb-geek/springboot-learning](https://github.com/lyb-geek/springboot-learning)
* [https://github.com/xkcoding/spring-boot-demo](https://github.com/xkcoding/spring-boot-demo)
* [https://github.com/xuwujing/springBoot-study](https://github.com/xuwujing/springBoot-study)
* [https://github.com/houko/SpringBootUnity](https://github.com/houko/SpringBootUnity)
* [https://github.com/hemin1003/spring-boot-study](https://github.com/hemin1003/spring-boot-study)
* [https://github.com/smltq/spring-boot-demo](https://github.com/smltq/spring-boot-demo)
* [https://github.com/liuyueyi/spring-boot-demo](https://github.com/liuyueyi/spring-boot-demo)
* [https://github.com/TianShengBingFeiNiuRen/springboot-util](https://github.com/TianShengBingFeiNiuRen/springboot-util)
* [https://github.com/WinterChenS/springboot-learning-experience](https://github.com/WinterChenS/springboot-learning-experience)
* [https://github.com/jesusfc/springboot3-java17](https://github.com/jesusfc/springboot3-java17)
* 测试 [https://github.com/codecentric/chaos-monkey-spring-boot](https://github.com/codecentric/chaos-monkey-spring-boot)



+ [Springboot 优雅停止服务的几种方法](https://www.cnblogs.com/huangqingshi/p/11370291.html)
+ [SpringBoot系列: 如何优雅停止服务](https://www.cnblogs.com/exmyth/p/13098831.html)
+ [Spring Boot 2.3 新特性优雅停机详解](https://juejin.im/post/5ec1d89de51d454ddf2367ab)

- [Spring Boot 监听 Redis Key 失效事件实现定时任务](https://antoniopeng.com/2020/01/03/springboot/Spring%20Boot%20%E7%9B%91%E5%90%AC%20Redis%20Key%20%E5%A4%B1%E6%95%88%E4%BA%8B%E4%BB%B6%E5%AE%9E%E7%8E%B0%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1)
- [Spring Boot 无侵入式 实现API接口统一JSON格式返回](https://blog.csdn.net/qq_34347620/article/details/102239179)

> 约定优于配置（convention over configuration），也称作按约定编程，是一种软件设计范式，
> 旨在减少软件开发人员需做决定的数量，获得简单的好处，而又不失灵活性。

> 开发人员仅需规定应用中不符合约定的部分，在没有规定配置的地方，采用默认配置，以力求最简配置为核心思想

**有哪些约定**

- Maven的目录结构
    - 默认有`resources`文件夹,存放资源配置文件。`src-main-resources`,`src-main-java`。
    - 默认编译生成的类都在`targe`文件夹下面

- 项目默认的配置文件必须是
    - `application`前缀命名的`yml`文件
    - `application`前缀命名的`properties`文件


### 默认依赖管理

> 使用默认依赖管理的目的是：常用的包依赖可以省去version标签。如下：

```xml
<dependencies>
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-web</artifactId>
   </dependency>
</dependencies>
```

- 方式一

```xml
<parent>
    <!-- spring-boot-starter-parent 是一个特殊的starter，它用来提供相关的Maven默认依赖 -->
    <!--继承spring-boot-dependencies依赖管理，指定了JDK版本，多了编译配置-->
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.2.5.RELEASE</version>
    <relativePath/>
</parent>
```

- 方式二

```xml
<dependencyManagement>
    <dependencies>
        <!--引入spring-boot依赖管理，其中包含多个依赖，如slf4j、logback-->
        <!--要使用property的形式覆盖原始的依赖项（升级依赖版本），则需要在此之前添加-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot-version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```


### 配置方式

* [Spring Boot 加载配置多种方式](https://blog.csdn.net/Happy_cloudlife/article/details/85564667)


**Spring Boot Starter**

* [Spring Boot Starter说明](https://www.jianshu.com/p/bbf439c8a203)

- 需要在`pom.xml`中引入为`starter`的依赖
- 然后在`application.yml`或者`application.properties`中配置，无需在其他任何地方配置（如`xml`、`Bean`）


**Java代码配置Bean**

- 需要在`pom.xml`中引入不为`starter`的依赖
- 创建一个配置类，然后使用注解`@Configuration`在类上，`@bean`配置方法，方法名是相当于`xml`配置的`id`，
返回结果相当于将哪个类注入到bean容器中



**加载自定义xml配置**

- 需要在`pom.xml`中引入不为`starter`的依赖
- 在启动类上使用注解`@ImportResource(locations={"classpath:配置文件路径})`，把自定义的`xml`配置加载进来



**使用注解获取配置文件中的配置**

- `@Value("${配置中的属性名}")`用在Bean的域（属性）上，获取默认配置文件中的属性值
- `@ConfigurationProperties(prefix="配置中的属性名")`用在类名上，获取默认配置文件中的属性值，用`@Resource`引入到其他类

> 必须要让Spring 扫描到该类才能使用，有三种方法：加`@Component`；创建配置类加`@Configuration`，
再加`@EnableConfigurationProperties(类名.class)`或者创建构造器加`@Bean`

- `@PropertySource("classpath:配置文件路径")`用在类名上，获取默认自定义`properties`文件中的属性值，用`@Resource`引入到其他类


## Starters

+ [https://start.aliyun.com](https://start.aliyun.com)

* [https://github.com/mouzt/mzt-biz-log](https://github.com/mouzt/mzt-biz-log)
* [https://github.com/ballcat-projects/ballcat](https://github.com/ballcat-projects/ballcat)


**application starters**

> Spring Boot 所有应用程序级的 Starters

| **Starter 名称**                            	| **Starter 描述**                                                                                        	|
|---------------------------------------------	|---------------------------------------------------------------------------------------------------------	|
| spring-boot-starter                         	| 核心 Starter，包括自动配置、日志及 YAML 支持等                                                          	|
| spring-boot-starter-activemq                	| 集成 Apache ActiveMQ，基于 JMS 的消息队列                                                               	|
| spring-boot-starter-artemis                 	| 集成 Apache Artemis，基于 JMS 的消息队列                                                                	|
| spring-boot-starter-amqp                    	| 集成 Spring AMQP 和 Rabbit MQ 的消息队列                                                                	|
| spring-boot-starter-aop                     	| 集成 Spring AOP 和 AspectJ 面向切面编程                                                                 	|
| spring-boot-starter-batch                   	| 集成 Spring Batch（批处理）                                                                             	|
| spring-boot-starter-cache                   	| 集成 Spring Cache（缓存）                                                                               	|
| spring-boot-starter-data-cassandra          	| 集成 Cassandra（分布式数据库） 和 Spring Data Cassandra                                                 	|
| spring-boot-starter-data-cassandra-reactive 	| 集成 Cassandra（分布式数据库） 和 Spring Data Cassandra Reactive                                        	|
| spring-boot-starter-data-couchbase          	| 集成 Couchbase（文档型数据库） 和 Spring Data Couchbase                                                 	|
| spring-boot-starter-data-couchbase-reactive 	| 集成 Couchbase（文档型数据库） 和 Spring Data Couchbase Reactive                                        	|
| spring-boot-starter-data-elasticsearch      	| 集成 Elasticsearch（搜索引擎）和 Spring Data Elasticsearch                                              	|
| spring-boot-starter-data-solr               	| 集成 Apache Solr（搜索引擎）结合 Spring Data Solr                                                       	|
| spring-boot-starter-data-jdbc               	| 集成 Spring Data JDBC                                                                                   	|
| spring-boot-starter-data-jpa                	| 集成 Spring Data JPA 结合 Hibernate                                                                     	|
| spring-boot-starter-data-ldap               	| 集成 Spring Data LDAP                                                                                   	|
| spring-boot-starter-data-mongodb            	| 集成 MongoDB（文档型数据库）和 Spring Data MongoDB                                                      	|
| spring-boot-starter-data-mongodb-reactive   	| 集成 MongoDB（文档型数据库）和 Spring Data MongoDB Reactive                                             	|
| spring-boot-starter-data-neo4j              	| 集成 Neo4j（图形数据库）和 Spring Data Neo4j                                                            	|
| spring-boot-starter-data-r2dbc              	| 集成 Spring Data R2DBC                                                                                  	|
| spring-boot-starter-data-redis              	| 集成 Redis（内存数据库）结合 Spring Data Redis 和  Lettuce 客户端                                       	|
| spring-boot-starter-data-redis-reactive     	| 集成 Redis（内存数据库）结合 Spring Data Redis reactive 和 Lettuce 客户端                               	|
| spring-boot-starter-data-rest               	| 集成 Spring Data REST 暴露 Spring Data repositories 输出 REST 资源                                      	|
| spring-boot-starter-thymeleaf               	| 集成 Thymeleaf 视图构建 MVC web 应用                                                                    	|
| spring-boot-starter-freemarker              	| 集成 FreeMarker 视图构建 MVC web 应用                                                                   	|
| spring-boot-starter-groovy-templates        	| 集成 Groovy 模板视图构建 MVC web 应用                                                                   	|
| spring-boot-starter-hateoas                 	| 集成 Spring MVC 和 Spring HATEOAS 构建超媒体 RESTful Web 应用程序                                       	|
| spring-boot-starter-integration             	| 集成 Spring Integration                                                                                 	|
| spring-boot-starter-jdbc                    	| 集成 JDBC 结合 HikariCP 连接池                                                                          	|
| spring-boot-starter-jersey                  	| 集成 JAX-RS 和 Jersey 构建 RESTful web 应用，是 spring-boot-starter-web 的一个替代 Starter              	|
| spring-boot-starter-jooq                    	| 集成 jOOQ 访问 SQL 数据库，是 spring-boot-starter-data-jpa 或者 spring-boot-starter-jdbc 的替代 Starter 	|
| spring-boot-starter-json                    	| 用于读写 JSON                                                                                           	|
| spring-boot-starter-jta-atomikos            	| 集成 Atomikos 实现  JTA 事务                                                                            	|
| spring-boot-starter-jta-bitronix            	| 集成  Bitronix 实现  JTA 事务（ 从 2.3.0 开始标识为 Deprecated）                                        	|
| spring-boot-starter-mail                    	| 集成 Java Mail 和 Spring 框架的邮件发送功能                                                             	|
| spring-boot-starter-mustache                	| 集成 Mustache 视图构建 web 应用                                                                         	|
| spring-boot-starter-security                	| 集成 Spring Security                                                                                    	|
| spring-boot-starter-oauth2-client           	| 集成 Spring Security’s OAuth2/OpenID 连接客户端功能                                                     	|
| spring-boot-starter-oauth2-resource-server  	| 集成 Spring Security’s OAuth2 资源服务器功能                                                            	|
| spring-boot-starter-quartz                  	| 集成 Quartz 任务调度                                                                                    	|
| spring-boot-starter-rsocket                 	| 构建 RSocket 客户端和服务端                                                                             	|
| spring-boot-starter-test                    	| 集成 JUnit Jupiter, Hamcrest 和 Mockito 测试 Spring Boot 应用和类库                                     	|
| spring-boot-starter-validation              	| 集成 Java Bean Validation 结合 Hibernate Validator                                                      	|
| spring-boot-starter-web                     	| 集成 Spring MVC 构建 RESTful web 应用，使用  Tomcat 作为默认内嵌容器                                    	|
| spring-boot-starter-web-services            	| 集成 Spring Web Services                                                                                	|
| spring-boot-starter-webflux                 	| 集成 Spring Reactive Web 构建 WebFlux 应用                                                              	|
| spring-boot-starter-websocket               	| 集成 Spring WebSocket 构建 WebSocket 应用                                                               	|

* 数据源 [https://github.com/baomidou/dynamic-datasource-spring-boot-starter](https://github.com/baomidou/dynamic-datasource-spring-boot-starter)




**production starters**

> 生产级 Starters 能被用于线上/生产功能，这个意味着和任何技术、任何业务没关系，也不是只有生产才能使用，只是在生产环境使用更能体现它的意义。

| **Starter 名称**              | **Starter 描述**                                                  |
|------------------------------	|-----------------------------------------------------------------	|
| spring-boot-starter-actuator 	| 集成 Spring Boot Actuator，提供生产功能以帮助监控和管理应用程序 	|


**technical starters**

> 技术类 Starters，用于帮助你排除或者替换指定的框架或技术

| **Starter 名称**                      | **Starter 描述**                                                                                              |
|-----------------------------------	|------------------------------------------------------------------------------------------------------------	|
| spring-boot-starter-jetty         	| 集成 Jetty 作为内嵌的 servlet 容器，可用于替代 spring-boot-starter-tomcat                                  	|
| spring-boot-starter-log4j2        	| 集成 Log4j2 日志框架，可用于替代 spring-boot-starter-logging                                               	|
| spring-boot-starter-logging       	| 集成 Logback 日志框架，这个也是默认的日志 Starter                                                          	|
| spring-boot-starter-reactor-netty 	| 集成 Netty 作为内嵌的响应式 HTTP 服务器                                                                    	|
| spring-boot-starter-tomcat        	| 集成 Tomcat 作为内嵌的 servlet 容器，这也是默认的 servlet 容器 starter 被集成 spring-boot-starter-web 里面 	|
| spring-boot-starter-undertow      	| 集成 Undertow 作为内嵌的 servlet 容器，可用于替代 spring-boot-starter-tomcat                               	|






## Spring Cloud

+ [https://github.com/spring-cloud](https://github.com/spring-cloud)
+ [https://github.com/spring-cloud-samples](https://github.com/spring-cloud-samples)
+ [https://github.com/macrozheng/springcloud-learning](https://github.com/macrozheng/springcloud-learning)
+ [https://github.com/dyc87112/SpringCloud-Learning](https://github.com/dyc87112/SpringCloud-Learning)
+ [https://github.com/gf-huanchupk/SpringCloudLearning](https://github.com/gf-huanchupk/SpringCloudLearning)
+ [https://github.com/2227324689/Spring-Cloud-Alibaba-](https://github.com/2227324689/Spring-Cloud-Alibaba-)
+ [https://github.com/SpringCloud](https://github.com/SpringCloud)
+ [https://github.com/venusteam](https://github.com/venusteam)
+ [https://github.com/forezp/SpringCloudLearning](https://github.com/forezp/SpringCloudLearning)
+ [https://github.com/sqshq/piggymetrics](https://github.com/sqshq/piggymetrics)
+ [https://github.com/huaweicloud](https://github.com/huaweicloud)
+ [https://github.com/sofastack](https://github.com/sofastack)
+ [https://github.com/zlt2000/microservices-platform](https://github.com/zlt2000/microservices-platform)
+ [https://github.com/chillzhuang/blade-tool](https://github.com/chillzhuang/blade-tool)
+ [https://gitee.com/smallc](https://gitee.com/smallc)


> 微服务就是单个应用程序拆分成许多个小型服务的一种开发方法

* [SpringCloud组件和概念介绍](https://zhuanlan.zhihu.com/p/72721025)
* [springcloud核心组件介绍](http://muggle.javaboy.org/2019/04/26/springcloud-1)
* [一文读懂SpringCloud与Eureka，Feign，Ribbon，Hystrix，Zuul核心组件间的关系](https://www.jianshu.com/p/31dfb595170c)
* [springcloudの核心组件Eureka、Ribbon、Feign、Hystrix、Zuul](https://juejin.im/post/5d56204a5188252bd409b5cb)
* [Spring Cloud Alibaba与Spring Boot、Spring Cloud之间不得不说的版本关系](http://blog.didispace.com/spring-cloud-alibaba-version)
* [https://www.springcloud.cc](https://www.springcloud.cc)
* [聊聊分布式链路追踪](http://lidawn.github.io/2018/12/26/distribute-tracing)

- [冒着挂科的风险也要给你们看的 Spring Cloud 入门总结](https://juejin.im/post/5de2553e5188256e885f4fa3)

- `bootstrap.yml`（.properties）用来程序引导时执行，应用于更加早期配置信息读取，如可以使用来配置application.yml中使用到参数等

> `bootstrap.yml`是被一个父级的`Spring ApplicationContext`加载的。这个父级的`Spring ApplicationContext`是先加载的，
> 在加载`application.yml`的`ApplicationContext`之前。

-  `application.yml`（.properties) 应用程序特有配置信息，可以用来配置后续各个模块中需使用的公共参数等

* [https://github.com/hashicorp/consul](https://github.com/hashicorp/consul)
    * Consul免费注册中心 [https://portal.cloud.hashicorp.com](https://portal.cloud.hashicorp.com)


| 组件                           	| 作用             	| 替代项目                                                    	| 说明                                                                                                                                                 	|
|--------------------------------	|------------------	|-------------------------------------------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Alibaba Cloud SchedulerX       	| 分布式任务调度   	| elastic-job、xxl-job                                        	| 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务（商业组件）。                       	|
| Alibaba RocketMQ               	|                  	|                                                             	| 一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。                                                       	|
| Alibaba Seata                  	|                  	|                                                             	|                                                                                                                                                      	|
| ElasticSearch+LogStash+Kibana  	| 分布式日志收集   	|                                                             	| logstash（收集）、elasticsearch（存储+搜索）、kibana（展示），我们将这三个组合起来的技术称之为ELK                                                    	|
| Feign                          	| 声明式HTTP客户端 	| Retrofit                                                    	| 基于动态代理机制，根据注解和选择的机器，拼接请求URL地址，发起请求                                                                                    	|
| Netflix Archaius               	| 配置管理         	|                                                             	| 提供动态类型化属性、线程安全配置操作、轮询框架、回调机制等功能。可以实现动态获取配置                                                                 	|
| Netflix Eureka                 	| 服务发现         	| Consul、Zookeeper、Alibaba Nacos                            	| 各个服务启动时，Eureka Client都会将服务注册到Eureka Server，并且Eureka Client还可以反过来从Eureka Server拉取注册表，从而知道其他服务在哪里           	|
| Netflix Hystrix                	| 断路器           	| Resilience4j、Alibaba Sentinel                              	| 提供线程池，不同的服务走不同的线程池，实现了不同服务调用的隔离，避免了服务雪崩的问题                                                                 	|
| Netflix Zuul                   	| API网关          	| Spring Cloud Gateway                                        	| 如果前端、移动端要调用后端系统，统一从Zuul网关进入，由Zuul网关转发请求给对应的服务                                                                   	|
| Ribbon                         	| 负载均衡器       	| Spring Cloud Loadbalancer                                   	| 服务间发起请求的时候，基于Ribbon做负载均衡，从一个服务的多台机器中选择一台                                                                           	|
| Spring Cloud Bus               	| 消息总线         	|                                                             	| 将分布式的节点用轻量的消息代理连接起来。它可以用于广播配置文件的更改或者服务之间的通讯，也可以用于监控                                               	|
| Spring Cloud Cluster           	|                  	|                                                             	| 取代Spring Integration。提供在分布式系统中的集群所需要的基础功能支持，如：选举、集群的状态一致性、全局锁、tokens等常见状态模式的抽象和实现。         	|
| Spring Cloud Config            	| 配置管理         	| Ctrip Apollo、Spring Cloud Consul、Zookeeper、Alibaba Nacos 	| 解决分布式系统的配置管理方案。Server提供配置文件的存储、以接口的形式将配置文件的内容提供出去，Client通过接口获取数据、并依据此数据初始化自己的应用。 	|
| Spring Cloud Connectors        	|                  	|                                                             	| 简化了连接到服务的过程和从云平台获取操作的过程，有很强的扩展性，可以利用Spring Cloud Connectors来构建你自己的云平台。                                	|
| Spring Cloud for Cloud Foundry 	| 开源PaaS云平台   	|                                                             	| 支持多种框架、语言、运行时环境、云平台及应用服务，使开发人员能够在几秒钟内进行应用程序的部署和扩展                                                   	|
| Spring Cloud Security          	| 安全框架         	|                                                             	| 添加安全控制                                                                                                                                         	|
| Spring Cloud Sleuth            	| 分布式链路跟踪   	|                                                             	| 日志收集工具包，封装了Dapper和log-based追踪以及Zipkin和HTrace操作，为SpringCloud应用实现了一种分布式追踪解决方案。                                   	|
| Spring Cloud Starters          	|                  	|                                                             	| Spring Boot式的启动项目，为Spring Cloud提供开箱即用的依赖管理。                                                                                      	|
| Spring Cloud Stream            	| 数据流           	|                                                             	| 创建消息驱动微服务应用的框架，使用spring integration提供与消息代理之间的连接。数据流操作开发包，任务之间通过事件触发                                 	|
| Spring Cloud Task              	| 批量任务         	|                                                             	| 主要解决短命微服务的任务管理，任务调度的工作，比如说某些定时任务晚上就跑一次，或者某项数据分析临时就跑几次。                                         	|




+ [https://github.com/apolloconfig](https://github.com/apolloconfig)
+ [https://github.com/ctripcorp/apollo](https://github.com/ctripcorp/apollo)
+ API网关 [https://github.com/apache/incubator-shenyu](https://github.com/apache/incubator-shenyu)
+ [https://github.com/siaorg/sia-gateway](https://github.com/siaorg/sia-gateway)
+ [https://github.com/mitre/HTTP-Proxy-Servlet](https://github.com/mitre/HTTP-Proxy-Servlet)
+ [https://github.com/mkopylec/charon-spring-boot-starter](https://github.com/mkopylec/charon-spring-boot-starter)
+ 日志收集 [https://github.com/apache/flume](https://github.com/apache/flume)
    + [https://flume.liyifeng.org](https://flume.liyifeng.org)
+ [https://github.com/fayechenlong/plumelog](https://github.com/fayechenlong/plumelog)



* [分布式日志框架ELK入门](https://blog.csdn.net/piantoutongyang/article/details/88811840)
* [SpringCloud实践分享 日志收集Kafka ELK](https://juejin.im/post/5d84a83af265da03ee6a92af)
* [【Sentinel（一）】Sentinel介绍与使用](https://blog.csdn.net/noaman_wgs/article/details/103328793)





## Spring Security

* [认证成功与失败的处理器](https://docs.spring.io/spring-security/site/docs/4.2.7.RELEASE/reference/html/core-web-filters.html#form-login-flow-handling)
* [过滤器列表](https://docs.spring.io/spring-security/site/docs/5.3.1.RELEASE/reference/html5/#servlet-security-filters)
* [标准过滤器别名和顺序](https://docs.spring.io/spring-security/site/docs/5.3.1.RELEASE/reference/html5/#filter-stack)

- [https://github.com/topics/spring-security](https://github.com/topics/spring-security)
- [https://github.com/Snailclimb/spring-security-jwt-guide](https://github.com/Snailclimb/spring-security-jwt-guide)


**拦截器和过滤器区别**

- 拦截器（Interceptor）：依赖于web框架，在实现上,基于Java的反射机制，拦截的是action，说白了拦截的是访问路径
- 过滤器（Filter）：依赖于servlet容器。在实现上，基于函数回调，可以几乎过滤掉所有的东西

> 拦截器与过滤器的执行顺序：过滤前 -> 拦截前 -> action执行 -> 拦截后 -> 过滤后

- 过滤器可以修改request，拦截器只能对action请求起作用
- 过滤器需要在servlet容器中实现，拦截器可以适用于javaEE，javaSE等各种环境
- 拦截器可以调用IOC容器中的各种依赖，而过滤器不能
- 过滤器只能在请求的前后使用，而拦截器可以详细到每个方法




## Spring TaskScheduler

- `Spring Scheduling Tasks` Spring 3.0 版本之后自带的一个定时任务。其所属Spring的资源包为：`spring-context-support`

> 可以将它看成一个轻量级的`Quartz`，而且使用起来比Quartz简单许多。默认单线程串行执行任务，多任务时若某个任务执行时间过长，
> 后续任务会无法及时执行；抛出异常后，同一个任务后续不再触发

- `Spring Quartz` Spring集成整合`Quartz`，主要Bean: `JobDetail`、`Trigger`以及`SchedulerFactory`，`JobDataMap`数据传递

> 需要继承`org.springframework.scheduling.quartz.QuartzJobBean`或者实现`org.quartz.Job`。采用多线程，下一个调度时间到达时，
> 会另起一个线程执行调度，不会发生阻塞问题，但调度过多时可能导致数据处理异常，抛出异常后，同一个任务后续仍然会触发

- `TBSchedule`




## Spring MVC

**redirect重定向**

> redirect重定向可以跳转到任意服务器地址，传递时要对中文编码进行处理

```java
@RequestMapping(value="/test", method = { RequestMethod.POST, RequestMethod.GET })
public ModelAndView testredirect(HttpServletResponse response){
    response.sendRedirect("/index");// 参数可以直接拼接在url上
    return null;
}
@RequestMapping("/testredirect")
public String testredirect(Model model, RedirectAttributes attr) {
	attr.addAttribute("test", "51gjie");// 跳转地址带参数
    attr.addFlashAttribute("u2", "51gjie");// 跳转地址不带参数，只存在body中
	return "redirect:/user/users";// 参数可以直接拼接在url上
}
@RequestMapping(value="/toredirect",method = { RequestMethod.POST, RequestMethod.GET })
public  ModelAndView toredirect(String userName){
    ModelAndView  model = new ModelAndView("/main/index");// 参数可以直接拼接在url上
    // 把userName参数带入到controller的RedirectAttributes中
    model.addObject("userName", userName);
    return model;
}
```


## Spring AOP原理

1. AOP: 其实现的关键就在于 AOP 框架自动创建的 AOP 代理，AOP 代理则可分为静态代理和动态代理两大类
    1. 其中静态代理是指使用 AOP 框架提供的命令进行编译，从而在编译阶段就可生成 AOP 代理类，因此也称为编译时增强；静态代理分为：编译时织入（特殊编译器实现）、类加载时织入（特殊的类加载器实现）。静态代理的代表为AspectJ；
    2. 而动态代理则在运行时借助于 JDK 动态代理、CGLIB 等在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。动态代理分为：JDK动态代理（基于接口来实现）、CGLib（基于类实现）。而动态代理则以Spring AOP为代表。
2. Spring AOP：只支持动态代理，通过两种方式进行实现：
    1. JDK动态代理，通过反射实现，只支持对实现接口的类进行代理
    2. CGLib动态字节码注入方式实现代理。


## JDK动态代理:

JDK中的动态代理是通过反射类Proxy反射机制生成一个实现代理接口的匿名类，在调用具体方法前调用InvocationHandler回调接口实现的，但是JDK中所有要进行动态代理的类必须要实现一个接口，也就是说只能对该类所实现接口中定义的方法进行代理，这在实际编程中有一定的局限性，而且使用反射的效率也不高

## Cglib

cglib动态代理是利用asm开源包，对代理对象类的class文件加载进来，通过修改其字节码生成子类来处理。

动态生成一个要代理的子类，子类重写要代理的类的所有不是final的方法。在子类中采用方法拦截技术拦截所有的父类方法的调用，顺势织入横切逻辑

ASM是一个java字节码操纵框架，它能被用来动态生成类或者增强既有类的功能。ASM 可以直接产生二进制 class 文件，也可以在类被加载入 Java 虚拟机之前动态改变类行为

 

## Lombok原理

1. 定义编译期的注解 `@Retention(RetentionPolicy.SOURCE)`
2. 利用`JSR269 api(Pluggable Annotation Processing API )`编译期的注解处理器 （AbstractProcessor在编译时指定一个processor类来对编译阶段的注解进行干预，Lombok的注解处理器：AnnotationProcessor）
3. 利用`tools.jar`的`javac` api处理`AST`(抽象语法树)，将功能注册进jar包

