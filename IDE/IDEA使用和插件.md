# IDEA使用和插件


[[toc]]




## flag

* [IntelliJ IDEA神器使用技巧](https://www.imooc.com/learn/924)

<details>
<summary><strong>展开查看思维导图</strong></summary>
![](/images/IDEA使用技巧.png)
</details>


## 建立多级项目

**创建顶级项目（根项目）**

1. 点击顶部菜单栏 `File` -> `New` -> `Project`（或者在欢迎页面点击`Create New Project`） -> 
`Maven`（不要勾选`Create from archetype`） -> `Next`

2. 填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名），点击 `Next`

3. 打开 `pom.xml` ，增加 `<packaging>pom</packaging>`

4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子项目（二级项目）**

1. 在顶级项目名上点击<kbd>右键</kbd>弹出菜单（或者点击顶部菜单栏`File`） -> `New` -> `Module` -> 
`Maven`（不要勾选`Create from archetype`） -> `Next`

2.  填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名） -> 点击 `Next` -> 
选择 `Parent`（上级项目）放在最后操作是因为修改 `Name` 时会自动变化

3. 打开 `pom.xml` ，增加 `<packaging>pom</packaging>`

4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子模块（最后一级项目）**

> 如果还需要创建下级项目，重复创建子项目的操作即可

> 创建子模块只需要重复创建子项目，但是不要删除任何其他文件和目录


<details>
<summary><b>展开查看示例结构</b></summary>

```
demo                        # 顶级项目（跟项目）
│  pom.xml
│  
├─admin                     # 二级项目
│  │  pom.xml
│  │  
│  ├─admin-api              # 二级项目模块
│  │  │  pom.xml
│  │  │  
│  │  └─src
│  │      ├─main
│  │      │  ├─java
│  │      │  └─resources
│  │      └─test
│  │          └─java
│  └─admin-web              # 二级项目模块
│      │  pom.xml
│      │  
│      └─src
│          ├─main
│          │  ├─java
│          │  └─resources
│          └─test
│              └─java
└─buyer                     # 二级项目
    │  pom.xml
    │  
    ├─shop                  # 三级项目
    │  │  pom.xml
    │  │  
    │  ├─shop-api           # 三级项目模块
    │  │  │  pom.xml
    │  │  │  
    │  │  └─src
    │  │      ├─main
    │  │      │  ├─java
    │  │      │  └─resources
    │  │      └─test
    │  │          └─java
    │  └─shop-client        # 三级项目模块
    │      │  pom.xml
    │      │  
    │      └─src
    │          ├─main
    │          │  ├─java
    │          │  └─resources
    │          └─test
    │              └─java
    └─user                  # 三级项目
        │  pom.xml
        │  
        ├─user-api          # 三级项目模块
        │  │  pom.xml
        │  │  
        │  └─src
        │      ├─main
        │      │  ├─java
        │      │  └─resources
        │      └─test
        │          └─java
        └─user-client       # 三级项目模块
            │  pom.xml
            │  
            └─src
                ├─main
                │  ├─java
                │  └─resources
                └─test
                    └─java
```
</details>



## 插件


* [实用IDEA工具](https://blog.csdn.net/weixin_37645838/article/details/85953193)


**Free Mybatis plugin**

* [https://gitee.com/wuzhizhan/free-idea-mybatis](https://gitee.com/wuzhizhan/free-idea-mybatis)


**mybatis-lite**

* [https://github.com/mustfun/mybatis-plus](https://github.com/mustfun/mybatis-plus)


**mybatis-plus**

* [https://github.com/kana112233/mybatis-plus-plugin](https://github.com/kana112233/mybatis-plus-plugin)


**MyBatisCodeHelper-Pro**

* [文档](https://gejun123456.github.io/MyBatisCodeHelper-Pro/#)

* [MybatisCodeHelperPro试用key获取](http://brucege.com/pay/getfreetrial?)


**.ignore**

* [https://plugins.jetbrains.com/plugin/7495--ignore](https://plugins.jetbrains.com/plugin/7495--ignore)

> 生成各种ignore文件，一键创建git ignore文件的模板，免得自己去写

![](/images/ignore.gif)


**Maven Helper**

* [https://plugins.jetbrains.com/plugin/7179-maven-helper](https://plugins.jetbrains.com/plugin/7179-maven-helper)

> 一键查看maven依赖，查看冲突的依赖，一键进行exclude依赖

* [使用Maven Helper解决Maven依赖冲突](https://segmentfault.com/a/1190000017542396)

![](/images/MavenHelper.png)


**GsonFormat**

* [https://plugins.jetbrains.com/plugin/7654-gsonformat](https://plugins.jetbrains.com/plugin/7654-gsonformat)

> google出的一键根据json文本生成java类，非常方便

![](/images/GsonFormat.gif)


**FindBugs-IDEA**

* [https://plugins.jetbrains.com/plugin/3847-findbugs-idea](https://plugins.jetbrains.com/plugin/3847-findbugs-idea)

> 检测代码中可能的bug及不规范的位置，检测的模式相比p3c更多，写完代码后检测下 避免低级bug，强烈建议用一下，一不小心就发现很多老代码的bug

![](/images/FindBugs-IDEA.gif)


**Lombok plugin**

* [https://plugins.jetbrains.com/plugin/6317-lombok-plugin](https://plugins.jetbrains.com/plugin/6317-lombok-plugin)

> 支持lombok的各种注解，从此不用写getter setter这些 可以把注解还原为原本的java代码,除此之外还有其他更多注解以减少代码

![](/images/lombok.gif)


**p3c**

* [https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines](https://plugins.jetbrains.com/plugin/10046-alibaba-java-coding-guidelines)

> 阿里巴巴出品的java代码规范插件,可以扫描整个项目 找到不规范的地方 并且大部分可以自动修复 



**VisualVM Launcher**

* [https://plugins.jetbrains.com/plugin/7115-visualvm-launcher](https://plugins.jetbrains.com/plugin/7115-visualvm-launcher)

> 运行java程序的时候启动visualvm，方便查看jvm的情况 比如堆内存大小的分配，某个对象占用了多大的内存，jvm调优必备工具

![](/images/VisualVM-Launcher.gif)


**GenerateAllSetter**

* [https://plugins.jetbrains.com/plugin/9360-generateallsetter](https://plugins.jetbrains.com/plugin/9360-generateallsetter)

> 一键调用一个对象的所有set方法并且赋予默认值 在对象字段多的时候非常方便

![](/images/GenerateAllSetter.gif)


**Rainbow Brackets**

* [https://plugins.jetbrains.com/plugin/10080-rainbow-brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets)

> 彩虹颜色的括号，看着很舒服 敲代码效率变高

![](/images/RainbowBrackets.png)


**Translation**

* [https://plugins.jetbrains.com/plugin/8579-translation](https://plugins.jetbrains.com/plugin/8579-translation)

> 最好用的翻译插件，功能很强大，界面很漂亮

![](/images/Translation.gif)


**Markdown Navigator**

* [https://github.com/vsch/idea-multimarkdown](https://github.com/vsch/idea-multimarkdown)

> 带有GFM 的Markdown插件和匹配的预览样式。

![](https://github.com/vsch/idea-multimarkdown/raw/master/assets/images/capabilities2.png)


**IDEA Mind Map**

* [https://github.com/raydac/netbeans-mmd-plugin](https://github.com/raydac/netbeans-mmd-plugin)

> 思维导图支持多种格式文件的导入和导出，同步更新时便于合并「以文本格式保存，支持 markdown 的语法，方便解决冲突」


**ASM Bytecode Outline**

* [https://github.com/melix/asm-bytecode-intellij](https://github.com/melix/asm-bytecode-intellij)

> 查看 Class 类的字节码


**stackoverflow**

* [https://github.com/gejun123456/IntellijGoToStackOverFlow](https://github.com/gejun123456/IntellijGoToStackOverFlow)

> 这个插件对于查找问题特别方便，定位异常，点击右键快速跳转到`stackoverflow`网站，每次至少为你节约了`10`秒。

