# Git使用


[[toc]]



## Flag

+ [https://github.com/apachecn/git-doc-zh](https://github.com/apachecn/git-doc-zh)
  + [https://git.apachecn.org](https://git.apachecn.org)
+ [常用命令 · git笔记 · 看云](https://www.kancloud.cn/leviio/git/330946)
+ [Git 常用命令及使用详解 - 喵斯基部落](https://www.moewah.com/archives/2292.html)
+ Pro Git 中文版（第二版）: [https://progit.bootcss.com](https://progit.bootcss.com)
+ Git速查手册: [https://www.rumosky.wiki/docs/learngit](https://www.rumosky.wiki/docs/learngit)
+ Git的奇技淫巧: [https://github.com/521xueweihan/git-tips](https://github.com/521xueweihan/git-tips)
+ 猴子都能懂的GIT入门: [https://backlog.com/git-tutorial/cn/contents](https://backlog.com/git-tutorial/cn/contents)
+ [Git与Subversion的命令对比表](https://website-proxy.backlogtool.com/git-tutorial/cn/reference/git-svn.html)

- [git-pull.bat](/files/git-pull.bat)
- [git-pull.sh](/files/git-pull.sh)


**[Commit提交规范](/Other/编程规范.md#commit提交规范)**


> `--global`代表全局，保存的配置在用户目录中，Windows在cmd中输入命令查看：`type %USERPROFILE%\.gitconfig`

- `git clone url --depth 1` 克隆最新一条提交记录
- `git clone url --recursive` 递归克隆
- `git fetch --unshallow` 完整克隆



## 保存用户密码

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



## 代理

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



## 把空文件夹提交到仓库

> 这个只能说是技巧不能说是方法，原理是在每个空文件夹新建一个.gitignore文件

```bash
find . -type d -empty -exec touch {}/.gitignore \;
```

## 项目远程地址管理

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


## 更改提交

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


## 强制push本地仓库到远程

> 这种情况不会进行merge, 强制push后远程文件可能会丢失,不建议使用此方法

```bash
# 将本地仓库文件push到远程仓库（-f代表强制 --force）
git push -u -f origin master
```

## 重置本地修改文件

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


## 清除用户名密码

```bash
git config --system --unset credential.helper
```

## git恢复指定文件到指定版本

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


## 统计

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


## 分支

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


- `git submodule add 链接 路径` 添加子模块，路径建议使用`_`
- `git submodule init` 初始化子模块
- `git submodule update` 下载子模块源码
- `git submodule update --init --recursive` 递归下载子模块的源码，并初始化
- `git submodule foreach 'git checkout -f'` git强制更新所有submodule
- `git pull` 把子模块看作单独的仓库，进入到子模块目录下，更新submodule，拉取后项目有需要提交的更新
- `rm -rf 模块名` 删除子模块目录文件
- `vim .gitmodules` 移除子模块的索引信息
- `vim .git/config` 移除子模块的配置信息
- `rm -rf .git/modules/模块名` 移除子模块的其他信息
- `git rm --cached 模块名` 删除缓存，提示`fatal: pathspec 'xxxxx' did not match any files` 说明删除干净了



## 换行符与大文件处理

* [行尾序列（换行符）](/Shell/README.md#行尾序列)
* [Git处理换行符问题](https://segmentfault.com/a/1190000013973362)
* [为单个仓库或全局配置 Git 处理行结束符](https://docs.github.com/cn/free-pro-team@latest/github/using-git/configuring-git-to-handle-line-endings)

- 当你在签出文件时，将 UNIX 换行符（LF）替换为 Windows 的换行符（CRLF）；
- 当你在提交文件时，将 CRLF 替换为 LF。

> 如果提交的文件是一个 包含中文字符的UTF-8文件，那么这个“换行符自动转换”功能在提交时不是每次都生效，
> 尤其是文件中出现中文字符后有换行符时（但签出时的转换处理没有问题）



**gitattributes**

* 为单个仓库设置 [https://git-scm.com/docs/gitattributes](https://git-scm.com/docs/gitattributes)
* [8.2 自定义 Git - Git 属性](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E5%B1%9E%E6%80%A7)
* [gitattributes](https://git.apachecn.org/#/docs/39)

+ [https://github.com/topics/gitattributes](https://github.com/topics/gitattributes)
  + [https://github.com/gitattributes](https://github.com/gitattributes)
  + [https://github.com/alexkaratarakis/gitattributes](https://github.com/alexkaratarakis/gitattributes)

- `text`
- `-text`
- `text=string`
- `text=auto` 让git自行处理左边匹配的文件使用何种换行符格式，这是默认选项。
- 未声明，通常不出现该属性即可
- `!text` 为了覆盖其他文件中的声明，效果同上
- `binary` 指定为二进制文件，不应该对其中的换行符进行改变。和`-text -diff`等价

```bash
# 生成.gitattributes文件
echo "* text=auto" >.gitattributes
# 重新规范化所有被git管理的文件
git add --renormalize .
# 显示将被规范化的文件
git status
# 提交
git commit -m "Introduce end-of-line normalization"
```


* [https://github.com/editorconfig](https://github.com/editorconfig) `.editorconfig`中设置`end_of_line = lf`
* [https://github.com/axvr/ascribe.vim](https://github.com/axvr/ascribe.vim)



**全局为所有仓库设置**

```bash
# windows 下是 autocrlf

# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

# 推荐，项目中指定了换行，则在任何平台都只用一种换行 \n
# 提交检出均不转换
git config --global core.autocrlf false

# SafeCRLF

# 推荐，拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn

#设置行结束符的类型为lf
git config --global core.eol lf

#设置行结束符的类型为crlf
git config --global core.eol crlf

#设置行结束符的类型为native, native是指平台默认的行结束符。默认的类型是native
git config --global core.eol native


# 该命令表示提交命令的时候使用utf-8编码集提交
git config --global i18n.commitencoding utf-8
# 该命令表示日志输出时使用utf-8编码集显示
git config --global i18n.logoutputencoding utf-8
# 设置LESS字符集为utf-8
export LESSCHARSET=utf-8
```


**Git LFS**

* 对大型文件进行版本控制 [https://github.com/git-lfs](https://github.com/git-lfs)
  * [https://git-lfs.github.com](https://git-lfs.github.com)

> Git LFS（Large File Storage, 大文件存储）可以把指定的任意文件存在 Git 仓库之外，
> 而在 Git 仓库中用一个占用空间 1KB 不到的文本指针，可以减小 Git 仓库本身的体积来代替的小工具。

> git每次保存diff，一些大文件发生变化时，整个仓库就会增加很大的体积，导致clone和pull的数据量大增。
> git push的时候，git lfs会截取要管理的大文件，并将其传至git lfs的服务器中，从而减小仓库的体积。

- `git lfs track "*.gz"` 添加文件到`.gitattributes`追踪记录文件中
- `git lfs ls-files` 显示当前提交后跟踪的文件列表
- `git lfs clone` 克隆追踪的文件

