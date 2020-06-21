/**
* Created by Administrator on 2016/8/26.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class3
    background: $yc_background_grey
    .icon, .item-laber
      flex: 0 0 auto
    .header
      padding: 10px 0
      background: $yc_background_white
      display: flex
      align-items: center
      box-shadow: 0 1px 2px #969696
      hr
        border: 2px solid #132761
        height: 24px
        margin: 0 10px
    .content
      background: $yc_background_white
      margin-top: $yc_margin
      padding: $yc_margin
      .wx
        border-bottom: $yc_border
        clear: both
        padding: 10px 0
        display: flex
        align-items: center
        span
          float: left
          font-weight: bold
          color: black
        img
          display: block
          margin-left: $yc_margin*5
          width: 70px
          height: 70px
      a
        text-decoration: none
        color: blue

      .item
        display: flex
        align-items: center
        border-bottom: $yc_border
        padding: $yc_margin 0
        img
          width: 24px
          height: 24px
          margin-right: $yc_margin*2
        .null
          flex: 1
          margin-right: $yc_margin*2

        span
          font-weight: bold
          margin-right: $yc_margin*2
          color: black
      p
        padding: 15px 0
        border-bottom: $yc_border
        color: $yc_color_grey
        line-height: 1.5
        span
          font-weight: bold
          margin-right: $yc_margin*2
          color: black
</style>

<template>
  <div class="c-class3">
    <div :class="{'disabled': isDisabled}">
      <div class="header">
        <hr :style="{borderColor: primaryColor}">
        <p>联系我们</p>
      </div>
      <div class="content">
        <div class="item" v-if="contactUrl.address||contactUrl.address!==''">
          <span class="item-laber">地址:</span>
          <div>{{contactUrl.address}}</div>
          <span class="null"></span>
          <!--<img class="icon" src="../assets/icon_location.png">-->
        </div>

        <div class=" item phone" v-if="contactUrl.phone||contactUrl.phone!==''">
          <span class="item-laber">电话:</span>
          <a :href="'tel:'+ contactUrl.phone" :style="{color: primaryColor}">{{contactUrl.phone}}</a>
          <span class="null"></span>
          <a class="icon" :href="'tel:'+ contactUrl.phone"><img src="../assets/call2.png"></a>
        </div>


        <p v-if="contactUrl.officialWeb&&contactUrl.officialWeb!==''">
          <span class="item-laber">学校官网:</span>
          <a :href="contactUrl.officialWeb" :style="{color: primaryColor}">{{contactUrl.officialWeb}}</a>
        </p>

        <p v-if="contactUrl.enrollWeb&&contactUrl.enrollWeb!==''">
          <span class="item-laber">招生网:</span>
          <a :href="contactUrl.enrollWeb" :style="{color: primaryColor}">{{contactUrl.enrollWeb}}</a>
        </p>

        <div class="wx" v-if="contactUrl.college_QR && contactUrl.college_QR!==''">
          <span class="item-laber">学校微信公众号:</span>
          <img :src="contactUrl.college_QR">
        </div>

        <div class="wx" v-if="contactUrl.enroll_QR && contactUrl.enroll_QR!==''">
          <span class="item-laber">招生办微信公众号:</span>
          <img :src="contactUrl.enroll_QR">
        </div>

        <div class="item" v-if="contactUrl.email&&contactUrl.email!==''">
          <span class="item-laber">邮箱:</span>
          <a :href="'mailto:'+ contactUrl.email" :style="{color: primaryColor}">{{contactUrl.email}}</a>
          <span class="null"></span>
          <img class="icon" src="../assets/icon_email.png">
        </div>

        <p v-if="contactUrl.fax&&contactUrl.fax!==''"><span>传真:</span>{{contactUrl.fax}}</p>
        <p v-if="contactUrl.postCode&&contactUrl.postCode!==''"><span>邮编:</span>{{contactUrl.postCode}}</p>
      </div>

    </div>
  </div>
</template>

<script>
  export default{
    props: {
      primaryColor: String,
      isDisabled: {
        type: Boolean,
        default: false
      },
      contactUrl: Object
    }
  }
</script>
