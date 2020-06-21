/**
* Created by Administrator on 2016/11/29.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class12
    background: $yc_background_grey
    .header
      font-size: 18px
      padding: $yc_margin
      min-height: 25px
      line-height: 25px
      color: $yc_color_grey
</style>

<template>
  <div class="c-class12">
    <div :class="{'disabled': isDisabled}">
      <div class="header">{{enrollInfo.header}}</div>
      <list2 :primary-color="primaryColor" :list="enrollInfo.list"></list2>
    </div>
  </div>
</template>

<script>
  import List2 from './List2'
  export default{
    components: {List2},
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      primaryColor: String,
      enrollInfo: Object
    }
  }
</script>
