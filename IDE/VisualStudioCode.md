# VisualStudioCode


[[toc]]




## Flag

+ [https://github.com/topics/vscode](https://github.com/topics/vscode)


* [https://github.com/microsoft/vscode](https://github.com/microsoft/vscode)
    * [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)
    * [https://marketplace.visualstudio.com](https://marketplace.visualstudio.com)
* [https://github.com/microsoft/vscode-docs](https://github.com/microsoft/vscode-docs)
    * [默认键盘快捷键](https://code.visualstudio.com/docs/getstarted/keybindings#_default-keyboard-shortcuts)
    * [Keyboard shortcuts forWindows](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
    * [Keyboard shortcuts for macOS](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)
    * [Keyboard shortcuts for Linux](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-linux.pdf)
* [VSCode教程](https://www.php.cn/tool/vscode)
* [https://github.com/gr2m/app-stats-action](https://github.com/gr2m/app-stats-action)


- 语言服务器协议 [https://github.com/Microsoft/language-server-protocol](https://github.com/Microsoft/language-server-protocol)
    - [Standalone Server (tsserver)](https://github.com/Microsoft/TypeScript/wiki/Standalone-Server-%28tsserver%29)
    - [https://github.com/typescript-language-server](https://github.com/typescript-language-server)
- [https://docs.microsoft.com/zh-cn/visualstudio/extensibility/language-server-protocol](https://docs.microsoft.com/zh-cn/visualstudio/extensibility/language-server-protocol)
- [https://microsoft.github.io/language-server-protocol](https://microsoft.github.io/language-server-protocol)
    - [https://github.com/lsif/lsif.github.io](https://github.com/lsif/lsif.github.io)
    - [https://github.com/langserver/langserver.github.io](https://github.com/langserver/langserver.github.io)
- [https://github.com/Microsoft/debug-adapter-protocol](https://github.com/Microsoft/debug-adapter-protocol)
- [https://github.com/Microsoft/vscode-debugadapter-node](https://github.com/Microsoft/vscode-debugadapter-node)
- [https://github.com/sublimelsp/LSP](https://github.com/sublimelsp/LSP)




## 设置

- 缩进参考线： 首选项 -> 设置 -> 搜索 `renderIntentGuides` 将此选项改为true
- 垂直标尺： 文件 -> 首选项 -> 设置 -> 搜索 `editor.rulers`


```json
{
    "workbench.activityBar.visible": true,
    "workbench.statusBar.visible": true,
    "editor.minimap.enabled": false,
    "breadcrumbs.enabled": true,
    "editor.wordWrapColumn": 120,
    "editor.wordWrap": "wordWrapColumn",
    "editor.fontSize": 16,
    "editor.renderIndentGuides":true,
    "editor.rulers": [80,120],
    "editor.rulers": [
        120
    ],
    "python.formatting.autopep8Args": [
        "--max-line-length",
        "120",
        "--experimental"
    ],
    "python.formatting.yapfArgs": [
        "--style",
        "{based_on_style: chromium, indent_width: 20}"
    ],
    "python.formatting.blackArgs": [
        "--line-length",
        "120"
    ]
}
```

**开启智能提示**

> 进入设置，搜索`prevent`，取消此选项的勾选



## VSCode快捷键

* [https://github.com/EdisonLeeeee/VSCode-keybord-shortcuts](https://github.com/EdisonLeeeee/VSCode-keybord-shortcuts)


### 常用General

| 按 Press             | 功能 Function                   |
|---------------------|-------------------------------|
| Ctrl + Shift + P，F1 | 显示命令面板 Show Command Palette   |
| Ctrl + P            | 快速打开 Quick Open               |
| Ctrl + Shift + N    | 新窗口/实例 New window/instance    |
| Ctrl + Shift + W    | 关闭窗口/实例 Close window/instance |
| Ctrl + ,            | 用户设置 User Settings            |
| Ctrl + K Ctrl + S   | 设置键盘快捷方式 Keyboard Shortcuts   |


### 基础编辑Basic editing

| 按 Press              | 功能 Function                                     |
|----------------------|-------------------------------------------------|
| Ctrl + X             | 剪切行（空选定） Cut line (empty selection)             |
| Ctrl + C             | 复制行（空选定）Copy line (empty selection)             |
| Alt + ↑ / ↓          | 向上/向下移动行 Move line up/down                      |
| Shift + Alt + ↓ / ↑  | 向上/向下复制行 Copy line up/down                      |
| Ctrl + Shift + K     | 删除行 Delete line                                 |
| Ctrl + Enter         | 在下面插入行 Insert line below                        |
| Ctrl + Shift + Enter | 在上面插入行 Insert line above                        |
| Ctrl + Shift + \     | 跳到匹配的括号 Jump to matching bracket                |
| Ctrl + ] / [         | 缩进/缩进行 Indent/outdent line                      |
| Home                 | 转到行首 Go to beginning of line                    |
| End                  | 转到行尾 Go to end of line                          |
| Ctrl + Home          | 转到文件开头 Go to beginning of file                  |
| Ctrl + End           | 转到文件末尾 Go to end of file                        |
| Ctrl + ↑ / ↓         | 向上/向下滚动行 Scroll line up/down                    |
| Alt + PgUp / PgDown  | 向上/向下滚动页面 Scroll page up/down                   |
| Ctrl + Shift + [     | 折叠（折叠）区域 Fold (collapse) region                 |
| Ctrl + Shift + ]     | 展开（未折叠）区域 Unfold (uncollapse) region            |
| Ctrl + K Ctrl + [    | 折叠（未折叠）所有子区域 Fold (collapse) all subregions     |
| Ctrl + K Ctrl + ]    | 展开（未折叠）所有子区域 Unfold (uncollapse) all subregions |
| Ctrl + K Ctrl + 0    | 折叠（折叠）所有区域 Fold (collapse) all regions          |
| Ctrl + K Ctrl + J    | 展开（未折叠）所有区域 Unfold (uncollapse) all regions     |
| Ctrl + K Ctrl + C    | 添加行注释 Add line comment                          |
| Ctrl + K Ctrl + U    | 删除行注释 Remove line comment                       |
| Ctrl + /             | 切换行注释 Toggle line comment                       |
| Shift + Alt + A      | 切换块注释 Toggle block comment                      |
| Alt + Z              | 切换换行 Toggle word wrap                           |
| CTRL + ALT + X       | 转换为大写 transform To Uppercase                    |
| CTRL + ALT + Y       | 转换为小写 transform To Lowercase                    |



### 导航Navigation

| 按 Press            | 功能 Function                                |
|--------------------|--------------------------------------------|
| Ctrl + T           | 显示所有符号 Show all Symbols                    |
| Ctrl + G           | 转到行... Go to Line...                       |
| Ctrl + P           | 转到文件... Go to File...                      |
| Ctrl + Shift + O   | 转到符号... Go to Symbol...                    |
| Ctrl + Shift + M   | 显示问题面板 Show Problems panel                 |
| F8                 | 转到下一个错误或警告 Go to next error or warning     |
| Shift + F8         | 转到上一个错误或警告 Go to previous error or warning |
| Ctrl + Shift + Tab | 导航编辑器组历史记录 Navigate editor group history   |
| Alt + ← / →        | 返回/前进 Go back / forward                    |
| Ctrl + M           | 切换选项卡移动焦点 Toggle Tab moves focus           |


### 搜索和替换Search and replace

| 按 Press           | 功能 Function                                                  |
|-------------------|--------------------------------------------------------------|
| Ctrl + F          | 查找 Find                                                      |
| Ctrl + H          | 替换 Replace                                                   |
| F3 / Shift + F3   | 查找下一个/上一个 Find next/previous                                 |
| Alt + Enter       | 选择查找匹配的所有出现 Select all occurences of Find match              |
| Ctrl + D          | 将选择添加到下一个查找匹配 Add selection to next Find match               |
| Ctrl + K Ctrl + D | 将最后一个选择移至下一个查找匹配项 Move last selection to next Find match     |
| Alt + C / R / W   | 切换区分大小写/正则表达式/整个词 Toggle case-sensitive / regex / whole word |


### 多光标和选 Multi-cursor and selection

| 按 Press                            | 功能 Function                                               |
|------------------------------------|-----------------------------------------------------------|
| Alt +单击                            | 插入光标 Insert cursor                                        |
| Ctrl + Alt +↑/↓                    | 在上/下插入光标 Insert cursor above / below                      |
| Ctrl + U                           | 撤消上一个光标操作 Undo last cursor operation                      |
| Shift + Alt + I                    | 在选定的每一行的末尾插入光标 Insert cursor at end of each line selected |
| Ctrl + L                           | 选择当前行 Select current line                                 |
| Ctrl + Shift + L                   | 选择当前选择的所有出现 Select all occurrences of current selection   |
| Ctrl + F2                          | 选择当前字的所有出现 Select all occurrences of current word         |
| Shift + Alt + →                    | 展开选择 Expand selection                                     |
| Shift + Alt + ←                    | 缩小选择 Shrink selection                                     |
| Shift + Alt + （拖动鼠标）               | 列（框）选择 Column (box) selection                             |
| Ctrl + Shift + Alt +（箭头键）          | 列（框）选择 Column (box) selection                             |
| Ctrl + Shift + Alt + PgUp / PgDown | 列（框）选择页上/下 Column (box) selection page up/down            |


### 丰富的语言编辑Rich languages editing

| 按 Press              | 功能 Function                        |
|----------------------|------------------------------------|
| Ctrl + 空格            | 触发建议 Trigger suggestion            |
| Ctrl + Shift + Space | 触发器参数提示 Trigger parameter hints    |
| Shift + Alt + F      | 格式化文档 Format document              |
| Ctrl + K Ctrl + F    | 格式选定区域 Format selection            |
| F12                  | 转到定义 Go to Definition              |
| Alt + F12            | Peek定义 Peek Definition             |
| Ctrl + K F12         | 打开定义到边 Open Definition to the side |
| Ctrl + .             | 快速解决 Quick Fix                     |
| Shift + F12          | 显示引用 Show References               |
| F2                   | 重命名符号 Rename Symbol                |
| Ctrl + K Ctrl + X    | 修剪尾随空格 Trim trailing whitespace    |
| Ctrl + K M           | 更改文件语言 Change file language        |


### 编辑器管理Editor management

| 按 Press                      | 功能 Function                                                  |
|------------------------------|--------------------------------------------------------------|
| Ctrl + F4, Ctrl + W          | 关闭编辑器 Close editor                                           |
| Ctrl + K F                   | 关闭文件夹 Close folder                                           |
| Ctrl + \                     | 拆分编辑器 Split editor                                           |
| Ctrl + 1 / 2 / 3             | 聚焦到第 1，第 2 或第 3 编辑器组 Focus into 1st, 2nd or 3rd editor group |
| Ctrl + K Ctrl + ← / →        | 聚焦到上一个/下一个编辑器组 Focus into previous/next editor group         |
| Ctrl + Shift + PgUp / PgDown | 向左/向右移动编辑器 Move editor left/right                            |
| Ctrl + K ← / →               | 移动活动编辑器组 Move active editor group                            |

### 文件管理File management

| 按 Press            | 功能 Function                                            |
|--------------------|--------------------------------------------------------|
| Ctrl + N           | 新文件 New File                                           |
| Ctrl + O           | 打开文件... Open File...                                   |
| Ctrl + S           | 保存 Save                                                |
| Ctrl + Shift + S   | 另存为... Save As...                                      |
| Ctrl + K S         | 全部保存 Save All                                          |
| Ctrl + F4          | 关闭 Close                                               |
| Ctrl + K Ctrl + W  | 关闭所有 Close All                                         |
| Ctrl + Shift + T   | 重新打开关闭的编辑器 Reopen closed editor                        |
| Ctrl + K Enter     | 输入保持打开 Enter Keep Open                                 |
| Ctrl + Tab         | 打开下一个 Open next                                        |
| Ctrl + Shift + Tab | 打开上一个 Open previous                                    |
| Ctrl + K P         | 复制活动文件的路径 Copy path of active file                     |
| Ctrl + K R         | 显示资源管理器中的活动文件 Reveal active file in Explorer           |
| Ctrl + K O         | 显示新窗口/实例中的活动文件 Show active file in new window/instance |


### 显示Display

| 按 Press          | 功能 Function                                         |
|------------------|-----------------------------------------------------|
| F11              | 切换全屏 Toggle full screen                             |
| Shift + Alt + 0  | 切换编辑器布局 Toggle editor layout                        |
| Ctrl + = / -     | 放大/缩小 Zoom in/out                                   |
| Ctrl + B         | 切换侧栏可见性 Toggle Sidebar visibility                   |
| Ctrl + Shift + E | 显示浏览器/切换焦点 Show Explorer / Toggle focus             |
| Ctrl + Shift + F | 显示搜索 Show Search                                    |
| Ctrl + Shift + G | 显示 Git Show Git                                     |
| Ctrl + Shift + D | 显示调试 Show Debug                                     |
| Ctrl + Shift + X | 显示扩展 Show Extensions                                |
| Ctrl + Shift + H | 替换文件 Replace in files                               |
| Ctrl + Shift + J | 切换搜索详细信息 Toggle Search details                      |
| Ctrl + Shift + C | 打开新命令提示符/终端 Open new command prompt/terminal        |
| Ctrl + Shift +U  | 显示输出面板 Show Output panel                            |
| Ctrl + Shift + V | 切换 Markdown 预览 Toggle Markdown preview              |
| Ctrl + K V       | 从旁边打开 Markdown 预览 Open Markdown preview to the side |
| Ctrl + K Z       | 打开禅模式（ Esc 键退出） Zen Mode (Esc Esc to ecit)          |

### 调试Debug

| 按 Press           | 功能 Function            |
|-------------------|------------------------|
| F9                | 切换断点 Toggle breakpoint |
| F5                | 开始/继续 Start/Continue   |
| Shift + F5        | 停止 Stop                |
| F11 / Shift + F11 | 下一步/上一步 Step into/out  |
| F10               | 跳过 Step over           |
| Ctrl + K Ctrl + I | 显示悬停 Show hover        |


### 集成终端Integrated terminal

| 按 Press               | 功能 Function                        |
|-----------------------|------------------------------------|
| Ctrl + `              | 显示集成终端 Show integrated terminal    |
| Ctrl + Shift + `      | 创建新终端 Create new terminal          |
| Ctrl + C              | 复制选定 Copy selection                |
| Ctrl + V              | 粘贴到活动端子 Paste into active terminal |
| Ctrl + ↑ / ↓          | 向上/向下滚动 Scroll up/down             |
| Shift + PgUp / PgDown | 向上/向下滚动页面 Scroll page up/down      |
| Ctrl + Home / End     | 滚动到顶部/底部 Scroll to top/bottom      |





## VSCode插件

* [https://github.com/redhat-developer](https://github.com/redhat-developer)
* [https://github.com/vscode-icons/vscode-icons](https://github.com/vscode-icons/vscode-icons)
* 比较 [https://github.com/moshfeu/vscode-compare-folders](https://github.com/moshfeu/vscode-compare-folders)
* [https://github.com/Axosoft/vscode-gitlens](https://github.com/Axosoft/vscode-gitlens)
* 协作 [https://github.com/MicrosoftDocs/live-share](https://github.com/MicrosoftDocs/live-share)

- [https://github.com/Serpen/VBS-VSCode](https://github.com/Serpen/VBS-VSCode)
- [https://github.com/karb0f0s/vscode-vbscript](https://github.com/karb0f0s/vscode-vbscript)
- [https://github.com/Luncher91/VBScript-vscode](https://github.com/Luncher91/VBScript-vscode)

**translate-var**

* [https://marketplace.visualstudio.com/items?itemName=svenzhao.var-translation](https://marketplace.visualstudio.com/items?itemName=svenzhao.var-translation)

> 使用翻译api将其他语言到英文,转换成常见的变量命名形式

![](https://github.com/SvenZhao/var-translation/raw/master/images/vscode1.gif)



**PHP插件**

> `php Intelephense`



**HTML插件**

- `JS-CSS-HTML Formatter`
- `ESLint`



**XML格式化**

* [https://marketplace.visualstudio.com/items?itemName=mikeburgh.xml-format](https://marketplace.visualstudio.com/items?itemName=mikeburgh.xml-format)


**Python插件**

- `autopep8`

> 格式化代码

> 用pip安装

```bash
pip install autopep8
```

> 在设置中加入

```
"python.formatting.provider": "autopep8"
```

- pep8

> 检查代码错误

> 用pip安装

```bash
pip install pep8
```

> 在设置中加入

```
"python.linting.pep8Enabled": true
```


- pylint

> 用pip安装

```bash
pip install pylint
```

> 在设置中加入

```
"python.linting.pylintEnabled": true
```


- flake8

> 用pip安装

```bash
pip install flake8
```

> 在设置中加入

```
"python.linting.flake8Enabled": true
```

**markdown**

* [markdown-toc](https://github.com/AlanWalk/markdown-toc)


**Cloud Toolkit**

> 帮助开发者更高效地开发、测试、诊断并部署应用。通过插件，可以将本地应用一键部署到任意服务器

* [https://marketplace.visualstudio.com/items?itemName=alibabacloud-cloudtoolkit.toolkit-vscode](https://marketplace.visualstudio.com/items?itemName=alibabacloud-cloudtoolkit.toolkit-vscode)


**File Header**

* [https://github.com/OBKoro1/koro1FileHeader](https://github.com/OBKoro1/koro1FileHeader)
* [https://github.com/caizhengxin/vscodefileheader](https://github.com/caizhengxin/vscodefileheader)
* [https://github.com/bookwormdevelopment/file-header](https://github.com/bookwormdevelopment/file-header)
* [https://github.com/Raymondhsm/fileHeader](https://github.com/Raymondhsm/fileHeader)
* [https://github.com/arjunkomath/js-file-header-vscode](https://github.com/arjunkomath/js-file-header-vscode)
* [https://github.com/DMXL/js-file-header-vscode](https://github.com/DMXL/js-file-header-vscode)
* [https://github.com/zhaopengme/vscode-fileheader](https://github.com/zhaopengme/vscode-fileheader)
