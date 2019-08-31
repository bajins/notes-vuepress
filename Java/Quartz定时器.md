# Quartz定时器

## [Quartz-API](/Java/Quartz定时器API.md)
## Job的状态与并发

> @DisallowConcurrentExecution，如果使用该注解，那么同一时间将只有一个Job实例被执行。
>> 如，ReportJob有个实例为ReportForJoe，那么同一时间只有一个ReportForJoe被执行。而ReportForMike等都可以执行。 
>
> @PersistJobDataAfterExecution，如果使用该注解，在Job被执行结束后，将会更新JobDataMap，这样下次Job执行后就会使用新的值而不是初始值。
>
> 如果使用@PersistJobDataAfterExecution注解，推荐也使用@DisallowConcurrentExecution注解，这是为了避免并发问题导致数据紊乱。

```java
public void addAutoInvestJob(Loan loan) {
	JobDetail jobDetail1 = JobBuilder.newJob(AutoInvestAfterLoanPassed.class) // 创建builder，(jobDetail的预准备对象)
			// 通过builder调用withIdentity()去设置builder的名字和分组,最后通过build()方法获得一个jobDetail对象
			.withIdentity(loan.getId(), ScheduleConstants.JobGroup.AUTO_INVEST_AFTER_LOAN_PASSED).build();
	jobDetail1.getJobDataMap().put(AutoInvestAfterLoanPassed.LOAN_ID, loan.getId());
	// FIXME:需判断DELAY_TIME是否大于0
	Date startDate1 = DateUtil.addMinute((loan.getPublishTime() != null ? loan.getPublishTime() : new Date()),
			Integer.parseInt(configService.getConfigValue(ConfigConstants.AutoInvest.DELAY_TIME)));

	Date enDate = DateUtil.addMonth(new Date(), 3);
	// 定义一个触发器trigger对象，用来执行jobDetail
	SimpleTrigger trigger1 = TriggerBuilder.newTrigger() //创建一个触发器trigger对象
			// 设置触发器的名字和分组
			.withIdentity(loan.getId(), ScheduleConstants.TriggerGroup.AUTO_INVEST_AFTER_LOAN_PASSED)
			// 设置以哪种方式执行JobDetail：
			// 一、SimpleScheduleBuilder 简单任务的重复执行SimpleScheduleBuilder.repeatSecondlyForever(5)
			// 二、CronTrigger 按日历触发任务CronScheduleBuilder.cronSchedule("0 17 1 * * ?")
			// 以及执行一次JobDetail的间隔时间,以及执行到什么时候
			.forJob(jobDetail1)
			// 每隔5分钟执行一次,永远重复不限制次数执行,失效之后，再启动马上执行
			.withSchedule(SimpleScheduleBuilder.repeatMinutelyForever(1))
			//设置触发器开始执行JobDetail的起始时间，还有startNow()立即执行
			.startAt(startDate1)
			// 结束时间 endAt（“结束的时间”），实现在任务执后自动销毁任务
			.endAt(enDate)
			// 最终获得一个Trigger对象
			.build();
	try {
		// 调度容器设置JobDetail和Trigger
		scheduler.scheduleJob(jobDetail1, trigger1);
		
		// 启动
		if (!scheduler.isShutdown()) {
			scheduler.start();
		}

		// 获取触发器状态
		TriggerState triggerState = scheduler.getTriggerState(trigger.getKey());
		// 判断触发器状态是否为暂停
		if (TriggerState.PAUSED.equals(triggerState)) {
			// 如果触发器为暂停就恢复启动
			scheduler.resumeTrigger(trigger.getKey());
		}
		
		if (log.isDebugEnabled())
			log.debug("添加[自动投标]调度成功，项目编号[" + loan.getId() + "]，时间："
					+ DateUtil.DateToString(startDate1, DateStyle.YYYY_MM_DD_HH_MM_SS_CN));
	} catch (SchedulerException e) {
		throw new RuntimeException(e);
	}
}
```
 
