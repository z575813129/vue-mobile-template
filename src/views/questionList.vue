<style lang="stylus" scoped>
  @import "../styl.styl"
  .list {
    width: 100%
    height: 100%
    .yc-tip {
      font-size: 16px
      margin-top: $yc_margin* 2
      background: $yc_background_white
    }
  }

</style>

<template>
  <div class="list">
    <list :list="userQuestionList"></list>
    <div class="yc-tip" v-if="!userQuestionList||!userQuestionList.length">您尚未提问</div>
  </div>
</template>

<script>
  import {Spinner} from 'vux'
  import List from '../components/questionAnswerList.vue'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Spinner, List},
    mounted () {
      this.$nextTick(() => {
        this.fetchUserQuestion({userID: this.$route.params.userID, offset: 0, limit: 100})
      })
    },
    computed: {
      ...mapGetters([
        'userQuestionList'
      ])
    },
    methods: {
      ...mapActions([
        'fetchUserQuestion'
      ])
    }
  }
</script>
