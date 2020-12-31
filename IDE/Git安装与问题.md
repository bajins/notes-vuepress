# Git安装与问题


[[toc]]



## Flag

+ [https://github.com/topics/git](https://github.com/topics/git)

* [https://github.com/git](https://github.com/git)
  * [https://github.com/git-for-windows](https://github.com/git-for-windows)
  * [https://git-scm.com](https://git-scm.com)
  * [https://gitforwindows.org](https://gitforwindows.org)
* [https://www.syntevo.com](https://www.syntevo.com)
* [https://github.com/github/gitignore](https://github.com/github/gitignore)
* [https://github.com/toptal/gitignore.io](https://github.com/toptal/gitignore.io)
* [reposurgeon是一种工具,用于编辑版本控制存储库的历史](http://www.catb.org/esr/reposurgeon)
* [https://github.com/gitextensions/gitextensions](https://github.com/gitextensions/gitextensions)
* GUI [https://github.com/git-cola/git-cola](https://github.com/git-cola/git-cola)
* [https://github.com/TortoiseGit](https://github.com/TortoiseGit)
    * [https://gitlab.com/tortoisegit/tortoisegit](https://gitlab.com/tortoisegit/tortoisegit)
    * [https://tortoisegit.org/download](https://tortoisegit.org/download)


- Java实现 [https://github.com/eclipse/jgit](https://github.com/eclipse/jgit)
    - [https://github.com/centic9/jgit-cookbook](https://github.com/centic9/jgit-cookbook)




**SVN**

- [https://github.com/topics/subversion](https://github.com/topics/subversion)
- [https://github.com/apache/subversion](https://github.com/apache/subversion)
- [https://zh.osdn.net/projects/tortoisesvn](https://zh.osdn.net/projects/tortoisesvn)
    - [https://tortoisesvn.net/downloads.html](https://tortoisesvn.net/downloads.html)
- [https://www.wandisco.com/source-code-management/subversion](https://www.wandisco.com/source-code-management/subversion)
- [https://www.visualsvn.com/downloads](https://www.visualsvn.com/downloads)
    - [在Windows下使用svn命令行教程及svn命令行的解释](https://blog.csdn.net/yangxiao2shi/article/details/50719286)
- [https://sliksvn.com/pub](https://sliksvn.com/pub)
- [https://github.com/jenkinsci/subversion-plugin](https://github.com/jenkinsci/subversion-plugin)
- [https://github.com/subclipse](https://github.com/subclipse)
    - [http://subversion.apache.org/packages.html](http://subversion.apache.org/packages.html)
    - Subversion for Java [https://svnkit.com](https://svnkit.com)
- Subversion Edge：RESTful API [https://www.collab.net/downloads/subversion](https://www.collab.net/downloads/subversion)
- [http://sharpsvn.open.collab.net](http://sharpsvn.open.collab.net)



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


### push错误

**`The following untracked working tree files would be overwritten by merge/checkout`**

- `git clean -d -fx`
  - `-n` 显示将要删除的文件和目录；
  - `-x` 删除忽略文件已经对git来说不识别的文件
  - `-d` 删除未被添加到git的路径中的文件
  - `-f` 强制运行


**`fatal: refusing to merge unrelated histories`**

- `git pull origin master --allow-unrelated-histories` 可以允许不相关历史提，强制合并