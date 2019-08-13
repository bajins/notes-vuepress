# Python脚本

## 删除文件

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import time
import datetime
import operator


def is_valid_date(strdate):
    # 判断是否是一个有效的日期字符串
    try:
        if ":" in strdate:
            time.strptime(strdate, "%Y-%m-%d %H:%M:%S")
        else:
            time.strptime(strdate, "%Y-%m-%d")
        return True
    except:
        return False


# 自定义函数
def getFile(pathName, prefix, suffix, array):
    # 在函数中释放一个list所占内存
    del array[:]
    # 清空list
    # array.clear()
    # 获取文件list数组
    files_list = os.listdir(pathName)
    # print(files_list) #当前目录路径
    # 遍历路径下的文件
    for file in files_list:
        # 截取文件名
        fname = os.path.splitext(file)

        if fname[0].count(".") <= 0:
            # strip()删除任意字符，isdigit()判断是否为数字字符串
            # if fname[0] == prefix and suffix.isdigit() and fname[1].strip(".").isdigit():
                # 添加到list中
                # array.append(file)
            # strip()删除任意字符，isalpha()判断是否为字母字符串
            # if fname[0] == prefix and suffix.isalpha() and fname[1].strip(".").isalpha():
                # 添加到list中
                # array.append(file)
            # strip()删除任意字符，isalnum()判断是否为字母、数字、字母数字组合 等字符串
            if fname[0] == prefix and suffix.isalnum() and fname[1].strip(".").isalnum():
                # 添加到list中
                array.append(file)
        else:
            splits = fname[0].split(".")
            # is_valid_date判断是否为日期格式
            if operator.eq(splits[0], prefix) == 0 and is_valid_date(suffix) and is_valid_date(splits[1]):
                # 添加到list中
                array.append(file)
            # cmp判断两个字符串，如果相等就为0，如果第一个字符串包含第二个为-1，如果第二个包含第一个为1
            elif operator.eq(splits[0], prefix) == 0 and suffix.isalnum() and fname[1].strip(".").isalnum():
                # 添加到list中
                array.append(file)
    # 排序
    array.sort()
    return array


print("==========================================================")
if len(sys.argv) < 3:
    print("请输入参数：第一个参数为文件路径！第二个参数为保留多少个文件！")
    print("注意文件名后缀如果为数字那么将只删除后缀为数字的文件，同理后缀为字母或者字母数字组成一样的效果！")
    quit()

print("执行脚本名：", sys.argv[0])
print("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
print(":::::::::::::::执行时间：" +
      datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+"::::::::::::::")
print("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::")

# 参数1为文件路径
parameter = sys.argv[1]
# 参数2为要保留的文件个数
keep = int(sys.argv[2])

# for i in range(1, len(sys.argv)):
#    print "参数:第", i,"个='", sys.argv[i],"'"
print("参数："+parameter)


n = parameter.rindex('/')  # 从后往前寻找最后一次出现的位置
if n == -1:
    print("请输入正确的文件路径！")
    print("==========================================================")
    quit()

# 截取文件路径
pathName = parameter[0:n]

# 截取文件名
fileName = parameter[n+1:]
# 对文件名拆分
showCount = fileName.count(".")
if (showCount > 0):
    print("文件名中'.'出现的次数："+str(showCount))

split = fileName.split(".")
# 获取文件前缀
prefix = split[0]
# 获取文件后缀,并去掉.
suffix = split[1].strip(".")

L = []
# 调用自定义函数
L = getFile(pathName, prefix, suffix, L)
# 获取list长度
leng = len(L)
print("查找到"+str(leng)+"个文件！")

if leng > keep:
    if keep > 1:
        # 循环输入的参数，移除list中元素
        # reversed这种索引是按从大到小的顺序排列，就相当于range(5-1,-1,-1)
        for i in range(keep):
            del L[leng-(i+1)]
    elif keep == 1:
        del L[leng-keep]

    for i in L:
        os.remove(pathName+"/"+i)
        print("删除文件：", i)

    newL = []
    # 调用自定义函数
    newL = getFile(pathName, prefix, suffix, L)
    print("保留的文件：", newL)
else:
    print("**********没有可删除文件**********")

print("==========================================================")

```