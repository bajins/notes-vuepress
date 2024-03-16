# TextTditor

[[toc]]


## Flag

+ [https://github.com/topics/notepad](https://github.com/topics/notepad)


* [https://github.com/GNOME/gedit](https://github.com/GNOME/gedit)
* [https://github.com/emacs-tw/awesome-emacs](https://github.com/emacs-tw/awesome-emacs)
    * [http://www.gnu.org/software/emacs](http://www.gnu.org/software/emacs)
* [https://github.com/geany/geany](https://github.com/geany/geany)
* [https://www.nano-editor.org](https://www.nano-editor.org)
* [https://github.com/zyedidia/micro](https://github.com/zyedidia/micro)
* [https://vim.org](https://vim.org)
    * [https://github.com/neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)
    * [https://github.com/thaerkh/vim-workspace](https://github.com/thaerkh/vim-workspace)
    * [https://github.com/neovim/neovim](https://github.com/neovim/neovim)
    * [https://github.com/NvChad/NvChad](https://github.com/NvChad/NvChad)
    * [https://github.com/ms-jpq/coq_nvim](https://github.com/ms-jpq/coq_nvim)
    * [https://github.com/nvim-treesitter](https://github.com/nvim-treesitter)
    * [https://github.com/KillTheMule/nvim-rs](https://github.com/KillTheMule/nvim-rs)
    * [https://github.com/neovide/neovide](https://github.com/neovide/neovide)
    * [https://github.com/nshen/learn-neovim-lua](https://github.com/nshen/learn-neovim-lua)
    * [https://github.com/LazyVim/LazyVim](https://github.com/LazyVim/LazyVim)
    * [https://github.com/ervandew/eclim](https://github.com/ervandew/eclim)
* [https://github.com/helix-editor/helix](https://github.com/helix-editor/helix)
* [https://github.com/file-acomplaint/kyun](https://github.com/file-acomplaint/kyun)
* [https://github.com/rizonesoft/Notepad3](https://github.com/rizonesoft/Notepad3)
* [https://github.com/zufuliu/notepad2](https://github.com/zufuliu/notepad2)
* [https://github.com/dail8859/NotepadNext](https://github.com/dail8859/NotepadNext)
* [https://github.com/0x7c13/Notepads](https://github.com/0x7c13/Notepads)
* 源代码编辑控件 [https://sourceforge.net/projects/scintilla](https://sourceforge.net/projects/scintilla)
    * [https://www.scintilla.org](https://www.scintilla.org)
    * [https://github.com/ScintillaOrg/lexilla](https://github.com/ScintillaOrg/lexilla)
* [http://www.pnotepad.org](http://www.pnotepad.org)
* [https://github.com/brackets-cont/brackets](https://github.com/brackets-cont/brackets)
    * [https://github.com/adobe/brackets](https://github.com/adobe/brackets)
* [https://github.com/bobbylight](https://github.com/bobbylight)
* [https://github.com/textmate](https://github.com/textmate)
* [https://github.com/Komodo/KomodoEdit](https://github.com/Komodo/KomodoEdit)
    * [https://github.com/ActiveState/OpenKomodoIDE](https://github.com/ActiveState/OpenKomodoIDE)
* [https://github.com/lite-xl/lite-xl](https://github.com/lite-xl/lite-xl)
* [https://github.com/Alexey-T/CudaText](https://github.com/Alexey-T/CudaText)
* [https://sourceforge.net/projects/bluefish](https://sourceforge.net/projects/bluefish)
* [https://github.com/steven-tey/novel](https://github.com/steven-tey/novel)


- [https://www.texmacs.org](https://www.texmacs.org)
- [https://github.com/XmacsLabs/Xmacs](https://github.com/XmacsLabs/Xmacs)




**替换默认记事本**

```batch
REG ADD "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" ^
 /v "Debugger" /t REG_SZ /d "\"记事本程序路径\" -z" /f
```

- 恢复系统默认记事本

```batch
REG DELETE "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
REG DELETE "HKLM\Software\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /f
REG DELETE "HKLM\Software\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\notepad.exe" /v "Debugger" /f
```


## Notepad++

* [https://github.com/notepad-plus-plus/notepad-plus-plus](https://github.com/notepad-plus-plus/notepad-plus-plus)
* [https://github.com/cxasm/notepad--](https://github.com/cxasm/notepad--)
* [替换默认记事本](https://npp-user-manual.org/docs/other-resources/#notepad-replacement)
* 插件 [https://github.com/notepad-plus-plus/nppPluginList](https://github.com/notepad-plus-plus/nppPluginList)
* [https://github.com/npp-plugins](https://github.com/npp-plugins)
* [https://github.com/JetNpp](https://github.com/JetNpp)
* [https://github.com/chcg](https://github.com/chcg)
* [https://github.com/pnedev/comparePlus](https://github.com/pnedev/comparePlus)
* [https://github.com/chcg/NPP_HexEdit](https://github.com/chcg/NPP_HexEdit)
* 比较 [https://github.com/pnedev/compare-plugin](https://github.com/pnedev/compare-plugin)
* JSON [https://github.com/kapilratnani/JSON-Viewer](https://github.com/kapilratnani/JSON-Viewer)
* [https://github.com/molsonkiko/JsonToolsNppPlugin](https://github.com/molsonkiko/JsonToolsNppPlugin)

- 查看快捷键：`设置` –> `管理快捷键` -> `Scintilla命令`
    - `SCI_SELECTIONDUPLICATE` 复制当前行
    - `SCI_LINEDELETE` 删除当前行
- `Tab`替换为空格：设置->首选项->语言->制表符设置->(勾选上)替换为空格
- 显示特殊字符
    - 显示回车符，换行符，TAB键，行首，行尾等特殊字符
    - 视图(V) -> 显示符号 -> 显示空格与制表符
- 删除未包含内容的行： <kbd>Ctrl</kbd> + <kbd>F</kbd> -> 选择`标记`标签页（或者<kbd>Alt</kbd> + <kbd>S</kbd> 然后按
<kbd>K</kbd>） -> 查找目标输入正则表达式 -> 勾选`正则表达式`、`标记所在行`、`清除上次标记` -> 点击`全部标记` ->
 点击菜单栏 `搜索` -> `书签` -> `删除未标记行`

- 下划线转驼峰：查找目标:`([a-z])_([a-z])` 查找“小写_小写”，括号用来分组
    - 替换为：`\1\u\2`替换为第一组和第二组的大写
- 驼峰转下划线：查找目标：`([a-z])([A-Z])` 查找“小写大写”的组合，括号用来分组，需勾选`配匹大小写`和`循环查找`
    - 替换为：`\1_\l\2`替换为第一组加下滑线加第二组，第二组小写`\l`是小写的`L`

1. `\U` 将匹配项转为大写(Upper)
2. `\L` 将匹配项转为小写(Lower)
3. `\E` 终止转换(End)


* 在UTF-8下使用`[\x{4e00}-\x{9fa5}]`匹配中文 [http://www.crifan.com/files/doc/docbook/rec_soft_npp/release/htmls/npp_func_regex_replace.html](http://www.crifan.com/files/doc/docbook/rec_soft_npp/release/htmls/npp_func_regex_replace.html)


> notepad++未保存的文件的缓存文件地址：`%AppData%\Notepad++\backup`



**匹配多个相同字符中的某一个**

> 利用`非贪婪`限定符`?`,分组限定符`()`,分组保留用法`\1`/`$1`

- 查找第一个逗号：`(^.*?),`或`(,)(.*?$)`
- 查找第二个逗号：`(^.*?,.*?),`
- 查找最后一个（包含不在行末的）逗号：`(,)([^,]*$)`





## SublimeText

- [https://github.com/SublimeText](https://github.com/SublimeTexts)
- [https://www.sublimetext.com](https://www.sublimetext.com)
    - [http://www.sublimetext.cn](http://www.sublimetext.cn)
- [sublimetext破解](https://www.abbeyok.com/archives/337)
- [sublime-text-3-license-key](http://blog.jdk5.com/zh/sublime-text-3-license-key)
- [Sublime Text3 注册码激活码](https://blog.csdn.net/qq_29819449/article/details/80130327)

* [解决 Sublime Text 3 拓展包源无法访问问题](https://github.com/HBLong/channel_v3_daily)



### 插件

> 按<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>p</kbd>输入`install`选择`Package Control: Install Package`再输入插件名称

* [https://github.com/facelessuser/MarkdownPreview](https://github.com/facelessuser/MarkdownPreview)
* 本地化菜单 [https://github.com/zam1024t/LocalizedMenu](https://github.com/zam1024t/LocalizedMenu)
* 侧边栏右键增强 [https://github.com/52fisher/SideBarEnhancements](https://github.com/52fisher/SideBarEnhancements)
* 插件管理器 [https://github.com/wbond/package_control](https://github.com/wbond/package_control)
* [https://github.com/bathos/Ecmascript-Sublime](https://github.com/bathos/Ecmascript-Sublime)

- ChineseLocalizations

> 很简单的一个插件，现在支持汉化Sublime Text2，Sublime Text3。

![](https://i.rexdf.org/images/sublime_chinese.gif)

- SublimeAStyleFormatter
- EclipseJavaFormatter
- uroboroSQLFormatter
- MarkdownTableFormatter
- AllAutocomplete

> Sublime Text 默认的 Autocomplete 功能只考虑当前的文件，而 AllAutocomplete 插件会搜索所有打开的文件来寻找匹配的提示词。

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211152259777-487066262.jpg)

- BracketHighlighter

> 配置文件的高亮设置，让你的代码有不同的颜色区分该插件提供配对标签，或大括号或字符引号的配对高亮显示，算是对系统高亮的加强吧。

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211152539199-1823010647.png)

- BufferScroll

> 你可以轻松书写一个文件多个位置了

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211152233699-1065227434.png)

- ColorHighlighter

> 颜色功能还是很爽的，找了好久

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211153521699-315615562.gif)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211153539808-2031818977.gif)

- CSSComments

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211153759808-1673568045.gif)

- CSSFormat
- DocBlockr

> DocBlocker 是在Sublime平台上开发一款自动补全注释插件，支持JavaScript (including ES6), PHP, ActionScript,
> Haxe, CoffeeScript, TypeScript, Java, Apex, Groovy, Objective C, C, C++ and Rust.等众多语言

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211154620433-609167145.gif)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211154628668-114035903.gif)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211154635730-209856900.gif)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211154644902-215345868.gif)

- Emmet

> Emmet的前身是大名鼎鼎的Zen coding，如果你从事Web前端开发的话，对该插件一定不会陌生。
> 它使用仿CSS选择器的语法来生成代码，大大提高了HTML/CSS代码编写的速度

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211160050168-1380718246.jpg)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211160056058-910768364.gif)

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211160108058-1510778042.gif)

- SublimeCodeIntel

> 一个全功能的 Sublime Text 代码自动完成引擎 ，本人做过对比，但是如果和webstorm的自动寻找还是稍逊一筹，
> 不过对于大部分人来说够用了，能很方便跳到你想要的方法,支持的语言挺多的（JavaScript, Mason, XBL, XUL, 
> RHTML, SCSS, Python, HTML, Ruby, Python3, XML, Sass, XSLT, Django, HTML5, Perl, CSS, Twig,
> Less, Smarty, Node.js, Tcl, TemplateToolkit, PHP.）

- JavaScript Completions

> js最基本的api快查片段

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211160530933-1180301023.gif)

- Keymaps

> 快速查找所有插件的快捷键

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211160734324-1356850521.gif)

- PrettyJSON

> JSON，一個輕量級的資料交換語言，目前許多網站AJAX request的回應結果都是JSON格式

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211161353074-871967329.gif)

- SideBarEnhancements

> 增强右键菜单文件操作功能

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211161607215-1211785407.png)

- SublimeLinter

> 代码校验插件，支持多种语言，这个是主插件，如果想检测特定的文件需要单独下载

- SublimeLinterJshint

> 这个就是单独的插件，SublimeLinter的一个分支

- SublimeTmpl

> 创建常用文件初始模板，必须html,css,js模板

- Tag

> HTML/XML标签缩进、补全和校验

- Alignment

> 代码对齐

- PackageResourceViewer

> 通过这个特殊的插件，会给你查看和编辑SublimeText附带的不同的包带来很多方便。您也可以提取任何给定的包。
> 这一行动将其复制到用户文件夹，以便您可以安全地对其进行编辑。很多人苦恼不能修改左侧导航面板字体大小，用这个可以轻松办到

![](https://images2015.cnblogs.com/blog/296669/201512/296669-20151211164025918-759767123.gif)

- Themr

> sublime可以下载很多风格样式，用这个插件可以管理所有的风格

- GBKToUTF8
- SublimeREPL
- jQuery
- Anoconda
- AutoPep8