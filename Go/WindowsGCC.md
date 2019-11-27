# WindowsGCC


* [flag](#flag)
* [`MinGW-w64`](#mingw-w64)
  * [`MinGW-w64`下载](#mingw-w64下载)
  * [`MinGW-w64`安装](#mingw-w64安装)
  * [`MinGW-w64`命令](#mingw-w64命令)
* [`MSYS2`](#msys2)
  * [`MSYS2`命令](#msys2命令)




## flag

* [http://www.cygwin.com](http://www.cygwin.com)

* [https://github.com/lukesampson/scoop](https://github.com/lukesampson/scoop)



## `MinGW-w64`

* [http://rsreland.net/archives/1760](http://rsreland.net/archives/1760)

> `MinGW`的全称是：`Minimalist GNU on Windows` 。它实际上是将经典的开源`C`语言编译器`GCC`移植到了`Windows`平台下，
> 并且包含了`Win32API`，因此可以将源代码编译为可在`Windows`中运行的可执行程序。
> 而且还可以使用一些`Windows`不具备的，`Linux`平台下的开发工具。一句话来概括：`MinGW`就是`GCC`的`Windows`版本 。
>
> 而`MinGW-w64`与`MinGW`的区别在于`MinGW`只能编译生成`32位`可执行程序，而`MinGW-w64`则可以编译生成`64位`或`32位`可执行程序。
> 
>  正因为如此，`MinGW`现已被`MinGW-w64`所取代，且`MinGW`也早已停止了更新。
>
> `MinGW-w64`使用`Windows`的`C`语言运行库，因此编译出的程序不需要第三方`DLL`，可以直接在`Windows`下运行。
>
> 那些著名的开源`IDE`实际只是将`MinGW-w64`封装了起来，使它拥有友好的图形化界面，简化了操作，但内部核心仍然是`MinGW-w64`。

* [https://zhuanlan.zhihu.com/p/57774611](https://zhuanlan.zhihu.com/p/57774611)

> `MinGW`一个自由开源的最小开发工具集：`mingw-gcc`编译工具链、`mingw`软件包管理器（`mingw-get`），用于开发`Windows`原生程序。
> 第一版的`mingw-gcc`是利用早期的`Cygwin`套件编译而成，这个过程和`Cygwin`系列（二）：初窥`Cygwin`背后中`Cygwin DLL`构建类似，
> 随后`mingw-binutils`、`mingw-make`等其他工具链也都逐渐移植成功，`MinGW`逐渐完全脱离了`Cygwin`。

> `2005`年，`MinGW-w64`项目基于`MinGW`创建，改善了`MinGW`的相关缺陷，并既支持`32位`程序又支持`64位`程序。
> `MinGW-w64`项目开发活跃，被很多`Linux`发行版采用为交叉工具链，而`MinGW`事实上已被抛弃。

> 可以把`MinGW`视为`MS Visual C++/Studio`的开源替代品


* [http://mingw-w64.org](http://mingw-w64.org)



### `MinGW-w64`下载

* [mingw-w64-release](https://sourceforge.net/projects/mingw-w64/files/mingw-w64/mingw-w64-release/#readme)

* [mingw-w64-release](https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/#readme)

> 首先看到的是源码，要把页面滚动到最底部才能看到编译好的在线安装程序和离线压缩包

> 推荐离线安装，在线安装其实也是下载压缩包，而且众所周知的原因，国内通过在线安装非常缓慢

![](/images/MinGW-w64下载页说明.png)


- **环境说明**

- 系统架构

> `x86_64`为`64位`操作系统
>
> `i686`为`32位`操作系统

- 操作系统接口协议（为哪种操作系统开发程序）

> `posix`为`Linux`、`Unix`、`Mac OS`等其他操作系统
> 
> `win32`为`Windows`操作系统

- 异常处理模型（64位）

> `seh`是新发明的，性能比较好，但不支持`32位`操作系统
> 
> `sjlj`是古老的，稳定性好，支持`32位`操作系统

- 异常处理模型（32位）

> `dwarf`性能要优于`sjlj`，不支持`64位`操作系统
> 
> `sjlj`稳定性好，支持`32位`操作系统



### `MinGW-w64`安装

1. 如操作系统是`Windows10-X64`并为`posix`接口协议开发程序，则选择：`x86_64-posix-seh`

2. 下载后把压缩包解压到指定盘符下，再添加到系统环境变量`path`

> 如解压目录`C:\Program Files\mingw64`，则在cmd执行`set Path=%Path%;C:\Program Files\mingw64\bin`



### `MinGW-w64`命令

- 查看版本

```batch
gcc -v
```

- 预处理

```batch
g++ -E test.cpp -o test.i
```

- 编译

```batch
g++ -S test.cpp -o test.s
# 或者
g++ -O2 -S test.cpp -o test.s
```

- 汇编

```batch
g++ -c test.s -o test.o
```

- 链接

```batch
g++ test.o -o test.exe [-L 所需库文件路径]
# 或者
g++ test.cpp -o test.exe
```




## `MSYS2`

> `MSYS`是用于辅助`Windows`版`MinGW`进行命令行开发的配套软件包，提供了部分`Unix`工具以使得`MinGW`的工具使用起来方便一些。
> 如果不喜欢庞大的`Cygwin`，而且使用不多，可以试试。不过喜欢完整体验、不在乎磁盘占用等等，还是推荐`Cygwin`而不是`MSYS`。

> `MSYS`和`MinGW`两者有较大的独立性。`MSYS`是`Minimal SYStem`的缩写，是一个基于`Bourne Shell`的命令行系统，
> 用于替代`Windows`中的`cmd.exe`，提供一个像`Linux/UNIX`的命令行环境。

> `MSYS`是基于`Cygwin`早期版本（`v1.3`）发展而来，包含了少部分`Linux/UNIX`程序，没有编译工具链，
> 而且与`Linux/UNIX`原生程序或`Cygwin`程序相较丢失了很多功能特性，运行依赖于`POSIX`兼容层（`msys-1.0.dll`）。

> 如果没有`MSYS`，在`cmd`中也可以正常运行`MinGW`程序，但`MinGW`和`MSYS`配合起来，
> 就组成了一个类似`Linux/UNIX`的、包含常用程序和完整开发工具的轻量但完备的系统环境，
> `MinGW`的安装路径可以挂载到`MSYS`目录树中任何位置。

> `MSYS`项目仅支持`32位`程序，项目本身也发展缓慢。`MSYS2`基于最新版的`Cygwin`而创建，完全独立于`MSYS`而重写的版本
> ，并既支持`32位`程序又支持`64位`程序，`POSIX`兼容层为`msys-2.0.dll`。
> `MSYS2`由`msys2`、`mingw32`、`mingw64`三个子系统组成，`mingw32`、`mingw64`对应于`mingw-w64`的`32位`和`64位`版本。
> 还有一个特色就是，`MSYS2`移植了`Arch Linux`中的包管理器`pacman`

> `MSYS2`不完全是基于`MinGW`的，至少其原生工具都是链接到自带的一套特定版本的`Cygwin DLL`的。
> 基本上只是用`libalpm`管理`MSYS2`、`MinGW-w64`和`MinGW`三个不同子系统的软件包



* [http://www.msys2.org](http://www.msys2.org)

* [https://github.com/msys2](https://github.com/msys2)

* [msys2配置记录](https://www.jianshu.com/p/c740b71e7775)

* [清华大学MSYS2镜像](https://mirror.tuna.tsinghua.edu.cn/help/msys2)

* [中国科学技术大学MSYS2镜像](http://mirrors.ustc.edu.cn/help/msys2.html)


### `MSYS2`命令

- `pacman -S <packge-name>` 安装软件

> `pacman -S mingw-w64-x86_64-make mingw-w64-x86_64-gcc`

- `pacman -U <gz-file>` 安装本地包，其扩展名为`pkg.tar.gz`  
- `pacman -Syu` 同步`Msys2`源，并更新
- `pacman -Sy` 仅同步源
- `pacman -Su` 更新系统
- `pacman -Sy <packge-name>` 同步源后再安装软件
- `pacman -R <packge-name>` 该命令将只删除包，不包含该包的依赖。
- `pacman -Rs <packge-name>` 在删除包的同时，也将删除其依赖。
- `pacman -Rd <packge-name>` 在删除包时不检查依赖。
- `pacman -Ss <keywords>` 这将搜索含关键字的包。
- `pacman -Qi <packge-name>` 查看有关包的信息。
