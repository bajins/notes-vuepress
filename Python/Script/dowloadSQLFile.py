#!/usr/bin/python3
# -*- coding: UTF-8 -*-
# 执行脚本前请先执行以下命令
# pip install pandas -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
# pip install requests -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
# pip install pymysql


import pymysql
import pandas as pd
import requests
import urllib
import os
import sys
import datetime
import argparse

print("==========================================================")
# if len(sys.argv) < 6:
#     # print("请输入参数！")
#     quit()

print("执行脚本名：", sys.argv[0])
print(":::::::::::::::执行开始时间：" +
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+"::::::::::::::")

# dbHost=input("请输入数据库IP地址：")
# dbPort=input("请输入数据库端口：")
# dbUser=input("请输入数据库用户名：")
# dbPasswd=input("请输入数据库密码：")
# dbDatabase=input("请输入数据库名：")
# dbChart=input("请输入数据库字符编码：")
# dbSQL=input("请输入数据库查询SQL：")

parser = argparse.ArgumentParser(description='manual to this script')
parser.add_argument('--dbHost', '-host', type=str,
                    default='localhost', help='请输入数据库IP地址')
parser.add_argument('--dbPort', '-port', type=int,
                    default=3306, help='请输入数据库端口')
parser.add_argument('--dbUser', '-user', type=str,
                    default='root', help='请输入数据库用户名')
parser.add_argument('--dbPasswd', '-pwd', type=str,
                    default=None, help='请输入数据库密码')
parser.add_argument('--dbDatabase', '-db', type=str,
                    default=None, help='请输入数据库名')
parser.add_argument('--dbChart', '-chart', type=str,
                    default='UTF8', help='请输入数据库字符编码')
parser.add_argument('--dbSQL', '-sql', type=str,
                    default=None, help='请输入数据库查询SQL')
parser.add_argument('--fileMkdir', '-mkdir', type=str,
                    default=None, help='请输入文件保存地址')
args = parser.parse_args()
dbHost = args.dbHost
dbPort = args.dbPort
dbUser = args.dbUser
dbPasswd = args.dbPasswd
dbDatabase = args.dbDatabase
dbChart = args.dbChart
dbSQL = args.dbSQL
fileMkdir = args.fileMkdir


# 判断第三方模块是否已安装，若没有安装则执行pip install 命令安装该模块
def detectionModule(module):
    try:
        import module
        print('已检测到'+module+'模块')
    except ImportError:
        print('检测到未安装'+module+'模块,现在开始安装......')
        os.system('pip install '+module +
                  ' -i https://pypi.tuna.tsinghua.edu.cn/simple')


# 用cursor.execute获取数据库数据
def getData(host, port, user, passwd, db, charset, sql):
    # 创建连接
    con = pymysql.connect(
        host=host, port=port, user=user, passwd=passwd, db=db, charset=charset)
    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = con.cursor()
    df = ""
    try:
        # 使用 execute()  方法执行 SQL 查询
        cursor.execute(sql)

        # 使用 fetchone() 方法获取单条数据.
        # data = cursor.fetchone()

        # 获取所有数据
        data = cursor.fetchall()
        df = data
        # 执行结果转化为dataframe
        # df = pd.DataFrame(list(data))

        # 循环所有数据
        # for d in data:
        #     path=str(d[3])
        #     print(path)

    except:
        print("Error: unable to fecth data")

    # 关闭数据库连接
    con.close()
    cursor.close()

    return df


# 用pandas库的read_sql获取数据库数据
def getReadSqlData(host, port, user, passwd, db, charset, sql):
    # detectionModule("pandas")
    # 创建连接
    con = pymysql.connect(
        host=host, port=port, user=user, passwd=passwd, db=db, charset=charset)
    df = pd.read_sql(sql, con)
    return df


# 用requests下载文件
def dowloadFile(url, mkdir, name):
    # detectionModule("requests")
    # 判断文件名称是否传入
    if name.strip() == '':
        ur = str(url).split("/")
        # 如果没传，就取URL中最后的文件名
        name = ur[len(ur)-1]

    # 判断是否传入文件夹
    if mkdir.strip() != '':
        # 判断目录是否存在
        if not os.path.exists(mkdir):
            # 目录不存在则创建
            os.mkdir(mkdir)
        name = mkdir+name
    # 判断文件是否存在
    if not os.path.isfile(name):
        # 文件不存在才保存
        r = requests.get(url)
        with open(name, "wb") as code:
            code.write(r.content)


def dowloadFileList(urls, mkdir, name):
    for url in urls:
        # 判断文件名称是否传入
        if name.strip() == '':
            ur = str(url).split("/")
            # 如果没传，就取URL中最后的文件名
            name = ur[len(ur)-1]
        # 判断是否传入文件夹
        if mkdir.strip() != '':
            # 判断目录是否存在
            if not os.path.exists(mkdir):
                # 目录不存在则创建
                os.mkdir(mkdir)
            name = mkdir+name
        #os.path.join将多个路径组合后返回
        # LocalPath = os.path.join('C:/Users/goatbishop/Desktop',file)
        #第一个参数url:需要下载的网络资源的URL地址
        #第二个参数LocalPath:文件下载到本地后的路径
        urllib.request.urlretrieve(url,name)
        # response = urllib.request.urlopen(url)
        # pic = response.read()
        # with open(name, 'wb') as f:
        #     f.write(pic)



result = getData(dbHost, dbPort, dbUser, dbPasswd,
                 dbDatabase, dbChart, dbSQL)

# dowloadFileList(result,fileMkdir,"")

# print(result)
# for d in result:
#     if d == "path":
#         continue

# 循环所有数据
for d in result:
    url = str(d[3])
    dowloadFile(url, fileMkdir, "")


print(":::::::::::::::执行完成时间：" +
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+"::::::::::::::")
