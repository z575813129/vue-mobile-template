/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .container{
    height: 100%
    .v-class14{
      height: 100%
    }
  }
</style>

<template>
  <div class="container">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class14 v-if="!isLoading"
             class="v-class14"
             :college-i-d="collegeID"
             :banner="banner"
             :carousels="carousels"
             :link-btns="linkBtns"
             :pic-list1="picList1"
             :pic-list2="picList2"
             :data-list="dataList"
             :list-style="instance.dataList.source.listStyle"
             :ask-show="college.isAsk"
             :primary-color="college.primaryColor"
             :link-pic="linkPic"
             :link-title="linkTitle">
    </class14>
  </div>
</template>

<script>
  import wx from '../weixin'
  import {mapGetters, mapActions} from 'vuex'
  import {Spinner} from 'vux'
  import Class14 from '../components/Class14'
  export default{
    components: {Class14, Spinner},
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
      linkTitle () {
        if (this.instance && this.instance.linkTitle) {
          return this.instance.linkTitle
        }
      },
      linkPic () {
        if (this.instance && this.instance.linkPic) {
          return this.instance.linkPic
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
      picList1 () {
        if (this.instance && this.instance.picList1) {
          return this.instance.picList1
        }
      },
      picList2 () {
        if (this.instance && this.instance.picList2) {
          return this.instance.picList2
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
