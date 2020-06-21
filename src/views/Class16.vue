/**
* Created by Administrator on 2016/12/23.
*/
<style lang="stylus" scoped>
  .v-class16
    width: 100%
    height: 100%

</style>

<template>
  <div class="v-class16">
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <class16 v-if="!isLoading"
             :college-i-d="collegeID"
             :ask-show="college.isAsk"
             :primary-color="college.primaryColor"
             :banner="instance.banner"
             :carousels="instance.carousels"
             :link-btns="instance.linkBtns"
             :list1-search="instance.linkBtnList1.searchAll"
             :link-btn-list1-name="instance.linkBtnList1.name"
             :link-btn-list1="instance.linkBtnList1.linkBtns"
             :list2-search="instance.linkBtnList2.searchAll"
             :link-btn-list2-name="instance.linkBtnList2.name"
             :link-btn-list2="instance.linkBtnList2.linkBtns"
             :list-style="instance.dataList.source.listStyle"
             :data-list="instance.dataList">
    </class16>
  </div>
</template>

<script>
  import wx from '../weixin'
  import Class16 from '../components/Class16'
  import {mapGetters, mapActions} from 'vuex'
  import {Spinner} from 'vux'
  export default{
    components: {Spinner, Class16},
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
      sourceList () {
        if (this.instance && this.instance.source) {
          return this.instance.source
        }
      }
    }
  }
</script>
