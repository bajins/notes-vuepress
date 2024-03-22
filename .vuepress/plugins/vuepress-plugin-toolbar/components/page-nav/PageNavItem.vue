<template>
  <div>
    <ul v-for="menu in menus" class="sidebar-links page-nav-link">
      <li class="sidebar-links page-nav-link">
        <a :href="menu.path" class="sidebar-link page-nav-link">
          {{menu.name}}
        </a>
        <page-nav-item v-if="menu.childs && menu.childs.length != 0" :menus="menu.childs"></page-nav-item>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PageNavItem',
    props: {
      menus: {}
    },
    create () {
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="stylus" scoped>
</style>
