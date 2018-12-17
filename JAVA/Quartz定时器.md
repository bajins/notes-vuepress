## Job的状态与并发

#### @DisallowConcurrentExecution，如果使用该注解，那么同一时间将只有一个Job实例被执行。如，ReportJob有个实例为ReportForJoe，那么同一时间只有一个ReportForJoe被执行。而ReportForMike等都可以执行。 

#### @PersistJobDataAfterExecution，如果使用该注解，在Job被执行结束后，将会更新JobDataMap，这样下次Job执行后就会使用新的值而不是初始值。

#### 如果使用@PersistJobDataAfterExecution注解，推荐也使用@DisallowConcurrentExecution注解，这是为了避免并发问题导致数据紊乱。

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
			.forJob(jobDetail1).withSchedule(SimpleScheduleBuilder
			// 每隔5分钟执行一次,永远重复不限制次数执行
			.simpleSchedule().withIntervalInMinutes(5).repeatForever())
			//设置触发器开始执行JobDetail的起始时间，还有startAt() 在指定的时间去执行
			.startAt(startDate1)
			// 结束时间 endAt（“结束的时间”），实现在任务执后自动销毁任务
			.endAt(enDate)
			// 最终获得一个Trigger对象
			.build();
	try {
		// 调度容器设置JobDetail和Trigger
		scheduler.scheduleJob(jobDetail1, trigger1);
		if (log.isDebugEnabled())
			log.debug("添加[自动投标]调度成功，项目编号[" + loan.getId() + "]，时间："
					+ DateUtil.DateToString(startDate1, DateStyle.YYYY_MM_DD_HH_MM_SS_CN));
	} catch (SchedulerException e) {
		throw new RuntimeException(e);
	}
}
 ```
 
 首先从Scheduler.scheduleJob（JobDetail jobDetail，Trigger trigger）调度job， 实际上就是将job存储到RAM中的jobsByGroup，jobsByKey对应的Map中，将触发器存储到触发器（List），triggersByKey，triggersByGroup对应的Map中，及timeTriggers的Treeset中 

Scheduler.unscheduleJob（TriggerKey triggerKey）就是将triggerKey从triggersByKey,triggersByGroup,triggers,timeTriggers中移除;

Scheduler.deleteJob（JobKey jobKey）除了从容器触发中的TriggerWrapper的JobKey为jobKey的列表<TriggerWrapper>，并uncheduleJob（TriggerKey triggerKey）列表列表<TriggerWrapper>中的所有TriggerWrapper，同时从jobsByKey，jobsByGroup 的移除对应jobKey的相关信息 
