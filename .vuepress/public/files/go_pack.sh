#!/bin/bash

# declare -A  定义关联数组 类似字典 键值对
#declare -A os_arch_dic

# 需要打包的静态文件或目录
zip_files=pyutils,static

# 脚本当前目录绝对路径
project_path=$(cd `dirname $0`; pwd)
# 脚本当前目录名
project_name="${project_path##*/}"

# 对IFS变量进行替换处理
OLD_IFS="$IFS"
# 指定分隔符
IFS=" "
os_arch_array=`go tool dist list`
# 还原
IFS="$OLD_IFS"

for item in ${os_arch_array[@]}; do
    # 替换指定字符串为IFS的默认分隔符空格
    array=(${item//\// })
    os=${array[0]}
    arch=${array[1]}
    zip_dir=${project_name}_${os}_${arch}

    if [ -e $zip_dir ]; then
        # 如果压缩目录存在则删除
        rm -rf $zip_dir
    fi

    # 创建要打包的目录，把编译好的二进制文件和静态文件复制进去
    mkdir $zip_dir
    # {}前一定要有父级目录路径
    cp -r ./{$zip_files} $zip_dir

    # 设置变量
    export GOOS=$os GOARCH=$arch

    echo "环境变量设置成功：$GOOS------$GOARCH"

    # 指定编译的二进制文件名
    binary_file=${os}_${arch}
    if [ $os == "windows" ]; then
        binary_file=$binary_file.exe
    fi
    
    # 编译文件到压缩目录
    if [ $os == "android" ]; then
        go build -ldflags="-w -linkmode=external -extldflags=-pie" -i -o $zip_dir/$binary_file
    # elif [ $os == "windows" ]; then
    #     go build -ldflags="-w -H windowsgui" -i -o $zip_dir/$binary_file
    else
        go build -ldflags=-w -i -o $zip_dir/$binary_file
    fi

    # 压缩
    if [ $os == "windows" ]; then
        zip -q -r $zip_dir.zip $zip_dir
    else
        tar -czf $zip_dir.tar.gz $zip_dir
    fi

    # 删除压缩目录
    rm -rf $zip_dir
    
    # 编译完成清理缓存
    go clean -cache

done

