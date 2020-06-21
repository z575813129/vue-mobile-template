<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-list1
    background-color: $yc_background_white
    padding: 0 $yc_margin
    img
      width: 100%
      height: 100%
    .item + .item
      border-top: $yc_border
    .item
      display: flex
      align-items: center
      width: 100%
      padding: $yc_margin 0
      text-decoration: none
      .pic
        max-width: 105px
        height: 70px
        margin-right: $yc_margin
      .img-square
        width: 105px
        border-radius: 0
      .img-cirle
        width: 70px
        border-radius: 50%

      .rb
        flex: 1
        .title
          color: #000
          font-weight: 400
          font-size: $yc_font_normal
          /*margin-top: $yc_margin*/
          overflow: hidden
          text-overflow: ellipsis
          display: -webkit-box
          -webkit-line-clamp: 2
          -webkit-box-orient: vertical
        .date
          float: right
          color: $yc_color_grey
          margin-top: 8px
          font-size: $yc_font_small
          line-height: 1.2
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          word-wrap: normal
          word-wrap: break-word
          word-break: break-all
</style>

<template>
  <div class="c-list1">

    <div v-for="item in list">
      <router-link class="item" :to="'../resources/' + resID + '/details/' + item.id">
        <img class="pic" :src="item.img1_url"
             :class="{'img-square': listStyle.imgSquare, 'img-cirle': listStyle.imgCirle}"
             v-if="item.img1_url!==null&&item.img1_url!==''">
        <div class="rb">
          <div class="title">{{item.title}}</div>
          <p class="date">{{item.date}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default{
    computed: {
      list () {
        if (this.sourcelist && this.sourcelist.length > 0) {
          for (let item of this.sourcelist) {
            item.date = new Date(item.date).toLocaleDateString()
          }
        }
        return this.sourcelist
      }
    },
    props: {
      listStyle: Object,
      resID: String,
      sourcelist: Array
    }
  }
</script>
