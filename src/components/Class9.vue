/**
* Created by Administrator on 2016/9/23.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class9
    height: 100%
    .container
      height: 100%
      .part
        background-color: $yc_background_white
        text-align: center
        box-shadow: $yc_shadow
        margin: 5px
        p
          height: 36px
          line-height: 36px
          padding: 0 10px
          text-align: center
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap

      img
        display: block
        width: 100%

  .fixed
    position: fixed
    background: #000
    top: 0
    bottom: 0
    z-index: 99
    max-width: 414px
    .content
      color: #fff
      position: absolute
      height: 200px
      z-index: 9999
      background-color: rgba(0, 0, 0, 0.8)
      bottom: 0
      width: 100%
      padding-bottom: $yc_margin
      .name
        text-align: center
        line-height: 40px
      .desc
        text-indent: 2em
        padding: 0 $yc_margin
        line-height: 1.7
        height: 160px
        overflow: hidden
        text-overflow: ellipsis
        display: -webkit-box
        -webkit-line-clamp: 6
        -webkit-box-orient: vertical

  .vue-waterfall
    height: 100% !important
    overflow-y: scroll !important
    overflow-x: hidden !important

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

<template>
  <div class="c-class9">
    <div class="container" :class="{'disabled': isDisabled}">
      <waterfall v-show="!toggle" :watch="imgList" :line-gap="200" :min-line-gap="150" :max-line-gap="250"
                 :single-max-width="300">
        <waterfall-slot v-for="(item, index) in imgList" :width="item.img.width*1+item.img.width/contentWidth*20"
                        :height="item.img.height*1+item.img.width/contentWidth*95" :order="index">
          <div class="part">
            <img class="pic" :src=item.img.url :transition="'transition'"
                 @click="change(index, item.img.url, item.title, item.img.height, item.img.width)">
            <p>{{item.title}}</p>
          </div>
        </waterfall-slot>
      </waterfall>

      <!-- 增加一个空的div存放放大后的图片-->
      <transition name="fade">
        <div class="big" v-if="toggle" @click="toggle=false" :class="{'fixed': toggle}">
          <div class="pic">
            <img :src=bigImg :style="{marginTop: margins}">
          </div>

          <div class="content">
            <h3 class="name">{{name}}</h3>
            <p class="desc">{{desc}}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import Waterfall from 'vue-waterfall/lib/waterfall'
  import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
  export default{
    components: {Waterfall, WaterfallSlot},
    props: {
      imgList: Array,
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.screenHight()
    },
    methods: {
      // 获取设备高度然后设置margin
      change (index, bigImg, name, height, width) {
        this.toggle = !this.toggle
        this.bigImg = bigImg
        if (this.contentHeight < 738) {
          this.margins = (this.contentHeight - height / width * this.contentWidth) / 2 + 'px'
        }
        this.name = name
        this.desc = this.imgList[index].desc
      },
      // 兼容pc
      screenHight () {
        if (document.querySelector('#app').clientHeight > 738) {
          this.contentHeight = 600
          this.contentWidth = 320
        } else {
          this.contentHeight = document.querySelector('#app').clientHeight
          this.contentWidth = document.querySelector('#app').clientWidth
        }
      }
    },
    data () {
      return {
        bigImg: '',
        margins: '',
        name: '',
        desc: '',
        toggle: false,
        contentHeight: '',
        contentWidth: ''
      }
    }
  }
</script>
