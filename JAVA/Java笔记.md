# Java笔记

## Java获取当前时间加减
```java
        Date date = new Date();//获取当前时间  
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);//设置时间
        calendar.add(Calendar.YEAR, -1);//当前时间减去一年，即一年前的时间  
        calendar.add(Calendar.MONTH, -1);//当前时间前去一个月，即一个月前的时间  
        calendar.getTime();//获取一年前的时间，或者一个月前的时间  
        int year =cal.get(Calendar.YEAR);//获取年
        int month = cal.get(Calendar.MONTH )+1;//获取月，因为第一个月是0，所以要+1
        int day = calendar.get(Calendar.DATE);//获取日
        int first = c.getActualMinimum(Calendar.DAY_OF_MONTH);//获取本月最小天数
        int last = c.getActualMaximum(Calendar.DAY_OF_MONTH);//获取本月最大天数
        int time = c.get(Calendar.HOUR_OF_DAY);//获取当前小时
        int min = c.get(Calendar.MINUTE);//获取当前分钟
        int sec = c.get(Calendar.SECOND);//获取当前秒
        
        Calendar c = Calendar.getInstance(TimeZone.getTimeZone("GMT+08:00"));//获取东八区时间
```
## 获取一天的开始时间和结束时间
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

```diff
+自动填充用0，比如new DecimalFormat("0.00")保留两位小数
+不填充则用#，比如new DecimalFormat("0.##")小数有就保留没有就去掉
```

## java.math.RoundingMode是一个舍入枚举类，几个参数详解：
##### https://blog.csdn.net/alanzyy/article/details/8465098
##### https://my.oschina.net/sunchp/blog/670909
##### https://blog.csdn.net/chendaoqiu/article/details/45841283
```diff
+RoundingMode.CEILING(对应BigDecimal.ROUND_CEILING)：取右边最近的整数

+RoundingMode.UP(对应BigDecimal.ROUND_UP)：远离0取整，即负数向左取整，正数向右取整

+RoundingMode.DOWN(对应BigDecimal.ROUND_DOWN)：从不在舍弃(即截断)的小数之前增加数字（其实就是截断的意思）

+RoundingMode.FLOOR(对应BigDecimal.ROUND_FLOOR)：取左边最近的正数

+RoundingMode.HALF_UP(对应BigDecimal.ROUND_HALF_UP)：四舍五入，负数原理同上

+RoundingMode.HALF_DOWN(对应BigDecimal.ROUND_HALF_DOWN)：五舍六入，负数先取绝对值再五舍六入再负数

+RoundingMode.HALF_EVEN(对应BigDecimal.ROUND_HALF_EVEN)：这个比较绕，整数位若是奇数则四舍五入，若是偶数则五舍六入

+RoundingMode.UNNECESSARY(对应BigDecimal.ROUND_UNNECESSARY)：用于断言请求的操作具有精确结果的舍入模式，因此不需要舍入
```
