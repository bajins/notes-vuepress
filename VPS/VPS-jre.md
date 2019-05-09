# VPS安装jre


第一步：下载jre

我们去oracle官方下载下jre 

http://www.oracle.com/technetwork/java/javase/downloads/server-jre8-downloads-2133154.html


第三步：解压以及剪切到/home/java/目录

[root@localhost ~]# cd /home/data/

[root@localhost data]# ls 

server-jre-8u131-linux-x64.tar.gz

[root@localhost data]# tar -zxvf server-jre-8u131-linux-x64.tar.gz 

进入/home/data/ 解压tar.gz压缩包 

[root@localhost data]# ls

jdk1.8.0_131  server-jre-8u131-linux-x64.tar.gz

 

[root@localhost ~]# mkdir /home/java

[root@localhost ~]# ls /home/

data  java

[root@localhost ~]# 

在/home下新建java文件夹，用来放jre

 

[root@localhost ~]# mv /home/data/jdk1.8.0_131/ /home/java/

[root@localhost ~]# ls /home/java/

jdk1.8.0_131

[root@localhost ~]# 

把/home/data/下的jre剪切到/home/java/下

 

第四步：jre目录以及子目录授予root权限

chown root:root -R /home/java/jdk1.8.0_131/

 

第五步：配置环境变量

编辑环境变量配置文件

vi /etc/profile 

在文件末尾加入下面代码，强制保存（w!）退出

export JAVA_HOME=/home/java

export JRE_HOME=/home/java/jdk1.8.0_131

export CLASSPATH=$JRE_HOME/lib/rt.jar:$JRE_HOME/lib/ext

export PATH=$PATH:$JRE_HOME/bin

 

使环境变量即时生效

source /etc/profile

 

第六步：测试

[root@localhost ~]# java -version

java version "1.8.0_131"

Java(TM) SE Runtime Environment (build 1.8.0_131-b11)

Java HotSpot(TM) 64-Bit Server VM (build 25.131-b11, mixed mode)

 

以及java和javac命令都行
