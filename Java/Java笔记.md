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


## 多行字符串

- Multiline String 多行字符串
- Template String 模板字符串
- Text Blocks 文本块

> Java 13 Text Blocks 第一次预览版，Java 14 Text Blocks 第二次预览版，Java 15 Text Blocks 正式版


## 函数重载

- 方法名相同,方法参数的个数和类型不同,通过个数和类型的不同来区分不同的函数;
- 方法的重载跟返回值类型和修饰符无关,Java的重载是发生在本类中的,重载的条件是在本类中有多个方法名相同;
- 参数列表不同(参数个数不同、参数类型不同)跟返回值无关;


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

- `src`不是`classpath`，`WEB-INF/classes`和`lib`才是`classpath`，`WEB-INF/`是资源目录, 客户端不能直接访问
- `WEB-INF/classes`目录存放`src`目录`java`文件编译之后的`class`文件、`xml`、`properties`等资源配置文件，这是一个定位资源的入口
- `lib`和`classes`同属`classpath`，两者的访问优先级为: `lib` > `classes`


+ `classpath`：只会到你的`class`路径中查找文件

> `classpath:`和`classpath:/`是等价的，都是相对于类的根路径。资源文件库标准的在文件系统中，也可以在`JAR`或`WAR`的类包中。

+ `classpath*`：不仅包含`class`路径，还包括`jar`文件中（`class`路径）进行查找

> 注意：用`classpath*`需要遍历所有的`classpath`，所以加载速度是很慢，尽量避免使用

> 项目模块依赖深度：A –> B –> C，在B中没有配置文件的情况下，A中的`classpath*`加载到B的配置文件，
> C加载自己配置文件要用`classpath*`，否则A加载配置文件无法加载到C的配置文件

+ `**`表示在任意目录下，也就是说在`WEB-INF/classes/`下任意层的目录




## 时间

### JDK8以下时间日期API

#### java.lang.System类

```java
public static native long currentTimeMillis();
```

> 用于返回当前时间与1970年1月1日0:0:0之间以毫秒为单位的时间差

> 时间戳

#### java.util.Date类

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


#### java.text.SimpleDateFormat类

> Date类的API不易于国际化,大部分被废弃,`SimpleDateFormat`类 一个与语言环境有关的方式来格式化和解析时间的具体类

> `format()` 方法 按照具体的格式格式化时间

> `parse()` 方法 将字符串解析成时间

#### java.util.Calendar日历类

- 获取`Calendar`的实例

> 使用其子类`GregorianCalendar`的对象
>
> 使用`Calendar.getInstance()`

**常用方法**

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

