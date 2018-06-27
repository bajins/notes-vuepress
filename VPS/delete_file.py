#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import datetime

print("==========================================================")
if len(sys.argv)<2:
    print("请输入参数：参数为文件路径！")
    print("注意文件名后缀如果为数字那么将只删除后缀为数字的文件，同理后缀为字母或者字母数字组成一样的效果！")
    quit()

print "执行脚本名：", sys.argv[0]
print("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
print(":::::::::::::::执行时间："+datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+"::::::::::::::")
print("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")

parameter=sys.argv[1]

#for i in range(1, len(sys.argv)):
#    print "参数:第", i,"个='", sys.argv[i],"'"
print("参数："+parameter)


n= parameter.rindex('/');#从后往前寻找最后一次出现的位置
if n==-1:
    print("请输入正确的文件路径！")
    print("==========================================================")
    quit()

#截取文件路径
pathName = parameter[0:n]

#截取文件名
fileName=parameter[n+1:];
#对文件名拆分
split=fileName.split(".");
#获取文件前缀
prefix=split[0]
#获取文件后缀,并去掉.
suffix=split[1].strip(".");


#获取文件list数组
files_list = os.listdir(pathName)
#print(files_list) #当前目录路径
L=[]
#遍历路径下的文件
for file in files_list:
    #截取文件名
    fname=os.path.splitext(file)
    
    #strip()删除任意字符，isdigit()判断是否为数字字符串
    #if fname[0] == prefix and suffix.isdigit() and fname[1].strip(".").isdigit():
        #添加到list中
        #L.append(file)
    #strip()删除任意字符，isalpha()判断是否为字母字符串
    #if fname[0] == prefix and suffix.isalpha() and fname[1].strip(".").isalpha():
        #添加到list中
        #L.append(file)
    #strip()删除任意字符，isalnum()判断是否为字母、数字、字母数字组合 等字符串
    if fname[0] == prefix and suffix.isalnum() and fname[1].strip(".").isalnum():
        #添加到list中
        L.append(file)

#排序
L.sort()
#获取list长度
leng=len(L)
print("查找到"+str(leng)+"个文件！")

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
        #strip()删除任意字符，isdigit()判断是否为数字字符串
    #if fname[0] == prefix and suffix.isdigit() and fname[1].strip(".").isdigit():
        #添加到list中
        #L.append(file)
    #strip()删除任意字符，isalpha()判断是否为字母字符串
    #if fname[0] == prefix and suffix.isalpha() and fname[1].strip(".").isalpha():
        #添加到list中
        #L.append(file)
    #strip()删除任意字符，isalnum()判断是否为字母、数字、字母数字组合 等字符串
    if fname[0] == prefix and suffix.isalnum() and fname[1].strip(".").isalnum():
            newL.append(file)

    newL.sort()
    print "不能删除的文件：",newL
else:
    print ("**********没有可删除文件**********")

print("==========================================================")
