/**
* Created by Administrator on 2016/8/29.
*/
<style lang="stylus">
  @import "../styl.styl"
  .c-class2
    height 100%
    background-color: $yc_background_white
    padding: $yc_margin
    img
      display: block
      width: 100%
    p
      margin: .5em 0
</style>

<template>
  <div class="c-class2" v-html="html"></div>
</template>

<script>
  export default{
    props: {
      html: String
    }
  }
</script>
