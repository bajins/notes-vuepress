#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# @Author : bajins www.bajins.com
# @File : rclone_expect_config.py
# @Version: 1.0.0
# @Time : 2020/7/26 11:00
# @Project: tool-gui-python
# @Package: 
# @Software: PyCharm

import subprocess
import os,time


# one_drive_access_token = """授权"""

# 删除原有压缩包
# os.system("find . -type f -name 'rclone*zip' | xargs rm")
if not os.path.exists("rclone-v1.52.2-linux-amd64"):
    returncode = subprocess.call(['wget','https://downloads.rclone.org/v1.52.2/rclone-v1.52.2-linux-amd64.zip'])
    if returncode == 0 :
        subprocess.call(['unzip','rclone-v1.52.2-linux-amd64.zip'])

def write_google_drive_config():
    """
    此函数是为了方便写入在其他地方复制过来的GoogleDrive配置，而不需要重新创建配置
    """
    google_drive_conf="""
[gdrive]
type = drive
scope = drive
token = 授权
"""
    file = subprocess.getoutput("./rclone-v1.52.2-linux-amd64/rclone config file")
    file = file.split("\n")[1]
    with open(file,"r")as f:
        old_conf = f.read()
    with open(file,"w+")as f:
        f.write(old_conf+"\n"+google_drive_conf)


# 在本机执行命令，并输出命令执行结果
import pexpect

child = pexpect.spawn('./rclone-v1.52.2-linux-amd64/rclone config')
# print(child)
# 如果返回0说明匹配到了异常
index=child.expect([pexpect.EOF,'New remote'])
if index == 1:
    # n新建远程
    child.sendline('n')


def one_drive(child,drive_name):
    """
    OneDrive配置
    """
    index=child.expect([pexpect.EOF,'name'])
    if index == 1:
        child.sendline(drive_name)

    try:
        index=child.expect([pexpect.EOF,'already exists'])
        if index == 1:
            print("该远程配置已经存在")
            print(subprocess.getoutput('./rclone-v1.52.2-linux-amd64/rclone config show'))
            time.sleep(3)
            os._exit(0)
    except:
        pass
    
    index=child.expect([pexpect.EOF,'Storage'])
    if index == 1:
        # Microsoft OneDrive:23 , Google Drive:13
        child.sendline('23')

    index=child.expect([pexpect.EOF,'client_id'])
    if index == 1:
        child.sendline('')

    index=child.expect([pexpect.EOF,'client_secret'])
    if index == 1:
        child.sendline('')

    index=child.expect([pexpect.EOF,'Edit advanced config'])
    if index == 1:
        # 是否配置高级设置，这里我们直接No，选择n
        child.sendline('n')

    index=child.expect([pexpect.EOF,'Use auto config'])
    if index == 1:
        # 是否使用自动设置，同样直接NO，选择n
        child.sendline('n')

    index=child.expect([pexpect.EOF,'result'])
    if index == 1:
        # 创建空文件，把授权后的代码保存到此文件中第一行
        # echo 授权代码 >one_drive_access_token.txt
        os.mknod("one_drive_access_token.txt")
        # 等待用户操作时间，秒为单位
        time.sleep(240)
        # 读取文件中第一行内容
        with open("one_drive_access_token.txt","r")as f:
            one_drive_access_token = f.readlines()
        if one_drive_access_token == "":
            raise Exception("读取到授权文件为空，如果操作时间过长，请调整time.sleep")
        # 如果不想使用单独的文件，可以注释上面几行，并取消注释顶部的one_drive_access_token="""授权"""
        # 这里输入在Windows下CMD中获取的access_token
        child.sendline(one_drive_access_token)

    index=child.expect([pexpect.EOF,'Your choice'])
    if index == 1:
        # 这里选择1，onedrive个人版或是商业版
        child.sendline('1')

    index=child.expect([pexpect.EOF,'Chose drive to use'])
    if index == 1:
        # 提示找到一个驱动器，输入找到的序号0
        child.sendline('0')

    index=child.expect([pexpect.EOF,"Found drive 'root' of type 'business'"])
    if index == 1:
        # 找到类型为“business”的驱动器 "root"，输入y
        child.sendline('y')

    index=child.expect([pexpect.EOF,'Yes this is OK'])
    if index == 1:
        # 确认配置
        child.sendline('y')

    index=child.expect([pexpect.EOF,'Quit config'])
    if index == 1:
        # 输入q，退出配置；n新建；d删除；r重命名；c复制；s设置密码
        child.sendline('q')
    print(subprocess.getoutput('./rclone-v1.52.2-linux-amd64/rclone config show'))


def google_drive(child,drive_name):
    """
    GoogleDrive配置
    """
    index=child.expect([pexpect.EOF,'name'])
    if index == 1:
        child.sendline(drive_name)

    try:
        index=child.expect([pexpect.EOF,'already exists'])
        if index == 1:
            print("该远程配置已经存在")
            print(subprocess.getoutput('./rclone-v1.52.2-linux-amd64/rclone config show'))
            time.sleep(3)
            os._exit(0)
    except:
        pass
    
    index=child.expect([pexpect.EOF,'Storage'])
    if index == 1:
        # Microsoft OneDrive:23 , Google Drive:13
        child.sendline('13')
    
    index=child.expect([pexpect.EOF,'client_id'])
    if index == 1:
        child.sendline('')
    
    index=child.expect([pexpect.EOF,'client_secret'])
    if index == 1:
        child.sendline('')
    
    index=child.expect([pexpect.EOF,'scope'])
    if index == 1:
        child.sendline('1')

    index=child.expect([pexpect.EOF,'root_folder_id'])
    if index == 1:
        child.sendline('')
    
    index=child.expect([pexpect.EOF,'service_account_file'])
    if index == 1:
        child.sendline('')

    index=child.expect([pexpect.EOF,'Edit advanced config'])
    if index == 1:
        child.sendline('n')

    index=child.expect([pexpect.EOF,'Use auto config'])
    if index == 1:
        child.sendline('n')
    
    index=child.expect([pexpect.EOF,'Enter verification code'])
    print(child.before)
    if index == 1:
        # 创建空文件，把授权后的代码保存到此文件中第一行
        # echo 授权代码 >google_drive_verification_code.txt
        os.mknod("google_drive_verification_code.txt")
        # 等待用户操作时间，秒为单位
        time.sleep(120)
        # 读取文件中第一行内容
        with open("google_drive_verification_code.txt","r")as f:
            google_drive_verification_code = f.readlines()
        if google_drive_verification_code == "":
            raise Exception("读取到授权文件为空，如果操作时间过长，请调整time.sleep")
        child.sendline(google_drive_verification_code)
    
    index=child.expect([pexpect.EOF,'Configure this as a team drive'])
    if index == 1:
        child.sendline('n')

    index=child.expect([pexpect.EOF,'Yes this is OK'])
    if index == 1:
        child.sendline('y')

    index=child.expect([pexpect.EOF,'Quit config'])
    if index == 1:
        # 输入q，退出配置；n新建；d删除；r重命名；c复制；s设置密码
        child.sendline('q')
    print(subprocess.getoutput('./rclone-v1.52.2-linux-amd64/rclone config show'))

one_drive(child,"onedrive")