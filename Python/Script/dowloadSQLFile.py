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
import sqlite3

print("==============================================================")
# if len(sys.argv) < 6:
#     # print("请输入参数！")
#     quit()

print("执行脚本名：", sys.argv[0])
print(":::::::::::::::执行开始时间：" +
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "::::::::::::::")

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
parser.add_argument('--dbPassword', '-pwd', type=str,
                    default=None, help='请输入数据库密码')
parser.add_argument('--dbDatabase', '-db', type=str,
                    default=None, help='请输入数据库名')
parser.add_argument('--dbChart', '-chart', type=str,
                    default='UTF8', help='请输入数据库字符编码')
parser.add_argument('--dbTable', '-table', type=str,
                    default=None, help='请输入数据库查询表')
parser.add_argument('--tableLimitStart', '-start', type=int,
                    default=None, help='请输入数据库查询表数据从第几条记录开始')
parser.add_argument('--tableLimitEnd', '-end', type=int,
                    default=1000, help='请输入数据库查询表数据读取几条记录')
parser.add_argument('--fileMkdir', '-mkdir', type=str,
                    default=None, help='请输入文件保存地址')
args = parser.parse_args()
dbHost = args.dbHost
dbPort = args.dbPort
dbUser = args.dbUser
dbPassword = args.dbPassword
dbDatabase = args.dbDatabase
dbChart = args.dbChart
dbTable = args.dbTable
tableLimitStart = args.tableLimitStart
tableLimitEnd = args.tableLimitEnd
fileMkdir = args.fileMkdir


# 判断第三方模块是否已安装，若没有安装则执行pip install 命令安装该模块
def detectionModule(module):
    try:
        import module
        print('已检测到' + module + '模块')
    except ImportError:
        print('检测到未安装' + module + '模块,现在开始安装......')
        os.system('pip install ' + module +
                  ' -i https://pypi.tuna.tsinghua.edu.cn/simple')


# 用cursor.execute获取Mysql数据库数据
def getMysqlData(host, port, user, password, db, charset, sql):
    # 创建连接
    con = pymysql.connect(
        host=host, port=port, user=user, password=password, db=db, charset=charset)
    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = con.cursor()
    df = ""
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
    # 关闭数据库连接
    con.close()
    cursor.close()

    return df


# 用cursor.execute分页查询Mysql数据库数据
def getMysqlDataLimit(host, port, user, password, db, charset, table, start, end):
    sql = "select * from " + table + " order by id limit " + str(start) + "," + str(end)
    return getMysqlData(host, port, user, password, db, charset, sql)


# 用pandas库的read_sql获取Mysql数据库数据
def getMysqlReadSqlData(host, port, user, password, db, charset, sql):
    # detectionModule("pandas")
    # 创建连接
    con = pymysql.connect(
        host=host, port=port, user=user, password=password, db=db, charset=charset)
    df = pd.read_sql(sql, con)
    return df


# 用pandas库的read_sql分页查询Mysql数据库数据
def getMysqlReadSqlDataLimit(host, port, user, password, db, charset, table, start, end):
    sql = "select * from " + table + " order by id limit " + str(start) + "," + str(end)
    return getMysqlReadSqlData(host, port, user, password, db, charset, sql)


# 用requests下载文件
def dowloadFile(url, mkdir, name):
    # detectionModule("requests")
    # 判断文件名称是否传入
    if name.strip() == '':
        ur = str(url).split("/")
        # 如果没传，就取URL中最后的文件名
        name = ur[len(ur) - 1]

    # 判断是否传入文件夹
    if mkdir.strip() != '':
        # 判断目录是否存在
        if not os.path.exists(mkdir):
            # 目录不存在则创建
            os.mkdir(mkdir)
        name = mkdir + name
    # 判断文件是否存在
    if not os.path.isfile(name):
        # 文件不存在才保存
        r = requests.get(url)
        with open(name, "wb") as code:
            code.write(r.content)


# 用urllib批量下载文件
def dowloadFileList(urls, mkdir, name):
    for url in urls:
        # 判断文件名称是否传入
        if name.strip() == '':
            ur = str(url).split("/")
            # 如果没传，就取URL中最后的文件名
            name = ur[len(ur) - 1]
        # 判断是否传入文件夹
        if mkdir.strip() != '':
            # 判断目录是否存在
            if not os.path.exists(mkdir):
                # 目录不存在则创建
                os.mkdir(mkdir)
            name = mkdir + name
        # os.path.join将多个路径组合后返回
        # LocalPath = os.path.join('C:/Users/goatbishop/Desktop',file)
        # 第一个参数url:需要下载的网络资源的URL地址
        # 第二个参数LocalPath:文件下载到本地后的路径
        urllib.request.urlretrieve(url, name)
        # response = urllib.request.urlopen(url)
        # pic = response.read()
        # with open(name, 'wb') as f:
        #     f.write(pic)


# 创建sqlite3数据库
def createSqlite3DB(db, sql):
    conn = sqlite3.connect(db + '.db')
    c = conn.cursor()
    c.execute(sql)
    # print("创建Sqlite3数据库表成功")
    conn.commit()
    conn.close()


# 插入数据到sqlite3数据库
def insertSqlite3DB(db, sql):
    conn = sqlite3.connect(db + ".db")
    c = conn.cursor()
    c.execute(sql)
    conn.commit()
    # print("Sqlite3保存数据成功")
    conn.close()


# 查询sqlite3数据库数据并返回
def selectSqlite3BD(db, sql):
    try:
        conn = sqlite3.connect(db + '.db')
        c = conn.cursor()
        cursor = c.execute(sql)
        data = cursor.fetchall()
        # print("Sqlite3查询数据成功")
        conn.close()
        return data
    except Exception as e:
        print("查询Sqlite3数据库出现异常：" + str(e))
        return []


# dowloadFileList(result,fileMkdir,"")

# print(result)
# for d in result:
#     if d == "path":
#         continue


image = selectSqlite3BD(dbDatabase, "SELECT id, db_id from " + dbTable + " order by id desc limit 1")
if len(image) <= 0:
    createSqlite3DB(dbDatabase, "CREATE TABLE " + dbTable + " (id INTEGER PRIMARY KEY NOT NULL,db_id TEXT NOT NULL)")
else:
    startId = image[len(image) - 1][0]
    print("查询到Sqlite3数据库表中最大ID：", startId)
    tableLimitStart = startId

# 查询出MySQL中的数据
result = getMysqlDataLimit(dbHost, dbPort, dbUser, dbPassword,
                           dbDatabase, dbChart, dbTable, tableLimitStart, tableLimitEnd)

# 定义Sqlite3表ID
i = 0
if len(image) > 0:
    i = startId
# 循环所有数据
for d in result:
    image_id = str(d[0])
    url = str(d[3])
    dowloadFile(url, fileMkdir, "")
    i = i + 1
    # image = selectSqlite3BD(dbDatabase, "SELECT id, db_id from "+dbTable+" where id='" + str(i) + "'")
    # if len(image) <= 0:
    #  OR IGNORE 防止插入重复数据
    insertSqlite3DB(dbDatabase,
                    "INSERT OR IGNORE INTO " + dbTable + " (id,db_id) VALUES (" + str(i) + "," + image_id + ")")

image = selectSqlite3BD(dbDatabase, "SELECT count(*) from " + dbTable)
print("执行完成后最终数据库数据条数：", image[0][0])

print(":::::::::::::::执行完成时间：" +
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "::::::::::::::")
