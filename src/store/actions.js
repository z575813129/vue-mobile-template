/**
 * Created by zack on 2016/7/25.
 */
import * as types from './mutation-types'
import api from '../api/'

// 公共方法
const _showMsg = (commit, {content, type}) => {
  commit(types.SHOW_TOAST, {show: true, content: content, type: type})
  setTimeout(() => commit(types.HIDE_TOAST), 2000)
}

// 所有行为
export const showMsg = ({commit}, {content, type}) => {
  _showMsg(commit, {content, type})
}

// 从三位一体过来的用户模拟登录成功
export const loginFromSWYT = ({commit}, data) => {
  commit(types.LOGIN_SUCCEED_FROMSWYT, data)
}

// 存取当前选中tab
export const fetchCurrentTab = ({commit}, data) => {
  commit(types.CUEEENT_TAB, data)
}

// 手机登录
export const login = ({commit}, obj) => {
  return api.login(obj.phone, obj.vcode).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.LOGIN_SUCCEED, json.data)
        _showMsg(commit, {content: '登录成功'})
        break
      case 405:
        _showMsg(commit, {content: '登录失败', type: 'cancel'})
        break
    }
  })
}

// 三方登录
export const thirdLogin = ({commit}, data) => {
  return api.thirdLogin(data).then(r => {
    if (r.status === 200) {
      let account = {
        account: r.data
      }
      return api.oldLogin(account.account.userInfo.phoneNo).then(r => {
        if (r.data.code === 200) {
          account.oldAccount = r.data.data
          commit(types.LOGIN_SUCCEED, account)
          _showMsg(commit, '登录成功')
          return {
            result: 1
          }
        } else {
          _showMsg(commit, '登录失败', 'cancel')
          return {
            result: 0
          }
        }
      }).catch(e => {
        _showMsg(commit, e.response.data.msg, 'cancel')
        return {
          result: 0
        }
      })
    } else {
      _showMsg(commit, '登录失败', 'cancel')
      return {
        result: 0
      }
    }
  }).catch(e => {
    if (e.response.status === 400) {
      _showMsg(commit, '请先绑定手机号码', 'cancel')
      return {
        result: -1,
        data: e.response.data.msg
      }
    } else {
      _showMsg(commit, e.response.data.msg, 'cancel')
      return {
        result: 0
      }
    }
  })
}

export const fetchVcode = ({commit}, phone) => {
  return api.send_sms(phone).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        _showMsg(commit, {content: '请在手机上查看验证码'})
        break
      default:
        _showMsg(commit, {content: '获取失败', type: 'cancel'})
        break
    }
  })
}

export const fetchCollegeInfo = function ({commit}, cID) {
  return api.fetch_college_info(cID).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_COLLEGE_INFO, json.data)
        break
      default:
        break
    }
  })
}

export const fetchInstanceInfo = ({commit}, obj) => {
  return api.fetch_instance_info(obj.cID, obj.iID).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_INSTANCE_INFO, JSON.parse(json.data.json))
        break
      default:
        break
    }
  })
}

export const fetchExpertList = ({commit}, obj) => {
  return api.fetch_expert_list(obj.cID, obj.limit, obj.offset).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_EXPERT_LIST, json.data.list)
        break
      default:
        break
    }
  })
}

export const fetchExpertInfo = ({commit}, obj) => {
  return api.fetch_expert_info(obj.cID, obj.expertID).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_EXPERT_INFO, json.data.result)
        break
      default:
        break
    }
  })
}

export const fetchExpertQuestion = ({commit}, obj) => {
  return api.fetch_expert_question(obj.cID, obj.expertID, obj.type, obj.offset, obj.limit).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_EXPERT_QUESTION, json.data.questions_list)
        break
      default:
        break
    }
  })
}

export const fetchUserQuestion = ({commit}, obj) => {
  return api.fetch_user_question(obj.userID, obj.offset, obj.limit).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_USER_QUESTION, json.data.questions_list)
        break
      default:
        break
    }
  })
}

export const fetchEnrollPlan = ({commit}, obj) => {
  return api.fetch_enrollPlan(obj.cID, obj.offset, obj.limit).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_ENROLLPLAN, json.data.list)
        break
      default:
        break
    }
  })
}

export const fetchEnrollResult = ({commit}, obj) => {
  return api.fetch_enrollResult(obj.cID, obj.offset, obj.limit).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_ENROLLRESULT, json.data.list)
        break
      default:
        break
    }
  })
}

export const fetchResourceDetail = ({commit}, obj) => {
  return api.fetch_resource_detail(obj.cID, obj.resID, obj.detID).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_RESOURCE_DETAIL, json.data)
        break
      default:
        break
    }
  })
}

export const fetchCommonProblem = ({commit}, obj) => {
  return api.fetch_common_problem(obj.cID, obj.limit, obj.offset).then(r => {
    const json = r.data
    switch (json.code) {
      case 200:
        commit(types.FETCH_COMMON_PROLEM, json.data.list)
        break
      default:
        break
    }
  })
}

