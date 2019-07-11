1>1/* :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::  bcn 5.3  by bailong360 @www.bathome.net
:: 首发兼更新地址:http://www.bathome.net/thread-32322-1-1.html
::
:: 使用时请将bcn.bat放入任意一个PATH中的目录以便调用
:: 但请确保bcn.bat拥有该目录的读写权限(因此最好不要选择system32)
:: 建议新建一个目录专供bcn.bat使用,再将这个目录添加到PATH中
::
:: 基本用法:
::   下载: bcn command filename [v:version] [/f] [/o:path]
::     从Batch-CN上下载指定的第三方
::      command
::        供选:get-tool get gt down
::        前三个效果等同,最后一个的效果等同于get-tool /f
::      filename
::        欲下载的第三方名称
::      (可选)v:version
::        欲下载的第三方版本(避免下载默认版本)
::      (可选)/f
::        即使第三方已存在也下载,等同于down
::      (可选)/o:path
::        下载到指定目录,path为'-'则下载到当前目录
::      例:bcn get sed v:4.0.7 /f
::         bcn get capi
::         bcn get sed "/o:New Folder"
::         bcn get sed /o:-
::
::   删除: bcn command filename
::     从bcn.bat所处的目录中删除一个文件(夹)
::      command:
::        供选:del-tool del dt
::      filename:
::         欲删除的文件(夹)名称,不加后缀则删除所有相关文件(夹)
::      例:bcn del capi.rar
::         bcn del capi
::
::   查找: bcn command keyword [col:length] ...
::     根据关键词查找第三方
::      command:
::         供选:find-tool find ft
::      keyword:
::         需要查找的关键字,会被编译为JScript正则表达式
::      (可选)col:length
::         供选:name ver info size
::         指定输出列的宽度,可指定多个
::         length表示该列的宽度,为0时则隐藏该列
::         默认宽度name:14 ver:12 info:38 size:8
::      例:bcn find 正则
::         bcn find 替换 ver:0 info:50
::         bcn find "^sed "
::
:: 提示:可以右键修改源码来获得更高的可定制性
::
:: Batch-CN项目合作者
:: 改进与维护： CrLf, bailong360, Batcher
:: 推荐和建议： templinshi, 依山居, tigerpower

:+ 5.3
:+  替换bcn的域名为bcn.bathome.net
:+  优化调用效率，允许将清单缓存1分钟
:+
:+ 5.2
:+  修复更新bcn时可能出现的错误
:+
:+ 5.1
:+  修复了判断list时间时的逻辑错误
:+  修复了find rem时出现的错误
:+  增加了EasyUSe模式
:+  增加了/f开关
:+  增加了/o开关
:+  提高了定制性
:+
:+ 5.0
:+  重写了代码,使用bat/Js混编,仅保留了get-tool,find-tool,del-tool
:+  增强了find-tool的功能
:+
:+ 4.1.2
:+  修复了Get-Tool读取不到最新list的问题
:+  修复了Get-Update解压时目录不对的问题
:+
:+ 4.1.1
:+  修复了部分bug
:+  修改了第三方列表的获取源

@echo off

set "EasyUse=false"    //EasyUse将第二个参数当成第三方下载,如果没有找到指定第三方则会执行find-tool

md "%~dp0$testAdmin$" 2>nul
if not exist "%~dp0$testAdmin$" (
    echo bcn不具备所在目录的写入权限! >&2
    exit /b 1
) else rd "%~dp0$testAdmin$"

setlocal enabledelayedexpansion

set /a name=14,ver=12,info=38,size=8
set cmdList=get-tool del-tool find-tool
set get-tool=get-tool gt get
set del-tool=del-tool dt del
set find-tool=find-tool ft find
set cover=false

for %%j in ("%~3" "%~4" "%~5" "%~6") do (
    if /i not "%%~j"=="/f" (
        for /f "tokens=1,* delims=:" %%k in ("%%~j") do set %%k=%%l
    ) else set cover=true
)

if /i "%EasyUse%"=="true" (
    cscript /nologo /e:jscript "%~f0" /func:get-tool /name:%~1 "/ver:%v%" /cover:false /cols:%name%-%ver%-%info%-%size% "/path:%/o%" /easyuse:true|more
    goto :EXIT
)

if /i "%~1"=="down" (
    set cmd=get-tool
    set cover=false
) else (
    for %%i in (%cmdList%) do (
        for %%j in (!%%i!) do (
            if /i "%%j"=="%~1" set cmd=%%i
        )
    )
)

if "%cmd%"=="" (
    echo 命令不存在^^! >&2
    findstr "^::" "%~f0"|more
    endlocal&exit /b 1
) else if "%cmd%"=="del-tool" (
    rd /s /q "%~dp0%~2" 2>nul
    del "%~dp0%~2.exe","%~dp0%~2.*" 2>nul
    echo 已删除
    endlocal&exit /b 0
)

if "%cmd%"=="find-tool" (
    cscript    /nologo /e:jscript "%~f0" /func:find-tool "/keyword:%~2" /cols:%name%-%ver%-%info%-%size% "/path:%/o%" |more
) else (
    cscript /nologo /e:jscript "%~f0" /func:%cmd% /name:%~2 "/ver:%v%" /cover:%cover% "/path:%/o%"
    goto :EXIT
)

:EXIT
endlocal&exit /b %errorlevel%
*/
try {
    var DownMode = '';       //下载方式,留空则使用内建下载.可以使用其他第三方,例:'wget -q "$URL" -O "$SavePath"'
    var URARMode = 'unrar x -o+ -y "$File" "$SavePath"';  //解压方式,默认使用unrar解压

    var WShell  = new ActiveXObject('WScript.Shell');
    var FSO     = new ActiveXObject('Scripting.FileSystemObject');
    var XMLHTTP = new ActiveXObject('Microsoft.XMLHTTP');
    var ADO     = new ActiveXObject('ADODB.Stream');
    var Argv    = WScript.Arguments.Named;
    var bcnPath = FSO.GetFile(WScript.ScriptFullName).ParentFolder.Path + '\\'; //第三方存放地址,默认为bcn.bat所处目录
    var SavPath = Argv.Item('path') == '' ? bcnPath : (Argv.Item('path') == '-' ? WShell.CurrentDirectory + '\\' : Argv.Item('path').replace(/\\$/, '') + '\\');
    var host    = 'http://bcn.bathome.net';

    if (!(FSO.FileExists(bcnPath + 'tool.@version.txt') && CheckListDate())) {
        download('/list/tool.@version.txt', bcnPath);
    }

    switch (Argv.Item('func')) {
        case 'get-tool':
            get_tool(Argv.Item('name'), Argv.Item('ver'), Argv.Item('cover'));
            break;
        case 'find-tool':
            var cols = Argv.Item('cols').split('-');
            find_tool(Argv.Item('keyword'), cols[0], cols[1], cols[2], cols[3]);
            break;
    }
    WScript.Quit(0);
} catch (e) {
    WScript.StdErr.WriteLine('JScript运行时错误:' + e.message);
    WScript.Quit(1);
}

