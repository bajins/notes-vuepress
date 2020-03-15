## Spring

[[toc]]



## flag

* [https://github.com/spring-projects](https://github.com/spring-projects)

* [SpringCloud和Dubbo](https://www.jianshu.com/p/9fa24196d2ad)




## SpringBoot

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

- 方式一

```xml
<parent>
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

- 然后在`application.yml`或者`application.properties`中配置，无在其他任何地方配置（如`xml`、`Bean`）


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



