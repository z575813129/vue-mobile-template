/**
* Created by Administrator on 2016/12/15.
*/
<style lang="stylus" scoped>
  @import "../styl.styl"
  .vux-tab-item
    font-size: 18px
    font-weight: bold
    border-bottom: $yc_border

  .c-class15
    height: 100%
    position: relative
    .header
      height: 60px
      .header-item
        line-height: 60px
      .item
        position: absolute
        top: 0
        bottom: 0
        width: 100%

</style>

<template>
  <div class="c-class15">
    <tab class="header" :line-width=3 :active-color="primaryColor" v-model="index" :height="120">
      <tab-item class="header-item" :selected="pageIndex === index" @on-item-click="change(index)"
                v-for="(tab, index) in linkPages">
        {{tab.typeTitle}}
      </tab-item>
    </tab>
    <div class="item" :style="{height: scrollHeight}" v-for="(item, pageIndex) in pages" v-show="pageIndex===index">
      <class1 v-if="item.link.classID === 1"
              :ask-show="false"
              :college-i-d="collegeID"
              :banner="item.json.banner"
              :carousels="item.json.carousels"
              :link-btns="item.json.linkBtns"
              :data-list="item.json.dataList"
              :list-style="item.json.listStyle"
              :home-type="homeType"
              :is-disabled="true">
      </class1>
      <class2 v-if="item.link.classID === 2" :html="item.json.html"></class2>
      <class3 v-if="item.link.classID === 3" :contact-url="item.json.contactUrl" :primary-color="primaryColor"></class3>
      <class4 v-if="item.link.classID === 4"
              :source-i-d="item.json.source.ID"
              :college-i-d="collegeID"
              :is-disabled="true"
              :scroll-height="scrollHeight"
              :list-style="item.json.source.listStyle">
      </class4>
      <class5 v-if="item.link.classID === 5" :list="item.json.questions.list" :is-disabled="true"></class5>
      <class6 v-if="item.link.classID === 6" :major-list="item.json.linkBtns" :is-disabled="true"></class6>
      <class7 v-if="item.link.classID === 7" :html="item.json.html" :list-style="item.json.listStyle"
              :link-btns="item.json.linkBtns" :is-disabled="true"></class7>
      <class8 v-if="item.link.classID === 8" :list="item.json.linkBtns" :list-style="item.json.listStyle"
              :is-disabled="true"></class8>
      <class9 v-if="item.link.classID === 9" :img-list="item.json.linkBtns" :is-disabled="true"></class9>
      <class10 v-if="item.link.classID === 10" :show-header="false" :primary-color="primaryColor"
               :college-i-d="collegeID"></class10>
      <class11 v-if="item.link.classID === 11" :show-header="false" :primary-color="primaryColor"
               :college-i-d="collegeID"></class11>
      <class12 v-if="item.link.classID === 12" :primary-color="primaryColor" :is-disabled="true"
               :enroll-info="item.json"></class12>
      <class13 v-if="item.link.classID === 13&&item.json.refresh" :enroll-info="item.json.enrollInfo"
               :query="item.json.query"></class13>
      <class14 v-if="item.link.classID === 14"
               :ask-show="false"
               :college-i-d="collegeID"
               :banner="item.json.banner"
               :carousels="item.json.carousels"
               :link-btns="item.json.linkBtns"
               :pic-list1="item.json.picList1"
               :pic-list2="item.json.picList2"
               :data-list="item.json.dataList"
               :list-style="item.json.dataList.source.listStyle"
               :is-disabled="true">
      </class14>
    </div>
  </div>
</template>

<script>
  import Class1 from './Class1.vue'
  import Class2 from './Class2.vue'
  import Class3 from './Class3.vue'
  import Class4 from './Class4.vue'
  import Class5 from './Class5.vue'
  import Class6 from './Class6.vue'
  import Class7 from './Class7.vue'
  import Class8 from './Class8.vue'
  import Class9 from './Class9.vue'
  import Class10 from './Class10.vue'
  import Class11 from './Class11.vue'
  import Class12 from './Class12.vue'
  import Class13 from './Class13.vue'
  import Class14 from './Class14.vue'
  import {Spinner, Tab, TabItem} from 'vux'
  import http from '../api'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    components: {
      Class14,
      Class13,
      Class12,
      Class11,
      Class10,
      Class9,
      Class8,
      Class7,
      Class6,
      Class5,
      Class4,
      Class3,
      Class2,
      Class1,
      Tab,
      TabItem,
      Spinner
    },
    props: {
      linkPages: Array,
      collegeID: String,
      isDisabled: {
        type: Boolean,
        default: false
      },
      primaryColor: {
        type: String,
        default: '#a51c30'
      }
    },
    created () {
      this.getPages()
      console.log('create ' + this.pages)
    },
    data () {
      return {
        index: 0,
        homeType: {
          type_default: false,
          type_block: false
        },
        scrollHeight: document.documentElement.clientHeight - 60 + 'px',
        pages: [],
        loadingData: true
      }
    },
    computed: {
      ...mapGetters([
        'pageIndex'
      ])
    },
    methods: {
      ...mapActions([
        'fetchCurrentTab'
      ]),
      change (index) {
        this.fetchCurrentTab(index)
        console.log(this.pageIndex)
      },
      getPages () {
        this.pages = []
        let promises = []
        for (let i = 0; i < this.linkPages.length; i++) {
          promises.push(http.fetch_instance_info(this.collegeID, this.linkPages[i].link.instanceID))
        }
        Promise.all(promises).then(r => {
          for (let i = 0; i < this.linkPages.length; i++) {
            this.pages.push(Object.assign({
              json: JSON.parse(r[i].data.data.json)
            }, this.linkPages[i]))
          }
          this.loadingData = false
        })
      }
    },
    watch: {
      'linkPages': {
        handler () {
          this.getPages()
        },
        deep: true
      }
    }
  }
</script>
