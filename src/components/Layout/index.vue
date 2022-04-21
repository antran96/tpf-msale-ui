<template>
  <div :class="classObj" class="app-wrapper">
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <div>
        <nav-bar />
      </div>
      <app-main />
    </div>
    <right-panel />
  </div>
</template>

<script>
import AppMain from "./AppMain";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import RightPanel from "./RightPanel";

export default {
  name: "lay-out",

  components: { AppMain, NavBar, SideBar, RightPanel },

  computed: {
    classObj() {
      return {
        hideSidebar: this.state.app.sidebar,
        openSidebar: !this.state.app.sidebar,
        hideRightPanel: !this.state.app.rightPanel,
        openRightPanel: this.state.app.rightPanel
      };
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
