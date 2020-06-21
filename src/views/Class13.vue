/**
* Created by zack on 2016/11/30.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .v-class13
    width: 100%
    height: 100%
</style>
<template>
  <div class="v-class13">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class13 :enroll-info="enrollInfo" :query="query" :primary-color="college.primaryColor" v-if="!isLoading"></class13>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {mapGetters, mapActions} from 'vuex'
  import {Spinner} from 'vux'
  import Class13 from '../components/Class13'
  import http from '../api'
  export default{
    components: {Class13, Spinner},
    data () {
      return {
        isLoading: true,
        query: {
          province: '浙江',
          subject: '理科'
        },
        enrollInfo: {}
      }
    },
    computed: {
      ...mapGetters([
        'college', 'instance'
      ])
    },
    mounted () {
      this.$nextTick(() => {
        this.fetchData()
      })
    },
    methods: {
      ...mapActions([
        'fetchInstanceInfo'
      ]),
      fetchData () {
        this.isLoading = true
        this.fetchInstanceInfo({cID: this.$route.params.collegeID, iID: this.$route.params.instanceID}).then(() => {
//          this.wxShare()
          if (this.instance.majorId && this.instance.majorId !== '') {
            http.fetch_major(this.$route.params.collegeID, this.instance.majorId).then((r) => {
              console.log(r)
              this.enrollInfo = r.data
            })
            this.isLoading = false
          }
        })
      },
      wxShare () {
        if (this.instance.wechat && this.instance.wechat.wechatTitle !== '' && this.instance.wechat.wechatContent !== '' && this.instance.wechat.wechatIcon !== '') {
          let chat = this.instance.wechat
          wx.setAuth().then(() => {
            wx.setShare(chat.wechatTitle, chat.wechatContent, window.location.href, chat.wechatIcon)
          })
        } else if (this.college.wechatTitle !== '' && this.college.wechatContent !== '' && this.college.wechatIcon !== '') {
          wx.setAuth().then(() => {
            let link = window.location.host + '/college/' + this.college.id
            wx.setShare(this.college.wechatTitle, this.college.wechatContent, link, this.college.wechatIcon)
          })
        } else {
          console.log('主页，分页 分享信息都没有填,或者信息不全')
        }
      }
    }
  }
</script>
