# CentOS7挂载网盘


* [flag](#flag)
* [挂载OneDrive](#挂载onedrive)
  * [获取`access_token`](#获取access_token)
  * [操作CentOS7](#操作centos7)
* [`Rclone`](#rclone)
  * [`rclone mount`](#rclone-mount)
  * [`rclone copy`](#rclone-copy)
  * [`rclone sync`](#rclone-sync)
  * [`rclone move`](#rclone-move)
  * [`rclone purge`](#rclone-purge)
  * [`rclone mkdir`](#rclone-mkdir)
  * [`rclone rmdir`](#rclone-rmdir)
  * [`rclone check`](#rclone-check)
  * [`rclone ls`](#rclone-ls)
  * [`rclone lsd`](#rclone-lsd)
  * [`rclone delete`](#rclone-delete)
  * [`rclone size`](#rclone-size)







## flag

* [Plexdrive/Rclone+Google Drive搭建无限容量的媒体库](https://www.moerats.com/archives/870/)

* [挂载GoogleDrive](https://www.moerats.com/archives/481/)

* [解决Rclone挂载Google Drive时上传失败和内存占用高等问题](https://www.moerats.com/archives/877/)

> GoogleDrive一天好像最多750G，跑多就出问题


## 挂载OneDrive

> 注意：服务器最好是`KVM`的，`OpenVZ`需要给你的服务商发TK告诉他们开一下`FUSE`，如果没有`FUSE`是没办法挂载的。

### 获取`access_token`

- **下载Windows版`Rclone`**

*[https://rclone.org/downloads](https://rclone.org/downloads)

> 解压后进入文件夹，在路径地址栏中输入`cmd`打开CMD

- **执行命令**

```batch
rclone authorize "onedrive"
```

> 运行后会自动打开浏览器，然后登录帐号，会进入接受许可页面，点击接受，然后后会跳转到授权成功的页面，此时页面显示`Success!`。

- **查看`access_token`**

> 切换到CMD窗口，此时已经有`access_token`了。
>
> 把`{}`包含里面的内容复制下来保存好，后面需要用到（包含括号一起复制保存）

![](/images/Rclone_access_token.png)

### 操作CentOS7

- **安装基础工具**

```bash
yum -y install wget unzip screen fuse fuse-devel
```

- **安装`Rclone`**

```bash
curl https://rclone.org/install.sh | sudo bash
```

> 安装完成后最后两行显示
>> `rclone v1.48.0 has successfully installed.`
>> `Now run "rclone config" for setup. Check https://rclone.org/docs/ for more details.`

- **配置**

```bash
rclone config
```

> 以下是配置详情，注意看中文注释部分

```diff
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n            # 选择n新建一个远程

name> onedrive      # 取一个名称为onedrive

Type of storage to configure.
Enter a string value. Press Enter for the default ("").
Choose a number from below, or type in your own value
 1 / A stackable unification remote, which can appear to merge the contents of several remotes
   \ "union"
 2 / Alias for an existing remote
   \ "alias"
 3 / Amazon Drive
   \ "amazon cloud drive"
 4 / Amazon S3 Compliant Storage Provider (AWS, Alibaba, Ceph, Digital Ocean, Dreamhost, IBM COS, Minio, etc)
   \ "s3"
 5 / Backblaze B2
   \ "b2"
 6 / Box
   \ "box"
 7 / Cache a remote
   \ "cache"
 8 / Dropbox
   \ "dropbox"
 9 / Encrypt/Decrypt a remote
   \ "crypt"
10 / FTP Connection
   \ "ftp"
11 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
12 / Google Drive
   \ "drive"
13 / Hubic
   \ "hubic"
14 / JottaCloud
   \ "jottacloud"
15 / Koofr
   \ "koofr"
16 / Local Disk
   \ "local"
17 / Mega
   \ "mega"
18 / Microsoft Azure Blob Storage
   \ "azureblob"
19 / Microsoft OneDrive
   \ "onedrive"
20 / OpenDrive
   \ "opendrive"
21 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
22 / Pcloud
   \ "pcloud"
23 / QingCloud Object Storage
   \ "qingstor"
24 / SSH/SFTP Connection
   \ "sftp"
25 / Webdav
   \ "webdav"
26 / Yandex Disk
   \ "yandex"
27 / http Connection
   \ "http"
Storage> 19          # 挂载的网盘，这里选择19为onedrive

** See help for onedrive backend at: https://rclone.org/onedrive/ **

Microsoft App Client Id
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_id>           # 直接回车，不输入任何内容

Microsoft App Client Secret
Leave blank normally.
Enter a string value. Press Enter for the default ("").
client_secret>       # 直接回车，不输入任何内容

Edit advanced config? (y/n)
y) Yes
n) No
y/n> n               # 是否配置高级设置，这里我们直接No，选择n

Remote config
Use auto config?
 * Say Y if not sure
 * Say N if you are working on a remote or headless machine
y) Yes
n) No
y/n> y                # 是否使用自动设置，同样直接NO，选择n

For this to work, you will need rclone available on a machine that has a web browser available.
Execute the following on your machine:
	rclone authorize "onedrive"
Then paste the result below:
result>               # 这里输入在Windows下CMD中获取的access_token

Choose a number from below, or type in an existing value
 1 / OneDrive Personal or Business
   \ "onedrive"
 2 / Root Sharepoint site
   \ "sharepoint"
 3 / Type in driveID
   \ "driveid"
 4 / Type in SiteID
   \ "siteid"
 5 / Search a Sharepoint site
   \ "search"
Your choice> 1          # 这里选择1，onedrive个人版或是商业版

Found 1 drives, please select the one you want to use:
0: OneDrive (business) id=b!jgC84eM3ckGels8kZg0AjrRlBrvtdTVOnbzPXRHOY-QpnI7rGSfRTYa-UqDPQLRu
Chose drive to use:> 0   # 提示找到一个驱动器，输入找到的序号0

Found drive 'root' of type 'business', URL: https://hkbaom-my.sharepoint.com/personal/tel4916_my365_site/Documents
Is that okay?
y) Yes
n) No
y/n> y                  # 找到“business”类型的驱动器，y确认类型

--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y               # 确认配置

Current remotes:

Name                 Type
====                 ====
onedrive             onedrive

e) Edit existing remote
n) New remote
d) Delete remote
r) Rename remote
c) Copy remote
s) Set configuration password
q) Quit config
e/n/d/r/c/s/q> q      # 输入q，退出配置
```

> 以上就配置好了，剩下的就是挂载了

- **挂载**

- 命令格式

> 只需修改`DriveName:Folder LocalFolder`
>> `DriveName` 这里就是配置第二步输入的`name`
>>
>> `Folder` 网盘的中的文件夹，`/`或者留空为网盘根目录
>>
>> `LocalFolder` 本地文件夹


- 创建LocalFolder

```bash
mkdir /home/onedrive
```

- 挂载为磁盘

```bash
rclone mount DriveName:Folder LocalFolder \
 --copy-links \
 --no-gzip-encoding \
 --no-check-certificate \
 --allow-other \
 --allow-non-empty \
 --umask 000 \
 --transfers 4 \
 --buffer-size 32M \
 --low-level-retries 200 \
 --dir-cache-time 12h \
 --vfs-read-chunk-size 32M \
 --vfs-read-chunk-size-limit 1G \
 > /dev/null 2>&1 &
```

> 在运行挂载命令后，**SSH窗口会出现中断，光标丢失**，需要断开重新连接。




- **查看是否挂载成功**

```bash
df -h
```

- **设置自启动**

- 第一种

> 在`vi /etc/profile`文件中输入`shift + g`（就是大写的G）跳转到末尾添加挂载命令


- 第二种

> 新建名为`rcloned`不带后缀的文件，把以下代码复制到文件中，并修改`NAME`、`REMOTE`、`LOCAL`

```bash
#!/bin/bash

PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin
export PATH
NAME_BIN="rclone"
#******* BEGIN INIT INFO
# Provides:          rclone
# Required-Start:    $all
# Required-Stop:     $all
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start rclone at boot time
# Description:       Enable rclone by daemon.
#******* END INIT INFO

NAME=""     # rclone name名，即配置时输入的Name
REMOTE=''   # 远程文件夹，OneDrive 网盘里的挂载的一个文件夹
LOCAL=''    # 挂载地址，VPS本地挂载目录

Green_font_prefix="\033[32m" && \
 Red_font_prefix="\033[31m" && \
 Green_background_prefix="\033[42;37m" && \
 Red_background_prefix="\033[41;37m" && Font_color_suffix="\033[0m"

Info="${Green_font_prefix}[信息]${Font_color_suffix}"
Error="${Red_font_prefix}[错误]${Font_color_suffix}"
RETVAL=0

check_running(){
	PID="$(ps -C $NAME_BIN -o pid= |head -n1 |grep -o '[0-9]\{1,\}')"
	if [[ ! -z ${PID} ]]; then
		return 0
	else
		return 1
	fi
}
do_start(){
	check_running
	if [[ $? -eq 0 ]]; then
		echo -e "${Info} $NAME_BIN (PID ${PID}) 正在运行..." && exit 0
	else
		fusermount -zuq $LOCAL >/dev/null 2>&1
		mkdir -p $LOCAL
		sudo /usr/bin/rclone mount $NAME:$REMOTE $LOCAL --copy-links \
          --no-gzip-encoding --no-check-certificate --allow-other \
          --allow-non-empty --umask 000 >/dev/null 2>&1 &

		sleep 2s
		check_running
		if [[ $? -eq 0 ]]; then
			echo -e "${Info} $NAME_BIN 启动成功 !"
		else
			echo -e "${Error} $NAME_BIN 启动失败 !"
		fi
	fi
}
do_stop(){
	check_running
	if [[ $? -eq 0 ]]; then
		kill -9 ${PID}
		RETVAL=$?
		if [[ $RETVAL -eq 0 ]]; then
			echo -e "${Info} $NAME_BIN 停止成功 !"
		else
			echo -e "${Error} $NAME_BIN 停止失败 !"
		fi
	else
		echo -e "${Info} $NAME_BIN 未运行"
		RETVAL=1
	fi
	fusermount -zuq $LOCAL >/dev/null 2>&1
}
do_status(){
	check_running
	if [[ $? -eq 0 ]]; then
		echo -e "${Info} $NAME_BIN (PID $(echo ${PID})) 正在运行..."
	else
		echo -e "${Info} $NAME_BIN 未运行 !"
		RETVAL=1
	fi
}
do_restart(){
	do_stop
	do_start
}
case "$1" in
	start|stop|restart|status)
	do_$1
	;;
	*)
	echo "使用方法: $0 { start | stop | restart | status }"
	RETVAL=1
	;;
esac
exit $RETVAL
```

- 设置

```bash
# 移动文件
mv rcloned /etc/init.d/rcloned
# 授权
chmod +x /etc/init.d/rcloned
# 更新
update-rc.d -f rcloned defaults
# 执行
bash /etc/init.d/rcloned start
```

- **卸载**

```bash
fusermount -qzu LocalFolder
```

## `Rclone`

* [rclone配置](https://rclone.org/commands/rclone_config/)

* [全局参数](https://rclone.org/flags/)

* [https://softlns.github.io/2016/11/28/rclone-guide](https://softlns.github.io/2016/11/28/rclone-guide)

```bash
rclone config - 以控制会话的形式添加rclone的配置，配置保存在.rclone.conf文件中。
rclone mount - 将网盘挂载为本地磁盘
rclone copy - 将文件从源复制到目的地址，跳过已复制完成的。
rclone sync - 将源数据同步到目的地址，只更新目的地址的数据。–dry-run标志来检查要复制、删除的数据
rclone move - 将源数据移动到目的地址。
rclone delete - 删除指定路径下的文件内容。
rclone purge - 清空指定路径下所有文件数据。
rclone mkdir - 创建一个新目录。
rclone rmdir - 删除空目录。
rclone check - 检查源和目的地址数据是否匹配。
rclone ls - 列出指定路径下所有的文件以及文件大小和路径。
rclone lsd - 列出指定路径下所有的目录/容器/桶。
rclone lsl - 列出指定路径下所有文件以及修改时间、文件大小和路径。
rclone md5sum - 为指定路径下的所有文件产生一个md5sum文件。
rclone sha1sum - 为指定路径下的所有文件产生一个sha1sum文件。
rclone size - 获取指定路径下，文件内容的总大小。.
rclone version - 查看当前版本。
rclone cleanup - 清空remote。
rclone dedupe - 交互式查找重复文件，进行删除/重命名操作。
```

### `rclone mount`

* [rclone挂载](https://tip.rclone.org/commands/rclone_mount/)


- **挂载参数**

| 参数                                   	| 说明                                                                                                      	|
|----------------------------------------	|-----------------------------------------------------------------------------------------------------------	|
| --allow-non-empty                      	| 允许在非空目录上挂载。                                                                                    	|
| --allow-other                          	| 允许访问其他用户。                                                                                        	|
| --allow-root                           	| 允许访问root用户。                                                                                        	|
| --attr-timeout duration                	| 缓存文件/目录属性的时间。 （默认1秒）                                                                     	|
| --daemon                               	| 将mount作为守护程序运行（后台模式）。                                                                     	|
| --daemon-timeout duration              	| rclone响应内核的时间限制（并非所有操作系统都支持）。                                                      	|
| --debug-fuse                           	| 调试FUSE内部-需要-v。                                                                                     	|
| --default-permissions                  	| 使内核根据文件模式强制执行访问控制。                                                                      	|
| --dir-cache-time duration              	| 是时候缓存目录条目了。 （默认为5m0s）                                                                     	|
| --dir-perms FileMode                   	| 目录权限（默认0777）                                                                                      	|
| --file-perms FileMode                  	| 文件权限（默认0666）                                                                                      	|
| --fuse-flag stringArray                	| 直接传递给libfuse / WinFsp的标志或参数。如果需要，请重复。                                                	|
| --gid uint32                           	| 覆盖文件系统设置的gid字段。 （默认为1000）                                                                	|
| -h, --help                             	| 帮助安装                                                                                                  	|
| --max-read-ahead SizeSuffix            	| 可以为顺序读取预取的字节数。 （默认为128k）                                                               	|
| --no-checksum                          	| 不要比较下载/下载时的校验和。                                                                             	|
| --no-modtime                           	| 不要读/写修改时间（可以加快修改速度）。                                                                   	|
| --no-seek                              	| 不允许在文件中查找。                                                                                      	|
| -o, --option stringArray               	| libfuse / WinFsp的选项。如果需要，请重复。                                                                	|
| --poll-interval duration               	| 等待两次轮询更改之间的时间。必须小于dir-cache-time。仅在受支持的遥控器上。设置为0禁用。 （默认为1m0s）    	|
| --read-only                            	| 挂载为只读。                                                                                              	|
| --uid uint32                           	| 覆盖文件系统设置的uid字段。 （默认为1000）                                                                	|
| --umask int                            	| 覆盖文件系统设置的权限位。                                                                                	|
| --vfs-cache-max-age duration           	| 缓存中对象的最长期限。 （默认为1h0m0s）                                                                   	|
| --vfs-cache-max-size SizeSuffix        	| 缓存中对象的最大总大小。 （默认关闭）                                                                     	|
| --vfs-cache-mode CacheMode             	| 缓存模式 关闭(off)|最小(minimal)|写入(writes)|完全(full)（默认关闭）                                          |
| --vfs-cache-poll-interval duration     	| 轮询缓存以查找陈旧对象的时间间隔。 （默认为1m0s）                                                         	|
| --vfs-read-chunk-size SizeSuffix       	| 逐块读取源对象。 （默认为128M）                                                                           	|
| --vfs-read-chunk-size-limit SizeSuffix 	| 如果大于--vfs-read-chunk-size，则在每次读取块后将块大小加倍，直到达到限制。 “关闭”是无限的。 （默认关闭） 	|
| --volname string                       	| 设置卷名（并非所有操作系统都支持）。                                                                      	|
| --write-back-cache                     	| 使内核缓冲区写入，然后再将其发送到rclone。否则，将使用直写式缓存。                                        	|




### `rclone copy`

> 将文件从源复制到目的地址，跳过已复制完成的。命令格式如下：
```bash
rclone copy source:sourcepath dest:destpsth
```

- 注：

> 1、`rclone copy` 复制总是指定路径下的数据；而不是当前目录。
>
> 2、`–no-traverse` 标志用于控制是否列出目的地址目录。

### `rclone sync`

```bash
rclone sync source:path dest:path
```

- 注：

> 1、同步数据时，可能会删除目的地址的数据；建议先使用–dry-run标志来检查要复制、删除的数据。
>
> 2、同步数据出错时，不会删除任何目的地址的数据。
>
> 3、`rclone sync`同步的始终是path目录下的数据，而不是path目录。（空目录将不会被同步）

### `rclone move`

```bash
rclone move source:path dest:path
```

- 注：

> 1、同步数据时，可能会删除目的地址的数据；建议先使用–dry-run标志来检查要复制、删除的数据。

### `rclone purge`

> 清空path目录和数据。命令格式如下：

```bash
rclone purge remote:path
```

- 注：

> 1、此命令，`include/exclude`过滤器失效。
>
> 2、删除path目录下部分数据，请使用`rclone delete`命令

### `rclone mkdir`

- 创建path目录

```bash
rclone mkdir remote:path
```

### `rclone rmdir`

> 删除一个空目录。命令格式如下：

```bash
rclone rmdir remote:path
```

- 注：

> 1、不能删除非空的目录，删除非空目录请使用`rclone purge`

### `rclone check`

> 检查源和目标地址文件是否匹配。命令格式如下：

```bash
rclone check source:path dest:path
```

- 注：

> 1、`–size-only`标志用于指定，只比较大小，不比较MD5SUMs。

### `rclone ls`

> 列出指定path下，所有的文件以及文件大小和路径。命令格式如下：

```bash
rclone ls remote:path
```

### `rclone lsd`

> 列出指定path下，所有目录、容器、桶。命令格式如下：

```bash
rclone lsd remote:path
```

### `rclone delete`

> 删除指定目录的内容。命令格式如下：

```bash
rclone delete remote:path
```

- 注：

> 1、不同于`rclone purge`、`rclone delete`可使用`include/exclude`过滤器选择删除文件内容。
>
> `eg` 删除文件大小大于100M的文件

```bash
# 先检查哪些文件将被删除
# 使用rclone lsl 列出大于100M的文件
rclone --min-size 100M lsl remote:path
# 使用--dry-run 检查将要被删除的文件
rclone --dry-run --min-size 100M delete remote:path
	
# 使用 rclone delete 进行文件删除
rclone --min-size 100M delete remote:path
```

### `rclone size`

> 获取指定path下所有数据文件的总大小。命令格式如下：

```bash
rclone size remote:path
```
