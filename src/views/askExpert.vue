<style lang="stylus" scoped>
  @import "../styl.styl"
  .btn-block
    width: 80%
    margin: $yc_margin* 2 auto
</style>

<template>
  <div>
    <login-modal></login-modal>
    <group title="问题内容">
      <x-textarea :row="10" :max="300" v-model="question" :height="300"
                  placeholder="为了导师更好的解答，请您详细描述需要请教的问题，如果您的问题描述不清晰或不在导师擅长领域内，导师可能无法回答您的问题。问题参考：浙大附中高三学生，请问对于放弃自己心仪的专业而选择名校，是否可取？（300字以内）"></x-textarea>
    </group>
    <x-button class="btn-block" type="primary" :disabled="question===''" @click.native="submit">立即咨询</x-button>
  </div>
</template>

<script>
  import http from '../api'
  import LoginModal from '../components/loginModal.vue'
  import {XButton, XTextarea, Group} from 'vux'
  import {mapActions} from 'vuex'
  export default{
    components: {http, LoginModal, Group, XButton, XTextarea},
    created () {
      document.title = '提问'
    },
    methods: {
      ...mapActions([
        'showMsg'
      ]),
      submit () {
        console.log('aa')
        http.submit_question(this.$route.params.collegeID, this.$route.params.expertID, this.question).then((r) => {
          const json = r.data
          switch (json.code) {
            case 200:
              this.showMsg({content: '提问成功'})
              window.history.back()
              break
            case 403:
              this.showMsg({content: '请勿重复提问', type: 'cancel'})
              break
            default:
              break
          }
        })
      }
    },
    data () {
      return {
        question: ''
      }
    }
  }
</script>
