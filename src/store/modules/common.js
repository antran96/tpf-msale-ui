import Vue from 'vue'
import axios from 'axios'
import * as cookie from '@/utils/cookie'
import { objState } from '@/utils/fn-common'

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
  fnRequest({ dispatch, rootState }, model) {
    return new Promise((resolve, reject) => {
      rootState[model.root][model.state]._isLoading = true
      let url = process.env.VUE_APP_API
      if (!!rootState[model.root][model.state].baseURL) {
        const baseURL = rootState[model.root][model.state].baseURL
        url = process.env[baseURL]
      }
      
      let service = axios.create({ baseURL: url, timeout: 5 * 60 * 1000 })
      let token = cookie.getToken()
      let options =
        (({ url, method, responseType, params, data, headers }) => ({ url, method, responseType, params, data, headers }))(rootState[model.root][model.state])

      if (rootState[model.root][model.state].uuid) {
        options.data = {
          request_id: uuidv1(),
          date_time: Vue.moment().format(),
          data: rootState[model.root][model.state].data
        }
      }

      if (token) { options.headers = Object.assign({ Authorization: 'Bearer ' + token }, options.headers) }
      const idLog = Math.floor(Math.random() * 99999999999) + 1

      const key = (
        model.root === 'dataentry' && 
          (model.state === 'FirstCheck' || model.state === 'UploadFiles' || model.state === 'RetryUpload' || model.state === 'CreateApp')
        ) ? model.key : null
      
      service.interceptors.request.use(request => {
        // logApiRequest({ id: idLog, model: model, request: request })
        if (model.root === 'cms' && model.state === 'Sale') {
          
        }
        return request
      })
      
      service(options).then(success => {
        // logApiResponse({ id: idLog, response: success })
        dispatch('fnHandleSuccess', { model: model, success: success })
        .then(data => {
          if (!!key) {
            data = Object.assign( { key: key }, data)
          }
          resolve(data)
        })
      }).catch(error => {
        // logApiResponse({ id: idLog, response: error.response })
        dispatch('fnHandleError', { model: model, error: error })
        if (!!key) {
          error = Object.assign( { key: key }, error)
        }
        reject(error)
      }).finally((error) => {
        rootState[model.root][model.state]._isLoading = false
        service = undefined
      })
    })
  },

  fnSocket({ dispatch, state,  rootState }) {
    const socket = io.connect(`${process.env.VUE_APP_SOCKET_HOST}chat`, {
      reconnectionAttempts: 5,
      reconnectionDelayMax: 10000,
      transports: ['websocket'],
      path: '/long/socket.io',
      query: {
          token: cookie.getToken()
      }
    })
    socket.on('connect', function () { console.log('connect') });
    socket.on('event', function (data) { console.log('event') });
    socket.on('disconnect', function () { console.log('disconnect') });
    
    state.SkChat = socket
  },

  callChat({ dispatch, rootState }) {
    state.socket.emit('chat', 'Hi everyone!')
  },

  fnHandleSuccess({ dispatch, rootState }, { model, success }) {
    return new Promise((resolve, reject) => {
      rootState[model.root][model.state]._stt = 'success'
      if (success.data === null) {
        resolve(success)
      } else if (Array.isArray(success.data)) {
        rootState[model.root][model.state].list = success.data || []
        rootState[model.root][model.state].total = success.headers['x-pagination-total'] || 0
      } else {
        dispatch('fnHandleDetectData', { model: model, res: success })
      }
      if (success.data && success.data.access_token) {
        cookie.setToken(success.data.access_token, success.data.expires_in)
      }
      resolve(success.data)
    })
  },

  fnHandleDetectData({ dispatch, rootState }, { model, res }){
    if(res && res.data){
      if(Array.isArray(res.data)){
        rootState[model.root][model.state].list = res.data || []
        rootState[model.root][model.state].total = (res.headers && res.headers['x-pagination-total']) || res.total || res.totalRecords || res.data.length || 0
      }else{
        dispatch('fnHandleDetectData', { model: model, res: res.data })
      }
    }else if(res && res.result){
      if(Array.isArray(res.result)){
        rootState[model.root][model.state].list = res.result || []
        rootState[model.root][model.state].total = (res.headers && res.headers['x-pagination-total']) || res.total || res.totalRecords || res.result.length || 0
      }else{
        dispatch('fnHandleDetectData', { model: model, res: res.result })
      }
    }else if(res && res.content){
      if(Array.isArray(res.content)){
        if (model.root === 'cms') {
          rootState[model.root][model.state].list = res.content || []
          rootState[model.root][model.state].total = res.total_records || 0
        }
      }else{
        dispatch('fnHandleDetectData', { model: model, res: res.result })
      }
    }else{
      rootState[model.root][model.state].obj = res
    }
  },

  fnHandleError({ dispatch, rootState }, { model, error }) {
    rootState[model.root][model.state]._stt = 'error'
    let code = '000'
    if (error && error.response) {
      code = error.response.status
    }
    const filter = state.statusCode[code]
    if (filter) {
      Vue.prototype.$showMess(filter.type, filter.message)
      if (filter.excuteAction) {
        dispatch(filter.excuteAction, null, { root: true })
      }
    } else {
      Vue.prototype.$showMess('error', error.response.data.message)
    }
  },

  fnCallResetView: ({ state, rootState }, model) => {
    rootState[model.root][model.state] = {
      ...rootState[model.root][model.state], obj: {},
      isLoading: false, isCreate: false, isUpdate: false, isDelete: false, isForm: false
    }
  }

}

export default {
  namespaced: true,
  state,
  actions
}
