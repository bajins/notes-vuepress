# 卸载旧版本
```shell
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

# 开始安装docker
## 安装所需的包。yum-utils提供了yum-config-manager效用，并device-mapper-persistent-data和lvm2由需要devicemapper存储驱动程序。
```shell
yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

## 使用以下命令设置稳定的存储库。即使您想从边缘或测试存储库安装构建，也总是需要稳定的存储库。
```shell
yum-config-manager --enable docker-ce-edge
```
## 禁用测试库
```shell
yum-config-manager --disable docker-ce-edge
```
## 安装最新版本的Docker CE
```shell
yum install docker-ce
```
## 列出可用版本,从最高到最低排序
```shell
 yum list docker-ce --showduplicates | sort -r
```
## 安装一个库
```shell
yum install docker-ce-<VERSION STRING>
#例如
yum install docker-ce-18.03.1.ce
```

## 启动Docker
```shell
systemctl start docker
```
## 查看本地镜像
```shell
docker images
```
## 搜索镜像
```shell
##搜索centos有关的镜像
docker search centos
```
## 下载镜像
```shell
#centos镜像
docker pull centos
```

## 通过运行hello-world 映像验证安装是否正确。
```shell
docker run hello-world
```
## 启动一个基于docker.io/centos的容器
```shell
docker run -it --name=test-centos docker.io/centos:latest /bin/bash
```
```diff
+ -it 表示交互模式, 启动成功后进入命令行
+ -d 表示守护模式, 容器在后台运行
+ --name 为容器命名
+ docker.io/centos:latest 格式为镜像名:版本
+ /bin/bash 进入bash命令行
```

## 其他docker命令
```shell
#退出docker容器
#如果容器内部没有任何程序运行, 一旦执行exit, 退出容器时, 容器将结束运行
exit

#查看运行中的容器
docker ps
#查看全部的容器, 包括运行中和已停止运行的容器
docker ps -a

#通过容器名称删除已经停止运行的容器(test-centos为docker run命令中给容器的命名)
docker rm test-centos
#通过容器ID删除已经停止运行的容器,与上面的命令效果一样, 060e是containerID的前4位
docker rm 060e
#强制删除状态为Up, 正在运行中的容器
docker rm -f test-centos
```
*********************

# 构建镜像文件

## 准备centos基础镜像
```shell
docker pull centos
```
## 准备JDK7和tomcat8.5安装包
JDK7下载地址：
http://www.oracle.com/technetwork/java/javase/downloads/java-archive-downloads-javase7-521261.html

tomcat8.5下载地址：
https://tomcat.apache.org/download-80.cgi

## 在home文件夹下创建docker目录
```shell
mkdir -p /home/docker
```
## 把JDK和Tomcat都解压到/home/docker文件夹下
### 建议重命名为最简单的名称
```shell
#解压
tar -zxvf jdk-7u80-linux-i586.tar.gz -C /home/docker
tar -zxvf apache-tomcat-8.5.32.tar.gz -C /home/docker
#重命名
mv /home/docker/apache-tomcat-8.5.32.tar.gz /home/docker/tomcat-8080
```
## 删掉jdk文件夹下多余文件, 降低build的镜像大小
```shell
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

## 进入/home/docker文件夹并创建Dockerfile文件
```shell
cd /home/docker && vi Dockerfile
```
## 插入以下内容
```shell
#使用的基础镜像
FROM centos
#作者信息
MAINTAINER ichangg "claer@ichangg.com"

#创建目录
RUN mkdir -p /data/java/jdk1.7.0_80
#把当前目录下的jdk文件夹添加到镜像
ADD jdk1.7.0_80 /data/java/jdk1.7.0_80

#创建tomcat目录
RUN mkdir -p /data/java/tomcat-8080
#把当前目录下的tomcat文件夹添加到镜像
ADD tomcat-8080 /data/java/tomcat-8080

#添加环境变量
ENV JAVA_HOME /data/java/jdk1.7.0_80
ENV CATALINA_HOME /data/java/tomcat-8080
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/bin

#暴露端口
EXPOSE 8080
EXPOSE 8090

#启动时运行tomcat
CMD ["/data/java/tomcat-8080/bin/catalina.sh","run"]
```
## 开始构建docker镜像文件
```shell
docker build -t repos_local/centos-jdk7-tomcat85:0.0.1 .
```
```diff
+ -t 设置tag名称, 命名规则registry/image:tag
+ . 表示使用当前目录下的Dockerfile文件
```
## 查看镜像是否创建成功
```shell
docker images
```
## 启动centos-jdk7-tomcat85容器
```shell
docker run -d -p 8081:8080 --name tomcat-8080 repos_local/centos-jdk7-tomcat85:0.0.1
```
```diff
+ -d 后台运行
+ -p 宿主机port:容器port 端口映射,外部访问的是宿主机端口
+ --name 容器名称, 可以通过容器名称对容器操作
```
## centos7下可以直接使用firewall-cmd来开放端口
```shell
#开放8081端口  permanent为永久开放
firewall-cmd --zone=public --add-port=8081/tcp --permanent
#重新读取配置
firewall-cmd --reload
#查看全部开放端口
firewall-cmd --list-all
#如果提示FirewallD is not running执行systemctl start firewalld.service, 启动firewalld服务
```
## 查看docker运行状态
```shell
docker ps
```

## 运行Tomcat
```shell
docker start tomcat-8080
```
## 停止Tomcat
```shell
docker stop tomcat-8080
```

## 强制删除一个运行中的容器
```shell
docker rm -f tomcat-8080
#docker rm 命令删除一个Exited状态的容器, docker rm -f 强制删除一个运行中的容器
```


