import Vue from 'vue'
import axios from 'axios'
// import * as io from 'socket.io-client'
import * as cookie from '@/utils/cookie'

const state = {
  statusCode: {
    401: {
      message: 'Your login session has expired or someone was login this account!',
      type: 'warning',
      excuteAction: 'user/logoutWithoutApi'
    },
    404: {
      message: 'Page Not Found.',
      type: 'error'
    },
    500: {
      message: 'Internal Server Error.',
      type: 'error'
    },
    502: {
      message: 'Internal Server is being maintained, please login later!',
      type: 'error'
    },
    '000': {
      message: 'An error occur!! Please login again!',
      type: 'error',
      excuteAction: 'user/logoutWithoutApi'
    }
  }
}

const actions = {
  fnRequest({ dispatch, rootState }, state) {
    return new Promise((resolve, reject) => {
      rootState['api'][state]._isLoading = true
      let url = process.env.VUE_APP_API
      
      let service = axios.create({ baseURL: url, timeout: 5 * 60 * 1000 })
      let token = cookie.getToken()
      let options =
        (({ url, method, responseType, params, data, headers }) => ({ url, method, responseType, params, data, headers }))(rootState['api'][state])

      if (token) { options.headers = Object.assign({ Authorization: 'Bearer ' + token }, options.headers) }
      
      service.interceptors.request.use(request => {
        return request
      })
      
      service(options).then(success => {
        dispatch('fnHandleSuccess', { state: state, success: success })
        .then(data => {
          resolve(data)
        })
      }).catch(error => {
        dispatch('fnHandleError', { model: model, error: error })
        reject(error)
      }).finally(() => {
        rootState['api'][state]._isLoading = false
        service = undefined
      })
    })
  },

  fnHandleSuccess({ dispatch, rootState }, { state, success }) {
    return new Promise((resolve) => {
      
      if (success.data === null) {
        resolve(success)
      } else if (Array.isArray(success.data)) {
        // rootState[model.root][model.state].list = success.data || []
        // rootState[model.root][model.state].total = success.headers['x-pagination-total'] || 0
      }
      if (success.data && success.data.data && success.data.data.accessToken) {
        cookie.setToken(success.data.data.accessToken)
      }
      resolve(success)
    })
  },

  fnHandleError({ dispatch, rootState }, { model, error }) {
    rootState[model.root][model.state]._stt = 'error'
    let code = '000'
    if (error && error.response) {
      code = error.response.status
    }
    const filter = state.statusCode[code]
    if (filter) {
      // Vue.prototype.$showMess(filter.type, filter.message)
      if (filter.excuteAction) {
        dispatch(filter.excuteAction, null, { root: true })
      }
    } else {
      // Vue.prototype.$showMess('error', error.response.data.message)
    }
  }

}

export default {
  namespaced: true,
  state,
  actions
}
