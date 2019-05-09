# Docker

# 目录
* [Git](#Git)
    * [GitLab](#GitLab)
    * [Gogs](#Gogs)
    * [Gitea](#Gitea)
* [Read the Docs](#ReadtheDocs)
--------------------------------------------------

## [docker官网centos7安装](https://docs.docker.com/install/linux/docker-ce/centos/)

# Git

## GitLab

https://hub.docker.com/r/bensonfx/gitlab-ce-zh

https://github.com/bensonfx/codeserver

https://hub.docker.com/r/benyoo/gitlab

https://hub.docker.com/r/imleafz/gitlab-ce-zh

https://gitlab.com/xhang/gitlab/uploads/23e8414e53eefde0968e960b24a6f631/_%E5%8E%9F%E5%88%9B_Gitlab10.8.0%E5%88%86%E6%94%AF%E6%B1%89%E5%8C%96_Omnibus%E7%89%88_.png

#### [GitLab Community Edition (中文社区版)](https://github.com/twang2218/gitlab-ce-zh)
#### [汉化的 GitLab 社区版 Docker Image ](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
```shell
version: '2'
services:
    gitlab:
      image: 'twang2218/gitlab-ce-zh:11.1.4'
      restart: unless-stopped
      hostname: 'git.woetu.com'
      environment:
        TZ: 'Asia/Shanghai'
        GITLAB_OMNIBUS_CONFIG: |
          external_url 'http://git.woetu.com'
          gitlab_rails['time_zone'] = 'Asia/Shanghai'
          # 需要配置到 gitlab.rb 中的配置可以在这里配置，每个配置一行，注意缩进。
          # 比如下面的电子邮件的配置：
          # gitlab_rails['smtp_enable'] = true
          # gitlab_rails['smtp_address'] = "smtp.exmail.qq.com"
          # gitlab_rails['smtp_port'] = 465
          # gitlab_rails['smtp_user_name'] = "xxxx@xx.com"
          # gitlab_rails['smtp_password'] = "password"
          # gitlab_rails['smtp_authentication'] = "login"
          # gitlab_rails['smtp_enable_starttls_auto'] = true
          # gitlab_rails['smtp_tls'] = true
          # gitlab_rails['gitlab_email_from'] = 'xxxx@xx.com'
      ports:
        - '8099:80'
        - '442:443'
        - '22:22'
      volumes:
        # - /home/gitlab/config:/home/gitlab/config
        # - /home/gitlab/data:/home/gitlab/data
        # - /home/gitlab/logs:/home/gitlab/logs
        - config:/etc/gitlab
        - data:/var/opt/gitlab
        - logs:/var/log/gitlab
volumes:
    config:
    data:
    logs:
```

# docker-compose.yml基本介绍
http://ju.outofmemory.cn/entry/287017
> Compose 文件是一个 YAML , 主要定义了 services , networks 和 volumes ， 其默认路径是 ./docker-compose.yml 。

> service 定义包含了应用与每个容器的配置，很像给 docker run 传参，同样， network 和 volume 对于 docker network create 和 docker volume create 也类似。

> 像在 Dockerfile (eg: CMD , EXPOSE , VOLUME , ENV )可以使用的选项也可以在 docker run 参数中使用， 这样在 docker-compose.yml 里就不需要再次指定了。

> docker-compose.yml 里可以使用环境变量，类似 Bash 格式 ${VARIABLE}

> composer 文件格式有两种版本：

>> version 1: 已经废弃， 不支持volumes 和 networks，默认 version key 是省略的。

>> version 2: 推荐的格式，目前是最新的，需要通过 version '2' 指定。

### ports
> 暴露端口。既可以是 HOST:CONTAINER ，也可以只用容器端口(host端口会随机选取)。
> 当以 HOST:CONTAINER 的形式映射端口的时候，当容器的端口低于60的时候可能会遇到错误，因为YAML会解析 xx:yy 数字为60。 基于这个原因，我们推荐明确指定端口映射用字符串的形式。

> volumes
>> 挂载指定的路径或者named volumes, 可以在主机上指定一个路径 HOST:CONTAINER , 或者一个可访问的 HOST:CONTAINER:ro 。


## Gogs

https://hub.docker.com/r/gogs/gogs

https://github.com/gogs/gogs/blob/master/README_ZH.md

[安装教程](https://www.moerats.com/archives/561/)

[安装教程](https://www.jianshu.com/p/86c385682ac8)

## Gitea
https://hub.docker.com/r/gitea/gitea

https://github.com/go-gitea/gitea/blob/master/README_ZH.md

[安装教程](https://www.moerats.com/archives/578/)



## ReadtheDocs
### [Read the Docs](https://hub.docker.com/r/readthedocs/build/)






