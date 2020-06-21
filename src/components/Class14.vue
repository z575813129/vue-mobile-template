/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class1
    width: 100%
    height: 100%
    position: relative
    overflow: hidden
    .class1
      position: absolute
      z-index: 1
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

      .b1
        background-color: $yc_background_white
        margin: $yc_margin 0
        padding: 0 $yc_margin $yc_margin
        font-size: $yc_font_small
        border: $yc_border
        border-width: 1px 0
        /*display: flex*/
        /*flex-wrap: wrap*/

        .item
          /*flex: 1 0 auto*/
          display: inline-block
          text-align: center
          text-decoration: none
          width: 25%
          height: 60px
          padding: $yc_margin* 1.5 0
          img
            display: block
            margin: 0 auto $yc_margin/ 2
            width: 50px
            height: 50px
          span
            display: block
            color: $yc_color_grey
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
      .b2
        .spinner
          margin: 30px auto
          display: block
          text-align: center
      .pic1
        margin: 10px 0
        .pic1-box
          padding: 15px 10px
          background-color: #fff
          border-bottom: solid 1px $yc_border_color_grey
        .box1
          position: relative
          /*width: 1040px*/
          .box1-item
            color: $yc_color_black
            padding-bottom: 15px
            border: solid 1px $yc_border_color_grey
            width: 138px
            display: inline-block
            margin-left: 10px
            float: left
            text-align: center
            min-height: 157px
          .box1-item:first-child
            margin-left: 0
          .pic1-pic
            background: url("../assets/logo.png") center center no-repeat
            background-size: 100%
            min-height: 100px
            width: 100%
            margin-bottom: 8px
          .pic1-name
            text-align: center
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .pic1-desc
            text-align: center
            color: $yc_color_grey
            font-size: 14px
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap

      .pic2
        margin: 10px 0
        .pic2-box
          padding: 15px 10px
          background-color: #fff
          border-bottom: solid 1px $yc_border_color_grey
        .bg-pic
          background: url("../assets/logo.png")
          background-size: 100%
          min-height: 100px
        .pic2-desc
          margin-top: 5px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          color: $yc_color_black
</style>

