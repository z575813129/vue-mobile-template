<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-list4
    background-color: $yc_background_white
    padding: 0 $yc_margin
    a
      text-decoration: none
      color: $yc_color_black
</style>

<template>
  <div class="c-list4">
    <div v-for="item in list">
      <list-item :item="item" :list-style="listStyle" v-if="item.link.external===''&&item.link.classID===''&&item.link.instanceID===''"></list-item>

      <router-link :to="'../class' + item.link.classID + '/' + item.link.instanceID"
                   v-if="item.link.external===''&&item.link.classID!==''&&item.link.instanceID!==''">
        <list-item :list-style="listStyle" :item="item"></list-item>
      </router-link>

      <a :href="item.link.external" v-if="item.link.external!==''">
        <list-item :item="item" :list-style="listStyle"></list-item>
      </a>
    </div>
  </div>
</template>

<script>
  import ListItem from './List4-item.vue'
  export default{
    components: {ListItem},
    props: {
      listStyle: Object,
      list: Array
    }
  }
</script>
