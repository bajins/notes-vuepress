# GitWebHook

* [介绍](#介绍)
* [配置接收通知](#配置接收通知)
  * [必备环境](#必备环境)
  * [宝塔面板](#宝塔面板)
  * [`netcat`命令](#netcat命令)
  * [第三方项目](#第三方项目)
* [配置WebHook](#配置webhook)
  * [添加接收通知的url](#添加接收通知url)
  * [测试推送](#测试推送)
* [执行脚本](#执行脚本)
  * [编译并部署到web目录](#编译并部署到web目录)
  * [编译并部署到仓库](#编译并部署到仓库)



## 介绍

- 手动部署

> Vue项目完成后,执行`npm run build`,然后将生成的dist目录下的文件放到web目录下

- WebHooks自动化部署,流程如下:

> 配置`Gitea`的`WebHook`通知(也可以用`码云`、`Github`、`GitLab`、`gogs`,带`WebHook`功能就行)

> 当我们`push`到仓库时,`Gitea`会主动发送一个通知到我们的服务器,然后服务器接到通知执行我们部署的脚本,开始自动化构建。



## 配置接收通知

### 必备环境

- 以下命令视自己的环境而执行

```bash
# git
yum install -y git
# node 由于nodejs自带npm所以就不需要手动安装了
yum install -y nodejs
# vue-cli
npm install -g @vue/cli
```


### 宝塔面板

- 设置宝塔WebHook插件

![](/images/宝塔WebHook设置.png)

- 宝塔WebHook获取url

- param参数需要和脚本里对应起来,我这里写的是pull

> `http://服务器ip:8888/hook?access_key=5C84B7A5UeXYalfNL6WEpi3jdmmxhFlk3jpvEw02BMo84Ak3&param=pull`

![](/images/宝塔WebHook获取url.png)


### `netcat`命令

* [https://segmentfault.com/a/1190000016626298](https://segmentfault.com/a/1190000016626298)

- 实现监听端口->响应请求->执行脚本部署

- 一直监听 9999 端口，有请求就响应`echo`的内容，并执行指定脚本

```bash
echo -e "HTTP/1.1 200 ok,glass\r\nConnection: close\r\n\r" |  nc -l 0.0.0.0 9999 ; sh /home/update.sh >> /home/logs/webhook.log 2>&1
```

> 通过 systemd，可以将这个脚本管理起来，让它永远重启，这样一次部署之后，马上就可以重新监听，等待下一次部署命令。注意要添加 StartLimitInterval ，限制一下执行的频率。

- 最终的`systemd service`如下

```bash
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

### 第三方项目

* [webhook-go](https://github.com/woytu/webhook-go)

* [webhook](https://github.com/adnanh/webhook)





## 配置WebHook


![](/images/GiteaWebHook设置.png)

### 添加接收通知url

![](/images/GiteaWebHook添加.png)

### 测试推送

![](/images/GiteaWebHook测试.png)


## 执行脚本

### 编译并部署到web目录

```bash
# pull对应通知url中的param参数（使用$1接收）
if test "$1" != "pull"; then
    echo "参数不正确"
    exit 1
fi
# web目录
web_dir=/home/jktz/
# 项目存放目录
project_dir=/home/project/
# 项目目录
project_name=test
# git远程地址
git_url=https://192.168.1.110/woytu/test.git
# 建议创建稳定分支，避免在开发分支上出现不稳定情况
git_branch=alpha

if [ ! -n "$web_dir" ]; then
    echo "请设置web目录"
    exit 1
fi

if [ ! -n "$project_dir" ]; then
    echo "请设置项目存放目录"
    exit 1
fi

if [ ! -n "$project_name" ]; then
    echo "请设置项目名称"
    exit 1
fi

if [ ! -n "$git_url" ]; then
    echo "请设置git地址"
    exit 1
fi

if [ ! -n "$git_url" ]; then
    echo "请设置git分支"
    exit 1
fi

# 判断web目录不存在则退出
if [ ! -d $web_dir ]; then
    echo "web目录不存在，请检查"
    exit 1
fi

# 判断web项目没有可执行权限则授权
if [ ! -x $web_dir ]; then
    # 将当前目录权限赋予给用户
    chown -R www:www $web_dir

    # 设置读写权限
    chmod -R 755 $web_dir
fi

# 判断项目存放目录不存在则创建
if [ ! -d $project_dir ]; then
    mkdir $project_dir
fi

# 判断项目存放目录没有可执行权限则授权
if [ ! -x $project_dir ]; then
    # 将当前目录权限赋予给用户
    chown -R www:www $project_dir

    # 设置读写权限
    chmod -R 755 $project_dir
fi

cd $project_dir

# 判断项目不存在则克隆下来
if [ ! -d $project_dir/$project_name ]; then
    # 克隆项目的指定分支到指定项目名
    git clone -b $git_branch $git_url $project_name
fi

# 判断项目目录不存在则克隆失败
if [ ! -d $project_dir/$project_name ]; then
    echo "克隆项目失败"
    exit 1
fi

# 先cd到我们的项目目录下,git clone的目录
cd $project_dir/$project_name

# 判断分支是否存在
branch=$(git branch | grep $git_branch)
if [ ! -n "$branch" ]; then
    echo "项目分支$git_branch不存在"
    exit 1
fi

# 从远程下载最新的，而不尝试合并或rebase任何东西
git fetch --all

# 比较远端和本地分支
is_up=$(git diff $git_branch origin/$git_branch)
# 统计文件的改动
#is_up=`git diff --stat $git_branch origin/$git_branch`
# 执行一次git fetch origin xxx，那当下最新版本的commit会存在FETCH_HEAD中
#is_up=`git diff HEAD FETCH_HEAD`

#is_up=`git pull --dry-run | grep -q -v 'Already up-to-date.' && changed=1`
#is_up=`git log HEAD...origin/$git_branch --oneline`
#is_up=`git log -p $git_branch..origin/$git_branch`
# 本地与远程的差集 :（显示远程有而本地没有的commit信息）
#is_up=`git log $git_branch..origin/$git_branch`

# 获取项目克隆时间
a=$(stat -c %Y $project_dir/$project_name/)
# 获取当前时间
b=$(date +%s)
# 如果项目克隆时间超过一分钟并且分支有更新
if [ $(($b - $a)) -gt 60 && ! -n "$is_up" ]; then
    echo "分支$git_branch没有更新"
    exit 1
fi

# reset将主分支重置为您刚刚获取的内容。
# --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
# 避免脚本执行时修改了本地代码导致pull不下来
git reset --hard origin/$git_branch

# 执行pull命令拉取最新的代码
git pull origin $git_branch

# 安装依赖
npm install
# 构建Vue项目
npm run build

# 删除web目录下的文件
rm -rf $web_dir/*

# 移动打包好的文件到web目录下
mv $project_dir/$project_name/dist/* $web_dir

```

### 编译并部署到仓库

```bash
# -e 执行命令出现错误就退出
#!/bin/bash -e

# pull对应通知url中的param参数（使用$1接收）
if test "$1" != "pull"; then
    echo "参数不正确"
    exit 1
fi

# 项目存放目录
project_dir=/home/
# 项目名
project_name=UseNotes-vuepress
# git远程地址
git_url=https://github.com/woytu/UseNotes-vuepress.git
# 建议创建稳定分支，避免在开发分支上出现不稳定情况
git_branch=master
# 推送地址
push_url=https://github.com/woytu/woytu.github.io.git
# 推送用户
push_username=user
# 推送密码
push_password=password

if [ ! -n "$project_dir" ]; then
    echo "请设置项目存放目录"
    exit 1
fi

if [ ! -n "$project_name" ]; then
    echo "请设置项目名称"
    exit 1
fi

if [ ! -n "$git_url" ]; then
    echo "请设置Git地址"
    exit 1
fi

if [ ! -n "$git_branch" ]; then
    echo "请设置Git分支"
    exit 1
fi

if [ ! -n "$push_url" ]; then
    echo "请设置Git推送地址"
    exit 1
fi

if [ ! -n "$push_username" ]; then
    echo "请设置Git推送用户名"
    exit 1
fi

if [ ! -n "$push_password" ]; then
    echo "请设置Git推送密码"
    exit 1
fi

# 判断项目存放目录不存在则创建
if [ ! -d $project_dir ]; then
    mkdir $project_dir
fi

# 判断项目存放目录没有可执行权限则授权
if [ ! -x $project_dir ]; then
    # 将当前目录权限赋予给用户
    chown -R www:www $project_dir

    # 设置读写权限
    chmod -R 755 $project_dir
fi

cd $project_dir

# 判断项目不存在则克隆下来
if [ ! -d $project_dir/$project_name ]; then
    # 克隆项目的指定分支到指定项目名
    git clone -b $git_branch $git_url $project_name
fi

# 判断项目目录不存在则克隆失败
if [ ! -d $project_dir/$project_name ]; then
    echo "克隆项目失败"
    exit 1
fi

# 先cd到我们的项目目录下,git clone的目录
cd $project_dir/$project_name

# 判断分支是否存在
branch=$(git branch | grep $git_branch)
if [ ! -n "$branch" ]; then
    echo "项目分支$git_branch不存在"
    exit 1
fi

# 从远程下载最新的，而不尝试合并或rebase任何东西
git fetch --all

# 比较远端和本地分支
is_up=$(git diff $git_branch origin/$git_branch)
# 统计文件的改动
#is_up=`git diff --stat $git_branch origin/$git_branch`
# 执行一次git fetch origin xxx，那当下最新版本的commit会存在FETCH_HEAD中
#is_up=`git diff HEAD FETCH_HEAD`

#is_up=`git pull --dry-run | grep -q -v 'Already up-to-date.' && changed=1`
#is_up=`git log HEAD...origin/$git_branch --oneline`
#is_up=`git log -p $git_branch..origin/$git_branch`
# 本地与远程的差集 :（显示远程有而本地没有的commit信息）
#is_up=`git log $git_branch..origin/$git_branch`

# 获取项目克隆时间
a=$(stat -c %Y $project_dir/$project_name)
# 获取当前时间
b=$(date +%s)
# 如果项目克隆时间超过一分钟并且分支有更新
if [ $(($b - $a)) -gt 60 && ! -n "$is_up" ]; then
    echo "分支$git_branch没有更新"
    exit 1
fi

# reset将主分支重置为您刚刚获取的内容。
# --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
# 避免脚本执行时修改了本地代码导致pull不下来
git reset --hard origin/$git_branch

# 执行pull命令拉取最新的代码
git pull origin $git_branch

# 安装依赖
yarn install

# 编译
yarn build

# 切换到编译后静态文件目录
cd docs

# 初始化仓库
git init

# 把文件添加到暂存区
git add -A

# 提交
git commit -m 'deploy'

# 推送

# 检索expect是否安装
is_expect=`whereis expect | awk '{print $2}'`
# 如果没有安装
if [ ! -n "$is_expect" ]; then
    yum -y install expect > /dev/null 2>&1
fi

expect -c "

# 超时时间-1为永不超时
set timeout -1

# spawn将开启一个新的进程，或者使用：ssh $user@$host {your_command}
# 只有先进入expect环境后才可执行spawn
spawn git push -f ${push_url} master

# 判断运行上述命令的输出结果中是否有指定的字符串(不区分大小写)。
# 若有则立即返回，否则就等待一段时间后返回，等待时长就是开头设置的timeout。
# 同时向上面的进程发送字符串, 并且自动敲Enter健(\r)
expect {
  \"*Username*\" {send \"${push_username}\r\"; exp_continue}
  \"*Password*\" {send \"${push_password}\r\";}
}

"

```