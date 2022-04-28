import * as cookie from '@/utils/cookie'
import router, { resetRouter } from '@/router'
import { objState } from '@/utils/fn-common'

const state = {
  Login: {
    ...objState,
    url: 'auth/login',
    method: 'post',
    // params: {
    //   page: 1,
    //   limit: 20,
    //   sort: 'createdAt,desc'
    // }
    data: {
      password: "",
      username: ""
    }
  }
}

const mutations = {
}

export default {
  namespaced: true,
  mutations,
  state
}
