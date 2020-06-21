/**
* Created by Administrator on 2016/8/29.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
</style>

<template>
  <div>
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class5 v-if="!isLoading" :list="list"></class5>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {mapGetters, mapActions} from 'vuex'
  import {Spinner} from 'vux'
  import Class5 from '../components/Class5'
  import api from '../api'
  import Scroller from 'vux/src/components/scroller'
  export default{
    components: {Scroller, Spinner, Class5},
    data () {
      return {
        isLoading: true,
        offset: 0,
        list: []
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
          this.fetchList()
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
      },
      fetchList () {
        api.fetch_common_problem(this.$route.params.collegeID, 0, this.offset).then((r) => {
          this.list = r.data.data.list
        })
      }
    }
  }
</script>
