/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .v-class2 {
    height 100%
    width: 100%
  }
</style>

<template>
  <div class="v-class2">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class2 class="class2" :html="html" v-if="!isLoading"></class2>
  </div>
</template>
<script>
  import wx from '../weixin'
  import Class2 from '../components/Class2.vue'
  import {Spinner} from 'vux'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    components: {Class2, Spinner},
    data () {
      return {
        isLoading: true
      }
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
          console.log(chat)
          wx.setAuth().then(() => {
            wx.setShare(chat.wechatTitle, chat.wechatContent, window.location.href, chat.wechatIcon)
          })
        } else if (this.college.wechatTitle !== '' && this.college.wechatContent !== '' && this.college.wechatIcon !== '') {
          console.log(this.college.wechatTitle)
          wx.setAuth().then(() => {
            let link = window.location.host + '/college/' + this.college.id
            wx.setShare(this.college.wechatTitle, this.college.wechatContent, link, this.college.wechatIcon)
          })
        } else {
          console.log('主页，分页 分享信息都没有填,或者信息不全')
        }
      }
    },
    computed: {
      ...mapGetters([
        'college', 'instance'
      ]),
      html () {
        return this.instance.html
      }
    }
  }
</script>
