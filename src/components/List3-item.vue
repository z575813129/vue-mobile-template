<style lang="stylus" scoped>
  @import "../styl.styl"
  .list3-item
    background-color: $yc_background_white
    img
      width: 100%
      height: 100%
    .item
      display: flex
      padding: $yc_margin
      text-decoration: none
      align-items: center
      border-bottom: $yc_border
      .pic
        margin-right: $yc_margin*2
        width: 60px
        height: 60px
      .mb
        flex: 1
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 2
        -webkit-box-orient: vertical
        .sub-title
          margin-left: 5px
          font-size: $yc_font_small
          color: $yc_color_grey
        .desc
          color: $yc_color_grey
          font-size: $yc_font_small
          line-height: 20px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          word-wrap: normal
          word-wrap: break-word
          word-break: break-all
      .rb
        .icon
          width: 35px
          height: 35px
          margin-top: 15px
          fill: #000

</style>

<template>
  <div class="list3-item">
    <div class="item">
      <img class="pic" :src="item.img" v-if="item.img&&item.img!==''">
      <div class="mb">
        <div class="title">{{item.title}}<span class="sub-title" v-if="item.subTitle&&item.subTitle!==''">{{item.subTitle}}</span></div>
        <p class="desc" v-if="item.desc&&item.desc!==''">{{item.desc}}</p>
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
      item: Object
    }
  }
</script>
