<template>
  <base-opt :config="configP" v-bind:style="styleObject" class="me-toolbar-sidebar-page-nav">
    <a v-if="pageTitleObj != null"
       :href="pageTitleObj.path"
       class="sidebar-link page-nav-title">
      {{pageTitleObj.name}}
    </a>
    <hr>
    <div class="page-nav-scorll">
      <page-nav-item :menus="headers"></page-nav-item>
    </div>
  </base-opt>
</template>

<script>
  import BaseOpt from '../base-opt/BaseOpt'
  import PageNavItem from './PageNavItem'

  const DEFAULG_CONFIG = {
    icon: 'iconfont icon-daohang',
    name: '导航',
  }
  export default {
    components: { BaseOpt, PageNavItem },
    props: {
      config: {},
      pageObject: {},
      pageKey: {},
    },
    data () {
      return {
        styleObject: {
          display: undefined
        },
        configP: null,
        headers: [],
        pageTitleObj: null
      }
    },
    created () {
      let config = DEFAULG_CONFIG
      if (this.config) {
        config = Object.assign({}, DEFAULG_CONFIG, this.config)
      } else {
        config = Object.assign({}, DEFAULG_CONFIG, {
          popover: {}
        })
      }
      if (!config.popover) {
        config.popover = {}
      }
      this.configP = config
    },
    methods: {
      build () {
        let tocs = this.buildTocs()
        if (tocs.length == 1) {
          this.pageTitleObj = tocs[0]
          this.headers = tocs[0].childs
        } else {
          this.headers = tocs
        }
      },
      buildTocs () {
        let headerLins = document.querySelectorAll('.page .content__default .header-anchor')
        if (headerLins && headerLins.length != 0) {
          let headers = []
          let h1Node = null
          let h2Node = null
          let h3Node = null
          let h4Node = null
          let h5Node = null
          let h6Node = null
          headerLins.forEach(item => {
            let tagName = item.parentElement.tagName.toLowerCase()
            let level = parseInt(tagName.substr(1))
            let node = {
              path: item.pathname + item.hash,
              name: item.nextSibling.data,
              level: level,
              childs: []
            }
            switch (level) {
              case 1:
                h1Node = node
                headers.push(node)
                break
              case 2:
                h1Node.childs.push(node)
                h2Node = node
                break
              case 3:
                h2Node.childs.push(node)
                h3Node = node
                break
              case 4:
                h3Node.childs.push(node)
                h4Node = node
                break
              case 5:
                h4Node.childs.push(node)
                h5Node = node
                break
              case 6:
                h5Node.childs.push(node)
                h6Node = node
                break
            }
          })
          // console.log(headers)
          return headers
        }
      }
    },
    watch: {
      pageKey (val) {
      },
      pageObject (val) {
        if ('/' == val.path) {
          this.styleObject.display = 'none'
          return
        }
        this.styleObject.display = undefined
        this.$nextTick(() => {
          this.build()
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .close {
    display none !important
  }
</style>
