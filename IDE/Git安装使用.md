# Git安装使用


[[toc]]



## Flag

+ [https://github.com/topics/git](https://github.com/topics/git)

* [https://github.com/git](https://github.com/git)
  * [https://git-scm.com](https://git-scm.com)
* 对大型文件进行版本控制 [https://github.com/git-lfs](https://github.com/git-lfs)
  * [https://git-lfs.github.com](https://git-lfs.github.com)
* [https://www.syntevo.com](https://www.syntevo.com)
* [https://github.com/github/gitignore](https://github.com/github/gitignore)
* [为您的项目创建有用的.gitignore文件](https://github.com/toptal/gitignore.io)
* [reposurgeon是一种工具,用于编辑版本控制存储库的历史](http://www.catb.org/esr/reposurgeon)
* [https://github.com/gitextensions/gitextensions](https://github.com/gitextensions/gitextensions)

+ [常用命令 · git笔记 · 看云](https://www.kancloud.cn/leviio/git/330946)
+ [Git 常用命令及使用详解 - 喵斯基部落](https://www.moewah.com/archives/2292.html)
+ Pro Git 中文版（第二版）: [https://progit.bootcss.com](https://progit.bootcss.com)
+ Git速查手册: [https://www.rumosky.wiki/docs/learngit](https://www.rumosky.wiki/docs/learngit)
+ Git的奇技淫巧: [https://github.com/521xueweihan/git-tips](https://github.com/521xueweihan/git-tips)
+ 猴子都能懂的GIT入门: [https://backlog.com/git-tutorial/cn/contents](https://backlog.com/git-tutorial/cn/contents)
+ [Git与Subversion的命令对比表](https://website-proxy.backlogtool.com/git-tutorial/cn/reference/git-svn.html)

- [git-pull.bat](/files/git-pull.bat)
- [git-pull.sh](/files/git-pull.sh)


**[Commit提交规范](/Other/技术概念规范.md#commit提交规范)**


## 安装最新版

* [https://git-scm.com/download](https://git-scm.com/download)
* [https://npm.taobao.org/mirrors/git-for-windows](https://npm.taobao.org/mirrors/git-for-windows)
* [https://packages.endpoint.com/rhel/7/os/x86_64/git-2.24.1-1.ep7.x86_64.rpm](https://packages.endpoint.com/rhel/7/os/x86_64/git-2.24.1-1.ep7.x86_64.rpm)
* [https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm](https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm)

- 方式一

```bash
yum install -y http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
# 或者
wget http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
rpm -ivh wandisco-git-release-7-2.noarch.rpm
```

- [https://github.com/iusrepo](https://github.com/iusrepo)

```bash
curl https://setup.ius.io | sh
# 或者
yum install -y epel-release  
rpm -ivh https://centos7.iuscommunity.org/ius-release.rpm
# 查看git包版本
yum list git2u
# 安装
yum -y install git2u
```


## 使用命令

> `--global`代表全局，保存的配置在用户目录中，Windows在cmd中输入命令查看：`type %USERPROFILE%\.gitconfig`

### 保存用户密码

```bash
git config --global --edit
# 设置项目个人邮箱
git config --global user.email "your email"
# 设置项目个人用户名
git config --global user.name  "your username"
# 永久保存凭证
git config --global credential.helper store
```

> 在`~/.gitconfig`中会自动在`[credential]`节点下添加`helper = store`

> 保存的账户密码在`~/.git-credentials`中



### 代理

> `git config --global https.sslverify false` 不验证SSL

**设置代理**

- 使用命令设置

```bash
# socks5代理，如果是http则把socks5替换为http，https同理
git config --global http.proxy 'socks5://127.0.0.1:10808'
git config --global https.proxy 'socks5://127.0.0.1:10808'
```

- 编辑配置文件设置

```bash
vi ~/.gitconfig
```

> 在文件末尾添加

```ini
[http]
proxy = socks5://127.0.0.1:10808

[https]
proxy = socks5://127.0.0.1:10808
```

**取消代理**

- 命令

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

- 编辑配置文件取消代理，直接删除文件即可



### 把空文件夹提交到仓库

> 这个只能说是技巧不能说是方法，原理是在每个空文件夹新建一个.gitignore文件

```bash
find . -type d -empty -exec touch {}/.gitignore \;
```

### 项目远程地址管理

> 见`项目目录/.git/config`中的`remote`节点，`origin`为默认远程节点名，可以自定义

- 查看当前的远程地址

```bash
git remote -v
```

- 删除`origin`节点的远程地址

```bash
git remote rm origin
# 或者
git remote remove origin
```

- 为`origin`节点添加远程地址

```bash
git remote add origin 远程地址
```

- 修改`origin`节点远程地址

```bash
git remote set-url origin 远程地址
```

- 为`origin`节点增加一个远程地址

> 可同时拉取或推送到多个远程地址

```bash
git remote set-url --add origin 远程地址
```

- 把当前分支与`origin`节点远程分支进行关联

```bash
git push --set-upstream origin 分支名称
```


### 更改提交

> 如果commit注释写错了，只是想改一下注释

```bash
# 查看提交文件，里面包含注释和变更内容
git commit --amend
# 按v进入编辑模式，更改完成后按esc然后输入:qw! 保存
```

- 撤销提交

```bash
# --mixed 默认参数，不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
# --soft 不删除工作空间改动代码，撤销commit，不撤销git add . 
# --hard 删除工作空间改动代码，撤销commit，撤销git add . 
# HEAD^的代表上一个版本，同HEAD~1(或HEAD@{1})，撤销2次commit，使用HEAD~2(或HEAD@{2})，以此类推
git reset HEAD^
```


### 强制push本地仓库到远程

> 这种情况不会进行merge, 强制push后远程文件可能会丢失,不建议使用此方法

```bash
# 将本地仓库文件push到远程仓库（-f代表强制 --force）
git push -u -f origin master
```

### 重置本地修改文件

> 如果有任何本地更改，将会丢失。无论是否有--hard选项，任何未被推送的本地提交都将丢失。
> 如果您有任何未被Git跟踪的文件(例如上传的用户内容)，这些文件将不会受到影响。

- 在重置之前可以通过从master创建一个分支来维护当前的本地提交

> 在此之后，所有旧的提交都将保存在新的分支中。然而，没有提交的更改(即使staged)将会丢失。确保存储和提交任何你需要的东西。

- 执行重置

```bash
# 从远程下载最新的，而不尝试合并或rebase任何东西
git fetch --all
# reset将主分支重置为本地commit的最新版本
# --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
git reset --hard origin/<branch_name>
# 拉取远端最新代码
git pull
```


### 清除用户名密码

```bash
git config --system --unset credential.helper
```

### git恢复指定文件到指定版本

- 查看commit历史，并复制需要回退版本的hash

```bash
# 或者git reflog show
git log 文件名
```

- 恢复

```bash
git checkout 复制的hash值 文件名
```

- 删除包括历史

```bash
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch src/main/java/com/bajins/demo/xxx.java" \
  --prune-empty --tag-name-filter cat -- --all
```


### 统计

- 查看git上的个人代码量

```bash
git log --author="用户名" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END \
  { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```

- 统计每个人增删行数

```bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" \
  --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, \
  removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```

```bash
# 查看仓库提交者排名前五
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
# 贡献值统计
git log --pretty='%aN' | sort -u | wc -l
# 提交数统计
git log --oneline | wc -l
# 添加或修改的代码行数
git log --stat|perl -ne 'END { print $c } $c += $1 if /(\d+) insertions/'
# 比较远端和本地分支
git diff master origin/master
```

- 统计文件的改动

```bash
git diff --stat master origin/master
# 执行一次git fetch origin xxx，那当下最新版本的commit会存在FETCH_HEAD中
git diff HEAD FETCH_HEAD

git pull --dry-run | grep -q -v 'Already up-to-date.' && changed=1
git log HEAD...origin/master --oneline
git log -p master..origin/master
```

- 本地与远程的差集

> 显示远程有而本地没有的`commit`信息

```bash
git log master..origin/master
```


### 分支

- 查看本地分支`git branch`
- 查看远程分支`git branch -r`
- 查看所有分支`git branch -a`
- 本地创建新的分支`git branch [branch name]`
- 切换到新的分支`git checkout [branch name]`
- 创建+切换分支`git checkout -b [branch name]`
- 推送到指定分支`git push origin [branch name]`
- 删除本地分支`git branch -d [branch name]`
- 删除远程分支,分支名前的冒号代表删除`git push origin :[branch name]`



## SubModule与SubTree

* [Git - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

- submodule只存在引用，代码Pull和Push都只能和 被依赖的项目关联。类似于引用
- subtree直接克隆被依赖项目，代码Pull和Push根据需要和主项目或被依赖项目关联。类似于拷贝


| /                	| submodule                                                                                  	| subtree                          	| 结果                               	|
|------------------	|--------------------------------------------------------------------------------------------	|----------------------------------	|------------------------------------	|
| 远程仓库空间占用 	| submodule只是引用，基本不占用额外空间                                                      	| 子模块copy，会占用较大的额外空间 	| submodule占用空间较小，略优        	|
| 本地空间占用     	| 可根据需要下载                                                                             	| 会下载整个项目                   	| 所有模块基本都要下载，二者差异不大 	|
| 仓库克隆         	| 克降后所有子模块为空，需要注册及更新，同时更新后还需切换分支                               	| 克隆之后即可使用                 	| submodule步骤略多，subtree占优     	|
| 更新本地仓库     	| 更新后所有子模块后指向最后一次提交，更新后需要重新切回分支，所有子模块只需一条更新语句即可 	| 所有子模块需要单独更新           	| 各有优劣，相对subtree更好用一些    	|
| 提交本地修改     	| 只需关心子模块即可，子模块的所有操作与普通git项目相同                                      	| 提交执行命令相对复杂一些         	| submodule操作更简单，submodule占优 	|





## 常见问题处理

* [git中fatal: Authentication failed的问题](https://blog.csdn.net/qq_34665539/article/details/80408282)


### 项目过大clone报错

* [Git index-pack failed 问题解决](https://vnzmi.com/2017/01/08/git-early-eof-index-pack-failed)

- 由于提交了比较大的文件，在服务端一直无法拉下来，错误如下

```diff
Cloning into 'E:\soft'...
POST git-upload-pack (175 bytes)
remote: Enumerating objects: 6, done.
remote: Counting objects: 100% (6/6), done.
remote: Compressing objects: 100% (6/6), done.
fatal: early EOF
fatal: the remote end hung up unexpectedly
fatal: index-pack failed
```

- 执行命令

```bash
# 修改压缩的程度
git config --global core.compression 0

# 解决内存不够问题
git config --global pack.deltaCacheSize 2047m
git config --global pack.packSizeLimit 2047m
git config --global pack.windowMemory 2047m
git config --global core.packedGitWindowSize 512m
git config --global core.packedGitLimit 512m

# 调整缓存大小（单位为字节）为1G
git config --global http.postBuffer 1073741824

# 最低速度限制
git config --global http.lowSpeedLimit 0
# 最低速度时间
git config --global http.lowSpeedTime 999999
```

> compression 是压缩的意思，从 clone 的终端输出就知道，服务器会压缩目标文件，然后传输到客户端，客户端再解压。
> 取值为 [-1, 9]，-1 以 zlib 为默认压缩库，0 表示不进行压缩，1..9 是压缩速度与最终获得文件大小的不同程度的权衡，
> 数字越大，压缩越慢，当然得到的文件会越小。

### 提交本地文件失败

> 在github远程创建仓库后, 利用gitbash进行提交本地文件的时候出现如下错误

```diff
[root@foundation38 demo]# git push -u origin master
Username for 'https://github.com': woytu
Password for 'https://woytu@github.com': 
To https://github.com/woytu/test.git
 ! [rejected]        master -> master (non-fast-forward)
error: failed to push some refs to 'https://github.com/woytu/test.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

- 第一种：进行push前先将远程仓库pull到本地仓库

```bash
# git pull --rebase origin master
git pull origin master
git push -u origin master

```

- 第二种：强制push本地仓库到远程

```bash
git push -u origin master -f
```

- 第三种：避开解决冲突, 将本地文件暂时提交到远程新建的分支中

```bash
git branch [name]
# 创建完branch后, 再进行push
git push -u origin [name] 
```

### 远端与本地代码冲突

- 先将本地修改存储起来

```bash
# 暂存修改,这样本地的所有修改就都被暂时存储起来
git stash
# 看到保存的信息,其中stash@{0}就是刚才保存的标记。
git stash list
```

- 暂存了本地修改之后，pull内容

- 还原暂存的内容

```bash
git stash popstash@{0}
```

- 系统提示如下类似的信息

```diff
Auto-mergingc/environ.c
CONFLICT(content): Merge conflict in c/environ.c
```

> 意思就是系统自动合并修改的内容，但是其中有冲突，需要解决其中的冲突。

- 解决文件中冲突的的部分

> 打开冲突的文件，其中`Updatedupstream` 和`=====`之间的内容就是pull下来的内容，`====`和`stashed changes`之间的
> 内容就是本地修改的内容。碰到这种情况，git也不知道哪行内容是需要的，所以要自行确定需要的内容。


### SSL验证错误

> 报错 `unable to access 'https://github.com/': OpenSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443`

- 关闭SSL验证

```bash
env GIT_SSL_NO_VERIFY=true
# 或者
git config --global http.sslVerify false
```

- 去掉代理

```bash
git config --global --unset http.proxy
```


