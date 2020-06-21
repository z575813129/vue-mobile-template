/**
 * Created by zack on 2016/7/25.
 */
import http from './config'

export default {
  fetch_weixin_auth () {
    return http.WeixinAuthPost('ncee/get_wechatauth', {url: window.location.href.split('#')[0]})
  },
  login (phone, vcode) {
    return http.ExpertPost('quick_login', {phone_no: phone, auth_code: vcode})
  },
  send_sms (phone) {
    return http.ExpertPost('send_sms', {phone_no: phone})
  },
  fetchHtml (url) {
    return http.getHtml(url)
  },
  fetch_college_info (cID) {
    return http.get('colleges/' + cID)
  },
  fetch_instance_info (cID, iID) {
    return http.get('colleges/' + cID + '/instances/' + iID)
  },
  fetch_resource (cID, resID, limit, offset) {
    return http.get('colleges/' + cID + '/resources/' + resID + '?limit=' + limit + '&offset=' + offset)
  },
  fetch_resource_detail (cID, resID, detID) {
    return http.get('colleges/' + cID + '/resources/' + resID + '/details/' + detID)
  },
  fetch_expert_list (cID, limit, offset) {
    return http.get('colleges/' + cID + '/experts' + '?limit=' + limit + '&offset=' + offset)
  },
  //  新接口
  // fetch_expert_list (uID, limit, offset) {
  //   return http.get('universities/' + uID + '/experts' + '?limit=' + limit + '&offset=' + offset)
  // },
  fetch_expert_info (cID, expertID) {
    return http.ExpertPost('get_expert_info_by_user', {college_id: cID, expert_id: expertID})
  },
  fetch_expert_question (cID, expertID, type, offset, limit) {
    return http.ExpertPost('read_expert_questions_list_by_user', {
      college_id: cID,
      expert_id: expertID,
      type: type,
      offset: offset,
      limit: limit
    })
  },
  fetch_user_question (userId, offset, limit) {
    return http.ExpertPost('read_user_questions_list', {userId: userId, offset: offset, limit: limit})
  },
  submit_question (cID, expertID, question) {
    return http.ExpertPost('insert_expert_question', {college_id: cID, expert_id: expertID, question: question})
  },
  fetch_enrollPlan (cID, offset, limit) {
    return http.get('colleges/' + cID + '/plan' + '?limit=' + limit + '&offset=' + offset)
  },
  fetch_enrollResult (cID, offset, limit) {
    return http.get('colleges/' + cID + '/enroll' + '?limit=' + limit + '&offset=' + offset)
  },
  // test 招生计划
  fetch_enrollPlan_tab (cID, data) {
    return http.post('colleges/' + cID + '/filterPlan', {data: data})
  },
  // test 招生计划
  fetch_enrollPlan_data (cID, limit, offset, data) {
    return http.post('colleges/' + cID + '/filterPlanNow?limit=' + limit + '&offset=' + offset, {data: data})
  },
  // test 历年录取
  fetch_enrollResult_tab (cID, data) {
    return http.post('colleges/' + cID + '/filterenroll', {data: data})
  },
  // test 历年录取
  fetch_enrollResult_data (cID, limit, offset, data) {
    return http.post('colleges/' + cID + '/filterenrollNow?limit=' + limit + '&offset=' + offset, {data: data})
  },
  fetch_common_problem (cID, limit, offset) {
    return http.get('colleges/' + cID + '/model_qa/' + '?limit=' + limit + '&offset=' + offset)
  },
  fetch_major (cID, mID) {
    return http.getMSJson('colleges/' + cID + '/majors/' + mID + '.json')
  },
  // 三方登录
  thirdLogin (data) {
    return http.postCourse('users/third_login/', data)
  }
}