<template>
  <div class="c-class1">
    <div class="class1">
      <div :class="{'disabled': isDisabled}">
        <img class="banner" :src="banner.img" :style="{backgroundColor: primaryColor}">
        <swiper :list="swiperList" auto></swiper>
        <!--@on-index-change="swiperChange"-->
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
        <div class="pic1">
          <list-header v-if="newPicList1" :list="newPicList1.linkList" :primary-color="primaryColor"></list-header>
          <div class="pic1-box">
            <scroller lock-y :scrollbar-x=false>
              <div class="box1" :style="{width: picListWidth}">
                <div v-if="newPicList1">
                  <a class="box1-item" :href="item.url" v-for="item in newPicList1.picList">
                    <div class="pic1-pic" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                    <p class="pic1-name" v-if="item.title">{{item.title}}</p>
                    <p class="pic1-desc" v-if="item.desc">{{item.desc}}</p>
                  </a>
                </div>
              </div>
            </scroller>
          </div>
        </div>
        <div class="pic2">
          <list-header v-if="newPicList2" :list="newPicList2.linkList" :primary-color="primaryColor"></list-header>
          <div class="pic2-box">
            <flexbox v-if="newPicList2">
              <flexbox-item v-for="item in newPicList2.picList">
                <a :href="item.url">
                  <div class="bg-pic" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
                  <p class="pic2-desc" v-if="item.title">{{item.title}}</p>
                </a>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
        <div class="b2">
          <list-header :list="dataList" :primary-color="primaryColor"></list-header>
          <list1 :sourcelist="resource" :res-i-d="dataList.source.ID" :list-style="listStyle"></list1>
          <spinner class="spinner" v-if="isShow" type="ios"></spinner>
          <div class="spinner" v-if="hasData" type="ios">数据暂无</div>
        </div>
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
  import api from '../api'
  import List1 from './List1'
  import ListHeader from './ListHeader'
  import {Flexbox, FlexboxItem, Swiper, Spinner, Scroller} from 'vux'
  export default{
    components: {ListHeader, List1, Swiper, Spinner, Flexbox, FlexboxItem, Scroller},
    data () {
      return {
        picListWidth: null,
        imgList: [],
        href: '',
        isShow: true,
        hasData: false,
        resource: []
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
            if (this.resource.length) {
              this.isShow = false
              this.hasData = false
            }
          })
        } else {
          this.isShow = false
          this.hasData = true
        }
      }
    },
    watch: {
      'dataList': {
        handler () {
          this.fetchList()
        },
        deep: true
      }
    },
    computed: {
      swiperList () {
        if (this.carousels) {
          for (let i in this.carousels) {
            this.imgList[i] = Object.assign({}, this.carousels[i])
          }
          for (let i = 0; i < this.imgList.length; i++) {
            if (this.imgList[i] && this.imgList[i].link && this.imgList[i].link.external) {
              this.imgList[i].url = this.imgList[i].link.external
            } else if (this.imgList[i] && this.imgList[i].link && this.imgList[i].link.classID && this.imgList[i].link.instanceID) {
              this.imgList[i].url = '../class' + this.imgList[i].link.classID + '/' + this.imgList[i].link.instanceID
            }
          }
          return this.imgList
        }
      },
      newPicList1 () {
        if (this.picList1.picList) {
          var picLen = this.picList1.picList.length
          for (let i = 0; i < this.picList1.picList.length; i++) {
            this.picListWidth = picLen * 140 + (picLen - 1) * 10 + 'px'
            this.picList1.picList[i] = Object.assign({}, this.picList1.picList[i])
          }
          for (let i = 0; i < this.picList1.picList.length; i++) {
            if (this.picList1.picList[i] && this.picList1.picList[i].link && this.picList1.picList[i].link.external) {
              this.picList1[i].url = this.picList1[i].link.external
            } else if (this.picList1.picList[i] && this.picList1.picList[i].link && this.picList1.picList[i].link.classID && this.picList1.picList[i].link.instanceID) {
              this.picList1.picList[i].url = '../class' + this.picList1.picList[i].link.classID + '/' + this.picList1.picList[i].link.instanceID
            }
          }
          return this.picList1
        }
      },
      newPicList2 () {
        if (this.picList2.picList) {
          for (let i = 0; i < this.picList2.picList.length; i++) {
            this.picList2.picList[i] = Object.assign({}, this.picList2.picList[i])
          }
          for (let i = 0; i < this.picList2.picList.length; i++) {
            if (this.picList2.picList[i] && this.picList2.picList[i].link && this.picList2.picList[i].link.external) {
              this.picList2[i].url = this.picList2[i].link.external
            } else if (this.picList2.picList[i] && this.picList2.picList[i].link && this.picList2.picList[i].link.classID && this.picList2.picList[i].link.instanceID) {
              this.picList2.picList[i].url = '../class' + this.picList2.picList[i].link.classID + '/' + this.picList2.picList[i].link.instanceID
            }
          }
          return this.picList2
        }
      },
      title () {
        if (this.resource && this.resource.title) {
          return this.resource.title
        }
      },
      date () {
        if (this.resource && this.resource.date) {
          return this.resource.date
//          return new Date(this.resource.date).toLocaleDateString()
        }
      },
      img1_url () {
        if (this.resource && this.resource.img1_url) {
          return this.resource.img1_url
        }
      }
    },
    props: {
      askShow: {
        type: Boolean,
        default: false
      },
      outLink: String,
      primaryColor: String,
      isDisabled: {
        type: Boolean,
        default: false
      },
      listStyle: Object,
      collegeID: String,
      banner: {
        type: Object,
        default () {
          return {}
        }
      },
      carousels: {
        type: Array,
        default () {
          return []
        }
      },
      linkBtns: {
        type: Array,
        default () {
          return []
        }
      },
      picList1: {
        type: Object,
        default () {
          return {}
        }
      },
      picList2: {
        type: Object,
        default () {
          return {}
        }
      },
      linkTitle: Boolean,
      dataList: {
        type: Object,
        required: true
      }
    }
  }
</script>
