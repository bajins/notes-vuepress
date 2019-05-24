const {fs, path} = require('@vuepress/shared-utils')

/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 * @param endStr 需要判断的子字符串
 *
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
/*String.prototype.endWith = function (endStr) {
    let d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d);
}*/
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 * @param endStr 需要判断的子字符串
 *
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */

/*String.prototype.startWith = function (endStr) {
    let d = this.length - endStr.length;
    return (d >= 0 && this.indexOf(endStr) == d);
}*/

/**
 * 查找文件夹下的文件并忽略指定文件
 *
 * @param dirname 文件夹路径
 * @return Array 返回过滤后的数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:33
 */
function getDirFiles(dirname) {
    // 读取文件夹
    // let fileNames = fs.readdirSync(path.resolve(__dirname, dirname)).map(filename => filename);
    let files = fs.readdirSync(dirname).sort();
    let ignores = [".git", ".gitignore", "docs", "node_modules", "yarn.lock", "package.json", "package-lock.json"];
    let judgeArrayKV1 = judgeArrayKV(files, ignores);

    return judgeArrayKV1;
}


/**
 * 数组过滤值
 *
 * @param arr 元数据数组
 * @param ignoresArr 需要去除的值数组
 * @return Array 去掉值后的新数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:30
 */
function judgeArrayKV(arr, ignoresArr) {
    let newArr = [];
    arr.forEach(function (value, index, array) {
        // 判断文件名以什么开头、是否在指定数组中存在
        if (!value.startsWith(".") && !ignoresArr.includes(value)) {
            newArr.push(value);
        }
    });
    return newArr;
}

/**
 * 读取根目录下的内容
 *
 * @param rootPath 根路径
 * @return Object 返回获取到当前文件夹下的目录结构对象
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:02
 */
function rootFolder(rootPath) {
    let sidebar = {};
    let parent = [];
    // 读取文件夹
    let files = getDirFiles(rootPath);
    // 遍历获取到的文件夹内容
    files.forEach(function (file, index, array) {
        // 获取规范的绝对路径
        // let realpath = fs.realpathSync(rootPath + "/" + value);
        // 拼接为绝对路径
        // let realpath = path.resolve(rootPath, file)
        // 获取相对路径
        let realpath = rootPath + "/" + file;
        // 拼接为相对路径
        // let realpath = path.join(rootPath, file)
        // 获取文件状态
        let stat = fs.lstatSync(realpath);
        // 判断是否为文件夹
        if (stat.isDirectory()) {
            // test2(realpath, value, []);
            let filesList = [];
            let targetObj = {};
            readFile(realpath, filesList, targetObj);
            sidebar["/" + file + "/"] = filesList;
        } else {
            /*let fileName = value.slice(0, -3);
            if ("README" == fileName) {
                fileName = '';
            }
            parent.push(fileName);*/
        }
    });
    parent.push("");
    sidebar["/"] = parent;
    // console.log(JSON.stringify(sidebar));
    return sidebar;
}


/**
 * 读取文件
 * @param path 路径
 * @param filesList 存放所有文件夹的数组
 * @param targetObj 存放子文件夹的对象
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:04
 */
function readFile(dirPath, filesList, targetObj) {

    let files = getDirFiles(dirPath);//需要用到同步读取
    files.forEach(function (file) {
        // let childrenPath = path + '/' + file;
        let childrenPath = path.join(dirPath, file)
        let states = fs.statSync(childrenPath);
        if (states.isDirectory()) {
            let item = {title: file, children: []};
            if (targetObj["children"]) {
                // 把更深层的子文件夹装入上级子文件夹数组中
                targetObj["children"].push(item);
            } else {
                // 装入构造同级文件夹下的子文件夹对象
                filesList.push(item);
            }
            readFile(childrenPath, filesList, item);
        }
        // 必须是md文件
        else if (file.endsWith(".md")) {
            let fileName = file.slice(0, -3);
            if ("README" == fileName) {
                fileName = '';
            }
            if (targetObj["children"]) {
                // 把文件装入更深层子文件夹的数组中
                targetObj["children"].push(targetObj["title"] + '/' + fileName);
            } else {
                // 装入同级文件夹下的文件
                filesList.push(fileName);
            }
        }
    });
}


function test(files) {
    Object.keys(sidebar).forEach(function (key) {
        if (!files.includes(key)) {
            delete (sidebar[key]);
            console.log(key)
        }
    });
}

module.exports = {
    rootFolder
}