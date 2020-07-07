# Docker


[[toc]]



## flag

+ [https://github.com/docker](https://github.com/docker)
    + [https://www.docker.com](https://www.docker.com)
    + [https://docs.docker.com](https://docs.docker.com)
    + Windows10以下安装: [https://github.com/docker/toolbox](https://github.com/docker/toolbox)
+ [https://github.com/boot2docker](https://github.com/boot2docker)
+ [Docker及图形化管理UI Portainer的搭建](https://juejin.im/post/5da3de28518825651b1e0633)
+ [利用Docker实现后台项目模板化配置部署](https://juejin.im/post/5da81a7d6fb9a04def4e6d6b)

* [Docker进阶实用命令](https://sleele.com/2018/09/27/docker%e8%bf%9b%e9%98%b6%e5%ae%9e%e7%94%a8%e5%91%bd%e4%bb%a4/)
* [https://sleele.com/category/docker/](https://sleele.com/category/docker/)
* [https://docs.microsoft.com/zh-cn/virtualization](https://docs.microsoft.com/zh-cn/virtualization)

- [https://kanyways.github.io](https://kanyways.github.io)


* Docker的完整PHP开发环境 [https://github.com/laradock/laradock](https://github.com/laradock/laradock)
* [https://github.com/GoogleContainerTools](https://github.com/GoogleContainerTools)

- [随笔分类 - Docker](https://www.cnblogs.com/itoak/category/1769634.html)

* [https://cloud.google.com/container-registry](https://cloud.google.com/container-registry)


+ podman [https://github.com/containers](https://github.com/containers)
    + [再见 Docker，是时候拥抱下一代容器工具了](https://mp.weixin.qq.com/s/MDi4RB5V60EGl3ii9usD0Q)
    + [podman初试-和docker对比](https://blog.51cto.com/13447608/2448072)


**Docker搭建私有仓库**

+ 企业级Registry服务器 [https://github.com/goharbor/harbor](https://github.com/goharbor/harbor)
+ [Docker 私有仓库搭建](https://www.cnblogs.com/huanchupkblog/p/10843800.html)
+ [从零搭建docker私有仓库](https://www.jianshu.com/p/2d9d4cdd3af7)


## 仓库镜像

+ 查找最快的docker镜像: [https://github.com/silenceshell/docker_mirror](https://github.com/silenceshell/docker_mirror)

* Docker官方映像 [https://github.com/docker-library](https://github.com/docker-library)
* [https://hub.docker.com](https://hub.docker.com)
* [https://hub.daocloud.io](https://hub.daocloud.io)

- [https://www.daocloud.io/mirror](https://www.daocloud.io/mirror)

* 阿里云 [https://cr.console.aliyun.com](https://cr.console.aliyun.com)
    * [https://alzgoonw.mirror.aliyuncs.com](https://alzgoonw.mirror.aliyuncs.com)
    * [https://jvqgqnis.mirror.aliyuncs.com](https://jvqgqnis.mirror.aliyuncs.com)
    * [https://3laho3y3.mirror.aliyuncs.com](https://3laho3y3.mirror.aliyuncs.com)
    * [https://cty6v5sm.mirror.aliyuncs.com](https://cty6v5sm.mirror.aliyuncs.com)
* ustc中国科技大学 [https://docker.mirrors.ustc.edu.cn](https://docker.mirrors.ustc.edu.cn)
* 网易 [http://hub-mirror.c.163.com](http://hub-mirror.c.163.com)
* Docker 官方中国区 [https://registry.docker-cn.com](https://registry.docker-cn.com)
* Azure 中国镜像 [https://dockerhub.azk8s.cn](https://dockerhub.azk8s.cn)
* 七牛云加速器 [https://reg-mirror.qiniu.com](https://reg-mirror.qiniu.com)
* 腾讯云 [https://mirror.ccs.tencentyun.com](https://mirror.ccs.tencentyun.com)





## Docker命令

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


## Docker compose

* [Docker Compose概述](https://docs.docker.com/compose)
* [Compose文件参考](https://docs.docker.com/compose/compose-file)
* [docker-compose.yml 配置文件编写详解](https://blog.csdn.net/qq_36148847/article/details/79427878)
* [Docker Compose 详解](https://www.jianshu.com/p/658911a8cff3)
* [Docker Compose 配置文件详解](https://www.jianshu.com/p/2217cfed29d7)
* [docker run 和 docker-compose 配置挂载 Volume 并运行 nginx](https://www.jianshu.com/p/e11e01b9d675)


> Compose 文件是一个 YAML , 主要定义了 `services`,`networks` 和 `volumes`，其默认路径是 `./docker-compose.yml`

> `service` 定义包含了应用与每个容器的配置，很像给 `docker run` 传参，同样， 
> `network` 和 `volume` 对于 `docker network create` 和 `docker volume create` 也类似。

> 像在 Dockerfile （eg: `CMD` , `EXPOSE` , `VOLUME` , `ENV`）可以使用的选项也可以在 `docker run`参数中使用，
> 这样在 `docker-compose.yml` 里就不需要再次指定了。

> `docker-compose.yml` 里可以使用环境变量，类似 `Bash` 格式 `${VARIABLE}`

- `composer` 文件格式有两种版本：
    - `version 1`: 已经废弃， 不支持`volumes` 和 `networks`，默认 `version key` 是省略的。
    - `version 2`: 推荐的格式，目前是最新的，需要通过 `version '2'` 指定。



**ports**

> 暴露端口。既可以是 `HOST:CONTAINER` ，也可以只用容器端口(host端口会随机选取)。
> 当以 `HOST:CONTAINER` 的形式映射端口的时候，当容器的端口低于60的时候可能会遇到错误，
> 因为YAML会解析 xx:yy 数字为60。 基于这个原因，我们推荐明确指定端口映射用字符串的形式。

**volumes**

> 挂载指定的路径或者`named volumes`, 可以在主机上指定一个路径 HOST:CONTAINER ,或者一个可访问的 HOST:CONTAINER:ro 。




## Dockerfile

* [Dockerfile参考](https://docs.docker.com/engine/reference/builder)
* [编写Dockerfile的最佳实践](https://docs.docker.com/develop/develop-images/dockerfile_best-practices)
* [Dockerfile 基本命令详解](https://mp.weixin.qq.com/s/2poLYm-MgAEJxCYiRZDnQw)

- 创建`Dockerfile`文件

```bash
vi Dockerfile
```

- 添加内容

```dockerfile
# 使用的基础镜像
FROM centos:7
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

# 暴露容器端口
EXPOSE 8080
EXPOSE 8090

# 启动时运行tomcat
CMD ["/data/java/tomcat-8080/bin/catalina.sh","run"]
```

```dockerfile
FROM centos:7

#安装wget工具
RUN yum -y install wget

#下载并且安装jdk设置环境变量
COPY jdk-8u201-linux-x64.rpm jdk-8u201-linux-x64.rpm
RUN rpm -ivh jdk-8u201-linux-x64.rpm
ENV JAVA_HOME /usr/java/latest/
ENV PATH=$JAVA_HOME/bin:$PATH
ENV CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
RUN rm -rf jdk-8u201-linux-x64.rpm

#时区中文等处理
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo 'Asia/Shanghai' >/etc/timezone
RUN yum -y install kde-l10n-Chinese

#配置显示中文
RUN localedef -c -f UTF-8 -i zh_CN zh_CN.utf8
ENV LC_ALL zh_CN.utf8
RUN echo "export LC_ALL=zh_CN.utf8" >> /etc/profile
```
