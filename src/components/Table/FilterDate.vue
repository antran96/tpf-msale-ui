<template>
  <el-popover v-model="filterByDate" placement="bottom" width="250">
    <el-row style="margin: 5px 0;">
      <el-col :span="6">
        <span style="line-height: 2;">From:</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="filter.from"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="2020-01-25"
          style="width: 100%;"
          :picker-options="pickerOptionsFrom(filter.to)"
        />
      </el-col>
    </el-row>
    <el-row style="margin: 5px 0;">
      <el-col :span="6">
        <span style="line-height: 2;">To:</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
          v-model="filter.to"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="2020-02-29"
          style="width: 100%;"
          :picker-options="pickerOptionsTo(filter.from)"
        />
      </el-col>
    </el-row>
    <el-divider class="tpf-divider" style="margin: 8px 0;" />
    <div style="text-align: right; margin: 0">
      <el-button
        size="mini"
        type="text"
        @click="filterByDate = false; clearFilter()">
      Clear
      </el-button>
      <el-button
        type="primary"
        size="mini"
        @click="filterByDate = false; filterBy()">
      Filter
      </el-button>
    </div>
    <span slot="reference">
      <el-tooltip
        class="item"
        effect="dark"
        placement="bottom"
        :content="filter.from == '' || filter.to == ''
          ? 'Click to filter'
          : 'Filter from '+ $format(filter.from, 'date') +' to '+ $format(filter.to, 'date')"
      >
        <span>
          <el-badge v-if="filter.to != ''" is-dot class="item">
            <svg-icon icon-class="filter" class="filter tpf-table-header--filter---icon clickPoint" />
          </el-badge>
          <svg-icon v-else icon-class="filter" class="tpf-table-header--filter---icon clickPoint" />
        </span>
      </el-tooltip>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'FilterDate',

  props: {
    from: { type: String, default: '' },
    to: { type: String, default: '' },
    filterKey: { type: String, default: '' }
  },

  data() {
    return {
      filter: {
        from: '',
        to: ''
      },
      filterByDate: false,
      pickerOptionsFrom(value) {
        return {
          disabledDate(time) {
            return time.getTime() >= new Date(value) || time.getTime() >= Date.now()
          }
        }
      },
      pickerOptionsTo(value) {
        return {
          disabledDate(time) {
            return (
              new Date(value) - 86400000 >= time.getTime() || time.getTime() >= Date.now()
            )
          }
        }
      }
    }
  },

  created() {
    this.filter.from = this.$props.from
    this.filter.to = this.$props.to
  },

  methods: {
    filterBy() {
      if (this.filter.from === '' || this.filter.from === null || this.filter.to === '' || this.filter.to === null) {
        if (this.filter.from === '' || this.filter.from === null) { this.filter.from = '2005-01-01' }
        if (this.filter.to === '' || this.filter.to === null) { this.filter.to = this.$format(new Date(), 'dateServer') }
      }
      this.$emit('filterByDate', { from: this.filter.from, to: this.filter.to, key: this.$props.filterKey })
    },

    clearFilter(value) {
      this.filter.from = ''
      this.filter.to = ''
      this.$emit('filterByDate', { from: this.filter.from, to: this.filter.to, key: this.$props.filterKey })
    }
  }
}
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
