<template>
  <div class="tpf-container">
     <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="Name"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="User Name">
    </el-table-column>
    <el-table-column
      prop="identify"
      label="Identify">
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email">
    </el-table-column>
  </el-table>
    <!-- <dialog-client :form-data="dialog" :model="model" :is-edit="isEdit" /> -->
    <!-- <el-row>
      <el-col :span="24" class="tpf-form--full">
        <tpf-table-body :auto-data="model" class-name="tableFull" remove-current no-search @clicked="viewDetail">
          <template v-slot:table_button>
            <el-button
              slot="append"
              :disabled="!permission().checkRole('Client_Create')"
              icon="el-icon-plus"
              type="success"
              class="tpf-table-func--right---button"
              @click="state[model.root][model.state]._isForm = true; isEdit = false;"
            >Create Client</el-button>
          </template>
          <template v-slot:custom_scope="{ handle }">
            <div v-for="item in handle.scope && handle.scope.split(',')" :key="item">
              {{ item }}
            </div>
          </template>
          <template v-slot:custom_action="{ handle }">
            <el-tooltip class="item" effect="dark" :content="'Edit ' + handle.clientId" placement="left">
              <el-button type="primary" icon="el-icon-edit" circle :disabled="!permission().checkRole('Client_Edit')" @click="viewDetail(handle)" />
            </el-tooltip>
          </template>
        </tpf-table-body>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
// import DialogClient from './dialog-client'

export default {
  name: 'Users',
  // components: { DialogClient },
  data() {
    return {
      model: { root: 'admin', state: 'Client' },
      dialog: {},
      isEdit: false,
      tableData: []
    }
  },

  created() {
    this.getListUsers()
  },
  methods: {
    viewDetail(data) {
      this.dialog = data
      this.state[this.model.root][this.model.state]._isForm = true
      this.isEdit = true
    },

    getListUsers (){
      return this.$store.dispatch('common/fnRequest', 'ListUser').then((data) => {
        console.log('dataaaaaaaaa', data)
        // console.log('tableeeeeeeeeeeeeee', this.tableData)
      })
    }
  }
}
</script>
