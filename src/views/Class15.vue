/**
* Created by Administrator on 2016/8/25.
*/
<style lang="stylus" scoped>
  @import '../styl.styl'
  .v-class15
    height 100%
</style>

<template>
  <div class="v-class15">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <div v-if="!isLoading">
      <class15 :link-pages="instance.linkPages"
               :college-i-d="collegeID"
               :primary-color="college.primaryColor"></class15>
    </div>
  </div>
</template>

<script>
  import wx from '../weixin'
  import Class15 from '../components/Class15'
  import {Spinner} from 'vux'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Spinner, Class15},
    data () {
      return {
        isLoading: true,
        collegeID: this.$route.params.collegeID
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
      linkPages () {
        if (this.instance && this.instance.linkPages) {
          return this.instance.linkPages
        }
      }
    }
  }
</script>
