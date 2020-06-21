<style lang="stylus" scoped>
  @import "../styl.styl"
  .item
    background-color: $yc_background_white
    padding: $yc_margin
    margin-bottom: $yc_margin

  .question-block, .answer-block
    display: flex
    padding: $yc_margin 0

  .lb
    width: 40px
    height: 40px
    padding: 2px 0
    margin-right: $yc_margin

  .rb
    flex: 1

  .pic
    width: 100%
    height: 100%

  .title
    font-weight: 400
    font-size: $yc_font_normal
    line-height: 1.4
    min-height: 44px

  .answer-block .title
    color: $yc_color_grey

</style>

<template>
  <div class="c-list">
    <div :class="{'disabled': isDisabled}">
      <div class="item" v-for="item in list">
        <div class="question-block">
          <div class="lb">
            <img class="pic" src="../assets/expert_bg.jpg">
          </div>
          <div class="rb">
            <p class="title">{{item.question}}</p>
          </div>
        </div>

        <div class="answer-block">
          <div class="lb">
            <img class="pic" :src="'../assets/questionAnswer.png'">
          </div>
          <div class="rb">
            <p class="title">{{item.answer||'暂无回答'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      list: Array
    }
  }
</script>
