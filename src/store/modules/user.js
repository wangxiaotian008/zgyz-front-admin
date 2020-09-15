import {login} from "../../api/user";
import {getToken, removeToken, setToken} from "../../utils/auth";

const state = {
  token: getToken(),
  name: ''
}

const mutations={
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // getUserInfo()
}

const actions={
  login({commit}, loginInfo){
    return new Promise((resolve, reject)=>{
      login(loginInfo).then((res)=>{
        // state.token=
        // console.log(res);
        commit('SET_TOKEN', res.data.body.token);
        setToken(res.data.body.token)
        resolve()
      }).catch(ex=>{
        console.log(ex);
        reject(ex)
      })
    })
  },
  resetToken(){
    return new Promise(((resolve, reject) => {
      this.$store.commit('SET_TOKEN', '')
      removeToken()
      resolve()
    }))
  },
  // 退出登录
  logout(){
    return new Promise(((resolve, reject) => {
      this.$store.commit('SET_TOKEN', '')
      removeToken()
      resolve()
    }))
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,

}