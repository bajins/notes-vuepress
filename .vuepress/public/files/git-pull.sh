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