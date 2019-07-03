#!/usr/bin/python3
# -*- coding: UTF-8 -*-
# 执行脚本前请先执行以下命令
# pip3 install pandas -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
# pip3 install requests -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
# pip3 install pymysql

# global适用于函数内部修改全局变量的值
# nonlocal关键字用来在函数或其他作用域中使用外层(非全局)变量
# 如果不使用关键字，对全局变量或者外部变量进行修改，python会默认将全局变量隐藏起来

import os
import sys
import threading
import argparse
import datetime
import sqlite3

# 判断第三方模块是否已安装，若没有安装则执行pip install 命令安装该模块
def installModule(module):
    print('检测到未安装' + module + '模块,现在开始安装......')
    os.system('pip3 install ' + module +
              ' -i https://pypi.tuna.tsinghua.edu.cn/simple')

try:
    import urllib3
except ImportError as e:
    module = str(e).split("'")[1]
    if module == 'urllib3':
        installModule(module)

try:
    import pymysql
except ImportError as e:
    module = str(e).split("'")[1]
    if module == 'pymysql':
        installModule(module)

try:
    import pandas
except ImportError as e:
    module = str(e).split("'")[1]
    if module == 'pandas':
        installModule(module)

try:
    import requests
except ImportError as e:
    module = str(e).split("'")[1]
    if module == 'requests':
        installModule(module)

try:
    import urllib
except ImportError as e:
    module = str(e).split("'")[1]
    if module == 'urllib':
        installModule(module)
        

import urllib3
import pymysql
import pandas
import requests
import urllib


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
# 将path转换成规范的文件路径
fileMkdir = os.path.normpath(args.fileMkdir)+os.sep
sqlite3Database = fileMkdir+dbDatabase

# 判断目录是否存在
if not os.path.exists(fileMkdir):
    # 目录不存在则创建
    os.mkdir(fileMkdir)


# 拆分驱动器和文件路径，并以元组返回结果；主要针对win有效，Linux元组第一个总是空。
# print(os.path.splitdrive(fileMkdir))

# 判断返回path的目录路径，就是os.path.split(path)的第一个元素。是否存在，如果存在返回True
# if not os.path.exists(os.path.dirname(fileMkdir)):
#     print("请确认填写的路径盘符是否正确！！！")
#     sys.exit(0)


# 老版本去除警告方法
# from requests.packages.urllib3.exceptions import InsecureRequestWarning
# requests.packages.disable_warnings(InsecureRequestWarning)

# 新版去除警告方法
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
requests.adapters.DEFAULT_RETRIES = 5
s = requests.session()
s.keep_alive = False
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36"
}




# 用cursor.execute获取Mysql数据库数据
def getMysqlData(host, port, user, password, db, charset, sql):
    try:
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
        # df = pandas.DataFrame(list(data))

        # 循环所有数据
        # for d in data:
        #     path=str(d[3])
        #     print(path)
        # 关闭数据库连接
        con.close()
        cursor.close()
        return df
    except Exception as e:
        print("MySQL查询错误：", e)
        sys.exit(0)


# 用cursor.execute分页查询Mysql数据库数据
def getMysqlDataLimit(host, port, user, password, db, charset, table, start, end):
    sql = "select * from " + table + \
        " order by id limit " + str(start) + "," + str(end)
    return getMysqlData(host, port, user, password, db, charset, sql)


# 用pandas库的read_sql获取Mysql数据库数据
def getMysqlReadSqlData(host, port, user, password, db, charset, sql):
    # detectionModule("pandas")
    try:
        # 创建连接
        con = pymysql.connect(
            host=host, port=port, user=user, password=password, db=db, charset=charset)
        df = pandas.read_sql(sql, con)
        return df
    except Exception as e:
        print("MySQL查询错误：", e)
        sys.exit(0)


# 用pandas库的read_sql分页查询Mysql数据库数据
def getMysqlReadSqlDataLimit(host, port, user, password, db, charset, table, start, end):
    sql = "select * from " + table + \
        " order by id limit " + str(start) + "," + str(end)
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
        try:
            # 文件不存在才保存
            with open(name, "wb") as code:
                code.write(s.get(url, headers=headers,
                                 verify=False, timeout=30).content)
        except Exception as e:
            print("保存文件错误：", e)


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
    print("创建Sqlite3数据库表成功")
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
    conn = sqlite3.connect(db + '.db')
    c = conn.cursor()
    cursor = c.execute(sql)
    data = cursor.fetchall()
    # print("Sqlite3查询数据成功")
    conn.close()
    return data


image = []


def run():
    # dowloadFileList(result,fileMkdir,"")

    # print(result)
    # for d in result:
    #     if d == "path":
    #         continue
    try:
        global image
        image = selectSqlite3BD(
            sqlite3Database, "SELECT id, db_id from " + dbTable + " order by id desc limit 1")
        if len(image) > 0:
            print("查询到Sqlite3数据库表中最大ID：", image[len(image) - 1][0])
            global tableLimitStart
            tableLimitStart = image[len(image) - 1][0]
    except Exception as e:
        print("没有查询到数据库表：", e)
        createSqlite3DB(sqlite3Database,
                        "CREATE TABLE " + dbTable + " (id INTEGER PRIMARY KEY NOT NULL,db_id TEXT NOT NULL)")

    # 查询出MySQL中的数据
    result = getMysqlDataLimit(dbHost, dbPort, dbUser, dbPassword,
                               dbDatabase, dbChart, dbTable, tableLimitStart, tableLimitEnd)
    if len(result) <= 0:
        print("没有查询到MySQL数据库数据")
        sys.exit(0)

    # 创建锁
    # lock = threading.RLock()
    # # 锁定
    # lock.acquire()
    # # 释放锁
    # lock.release()

    # 设定线程数量
    thread_num = 20

    # 定义Sqlite3表ID
    i = 0
    if len(image) > 0:
        i = tableLimitStart
    # 循环所有数据
    for d in result:
        image_id = str(d[0])
        url = str(d[3])

        # 启动thread_num个线程来下载图片
        for img_ph in range(thread_num):
            download_p = threading.Thread(
                target=dowloadFile(url, fileMkdir, ""))
            download_p.start()

        i = i + 1
        # image = selectSqlite3BD(dbDatabase, "SELECT id, db_id from "+dbTable+" where id='" + str(i) + "'")
        # if len(image) <= 0:
        #  OR IGNORE 防止插入重复数据
        insertSqlite3DB(sqlite3Database,
                        "INSERT OR IGNORE INTO " + dbTable + " (id,db_id) VALUES (" + str(i) + "," + image_id + ")")

    image = selectSqlite3BD(sqlite3Database,
                            "SELECT count(*) from " + dbTable)
    print("执行完成后最终数据库数据条数：", image[0][0])
    print("最终文件个数：", len([name for name in os.listdir(
        fileMkdir) if os.path.isfile(os.path.join(fileMkdir, name))]))

    print(":::::::::::::::执行完成时间：" +
          datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S') + "::::::::::::::")


if __name__ == "__main__":
    run()
