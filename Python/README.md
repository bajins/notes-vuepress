# Python



## flag

> 由于`Python`是动态编译的语言，和`C`/`C++`、`Java`或者`Kotlin`等静态语言不同，它是在运行时一句一句代码地边编译边执行的，
> 而`Java`是提前将高级语言编译成了`JVM`字节码，运行时直接通过JVM和机器打交道，所以进行密集计算时运行速度远高于动态编译语言。
> 但是根据`二八定律`（帕累托法则），有`80%`的计算资源只被`20%`的程序所使用，因此在大部分情况下，
> 原生的`CPython`解释器已经足够满足日常编程，加上很多科学计算库底层都是`C`/`C++`写的，一般不会用`Python`做密集计算。


> 当你从官网下载并安装好`Python`后，就自带了一个`CPython`解释器，是使用最广的`Python`解释器，
> 我们在终端使用`python xxx.py`命令就是调用的`CPython`解释器。

> `PyPy`使用了`JIT`（即时编译）技术，混合了动态编译和静态编译的特性，仍然是一句一句编译源代码，
> 但是会将翻译过的代码缓存起来以降低性能损耗。相对于静态编译代码，即时编译的代码可以处理延迟绑定并增强安全性。

* [GO-Node-Python的简单性能比较](https://www.izhongxia.com/posts/64310.html)

* [https://docs.python.org/zh-cn](https://docs.python.org/zh-cn)

* [内置异常和函数](https://lichangke.github.io/category/#python)

* [Python语言小册](https://python.fasionchan.com/zh_CN/latest/index.html)

* [https://www.junmajinlong.com/python/index](https://www.junmajinlong.com/python/index)

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



## SQLite3

* [SQLite教程（内置日期和时间函数）](https://blog.csdn.net/hexingen/article/details/71577318)

- 连接符

| 连接符  | 说明       |
|------|----------|
| \-    | 算术减法     |
| \!=  | 关系不等于    |
| %    | 算术模量     |
| &    | 逻辑与      |
| \*   | 算术乘法     |
| /    | 算术除法     |
| \|   | 逻辑或      |
| \|\| | 字符串串联    |
| \+   | 算术加法     |
| <    | 关系小于     |
| <<   | 按位右移     |
| <=   | 关系式小于或等于 |
| <>   | 关系不等于    |
| =    | 关系等于     |
| ==   | 关系等于     |
| >    | 关系大于     |
| >=   | 关系大于或等于  |
| >>   | 按位左移     |
| AND  | 逻辑与      |
| GLOB | 关系文件名匹配  |
| IN   | 逻辑输入     |
| LIKE | 关系字符串匹配  |
| OR   | 逻辑或      |



## 定时任务

[Python3-定时任务五种实现方式](https://blog.51cto.com/huangyg/2367088)

1. sched模块
2. 循环+sleep
3. 线程模块中Timer类
4. 第三方模块：schedule
5. 定时框架：APScheduler、Celery
