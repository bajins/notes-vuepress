# Subversion

[[toc]]


## Flag

+ [https://github.com/topics/subversion](https://github.com/topics/subversion)


- [https://github.com/apache/subversion](https://github.com/apache/subversion)
    - [https://subversion.apache.org](https://subversion.apache.org)
    - windows服务端 [https://www.visualsvn.com](https://www.visualsvn.com)
    - [https://sourceforge.net/projects/tortoisesvn](https://sourceforge.net/projects/tortoisesvn)
        - [https://github.com/TortoiseGit/tortoisesvn](https://github.com/TortoiseGit/tortoisesvn)
        - [https://svn.code.sf.net/p/tortoisesvn/code](https://svn.code.sf.net/p/tortoisesvn/code)
        - [https://github.com/stefankueng/TortoiseSVN](https://github.com/stefankueng/TortoiseSVN)
        - [https://tortoisesvn.net/downloads.html](https://tortoisesvn.net/downloads.html)
        - 安装时一定要选择`command line cient tools`下的`Entire feature will be installed on local hard drive`把svn.exe等文件安装
        - 从SVN1.14.3开始自签的CA不再支持，只支持TLS1.1，如果需要支持只能安装TortoiseSVN1.14.5及以下版本
- [https://www.collab.net/downloads/subversion](https://www.collab.net/downloads/subversion)
    - [http://sharpsvn.open.collab.net](http://sharpsvn.open.collab.net)
    - [https://community.cirata.com/s/article/Downloading-WANdisco-Software](https://community.cirata.com/s/article/Downloading-WANdisco-Software)
    - [https://opensource.wandisco.com/subversion](https://opensource.wandisco.com/subversion)
    - [https://www.wandisco.com/source-code-management/subversion](https://www.wandisco.com/source-code-management/subversion)
    - [https://docs.wandisco.com/svn/ms-plus](https://docs.wandisco.com/svn/ms-plus)
    - [如何在windows系统下搭建SVN服务器](https://blog.csdn.net/weixin_52588152/article/details/111659773)
- 命令行 [https://sliksvn.com/pub](https://sliksvn.com/pub)
    - [https://sliksvn.com/download](https://sliksvn.com/download)
- [https://github.com/jenkinsci/subversion-plugin](https://github.com/jenkinsci/subversion-plugin)
- [https://bitnami.com/stack/subversion](https://bitnami.com/stack/subversion)
- [https://www.smartsvn.com](https://www.smartsvn.com)
- [https://rapidsvn.org](https://rapidsvn.org)
- [https://github.com/mhagger/cvs2svn](https://github.com/mhagger/cvs2svn)



> 按装`VisualSVN`后客户端使用报错：`执行上下文错误: 由于目标计算机积极拒绝，无法连接。`，需要在`服务`列表中找到相关服务 -> 
> 右键打开属性 -> 点击登录页签修改`登录身份`为`本地系统账户` -> 点击常规页签修改`启动类型`为`自启动`，再点击启动



* [https://sourceforge.net/projects/svnbook](https://sourceforge.net/projects/svnbook)
    * [https://svnbook.red-bean.com](https://svnbook.red-bean.com)
    * [https://svnbook.subversion.org.cn](https://svnbook.subversion.org.cn)
* SVN教程 [https://svnbucket.com/posts](https://svnbucket.com/posts)
* [TortoiseSVN打分支、合并分支、切换分支](https://blog.csdn.net/justry_deng/article/details/82259470)


```bash
# SVN不同分支，进行比对
svn diff -r 1100:1323
# 获取所有SVN提交作者用户名的列表
# https://stackoverflow.com/questions/2494984/how-to-get-a-list-of-all-subversion-commit-author-usernames
svn log --quiet | awk '/^r/ {print $3}' | sort | uniq
svn log --quiet | grep "^r" | awk '{print $3}' | sort | uniq
```

> 选中要比对的一个分支，<kbd>Shift</kbd>+右键+选中`TorsoiseSVN` -> `diff with url`，然后填入另外一个要比对的分支url即可




## Linux安装


```bash
# 检查已安装
rpm -qa subversion
# 安装
yum -y install subversion
# 查看已安装版本
svnserve --version
```

**创建代码库**

```bash
# 建立SVN版本库目录
mkdir -p /home/svn/svnrepos/test
# 创建SVN版本库
svnadmin create /home/svn/svnrepos/test
```

> 执行上面的命令后，自动建立`svndata`库，
> `/home/svn/svnrepos/test`文件夹包含了`conf`、`db`、`format`、`hooks`、`locks`、`README.txt`等文件，说明一个SVN库已经建立。


**配置代码库**

```bash
# 进入`conf`文件夹
cd /home/svn/svnrepos/test/conf
# 配置用户密码`passwd`
vi passwd
```

- 在`[users]`节点下添加以下内容(账户=密码)

```conf
# 账户=密码
bajins.com=bajins.com
```

- 配置权限控制`authz`

```bash
vi authz
```

> 目的是设置哪些用户可以访问哪些目录，向`authz`文件末尾追加以下内容：
>> 设置`[/]`代表根目录下所有的资源,`rw`为读和写，`*`代表所有用户,先按`shift+g`跳到末尾，然后添加

```conf
[/]
bajins.com=rw
*=r
```

- 配置服务`svnserve.conf`

```bash
vi svnserve.conf
```

> 在`[general]`节点下追加以下内容

```conf
# 匿名访问的权限，可以是read,write,none,默认为read
anon-access=none
# 使授权用户有写权限
auth-access=write
# 密码数据库的路径
password-db=passwd
# 访问控制文件
authz-db=authz
# 认证命名空间，subversion会在认证提示里显示，并且作为凭证缓存的关键字
realm = This Is A Repository
```

> 如果需要创建多个库就需要重复做上面2、3步，并且最后一个目录名是不一样的

- 建立第2个SVN版本库目录

```bash
mkdir -p /home/svn/svnrepos/test2
```

- 创建第2个SVN版本库

```bash
svnadmin create /home/svn/svnrepos/test2
```

**启动**

```bash
svnserve -d -r /home/svn/svnrepos/
# 查看SVN进程
ps -ef|grep svn
# 检测SVN端口
netstat -antlp|grep svnserve
# 放开端口
firewall-cmd --zone=public --add-port=3690/tcp --permanent
firewall-cmd --reload
```
 
**连接地址：`svn://host:port/仓库名`**


**停止SVN**

```bash
# 查找svnserve进程（PID）
ps -aux | grep svnserve
# 结束进程
kill -9 PID
#或者
killall svnserve
```




