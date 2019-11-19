/**
 *
 * @Description:
 * @Author: https://www.bajins.com
 * @File: JavaScriptUtils.js
 * @Version: 1.0.0
 * @Time: 2019/11/19/019 16:28
 * @Project: UseNotes-vuepress
 * @Package:
 * @Software: WebStorm
 */

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * (newDate()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 *
 * @param fmt
 * @returns {void | string}
 */
Date.prototype.pattern = function (fmt) {
    if (typeof fmt != "string") {
        throw TypeError("fmt不是字符串类型");
    }
    if (fmt == "" || fmt.length == 0) {
        throw new Error("fmt不能为空");
    }
    let opt = {
        // 年
        "y+": this.getFullYear(),
        // 月份
        "M+": this.getMonth() + 1,
        // 日
        "d+": this.getDate(),
        // 小时
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        // 小时
        "H+": this.getHours(),
        // 分
        "m+": this.getMinutes(),
        // 秒
        "s+": this.getSeconds(),
        // 季度
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // 毫秒
        "S": this.getMilliseconds()
    };
    let week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(E+)/.test(fmt)) {
        let wk = RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468";
        wk = RegExp.$1.length > 1 ? wk : "";
        wk = wk + week[this.getDay().toString()];
        fmt = fmt.replace(RegExp.$1, wk);
    }
    for (let k in opt) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            let type = opt[k].toString();
            let time = type.padStart(RegExp.$1.length, "0");
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? type : time);
        }
    }
    return fmt;
}

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * (new Date()).format("yyyy-MM-dd HH:mm:ss.S") ==> 2019-11-19 17:17:25.932
 * (new Date()).format("yyyy-M-d H:m:s.S")      ==> 2019-11-19 17:17:13.643
 * (new Date()).pattern("yyyy-MM-dd hh:mm:ss")  ==> 2019-11-19 05:16:59
 * (new Date()).pattern("yyyy-M-d h:m:s.S")     ==> 2019-11-19 5:16:47.906
 *
 * @param fmt
 * @returns {void | string}
 */
Date.prototype.format = function (fmt) {
    if (typeof fmt != "string") {
        throw TypeError("fmt不是字符串类型");
    }
    if (fmt == "" || fmt.length == 0) {
        throw new Error("fmt不能为空");
    }
    let opt = {
        // 年
        "y+": this.getFullYear(),
        // 月份
        "M+": this.getMonth() + 1,
        // 日
        "d+": this.getDate(),
        // 小时
        "H+": this.getHours(),
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
        // 分
        "m+": this.getMinutes(),
        // 秒
        "s+": this.getSeconds(),
        // 季度
        "q+": Math.floor((this.getMonth() + 3) / 3),
        // 毫秒
        "S": this.getMilliseconds()
    };
    for (let k in opt) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            let type = opt[k].toString();
            let time = type.padStart(RegExp.$1.length, "0");
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? type : time);
        }
    }
    return fmt;
}

/**
 * Date格式化输出
 *
 * dateFormat(new Date(),"yyyy-MM-dd HH:mm:ss.S")   ==> 2019-11-19 17:10:22.970
 * dateFormat(new Date(),"yyyy-MM-dd hh:mm:ss.S")   ==> 2019-11-19 05:09:54.203
 * dateFormat(new Date(),"yyyy-M-d h:m:s.S")        ==> 2019-11-19 5:19:5.44
 *
 * @param date
 * @param fmt
 * @returns {void | string}
 */
function dateFormat(date, fmt) {
    if (!date instanceof Date) {
        throw TypeError("date不是Date类型");
    }
    if (typeof fmt != "string") {
        throw TypeError("fmt不是字符串类型");
    }
    if (fmt == "" || fmt.length == 0) {
        throw new Error("fmt不能为空");
    }
    let opt = {
        // 年
        "y+": date.getFullYear(),
        // 月
        "M+": date.getMonth() + 1,
        // 日
        "d+": date.getDate(),
        // 时
        "H+": date.getHours(),
        "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
        // 分
        "m+": date.getMinutes(),
        // 秒
        "s+": date.getSeconds(),
        // 季度
        "q+": Math.floor((date.getMonth() + 3) / 3),
        // 毫秒
        "S": date.getMilliseconds()
    };
    for (let k in opt) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            let time = opt[k].toString();
            time = time.padStart(RegExp.$1.length, "0");
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? opt[k] : time)
        }
    }
    return fmt;
}