<style lang="stylus" scoped>
  @import "../styl.styl"
  .toolbar
    display: flex
    position: absolute
    left: 0
    right: 0
    height: 50px
    background: $yc_background_white
  .top
    top: 0
  .bottom
    bottom: 0
</style>

<template>
  <div class="toolbar" :class="{'top':position==='top','bottom':position==='bottom'}">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props: {
      position: String
    }
  }
</script>
