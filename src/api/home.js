import request from '@/utils/request'

export function getUsers(query) {
  return request({
    url: '/user/test',
    method: 'get',
    params: query,
    headers: {'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwidXNlcm5hbWUiOiLnjovkupXms4kiLCJleHBpcmVkIjpmYWxzZSwibG9ja2VkIjpmYWxzZSwiY3JlZGVudGlhbHNFeHBpcmVkIjpmYWxzZSwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNTk5NjU0ODk5fQ.-29vPHo1k5-x3NbDZyS0tq9-ikdcXEcWrMAjsdzW15Q"}
  })
}

export function login() {
  // request.post('/user/login',{
  //   username:'王井泉',
  //   password:'123456'
  // }).then(res=>{
  //   console.log(res)
  // })

  // request.post()
  return request({
    url: '/user/login',
    method: 'post',
    data: {username:'王井泉', password:'123456'},
    headers: {'Content-Type':'application/x-www-form-urlencoded'}
  })
}
