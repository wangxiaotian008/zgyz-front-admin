import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  withCredentials: true, // 跨域请求时发送 cookies
  timeout: 5000, // request timeout

})


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
export default service