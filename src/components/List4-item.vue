<style lang="stylus" scoped>
  @import "../styl.styl"
  .list4-item
    background-color: $yc_background_white
    padding: 0 $yc_margin
    img
      width: 100%
      height: 100%
    .item
      display: flex
      padding: $yc_margin 0
      text-decoration: none
      align-items: center
      border-bottom: $yc_border
      .pic
        max-width: 105px
        margin-right: $yc_margin
        height: 70px
      .img-square
        width: 105px
        border-radius: 0
      .img-cirle
        width: 70px
        border-radius: 50%
      .mb
        flex: 1
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        .sub-title
          margin-left: $yc_margin/ 2
          font-size: $yc_font_small
          color: $yc_color_grey
        .desc
          color: $yc_color_grey
          font-size: $yc_font_small
          line-height: 20px
          word-break: break-all
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-box-orient: vertical
          -webkit-line-clamp: 2
          overflow: hidden
      .rb
        .icon
          width: 35px
          height: 35px
          margin-top: 15px
          fill: #000

</style>

<template>
  <div class="list4-item">
    <div class="item">
      <img class="pic" :src="item.img" :class="{ 'img-square': listStyle.imgSquare, 'img-cirle': listStyle.imgCirle}"
           v-show="item.img1_url!==null&&item.img1_url!==''">
      <div class="mb">
        <h4 class="title">{{item.title}}<span class="sub-title" v-if="item.subTitle!==''">{{item.subTitle}}</span></h4>
        <div class="desc" v-if="item.desc!==''">{{item.desc}}</div>
      </div>
      <div class="rb">
        <icon type="chevron-right"></icon>
      </div>
    </div>
  </div>

</template>

<script>
  import Icon from './icon.vue'
  export default{
    components: {Icon},
    props: {
      listStyle: Object,
      item: Object
    }
  }
</script>
