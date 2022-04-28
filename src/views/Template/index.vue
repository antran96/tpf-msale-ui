<template>
  <el-row :gutter="10" class="template-demo">
    <el-col :span="24" class="template-demo__title">
      This page for demo components global
    </el-col>
    <el-col :span="24" class="template-demo__body">
      <demo-table />
    </el-col>
  </el-row>
</template>

<script>
import DemoTable from './demo-table.vue'
export default {
  name: 'Template',
  components: { DemoTable },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
$base-color: #746d69;
@function opacityColor($opacity) {
  @return rgba($base-color, $opacity);
}
.template {
  &-demo {
    font-size: 13px;
    &__title {
      text-align: center;
      font-size: 1.5em;
      padding: 0.5em 0;
      color: opacityColor(1);
      font-weight: 500;
    }
    &__body {
      color: opacityColor(.8);
    }
  }
}
</style>
