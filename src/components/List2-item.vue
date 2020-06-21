/**
* Created by Administrator on 2016/11/30.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .item
    margin-bottom: $yc_margin
    background: $yc_background_white
    border-bottom: $yc_border
    border-top: $yc_border
    .parent
      /*display: flex*/
      /*flex-wrap: wrap*/
      /*align-items: center*/
      border-bottom: $yc_border
      display: block
      .parent-title
        display: inline-block
        vertical-align: middle
        font-size: 18px
        font-weight: bolder
        padding: $yc_margin
        hr
          display: inline-block
          margin-right: $yc_margin/ 2
          vertical-align: middle
          border: 2px solid #a51c30
          height: 24px
    .children
      /*display: flex*/
      /*flex-wrap: wrap*/
      align-items: center
      padding: $yc_margin
      .children-name
        display: inline-block
        margin: 5px
        text-align: center
        border: 1px solid #828282
        border-radius: 5px
        padding: 7px
    a
      text-decoration: none

</style>

<template>
  <div class="item" :style="{color: primaryColor}">

    <div class="parent" v-if="item.link.external===''&&item.link.classID!==''&&item.link.instanceID!==''">
      <router-link :to="'../class' + item.link.classID + '/' + item.link.instanceID">
        <div class="parent-title" :style="{color: primaryColor}">
          <hr :style="{borderColor: primaryColor}">
          <span>{{item.name}}</span>
        </div>
      </router-link>
    </div>

    <div class="parent" v-if="item.link.external===''&&item.link.classID===''&&item.link.instanceID===''">
      <div class="parent-title" :style="{color: primaryColor}">
        <hr :style="{borderColor: primaryColor}">
        <span>{{item.name}}</span>
      </div>
    </div>

    <a class="parent" :href="item.link.external" v-if="item.link.external!==''">
      <div class="parent-title" :style="{color: primaryColor}">
        <hr :style="{borderColor: primaryColor}">
        <span>{{item.name}}</span>
      </div>
    </a>

    <div class="children">

      <div class="children-name" :style="{borderColor: primaryColor}" v-for="major in item.children"
           v-show="major.link.external===''&&major.link.classID!==''&&major.link.instanceID!==''">
        <router-link :to="'../class' + major.link.classID + '/' + major.link.instanceID">
          <div :style="{color: primaryColor}">{{major.name}}</div>
        </router-link>
      </div>


      <div class="children-name" :style="{borderColor: primaryColor}" v-for="major in item.children"
           v-show="major.link.external===''&&major.link.classID===''&&major.link.instanceID===''">{{major.name}}
      </div>

      <a class="children-name" :style="{color: primaryColor, borderColor: primaryColor}" :href="major.link.external"
         v-for="major in item.children" v-show="major.link.external!==''">
        {{major.name}}
      </a>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      primaryColor: String,
      item: Object
    }
  }
</script>