function get_tool(fileName, fileVer, coverMode)
{
    var list     = FSO.OpenTextFile(bcnPath + 'tool.@version.txt', 1).ReadAll();
    var fullName = list.match(new RegExp('^' + fileName + '(\\.[a-z]+ | )@?[^ ]+ [^ ]+ [^ ]+', 'mgi'));

    if (!(fullName instanceof Array)) {
        WScript.StdErr.WriteLine('未找到匹配的第三方!');
        if (Argv.Item('easyuse') == 'true') {
            var cols = Argv.Item('cols').split('-');
            find_tool(fileName, cols[0], cols[1], cols[2], cols[3]);
        }
        WScript.Quit(1);
    }

    var ver, name, size, info, withVer;
    if (fileVer == '') {  //没有指定版本,则下载版本号前有'@'的(推荐版)
        info    = fullName.join('\n').match(/^.+@.+$/m)[0];
        withVer = fullName.length == 1 ? false : true;

    } else {             //指定了版本号
        info = fullName.join('\n').match(new RegExp('^.+' + fileVer + '.+$', 'mi'));
        if (!(info instanceof Array)) {
            WScript.StdErr.WriteLine('未找到匹配的第三方!');
            if (Argv.Item('easyuse') == 'true') {
                var cols = Argv.Item('cols').split('-');
                find_tool(fileName, cols[0], cols[1], cols[2], cols[3]);
            }
            WScript.Quit(1);
        }
        info = info[0];
        withVer = true;
    }

    name = info.match(/[^ ]+/ );info = info.replace(/[^ ]+/, '');
    ver  = info.match(/[^@ ]+/);
    size = info.match(/\d+(?=Bytes)/);

    if (!/\.[^/]+$/.test(name)) {
        name += '.exe';
    }

    if (coverMode == 'false') { 
        if (FSO.FileExists(SavPath + name) && FSO.GetFile(SavPath + name).Size == size) {
            WScript.StdErr.WriteLine('该第三方已存在,如果仍需要下载请使用/f参数');
            WScript.Quit(1);
        }
    }

    fullName = (withVer ? ver + '/' : '') + name;

    WScript.StdOut.WriteLine('名称:' + name + ' 版本:' + ver + ' 大小:'  + (size / 1024).toFixed(1) + 'KB');
    WScript.StdOut.Write('下载中...');
    download('/tool/' + fullName, SavPath);
    if (FSO.GetFile(SavPath + name).Size == size) {
        WScript.StdOut.WriteLine('下载完毕!');
    } else {
        WScript.StdErr.WriteLine('下载失败!');
        WScript.StdErr.WriteLine('URL:' + host + '/tool/' + fullName);
        WScript.Quit(1);
    }

    if (/\.rar$/.test(name)) {
        WScript.StdOut.Write('解压中...');
        unrar(name);
        WScript.StdOut.WriteLine('解压完毕!');
    }
}

