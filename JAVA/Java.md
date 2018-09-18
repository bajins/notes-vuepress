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
Date date=new Date();//取时间
date.clearTime()
Calendar calendar = new GregorianCalendar();
calendar.setTime(date);
calendar.set(Calendar.HOUR,0)
calendar.set(Calendar.MINUTE,0)
calendar.set(Calendar.SECOND,0)
calendar.set(Calendar.MILLISECOND,0)
System.out.println("开始时间："+calendar.getTime())
calendar.set(Calendar.HOUR,23)
calendar.set(Calendar.MINUTE,59)
calendar.set(Calendar.SECOND,59)
calendar.set(Calendar.MILLISECOND,999)
System.out.println("结束时间："+calendar.getTime())
```


## BigDecimal
```sql
// 四舍五入保留两位小数
BigDecimal setScale = new BigDecimal(money).setScale(2, BigDecimal.ROUND_HALF_UP);
```
