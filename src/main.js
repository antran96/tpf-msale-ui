import Vue from 'vue'
import VueMoment from 'vue-moment'
import { mapState } from 'vuex'
import Element from 'element-ui'

import locale from 'element-ui/lib/locale/lang/en'
import 'normalize.css/normalize.css'
// import '@/styles/element-variables.scss'
// import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'

import '@/utils/icon'
import * as permission from '@/utils/permission'
import * as fnCommon from '@/utils/fn-common'
// require('./registerServiceWorker.js')
permission.permissionRoute()

import * as cookie from '@/utils/cookie'
require('@/components')

Vue.use(Element, { locale, size: 'small' })
Vue.use(VueMoment)

Vue.config.productionTip = false

Vue.mixin({
  computed: mapState({ state: state => state }),
  methods: {
    fnCookie: () => cookie,
    fnCommon: () => fnCommon,
    permission: () => permission,
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
