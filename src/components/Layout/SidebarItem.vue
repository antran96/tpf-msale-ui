<template>
  <div v-if="!item.hidden">
    <template v-if="nochild" />

    <template v-else-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" style="padding-left: 30px">
          <img v-if="onlyOneChild.meta.icon === 'momo' || (item.meta && item.meta.icon === 'momo')" :src="momo" class="imgMomo">
          <svg-icon v-else :icon-class="onlyOneChild.meta.icon || (item.meta&&item.meta.icon)" />
          <span slot="title" class="tpf-text-overflow text-menu">
            {{ onlyOneChild.meta.title }}
          </span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <img v-if="item.meta && item.meta.icon === 'momo'" :src="momo" class="imgMomo">
        <svg-icon v-else :icon-class="item.meta && item.meta.icon" />
        <span slot="title" class="tpf-text-overflow text-menu">
          {{ item.meta.title }}
        </span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import momo from '@/assets/Svg/Icons/momo.jpg'

export default {
  name: 'SidebarItem',

  props: {
    item: { type: Object, required: true },
    isNest: { type: Boolean, default: false },
    basePath: { type: String, default: '' }
  },

  data() {
    this.onlyOneChild = null
    return {
      nochild: false,
      momo: momo
    }
  },

  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        if (parent.children && parent.children.length === 0) {
          this.nochild = true
        }
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-menu {
  width: 120px;
  display: inline-block;
}
.imgMomo {
  height: 25px;
  width: 25px;
  margin-left: -5px;
  margin-right: 5px;
}
.hideSidebar {
  .imgMomo {
    margin-left: 15px;
  }
}
</style>
