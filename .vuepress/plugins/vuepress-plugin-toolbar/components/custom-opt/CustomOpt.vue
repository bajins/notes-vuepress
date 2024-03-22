<template>
  <base-opt :config="config">
    <div class="content" v-if="popover">
      <template v-if="popover.type == 'image'">
        <img width="100%" :src="popover.imageUrl">
      </template>
      <template v-if="popover.type == 'text'">
        {{popover.text}}
      </template>
      <template v-if="popover.type == 'html'">
        <div v-html="popover.html"></div>
      </template>
    </div>
  </base-opt>
</template>

<script>
  import BaseOpt from '../base-opt/BaseOpt'
  // 弹框定义
  const DEFAULT_CONFIG_POPOVER = { // 为空，则不显示弹框
    type: 'text', // 弹出类型： image、text、html
    imageUrl: null, // image: 地址
    text: '', // text： 文字描述
    html: '', // 显示一段 html
  }
  export default {
    components: {
      BaseOpt
    },
    props: {
      config: {}
    },
    data () {
      return {
        popover: undefined
      }
    },
    created () {
      let popover = this.config.popover
      if (popover) {
        this.popover = Object.assign({}, DEFAULT_CONFIG_POPOVER, popover)
      }
    }
  }
</script>

<style lang="stylus" scoped>

</style>
