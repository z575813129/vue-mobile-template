/**
* Created by Administrator on 2017/1/4.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class17
    width: 100%
    height: 100%
    padding-bottom: $yc_margin* 2
    position: relative
    .class17
      position: absolute
      z-index: 1
      top: 0
      bottom: 0
      left: 0
      right: 0
      overflow: auto
      .header
        .banner
          width: 100%
          position: absolute
          top: 0
          max-height: 100px
          z-index: 99999
      .b1-content
        margin-top: $yc_margin
        border-top: $yc_border
        border-bottom: $yc_border
      .b2-content
        border-top: $yc_border
        margin-top: $yc_margin

</style>

<template>
  <div class="c-class17">
    <div class="class17" :class="{'disabled': isDisabled}">
      <div class="header">
        <img class="banner" :src="banner.img">
      </div>
      <swiper :list="swiperList" :height="'220px'" auto></swiper>
      <div class="b1-content">
        <b1 :link-btns="linkBtns"></b1>
      </div>
      <div class="b2-content">
        <list3 :list="dataList"></list3>
      </div>
    </div>
    <router-link to="'../experts'">
      <div :class="{'disabled': isDisabled}" class="yc-float yc-btn" :style="{backgroundColor: primaryColor}"
           v-if="askShow">
        我要咨询
      </div>
    </router-link>
  </div>
</template>

<script>
  import List3 from './List3.vue'
  import B1 from './ImgList3.vue'
  import {Swiper} from 'vux'
  export default{
    components: {B1, Swiper, List3},
    data () {
      return {
        imgList: []
      }
    },
    computed: {
      swiperList () {
        if (this.carousels) {
          for (let i in this.carousels) {
            this.imgList[i] = Object.assign({}, this.carousels[i])
          }
          for (let item of this.imgList) {
            if (item && item.link && item.link.external) {
              item.url = item.link.external
            } else if (item && item.link && item.link.classID && item.link.instanceID) {
              item.url = '../class' + item.link.classID + '/' + item.link.instanceID
            }
          }
          return this.imgList
        }
      }
    },
    props: {
      askShow: {
        type: Boolean,
        default: false
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      collegeID: String,
      banner: Object,
      carousels: Array,
      linkBtns: Array,
      dataList: Array,
      primaryColor: String
    }
  }
</script>
