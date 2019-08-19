const fs = require('fs');
const path = require('path');
const {exec} = require('child_process');

function execute(command, dir) {
    // exec函数第一个参数是要执行的命令，第二个函数是配置选项，第三个参数是回调函数，
    // 第二个参数中一个比较常用的就是子进程的工作目录
    exec(command, {cwd: dir}, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substring(this.length - str.length) != str) {
        return false;
    }
    return true;
}
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串开头的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串开头
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.startWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length)
        return false;
    if (this.substr(0, str.length) != str) {
        return false;
    }
    return true;
}

/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串结尾的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串结尾
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */
String.prototype.endWithRegExp = function (str) {
    let reg = new RegExp(str + "$");
    return reg.test(this);
}
/**
 * 给String对象增加一个原型方法:
 * 判断一个字符串是以指定字符串开头的
 *
 * @param endStr 需要判断的子字符串
 * @return boolean 是否以该字符串开头
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 11:22
 */

String.prototype.startWithRegExp = function (str) {
    let reg = new RegExp("^" + str);
    return reg.test(this);
}

/**
 * 给String对象增加一个原型方法:
 * 替换全部字符串 - 无replaceAll的解决方案,自定义扩展js函数库
 * 原生js中并没有replaceAll方法，只有replace，如果要将字符串替换，一般使用replace
 *
 * @param FindText 要替换的字符串
 * @param RepText 新的字符串
 * @return string
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 15:24
 */
String.prototype.replaceAll = function (FindText, RepText) {
    // g表示执行全局匹配，m表示执行多次匹配
    let regExp = new RegExp(FindText, "gm");
    return this.replace(regExp, RepText);
}

/**
 * 根据系统文件分割符自动切割目录获取最后一个目录
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 16:51
 */
String.prototype.cuttingPathWith = function () {
    let strArray = this.split(path.sep);
    return strArray[strArray.length - 1];
}

/**
 * 判断一个元素是否含有指定class
 * @param selector
 * @param cls
 * @returns {boolean}
 */
function hasClass(selector, cls) {
    return (' ' + document.querySelector(selector).className + ' ').indexOf(' ' + cls + ' ') > -1;
}


/**
 * 设置延时后再执行下一步操作
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/7/4 20:22
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


/**
 * 判断js数组/对象是否为空
 * isPrototypeOf() 验证一个对象是否存在于另一个对象的原型链上。即判断 Object 是否存在于 $obj 的原型链上。
 * js中一切皆对象，也就是说，Object 也存在于数组的原型链上，因此这里数组需要先于对象检验。
 * Object.keys() 返回一个由给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
 * @param $obj
 * @return {boolean}
 */
function isEmpty($obj) {
    // 找不到属性
    if (typeof ($obj) == 'undefined') {
        return true;
    }
    // 检验非数组/对象类型  EX：undefined   null  ''  根据自身要求添加其他适合的为空的值  如：0 ,'0','  '  等
    if ($obj === 0 || $obj === '' || $obj === null) {
        return true;
    }
    if (typeof ($obj) === "string") {
        $obj = $obj.replace(/\s*/g, ""); //移除字符串中所有 ''
        if ($obj === '') {
            return true;
        }
    }
    if (typeof ($obj) === "object") {
        if (!Array.isArray($obj) || $obj.length <= 0 || Object.keys($obj).length <= 0) {
            return true;
        }
    }
    return false;
}


/**
 * 过滤在数组中的值
 *
 * @param arr 元数据数组
 * @param ignoresArr 需要去除的值数组
 * @return Array 去掉值后的新数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:30
 */
function inArrayKV(arr, ignoresArr) {
    let newArr = [];
    arr.forEach(function (value, index, array) {
        // 判断文件名以什么开头、是否在指定数组中存在
        if (!value.startsWith(".") && ignoresArr.includes(value)) {
            newArr.push(value);
        }
    });
    return newArr;
}

/**
 * 过滤不在数组中的值
 *
 * @param arr 元数据数组
 * @param retentionArr 需要保留的值数组
 * @return Array 去掉值后的新数组
 * @Description
 * @author claer woytu.com
 * @date 2019/5/23 16:30
 */
function notInArrayKV(arr, retentionArr) {
    let newArr = [];
    arr.forEach(function (value, index, array) {
        // 判断文件名以什么开头、是否在指定数组中存在
        if (!value.startsWith(".") && !retentionArr.includes(value)) {
            newArr.push(value);
        }
    });
    return newArr;
}


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

    return notInArrayKV(files, ignores);
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
 * @param dirPath 路径
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
            let item;
            if (targetObj["children"]) {
                item = {title: file, children: [], parent: dirPath.cuttingPathWith()};
                // 把更深层的子文件夹装入上级子文件夹数组中
                targetObj["children"].push(item);
            } else {
                item = {title: file, children: []};
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
                fileName = targetObj["title"] + "/" + fileName;
                if (isEmpty(targetObj["parent"])) {
                    fileName = targetObj["parent"] + "/" + fileName;
                    delete (targetObj["parent"]);
                }
                // 把文件装入更深层子文件夹的数组中
                targetObj["children"].push(fileName);
            } else {
                // 装入同级文件夹下的文件
                filesList.push(fileName);
            }
        }
    });
}


