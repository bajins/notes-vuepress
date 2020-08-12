#!/usr/bin/env python
# -*- encoding: utf-8 -*-
# @Author : bajins https://www.bajins.com
# @File : rclone_expect_config.py
# @Version: 1.1.0
# @Time : 2020/7/26 11:00
# @Project: tool-gui-python
# @Package:
# @Software: PyCharm

import json
# 如果import urllib，则在使用urllib.request时会报错
import urllib.request
import subprocess
import os
import time
import sys
# 自动执行命令，pip install pexpect
import pexpect


def daemon():
    """
    Daemon（守护进程）
    :return:
    """
    # 将当前进程fork为一个守护进程
    pid = os.fork()
    if pid > 0:
        # 父进程退出
        os._exit(0)


# 判断系统架构位数
if sys.maxsize > 2 ** 32:
    maxbit = "linux-amd64.zip"
else:
    maxbit = "linux-386.zip"

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
# 请求GitHub api
req = urllib.request.Request("https://api.github.com/repos/rclone/rclone/releases/latest",
                             headers={"User-Agent": USER_AGENT}, method='GET')
res = urllib.request.urlopen(req, timeout=30)
# 获取到GitHub返回的release详情
res_json = json.loads(res.read().decode("utf-8"))
for asset in res_json["assets"]:
    # 如果系统架构在当前name中
    if maxbit in asset["name"]:
        # 获取当前系统架构的下载链接
        download_url = asset["browser_download_url"]
        # rclone压缩包名
        zip_name = asset["name"]
        # 删除同名压缩包
        os.system(f"find . -type f -name '{zip_name}*' | xargs rm")
        # 解压后目录名
        dir_name = zip_name.replace(".zip", "")
        # 删除同名目录，防止目录中的文件已被删除
        os.system(f"rm -rf {dir_name}")
        # 下载当前系统架构的文件
        subprocess.call(['wget', download_url])
        # 解压
        subprocess.call(['unzip', zip_name])
        break


def run_cmd(cmd, charset="utf8"):
    """
    执行shell命令并实时输出回显
    :param cmd: 执行的命令
    :param charset: 字符集
    :return:
    """
    # universal_newlines=True, bufsize=1
    process = subprocess.Popen(cmd, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    # 判断子进程是否结束
    while process.poll() is None:
        line = process.stdout.readline()
        line = line.strip()
        if line:
            print(line.decode(charset, 'ignore'))


def one_drive(drive_name, access_token=None):
    """
    One Drive 配置
    :param drive_name:  自定义远程配置名称
    :param access_token:  授权token，为执行 rclone authorize "onedrive" 获取到的token
    :return:
    """
    child = pexpect.spawn(f'./{dir_name}/rclone config')
    # print(child)
    # 如果返回0说明匹配到了异常
    index = child.expect([pexpect.EOF, 'New remote'])
    if index == 1:
        # n新建远程
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'name'])
    if index == 1:
        child.sendline(drive_name)

    try:
        index = child.expect([pexpect.EOF, 'already exists'])
        if index == 1:
            print("该远程配置已经存在：", drive_name)
            time.sleep(5)
            return None
    except:
        pass

    index = child.expect([pexpect.EOF, 'Storage'])
    if index == 1:
        # Microsoft OneDrive:23 , Google Drive:13
        child.sendline('23')

    index = child.expect([pexpect.EOF, 'client_id'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'client_secret'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'Edit advanced config'])
    if index == 1:
        # 是否配置高级设置，这里我们直接No，选择n
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'Use auto config'])
    if index == 1:
        # 是否使用自动设置，同样直接NO，选择n
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'result'])
    if index == 1:
        # 如果传入的授权为空，就在文件中获取
        if access_token is None:
            # 创建空文件，把授权后的代码保存到此文件中第一行
            # echo 授权代码 >one_drive_access_token.txt
            os.mknod("one_drive_access_token.txt")
            # 等待用户操作时间，秒为单位
            time.sleep(240)
            # 读取文件中第一行内容
            with open("one_drive_access_token.txt", "r")as f:
                access_token = f.readlines()
            if access_token == "":
                raise Exception("读取到授权文件为空，如果操作时间过长，请调整time.sleep")
        # 这里输入在Windows下CMD中获取的access_token
        child.sendline(access_token)

    index = child.expect([pexpect.EOF, 'Your choice'])
    if index == 1:
        # 这里选择1，onedrive个人版或是商业版
        child.sendline('1')

    index = child.expect([pexpect.EOF, 'Chose drive to use'])
    if index == 1:
        # 提示找到一个驱动器，输入找到的序号0
        child.sendline('0')

    index = child.expect([pexpect.EOF, "Found drive 'root' of type 'business'"])
    if index == 1:
        # 找到类型为“business”的驱动器 "root"，输入y
        child.sendline('y')

    index = child.expect([pexpect.EOF, 'Yes this is OK'])
    if index == 1:
        # 确认配置
        child.sendline('y')

    index = child.expect([pexpect.EOF, 'Quit config'])
    if index == 1:
        # 输入q，退出配置；n新建；d删除；r重命名；c复制；s设置密码
        child.sendline('q')
    #     print(subprocess.getoutput(f'./{dir_name}/rclone config show'))
    time.sleep(5)