function find_tool(keyword, namel, verl, infol, sizel)
{
    var file = FSO.OpenTextFile(bcnPath + 'tool.@version.txt', 1);
    var pat  = new RegExp(keyword, 'i');
    while (!file.AtEndOfStream) {
        var line = file.ReadLine().replace(/@/, '').replace(/^rem .+$/im, '');
        if (pat.test(line)) {
            var name = line.match(/[^. ]+/)[0];line = line.replace(/[^ ]+/, '');
            var ver  = line.match(/[^ ]+/)[0] ;line = line.replace(/[^ ]+/, '');
            var info = line.match(/[^ ]+/)[0] ;line = line.replace(/[^ ]+/, '');
            var size = line.match(/\d+/)[0];
            WScript.StdOut.WriteLine(cutStr(name, namel) + cutStr(ver, verl) + cutStr(info, infol) + cutStr((size / 1024).toFixed(1) + 'KB', sizel));
        }
    }

}

function cutStr(str, max) //截取一定字节的字符串, 不足补空格,超过用'...'截断
{
    if (max == 0) {
        return '\b'; //消除占位的空格
    }
    var l = 0, i, j, space = ' ';
    var strl = str.length, strl2 = 0;

    for (i = 0; i < strl; i++) {
        var c = str.charCodeAt(i);
        strl2 += ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xcff9f)) ? 1 : 2;
    }

    max = strl2 > max ? max - 3 : max; //为'...'预留空间
    for (i = 0; i < strl && l < max; i++) {
        var c = str.charCodeAt(i);
        l += ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xcff9f)) ? 1 : 2;
    }
    for (j = 0; j < max - l + 1; j++) {
        space += ' ';
    }
    return str.substr(0, i) + (strl2 > max ? '...' : '') + space;
}

function unrar(fileName) {
    if (/unrar/.test(URARMode) && !FSO.FileExists(bcnPath + 'unrar.exe')) {
        download('/tool/unrar.exe', bcnPath);
    }
    WShell.Run(URARMode.replace(/\$File/, SavPath + fileName).replace(/\$SavePath/, SavPath), 0, true);
}

function download(URL, downPath)
{
    var SavePath = downPath + URL.match(/[^/]+$/);
    var DownURL  = host + URL + '?' + Math.random();

    if (DownMode == '') {
        XMLHTTP.Open('GET', DownURL, 0);
        XMLHTTP.Send();
        ADO.Mode = 3;
        ADO.Type = 1;
        ADO.Open();
        ADO.Write(XMLHTTP.ResponseBody);
        ADO.SaveToFile(SavePath, 2);
        ADO.Close();
    } else {
        WShell.Run(DownMode.replace(/\$URL/, DownURL).replace(/\$SavePath/, SavePath), 0, true);
    }
}

function CheckListDate() //根据列表文件修改时间或time.txt显示的上次更新时间决定是否更新list
{
    //修改时间大于1分钟的列表才需更新
    var listLastModified = new Date(FSO.GetFile(bcnPath + 'tool.@version.txt').DateLastModified || null)
    if(Math.abs(listLastModified - new Date()) > 60000) return true
    
    //修改时间早于time.txt的列表才需更新
    XMLHTTP.Open('GET', host + '/list/time.txt?' + Math.random(), 0);
    XMLHTTP.Send();
    ADO.Mode = 3;
    ADO.Type = 1;
    ADO.Open();
    ADO.Write(XMLHTTP.ResponseBody);
    ADO.Position = 0;
    ADO.Type     = 2;
    ADO.CharSet  = 'GB2312';
    var str = ADO.ReadText().replace(/[^0-9]/g, '');
    var UpdateTime = Date.parse(new Date(str.substr(0,4), str.substr(4,2), str.substr(6,2), str.substr(8,2), str.substr(12,2), str.substr(14,2)));
    ADO.Close();
    if (UpdateTime > Date.parse(FSO.GetFile(bcnPath + 'tool.@version.txt').DateLastModified)) {
        return false;
    } else {
        return true;
    }
}
