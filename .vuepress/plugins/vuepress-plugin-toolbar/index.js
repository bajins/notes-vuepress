const path = require('path')
module.exports = (options = {}, context) => ({
  name: 'vuepress-plugin-toolbar',
  define () {
    return {
      MRCODE_TOOLBAR: Object.assign({}, options)
    }
  },
  clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js'),
  enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
})
