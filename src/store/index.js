import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations"
import actions from "./actions"
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
     cartList:[],
     // 用户信息
    userInfo:[],
    // 默认tabBar显示
  tabBarShow: true,
  },
  mutations,
  actions,
  modules: {
  }
})
