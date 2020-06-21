<style lang="stylus" scoped>
  @import "../styl.styl"
  .list
    background-color: $yc_background_white
    padding: 0 $yc_margin
    .item
      display: flex
      align-items: center
      padding: $yc_margin 0
      text-decoration: none
      border-bottom: $yc_border

      .lb
        width: 50px
        height: 50px
        margin-right: $yc_margin
        flex: 0 0 auto
        .pic
          border-radius: 50%
          width: 100%
          height: 100%

      .rb
        flex: 1
        margin-left 5px
        .title
          color: #000
          font-weight: 400
          font-size: $yc_font_normal
          line-height: 20px

        .sub-title
          font-size: $yc_font_small
          color: $yc_color_grey
          margin-left: 5px

        .desc
          color: $yc_color_grey
          font-size: $yc_font_small
          line-height: 20px

</style>

<template>
  <div class="list">
    <router-link class="item" :to="'../' +collegeID  + '/experts/' + item.ycgaokao_uid" v-for="item in list">
      <div class="lb">
        <img class="pic" :src="item.avatar">
      </div>
      <div class="rb">
        <h4 class="title">{{item.name}}<span class="sub-title">{{item.titleName}}</span></h4>
        <p class="desc">{{item.post}}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default{
    props: {
      collegeID: String,
      list: Array
    }
  }
</script>
