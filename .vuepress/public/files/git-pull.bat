@echo off
:: 遍历当前目录下的子目录
for /f "delims=" %%i in ('dir /ad/b') do (
    :: 切换到子目录
    cd %%i
    :: 判断文件夹是否存在
    if exist ".git" (
        :: 列出远程仓库地址
        git remote -v
        echo ******** 开始更新 %%i **********
        :: 更新
        git pull
        echo -----------------------------------------------------------
    )
    cd ..
)

pause