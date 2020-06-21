/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .v-class1
    height 100%
</style>

<template>
  <div class="v-class1">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class1 v-if="!isLoading"
            :college-i-d="collegeID"
            :banner="banner"
            :carousels="carousels"
            :link-btns="linkBtns"
            :data-list="dataList"
            :list-style="instance.dataList.source.listStyle"
            :ask-show="college.isAsk"
            :home-type="types"
            :primary-color="college.primaryColor"
            :link-title="linkTitle">
    </class1>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {Spinner} from 'vux'
  import Class1 from '../components/Class1'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Class1, Spinner},
    data () {
      return {
        isLoading: true,
        homeType: {
          type_default: true,
          type_block: false
        },
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
      types () {
        if (this.instance && this.instance.homeType) {
          return this.instance.homeType
        } else {
          return this.homeType
        }
      },
      linkTitle () {
        if (this.instance && this.instance.linkTitle) {
          return this.instance.linkTitle
        }
      },
      banner () {
        if (this.instance && this.instance.banner) {
          return this.instance.banner
        }
      },
      carousels () {
        if (this.instance && this.instance.carousels) {
          return this.instance.carousels
        }
      },
      linkBtns () {
        if (this.instance && this.instance.linkBtns) {
          return this.instance.linkBtns
        }
      },
      dataList () {
        if (this.instance && this.instance.dataList) {
          return this.instance.dataList
        }
      }
    }
  }
</script>
