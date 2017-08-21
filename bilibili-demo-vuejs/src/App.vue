<template>
  <div id="app">
    <first-header></first-header>
    <router-view></router-view>
    <detail-foot></detail-foot>
    <top></top>
  </div>
</template>

<script>
// 初始化html字体
import '@/initial/init'
import FirstHeader from '@/components/header/firstPage_header'
import DetailFoot from '@/components/footer/footer'
import Top from '@/components/to_top/to_top'

export default {
  name: 'app',
  components: {
    FirstHeader,
    DetailFoot,
    Top
  }
}
</script>

<style lang="less">
@import url("./assets/less/style.less");
html,
body{
  background-color: #F4F4F4;
  width: 100%;
  height: 100%;
}
#app{
    font-size: @main-font-size;
  }
</style>
