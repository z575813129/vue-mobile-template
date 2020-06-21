<style lang="stylus" scoped>
  @import "../styl.styl"
  .v-expertlist
    width: 100%
    height: 100%
    position: relative
    .spinner
      margin: $yc_margin*10 10%
      width: 80%
      text-align: center
    .content
      width: 100%
      position: absolute
      top: 0
      bottom: 50px
      overflow: auto
      .blur
        padding-top: 20px
        text-align: center
        background: url("../assets/expert_bg.jpg")

      .pic
        width: 60px
        height: 60px
        border-radius: 50%
        z-index: 999

      .name
        color: $yc_color_white
        line-height: 30px

      .desc
        font-size: $yc_font_small
        color: darken($yc_color_white, 5)
      .info
        margin-bottom: $yc_margin
        background: $yc_background_white
        padding: $yc_margin
        text-align: justify

      .yc-tip
        font-size: 16px
        margin-top: $yc_margin*2
        background: $yc_background_white

      .b1
        margin-bottom: 60px
        .list-header
          background-color: $yc_background_white
          border: $yc_border
          border-width: 1px 0
          line-height: 40px
          padding: 0 $yc_margin

  .dialog
    img
      display: block
      width: 100%
    .close
      width: 60%
      margin: 10px auto
    .close-btn
      width: 100%
      border-top: solid 1px $yc_border_color_grey
      margin: 0
      padding: 5px 0

    .dialog-title
      margin: 5px 0
      font-size: 20px

  .flex-box
    display: flex
    > .yc-btn
      flex: 1
      margin: 10px
      height: 40px
      padding: 0

  .btn
    margin: 4px auto
    width: 120px
    color: $yc_color_white
    background-color: #3770c7
</style>

<template>
  <div class="v-expertlist">
    <login-modal></login-modal>
    <spinner class="spinner" v-if="!isLogin" type="ios"></spinner>
    <div class="content" v-if="isLogin">
      <blur class="blur" :blur-amount="0" :height="140" url="">
        <img class="pic" :src="expert.profile">
        <p class="name">{{expert.name}}</p>
        <p class="desc">{{expert.post}}</p>
      </blur>
      <div class="info" v-html="expertDesc"></div>
      <!--<div class="b1">-->
      <!--<div class="list-header">导师问答</div>-->
      <!--<list :list="expertQuestionList"></list>-->
      <!--<div class="yc-tip" v-if="!expertQuestionList.length">暂无问题</div>-->
      <!--</div>-->
    </div>
    <toolbar position='bottom'>
      <x-button class="yc-btn btn" @click="chooseType()">立即咨询</x-button>
    </toolbar>
    <!--<dialog :show="dialogShow" class="dialog">-->
    <!--<p class="dialog-title">请选择交流方式</p>-->
    <!--<div class="flex-box">-->
    <!--<x-button class="yc-btn" @click="weiChat()">微信图文交流</x-button>-->
    <!--<x-button class="yc-btn" @click="smsChat()">短信交流</x-button>-->
    <!--</div>-->
    <!--<div class="close close-btn" @click="dialogShow=false">关闭</div>-->
    <!--</dialog>-->
    <dialog :show="isShow" class="dialog">
      <div class="bg1">
        <p class="dialog-title">本功能只支持微信打开</p>
        <p class="dialog-title">请使用微信打开</p>
        <img src="../assets/bg1.png">
        <x-button class="yc-btn btn close" @click="closeQR()">关闭</x-button>
      </div>
    </dialog>
    <dialog :show="QRShow" class="dialog">
      <p class="dialog-title">长按识别二维码</p>
      <img :src="QR_URL">
      <x-button class="yc-btn btn" @click="closeQR()">关闭</x-button>
    </dialog>
  </div>
</template>

<script>
  import {Spinner} from 'vux'
  import LoginModal from '../components/loginModal.vue'
  import Blur from 'vux/src/components/blur'
  import XButton from 'vux/src/components/x-button'
  import List from '../components/questionAnswerList.vue'
  import Toolbar from '../components/toolbar.vue'
  import Dialog from 'vux/src/components/dialog'
  import Http from '../api/config'
  import {login, fetchExpertInfo, fetchExpertQuestion} from '../vuex/actions'
  export default{
    components: {Spinner, LoginModal, Blur, XButton, List, Toolbar, Dialog},
    vuex: {
      getters: {
        isLogin: state => state.isLogin,
        expert: state => state.expert,
        college: state => state.college
//        expertQuestionList: state => state.expertQuestionList
      },
      actions: {
        login, fetchExpertInfo, fetchExpertQuestion
      }
    },
    created () {
      this.checkLogin()
    },
    computed: {
      ...mapGetters([
        'college', 'instance'
      ]),
      expertDesc () {
        if (this.expert && this.expert.descrpition) {
          return this.expert.descrpition.replace(/\n/g, '<br>')
        }
      }
    },
    methods: {
      checkLogin () {
        if (this.isLogin) {
          this.fetchExpertInfo(this.$route.params.collegeID, this.$route.params.expertID).then(() => {
//            console.log(this.expert)
//            this.fetchExpertQuestion(this.$route.params.collegeID, this.$route.params.expertID, 0, 0, 0).then(() => {
//              return this.isLogin
//            })
          })
        }
      },
      chooseType () {
        this.QRShow = true
        this.weiChat()
//        this.dialogShow = true
      },
      weiChat () {
        if (this.is_weixin()) {
          Http.WeixinGet('wechatevent/get_app_qr_ticket?teacher_corp_id=' + this.expert.phone_no).then((r) => {
            let json = r.data
            if (json.code === 200) {
              this.dialogShow = false
              this.QR_URL = json.ticket
              this.QRShow = true
            } else {
              window.alert('请求二维码失败,code:' + json.code)
            }
          }, (e) => {
            window.alert('请求二维码失败,status:' + e.status)
          })
        } else {
          this.isShow = true
          this.dialogShow = false
          this.QRShow = false
        }
      },
      smsChat () {
        this.$router.push({path: 'toAsk', append: true})
      },
      closeQR () {
        this.QRShow = false
        this.isShow = false
        this.dialogShow = true
      },
      // 判断是不是微信环境
      is_weixin () {
        if (navigator.userAgent.indexOf('MicroMessenger') > -1) {
          return true
        } else {
          return false
        }
      }
    },
    watch: {
      'isLogin': {
        handler () {
          this.checkLogin()
        }
      }
    },
    data () {
      return {
        header: {
          title: '导师问答'
//          link: {title: '全部问题', path: ''}
        },
        dialogShow: false,
        QRShow: false,
        isShow: false,
        QR_URL: ''
      }
    }
  }
</script>
