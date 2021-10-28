const utils = require('./utils');
const path = require('path');

// GitHub仓库地址
const repo = "https://github.com/bajins/bajins.github.io.git";

/**
 * 推送编译后的静态文件
 *  node .vuepress/push.js
 *
 * @param args 执行脚本时传递的参数：docs为提交到当前仓库，pages为外部仓库
 */
function pushStatics(args) {
    let dir = path.resolve(__dirname, '..');
    // 删除docs目录中的所有文件并编译
    // utils.execute("rimraf docs/* && vuepress build", dir);
    let docs = path.resolve(__dirname, '../docs');

    if (args.length == 0 || args[0] == "docs") {
        utils.execute("git add -A", docs);
        utils.execute("git commit -m 'deploy'", dir);
        utils.execute("git push", dir);

    } else if (args.length > 0 && args[0] == "pages") {
        utils.execute("git init", docs);
        utils.execute("git add -A", docs);
        utils.execute("git commit -m 'deploy'", docs);
        utils.execute("git push -f " + repo + " master", docs);
    }
}

let args = process.argv.splice(2);
pushStatics(args);