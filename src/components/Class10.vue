/**
* Created by zack on 2016/9/20.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class10
    background: $yc_background_grey
    height: 100%

    .spinner
      margin: $yc_margin* 10 10%
      width: 80%
      text-align: center

    .title
      padding: 10px 0
      font-size: 20px
      background-color: $yc_background_white
      display: flex
      align-items: center
      box-shadow: 0 1px 2px #969696
      font-weight: bold
      hr
        display: inline-block
        border: 2px solid #a51c30
        height: 24px
        margin: 0 10px

    .desc
      padding: $yc_margin $yc_margin
      border-bottom: $yc_border
      span
        color: #a51c30

    .mark
      font-size: $yc_font_small
      color: red
      margin: 5px 10px

    .tab
      display: flex
      padding: 10px 0
      border-bottom: $yc_border
      background-color: $yc_background_white
      border-top: $yc_border
      margin-top: $yc_margin
      select
        font-weight: 700
        border: none
        padding-right: 15px
        appearance: none
        font-size: 16px
        width: 18%
        margin-right: 2%
        display: block
        line-height: 30px
        background: url("../assets/select.png") no-repeat 105%

    .table-block
      background-color: $yc_background_white
      margin-bottom: $yc_margin
      border-top: $yc_border
      border-bottom: $yc_border
      .block-title
        padding: 5px $yc_margin
        font-weight: 900
        p
          line-height: 30px
        .major
          font-size: 16px
          color: #a51c30

      .item-content
        display: flex
        align-items: center
        width: 100%
        border-top: $yc_border
        .block-item
          width: 33%
          text-align: center
          margin: 10px 0

          span
            display: block
            color: #a51c30
          p
            margin-top: 5px
            color: #969696
            font-size: 14px

  .border-r
    border-right: $yc_border !important

  .tip
    font-size: 14px
    color: #969696
    padding: $yc_margin

  .m-l-s
    margin-left: 2%
</style>

<template>
  <div class="c-class10">
    <div :class="{'disabled': isDisabled}">
      <div class="title" v-if="showHeader">
        <hr :style="{borderColor: primaryColor}">
        <p>招生计划</p>
      </div>
      <!--<spinner class="spinner" v-if="!tabBody.years.length>0" type="ios"></spinner>-->
      <div v-if="tabBody.years.length>0">
        <div class="tab">
          <select class="border-r m-l-s" v-model="query.year" :disabled="tabDisabled.year">
            <!--<option value="全部">全部</option>-->
            <option :value="item" v-for="item in orderByYear">{{item}}</option>
          </select>
          <select class="border-r" v-model="query.province" :disabled="tabDisabled.province">
            <option value="省份">省份</option>
            <!--<option value="全部">全部</option>-->
            <option :value="item" v-for="item in tabBody.provinces">{{item}}</option>
          </select>
          <select class="border-r" v-model="query.specialty" :disabled="tabDisabled.specialty">
            <option value="专业">专业</option>
            <option value="全部">全部</option>
            <option :value="item" v-for="item in tabBody.specialtys">{{item}}</option>
          </select>

          <select class="border-r" v-model="query.batch" :disabled="tabDisabled.batch">
            <option value="批次">批次</option>
            <option value="全部">全部</option>
            <option :value="item" v-for="item in tabBody.batchs">{{item}}</option>
          </select>

          <select class="" v-model="query.arts_sciences" :disabled="tabDisabled.arts_science">
            <option value="科类">科类</option>
            <option value="全部">全部</option>
            <option :value="item" v-for="item in tabBody.arts_sciences">{{item}}</option>
          </select>

        </div>
        <p class="mark" v-show="tip !== ''">请选择&nbsp;&nbsp;{{tip}}</p>
        <!--<p class="mark">注：请按顺序从左到右依次筛选</p>-->
        <spinner class="spinner" v-if="!filteDataList" type="ios"></spinner>
        <div class="table-list" v-else>
          <div class="table-block" v-for="item in filteDataList">
            <div class="block-title">
              <p>专业: <span :style="{color: primaryColor}">{{item.specialty}}</span></p>
              <p>选考科目: <span :style="{color: primaryColor}">{{item.elective_subjects || '暂无'}}</span></p>
            </div>
            <div class="item-content">

              <div class="block-item border-r">
                <span :style="{color: primaryColor}">{{item.student_number || '暂无'}}</span>
                <p>人数</p>
              </div>

              <div class="block-item border-r">
                <span :style="{color: primaryColor}">{{item.school_year || '暂无'}}</span>
                <p>学制(年)</p>
              </div>

              <div class="block-item">
                <span :style="{color: primaryColor}">{{item.tuition || '暂无'}}</span>
                <p>学费(元/年)</p>
              </div>

            </div>
          </div>

          <div class="tip">
            注：<br>1.各专业准确招生批次及计划以各省（自治区）招生主管部门公布的为准。
            <br>2.每学年实际学费按注册专业学费与实际修读学分的学分学费之和结算，以浙江省物价部门核定的标准为准。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let fetchProvinceDone = null
  import orderBy from 'lodash/orderBy'
  import {Spinner} from 'vux'
  import api from '../api'
  export default{
    components: {Spinner},
    data () {
      return {
        tip: '',
        isShow: false,
        tabBody: {
          years: [],
          provinces: [],
          specialtys: [],
          batchs: [],
          arts_sciences: []
        },
        tabDisabled: {
          year: false,
          province: false,
          specialty: true,
          batch: true,
          arts_science: true
        },
        dataList: null,
        query: {
          year: '全部',
          province: '省份',
          specialty: '专业',
          batch: '批次',
          arts_sciences: '科类'
        },
        defaultQuery: {
          year: null,
          province: null,
          specialty: null,
          batch: null,
          arts_science: null,
          selectType: 1
        }
      }
    },
    props: {
      showHeader: {
        type: Boolean,
        default: true
      },
      primaryColor: String,
      isDisabled: {
        type: Boolean,
        default: false
      },
      collegeID: String
    },
    mounted () {
      this.fetchYear()
    },
    methods: {
      // 获取当前省份
      fetch_cur_province () {
        let curProvince = window.remote_ip_info.province
        console.log('当前所在省份:' + curProvince)
        fetchProvinceDone.then(() => {
          let arr = this.tabBody.provinces
          if (arr.length > 0) {
            for (let item of arr) {
              if (item.indexOf(curProvince) !== -1) {
                this.query.province = item
              }
            }
          } else {
            this.query.province = '省份'
          }
        })
      },
      // 获取tab数据
      fetchYear () {
        api.fetch_enrollPlan_tab(this.collegeID, this.defaultQuery).then((r) => {
          this.tabBody.years = r.data.data.years
          this.query.year = this.orderByYear[0]
          this.fetchProvince()
          this.fetch_cur_province()
        })
      },
      fetchProvince () {
        let obj = Object.assign({}, this.query)
        this.filterQuery(obj)
        obj.selectType = 2
        fetchProvinceDone = api.fetch_enrollPlan_tab(this.collegeID, obj).then((r) => {
          let arr = r.data.data.provinces
          try {
            arr.sort(function (a, b) {
              return a.localeCompare(b)
            })
          } catch (err) {
            console.log(err)
          }
          this.tabBody.provinces = arr
        })
      },
      fetchSpecialty () {
        let obj = Object.assign({}, this.query)
        this.filterQuery(obj)
        obj.selectType = 3
        api.fetch_enrollPlan_tab(this.collegeID, obj).then((r) => {
          this.tabBody.specialtys = r.data.data.specialtys
        })
      },
      fetchBatch () {
        let obj = Object.assign({}, this.query)
        this.filterQuery(obj)
        obj.selectType = 4
        api.fetch_enrollPlan_tab(this.collegeID, obj).then((r) => {
          this.tabBody.batchs = r.data.data.batchs
        })
      },
      fetchArts_sciences () {
        let obj = Object.assign({}, this.query)
        this.filterQuery(obj)
        obj.selectType = 5
        api.fetch_enrollPlan_tab(this.collegeID, obj).then((r) => {
          this.tabBody.arts_sciences = r.data.data.arts_sciences
        })
      },
      // 判断选中的顺序
      checkProvince () {
        if (this.query.province === '省份') {
          this.tabDisabled.specialty = this.tabDisabled.batch = this.tabDisabled.arts_science = true
        } else {
          this.tabDisabled.specialty = false
          this.fetchSpecialty()
        }
      },
      checkSpecialty () {
        this.query.specialty === '专业' ? this.tabDisabled.batch = this.tabDisabled.arts_science = true : this.tabDisabled.batch = false
        this.fetchBatch()
      },
      checkBatch () {
        this.query.batch === '批次' ? this.tabDisabled.arts_science = true : this.tabDisabled.arts_science = false
        this.fetchArts_sciences()
      },
//      获取数据
      fetchData () {
        let obj = Object.assign({}, this.query)
        this.filterQuery(obj)
        api.fetch_enrollPlan_data(this.collegeID, 0, 0, obj).then((r) => {
          this.dataList = r.data.data.list
        })
      },
      filterQuery (obj) {
        for (let item in obj) {
          if (obj[item] === '省份' || obj[item] === '专业' || obj[item] === '批次' || obj[item] === '科类' || obj[item] === '全部' || obj[item] === '') {
            obj[item] = null
          }
        }
        return obj
      }
    },
    computed: {
      orderByYear () {
        return orderBy(this.tabBody.years, 'item')
      },
      // 过滤选考科目为空的情况
      filteDataList () {
        if (this.dataList) {
          for (let item of this.dataList) {
            if (item.elective_subjects === 'null') {
              item.elective_subjects = '暂无'
            }
          }
        }
        return this.dataList
      }
    },
    watch: {
      'query.year': {
        handler () {
          this.isShow = true
          this.query.province = '省份'
          this.tip = '省份'
          this.tabDisabled.batch = this.tabDisabled.arts_science = true
          this.query.specialty = '专业'
          this.query.batch = '批次'
          this.query.arts_sciences = '科类'
          this.fetchData()
        }
      },
      'query.province': {
        handler () {
          this.checkProvince()
          this.tabDisabled.batch = this.tabDisabled.arts_science = true
          this.query.specialty = '专业'
          this.tip = '专业'
          this.query.batch = '批次'
          this.query.arts_sciences = '科类'
          this.fetchData()
        }
      },
      'query.specialty': {
        handler () {
          this.checkSpecialty()
          this.query.batch = '批次'
          this.tip = '批次'
          this.query.arts_sciences = '科类'
          this.fetchData()
          this.tabDisabled.arts_science = true
        }
      },
      'query.batch': {
        handler () {
          this.checkBatch()
          this.query.arts_sciences = '科类'
          this.tip = '科类'
          this.fetchData()
        }
      },
      'query.arts_sciences': {
        handler () {
          this.tip = ''
          this.fetchData()
        }
      }
    }
  }
</script>
