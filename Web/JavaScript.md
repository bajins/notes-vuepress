# JavaScript


[[toc]]



## Flag

> Vanilla JS 就是指JavaScript

* Ecma 国际，技术委员会 [https://github.com/tc39](https://github.com/tc39)
* ECMAScript支持度检测 [https://github.com/ruanyf/es-checker](https://github.com/ruanyf/es-checker)
* [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese)

+ [https://github.com/topics/validation](https://github.com/topics/validation)
+ [https://github.com/topics/validator](https://github.com/topics/validator)

* [JS刷新当前页面的几种方法总结](http://www.iqianduan.net/blog/refresh-browser-method)
* [js keyup、keypress和keydown事件 详解](https://www.cnblogs.com/manongxiaobing/archive/2012/11/05/2755412.html)
* [js中keyup-keypress-keydown以及oninput四个事件](https://blog.csdn.net/FGstudy/article/details/101854125)
* [keydown,keypress,keyup三者之间的区别](https://blog.csdn.net/qq_26102281/article/details/83785085)
* [前端三大框架与 YUI 以及 EXT.js 这类组件化框架最大的区别是什么？](https://www.zhihu.com/question/336968422/answer/762705515)

- [https://github.com/jsdoc](https://github.com/jsdoc)
- [https://github.com/apidoc](https://github.com/apidoc)


## 手册

> `HTML`网页中，浏览器通过`script`标签加载脚本的默认语言是`JavaScript`，因此`type="application/javascript"`可以省略。

* [https://github.com/wangdoc/javascript-tutorial](https://github.com/wangdoc/javascript-tutorial)
    * [https://wangdoc.com/javascript](https://wangdoc.com/javascript)
* [https://github.com/ruanyf/jstutorial](https://github.com/ruanyf/jstutorial)
    * [http://javascript.ruanyifeng.com](http://javascript.ruanyifeng.com)
* 浏览器脚本教程 [https://www.w3school.com.cn/b.asp](https://www.w3school.com.cn/b.asp)
* 参考手册 [https://www.w3school.com.cn/r.asp](https://www.w3school.com.cn/r.asp)
* [ECMAscript和Javascript的区别](https://www.jianshu.com/p/10cfcb536d4a)
* [es6支持情况](https://kangax.github.io/compat-table/es6)
* [检查JavaScript文件中的ES版本](https://github.com/dollarshaveclub/es-check)
* [文档对象模型 (DOM)](https://developer.mozilla.org/zh-CN/docs/Glossary/DOM)
* [JavaScript HTML DOM](https://www.w3school.com.cn/js/js_htmldom_document.asp)


- 异步编程的反应式扩展rxjs [https://github.com/ReactiveX](https://github.com/ReactiveX)
- 用于浏览器环境规范
    - [https://github.com/amdjs](https://github.com/amdjs)
        - [https://github.com/requirejs](https://github.com/requirejs)
        - [RequireJS和AMD规范 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/tool/requirejs.html)
    - [https://github.com/cmdjs](https://github.com/cmdjs)
    - [https://github.com/seajs](https://github.com/seajs)
    - ECMAScript 6入门 [https://github.com/ruanyf/es6tutorial](https://github.com/ruanyf/es6tutorial)
- 用于Node环境规范
    - [http://www.commonjs.org](http://www.commonjs.org)
    - [CommonJS规范 -- JavaScript 标准参考教程（alpha）](https://javascript.ruanyifeng.com/nodejs/module.html)
- [理解CommonJs、AMD、CMD、ES6模块](https://www.jianshu.com/p/67ce52c93392)


**ECMAScript6**

* [在浏览器中使用javascript module](https://www.jianshu.com/p/f7db50cf956f)

- `Uncaught SyntaxError: Cannot use import statement outside a module`

> 在报错是说无法在模块外部使用`import`语句，因为`Module`的加载实现的是`es6`语法，
> 所以在浏览器加载`html`文件时，需要在`script`标签中加入`type="module"`属性。

```html
<script type="module" src="/static/js/index.js"></script>
```

```js
// ECMAScript Import
import * as util from 'utils';
import { util, test } from 'utils';

// CommonJS Require
const util = require('utils');
```

- 在module中绑定事件

```js
// ECMAScript6使用全局变量配置页面绑定事件
window.getKey = getKey;
// ECMAScript6指定元素添加事件
document.querySelector("#id").addEventListener("click", testOnclick);
```


## 框架

* [https://github.com/topics/jquery](https://github.com/topics/jquery)
* [https://github.com/topics/jquery-plugin](https://github.com/topics/jquery-plugin)
* [https://github.com/jquery](https://github.com/jquery)
    * jQuery API 中文文档 [https://jquery.cuishifeng.cn](https://jquery.cuishifeng.cn)
* [https://github.com/facebook/react](https://github.com/facebook/react)
    * [https://github.com/vercel/next.js](https://github.com/vercel/next.js)
        * [https://www.nextjs.cn](https://www.nextjs.cn)
* [https://github.com/angular/angular.js](https://github.com/angular/angular.js)
    * [https://angularjs.org](https://angularjs.org)
    * [https://angular.cn](https://angular.cn)
* [https://github.com/zdhxiong/mdui](https://github.com/zdhxiong/mdui)
* [https://github.com/baidu/amis](https://github.com/baidu/amis)
* [https://github.com/alienzhou/web-highlighter](https://github.com/alienzhou/web-highlighter)
* [https://github.com/josdejong/mathjs](https://github.com/josdejong/mathjs)
* 单页网站 [https://github.com/alvarotrigo/fullPage.js](https://github.com/alvarotrigo/fullPage.js)
* [https://github.com/ionic-team](https://github.com/ionic-team)
* [http://www.jeasyui.com](http://www.jeasyui.com)
* 图表库 [https://github.com/highcharts](https://github.com/highcharts)
* 响应式框架 [https://github.com/foundation](https://github.com/foundation)



## 第三方依赖库

+ [https://plugins.jquery.com](https://plugins.jquery.com)
+ 添加XHR2 responseType支持的jQuery插件 [https://github.com/acigna/jquery-ajax-native](https://github.com/acigna/jquery-ajax-native)
+ [https://github.com/tonytomov/jqGrid](https://github.com/tonytomov/jqGrid)
+ [https://github.com/topics/jquery-validation](https://github.com/topics/jquery-validation)
    + [https://github.com/jquery-validation](https://github.com/jquery-validation)
        + [https://www.runoob.com/jquery/jquery-plugin-validate.html](https://www.runoob.com/jquery/jquery-plugin-validate.html)
    + [https://github.com/DiegoLopesLima/Validate](https://github.com/DiegoLopesLima/Validate)
+ [https://github.com/DataTables/DataTables](https://github.com/DataTables/DataTables)
+ [https://github.com/malihu/malihu-custom-scrollbar-plugin](https://github.com/malihu/malihu-custom-scrollbar-plugin)
+ [https://github.com/rochal/jQuery-slimScroll](https://github.com/rochal/jQuery-slimScroll)


* [https://github.com/jashkenas/coffeescript](https://github.com/jashkenas/coffeescript)
* [https://github.com/observablehq](https://github.com/observablehq)
* [https://github.com/documentcloud](https://github.com/documentcloud)
* debounce（防抖）、throttle（节流／限频） [https://github.com/jashkenas/underscore](https://github.com/jashkenas/underscore)
    * [https://underscorejs.net](https://underscorejs.net)
* 模板语言 [https://github.com/handlebars-lang/handlebars.js](https://github.com/handlebars-lang/handlebars.js)
* 日期处理类库 [https://github.com/moment](https://github.com/moment)
    * [http://momentjs.cn](http://momentjs.cn)
    * 你不需要Moment.js [https://github.com/you-dont-need/You-Dont-Need-Momentjs](https://github.com/you-dont-need/You-Dont-Need-Momentjs)
    * [https://github.com/moment/luxon](https://github.com/moment/luxon)
* [https://github.com/js-joda](https://github.com/js-joda)
* [https://github.com/iamkun/dayjs](https://github.com/iamkun/dayjs)
* [https://github.com/date-fns](https://github.com/date-fns)
* 当前设备 [https://github.com/matthewhudson/current-device](https://github.com/matthewhudson/current-device)
* 转换编译器 [https://github.com/babel](https://github.com/babel)
    * [https://babeljs.io](https://babeljs.io)
    * [https://www.babeljs.cn](https://www.babeljs.cn)
* 压缩或编码解码库 [https://github.com/photopea](https://github.com/photopea)
* 压缩 [https://github.com/photopea](https://github.com/nodeca/pako)
* [https://github.com/Stuk/jszip](https://github.com/Stuk/jszip)
* 使浏览器支持require [https://github.com/browserify](https://github.com/browserify)
* [https://github.com/pixijs/pixi.js](https://github.com/pixijs/pixi.js)
* 现代化的拷贝文字 [https://github.com/zenorocha/clipboard.js](https://github.com/zenorocha/clipboard.js)
    * [http://www.clipboardjs.cn](http://www.clipboardjs.cn)
* 用于缩放图像 [https://github.com/francoischalifour/medium-zoom](https://github.com/francoischalifour/medium-zoom)
* SVG绘图编辑器 [https://github.com/SVG-Edit](https://github.com/SVG-Edit)
* [https://github.com/MrRio/jsPDF](https://github.com/MrRio/jsPDF)
* [https://github.com/mozilla/pdf.js](https://github.com/mozilla/pdf.js)
* 电子表格数据工具包 [https://github.com/SheetJS](https://github.com/SheetJS)
* 绑定按键 [https://github.com/jamiebuilds/tinykeys](https://github.com/jamiebuilds/tinykeys)
* 语法高亮 [https://github.com/PrismJS](https://github.com/PrismJS)


- [https://github.com/liriliri/licia](https://github.com/liriliri/licia)
- [https://github.com/Rob--W/cors-anywhere](https://github.com/Rob--W/cors-anywhere)
- [https://github.com/apache/incubator-echarts](https://github.com/apache/incubator-echarts)
- [neditor 基于ueditor的更现代化的富文本编辑器，支持HTTPS](https://github.com/notadd/neditor)
- [https://github.com/sentsin/layui](https://github.com/sentsin/layui)



**HTTP**

* [https://github.com/wendux/fly](https://github.com/wendux/fly)
* [https://github.com/github/fetch](https://github.com/github/fetch)
* [https://github.com/axios/axios](https://github.com/axios/axios)


**导出**

* [TableExport](https://github.com/clarketm/TableExport)
* [tableExport.jquery.plugin](https://github.com/hhurz/tableExport.jquery.plugin)
* [excellentexport](https://github.com/jmaister/excellentexport)



**流程图**

+ [https://github.com/topics/diagram](https://github.com/topics/diagram)
+ [https://github.com/topics/flowchart](https://github.com/topics/flowchart)

* 3D库 [https://github.com/mrdoob/three.js](https://github.com/mrdoob/three.js)
* 图表库 [https://github.com/NorthwoodsSoftware/GoJS](https://github.com/NorthwoodsSoftware/GoJS)
* [https://github.com/jsplumb](https://github.com/jsplumb)
* [https://github.com/antvis](https://github.com/antvis)
* [https://github.com/noflo](https://github.com/noflo)
* [https://github.com/fex-team](https://github.com/fex-team)
* [https://github.com/bpmn-io](https://github.com/bpmn-io)
* [https://github.com/dagrejs](https://github.com/dagrejs)
* [https://github.com/jgrap](https://github.com/jgraph)
    * [https://github.com/jinzhanye/pokemon-diagram](https://github.com/jinzhanye/pokemon-diagram)
    * [mxGraph 入门实例教程](https://segmentfault.com/a/1190000018510996)
* [https://github.com/fabricjs](https://github.com/fabricjs)
* [https://github.com/cytoscape](https://github.com/cytoscape)
* [https://github.com/paperjs](https://github.com/paperjs)
* [https://github.com/d3](https://github.com/d3)
* [https://github.com/freegroup/draw2d](https://github.com/freegroup/draw2d)
* [https://github.com/projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams)
* [https://github.com/auto-workflow/AWorkflow](https://github.com/auto-workflow/AWorkflow)
* [https://github.com/mermaidjs/mermaid-live-editor](https://github.com/mermaidjs/mermaid-live-editor)
* 实体建模 [https://github.com/jscad](https://github.com/jscad)
    * [https://github.com/uetchy/cadmio](https://github.com/uetchy/cadmio)
    * [https://github.com/gilboonet](https://github.com/gilboonet)
* [https://github.com/adrai](https://github.com/adrai)
* [https://github.com/socketio](https://github.com/socketio)
* [https://www.jointjs.com](https://www.jointjs.com)
    * [https://resources.jointjs.com/tutorials/joint/tutorials/ports.html](https://resources.jointjs.com/tutorials/joint/tutorials/ports.html)



**Player**

* [https://github.com/MoePlayer](https://github.com/MoePlayer)
* Plyr–一个轻量级的HTML5播放器 [https://github.com/sampotts/plyr](https://github.com/sampotts/plyr)


**反爬虫**

* [https://github.com/antoinevastel/fpscanner](https://github.com/antoinevastel/fpscanner)
* [https://github.com/ta7sudan/secan](https://github.com/ta7sudan/secan)
* [前端如何检测Chrome-Headless不被爬虫虐](https://mlln.cn/2019/07/05/%E5%89%8D%E7%AB%AF%E5%A6%82%E4%BD%95%E6%A3%80%E6%B5%8BChrome-Headless%E4%B8%8D%E8%A2%AB%E7%88%AC%E8%99%AB%E8%99%90)




## VueJS

+ [https://github.com/topics/vue](https://github.com/topics/vue)

* [https://github.com/vuejs](https://github.com/vuejs)
    * [https://cn.vuejs.org](https://cn.vuejs.org)
* [vue学习笔记](https://www.rumosky.wiki/docs/vue_learning_process)
* [https://github.com/quasarframework](https://github.com/quasarframework)

![](/images/vue生命周期详解.png)


* [https://github.com/PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)


### VueJS框架

* [https://madewithvuejs.com](https://madewithvuejs.com)
* [https://github.com/vuetifyjs/vuetify](https://github.com/vuetifyjs/vuetify)
* [https://github.com/buefy/buefy](https://github.com/buefy/buefy)
* [https://github.com/bootstrap-vue/bootstrap-vue](https://github.com/bootstrap-vue/bootstrap-vue)
* [https://github.com/vuematerial/vue-material](https://github.com/vuematerial/vue-material)
* [https://github.com/uikit/uikit](https://github.com/uikit/uikit)
* [https://github.com/sdc-alibaba/sui](https://github.com/sdc-alibaba/sui)
* [https://github.com/FE-Driver/vue-beauty](https://github.com/FE-Driver/vue-beauty)
* [https://github.com/chenz24/vue-blu](https://github.com/chenz24/vue-blu)
* [https://github.com/ant-design/ant-design](https://github.com/ant-design/ant-design)
* [https://github.com/heyui/heyui](https://github.com/heyui/heyui)
* [https://github.com/at-ui/at-ui](https://github.com/at-ui/at-ui)
* [https://github.com/view-design/ViewUI](https://github.com/view-design/ViewUI)
* [https://github.com/ElemeFE/element](https://github.com/ElemeFE/element)



**Mobile**

* [https://github.com/airyland/vux](https://github.com/airyland/vux)
* [https://github.com/sdc-alibaba/SUI-Mobile](https://github.com/sdc-alibaba/SUI-Mobile)
* [https://github.com/ElemeFE/mint-ui](https://github.com/ElemeFE/mint-ui)
* [https://github.com/didi/cube-ui](https://github.com/didi/cube-ui)


### 动态导入组件

```js
() => import(`@${_this.files.path}.vue`)

//component(resolve) {require([`@${_this.files.path}.vue`], resolve)}
resolve => require([`@${_this.files.path}.vue`], resolve)

resolve => require.ensure([], () => resolve(require(`@${_this.files.path}.vue`)))

const resolveRequire = (path) => {
    return resolve => {
        require.ensure([], (require) => {
            resolve(require(`@${path}.vue`));
        });
    }
}
```




