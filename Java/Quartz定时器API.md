# Quartz定时器API

#### 参考：https://blog.csdn.net/QXC1281/article/details/68924140
## Quartz API核心接口有：
> Scheduler – (调度器)与scheduler交互的主要API； 
>
> Job – (作业)你通过scheduler执行任务，你的任务类需要实现的接口； 
>
> JobDetail – (作业实例)定义Job的实例； 
>
> Trigger – (触发器)触发Job的执行； 
>
> JobBuilder – 定义和创建JobDetail实例的接口; 
>
> TriggerBuilder – 定义和创建Trigger实例的接口；


## 1.触发器接口基本介绍
### Trigger触发器方法介绍
```diff
// 触发器状态  
TriggerState  
    |-public enum TriggerState { NONE, NORMAL, PAUSED, COMPLETE, ERROR, BLOCKED }  
        |-NONE 无  
        |-NORMAL 正常状态  
        |-PAUSED 暂停状态   
        |-COMPLETE 完成  
        |-ERROR 错误  
        |-BLOCKED 堵塞   

// 执行完成时状态  
CompletedExecutionInstruction
    |-    public enum CompletedExecutionInstruction { 
            NOOP, RE_EXECUTE_JOB, SET_TRIGGER_COMPLETE, DELETE_TRIGGER, 
            SET_ALL_JOB_TRIGGERS_COMPLETE, SET_TRIGGER_ERROR, SET_ALL_JOB_TRIGGERS_ERROR }   
        |-NOOP 无   
        |-RE_EXECUTE_JOB 重复执行   
        |-SET_TRIGGER_COMPLETE 触发器执行完成  
        |-DELETE_TRIGGER 删除触发器  
        |-SET_ALL_JOB_TRIGGERS_COMPLETE 所有作业和触发器执行完成    
        |-SET_TRIGGER_ERROR 触发器执行错误  
        |-SET_ALL_JOB_TRIGGERS_ERROR 设置所有都是错误的  


TriggerTimeComparator  
getKey 获取触发器key值   
getJobKey  获取作业key 
getDescription 获取面熟  
getCalendarName 获取日历名称  
getJobDataMap 获取作业数据map  
getPriority 获取优先级  
mayFireAgain 是否重复执行  
getStartTime 开始时间  
getEndTime 结束时间  
getNextFireTime 下一次执行时间  
getPreviousFireTime 上一执行时间  
getFireTimeAfter(Date afterTime) 获取某个时间后的运行时间     
getFinalFireTime 获取最后执行时间  
getMisfireInstruction 获取失败策略  
getTriggerBuilder 获取触发器建造者    
getScheduleBuilder 获取调度类建造者 
equals   
compareTo    

// 失败策略   
MISFIRE_INSTRUCTION_SMART_POLICY   
MISFIRE_INSTRUCTION_IGNORE_MISFIRE_POLICY   
DEFAULT_PRIORITY
```
## 2.触发器实现类
```diff
Trigger (org.quartz)    
    |-CalendarIntervalTrigger (org.quartz) 日期触发器   
    |   |-CalendarIntervalTriggerImpl (org.quartz.impl.triggers)   
    |-MutableTrigger (org.quartz.spi)   
    |   |-OperableTrigger (org.quartz.spi)    
    |       |-AbstractTrigger (org.quartz.impl.triggers)    
    |           |-CalendarIntervalTriggerImpl (org.quartz.impl.triggers)   
    |           |-SimpleTriggerImpl (org.quartz.impl.triggers)   
    |           |-DailyTimeIntervalTriggerImpl (org.quartz.impl.triggers)   
    |           |-CronTriggerImpl (org.quartz.impl.triggers)
    |-SimpleTrigger (org.quartz) 简单触发器  
    |   |-SimpleTriggerImpl (org.quartz.impl.triggers)  
    |-CoreTrigger (org.quartz.impl.triggers)  
    |   |-CalendarIntervalTriggerImpl (org.quartz.impl.triggers)   
    |   |-SimpleTriggerImpl (org.quartz.impl.triggers)   
    |   |-DailyTimeIntervalTriggerImpl (org.quartz.impl.triggers)  
    |   |-CronTriggerImpl (org.quartz.impl.triggers)
    |-CronTrigger (org.quartz) cron表达式   
    |   |-CronTriggerImpl (org.quartz.impl.triggers)  
    |-DailyTimeIntervalTrigger (org.quartz)日期触发类(日)    
        |-DailyTimeIntervalTriggerImpl (org.quartz.impl.triggers)
```
> 常用 
>> 1. SimpleTrigger :简单触发器 
>>
>> 2. CalendarIntervalTrigger:日历触发器 
>>
>> 3. CronTrigger:Cron表达式触发器 
>>
>> 4. DailyTimeIntervalTrigger:日期触发器

