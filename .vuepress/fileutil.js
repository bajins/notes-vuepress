const fs = require("fs");


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
    let files = fs.readdirSync(rootPath).sort();
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
            getDirFile(realpath);
        } else {
            realpath = realpath.substring(realpath.indexOf("files"));
            appendFile("files.md", "\r\n[" + file + "](/" + realpath + ")\r\n");
        }
    });
    // console.log(nav);
    return nav;
}

writeFile("files.md", "# 文件\r\n");

getDirFile(".vuepress/public/files");