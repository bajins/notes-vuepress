# Utils

## 原型方法

```javascript
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
    if (str == null || str == "" || this.length == 0) {
        return false;
    }
    if (str.length > this.length) {
        return false;
    }
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
    if (str == null || str == "" || this.length == 0) {
        return false;
    }
    if (str.length > this.length) {
        return false;
    }
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
```

## 时间转换
```javascript
/**
 * 时间转换工具
 * date 时间
 * join 年月日之间连接的字符
 */
const formatTime = (date, join) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    return [year, month, day].map(formatNumber).join(join) + ' ' + [hour, minute, second].map(formatNumber).join(':');
}
```

## 随机数
```javascript
/**
 * 生成从最小数到最大数的随机数
 * minNum 最小数
 * maxNum 最大数
 */
const randomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}
```

## 判断空
```javascript
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
```

## 数组
```javascript

/**
 * 将数组平均分割
 * arr 数组
 * len 分割成多少个
 * @author claer woytu.com
 * @date 2019/4/29 20:10
 */
const splitArray = (arr, len) => {
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}

/**
 * 自定义数组合并并去重函数
 * @param arr1 数组1
 * @param arr2 数组2
 * @return
 * @Description 自定义数组合并并去重函数
 * @author claer woytu.com
 * @date 2019/4/29 20:10
 */
const mergeArray = (arr1, arr2) => {
    // var _arr = new Array();
    // for (var i = 0; i < arr1.length; i++) {
    //   _arr.push(arr1[i]);
    // }
    // for (var i = 0; i < arr2.length; i++) {
    //   var flag = true;
    //   for (var j = 0; j < arr1.length; j++) {
    //     if (arr2[i] == arr1[j]) {
    //       flag = false;
    //       break;
    //     }
    //   }
    //   if (flag) {
    //     _arr.push(arr2[i]);
    //   }
    // }

    for (let i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) === -1) {
            arr1.push(arr2[i]);
        }
    }
    return arr1;
}

/**
 * 插入去重的元素
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 17:05
 */
const reinsertElement = (array, element) => {
    if (array.indexOf(element) === -1) {
        array.push(element);
    }
    return array;
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
 * splice方法删除数组中的空值
 *
 * @param array
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 18:14
 */
function trimSpace(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] == " " || array[i] == null || typeof (array[i]) == "undefined") {
            array.splice(i, 1);
            i = i - 1;
        }
    }
    return array;
}

/**
 * filter 过滤方法删除数组中的空值
 *
 * @param array
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 18:14
 */
function trimFilter(array) {
    array.filter(function (s) {
        return s && s.trim(); // 注：IE9(不包含IE9)以下的版本没有trim()方法
    });
}
```

## 字符串
```javascript
/**
 * 正则表达式去除空行
 *
 * @param oldStr 字符串
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/6/13 17:55
 */
function replaceBlank(oldStr) {
    if (typeof oldStr != "string") {
        console.log("正则表达式去除空行，传入的不为字符串！");
    } else {
        // 匹配空行
        let reg = /\n(\n)*( )*(\n)*\n/g;
        return oldStr.replace(reg, "\n");
    }
}
```