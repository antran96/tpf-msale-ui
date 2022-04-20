import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as cookie from '@/utils/cookie'

export function permissionRoute() {
  const whiteList = ['/login', '/template']
  NProgress.start()
  router.beforeEach(async(to, from, next) => {
    const hasToken = cookie.getToken()
    if (hasToken) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        next()
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
    NProgress.done()
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
