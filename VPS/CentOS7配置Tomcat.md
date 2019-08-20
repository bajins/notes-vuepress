# CentOS7配置Tomcat

## 目录
* [安装JDK](#安装JDK)
* [安装Tomcat](#安装多个Tomcat7)
* [Tomcat配置外部路径](#Tomcat配置外部路径)
* [tomcat8以上管理页面提示403 Access Denied问题](#3)

## 安装JDK

### 查看
```bash
rpm -qa | grep java
```
#### 显示如下信息：
> `java-1.4.2-gcj-compat-1.4.2.0-40jpp.115`
>
> `java-1.6.0-openjdk-1.6.0.0-1.7.b09.el5`

### 卸载：
```bash
rpm -e --nodeps java-1.4.2-gcj-compat-1.4.2.0-40jpp.115
rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-1.7.b09.el5
```

### 查看JDK软件包列表
```bash
yum -y list java*
# 或者
yum search java | grep -i --color JDK
```
### 安装
```bash
yum -y install java-1.7.0-openjdk java-1.7.0-openjdk-devel.x86_64
```
> 通过yum默认安装的路径为`/usr/lib/jvm`

### 在`/etc/profile`文件中加入下面内容配置环境变量
```vim
########## jdk  environment ######################
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.181-2.6.14.8.el7_5.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
########## jdk  environment ######################
```
### 保存关闭,执行如下命令使设置生效
```bash
source /etc/profile
```
### 查看变量是否生效
```bash
echo $JAVA_HOME && echo $CLASSPATH
```

### 查看Java版本信息
```bash
java -version
```
------------------------------------------------------------------------------------------------
## 安装多个Tomcat7

### 下载、安装 tomcat

> 地址https://tomcat.apache.org/download-80.cgi

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

### 修改配置文件

> 在`/etc/profile`文件中加入下面内容配置环境变量

#### 第一个tomcat
```vim
########## tomcat 1###########
CATALINA_BASE=/home/tomcat-8080
CATALINA_HOME=/home/tomcat-8080
TOMCAT_HOME=/home/tomcat-8080
export CATALINA_BASE CATALINA_HOME TOMCAT_HOME
########## tomcat 1############
```

#### 第二个tomcat
```vim
######### tomcat 2 ##########
CATALINA_2_BASE=/home/tomcat-8082
CATALINA_2_HOME=/home/tomcat-8082
TOMCAT_2_HOME=/home/tomcat-8082
export CATALINA_2_BASE CATALINA_2_HOME TOMCAT_2_HOME
########## tomcat 2##########
```
> `source`命令也称为“点命令”，也就是一个点符号（.）。source命令通常用于重新执行刚修改的初始化文件，使之立即生效
#### 用法： 
```bash
source /etc/profile 
# 或者
. /etc/profile
```

### 修改第二个tomcat文件

> 进入tomcat-8082的bin目录，修改`startup.sh`和`shutdown.sh`两个文件，都添加如下内容

```vim
######### tomcat 2 ##########
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.181-2.6.14.8.el7_5.x86_64
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/lib
export CATALINA_HOME=$CATALINA_2_HOME
export CATALINA_BASE=$CATALINA_2_BASE
######### tomcat 2 ##########
```

### 修改第二个tomcat端口,第一个不变

> 进入`/tomcat-8082/conf`中修改`server.xml`修改后示例如下：
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
*************************************************************
###### 3
# tomcat8以上管理页面提示`403 Access Denied`问题
## 修改`conf/tomcat-users.xml`
```bash
vi conf/tomcat-users.xml
```
### 按shift+g跳到末尾,在`</tomcat-users>`前添加
```xml
<role rolename="manager-gui"/>
<role rolename="manager-script"/>
<role rolename="admin-gui"/>
<role rolename="admin-script"/>
<user username="tomcat" password="密码" roles="manager-gui,manager-script,admin-gui,admin-script"/>
```

### 打开webapps下的host-manager和manager，在META-INF里面都有context.xml
```bash
vi webapps/manager/META-INF/context.xml
vi webapps/host-manager/META-INF/context.xml
```
### 修改<Context antiResourceLocking="false" privileged="true" >节点
#### 这段代码的作用是限制来访IP的，127.d+.d+.d+|::1|0:0:0:0:0:0:0:1，是正则表达式，表示IPv4和IPv6的本机环回地址
```xml
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
     allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1|\d+\.\d+\.\d+\.\d+" />
```


## Tomcat配置外部路径
> docBase:指定Web应用的文件路径，可以给定绝对路径，也可以给定相对于<Host>的appBase属性的相对路径，如果Web应用采用开放目录结构，则指定Web应用的根目录，如果Web应用是个war文件，则指定war文件的路径。
```xml
<Context docBase="/xxx/api.war" path="" reloadable="true"/>
```

> docBase的文件名不能省略.war后缀，否则跑不起来；而且发现会把war包解压到webapps下与path同名的文件夹中，所以path也不能为空，否则也跑不起来，而手动解压war包以文件夹的方式部署是可以指定path为"/"或""的。


## Tomcat热部署
> 替换`WEB-INF/lib`目录中的jar文件或`WEB-INF/classes`目录中的class文件时，`reloadable="true"`会让修改生效（但代价不小），该选项适合调试。
```xml
<Context docBase="xxx" path="/xxx" reloadable="true"/>
``` 
> 在`webapps`目录中增加新的目录、war文件、修改`WEB-INF/web.xml`，`autoDeploy="true"`会新建或重新部署应用，该选项方便部署。
```xml
<Context docBase="xxx" path="/xxx" autoDeploy="true"/> 
```


