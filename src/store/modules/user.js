import * as cookie from '@/utils/cookie'
import router, { resetRouter } from '@/router'
import { objState } from '@/utils/fn-common'
import store from '@/store'
import * as permission from '@/utils/permission'
const state = {
  Login: {
    ...objState,
    url: 'login',
    method: 'post',
    rules: {
      username: [{ required: true, trigger: ['blur', 'change'] }],
      password: [{ required: true, trigger: ['blur', 'change'] }]
    },
    data: {
      username: '',
      password: ''
    }
  },
  Logout: {
    ...objState,
    url: 'logout',
    method: 'get'
  },
  GetInfor: {
    ...objState,
    url: 'me',
    method: 'get'
  },
  GetInforUser: {
    ...objState,
    url: 'account',
    method: 'get'
  },
  ChangePass: {
    ...objState,
    url: 'change-password',
    method: 'post',
    rules: {
      oldPassword: [{ required: true, trigger: ['blur', 'change'] }],
      newPassword: [
        { validator: (rule, value, callback) => {
          if (value == state.ChangePass.data.oldPassword) {
            callback(new Error('New password must be diffren old password'));
          } else {
            callback()
          }
        }, trigger: 'change', required: true }
      ],
      confirmPassword: [
        { validator: (rule, value, callback) => {
          if (value != state.ChangePass.data.newPassword) {
            callback(new Error('Confirm password not mark'));
          } else {
            callback()
          }
        }, trigger: 'change', required: true }
      ]
    },
    data: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  UserTeamInfoEFORM: {
    ...objState,
    baseURL: 'VUE_APP_API_NOT1',
    url: 'eform/getInfoUserLogin',
    method: 'post',
    data: {
        userName: null
    },
  },
  UserTeamInfoAutoAllocation: {
    ...objState,
    baseURL: 'VUE_APP_API_NOT1',
    url: 'tpf-service-autoallocation/get-user-login/',
    method: 'post',
    data: {
        userName: null
    },
  },
  UpdateUserTeamStatusEFORM: {
      ...objState,
      baseURL: 'VUE_APP_API_NOT1',
      url: 'eform/updateUserTeam',
      method: 'post',
  },
  UpdateUserTeamStatusAutoAllocation: {
      ...objState,
      baseURL: 'VUE_APP_API_NOT1',
      url: 'tpf-service-autoallocation/update-login-status/',
      method: 'post',
  },
  GetAccountManager: {
    ...objState,
    url: 'account',
    method: 'get',
    params: {
      page: 1,
      limit: 9999
    }
  },
  GetMemberDepartment: {
    ...objState,
    url: 'account',
    method: 'get',
    params: {
      page: 1,
      limit: 9999,
      department: ''
    }
  }
}

const mutations = {
  GET_ACCOUNT_MANAGER: (state, depart) => {
    state.GetAccountManager.params.department = depart
  }
}

const actions = {
  // user logout
  logout({ dispatch, state, rootState }) {
    return dispatch('updateUserTeamInfo', {infor: cookie.getInforUser(), flag: false}).then(()=>{
      cookie.clear()
      router.push(`/login?redirect=${router.fullPath}`)
      resetRouter()
    }).catch(()=>{
      cookie.clear()
      router.push(`/login?redirect=${router.fullPath}`)
      resetRouter()
    })
  },

  logoutWithoutApi({ dispatch, state, rootState }) {
    return dispatch('updateUserTeamInfo', {infor: cookie.getInforUser(), flag: false}).then(()=>{
      cookie.clear()
      router.push(`/login?redirect=${router.fullPath}`)
      resetRouter()
    }).catch(()=>{
      cookie.clear()
      router.push(`/login?redirect=${router.fullPath}`)
      resetRouter()
    })
  },

  // department -> branch
  // channel: department + project 
  // async getAccountDeparment() {
  //   const me = cookie.getInforUser()
  //   for (let i = 0; i < me.departments.length; i++) {
  //     state.GetAccountManager.params.department = me.departments[i]
  //     console.log(state.GetAccountManager.params.department)
  //     await store.dispatch('common/fnRequest', { root: 'user', state: 'GetAccountManager' })
  //         .then(res => { console.log(res) })
  //         .catch(err => {})
  //   }
  // },

  async getAccountDeparment({ dispatch, state, rootState }, departments ) {
    const me = cookie.getInforUser()
    let tempt = []
    if (Array.isArray(departments)) {
      if (departments.length === 0) {
        console.log('departments must be array not empty!')
        return false
      } else {
        tempt = departments
      } 
    } else if (departments === null) {
      tempt = me.departments
    }
    
    for (let i = 0; i < tempt.length; i++) {
      state.GetMemberDepartment._isLoading = true
      const data = await dispatch('getDepartment', tempt[i])
      if (i === (tempt.length - 1)) {
        state.GetMemberDepartment._isLoading = false
        return state.GetMemberDepartment.obj
      }
    }
  },
  
  getDepartment({ dispatch, state, rootState }, department ) {
    return new Promise((resolve, reject) => {
      state.GetMemberDepartment.params.department = department
      store.dispatch('common/fnRequest', { root: 'user', state: 'GetMemberDepartment' })
          .then(res => {
            state.GetMemberDepartment.obj[department] = res
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
    })
  },

  updateStatus({ dispatch, state, rootState }, status) {
    const me = cookie.getInforUser()
    console.log(me)
    console.log(status)
    console.log(rootState.common.socket)
    // state.socket.emit('chat', 'message')
    // store.commit('admin/SET_DATA_UPDATEACCOUNT', { data: me, status: status }, { root: true })
    // store.dispatch('common/fnRequest', { root: 'admin', state: 'UpdateAccount' })
  },
  updateUserTeamInfo({}, data){
    let infor = data.infor;
    let reqs = []
    if(permission.checkUserTeamRole(infor, 'EFORM')){
      state.UserTeamInfoEFORM.data  = {
        userName: infor.user_name
      };
      let req_eform = store.dispatch('common/fnRequest', { root: 'user', state: 'UserTeamInfoEFORM' }).then(res => {
        cookie.setInforUserTeam('USER_TEAM_EFORM', state.UserTeamInfoEFORM.list)
        state.UserTeamInfoEFORM.list.forEach((item)=>{
          item.activeFlag = data.flag ? 'Y' : 'N';
          state.UpdateUserTeamStatusEFORM.data = item;
          store.dispatch('common/fnRequest', { root: 'user', state: 'UpdateUserTeamStatusEFORM'});
        });
        return true;
      }).catch(error => {
        console.log('error', error);
        return false;
      });
      reqs.push(req_eform)
    }
    // if(permission.checkUserTeamRole(infor, 'AUTO_ALLOCATION')){
    //   console.log('AUTO_ALLOCATION', infor);
    //   state.UserTeamInfoAutoAllocation.data  = {
    //     userName: infor.user_name
    //   };
    //   let req_auto_allocation = store.dispatch('common/fnRequest', { root: 'user', state: 'UserTeamInfoAutoAllocation' }).then(res => {
    //     cookie.setInforUserTeam('USER_TEAM_AUTO_ALLOCATION',state.UserTeamInfoAutoAllocation.list)
    //     if(state.UserTeamInfoAutoAllocation.list && state.UserTeamInfoAutoAllocation.list.length > 0){
    //       state.UpdateUserTeamStatusAutoAllocation.data  = {
    //         userName: infor.user_name,
    //         activeFlag: data.flag ? 'Y' : 'N'
    //       };
    //       store.dispatch('common/fnRequest', { root: 'user', state: 'UpdateUserTeamStatusAutoAllocation'});
    //     }
    //     return true;
    //   }).catch(error => {
    //     console.log('error', error);
    //     return false
    //   });
    //   reqs.push(req_auto_allocation)
    // }
    return Promise.all(reqs).then((result)=>{
      return true
    }).catch(error => {
      console.log('updateUserTeamInfo error', error);
      return false;
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
