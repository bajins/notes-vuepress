const {fs, path} = require('@vuepress/shared-utils')

module.exports = {
    '/Golang/': [
        ''
    ],
    '/IDE/': [
        '',
        'IDEAPlugins',
        'SublimeText插件',
        'VisualStudioCodePlugins',
        'eclipse设置',
        'idea设置',
        'idea错误解决',
        '插件',
    ],
    '/JAVA/': [
        {
            title: 'Java',
            // path: '/JAVA/', // 可选的, 应该是一个绝对路径，访问url路径
            // collapsable: false, // 可选的, 默认值是 true,默认是可折叠的，设置false 让一个组永远都是展开状态。
            children: [
                '',
                'AOP',
                'CollectionAndMap',
                'JVM',
                'JavaFX',
                'Java异常',
                'Java笔记',
                'Java锁',
                'Quartz定时器',
                'Quartz定时器API',
                'Tomcat优化',
                'hibernate',
                'windows环境变量',
                '正则表达式',
                '项目收集',
            ]
        },
        {
            title: 'API',
            // path: '/JAVA/API/', // 可选的, 应该是一个绝对路径，访问url路径
            children: [
                '/JAVA/API/',
                '/JAVA/API/360wallpaper',
                '/JAVA/API/unsplash',
                '/JAVA/API/Wallpapers',
            ]
        }
    ],
    '/MySQL/': [
        '',
        'MySQL-binlog2sql恢复数据',
        'MySQL主从同步',
        'MySQL事件',
        'MySQL存储过程',
        'MySQL异常捕获处理',
        'MySQL循环',
        'MySQL数据库信息',
        'MySQL时间函数',
        'MySQL用户管理',
        'MySQL配置',
        '优化语句',
        '常见问题解决',
    ],
    '/Python/': [
        '',
        'install',
    ],
    '/VPS/': [
        {
            title: 'VPS',
            // path: '/VPS/', // 可选的, 应该是一个绝对路径，访问url路径
            // collapsable: false, // 可选的, 默认值是 true,默认是可折叠的，设置false 让一个组永远都是展开状态。
            children: [
                '',
                'CentOS7.x内核升级',
                'CentOS7安装mysql',
                'CentOS7安装配置svn服务',
                'CentOS新系统依赖安装',
                'Centos-idea激活与PHP',
                'NextCloudAndAria2',
                'VPS-jre',
                'centos7 配置多个Tomcat',
                'linux命令',
                'xshell',
                '宝塔面板',
                '测试脚本',
                '路由跟踪',
            ]
        },
        {
            title: '脚本',
            // path: '/VPS/script/', // 可选的, 应该是一个绝对路径，访问url路径
            children: [
                '/VPS/script/'
            ]
        },
        {
            title: 'Docker',
            // path: '/VPS/Docker/', // 可选的, 应该是一个绝对路径，访问url路径
            children: [
                '/VPS/Docker/',
                '/VPS/Docker/构建Docker镜像',
            ]
        }
    ],
    '/WEB/': [
        {
            title: 'WEB',
            // path: '/WEB/', // 可选的, 应该是一个绝对路径，访问url路径
            // collapsable: false, // 可选的, 默认值是 true,默认是可折叠的，设置false 让一个组永远都是展开状态。
            children: [
                '',
                'WebSSH',
                '微信小程序常用框架',
            ]
        },
        {
            title: 'JavaScript',
            // path: '/WEB/JavaScript/', // 可选的, 应该是一个绝对路径，访问url路径
            children: [
                '/WEB/JavaScript/',
                '/WEB/JavaScript/NodeJs'
            ]
        }
    ],
    '/other/': [
        '',
        'Android',
        'IOS',
        'Frp',
        'PC-software',
        'bat脚本使用',
        '小说',
    ],

    // fallback
    '/': [
        '',
    ],
}
