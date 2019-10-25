# Java笔记



* [flag](#flag)
* [函数重载](#函数重载)
* [时间](#时间)
  * [JDK8以下时间日期API](#jdk8以下时间日期api)
  * [JDK8日期时间API](#jdk8日期时间api)
* [BigDecimal](#bigdecimal)
* [DecimalFormat](#decimalformat)
* [RoundingMode](#roundingmode)
  * [几个参数详解](#几个参数详解)
* [Java集合](#java集合)
  * [List](#list)
* [Java锁](#java锁)
  * [synchronized](#synchronized)
  * [将任意对象作为对象监视器](#将任意对象作为对象监视器)
* [Java异常](#java异常)
  * [Java内置异常](#java内置异常)
* [AOP](#aop)
* [连接MySQL](#连接mysql)
* [spring](#spring)
  * [注解](#注解)
* [Swagger2](#swagger2)
  * [注解](#注解)
* [Hibernate](#hibernate)
  * [返回结果接收方式](#返回结果接收方式)
  * [HQL查询](#hql查询)
  * [QBC查询](#qbc查询)
  * [关闭session](#关闭session)
  * [只读错误](#只读错误)
  * [编程式修改FlushMode](#编程式修改flushmode)
  * [配置过滤器](#配置过滤器)
  * [使用execute方法回调方式实现](#使用execute方法回调方式实现)


## flag


* [https://www.yiibai.com/html/java/](https://www.yiibai.com/html/java/)



## 函数重载

- 方法名相同,方法参数的个数和类型不同,通过个数和类型的不同来区分不同的函数;
- 方法的重载跟返回值类型和修饰符无关,Java的重载是发生在本类中的,重载的条件是在本类中有多个方法名相同;
- 参数列表不同(参数个数不同、参数类型不同)跟返回值无关;

## 时间

### JDK8以下时间日期API

#### `java.lang.System`类

```java
public static native long currentTimeMillis();
```

> 用于返回当前时间与1970年1月1日0:0:0之间以毫秒为单位的时间差

> 时间戳

#### `java.util.Date`类

- 两个构造器

> `new Date();` 当前时间

> `new Date(Long 毫秒数)` 根据毫秒数创建指定日期

- 两个方法的使用

> `toString(`)` 显示当前的年,月,日,时,分,秒

> `getTime()` 获取当前date对象的对应的毫秒数(时间戳)

- `java.util.Date`和`java.sql.Date`互相转换

> `Date date = new java.sql.Date()`

> `java.sql.Date date2 = (java.sql.Date) date;`

> `java.sql.Date date3 = new java.sql.Date(new Date().getTime());`


#### `java.text.SimpleDateFormat`类

> Date类的API不易于国际化,大部分被废弃,`SimpleDateFormat`类 一个与语言环境有关的方式来格式化和解析时间的具体类

> `format()` 方法 按照具体的格式格式化时间

> `parse()` 方法 将字符串解析成时间

#### `java.util.Calendar`日历类

- 获取`Calendar`的实例

> 使用其子类`GregorianCalendar`的对象
>
> 使用`Calendar.getInstance()`

##### 常用方法

- `set()`

> `calendar.set(Calendar.DAY_OF_MONTH,22)` 将日期设置为这个月的第几天

- `get()`

> `calendar.get(Calendar.DAY_OF_MONTH)` 这个月的第几天,返回值是int
>
> `calendar.get(Calendar.DAY_OF_YEAR)` 这一年的第几天

- `add()`

> `calendar.add(Calendar.DAY_OF_MONTH,3)` 在现有的日期上加3天
>
> `getTime()`
>
> `calendar.getTime();` 返回`Date()`

- `setTime()`

> `calendar.setTime(new Date())` 将日期设置为某日期


#### Java获取当前时间加减

```java
Date date = new Date();//获取当前时间  
Calendar calendar = Calendar.getInstance();
calendar.setTime(date);//设置时间
calendar.add(Calendar.YEAR, -1);//当前时间减去一年，即一年前的时间  
calendar.add(Calendar.MONTH, -1);//当前时间前去一个月，即一个月前的时间  
calendar.getTime();//获取一年前的时间，或者一个月前的时间  
int year =cal.get(Calendar.YEAR);//获取年
int month = cal.get(Calendar.MONTH )> 1;//获取月，因为第一个月是0，所以要> 1
int day = calendar.get(Calendar.DATE);//获取日
int first = c.getActualMinimum(Calendar.DAY_OF_MONTH);//获取本月最小天数
int last = c.getActualMaximum(Calendar.DAY_OF_MONTH);//获取本月最大天数
int time = c.get(Calendar.HOUR_OF_DAY);//获取当前小时
int min = c.get(Calendar.MINUTE);//获取当前分钟
int sec = c.get(Calendar.SECOND);//获取当前秒

Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT> 08:00"));//获取东八区时间
```

#### 获取一天的开始时间和结束时间

```java
/**
 * 获取一天的开始时间
 * @param date
 * @return
 */
public static Date toDayStart(Date date) {
        // Calendar calendar = new GregorianCalendar();
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        calendar.set(Calendar.MILLISECOND,0);
        return calendar.getTime();
}
/**
 * 获取一天的结束时间
 * @param date
 * @return
 */
public static Date toDayEnd(Date date) {
        // Calendar calendar = new GregorianCalendar();
        Calendar calendar = Calendar.getInstance();

        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY,23);
        calendar.set(Calendar.MINUTE,59);
        calendar.set(Calendar.SECOND,59);
        calendar.set(Calendar.MILLISECOND,999);
        return calendar.getTime();
}
```


### JDK8日期时间API

* [jdk8时间日期](https://codertang.com/2018/12/24/jdk8-datetime/)

> 可变性 : 像日期和时间这样的类应该是不可变的,返回一个值,原来的对象不变
>
> 偏移性 : Date中的年份是从1900开始的,而月份是从0开始的
>
> 日期表示需要减`new Date(2020-1900,9-1,8)` 这样才可以表示2020年9月8日
>
> 格式化: 格式化日期只对Date有用,Calendar则不行
>
> 线程不安全的,不能处理闰秒等
>
> Java8吸收了`Joda-Time`精华,开启了新的API


#### `java.time`的基础包

| java.time           | 包含值对象的基础包   |
|---------------------|-------------|
| java.time.chrono    | 提供不同日历系统的访问 |
| java.time.format    | 格式化和解析时间和日期 |
| java.time.temporal  | 包含底层框架和扩展特性 |
| java.time.zone      | 包含时区支持的类    |

#### 新的`java.time`包含了如下子类

| 类             |  作用                                       | 说明                                                                                      |
|---------------|-------------------------------------------|-----------------------------------------------------------------------------------------|
| Instant       |  表示时刻                                     |  对应jdk7之前的Date                                                                          |
| LocalDateTime |  获取当前系统的日期时间(内部不记录时区)                     |  可以认为由LocalDate和LocalTime组成                                                             |
| LocalDate     |  获取当前系统的日期                                |                                                                                         |
| LocalTime     |  获取当前系统的时间                                |                                                                                         |
| ZoneId        |  时区，"5:00"和"Europe/Paris"、"Asia/Shanghai" |  ZoneId除了处理与标准时间的时间差还处理地区时（夏令时，冬令时等）                                                    |
| ZoneOffset    |  时区，只处理 "6:00"                            |  ZoneOffset是ZoneId的子类                                                                   |
| ZoneDateTime  |  一个在ISO-8601日历系统时区的日期和时间                  | LocalDateTime内部不记录时区,ZoneDateTime记录，其中每个时区都有对应的Id,每个地区Id都有"{区域}/{城市}" 例如 Asia/Shanghai等 |
| ZonedDateTime | 处理日期和时间与相应的时区                             |
| Duration      | 持续时间,用于计算两个"时间"的间隔                        |
| Period        | 日期间隔,用于计算两个"日期"的间隔                        |
| Clock         | 使用时区提供对当前即时，日期和时间的访问                      |


#### 方法前缀

| 前缀     | 含义                       | 示例                                                           |
|--------|--------------------------|--------------------------------------------------------------|
| now    | 静态工厂方法, 用当前时间创建实例        | LocalDate.now();                                             |
| of     | 静态工厂方法                   | LocalDate.of(2018, 12, 20);                                  |
| parse  | 静态工厂方法, 关注于解析            | LocalDate.parse("2018-12-20");                               |
| get    | 获取某个字段的值                 | localDate.getYear();                                         |
| is     | 比对判断                     | localDate.isAfter(LocalDate.now());                          |
| with   | 基于当前实例创建新的实例, 但部分字段被更新   | localDate.withMonth(3);                                      |
| plus   | 在当前实例基础上增加(值可负), 返回新实例   | localDate.plusDays(1);                                       |
| minus  | 在当前实例基础上减小(值可负), 返回新实例   | localDate.minusDays(1);                                      |
| to     | 基于当前实例转换出另一个类型的实例        | localDateTime.toLocalDate();                                 |
| at     | 把当前对象和另一个对象结合, 生成新的类型的实例 | localDate.atTime(21, 30, 50)                                 |
| format | 格式化                      | localDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")); |




#### `Date`和`LocalDate`相互转换

- `Date`转`LocalDate`

```java
Date date = new Date();
Instant instant = date.toInstant();
// 系统默认时区
//ZoneId zoneId = ZoneId.systemDefault();
// 亚洲上海时区
ZoneId zoneId = ZoneId.of("Asia/Shanghai");

// atZone()方法返回在指定时区从此Instant生成的ZonedDateTime。
LocalDate localDate = instant.atZone(zoneId).toLocalDate();
// 或者
LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, zoneId);
LocalDate localDate = localDateTime.toLocalDate();
// 转LocalTime
LocalTime localTime = localDateTime.toLocalTime();
```

- `LocalDate`转`Date`

```java
LocalDate localDate = LocalDate.now();
ZoneId zoneId = ZoneId.of("Asia/Shanghai");
// 使用ZonedDateTime将LocalDate转换为Instant。
Instant instant = localDate.atStartOfDay(zoneId).toInstant();
// 使用from()方法从Instant对象获取Date的实例
Date date = Date.from(instant);
// LocalDateTime转Date
Instant instant = localDateTime.atZone(zoneId).toInstant();
Date date = Date.from(instant);
```



## BigDecimal

```java
// 四舍五入保留两位小数
BigDecimal setScale = new BigDecimal(money).setScale(2, RoundingMode.HALF_UP);
// 不四舍五入保留两位小数
BigDecimal setScale = new BigDecimal(money).setScale(2, RoundingMode.DOWN);
```

## DecimalFormat

```java
double money=0.1585454545451545;
DecimalFormat dFormat=new DecimalFormat("0.00");// 保留两位小数
dFormat.setRoundingMode(RoundingMode.DOWN);// 不四舍五入
String format = dFormat.format(money);
```

> 自动填充用`0`，比如`new DecimalFormat("0.00")`保留两位小数
>
> 不填充则用`#`，比如`new DecimalFormat("0.##")`小数有就保留没有就去掉

## RoundingMode

> `java.math.RoundingMode`是一个舍入枚举类

[https://blog.csdn.net/alanzyy/article/details/8465098](https://blog.csdn.net/alanzyy/article/details/8465098)

[https://my.oschina.net/sunchp/blog/670909](https://my.oschina.net/sunchp/blog/670909)

[https://blog.csdn.net/chendaoqiu/article/details/45841283](https://blog.csdn.net/chendaoqiu/article/details/45841283)

### 几个参数详解

> `RoundingMode.CEILING`(对应`BigDecimal.ROUND_CEILING`)：取右边最近的整数
>
> `RoundingMode.UP`(对应`BigDecimal.ROUND_UP`)：远离0取整，即负数向左取整，正数向右取整
>
> `RoundingMode.DOWN`(对应`BigDecimal.ROUND_DOWN`)：从不在舍弃(即截断)的小数之前增加数字（其实就是截断的意思）
>
> `RoundingMode.FLOOR`(对应`BigDecimal.ROUND_FLOOR`)：取左边最近的正数
>
> `RoundingMode.HALF_UP`(对应`BigDecimal.ROUND_HALF_UP`)：四舍五入，负数原理同上
>
> `RoundingMode.HALF_DOWN`(对应`BigDecimal.ROUND_HALF_DOWN`)：五舍六入，负数先取绝对值再五舍六入再负数
>
> `RoundingMode.HALF_EVEN`(对应`BigDecimal.ROUND_HALF_EVEN`)：这个比较绕，整数位若是奇数则四舍五入，若是偶数则五舍六入
>
> `RoundingMode.UNNECESSARY`(对应`BigDecimal.ROUND_UNNECESSARY`)：用于断言请求的操作具有精确结果的舍入模式，因此不需要舍入


## Java集合

### List

#### List取一定范围数据

```java
List newList = list.subList(start, end);
// start,end分别是第几个到第几个。
// 注意的是此方法和substring一样，包含前不包含结尾，取下标索引
// 另一个注意的地方是使用此方法会改变原始list列表，返回的这个子列表的幕后其实还是原列表；
// 也就是说，修改这个子列表，将导致原列表也发生改变。
```

#### List随机取值

- 方法一

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    int index = (int) (Math.random()* list.size());
    System.out.println(list.get(index));
}
```

- 方法二

```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    // shuffle 打乱顺序 
    Collections.shuffle(list);
    System.out.println(list.get(0));
}
```



## Java锁


### synchronized

> synchronized(this)以及非static的synchronized方法，只能防止多个线程同时执行同一个对象的同步代码段。

> synchronized锁住的是代码还是对象？
>> 答案是：synchronized锁住的是括号里的对象，而不是代码。对于非static的synchronized方法，锁的就是对象本身也就是this。

> 当synchronized锁住一个对象后，别的线程如果也想拿到这个对象的锁，就必须等待这个线程执行完成释放锁，才能再次给对象加锁，这样才达到线程同步的目的。

> 即使两个不同的代码段，都要锁同一个对象，那么这两个代码段也不能在多线程环境下同时运行。

> 所以我们在用synchronized关键字的时候，尽量缩小代码段的范围，尽量不要在整个方法上加同步。这叫减小锁的粒度，使代码更大程度的并发。

> static方法可以直接类名加方法名调用，方法中无法使用this，所以它锁的不是this，而是类的Class对象，所以static synchronized方法也相当于全局锁，相当于锁住了代码段。

![](/images/synchronized使用方式.png)

```java
public class SynchronizedDemo {
    // 这是静态的锁,因为静态就带有this的含义,所以不能用this,而用类.class
    public static void test() {
        synchronized (SynchronizedDemo.class) {
            // 业务逻辑......
        }
    }
}
```

```java
// 测试过，在quartz中两个任务同时执行时无效！
public class SynchronizedDemo {
    public void test() {
        synchronized (this) {
            // 业务逻辑......
        }
    }
}
```

### 将任意对象作为对象监视器

> 多个线程持有对象监视器作为同一个对象的前提下，同一时间只有一个线程可以执行synchronized(任意自定义对象)同步代码快。

```java
public class SynchronizedDemo {
    public void test() {
        synchronized (Object.class) {
            // 业务逻辑......
        }
    }
}
```

```java
public class SynchronizedDemo {
    // lock放在方法外部会使整个方法同步
    // String lock = "";
    public void test() {
        // lock放在方法内部使同步代码块同步
        String lock = "";
        synchronized (lock) {
            // 业务逻辑......
        }
    }
}
```



## Java异常

### Java内置异常

![](/images/Java内置异常.png)

|未经检查的RuntimeException异常| 说明 |
|-----------|----------|
|ArithmeticException | 算术错误，如被0除 |
| ArrayIndexOutOfBoundsException | 数组下标出界 |
| ArrayStoreException | 数组元素赋值类型不兼容 |
| ClassCastException | 非法强制转换类型 |
| IllegalArgumentException | 调用方法的参数非法 |
| IllegalMonitorStateException | 非法监控操作，如等待一个未锁定线程 |
| IllegalStateException | 环境或应用状态不正确 |
| IllegalThreadStateException | 请求操作与当前线程状态不兼容 |
| IndexOutOfBoundsException | 某些类型索引越界 |
| NullPointerException | 非法使用空引用 |
| NumberFormatException | 字符串到数字格式非法转换 |
| SecurityException | 试图违反安全性 |
| StringIndexOutOfBounds | 试图在字符串边界之外索引 |
| UnsupportedOperationException | 遇到不支持的操作 |

|Java定义在java.lang中的检查的异常| 说明 |
|-----------|----------|
| ClassNotFoundException | 找不到类 |
| CloneNotSupportedException | 试图克隆一个不能实现Cloneable接口的对象 |
| IllegalAccessException | 对一个类的访问被拒绝 |
| InstantiationException | 试图创建一个抽象类或者抽象接口的对象 |
| InterruptedException | 一个线程被另一个线程中断 |
| NoSuchFieldException | 请求的字段不存在 |
| NoSuchMethodException | 请求的方法不存在 |




## AOP

|AOP配置元素 | 描述 |
------------ | -------------
|`<aop:advisor>` | 定义AOP通知器|
|`<aop:after>`  | 定义AOP后置通知（不管该方法是否执行成功）|
|`<aop:after-returning>` | 在方法成功执行后调用通知|
|`<aop:after-throwing>` | 在方法抛出异常后调用通知|
|`<aop:around>` | 定义AOP环绕通知|
|`<aop:aspect>` | 定义切面|
|`<aop:aspect-autoproxy>` | 定义`@AspectJ`注解驱动的切面|
|`<aop:before>` | 定义AOP前置通知|
|`<aop:config>` | 顶层的AOP配置元素，大多数的<aop:*>包含在<aop:config>元素内|
|`<aop:declare-parent>` | 为被通知的对象引入额外的接口，并透明的实现|
|`<aop:pointcut>` | 定义切点|


## 连接MySQL

> `jdbc:mysql://127.0.0.1:3306/test?useUnicode=true&characterEncoding=UTF-8`
> `&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull&serverTimezone=Asia/Shanghai`

| 参数名称                  | 参数说明                                    | 缺省值   | 最低版本要求 |
|-----------------------|-----------------------------------------------------------------|-------|--------|
| user                  | 数据库用户名（用于连接数据库）                                                 |       | 所有版本   |
| password              | 用户密码（用于连接数据库）                                                   |       | 所有版本   |
| useUnicode            | 是否使用Unicode字符集，使用参数characterEncoding，本参数值必须设置为true | FALSE | 1.1g   |
| characterEncoding     | 当useUnicode设置为true时，指定字符编码。比如可设置为gb2312或gbk、UTF-8  | FALSE | 1.1g   |
| autoReconnect         | 当数据库连接异常中断时，是否自动重新连接？                                           | FALSE | 1.1    |
| autoReconnectForPools | 是否使用针对数据库连接池的重连策略                                               | FALSE | 3.1.3  |
| failOverReadOnly      | 自动重连成功后，连接是否设置为只读？                                              | TRUE  | 3.0.12 |
| maxReconnects         | autoReconnect设置为true时，重试连接的次数                                   | 3     | 1.1    |
| initialTimeout        | autoReconnect设置为true时，两次重连之间的时间间隔，单位：秒                          | 2     | 1.1    |
| connectTimeout        | 和数据库服务器建立socket连接时的超时，单位：毫秒                               | 0     | 3.0.1  |
| socketTimeout         | socket操作（读写）超时，单位：毫秒。 0表示永不超时                                   | 0     | 3.0.1  |
| useSSL                | 是否进行ssl连接                                                       |       |        |
| zeroDateTimeBehavior  | 把零值日期转换为`null`                                                  |       |        |
| serverTimezone        | `GMT%2B8` `%2B`是`+`的转义字符,其实就是`GMT+8`,代表东八区。`Asia/Shanghai` 上海   |        |        |

## spring
```java
// 手动回滚事务
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```



### 注解

#### 1.声明bean的注解

- `@Component` 组件，没有明确的角色

- `@Service` 在业务逻辑层使用（service层）

- `@Repository` 在数据访问层使用（dao层）

- `@Controller` 在展现层使用，控制器的声明（C）

#### 2.注入bean的注解

> 都可以注解在set方法和属性上，推荐注解在属性上（一目了然，少写代码）。

- `@Autowired` 由Spring提供
 
- `@Inject` 由JSR-330提供

- `@Resource` 由JSR-250提供


#### 3.java配置类相关注解

- `@Configuration` 声明当前类为配置类，相当于xml形式的Spring配置（类上）

- `@Bean` 注解在方法上，声明当前方法的返回值为一个bean，替代xml中的方式（方法上）

- `@Configuration` 声明当前类为配置类，其中内部组合了`@Component`注解，表明这个类是一个bean（类上）

- `@ComponentScan` 用于对Component进行扫描，相当于xml中的（类上）

- `@WishlyConfiguration` 为`@Configuration`与`@ComponentScan`的组合注解，可以替代这两个注解

#### 4.切面（AOP）相关注解

> Spring支持AspectJ的注解式切面编程。

- `@Aspect` 声明一个切面（类上）

> 使用`@After`、`@Before`、`@Around`定义建言（advice），可直接将拦截规则（切点）作为参数。
 
- `@After` 在方法执行之后执行（方法上）

- `@Before` 在方法执行之前执行（方法上）

- `@Around` 在方法执行之前与之后执行（方法上）

- `@PointCut` 声明切点

> 在java配置类中使用`@EnableAspectJAutoProxy`注解开启Spring对AspectJ代理的支持（类上）

#### 5.@Bean的属性支持

- `@Scope` 设置Spring容器如何新建Bean实例（方法上，得有`@Bean`） ,其设置类型包括：
    - `Singleton` （单例,一个Spring容器中只有一个bean实例，默认模式）, 
    - `Protetype` （每次调用新建一个bean）, 
    - `Request` （web项目中，给每个http request新建一个bean）, 
    - `Session` （web项目中，给每个http session新建一个bean）, 
    - `GlobalSession`（给每一个 global http session新建一个Bean实例）

- `@StepScope` 在Spring Batch中还有涉及

- `@PostConstruct` 由JSR-250提供，在构造函数执行完之后执行，等价于xml配置文件中bean的initMethod

- `@PreDestory` 由JSR-250提供，在Bean销毁之前执行，等价于xml配置文件中bean的destroyMethod

#### 6.@Value注解

> `@Value` 为属性注入值（属性上）,支持如下方式的注入

- `@Value("Michael Jackson")` String name; 注入普通字符

- `@Value("#{systemProperties['os.name']}")` String osName; 注入操作系统属性

- `@Value("#{ T(java.lang.Math).random() * 100 }")` String randomNumber; 注入表达式结果

- `@Value("#{domeClass.name}")` String name; 注入其它bean属性

- `@Value("classpath:com/hgs/hello/test.txt")` String Resource file; 注入文件资源

- `@Value("http://www.cznovel.com")` Resource url; 注入网站资源

- `@Value("${book.name}")` String bookName; 注入配置文件

##### 注入配置使用方法

> 编写配置文件（test.properties）

```
book.name= test
```

> `@PropertySource` 加载配置文件(类上)

```
@PropertySource("classpath:/test.propertie")
```
> ③ 还需配置一个`PropertySourcesPlaceholderConfigurer`的bean。

#### 7.环境切换

- `@Profile` 通过设定Environment的ActiveProfiles来设定当前context需要使用的配置环境。（类或方法上）

- `@Conditional` Spring4中可以使用此注解定义条件话的bean，通过实现Condition接口，并重写matches方法，从而决定该bean是否被实例化。（方法上）

#### 8.异步相关

> @EnableAsync 配置类中，通过此注解开启对异步任务的支持，叙事性AsyncConfigurer接口（类上）

> @Async 在实际执行的bean方法使用该注解来申明其是一个异步任务（方法上或类上所有的方法都将异步，需要@EnableAsync开启异步任务）

#### 9.定时任务相关

- `@EnableScheduling` 在配置类上使用，开启计划任务的支持（类上）

- `@Scheduled` 来申明这是一个任务，包括cron,fixDelay,fixRate等类型（方法上，需先开启计划任务的支持）

#### 10.@Enable*注解说明

> 这些注解主要用来开启对xxx的支持。

- `@EnableAspectJAutoProxy` 开启对AspectJ自动代理的支持

- `@EnableAsync` 开启异步方法的支持

- `@EnableScheduling` 开启计划任务的支持

- `@EnableWebMvc` 开启Web MVC的配置支持

- `@EnableConfigurationProperties` 开启对`@ConfigurationProperties`注解配置Bean的支持

- `@EnableJpaRepositories` 开启对SpringData JPA Repository的支持

- `@EnableTransactionManagement` 开启注解式事务的支持

- `@EnableTransactionManagement` 开启注解式事务的支持

- `@EnableCaching` 开启注解式的缓存支持

#### 11.测试相关注解

- `@RunWith` 运行器，Spring中通常用于对JUnit的支持

> `@RunWith(SpringJUnit4ClassRunner.class)`

- `@ContextConfiguration` 用来加载配置ApplicationContext，其中classes属性用来加载配置类

> `@ContextConfiguration(classes={TestConfig.class})`

#### SpringMVC注解

- `@EnableWebMvc` 在配置类中开启Web MVC的配置支持，如一些ViewResolver或者MessageConverter等，若无此句，重写WebMvcConfigurerAdapter方法（用于对SpringMVC的配置）。

- `@Controller` 声明该类为SpringMVC中的Controller

- `@RequestMapping` 用于映射Web请求，包括访问路径和参数（类或方法上）

- `@ResponseBody` 支持将返回值放在response内，而不是一个页面，通常用户返回json数据（返回值旁或方法上）

- `@RequestBody` 允许request的参数在request体中，而不是在直接连接在地址后面。（放在参数前）

- `@PathVariable` 用于接收路径参数，比如`@RequestMapping(“/hello/{name}”)`申明的路径，将注解放在参数中前，即可获取该值，通常作为Restful的接口实现方法。

- `@RestController` 该注解为一个组合注解，相当于`@Controller`和`@ResponseBody`的组合，注解在类上，意味着，该Controller的所有方法都默认加上了`@ResponseBody`。

- `@ControllerAdvice` 通过该注解，我们可以将对于控制器的全局配置放置在同一个位置，注解了`@Controller`的类的方法可使用`@ExceptionHandler`、`@InitBinder`、`@ModelAttribute`注解到方法上，这对所有注解了 `@RequestMapping`的控制器内的方法有效。

- `@ExceptionHandler` 用于全局处理控制器里的异常

- `@InitBinder` 用来设置WebDataBinder，WebDataBinder用来自动绑定前台请求参数到Model中。

- `@ModelAttribute` 本来的作用是绑定键值对到Model里，在`@ControllerAdvice`中是让全局的`@RequestMapping`都能获得在此处设置的键值对。




## Swagger2

### 注解

| 注解名称 | 注解属性 | 作用域 | 属性作用       |
|----------|----------|--------|----------------|
| @Api     | tags     | 类     | 说明该类的作用 |
|          | value    | 类     | 说明该类的作用 |
| @ApiOperation() | value    | 方法   | 描述方法作用 |
|                 | notes    | 方法   | 提示内容     |
|                 | tags     | 方法   | 分组         |
| @ApiParam() | name     | 方法参数 | 参数名   |
|             | value    | 方法参数 | 参数说明 |
|             | required | 方法参数 | 是否必填 |
| @ApiModel()         | value       | 类   | 对象名   |
|                     | description | 类   | 描述     |
| @ApiModelProperty() | value       | 方法 | 字段说明 |
|                     | name        | 方法 | 属性名   |
|                     | dataType    | 方法 | 属性类型 |
|                     | required    | 方法 | 是否必填 |
|                     | example     | 方法 | 举例     |
|                     | hidden      | 方法 | 隐藏     |
| @ApiImplicitParam() | value       | 方法 | 参数说明 |
|                     | name        | 方法 | 参数名   |
|                     | dataType    | 方法 | 数据类型 |
|                     | paramType   | 方法 | 参数类型 |
|                     | example     | 方法 | 举例     |
| @ApiResponse()      | response    | 方法 | 返回类   |
|                     | code        | 方法 | 返回码   |
|                     | message     | 方法 | 返回信息 |
|                     | examples    | 方法 | 例子     |


|        注解        |     属性     |        值       |               备注                      |
|--------------------|--------------|---------------------|-----------------------------------------|
| @Api               | value        | 字符串                 | 可用在class头上,class描述   |
|                    | description  | 字符串                 |                               |
|                    |              |                     | @Api(value = "xxx", description = "xxx")   |
| @ApiOperation      | value        | 字符串                 | 可用在方法头上.参数的描述容器         |
|                    | notes        | 字符串                 |                                        |
|                    |              |                     | @ApiOperation(value = "xxx", notes = "xxx")   |
| @ApiImplicitParams | {}         | @ApiImplicitParam数组 | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiImplicitParams({@ApiImplicitParam1,@ApiImplicitParam2,...}) |
| @ApiImplicitParam  | name         | 字符串 与参数命名对应         | 可用在@ApiImplicitParams里         |
|                    | value        | 字符串                 | 参数中文描述                          |
|                    | required     | 布尔值                 | true/false                         |
|                    | dataType     | 字符串                 | 参数类型                           |
|                    | paramType    | 字符串                 | 参数请求方式:query/path              |
|                    |              |                     | query:对应@RequestParam?传递            |
|                    |              |                     | path: 对应@PathVariable{}path传递         |
|                    | defaultValue | 字符串                 | 在api测试中默认值                        |
|                    |              |                     | 用例参见项目中的设置                       |
| @ApiResponses      | {}         | @ApiResponse数组      | 可用在方法头上.参数的描述容器               |
|                    |              |                     | @ApiResponses({@ApiResponse1,@ApiResponse2,...}) |
| @ApiResponse       | code         | 整形                  | 可用在@ApiResponses里                   |
|                    | message      | 字符串                 | 错误描述                             |
|                    |              |                     | @ApiResponse(code = 200, message = "Successful") |



## Hibernate

### 返回结果接收方式

> setresulttransformer与addentity的区别是什么?
>> 一个区别是前者支持查任意的列，后者必须用select * from users的形式或select {a.*},{b.*} from a,b where ....。 
>>
>> 如果使用原生sql语句进行query查询时，hibernate是不会自动把结果包装成实体的。所以要手动调用addentity(class class)等一系列方法。 
>>
>> 如session.createsqlquery(sql).addentity(class class);注意hibernate3.0.5不支持，单个参数的addentity方法 
>>
>> 另外，hibernate3.2可以对原生sql 查询使用resulttransformer。这会返回不受hibernate管理的实体。 

```java
session.createsqlquery("select name ,age,birthday from students") .setresulttransformer(transformers.aliastobean(students.class)) 
// 或
setresulttransformer(new aliastobeanresulttransformer (students.class)) 
```

>> 上面的查询将会返回students的列表,它将被实例化并且将name和birthday的值注射入对应的属性或者字段。 
但必须注意，对每一个列都必须addscalar("列名") 

- 返回结果转换为Map

```java
List<Map<String, Object>> list = session.createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
Map<String, Object> map = (Map<String, Object>) session.createSQLQuery(sql).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).uniqueResult();
```

- 当确定返回的实例只有一个或者null时 用uniqueResult()方法

```java
Double result = (Double) session.createSQLQuery(querySql).uniqueResult();
```

### HQL查询

```java
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, new String[] { loanId, InvestStatus.REPAYING });
// 或者
String hql = "from Invest i where i.loan.id=? and i.status=?";
List<Invest> is = ht.find(hql, loanId, InvestStatus.REPAYING );

// 使用in，同createSQLQuery使用方式一样
String hql = "from Invest i where i.loan.id=? and i.status in(:status)";
List<Invest> is = session.createQuery(sql)
					.setParameter(0, loanId)
					.setParameterList("status", Arrays.asList(InvestStatus.REPAYING, InvestStatus.OVERDUE,
							InvestStatus.COMPLETE, InvestStatus.BID_SUCCESS)).list()
```


### QBC查询

> 该方式只能用关联表的关联字段为查询条件，无法使用关联表的其他字段为查询条件

> Criteria 和 DetachedCriteria 的主要区别在于创建的形式不一样, Criteria 是在线的，所以它是由hibernate Session 进行创建的；
而 DetachedCriteria 是离线的，创建时无需Session ，DetachedCriteria 提供了 2 个静态方法 forClass(Class) 或 forEntityName(Name)进行DetachedCriteria 实例的创建。

>  spring 的框架提供了getHibernateTemplate().findByCriteria(detachedCriteria) 方法可以很方便地根据DetachedCriteria 来返回查询结果。

- hibernate5.2版本之前createCriteria()查询的方式

```java
// Restrictions.in传值为数组或list集合
List<String> status = Arrays.asList(InvestConstants.InvestStatus.REPAYING,InvestConstants.InvestStatus.OVERDUE);
DetachedCriteria criteria = DetachedCriteria.forClass(InvestExtensionPlan.class);
criteria.createAlias("invest", "i");// 当查询关联第三张表时，第二张表需要取别名
criteria.add(Restrictions.eq("i.loan.id", loanExtensionPlan.getLoan().getId()));
criteria.add(Restrictions.in("status", status));
criteria.addOrder(Order.desc("period"));// 添加排序

// 查询一范围内的的数据,需借助Criteria来查询
Criteria cri = criteria.getExecutableCriteria(ht.getSessionFactory().getCurrentSession());
cri.setFirstResult(firstResult);// 从第几条开始
cri.setMaxResults(maxResults);// 查询多少条
List<InvestExtensionPlan> investExtensionPlans = ht.findByCriteria(criteria);
```

> 模糊查询和自定义查询

```java
criteria.add(Restrictions.like("time","%" + "2018-11-13" + "%"));
criteria.add(Restrictions.sqlRestriction("time like '%2018-11-13%'"));
```

- hibernate5.2及之后版本createCriteria()查询的方式

> 原有的session.createCriteria()方法已经过时，替代的方式是使用JPA Criteria。

> session.createSQLCriteria()方法也过时了，当然可以用session.createNativeCriteria()方法来代替。

```java
//注意导入的包是import javax.persistence.criteria.CriteriaQuery;
try {
    session.beginTransaction();
    //1.创建CriteriaBuilder,用于创建查询
    CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
    //2.创建CriteriaQuery,用于设置查询语句的信息
    CriteriaQuery<Student> criteriaQuery = criteriaBuilder.createQuery(Student.class);
    //3.定义查询的From子句中能出现的类型,也可以用root.get()获取具体的某个属性
    Root<Student> root = criteriaQuery.from(Student.class);
    //4.设置WHERE字句的条件，此处条件为score<= 98
    criteriaQuery.where(criteriaBuilder.lt(root.get("score"), 98));
    //5.设置排序标准与排序方式
    criteriaQuery.orderBy(criteriaBuilder.desc(root.get("score")));
    //6.创建Query对象并获取结果集list
    Query<Student> query = session.createQuery(criteriaQuery);
    List<Student> list = query.list();
    // List<Student> list = session.createQuery(criteriaQuery).getResultList();
    //7.遍历结果集
    list.forEach(System.out::println);
    session.getTransaction().commit();
} catch (Exception e) {
    e.printStackTrace();
    session.getTransaction().rollback();
}
```

> 多表查询

```java
try {
    session.beginTransaction();
    //1.创建CriteriaBuilder
    CriteriaBuilder criteriaBuilder = session.getCriteriaBuilder();
    //2.创建CriteriaQuery
    CriteriaQuery<Country> criteriaQuery = criteriaBuilder.createQuery(Country.class);
    //3.设置distinct去重
    criteriaQuery.distinct(true);
    //4.获取root句柄
    Root<Country> root = criteriaQuery.from(Country.class);
    //5.设置fetch的连接对象以及连接类型，此处为迫切左外连接
    root.fetch("ministers", JoinType.LEFT);
    //6.设置where查询条件
    criteriaQuery.where(criteriaBuilder.equal(root.get("cid"), 1));
    //7.获取Query对象
    Query<Country> query = session.createQuery(criteriaQuery);
    //8.获取查询结构
    List<Country> list = query.list();
    // List<Student> list = session.createQuery(criteriaQuery).getResultList();
    for (Country country : list) {
	System.out.println(country);
	country.getMinisters().forEach(System.out::println);
    }
    session.getTransaction().commit();
} catch (Exception e) {
    e.printStackTrace();
    session.getTransaction().rollback();
}
```

* [调用hibernate存储过程](http://www.voidcn.com/article/p-kixpjimv-qq.html)

### 关闭session

```
if (session != null) {
	session.flush();
	session.clear();
	session.close();
}
```

- hibernate中evict()和clear()的区别

> session.evict(obj)：会把指定的缓冲对象从一级缓存中进行清除；

> session.clear()：把一级缓存中的全部对象清除，但不包括操作中的对象。

- hibernate执行的顺序如下：
> (1)生成一个事务的对象，并标记当前的session处于事务状态（此时并未启动数据库级事务）。

> (2)应用使用s.save()保存对象，这个时候Session将这个对象放入entityEntries，用来标记对象已经和当前的会话建立了关联，
> 由于应用对对对象做了保存的操作，Session还要在insertions中登记应用的这个插入行为(行为包括：对象引用、对象id、Session、持久化处理类)。

> (3)s.evict()将对象从s会话中拆离，这时s会从entityEntries中将这个对象移除。

> (4)事务提示，需要将所有缓存flush入数据库，Session启动一个事务，并按照insert ,update,...,delete的顺序提交所有之前登记的操作
（注意：所有insert执行完毕后才会执行update，这里的特殊处理也可能会将你的程序搞得一团遭，如需要控制操作的顺序，需要使用flush），
现在对象不再entityEntries中，但在执行insert的行为时只需要访问insertions就足够了，所以此时不会有任何的异常，
异常出现在插入后通知Session该对象已经插入完毕这个步骤上，这个步骤中需要将entityEntries中对象的existsInDatabase标志置true，
由于对象并不存在于entityEntres中，此时Hibernate就认为insertions和entityEntries可能因为线程安全的问题产生了不同步
（也不知道Hibernate的开发者是否考虑到例子中的处理方式，如果没有的话，这也许算是一个bug吧），
于是一个net.sf.hibernate.AssertionFailure就被抛出，程序终止。

> 一般我们会错误的认为s.sava会立即执行，而将对象过早的与session拆离，造成了session的insertion和entityEntries中内容的不同步。
所以我们在做此类操作时一定要清楚hibernate什么时候会将数据flush入数据库，在未flush之前不要将已进行操作的对象从session上拆离，解决办法是在sava之后，添加session.flush。


```java
/**
 * 验证缓存管理的方法evict
 * 执行完evict之后，将会将id为5的user对象从一级缓存中移除，再次访问的话将重新查询数据库
 * 该用例将发出2个select语句
 */
@Test
public void testEvict(){
	Session session = HibernateUtil.getSession();
	User user1 =  (User)session.get(User.class, 5);
	System.out.println(user1.getName());
	session.evict(user1);
	User user2 =  (User)session.get(User.class, 5);
	System.out.println(user2.getName());
	session.close();
}


/**
 * 验证缓存管理的方法clear
 * 执行clear方法之后，一级缓存中的对象全部被清除，再次查询，将从数据库中查询
 * 该用例将发出2个select语句
 */
@Test
public void testClear(){
	Session session = HibernateUtil.getSession();
	User user1 =  (User)session.get(User.class, 5);
	System.out.println(user1.getName());
	System.out.println("=======================");
	User user2 =  (User)session.get(User.class, 5);
	System.out.println(user2.getName());
	session.clear();


}
```

### 只读错误

> Write operations are not allowed in read-only mode (FlushMode.MANUAL):
Turn your Session into FlushMode.COMMIT/AUTO or remove 'readOnly' marker from transaction definition.

> 写操作在只读模式下不被允许(FlushMode.MANUAL): 把你的Session改成FlushMode.COMMIT/AUTO或者清除事务定义中的readOnly标记。

### 编程式修改FlushMode

```java
ht.setFlushMode(HibernateTemplate.FLUSH_AUTO);
ht.getSessionFactory().getCurrentSession().setFlushMode(FlushMode.AUTO);
```

### 配置过滤器

```xml
<filter>
	<filter-name>OpenSessionInViewFilter</filter-name>
	<filter-class>org.springframework.orm.hibernate3.support.OpenSessionInViewFilter</filter-class>
	<!-- singleSession默认为true,若设为false则等于没用OpenSessionInView 。所以默认可以不写 -->
	<init-param>
		<param-name>singleSession</param-name>
		<param-value>true</param-value>
	</init-param>
	<!-- 设置flushMode为AUTO(在确保查询从不会返回脏数据的情况下，在查询前刷新Session。)/COMMIT(Session在提交事务时刷新。) -->
	<init-param>
		<param-name>flushMode</param-name>
		<param-value>AUTO</param-value>
	</init-param>
</filter>
<filter-mapping>
	<filter-name>OpenSessionInViewFilter</filter-name>
	<url-pattern>/*</url-pattern>
</filter-mapping>
```

### 使用execute方法回调方式实现

- Dao层HibernateTemplate操作数据时，使用execute方法回调方式实现：

```java
// 原方式
getHibernateTemplate().save(user); 

// 更改后方式
getHibernateTemplate().execute(new HibernateCallback<User>() {
	@Override
	public User doInHibernate(Session session) throws HibernateException {
		session.save(user);
		return null;
	}
});

```



