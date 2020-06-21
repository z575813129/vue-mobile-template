/**
* Created by admin on 2016/10/20.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class18
    .tip
      padding: 10px
      color: $yc_color_grey
      font-size: 14px

    .expand-transition
      transition: all .3s ease
      padding: 10px
      overflow: hidden

    .expand-enter, .expand-leave
      height: 0
      padding: 0 10px
      opacity: 0

    .major-div
      background-color: $yc_background_white
      padding: 0 10px 0 10px
      margin-bottom: 10px
      .major-title
        align-items: center
        justify-content: center
        position: relative
        color: $yc_color_grey
        padding: 15px 0 15px 12px
        font-size: 16px
        display: flex
        .major-title-name
          flex: 1
        .major-title-opt
          align-items: center
          justify-content: center
          color: $yc_color_bule
          font-size: 14px
          width: 80px
          text-align: right
          .icon_arrow
            margin-left: 5px
            vertical-align: middle
            display: inline-block
            width: 15px
            height: 15px
            background: url("../assets/icon_arrow_down.png") no-repeat left top
            background-size: 100%
          .icon_arrow_up
            background-image: url("../assets/icon_arrow_up.png")
      .major-title:before
        content: ''
        position: absolute
        height: 22px
        display: inline-block
        width: 4px
        background-color: $yc_color_grey
        left: 0
        top: calc(50% - 11px)
      .major
        padding-bottom: 15px
      .major-thead
        color: $yc_color_grey
        height: 50px
        line-height: 50px
        text-align: center
        background-color: $yc_background_grey
        display: flex
        .left
          flex: 1
        .right
          flex: 1
      .major
        .major-table
          border: $yc_border_color_grey solid 1px
          border-bottom: none
          display: flex
          text-align: center
          .left
            flex: 1
          .left > div
            padding: 8px
            border-bottom: $yc_border_color_grey solid 1px
          .left > div:nth-last-child(1)
            border: none
          .major-major-name
            color: $yc_color_grey
          .right
            flex: 1
            display: flex
            flex-direction: column
            .right-content
              padding: 8px
              flex: 1
              display: flex
              align-items: center
              justify-content: center
              .major-department-name
                color: $yc_color_grey

    .bl
      border-left: $yc_border_color_grey solid 1px

    .bb
      border-bottom: $yc_border_color_grey solid 1px

    .br
      border-right: $yc_border_color_grey solid 1px

    .bt
      border-top: $yc_border_color_grey solid 1px

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>

<template>
  <div class="c-class18">
    <p class="tip">{{header}}</p>
    <div :class="{'disabled': isDisabled}">
      <div class="major-div bt bb" v-for="(item, index) in list">
        <div class="major-title" @click="toggle(index)">
          <div class="major-title-name">{{item.name}}</div>
          <div class="major-title-opt">
            <span v-if="!showList[index]" :style="{color: primaryColor}">展开</span>
            <span v-if="showList[index]" :style="{color: primaryColor}">收起</span>
            <i class="icon_arrow" :class="{'icon_arrow_up': showList[index]}"></i>
          </div>
        </div>
        <transition name="fade">
          <div class="major" v-if="showList[index]">
            <div class="major-thead bl bt br">
              <div class="left">详细专业</div>
              <div class="right bl">归属院系</div>
            </div>
            <div class="bb">
              <div class="major-table" v-for="(department, indexDepartment) in item.departments">
                <div class="left">
                  <div v-for="(major, indexMajor) in department.majors">

                    <router-link :to="'../class' + major.link.classID + '/' + major.link.instanceID"
                                 v-if="major.link.external===''&&major.link.classID!==''&&major.link.instanceID!==''">
                      <span class="major-major-name" :style="{color: primaryColor}"> {{major.name}} </span>
                    </router-link>

                    <span class="major-major-name"
                          v-if="major.link.external===''&&major.link.classID===''&&major.link.instanceID===''">
                    {{major.name}}
                  </span>
                    <a class="major-major-name" :style="{color: primaryColor}" :href="major.link.external"
                       v-if="major.link.external!==''">
                      {{major.name}}
                    </a>
                  </div>
                </div>
                <div class="bl right">
                  <div class="right-content">
                    <router-link to="'../class' + department.link.classID + '/' + department.link.instanceID"
                                 v-if="department.link.external===''&&department.link.classID!==''&&department.link.instanceID!==''">
                      <span class="major-department-name" :style="{color: primaryColor}">{{department.name}}</span>
                    </router-link>

                    <span class="major-department-name"
                          v-if="department.link.external===''&&department.link.classID===''&&department.link.instanceID===''">
                      {{department.name}}
                  </span>

                    <a class="major-department-name" :style="{color: primaryColor}" :href="department.link.external"
                       v-if="department.link.external!==''">
                      {{department.name}}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default{
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },
      primaryColor: String,
      header: String,
      list: Array
    },
    created () {
      this.setshowList()
    },
    data () {
      return {
        showList: []
      }
    },
    methods: {
      setshowList () {
        for (let index in this.list) {
          Vue.set(this.showList, index, this.list[index].show)
        }
      },
      toggle (index) {
        Vue.set(this.showList, index, !this.showList[index])
      }
    }
  }
</script>
