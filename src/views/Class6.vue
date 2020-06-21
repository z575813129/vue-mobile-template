/**
* Created by Administrator on 2016/8/29.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
</style>

<template>
  <div>
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <div class="v-class6" v-if="!isLoading">
      <class6 :major-list="majorList"></class6>
    </div>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {Spinner} from 'vux'
  import Class6 from '../components/Class6'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Spinner, Class6},
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
      majorList () {
        if (this.instance && this.instance.linkBtns) {
          return this.instance.linkBtns
        }
      },
      img () {
        if (this.instance && this.instance.linkBtns && this.instance.linkBtns.img) {
          return this.instance.linkBtns.img
        }
      },
      title () {
        if (this.instance && this.instance.linkBtns && this.instance.linkBtns.title) {
          return this.instance.linkBtns.title
        }
      }
    }
  }
</script>
