<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div>
        <navbar />
      </div>
      <app-main />
    </div>
    <right-panel />
  </div>
</template>

<script>
import AppMain from "./AppMain";
// import NavBar from "./NavBar";
// import SideBar from "./SideBar";

export default {
  name: "Layout",

  components: { AppMain },

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
