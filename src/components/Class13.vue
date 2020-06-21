/**
* Created by Administrator on 2016/10/17.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class13
    background: $yc_background_grey
    .name
      display: flex
      font-size: 20px
      align-items: center
      padding: $yc_margin 0
      font-weight: bold
      p
        color: #132761
        padding: 0
      hr
        border: 2px solid #132761
        height: 24px
        margin: 0 10px
    img
      width: 100%
      height: auto
    .header, .desc, .vs, .rate, .chart
      background: $yc_background_white
      margin-bottom: $yc_margin
    .header
      box-shadow: 0 1px 2px #969696
      .name2
        padding: 0 $yc_margin $yc_margin $yc_margin
        color: $yc_color_grey
    .desc
      border-top: $yc_border
      border-bottom: $yc_border
      padding: $yc_margin
      .desc-author
        margin-top: $yc_margin
        color: $yc_color_grey
        font-size: 15px
        p
          line-height: 25px
      .fold
        color: #132761
        text-align: center
        padding: $yc_margin
        margin-left: -20px
        .arrow
          display: inline-block
          width: 20px
          height: 25px
      .open-icon
        background: url('../assets/icon_arrow_down.png') no-repeat
        background-size: 22px 25px
        background-position: 60% center
      .close-icon
        background: url('../assets/icon_arrow_up.png') no-repeat
        background-size: 22px 25px
        background-position: 60% center
    .vs
      display: flex
      align-items: center
      justify-content: space-between
      padding: $yc_margin
      color: #132761
      border-top: $yc_border
      border-bottom: $yc_border
      font-size: 18px
      font-weight: bold
      h2
        font-style: italic
        margin-top: 10px
        margin-bottom: 45px
      .scale
        font-size: 25px
        font-style: italic
      .girl, .boy
        padding: 17px
        text-align: center
    .salary, .work_direction, .deep_school, .work-rate
      padding: $yc_margin
      background: $yc_background_white
      border-bottom: $yc_border
      color: $yc_color_grey
      font-size: 15px
    .salary
      span
        font-weight: bold
        font-style: italic
        color: #f29534
      .money
        font-size: 25px
        margin-left: 5px
    .work-rate .title
      font-size: 18px
      color: #132761
      font-weight: bold
    strong
      font-size: 18px
      color: #132761

    .chart-title
      padding: $yc_margin
      color: $yc_color_grey
    .chart
      border-top: $yc_border
      .title
        font-size: 20px
        color: #132761
        span
          padding: 1px 7px
          color: #fff
          background-color: #132761
          font-weight: bold
      .select, .major, .score, .plan, .rank, .hot
        margin-bottom: $yc_margin
        padding: $yc_margin
      .select
        margin-bottom: 20px
        border-bottom: $yc_border
        padding: $yc_margin 0
        display: flex
        align-items: center
        justify-content: space-around
        hr
          border: 1px solid #c8c8c8
          height: 30px
        .tab
          position: relative
          select
            max-width: 45px
            overflow: hidden
            color: #132761
            font-weight: 700
            appearance: none
            font-size: 16px
            border: none
            display: block
            background: #fff
          .arrow
            width: 0
            height: 0
            position: absolute
            border-left: 6px solid transparent
            border-right: 6px solid transparent
            border-top: 8px solid #132761
            top: 7px
            right: -17px
      .major
        text-align: center
        width: 80%
        margin: 0 auto
        background: $yc_background_grey
        border-radius: 50px
        color: #132761

  .color-y
    color: #f29534

  .color-b
    color: #509ac2

  .open
    max-height: 150px
    overflow: hidden

  .close
    height: auto
    overflow: auto

  .padding-l
    padding-left: 10%

  .margin-r
    margin-right: 10%

</style>

<template>
  <div class="c-class13">
    <div class="header">
      <div class="name">
        <hr :style="{borderColor: primaryColor}">
        <p>{{enrollInfo.name}}</p>
      </div>
      <p class="name2" v-if="enrollInfo&&enrollInfo.class!==''">专业大类: {{enrollInfo.class}}</p>
    </div>
    <div class="desc">
      <div class="desc-height" :class="{open: isOpen,close: isClose}">
        <p v-html="enrollInfo.information"></p>
        <div class="desc-author">
          <p v-if="enrollInfo&&enrollInfo.author!==''">专业导游:<span v-html="enrollInfo.author"></span></p>
          <p v-if="enrollInfo&&enrollInfo.book!==''">书名:<span v-html="enrollInfo.author"></span></p>
        </div>
      </div>
      <div class="fold open-icon" v-if="isOpen" @click="fold">
        展开
      </div>
      <div class="fold close-icon" v-if="isClose" @click="fold">
        收起
      </div>
    </div>
    <div class="vs" v-if="enrollInfo.male!==''">
      <div class="girl">
        <img class="arrow" src="../assets/girl.png">
        <p>女生: <span class="scale">{{girl}}%</span></p>
      </div>

      <h2>VS</h2>

      <div class="boy">
        <img class="arrow" src="../assets/boy.png">
        <p>男生: <span class="scale">{{male}}%</span></p>
      </div>
    </div>
    <div class="salary" v-if="enrollInfo.salary!==''"><strong>平均月薪:</strong> <span>￥<span class="money">{{enrollInfo.salary}}</span></span>
    </div>
    <div class="work_direction" v-if="enrollInfo.work_direction!==''"><strong>就业方向:</strong>{{enrollInfo.work_direction}}
    </div>
    <div class="deep_school" v-if="enrollInfo.deep_school!==''"><strong>深造学校:</strong>{{enrollInfo.deep_school}}</div>
    <div class="work-rate" v-if="enrollInfo.employment_rate">
      <div class="title">近年平均初次就业率(%)</div>
      <line-chart :data="enrollInfo.employment_rate"></line-chart>
    </div>
    <div class="chart-title">以下为近年来的招生情况,可按地区文理进行筛选</div>
    <div class="chart">
      <div class="select">
        <div class="tab padding-l">
          <select v-model="query.province">
            <option :value="provinceKey" v-for="(provinceValue, provinceKey) in enrollInfo.charts">{{provinceKey}}
            </option>
          </select>
          <div class="arrow"></div>
        </div>
        <hr>

        <div class="tab margin-r">
          <select v-model="query.subject" v-if="enrollInfo.charts&&enrollInfo.charts[query.province]">
            <option :value="subjectKey" v-for="(subjectValue, subjectKey) in enrollInfo.charts[query.province]">
              {{subjectKey}}
            </option>
          </select>
          <div class="arrow"></div>
        </div>
      </div>

      <div class="major">{{enrollInfo.title}}</div>
      <template v-if="renderChart">
        <div class="score"
             v-if="enrollInfo&&enrollInfo.charts&&enrollInfo.charts[query.province]&&enrollInfo.charts[query.province][query.subject]&&enrollInfo.charts[query.province][query.subject]['分数']">
          <div class="name">
            <hr>
            <p>近年本专业录取分数</p>
          </div>
          <line-chart :data="enrollInfo.charts[query.province][query.subject]['分数']"></line-chart>
        </div>
        <div class="plan"
             v-if="enrollInfo&&enrollInfo.charts&&enrollInfo.charts[query.province]&&enrollInfo.charts[query.province][query.subject]&&enrollInfo.charts[query.province][query.subject]['计划']">
          <div class="name">
            <hr>
            <p>近年本专业录取计划(人数)</p>
          </div>
          <bar-chart :data="enrollInfo.charts[query.province][query.subject]['计划']"></bar-chart>
        </div>
        <div class="rank"
             v-if="enrollInfo&&enrollInfo.charts&&enrollInfo.charts[query.province]&&enrollInfo.charts[query.province][query.subject]&&enrollInfo.charts[query.province][query.subject]['位次']">
          <div class="name">
            <hr>
            <p>近年本专业录取位次</p>
          </div>
          <line-chart :data="enrollInfo.charts[query.province][query.subject]['位次']"></line-chart>
        </div>
        <div class="hot"
             v-if="enrollInfo&&enrollInfo.charts&&enrollInfo.charts[query.province]&&enrollInfo.charts[query.province][query.subject]&&enrollInfo.charts[query.province][query.subject]['热度']">

          <div class="name">
            <hr>
            <p>近年本专业热度校内排名</p>
          </div>
          <horizontal-bar :data="enrollInfo.charts[query.province][query.subject]['热度']"></horizontal-bar>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import BarChart from './BarChart.vue'
  import LineChart from './LineChart.vue'
  import HorizontalBar from './HorizontalBar.vue'
  export default{
    components: {BarChart, HorizontalBar, LineChart},
    data () {
      return {
        isOpen: true,
        isClose: false,
        renderChart: true
      }
    },
    mounted  () {
      this.foldHight()
    },
    methods: {
      fold () {
        this.isOpen = !this.isOpen
        this.isClose = !this.isClose
      },
      foldHight () {
        let height = document.getElementsByClassName('desc-height')[0].offsetHeight
        if (height <= 150) {
          this.isOpen = true
          this.isClose = false
        }
        console.log(height)
      }
    },
    props: {
      query: Object,
      enrollInfo: Object,
      primaryColor: String
    },
    computed: {
      male () {
        if (this.enrollInfo && this.enrollInfo.male) {
          return this.enrollInfo.male.toFixed(2)
        }
      },
      girl () {
        if (this.enrollInfo && this.enrollInfo.male) {
          return (100 - this.enrollInfo.male).toFixed(2)
        }
      }
    },
    watch: {
      'query.province' () {
        let key = Object.keys(this.enrollInfo.charts[this.query.province])[0]
        if (this.query.subject === key) {
          this.renderChart = false
          this.$nextTick(() => {
            this.renderChart = true
          })
        } else {
          this.query.subject = key
        }
      },
      'query.subject' () {
        this.renderChart = false
        this.$nextTick(() => {
          this.renderChart = true
        })
      }
    }
  }
</script>
