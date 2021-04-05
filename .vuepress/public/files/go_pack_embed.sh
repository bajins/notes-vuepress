#!/bin/bash

# 脚本当前目录绝对路径
project_path=$(
  cd "$(dirname "$0")" || exit
  pwd
)
# 脚本当前目录名
project_name="${project_path##*/}"

# 获得所有受支持平台的列表
#os_arch_array=($(go tool dist list))
#for i in "${!os_arch_array[@]}"; do
#  item=${array[i]}
os_arch_array=$(go tool dist list)

# 保存默认分隔符
OLD_IFS="$IFS"
for item in ${os_arch_array}; do
  # array=(${item//\// }) # 替换\为空格（IFS的默认分隔符）
  # 指定分隔符
  IFS="/"
  array=(${item})

  os=${array[0]}
  arch=${array[1]}
  binary_file=${project_name}_${os}_${arch}

  # 忽略以下平台的编译
  if [[ "$os" == "android" ]] || [[ "$os" == "ios" ]] || [[ "$os" == "darwin" && "$arch" == *arm* ]]; then
    continue
  fi

  # 设置变量
  export GOOS="$os" GOARCH="$arch"

  echo "环境变量设置成功：$GOOS------$GOARCH"

  # 指定编译的二进制文件名
  if [ "$os" == "windows" ]; then
    binary_file="$binary_file".exe
  fi

  # 编译文件不同的系统架构使用不同的命令参数
  if [ "$os" == "android" ]; then
    # 开启 CGO
    # export CGO_ENABLED=1
    # flags="-w -linkmode=external -extldflags=-pie"
    : # 占位
  elif [ "$os" == "darwin" ]; then
    # 开启 CGO
    # export CGO_ENABLED=1
    flags="-w"
  elif [ "$os" == "windows" ]; then
    # 交叉编译不支持 CGO 所以要禁用它
    # export CGO_ENABLED=0
    # flags="-w -H windowsgui"
    : # 占位
  else
    # 交叉编译不支持 CGO 所以要禁用它
    export CGO_ENABLED=0
    flags="-w"
  fi
  # 编译二进制文件并输出到当前目录
  go build -ldflags=$flags -o "build/$binary_file"
done

# 还原默认分隔符
IFS="$OLD_IFS"

# 编译完成清理缓存
go clean -cache
