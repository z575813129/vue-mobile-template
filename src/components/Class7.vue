/**
* Created by Administrator on 2016/8/29.
*/
<style lang="stylus">
  @import "../styl.styl"
  .c-class7
    padding-bottom: $yc_margin*2
    .link
      padding: $yc_margin
      color: #969696
      font-size: 16px
      border-bottom: $yc_border

</style>

<template>
  <div class="c-class7">
    <div :class="{'disabled': isDisabled}">
      <div class="b1">
        <class2 :html="html"></class2>
      </div>
      <div v-if="linkBtns.length>1">
        <div class="link">相关链接</div>
        <div class="b2">
          <list3 :list="linkBtns" :list-style="listStyle"></list3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //  import api from '../api'
  import ListHeader from './ListHeader'
  import {Spinner} from 'vux'
  import Class2 from './Class2'
  import List3 from './List3'
  export default{
    components: {ListHeader, Spinner, Class2, List3},
    props: {
      listStyle: Object,
      isDisabled: {
        type: Boolean,
        default: false
      },
//      collegeID: String,
      html: String,
      linkBtns: Array
//      dataList: {
//        type: Object,
//        required: true
//      }
    }
//    data () {
//      return {
//        isShow: true,
//        hasData: false,
//        resource: []
//      }
//    }
//    created () {
//      this.fetchList()
//    },
//    methods: {
//      fetchList () {
//        if (this.dataList && this.dataList.source && this.dataList.source.ID) {
//          api.fetch_resource(this.collegeID, this.dataList.source.ID, this.dataList.num, 0).then((r) => {
//            this.resource = r.data.data
//            if (this.resource.length) {
//          this.isShow = false
//          this.hasData = false
//            }
//          })
//        } else {
//          this.isShow = false
//          this.hasData = true
//        }
//      }
//    },
//    computed: {
//      title () {
//        if (this.resource && this.resource.title) {
//          return this.resource.title
//        }
//      },
//      date () {
//        if (this.resource && this.resource.date) {
//          return this.resource.date
//        }
//      },
//      img1_url () {
//        if (this.resource && this.resource.img1_url) {
//          return this.resource.img1_url
//        }
//      }
//    }
  }
</script>
