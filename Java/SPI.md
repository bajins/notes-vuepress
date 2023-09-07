# SPI

[[toc]]


## Flag

+ [https://github.com/McModLauncher/modlauncher](https://github.com/McModLauncher/modlauncher)
+ [https://github.com/SpongePowered/Mixin](https://github.com/SpongePowered/Mixin)
+ [https://github.com/FabricMC](https://github.com/FabricMC)
    + [Fabric 与Mixin 教程](https://blog.csdn.net/smildwind/article/details/120227376)
+ [https://github.com/MinecraftForge/MinecraftForge](https://github.com/MinecraftForge/MinecraftForge)
+ [https://github.com/Chocohead/OptiFabric](https://github.com/Chocohead/OptiFabric)
    + [https://github.com/sp614x/optifine](https://github.com/sp614x/optifine)
+ [https://github.com/Mojang/brigadier](https://github.com/Mojang/brigadier)
+ [https://github.com/osgi](https://github.com/osgi)
    + OSGI（Open Service Gateway Initiative），是一个由OSGi Alliance发起的以Java为技术平台的动态模块化规范
    + [https://github.com/bndtools/bnd](https://github.com/bndtools/bnd)
+ [https://github.com/eclipse-equinox](https://github.com/eclipse-equinox)
+ Jigsaw Java9 modules
+ 观察者设计模式 [Java设计模式之观察者模式](https://blog.csdn.net/wanggang514260663/article/details/86138144)
+ Spring 实现`ApplicationContextAware`接口获取到指定接口的所有实现


* [https://github.com/Enaium/BullPlugin](https://github.com/Enaium/BullPlugin)
* springboot插件式开发框架 [https://gitee.com/starblues/springboot-plugin-framework-parent](https://gitee.com/starblues/springboot-plugin-framework-parents)



- [从Java SPI机制实现到Dubbo SPI扩展](https://blog.csdn.net/shang_xs/article/details/86560469)
- [从Java SPI机制实现到Spring Boot SPI扩展](https://blog.csdn.net/shang_xs/article/details/86560691)
- [AVA SPI机制详解](https://www.jianshu.com/p/25b3559ecc47)
- [深入理解SPI机制](https://www.jianshu.com/p/3a3edbcd8f24)


**热插拔/热加载/热部署/热更新/HotSwap**

* [https://www.jrebel.com/products/jrebel/download](https://www.jrebel.com/products/jrebel/download)
    * [http://jrebel.cicoding.cn](http://jrebel.cicoding.cn)
    * [http://jrebel.cicoding.cn/guid](http://jrebel.cicoding.cn/guid)
* [https://github.com/spring-projects/spring-loaded](https://github.com/spring-projects/spring-loaded)
* [https://github.com/HotswapProjects](https://github.com/HotswapProjects)
    * [https://github.com/TravaOpenJDK](https://github.com/TravaOpenJDK)
* [https://github.com/dcevm](https://github.com/dcevm)
    * [https://ssw.jku.at/dcevm](https://ssw.jku.at/dcevm)
* [https://github.com/fakereplace](https://github.com/fakereplace)
* [https://github.com/jmarranz/relproxy](https://github.com/jmarranz/relproxy)
* [https://github.com/cm4j](https://github.com/cm4j)


- [https://github.com/dmitry-zhuravlev/hotswap-agent-intellij-plugin#solution](https://github.com/dmitry-zhuravlev/hotswap-agent-intellij-plugin#solution)
- [深入探索 Java 热部署](https://mp.weixin.qq.com/s/ydupBExb2LLhtC2ZuBsInA)
- [java热更新class如何实现？](https://segmentfault.com/q/1010000041393137)
- [Java的类加载机制及热部署的原理](https://blog.csdn.net/qq_36434742/article/details/117227309)
- [JAVA热部署，通过agent进行代码增量热替换](https://www.cnblogs.com/zyl2016/p/13666945.html)
- [Java 调试技术 JPDA 架构解读](https://blog.csdn.net/java_dazhuzhu/article/details/119575060)




## 什么是 SPI？

SPI 全称为（Service Provider Interface），字面意思为服务提供者接口，是**JDK 内置的一种服务提供发现机制**。
这一机制为很多框架的扩展提供了可能，比如在 Dubbo、JDBC、Spring Boot 中都使用到了 SPI 机制。
说白了就是提供给“服务提供厂商”或者“插件开发者”使用的接口

SPI 是一种动态发现替换机制，例如我们在学习 Java Web 的时候连接数据库使用的 java.sql.Driver 接口，可以根据不同的驱动，
连接不同的数据库，如常用的 MySQL 或者 Oracle 数据库,，我们在使用 JDBC 连接数据库的时候首先需要的就是连接驱动：

```java
Class.forName("com.mysql.jdbc.Driver")
```

加载 MySQL 驱动后，就会 执行其中的静态代码，把 Driver 注册到 DriverManager 中那么通过数据库的 url、用户名、密码，
我们就可以成功连接到你的 MySQL 数据库并可以进行相应的操作，如果你要更换成 Oracle 数据库，那么就需要更换对应的驱动，
下面是 JDBC 连接数据库的一个步骤，帮助大家回忆：

```java
//声明数据库驱动，数据源的 url，用于登录数据库的账户和密码（将其他功能封装成方法的时候方便使用）
String driver = "数据库驱动名称"；
String url = "数据库连接地址"String user = "用来连接数据库的用户名"；
String pwd = "用来连接数据库的密码"；
//加载数据库驱动  
Class.forName(driver);
//根据 url 创建数据库连接对象 Connection 
Connection con = DriverManager.getConnection(url,user,pwd);
//用数据库连接对象创建 Statement 对象(或 PrepareStatement)
Statement s = con.createStatement();
//或
PrepareStatement ps = con.PrepareStatement(sql);
//做数据库的增删改查工作
ResultSet rs = ps.executeQuery();
//关闭结果集对象 Resultset，statement 对象，connection 对象，
rs.close();
s.close();
con.close();
//各个步骤的异常处理
```

结合上面的代码和下面的图片来简单分析一下。

我们在使用 MySQL 的数据库时，需要导入一个 MySQL 的连接驱动包，打开这个驱动包，你会发现在下图的目录中有一个文件，
`Class.forName(driver)` 它会去找到这个 com.mysql.jdbc.Driver 的类，然后用 DriverManager 加载这个类，
然后再去使用这个类中的方法，例如 `con.PrepareStatement(sql);` 就是使用的 com.mysql.jdbc.Driver 这个类中的方法，
同理如果你将驱动换成 Oracle，那么 DriverManager 就会得到 Oracle 的连接对象，那么 `con.PrepareStatement(sql);` 
调用的就是 Oracle 对应驱动中的方法，也就是说，如果我们将数据库换成 Orale，理论上，上面的操作数据库的代码是不需要变动的，
只需要更换驱动、url 和账号密码，这部分我们后面都是以配置文件的形式写入，所以很好的将代码和数据库解耦了。

下图是我在网上找到图片：

![来源于博客员作者：架构之路](https://images.gitbook.cn/b15400e0-69bd-11eb-8f82-1d786eda1f74)

如果你还是不能很好的理解，没有关系，接下来，我们就慢慢剖析这个 SPI。




## JDK 中的 SPI



### 实例以及测试

我们先从 JDK 开始，通过一个很简单的例子来看下它是怎么用的。

这是例子的代码结构：

![在这里插入图片描述](https://images.gitbook.cn/5d9e7d50-6b47-11eb-b964-590e861bb8fd)

首先，我们需要定义一个接口 SPIService。

这个接口只有一个打印的方法：

```java
public interfaceSPIService {
    voidprint();
}
```

然后我们再定义一个实现类，只做打印输出：

```java
public classSPIServiceImplimplementsSPIService{
    publicvoidprint(){
        System.out.println("print..............");
    }
}
```

然后我们需要在 resources 下创建文件夹：META-INF/services
然后在 services 文件夹下创建文件，文件名就是服务接口的全限定类名：

![在这里插入图片描述](https://images.gitbook.cn/de1d1820-6b4b-11eb-a8aa-992450a0658d)

文件的内容就是该接口的实现类的全限定类名。

文件内容：

```java
com.spi.service.impl.SPIServiceImpl
```

然后我们就可以通过 ServiceLoader.load 方法拿到实现类的实例，并调用它的方法。

我们在启动类中测试：

```java
package com.spi;

import com.spi.service.SPIService;
import java.util.Iterator;
import java.util.ServiceLoader;

publicclassSPIApplication{
    publicstaticvoidmain(String[] args){
        //加载类
        ServiceLoader<SPIService> load = ServiceLoader.load(SPIService.class);
        Iterator<SPIService> iterator = load.iterator();
        while (iterator.hasNext()){
            //获取类的实例
            SPIService service = iterator.next();
            service.print();
        }
    }
}
```

运行结果：

![在这里插入图片描述](https://images.gitbook.cn/ae4b5070-6b4c-11eb-9226-31bcf945eb52)



### 源码分析

首先，我们先来了解下 ServiceLoader，看看它的类结构：

```java
public finalclassServiceLoader<S> implementsIterable<S>{
    //配置文件的路径privatestaticfinal String PREFIX = "META-INF/services/";
    //加载的服务类或接口privatefinal Class<S> service;
    //已加载的服务类集合private LinkedHashMap<String,S> providers = new LinkedHashMap<>();
    //类加载器privatefinal ClassLoader loader;
    //内部类，真正加载服务类private LazyIterator lookupIterator;
}
```

当我们调用 load 方法时，并没有真正的去加载和查找服务类。而是调用了 ServiceLoader 的构造方法，
在这里最重要的是实例化了内部类 LazyIterator，ServiceLoader 才是接下来的主角：

```java
private ServiceLoader(Class<S> svc, ClassLoadercl) {
    //要加载的接口
    service = Objects.requireNonNull(svc, "Service interface cannot be null");
    //类加载器
    loader = (cl == null) ? ClassLoader.getSystemClassLoader() : cl;
    //访问控制器
    acc = (System.getSecurityManager() != null) ? AccessController.getContext() : null;
    //先清空
    providers.clear();
    //实例化内部类 
    LazyIterator lookupIterator = new LazyIterator(service, loader);
}
```

查找实现类和创建实现类的过程，都在 LazyIterator 完成。当我们调用 iterator.hasNext 和 iterator.next 方法的时候，
实际上调用的都是 LazyIterator 的相应方法：

```java
public Iterator<S> iterator() {

    returnnew Iterator<S>() {

        publicbooleanhasNext(){
            return lookupIterator.hasNext();
        }
        public S next(){
            return lookupIterator.next();
        }
        .......
    };
}
```

因此，我们重点关注 `lookupIterator.hasNext()` 方法，它最终会调用到 `hasNextService`，在这里返回实现类名称：

```java
private classLazyIteratorimplementsIterator<S>{
    Class<S> service;
    ClassLoader loader;
    Enumeration<URL> configs = null;
    Iterator<String> pending = null;
    String nextName = null;    
    privatebooleanhasNextService(){
        // 第二次调用的时候，已经解析完成了，直接返回
        if (nextName != null) {
            returntrue;
        }
        if (configs == null) {
            // META-INF/services/ 加上接口的全限定类名，就是文件服务类的文件
            // META-INF/services/com.viewscenes.netsupervisor.spi.SPIService
            String fullName = PREFIX + service.getName();
            //将文件路径转成 URL 对象
            configs = loader.getResources(fullName);
        }
        while ((pending == null) || !pending.hasNext()) {
            //解析 URL 文件对象，读取内容，最后返回
            pending = parse(service, configs.nextElement());
        }
        //拿到第一个实现类的类名
        nextName = pending.next();
        returntrue;
    }
}
```

然后当我们调用 `next()` 方法的时候，调用到 `lookupIterator.nextService`，它通过反射的方式，创建实现类的实例并返回：

```java
private S nextService() {
    //全限定类名
    String cn = nextName;
    nextName = null;
    //创建类的 Class 对象
    Class<?> c = Class.forName(cn, false, loader);
    //通过 newInstance 实例化
    S p = service.cast(c.newInstance());
    //放入集合，返回实例
    providers.put(cn, p);
    return p; 
}
```

到这为止，已经获取到了类的实例，这就是 SPI 机制的一个内部原理。




## SPI 如何实现代码的解耦？

其实在前面提到 JDBC 的时候已经大致了解了 SPI 解耦，那么我们就再结合前面的实例，用通俗的语言概述一下吧。

我们可以通过下面这个简单的流程图来进一步理解 SPI 是如何解耦和扩展的。

首先需要定义一个标准化的服务接口，例如上面的实例 SPIService，里面有一些服务例如 print，然后实现这个接口，
我们暂定它为实现类 A（SPIServiceImpl），它实现的 print 方法里面可以自定义实现内容，如果现在要求说要再增加一种打印的方式，
但是保留之前的 print 的打印方式，那么我们就可以再定义一个实现类 B 去实现这个标准化的服务接口，如果后面再增加新的打印方式也一样，
直接加，或者某一种不需要了，直接去掉即可。

那么由此可见，它是将标准的服务接口与服务提供方实现类进行解耦的，我们可以思考一下，它进行扩展是非常方便的，只需要实现标准服务接口，
然后在 `META-INF/services` 对应的文件中添加该实现类的全限定类名，然后在实现类的方法中填充实现就可以了。

但如果你要是想修改标准服务接口的方法定义，那么就比较麻烦了，只要是实现这个接口的类都需要改，也就是软件设计原则提到的**开闭原则**，
因此我们需要一开始就设计好标准服务接口的内容，保证软件系统的稳定性和延续性。

![在这里插入图片描述](https://images.gitbook.cn/dd2c5030-7185-11eb-b964-590e861bb8fd)



## SPI 适合什么场景下使用？

比较常见的例子：

1. 数据库驱动加载接口实现类的加载：JDBC 加载不同类型数据库的驱动。
2. 日志门面接口实现类加载：SLF4J 加载不同提供商的日志实现类。
3. Spring：Spring 中大量使用了 SPI，比如：对 servlet3.0 规范对 ServletContainerInitializer 的实现、
自动类型转换 Type Conversion SPI（Converter SPI、Formatter SPI）等。
4. Spring Boot 的自动配置：Spring Boot 的 Web 应用都能正常运行，Spring Boot 正是依靠自动配置来完成，
自动配置就是依靠 SpringFactoriesLoader 来加载的。
5. Dubbo：Dubbo 中也大量使用 SPI 的方式实现框架的扩展，不过它对 Java 提供的原生 SPI 做了封装，允许用户扩展实现 Filter 接口。

概括地说，适用于：**调用者根据实际使用需要，启用、扩展、或者替换方案（框架）的实现策略**。

很多地方写的是替换框架，但是我在这里改成了方案，更方便理解（如果这里有一些争议的话，欢迎大家在评论区留言），
实际上我们可以把每一个实现类都叫做一种方案，例如我们前面提到的 SPIService 的实现类 A 和 B，就是对 print 这个方法的两种方案，
SLF4J 加载不同提供商的日志实现类实际上也是加载不同的日志方案，因此实际上如果我们想在自己的项目中运用到 SPI，
那么它最好的使用就是对某一个事件不同方案的处理，例如给公司员工计算月/年薪资（里面包含了绩效、KPI、考勤、奖金等等），
公司针对不同的层级或者区域的员工有不同的方案，这个例子的事件就是薪资计算，不管你什么类型什么等级的员工，
计算薪资的总和都是这几项加起来的结果，不同的是每一项的根据不同的实现方案计算内容有一定的差别。



## 使用 SPI 的优势和劣势在哪里？

**优点：**

不用多说，优势就是实现解耦，使得第三方服务模块的装配控制的逻辑与调用者的业务代码分离，而不是耦合在一起。
应用程序可以根据实际业务情况启用框架扩展或替换框架组件，或者调整不同的方案。**满足软件设计的开闭原则**。

**缺点：**

1. 虽然 ServiceLoader 也算是使用的延迟加载，**但是基本只能通过遍历全部获取**，也就是接口的实现类全部加载并实例化一遍，
如果你并不想用某些实现类，它也被加载并实例化了，这就造成了浪费。

2. **获取某个实现类的方式不够灵活**，只能通过 Iterator 形式获取，不能根据某个参数来获取对应的实现类。

一般我们在实际项目开发的时候，会使用枚举来确定不同方案，然后每个方案都有一个 getSchemeId 的方法用于返回这个方案对应的 ID，
通过这个 id 去筛选当前需要的方案。

小例子：
```java
//动态加载 SPIService 的所有方案实现类
List<SPIService> services = SpiServiceLoader.getService(SPIService.class);
for (SPIService service: services) {
    //获取当前这个人对应方案的实现类
    if (Objects.equals(service.getSchemeId(), person.getSchemeId())) {
        //使用这个方案的实现类
        service.print();
        break;
    }
}
```

这个里面 SpiServiceLoader 是自己封装的 SPI 加载器，相当于把前面实例中的 main 中的 ServiceLoader 和 Iterator 封装起来了。

3. **多个并发多线程使用 ServiceLoader 类的实例是不安全的。** 实际上这个可以解决，我们在第 2 点的基础上修改。

自己封装的 SpiServiceLoader 在使用 getService 中会调用 ServiceLoader，那么我们给 getService 方法加上锁 `synchronized` 就可以解决并发的问题了。

这里至于为什么没有放 SpiServiceLoader，是因为这个代码是公司的代码，不能随便用来写文章，所以，这里提供了思路，实现就没有那么难了。

以上就是我对 SPI 机制的理解和总结，实际上真实的项目中远比这个要复杂。