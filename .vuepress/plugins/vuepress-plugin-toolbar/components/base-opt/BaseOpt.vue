<template>
  <div class="option-box"  v-if="!link">
    <i v-if="icon" :class="icon"></i>
    <span v-if="name">{{name}}</span>
    <div class="popover" v-if="popover">
      <template v-if="popover.title">
        <div class="title">{{popover.title}}</div>
        <hr>
      </template>
      <slot></slot>
      <a class="more-btn"
         v-if="popover.more"
         :target="popover.newWindow ? '':'_blank'"
         :href="popover.more.link">
        {{popover.more.name}}
      </a>
    </div>
  </div>
  <div class="option-box" v-else>
    <a :href="link" :target="newWindow ? '':'_blank'">
      <i v-if="icon" :class="icon"></i>
      <span v-if="name">{{name}}</span>
      <div class="popover" v-if="popover">
        <template v-if="popover.title">
          <a :href="link" :target="newWindow ? '':'_blank'">
            <div class="title">{{popover.title}}</div>
          </a>
          <hr>
        </template>
        <slot></slot>
        <a class="more-btn"
          v-if="popover.more"
          :target="popover.newWindow ? '_blank':''"
          :href="popover.more.link">
          {{popover.more.name}}
        </a>
      </div>
    </a>
  </div>
</template>

<script>
  //===================================
  /*
   * 基础插件职责：
   *  1. 侧边栏一个 item 渲染
   *  2. 弹框标题和 more 渲染
   *  3. 提供插槽给外部进行扩展
   */
  //===================================
  const DEFAULG_CONFIG = {
    icon: '',
    name: '自定义',
    link: null,
    newWindow: null,
    popover: null
  }
  // 弹框定义
  const DEFAULT_CONFIG_POPOVER = { // 为空，则不显示弹框
    title: null,
    more: null // 是否显示更多按钮，可以跳出页面
  }
  const DEFAULT_CONFIG_POPOVER_MORE = {  // 是否显示更多按钮，可以跳出页面
    name: 'more',
    link: null
  }
  export default {
    props: {
      config: {}
    },
    data () {
      return {
        icon: undefined,
        name: undefined,
        popover: undefined
      }
    },
    created () {
      let config = DEFAULG_CONFIG
      if (this.config) {
        config = Object.assign({}, DEFAULG_CONFIG, this.config)
      }
      this.icon = config.icon
      this.name = config.name
      this.link = config.link
      this.newWindow = config.newWindow
      if (config.popover) {
        this.popover = Object.assign({}, DEFAULT_CONFIG_POPOVER, this.config.popover)
        if (config.popover.more) {
          this.popover.more = Object.assign({}, DEFAULT_CONFIG_POPOVER_MORE, this.config.popover.more)
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