```java
// 暂停触发器
scheduler.pauseTrigger(triggerKey);
// 恢复触发器
scheduler.resumeTrigger(triggerKey);
// 移除触发器
scheduler.unscheduleJob(triggerKey);

// 暂停任务
scheduler.pauseJob(jobKey);
// 恢复一个任务
scheduler.resumeJob(jobKey);
// 从调度器中删除这个唯一任务时同时会删除相关联的触发器
scheduler.deleteJob(jobKey);
```

> 首先从Scheduler.scheduleJob（JobDetail jobDetail，Trigger trigger）调度job， 实际上就是将job存储到RAM中的jobsByGroup，
jobsByKey对应的Map中，将触发器存储到触发器（List），triggersByKey，triggersByGroup对应的Map中，及timeTriggers的Treeset中 
>
> Scheduler.unscheduleJob（TriggerKey triggerKey）就是将triggerKey从triggersByKey，triggersByGroup，triggers，timeTriggers中移除;
>
> Scheduler.deleteJob（JobKey jobKey）除了从容器触发中的TriggerWrapper的JobKey为jobKey的列表<TriggerWrapper>，
并uncheduleJob（TriggerKey triggerKey）列表列表<TriggerWrapper>中的所有TriggerWrapper，同时从jobsByKey，jobsByGroup 的移除对应jobKey的相关信息 

## Quartz的Misfire处理规则
```java
调度(scheduleJob)或恢复调度(resumeTrigger,resumeJob)后不同的misfire对应的处理规则

CronTrigger 

withMisfireHandlingInstructionDoNothing
——不触发立即执行
——等待下次Cron触发频率到达时刻开始按照Cron频率依次执行

withMisfireHandlingInstructionIgnoreMisfires
——以错过的第一个频率时间立刻开始执行
——重做错过的所有频率周期后
——当下一次触发频率发生时间大于当前时间后，再按照正常的Cron频率依次执行

withMisfireHandlingInstructionFireAndProceed
——以当前时间为触发频率立刻触发一次执行
——然后按照Cron频率依次执行


SimpleTrigger 

withMisfireHandlingInstructionFireNow
——以当前时间为触发频率立即触发执行
——执行至FinalTIme的剩余周期次数
——以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
——调整后的FinalTime会略大于根据starttime计算的到的FinalTime值

withMisfireHandlingInstructionIgnoreMisfires
——以错过的第一个频率时间立刻开始执行
——重做错过的所有频率周期
——当下一次触发频率发生时间大于当前时间以后，按照Interval的依次执行剩下的频率
——共执行RepeatCount+1次

withMisfireHandlingInstructionNextWithExistingCount
——不触发立即执行
——等待下次触发频率周期时刻，执行至FinalTime的剩余周期次数
——以startTime为基准计算周期频率，并得到FinalTime
——即使中间出现pause，resume以后保持FinalTime时间不变


withMisfireHandlingInstructionNowWithExistingCount
——以当前时间为触发频率立即触发执行
——执行至FinalTIme的剩余周期次数
——以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
——调整后的FinalTime会略大于根据starttime计算的到的FinalTime值

withMisfireHandlingInstructionNextWithRemainingCount
——不触发立即执行
——等待下次触发频率周期时刻，执行至FinalTime的剩余周期次数
——以startTime为基准计算周期频率，并得到FinalTime
——即使中间出现pause，resume以后保持FinalTime时间不变

withMisfireHandlingInstructionNowWithRemainingCount
——以当前时间为触发频率立即触发执行
——执行至FinalTIme的剩余周期次数
——以调度或恢复调度的时刻为基准的周期频率，FinalTime根据剩余次数和当前时间计算得到
——调整后的FinalTime会略大于根据starttime计算的到的FinalTime值

MISFIRE_INSTRUCTION_RESCHEDULE_NOW_WITH_REMAINING_REPEAT_COUNT
——此指令导致trigger忘记原始设置的starttime和repeat-count
——触发器的repeat-count将被设置为剩余的次数
——这样会导致后面无法获得原始设定的starttime和repeat-count值
```
