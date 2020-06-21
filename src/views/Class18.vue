/**
* Created by Administrator on 2017/1/5.
*/
<style lang="stylus" scoped>
  .v-class18 {
    width: 100%
    height: 100%
  }

</style>

<template>
  <div class="v-class18">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class18 :primary-color="college.primaryColor" v-if="!isLoading" :header="instance.header"
             :list="instance.list"></class18>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {mapGetters, mapActions} from 'vuex'
  import {Spinner} from 'vux'
  import Class18 from '../components/Class18.vue'
  export default{
    components: {Spinner, Class18},
    data () {
      return {
        isLoading: true
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
