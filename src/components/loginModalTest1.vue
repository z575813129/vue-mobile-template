<!--<style lang="stylus">-->
  <!--@import '../app.styl';-->
  <!--.c-login-modal {-->
    <!--.btn-wrap {-->
      <!--padding: 50px 10px 0 10px;-->
    <!--}-->
    <!--.content {-->
      <!--.info-tips {-->
        <!--text-align: left;-->
        <!--font-size: 14px;-->
        <!--color: yc_color_light_black;-->
        <!--padding: 5px 0 5px 10px;-->
      <!--}-->
      <!--.info-form {-->
        <!--.weui-cells {-->
          <!--margin: 0;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</style>-->

<!--<template>-->
  <!--<div class="c-login-modal">-->
    <!--<div slot="content" v-if="state === LOGIN">-->
      <!--<group class="weui-cells_form">-->
        <!--<x-input name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"-->
                 <!--v-model="phoneNo"></x-input>-->
        <!--<x-input keyboard="number" placeholder="请输入验证码" v-model="authCode">-->
          <!--<x-button slot="right" :disabled="isFetchCode" type="primary" mini @click.native="fetchCode">-->
            <!--{{authText}}-->
          <!--</x-button>-->
        <!--</x-input>-->
      <!--</group>-->
      <!--<div class="btn-wrap">-->
        <!--<x-button type="primary" @click.native="basicLogin">登录</x-button>-->
        <!--<x-button type="primary" @click.native="wechatLogin">微信登录</x-button>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--let openID = ''-->
  <!--import {appID, callbackID} from '../json/config.json'-->
  <!--import {mapGetters, mapActions} from 'vuex'-->
  <!--import {XButton, Group, XInput} from 'vux'-->
  <!--export default {-->
    <!--components: {-->
      <!--XButton,-->
      <!--XInput,-->
      <!--Group-->
    <!--},-->
    <!--computed: {-->
      <!--...mapGetters([-->
        <!--'debug', 'toast', 'isLogin', 'account'-->
      <!--])-->
    <!--},-->
    <!--data () {-->
      <!--return {-->
        <!--LOGIN: 1,-->
        <!--COMPLETE_INFO: 2,-->
        <!--AUTO_LOGIN: 3,-->
        <!--BIND_PHONE: 4,-->
        <!--authCode: undefined,-->
        <!--phoneNo: undefined,-->
        <!--person: undefined,-->
        <!--grade: undefined,-->
        <!--school: undefined,-->
        <!--count: 0,-->
        <!--subject: '请选择',-->
        <!--subjectText: '',-->
        <!--subjects: [-->
          <!--{-->
            <!--name: '物理',-->
            <!--title: 'physics',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '化学',-->
            <!--title: 'chemistry',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '生物',-->
            <!--title: 'biology',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '技术',-->
            <!--title: 'technology',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '历史',-->
            <!--title: 'history',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '政治',-->
            <!--title: 'politics',-->
            <!--select: false-->
          <!--},-->
          <!--{-->
            <!--name: '地理',-->
            <!--title: 'geography',-->
            <!--select: false-->
          <!--}-->
        <!--],-->
        <!--majors: [-->
          <!--{-->
            <!--name: '还没选',-->
            <!--select: false,-->
            <!--title: '本科'-->
          <!--},-->
          <!--{-->
            <!--name: '不清楚',-->
            <!--select: false,-->
            <!--title: '专科'-->
          <!--}-->
        <!--],-->
        <!--city: ['浙江', '杭州'],-->
        <!--sList: ['学生', '老师'],-->
        <!--list: [{key: '1', value: '高一'}, {key: '2', value: '高二'}, {key: '3', value: '高三'}],-->
        <!--title: '登录',-->
        <!--state: 1,-->
        <!--showThreeInOne: false,-->
        <!--authText: '发送验证码',-->
        <!--CD: 60,-->
        <!--isFetchCode: false,-->
        <!--showBasic: true,-->
        <!--needLogin: false-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--...mapActions([-->
        <!--'showMsg', 'login', 'thirdLogin', 'thirdRegister', 'getCode', 'setInfomation'-->
      <!--]),-->
      <!--// 获取验证码-->
      <!--fetchCode () {-->
        <!--if (this.phoneNo) {-->
          <!--let data = {-->
            <!--phoneNo: this.phoneNo,-->
            <!--type: 1-->
          <!--}-->
          <!--this.getCode(data).then((r) => {-->
            <!--console.log(r)-->
            <!--if (r.result) {-->
              <!--this.code()-->
            <!--}-->
          <!--})-->
        <!--} else {-->
          <!--this.showMsg({content: '手机号不能为空', type: 'cancel'})-->
        <!--}-->
      <!--},-->
      <!--// 获取验证码-->
      <!--code () {-->
        <!--let self = this-->
        <!--let timer = setInterval(function () {-->
          <!--if (self.CD === 1) {-->
            <!--clearInterval(timer)-->
            <!--self.CD = 60-->
            <!--self.authText = '重新发送'-->
            <!--self.isFetchCode = false-->
            <!--console.log(222)-->
          <!--} else {-->
            <!--console.log(1111)-->
            <!--self.authText = '重新发送(' + &#45;&#45;self.CD + 's)'-->
          <!--}-->
        <!--}, 1000)-->
      <!--},-->
      <!--// 登录-->
      <!--basicLogin () {-->
        <!--let data = {-->
          <!--phoneNo: this.phoneNo,-->
          <!--authCode: this.authCode-->
        <!--}-->
        <!--if (this.phoneNo && this.authCode) {-->
          <!--this.login(data).then((r) => {-->
            <!--console.log(r)-->
            <!--if (r.result) {-->
              <!--if (!this.account.userInfo.state) {-->
                <!--this.showBasic = false-->
                <!--this.showInfo = true-->
              <!--} else {-->
                <!--this.needLogin = false-->
              <!--}-->
            <!--}-->
          <!--})-->
        <!--} else {-->
          <!--this.showMsg({content: '请填写手机号或验证码', type: 'cancel'})-->
        <!--}-->
      <!--},-->
      <!--wechatLogin () {-->
        <!--let url = 'http://callback.51zy.org/'-->
        <!--if (this.debug) {-->
          <!--url += 'test/'-->
        <!--}-->
        <!--url += callbackID-->
        <!--window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`-->
      <!--},-->
      <!--bingPhone () {-->
        <!--let data = {-->
          <!--phoneNo: this.phoneNo,-->
          <!--authCode: this.authCode,-->
          <!--openid: openID,-->
          <!--thirdParty: 1-->
        <!--}-->
        <!--if (this.phoneNo && this.authCode) {-->
          <!--this.thirdRegister(data).then((r) => {-->
            <!--if (r.result) {-->
              <!--if (!this.account.userInfo.state) {-->
                <!--this.showBasic = false-->
                <!--this.showInfo = true-->
              <!--} else {-->
                <!--this.needLogin = false-->
              <!--}-->
            <!--}-->
          <!--})-->
        <!--} else {-->
          <!--this.showMsg({content: '请填写手机号或验证码', type: 'cancel'})-->
        <!--}-->
      <!--},-->
      <!--checkLogin () {-->
        <!--if (this.account.userInfo) {-->
          <!--if (this.account.userInfo.state === 1 && this.isLogin) {-->
            <!--this.needLogin = false-->
          <!--} else if (this.account.userInfo.state === 0) {-->
            <!--this.needLogin = true-->
            <!--this.state = this.COMPLETE_INFO-->
          <!--}-->
        <!--} else {-->
          <!--this.authCode = undefined-->
          <!--this.phoneNo = undefined-->
          <!--this.person = undefined-->
          <!--this.grade = undefined-->
          <!--this.school = undefined-->
          <!--this.count = 0-->
          <!--this.subject = '请选择'-->
          <!--this.subjectText = ''-->
          <!--this.needLogin = true-->
          <!--let code = this.$route.query.code-->
          <!--if (code) {-->
            <!--// 自动三方登录-->
            <!--this.state = this.AUTO_LOGIN-->
            <!--console.log(code)-->
            <!--this.thirdLogin({code, thirdParty: 1}).then(r => {-->
              <!--if (r.result === -1) {-->
                <!--openID = r.data-->
                <!--this.state = this.BIND_PHONE-->
              <!--}-->
            <!--})-->
          <!--} else {-->
            <!--this.state = this.LOGIN-->
          <!--}-->
        <!--}-->
      <!--}-->
    <!--},-->
    <!--created () {-->
      <!--this.$nextTick(() => {-->
        <!--this.checkLogin()-->
      <!--})-->
    <!--},-->
    <!--watch: {-->
      <!--isLogin: function () {-->
        <!--this.checkLogin()-->
<!--//        console.log(this.isLogin)-->
<!--//        this.needLogin = !this.needLogin && val-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->
