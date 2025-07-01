import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import popup from '@/store/modules/popup.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
	popup
  },
  getters
})

export default store
