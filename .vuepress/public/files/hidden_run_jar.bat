<!-- :
@echo off
for /f "delims=" %%a in ('mshta "%~f0"') do ( set filePath=%%a)

start javaw -jar "%filePath%"

exit /b
-->

<input type=file id=f>
<script>

f.click();

alert("当前选择的文件："+f.value);

var sfo = new ActiveXObject('Scripting.FileSystemObject');
// 获取TextStream对象.参数：0输入流,1输出流,2错误流.
sfo.GetStandardStream(1).Write(f.value);
close();

</script>