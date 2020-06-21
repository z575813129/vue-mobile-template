/**
* Created by Administrator on 2016/9/20.
*/
<style lang="stylus">
  @import "../styl.styl"
  .v-resource-detail
    padding: 20px 15px 15px
    background-color: $yc_background_white
    word-break: break-all
    height: 100%
    *
      margin: 0
      padding: 0
    p
      line-height: 2
    img
      max-width: 100%
    .rich_media_area_primary
      padding: 0 !important
</style>

<template>
  <div class="v-resource-detail">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <div v-if="!isLoading" v-html="html">
    </div>
  </div>
</template>

<script>
  import wx from '../weixin'
  import api from '../api/config'
  import {Spinner} from 'vux'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Spinner},
    data () {
      return {
        isLoading: true,
        html: ''
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.fetchData()
      })
    },
    computed: {
      ...mapGetters([
        'college', 'resourceDetail'
      ])
    },
    methods: {
      ...mapActions([
        'fetchResourceDetail'
      ]),
      fetchData () {
        this.isLoading = true
        this.fetchResourceDetail({
          cID: this.$route.params.collegeID,
          resID: this.$route.params.resID,
          detID: this.$route.params.detID
        }).then(() => {
          this.wxShare()
          this.isLoading = false
          if (this.resourceDetail.url && this.resourceDetail.url !== null) {
            api.getHtml(this.resourceDetail.url).then((r) => {
              this.html = r.data
            })
          } else {
            console.log('resourceDetail.url是空的!')
          }
        })
      },
      wxShare () {
        console.log(this.instance)
        if (this.instance && this.instance.wechat) {
          let chat = this.instance.wechat
          if (chat.wechatTitle !== '' || chat.wechatContent !== '' || chat.wechatIcon !== '') {
            wx.setAuth().then(() => {
              wx.setShare(chat.wechatTitle, chat.wechatContent, window.location.href, chat.wechatIcon)
            })
          } else {
            wx.setAuth().then(() => {
              let link = window.location.host + '/college/' + this.college.id
              wx.setShare(this.college.wechatTitle, this.college.wechatContent, link, this.college.wechatIcon)
            })
          }
        } else {
          wx.setAuth().then(() => {
            let link = window.location.host + '/college/' + this.college.id
            wx.setShare(this.college.wechatTitle, this.college.wechatContent, link, this.college.wechatIcon)
          })
        }
      }
    }
  }
</script>