## 3.调度器建造者
```diff
// 用于创建各个调度器  
ScheduleBuilder (org.quartz)   
    |-CalendarIntervalScheduleBuilder (org.quartz)    
    |-DailyTimeIntervalScheduleBuilder (org.quartz)   
    |-SimpleScheduleBuilder (org.quartz)       
    |-CronScheduleBuilder (org.quartz)
```
## 4.触发器建造者
#### 简单触发器器源码分析,利用了建造者模式
```java
private TriggerBuilder() 构造函数私有  
public static TriggerBuilder<Trigger> newTrigger()  创建一个建造者
build() 创建触发器  
// 根据name和默认的group(即"DEFAULT_GROUP")创建trigger的key
public TriggerBuilder<T> withIdentity(String name) 
public TriggerBuilder<T> withIdentity(String name, String group)
public TriggerBuilder<T> withIdentity(TriggerKey triggerKey)


public TriggerBuilder<T> withDescription(String triggerDescription) 描述  
public TriggerBuilder<T> withPriority(int triggerPriority) 优先级
public TriggerBuilder<T> modifiedByCalendar(String calName) 日期
public TriggerBuilder<T> startAt(Date triggerStartTime) 开始时间
public TriggerBuilder<T> startNow() 立即执行
public TriggerBuilder<T> endAt(Date triggerEndTime) 结束时间
public <SBT extends T> TriggerBuilder<SBT> withSchedule(ScheduleBuilder<SBT> schedBuilder) 调度器
public TriggerBuilder<T> forJob(JobKey keyOfJobToFire) 设置作业
public TriggerBuilder<T> forJob(String jobName)
public TriggerBuilder<T> forJob(String jobName, String jobGroup)
public TriggerBuilder<T> forJob(JobDetail jobDetail)
usingJobData(----,----) 设置作业内容


key
description
startTime
endTime
priority Trigger.DEFAULT_PRIORITY 
calendarName
jobKey
jobDataMap
scheduleBuilder
```
## 5.SimpleTrigger-简单触发器
### 5.1.简单调度器建造者
```java
//构造函数私有化
protected SimpleScheduleBuilder() 
//获取简单调度器
public static SimpleScheduleBuilder simpleSchedule()
/***********************/
// 1分钟执行(一直执行)   
public static SimpleScheduleBuilder repeatMinutelyForever() 
//每隔几分钟执行(一直执行)   
public static SimpleScheduleBuilder repeatMinutelyForever(int minutes) 
// 1秒执行(一直执行)      
public static SimpleScheduleBuilder repeatSecondlyForever() 
//每隔几秒钟执行(一直执行)   
public static SimpleScheduleBuilder repeatSecondlyForever(int seconds) 
// 1小时执行(一直执行)   
public static SimpleScheduleBuilder repeatHourlyForever() 
//每隔几小时钟执行(一直执行) 
public static SimpleScheduleBuilder repeatHourlyForever(int hours)   
/***********************/
)//间隔时间为1分钟，总的执行次数为count
public static SimpleScheduleBuilder repeatMinutelyForTotalCount(int count   
//间隔时间为几分钟，总的执行次数为count   .............
public static SimpleScheduleBuilder repeatMinutelyForTotalCount(int count, int minutes)
public static SimpleScheduleBuilder repeatSecondlyForTotalCount(int count)
public static SimpleScheduleBuilder repeatSecondlyForTotalCount(int count, int seconds)
public static SimpleScheduleBuilder repeatHourlyForTotalCount(int count)
public static SimpleScheduleBuilder repeatHourlyForTotalCount(int count, int hours)
/***********************/
public MutableTrigger build() 创建一个Trigger
/***********************/
// 几秒钟重复执行   
public SimpleScheduleBuilder withIntervalInMilliseconds(long intervalInMillis)
public SimpleScheduleBuilder withIntervalInSeconds(int intervalInSeconds)
public SimpleScheduleBuilder withIntervalInMinutes(int intervalInMinutes)
public SimpleScheduleBuilder withIntervalInHours(int intervalInHours)
/***********************/
 // 重复执行册数  
public SimpleScheduleBuilder withRepeatCount(int triggerRepeatCount)
/***********************/
参考地址  
http://blog.sina.com.cn/s/blog_56d8ea900101eu45.html

//以错过的第一个频率时间立刻开始执行
//重做错过的所有频率周期后
//当下一次触发频率发生时间大于当前时间后，再按照正常的Cron频率依次执行
public SimpleScheduleBuilder withMisfireHandlingInstructionIgnoreMisfires()
//以当前时间为触发频率立即触发执行
//执行至FinalTIme的剩余周期次数
//以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
//调整后的FinalTime会略大于根据starttime计算的到的FinalTime值
public SimpleScheduleBuilder withMisfireHandlingInstructionFireNow()
//不触发立即执行
//等待下次触发频率周期时刻，执行至FinalTime的剩余周期次数
//以startTime为基准计算周期频率，并得到FinalTime
//即使中间出现pause，resume以后保持FinalTime时间不变
public SimpleScheduleBuilder withMisfireHandlingInstructionNextWithExistingCount()
//不触发立即执行
//等待下次触发频率周期时刻，执行至FinalTime的剩余周期次数
//以startTime为基准计算周期频率，并得到FinalTime
//即使中间出现pause，resume以后保持FinalTime时间不变
public SimpleScheduleBuilder withMisfireHandlingInstructionNextWithRemainingCount()
//以当前时间为触发频率立即触发执行
//执行至FinalTIme的剩余周期次数
//以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
//调整后的FinalTime会略大于根据starttime计算的到的FinalTime值
public SimpleScheduleBuilder withMisfireHandlingInstructionNowWithExistingCount()
//以当前时间为触发频率立即触发执行
//执行至FinalTIme的剩余周期次数
//以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
public SimpleScheduleBuilder withMisfireHandlingInstructionNowWithRemainingCount()


interval 时间间隔
repeatCount 重复时间
misfireInstruction
```
### 5.2.SimpleTrigger
```java
import org.quartz.*;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SimpleTriggerMain {

    public static void main(String[] args) throws SchedulerException {
        // 获取一个调度工厂
        SchedulerFactory schedFact = new org.quartz.impl.StdSchedulerFactory();

        // 获取一个调度器
        Scheduler sched = schedFact.getScheduler();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        JobDetail job = JobBuilder.newJob(HelloJob.class).withIdentity("job1", "group1").build();
        // 在当前时间15秒后运行
        Date startTime = DateBuilder.nextGivenSecondDate(new Date( ),15);
        // 创建一个SimpleTrigger实例，指定该Trigger在Scheduler中所属组及名称。
        // 接着设置调度的时间规则.当前时间15秒后运行，每10秒运行一次，共运行5次
        SimpleTrigger trigger = (SimpleTrigger) TriggerBuilder.newTrigger().withIdentity("trigger1", "group1")
                .startAt(startTime).withSchedule(SimpleScheduleBuilder.simpleSchedule()
                        .withIntervalInSeconds(10)
                        .withRepeatCount(5)
                )
                .build();
        sched.scheduleJob(job, trigger);
        // 调度启动
        sched.start();

    }
}
```
## 6.CronTriger-Cron触发器
### 6.1.Cron调度器建造者
```java
// 构造函数私有化
protected CronScheduleBuilder(CronExpression cronExpression)
public MutableTrigger build()
// 根据cron表达式建造
public static CronScheduleBuilder cronSchedule(String cronExpression)
// 核查表达式是否正确
public static CronScheduleBuilder cronScheduleNonvalidatedExpression(
            String cronExpression) throws ParseException
//表达式异常
cronScheduleNoParseException
// 利用CronExpression建造
public static CronScheduleBuilder cronSchedule(CronExpression cronExpression)
//每天在指定的时间执行，根据这个调度创建一个cron表达式
public static CronScheduleBuilder dailyAtHourAndMinute(int hour, int minute)

// 通过`分钟`、`小时`、`周`创建一个CronScheduleBuilder实例，即在某一天的给定时刻
// (通过`分钟`、`小时`指定)执行，，而天数由`周`确定，如果“周二、周四的10:05“等；
public static CronScheduleBuilder atHourAndMinuteOnGivenDaysOfWeek(
            int hour, int minute, Integer... daysOfWeek)
//调度计划：每周的某一天，在指定的时间（小时和分钟）执行
public static CronScheduleBuilder weeklyOnDayAndHourAndMinute(
            int dayOfWeek, int hour, int minute)
//调度计划：每月的某一天，在指定的时间（小时和分钟）执行
public static CronScheduleBuilder monthlyOnDayAndHourAndMinute(
            int dayOfMonth, int hour, int minute)

//设置时区
public CronScheduleBuilder inTimeZone(TimeZone timezone)
// 设置处理办法
public CronScheduleBuilder withMisfireHandlingInstructionIgnoreMisfires() 

public CronScheduleBuilder withMisfireHandlingInstructionDoNothing()

public CronScheduleBuilder withMisfireHandlingInstructionFireAndProceed()

cronExpression
misfireInstruction
```
### 6.2.Cron应用
```java
import org.quartz.*;

import java.text.SimpleDateFormat;


public class CronTriggerMain {

    public static void main(String[] args) throws SchedulerException {
        SchedulerFactory schedFact = new org.quartz.impl.StdSchedulerFactory();

        // 获取一个调度器
        Scheduler sched = schedFact.getScheduler();
        JobDetail job = JobBuilder.newJob(HelloJob.class).withIdentity("job1", "group1").build();
        // 每两秒执行
        CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "group1").withSchedule(
                CronScheduleBuilder.cronSchedule("/2 * * * * ?")
        ).build();
        sched.scheduleJob(job, trigger);
        // 调度启动
        sched.start();
    }
}
```
### 6.3.cron表达式介绍
> 字符
>> 1. `*` 每一(每一分) 
>>
>> 2. `?` 表示不关心,任意 
>>
>> 3. `-` 范围 (小时:1-12,1到12点运行) 
>>
>> 4. `,` 标示多个值 (小时 1,2,3 1点2点3点运行) 
>>
>> 5. `/` 递增触发(0/15,从0开始每15秒运行一次) 
>>
>> 6. `L` 最后(日L,当月最后一天,周L周六) 
>>
>> 7. `W` 指定日期最近的工作日(周一到周五) 
>>
>> 8. `##` 序号(表示每月的第几个周几) 
>>
> CronTrigger配置格式: [秒] [分] [小时] [日] [月] [周] [年]


