import Vue from 'vue'
import ToolbarAsidebar from './ToolbarAsidebar'
import PageNav from './components/page-nav/PageNav'
import CustomOpt from './components/custom-opt/CustomOpt'

export default {
  created () {
    this._mrcodeToolbar = {
      pageAsidebar: null,
      pageNav: null
    }
  },
  mounted () {
  },
  watch: {
    '$page.path' (val) {
    },
    '$page.key' (val) {
      this.pageNavUpdate(val, this.$page)
    }
  },
  updated () {
    this.init();
  },
  beforeDestroy(){
  },
  methods: {
    init () {
      this.pageAsidebarInsert()
      if (MRCODE_TOOLBAR.pageNav) {
        this.pageNavInsert(MRCODE_TOOLBAR.pageNav)
      }
    },
    pageAsidebarInsert () {
      if (this._mrcodeToolbar.pageAsidebar) {
        return
      }
      const containers = document.querySelectorAll('.theme-container')
      let container = null
      if (containers && containers.length > 0) {
        container = containers[0]
      }
      if (!container) {
        return
      }
      const PageAsidebarObj = Vue.extend(ToolbarAsidebar)
      const pageAsidebarObjIns = new PageAsidebarObj()
      pageAsidebarObjIns._parent = container
      pageAsidebarObjIns.$mount()
      container.appendChild(pageAsidebarObjIns.$el)
      this._mrcodeToolbar.pageAsidebar = pageAsidebarObjIns
    },
    pageNavInsert (config) {
      // 如果没有初始化
      if (!this._mrcodeToolbar.pageNav) {
        let pageAsidebar = this._mrcodeToolbar.pageAsidebar
        const PageNavObj = Vue.extend(PageNav)
        const pageNavObjIns = new PageNavObj({
          propsData: {
            config: config
          }
        })
        if(!pageAsidebar){
          this.init()
          return;
        }
        pageNavObjIns._parent = pageAsidebar.$el
        pageNavObjIns.$mount()
        pageNavObjIns.pageObject = this.$page
        pageAsidebar.$el.insertBefore(pageNavObjIns.$el, pageAsidebar.$el.firstChild)
        this._mrcodeToolbar.pageNav = pageNavObjIns
      }
    },
    pageNavUpdate (pageKey, pageObject) {
      if (this._mrcodeToolbar.pageNav) {
        this._mrcodeToolbar.pageNav.pageKey = pageKey
        this._mrcodeToolbar.pageNav.pageObject = pageObject
      }
    }
  }
}
