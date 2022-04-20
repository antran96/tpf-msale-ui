import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token, expires) {
  return Cookies.set('token', token, { expires: expires })
}

export function removeToken() {
  return Cookies.remove('token')
}

export function setInforUser(infor) {
  return localStorage.setItem('INFOR_USER', JSON.stringify(infor))
}

export function getInforUser() {
  return JSON.parse(localStorage.getItem('INFOR_USER'))
}

export function clear() {
  Cookies.remove('token')
  localStorage.clear()
  return {}
}
