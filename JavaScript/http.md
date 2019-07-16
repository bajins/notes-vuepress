# Http

## 请求头常量
```javascript
/**
 * 请求方式（OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT）
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 13:53
 */
const METHOD = {
    OPTIONS: "OPTIONS",
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    TRACE: "TRACE",
    CONNECT: "CONNECT"
}

/**
 * 请求数据类型,告诉服务器，我要发什么类型的数据。
 *
 * application/x-www-form-urlencoded：数据被编码为名称/值对。这是标准的编码格式。默认使用此类型。
 * multipart/form-data：数据被编码为一条消息，页上的每个控件对应消息中的一个部分。
 * text/plain：数据以纯文本形式(text/json/xml/html)进行编码，其中不含任何控件或格式字符。postman软件里标的是RAW。
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 13:56
 */
const CONTENT_TYPE = {
    URLENCODED: "application/x-www-form-urlencoded",
    FORM_DATA: "multipart/form-data",
    TEXT_PLAIN: "text/plain"
}

/**
 * 预期服务器返回的数据类型（对应请求头中的Accept），如果是下载文件则指定RESPONSE_TYPE
 *
 * 如果没有指定，那么会自动推断是返回 XML，还是JSON，还是script，还是String。
 * xml: 返回 XML 文档。
 * html: 返回纯文本 HTML 信息；包含的 script 标签会在插入 dom 时执行。
 * script: 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了 “cache” 参数。
 * 注意：在远程请求时(不在同一个域下)，所有 POST 请求都将转为 GET 请求。（因为将使用 DOM 的 script标签来加载）
 * json: 返回 JSON 数据 。
 * jsonp: JSONP 格式。使用 JSONP 形式调用函数时，如 “myurl?callback=?” jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
 * text: 返回纯文本字符串
 *
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 14:00
 */
const DATA_TYPE = {
    JSON: "json", TEXT: "text", XML: "xml", HTML: "html", SCRIPTY: "script", JSONP: "jsonp"
}

/**
 * 响应的数据类型
 *
 *   ""    将 responseType 设为空字符串与设置为"text"相同， 是默认类型 （实际上是 DOMString）。
 *  "arraybuffer"    response 是一个包含二进制数据的 JavaScript ArrayBuffer 。
 *  "blob"    response 是一个包含二进制数据的 Blob 对象 。
 *  "document"    response 是一个 HTML Document 或 XML XMLDocument ，这取决于接收到的数据的 MIME 类型。
 *  "json"    response 是一个 JavaScript 对象。这个对象是通过将接收到的数据类型视为 JSON 解析得到的。
 *  "text"    response 是包含在 DOMString 对象中的文本。
 *  "moz-chunked-arraybuffer" 与"arraybuffer"相似，但是数据会被接收到一个流中。
 *         使用此响应类型时，响应中的值仅在 progress 事件的处理程序中可用，并且只包含上一次响应 progress 事件以后收到的数据，
 *         而不是自请求发送以来收到的所有数据。在 progress 事件处理时访问 response 将返回到目前为止收到的数据。
 *         在 progress 事件处理程序之外访问， response 的值会始终为 null 。
 *  "ms-stream"  response 是下载流的一部分；此响应类型仅允许下载请求，并且仅受Internet Explorer支持。
 * @return
 * @Description
 * @author claer woytu.com
 * @date 2019/4/30 14:13
 */
const RESPONSE_TYPE = {
    TEXT: "text", ARRAYBUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", MS_STREAM: "ms-stream"
}

```

## 下载文件
```javascript
// responseType: RESPONSE_TYPE.BLOB
//从response的headers中获取filename, 后端response.setHeader("Content-Disposition", "attachment; filename=xxxx.xxx") 设置的文件名;
let contentDisposition = result.headers['Content-Disposition'];
let reg = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
let filename = reg.exec(contentDisposition)[1];
// 取文件名信息中的文件名,替换掉文件名中多余的符号
filename = filename.replaceAll("\\\\|/|\"", "");
let downloadElement = document.createElement('a');

//这里res.data是返回的blob对象
let blob = new Blob([result.data], {type: 'application/octet-stream;charset=utf-8'});
// 创建下载的链接
let href = window.URL.createObjectURL(blob);

downloadElement.style.display = 'none';
downloadElement.href = href;
// 下载后文件名
downloadElement.download = filename;
document.body.appendChild(downloadElement);
// 点击下载
downloadElement.click();
// 下载完成移除元素
document.body.removeChild(downloadElement);
// 释放掉blob对象
window.URL.revokeObjectURL(href);
```