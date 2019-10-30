# CentOS安装软件


* [MySQL](#mysql)
  * [yum安装](#yum安装)
    * [卸载](#卸载)
    * [安装依赖](#安装依赖)
    * [下载yum源](#下载yum源)
    * [安装yum源](#安装yum源)
    * [查看所有版本](#查看所有版本)
    * [修改源设置](#修改源设置)
    * [查看默认启用版本](#查看默认启用版本)
    * [安装](#安装)
    * [查看安装版本](#查看安装版本)
  * [编译安装](#编译安装)
    * [下载](#下载)
    * [创建用户组](#创建用户组)
    * [创建用户](#创建用户)
    * [创建data目录](#创建data目录)
    * [指定用户和用户组](#指定用户和用户组)
    * [初始化](#初始化)
    * [启动](#启动)
    * [设为开机启动](#设为开机启动)
    * [授权](#授权)
    * [添加开机启动](#添加开机启动)
    * [service启动](#service启动)
* [SVN](#svn)
  * [检查已安装](#检查已安装)
  * [安装](#安装)
  * [查看已安装版本](#查看已安装版本)
  * [代码库创建](#代码库创建)
  * [配置代码库](#配置代码库)
  * [启动](#启动)
  * [查看SVN进程](#查看svn进程)
  * [检测SVN端口](#检测svn端口)
  * [放开端口](#放开端口)
  * [连接](#连接)
  * [停止SVN](#停止svn)
* [JDK](#jdk)
  * [查看已安装](#查看已安装)
  * [卸载JDK](#卸载jdk)
  * [查看JDK软件包列表](#查看jdk软件包列表)
  * [yum安装JDK](#yum安装jdk)
  * [配置环境变量](#配置环境变量)
  * [查看Java版本信息](#查看java版本信息)
* [Tomcat](#tomcat)
  * [下载](#下载)
  * [解压](#解压)
  * [修改tomcat文件夹名](#修改tomcat文件夹名)
  * [复制](#复制)
  * [修改第二个Tomcat配置](#修改第二个tomcat配置)
  * [添加环境变量](#添加环境变量)
* [Chrome](#chrome)
  * [rpm包安装](#rpm包安装)
  * [在线安装](#在线安装)








## MySQL

### yum安装

* [https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)

* [https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/](https://blog.imzhengfei.com/centos-7-an-zhuang-pei-zhi-mysql/)

> 首先`CentOS7`默认已经不支持`mysql`，因为收费了你懂得，所以内部集成了`mariadb`，
> 而安装`mysql`的话会和`mariadb`的文件冲突，所以需要先卸载掉`mariadb`，以下为卸载`mariadb`，安装`mysql`的步骤。


#### 卸载

```bash
# 查看软件包
rpm -qa | grep -i "mariadb\|mysql"
# --nodeps强制卸载
rpm -e --nodeps mariadb-libs-5.5.56-2.el7.x86_64

# 检测系统是否存在mysql
yum list installed | grep mysql
# 删除mysql依赖项
yum remove -y mysql mysql-server mysql-libs mysql-server
```

- 查找残留目录

```bash
whereis mysql
```

#### 安装依赖

```bash
yum -y install libaio glibc
```

#### 下载yum源

```bash
# MySQL 8.0
wget https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
```

#### 安装yum源

```bash
yum -y localinstall mysql80-community-release-el7-1.noarch.rpm
```

#### 查看所有版本

```bash
yum repolist all | grep mysql
```

> 可以看到这里默认启用了`MySQL 8.0 Community Server`，而我们需要安装的是`MySQL 5.7 Community Server`

#### 修改源设置

```bash
vi /etc/yum.repos.d/mysql-community.repo
```
- 找到mysql57-community节点

> 将`enabled=0`改成`enabled=1`

```bash
[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
```

- 找到`mysql80-community`节点

> 将`enabled=1`改成`enabled=0`

```bash
[mysql80-community]
name=MySQL 8.0 Community Server
baseurl=http://repo.mysql.com/yum/mysql-8.0-community/el/7/$basearch/
enabled=1
gpgcheck=1
```

- 或者使用命令

```bash
# 禁用MySQL版本
yum-config-manager --disable mysql80-community
# 启用MySQL版本
yum-config-manager --enable mysql57-community
```

#### 查看默认启用版本

```bash
yum repolist enabled | grep mysql
```

#### 安装

```bash
yum -y install mysql-community-server
```

#### 查看安装版本

```bash
mysqld -V
```


### 编译安装

#### 下载

* [https://dev.mysql.com/downloads/mysql/5.7.html#downloads](https://dev.mysql.com/downloads/mysql/5.7.html#downloads)

![](/images/MySQL-glibc%E4%B8%8B%E8%BD%BD.png)

- 解压

> 建议：不要安装到其它目录，否则数据库初始化的时候会报`cannot change dir`的错

```bash
tar zxvf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/mysql
# 重命名
mv mysql-5.7.22-linux-glibc2.12-x86_64 mysql
```


#### 创建用户组

```bash
group add mysql
```

#### 创建用户

```bash
user add -r -g mysql mysql
```

- 为了安全性，给mysql数据库创建专有用户，该用户只能访问mysql目录，不能访问系统其它目录

- 另外不建议直接用root初始化mysql，否则连接mysql时会报错：

> `[ERROR] Fatal error: Please read "Security" section of the manual to find out how to run mysqld as root!`

#### 创建data目录

```bash
cd /usr/local/mysql
mkdir data
```

#### 指定用户和用户组

```bash
cd /usr/local
chown -R mysql mysql/
chgrp -R mysql mysql/
```

> `-R`包含目录下所有和目录和文件

#### 初始化

```bash
cd /usr/local/mysql/bin

./mysqld --initialize --user=mysql \
--basedir=/usr/local/mysql/ \
--datadir=/usr/local/mysql/data/ \
--lc_messages_dir=/usr/local/mysql/share \
--lc_messages=en_US
```

> 记住生成的临时密码,如果忘记密码或者想重新初始化，可以先将mysql/data目录中文件删除，然后再执行初始化命令


#### 启动

```bash
cd /usr/local/mysql/bin
# 启动
./mysqld_safe --user=mysql &
```

#### 设为开机启动

```bash
cd /usr/local/mysql/support-files/
cp mysql.server /etc/init.d/mysql
vi /etc/init.d/mysql
```

> 将mysql目录填上

```bash
basedir=/usr/local/mysql/
datadir=/usr/local/mysql/data/
```

#### 授权

```bash
chmod +x /etc/init.d/mysql
```

#### 添加开机启动

```bash
chkconfig --add mysql
```

#### service启动

```bash
# 重启服务
service mysql restart
# 停止服务
service mysql stop
# 启动服务
service mysql start
# 查看服务
service mysql status
```




## SVN

* [SVN-Eclipse插件](https://github.com/subclipse/subclipse/wiki)

> 对应`subversion 1.9.x` `http://subclipse.tigris.org/update_1.12.x/`

> `EclipseClassDecompiler`反编译 `https://github.com/cnfree/Eclipse-Class-Decompiler`

### 检查已安装

```bash
rpm -qa subversion
```

### 安装

```bash
yum -y install subversion
```

### 查看已安装版本

```bash
svnserve --version
```

### 代码库创建

- 建立SVN版本库目录

```bash
mkdir -p /home/svn/svnrepos/test
```

- 创建SVN版本库

```bash
svnadmin create /home/svn/svnrepos/test
```

> 执行上面的命令后，自动建立`svndata`库，
> `/home/svn/svnrepos/test`文件夹包含了`conf`、`db`、`format`、`hooks`、`locks`、`README.txt`等文件，说明一个SVN库已经建立。


### 配置代码库

- 进入`conf`文件夹

```bash
cd /home/svn/svnrepos/test/conf
```

- 配置用户密码`passwd`

```bash
vi passwd
```

> 在`[users]`节点下添加以下内容(账户=密码)

```bash
# 账户=密码
woytu.com=woytu.com
```

- 配置权限控制`authz`

```bash
vi authz
```

> 目的是设置哪些用户可以访问哪些目录，向`authz`文件末尾追加以下内容：

> 设置`[/]`代表根目录下所有的资源,`rw`为读和写，`*`代表所有用户,先按`shift+g`跳到末尾，然后添加

```bash
[/]
woytu.com=rw
*=r
```

- 配置服务`svnserve.conf`

```bash
vi svnserve.conf
```

> 在`[general]`节点下追加以下内容

```bash
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

- 如果需要创建多个库就需要重复做上面2、3步，并且test目录名是不一样的

> 比如：

> 建立第2个SVN版本库目录

```bash
mkdir -p /home/svn/svnrepos/test2
```

> 创建第2个SVN版本库

```bash
svnadmin create /home/svn/svnrepos/test2
```

### 启动

```bash
svnserve -d -r /home/svn/svnrepos/
```

### 查看SVN进程

```bash
ps -ef|grep svn
```

### 检测SVN端口

```bash
netstat -antlp|grep svnserve
```

### 放开端口

```bash
firewall-cmd --zone=public --add-port=3690/tcp --permanent
firewall-cmd --reload
```
 
### 连接

> 地址：`svn://host:port/仓库名`


### 停止SVN


```bash
# 查找`svnserve`进程（PID）
ps -aux | grep svnserve
# 结束进程
kill -9 PID
#或者
killall svnserve
```






## JDK

### 查看已安装

```bash
rpm -qa | grep java
```

### 卸载JDK

```bash
rpm -e --nodeps 查出来的名称
```

### 查看JDK软件包列表

```bash
yum -y list java*
# 或者
yum search java | grep -i --color JDK
```

### yum安装JDK

```bash
yum -y install java-1.7.0-openjdk java-1.7.0-openjdk-devel.x86_64
```

> 通过yum默认安装的路径为`/usr/lib/jvm`

### 配置环境变量

- 在`/etc/profile`文件中加入

```vim
########## jdk  environment ######################
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.181-2.6.14.8.el7_5.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
########## jdk  environment ######################
```

- 刷新环境变量文件

```bash
source /etc/profile
```

- 查看变量是否生效

```bash
echo $JAVA_HOME && echo $CLASSPATH
```

### 查看Java版本信息

```bash
java -version
```



## Tomcat

### 下载

> 地址`https://tomcat.apache.org/download-80.cgi`

### 解压

```bash
tar -zxvf apache-tomcat-8.5.31.tar.gz
```

### 修改tomcat文件夹名

```bash
mv apache-tomcat-8.5.31 tomcat-8080
```

### 复制

```bash
cp -r tomcat-8080 tomcat-8082
```


### 修改第二个Tomcat配置

> 进入tomcat-8082的`bin`目录，修改`startup.sh`和`shutdown.sh`两个文件，都添加如下内容

```vim
######### tomcat 2 ##########
export JAVA_HOME=JDK安装目录
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/lib
export CATALINA_HOME=$CATALINA_2_HOME
export CATALINA_BASE=$CATALINA_2_BASE
######### tomcat 2 ##########
```

- 修改第二个tomcat端口,第一个不变

> 进入`/tomcat-8082/conf`中修改`server.xml`修改后示例如下

```xml
<!-- 关闭端口：8005->9005 -->
<Server port="9005" shutdown="SHUTDOWN">

<!-- Web端口：8080->8181 -->
<Connector port="8181" maxHttpHeaderSize="8192"
maxThreads="150" minSpareThreads="25" maxSpareThreads="75"
enableLookups="false" redirectPort="8443" acceptCount="100"
connectionTimeout="20000" disableUploadTimeout="true" />

<!-- 监听端口：8009->9009 -->
<Connector port="9009" enableLookups="false" redirectPort="8443" protocol="AJP/1.3" />
```


### 添加环境变量

> 在`/etc/profile`文件中加入下面内容配置环境变量

- 第一个tomcat

```vim
########## tomcat 1###########
CATALINA_BASE=/home/tomcat-8080
CATALINA_HOME=/home/tomcat-8080
TOMCAT_HOME=/home/tomcat-8080
export CATALINA_BASE CATALINA_HOME TOMCAT_HOME
########## tomcat 1############
```

- 第二个tomcat

```vim
######### tomcat 2 ##########
CATALINA_2_BASE=/home/tomcat-8082
CATALINA_2_HOME=/home/tomcat-8082
TOMCAT_2_HOME=/home/tomcat-8082
export CATALINA_2_BASE CATALINA_2_HOME TOMCAT_2_HOME
########## tomcat 2##########
```

- 刷新环境变量

> `source`命令也称为“点命令”，也就是一个点符号`.`。`source`命令通常用于重新执行刚修改的初始化文件，使之立即生效
 
```bash
source /etc/profile 
# 或者
. /etc/profile
```


## Chrome

* [chrome其他安装方式](https://intoli.com/blog/installing-google-chrome-on-centos)

### rpm包安装


```bash
# 下载rpm包
wget https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm

# 安装依赖
yum install -y lsb libXScrnSaver libappindicator-gtk3 liberation-fonts

# 安装chrome
rpm -ivh google-chrome-stable_current_x86_64.rpm
# 或者使用yum安装chrome
yum install -y google-chrome-stable_current_x86_64.rpm

# 查看版本
google-chrome --version

# 安装chromedriver：一个用来和chrome交互的接口
yum install -y chromedriver

# 查看安装的chromedriver版本
chromedriver --version
```

### 在线安装

- 创建repo文件

```bash
vi /etc/yum.repos.d/google-chrome.repo
```

- 添加内容

```bash
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
```

- 安装

```bash
yum install -y google-chrome-stable
# 如果安装失败
yum install google-chrome-stable --nogpgcheck
```





