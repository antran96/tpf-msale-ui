<template>
  <div class="tpf-container">
    <!-- <dialog-account :form-data="dialog" :model="model" :is-edit="isEdit" /> -->
    <el-row>
      <el-col :span="24" class="tpf-form--full">
        <tpf-table-body :auto-data="model" class-name="tableFull" remove-current @clicked="viewDetail">
          <template v-slot:table_button>
            <el-button
              slot="append"
              :disabled="!permission().checkRole('Account_Create')"
              icon="el-icon-plus"
              type="success"
              class="tpf-table-func--right---button"
              @click="state[model.root][model.state]._isForm = true; isEdit = false;"
            >Create Account</el-button>
          </template>
          <template v-slot:custom_action="{ handle }">
            <el-tooltip class="item" effect="dark" :content="'Edit Account ' + handle.username" placement="left">
              <el-button type="primary" icon="el-icon-edit" circle :disabled="!permission().checkRole('Account_Edit')" @click="viewDetail(handle)" />
            </el-tooltip>
            <el-tooltip v-if="!handle.enabled" class="item" effect="dark" :content="handle.username + ' blocked'" placement="bottom">
              <el-button type="danger" icon="el-icon-user-solid" circle />
            </el-tooltip>
          </template>
        </tpf-table-body>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import DialogAccount from './dialog-account'

export default {
  name: 'Account',
  // components: { DialogAccount },
  data() {
    return {
      model: { root: 'admin', state: 'Account' },
      dialog: {},
      isEdit: false
    }
  },

  created() {
    this.defineFilterTable()
  },

  methods: {
    viewDetail(data) {
      this.dialog = data
      this.state[this.model.root][this.model.state]._isForm = true
      this.isEdit = true
    },

    defineFilterTable() {
      const my = this.fnCookie().getInforUser()
      const roleGetFull = this.permission().checkRole('Account_Getfull')

      this.state.admin.Account.filterLabel.department.label = my.departments
      this.state.admin.Account.filterLabel.project.label = my.projects
      this.state.admin.Account.filterLabel.branch.label = my.branches
      if (!roleGetFull) {
        this.state.admin.Account.filterLabel.department.default = my.departments
        this.state.admin.Account.filterLabel.project.default = my.projects
        this.state.admin.Account.filterLabel.branch.default = my.branches
      }
    }
  }
}
</script>
