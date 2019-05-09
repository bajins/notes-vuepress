# 各种shell脚本

> Shell本身是一个用C语言编写的程序，Unix/Linux上常见的Shell脚本解释器有bash、sh、csh、ksh等，bash：bash是Linux标准默认的Shell。

# 运行命令

```bash
./mysqlBackup.sh >> mysqlBackup.log 2>&1
```



##### 清理内存脚本
```bash
vi rememory.sh
```
##### 复制[rememory.sh](/VPS/rememory.sh)中的代码到服务器上，保存并授权
```bash
chmod a+x rememory.sh
```
##### 清理日志脚本
```bash
vi cleanLog.sh
```
##### 复制[cleanLog.sh](/VPS/cleanLog.sh)中的代码到服务器上，保存并授权
```bash
chmod a+x cleanLog.sh
```
##### 清理MySQL日志脚本
```bash
vi delete_file.py
```
##### 复制[delete_file.py](/VPS/delete_file.py)中的代码到服务器上，保存并授权
```bash
chmod a+x delete_file.py
```
