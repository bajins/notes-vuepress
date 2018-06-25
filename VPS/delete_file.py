#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys

print("==========================================================")
if len(sys.argv)<2:
    print("请输入参数！")
    quit()

print "执行脚本名：", sys.argv[0]

for i in range(1, len(sys.argv)):
    print "参数:第", i,"个='", sys.argv[i],"'"

#获取传入文件夹路径参数
pathName = sys.argv[1]
#获取文件名称参数
fileName = sys.argv[2]

#获取文件list数组
files_list = os.listdir(pathName)
#print(files_list) #当前目录路径
L=[]
#遍历路径下的文件
for file in files_list:
    #截取文件名
    fname=os.path.splitext(file)
    #strip()删除任意字符，isdigit()判断是否为数字字符串
    if fname[0] == fileName and fname[1].strip(".").isdigit():
        #添加到list中
        L.append(file)

#排序
L.sort()
#获取list长度
leng=len(L)

if leng>=4:
    #移除list中元素
    del L[leng-1]
    del L[leng-2]
    del L[leng-3]

    for i in L:
        os.remove(pathName+"/"+i)
        print "删除文件：",i

    newL=[]
    noFile=os.listdir(pathName)
    for file in noFile:
        #截取文件名
        fname=os.path.splitext(file)
        if fname[0] == fileName and fname[1].strip(".").isdigit():
            newL.append(file)

    newL.sort()
    print "不能删除的文件：",newL
else:
    print ("**********没有可删除文件**********")

print("==========================================================")