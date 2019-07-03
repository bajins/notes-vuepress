#!/bin/bash
type=ext4
mount_dir=/c
mkfs.$type /dev/vdb 
mkdir -p $mount_dir
echo "/dev/vdb $mount_dir $type defaults 0 0" >> /etc/fstab
mount -a
