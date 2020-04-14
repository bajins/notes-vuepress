# Spring

[[toc]]



## flag

* [https://github.com/spring-projects](https://github.com/spring-projects)
* [SpringCloud和Dubbo](https://www.jianshu.com/p/9fa24196d2ad)


- [https://github.com/wuyouzhuguli/SpringAll](https://github.com/wuyouzhuguli/SpringAll)
- [http://www.spring4all.com](http://www.spring4all.com)



## SpringBoot

* [https://github.com/dyc87112/SpringBoot-Learning](https://github.com/dyc87112/SpringBoot-Learning)
* [https://github.com/macrozheng/mall-learning](https://github.com/macrozheng/mall-learning)
[https://macrozheng.github.io/mall-learning](https://macrozheng.github.io/mall-learning)
* [https://github.com/vector4wang/spring-boot-quick](https://github.com/vector4wang/spring-boot-quick)

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

- `@PropertySource("classpath:配置文件路径")`用在类名上，获取默认自定义`properties`文件中的属性值，用`@Resource`引入到其他类




## Spring Cloud

+ [https://github.com/macrozheng/springcloud-learning](https://github.com/macrozheng/springcloud-learning)
+ [https://github.com/dyc87112/SpringCloud-Learning](https://github.com/dyc87112/SpringCloud-Learning)
+ [https://github.com/SpringCloud](https://github.com/SpringCloud)
+ [https://github.com/venusteam](https://github.com/venusteam)


* [SpringCloud组件和概念介绍](https://zhuanlan.zhihu.com/p/72721025)
* [springcloud核心组件介绍](http://muggle.javaboy.org/2019/04/26/springcloud-1)
* [一文读懂SpringCloud与Eureka，Feign，Ribbon，Hystrix，Zuul核心组件间的关系](https://www.jianshu.com/p/31dfb595170c)
* [springcloudの核心组件Eureka、Ribbon、Feign、Hystrix、Zuul](https://juejin.im/post/5d56204a5188252bd409b5cb)
* [Spring Cloud Alibaba与Spring Boot、Spring Cloud之间不得不说的版本关系](http://blog.didispace.com/spring-cloud-alibaba-version)
* [https://www.springcloud.cc](https://www.springcloud.cc)
* [聊聊分布式链路追踪](http://lidawn.github.io/2018/12/26/distribute-tracing)


- `bootstrap.yml`（.properties）

> 用来程序引导时执行，应用于更加早期配置信息读取，如可以使用来配置application.yml中使用到参数等

> `bootstrap.yml`是被一个父级的`Spring ApplicationContext`加载的。这个父级的`Spring ApplicationContext`是先加载的，
> 在加载`application.yml`的`ApplicationContext`之前。

-  `application.yml`（.properties) 

> 应用程序特有配置信息，可以用来配置后续各个模块中需使用的公共参数等


| 组件                           	| 作用             	| 替代项目                                                    	| 说明                                                                                                                                                 	|
|--------------------------------	|------------------	|-------------------------------------------------------------	|------------------------------------------------------------------------------------------------------------------------------------------------------	|
| Alibaba Cloud SchedulerX       	| 分布式任务调度   	| elastic-job、xxl-job                                        	| 阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务（商业组件）。                       	|
| Alibaba Nacos                  	|                  	|                                                             	| 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。                                                                                     	|
| Alibaba RocketMQ               	|                  	|                                                             	| 一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。                                                       	|
| Alibaba Seata                  	|                  	|                                                             	|                                                                                                                                                      	|
| Alibaba Sentinel               	|                  	|                                                             	| 把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。                                                                     	|
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





+ [https://github.com/ctripcorp/apollo](https://github.com/ctripcorp/apollo)


* [分布式日志框架ELK入门](https://blog.csdn.net/piantoutongyang/article/details/88811840)
* [SpringCloud实践分享 日志收集Kafka ELK](https://juejin.im/post/5d84a83af265da03ee6a92af)

