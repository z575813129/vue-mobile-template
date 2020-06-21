/**
* Created by Administrator on 2016/11/30.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
</style>

<template>
  <div class="list2">
    <item :primary-color="primaryColor" :item="item" v-for="item in list"></item>
  </div>
</template>

<script>
  import Item from './List2-item.vue'
  export default{
    components: {Item},
    props: {
      primaryColor: String,
      list: Array
    }
  }
</script>
