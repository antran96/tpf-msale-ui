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

export function calcRole(check) {
  if(!!check) {
    const needCheck = check.split('_')
    const user = cookie.getInforUser()
    // if (user && user.authorities.includes(defaults.fullpermiss)) {
    //   return true
    // }
    if (user && user.optional && user.optional.roles && user.optional.roles.length !== 0) {
      const roles = user.optional.roles
      if(needCheck && needCheck[0] && needCheck[1]){
        const role = matrixRoles[needCheck[0]] || null
        const value = (role && role[needCheck[1]] && role[needCheck[1]].value) || null
        if(value){
          return roles.includes(value)
        }
      }
      // if (matrixRoles && matrixRoles[needCheck[0]] && matrixRoles[needCheck[0]][needCheck[1]] && matrixRoles[needCheck[0]][needCheck[1]].value) {
      //   return roles.includes(matrixRoles[needCheck[0]][needCheck[1]].value)
      // } else {
      //   return false
      // }
    }
    return false
  }
}

export function checkRole(check) {
  if (Array.isArray(check)) {
    let hasRole = false;
    for (let i = 0; i < check.length; i++) {
      if (calcRole(check[i])) {
        hasRole = true
      }
    }
    return hasRole
  }
  return calcRole(check)
}

export function generateMenu(roles) {
  const hasPermission = (roles, route) => {
    if (route.meta && route.meta.roles) {
      return checkRole(route.meta.roles)
    } else {
      return true
    }
  }

  const filterAsyncRoutes = (routes, roles) => {
    const res = []
    routes.forEach(route => {
      const tmp = { ...route }
      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  let tmpRoutes
  const routes = router.options.routes
  const user = cookie.getInforUser()
  const token = cookie.getToken()
  if (token) {
    tmpRoutes = routes
  }
  // if (user && user.authorities.includes(defaults.fullpermiss)) {
  //   tmpRoutes = routes
  // } else {
    // tmpRoutes = filterAsyncRoutes(routes, user)
  // }
  return tmpRoutes
}