def google_drive(drive_name):
    """
    Google Drive 远程配置
    :param drive_name: 自定义远程配置名称
    :return:
    """
    child = pexpect.spawn(f'./{dir_name}/rclone config')
    # print(child)
    # 如果返回0说明匹配到了异常
    index = child.expect([pexpect.EOF, 'New remote'])
    if index == 1:
        # n新建远程
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'name'])
    if index == 1:
        child.sendline(drive_name)

    try:
        index = child.expect([pexpect.EOF, 'already exists'])
        if index == 1:
            print("该远程配置已经存在：", drive_name)
            time.sleep(5)
            return None
    except:
        pass

    index = child.expect([pexpect.EOF, 'Storage'])
    if index == 1:
        # Microsoft OneDrive:23 , Google Drive:13
        child.sendline('13')

    index = child.expect([pexpect.EOF, 'client_id'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'client_secret'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'scope'])
    if index == 1:
        child.sendline('1')

    index = child.expect([pexpect.EOF, 'root_folder_id'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'service_account_file'])
    if index == 1:
        child.sendline('')

    index = child.expect([pexpect.EOF, 'Edit advanced config'])
    if index == 1:
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'Use auto config'])
    if index == 1:
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'Enter verification code'])
    print(child.before)
    if index == 1:
        # 创建空文件，把授权后的代码保存到此文件中第一行
        # echo 授权代码 >google_drive_verification_code.txt
        os.mknod("google_drive_verification_code.txt")
        # 等待用户操作时间，秒为单位
        time.sleep(120)
        # 读取文件中第一行内容
        with open("google_drive_verification_code.txt", "r")as f:
            google_drive_verification_code = f.readlines()
        if google_drive_verification_code == "":
            raise Exception("读取到授权文件为空，如果操作时间过长，请调整time.sleep")
        child.sendline(google_drive_verification_code)

    index = child.expect([pexpect.EOF, 'Configure this as a team drive'])
    if index == 1:
        child.sendline('n')

    index = child.expect([pexpect.EOF, 'Yes this is OK'])
    if index == 1:
        child.sendline('y')

    index = child.expect([pexpect.EOF, 'Quit config'])
    if index == 1:
        # 输入q，退出配置；n新建；d删除；r重命名；c复制；s设置密码
        child.sendline('q')
    #     print(subprocess.getoutput(f'./{dir_name}/rclone config show'))
    time.sleep(5)


def write_google_drive_config(name, token, drive_type="drive", scope="drive"):
    """
    此函数是为了方便写入在其他地方已经授权复制过来的Google Drive配置，而不需要重新创建配置
    :param name: 自定义远程配置名称
    :param token: 授权token
    :param drive_type: drive类型，一般默认即可
    :param scope: 一般默认即可
    :return:
    """
    import configparser
    conf = configparser.ConfigParser()
    # 获取rclone配置文件的路径
    file = subprocess.getoutput(f"./{dir_name}/rclone config file")
    file = file.split("\n")[1]
    # 读取配置
    conf.read(file, encoding="utf-8")
    # 获取配置中的远程节点
    node_array = conf.sections()
    # 如果远程节点不存在
    if name not in node_array:
        # 添加远程节点
        conf.add_section(name)
        conf.set(name, 'type', drive_type)
        conf.set(name, 'scope', scope)
        conf.set(name, 'token', token)
        with open(file, 'w') as f:
            conf.write(f)


"""
以下为执行rclone自动配置
"""

one_drive_access_token = """授权"""
one_drive("onedrive", one_drive_access_token)

google_drive_token = """授权"""
write_google_drive_config("gdrive", google_drive_token)

print(subprocess.getoutput(f'./{dir_name}/rclone config show'))

"""
以下为执行rclone命令，执行命令不输出回显可在执行命令前加上nohup命令或调用daemon函数
"""

params = " --multi-thread-cutoff 50M --multi-thread-streams 50 --transfers 1000 --checkers 1000 --buffer-size 80M"
params += "--cache-chunk-size 50M --tpslimit-burst 2 --ignore-errors -P"

# 同步
run_cmd(f'./{dir_name}/rclone sync gdrive:/ onedrive:/ {params}')

# 去重
run_cmd(f'./{dir_name}/rclone dedupe --dedupe-mode oldest gdrive:/ {params}')
