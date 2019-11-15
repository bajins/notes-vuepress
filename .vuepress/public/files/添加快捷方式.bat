:: -------------------------------------------------------------------
::                          添加快捷方式
::                     by https://www.bajins.com
::                   GitHub https://woytu.github.io
:: -------------------------------------------------------------------


@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close) && exit
:begin

::设置快捷方式名称（必选）
:: %~dp0 当前所在目录
:: %0 当前执行脚本路径
set LnkName=测试.exe

::设置快捷方式显示的说明（可选）
set Desc=测试

:: 设置快捷方式存放路径，DesKtop、Startup、AllUsersStartup、AllUsersDesktop
set folder=DesKtop


::设置程序或文件的完整路径（必选）
set Program=%~dp0%LnkName%

::设置程序的工作路径，一般为程序主目录，此项若留空，脚本将自行分析路径
set WorkDir=%~dp0

if not defined WorkDir call:GetWorkDir "%Program%"

::创建
(
	echo Set WshShell=CreateObject("WScript.Shell"^)
	echo folder=WshShell.SpecialFolders("%folder%"^)
	echo Set oShellLink=WshShell.CreateShortcut(folder^&"\%LnkName%.lnk"^)
	echo oShellLink.TargetPath="%Program%"
	echo oShellLink.WorkingDirectory="%WorkDir%"
	echo oShellLink.WindowStyle=1
	echo oShellLink.Description="%Desc%"
	echo oShellLink.Save
	echo Msgbox("快捷方式创建成功！"^)
) > makelnk.vbs

makelnk.vbs
del /f /q makelnk.vbs
exit

goto :eof

:GetWorkDir
	set WorkDir=%~dp1
	set WorkDir=%WorkDir:~,-1%

goto :eof