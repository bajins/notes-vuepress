const utils = require('./utils');
// https://vuepress.vuejs.org/zh/config
module.exports = {
    base: '/',
    // 额外的需要被注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/images/icons/logo.png' }],
        ['link', { rel: 'apple-touch-icon', href: '/images/icons/logo.png' }],
        // ['link', {rel: 'mask-icon', href: '/images/icons/safari-pinned-tab.svg', color: '#3eaf7c'}],
        // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/manifest.json
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['meta', { name: 'msapplication-TileImage', content: '/images/icons/logo.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
        ['meta', {
            name: 'keywords', content: `bajins,vue,vuepress,vuepress-theme,theme,主题,vuepress主题,blog
        ,vuepress-blog,java,python,shell,sql,golang,script,shell script,nginx,windows,去广告,androd,google drive
        ,one drive,idea,eclipse,git,小程序` }],
        ['meta', { name: 'referrer', content: 'never' }],
        ['script', { type: 'text/javascript', src: '/assets/js/load.js' }],
    ],
    // 指定 VuePress build 的输出目录。如果传入的是相对路径，则会基于 process.cwd() 进行解析。
    // 与package.json中的scripts配置编译路径配合使用 https://vuepress.vuejs.org/zh/api/cli.html
    dest: './docs',
    // temp: './.temp',
    // cache: 'false',
    lang: "zh-CN", // https://v2.vuepress.vuejs.org/zh/reference/config.html#lang
    locales: {
        // 键名是该语言所属的子路径
        // 作为特例，默认语言可以使用 '/' 作为其路径。
        '/': {
            lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
            // 没有声明 title 或者 description，VuePress 将会尝试使用配置顶层的对应值
            title: 'Bajins',
            description: '个人笔记',
        }
    },
    // 留空则使用.vuepress/theme下的自定义主题
    theme: '',
    // theme: 'reco', // https://github.com/vuepress-reco
    themeConfig: {
        // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL,当你提供了 themeConfig.repo 选项，
        // 将会自动在每个页面的导航栏生成生成一个 GitHub 链接，以及在页面的底部生成一个 "Edit this page" 链接。
        repo: 'bajins/notes-vuepress',
        editLinks: true,
        docsDir: '/',
        // valine 评论系统
        valineConfig: {
            appId: 'm9S5QXsdju39LvMs8ooRRIiF-MdYXbMMI', // your appId
            appKey: 'UfBRjySkb4bjPiFuH0Pxe3a9', // your appKey
        },
        editLinkText: '在 GitHub 上编辑此页',
        nav: utils.getNavigationMenu("./").concat(require('./nav')),
        logo: '/images/icons/logo.png',
        // 搜索设置
        search: true,
        searchMaxSuggestions: 10,
        // 侧边栏 用工具自动获取文件夹结构,auto自动形成侧边导航
        sidebar: utils.getSidebars("./"),
        // 最后更新时间
        lastUpdated: '上次更新',
        // 作者
        author: 'Bajins',
    },
    // 插件 https://vuepress.github.io/zh/
    plugins: [
        // 返回顶部按钮true显示、false不显示
        ['@vuepress/back-to-top', true],
        ['@vuepress/pwa', {
            // 如果设置为 true，VuePress 将自动生成并注册一个 Service Worker，
            // 用于缓存页面的内容以供离线使用（仅会在生产环境中启用）
            serviceWorker: true
        }],
        // 用于缩放图像的JavaScript库
        ['@vuepress/medium-zoom', true],
        // 提供 Google Analytics ID 以启用集成。
        ['@vuepress/google-analytics', { ga: 'UA-137200206-1' }],
        // 流程图
        ['flowchart'],
        ['@vuepress/last-updated', {
            transformer: (timestamp, lang) => {
                // 不要忘了安装 npm install -S moment
                const moment = require('moment');
                moment.locale(lang);
                // return moment(timestamp).fromNow();
                return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            }
        }],
        ['@vuepress/active-header-links', {
            sidebarLinkSelector: '.sidebar-link', headerAnchorSelector: '.header-anchor'
        }],
        ['@vuepress-reco/vuepress-plugin-rss', {
            site_url: 'https://bajins.com',
            copyright: "bajins.com",
            //filter:"",
            count: "20",
        }],
        // 全文搜索
        [require('./plugins/vuepress-plugin-flexsearch/index.js')],
        // ['fulltext-search'],
        // https://github.com/znicholasbrown/vuepress-plugin-code-copy
        ["vuepress-plugin-code-copy", true],
        // https://github.com/ekoeryanto/vuepress-plugin-sitemap
        ['sitemap', { hostname: 'https://bajins.com' }],
        // https://github.com/webmasterish/vuepress-plugin-autometa
        ['autometa', { site: { name: 'bajins' }, canonical_base: 'https://bajins.com' }],
        // https://github.com/webmasterish/vuepress-plugin-feed
        ['feed', { canonical_base: 'https://bajins.com' }],
        // https://github.com/shanyuhai123/vuepress-plugin-auto-sidebar
        ["vuepress-plugin-auto-sidebar", {}],// 自动生成侧边栏
        // https://github.com/xuekai-china/vuepress-plugin-right-anchor
        // ['vuepress-plugin-right-anchor'], // 页面右侧添加定位导航栏
        // https://github.com/zq99299/vuepress-plugin
        // ['vuepress-plugin-baidu-tongji-analytics', { key: '1a6c542ce78046e639afb5b37f298a51' }],
        // https://zq99299.github.io/vuepress-plugin/vuepress-plugin-toolbar
        [require('./plugins/vuepress-plugin-toolbar/index.js'), {
            'pageNav': {
                name: '导航'
            },
            opts: [
                {
                    icon: '',
                    name: '动态博客',
                    link: 'https://www.gotoxo.com',
                    popover: {
                        type: 'html',
                        title: '',
                        html: '<iframe src="https://www.gotoxo.com"></iframe>'
                    }
                },
                {
                    icon: '',
                    name: '备份博客',
                    link: 'https://notes-vuepress.pages.dev',
                },
            ]
        }],
        // https://github.com/leoloso/vuepress-plugin-plausible-analytics
        ["plausible-analytics"],
        [require('./plugins/lifecycle.js')],
    ],
    markdown: {
        // 是否在每个代码块的左侧显示行号。
        lineNumbers: false
    },
}
