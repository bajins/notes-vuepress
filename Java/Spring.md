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


