#!/bin/bash -e
# -e 执行命令出现错误就退出

# pull对应通知url中的param参数（使用$1接收）
if test "$1" != "pull"; then
    echo "参数不正确"
    exit 1
fi

# 项目存放目录
project_dir=/home/
# 项目名
project_name=notes-vuepress
# git远程地址
git_url=https://github.com/woytu/notes-vuepress.git
# 建议创建稳定分支，避免在开发分支上出现不稳定情况
git_branch=master
# 推送地址
push_url=https://github.com/woytu/woytu.github.io.git
# 推送用户邮箱
push_user_email=user@example.com
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

if [ ! -n "$push_user_email" ]; then
    echo "请设置Git推送用户邮箱"
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

# 获取项目克隆时间
a=$(stat -c %Y $project_dir/$project_name)
# 获取当前时间
b=$(date +%s)
# 如果项目克隆时间超过一分钟并且分支没有更新
if [ $(($b - $a)) -gt 60 ] && [ ! -n "$is_up" ]; then
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
npm install -g yarn
yarn install

# 编译
yarn build

# 切换到编译后静态文件目录
cd docs

# 初始化仓库
git init

# 设置当前仓库的用户邮箱
git config user.email "$push_user_email"
# 设置当前仓库的用户名
git config user.name "push_username"

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
# 问题回答完毕等待expect进程结束
expect eof
"