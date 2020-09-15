import axios from 'axios'
import {getToken} from '@/utils/auth'
import ElementUI from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000, // request timeout
})


const Bearer = 'Bearer '
// 在发送请求前，把登录成功后的token放到header里
service.interceptors.request.use(config=>{
  config.headers['Authorization'] = Bearer + getToken();
  console.log(config);
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
})

// 对请求返回来的数据进行处理，从response的header里获取到token并更新前台token
service.interceptors.response.use(response=>{
  console.log(response);
  let statusCode = response.data.statusCode;
  let errorCode = response.data.errorCode;
  if(statusCode != 200) {
    if (errorCode == '0x00900006') {
      ElementUI.Message({
        type: "error",
        message: response.data.errorMessage,
      });
    }
    // token过期，或者token无效，则重新登录
    if (errorCode == '0x00900007' || errorCode == '0x00900005') {
      ElementUI.MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    return Promise.reject('error')
  }

}, error => {
  return Promise.reject(error)
})
export default service

// 此处可以传入两个函数success和error，当外部调用request方法时，success和error方法会被回调
// export function request(config, success, failure) {
//
//   const instance = axios.create({
//     baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
//     // withCredentials: true,
//     timeout: 5000
//   })
//   instance(config).then(result=>{
//     success(result) // 回调
//   }).catch(error => {
//     failure(error)
//   })
// }

// export function request(config) {
//
//   return new Promise((resolve, reject) => {
//
//     const instance = axios.create({
//       baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
//       // withCredentials: true,
//       timeout: 5000
//     })
//     instance(config).then(res=>{
//       console.log(res)
//       resolve(res)
//     }).catch(error=>{
//       reject(error)
//     })
//   })
// }
