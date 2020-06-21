<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-list3
    background-color: $yc_background_white
    a
      text-decoration: none
      color: $yc_color_black
</style>

<template>
  <div class="c-list3">
    <div v-for="item in list">
      <list-item :item="item" v-if="item.link.external===''&&item.link.classID===''&&item.link.instanceID===''"></list-item>

      <router-link :to="'../class' + item.link.classID + '/' + item.link.instanceID"
                   v-if="item.link.external===''&&item.link.classID!==''&&item.link.instanceID!==''">
        <list-item :item="item"></list-item>
      </router-link>

      <a :href="item.link.external" v-if="item.link.external!==''">
        <list-item :item="item"></list-item>
      </a>
    </div>
  </div>
</template>

<script>
  import ListItem from './List3-item.vue'
  export default{
    components: {ListItem},
    props: {
      list: Array
    }
  }
</script>
