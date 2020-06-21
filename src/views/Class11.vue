/**
* Created by zack on 2016/9/11.
*/
<style lang="stylus">
  @import "../styl.styl"
</style>

<template>
  <div>
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <div class="v-enroll-result" v-if="!isLoading">
      <class11 :primary-color="college.primaryColor" :college-i-d="collegeID"></class11>
    </div>
  </div>
</template>

<script>
  import {Spinner} from 'vux'
  import wx from '../weixin'
  import Class11 from '../components/Class11.vue'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Class11, Spinner},
    data () {
      return {
        isLoading: true,
        collegeID: this.$route.params.collegeID
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
          this.wxShare()
          this.isLoading = false
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
