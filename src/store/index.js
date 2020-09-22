import Vue from 'vue'
import Vuex from 'vuex'
import user from '../store/modules/user'
import app from './modules/app'
import permission from "./modules/permission";
import settings from "./modules/settings";
import tagsView from "./modules/tagsView";
import getters from "./getters"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    user,
    app,
    permission,
    settings,
    tagsView,
  },
  getters
})

export default store