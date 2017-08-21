<!-- 快速移动到顶端的组件 -->
<template>
  <div class="toTop" @click="goToTop()">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAk1BMVEX///8AAADl5eXs7Ozi4uLv7+/7+/vU1NTf39/Z2dny8vL19fX39/fn5+fMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzW1tbMzMzMzMzMzMzMzMzMzMzc3NzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzOzs7R0dGkAYtEAAAALnRSTlP6AP38/fz7/v3++/v7/NbLpCzgwGYf/rq2Qg2w/hPr0pCKcl1WRyeZl2ymAWoHSxHc3AAABA9JREFUaN681td2m0AURuEjOgIEqBfkXhN7w/s/XRzZzsQNNEdI+4LbjxkWa/0ysOvu+nIx5lPjxeX13cAuG7i82pyxK4yryHNe8qIqDtl1trkqB4P+4dXDaEdG2TCVT6XDLNrxo/tVv3B5kQON5wfyY4HvNUB+UfYG3yyB0Emks8QJgeVNL/DTBOrIqF12VMPk6WB4OoEwC8SiIAthMj0Ivl1A6Ip1bgiLWzW8LqAxrB3dQLHWwdMxtROIssCpGU8V8HMBcSoHlMZQPNvCZU7tyoG5NXlpBz/CPJWDS+fwaAH/LsCTXvKg+L0vvF1S+9JTfs1yux88y2kS6a2kIZ/tA8/OmQfSY8Gc81k3PBsRG7cfOWY064Jn58btUz6ftcPb3Lj9yvm2Fd50fV/9d960wQVNKkcpaCh+hh+oEzlSSc3DT/AKfDlaPqy+h9cjHDliDqP1t/AvYjlqMb++g6fUqRy1tGb6FV6PceXIuYy3X+CCSo5eRfEZvlVctOqybz/BCxw5QQ6Lj/CUJpATFDRMP8ATXDlJLpP/4SdCOVEhjwZWHVh/ZAPfdBw4GPoWJUHHkW/+wUuyjqFoU8dUzFi+wyV160vOsSxqvb6a8g2+wOu4HMsqaSvi4g3OSaStDMt8aSshf4VXnf/SMPMsypLOP2q1g+9x5KQ53O/gEYmctITRX7ikkRPXUL7AV3hy4jyuXuCNdlomcZxoB+fmBT4jEE0uUA9FU8DZQO4Ita5eDrmTayKtq5cjruWSTOvq5YxLWeJrXb08ZCFjUq2rl1PGAnpXL4MQKt1m91DKIUKscx0HwI10coxQ6Vx5hUUnVwiRzn2HdXKE4KlcA6tkD8HRuAbWyY6B7VwDK2QDK1wDK2QDK1wD28kG9jSugXWyhxBpXAPr5Aih0rgG1skVQqxxDayTY4RQ4xpYJ4cIaFwD62TYZwgMjdsGGznZYwjsM33mxm2DjRztMX32GXuNcdtgI8//dG/uOgzCMBQl4SWhFsFSKUzdCgwu//91HTrcrTImcZzmB46y2fceM4Y9znjrwf0FBrlmjLesgb5uhooLrtqm5Qz0shUGYOkKg6VNBYylDWuqFhhr6kyHNvigGVGEBhhRBMIXPTDCl0C9LringIBNA4yADZGiJrihJyNEjQpGiIrYWAWM2BhBuRIYQTmqATlYXg24jXpZLjBcKEOkX+7eRA/Jhy8XXjd/7ySFl42KL1+p6aaUfTkWiClXcb3Yqep15ARbOoaCgGJNuXFuStDYQzKyqFUlFclsqnPpZEG7emQaIdS2AvuVfn0crmdJv3grrO6rbvd6TuwOYxyxewxnVfZlj6Gy70s58n6Uc4XSDjSynKTgbZIjnK3ks6M8h1Z44cU7LfufY7rY54MfC670JxWZal8AAAAASUVORK5CYII=">
  </div>
</template>
<script>
  export default {
    name: 'toTop',
    created () {
      window.addEventListener('scroll', e => {
        this.showTopFn()
      })
    },
    methods: {
    // function for scroll to top
      goToTop () {
        let aniId
        aniId = requestAnimationFrame(function goToTopAni () {
          document.body.scrollTop -= 500
          aniId = requestAnimationFrame(goToTopAni)
          if (document.body.scrollTop <= 0) {
            cancelAnimationFrame(aniId)
            document.body.scrollTop = 0
          }
        })
      },
      // set show nav to top
      showTopFn () {
        let toTop = document.querySelectorAll('.toTop')[0]
        if (document.body.scrollTop > document.documentElement.clientHeight) {
          toTop.style.opacity = 1
          toTop.style.zIndex = 3
        } else {
          toTop.style.opacity = 0
          toTop.style.zIndex = -1
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .toTop{
    position: fixed;
    z-index: -1;
    bottom: .896rem;
    right: .896rem;
    width: 1.70667rem;
    height: 1.70667rem;
    transition: .3s;
    opacity: 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
