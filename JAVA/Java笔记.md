# Java笔记


## 目录
* [时间](#时间)
  * [JDK8以下时间日期API](#jdk8以下时间日期api)
    * [`java.lang.System`类](#javalangsystem类)
    * [`java.util.Date`类](#javautildate类)
    * [`java.text.SimpleDateFormat`类](#javatextsimpledateformat类)
    * [`java.util.Calendar`日历类](#javautilcalendar日历类)
      * [常用方法](#常用方法)
    * [Java获取当前时间加减](#java获取当前时间加减)
    * [获取一天的开始时间和结束时间](#获取一天的开始时间和结束时间)
  * [JDK8日期时间API](#jdk8日期时间api)
    * [`java.time`的基础包](#javatime的基础包)
    * [新的`java.time`包含了如下子类](#新的javatime包含了如下子类)
    * [`Date`和`LocalDate`相互转换](#date和localdate相互转换)
* [BigDecimal](#bigdecimal)
* [DecimalFormat](#decimalformat)
* [RoundingMode](#roundingmode)
  * [几个参数详解](#几个参数详解)
* [spring](#spring)




[https://www.yiibai.com/html/java/](https://www.yiibai.com/html/java/)


## 时间

### JDK8以下时间日期API

#### `java.lang.System`类
```java
public static native long currentTimeMillis();
```
> 用于返回当前时间与1970年1月1日0:0:0之间以毫秒为单位的时间差
>
> 时间戳

#### `java.util.Date`类
- 两个构造器
> `new Date();` 当前时间
>
> `new Date(Long 毫秒数)` 根据毫秒数创建指定日期

- 两个方法的使用
> `toString(`)` 显示当前的年,月,日,时,分,秒
>
> `getTime()` 获取当前date对象的对应的毫秒数(时间戳)

- `java.util.Date`和`java.sql.Date`互相转换
> `Date date = new java.sql.Date()`
>
> `java.sql.Date date2 = (java.sql.Date) date;`
>
> `java.sql.Date date3 = new java.sql.Date(new Date().getTime());`


#### `java.text.SimpleDateFormat`类
> Date类的API不易于国际化,大部分被废弃,`SimpleDateFormat`类 一个与语言环境有关的方式来格式化和解析时间的具体类
>
> `format()` 方法 按照具体的格式格式化时间
>
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


## spring
```java
// 手动回滚事务
TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
```