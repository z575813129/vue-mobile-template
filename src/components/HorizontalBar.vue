/**
* Created by zack on 2016/12/7.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .col
    display: flex

  .label, .data, .rank
    line-height: 35px

  .label div, .data div, .rank div
    margin: 10px 5px

  .data
    flex: 1

  .rank
    color: #132761

  .data div
    background-color: #6ea7d7
    background: linear-gradient(left, #89CAEB, #5386C3)
    text-align: right
    padding-right: 10px
    color: $yc_color_white
    border-radius: 5px
</style>

<template>
  <div class="col">
    <div class="label">
      <div v-for="label in data.labels">
        {{label}}
      </div>
    </div>
    <div class="data">
      <div v-for="data in data.datasets[0].data" :style="{width:data+'%'}">
        热度 {{data}}%
      </div>
    </div>
    <div class="rank">
      <div v-for="rank in data.rank">
        第{{rank}}名
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props: {
      data: Object
    }
  }
</script>
