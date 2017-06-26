/**
 * Created by 28431 on 2017/6/23.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  login: true,
  username: null,
  token: null
}

const mutations = {
  setLogin (state, obj) {
    state.login = obj.login
    state.username = obj.username
    state.token = obj.token
  }
}

export default new Vuex.Store({
  state,
  mutations
})
