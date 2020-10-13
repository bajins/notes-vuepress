#!/bin/bash

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
# 获取项目克隆时间
a=$(stat -c %Y $project_dir/$project_name/)
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
npm install
# 构建Vue项目
npm run build

# 删除web目录下的文件
rm -rf $web_dir/*

# 移动打包好的文件到web目录下
mv $project_dir/$project_name/dist/* $web_dir