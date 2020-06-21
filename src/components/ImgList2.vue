/**
* Created by Administrator on 2016/12/26.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .part
    background: $yc_background_white
    padding: $yc_margin 0
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
      background: $yc_background_white !important
      border: 1px solid #132761
      width: 90%
      margin: $yc_margin auto
    .part-content
      margin: $yc_margin 0
      width: 100%
      .item
        position: relative
        display: inline-block
        text-align: center
        text-decoration: none
        width: 48%
        margin: 1%
        a
          text-decoration: none
        img
          display: block
          width: 100%
          height: 130px
        .item-btn
          background: #132761
          color: white
          width: 50%
          line-height: 1.8
          font-size: 16px
          margin: $yc_margin auto
        span
          width: 100%
          position: absolute
          bottom: 0
          display: block
          overflow: hidden
          text-overflow: ellipsis
          color: $yc_color_white
          white-space: nowrap
          line-height: 2
          background: rgba(0, 0, 0, .5)
</style>

<template>
  <div class="part">
    <div class="part-title" :style="{color: primaryColor}">
      <p class="title" :style="{color: primaryColor}">{{name}}</p>
      <p class="line" :style="{backgroundColor: primaryColor}"></p>
    </div>

    <div class="part-content">
      <div class="item" v-for="item in filterList">
        <div v-if="item.link.external===''&&item.link.classID===''&&item.link.instanceID===''">
          <img :src="item.img">
          <span>{{item.title}}</span>
        </div>

        <div v-if="item.link.external===''&&item.link.classID!==''&&item.link.instanceID!==''">

          <router-link :to="'../class' + item.link.classID + '/' + item.link.instanceID">
            <img :src="item.img">
            <span>{{item.title}}</span>
          </router-link>

        </div>

        <a :href="item.link.external" v-if="item.link.external!==''">
          <img :src="item.img">
          <span>{{item.title}}</span>
        </a>
      </div>
    </div>

    <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}"
              v-if="searchAll.link.external===''&&searchAll.link.classID===''&&searchAll.link.instanceID===''">{{searchAll.title}}
    </x-button>

    <router-link :to="'../class' + searchAll.link.classID + '/' + searchAll.link.instanceID"
                 v-if="searchAll.link.external===''&&searchAll.link.classID!==''&&searchAll.link.instanceID!==''">
      <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}">{{searchAll.title}}
      </x-button>
    </router-link>

    <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}" v-if="searchAll.link.external!==''">
      <a :href="searchAll.link.external"></a>{{searchAll.title}}
    </x-button>

  </div>
</template>

<script>
  import XButton from 'vux/src/components/x-button'
  export default{
    components: {XButton},
    computed: {
      filterList () {
        return this.list.slice(0, 4)
      }
    },
    props: {
      searchAll: Object,
      name: String,
      list: Array,
      primaryColor: String
    }
  }
</script>
