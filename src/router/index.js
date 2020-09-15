import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index'

Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    name: 'Home',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Home',
    // component: Home
    component: login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: function () {
    //   return import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=> import('@/views/home')
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
