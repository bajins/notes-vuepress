# Git服务

[[toc]]


## Flag

+ [https://github.com/semantic-release](https://github.com/semantic-release)


* 忽略提交 [https://github.com/github/gitignore](https://github.com/github/gitignore)
* [https://github.com/toptal/gitignore.io](https://github.com/toptal/gitignore.io)
* 编辑版本控制存储库的历史 [http://www.catb.org/esr/reposurgeon](http://www.catb.org/esr/reposurgeon)
* GUI [https://github.com/git-cola/git-cola](https://github.com/git-cola/git-cola)
* [https://github.com/gitextensions/gitextensions](https://github.com/gitextensions/gitextensions)
* [https://github.com/TortoiseGit](https://github.com/TortoiseGit)
    * [https://gitlab.com/tortoisegit/tortoisegit](https://gitlab.com/tortoisegit/tortoisegit)
    * [https://tortoisegit.org/download](https://tortoisegit.org/download)
* [https://www.syntevo.com](https://www.syntevo.com)
* [https://www.git-tower.com](https://www.git-tower.com)
* 代码语法突出 [https://github.com/sharkdp/bat](https://github.com/sharkdp/bat)
* Git核心方法的可移植的纯C实现 [https://github.com/libgit2/libgit2](https://github.com/libgit2/libgit2)
* 来自配置错误的网站的Git仓库泄漏 [https://github.com/liamg/gitjacker](https://github.com/liamg/gitjacker)
* git加密 [https://github.com/AGWA/git-crypt](https://github.com/AGWA/git-crypt)
* 自动补全 [https://github.com/dahlbyk/posh-git](https://github.com/dahlbyk/posh-git)
* [https://github.com/JanDeDobbeleer/oh-my-posh](https://github.com/JanDeDobbeleer/oh-my-posh)
* 依赖项更新 [https://github.com/renovatebot/renovate](https://github.com/renovatebot/renovate)
* Git工具 [https://github.com/GitTools](https://github.com/GitTools)
* [https://github.com/sosedoff/gitkit](https://github.com/sosedoff/gitkit)
* SmartGit 是一款优秀的图形化Git仓库管理工具
* SmartSVN 是一款优秀的图形化SVN仓库管理工具
* 根据日志生成Changelog [https://github.com/orhun/git-cliff](https://github.com/orhun/git-cliff)
* Java实现 [https://github.com/eclipse/jgit](https://github.com/eclipse/jgit)
    * [https://github.com/centic9/jgit-cookbook](https://github.com/centic9/jgit-cookbook)
* [https://github.com/gitblit/gitblit](https://github.com/gitblit/gitblit)
* [https://github.com/scm-manager/scm-manager](https://github.com/scm-manager/scm-manager)
*  [https://github.com/projectkudu/kudu](https://github.com/projectkudu/kudu)




**其他版本控制服务**

* [https://codeberg.org](https://codeberg.org)
* [https://git.pleroma.social](https://git.pleroma.social)
* [https://code.aliyun.com](https://code.aliyun.com)
* [https://coding.net](https://coding.net)
* [https://git.code.tencent.com](https://git.code.tencent.com)
* [https://pagure.io](https://pagure.io)
* [https://framagit.org](https://framagit.org)
* [https://git.hit.edu.cn](https://git.hit.edu.cn)
* [https://www.gitlink.org.cn](https://www.gitlink.org.cn)
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


* [https://gitlab.com/xhang/gitlab/wikis/home](https://gitlab.com/xhang/gitlab/wikis/home)
* [GitLab Community Edition (中文社区版)](https://github.com/twang2218/gitlab-ce-zh)
    * [汉化的 GitLab 社区版 Docker Image](https://hub.docker.com/r/twang2218/gitlab-ce-zh)
* [https://hub.docker.com/r/bensonfx/gitlab-ce-zh](https://hub.docker.com/r/bensonfx/gitlab-ce-zh)
* [https://github.com/bensonfx/codeserver](https://github.com/bensonfx/codeserver)
* [https://hub.docker.com/r/benyoo/gitlab](https://hub.docker.com/r/benyoo/gitlab)
* [https://hub.docker.com/r/imleafz/gitlab-ce-zh](https://hub.docker.com/r/imleafz/gitlab-ce-zh)
* [https://crowdin.com/project/gitlab-ee](https://crowdin.com/project/gitlab-ee)
* clone所有项目 [https://github.com/huchao1009/gitlab-projects-clone](https://github.com/huchao1009/gitlab-projects-clone)
* [https://git.openldap.org](https://git.openldap.org)
* [https://gitlab.com/gitlab-org/gitlab-runner](https://gitlab.com/gitlab-org/gitlab-runner)



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

* GitHub漫游指南 [https://github.com/phodal/github](https://github.com/phodal/github)
* 首次贡献 [https://github.com/firstcontributions/first-contributions](https://github.com/firstcontributions/first-contributions)
* [https://github.com/all-contributors/all-contributors](https://github.com/all-contributors/all-contributors)
* [https://github.com/probot/probot](https://github.com/probot/probot)
* [https://help.github.com/cn](https://help.github.com/cn)
* 发布成功之后`github pages`的`Custom domain`配置项就被清空：[github-pages-basics](http://wiki.jikexueyuan.com/project/github-pages-basics/cname-file.html)
* [https://codecov.io](https://codecov.io)
* [目录 - P3TERX ZONE](https://p3terx.com/archives.html)
* [https://github.com/tiimgreen/github-cheat-sheet](https://github.com/tiimgreen/github-cheat-sheet)

- [https://github.com/zenodo/zenodo](https://github.com/zenodo/zenodo)
- 手动同步fork [https://blog.blueskyclouds.com/jsfx/58.html](https://blog.blueskyclouds.com/jsfx/58.html)
- [https://github.com/wei/git-sync](https://github.com/wei/git-sync)
- [https://github.com/repo-sync](https://github.com/repo-sync)
- 自动同步fork [https://github.com/wei/pull](https://github.com/wei/pull)
    - [https://github.com/apps/pull](https://github.com/apps/pull)
    - [https://github.com/BlueskyClouds/My-Actions/blob/master/backUp/gitSync.md](https://github.com/BlueskyClouds/My-Actions/blob/master/backUp/gitSync.md)
- GitHub的Java API [https://github.com/hub4j/github-api](https://github.com/hub4j/github-api)
- 项目管理 [https://www.zenhub.com](https://www.zenhub.com)



**统计**


- GH存档 [https://www.gharchive.org](https://www.gharchive.org)
- [https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts](https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts)
- GitHub每周趋势 [https://github.com/SolaTyolo/gold_github_trending](https://github.com/SolaTyolo/gold_github_trending)
- GitHub每天趋势 [https://github.com/yangwenmai/github-trending-backup](https://github.com/yangwenmai/github-trending-backup)
- [https://github.com/HelloGitHub-Team/Article](https://github.com/HelloGitHub-Team/Article)
- [https://github.com/tophubs](https://github.com/tophubs)
- 记录GitHub趋势 [https://github.com/xiaobaiha/github-trending-history](https://github.com/xiaobaiha/github-trending-history)
    - [https://github.oldjpg.com](https://github.oldjpg.com)
- [https://github.com/GitHubDaily](https://github.com/GitHubDaily)
- [https://github.com/techgaun/active-forks](https://github.com/techgaun/active-forks)
- [https://giters.com](https://giters.com)
- 获取统计信息 [https://github.com/shroudedcode/devstats](https://github.com/shroudedcode/devstats)
- 获取动态生成的GitHub统计信息 [https://github.com/anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- 获取访问统计 http://profile-counter.glitch.me/用户名/count.svg
- 历史Star数 https://starchart.cc/用户名/My-Actions.svg
- [你在 GitHub 上看到过的最有意思的项目是什么？ - 知乎](https://www.zhihu.com/question/23498424)




### 访问速度过慢

> 可以使用`git config --global url."github.com".insteadOf hub.fastgit.org`来替换url

* php源码 [https://github.com/ilanyu/offline-download](https://github.com/ilanyu/offline-download)
* go源码 [https://github.com/ilanyu/offLineDownloader](https://github.com/ilanyu/offLineDownloader)
* [https://github.com/churuxu/xdownload](https://github.com/churuxu/xdownload)
* [https://github.com/fhefh2015/Fast-GitHub](https://github.com/fhefh2015/Fast-GitHub)
* [https://myssl.com/dns_check.html](https://myssl.com/dns_check.html)
* [http://tool.chinaz.com/dns](http://tool.chinaz.com/dns)
* [https://www.ipaddress.com](https://www.ipaddress.com)
* [https://greasyfork.org/zh-CN/scripts/412245](https://greasyfork.org/zh-CN/scripts/412245)
* [https://trli.coding.net/public](https://trli.coding.net/public)
* [https://github.com/Potterli20/hosts](https://github.com/Potterli20/hosts)


- [https://gitee.com/organizations/mirrors_trending/projects](https://gitee.com/organizations/mirrors_trending/projects)
- [https://gitee.com/docmirror/dev-sidecar](https://gitee.com/docmirror/dev-sidecar)
    - [https://github.com/docmirror/dev-sidecar](https://github.com/docmirror/dev-sidecar)


* [https://codechina.csdn.net/mirrors](https://codechina.csdn.net/mirrors)
* [https://gitee.com/mirrors](https://gitee.com/mirrors)
* [https://github.com/FastGitORG](https://github.com/FastGitORG)
    * [https://hub.fastgit.org](https://hub.fastgit.org) 中国香港
    * [https://toolwa.com/github](https://toolwa.com/github)
* [https://github.com/dotnetcore/FastGithub](https://github.com/dotnetcore/FastGithub)
* [https://github.com/hunshcn/gh-proxy](https://github.com/hunshcn/gh-proxy)
    * [https://ghproxy.com](https://ghproxy.com) 韩国首尔
    * [http://git.aakkc.com](http://git.aakkc.com)
    * [https://gh.api.99988866.xyz](https://gh.api.99988866.xyz) 美国
    * [https://shrill-pond-3e81.hunsh.workers.dev](https://shrill-pond-3e81.hunsh.workers.dev)
    * [https://github.91chifun.workers.dev](https://github.91chifun.workers.dev)
* [https://d.serctl.com](https://d.serctl.com)
* [https://github.xxyyzz.workers.dev](https://github.xxyyzz.workers.dev)
* [https://gh.msx.workers.dev](https://gh.msx.workers.dev) 美国
* [https://gh.xiu2.xyz](https://gh.xiu2.xyz) 美国（自建
* [https://gh.argv.cc](https://gh.argv.cc) 美国
* [https://git.yumenaka.net](https://git.yumenaka.net) 美国
* [https://download.fastgit.org](https://download.fastgit.org) 日本
* [https://gitclone.com	中国浙江](https://gitclone.com) 中国浙江
* [https://github.com.cnpmjs.org](https://github.com.cnpmjs.org) 新加坡


**Git Clone SSH 加速**

* `git@git.zhlh6.cn` 中国北京
* `git@hub.fastgit.org` 中国香港


**Raw 文件加速**

* [https://cdn.jsdelivr.net](https://cdn.jsdelivr.net) 中国国内
* [https://raw.fastgit.org](https://raw.fastgit.org) 中国香港
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

+ [https://github.com/actions](https://github.com/actions)
    + 检出项目 [https://github.com/actions/checkout](https://github.com/actions/checkout)
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




