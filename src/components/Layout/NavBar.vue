<template>
  <div class="navbar">
    <silk-layout width="100%" height="100%" class-name="navbar" />

    <div class="page-title">
      <span>{{ page }}</span>
    </div>

    <div class="right-menu">
      <div class="right-menu-func">
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">Long</div>
          <el-dropdown-menu slot="dropdown">
            <router-link>
              <el-dropdown-item>Profile</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display: block">Logout</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "",
    };
  },

  watch: {
    $route(to) {
      this.page = to.name;
    },
  },

  created() {
    this.page = this.$route.name;
  },

  methods: {},
};
</script>