# IDEA使用

[[toc]]



## Flag

+ [https://github.com/JetBrains](https://github.com/JetBrains)
     + [https://www.jetbrains.com/products.html#type=ide](https://www.jetbrains.com/products.html#type=ide)
+ [https://github.com/judasn/IntelliJ-IDEA-Tutorial](https://github.com/judasn/IntelliJ-IDEA-Tutorial)

- [教育邮箱免费申请JetBrains教育许可证](https://mp.weixin.qq.com/s/XFoOBeTaBwBAsRgadxMLfQ)
- [JetBrains全系列软件激活教程激活码以及JetBrains系列软件汉化包](https://www.fuocu.cn/archives/jetbrains-crack)
- [JetBrains 系列软件汉化包](https://github.com/pingfangx/TranslatorX)

* [IntelliJ IDEA神器使用技巧](https://www.imooc.com/learn/924)
* [IDEA的基本使用：让你的IDEA有飞一般的感觉](https://blog.csdn.net/fly910905/article/details/77868300)

<details>
<summary><b>展开查看思维导图</b></summary>
<img src="/images/IDEA使用技巧.png" alt>
</details>



## 建立多级项目

> 特别说明：每个模块中的顶级包名（java目录下的包名）一定不能一样，否则编译器会把多个模块中的代码编译相互串连。
> 如：`src/main/java/com/bajins/demo`这里的`com/bajins/demo`就是顶级包名，
> 应该加上当前项目名`src/main/java/com/bajins/demo/admin`

**创建顶级项目（根项目）**

1. 点击顶部菜单栏 `File` -> `New` -> `Project`（或在欢迎页面点击`Create New Project`） -> `Maven`（不要勾选`Create from archetype`） -> `Next`
2. 填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名），点击 `Next`
3. 打开 `pom.xml` ，添加 `<packaging>pom</packaging>`（聚合工程或传递依赖用），如果有了就不用添加
4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子项目（二级项目）**

1. 在顶级项目名上点击<kbd>右键</kbd>弹出菜单（或点击顶部菜单`File`） -> `New` -> `Module` -> `Maven`（不要勾选`Create from archetype`） -> `Next`
2.  填写 `Name`（项目名）、`GroupId`（包名）、`Artifact`（项目名） -> 点击 `Next` -> 选择 `Parent`（上级项目）放在最后操作是因为修改 `Name` 时会自动变化
3. 打开 `pom.xml` ，添加 `<packaging>pom</packaging>`（聚合工程或传递依赖用）
4. 删除除了 `pom.xml` 以外的其他文件和目录（包括`src`）

**创建子模块（最后一级项目）**

> 如果还需要创建下级项目，重复创建子项目的操作即可

> 创建子模块只需要重复创建子项目，但是不要删除任何其他文件和目录，也不要添加`<packaging>pom</packaging>`


<details>
<summary style="font-size:130%">展开查看示例结构</summary>

```
demo                        # 顶级项目（根项目）
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









### 远程Debug

**首先要设置[启动JVM远程Debug参数](/Java/JDK工具.md#远程debug参数)**

- 点击顶部菜单`Run`点击`Edit Configuration`按钮 -> 出现弹窗，点击`+`按钮，找到`Remote`选项。
- 在`Name`中填入Remote项目名称，在`Host`中填IP地址，在`Port`中填端口号，在`Use Module classpath`选择远程调试的项目module，配置完成后点击OK即可

> 启动项目时选择刚刚填的Remote项目名称

![](/images/IDEA远程debug调试.png)




## 错误解决

### idea无限indexing解决方法

* [IntelliJ IDEA 缓存和索引介绍和清理方法](https://github.com/tengj/IntelliJ-IDEA-Tutorial/blob/newMaster/IntelliJ-IDEA-cache.md)

![](https://github.com/tengj/IntelliJ-IDEA-Tutorial/raw/newMaster/images/xii-a-invalidate-cache-1.jpg)

### OutOfMemoryError

> `idea Exception in thread "http-apr-8080-exec-2" java.lang.OutOfMemoryError: PermGen space`

- 打开顶部菜单`Run` -> `Edit Configurations` -> 应用名称如`SpringBoot` -> `目标项目` -> `Configuration`

- 在`Vm options`中输入

```conf
-Xms2048m
-Xmx2048m
-XX:MaxPermSize=4096m
-Drebel.spring_plugin=true
-Drebel.spring_mvc_plugin=true
-Drebel.hibernate_plugin=true
```