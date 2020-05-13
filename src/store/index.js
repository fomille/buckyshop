import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userModel: {}
}

const mutations = {
  /**
   * 登录信息
   * @param state
   * @param data
   */
  setUserModel: (state, data) => {
    if (data) {
      state.userModel = data
      localStorage.setItem('userModel', JSON.stringify(data))
    }
  }
}

/**
 * 缓存加载
 */
for (const stateKey in state) {
  if (localStorage.getItem(stateKey)) {
    try {
      state[stateKey] = JSON.parse(localStorage.getItem(stateKey))
    } catch (error) {
      state[stateKey] = localStorage.getItem(stateKey)
    }
  }
}

export default new Vuex.Store({
  state,
  mutations
})
