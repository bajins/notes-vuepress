# Gitea+Vue自动化构建部署

## 手动部署
> Vue项目完成后,执行`npm run build`,然后将生成的dist目录下的文件放到web目录下

## WebHooks自动化部署
#### 流程如下:
> 配置`Gitea`的`WebHook`通知(也可以用`码云`、`Github`、`GitLab`、`gogs`,带`WebHook`功能就行),当我们`push`到仓库时,
> `Gitea`会主动发送一个通知到我们的服务器,然后服务器接到通知执行我们部署的脚本,开始自动化构建。


## 服务器安装必备环境
#### 以下命令视自己的环境而执行
```bash
# git
yum install -y git
# node 由于nodejs自带npm所以就不需要手动安装了
yum install -y nodejs
# vue-cli
npm install -g @vue/cli
```

## 配置服务器`WebHook`接收通知
### 自动化执行脚本
```bash
# pull对应通知url中的param参数（使用$1接收）
if test $1 = 'pull'
then
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
    
    
    if [ ! -n "$web_dir" ]
    then
        echo "请设置web目录"
        exit 1
    fi
    
    if [ ! -n "$project_dir" ]
    then
        echo "请设置项目存放目录"
        exit 1
    fi
    
    if [ ! -n "$project_name" ]
    then
        echo "请设置项目名称"
        exit 1
    fi
    
    if [ ! -n "$git_url" ]
    then
        echo "请设置git地址"
        exit 1
    fi
    
    if [ ! -n "$git_url" ]
    then
        echo "请设置git分支"
        exit 1
    fi
    
    
    # 判断web目录不存在则退出
    if [ ! -d $web_dir ]
    then
        echo "web目录不存在，请检查"
        exit 1
    fi
    
    # 判断web项目没有可执行权限则授权
    if [ ! -x $web_dir ]
    then
        # 将当前目录权限赋予给用户
        chown -R www:www $web_dir
        
        # 设置读写权限
        chmod -R 755 $web_dir
    fi
    
    
    # 判断项目存放目录不存在则创建
    if [ ! -d $project_dir ]
    then
        mkdir $project_dir
    fi
    
    
    # 判断项目存放目录没有可执行权限则授权
    if [ ! -x $project_dir ]
    then
        # 将当前目录权限赋予给用户
        chown -R www:www $project_dir
        
        # 设置读写权限
        chmod -R 755 $project_dir
    fi
    
    cd $project_dir
    
    # 判断项目不存在则克隆下来
    if [ ! -d $project_dir/$project_name ]
    then
        # 克隆项目的指定分支到指定项目名
        git clone -b $git_branch $git_url $project_name
    fi
    
    
    # 判断项目目录不存在则克隆失败
    if [ ! -d $project_dir/$project_name ]
    then
        echo "克隆项目失败"
        exit 1
    fi
    
    
    # 先cd到我们的项目目录下,git clone的目录
    cd $project_dir/$project_name/
    
	# 判断分支是否存在
    branch=$(git branch | grep $git_branch)
    if [ ! -n "$branch" ]
    then
        echo "项目分支$git_branch不存在"
        exit 1
    fi
	
    
    # 从远程下载最新的，而不尝试合并或rebase任何东西
    git fetch --all
    
    # 比较远端和本地分支
    is_up=`git diff $git_branch origin/$git_branch`
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
    a=`stat -c %Y $project_dir/$project_name/`
    # 获取当前时间
    b=`date +%s`
    # 如果项目克隆时间超过一分钟并且分支有更新
    if [ $[ $b - $a ] -gt 60 && ! -n "$is_up" ]
    then
        echo "分支$git_branch没有更新"
        exit 1
    fi
    
    
    # reset将主分支重置为您刚刚获取的内容。
    # --hard选项更改工作树中的所有文件以匹配origin/<branch_name>中的文件
    # 避免脚本执行时修改了本地代码导致pull不下来
    git reset --hard origin/$git_branch
    
    # 执行pull命令拉取最新的代码
    git pull origin $git_branch
    
    
    # 使用npm run build构建Vue项目
    npm run build
    
    # 删除web目录下的文件
    rm -rf $web_dir/*
    
    # 移动打包好的文件到web目录下
    mv $project_dir/$project_name/dist/* $web_dir
fi
```

### 第一种：宝塔面板
##### 设置宝塔WebHook插件
![](/images/宝塔WebHook设置.png)

##### 宝塔WebHook获取url
```
# param参数需要和脚本里对应起来,我这里写的是pull
http://服务器ip:8888/hook?access_key=5C84B7A5UeXYalfNL6WEpi3jdmmxhFlk3jpvEw02BMo84Ak3&param=pull
```
![](/images/宝塔WebHook获取url.png)


### 第二种：[`netcat`命令](https://segmentfault.com/a/1190000016626298)
#### 实现监听端口->响应请求->执行脚本部署

#### 一直监听 9999 端口，有请求就响应`echo`的内容，并配合`&&`连接起来，通过 Curl 触发部署操作
```bash
echo -e "HTTP/1.1 200 ok,glass\r\nConnection: close\r\n\r" |  nc -l 0.0.0.0 9999 ; sh /home/update.sh >> /home/logs/webhook.log 2>&1
```

> 通过 systemd，可以将这个脚本管理起来，让它永远重启，这样一次部署之后，马上就可以重新监听，等待下一次部署命令。注意要添加 StartLimitInterval ，限制一下执行的频率。

#### 最终的 systemd service 如下
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

### 第三种：使用第三方项目
#### [GoWebhook](https://github.com/moonagic/GoWebhook)
#### [webhook](https://github.com/adnanh/webhook)





## 配置Gitea的WebHook

### 设置Gitea的WebHook
![](/images/GiteaWebHook设置.png)

### 添加Gitea的WebHook
![](/images/GiteaWebHook添加.png)

### 测试Gitea的WebHook推送
![](/images/GiteaWebHook测试.png)