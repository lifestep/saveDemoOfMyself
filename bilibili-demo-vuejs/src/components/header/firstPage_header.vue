<template>
  <div id="container">
    <div class="first-header" v-show="showFirstHear && playingActiveHeader">
      <div id="header">
        <div class="header_top">
          <router-link to="/" class="header_top_logo">
            <img src="../../assets/images/logo.png" alt="logo">
          </router-link>
          <a class="header_top_search" href="###">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 21.241 21.949" style="enable-background:new 0 0 21.241 21.949;" xml:space="preserve">
            <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M8.5,0C3.806,0,0,3.806,0,8.5C0,13.194,3.806,17,8.5,17
              c1.805,0,3.479-0.563,4.855-1.522l6.428,6.427c0.058,0.058,0.152,0.058,0.207,0.004l1.211-1.211
              c0.056-0.056,0.051-0.152-0.004-0.207l-6.344-6.344C16.189,12.646,17,10.668,17,8.5C17,3.806,13.194,0,8.5,0z M8.5,16
              C4.358,16,1,12.642,1,8.5C1,4.358,4.358,1,8.5,1C12.642,1,16,4.358,16,8.5C16,12.642,12.642,16,8.5,16z"/>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
          </a>
          <a class="header_top_user" href="###">
            <img src="../../assets/images/noface.gif">
          </a>
          <a class="header_top_client" href="###">下载客户端</a>
        </div>
        <div class="header_bottom">
          <ul class="header_bottom_row">
            <router-link @click.native="activeCategory(1)" :class="{router_active: underlineAction == 1}" tag="li" to="/">首页</router-link>
            <router-link v-for="(item, index) in categorys" key="{{item}}" :class="{router_active: underlineAction == index + 2}" @click.native="activeCategory(index + 2)" tag="li" :to="'/' + (index + 2)">{{item.title}}</router-link>
            <li><a class="to_direct" href="">直播</a></li>
          </ul>
          <span @click="showitems()" v-show="showVal">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 59.414 59.414" style="enable-background:new 0 0 59.414 59.414;" xml:space="preserve">
            <polygon points="58,14.146 29.707,42.439 1.414,14.146 0,15.561 29.707,45.268 59.414,15.561 "/>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            </svg>
          </span>
          <ul class="header_bottom_show">
            <router-link @click.native="activeCategory(1)" :class="{router_active: underlineAction == 1}" tag="li" to="/">首页</router-link>
            <router-link v-for="(item, index) in categorys" key="{{item}}" :class="{router_active: underlineAction == index + 2}" @click.native="activeCategory(index + 2)" tag="li" :to="'/' + (index + 2)">{{item.title}}</router-link>
            <li><a class="to_direct" href="">直播</a></li>
            <li class="header_bottom_close" @click="hiddenitems()" v-show="!showVal">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 59.415 59.415" style="enable-background:new 0 0 59.415 59.415;" xml:space="preserve">
                <polygon points="29.708,14.147 0,43.854 1.414,45.268 29.708,16.975 58,45.268 59.415,43.854 "/>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
              </svg>
            </li>
          </ul>
        </div>
      </div>
      <!-- set background to prevent touch error -->
      <div class="cover" @click="hiddenCover()" @touchmove="hiddenCover()"></div>
    </div>
    <div class="second-header" v-show="!showFirstHear && playingActiveHeader">
      <div class="second_header_top">
        <router-link class="second_header_top_back" tag="div" to="/">
          <img src="../../assets/images/back.png">
        </router-link>
        排行榜
        <div class="second_header_top_client">
          下载客户端
        </div>
      </div>
      <div class="second_header_bottom">
        <ul>
          <router-link :class="{router_active: secondHeaderActive == 0}" @click.native="secondHeaderActiveFn(0)" tag="li" to="/ranking/0">全站</router-link>
          <router-link v-for="(itemSP, indexSP) in categorys" key="{{new Data()}}" tag="li" :to="{path: '/ranking/' + (indexSP + 1)}" :class="{router_active: secondHeaderActive == indexSP + 1}" @click.native="secondHeaderActiveFn(indexSP + 1)">{{itemSP.title}}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    id: 'container',
    data () {
      return {
        // 显示下拉菜单按钮
        showVal: true,
        // 存储分类
        categorys: [],
        // 存储激活类别的样式
        underlineAction: '1',
        // 判断是否显示首页类型头部
        showFirstHear: '',
        // 判断是否显示second page head item of active
        secondHeaderActive: 0,
        // 展示播放页
        playingActiveHeader: true
      }
    },
    created () {
      // get navigator path
      // let pathNow = this.$store.state.previousPath
      // this.underlineAction = pathNow.slice(1) ? parseFloat(pathNow.slice(1)) : '1'
      this.initialPage()
      window.addEventListener('click', e => {
        this.initialPage()
      })
    },
    beforeUpdate () {
      this.setSrollSecondtitle()
    },
    methods: {
      // 初始化
      initialPage () {
        // get category
        let urlCateg = 'http://localhost:8081/category'
        this.$http.get(urlCateg)
          .then(data => {
            this.categorys = data.data
          })
        this.setSrollSecondtitle()
        // 监听vuex数据是否进行更新
        this.$store.dispatch('getLocation')
        this.secondHeaderActiveFn(parseFloat(this.$route.params.id))
      },
      // 展开分类列表
      showitems () {
        let headerBottomShow = document.querySelectorAll('.header_bottom_show')[0]
        let headerBottomRow = document.querySelectorAll('.header_bottom_row')[0]
        let cover = document.querySelectorAll('.cover')[0]
        let count = 0
        // 控制高度
        this.showVal = !this.showVal
        for (let i = 0; i < headerBottomRow.childElementCount; i++) {
          count += (parseFloat(getComputedStyle(headerBottomRow.children[i]).marginLeft) + parseFloat(getComputedStyle(headerBottomRow.children[i]).marginRight) + headerBottomRow.children[i].offsetWidth)
        }
        headerBottomShow.style.height = Math.ceil(count / document.documentElement.clientWidth) * (headerBottomRow.children[0].offsetHeight + parseFloat(getComputedStyle(headerBottomRow.children[0]).marginBottom)) + headerBottomRow.children[0].offsetHeight + 'px'
        headerBottomRow.style.display = 'none'
        cover.style.display = 'block'
      },
      // 隐藏列表
      hiddenitems () {
        let headerBottomShow = document.querySelectorAll('.header_bottom_show')[0]
        let headerBottomRow = document.querySelectorAll('.header_bottom_row')[0]
        let cover = document.querySelectorAll('.cover')[0]
        this.showVal = !this.showVal
        headerBottomShow.style.height = '0px'
        headerBottomRow.style.display = 'block'
        cover.style.display = 'none'
      },
      // 点击激活分类的下划线，路由跳转
      activeCategory (num) {
        // 展示激活的元素
        this.underlineAction = num
        // 关闭展开列表
        let headerBottomRow = document.querySelectorAll('.header_bottom_row')[0]
        this.hiddenitems()
        this.showVal = true
        // 将横向滚动列表的激活对象进行窗口显示
        headerBottomRow.scrollLeft = headerBottomRow.children[num - 1].offsetLeft + headerBottomRow.children[num - 1].offsetWidth / 2 - headerBottomRow.offsetWidth / 2
      },
      // 点击cover时，关闭cover，并收起展开列表
      hiddenCover () {
        if (document.querySelectorAll('.cover')[0].style.display !== 'none') this.hiddenitems()
      },
      // 设置滚动标题时，是否进行跟随touch移动一点距离
      setSrollSecondtitle () {
        let pathNow = this.$store.state.locationAtPresent
        this.underlineAction = parseFloat(pathNow) || 1
        this.showFirstHear = pathNow ? pathNow.indexOf('ranking') === -1 : true
        this.playingActiveHeader = pathNow ? pathNow.indexOf('player') === -1 : true
        let secondHeaderBottomItems = document.querySelectorAll('.second_header_bottom>ul>li')
        if (!secondHeaderBottomItems) return
        for (let i = 0; i < secondHeaderBottomItems.length; i++) {
          secondHeaderBottomItems[i].addEventListener('touchstart', e => {
            let startLocation = e.touches[0].pageX
            secondHeaderBottomItems[i].addEventListener('touchmove', e => {
              if (secondHeaderBottomItems[i].scrollLeft === 0 && e.touches[0].pageX - startLocation > 0 && e.touches[0].pageX - startLocation <= 0.5 * document.documentElement.clientWidth) {
                secondHeaderBottomItems[i].style.textIndent = `${e.touches[0].pageX / document.documentElement.clientWidth * 1.6}rem`
              }
            })
            secondHeaderBottomItems[i].addEventListener('touchend', e => {
              secondHeaderBottomItems[i].style.textIndent = '0rem'
            })
          })
        }
        // 监听vuex数据是否进行更新
        this.$store.dispatch('getLocation')
        this.secondHeaderActiveFn(parseFloat(this.$route.params.id))
      },
      // showing second-header-active at somewhere
      secondHeaderActiveFn (num) {
        let specialActive = document.querySelectorAll('.router_active')[0]
        if (specialActive) {
          specialActive.scrollLeft = document.body.offsetWidth / 4
        }
        this.secondHeaderActive = num
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "../../assets/less/style.less";
  #container{
    width: 100%;
    .cover{
      position: absolute;
      top: 3.79733rem;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.1);
      z-index: 5;
      display: none;
    }
    .first-header{
      width: 100%;
    }
    .second-header{
      width: 100%;
      background-color: white;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 6;
    }
  }
  /* first-header */
  #header{
    width: 100%;
    height: 3.79733rem;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 6;
  }
  .header_top{
    width: 100%;
    height: 1.32267rem;
    padding: 0.27733rem 0;
    position: relative;
    .header_top_logo{
      display: inline-block;
      width: 2.64533rem;
      margin-left: .77867rem;
      height: 100%;
      tab-heightlight: none;
      img{
        width: 100%;
      }
    }
    .header_top_search{
      position: absolute;
      display: block;
      width: .896rem;
      height: .896rem;
      right: 42%;
      top: .4rem;
      fill: #aaa;
    }
    .header_top_user{
      position: absolute;
      width: 1.024rem;
      height: 1.024rem;
      right: 30.13%;
      top: .5rem;
      img{
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .header_top_client{
      position: absolute;
      right: 0.27733rem;
      top: .4rem;
      font-size: .55467rem;
      line-height: 1.06667rem;
      text-align: center;
      color: #fff;
      background-color: @main-color;
      border-radius: .2rem;
      text-decoration: none;
      &:before,
      &:after{
        content: '';
        padding: .2rem;
      };
    }
  }
  .header_bottom{
    width: 100%;
    padding-top: .256rem;
    position: relative;
    z-index: 8;
    ul.header_bottom_show{
      position: absolute;
      top: .256rem;
      left: 0;
      width: 16rem;
      height: 0;
      background-color: white;
      margin: 0;
      padding-left: 0.42667rem;
      overflow: auto;
      white-space: pre-wrap;
      transition: height .3s;
      li{
        margin-left: .49733rem;
        margin-right: .49733rem;
      }
      li.header_bottom_close{
        width: 87%;
        text-align: center;
        fill: #555;
        padding: 0;
        svg{
          width: .5rem;
          height: .5rem;
        }
      }
    }
    ul{
      width: 14rem;
      background-color: white;
      margin: 0;
      padding-left: 0.42667rem;
      overflow: scroll;
      white-space: nowrap;
      li{
        display: inline-block;
        padding: .256rem .1rem;
        list-style: none;
        margin-left: .59733rem;
        margin-right: .59733rem;
        margin-bottom: .256rem;
        color: @main-text-color;
      }
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      } 
    }
    .router_active{
      color: #fb7299;
      padding-bottom: .3rem;
      border-bottom: .08533rem solid #fb7299;
      margin-bottom: -0.08533rem;
    }
    span{
      position: absolute;
      top: 0;
      right: 0;
      width: .88667rem;
      height: 1.62133rem;
      padding: 0 .343335rem;
      line-height: 1.62133rem;
      svg{
        width: .5rem;
        height: .5rem;
      }
    }
    .to_direct{
      color: #757575;
      text-decoration: none;
    }
  }
  /* second-header */
  .second_header_top{
    width: 100%;
    height: 1.32267rem;
    padding: .27733rem 0;
    text-align: center;
    color: @main-color;
    font-size: .68267rem;
    line-height: 1.32267rem;
    position: relative;
    .second_header_top_back{
      position: absolute;
      width: 1.536rem;
      left: .42667rem;
      top: 50%;
      transform: translateY(-50%);
      img{
        width: 25%;
        height: 56%;
      }
    }
    .second_header_top_client{
      width: 3.41333rem;
      height: 1.28rem;
      position: absolute;
      top: 50%;
      right: .55467rem;
      transform: translateY(-50%);
      line-height: 1.28rem;
      text-align: center;
      border: .04267rem solid #fb7299;
      border-radius: .17067rem;
      font-size: @main-font-size;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .second_header_bottom{
    width: 100%;
    margin-bottom: .21333rem;
    ul{
      height: 1.408rem;
      margin: 0;
      padding-left: .512rem;
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      li{
        display: inline-block;
        margin-right: 1.49333rem;
        line-height: 1.408rem;
        text-align: center;
        color: hsla(0,0%,46%,.8);
        list-style: none;
      }
      .router_active{
        color: #fb7299;
      }
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      } 
    }
  }
</style>
