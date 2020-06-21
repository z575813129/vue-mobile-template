/**
* Created by zack on 2016/7/25.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
</style>

<template>
  <toast v-model="toast.show" :type="toast.type">{{toast.content}}</toast>
</template>

<script>
  import {Toast} from 'vux'
  import {mapGetters} from 'vuex'
  export default{
    components: {Toast},
    computed: {
      ...mapGetters([
        'toast'
      ])
    }
  }
</script>
