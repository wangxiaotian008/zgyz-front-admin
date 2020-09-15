import request from '@/utils/request'

export function getUsers(query) {
  return request({
    url: '/user/test',
    method: 'get',
    params: query,
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}
