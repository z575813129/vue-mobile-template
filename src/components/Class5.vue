<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class5
    .item
      background-color: $yc_background_white
      padding: 0 $yc_margin

    .question-block, .answer-block
      display: flex
      align-items: center
      padding: $yc_margin 0
      border-bottom: $yc_border

    .lb
      width: 40px
      height: 40px
      padding: 5px 0
      margin-right: $yc_margin*1.5

    .rb
      flex: 1

    .pic
      width: 100%
      height: 100%

    .title
      font-weight: 400
      font-size: $yc_font_normal

    .answer-block .title
      color: $yc_color_grey

</style>

<template>
  <div class="c-class5">
    <div :class="{'disabled': isDisabled}">
      <div class="item" v-for="item in list">
        <div class="question-block">
          <div class="lb">
            <img class="pic" src="../assets/questionTitle.png">
          </div>
          <div class="rb">
            <p class="title">{{item.title||'暂无问题'}}</p>
          </div>
        </div>

        <div class="answer-block">
          <div class="lb">
            <img class="pic" src="../assets/questionAnswer.png">
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
