import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken,removeToken,setToken } from '../utils/auth.js' // get token from cookie

Vue.use(VueRouter)


// 静态路由，不需要配置权限就可以访问得路由.
// 注： 对于子路由来说，path不要带'/', 带了‘/’会出现访问不到得问题。
export const constantRoutes = [
  {
    path: '',
    name: 'Welcome',
    redirect: '/welcome', // 需要在此处加个redirect，因为这样首先会加载layout vue，然后重定向到路径/welcome,加载welcome vue.
    component: ()=> import('@/layout'),
    children: [
      {
        path: 'welcome',
        component: ()=> import('@/views/welcome')
      }
    ],
  },
  // 工作记录
  {
    path: '/worksheet',
    name: 'Worksheet',
    redirect: '/worksheet/list',
    component: () => import('@/layout'),
    children: [
      {
        path: 'list',
        component: ()=> import('@/views/worksheet/list')
      },
      {
        path: 'create',
        component: ()=> import('@/views/worksheet/create')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // component: Home
    component: ()=> import('@/views/login')  // 通过这种方式可以实现懒加载(就是访问到哪个组件就加载哪个组件，而不是全都加载)
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
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})

export const asyncRoutes = [
  {
    path: '/rolelist',
    name: 'RoleList',
    component: ()=> import('@/views/roles'),
    meta: {
      title: '角色管理',
      roles: ['admin'],
    }
  }
]

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist
// router 全局守卫， 该方法主要是对router进行适配，通过获取当前用户得角色，来动态添加路由
router.beforeEach(async(to, from, next) => {

  // start progress bar
  NProgress.start()

  // 这里有个很奇怪得问题，我明明import了getToken，但是却是未定义。
  // console.log(getToken())
  let hasToken = store.state.user.token;

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      // if (hasRoles) {
      //   next()
      // } else {
      //   try {
      //     // 该地方被注掉，是因为登录之后就返回了用户信息
      //     // get user info
      //     // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
      //     // const { roles } = await store.dispatch('user/getInfo')
      //
      //     // generate accessible routes map based on roles
      //     const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
      //
      //     // dynamically add accessible routes
      //     router.addRoutes(accessRoutes)
      //
      //     // hack method to ensure that addRoutes is complete
      //     // set the replace: true, so the navigation will not leave a history record
      //     next({ ...to, replace: true })
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})


export default router
