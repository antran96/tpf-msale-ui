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
      password: "Fico123!",
      username: "testlead"
    }
  },
  Applications: {
    ...objState,
    url: 'applications?page=0&limit=20&tab=New',
    method: 'get'
  }
}

const mutations = {
}

export default {
  namespaced: true,
  mutations,
  state
}
