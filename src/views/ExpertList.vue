<style lang="stylus" scoped>
  @import "../styl.styl"
  .v-expertlist
    width: 100%
    height: 100%
    .link
      background-color: $yc_main_color
      color: $yc_color_white
      line-height: 45px
      padding: 0 $yc_margin
      span
        vertical-align: middle
      .icon
        margin: 5px -10px 5px 0
        width: 36px
        height: 36px
        fill: $yc_color_white
        float: right
        vertical-align: middle
</style>

<template>
  <div class="v-expertlist">
    <login-modal></login-modal>
    <spinner v-if="isLoading" class="spinner" type="ios"></spinner>
    <div v-if="!isLoading">
      <expert-List class="list4" :list="expertList" :college-i-d="collegeID"></expert-List>
      <div class="spinner" v-if="expertList.length===0">暂无老师</div>
      <!--<div class="yc-float yc-btn" @click="goUserQuestionList()">-->
      <!--提问记录-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import {Spinner} from 'vux'
  import ExpertList from '../components/ExpertList.vue'
  import loginModal from '../components/loginModal.vue'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {Spinner, ExpertList, loginModal},
    data () {
      return {
        isLoading: true,
        collegeID: this.$route.params.collegeID
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.isLoading = true
        this.fetchExpertList({cID: this.$route.params.collegeID, limit: 0, offset: 0}).then(() => {
          this.isLoading = false
        })
      })
    },
    computed: {
      ...mapGetters([
        'account', 'expertList'
      ])
    },
    methods: {
      ...mapActions([
        'fetchExpertList'
      ]),
      goUserQuestionList () {
        this.$router.push('/user/' + this.account.user_id + '/question')
      }
    }
  }
</script>
