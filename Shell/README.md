# Shell


[[toc]]



## flag

> Shell俗称壳（用来区别于核），是指“为使用者提供操作界面”的软件（命令解析器），
> Shell也用于泛指所有为用户提供操作界面的程序，也就是程序和用户交互的层面

* [https://en.wikipedia.org/wiki/Shell_(computing)](https://en.wikipedia.org/wiki/Shell_(computing))

- 命令行参考大全（Linux、macOS、CMD、PowerShell、VB Script）[https://ss64.com](https://ss64.com)


## batch与shell同义操作符

| batch                  	| Shell                   	| 作用                             	|
|------------------------	|-------------------------	|----------------------------------	|
| %                      	| $                       	| 命令行参数前缀                   	|
| /                      	| -                       	| 命令选项标记                     	|
| \                      	| /                       	| 目录路径分隔符                   	|
| ==                     	| =                       	| (等于)字符串比较测试             	|
| !==!                   	| !=                      	| (不等)字符串比较测试             	|
| \|                     	| \|                     	| 管道：前一条命令的输出，作为后一条命令参数 |
| \|\|                      | \|\|                     	| 前一条命令执行失败，才执行后一条命令	|
| &                      	| &                       	| 前后所有命令都执行，不管成功与否 	|
| &&                     	| &&                      	| 前一个命令执行成功，才执行后一个 	|
| ;                      	| ;                       	| 前后所有命令都执行，不管成功与否 	|
| @                      	| set +v                  	| 不打印当前命令                   	|
| *                      	| *                       	| 文件名"通配符"                   	|
| >                      	| >                       	| 文件重定向(覆盖)                 	|
| >>                     	| >>                      	| 文件重定向(附加)                 	|
| <                      	| <                       	| 重定向stdin                      	|
| ^                      	| \\                       	| 命令换行执行，PowerShell为`(反引号) |
| %VAR%                  	| $VAR                    	| 环境变量                         	|
| REM                    	| #                       	| 注释                             	|
| NOT                    	| !                       	| 取反                             	|
| NUL                    	| /dev/null               	| "黑洞"用来阻止命令输出           	|
| ECHO                   	| echo                    	| 打印(Bash中有更多选项)           	|
| ECHO.                  	| echo                    	| 打印空行                         	|
| ECHO OFF               	| set +v                  	| 不打印后续的命令                 	|
| FOR %%VAR IN (LIST) DO 	| for var in [list]; do   	| "for"循环                        	|
| :LABEL                 	| 没有等价物(多余)        	| 标签                             	|
| GOTO                   	| 没有等价物(使用函数)    	| 跳转到脚本的另一个位置           	|
| PAUSE                  	| sleep                   	| 暂停或等待一段时间               	|
| CHOICE                 	| case or select          	| 菜单选择                         	|
| IF                     	| if                      	| if条件语句                       	|
| IF EXIST FILENAME      	| if [ -e filename ]      	| 测试文件是否存在                 	|
| IF !%N==!              	| if [ -z "$N" ]          	| 参数"N"是否存在                  	|
| CALL                   	| source命令或.(点操作符) 	| "include"另一个脚本              	|
| COMMAND /C             	| source命令或.(点操作符) 	| "include"另一个脚本(与CALL相同)  	|
| SET                    	| export                  	| 设置一个环境变量                 	|
| SHIFT                  	| shift                   	| 左移命令行参数列表               	|
| SGN                    	| -lt或-gt                	| (整形)符号                       	|
| ERRORLEVEL             	| $?                      	| 退出状态                         	|
| CON                    	| stdin                   	| "控制台"(stdin)                  	|
| PRN                    	| /dev/lp0                	| (一般的)打印设备                 	|
| LPT1                   	| /dev/lp0                	| 第一个打印设备                   	|
| COM1                   	| /dev/ttyS0              	| 第一个串口                       	|



## batch与shell同义命令

|   DOS    |   UNIX       |      作用     |
|---------|-----------------|--------------|
| ASSIGN  | ln              | 链接文件或目录      |
| ATTRIB  | chmod           | 修改文件权限       |
| CD      | cd              | 更换目录         |
| CHDIR   | cd              | 更换目录         |
| CLS     | clear           | 清屏           |
| COMP    | diff, comm, cmp | 文件比较         |
| COPY    | cp              | 文件拷贝         |
| Ctl-C   | Ctl-C           | 中断(信号)       |
| Ctl-Z   | Ctl-D           | EOF(文件结束)    |
| DEL     | rm              | 删除文件         |
| DELTREE | rm -rf          | 递归删除目录       |
| DIR     | ls -l           | 列出目录内容       |
| ERASE   | rm              | 删除文件         |
| EXIT    | exit            | 退出当前进程       |
| FC      | comm, cmp       | 文件比较         |
| FIND    | grep            | 在文件中查找字符串    |
| MD      | mkdir           | 新建目录         |
| MKDIR   | mkdir           | 新建目录         |
| MORE    | more            | 分页显示文本文件     |
| MOVE    | mv              | 移动文件         |
| PATH    | $PATH           | 可执行文件的路径     |
| REN     | mv              | 重命名(移动)      |
| RENAME  | mv              | 重命名(移动)      |
| RD      | rmdir           | 删除目录         |
| RMDIR   | rmdir           | 删除目录         |
| SORT    | sort            | 排序文件         |
| TIME    | date            | 显示系统时间       |
| TYPE    | cat             | 将文件输出到stdout |
| XCOPY   | cp              | (扩展的)文件拷贝    |

