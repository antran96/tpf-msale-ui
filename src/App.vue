<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'

  // computed: {
  //   styleDynamic: function() {
  //     const color = [124, 77, 245]
  //     const strColor = color[0]+','+color[1]+','+color[2]+','
  //     const objStyles = {
  //       '--clForm100':  'rgba('+strColor+'1)',
  //       '--clForm50':   'rgba('+strColor+'0.5)',
  //       '--clForm10':   'rgba('+strColor+'0.1)'
  //     }
  //     return objStyles
  //   }
  // }
}
</script>
<style lang="scss">
#app {
  background-color: #ede7f6;
  font-size: var(--fontSize);
}
</style>
