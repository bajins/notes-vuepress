const utils = require('./utils');
const path = require('path');

// 删除docs目录中的所有文件并编译
// utils.execute("rimraf docs/* && vuepress build", path.resolve(__dirname, '..'));

// GitHub仓库地址
let repo = "https://github.com/woytu/woytu.github.io.git";
// 执行脚本目录
let docs = path.resolve(__dirname, '../docs');

utils.execute("git init && git add -A && git commit -m 'deploy' && git push -f " + repo + " master", docs);