/**
* Created by Administrator on 2017/1/4.
*/
<style lang="stylus" scoped>
  .v-class17 {
    width: 100%
    height: 100%
  }

</style>

<template>
  <div class="v-class17">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class17 v-if="!isLoading"
             :primary-color="college.primaryColor"
             :link-btns="instance.linkBtns"
             :banner="instance.banner"
             :carousels="instance.carousels"
             :ask-show="college.isAsk"
             :data-list="instance.dataList">
    </class17>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {Spinner} from 'vux'
  import Class17 from '../components/Class17'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Class17, Spinner},
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
    computed: {
      ...mapGetters([
        'college', 'instance'
      ])
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
    }
  }
</script>
