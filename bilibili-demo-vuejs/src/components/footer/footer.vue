<template>
  <div class="footer" v-show="showFooterActive && playingActiveFooter">
    <p>哔哩哔哩 沪ICP备13002172号-3</p>
    <p>详细网络传播视听节目许可证：0910417</p>
  </div>
</template>
<script>
  export default {
    name: 'footer',
    data () {
      return {
        showFooterActive: '',
        playingActiveFooter: true
      }
    },
    created () {
      this.showFooter()
      window.addEventListener('click', e => this.showFooter())
    },
    beforeUpdate () {
      this.showFooter()
    },
    methods: {
      // 判断是否显示second-page
      showFooter () {
        let pathNow = this.$store.state.locationAtPresent
        this.showFooterActive = pathNow ? pathNow.indexOf('ranking') === -1 : true
        this.playingActiveFooter = pathNow ? pathNow.indexOf('player') === -1 : true
      }
    }
  }
</script>
<style scoped lang="less">
  .footer{
    margin-top: 1.344rem;
    padding-bottom: .32rem;
    p{
      text-align: center;
      font-size: .55467rem;
      margin: 0;
      color: #999;
      line-height: 1.36533rem;
    }
  }
</style>
