const {exec} = require('child_process');
const path = require('path');

function execute(command) {
    // exec函数第一个参数是要执行的命令，第二个函数是配置选项，第三个参数是回调函数，
    // 第二个参数中一个比较常用的就是子进程的工作目录
    // 在当前目录下的scripts文件夹里执行hexo g命令
    exec(command, {cwd: path.resolve(__dirname, '../docs')}, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

execute("git init && git add -A && git commit -m 'deploy' && git push -f https://github.com/woytu/woytu.github.io.git master");