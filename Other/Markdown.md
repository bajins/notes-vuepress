# Markdown

[[toc]]


## Flag

> 该文件用来测试和展示书写README的各种markdown语法。
>
> GitHub的markdown语法在标准的markdown语法基础上做了扩充，称之为`GitHub Flavored Markdown`。简称`GFM`，GFM在GitHub上有广泛应用，
> 除了README文件外，issues和wiki均支持markdown语法。

* [https://daringfireball.net/projects/markdown](https://daringfireball.net/projects/markdown)
    * [https://daringfireball.net/projects/markdown/dingus](https://daringfireball.net/projects/markdown/dingus)
* [GitHub Flavored Markdown基本撰写和格式语法](https://help.github.com/cn/github/writing-on-github/basic-writing-and-formatting-syntax)
* [https://segmentfault.com/markdown](https://segmentfault.com/markdown)
* [https://github.com/guodongxiaren/README](https://github.com/guodongxiaren/README)
* [markdown语法大全](https://www.rumosky.wiki/docs/markdown)
* [https://github.com/mattcone/markdown-guide](https://github.com/mattcone/markdown-guide)
* [https://guides.github.com/features/mastering-markdown](https://guides.github.com/features/mastering-markdown)
* Markdeep是Markdown的超集 [https://github.com/morgan3d/markdeep](https://github.com/morgan3d/markdeep)
* CommonMark [https://github.com/commonmark](https://github.com/commonmark)
* MultiMarkdown [https://github.com/fletcher/MultiMarkdown-6](https://github.com/fletcher/MultiMarkdown-6)
* Kramdown [https://github.com/gettalong/kramdown](https://github.com/gettalong/kramdown)
* [https://github.com/docbook](https://github.com/docbook)
* reStructuredText [https://sourceforge.net/projects/docutils](https://sourceforge.net/projects/docutils)
* [https://github.com/pygments/pygments](https://github.com/pygments/pygments)
    * [https://github.com/mitsuhiko](https://github.com/mitsuhiko)
    * [https://github.com/birkenfeld](https://github.com/birkenfeld)
* [https://github.com/sphinx-doc/sphinx](https://github.com/sphinx-doc/sphinx)
    * [https://zh-sphinx-doc.readthedocs.io](https://zh-sphinx-doc.readthedocs.io)
* [https://sourceforge.net/projects/epydoc](https://sourceforge.net/projects/epydoc)
* [https://github.com/numpy/numpydoc](https://github.com/numpy/numpydoc)
* [https://github.com/pycco-docs/pycco](https://github.com/pycco-docs/pycco)
* [https://github.com/Python-Markdown/markdown](https://github.com/Python-Markdown/markdown)
* [https://github.com/jgm/pandoc](https://github.com/jgm/pandoc)
* [https://github.com/missive/emoji-mart](https://github.com/missive/emoji-mart)
* [https://github.com/rickstaa/github-emoji-picker](https://github.com/rickstaa/github-emoji-picker)
* [https://github.com/Awes0meM4n/Awes0meM4n.github.io](https://github.com/Awes0meM4n/Awes0meM4n.github.io)




- 文档转换 [https://github.com/topics/converter](https://github.com/topics/converter)
- [https://github.com/topics/emoji](https://github.com/topics/emoji)
- GitHub角落图标 [https://github.com/tholman/github-corners](https://github.com/tholman/github-corners)
- SVG徽章 [https://github.com/badges/shields](https://github.com/badges/shields)
- [https://github.com/WebpageFX/emoji-cheat-sheet.com](https://github.com/WebpageFX/emoji-cheat-sheet.com)
    - [http://www.emoji-cheat-sheet.com](http://www.emoji-cheat-sheet.com)
- [https://github.com/carloscuesta/gitmoji](https://github.com/carloscuesta/gitmoji)
- [https://github.com/caiyongji/emoji-list](https://github.com/caiyongji/emoji-list)
- [https://github.com/12313kaihuang/GitHub-Emoji](https://github.com/12313kaihuang/GitHub-Emoji)
- [https://github.com/liuchengxu/git-commit-emoji-cn](https://github.com/liuchengxu/git-commit-emoji-cn)
- [https://github.com/afeld/emoji-css](https://github.com/afeld/emoji-css)
- [Github 上 emoji 表情的含义及使用规范](https://mkblog.cn/872)
- [https://github.com/mkdocs/mkdocs](https://github.com/mkdocs/mkdocs)
- 转PDF [https://github.com/realdennis/md2pdf](https://github.com/realdennis/md2pdf)
- [https://github.com/BlueHatbRit/mdpdf](https://github.com/BlueHatbRit/mdpdf)


> 表情（两个冒号包围的字符）,比如`:blush:`，可以显示 :blush:

+ 中文文案排版指北：[https://github.com/sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines)
+ 中英混排文档在线排版工具：[https://github.com/CyC2018/Text-Typesetting](https://github.com/CyC2018/Text-Typesetting)
    + [https://cyc2018.github.io/Text-Typesetting](https://cyc2018.github.io/Text-Typesetting)




## 横线

```
***
```

```
---
```

```
___
```



## 标题

`#` 一级标题  
`##` 二级标题  
`###` 三级标题  
`####` 四级标题  
`#####` 五级标题  
`######` 六级标题  


## 文本

### 普通文本

这是一段普通的文本

### 单行文本

> 在一行开头加入1个Tab或者4个空格。

    Hello,大家好，我是果冻虾仁。


### 文本块

**语法1**

> 在连续几行的文本开头加入1个Tab或者4个空格。

    欢迎到访
    很高兴见到您
    祝您，早上好，中午好，下午好，晚安

**语法2**

> 使用一对各三个的反引号

> 该语法也可以实现代码高亮，见[代码高亮](#代码高亮)

```
欢迎到访
我是C++码农
你可以在知乎、CSDN、简书搜索【果冻虾仁】找到我
```

### 文字高亮

> 文字高亮功能能使行内部分文字高亮，使用一对反引号。

> 也适合做一篇文章的tag

```
`linux` `网络编程` `socket` `epoll` 
```

> 效果：`linux` `网络编程` `socket` `epoll`


**换行**

> 直接回车不能换行，可以在上一行文本后面补两个空格，这样下一行的文本就换行了。
>
> 或者就是在两行文本直接加一个空行。也能实现换行效果，不过这个行间距有点大。

## 表格

> 表格可以指定对齐方式

| 左对齐         | 居中            | 右对齐 |
| :------------ |:---------------:| -----:|
| col 3 is      | some wordy text | $1600 |
| col 2 is      | centered        |   $12 |
| zebra stripes | are neat        |    $1 |


## 字体

- 斜体、粗体、删除线

| 语法                      	| 效果                    	|
|---------------------------	|-------------------------	|
| `*斜体1*`                 	| *斜体1*                 	|
| `_斜体2_`                 	| _斜体2_                 	|
| `**粗体1**`               	| **粗体1**               	|
| `__粗体2__`               	| __粗体2__               	|
| `这是一个 ~~删除线~~`     	| 这是一个 ~~删除线~~     	|
| `***斜粗体1***`           	| ***斜粗体1***           	|
| `___斜粗体2___`           	| ___斜粗体2___           	|
| `***~~斜粗体删除线1~~***` 	| ***~~斜粗体删除线1~~*** 	|
| `~~***斜粗体删除线2***~~` 	| ~~***斜粗体删除线2***~~ 	|

> 斜体、粗体、删除线可混合使用

## 图片

- 基本格式：`![alt](URL title)`

- alt和title即对应HTML中的alt和title属性（都可省略）
    - alt表示图片显示失败时的替换文本
    - title表示鼠标悬停在图片时的显示文本（注意这里要加引号）

| 语法                                                       	| 效果                                                     	|
|------------------------------------------------------------	|----------------------------------------------------------	|
| `![baidu](http://www.baidu.com/img/bdlogo.gif "百度logo")` 	| ![baidu](http://www.baidu.com/img/bdlogo.gif "百度logo") 	|
| `![](http://www.baidu.com/img/bdlogo.gif)`                    | ![](http://www.baidu.com/img/bdlogo.gif)              	|


## 链接

| 语法                                            	| 效果                                          	|
|-------------------------------------------------	|-----------------------------------------------	|
| `[我的博客](https://www.bajins.com "悬停显示")` 	| [我的博客](https://www.bajins.com "悬停显示") 	|
| `[我的博客](https://www.bajins.com) `           	| [我的博客](/README.md)                        	|

### URL变量

- 定义变量

```
[var]:https://www.bajins.com
[blog]:https://www.bajins.com "我的博客"
[baidu-logo]:http://www.baidu.com/img/bdlogo.gif "百度logo"
```

[var]:https://www.bajins.com
[blog]:https://www.bajins.com "我的博客"
[baidu-logo]:http://www.baidu.com/img/bdlogo.gif "百度logo"

| 使用变量语法                               | 效果                                   	|
|------------------------------------------	|----------------------------------------	|
| `[使用变量][var]`                        	| [使用变量][var]                        	|
| `[我的博客][blog]`                       	| [我的博客][blog]                       	|
| `![baidu][baidu-logo]`                   	| ![baidu][baidu-logo]                   	|
| `[![baidu-logo]](https://www.baidu.com)` 	| [![baidu-logo]](https://www.baidu.com) 	|


### 图片链接

> 给图片加链接的本质是混合图片显示语法和普通的链接语法。普通的链接中[ ]内部是链接要显示的文本，而图片链接[ ]里面则是要显示的图片。  
> 直接混合两种语法当然可以，但是十分啰嗦，为此我们可以使用URL标识符的形式。

[zhihu-logo]:https://static.zhihu.com/static/favicon.ico "知乎logo"

| 语法                                                           	| 效果                                                         	|
|----------------------------------------------------------------	|--------------------------------------------------------------	|
| `[![weibo](https://weibo.com/favicon.ico)](https://weibo.com)` 	| [![weibo](https://weibo.com/favicon.ico)](https://weibo.com) 	|
| `[![][zhihu-logo]](https://www.zhihu.com "知乎")`              	| [![][zhihu-logo]](https://www.zhihu.com "知乎")              	|


> 注意，此时鼠标悬停时显示的文字是图片的title，而非链接本身的title了。


### 锚点

> 其实呢，每一个标题都是一个锚点，和HTML的锚点（`#`）类似，比如`[回到顶部](#readme)`[回到顶部](#readme)

> 不过要注意，标题中的英文字母都被转化为**小写字母**了。

- 注意

> 标题中的空格都是转换为`-`，标题中有除字体或字母数字以外的符号时应该在锚点中直接去除后方可跳转

```diff
* [获得当前日期+时间`date+time`函数](#获得当前日期时间datetime函数)

## 获得当前日期+时间date+time函数
```
```diff
* [获得当前日期+时间（date+time）函数](#获得当前日期时间datetime函数)

## 获得当前日期+时间（date+time）函数
```


## 列表

### 无序列表

* 昵称：果冻虾仁
- 别名：隔壁老王
+ 英文名：Jelly

### 多级无序列表

* 编程语言
    * 脚本语言
        * Python

### 有序列表

**一般效果**

> 就是在数字后面加一个点，再加一个空格。不过看起来起来可能不够明显。    

- 面向对象的三个基本特征：

1. 封装
2. 继承
3. 多态


**多级有序列表**

> 和无序列表一样，有序列表也有多级结构 

1. 这是一级的有序列表，数字1还是1
   1. 这是二级的有序列表，阿拉伯数字在显示的时候变成了罗马数字
      1. 这是三级的有序列表，数字在显示的时候变成了英文字母
	 

### 复选框列表

- [x] 需求分析
- [x] 系统设计
- [x] 详细设计
- [ ] 编码
- [ ] 测试
- [ ] 交付

> 您可以使用这个功能来标注某个项目各项任务的完成情况。

> Tip:
>> 在GitHub的**issue**中使用该语法是可以实时点击复选框来勾选或解除勾选的，而无需修改issue原文。

## 块引用

### 常用于引用文本

- 文本摘自《深入理解计算机系统》P27

　令人吃惊的是，在哪种字节顺序是合适的这个问题上，人们表现得非常情绪化。
实际上术语“little endian”（小端）和“big endian”（大端）出自Jonathan Swift的《格利佛游记》一书，
其中交战的两个派别无法就应该从哪一端打开一个半熟的鸡蛋达成一致。因此，争论沦为关于社会政治的争论。
只要选择了一种规则并且始终如一的坚持，其实对于哪种字节排序的选择都是任意的。

> **“端”（endian）的起源**  
以下是Jonathan Swift在1726年关于大小端之争历史的描述：  
“……下面我要告诉你的是，Lilliput和Blefuscu这两大强国在过去36个月里一直在苦战。
战争开始是由于以下的原因：我们大家都认为，吃鸡蛋前，原始的方法是打破鸡蛋较大的一端，
可是当今的皇帝的祖父小时候吃鸡蛋，一次按古法打鸡蛋时碰巧将一个手指弄破了，因此他的父亲，
当时的皇帝，就下了一道敕令，命令全体臣民吃鸡蛋时打破较小的一端，违令者重罚。”

### 块引用有多级结构

> 数据结构
>> 树
>>> 二叉树
>>>> 平衡二叉树
>>>>> 满二叉树

## 代码高亮

> 在三个反引号后面加上编程语言的名字(如果是配置则为`ini`、`conf`、`properties`)，另起一行开始写代码，最后一行再加上三个反引号。

* [https://en.wikipedia.org/wiki/Configuration_file](https://en.wikipedia.org/wiki/Configuration_file)
* [https://prismjs.com/#supported-languages](https://prismjs.com/#supported-languages)


```Java
public static void main(String[]args){} //Java
```

```c
int main(int argc, char *argv[]) //C
```

```Bash
echo "hello GitHub" #Bash
```

```javascript
document.getElementById("myH1").innerHTML="Welcome to my Homepage"; //javascipt
```

```cpp
string &operator+(const string& A,const string& B) //cpp
```



## diff语法

> 版本控制的系统中都少不了`diff`的功能，即展示一个文件内容的增加与删除。

> GFM中可以显示的展示diff效果。使用绿色表示新增，红色表示删除。

> 其语法与代码高亮类似，只是在三个反引号后面写`diff`，并且其内容中，以 `+ `开头表示新增，`- `开头表示删除。另外还有有`!`和`#`的语法。

- 效果如下：

```diff
+ 人闲桂花落，
- 夜静春山空。
! 月出惊山鸟，
# 时鸣春涧中。
```


## HTML元素

- `<code></code>`
- `<pre></pre>`
- `<kdb></kdb>`
- `<b></b>`
- `<strong></strong>`
- `<i></i>`
- `<em></em>`
- `<sup></sup>`
- `<sub></sub>`
- `<br/>`
- `<details><summary style="font-size:160%;">点击查看</summary></details>`


## 工具

### 输出目录结构


**Windows**

- `TREE [drive:][path] [/F] [/A]`
     - /F   显示每个文件夹中文件的名称。默认是只输出文件夹的名字。
     - /A   使用 ASCII 字符，而不使用扩展字符。

> 生成当前目录下的结构到 test 文件中：`TREE /F >test`


**Linux**

- `yum install -y tree` 安装
- `tree --help` 查看使用帮助
- `man tree` 查看更详细的参数说明


**NodeJS**

* [https://github.com/derycktse/treer](https://github.com/derycktse/treer)
* [https://github.com/JohnByrneRepo/mddir](https://github.com/JohnByrneRepo/mddir)
* [https://github.com/zero9527/node-test](https://github.com/zero9527/node-test)



### 微信公众号排版

* [https://github.com/aclickall/aclickall.github.io](https://github.com/aclickall/aclickall.github.io)
    * [md.aclickall.com](https://md.aclickall.com)
* [https://github.com/doocs/md](https://github.com/doocs/md)
    * [https://doocs.github.io/md](https://doocs.github.io/md)
* [https://github.com/phodal/mifa](https://github.com/phodal/mifa)
    * [http://relatos.top/md](http://relatos.top/md)
    * [https://md.phodal.com](https://md.phodal.com)
* [https://github.com/mdnice/markdown-nice](https://github.com/mdnice/markdown-nice)
    * [https://mdnice.com](https://mdnice.com)
* [https://github.com/lyricat/wechat-format](https://github.com/lyricat/wechat-format)
* [https://github.com/zkqiang/wechat-mdeditor](https://github.com/zkqiang/wechat-mdeditor)
* [https://github.com/dyc87112/online-markdown](https://github.com/dyc87112/online-markdown)
* [https://github.com/didadi599/wechat-markdown-editor](https://github.com/didadi599/wechat-markdown-editor)
* [wechat-editor](https://so-easy.cc/wechat-editor)
* [https://knb.im/mp](https://knb.im/mp)
* [https://github.com/ufologist/wechat-mp-article](https://github.com/ufologist/wechat-mp-article)
* [https://github.com/barretlee/online-markdown](https://github.com/barretlee/online-markdown)
* [https://github.com/wangduanduan/m2w-transform](https://github.com/wangduanduan/m2w-transform)
    * [https://wdd.js.org/m2w-transform](https://wdd.js.org/m2w-transform)
* [https://github.com/lyricat/wechat-format](https://github.com/lyricat/wechat-format)
    * [https://lab.lyric.im/wxformat](https://lab.lyric.im/wxformat)

- [mp-transform-public](https://github.com/ZhuPeng/mp-transform-public)



### 表格生成

> `HTML`表格转`Excel`可以直接在`office Excel`中点击 `数据` -> `自网站` -> `URL` 然后进行操作

* [https://tableconvert.com](https://tableconvert.com)
* [https://www.tablesgenerator.com/markdown_tables](https://www.tablesgenerator.com/markdown_tables)
* [https://markdown-convert.com/zh](https://markdown-convert.com/zh)
* [https://github.com/stevecat/table-magic](https://github.com/stevecat/table-magic)
* [https://github.com/jakebathman/Markdown-Table-Generator](https://github.com/jakebathman/Markdown-Table-Generator)
* [https://github.com/donatj/CsvToMarkdownTable](https://github.com/donatj/CsvToMarkdownTable)
* [https://github.com/jonmagic/copy-excel-paste-markdown](https://github.com/jonmagic/copy-excel-paste-markdown)



### 生成标题目录树

> `TOC` [https://en.wikipedia.org/wiki/Table_of_contents](https://en.wikipedia.org/wiki/Table_of_contents)

+ [https://github.com/topics/toc](https://github.com/topics/toc)
+ [https://github.com/topics/table-of-contents](https://github.com/topics/table-of-contents)
+ [https://github.com/topics/toc-generator](https://github.com/topics/toc-generator)
+ [https://github.com/topics/markdown-toc](https://github.com/topics/markdown-toc)

* [https://github.com/dohliam/tocdown](https://github.com/dohliam/tocdown)
    * [https://dohliam.github.io/tocdown](https://dohliam.github.io/tocdown)
* [markdown-toc-generate](https://magnetikonline.github.io/markdown-toc-generate)
    * [https://github.com/magnetikonline/markdown-toc-generate](https://github.com/magnetikonline/markdown-toc-generate)
* [https://github.com/nochso/tocenize](https://github.com/nochso/tocenize)
* [https://github.com/thlorenz/doctoc](https://github.com/thlorenz/doctoc)
* [https://github.com/dkyaorui/MDToc](https://github.com/dkyaorui/MDToc)
* [https://github.com/medfreeman/markdown-it-toc-and-anchor](https://github.com/medfreeman/markdown-it-toc-and-anchor)
* [https://github.com/jonschlinkert/gulp-format-md](https://github.com/jonschlinkert/gulp-format-md)
* [https://github.com/remarkablemark/mdtocs](https://github.com/remarkablemark/mdtocs)
    * [https://remarkablemark.org/mdtocs](https://remarkablemark.org/mdtocs)
* [https://github.com/luciopaiva/markdown-toc](https://github.com/luciopaiva/markdown-toc)
    * [https://luciopaiva.com/markdown-toc](https://luciopaiva.com/markdown-toc)


### 解析库

+ [https://github.com/topics/markdown](https://github.com/topics/markdown)
+ [https://github.com/topics/markdown-to-html](https://github.com/topics/markdown-to-html)

* [https://github.com/domchristie/turndown](https://github.com/domchristie/turndown)
    * [https://domchristie.github.io/turndown](https://domchristie.github.io/turndown)
* [https://github.com/markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)
* [https://github.com/markedjs/marked](https://github.com/markedjs/marked)
    * [https://marked.js.org/demo](https://marked.js.org/demo)
* [https://github.com/mdnice/markdown-resume](https://github.com/mdnice/markdown-resume)
* [https://github.com/syfxlin/xkeditor](https://github.com/syfxlin/xkeditor)
* [https://github.com/pandao/editor.md](https://github.com/pandao/editor.md)
* [https://github.com/jonschlinkert/remarkable](https://github.com/jonschlinkert/remarkable)
* [https://github.com/benweet/stackedit](https://github.com/benweet/stackedit)
* [https://github.com/commonmark/commonmark.js](https://github.com/commonmark/commonmark.js)
* [https://github.com/showdownjs/showdown](https://github.com/showdownjs/showdown)
* [https://github.com/github/markup](https://github.com/github/markup)
* [https://github.com/mermaid-js/mermaid](https://github.com/mermaid-js/mermaid)



### 在线版客户端

* [https://dillinger.io](https://dillinger.io)
* [https://tool.lu/markdown](https://tool.lu/markdown)
* [https://github.com/jserme/mahua](https://github.com/jserme/mahua)
    * [http://mahua.jser.me](http://mahua.jser.me)
* 马克飞象 [https://maxiang.io](https://maxiang.io)
* Markdown Plus [http://mdp.tylingsoft.com](http://mdp.tylingsoft.com)
* 小书匠 [http://markdown.xiaoshujiang.com](http://markdown.xiaoshujiang.com)
* Cmd Markdown [https://www.zybuluo.com/mdeditor](https://www.zybuluo.com/mdeditor)
* [https://github.com/JP1016/Markdown](https://github.com/JP1016/Markdown)
* [https://github.com/aromalanil/markItDown](https://github.com/aromalanil/markItDown)
    * [https://markitdown.netlify.app](https://markitdown.netlify.app)
* [https://github.com/davidfowl/TodoApi](https://github.com/davidfowl/TodoApi)



### 本地版客户端

* ~~[https://github.com/typora](https://github.com/typora)~~
    * ~~[https://www.typora.io](https://www.typora.io)~~
    * [https://github.com/DiamondHunters/NodeInject_Hook_example](https://github.com/DiamondHunters/NodeInject_Hook_example)
* [https://github.com/Saul-Mirone/milkdown](https://github.com/Saul-Mirone/milkdown)
* [https://github.com/laurent22/joplin](https://github.com/laurent22/joplin)
* MarkPad [https://github.com/Code52/DownmarkerWPF](https://github.com/Code52/DownmarkerWPF)
* [Haroopad](http://pad.haroopress.com/user.html)
* [https://github.com/MacDownApp/macdown](https://github.com/MacDownApp/macdown)
* [https://github.com/Zettlr/Zettlr](https://github.com/Zettlr/Zettlr)
* [https://github.com/rickstrahl/MarkdownMonster](https://github.com/rickstrahl/MarkdownMonster)
* [https://github.com/marktext/marktext](https://github.com/marktext/marktext)
    * [https://marktext.app](https://marktext.app)
* [https://obsidian.md](https://obsidian.md)
* [https://github.com/notable/notable](https://github.com/notable/notable)
* [https://github.com/nhn/tui.editor](https://github.com/nhn/tui.editor)
* [https://github.com/aguang-xyz/aurora-editor](https://github.com/aguang-xyz/aurora-editor)
* 笔记 [https://github.com/laurent22/joplin](https://github.com/laurent22/joplin)
* [https://github.com/evernote](https://github.com/evernote)
* [https://github.com/leanote](https://github.com/leanote)
* [https://github.com/zadam/trilium](https://github.com/zadam/trilium)
* [https://github.com/flxzt/rnote](https://github.com/flxzt/rnote)
* [https://github.com/pbek/QOwnNotes](https://github.com/pbek/QOwnNotes)
* [https://github.com/usememos/memos](https://github.com/usememos/memos)
* [https://github.com/standardnotes](https://github.com/standardnotes)
* [https://github.com/oleeskild/obsidian-digital-garden](https://github.com/oleeskild/obsidian-digital-garden)
    * [https://github.com/obsidianmd](https://github.com/obsidianmd)