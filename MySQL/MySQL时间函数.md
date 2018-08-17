# MySQL时间相关函数

## MySQL获取当前日期及日期格式

## 1.1 获得当前日期+时间（date + time）函数：now() 

#### 除了 now() 函数能获得当前的日期时间外，MySQL 中还有下面的函数： 
```sql
current_timestamp() current_timestamp 
localtime() localtime 
localtimestamp() localtimestamp 
```
#### 这些日期时间函数，都等同于 now()。鉴于 now() 函数简短易记，建议总是使用 now() 来替代上面列出的函数。

## 1.2 获得当前日期+时间（date + time）函数：sysdate()

#### sysdate() 日期时间函数跟 now() 类似，不同之处在于：now() 在执行开始时值就得到了， sysdate() 在函数执行时动态得到值。

## 2. 获得当前日期（date）函数：curdate() 

#### 其中，下面的两个日期函数等同于 curdate()： current_date(),current_date 

## 3. 获得当前时间（time）函数：curtime() 

#### 其中，下面的两个时间函数等同于 curtime()：current_time(),current_time 

## 4. 获得当前 UTC 日期时间函数：utc_date(), utc_time(), utc_timestamp()


格式化日期： DATE_FORMAT(date, format)

```diff
%S, %s 两位数字形式的秒（ 00,01, ..., 59）
%I, %i 两位数字形式的分（ 00,01, ..., 59）
%H 两位数字形式的小时，24 小时（00,01, ..., 23）
%h 两位数字形式的小时，12 小时（01,02, ..., 12）
%k 数字形式的小时，24 小时（0,1, ..., 23）
%l 数字形式的小时，12 小时（1, 2, ..., 12）
%T 24 小时的时间形式（hh:mm:ss）
%r 12 小时的时间形式（hh:mm:ss AM 或hh:mm:ss PM）
%p AM或PM
%W 一周中每一天的名称（Sunday, Monday, ..., Saturday）
%a 一周中每一天名称的缩写（Sun, Mon, ..., Sat）
%d 两位数字表示月中的天数（00, 01,..., 31）
%e 数字形式表示月中的天数（1, 2， ..., 31）
%D 英文后缀表示月中的天数（1st, 2nd, 3rd,...）
%w 以数字形式表示周中的天数（ 0 = Sunday, 1=Monday, ..., 6=Saturday）
%j 以三位数字表示年中的天数（ 001, 002, ..., 366）
%U 周（0, 1, 52），其中Sunday 为周中的第一天
%u 周（0, 1, 52），其中Monday 为周中的第一天
%M 月名（January, February, ..., December）
%b 缩写的月名（ January, February,...., December）
%m 两位数字表示的月份（01, 02, ..., 12）
%c 数字表示的月份（1, 2, ...., 12）
%Y 四位数字表示的年份
%y 两位数字表示的年份
%% 直接值“%”
```

## MySQL 日期时间 Extract（选取） 函数。
## 1. 选取日期时间的各个部分：日期、时间、年、季度、月、日、小时、分钟、秒、微秒
```sql
set @dt = '2008-09-10 07:15:30.123456';
 
select date(@dt); -- 2008-09-10
select time(@dt); -- 07:15:30.123456
select year(@dt); -- 2008
select quarter(@dt); -- 3
select month(@dt); -- 9
select week(@dt); -- 36
select day(@dt); -- 10
select hour(@dt); -- 7
select minute(@dt); -- 15
select second(@dt); -- 30
select microsecond(@dt); -- 123456
```
## 2. MySQL Extract() 函数，可以上面实现类似的功能：
```sql
set @dt = '2008-09-10 07:15:30.123456';
 
select extract(year from @dt); -- 2008
select extract(quarter from @dt); -- 3
select extract(month from @dt); -- 9
select extract(week from @dt); -- 36
select extract(day from @dt); -- 10
select extract(hour from @dt); -- 7
select extract(minute from @dt); -- 15
select extract(second from @dt); -- 30
select extract(microsecond from @dt); -- 123456select extract(year_month from @dt); -- 200809
select extract(day_hour from @dt); -- 1007
select extract(day_minute from @dt); -- 100715
select extract(day_second from @dt); -- 10071530
select extract(day_microsecond from @dt); -- 10071530123456
select extract(hour_minute from @dt); -- 715
select extract(hour_second from @dt); -- 71530
select extract(hour_microsecond from @dt); -- 71530123456
select extract(minute_second from @dt); -- 1530
select extract(minute_microsecond from @dt); -- 1530123456
select extract(second_microsecond from @dt); -- 30123456
```
## 3. MySQL dayof… 函数：dayofweek(), dayofmonth(), dayofyear()
#### 分别返回日期参数，在一周、一月、一年中的位置。
```sql
set @dt = '2008-08-08';
select dayofweek(@dt); -- 6
select dayofmonth(@dt); -- 8
select dayofyear(@dt); -- 221
```
## MySQL 返回星期和月份名称函数：dayname(), monthname()
```sql
set @dt = '2008-08-08';
select dayname(@dt); -- Friday
select monthname(@dt); -- August
```
##  MySQL last_day() 函数：返回月份中的最后一天。
```sql
select last_day('2008-02-01'); -- 2008-02-29
select last_day('2008-08-08'); -- 2008-08-31
```
### MySQL last_day() 函数非常有用，比如我想得到当前月份中有多少天，可以这样来计算：
```sql
select now(), day(last_day(now())) as days;
```








