<template>
  <div class="app-wrapper">
    <silk-layout width="100%" height="100%" class-name="menu" />
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div>
        <NavBar />
      </div>
      <app-main />
    </div>
    <!-- <right-panel /> -->
  </div>
</template>

<script>
import AppMain from "./AppMain";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

export default {
  name: 'Layout',

  components: { AppMain, SideBar, NavBar},

  computed: {
    classObj() {
      return {
        hideSidebar: this.state.app.sidebar,
        openSidebar: !this.state.app.sidebar
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>

</style>