|序号 | 说明 | 是否必填 | 允许填写的值 | 允许的通配符|
|-----|-----|----------|-------------|-----------|
|1    |秒   |是        |0-59         |, - * /     |
|2    |分   |是        |0-59         |, - * /     |
|3    |小时 |是        |0-23         |, - * /     |
|4    |日   |是        |1-31         |, - * ? / L W |
|5    |月   |是        |1-12 or JAN-DEC|, - * /   |
|6    |周   |是        |1-7 or SUN-SAT|, - * ? / L ## |
|7    |年   |是        |empty或1970-2099|, - * /  |

## 7.DailyTimeIntervalTrigger-日期触发
### 7.1.DailyTime调度器建造者
```java
// 建造者模式 
DailyTimeIntervalScheduleBuilder 
dailyTimeIntervalSchedule 
build

//执行时间间隔触发执行,unit时间单位 
public DailyTimeIntervalScheduleBuilder withInterval(int timeInterval, IntervalUnit unit) 
//秒 
withIntervalInSeconds 
//分钟 
withIntervalInMinutes 
//小时 
withIntervalInHours 
// 周几执行 
public DailyTimeIntervalScheduleBuilder onDaysOfTheWeek(Integer … onDaysOfWeek) 
onDaysOfTheWeek 
onMondayThroughFriday 
onSaturdayAndSunday 
onEveryDay 
// 开始触发时间 
startingDailyAt 
//结束时间 
endingDailyAt 
//支持次数 
endingDailyAfterCount 
withMisfireHandlingInstructionIgnoreMisfires 
withMisfireHandlingInstructionDoNothing 
withMisfireHandlingInstructionFireAndProceed 
//重复次数 
withRepeatCount 
validateInterval

// 常量等 
interval 
intervalUnit 
daysOfWeek 
startTimeOfDay 
endTimeOfDay 
repeatCount 
misfireInstruction 
ALL_DAYS_OF_THE_WEEK 
MONDAY_THROUGH_FRIDAY 
SATURDAY_AND_SUNDAY
```
### 7.2.应用
```java
import org.quartz.*;


public class DailyTimeIntervalTriggerMain {
    public static void main(String[] args) throws SchedulerException {
        SchedulerFactory schedFact = new org.quartz.impl.StdSchedulerFactory();

        // 获取一个调度器
        Scheduler sched = schedFact.getScheduler();

        JobDetail job = JobBuilder.newJob(HelloJob.class).withIdentity("job1", "group1").build();
        // 每两秒执行
        DailyTimeIntervalTrigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "group1").withSchedule(
                DailyTimeIntervalScheduleBuilder.dailyTimeIntervalSchedule().withInterval(2, DateBuilder.IntervalUnit.SECOND)
        ).build();
        sched.scheduleJob(job, trigger);
        // 调度启动
        sched.start();
    }
}
```
## 8.CalendarIntervalTrigger-日历触发
### 8.1.Calendar调度器建造者
```java
CalendarIntervalScheduleBuilder
calendarIntervalSchedule
build
// 和DailyTimeIntervalScheduleBuilder差不多
public CalendarIntervalScheduleBuilder withInterval(int timeInterval, IntervalUnit unit)
withIntervalInSeconds
withIntervalInMinutes
withIntervalInHours
withIntervalInDays
withIntervalInWeeks
withIntervalInMonths
withIntervalInYears

withMisfireHandlingInstructionIgnoreMisfires
withMisfireHandlingInstructionDoNothing
withMisfireHandlingInstructionFireAndProceed
inTimeZone

preserveHourOfDayAcrossDaylightSavings
skipDayIfHourDoesNotExist
validateInterval
interval
intervalUnit
misfireInstruction
timeZone
preserveHourOfDayAcrossDaylightSavings
skipDayIfHourDoesNotExist
```
### 8.1应用
```java
import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;


public class CalendarIntervalMain {
    public static void main(String[] args) throws SchedulerException {
        SchedulerFactory schedFact = new StdSchedulerFactory();

        // 获取一个调度器
        Scheduler sched = schedFact.getScheduler();

        JobDetail job = JobBuilder.newJob(HelloJob.class).withIdentity("job1", "group1").build();
        // 每两秒执行
        CalendarIntervalTrigger trigger = TriggerBuilder.newTrigger().withIdentity("trigger1", "group1").withSchedule(
                CalendarIntervalScheduleBuilder.calendarIntervalSchedule().withInterval(2, DateBuilder.IntervalUnit.SECOND)
        ).build();
        sched.scheduleJob(job, trigger);
        // 调度启动
        sched.start();
    }
}
```












