(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{308:function(t,s,a){"use strict";a.r(s);var e=a(3),r=Object(e.a)({},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"docker目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker目录","aria-hidden":"true"}},[t._v("#")]),t._v(" Docker目录")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#Git"}},[t._v("Git")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#GitLab"}},[t._v("GitLab")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#Gogs"}},[t._v("Gogs")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#Gitea"}},[t._v("Gitea")])])])]),t._v(" "),a("li",[a("a",{attrs:{href:"#ReadtheDocs"}},[t._v("Read the Docs")])])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"docker官网centos7安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker官网centos7安装","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://docs.docker.com/install/linux/docker-ce/centos/",target:"_blank",rel:"noopener noreferrer"}},[t._v("docker官网centos7安装"),a("OutboundLink")],1)]),t._v(" "),a("h1",{attrs:{id:"git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git","aria-hidden":"true"}},[t._v("#")]),t._v(" Git")]),t._v(" "),a("h2",{attrs:{id:"gitlab"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab","aria-hidden":"true"}},[t._v("#")]),t._v(" GitLab")]),t._v(" "),a("p",[t._v("https://hub.docker.com/r/bensonfx/gitlab-ce-zh")]),t._v(" "),a("p",[t._v("https://github.com/bensonfx/codeserver")]),t._v(" "),a("p",[t._v("https://hub.docker.com/r/benyoo/gitlab")]),t._v(" "),a("p",[t._v("https://hub.docker.com/r/imleafz/gitlab-ce-zh")]),t._v(" "),a("p",[t._v("https://gitlab.com/xhang/gitlab/uploads/23e8414e53eefde0968e960b24a6f631/"),a("em",[t._v("%E5%8E%9F%E5%88%9B_Gitlab10.8.0%E5%88%86%E6%94%AF%E6%B1%89%E5%8C%96_Omnibus%E7%89%88")]),t._v(".png")]),t._v(" "),a("h4",{attrs:{id:"gitlab-community-edition-中文社区版"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitlab-community-edition-中文社区版","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://github.com/twang2218/gitlab-ce-zh",target:"_blank",rel:"noopener noreferrer"}},[t._v("GitLab Community Edition (中文社区版)"),a("OutboundLink")],1)]),t._v(" "),a("h4",{attrs:{id:"汉化的-gitlab-社区版-docker-image"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#汉化的-gitlab-社区版-docker-image","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://hub.docker.com/r/twang2218/gitlab-ce-zh",target:"_blank",rel:"noopener noreferrer"}},[t._v("汉化的 GitLab 社区版 Docker Image "),a("OutboundLink")],1)]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("version: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2'")]),t._v("\nservices:\n    gitlab:\n      image: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'twang2218/gitlab-ce-zh:11.1.4'")]),t._v("\n      restart: unless-stopped\n      hostname: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'git.woetu.com'")]),t._v("\n      environment:\n        TZ: "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Asia/Shanghai'")]),t._v("\n        GITLAB_OMNIBUS_CONFIG: "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("\n          external_url "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://git.woetu.com'")]),t._v("\n          gitlab_rails"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'time_zone'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Asia/Shanghai'")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 需要配置到 gitlab.rb 中的配置可以在这里配置，每个配置一行，注意缩进。")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 比如下面的电子邮件的配置：")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_enable'] = true")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_address'] = \"smtp.exmail.qq.com\"")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_port'] = 465")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_user_name'] = \"xxxx@xx.com\"")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_password'] = \"password\"")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_authentication'] = \"login\"")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_enable_starttls_auto'] = true")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['smtp_tls'] = true")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# gitlab_rails['gitlab_email_from'] = 'xxxx@xx.com'")]),t._v("\n      ports:\n        - "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'8099:80'")]),t._v("\n        - "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'442:443'")]),t._v("\n        - "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'22:22'")]),t._v("\n      volumes:\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# - /home/gitlab/config:/home/gitlab/config")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# - /home/gitlab/data:/home/gitlab/data")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# - /home/gitlab/logs:/home/gitlab/logs")]),t._v("\n        - config:/etc/gitlab\n        - data:/var/opt/gitlab\n        - logs:/var/log/gitlab\nvolumes:\n    config:\n    data:\n    logs:\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br")])]),a("h1",{attrs:{id:"docker-compose-yml基本介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#docker-compose-yml基本介绍","aria-hidden":"true"}},[t._v("#")]),t._v(" docker-compose.yml基本介绍")]),t._v(" "),a("p",[t._v("http://ju.outofmemory.cn/entry/287017")]),t._v(" "),a("blockquote",[a("p",[t._v("Compose 文件是一个 YAML , 主要定义了 services , networks 和 volumes ， 其默认路径是 ./docker-compose.yml 。")])]),t._v(" "),a("blockquote",[a("p",[t._v("service 定义包含了应用与每个容器的配置，很像给 docker run 传参，同样， network 和 volume 对于 docker network create 和 docker volume create 也类似。")])]),t._v(" "),a("blockquote",[a("p",[t._v("像在 Dockerfile (eg: CMD , EXPOSE , VOLUME , ENV )可以使用的选项也可以在 docker run 参数中使用， 这样在 docker-compose.yml 里就不需要再次指定了。")])]),t._v(" "),a("blockquote",[a("p",[t._v("docker-compose.yml 里可以使用环境变量，类似 Bash 格式 ${VARIABLE}")])]),t._v(" "),a("blockquote",[a("p",[t._v("composer 文件格式有两种版本：")])]),t._v(" "),a("blockquote",[a("blockquote",[a("p",[t._v("version 1: 已经废弃， 不支持volumes 和 networks，默认 version key 是省略的。")])])]),t._v(" "),a("blockquote",[a("blockquote",[a("p",[t._v("version 2: 推荐的格式，目前是最新的，需要通过 version '2' 指定。")])])]),t._v(" "),a("h3",{attrs:{id:"ports"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ports","aria-hidden":"true"}},[t._v("#")]),t._v(" ports")]),t._v(" "),a("blockquote",[a("p",[t._v("暴露端口。既可以是 HOST:CONTAINER ，也可以只用容器端口(host端口会随机选取)。\n当以 HOST:CONTAINER 的形式映射端口的时候，当容器的端口低于60的时候可能会遇到错误，因为YAML会解析 xx:yy 数字为60。 基于这个原因，我们推荐明确指定端口映射用字符串的形式。")])]),t._v(" "),a("blockquote",[a("p",[t._v("volumes")]),t._v(" "),a("blockquote",[a("p",[t._v("挂载指定的路径或者named volumes, 可以在主机上指定一个路径 HOST:CONTAINER , 或者一个可访问的 HOST:CONTAINER:ro 。")])])]),t._v(" "),a("h2",{attrs:{id:"gogs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gogs","aria-hidden":"true"}},[t._v("#")]),t._v(" Gogs")]),t._v(" "),a("p",[t._v("https://hub.docker.com/r/gogs/gogs")]),t._v(" "),a("p",[t._v("https://github.com/gogs/gogs/blob/master/README_ZH.md")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.moerats.com/archives/561/",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装教程"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/86c385682ac8",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装教程"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"gitea"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitea","aria-hidden":"true"}},[t._v("#")]),t._v(" Gitea")]),t._v(" "),a("p",[t._v("https://hub.docker.com/r/gitea/gitea")]),t._v(" "),a("p",[t._v("https://github.com/go-gitea/gitea/blob/master/README_ZH.md")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.moerats.com/archives/578/",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装教程"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"readthedocs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#readthedocs","aria-hidden":"true"}},[t._v("#")]),t._v(" ReadtheDocs")]),t._v(" "),a("h3",{attrs:{id:"read-the-docs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#read-the-docs","aria-hidden":"true"}},[t._v("#")]),t._v(" "),a("a",{attrs:{href:"https://hub.docker.com/r/readthedocs/build/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Read the Docs"),a("OutboundLink")],1)])])},[],!1,null,null,null);s.default=r.exports}}]);