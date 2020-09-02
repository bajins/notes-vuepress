# Git服务


[[toc]]



## Flag

+ [https://github.com/jenkinsci](https://github.com/jenkinsci)
+ [https://github.com/semantic-release](https://github.com/semantic-release)

* [https://github.com/gitblit/gitblit](https://github.com/gitblit/gitblit)


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


```bash
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