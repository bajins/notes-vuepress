# 目录
* [使用命令](#使用命令)
  * [把空文件夹提交到仓库](#把空文件夹提交到仓库)
  * [更换项目地址](#更换项目地址)
  * [未push之前更改提交的注释](#未push之前更改提交的注释)
  
  
  
* [问题解决](#问题解决)
  * [项目过大clone报错](#项目过大clone报错)

*****************************************************************************

# 使用命令
## 把空文件夹提交到仓库
> 这个只能说是技巧不能说是方法，原理是在每个空文件夹新建一个.gitignore文件
```shell
find . -type d -empty -exec touch {}/.gitignore \;
```
## 更换项目地址
```shell
# 查看当前的远程地址
git remote -v   
# 删除当前的远程地址
git remote rm origin
# 添加远程地址
git remote add origin [url]

或者直接修改
git remote origin set-url （此处未更新后的新地址）

# 把当前分支与远程分支进行关联(branchname要改成你的当前分支名称)
git push --set-upstream origin branchname

```
## 未push之前更改提交的注释
> 如果提交了代码到本地，还没push，发现同步时提交的变更内容的注释填写有误。
```shell
# 查看提交文件，里面包含注释和变更内容
git commit --amend
# 按v进入编辑模式，更改完成后按esc然后输入:qw! 保存
```

# 问题解决
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
```sehll
# 修改压缩的程度
git config --global core.compression 0

# 解决内存不够问题
git config --global pack.deltaCacheSize 2047m
git config --global pack.packSizeLimit 2047m
git config --global pack.windowMemory 2047m
git config --global core.packedGitWindowSize 512m
git config --global core.packedGitLimit 512m
```
> compression 是压缩的意思，从 clone 的终端输出就知道，服务器会压缩目标文件，然后传输到客户端，客户端再解压。
取值为 [-1, 9]，-1 以 zlib 为默认压缩库，0 表示不进行压缩，1..9 是压缩速度与最终获得文件大小的不同程度的权衡，数字越大，压缩越慢，当然得到的文件会越小。





