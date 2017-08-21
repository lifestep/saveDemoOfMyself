import Vue from 'vue'
import Vuex from 'vuex'
// import http from 'axios'

Vue.use(Vuex)

const state = {
  locationAtPresent: window.location.pathname.slice(1),
  toPlaying: {}
}

const actions = {
  getLocation ({commit}) {
    let data = window.location.pathname
    commit('PUSHLOCATION', data)
  },
  getPlaying ({commit}, data) {
    commit('PUSHPLAYING', data)
  }
}

const mutations = {
  PUSHLOCATION (store, data) {
    store.locationAtPresent = data.slice(1)
  },
  PUSHPLAYING (store, data) {
    store.toPlaying = data
  }
}

const getters = {
}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})

export default store
