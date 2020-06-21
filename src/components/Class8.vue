/**
* Created by Administrator on 2016/8/29.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
</style>

<template>
  <div class="c-class8">
    <div :class="{'disabled': isDisabled}">
      <list4 :list="list" :list-style="listStyle"></list4>
    </div>
  </div>
</template>

<script>
  import List4 from './List4'
  export default{
    components: {List4},
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      listStyle: Object,
      list: Array
    }
  }
</script>
