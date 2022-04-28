<template>
  <div style="width: 95%; margin: auto;">
    <tpf-table
      :list="datatable"
      :header="header"
      :loading="loading"
      @filterByDate="filterByDate"
      @filterByNumber="filterByNumber"
    />
    <el-button v-loading="loading" @click="loading = true">Loading</el-button>
  </div>
</template>

<script>
const data = require('./data-table.json')
export default {
  name: 'DemoTable',
  data() {
    return {
      datatable: data,
      header: [
        { key: 'name', title: 'Full Name', align: 'left', show: true },
        { key: 'phone', title: 'Phone', align: 'center', show: true, type: 'phone' },
        { key: 'email', title: 'Email', align: 'left', show: true },
        { key: 'address', title: 'Address', align: 'left', show: true },
        { key: 'postalZip', title: 'Postal Zip', align: 'left', show: true, type: 'number', filterType: 'number', filterKey: 'postalZip' },
        { key: 'region', title: 'Region', align: 'left', show: true },
        { key: 'country', title: 'Country', align: 'left', show: true },
        { key: 'text', title: 'Notes', align: 'left', show: true, type: 'text', ellipsis: 3 },
        { key: 'money', title: 'Money', align: 'center', show: true, type: 'currency' },
        { key: 'alphanumeric', title: 'Code', align: 'center', show: true, type: 'mask' },
        { key: 'createAt', title: 'CreateAt', align: 'center', show: true,
          type: 'date', dateFormat: ['YYYY-MM-DD hh:mm:ss', 'DD/MM/YYYY hh:mm'], filterType: 'date', filterKey: 'createAt' }
      ],
      loading: false
    }
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
