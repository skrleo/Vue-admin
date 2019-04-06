import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    userInfo: {
      account: '',
      email: '',
      headimg: '',
      phone: '',
      sex: '',
      uid: '',
      username: ''
    }
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store