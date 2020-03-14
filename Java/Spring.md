## Spring

[[toc]]



## flag

* [https://github.com/spring-projects](https://github.com/spring-projects)

* [SpringCloud和Dubbo](https://www.jianshu.com/p/9fa24196d2ad)




## SpringBoot依赖管理

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


