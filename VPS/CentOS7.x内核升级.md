检查当前 CentOS 系统版本
cat /etc/redhat-release

检查当前 CentOS 系统内核版本
uname -sr

运行yum命令升级,CentOS中update命令可以一次性更新所有软件(包括系统版本)到最新版本。
先清除所有
yum clean all
再升级
yum update

在 CentOS 7.x 上启用 ELRepo 仓库
首先导入elrepo的key
rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
安装elrepo的yum
rpm -Uvh http://www.elrepo.org/elrepo-release-7.0-2.el7.elrepo.noarch.rpm

仓库启用后，你可以使用下面的命令列出可用的系统内核相关包，查看内核相关包
yum --disablerepo="*" --enablerepo="elrepo-kernel" list available

接下来，安装最新的主线稳定内核
yum --enablerepo=elrepo-kernel install kernel-ml
或者以下命令安装最新的主线稳定内核
yum -y --enablerepo=elrepo-kernel install kernel-ml.x86_64 kernel-ml-devel.x86_64

查看可用内核
cat /boot/grub2/grub.cfg |grep menuentry 

设置内核启动项,替换刚刚查看出来的内核名字执行，比如：grub2-set-default 'CentOS Linux (4.15.13-1.el7.elrepo.x86_64) 7 (Core)'
grub2-set-default '内核名字'

查看内核启动项是否设置成功查看内核启动项是否设置成功
grub2-editenv list

查看内核的启动项
grub2-editenv list


重启机器
reboot

检查当前 CentOS 系统内核版本
uname -sr


查看多余的内核
rpm -qa | grep kernel

删除多余的内核
yum remove 内核名字
