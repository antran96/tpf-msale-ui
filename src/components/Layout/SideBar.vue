<template>
  <div>
    <!-- <silk-layout width="100%" height="100%" class-name="menu" /> -->

    <div class="sidebar-logo" :class="{'collapse': state.app.sidebar}">
      <router-link class="sidebar-logo--link" to="/">
        <img :src="tpbIcon" class="sidebar-logo--logo">
        <h1 class="sidebar-logo--title">MSale</h1>
      </router-link>
    </div>

    <el-divider class="removeMargin" />
    <el-scrollbar wrap-class="scrollbar-wrapper" style="z-index: 1;">
      <el-menu
        :default-active="activeMenu"
        :collapse="state.app.sidebar"
        background-color="transparent"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission().generateMenu()"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
import tpbIcon from '@/assets/images/icon.png'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      tpbIcon: tpbIcon
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

<style lang="scss" scoped>
.removeMargin {
  margin: 0;
}
.sidebar-logo {
  position: relative;
  width: 100%;
  text-align: center;
  overflow: hidden;
  border-bottom: 1px solid #DCDFE6;
  &:hover {
    background: rgba(89, 44, 124, 0.25)
  }
  &--link {
    height: 100%;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 6px;
  }
  &--logo {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 12px;
  }
  &--title {
    display: inline-block;
    margin: 0;
    font-weight: 600;
    font-size: 18px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
    color: var(--clForm100);
    opacity: .85;
  }
  &.collapse {
    .sidebar-logo--logo {
      margin-right: 0px !important;
    }
    .sidebar-logo--title {
      display: none;
    }
  }
}
</style>
