<style lang="stylus" scoped>
  @import "../styl.styl"
  .container {
    .dialog {
      .phone-btn {
        width: 85%
        margin: 15px auto
      }
      .wx-btn {
        width: 85%
        margin: 15px auto
      }
      .send-btn {
        padding 0 3px
        font-size: 13px
      }
    }
  }
</style>

<template>
  <div class="container">
    <x-dialog v-model="isShow" class="dialog">
      <group title="请先登录">
        <x-input title="手机号"
                 v-model="phone"
                 ref="phone"
                 placeholder="请先输入手机号"
                 keyboard="number"
                 is-type="china-mobile"></x-input>
        <x-input title="验证码" placeholder="输入验证码" v-model="vcode" ref="vcode" class="weui-vcode">
          <x-button class="send-btn" slot="right" :disabled="phone===''" type="primary" mini @click.native="send">
            发送验证码
          </x-button>
        </x-input>

        <x-button class="phone-btn" :disabled="phone===''" @click.native="login({phone:phone,vcode:vcode})">手机登录
        </x-button>
        <x-button class="wx-btn" @click.native="wechatLogin" type="primary">微信登录</x-button>
      </group>

    </x-dialog>
  </div>
</template>

<script>
  import {appID, callbackID} from '../json/config.json'
  import {XDialog, Group, XInput, XButton} from 'vux'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {XDialog, Group, XInput, XButton},
    computed: {
      ...mapGetters([
        'debug', 'toast', 'isLogin', 'account'
      ]),
      phoneValid () {
        return this.$refs.phone.valid
      }
    },
    created () {
      this.$nextTick(() => {
        this.checkSWYT()
      })
    },
    methods: {
      ...mapActions([
        'login',
        'loginFromSWYT',
        'fetchVcode',
        'thirdLogin'
      ]),
      checkSWYT () {
        if (this.$route.query.user !== undefined) {
          this.user = decodeURIComponent(window.atob(this.$route.query.user))
          window.localStorage.USER = this.user || window.localStorage.USER
          this.loginFromSWYT(JSON.parse(this.user))
        } else {
          console.log(this.isLogin)
          this.checkLogin()
        }
      },
      send () {
        console.log(this.$refs.phone.valid)
        if (this.$refs.phone.valid && this.phone !== '') {
          this.fetchVcode(this.phone)
        } else {
          console.log('号码不正确')
        }
      },
      wechatLogin () {
//        this.isShow = !this.isLogin
        let url = 'http://callback.51zy.org/'
        if (this.debug) {
          url += 'test/'
        }
        url += callbackID
        window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
      },
      checkLogin () {
        if (this.account.userInfo) {
          if (this.account.userInfo.state === 1 && this.isLogin) {
            this.needLogin = false
          } else if (this.account.userInfo.state === 0) {
            this.needLogin = true
            this.state = this.COMPLETE_INFO
          }
        } else {
          this.authCode = undefined
          this.phoneNo = undefined
          this.person = undefined
          this.grade = undefined
          this.school = undefined
          this.count = 0
          this.subject = '请选择'
          this.subjectText = ''
          this.needLogin = true
          let code = this.$route.query.code
          if (code) {
            // 自动三方登录
            this.state = this.AUTO_LOGIN
            console.log(code)
            this.thirdLogin({code, thirdParty: 1}).then(r => {
              if (r.result === -1) {
//                openID = r.data
                this.state = this.BIND_PHONE
              }
            })
          } else {
            this.state = this.LOGIN
          }
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
        user: '',
        phone: '',
        vcode: '',
        isShow: false
      }
    }
  }
</script>
