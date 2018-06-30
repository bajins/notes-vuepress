检查是否已安装SVN
```
rpm -qa subversion
```
安装SVN
```
yum -y install subversion
```
1、验证安装

检验已经安装的SVN版本信息
```
svnserve --version
```
2、代码库创建

建立SVN版本库目录
```
mkdir -p /home/svn/svnrepos/test
```
创建SVN版本库
```
svnadmin create /home/svn/svnrepos/test
```
执行上面的命令后，自动建立svndata库，查看/home/svn/svnrepos/test

文件夹发现包含了conf, db,format,hooks, locks, README.txt等文件，说明一个SVN库已经建立。


3、配置代码库

进入上面生成的文件夹conf下，进行配置
```
cd /home/svn/svnrepos/test/conf
```
---------------------------------------------------
用户密码passwd配置
```
vi passwd
```
在[users]节点下添加以下内容(账户=密码)：
```
ichangg.com=ichangg.com
```
---------------------------------------------------

权限控制authz配置
```
vi authz
```
目的是设置哪些用户可以访问哪些目录，向authz文件末尾追加以下内容：

#设置[/]代表根目录下所有的资源,rw为读和写
```
[/]
ichangg.com=rw
*=r
```
---------------------------------------------------

服务svnserve.conf配置
```
vi svnserve.conf
```
在[general]节点下追加以下内容：
```
#匿名访问的权限，可以是read,write,none,默认为read
anon-access=none

#使授权用户有写权限
auth-access=write

#密码数据库的路径
password-db=passwd

#访问控制文件
authz-db=authz

#认证命名空间，subversion会在认证提示里显示，并且作为凭证缓存的关键字
realm = This Is A Repository
```
---------------------------------------------------
如果需要创建多个库就需要重复做上面2、3步，并且test目录名是不一样的

比如：

建立第2个SVN版本库目录
```
mkdir -p /home/svn/svnrepos/test2
```
创建第2个SVN版本库
```
svnadmin create /home/svn/svnrepos/test2
```
---------------------------------------------------

4、启动SVN
```
svnserve -d -r /home/svn/svnrepos/
```

5、查看SVN进程
```
ps -ef|grep svn
```

6、检测SVN 端口
```
netstat -antlp|grep svnserve
```
7、放开端口
```
firewall-cmd --zone=public --add-port=3690/tcp --permanent
firewall-cmd --reload
```
 
8、测试
SVN服务已经启动，使用客户端测试连接。

客户端连接地址：svn://192.168.110.247/test

用户名/密码： ichangg.com/ichangg.com




查找出目前正在使用的svnserve进程
```
ps -aux | grep svnserve
```
结束进程（ xxx代表svnserve对应pid）
```
kill -9  xxx

kill all xxx
```
# [返回顶部](#readme)