/**
 * 获取指定路径下的所有文件夹
 *
 * @param rootPath 路径
 * @return Array
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 14:35
 */
function getRootDir(rootPath) {
    let nav = [];
    // 读取文件夹
    let files = getDirFiles(rootPath);
    // 遍历获取到的文件夹内容
    files.forEach(function (file, index, array) {
        // 获取规范的绝对路径
        // let realpath = fs.realpathSync(rootPath + "/" + value);
        // 拼接为绝对路径
        // let realpath = path.resolve(rootPath, file)
        // 获取相对路径
        let realpath = path.join(rootPath, file);
        // 拼接为相对路径
        // let realpath = path.join(rootPath, file)
        // 获取文件状态
        let stat = fs.lstatSync(realpath);
        // 判断是否为文件夹
        if (stat.isDirectory()) {
            let navObj = {text: file, link: "/" + file + "/"};
            nav.push(navObj);
        }
    });
    // console.log(nav);
    return nav;
}

/**
 * 获取指定路径下的所有文件
 *
 * @param rootPath 路径
 * @return Array
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 14:35
 */
function getDirFile(rootPath) {
    let nav = [];
    // 读取文件夹
    let files = getDirFiles(rootPath);
    // 遍历获取到的文件夹内容
    files.forEach(function (file, index, array) {
        // 获取规范的绝对路径
        // let realpath = fs.realpathSync(rootPath + "/" + value);
        // 拼接为绝对路径
        // let realpath = path.resolve(rootPath, file)
        // 获取相对路径
        let realpath = path.join(rootPath, file);
        // 拼接为相对路径
        // let realpath = path.join(rootPath, file)
        // 获取文件状态
        let stat = fs.lstatSync(realpath);
        // 判断是否为文件夹
        if (stat.isDirectory()) {
            getDirFile(realpath);
        } else {
            let navObj = {text: file, link: "/" + file + "/"};
            nav.push(navObj);
        }
    });
    // console.log(nav);
    return nav;
}

/**
 * 文件写入内容
 *  fs.wirteFile有三个参数
 * 1,第一个参数是要写入的文件路径
 * 2,第二个参数是要写入得内容
 * 3,第三个参数是可选参数,表示要写入的文件编码格式,一般就不写,默认就行
 * 4,第四个参数是个回调函数  只有一个参数error,来判断是否写入成功
 * 如果在使用fs.writeFIle时,要写入文件不存在,则直接写入,如果存在,则会覆盖原内容
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/7/3 16:39
 */
const writeFile = (file, content) => fs.writeFile(file, content, "utf8", error => {
    if (error) return console.log("文件写入内容失败,原因是：" + error.message);
});

/**
 * 文件末尾追加内容
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/7/3 17:00
 */
const appendFile = (file, content) => fs.appendFile(file, content, 'utf8', function (err) {
    if (err) {
        console.log("文件追加内容失败,原因是：" + err);
    }
});


/**
 * 把静态文件添加到一个文档中
 *
 * @param rootPath 路径
 * @return Array
 * @Description
 * @author claer woytu.com
 * @date 2019/5/24 14:35
 */
function setStaticFile(rootPath, fileStr) {
    // 读取文件夹
    let files = fs.readdirSync(rootPath).sort();
    // 遍历获取到的文件夹内容
    files.forEach(function (file, index, array) {
        // 获取规范的绝对路径
        // let realpath = fs.realpathSync(rootPath + "/" + value);
        // 拼接为绝对路径
        // let realpath = path.resolve(rootPath, file)
        // 获取相对路径
        let realpath = path.join(rootPath, file);
        // 拼接为相对路径
        // let realpath = path.join(rootPath, file)
        // 获取文件状态
        let stat = fs.lstatSync(realpath);
        // 判断是否为文件夹
        if (stat.isDirectory()) {
            setStaticFile(realpath, fileStr);
        } else {
            realpath = realpath.substring(realpath.indexOf("files"));
            fileStr = fileStr + "\r\n[" + file + "](/" + realpath.replaceAll("\\\\", "/") + ")\r\n";
        }
    });
    appendFile("files.md", fileStr);
}

writeFile("files.md", "# 文件\r\n");

setStaticFile(".vuepress/public/files", "");


function test(files) {
    Object.keys(sidebar).forEach(function (key) {
        if (!files.includes(key)) {
            delete (sidebar[key]);
            console.log(key)
        }
    });
}

module.exports = {
    rootFolder,
    getRootDir,
    execute
}