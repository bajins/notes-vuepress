# Python笔记


[[toc]]


## Flag

* [Python程序退出方式](https://blog.csdn.net/s_daqing/article/details/104752116)
* [python：subprocess模块](https://www.jianshu.com/p/430c411160f8)
* [python之pexpect模块](https://blog.csdn.net/pcn01/article/details/104993742)


## os模块

- `os.chdir(path)` 改变当前工作目录
- `os.chflags(path, flags)` 设置路径的标记为数字标记。
- `os.chmod(path, mode)` 更改权限
- `os.chown(path, uid, gid)` 更改文件所有者
- `os.chroot(path)` 改变当前进程的根目录
- `os.close(fd)` 关闭文件描述符 fd
- `os.closerange(fd_low, fd_high)` 关闭所有文件描述符，从 fd_low (包含) 到 fd_high (不包含), 错误会忽略
- `os.dup(fd)` 复制文件描述符 fd
- `os.dup2(fd, fd2)` 将一个文件描述符 fd 复制到另一个 fd2
- `os.fchdir(fd)` 通过文件描述符改变当前工作目录
- `os.fchmod(fd, mode)` 改变一个文件的访问权限，该文件由参数fd指定，参数mode是Unix下的文件访问权限。
- `os.fchown(fd, uid, gid)` 修改一个文件的所有权，这个函数修改一个文件的用户ID和用户组ID，该文件由文件描述符fd指定。
- `os.fdatasync(fd)` 强制将文件写入磁盘，该文件由文件描述符fd指定，但是不强制更新文件的状态信息。
- `os.fdopen(fd[, mode[, bufsize]])` 通过文件描述符 fd 创建一个文件对象，并返回这个文件对象
- `os.fpathconf(fd, name)` 返回一个打开的文件的系统配置信息。
    - name为检索的系统配置的值，它也许是一个定义系统值的字符串，这些名字在很多标准中指定（POSIX.1, Unix 95, Unix 98, 和其它）。
- `os.fstat(fd)` 返回文件描述符fd的状态，像stat()。
- `os.fstatvfs(fd)` 返回包含文件描述符fd的文件的文件系统的信息，像 `statvfs()`
- `os.fsync(fd)` 强制将文件描述符为fd的文件写入硬盘。
- `os.ftruncate(fd, length)` 裁剪文件描述符fd对应的文件, 所以它最大不能超过文件大小。
- `os.getcwd()` 返回当前工作目录
- `os.getcwdu()` 返回一个当前工作目录的Unicode对象
- `os.isatty(fd)` 如果文件描述符fd是打开的，同时与`tty(-like)`设备相连，则返回`true`, 否则`False`。
- `os.lchflags(path, flags)` 设置路径的标记为数字标记，类似 `chflags()`，但是没有软链接
- `os.lchmod(path, mode)` 修改连接文件权限
- `os.lchown(path, uid, gid)` 更改文件所有者，类似 chown，但是不追踪链接。
- `os.link(src, dst)` 创建硬链接，名为参数 dst，指向参数 src
- `os.listdir(path)` 返回path指定的文件夹包含的文件或文件夹的名字的列表。
- `os.lseek(fd, pos, how)` 设置文件描述符 fd当前位置为pos, how方式修改: SEEK_SET 或者 0 设置从文件开始的计算的pos; 
    - SEEK_CUR或者 1 则从当前位置计算; os.SEEK_END或者2则从文件尾部开始. 在unix，Windows中有效
- `os.lstat(path)` 像stat(),但是没有软链接
- `os.major(device)` 从原始的设备号中提取设备major号码 (使用stat中的st_dev或者st_rdev field)。
- `os.makedev(major, minor)` 以major和minor设备号组成一个原始设备号
- `os.makedirs(path[, mode])` 递归文件夹创建函数。像mkdir(), 但创建的所有intermediate-level文件夹需要包含子文件夹。
- `os.minor(device)` 从原始的设备号中提取设备minor号码 (使用stat中的st_dev或者st_rdev field )。
- `os.mkdir(path[, mode])` 以数字mode的mode创建一个名为path的文件夹.默认的 mode 是 0777 (八进制)。
- `os.mkfifo(path[, mode])` 创建命名管道，mode 为数字，默认为 0666 (八进制)`
- `os.mknod(filename[, mode=0600, device])` 创建一个名为filename文件系统节点（文件，设备特别文件或者命名pipe）。
- `os.open(file, flags[, mode])` 打开一个文件，并且设置需要的打开选项，mode参数是可选的
- `os.openpty()` 打开一个新的伪终端对。返回 pty 和 tty的文件描述符。
- `os.pathconf(path, name)` 返回相关文件的系统配置信息。
- `os.pipe()` 创建一个管道. 返回一对文件描述符(r, w) 分别为读和写
- `os.popen(command[, mode[, bufsize]])` 从一个 command 打开一个管道
- `os.read(fd, n)` 从文件描述符 fd 中读取最多 n 个字节，返回包含读取字节的字符串，文件描述符 fd对应文件已达到结尾, 返回一个空字符串。
- `os.readlink(path)` 返回软链接所指向的文件
- `os.remove(path)` 删除路径为path的文件。如果path 是一个文件夹，将抛出OSError; 查看下面的rmdir()删除一个 directory。
- `os.removedirs(path)` 递归删除目录。
- `os.rename(src, dst)` 重命名文件或目录，从 src 到 dst
- `os.renames(old, new)` 递归地对目录进行更名，也可以对文件进行更名。
- `os.rmdir(path)` 删除path指定的空目录，如果目录非空，则抛出一个OSError异常。
- `os.stat(path)` 获取path指定的路径的信息，功能等同于C API中的stat()系统调用。
- `os.stat_float_times([newvalue])` 决定stat_result是否以float对象显示时间戳
- `os.statvfs(path)` 获取指定路径的文件系统统计信息
- `os.symlink(src, dst)` 创建一个软链接
- `os.tcgetpgrp(fd)` 返回与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组
- `os.tcsetpgrp(fd, pg)` 设置与终端fd（一个由os.open()返回的打开的文件描述符）关联的进程组为pg。
- `os.tempnam([dir[, prefix]])` Python3 中已删除。返回唯一的路径名用于创建临时文件。
- `os.tmpfile()` Python3 中已删除。返回一个打开的模式为(w+b)的文件对象 .这文件对象没有文件夹入口，没有文件描述符，将会自动删除。
- `os.tmpnam()` Python3 中已删除。为创建一个临时文件返回一个唯一的路径
- `os.ttyname(fd)` 返回一个字符串，它表示与文件描述符fd 关联的终端设备。如果fd 没有与终端设备关联，则引发一个异常。
- `os.unlink(path)` 删除文件路径
- `os.utime(path, times)` 返回指定的path文件的访问和修改的时间。
- `os.walk(top[, topdown=True[, onerror=None[, followlinks=False]]])` 输出在文件夹中的文件名通过在树中游走，向上或者向下。
- `os.write(fd, str)` 写入字符串到文件描述符 fd中. 返回实际写入的字符串长度
- `os.path` 模块 获取文件的属性信息。



## shutil模块

* [python模块之shutil](https://segmentfault.com/a/1190000016689023?utm_source=tag-newest)

```python
# 从源src复制到dst中去。 如果当前的dst已存在的话就会被覆盖掉
shutil.copyfile( src, dst)
# 移动文件或重命名
shutil.move( src, dst)
# 只是会复制其权限其他的东西是不会被复制的
shutil.copymode( src, dst)
# 复制权限、最后访问时间、最后修改时间
shutil.copystat( src, dst)
# 复制一个文件到一个文件或一个目录
shutil.copy( src, dst)
# 在copy上的基础上再复制文件最后访问时间与修改时间也复制过来了，类似于cp –p的东西
shutil.copy2( src, dst)
# 如果两个位置的文件系统是一样的话相当于是rename操作，只是改名；如果是不在相同的文件系统的话就是做move操作
shutil.copy2( src, dst)
# 把olddir拷贝一份newdir，如果第3个参数是True，则复制目录时将保持文件夹下的符号连接，
# 如果第3个参数是False，则将在复制的目录下生成物理副本来替代符号连接
shutil.copytree( olddir, newdir, True/Flase)
# 递归删除一个目录以及目录内的所有内容
shutil.rmtree( src )
```

## open方法

| 模式  | 描述                                                                                |
|-----|-----------------------------------------------------------------------------------|
| r   | 以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。                                                  |
| rb  | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。                                                   |
| r+  | 打开一个文件用于读写。文件指针将会放在文件的开头。                                                         |
| rb+ | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。                                                   |
| w   | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。                      |
| wb  | 以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。                |
| w+  | 打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。                       |
| wb+ | 以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。                 |
| a   | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。       |
| ab  | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| a+  | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。                 |
| ab+ | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。                       |


* [Python3 文件 I/O 操作](https://www.jianshu.com/p/507b14111f56?from=timeline)



## 输入参数

```python
# host=input("请输入数据库IP地址：")
# port=input("请输入数据库端口：")
# user=input("请输入数据库用户名：")
# dbPasswd=input("请输入数据库密码：")
# database=input("请输入数据库名：")
# charset=input("请输入数据库字符编码：")
# dbSQL=input("请输入数据库查询SQL：")

# 设置参数
parser = argparse.ArgumentParser(description='manual to this script')
parser.add_argument('--host', '-host', type=str, default='localhost', help='请输入数据库IP地址')
parser.add_argument('--port', '-port', type=int, default=3306, help='请输入数据库端口')
parser.add_argument('--user', '-user', type=str, default='root', help='请输入数据库用户名')
parser.add_argument('--password', '-pwd', type=str, default=None, help='请输入数据库密码')
parser.add_argument('--database', '-db', type=str, default=None, help='请输入数据库名')
parser.add_argument('--charset', '-charset', type=str, default='UTF8', help='请输入数据库字符编码')

# 获取参数值
args = parser.parse_args()
host = args.host
port = args.port
user = args.user
password = args.password
database = args.database
charset = args.charset
```


## 随机

```python
# 随机大于0 且小于1 之间的小数
random.random()
# 随机一个大于0小于9的小数
random.uniform(0,9)

# 随机一个大于等于1且小于等于5的整数
random.randint(1,5)
# 随机一个大于等于1且小于等于10之间的奇数，其中2表示递增基数
random.randrange(1,10,2)

# 随机返回参数列表中任意一个元素
random.choice(['123','abc',52,[1,2]])
# 随机返回参数列表中任意两个元素，参数二指定返回的数量
random.sample(['123','abc',52,[1,2]],2)

# 打乱列表顺序
random.shuffle([1,2,5,7,9,10])
```


## 系统信息

```python
print('system and bit'.center(40, '-'))
print(platform.architecture(), '\n')

print('system and deatial'.center(40, '-'))
print(platform.platform(), '\n')

print('system'.center(40, '-'))
print(platform.system(), '\n')

print('version'.center(40, '-'))
print(platform.version(), '\n')

print('系统信息'.center(40, '-'))
print(platform.uname(), '\n')

print("python Version".center(40, '-'))
print(platform.python_version(), '\n')
```



## 进程线程协程

### 进程

* [multiprocessing --- 基于进程的并行](https://docs.python.org/zh-cn/3/library/multiprocessing.html)
* [multiprocessing](https://morvanzhou.github.io/tutorials/python-basic/multiprocessing)


```python
import multiprocessing as mp
threads = []
for i in path:
  threads.append(mp.Process(target=md5sum,args=(i,)))
#创建一个multiprocessing.process.Process对象
#执行
for m in threads:
  m.start()
#回收
for m in threads:
  m.join()
```


```python
def  test(i):
  pass
# 创建一个multiprocessing.pool.Pool的对象
p1 = mp.Pool(processes =5)
#向进程池里添加任务
for i in range(10):
  p1.apply_async(test, args=(i,)) #func，参数（传入元组）
# 关闭进程池，不再接受请求
p1.close()
# 等待所有子进程结束
p1.join()
```


### 线程

* [多线程](https://morvanzhou.github.io/tutorials/python-basic/threading)


```python
import threading
# 使用新线程执行函数
threading.Thread(target=test, args=("test",)).start()
# 在指定的秒数后调用一个函数
threading.Timer(10, test, ("test",)).start()
```


### 线程池


* [python3异步编程](https://blog.51cto.com/445153/2138832)
* [Python 并发、并行、同步和异步](https://www.jianshu.com/p/13d2e8514546)
* [ThreadPoolExecutor](https://www.jianshu.com/p/6d6e4f745c27)

```python
from concurrent.futures import ThreadPoolExecutor
import multiprocessing
pool = ThreadPoolExecutor(max_workers=int(multiprocessing.cpu_count() / (1 - 0.9)))
done = pool.submit(test, "test")
# 执行完成调用函数
done.add_done_callback(thread_call_back)
```


### asyncio

* [异步IO](https://www.liaoxuefeng.com/wiki/1016959663602400/1017959540289152)
* [Python3.5协程学习研究](https://thief.one/2018/06/21/1)
* [协程和 asyncio](https://www.ibm.com/developerworks/cn/analytics/library/ba-on-demand-data-python-3/index.html?ca=drs-)
* [python asyncio](https://www.jianshu.com/p/9ce6c3bf6733)
* [Python中协程异步IO（asyncio）详解](https://zhuanlan.zhihu.com/p/59621713)
* [https://docs.python.org/zh-cn/3/library/asyncio.html](https://docs.python.org/zh-cn/3/library/asyncio.html)
* [Asyncio并发编程](http://www.langzi.fun/Asyncio%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B.html)
* [aiohttp爬虫](https://blog.csdn.net/dashoumeixi/article/details/88800916)
* [python asyncio aiohttp 异步下载 完整例子](https://blog.csdn.net/dashoumeixi/article/details/81085141)
* [python 多线程与asyncio下载文件](https://blog.csdn.net/dashoumeixi/article/details/80938327)
* [python写一个多线程下载程序](http://www.laitech.cn/2018/08/08/393)
* [关于aiohttp下载大文件的方式](https://blog.csdn.net/dashoumeixi/article/details/88845137)
* [使用 asyncio + aiohttp 并发下载](https://madmalls.com/blog/post/aiohttp-howto-in-python3)


```python
import threading
import asyncio
 
async def hello():
    print('Hello world! (%s)' % threading.currentThread())
    await asyncio.sleep(1)
    print('Hello again! (%s)' % threading.currentThread())
 
 
try:
    loop = asyncio.get_event_loop()
    tasks = [hello() for i in range(1000*1000*1)]
    loop.run_until_complete(asyncio.wait(tasks))
    # loop.close()
    # Python 3.7
    #asyncio.run(asyncio.wait(tasks))
except ValueError:
    print('Async Error')
```



## ORM

> `Object-Relational Mapping`，把关系数据库的表结构映射到对象上。

- Peewee

- SqlObject


**SQLite3**

* [https://docs.python.org/zh-cn/3.8/library/sqlite3.html](https://docs.python.org/zh-cn/3.8/library/sqlite3.html)
* [SQLite - Python](https://www.runoob.com/sqlite/sqlite-python.html)
* [Python连接SQLite数据库](https://www.yiibai.com/sqlite/python-with-sqlite.html)


### SQLAlchemy

* [https://www.sqlalchemy.org](https://www.sqlalchemy.org)
* [使用SQLAlchemy](https://www.liaoxuefeng.com/wiki/1016959663602400/1017803857459008)


```python
pip install sqlalchemy
```


## 定时任务

* [Python3-定时任务五种实现方式](https://blog.51cto.com/huangyg/2367088)

1. sched模块`sched.scheduler`
2. 循环+sleep
3. 线程模块中Timer类`threading.Timer`
4. 第三方模块：schedule
5. 定时框架：APScheduler、Celery



## GC

* [https://docs.python.org/zh-cn/3.8/library/gc.html](https://docs.python.org/zh-cn/3.8/library/gc.html)
* [https://docs.python.org/zh-cn/3/library/tracemalloc.html](https://docs.python.org/zh-cn/3/library/tracemalloc.html)
* [https://github.com/giampaolo/psutil](https://github.com/giampaolo/psutil)
* [https://github.com/pythonprofilers/memory_profiler](https://github.com/pythonprofilers/memory_profiler)
* [https://github.com/mgedmin/objgraph](https://github.com/mgedmin/objgraph)
* [https://github.com/pympler/pympler](https://github.com/pympler/pympler)
* [https://github.com/zhuyifei1999/guppy3](https://github.com/zhuyifei1999/guppy3)
* [https://github.com/benfred/py-spy](https://github.com/benfred/py-spy)
* [一次python内存调优经历](https://saucer-man.com/operation_and_maintenance/298.html)


> 使用`sys.getsizeof`方法可以查看`python`对象的内存占用，单位：字节 (byte)

```python
#开启gc（默认）
gc.enable()
# 关闭gc
gc.disable()
# 判断gc是否开启
gc.isenabled()
# 执行一次垃圾回收，不管gc是否处于开启状态都能使用
gc.collect()
# 设置垃圾回收阈值
gc.set_threshold(t0, t1, t2) 
# 获得当前的垃圾回收阈值
gc.get_threshold()
# 获取所有被垃圾回收器监控管理的对象
gc.get_objects()
# 返回obj对象直接指向的对象
gc.get_referents(obj)
# 返回所有直接指向obj的对象
gc.get_referrers(obj)
```

```python
import tracemalloc

tracemalloc.start()  # 开始跟踪内存分配
time1 = tracemalloc.take_snapshow()
import waste_memory
x = waste_memory.run()
time2 = tracemalloc.take_snapshow()
stats = time2.compare_to(time1, 'lineno')
snapshot = tracemalloc.take_snapshot()  # 快照，当前内存分配
top_stats = snapshot.statistics('lineno')  # 快照对象的统计
[print(stat) for stat in top_stats]
```




## HTTP

**提交form-data表单**


- 通过`files`参数传递`form-data`

```python
import requests

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
             "Chrome/77.0.3865.75 Safari/537.36 "


if __name__ == '__main__':
    data = {
        "_wpcf7": (None, "3016"),
        "_wpcf7_version": (None, "5.1.1"),
        "_wpcf7_locale": (None, "en_US"),
        "_wpcf7_unit_tag": (None, "wpcf7-f3016-p4203-o2"),
        "_wpcf7_container_post": (None, "4203"),
        "g-recaptcha-response": (None, ""),
        "md": (None, "setDownload"),
        "language": (None, "3"),
        "downloadType": (None, "0"),
        "licenseType": (None, "0"),
        "action": (None, "/json/download/process.html"),
        "user-name": (None, "nb7ospo00@shorttimemail.com"),
        "email": (None, "nb7ospo00@shorttimemail.com"),
        "company": (None, ""),
        "productName": (None, "xshell-download"),
    }
    res = requests.post("https://www.netsarang.com/json/download/process.html", files=data,
                        headers={"User-Agent": USER_AGENT}, verify=False, timeout=600)
    print(res.text)
```

- 手动组建`form-data`并加上`headers`

```python
import requests

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
             "Chrome/77.0.3865.75 Safari/537.36 "


if __name__ == '__main__':
    data = {
        "_wpcf7": "3016",
        "_wpcf7_version": "5.1.1",
        "_wpcf7_locale": "en_US",
        "_wpcf7_unit_tag": "wpcf7-f3016-p4203-o2",
        "_wpcf7_container_post": "4203",
        "g-recaptcha-response": "",
        "md": "setDownload",
        "language": "3",
        "downloadType": "0",
        "licenseType": "0",
        "action": "/json/download/process.html",
        "user-name": "nb7ospo00@shorttimemail.com",
        "email": "nb7ospo00@shorttimemail.com",
        "company": "",
        "productName": "xshell-download",
    }
    payload = ""
    boundary = "----WebKitFormBoundary67TaDgLkWD9HrhlW"
    for k, v in data.items():
        payload += f"--{boundary}\r\nContent-Disposition: form-data; name=\"{k}\"\r\n\r\n{v}\r\n"
    payload += f"{boundary}--"
    res = requests.post("https://www.netsarang.com/json/download/process.html", payload,
                        headers={"User-Agent": USER_AGENT,"Content-Type": f"multipart/form-data; boundary={boundary}"},
                        verify=False, timeout=600)
    print(res.text)
```

- 使用`encode_multipart_formdata`

```python
from urllib3 import encode_multipart_formdata
import requests

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
             "Chrome/77.0.3865.75 Safari/537.36 "


if __name__ == '__main__':
    data = {
        "_wpcf7": "3016",
        "_wpcf7_version": "5.1.1",
        "_wpcf7_locale": "en_US",
        "_wpcf7_unit_tag": "wpcf7-f3016-p4203-o2",
        "_wpcf7_container_post": "4203",
        "g-recaptcha-response": "",
        "md": "setDownload",
        "language": "3",
        "downloadType": "0",
        "licenseType": "0",
        "action": "/json/download/process.html",
        "user-name": "nb7ospo00@shorttimemail.com",
        "email": "nb7ospo00@shorttimemail.com",
        "company": "",
        "productName": "xshell-download",
    }
    # 注意这里的 - 符号的数量，默认有两个
    (payload, content_type) = encode_multipart_formdata(data, boundary='----WebKitFormBoundary67TaDgLkWD9HrhlW')
    res = requests.post("https://www.netsarang.com/json/download/process.html", payload,
                        headers={"User-Agent": HttpUtil.USER_AGENT, "Content-Type": content_type}, verify=False,
                        timeout=600)
    print(res.text)
```

- 使用`requests-toolbelt`

```python
# pip install requests-toolbelt
from requests_toolbelt import MultipartEncoder
import requests

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
             "Chrome/77.0.3865.75 Safari/537.36 "


if __name__ == '__main__':
    me = MultipartEncoder(
        fields={
            "_wpcf7": "3016",
            "_wpcf7_version": "5.1.1",
            "_wpcf7_locale": "en_US",
            "_wpcf7_unit_tag": "wpcf7-f3016-p4203-o2",
            "_wpcf7_container_post": "4203",
            "g-recaptcha-response": "",
            "md": "setDownload",
            "language": "3",
            "downloadType": "0",
            "licenseType": "0",
            "action": "/json/download/process.html",
            "user-name": "nb7ospo00@shorttimemail.com",
            "email": "nb7ospo00@shorttimemail.com",
            "company": "",
            "productName": "xshell-download",
        }
    )
    res = requests.post("https://www.netsarang.com/json/download/process.html", me,
                        headers={"User-Agent": USER_AGENT, "Content-Type": me.content_type}, verify=False,
                        timeout=600)
    print(res.text)
```




## 删除文件脚本

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import time
import datetime
import operator


def is_valid_date(strdate):
    # 判断是否是一个有效的日期字符串
    try:
        if ":" in strdate:
            time.strptime(strdate, "%Y-%m-%d %H:%M:%S")
        else:
            time.strptime(strdate, "%Y-%m-%d")
        return True
    except:
        return False


# 自定义函数
def getFile(pathName, prefix, suffix, array):
    # 在函数中释放一个list所占内存
    del array[:]
    # 清空list
    # array.clear()
    # 获取文件list数组
    files_list = os.listdir(pathName)
    # print(files_list) #当前目录路径
    # 遍历路径下的文件
    for file in files_list:
        # 截取文件名
        fname = os.path.splitext(file)

        if fname[0].count(".") <= 0:
            # strip()删除任意字符，isdigit()判断是否为数字字符串
            # if fname[0] == prefix and suffix.isdigit() and fname[1].strip(".").isdigit():
                # 添加到list中
                # array.append(file)
            # strip()删除任意字符，isalpha()判断是否为字母字符串
            # if fname[0] == prefix and suffix.isalpha() and fname[1].strip(".").isalpha():
                # 添加到list中
                # array.append(file)
            # strip()删除任意字符，isalnum()判断是否为字母、数字、字母数字组合 等字符串
            if fname[0] == prefix and suffix.isalnum() and fname[1].strip(".").isalnum():
                # 添加到list中
                array.append(file)
        else:
            splits = fname[0].split(".")
            # is_valid_date判断是否为日期格式
            if operator.eq(splits[0], prefix) == 0 and is_valid_date(suffix) and is_valid_date(splits[1]):
                # 添加到list中
                array.append(file)
            # cmp判断两个字符串，如果相等就为0，如果第一个字符串包含第二个为-1，如果第二个包含第一个为1
            elif operator.eq(splits[0], prefix) == 0 and suffix.isalnum() and fname[1].strip(".").isalnum():
                # 添加到list中
                array.append(file)
    # 排序
    array.sort()
    return array


print("".center(40,"="))
if len(sys.argv) < 3:
    print("请输入参数：第一个参数为文件路径！第二个参数为保留多少个文件！")
    print("注意文件名后缀如果为数字那么将只删除后缀为数字的文件，同理后缀为字母或者字母数字组成一样的效果！")
    quit()

print("执行脚本名：", sys.argv[0])
print("".center(40,":"))
print(f"执行时间：{datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print("".center(40,":"))

# 参数1为文件路径
parameter = sys.argv[1]
# 参数2为要保留的文件个数
keep = int(sys.argv[2])

# for i in range(1, len(sys.argv)):
#    print "参数:第", i,"个='", sys.argv[i],"'"
print("参数："+parameter)


n = parameter.rindex('/')  # 从后往前寻找最后一次出现的位置
if n == -1:
    print("请输入正确的文件路径！")
    print("".center(40,"="))
    quit()

# 截取文件路径
pathName = parameter[0:n]

# 截取文件名
fileName = parameter[n+1:]
# 对文件名拆分
showCount = fileName.count(".")
if (showCount > 0):
    print("文件名中'.'出现的次数："+str(showCount))

split = fileName.split(".")
# 获取文件前缀
prefix = split[0]
# 获取文件后缀,并去掉.
suffix = split[1].strip(".")

L = []
# 调用自定义函数
L = getFile(pathName, prefix, suffix, L)
# 获取list长度
leng = len(L)
print("查找到"+str(leng)+"个文件！")

if leng > keep:
    if keep > 1:
        # 循环输入的参数，移除list中元素
        # reversed这种索引是按从大到小的顺序排列，就相当于range(5-1,-1,-1)
        for i in range(keep):
            del L[leng-(i+1)]
    elif keep == 1:
        del L[leng-keep]

    for i in L:
        os.remove(pathName+"/"+i)
        print("删除文件：", i)

    newL = []
    # 调用自定义函数
    newL = getFile(pathName, prefix, suffix, L)
    print("保留的文件：", newL)
else:
    print("没有可删除文件".center(20,"*"))

print("".center(40,"="))

```