/**
 * Created by zack on 2016/7/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

Vue.use(Vuex)

const state = {
  account: {user_id: '', token: ''},
  isLogin: false,
  toast: {show: false, type: '', content: ''},
  college: {},
  instance: {},
  expert: {},
  expertList: [],
  expertQuestionList: [],
  userQuestionList: [],
  enrollPlan: [],
  enrollResult: [],
  resourceDetail: '',
  commonProblem: [],
  order: [],
  pageIndex: 0
}

// 读取缓存的登录状态判断是否过期
if (window.localStorage.USER && window.localStorage.USER_EXPIRATION_DATE) {
  if ((new Date()).getTime() < JSON.parse(window.localStorage.USER_EXPIRATION_DATE)) {
    state.account = JSON.parse(window.localStorage.USER)
    state.isLogin = true
  } else {
    state.account = {user_id: '', token: ''}
    delete window.localStorage.USER
    delete window.localStorage.USER_EXPIRATION_DATE
  }
}

const getters = {
  account: state => state.account,
  isLogin: state => state.isLogin,
  toast: state => state.toast,
  college: state => state.college,
  instance: state => state.instance,
  expert: state => state.expert,
  expertList: state => state.expertList,
  expertQuestionList: state => state.expertQuestionList,
  userQuestionList: state => state.userQuestionList,
  enrollPlan: state => state.enrollPlan,
  enrollResult: state => state.enrollResult,
  resourceDetail: state => state.resourceDetail,
  commonProblem: state => state.commonProblem,
  order: state => state.order,
  pageIndex: state => state.pageIndex,
  debug: state => process.env.NODE_ENV !== 'production'
}
const mutations = {
  // 从三位一体过来模拟登录
  LOGIN_SUCCEED_FROMSWYT (state, data) {
    state.isLogin = true
    state.account.user_id = data.user_id
    state.account.token = data.token
    console.log('account' + data.token)
    // state.account = data
  },
  LOGIN_SUCCEED (state, data) {
    state.account = data
    console.log('account' + data)
    state.isLogin = true
    // 登录状态缓存
    window.localStorage.USER = JSON.stringify(state.account)
    window.localStorage.USER_EXPIRATION_DATE = JSON.stringify((new Date()).getTime() + 7 * 24 * 3600 * 1000)
  },
  SHOW_TOAST (state, data) {
    state.toast = data
  },
  HIDE_TOAST (state) {
    state.toast.show = false
  },
  // 3,突变改变默认state
  FETCH_COLLEGE_INFO  (state, json) {
    let data = json
    if (!data.primaryColor) {
      data.primaryColor = '#498fc1'
    }
    state.college = data
  },
  FETCH_INSTANCE_INFO (state, json) {
    state.instance = json
  },
  FETCH_EXPERT_INFO (state, json) {
    state.expert = json
  },
  FETCH_EXPERT_LIST (state, json) {
    state.expertList = json
  },
  FETCH_EXPERT_QUESTION (state, json) {
    state.expertQuestionList = json
  },
  FETCH_USER_QUESTION (state, json) {
    state.userQuestionList = json
  },
  // SUBMIT_QUESTION (state, json) {
  //   state.submitQuestion = json
  // }
  FETCH_ENROLLPLAN (state, json) {
    state.enrollPlan = json
  },
  FETCH_ENROLLRESULT (state, json) {
    state.enrollResult = json
  },
  FETCH_RESOURCE_DETAIL (state, json) {
    state.resourceDetail = json
  },
  FETCH_COMMON_PROLEM (state, json) {
    state.commonProblem = json
  },
  // 分发订单
  CONFIRM_ORDER (state, json) {
    state.order = json
  },
  // 存取当前选中tab 的index
  CUEEENT_TAB (state, index) {
    state.pageIndex = index
  }
}

export default new Vuex.Store({
  actions,
  state,
  getters,
  mutations
})
