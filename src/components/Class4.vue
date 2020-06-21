<style lang="stylus" scoped>
  @import "../styl.styl"
  .c-class4{
    height: 100%
  }

</style>

<template>
  <div class="c-class4">
    <div :class="{'disabled': isDisabled}">
      <spinner class="spinner" v-if="!resource.length" type="ios"></spinner>
      <list1 :sourcelist="resource" :res-i-d="sourceID" :list-style="listStyle"></list1>
      <!--<div class="spinner" v-if="resource&&resource.length===0" type="ios">数据暂无</div>-->
    </div>
  </div>
</template>
<script>
  import api from '../api'
  import List1 from '../components/List1'
  import {Spinner} from 'vux'
  export default{
    components: {Spinner, List1},
    props: {
      scrollHeight: {
        type: String,
        default: document.documentElement.clientHeight + 'px'
      },
      isDisabled: {
        type: Boolean,
        default: false
      },
      listStyle: Object,
      sourceID: String,
      collegeID: String
    },
    data () {
      return {
        resource: [],
        offset: 0
      }
    },
    created () {
      this.fetchList()
    },
    methods: {
      fetchList () {
        if (this.sourceID) {
          api.fetch_resource(this.collegeID, this.sourceID, 0, this.offset).then((r) => {
            this.resource = r.data.data
          })
        }
      }
    },
    watch: {
      'sourceID': {
        handler () {
          this.fetchList()
        },
        deep: true
      }
    },
    computed: {
      title () {
        if (this.resource && this.resource.title) {
          return this.resource.title
        }
      },
      date () {
        if (this.resource && this.resource.date) {
          return new Date(this.resource.date).toLocaleDateString()
        }
      },
      img1_url () {
        if (this.resource && this.resource.img1_url) {
          return this.resource.img1_url
        }
      }
    }
  }
</script>
