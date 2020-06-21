<style lang="stylus" scoped>
  @import "../styl.styl"
  .list-header
    background-color: $yc_background_white
    border: $yc_border
    border-width: 1px 0
    height: 40px
    line-height: 40px
    padding: 0 $yc_margin
    position: relative
    clear: both
    overflow: hidden
    .list-title-pic
      margin-right: 50px
      background: url("../assets/logo.png")
      position: absolute
      left: 0
      top: 0
      width: 50px
      height: 40px
      background-size: 100%
    .right
      float: right
      color: $yc_main_color
      font-size: $yc_font_small
      span
        vertical-align: middle
    .icon
      width: 24px
      height: 24px
      fill: $yc_main_color
</style>

<template>
  <div class="list-header">
    <!--<span v-if="list.linkPic" class="list-title-pic" :style="{backgroundImage: 'url(' + list.linkPic + ')'}"></span>-->
    <span class="list-title">{{list.title}}</span>
    <router-link :to="linkUrl">
      <div class="right" :style="{color: primaryColor}"
           v-if="list.link.external===''&&list.link.classID!==''&&list.link.instanceID!==''">
        <span>{{list.linkTitle}}</span>
        <icon :style="{fill: primaryColor}" type="chevron-right"></icon>
      </div>
    </router-link>

    <div class="right" :href="linkUrl" :style="{color: primaryColor}"
         v-if="list.link.external===''&&list.link.classID===''&&list.link.instanceID===''">
      <span>{{list.linkTitle}}</span>
      <icon :style="{fill: primaryColor}" type="chevron-right"></icon>
    </div>

    <a class="right" :href="linkUrl" v-if="list.link.external!==''">
      <span>{{list.linkTitle}}</span>
      <icon :style="{fill: primaryColor}" type="chevron-right"></icon>
    </a>
  </div>
</template>

<script>
  import Icon from './icon.vue'
  export default{
    components: {Icon},
    props: {
      primaryColor: String,
      list: Object
    },
    data () {
      return {
        url: ''
      }
    },
    computed: {
      linkUrl () {
        if (this.list && this.list.link && this.list.link.external && this.list.link.external !== '') {
          this.url = this.list.link.external
        } else if (this.list && this.list.link && this.list.link.classID !== '' && this.list.link.instanceID !== '') {
          this.url = '../class' + this.list.link.classID + '/' + this.list.link.instanceID
        } else {
          this.url = ''
        }
        return this.url
      }
    }
  }
</script>
