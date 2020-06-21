/**
 * Created by zack on 2016/7/25.
 */
import FP from 'fingerprintjs2/fingerprint2'
import Store from '../store/'
import Vue from 'vue'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import {AjaxPlugin, md5} from 'vux'
Vue.use(AjaxPlugin)
Vue.http.defaults.withCredentials = true
const debug = process.env.NODE_ENV !== 'production'
const YC_WEB_COURSES = debug ? 'http://115.28.60.156:8080/app/' : 'http://120.26.214.76:8080/app/'
const YC_SECONDARY_REST_HOST = debug ? 'http://testdaoshi.51zy.org/rest/' : 'http://daoshi.51zy.org/rest/'
const YC_THREEINONE_HOST = debug ? 'http://115.28.60.156:8080/gkzy/rest/ncee/' : 'http://120.26.214.76:8080/gkzy/rest/ncee/'
// 微主页
const API_ROOT = debug ? 'https://testwu.51zy.org/m/' : 'https://wu.51zy.org/m/'
const EXPERT_API_ROOT = debug ? 'https://testdaoshi.51zy.org/rest/' : 'https://daoshi.51zy.org/rest/'
const WEIXIN_API_ROOT = debug ? 'http://test.wc.51zy.org/rest/' : 'http://wcservice.51zy.org/rest/'
const WEIXIN_AUTH_ROOT = debug ? 'https://xgkzy.51zy.org/rest/' : 'https://xgkzy.51zy.org/rest/'
const MS_JSON_ROOT = debug ? 'http://51zyresource.oss-cn-qingdao.aliyuncs.com/microsite/testing/' : 'http://51zyresource.oss-cn-qingdao.aliyuncs.com/microsite/production/'
// Vue.http.interceptors.push((request, next) => {
//   next()
// })

const getFP = new Promise((resolve) => {
  new FP().get(result => {
    Vue.http.defaults.headers.common['yc-f'] = result
    resolve()
  })
})

let environment = {
  yckey: '15IEEk0+WheZKqCqsbKGk3'
}
// 计算yc-sign
let xycsign
let getSign = function () {
  let timestamp = Date.now()
  // Access your env variables like this
  let str = timestamp + environment.yckey
  console.log(str)
  let sign = md5(str)
  // Set the new environment variable
  xycsign = sign + ',' + timestamp
}

export default {
  postCourse: (url, data) => {
    getSign()
    return Vue.http({
      method: 'post',
      url: YC_WEB_COURSES + url,
      headers: {'X-YC-SIGN': xycsign},
      data: data
    })
  },
  putCourse: (url, data) => {
    getSign()
    console.log(Store.getters.account.token)
    return Vue.http({
      method: 'put',
      url: YC_WEB_COURSES + url,
      headers: {'X-YC-SIGN': xycsign, 'X-YC-TOKEN': Store.getters.account.token},
      data: data
    })
  },
  getCourse: (url, data) => {
    getSign()
    return Vue.http({
      method: 'get',
      url: YC_WEB_COURSES + url,
      headers: {'X-YC-SIGN': xycsign},
      params: data
    })
  },
  postSecondary: (url, data, option) => {
    return Vue.http.post(YC_SECONDARY_REST_HOST + url, {
      user_id: Store.getters.oldAccount.user_id,
      token: Store.getters.oldAccount.token,
      data: data
    }, option)
  },
  getSecondary: (url, option) => {
    return Vue.http.get(YC_SECONDARY_REST_HOST + url, option)
  },
  postThreeInOne: (url, data, option) => {
    return Vue.http.post(YC_THREEINONE_HOST + url, data, option)
  },
  getThreeInOne: (url, option) => {
    return Vue.http.get(YC_THREEINONE_HOST + url, option)
  },
  WeixinAuthPost: async(url, data, option) => {
    await getFP
    return Vue.http.post(WEIXIN_AUTH_ROOT + url, data, option)
  },
  WeixinPost: async(url, data, option) => {
    await getFP
    return Vue.http.post(WEIXIN_API_ROOT + url, data, option)
  },
  ExpertPost: async(url, data, option) => {
    await getFP
    const account = Store.state.account
    let userId = account.user_id
    let token = account.token
    return Vue.http.post(EXPERT_API_ROOT + url, {data: data, user_id: userId, token: token}, option)
  },
  post: async(url, data, option) => {
    await getFP
    // const account = Store.state.account
    // data.user_id = account.user_id
    // data.token = account.token
    return Vue.http.post(API_ROOT + url, data, option)
  },
  WeixinGet: async(url, option) => {
    await getFP
    return Vue.http.get(WEIXIN_API_ROOT + url, option)
  },
  ExpertGet: async(url, option) => {
    await getFP
    return Vue.http.get(EXPERT_API_ROOT + url, option)
  },
  get: async(url, option) => {
    await getFP
    return Vue.http.get(API_ROOT + url, option)
  },
  getHtml: async(url, option) => {
    await getFP
    return Vue.http.get(url, option)
  },
  getMSJson: async(url, option) => {
    await getFP
    return Vue.http.get(MS_JSON_ROOT + url, option)
  },
  postHml: async(url, data, option) => {
    await getFP
    return Vue.http.post(url, data, option)
  }
}
