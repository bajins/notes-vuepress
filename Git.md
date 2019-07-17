---
sidebar: auto
---

## [Git服务器搭建](/VPS/Docker)

## 目录
* [使用命令](#使用命令)
  * [把空文件夹提交到仓库](#把空文件夹提交到仓库)
  * [更换项目地址](#更换项目地址)
  * [未push之前更改提交的注释](#未push之前更改提交的注释)
  * [强制push本地仓库到远程](#强制push本地仓库到远程)
  * [pull强制覆盖本地文件](#pull强制覆盖本地文件)
  * [清除用户名密码](#清除用户名密码)
  
  
* [问题解决](#问题解决)
  * [项目过大clone报错](#项目过大clone报错)
  * [提交本地文件失败](#提交本地文件失败)
  * [远端与本地代码冲突](#远端与本地代码冲突)  

* [批量更新本地项目](#批量更新本地项目)
*****************************************************************************

# 使用命令
## 把空文件夹提交到仓库
> 这个只能说是技巧不能说是方法，原理是在每个空文件夹新建一个.gitignore文件
```bash
find . -type d -empty -exec touch {}/.gitignore \;
```
## 更换项目地址
```bash
# 查看当前的远程地址
git remote -v   
# 删除当前的远程地址
git remote rm origin
# 或者
git remote remove origin
# 添加远程地址
git remote add origin [url]

# 或者直接修改
git remote set-url origin [url]（此处未更新后的新地址）

# 将本地仓库文件push到新的远程仓库（-f代表强制）
git push origin master -f
# 或者把当前分支与远程分支进行关联(branchname要改成你的当前分支名称)
git push --set-upstream origin branchname

```
## 未push之前更改提交的注释
> 如果提交了代码到本地，还没push，发现同步时提交的变更内容的注释填写有误。
```bash
# 查看提交文件，里面包含注释和变更内容
git commit --amend
# 按v进入编辑模式，更改完成后按esc然后输入:qw! 保存
```
## 强制push本地仓库到远程
> 这种情况不会进行merge, 强制push后远程文件可能会丢失,不建议使用此方法
```bash
git push -u origin master -f
```
## pull强制覆盖本地文件
> 如果有任何本地更改，将会丢失。无论是否有--hard选项，任何未被推送的本地提交都将丢失。
> 如果您有任何未被Git跟踪的文件(例如上传的用户内容)，这些文件将不会受到影响。

### 在重置之前可以通过从master创建一个分支来维护当前的本地提交
```bash
git checkout master
git branch new-branch
```
> 在此之后，所有旧的提交都将保存在`new-branch`中。然而，没有提交的更改(即使staged)将会丢失。确保存储和提交任何你需要的东西。

### 执行重置
```bash
# 从远程下载最新的，而不尝试合并或rebase任何东西
git fetch --all
# reset将主分支重置为您刚刚获取的内容。 --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
git reset --hard origin/<branch_name>
```
## 清除用户名密码
```bash
git config --system --unset credential.helper
```

## git恢复指定文件到之前的版本
### 查看commit历史，并复制需要回退版本的hash
```bash
git log 文件名
```
### 恢复
```bash
git checkout 复制的hash值 文件名
```







-----------------------------------------------------------------------------

## 项目过大clone报错
https://vnzmi.com/2017/01/08/git-early-eof-index-pack-failed/
### git 由于提交了比较大的文件，在服务端一直无法拉下来，错误如下
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

### 执行命令
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
取值为 [-1, 9]，-1 以 zlib 为默认压缩库，0 表示不进行压缩，1..9 是压缩速度与最终获得文件大小的不同程度的权衡，数字越大，压缩越慢，当然得到的文件会越小。

## 提交本地文件失败
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
### 解决方式
#### 第一种：进行push前先将远程仓库pull到本地仓库
```bash
# git pull --rebase origin master
git pull origin master
git push -u origin master

```
#### 第二种：强制push本地仓库到远程
```bash
git push -u origin master -f
```
#### 第三种：避开解决冲突, 将本地文件暂时提交到远程新建的分支中
```bash
git branch [name]
# 创建完branch后, 再进行push
git push -u origin [name] 
```

## 远端与本地代码冲突
### 1、先将本地修改存储起来
```bash
# 暂存修改,这样本地的所有修改就都被暂时存储起来
git stash
# 看到保存的信息,其中stash@{0}就是刚才保存的标记。
git stash list
```
### 2、暂存了本地修改之后，pull内容
### 3、还原暂存的内容
```bash
git stash popstash@{0}
```
### 系统提示如下类似的信息：
```diff
Auto-mergingc/environ.c
CONFLICT(content): Merge conflict in c/environ.c
```
> 意思就是系统自动合并修改的内容，但是其中有冲突，需要解决其中的冲突。

### 解决文件中冲突的的部分
> 打开冲突的文件，其中Updatedupstream 和=====之间的内容就是pull下来的内容，====和stashed changes之间的内容就是本地修改的内容。
碰到这种情况，git也不知道哪行内容是需要的，所以要自行确定需要的内容。








***********************************************************************************


## 批量更新本地项目
### Windows
```batch
@echo off
:: 遍历当前目录下的子目录
for /f "delims=" %%i in ('dir /ad/b') do (
    :: 切换到子目录
    cd %%i
    :: 判断文件夹是否存在
    if exist ".git" (
        :: 列出远程仓库地址
        git remote -v
        echo ******** 开始更新 %%i **********
        :: 更新
        git pull
        echo -----------------------------------------------------------
    )
    cd ..
)

pause
```

### Linux
```bash
#!/bin/bash
function readdir() {
    # awk中有RS,ORS,FS,OFS 4个可以定义分隔符的变量
    # 保存原有的IFS（内部域分隔符）
    SAVEIFS=$IFS
    # 设置带有空格的文件名的处理方式
    IFS=$(echo -en "\n\b")
    # 切换到指定目录
    cd $*
    # 循环参数中指定目录的子目录
    for file in $(ls -F | grep /$); do
        # 切换到子目录
        cd $file
        # 设置执行结果变量
        dir_variable=$?
        # 如果切换到子目录失败
        if [ "$dir_variable" != "0" ]; then
            echo $dir_variable
            echo $*$file
        fi
        # 判断是否是git项目
        if [ -d ".git" ]; then
            # 列出git远端仓库路径
            git remote -v
            echo 开始更新： $file
            git pull
            echo -----------------------------------------------------------
        fi
        cd ..
        # 循环当前子目录下的子目录
        #readdir $1$file
    done
    # 恢复原有的IFS
    IFS=$SAVEIFS
}
# 调用shell函数并传参
readdir $(pwd)

```
