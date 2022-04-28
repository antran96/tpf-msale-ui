<template>
  <div class="tpfTable">
    <div :class="[activeFunction ? 'active' : '', 'tpfTable-tableFunction']">
      <div class="tpfTable-tableFunction__option">
        <div :class="[tableFunction === 'column' ? 'active' : '', 'tpfTable-tableFunction__item item-column']" @click="activeFnTable('column')">
          <svg-icon icon-class="user" class="item-column__icon" />
          <p class="item-column__title">Columns</p>
        </div>
      </div>
      <div class="tpfTable-tableFunction__form">
        <div class="form-columns">
          <draggable v-model="headerShow" :group="{ name: 'col', pull: 'clone', put: false }">
            <transition-group type="transition" name="flip-list">
              <div v-for="element in headerShow" :key="element.key" class="form-columns__column">
                <svg-icon icon-class="drag" />
                <el-checkbox v-model="element.show" class="form-columns__checkbox">{{ element.title }}</el-checkbox>
              </div>
            </transition-group>
          </draggable>
        </div>

        <div class="form-group">
          <draggable class="list-group" :list="group" group="col" @change="addGroup">
            <div v-if="group.length === 0">
              Drag here to set row group
            </div>
            <div
              v-else
              class="list-group-item"
              v-for="(element, index) in group"
              :key="element.key"
            >
              {{ element.title }}
            </div>
          </draggable>
        </div>
      </div>
    </div>
    
    <el-table
      v-if="rerender"
      ref="Table"
      v-loading="loading"
      :data="listShow"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="border"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="'tpfTable-row '+rowClassName"
      :row-style="rowStyle"
      :header-row-class-name="'tpfTable-headerRow '+headerRowClassName"
      :header-row-style="headerRowStyle"
      row-key="name"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
    >
      <!-- <el-table-column v-if="checklist" type="selection" /> -->
      <!-- <el-table-column v-if="numRows" type="index" :index="renderIndex" align="center" /> -->
      <el-table-column
        v-for="item in headerShow"
        :key="item.key"
        :fixed="item.pin"
      >
        <template slot="header">
          <Header
            :item="item"
            @pinColumn="fnPinColumn"
            @sortCol="fnSortColumn"
            @filterByDate="filterByDate"
            @filterByNumber="filterByNumber"
          />
        </template>

        <template slot-scope="scope">
          <slot
            v-if="item.customColumn"
            :name="'custom_' + item.key"
            :handle="scope.row"
            v-text="scope.row[item.key]"
          />
          <span v-else-if="item.type && item.type === 'text'">
            <div class="textellipsis" :style="'-webkit-line-clamp:'+item.ellipsis">{{ renderValue(scope.row, item.key) }}</div>
          </span>
          <span v-else-if="item.type && item.type === 'date'">
            {{ $moment(renderValue(scope.row, item.key), item.dateFormat[0]).format(item.dateFormat[1]) }}
          </span>
          <span v-else-if="item.type && item.type === 'Label'">
            <tpf-label
              :name-label="renderValue(scope.row, item.key)"
              :bg-color="getColorLabel(scope.row, item.key)"
              :color="'#FFFFF'"
            />
          </span>
          <span v-else-if="item.type && item.type === 'mask'">
            {{ renderValue(scope.row, item.key).substring(0, 3) + '****' + renderValue(scope.row, item.key).substring(renderValue(scope.row, item.key).length - 3, renderValue(scope.row, item.key).length) }}
          </span>
          <span v-else-if="item.type && item.type === 'currency'">
            {{ validate().formatMoney(renderValue(scope.row, item.key), 0, ',', '.') }}
          </span>
          <span v-else>{{ renderValue(scope.row, item.key) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
require('./style.scss')
import Header from './header.vue';
import draggable from 'vuedraggable';
export default {
  name: 'Table',
  components: { Header, draggable },
  props: {
    list: { type: Array, default: function() { return [] } },
    header: { type: Array, default: function() { return [] } },
    loading: { type: Boolean, default: false },
    height: { type: String, default: '90vh' },
    maxHeight: { type: String, default: '100vh' },
    stripe: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
    size: { type: String, default: 'small', validator: function(value) { return ['medium', 'small', 'mini'].includes(value) } },
    fit: { type: Boolean, default: true },
    showHeader: { type: Boolean, default: true },
    highlightCurrentRow: { type: Boolean, default: false },
    currentRowKey: { type: String, default: '' },
    rowClassName: { type: String, default: '' },
    rowStyle: { type: Object, default: function() { return {} } },
    headerRowClassName: { type: String, default: '' },
    headerRowStyle: { type: Object, default: function() { return {} } },
    rowKey: { type: String, default: '' },
    emptyText: { type: String, default: 'No data available' },
    defaultExpandAll: { type: Boolean, default: false }
  },
  data() {
    return {
      rerender: true,
      activeFunction: false,
      tableFunction: '',
      headerShow: [],
      listShow: [],
      group: []
    }
  },
  watch: {
    list: {
      handler() {
        this.listShow = [...this.list]
      },
      deep: true,
      immediate: true
    },

    header: {
      handler() {
        this.headerShow = []
        for (let i = 0; i < this.header.length; i++) {
          if (this.header[i].show) {
            const col = Object.assign(this.header[i], { 
              pin: false,
              sort: "NONE",
              sortPrior: 0
            })
            this.headerShow.push(this.header[i])
          }
        }
      },
      deep: true,
      immediate: true
    },

    headerShow: {
      handler() {
        console.log(this.headerShow)
        this.rerender = false
        this.$nextTick(() => {
          this.rerender = true
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    addGroup(evt) {
      const group = evt.added.element.key
      const newData = [];
      for (let i = 0; i < this.list.length; i++) {
        const getValue = this.renderValue(this.list[i], group)
        const findKey = newData.findIndex(e => e[group] === getValue)
        if (findKey === -1) {
          const obj = {}
          obj[group] = getValue
          obj.name = getValue
          const newObj = Object.assign(obj, { children: [this.list[i]] })
          newData.push(newObj)
        } else {
          newData[findKey].children.push(this.list[i])
        }
      }
      this.listShow = newData

      const indexOld = this.headerShow.findIndex(e => e.key === group)
      const element = this.headerShow[indexOld]
      this.headerShow.splice(indexOld, 1);
      this.headerShow.splice(0, 0, element);
      
    },
    activeFnTable(key) {
      this.activeFunction = !this.activeFunction
      this.tableFunction = (this.tableFunction === key) ? '' : key
    },
    // write data with deep key inside
    renderValue(row, key) {
      function getValue(obj, key) { return obj[key] }
      const a = key.split('.')
      let value = row
      for (let i = 0; i < a.length; i++) {
        value = getValue(value, a[i])
        if (typeof value === 'undefined') { return '' }
      }
      return value
    },
    fnPinColumn(key) {
      const findCol = this.headerShow.findIndex(e => e.key === key)
      if (!!this.headerShow[findCol].pin) {
        this.$set(this.headerShow[findCol], 'pin', false)
      } else {
        this.$set(this.headerShow[findCol], 'pin', true)
      }
    },
    fnSortColumn({ obj, state }) {
      const findCol = this.headerShow.findIndex(e => e.key === obj.key)
      const sortList = []
      this.headerShow.forEach(e => {
        if (e.sort !== 'NONE') {
          sortList[e.sortPrior] = e.key
        }
      })
      if (state === 'CREATE') {
        const newData = Object.assign(obj, { sortPrior: sortList.length })
        this.$set(this.headerShow, findCol, newData)
      } else if (state === 'UPDATE') {
        const newData = Object.assign(obj)
        this.$set(this.headerShow, findCol, newData)
      } else if (state === 'DELETE') {
        sortList.splice(obj.sortPrior, 1)
        for (let i = 0; i < sortList.length; i++) {
          const findIndex = this.headerShow.findIndex(e => e.key === sortList[i])
          const newData = Object.assign(this.headerShow[findIndex], { sortPrior: i })
          this.$set(this.headerShow, findIndex, newData)
        }
        const newData = Object.assign(obj, { sort: "NONE", sortPrior: 0 })
        this.$set(this.headerShow, findCol, newData)
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
