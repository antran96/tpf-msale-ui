<template>
  <el-popover v-model="filterNumber" placement="bottom" width="250">
    <el-row style="margin: 5px 0;">
      <el-col :span="6">
        <span style="line-height: 2;">From:</span>
      </el-col>
      <el-col :span="18">
        <el-input v-model.number="filter.from" />
      </el-col>
    </el-row>
    <el-row style="margin: 5px 0;">
      <el-col :span="6">
        <span style="line-height: 2;">To:</span>
      </el-col>
      <el-col :span="18">
        <el-input v-model.number="filter.to" />
      </el-col>
    </el-row>
    <el-divider class="tpf-divider" style="margin: 8px 0;" />
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="filterNumber = false; clearFilter()">
        Clear
      </el-button>
      <el-button type="primary" size="mini" @click="filterNumber = false; filterBy()">
        Filter
      </el-button>
    </div>
    <span slot="reference">
      <el-tooltip
        class="item"
        effect="dark"
        placement="bottom"
        :content="filter.from == 0 && filter.to == 0
          ? 'Click to filter'
          : 'Filter from '+ filter.from +' to '+ filter.to"
      >
        <span>
          <el-badge v-if="filter.from != 0 || filter.to != 0" is-dot class="item">
            <svg-icon
              icon-class="filter"
              class="filter tpf-table-header--filter---icon clickPoint"
            />
          </el-badge>
          <svg-icon v-else icon-class="filter" class="tpf-table-header--filter---icon clickPoint" />
        </span>
      </el-tooltip>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: "FilterNumber",

  props: {
    filterKey: { type: String, default: "" },
    from: { type: Number, default: 0 },
    to: { type: Number, default: 0 }
  },

  data() {
    return {
      filterNumber: false,
      filter: {
        from: 0,
        to: 0
      }
    };
  },

  created() {
    this.filter.from = this.$props.from
    this.filter.to = this.$props.to
  },

  methods: {
    filterBy() {
      this.$emit('filterByNumber', { from: this.filter.from, to: this.filter.to, key: this.$props.filterKey })
    },

    clearFilter(value) {
      this.filter.from = 0
      this.filter.to = 0
      this.$emit('filterByNumber', { from: this.filter.from, to: this.filter.to, key: this.$props.filterKey })
    }
  }
};
</script>

<style lang="scss" scoped>
// header filter
.el-dropdown {
  padding-left: 0;
  padding-right: 5px;
  line-height: 9px;
}
.el-badge {
  padding-left: 0;
  padding-right: 0;
  line-height: 10px;
  overflow: inherit;
}
</style>
