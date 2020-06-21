/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus">
  @import "./styl.styl"
  html, body
    padding: 0
    margin: 0 auto
    background-color: $yc_background_grey
    font-size: 16px
    color: $yc_color_black
    max-width: 414px !important
    max-height: 736px !important
    overflow: auto
    -webkit-overflow-scrolling: touch
    #app
      width: 100%
      height: 100%
    a
      text-decoration: none

    .yc-btn
      color: $yc_color_white

    .yc-btn:not(.weui_btn_disabled):active
      color: darken($yc_color_white, 15)

    .yc-tip
      padding: $yc_margin 0
      color: $yc_color_grey
      text-align: center
      font-size: small

    .yc-float
      position: absolute
      z-index: 99
      right: 20px
      bottom: 40px
      padding: 10px
      width: 40px
      height: 40px
      text-align: center
      line-height: 20px
      border-radius: 50%
      font-size: $yc_font_small
      box-shadow: $yc_shadow

    .spinner
      margin: 30px auto !important
      display: block !important
      text-align: center !important

    .xs-plugin-pullup-container
      line-height: 40px

    canvas
      -moz-user-select: none
      -webkit-user-select: none
      -ms-user-select: none
      -webkit-touch-callout: none
      -webkit-user-select: none
      -khtml-user-select: none
      -moz-user-select: none
      -ms-user-select: none
      user-select: none
      outline: none
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0)

    .vux-slider
      width: 100%
      .vux-indicator
        width: 100%
        text-align: center
        right: 0 !important
        bottom: 20px !important
        a
          margin-left: 10px !important
          float: none !important
          .vux-icon-dot.active
            background-color: #fff !important

          .vux-icon-dot
            width: 10px !important
            height: 10px !important
            border-radius: 5px !important
            background-color: rgba(255, 255, 255, 0.4) !important

</style>

<template>
  <div id="app" :style="{height: screenHeight}">
    <transition name="slide">
      <router-view></router-view>
    </transition>
    <toast></toast>
  </div>

</template>

<script>
  import store from './store/'
  import Toast from './components/toast.vue'
  import {mapGetters, mapActions} from 'vuex'
  import LoginModal from './components/loginModal.vue'
  export default {
    components: {Toast, LoginModal},
    store: store,
    data () {
      return {
        screenHeight: '',
        user: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        // App组件作为根组件
        if (this.$parent._name === '<Root>') {
          console.log('root app created')
          if (this.$route.params) {
            this.fetchCollegeInfo(this.$route.params.collegeID).then(() => {
              console.log('fetchCollegeInfo done')
              if (this.$route.query.user !== undefined) {
                this.user = decodeURIComponent(window.atob(this.$route.query.user))
                window.localStorage.USER = this.user || window.localStorage.USER
                this.loginFromSWYT(JSON.parse(this.user))
              }
              if (this.$route.name === 'index') {
                this.$router.replace(`/college/${this.college.id}/class${this.college.indexClassID}/${this.college.indexInstanceID}`)
              }
            })
          }
          this.fetchScreenHeight()
        } else {
          // App组件作为跳转首页组件
          console.log('jump app created')
        }
      })
    },
    computed: {
      ...mapGetters([
        'college', 'isLogin'
      ])
    },
    methods: {
      ...mapActions([
        'fetchCollegeInfo', 'loginFromSWYT'
      ]),
      // 判断设备型号，获取不同设备的高度
      fetchScreenHeight () {
        if (/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
          this.screenHeight = document.documentElement.clientHeight + 'px'
          console.log(this.screenHeight)
        } else {
          this.screenHeight = '736px'
          console.log(this.screenHeight)
        }
      }
    }
  }
</script>
