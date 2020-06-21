/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus">
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
          padding: $yc_margin 0
          a
            text-decoration: none
          img
            display: block
            margin: 0 auto
            width: 50px
            height: 50px
          span
            display: block
            color: $yc_color_grey
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
          .b1-part1
            margin-bottom: 10px

      .b2
        .spinner
          margin: 30px auto
          display: block
          text-align: center
    .swiper-block > .vux-indicator, .swiper-block .vux-indicator-right
      left: 35%
      bottom: 45px
      a
        margin-left: 15px
        .vux-icon-dot.active
          background-color: #fff
        .vux-icon-dot
          width: 10px
          height: 10px
          border-radius: 5px
          background-color: rgba(255, 255, 255, 0.4)

    .class1-block
      .b1
        position: relative
        top: -55px
        margin: $yc_margin
        padding: 0
        background: $yc_background_grey
        border: none
        border-radius: 10px
        .item span
          color: $yc_color_black
        .b1-part1
          background: $yc_background_white
          border: none
          border-radius: 10px
          box-shadow: 0 2px 2px #dbdbdb
          padding: $yc_margin 0
        .b1-part2
          background: $yc_background_white
          border: none
          border-radius: 10px
          box-shadow: 1px 1px 2px 2px #dbdbdb
          margin-top: 20px
          padding: $yc_margin 0
      .b2
        position: relative
        top: -50px
        margin: $yc_margin
        border-radius: 10px
        border: none
        box-shadow: 1px 1px 2px 2px #dbdbdb
        .list-header
          border-top-left-radius: 10px
          border-top-right-radius: 10px
          border-top: none
        .c-list1
          border-bottom-left-radius: 10px
          border-bottom-right-radius: 10px

</style>

<template>
  <div class="c-class1">
    <div class="class1" :class="{'class1-default': homeType.type_default, 'class1-block': homeType.type_block}">
      <div :class="{'disabled': isDisabled}">

        <img class="banner" :src="banner.img" :style="{backgroundColor: primaryColor}">
        <swiper :class="{'swiper-default': homeType.type_default, 'swiper-block':homeType.type_block }"
                :list="swiperList" :height="swiperHight"
                auto></swiper>
        <div class="b1" v-if="homeType.type_default">
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
        <div class="b1" v-if="homeType.type_block">
          <div class="b1-part1">
            <div class="item" v-for="item in filterLinkBtnsItem1">
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
          <div class="b1-part2">
            <div class="item" v-for="item in filterLinkBtnsItem2">
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
            <div class="item" v-for="item in filterLinkBtnsItem3">
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
            <div class="item" v-for="item in filterLinkBtnsItem4">
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
        </div>

        <div class="b2" v-if="dataList.source.ID!== '' && homeType.type_default">
          <list-header :list="dataList" :primary-color="primaryColor"></list-header>
          <list1 :sourcelist="resource" :res-i-d="dataList.source.ID" :list-style="listStyle"></list1>
          <spinner class="spinner" v-if="isShow" type="ios"></spinner>
          <div class="spinner" v-if="hasData" type="ios">数据暂无</div>
        </div>
        <div class="b2" v-if="dataList.source.ID!== '' && homeType.type_block">
          <list-header :list="dataList" :primary-color="primaryColor"></list-header>
          <list1 :sourcelist="resource" :res-i-d="dataList.source.ID" :list-style="listStyle"></list1>
          <spinner class="spinner" v-if="isShow" type="ios"></spinner>
          <div class="spinner" v-if="hasData" type="ios">数据暂无</div>
        </div>
      </div>
    </div>
    <router-link :to="'../experts'" :class="{'disabled': isDisabled}" class="yc-float yc-btn"
                 :style="{backgroundColor: primaryColor}"
                 v-if="askShow">我要咨询
    </router-link>
  </div>

</template>

<script>
  import api from '../api'
  import List1 from './List1'
  import {Spinner, Swiper} from 'vux'
  import ListHeader from './ListHeader'
  export default{
    components: {ListHeader, List1, Swiper, Spinner},
    data () {
      return {
        imgList: [],
        href: '',
        isShow: true,
        hasData: false,
        swiperHight: '180px',
        resource: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.homeType.type_default ? this.swiperHight = '180px' : this.swiperHight = '220px'
        this.fetchList()
      })
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
      },
      'homeType': {
        handler () {
          this.homeType.type_default ? this.swiperHight = '180px' : this.swiperHight = '220px'
        },
        deep: true
      }
    },
    computed: {
      filterLinkBtnsItem1 () {
        return this.linkBtns.slice(0, 4)
      },
      filterLinkBtnsItem2 () {
        return this.linkBtns.slice(4, 8)
      },
      filterLinkBtnsItem3 () {
        return this.linkBtns.slice(8, 12)
      },
      filterLinkBtnsItem4 () {
        return this.linkBtns.slice(12, 16)
      },
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
      homeType: Object,
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
      banner: Object,
      carousels: Array,
      linkBtns: Array,
      linkTitle: Boolean,
      dataList: {
        type: Object,
        required: true
      }
    }
  }
</script>
