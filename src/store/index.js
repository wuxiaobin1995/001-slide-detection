/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-02-23 11:30:32
 * @Description : Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 规格
    specifications: '',

    // 型号
    model: ''
  },

  mutations: {
    // 规格
    CHANGE_SPECIFICATIONS(state, specifications) {
      state.specifications = specifications
    },

    // 型号
    CHANGE_MODEL(state, model) {
      state.model = model
    }
  },

  actions: {
    // 规格
    changeSpecifications({ commit }, specifications) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_SPECIFICATIONS', specifications)
        resolve()
      })
    },

    // 型号
    changeModel({ commit }, model) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_MODEL', model)
        resolve()
      })
    }
  }
})
