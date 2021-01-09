# Git服务


[[toc]]



## Flag

+ [https://github.com/semantic-release](https://github.com/semantic-release)

* [https://github.com/gitblit/gitblit](https://github.com/gitblit/gitblit)

- GH存档 [https://www.gharchive.org](https://www.gharchive.org)
- GitHub每周趋势 [https://github.com/SolaTyolo/gold_github_trending](https://github.com/SolaTyolo/gold_github_trending)
- GitHub每天趋势 [https://github.com/yangwenmai/github-trending-backup](https://github.com/yangwenmai/github-trending-backup)
- 记录GitHub趋势 [https://github.com/xiaobaiha/github-trending-history](https://github.com/xiaobaiha/github-trending-history)
- 获取统计信息 [https://github.com/shroudedcode/devstats](https://github.com/shroudedcode/devstats)
- 获取动态生成的GitHub统计信息 [https://github.com/anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- [你在 GitHub 上看到过的最有意思的项目是什么？ - 知乎](https://www.zhihu.com/question/23498424)


* [https://github.com/scm-manager/scm-manager](https://github.com/scm-manager/scm-manager)
* [https://www.mercurial-scm.org](https://www.mercurial-scm.org)
* 代码语法突出 [https://github.com/sharkdp/bat](https://github.com/sharkdp/bat)
* GitHub的Java API [https://github.com/hub4j/github-api](https://github.com/hub4j/github-api)

**代码跟踪分析**

- [https://sonarcloud.io](https://sonarcloud.io)
- [https://semmle.com](https://semmle.com)
    - [https://lgtm.com](https://lgtm.com)
- [https://www.openhub.net](https://www.openhub.net)
- [https://bestpractices.coreinfrastructure.org](https://bestpractices.coreinfrastructure.org)
- Gerrit [https://www.gerritcodereview.com](https://www.gerritcodereview.com)
  - [https://gerrit.asterisk.org/Documentation/index.html](https://gerrit.asterisk.org/Documentation/index.html)




**Gogs**

* [https://github.com/gogs/gogs](https://github.com/gogs/gogs)
    * [https://gogs.io](https://gogs.io)
* [https://hub.docker.com/r/gogs/gogs](https://hub.docker.com/r/gogs/gogs)
* [安装教程](https://www.jianshu.com/p/86c385682ac8)


**Gitea**

* [https://github.com/go-gitea/gitea](https://github.com/go-gitea/gitea)
  * [https://gitea.io](https://gitea.io)
* [https://hub.docker.com/r/gitea/gitea](https://hub.docker.com/r/gitea/gitea)



## GitLab

* [https://gitlab.com/xhang/gitlab/wikis/home](https://gitlab.com/xhang/gitlab/wikis/home)
* [GitLab Community Edition (中文社区版)](https://github.com/twang2218/gitlab-ce-zh)
    * [汉化的 GitLab 社区版 Docker Image](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
* [https://hub.docker.com/r/bensonfx/gitlab-ce-zh](https://hub.docker.com/r/bensonfx/gitlab-ce-zh)
* [https://github.com/bensonfx/codeserver](https://github.com/bensonfx/codeserver)
* [https://hub.docker.com/r/benyoo/gitlab](https://hub.docker.com/r/benyoo/gitlab)
* [https://hub.docker.com/r/imleafz/gitlab-ce-zh](https://hub.docker.com/r/imleafz/gitlab-ce-zh)


```yml
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



## GitHub

+ [https://github.com/github](https://github.com/github)

* [https://github.com/probot/probot](https://github.com/probot/probot)
* [https://help.github.com/cn](https://help.github.com/cn)
* 发布成功之后`github pages`的`Custom domain`配置项就被清空：[github-pages-basics](http://wiki.jikexueyuan.com/project/github-pages-basics/cname-file.html)
* [https://codecov.io](https://codecov.io)
* [目录 - P3TERX ZONE](https://p3terx.com/archives.html)

- [https://github.com/zenodo/zenodo](https://github.com/zenodo/zenodo)



### 访问速度过慢

* [https://myssl.com/dns_check.html](https://myssl.com/dns_check.html)
* [http://tool.chinaz.com/dns](http://tool.chinaz.com/dns)
* [https://www.ipaddress.com](https://www.ipaddress.com)
* [Windows设置GitHub的Hosts脚本](/files/设置GitHub的Hosts.bat)


**刷新DNS缓存**

- macOS

```bash
killall -HUP mDNSResponder
dscacheutil -flushcache
```

- Windows

```bash
ipconfig /flushdns
```

- Linux

```bash
service nscd restart
```

- Ubuntu

```bash
sudo /etc/init.d/dns-clean start
```


**克隆代理地址**

* [https://github.com/BaseMax/GitHubMirror](https://github.com/BaseMax/GitHubMirror)
* [https://github.com/RC1844/FastGithub](https://github.com/RC1844/FastGithub)

- 替换`github.com`为
  - `github.com.cnpmjs.org`
  - `jlytgs.com/github_`
  - `github.dyf62976.workers.dev`
  - `github.wuyanzheshui.workers.dev`
  - `github.hsmw.workers.dev`
  - `github.reycn.workers.dev`
  - `github.itzmx.com`

* [https://cdn.jsdelivr.net/gh](https://cdn.jsdelivr.net/gh)




### Actions

* [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
* [Github Actions 尝鲜](https://segmentfault.com/a/1190000020873860)
* [持续集成](https://blog.lucien.ink/category/ci)


> 生成公钥和私钥`ssh-keygen -t rsa -b 4096 -C "yourname@example.com" -f 文件名称 -N ""`（ACTION_DEPLOY_KEY），
> 或者生成新的个人访问令牌（PERSONAL_TOKEN）[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)


* [https://github.com/marketplace?utf8=%E2%9C%93&type=actions&query=deploy-to-github-pages](https://github.com/marketplace?utf8=%E2%9C%93&type=actions&query=deploy-to-github-pages)
* [https://github.com/actions](https://github.com/actions)
* [https://github.com/sdras/awesome-actions](https://github.com/sdras/awesome-actions)
* [https://github.com/peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
* [https://github.com/JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)

+ [https://github.com/marketplace?type=actions&query=upload+release](https://github.com/marketplace?type=actions&query=upload+release)
+ [https://github.com/wangyoucao577/go-release-action](https://github.com/wangyoucao577/go-release-action)
+ [https://github.com/elgohr/Publish-Docker-Github-Action](https://github.com/elgohr/Publish-Docker-Github-Action)
+ [https://github.com/release-drafter/release-drafter](https://github.com/release-drafter/release-drafter)
+ [https://github.com/xresloader/upload-to-github-release](https://github.com/xresloader/upload-to-github-release)
+ [https://github.com/svenstaro/upload-release-action](https://github.com/svenstaro/upload-release-action)


**第三方CI**

+ [CI services](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/ci-configuration.md)
+ [https://github.com/opencpu](https://github.com/opencpu)
+ [https://github.com/circleci](https://github.com/circleci)
+ [https://github.com/codeship](https://github.com/codeship)
+ [https://github.com/gocd](https://github.com/gocd)
+ [https://github.com/travis-ci](https://github.com/travis-ci)
+ [https://github.com/wercker](https://github.com/wercker)




## GitWebHook

- 手动部署

> Vue项目完成后,执行`npm run build`,然后将生成的dist目录下的文件放到web目录下

- WebHooks自动化部署,流程如下:

> 配置`Gitea`的`WebHook`通知(也可以用`码云`、`Github`、`GitLab`、`gogs`,带`WebHook`功能就行)

> 当我们`push`到仓库时,`Gitea`会主动发送一个通知到我们的服务器,然后服务器接到通知执行我们部署的脚本,开始自动化构建。


* [https://github.com/woytu/webhook-go](https://github.com/woytu/webhook-go)
* [https://github.com/adnanh/webhook](https://github.com/adnanh/webhook)
* [https://github.com/pre-commit](https://github.com/pre-commit)



### 配置接收通知

* [编译项目部署到指定目录.sh](/files/编译项目部署到指定目录.sh)
* [编译项目部署到GitHub.sh](/files/编译项目部署到GitHub.sh)


**必备环境**

- 以下命令视自己的环境而执行

```bash
# git
yum install -y git
# node 由于nodejs自带npm所以就不需要手动安装了
yum install -y nodejs
# vue-cli
npm install -g @vue/cli
```


#### 宝塔面板

- 设置宝塔WebHook插件

![](/images/宝塔WebHook设置.png)

- 宝塔WebHook获取url

- param参数需要和脚本里对应起来,我这里写的是pull

> `http://服务器ip:8888/hook?access_key=5C84B7A5UeXYalfNL6WEpi3jdmmxhFlk3jpvEw02BMo84Ak3&param=pull`

![](/images/宝塔WebHook获取url.png)


#### netcat命令

* [https://segmentfault.com/a/1190000016626298](https://segmentfault.com/a/1190000016626298)

- 实现监听端口->响应请求->执行脚本部署

- 一直监听 9999 端口，有请求就响应`echo`的内容，并执行指定脚本

```bash
echo -e "HTTP/1.1 200 ok,glass\r\nConnection: close\r\n\r" |  nc -l 0.0.0.0 9999 ; sh /home/update.sh >> /home/logs/webhook.log 2>&1
```

> 通过 systemd，可以将这个脚本管理起来，让它永远重启，这样一次部署之后，马上就可以重新监听，等待下一次部署命令。注意要添加 StartLimitInterval ，限制一下执行的频率。

- 最终的`systemd service`如下

```conf
[Unit]
Description=Autopull through webhook
After=network.target
 
[Service]
User=admin
Type=simple
ExecStart=/bin/bash -xc 'echo -e "HTTP/1.1 200 ok,glass\r\nConnection: close\r\n\r" |  nc -l 0.0.0.0 9999 ; sh /home/deploy/update.sh >> /home/logs/webhook.log 2>&1'
Restart=always
StartLimitInterval=1min
StartLimitBurst=60
 
[Install]
WantedBy=multi-user.target
```
> 这样就可以实现每次向 master push 代码，自动测试成功并且马上推送到测试环境中。 update.sh 脚本的最后可以加一个 Curl 命令向钉钉或者 slack 发送提醒。




### 配置WebHook

![](/images/GiteaWebHook设置.png)


#### 添加接收通知url

![](/images/GiteaWebHook添加.png)

#### 测试推送

![](/images/GiteaWebHook测试.png)