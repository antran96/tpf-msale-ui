<template>
  <div class="tpfTable-headerCell">
    <div class="tpfTable-headerCell__top">
      <div class="tpfTable-headerCell__left" @click="sortColumn">
        {{ item.sort === 'DESC' ? 'D' : item.sort === 'ASC' ? 'A' : '' }}
        {{ item.sort !== 'NONE' ? item.sortPrior + 1 : '' }}
      </div>
      <div class="tpfTable-headerCell__center" @click="sortColumn">
        {{ item.title }}
      </div>
      <div class="tpfTable-headerCell__right" @click="pinCol(item)">
        <filter-date
          v-if="item.filterType === 'date'"
          :filter-key="item.filterKey"
          @filterByDate="filterByDate"
        />
        <filter-number
          v-if="item.filterType === 'number'"
          :filter-key="item.filterKey"
          @filterByNumber="filterByNumber"
        />
      </div>
    </div>
    <div class="tpfTable-headerCell__bottom">
      <el-input />
    </div>
  </div>
</template>

<script>
import FilterDate from './FilterDate'
// import FilterLabel from './FilterLabel'
import FilterNumber from './FilterNumber'
// import FilterGroup from './FilterGroup'
// import FilterSearch from './FilterSearch'

export default {
  name: 'Header',

  components: {
    FilterDate,
    // FilterLabel,
    FilterNumber,
    // FilterGroup,
    // FilterSearch
  },

  props: {
    item: { type: Object, required: true }
  },

  data() {
    return {
      sortInfor: {}
    }
  },

  methods: {
    pinCol(data) {
      this.$emit('pinColumn', data.key)
    },
    sortColumn() {
      // 'ASC', 'DESC', 'NONE'
      if (this.item.sort === "ASC") {
        this.$emit('sortCol', { state: 'UPDATE', obj: { ...this.item, sort: 'DESC' } })
      } else if (this.item.sort === "DESC") {
        const obj = Object.assign(this.item, { sort: 'NONE' })
        this.$emit('sortCol', { state: 'DELETE', obj: obj })
      } else if (this.item.sort === "NONE") {
        this.$emit('sortCol', { state: 'CREATE', obj: { ...this.item, sort: 'ASC' } })
      }
    },
    filterByDate({ from, to, key }) {
      this.$emit('filterByDate', { from, to, key })
    },
    filterByNumber({ from, to, key }) {
      this.$emit('filterByNumber', { from, to, key })
    },
  }
}
</script>
