/**
* Created by Administrator on 2016/12/26.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .part
    margin-top: $yc_margin
    .part-title
      .title
        text-align: center
        font-size: 18px
        color: #132761
        font-weight: bolder
      .line
        text-align: center
        display: block
        width: 38px
        margin: 0 auto
        height: 2px
        background-color: #132761
    .part-btn
      border: 1px solid #132761
      width: 90%
      margin: $yc_margin auto
      background: $yc_background_white !important
      color: $yc_color_black
    .part-content
      margin: $yc_margin 0
      display: flex
      width: 100%
      overflow-x: auto
      .item
        flex: 0 0 auto
        width: 140px
        border-radius: $yc_margin
        border: $yc_border
        box-shadow: 0 0 5px #dbdbdb
        text-decoration: none
        margin-left: $yc_margin
        background: $yc_background_white
        padding: 5px
        .item-bar
          display: block
          text-align: center
          a
            display: block
            text-decoration: none
          img
            border-radius: $yc_margin
            display: block
            margin: $yc_margin auto
            width: 130px
            height: 130px
          .item-btn
            background: #132761
            color: white
            width: 60%
            line-height: 1.8
            border: none
            border-radius: 5px
            font-size: 16px
            margin: $yc_margin auto
          p
            height: 50px
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 2
            overflow: hidden
            color: $yc_color_black
</style>

<template>
  <div class="part">
    <div class="part-title" :style="{color: primaryColor}">
      <p class="title" :style="{color: primaryColor}">{{name}}</p>
      <p class="line" :style="{backgroundColor: primaryColor}"></p>
    </div>

    <div class="part-content">
      <div class="item" v-for="item in list">
        <div class="item-bar" v-if="item.link.external===''&&item.link.classID===''&&item.link.instanceID===''">
          <img :src="item.img">
          <p>{{item.title}}</p>
          <button class="item-btn" :style="{backgroundColor: primaryColor}">查看</button>
        </div>

        <router-link :to="'../class' + item.link.classID + '/' + item.link.instanceID">
          <div class="item-bar" v-if="item.link.external===''&&item.link.classID!==''&&item.link.instanceID!==''">
            <img :src="item.img">
            <p>{{item.title}}</p>
            <button class="item-btn" :style="{backgroundColor: primaryColor}">查看</button>
          </div>
        </router-link>

        <a class="item-bar" :href="item.link.external" v-if="item.link.external!==''">
          <img :src="item.img">
          <p>{{item.title}}</p>
          <button class="item-btn" :style="{backgroundColor: primaryColor}">查看</button>
        </a>
      </div>
    </div>

    <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}"
              v-if="searchAll.link.external===''&&searchAll.link.classID===''&&searchAll.link.instanceID===''">
      {{searchAll.title}}
    </x-button>

    <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}"
              v-if="searchAll.link.external===''&&searchAll.link.classID!==''&&searchAll.link.instanceID!==''">
      <router-link :to="'../class' + searchAll.link.classID + '/' + searchAll.link.instanceID" :style="{borderColor: primaryColor, color: primaryColor}">
        {{searchAll.title}}
      </router-link>

    </x-button>


    <x-button class="part-btn" v-if="searchAll.link.external!==''">
      <a :href="searchAll.link.external" :style="{borderColor: primaryColor, color: primaryColor}">
        {{searchAll.title}}
      </a>
    </x-button>


  </div>
</template>

<script>
  import XButton from 'vux/src/components/x-button'
  export default{
    components: {XButton},
    props: {
      searchAll: Object,
      name: String,
      list: Array,
      primaryColor: String
    }
  }
</script>
