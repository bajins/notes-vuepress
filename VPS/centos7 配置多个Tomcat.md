1、安装JDK


卸载系统的JDK
先查看 rpm -qa | grep java
显示如下信息：

java-1.4.2-gcj-compat-1.4.2.0-40jpp.115
java-1.6.0-openjdk-1.6.0.0-1.7.b09.el5

卸载：
```
rpm -e --nodeps java-1.4.2-gcj-compat-1.4.2.0-40jpp.115
rpm -e --nodeps java-1.6.0-openjdk-1.6.0.0-1.7.b09.el5
```
安装sun公司的jdk1.7

查看JDK软件包列表
```
yum -y list java*
或者
yum search java | grep -i --color JDK
```
安装
```
yum  install java-1.7.0-openjdk java-1.7.0-openjdk-devel.x86_64
```
通过yum默认安装的路径为
```
/usr/lib/jvm
```

配置环境变量 

在/etc/profile文件中加入下面内容配置环境变量
```
########## jdk  environment ######################
export JAVA_HOME=/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.181-2.6.14.5.el7.x86_64
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=$PATH:$JAVA_HOME/bin
```

保存关闭,执行如下命令使设置生效
```
source /etc/profile
```

2、安装多个Tomcat7

下载、安装 tomcat

地址http://tomcat.apache.org/download-70.cgi
把下载的apache-tomcat-7.0.65.tar.gz文件放入 /data/local/server解压  tar -zxvf apache-tomcat-7.0.65.tar.gz
修改tomcat根目录为 tomcat-8080

复制tomcat-8080：  

cp -r tomcat-8080 tomcat-8181

修改配置文件

在/etc/profile文件中加入下面内容配置环境变量

第一个tomcat
```
##########first tomcat###########
CATALINA_BASE=/data/local/server/tomcat-8080
CATALINA_HOME=/data/local/server/tomcat-8080
TOMCAT_HOME=/data/local/server/tomcat-8080
export CATALINA_BASE CATALINA_HOME TOMCAT_HOME
##########first tomcat############
```

第二个tomcat
```
##########second tomcat##########
CATALINA_2_BASE=/data/local/server/tomcat-8181
CATALINA_2_HOME=/data/local/server/tomcat-8181
TOMCAT_2_HOME=/data/local/server/tomcat-8181
export CATALINA_2_BASE CATALINA_2_HOME TOMCAT_2_HOME
##########second tomcat##########
```
source命令也称为“点命令”，也就是一个点符号（.）。source命令通常用于重新执行刚修改的初始化文件，使之立即生效
用法： 
```
source /etc/profile 或者. /etc/profile
```

修改第二个tomcat文件

进入tomcat-8181的bin目录，修改startup.sh和shutdown.sh 两个文件，都添加如下内容
```
export JAVA_HOME=/usr/local/java/jdk1.7.0_79
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=$JAVA_HOME/lib
export CATALINA_HOME=$CATALINA_2_HOME
export CATALINA_BASE=$CATALINA_2_BASE
```

修改第二个tomcat端口,第一个不变

进入/data/local/server/tomcat-8181/conf中修改server.xml
修改后示例如下：
```
<Server port="9005" shutdown="SHUTDOWN">　#关闭端口：8005->9005

<Connector port="8181" maxHttpHeaderSize="8192"　#Web端口：8080->8181
maxThreads="150" minSpareThreads="25" maxSpareThreads="75"
enableLookups="false" redirectPort="8443" acceptCount="100"
connectionTimeout="20000" disableUploadTimeout="true" />

<Connector port="9009"  #监听端口：8009->9009
enableLookups="false" redirectPort="8443" protocol="AJP/1.3" />
```
