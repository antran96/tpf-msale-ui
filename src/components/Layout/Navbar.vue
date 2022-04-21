<template>
  <div class="navbar">
    
    <div class="page-title">
      <span>{{ page }}</span>
    </div>
    
    <div class="right-menu">
      <div class="right-menu-func">

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          Long
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link>
            <el-dropdown-item>Profile</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="$store.dispatch('user/logout')">Logout</span>
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
      page: '',
    }
  },

  created() {
  },

  watch: {
    $route (to) {
      this.page = to.name
    }
  },

  methods: {
  }
}
</script>
