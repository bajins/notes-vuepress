# Python



* [内置异常和函数](https://lichangke.github.io/category/#python)



## 线程池


* [python3异步编程](https://blog.51cto.com/445153/2138832)

* [Python 并发、并行、同步和异步](https://www.jianshu.com/p/13d2e8514546)

* [ThreadPoolExecutor](https://www.jianshu.com/p/6d6e4f745c27)


### 线程数量控制

- IO密集型

> 线程数 = CPU核心数/(1-阻塞系数)

> Blocking Coefficient(阻塞系数)（一般为0.8~0.9之间） = 阻塞时间/(阻塞时间+使用CPU的时间)

- 计算密集型

> CPU有超线程：线程数 = CPU内核线程数*2
>
> CPU无超线程：线程数 = CPU核数+1
