# Java锁


## synchronized

> synchronized(this)以及非static的synchronized方法，只能防止多个线程同时执行同一个对象的同步代码段。
>
> synchronized锁住的是代码还是对象？
>> 答案是：synchronized锁住的是括号里的对象，而不是代码。对于非static的synchronized方法，锁的就是对象本身也就是this。
>
> 当synchronized锁住一个对象后，别的线程如果也想拿到这个对象的锁，就必须等待这个线程执行完成释放锁，才能再次给对象加锁，这样才达到线程同步的目的。
>
> 即使两个不同的代码段，都要锁同一个对象，那么这两个代码段也不能在多线程环境下同时运行。
>
> 所以我们在用synchronized关键字的时候，尽量缩小代码段的范围，尽量不要在整个方法上加同步。这叫减小锁的粒度，使代码更大程度的并发。
>
> static方法可以直接类名加方法名调用，方法中无法使用this，所以它锁的不是this，而是类的Class对象，所以static synchronized方法也相当于全局锁，相当于锁住了代码段。

![](/images/synchronized使用方式.png)

```java
public class SynchronizedDemo {
    // 这是静态的锁,因为静态就带有this的含义,所以不能用this,而用类.class
    public static void test() {
        synchronized (SynchronizedDemo.class) {
            // 业务逻辑......
        }
    }
}
```
```java
// 测试过，在quartz中两个任务同时执行时无效！
public class SynchronizedDemo {
    public void test() {
        synchronized (this) {
            // 业务逻辑......
        }
    }
}
```
## 将任意对象作为对象监视器
> 多个线程持有对象监视器作为同一个对象的前提下，同一时间只有一个线程可以执行synchronized(任意自定义对象)同步代码快。
```java
public class SynchronizedDemo {
    public void test() {
        synchronized (Object.class) {
            // 业务逻辑......
        }
    }
}
```
```java
public class SynchronizedDemo {
    // lock放在方法外部会使整个方法同步
    // String lock = "";
    public void test() {
        // lock放在方法内部使同步代码块同步
        String lock = "";
        synchronized (lock) {
            // 业务逻辑......
        }
    }
}
```
