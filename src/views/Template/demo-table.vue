<template>
  <div style="width: 95%; margin: auto;">
    <tpf-table
      :list="datatable"
      :header="header"
      :loading="loading"
      @filterByDate="filterByDate"
      @filterByNumber="filterByNumber"
    >
      <template v-slot:tpfTable-tableFunction__inforRow>
        <div>OK</div>
      </template>
    </tpf-table>
    <el-button v-loading="loading" @click="loading = true">Loading</el-button>
  </div>
</template>

<script>
const data = require('./data-table.json')
export default {
  name: 'DemoTable',
  data() {
    return {
      datatable: [],
      header: [
        { key: 'sale.username', title: 'User Name', align: 'left', show: true },
        { key: 'sale.code', title: 'DSA Code', align: 'left', show: true },
        { key: 'lead.id', title: 'ID', align: 'left', show: true },
        { key: 'appIdFinnone', title: 'F1 ID', align: 'left', show: true },
        { key: 'lead.fullName', title: 'Customer', align: 'left', show: true },
        { key: 'lead.identify', title: 'Identify', align: 'left', show: true },
        { key: 'branchCode', title: 'Branch Code', align: 'left', show: true },
        { key: 'lead.income', title: 'Amount', align: 'left', show: true, type: 'currency' },
        { key: 'status', title: 'Status', align: 'center', show: true, type: 'label',
          defineLabel: { 'F1_ERROR': '#ff0000', 'F1_OTHER': '#008000', 'F1_RAISE_QUERY_SUBMITTED': 'blue' } },
        { key: 'f1Status', title: 'F1Status', align: 'left', show: true },
        { key: 'f1Stage', title: 'F1Stage', align: 'left', show: true },
        { key: 'createdAt', title: 'CreateAt', align: 'center', show: true,
          type: 'date', dateFormat: ['YYYY-MM-DD hh:mm:ss', 'DD/MM/YYYY'], filterType: 'date', filterKey: 'createAt' },
        { key: 'updatedAt', title: 'UpdatedAt', align: 'center', show: true,
          type: 'date', dateFormat: ['YYYY-MM-DD hh:mm:ss', 'DD/MM/YYYY'], filterType: 'date', filterKey: 'createAt' }
      ],
      loading: false
    }
  },
  created() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.datatable = data.data
    }, 1000);
    // this.$store.dispatch("common/fnRequest", "Applications")
    // .then(data => {
    //   this.loading = false
    //   this.datatable = data.data.data
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  },
  methods: {
    filterByDate(data) {
      console.log(data)
    },
    filterByNumber(data) {
      console.log(data)
    }
  }
}
</script>
