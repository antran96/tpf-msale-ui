<template>
  <div class="rightpanel-container">
    <silk-layout width="100%" height="100%" class-name="rightpanel" />
    <div class="rightpanel-container--body">
      <div v-if="state.app.userOnline">
        <h2 style="color: white">Comming Soon</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
    // this.$store.dispatch('user/getAccountDeparment')
  },
  methods: {
    // getAccountDepar(dep) {
    //   this.state.user.GetAccountManager.params.department = dep
      
    // }
  }
};
</script>
