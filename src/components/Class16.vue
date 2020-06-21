/**
* Created by Administrator on 2016/12/23.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class16
    width: 100%
    height: 100%
    position: relative
    .class16
      position: absolute
      z-index: 9
      top: 0
      bottom: 0
      left: 0
      right: 0
      overflow: auto
      .banner
        width: 100%
        margin-bottom: -8px
        margin-top: -1px
        max-height: 100px
      .carousel
        position: relative
      .carousel:after
        content: ''
        display: block
        width: 0
        height: 0
        border-width: 0 20px 15px 20px
        border-style: solid
        border-color: transparent transparent #fff
        position: absolute
        left: calc(50% - 20px)
        bottom: -1px
      .b1
        background-color: #fff
        padding: 10px 10px 10px
        font-size: 14px
        .item
          display: inline-block
          text-align: center
          text-decoration: none
          width: 33.3%
          padding: 10px 0
          img
            display: block
            width: 60px
            height: 60px
            margin: 0 auto
          span
            color: $yc_color_black
            margin-top: $yc_margin
            display: block
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .part-list
        margin-top: $yc_margin
        padding: $yc_margin 0
        background-color: $yc_background_white
        .part-title
          margin: $yc_margin
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

</style>

<template>
  <div class="c-class16">
    <div class="class16" :class="{'disabled': isDisabled}">
      <img class="banner" :src="banner.img" :style="{backgroundColor: primaryColor}">
      <div class="carousel">
        <swiper :list="swiperList" auto></swiper>
      </div>

      <div class="b1">
        <div class="item" v-for="item in linkBtns">
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

      <part1 :primary-color="primaryColor" :name="linkBtnList1Name" :list="linkBtnList1"
             :search-all="list1Search" v-if="linkBtnList1"></part1>
      <part2 :primary-color="primaryColor" :name="linkBtnList2Name" :list="linkBtnList2"
             :search-all="list2Search" v-if="linkBtnList2"></part2>

      <div class="part-list" v-if="dataList.source.ID !== ''">
        <div class="part-title" :style="{color: primaryColor}">
          <p class="title" :style="{color: primaryColor}">{{dataList.title}}</p>
          <p class="line" :style="{backgroundColor: primaryColor}"></p>
        </div>
        <list1 :sourcelist="resource" :res-i-d="dataList.source.ID" :list-style="dataList.source.listStyle"></list1>


        <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}"
                  v-if="dataList.link.external===''&&dataList.link.classID===''&&dataList.link.instanceID===''">
          {{dataList.endTitle}}
        </x-button>

        <router-link :to="'../class' + dataList.link.classID + '/' + dataList.link.instanceID"
                     v-if="dataList.link.external===''&&dataList.link.classID!==''&&dataList.link.instanceID!==''">
          <x-button class="part-btn" :style="{borderColor: primaryColor, color: primaryColor}">
          {{dataList.endTitle}}
          </x-button>
        </router-link>


        <x-button class="part-btn" v-if="dataList.link.external!==''">
          <a :href="dataList.link.external" :style="{borderColor: primaryColor, color: primaryColor}">{{dataList.endTitle}}</a>
        </x-button>
      </div>

    </div>
    <router-link to="../experts">
      <div :class="{'disabled': isDisabled}" class="yc-float yc-btn" :style="{backgroundColor: primaryColor}"
           v-if="askShow">
        我要咨询
      </div>
    </router-link>
  </div>

</template>

<script>
  import Part1 from './ImgList1'
  import Part2 from './ImgList2'
  import {Spinner, Swiper, XButton} from 'vux'
  import List1 from './List1'
  import api from '../api'
  export default{
    components: {XButton, List1, Part1, Part2, Swiper, Spinner},
    props: {
      askShow: {
        type: Boolean,
        default: false
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      primaryColor: String,
      collegeID: String,
      banner: Object,
      carousels: Array,
      linkBtns: Array,
      list1Search: Object,
      linkBtnList1Name: String,
      linkBtnList1: Array,
      list2Search: Object,
      linkBtnList2Name: String,
      linkBtnList2: Array,
      dataList: Object
    },
    data () {
      return {
        resource: [],
        imgList: [],
        href: ''
      }
    },
    created () {
      this.fetchList()
    },
    methods: {
      fetchList () {
        if (this.dataList && this.dataList.source.ID) {
          api.fetch_resource(this.collegeID, this.dataList.source.ID, this.dataList.num, 0).then((r) => {
            this.resource = r.data.data
          })
        }
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
    }
  }
</script>
