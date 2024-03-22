<template>
  <aside class="me-toolbar-sidebar">
    <!--    用户导航利用此节点插入到最前面-->
    <div class="logic_first-node"></div>
    <custom-opt v-for="item in customOptConfigs"
                :config="item"
    ></custom-opt>
  </aside>
</template>

<script>
  import CustomOpt from './components/custom-opt/CustomOpt'

  export default {
    components: { CustomOpt },
    data () {
      return {
        customOptConfigs: null
      }
    },
    created () {
      this.customOptConfigs = MRCODE_TOOLBAR.opts
    }
  }
</script>

<style lang="stylus" scoped>

</style>
