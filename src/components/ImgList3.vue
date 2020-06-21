/**
* Created by Administrator on 2017/1/4.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .items
    background: $yc_background_white
    .title, .sub-title
      text-align: center
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
    .title
      font-size: $yc_font_normal
      color: $yc_color_black
      line-height: 2
    .sub-title
      font-size: $yc_font_small
      color: $yc_color_grey
    .left
      display: inline-block
      width: 43%
      .item1
        width: 100%
        display: inline-block
        img
          display: block
          margin: 0 auto
          width: 70px
          height: 70px
    .right
      border-left: $yc_border
      display: inline-block
      width: 55%
      .b1
        padding: $yc_margin 0
        .item2
          display: flex
          align-items: center
          .item-content
            flex: 1
            overflow: hidden
          img
            flex: none
            display: block
            margin: 0 $yc_margin
            width: 50px
            height: 50px

  .border-b
    border-bottom: $yc_border

</style>

<template>
  <div class="items">
    <div class="left" v-if="linkBtns[0]">

      <div class="item1"
           v-if="linkBtns[0].link.external===''&&linkBtns[0].link.classID===''&&linkBtns[0].link.instanceID===''">
        <img :src="linkBtns[0].img">
        <p class="title">{{linkBtns[0].title}}</p>
        <p class="sub-title">{{linkBtns[0].subTitle}}</p>
      </div>

      <router-link :to="'../class' + linkBtns[0].link.classID + '/' + linkBtns[0].link.instanceID">
        <div class="item1"
             v-if="linkBtns[0].link.external===''&&linkBtns[0].link.classID!==''&&linkBtns[0].link.instanceID!==''">
          <img :src="linkBtns[0].img">
          <p class="title">{{linkBtns[0].title}}</p>
          <p class="sub-title">{{linkBtns[0].subTitle}}</p>
        </div>
      </router-link>

      <a class="item1" :href="linkBtns[0].link.external" v-if="linkBtns[0].link.external!==''">
        <img :src="linkBtns[0].img">
        <p class="title">{{linkBtns[0].title}}</p>
        <p class="sub-title">{{linkBtns[0].subTitle}}</p>
      </a>
    </div>

    <div class="right">

      <div class="b1 border-b" v-if="linkBtns[1]">
        <div class="item2"
             v-if="linkBtns[1].link.external===''&&linkBtns[1].link.classID===''&&linkBtns[1].link.instanceID===''">
          <img :src="linkBtns[1].img">
          <div class="item-content">
            <p class="title">{{linkBtns[1].title}}</p>
            <p class="sub-title">{{linkBtns[1].subTitle}}</p>
          </div>
        </div>

        <router-link :to="'../class' + linkBtns[1].link.classID + '/' + linkBtns[1].link.instanceID">
          <div class="item2"
               v-if="linkBtns[1].link.external===''&&linkBtns[1].link.classID!==''&&linkBtns[1].link.instanceID!==''">
            <img :src="linkBtns[1].img">
            <div class="item-content">
              <p class="title">{{linkBtns[1].title}}</p>
              <p class="sub-title">{{linkBtns[1].subTitle}}</p>
            </div>
          </div>
        </router-link>

        <a class="item2" :href="linkBtns[1].link.external" v-if="linkBtns[1].link.external!==''">
          <img :src="linkBtns[1].img">
          <div class="item-content">
            <p class="title">{{linkBtns[1].title}}</p>
            <p class="sub-title">{{linkBtns[1].subTitle}}</p>
          </div>
        </a>

      </div>

      <div class="b1" v-if="linkBtns[2]">
        <div class="item2"
             v-if="linkBtns[2].link.external===''&&linkBtns[2].link.classID===''&&linkBtns[2].link.instanceID===''">
          <img :src="linkBtns[2].img">
          <div class="item-content">
            <p class="title">{{linkBtns[2].title}}</p>
            <p class="sub-title">{{linkBtns[2].subTitle}}</p>
          </div>
        </div>
        <router-link :to="'../class' + linkBtns[2].link.classID + '/' + linkBtns[2].link.instanceID">
          <div class="item2"
               v-if="linkBtns[2].link.external===''&&linkBtns[2].link.classID!==''&&linkBtns[2].link.instanceID!==''">
            <img :src="linkBtns[2].img">
            <div class="item-content">
              <p class="title">{{linkBtns[2].title}}</p>
              <p class="sub-title">{{linkBtns[2].subTitle}}</p>
            </div>
          </div>
        </router-link>
        <a class="item2" :href="linkBtns[2].link.external" v-if="linkBtns[2].link.external!==''">
          <img :src="linkBtns[2].img">
          <div class="item-content">
            <p class="title">{{linkBtns[2].title}}</p>
            <p class="sub-title">{{linkBtns[2].subTitle}}</p>
          </div>
        </a>

      </div>

    </div>
  </div>
</template>

<script>
  export default{
    props: {
      linkBtns: Array
    }
  }
</script>
