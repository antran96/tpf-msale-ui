<template>
  <div>
    Dashboard
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
    }
  },
  created() {
    return this.$store.dispatch('common/fnRequest', 'Dashboard')
  },
  methods: {
  }
}
</script>