* [jdk8时间日期](https://codertang.com/2018/12/24/jdk8-datetime)

- 可变性 : 像日期和时间这样的类应该是不可变的,返回一个值,原来的对象不变
- 偏移性 : Date中的年份是从1900开始的,而月份是从0开始的
- 日期表示需要减`new Date(2020-1900,9-1,8)` 这样才可以表示2020年9月8日
- 格式化: 格式化日期只对Date有用,Calendar则不行
- 线程不安全的,不能处理闰秒等
- Java8吸收了`Joda-Time`（该项目作者参与了Java8的time包开发）精华，开启了新的API


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




#### `Date`和LocalDate相互转换

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

* [https://blog.csdn.net/alanzyy/article/details/8465098](https://blog.csdn.net/alanzyy/article/details/8465098)
* [https://my.oschina.net/sunchp/blog/670909](https://my.oschina.net/sunchp/blog/670909)
* [https://blog.csdn.net/chendaoqiu/article/details/45841283](https://blog.csdn.net/chendaoqiu/article/details/45841283)

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


```java
public static void main(String[] args) {
    List<String> list = Arrays.asList("a","b","c");
    // 方法一
    int index = (int) (Math.random()* list.size());
    System.out.println(list.get(index));

    // 方法二：shuffle 打乱顺序 
    Collections.shuffle(list);
    System.out.println(list.get(0));
}
```



### Map

**遍历**

```java
// entrySet迭代，不能移除元素
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    System.out.println("方法一：key =" + entry.getKey() + "---value=" + entry.getValue());
}

// 遍历键
for (Integer key : map.keySet()) {
    System.out.println("方法二：key = " + key);
}
Iterator<Integer> keyIterator = map.keySet().iterator();
while (keyIterator.hasNext()) {
    Integer key = keyIterator.next();
    System.out.println("方法二：key = " + key);
}
// 遍历值
for (String value : map.values()) {
    System.out.println("方法二：value = " + value);
}

// Iterator迭代，可调用entries.remove()移除元素：使用了泛型，如果不使用泛型键值则需要强转
Iterator<Map.Entry<Integer, String>> entries = map.entrySet().iterator();
while (entries.hasNext()) {
    Map.Entry<Integer, String> entry = entries.next();
    System.out.println("方法三：key = " + entry.getKey() + "--value=" + entry.getValue());
}

// 遍历键获取值：效率低，通过key得到value值更耗时
for (Integer key : map.keySet()) {
    String value = map.get(key);
    System.out.println("方法四：Key = " + key + ", Value = " + value);
}
Iterator<Integer> keyIterator1 = map.keySet().iterator();
while (keyIterator1.hasNext()) {
    Integer key = keyIterator1.next();
    String value = map.get(key);
    System.out.println("方法四：Key = " + key + ", Value = " + value);
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

> static方法可以直接类名加方法名调用，方法中无法使用this，所以它锁的不是this，而是Class，所以static synchronized方法也相当于全局锁，相当于锁住了代码段。



```java
public class Demo {

    // 同步实例方法，锁住的是当前实例对象，不同对象实例访问时不会阻塞
    public synchronized void method() {
    }

    // 同步静态方法，锁住的是当前类，不同对象实例访问时都会被阻塞
    public static synchronized void methods() {
    }

    public void test() {
        // 同步代码块，锁住的是当前实例对象，相对于同步实例方法粒度更小
        synchronized (this) {
        }
        // 同步代码块，锁住的是类，可以是当前类或任意类
        synchronized (Demo.class) {
        }
        // 同步代码块，任意实例对象作为锁，锁住的是指定的实例对象，
        // 注意Integer、Character、Short、Long等有缓存，
        // 如果超出范围锁住的是新对象
        String lock = "";
        // String.intern()是一个Native方法,当调用 intern 方法时，
        // 如果常量池中已经该字符串，则返回池中的字符串；
        // 否则将此字符串添加到常量池中，并返回字符串的引用。
        synchronized (lock.intern()) {
        }
    }

    // 同步静态方法，锁住的是类，可以是当前类或任意类，
    // 不同对象实例访问时都会被阻塞
    public static void testStatic() {
        synchronized (Demo.class) {
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



## 进程线程协程

### 进程

```java
import java.io.IOException;
//如何用java语言开启一个进程
public class ProcessDemo {
    public static void main(String[] args) throws IOException{
        //方式一：使用Runtime的exec方法
        Runtime.getRuntime().exec("notepad");
        //方式二：使用ProcessBuilder类中的start方法
        ProcessBuilder pb = new ProcessBuilder("notepad");
        Process p1 = pb.start();
        p1.waitFor();
    }
}
```


### 线程

- 继承`Thread`类创建线程类

```java
class ThreadTest extends Thread {
    public void run() {
        try {
            // 休眠3秒
            Thread.sleep(1000 * 3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(getName());
    }

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            ThreadTest threadTest = new ThreadTest();
            threadTest.start();
        }
    }
}
```

- 实现`Runnable`接口创建线程

```java
class ThreadTest implements Runnable {
    public void run() {
        try {
            // 休眠3秒
            Thread.sleep(1000 * 3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(Thread.currentThread().getName());
    }

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            ThreadTest rtt = new ThreadTest();
            new Thread(rtt, String.valueOf(i)).start();
        }
    }
}
```


- 直接在函数体使用，匿名内部类，其实也是属于第二种实现方式的特例

```java
public class ThreadTest {

    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            Thread thread = new Thread(new Runnable() {
                public void run() {
                    try {
                        // 休眠3秒
                        Thread.sleep(1000 * 3);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName());
                }
            });
            thread.start();
        }
    }
}

// JDK1.8及以上
public class ThreadTest {

    public static void main(String[] args) {
        for (int i = 0; i < 20; i++) {
            new Thread(() -> {
                try {
                    // 休眠3秒
                    Thread.sleep(1000 * 3);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName());
            }).start();
        }
    }
}
```



- 使用Callable和Future创建线程

1. 定义一个类实现`Callable`接口，并重写`call()`方法，该`call()`方法将作为线程执行体，并且有返回值
2. 创建Callable实现类的实例，使用FutureTask类来包装Callable对象
3. 使用FutureTask对象作为Thread对象的target创建并启动线程
4. 调用FutureTask对象的get()方法来获得子线程执行结束后的返回值


```java
import java.util.concurrent.*;

class ThreadTest implements Callable<String> {

    @Override
    public String call() throws Exception {
        try {
            // 休眠3秒
            Thread.sleep(1000 * 3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Thread.currentThread().getName();
    }

    public static void main(String[] args) {
        FutureTask<String> futureTask = new FutureTask<String>(new ThreadTest());
        for (int i = 0; i < 20; i++) {
            new Thread(futureTask, String.valueOf(i)).start();
        }
        try {
            System.out.println("子线程的返回值：" + futureTask.get());
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

> 多个任务，开启多线程去执行，并依次获取返回的执行结果

```java
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

class ThreadTest implements Callable<String> {

    @Override
    public String call() throws Exception {
        try {
            // 休眠3秒
            Thread.sleep(1000 * 3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return Thread.currentThread().getName();
    }

    public static void main(String[] args) {
        //创建一个FutureTask list来放置所有的任务
        List<FutureTask<String>> futureTasks = new ArrayList<>();
        for (Integer i = 0; i < 10; i++) {
            FutureTask<String> futureTask = new FutureTask<>(new ThreadTest());
            futureTasks.add(futureTask);
            new Thread(futureTask).start();
        }

        // 根据任务数，依次的去获取任务返回的结果，这里获取结果时会依次返回，若前一个没返回，则会等待，阻塞
        for (FutureTask futureTask : futureTasks) {
            try {
                System.out.println(futureTask.get());
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
        }
    }
}

```




### 线程池

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ThreadPool {

    public static void main(String[] args) {
        // 创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待。
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        // 创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程。
        //ExecutorService executorService = Executors.newCachedThreadPool();
        // 创建一个定长线程池，支持定时及周期性任务执行。
        //ExecutorService executorService = Executors.newScheduledThreadPool();
        for (int i = 0; i < 10; i++) {
            // 执行
            executorService.execute(new RunnableThread());
            // 提交配合shutdown使用
            //executorService.submit(futureTask);
        }
        //executorService.shutdown();
    }
}

class RunnableThread implements Runnable {

    public void run() {
        for (int i = 0; i < 10; i++) {
            System.out.println("线程" + Thread.currentThread() + " " + i);
        }
    }
}
```


### 协程

> Java语言并没有对协程的原生支持，但是某些开源框架模拟出了协程的功能


* [异步时代-java的协程路在何方](https://www.cnblogs.com/tohxyblog/p/10712798.html)
* [次时代Java编程（一）：Java里的协程](https://blog.csdn.net/qiansg123/article/details/80123051)
* [java协程框架quasar和kotlin中的协程](http://kailing.pub/article/index/arcid/252.html)
* [https://github.com/kilim/kilim](https://github.com/kilim/kilim)
[Kilim工作原理](http://chen-tao.github.io/2015/10/02/kilim-work-way/)
* [https://github.com/puniverse/quasar](https://github.com/puniverse/quasar)
[quasar从原理到代码应用](https://blog.csdn.net/guzhangyu12345/article/details/84666423)



## HTTP

- Apache HttpClient GET拼接URL参数

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
