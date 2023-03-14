# Java笔记

[[toc]]


## Flag

+ [https://www.yiibai.com/html/java/](https://www.yiibai.com/html/java)


* [什么是 hash](https://www.zhihu.com/question/26762707/answer/890181997)
* [什么是散列表(Hash Table)](https://www.jianshu.com/p/101c263cd93e)
* [HashMap在Jdk1.7和1.8中的实现](https://yuanrengu.com/2020/ba184259.html)
* [HashMap的底层结构和实现原理](https://www.cnblogs.com/chengxiao/p/6059914.html)
* [ConcurrentHashMap实现原理及源码分析](https://www.cnblogs.com/chengxiao/p/6842045.html)
* [初学者应该了解的数据结构：Array、HashMap 与 List](https://www.zcfy.cc/article/data-structures-for-beginners-arrays-hashmaps-and-lists)


- [强一致性、弱一致性、最终一致性、读写一致性、单调读、因果一致性 的区别与联系](https://zhuanlan.zhihu.com/p/67949045)
- [CAP 定理的含义](http://www.ruanyifeng.com/blog/2018/07/cap.html)
- [二进制运算](https://www.cnblogs.com/c-x-a/p/9478643.html)
- [什么是位运算](https://www.jianshu.com/p/d75b0a461380)
- [java运算符](https://blog.csdn.net/shuaigexiaobo/article/details/88535745)
- [数据库扩展性设计：使用二进制解决一条记录关联多个状态的问题](https://www.cnblogs.com/itfly8/p/6062757.html)
- [Java8新特性有哪些](https://www.zhihu.com/question/24980208)
- [fastjson这么快老外为啥还是热衷 jackson?](https://www.zhihu.com/question/44199956)
- [JAX-WS与JAX-RS区别是什么？](https://blog.csdn.net/dogiant/article/details/54907506)
- [接口框架 : WebService与Jersey RESTful 要点梳理](https://blog.csdn.net/zzg19950824/article/details/80300501)
- [JAVA多线程使用场景和注意事项](https://www.jianshu.com/p/d670c6485ff9)
- Java持久性API(Java Persistence API) [https://en.wikipedia.org/wiki/Java_Persistence_API](https://en.wikipedia.org/wiki/Java_Persistence_API)
- [fork/join 全面剖析](https://www.cnblogs.com/linlinismine/p/9295701.html)
- [收集业务日志，提炼有效数据](https://mp.weixin.qq.com/s/mA8ZqShP0p_t1toTzqpW3Q)
- [通过filebeat、logstash、rsyslog采集nginx日志的几种方式](https://www.cnblogs.com/xiejava/p/12452434.html)
- [分布式系统唯一ID生成方案汇总](https://www.cnblogs.com/haoxinyue/p/5208136.html)
    - [理解Snowflake算法的实现原理](https://www.cnblogs.com/throwable/p/13467763.html)
- [设计一个全局异常处理器](https://crossoverjie.top/2019/07/15/wheel/cicada7-exception-handle)
- [理解、学习与使用 JAVA 中的 OPTIONAL](https://www.cnblogs.com/zhangboyu/p/7580262.html)
- [理解零拷贝（Zero-copy）](https://blog.csdn.net/qq_39615545/article/details/108116820)
- [可代替 ASM，使用 AnnotationProcessor 做代码插桩](https://www.dazhuanlan.com/2019/10/16/5da5f67797300)
- [动态代理和Lombok学习](https://blog.csdn.net/qq_41022073/article/details/105342238)
- [Spring AOP和Lombok是什么原理？](https://www.cnblogs.com/woetu/p/13658575.html)
- [java.lang.Record替代Lombok](https://www.liaoxuefeng.com/wiki/1252599548343744/1331429187256353)
- [这四种对象属性拷贝方式，你都知道吗？](https://www.cnblogs.com/vandusty/p/12757992.html)
- [领域模型转换那些事儿](https://zhuanlan.zhihu.com/p/86282401)
- [Reactive programming 一种技术 各自表述](https://mercyblitz.github.io/2018/07/25/Reactive-Programming-%E4%B8%80%E7%A7%8D%E6%8A%80%E6%9C%AF-%E5%90%84%E8%87%AA%E8%A1%A8%E8%BF%B0)
- [Java正则多次匹配和多次组匹配](https://www.cnblogs.com/ElEGenT/p/13158108.html)
- [https://www.zhihu.com/people/rednaxelafx](https://www.zhihu.com/people/rednaxelafx)
- [Java 正则表达式详解](https://segmentfault.com/a/1190000009162306)
- [java的native方法](https://www.zhihu.com/question/28001771)


+ JMH（Java Microbenchmark Harness）是专门用于代码微基准测试的工具套件
+ [什么是JNDI？](https://blog.csdn.net/gybshen/article/details/82717578)
+ [Web项目中Junit测试如何添加JNDI](https://www.cnblogs.com/Oliver1993/p/13630786.html)
+ [https://github.com/h-thurow/Simple-JNDI](https://github.com/h-thurow/Simple-JNDI)

> JNDI是Java Naming and Directory Interface（Java命名与目录接口）其实和Spring依赖注入差不多的效果，
> 就是我们可以将我们需要的类注册进去，然后一般我们都是使用该类的实例对象，这时候因为刚才我们已经给每个类按照JNDI的规范进行了注入，
> 这时候我们直接通过JNDI的使用规则取出来我们想要的数据（实例对象）即可。

* 有状态就是有数据存储功能。有状态对象(Stateful Bean)，就是有实例变量的对象，可以保存数据，是非线程安全的。在不同方法调用间不保留任何状态。
* 无状态就是一次操作，不能保存数据。无状态对象(Stateless Bean)，就是没有实例变量的对象 .不能保存数据，是不变类，是线程安全的。




## 多行字符串

- Multiline String 多行字符串
- Template String 模板字符串
- Text Blocks 文本块

> Java 13 Text Blocks 第一次预览版，Java 14 Text Blocks 第二次预览版，Java 15 Text Blocks 正式版


## 函数重载

- 方法名相同,方法参数的个数和类型不同,通过个数和类型的不同来区分不同的函数;
- 方法的重载跟返回值类型和修饰符无关,Java的重载是发生在本类中的,重载的条件是在本类中有多个方法名相同;
- 参数列表不同(参数个数不同、参数类型不同)跟返回值无关;



## 关键保留字

* [https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html)


| 名称         	| 说明                                                                                         	|
|--------------	|----------------------------------------------------------------------------------------------	|
| private      	| 一种访问控制方式：私用模式                                                                   	|
| protected    	| 一种访问控制方式：保护模式                                                                   	|
| public       	| 一种访问控制方式：共用模式                                                                   	|
| abstract     	| 表明类或者成员方法具有抽象属性                                                               	|
| class        	| 类                                                                                           	|
| extends      	| 表明一个类型是另一个类型的子类型，这里常见的类型有类和接口                                   	|
| final        	| 用来说明最终属性，表明一个类不能派生出子类，或者成员方法不能被覆盖，或者成员域的值不能被改变 	|
| implements   	| 表明一个类实现了给定的接口                                                                   	|
| interface    	| 接口                                                                                         	|
| native       	| 用来声明一个方法是由与计算机相关的语言（如C/C++/FORTRAN语言）实现的                          	|
| new          	| 用来创建新实例对象                                                                           	|
| static       	| 表明具有静态属性                                                                             	|
| strictfp     	| 用来声明FP_strict（单精度或双精度浮点数）表达式遵循IEEE 754算术规范                          	|
| synchronized 	| 表明一段代码需要同步执行                                                                     	|
| transient    	| 声明不用序列化的成员域                                                                       	|
| volatile     	| 表明两个或者多个变量必须同步地发生变化                                                       	|
| break        	| 提前跳出一个块                                                                               	|
| continue     	| 回到一个块的开始处                                                                           	|
| return       	| 从成员方法中返回数据                                                                         	|
| do           	| 用在do-while循环结构中                                                                       	|
| while        	| 用在循环结构中                                                                               	|
| if           	| 条件语句的引导词                                                                             	|
| else         	| 用在条件语句中，表明当条件不成立时的分支                                                     	|
| for          	| 一种循环结构的引导词                                                                         	|
| instanceof   	| 用来测试一个对象是否是指定类型的实例对象                                                     	|
| switch       	| 分支语句结构的引导词                                                                         	|
| case         	| 用在switch语句之中，表示其中的一个分支                                                       	|
| default      	| 默认，例如，用在switch语句中，表明一个默认的分支                                             	|
| try          	| 尝试一个可能抛出异常的程序块                                                                 	|
| catch        	| 用在异常处理中，用来捕捉异常                                                                 	|
| throw        	| 抛出一个异常                                                                                 	|
| throws       	| 声明在当前定义的成员方法中所有需要抛出的异常                                                 	|
| import       	| 表明要访问指定的类或包                                                                       	|
| package      	| 包                                                                                           	|
| boolean      	| 基本数据类型之一，布尔类型                                                                   	|
| byte         	| 基本数据类型之一，字节类型                                                                   	|
| char         	| 基本数据类型之一，字符类型                                                                   	|
| double       	| 基本数据类型之一，双精度浮点数类型                                                           	|
| float        	| 基本数据类型之一，单精度浮点数类型                                                           	|
| int          	| 基本数据类型之一，整数类型                                                                   	|
| long         	| 基本数据类型之一，长整数类型                                                                 	|
| short        	| 基本数据类型之一,短整数类型                                                                  	|
| super        	| 表明当前对象的父类型的引用或者父类型的构造方法                                               	|
| this         	| 指向当前实例对象的引用                                                                       	|
| void         	| 声明当前成员方法没有返回值                                                                   	|
| goto         	| 保留关键字，没有具体含义                                                                     	|
| const        	| 保留关键字，没有具体含义                                                                     	|



## 访问控制修饰符

| 修饰符                    	| 当前类 	| 同一包内 	| 子孙类(同一包) 	| 子孙类(不同包) 	| 其他包 	|
|---------------------------	|--------	|----------	|----------------	|----------------	|--------	|
| public(interface default) 	| Y      	| Y        	| Y              	| Y              	| Y      	|
| protected                 	| Y      	| Y        	| Y              	| Y/N    	        | N      	|
| default                   	| Y      	| Y        	| Y              	| N              	| N      	|
| private                   	| Y      	| N        	| N              	| N              	| N      	|


**`protected`需要从以下两个点来分析说明**

> 子类与基类在同一包中：被声明为`protected`的变量、方法和构造器能被同一个包中的任何其他类访问；

> 子类与基类不在同一包中：那么在子类中，子类实例可以访问其从基类继承而来的`protected`方法，而不能访问基类实例的`protected`方法。



## classpath意义

* [java项目中的classpath到底是什么](https://segmentfault.com/a/1190000015802324)
* [spring classpath:和classpath*:区别和实际应用](https://blog.csdn.net/qq_30038111/article/details/82116559)
* [java项目中的classpath到底指向的哪里](https://blog.csdn.net/qq_33393542/article/details/80322141)
* [eclipse项目中.classpath文件详解](https://blog.csdn.net/pengmm1990/article/details/68951389)


+ `classpath`：只会到你的`class`路径中查找文件，和`classpath:/`是等价的，都是相对于类的根路径
    + `src`不是`classpath`，`WEB-INF/classes`和`lib`才是`classpath`，`WEB-INF/`是资源目录, 客户端不能直接访问
    + `WEB-INF/classes`目录存放`src`目录`java`文件编译之后的`class`文件、`xml`、`properties`等资源配置文件
    + `lib`和`classes`同属`classpath`，两者的访问优先级为: `lib` > `classes`
+ `classpath*`：不仅包含`class`路径，还包括`jar`文件中（`class`路径）进行查找

> 注意：用`classpath*`需要遍历所有的`classpath`，所以加载速度是很慢，尽量避免使用。
> `**`表示在任意目录下，也就是说在`WEB-INF/classes/`下任意层的目录


| 前缀         | 例子                             | 说明                          |
|------------|--------------------------------|-----------------------------|
| classpath: | classpath:com/myapp/config.xml | 从classpath中加载。              |
| file:      | file:/data/config.xml          | 作为 URL 从文件系统中加载。            |
| http:      | http://myserver/logo.png       | 作为 URL 加载。                  |
| (none)     | /data/config.xml               | 根据 ApplicationContext 进行判断。 |




## 日期时间

* [jdk8时间日期](https://codertang.com/2018/12/24/jdk8-datetime)

- 可变性 : 像日期和时间这样的类应该是不可变的,返回一个值,原来的对象不变
- 偏移性 : Date中的年份是从1900开始的,而月份是从0开始的
- 日期表示需要减`new Date(2020-1900,9-1,8)` 这样才可以表示2020年9月8日
- 格式化: 格式化日期只对Date有用,Calendar则不行
- 线程不安全的,不能处理闰秒等
- Java8吸收了`Joda-Time`（该项目作者参与了Java8的time包开发）精华，开启了新的API


**java.lang.System类**

```java
// 用于返回当前时间与1970年1月1日0:0:0之间以毫秒为单位的时间戳
public static native long currentTimeMillis();
// 返回正在运行的Java虚拟机的当前值,高分辨率时间源，以纳秒为单位
public static native long nanoTime();
```

| 变量名                        	| 说明                        	|
|-------------------------------	|-----------------------------	|
| java.version                  	| Java运行时环境版本          	|
| java.vendor                   	| Java运行时环境供应商        	|
| java.vendor.url               	| Java供应商的 URL            	|
| java.home                     	| Java安装目录                	|
| java.vm.specification.version 	| Java虚拟机规范版本          	|
| java.vm.specification.vendor  	| Java虚拟机规范供应商        	|
| java.vm.specification.name    	| Java虚拟机规范名称          	|
| java.vm.version               	| Java虚拟机实现版本          	|
| java.vm.vendor                	| Java虚拟机实现供应商        	|
| java.vm.name                  	| Java虚拟机实现名称          	|
| java.specification.version    	| Java运行时环境规范版本      	|
| java.specification.vendor     	| Java运行时环境规范供应商    	|
| java.specification.name       	| Java运行时环境规范名称      	|
| java.class.version            	| Java类格式版本号            	|
| java.class.path               	| Java类路径                  	|
| java.library.path             	| 加载库时搜索的路径列表      	|
| java.io.tmpdir                	| 默认的临时文件路径          	|
| java.compiler                 	| 要使用的JIT编译器的名称     	|
| java.ext.dirs                 	| 一个或多个扩展目录的路径    	|
| os.name                       	| 操作系统的名称              	|
| os.arch                       	| 操作系统的架构              	|
| os.version                    	| 操作系统的版本              	|
| file.separator                	| 文件分隔符（在UNIX中是“/”） 	|
| path.separator                	| 路径分隔符（在UNIX中是“:”） 	|
| line.separator                	| 行分隔符（在UNIX中是“/n”）  	|
| user.name                     	| 用户的账户名称              	|
| user.home                     	| 用户的主目录                	|
| user.dir                      	| 用户的当前工作目录          	|



**java.util.Date类**

- 两个构造器
    - `new Date();` 当前时间
    - `new Date(Long 毫秒数)` 根据毫秒数创建指定日期
- 两个方法的使用
    - `toString(`)` 显示当前的年,月,日,时,分,秒
    - `getTime()` 获取当前date对象的对应的毫秒数(时间戳)

+ `java.util.Date`和`java.sql.Date`互相转换

```java
Date date = new java.sql.Date();
java.sql.Date date2 = (java.sql.Date) date;
java.sql.Date date3 = new java.sql.Date(new Date().getTime());
```

**java.text.SimpleDateFormat类**

> Date类的API不易于国际化，大部分被废弃，并且不是线程安全的

- `format()` 方法 按照具体的格式格式化时间
- `parse()` 方法 将字符串解析成时间


**`java.time`的基础包**

| java.time           | 包含值对象的基础包   |
|---------------------|-------------|
| java.time.chrono    | 提供不同日历系统的访问 |
| java.time.format    | 格式化和解析时间和日期 |
| java.time.temporal  | 包含底层框架和扩展特性 |
| java.time.zone      | 包含时区支持的类    |


**新的`java.time`包含了如下子类**

| 类            	| 作用                                          	| 说明                                                                        	|
|---------------	|-----------------------------------------------	|-----------------------------------------------------------------------------	|
| Instant       	| 表示时刻                                      	| 对应jdk7之前的Date                                                          	|
| LocalDateTime 	| 获取当前系统的日期时间(内部不记录时区)        	| 可以认为由LocalDate和LocalTime组成                                          	|
| LocalDate     	| 获取当前系统的日期                            	|                                                                             	|
| LocalTime     	| 获取当前系统的时间                            	|                                                                             	|
| ZoneId        	| 时区，"5:00"和"Europe/Paris"、"Asia/Shanghai" 	| 除了处理与标准时间的时间差还处理地区时（夏令时，冬令时等）                  	|
| ZoneOffset    	| 时区，只处理 "6:00"                           	| ZoneOffset是ZoneId的子类                                                    	|
| ZoneDateTime  	| 一个在ISO-8601日历系统特定时区的日期和时间    	| 其中每个时区都有对应的Id,每个地区Id都有"{区域}/{城市}" 例如 Asia/Shanghai等 	|
| ZonedDateTime 	| 处理日期和时间与相应的时区                    	|                                                                             	|
| Duration      	| 持续时间,用于计算两个"时间"的间隔             	|                                                                             	|
| Period        	| 日期间隔,用于计算两个"日期"的间隔             	|                                                                             	|
| Clock         	| 使用时区提供对当前即时，日期和时间的访问      	|                                                                             	|


**方法前缀**

| 前缀   	| 含义                                           	| 示例                                                         	|
|--------	|------------------------------------------------	|--------------------------------------------------------------	|
| now    	| 静态工厂方法, 用当前时间创建实例               	| LocalDate.now();                                             	|
| of     	| 静态工厂方法                                   	| LocalDate.of(2018, 12, 20);                                  	|
| parse  	| 静态工厂方法, 关注于解析                       	| LocalDate.parse("2018-12-20");                               	|
| get    	| 获取某个字段的值                               	| localDate.getYear();                                         	|
| is     	| 比对判断                                       	| localDate.isAfter(LocalDate.now());                          	|
| with   	| 基于当前实例创建新的实例, 但部分字段被更新     	| localDate.withMonth(3);                                      	|
| plus   	| 在当前实例基础上增加(值可负), 返回新实例       	| localDate.plusDays(1);                                       	|
| minus  	| 在当前实例基础上减小(值可负), 返回新实例       	| localDate.minusDays(1);                                      	|
| to     	| 基于当前实例转换出另一个类型的实例             	| localDateTime.toLocalDate();                                 	|
| at     	| 把当前对象和另一个对象结合, 生成新的类型的实例 	| localDate.atTime(21, 30, 50)                                 	|
| format 	| 格式化                                         	| localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); 	|




## RoundingMode

> `java.math.RoundingMode`是一个舍入枚举类

* [https://blog.csdn.net/alanzyy/article/details/8465098](https://blog.csdn.net/alanzyy/article/details/8465098)
* [https://my.oschina.net/sunchp/blog/670909](https://my.oschina.net/sunchp/blog/670909)
* [https://blog.csdn.net/chendaoqiu/article/details/45841283](https://blog.csdn.net/chendaoqiu/article/details/45841283)

### 几个参数详解

- `RoundingMode.CEILING`(对应`BigDecimal.ROUND_CEILING`)：取右边最近的整数
- `RoundingMode.UP`(对应`BigDecimal.ROUND_UP`)：远离0取整，即负数向左取整，正数向右取整
- `RoundingMode.DOWN`(对应`BigDecimal.ROUND_DOWN`)：从不在舍弃(即截断)的小数之前增加数字（其实就是截断的意思）
- `RoundingMode.FLOOR`(对应`BigDecimal.ROUND_FLOOR`)：取左边最近的正数
- `RoundingMode.HALF_UP`(对应`BigDecimal.ROUND_HALF_UP`)：四舍五入，负数原理同上
- `RoundingMode.HALF_DOWN`(对应`BigDecimal.ROUND_HALF_DOWN`)：五舍六入，负数先取绝对值再五舍六入再负数
- `RoundingMode.HALF_EVEN`(对应`BigDecimal.ROUND_HALF_EVEN`)：这个比较绕，整数位若是奇数则四舍五入，若是偶数则五舍六入
- `RoundingMode.UNNECESSARY`(对应`BigDecimal.ROUND_UNNECESSARY`)：用于断言请求的操作具有精确结果的舍入模式，因此不需要舍入



## Java锁


### synchronized

> synchronized(this)以及非static的synchronized方法，只能防止多个线程同时执行同一个对象的同步代码段。

> synchronized锁住的是代码还是对象？
>> 答案是：synchronized锁住的是括号里的对象，而不是代码。对于非static的synchronized方法，锁的就是对象本身也就是this。

> 当synchronized锁住一个对象后，别的线程如果也想拿到这个对象的锁，就必须等待这个线程执行完成释放锁，才能再次给对象加锁，这样才达到线程同步的目的。

> 即使两个不同的代码段，都要锁同一个对象，那么这两个代码段也不能在多线程环境下同时运行。

> 所以我们在用synchronized关键字的时候，尽量缩小代码段的范围，尽量不要在整个方法上加同步。这叫减小锁的粒度，使代码更大程度的并发。

> static方法可以直接类名加方法名调用，方法中无法使用this，所以它锁的不是this，而是Class，所以static synchronized方法也相当于全局锁，相当于锁住了代码段。




## Java异常

* [Java中的异常处理](https://blog.csdn.net/weixin_52566131/article/details/117132098)

![](/images/Java内置异常.png)



| 未经检查的异常                  	| 说明                                                             	|
|---------------------------------	|------------------------------------------------------------------	|
| ArithmeticException             	| 算术错误，如被0除                                                	|
| ArrayIndexOutOfBoundsException  	| 数组下标出界                                                     	|
| ArrayStoreException             	| 数组元素赋值类型不兼容                                           	|
| ClassCastException              	| 非法强制转换类型                                                 	|
| EnumConstantNotPresentException 	| 枚举常量不存在异常。                                             	|
| EOFException                    	| 文件已结束异常                                                   	|
| Exception                       	| 根异常。用以描述应用程序希望捕获的情况。                         	|
| FileNotFoundException           	| 文件未找到异常                                                   	|
| IllegalArgumentException        	| 调用方法的参数非法                                               	|
| IllegalMonitorStateException    	| 非法监控操作，如等待一个未锁定线程                               	|
| IllegalStateException           	| 环境或应用状态不正确                                             	|
| IllegalThreadStateException     	| 请求操作与当前线程状态不兼容                                     	|
| IndexOutOfBoundsException       	| 某些类型索引越界                                                 	|
| IOException                     	| 输入输出异常                                                     	|
| NegativeArrayException          	| 数组负下标异常                                                   	|
| NegativeArraySizeException      	| 数组大小为负值异常。当使用负数大小值创建数组时抛出该异常。       	|
| NullPointerException            	| 非法使用空引用                                                   	|
| NumberFormatException           	| 字符串到数字格式非法转换                                         	|
| RuntimeException                	| 运行时异常。是所有Java虚拟机正常操作期间可以被抛出的异常的父类。 	|
| SecurityException               	| 试图违反安全性                                                   	|
| SQLException                    	| 操作数据库异常                                                   	|
| StringIndexOutOfBoundsException 	| 试图在字符串边界之外索引                                         	|
| TypeNotPresentException         	| 类型不存在异常。                                                 	|
| UnsupportedOperationException   	| 遇到不支持的操作                                                 	|



| 检查的异常                 	| 说明                                    	|
|----------------------------	|-----------------------------------------	|
| ClassNotFoundException     	| 找不到类                                	|
| CloneNotSupportedException 	| 试图克隆一个不能实现Cloneable接口的对象 	|
| IllegalAccessException     	| 对一个类的访问被拒绝                    	|
| InstantiationException     	| 试图创建一个抽象类或者抽象接口的对象    	|
| InterruptedException       	| 一个线程被另一个线程中断                	|
| NoSuchFieldException       	| 请求的字段不存在                        	|
| NoSuchMethodException      	| 请求的方法不存在                        	|


| 错误                                   	| 说明               	|
|----------------------------------------	|--------------------	|
| java.lang.AbstractMethodError          	| 抽象方法错误       	|
| java.lang.AssertionError               	| 断言错             	|
| java.lang.ClassCircularityError        	| 类循环依赖错误     	|
| java.lang.ClassFormatError             	| 类格式错误         	|
| java.lang.Error                        	| 错误               	|
| java.lang.ExceptionInInitializerError  	| 初始化程序错误     	|
| java.lang.IllegalAccessError           	| 违法访问错误       	|
| java.lang.IncompatibleClassChangeError 	| 不兼容的类变化错误 	|
| java.lang.InstantiationError           	| 实例化错误         	|
| java.lang.InternalError                	| 内部错误           	|
| java.lang.LinkageError                 	| 链接错误           	|
| java.lang.NoClassDefFoundError         	| 未找到类定义错误   	|
| java.lang.NoSuchFieldError             	| 域不存在错误       	|
| java.lang.NoSuchMethodError            	| 方法不存在错误     	|
| java.lang.OutOfMemoryError             	| 内存不足错误       	|
| java.lang.StackOverflowError           	| 堆栈溢出错误       	|
| java.lang.UnknownError                 	| 未知错误           	|
| java.lang.UnsatisfiedLinkError         	| 未满足的链接错误   	|
| java.lang.UnsupportedClassVersionError 	| 不支持的类版本错误 	|
| java.lang.VerifyError                  	| 验证错误           	|
| java.lang.VirtualMachineError          	| 虚拟机错误         	|
| java.lang.ThreadDeath                     | 线程结束           	|



## HTTP


**常量**

- `java.net.HttpURLConnection`
- `io.netty.handler.codec.http.HttpResponseStatus`
- `org.springframework.http.HttpStatus`
- `org.apache.http.HttpStatus`
- `org.asynchttpclient.util.HttpConstants`
- `org.apache.http.protocol.HTTP`
- `org.springframework.http.HttpHeaders`
- `javax.ws.rs.HttpMethod`
- `org.springframework.http.HttpMethod`


**Mime/Content-Type/Media-Type**

+ [https://github.com/search?q=mime](https://github.com/search?q=mime)
+ [https://github.com/topics/mime](https://github.com/topics/mime)
+ [https://github.com/mime-types](https://github.com/mime-types)
+ [https://www.solvusoft.com/en/mime-multipurpose-internet-mail-extensions](https://www.solvusoft.com/en/mime-multipurpose-internet-mail-extensions)

- `com.google.common.net.MediaType` guava
- `javax.ws.rs.core.MediaType` Jersey框架
- `org.springframework.http.MediaType`和`org.springframework.util.MimeTypeUtils` spring框架
- 在Tomcat配置文件`conf/web.xml`中的`Default MIME Type Mappings`部分定义
- nginx配置文件`conf/mime.types`中定义



**HTTP实现依赖库**

- `HttpURLConnection` Java自带API
- `HttpClient` JDK11的API [Java11 HttpClient小试牛刀](https://segmentfault.com/a/1190000016555671)
- `RestTemplate` 默认实现是`HttpURLConnection`，默认使用HttpMessageConverter将Http消息转换成POJO 或POJO转化成Http消息
    - `ForEntity`返回`ResponseEntity`响应码、响应消息体等
    - `ForObject`只返回消息体
    - `exchange` 配合`HttpEntity`或`RequestEntity`使用，返回`ResponseEntity`
- `WebClient` 是`Spring 5.0`开始提供的非阻塞响应式编程的Http工具。


* [HTTP客户端连接，选择HttpClient还是OkHttp？](https://juejin.im/post/5e156c80f265da5d3c6de72a)


**Apache HttpClient GET拼接URL参数**


```java
Map<String, Object> params = new HashMap<>();
params.put("key1", "value1");
params.put("key2", "value2");

List<NameValuePair> nvps = new ArrayList<NameValuePair>();
// 通过map集成entrySet方法获取entity循环遍历，获取迭代器
Iterator<Entry<String, Object>> iterator = params.entrySet().iterator();
while (iterator.hasNext()) {
    Entry<String, Object> mapEntry = iterator.next();
    nvps.add(new BasicNameValuePair(mapEntry.getKey(), mapEntry.getValue().toString()));
}
// 由于GET请求的参数都是拼装在URL地址后方，所以我们要构建一个URL，带参数

// 方式一：使用setParameters
URIBuilder uriBuilder = new URIBuilder(url);
// 封装请求参数
uriBuilder.setParameters(nvps);
uriBuilder.build();

// 方式二：使用setParameter
URIBuilder uriBuilder = new URIBuilder(url);
// 封装请求参数
for (String key : params.keySet()) {
    uriBuilder.setParameter(key, params.get(key).toString());
}
uriBuilder.build();

// 方式三：转换参数并拼接
url += "?" + EntityUtils.toString(new UrlEncodedFormEntity(nvps, Consts.UTF_8));
URIBuilder uriBuilder = new URIBuilder(url);
uriBuilder.build();
```

- 根据HttpGet反向获取键值对列表

```java
HttpGet request = new HttpGet("http://example.com/?var=1&var=2");
//获取键值对列表
List<NameValuePair> params = new URIBuilder(request.getURI()).getQueryParams();
//转换为键值对字符串
String str = EntityUtils.toString(new UrlEncodedFormEntity(params, Consts.UTF_8));
```



## 泛型generics

* [Java泛型的协变、逆变和不变](https://www.jianshu.com/p/90948ff4a940)
* [图解java泛型的协变和逆变](https://blog.csdn.net/zy_jibai/article/details/90082239)

- 协变(`<? extends T>`)
- 逆变(`<? super T>`)
- 不变(`T`)


**泛型的通配符**

- ? 表示不确定的类型
- T (type) 表示具体的类型
- K V (key value) 分别代表键值中的Key Value
- E (element) 代表Element


**泛型三种常用的使用方式：**

* [java 泛型详解-绝对是对泛型方法讲解最详细的，没有之一](https://www.cnblogs.com/coprince/p/8603492.html)

> 可以有多个类型变量

- 泛型类：在类名后指定类型变量，如：`public class Pair<T, U> {`
- 泛型接口：在接口名后指定类型变量，如：`public interface Generator<T, U> {`
- 泛型方法：在修饰符后，返回类型前指定类型变量，如：`public static <T extends Object, E> T test(Class<T> a, Class<E> b) {`

