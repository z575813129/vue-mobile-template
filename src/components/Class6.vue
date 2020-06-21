/**
* Created by Administrator on 2016/8/2.
*/
<style lang="stylus">
  @import "../styl.styl"
  .c-class6
    padding: $yc_margin
    .list
      overflow: hidden
      position: relative
      text-align: center
      .item
        margin-bottom: $yc_margin
        display: block
        .img
          padding-bottom: 40%
          display: block
          position: relative
          max-width: 100%
          background-size: cover
          background-position: center center
          cursor: pointer
        .title
          border-bottom: 2px solid $yc_color_white
          color: $yc_color_white
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          display: inline-block
          font-size: 20px
          margin-top: 13%
</style>

<template>
  <div class="c-class6">
    <div :class="{'disabled': isDisabled}">
      <div class="list">
        <a class="item" :href="item.link.href" v-for="item in btns">
          <masker :opacity="0.5">
            <div class="img" :style="{ backgroundImage: 'url(' + item.img + ')' }"></div>
            <div class="title" slot="content">{{item.title}}</div>
          </masker>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import Masker from 'vux/src/components/masker'
  export default{
    components: {Masker},
    computed: {
      btns () {
        if (this.majorList) {
          for (let item of this.majorList) {
            if (item && item.link && item.link.external) {
              item.link.href = item.link.external
            } else if (item && item.link && item.link.classID && item.link.instanceID) {
              item.link.href = '../class' + item.link.classID + '/' + item.link.instanceID
            }
          }
        }
        return this.majorList
      }
    },
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      majorList: Array
    }
  }
</script>
