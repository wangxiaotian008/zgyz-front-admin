import Cookies from 'js-cookie'

const TokenKey = 'admin-token'

export function setToken(token) {
  Cookies.set('admin-token', token);
}

export function getToken() {
  // console.log(Cookies.get())
  Cookies.get('admin-token');
}

export function removeToken() {
  Cookies.remove('admin-token')
}