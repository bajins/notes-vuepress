# Docker



* [docker-compose.yml基本介绍](#docker-composeyml基本介绍)
  * [ports](#ports)
* [卸载旧版本](#卸载旧版本)
* [开始安装docker](#开始安装docker)
  * [设置稳定的存储库。](#设置稳定的存储库)
  * [禁用测试库](#禁用测试库)
  * [安装最新版本的Docker CE](#安装最新版本的docker-ce)
  * [列出可用版本,从最高到最低排序](#列出可用版本从最高到最低排序)
  * [安装一个库](#安装一个库)
  * [启动Docker](#启动docker)
  * [查看本地镜像](#查看本地镜像)
  * [搜索镜像](#搜索镜像)
  * [下载镜像](#下载镜像)
  * [验证安装](#验证安装)
  * [启动](#启动)
  * [其他docker命令](#其他docker命令)
* [构建镜像文件](#构建镜像文件)
  * [准备CentOS基础镜像](#准备centos基础镜像)
  * [下载](#下载)
  * [创建目录](#创建目录)
  * [解压](#解压)
  * [删除多余文件](#删除多余文件)
  * [创建Dockerfile](#创建dockerfile)
  * [插入以下内容](#插入以下内容)
  * [开始构建docker镜像文件](#开始构建docker镜像文件)
  * [查看镜像是否创建成功](#查看镜像是否创建成功)
  * [启动容器](#启动容器)
  * [开放端口](#开放端口)
  * [查看docker运行状态](#查看docker运行状态)
  * [运行Tomcat](#运行tomcat)
  * [停止Tomcat](#停止tomcat)
  * [强制删除一个运行中的容器](#强制删除一个运行中的容器)
  * [停止container](#停止container)
  * [删除images](#删除images)



[docker官网centos7安装](https://docs.docker.com/install/linux/docker-ce/centos/)


## docker-compose.yml基本介绍

[http://ju.outofmemory.cn/entry/287017](http://ju.outofmemory.cn/entry/287017)

> Compose 文件是一个 YAML , 主要定义了 services , networks 和 volumes ， 其默认路径是 ./docker-compose.yml 。

> service 定义包含了应用与每个容器的配置，很像给 docker run 传参，同样， 
> network 和 volume 对于 docker network create 和 docker volume create 也类似。

> 像在 Dockerfile (eg: CMD , EXPOSE , VOLUME , ENV )可以使用的选项也可以在 `docker run`参数中使用，
> 这样在 docker-compose.yml 里就不需要再次指定了。

> docker-compose.yml 里可以使用环境变量，类似 Bash 格式 ${VARIABLE}

> composer 文件格式有两种版本：

>> version 1: 已经废弃， 不支持volumes 和 networks，默认 version key 是省略的。

>> version 2: 推荐的格式，目前是最新的，需要通过 version '2' 指定。

### ports

> 暴露端口。既可以是 HOST:CONTAINER ，也可以只用容器端口(host端口会随机选取)。
> 当以 HOST:CONTAINER 的形式映射端口的时候，当容器的端口低于60的时候可能会遇到错误，
> 因为YAML会解析 xx:yy 数字为60。 基于这个原因，我们推荐明确指定端口映射用字符串的形式。

> volumes
>> 挂载指定的路径或者named volumes, 可以在主机上指定一个路径 HOST:CONTAINER ,
>> 或者一个可访问的 HOST:CONTAINER:ro 。


## 卸载旧版本

```bash
yum remove docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-selinux \
docker-engine-selinux \
docker-engine
```

## 开始安装docker

> 安装所需的包。yum-utils提供了yum-config-manager效用，
> 并device-mapper-persistent-data和lvm2由需要devicemapper存储驱动程序。

```bash
yum install -y yum-utils \
device-mapper-persistent-data \
lvm2
```

### 设置稳定的存储库。

> 即使您想从边缘或测试存储库安装构建，也总是需要稳定的存储库。

```bash
yum-config-manager --enable docker-ce-edge
```

### 禁用测试库

```bash
yum-config-manager --disable docker-ce-edge
```

### 安装最新版本的Docker CE

```bash
yum install docker-ce
```

### 列出可用版本,从最高到最低排序

```bash
 yum list docker-ce --showduplicates | sort -r
```

### 安装一个库

```bash
yum install docker-ce-<VERSION STRING>
#例如
yum install docker-ce-18.03.1.ce
```

### 启动Docker

```bash
systemctl start docker
```

### 查看本地镜像

```bash
docker images
```

### 搜索镜像

```bash
# 搜索centos有关的镜像
docker search centos
```

### 下载镜像

```bash
# centos镜像
docker pull centos
```

### 验证安装

> 通过运行`hello-world`映像验证安装是否正确。

```bash
docker run hello-world
```

### 启动

> 启动一个基于`docker.io/centos`的容器

```bash
docker run -it --name=test-centos docker.io/centos:latest /bin/bash
```

> `-it` 表示交互模式, 启动成功后进入命令行
>
> `-d` 表示守护模式, 容器在后台运行
>
> `--name` 为容器命名
>
> `docker.io/centos:latest` 格式为镜像名:版本
>
> `/bin/bash` 进入bash命令行

### 其他docker命令

```bash
# 退出docker容器
# 如果容器内部没有任何程序运行, 一旦执行exit, 退出容器时, 容器将结束运行
exit

# 查看运行中的容器
docker ps
# 查看全部的容器, 包括运行中和已停止运行的容器
docker ps -a

# 通过容器名称删除已经停止运行的容器(test-centos为docker run命令中给容器的命名)
docker rm test-centos
# 通过容器ID删除已经停止运行的容器,与上面的命令效果一样, 060e是containerID的前4位
docker rm 060e
# 强制删除状态为Up, 正在运行中的容器
docker rm -f test-centos
```

## 构建镜像文件

### 准备CentOS基础镜像

```bash
docker pull centos
```

### 下载

[JDK7下载地址](http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html)

[tomcat8.5下载地址](https://tomcat.apache.org/download-80.cgi)

### 创建目录

> 在home文件夹下创建docker目录

```bash
mkdir -p /home/docker
```

### 解压

> 把JDK和Tomcat都解压到/home/docker文件夹下，建议重命名为最简单的名称

```bash
# 解压
tar -zxvf jdk-7u80-linux-i586.tar.gz -C /home/docker
tar -zxvf apache-tomcat-8.5.32.tar.gz -C /home/docker
# 重命名
mv /home/docker/apache-tomcat-8.5.32.tar.gz /home/docker/tomcat-8080
```

### 删除多余文件

> 删掉jdk文件夹下多余文件, 降低build的镜像大小

```bash
rm -rf /data/docker/jdk1.7.0_80/*src.zip \
/data/docker/jdk1.7.0_80/lib/missioncontrol \
/data/docker/jdk1.7.0_80/lib/visualvm \
/data/docker/jdk1.7.0_80/lib/*javafx* \
/data/docker/jdk1.7.0_80/jre/lib/plugin.jar \
/data/docker/jdk1.7.0_80/jre/lib/ext/jfxrt.jar \
/data/docker/jdk1.7.0_80/jre/bin/javaws \
/data/docker/jdk1.7.0_80/jre/lib/javaws.jar \
/data/docker/jdk1.7.0_80/jre/lib/desktop \
/data/docker/jdk1.7.0_80/jre/plugin \
/data/docker/jdk1.7.0_80/jre/lib/deploy* \
/data/docker/jdk1.7.0_80/jre/lib/*javafx* \
/data/docker/jdk1.7.0_80/jre/lib/*jfx* \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libdecora_sse.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libprism_*.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libfxplugins.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libglass.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libgstreamer-lite.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libjavafx*.so \
/data/docker/jdk1.7.0_80/jre/lib/amd64/libjfx*.so
```

### 创建Dockerfile

> 进入`/home/docker`文件夹并创建`Dockerfile`文件

```bash
cd /home/docker && vi Dockerfile
```

### 插入以下内容

```bash
# 使用的基础镜像
FROM centos
# 作者信息
MAINTAINER bajins "claer@bajins.com"

# 创建目录
RUN mkdir -p /data/java/jdk1.7.0_80
# 把当前目录下的jdk文件夹添加到镜像
ADD jdk1.7.0_80 /data/java/jdk1.7.0_80

# 创建tomcat目录
RUN mkdir -p /data/java/tomcat-8080
# 把当前目录下的tomcat文件夹添加到镜像
ADD tomcat-8080 /data/java/tomcat-8080

# 添加环境变量
ENV JAVA_HOME /data/java/jdk1.7.0_80
ENV CATALINA_HOME /data/java/tomcat-8080
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/bin

# 暴露端口
EXPOSE 8080
EXPOSE 8090

# 启动时运行tomcat
CMD ["/data/java/tomcat-8080/bin/catalina.sh","run"]
```

### 开始构建docker镜像文件

```bash
docker build -t repos_local/centos-jdk7-tomcat85:0.0.1 .
```

> `-t` 设置tag名称, 命名规则registry/image:tag
>
> `.` 表示使用当前目录下的Dockerfile文件

### 查看镜像是否创建成功

```bash
docker images
```

### 启动容器

```bash
docker run -d -p 8081:8080 --name tomcat-8080 repos_local/centos-jdk7-tomcat85:0.0.1
```

> `-d` 后台运行
>
> `-p` 宿主机port:容器port 端口映射,外部访问的是宿主机端口
>
> `--name` 容器名称, 可以通过容器名称对容器操作

### 开放端口

> CentOS7下可以直接使用firewall-cmd来开放端口

```bash
# 开放8081端口  permanent为永久开放
firewall-cmd --zone=public --add-port=8081/tcp --permanent
# 重新读取配置
firewall-cmd --reload
# 查看全部开放端口
firewall-cmd --list-all
# 如果提示FirewallD is not running执行systemctl start firewalld.service, 启动firewalld服务
```

### 查看docker运行状态

```bash
docker ps
```

### 运行Tomcat

```bash
docker start tomcat-8080
```

### 停止Tomcat

```bash
docker stop tomcat-8080
```

### 强制删除一个运行中的容器

```bash
docker rm -f tomcat-8080
#docker rm 命令删除一个Exited状态的容器, docker rm -f 强制删除一个运行中的容器
```

### 停止container

> 停止所有的`container`，这样才能够删除其中的`images`

```bash
docker stop $(docker ps -a -q)
# 如果想要删除所有container的话再加一个指令：
docker rm $(docker ps -a -q)
```

### 删除images

> 通过image的id来指定删除谁

```bash
docker rmi <image id>
#想要删除untagged images，也就是那些id为<None>的image的话可以用
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
#要删除全部image的话
docker rmi $(docker images -q)
```


```bash
docker run -it 

docker run -i -t -v /home:/home/docker 89796a /bin/bash

docker run -d -p 8080:8080 \
-v /home/tomcat/webapps/:/home/tomcat-8080/webapps/ \
--name bajins bajins/centos-jt:1.0 /home/run.sh
```
> `-v` 略，如前所述说
>
> `-d` 表示以"守护模式"执行/root/run.sh脚本，此时 Tomcat 控制台不会出现在输出终端上
>
> `-p` 表示宿主机与容器的端口映射，此时将容器内部的8080端口映射为宿主机的58080端口，
> 这样就向外界暴露了58080端口，可通过Docker网桥来访问容器内部的8080端口了
>
> `--name` 表示容器名称，用一个你觉得有意义的名称命名即可
>
> `test_tomcat:1.0` 即新容器名:TAG
>
> `/root/run.sh` 即需要执行的脚本

```bash
#!/bin/bash

export JAVA_HOME=/home/java/jdk1.7.0_80
export PATH=$JAVA_HOME/bin:$PATH

sh /home/tomcat-8080/bin/catalina.sh run

chmod a+x run.sh

rm -rf /home/jdk1.7.0_80/*src.zip \
/home/jdk1.7.0_80/lib/missioncontrol \
/home/jdk1.7.0_80/lib/visualvm \
/home/jdk1.7.0_80/lib/*javafx* \
/home/jdk1.7.0_80/jre/lib/plugin.jar \
/home/jdk1.7.0_80/jre/lib/ext/jfxrt.jar \
/home/jdk1.7.0_80/jre/bin/javaws \
/home/jdk1.7.0_80/jre/lib/javaws.jar \
/home/jdk1.7.0_80/jre/lib/desktop \
/home/jdk1.7.0_80/jre/plugin \
/home/jdk1.7.0_80/jre/lib/deploy* \
/home/jdk1.7.0_80/jre/lib/*javafx* \
/home/jdk1.7.0_80/jre/lib/*jfx* \
/home/jdk1.7.0_80/jre/lib/amd64/libdecora_sse.so \
/home/jdk1.7.0_80/jre/lib/amd64/libprism_*.so \
/home/jdk1.7.0_80/jre/lib/amd64/libfxplugins.so \
/home/jdk1.7.0_80/jre/lib/amd64/libglass.so \
/home/jdk1.7.0_80/jre/lib/amd64/libgstreamer-lite.so \
/home/jdk1.7.0_80/jre/lib/amd64/libjavafx*.so \
/home/jdk1.7.0_80/jre/lib/amd64/libjfx*.so
	
	

docker commit -m="Added jdk_tomcat" -a="bajins" 44652ba46352 bajins/centos-jt:1.0
-m:提交的描述信息

-a:指定镜像作者

44652ba46352：容器ID

bajins/centos-jt:1.0:指定要创建的目标镜像名,1.0版本
```

