const {fs, path} = require('@vuepress/shared-utils')

module.exports = {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ],
	  
	  '/api/': getApiSidebar(),
          '/guide/': getGuideSidebar('指南', '深入'),
          '/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
          '/theme/': getThemeSidebar('主题', '介绍')
}


function getApiSidebar () {
  return [
    'cli',
    'node'
  ]
}

function getGuideSidebar (groupA, groupB) {
  return [
    {
      title: groupA,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'directory-structure',
        'basic-config',
        'assets',
        'markdown',
        'using-vue',
        'i18n',
        'deploy',
      ]
    },
    {
      title: groupB,
      collapsable: false,
      children: [
        'frontmatter',
        'permalinks',
        'markdown-slot',
        'global-computed'
      ]
    }
  ]
}

const officalPlugins = fs
  .readdirSync(path.resolve(__dirname, '../plugin/official'))
  .map(filename => 'official/' + filename.slice(0, -3))
  .sort()

function getPluginSidebar (pluginTitle, pluginIntro, officialPluginTitle) {
  return [
    {
      title: pluginTitle,
      collapsable: false,
      children: [
        ['', pluginIntro],
        'using-a-plugin',
        'writing-a-plugin',
        'life-cycle',
        'option-api',
        'context-api'
      ]
    },
    {
      title: officialPluginTitle,
      collapsable: false,
      children: officalPlugins,
    }
  ]
}

function getThemeSidebar (groupA, introductionA) {
  return [
    {
      title: groupA,
      collapsable: false,
      sidebarDepth: 2,
      children: [
        ['', introductionA],
        'using-a-theme',
        'writing-a-theme',
        'option-api',
        'default-theme-config',
        'inheritance'
      ]
    },
  ]
}