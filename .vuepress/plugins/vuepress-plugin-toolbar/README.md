# vuepress-plugin-toolbar

适用于 [vuepress](https://vuepress.vuejs.org/zh/plugin/using-a-plugin.html) 插件的插件

提供的功能：可以在页面右侧区域出现自定义展示功能，如下图

![image-1](https://github.com/zq99299/vuepress-plugin/blob/master/vuepress-plugin-toolbar/docs/assets/1.png?raw=true)

## Install

```bash
yarn add vuepress-plugin-toolbar
# OR 
npm install vuepress-plugin-toolbar
```

> open npm : https://www.npmjs.com/package/vuepress-plugin-toolbar

## Usage

```javascript
module.exports = {
  "plugins": [
    ["vuepress-plugin-toolbar",{
      "opts": [
        {
          "icon": "",
          "name": "文本展示",
          "popover": {
            "type": "text",
            "title": "纯文本说明",
            "text": "这是一个纯文本的内容展示，就是一段话"
          }
        }
      ]
    }
    ]
  ]
}
```

更多自定义配置，[请参考这里](https://zq99299.github.io/vuepress-plugin/vuepress-plugin-toolbar)
