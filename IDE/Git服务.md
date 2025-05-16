# Git服务

[[toc]]


## Flag

+ [https://github.com/harness/gitness](https://github.com/harness/gitness)
+ [https://github.com/semantic-release](https://github.com/semantic-release)
+ [https://github.com/GerritCodeReview/git-repo](https://github.com/GerritCodeReview/git-repo)
+ [https://github.com/gitonomy/gitlib](https://github.com/gitonomy/gitlib)
+ [https://github.com/gitbucket/gitbucket](https://github.com/gitbucket/gitbucket)



* Git实现 [https://github.com/libgit2/libgit2](https://github.com/libgit2/libgit2)
* [https://github.com/go-git](https://github.com/go-git)
* Java实现 [https://github.com/eclipse/jgit](https://github.com/eclipse/jgit)
    * [https://github.com/centic9/jgit-cookbook](https://github.com/centic9/jgit-cookbook)
* [https://github.com/gitblit/gitblit](https://github.com/gitblit/gitblit)
* [https://github.com/scm-manager/scm-manager](https://github.com/scm-manager/scm-manager)
*  [https://github.com/projectkudu/kudu](https://github.com/projectkudu/kudu)
* 来自配置错误的网站的Git仓库泄漏 [https://github.com/liamg/gitjacker](https://github.com/liamg/gitjacker)



**其他GIT服务**

* [https://forgejo.org](https://forgejo.org)
    * [https://codeberg.org](https://codeberg.org)
    * [https://disroot.org/en/services/git](https://disroot.org/en/services/git)
    * [https://git.pub.solar](https://git.pub.solar)
    * [https://git.kaki87.net](https://git.kaki87.net)
    * [https://sij.ai](https://sij.ai)
    * 静态站点 [https://git.gay/gitgay/pages-server](https://git.gay/gitgay/pages-server)
* [https://git.pleroma.social](https://git.pleroma.social)
* [https://code.aliyun.com](https://code.aliyun.com)
* [https://coding.net](https://coding.net)
* [https://git.code.tencent.com](https://git.code.tencent.com)
* [https://framagit.org](https://framagit.org)
* [https://git.hit.edu.cn](https://git.hit.edu.cn)
* [https://www.gitlink.org.cn](https://www.gitlink.org.cn)
* [https://sourceforge.net](https://sourceforge.net)
* [https://bitbucket.org](https://bitbucket.org)
* [https://www.gitkraken.com](https://www.gitkraken.com)
* [https://launchpad.net](https://launchpad.net)
* [https://kolaente.dev](https://kolaente.dev)
* [https://git.resf.org](https://git.resf.org)
* 软件相似度比较 [https://copycat.gitee.com](https://copycat.gitee.com)



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

> root用户登录，右上角头像，Settings -> Preferences -> Localization -> Language，选择“简体中文”即可。
> 高版本的GitLab自带了中文语言包，可以通过上述方式直接切换。如果找不到该选项，表示你的版本还不支持。只能通过安装中文插件进行汉化。


+ [https://gitlab.com/gitlab-org/gitlab](https://gitlab.com/gitlab-org/gitlab)
    + [https://gitlab.cn/install/ce-or-ee](https://gitlab.cn/install/ce-or-ee)
+ [https://gitlab.com/gitlab-org/gitlab-runner](https://gitlab.com/gitlab-org/gitlab-runner)


* [https://gitlab.com/xhang/gitlab/wikis/home](https://gitlab.com/xhang/gitlab/wikis/home)
* [https://github.com/twang2218/gitlab-ce-zh](https://github.com/twang2218/gitlab-ce-zh)
    * [汉化的 GitLab 社区版 Docker Image](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
* [https://hub.docker.com/r/bensonfx/gitlab-ce-zh](https://hub.docker.com/r/bensonfx/gitlab-ce-zh)
* [https://github.com/bensonfx/codeserver](https://github.com/bensonfx/codeserver)
* [https://hub.docker.com/r/benyoo/gitlab](https://hub.docker.com/r/benyoo/gitlab)
* [https://hub.docker.com/r/imleafz/gitlab-ce-zh](https://hub.docker.com/r/imleafz/gitlab-ce-zh)
* [https://crowdin.com/project/gitlab-ee](https://crowdin.com/project/gitlab-ee)
* clone所有项目 [https://github.com/huchao1009/gitlab-projects-clone](https://github.com/huchao1009/gitlab-projects-clone)
* [https://git.openldap.org](https://git.openldap.org)
* [https://bitnami.com/stack/gitlab](https://bitnami.com/stack/gitlab)



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
+ 预览项目HTML [https://github.com/htmlpreview/htmlpreview.github.com](https://github.com/htmlpreview/htmlpreview.github.com)
+ 嵌入到HTML [https://github.com/yusanshi/emgithub](https://github.com/yusanshi/emgithub)
+ 生成更新日志 [https://github.com/shipkit/shipkit-changelog](https://github.com/shipkit/shipkit-changelog)
+ [https://github.com/lowlighter/metrics](https://github.com/lowlighter/metrics)
+ [https://github.com/ryo-ma/github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy)


* GitHub漫游指南 [https://github.com/phodal/github](https://github.com/phodal/github)
* 首次贡献 [https://github.com/firstcontributions/first-contributions](https://github.com/firstcontributions/first-contributions)
* [https://github.com/all-contributors/all-contributors](https://github.com/all-contributors/all-contributors)
* [https://github.com/probot/probot](https://github.com/probot/probot)
* [https://help.github.com/cn](https://help.github.com/cn)
* 发布成功之后`github pages`的`Custom domain`配置项就被清空：[github-pages-basics](http://wiki.jikexueyuan.com/project/github-pages-basics/cname-file.html)
* [https://codecov.io](https://codecov.io)
* [目录 - P3TERX ZONE](https://p3terx.com/archives.html)
* [https://github.com/tiimgreen/github-cheat-sheet](https://github.com/tiimgreen/github-cheat-sheet)
* 发现造假stars [https://github.com/dagster-io/fake-star-detector](https://github.com/dagster-io/fake-star-detector)
* 2FA身份验证 [https://github.com/Dolov/chrome-github-2fa](https://github.com/Dolov/chrome-github-2fa)


- [https://github.com/zenodo/zenodo](https://github.com/zenodo/zenodo)
- 手动同步fork [https://blog.blueskyclouds.com/jsfx/58.html](https://blog.blueskyclouds.com/jsfx/58.html)
- [https://github.com/wei/git-sync](https://github.com/wei/git-sync)
- [https://github.com/repo-sync](https://github.com/repo-sync)
- 自动同步fork [https://github.com/wei/pull](https://github.com/wei/pull)
    - [https://github.com/apps/pull](https://github.com/apps/pull)
    - [https://github.com/BlueskyClouds/My-Actions/blob/master/backUp/gitSync.md](https://github.com/BlueskyClouds/My-Actions/blob/master/backUp/gitSync.md)
- GitHub的Java API [https://github.com/hub4j/github-api](https://github.com/hub4j/github-api)
- 自动拉取请求 [https://github.com/dependabot/dependabot-core](https://github.com/dependabot/dependabot-core)
- 项目管理 [https://www.zenhub.com](https://www.zenhub.com)



**统计**


- [https://github.com/search?o=desc&q=stars%3A%3E100000&s=stars](https://github.com/search?o=desc&q=stars%3A%3E100000&s=stars)
- [https://github.com/trending](https://github.com/trending)
- GitHub存档 [https://www.gharchive.org](https://www.gharchive.org)
- [https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts](https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts)
- [https://github.com/cfour-hi/gitstars](https://github.com/cfour-hi/gitstars)
- 开源项目刊栏 [https://github.com/521xueweihan/HelloGitHub](https://github.com/521xueweihan/HelloGitHub)
- [https://github.com/LeslieLeung/cat-fish-weekly](https://github.com/LeslieLeung/cat-fish-weekly)
- GitHub趋势 [https://github.com/SolaTyolo/gold_github_trending](https://github.com/SolaTyolo/gold_github_trending)
- [https://github.com/yangwenmai/github-trending-backup](https://github.com/yangwenmai/github-trending-backup)
- [https://github.com/HelloGitHub-Team/Article](https://github.com/HelloGitHub-Team/Article)
- [https://github.com/tophubs](https://github.com/tophubs)
- [https://www.tkcnn.com](https://www.tkcnn.com)
- [https://github.com/VulnTotal-Team/yarb](https://github.com/VulnTotal-Team/yarb)
- [https://github.com/chainreactors/picker](https://github.com/chainreactors/picker)
- 记录GitHub趋势 [https://github.com/xiaobaiha/github-trending-history](https://github.com/xiaobaiha/github-trending-history)
    - [https://github.oldjpg.com](https://github.oldjpg.com)
- [https://github.com/GitHubDaily](https://github.com/GitHubDaily)
- [https://github.com/techgaun/active-forks](https://github.com/techgaun/active-forks)
- [https://giters.com](https://giters.com)
- [https://github.com/knownsec/404StarLink](https://github.com/knownsec/404StarLink)
- 技术周刊 [https://github.com/tw93/weekly](https://github.com/tw93/weekly)
- [https://github.com/ruanyf/weekly](https://github.com/ruanyf/weekly)
    - [https://www.ruanyifeng.com/blog/archives.html](https://www.ruanyifeng.com/blog/archives.html)
- 获取统计信息 [https://github.com/shroudedcode/devstats](https://github.com/shroudedcode/devstats)
- [https://github.com/dahezhiquan/Github-personal-homepage](https://github.com/dahezhiquan/Github-personal-homepage)
- 获取动态生成的GitHub统计信息 [https://github.com/anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- [https://github.com/muety/wakapi](https://github.com/muety/wakapi)
- 获取访问统计 http://profile-counter.glitch.me/用户名/count.svg
- 历史Star数 https://starchart.cc/用户名/My-Actions.svg
- [https://github.com/star-history/star-history](https://github.com/star-history/star-history)
- [你在 GitHub 上看到过的最有意思的项目是什么？ - 知乎](https://www.zhihu.com/question/23498424)




### 访问速度过慢

> 可以使用`git config --global url."github.com".insteadOf hub.fastgit.org`来替换url

* [https://github.com/ilanyu](https://github.com/ilanyu)
* [https://gitee.com/docmirror/dev-sidecar](https://gitee.com/docmirror/dev-sidecar)
    * [https://github.com/docmirror/dev-sidecar](https://github.com/docmirror/dev-sidecar)
* [https://github.com/FastGitORG](https://github.com/FastGitORG)
    * [https://toolwa.com/github](https://toolwa.com/github)
    * [https://github.ur1.fun](https://github.ur1.fun)
* [https://github.com/dotnetcore/FastGithub](https://github.com/dotnetcore/FastGithub)
* [https://github.com/hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
    * [https://gh.api.99988866.xyz](https://gh.api.99988866.xyz)
    * [https://gh.ddlc.top](https://gh.ddlc.top)
    * [https://ghps.cc](https://ghps.cc)
* [https://github.com/git-cloner](https://github.com/git-cloner)
    * [https://gitclone.com](https://gitclone.com) 中国浙江
* [https://github.com/BaseMax/GitHubMirror](https://github.com/BaseMax/GitHubMirror)
* [https://github.com/RC1844/FastGithub](https://github.com/RC1844/FastGithub)
* [https://githubfast.com](https://githubfast.com)
* [https://github.com/7ednet/yard](https://github.com/7ednet/yard)
    * [https://www.7ed.net/gitmirror/hub.html](https://www.7ed.net/gitmirror/hub.html)
    * [https://gitmirror.com](https://gitmirror.com)
    * [https://gh.con.sh](https://gh.con.sh)
* [https://github.com/521xueweihan/GitHub520](https://github.com/521xueweihan/GitHub520)


- [https://greasyfork.org/zh-CN/scripts/412245](https://greasyfork.org/zh-CN/scripts/412245)
- [https://github.com/fhefh2015/Fast-GitHub](https://github.com/fhefh2015/Fast-GitHub)
- [https://github.com/maxiaof/github-hosts](https://github.com/maxiaof/github-hosts)
- [https://github.com/Potterli20/hosts](https://github.com/Potterli20/hosts)
- [https://codechina.csdn.net/mirrors](https://codechina.csdn.net/mirrors)
- [https://fcp7.com/github-mirror-daily-updates.html](https://fcp7.com/github-mirror-daily-updates.html)
- [https://github.com/jvxiao/speed-github](https://github.com/jvxiao/speed-github)


**Raw 文件加速**

* [https://cdn.jsdelivr.net](https://cdn.jsdelivr.net) 中国国内
    * [https://cdn.jsdelivr.net/gh](https://cdn.jsdelivr.net/gh)
* [https://cdn.staticaly.com](https://cdn.staticaly.com) 日本东京


**刷新DNS缓存**

```bash
# macOS
killall -HUP mDNSResponder
dscacheutil -flushcache
# Windows
ipconfig /flushdns
# Linux
service nscd restart
# Ubuntu
sudo /etc/init.d/dns-clean start
```





### Actions

* [GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
* [Github Actions 尝鲜](https://segmentfault.com/a/1190000020873860)
* [持续集成](https://blog.lucien.ink/category/ci)


> 生成公钥和私钥`ssh-keygen -t rsa -b 4096 -C "yourname@example.com" -f 文件名称 -N ""`（ACTION_DEPLOY_KEY），
> 或者生成新的个人访问令牌（PERSONAL_TOKEN）[https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)

+ [https://github.com/actions](https://github.com/actions)
    + 检出项目 [https://github.com/actions/checkout](https://github.com/actions/checkout)
    + [https://github.com/aws-actions](https://github.com/aws-actions)
+ [https://github.com/topics/github-pages](https://github.com/topics/github-pages)
+ [https://github.com/topics/gh-pages](https://github.com/topics/gh-pages)
+ [https://github.com/topics/deploy](https://github.com/topics/deploy)
+ [https://github.com/topics/deployment](https://github.com/topics/deployment)
+ [https://github.com/topics/github-actions](https://github.com/topics/github-actions)
+ [https://github.com/topics/github-action](https://github.com/topics/github-action)
+ [https://github.com/sdras/awesome-actions](https://github.com/sdras/awesome-actions)
+ [https://github.com/topics/workflow](https://github.com/topics/workflow)

* `deploy-to-github-pages`、`pages`、`deploy`
* [https://github.com/peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
* [https://github.com/JamesIves/github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)
* `upload release`
* [https://github.com/wangyoucao577/go-release-action](https://github.com/wangyoucao577/go-release-action)
* [https://github.com/elgohr/Publish-Docker-Github-Action](https://github.com/elgohr/Publish-Docker-Github-Action)
* [https://github.com/release-drafter/release-drafter](https://github.com/release-drafter/release-drafter)
* [https://github.com/xresloader/upload-to-github-release](https://github.com/xresloader/upload-to-github-release)
* [https://github.com/svenstaro/upload-release-action](https://github.com/svenstaro/upload-release-action)




## GitWebHook

- 手动部署: Vue项目完成后,执行`npm run build`,然后将生成的dist目录下的文件放到web目录下

**WebHooks自动化部署,流程如下:**

- 配置`Gitea`的`WebHook`通知(也可以用`码云`、`Github`、`GitLab`、`gogs`,带`WebHook`功能就行)
- 当我们`push`到仓库时,`Gitea`会主动发送一个通知到我们的服务器,然后服务器接到通知执行我们部署的脚本,开始自动化构建。


* [https://github.com/bajins/webhook-go](https://github.com/bajins/webhook-go)
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




