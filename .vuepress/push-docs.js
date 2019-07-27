const path = require('path');
const utils = require('./utils');


// 执行脚本目录
let dir = path.resolve(__dirname, '..');

// 删除docs目录中的所有文件并编译
// utils.execute("rimraf docs/* && vuepress build", dir);

utils.execute("git add -A && git commit -m 'deploy'", path.resolve(__dirname, '../docs'));

utils.execute("git push", dir);