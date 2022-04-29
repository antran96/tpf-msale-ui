<template>
  <div :class="classObj" class="app-wrapper">
    <SideBar class="sidebar-container" />
    <div class="main-container">
      <div>
        <NavBar />
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
  name: "Layout",

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
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
