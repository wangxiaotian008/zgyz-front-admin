import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'
// import {getUsers} from '@/api/home'
// import {login} from "./api/home";
import store from "./store";
import '@/styles/index.scss' // global css
import './icons' // icon
Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

new Vue({
  router,
  store,
  render: function (h) { return h(App) },

}).$mount('#app')

