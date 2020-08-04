import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const state = {
  userId: sessionStorage.getItem('userId'),
  userName: sessionStorage.getItem('userName'),
  userJobid: sessionStorage.getItem('userJobid'),
  userSubject: sessionStorage.getItem('userSubject'),
  userClass: sessionStorage.getItem('userClass'),
  stuClass: sessionStorage.getItem('stuClass'),
  isLogin: sessionStorage.getItem('isLogin')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userId: (state) => state.userId,
  userName: (state) => state.userName,
  userJobid: (state) => state.userJobid,
  userSubject: (state) => state.userSubject,
  userClass: (state) => JSON.parse(state.userClass),
  stuClass: (state) => state.stuClass,
  isLogin: (state) => state.isLogin
}
const mutations = {
  handleUserId: (state, userId) => {
    state.userId = userId
    sessionStorage.setItem('userId', userId)
  },
  handleUserName: (state, userName) => {
    state.userName = userName
    sessionStorage.setItem('userName', userName)
  },
  handleUserJobid: (state, userJobid) => {
    state.userJobid = userJobid
    sessionStorage.setItem('userJobid', userJobid)
  },
  handleUserSubject: (state, userSubject) => {
    state.userSubject = userSubject
    sessionStorage.setItem('userSubject', userSubject)
  },
  handleUserClass: (state, userClass) => {
    state.userClass = userClass
    sessionStorage.setItem('userClass', JSON.stringify(userClass))
  },
  handleStuClass: (state, stuClass) => {
    state.stuClass = stuClass
    sessionStorage.setItem('stuClass', stuClass)
  },
  isLogin (state, status) {
    state.isLogin = status
    sessionStorage.setItem('isLogin', status)
  },
  LoginOut (state) {
    sessionStorage.clear()
    state.userId = ''
    state.userName = ''
    state.userJobid = ''
    state.userSubject = ''
    state.stuClass = ''
    state.isLogin = false
  }

}

const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store
