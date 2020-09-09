import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import {getUsers} from './api/home'
// import axios from 'axios'
import {getUsers} from '@/api/home'
import {login} from "./api/home";

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')


// console.log(getUsers())
// axios.get(process.env.VUE_APP_BASE_API + '/users')
//   .then(function (response) {
//     console.log(response)
// })

getUsers().then(res=>{
  console.log(res)
})
login().then(res=>{
  console.log(res)
})