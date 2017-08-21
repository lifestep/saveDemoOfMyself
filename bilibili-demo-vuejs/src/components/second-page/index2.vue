<template>
  <div id="second-page" @touchmove="judgeScroll()">
    <div class="second_pagep_title">
      <ul>
        <li>推荐</li>
        <li v-for="(item, index) in category">{{item.child_title}}</li>
      </ul>
    </div>
    <div class="content">
    <!-- 首页 -->
      <div class="content_per_container">
        <div class="content_per_container_header">
          <span class="content_title">热门推荐</span>
          <div class="content_more">
            <span class="content_more_icon">
              <img :src="icons.ranking">
            </span>
            <span class="content_more_rank">排行榜</span>
            <span class="content_more_icon_arrow">
              <img :src="icons.arrow">
            </span>
          </div>
        </div>
        <div class="content_per_container_body">
          <ul>
            <li v-for="(itemH, indexH) in suggest">
              <dl>
                <dt>
                  <a href="###">
                    <img class="centent_bg" :src="icons.bgimage">
                    <img :src="itemH.img">
                  </a>
                  <span class="players">
                    &nbsp;&nbsp;
                    <i>
                      <img :src="icons.play_count">
                    </i>
                    {{itemH.play_count}}
                  </span>
                  <span class="reviews">
                    <i>
                      <img :src="icons.review">
                    </i>
                    {{itemH.review}}
                    &nbsp;&nbsp;
                  </span>
                </dt>
                <dd>{{itemH.discribe}}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
      <!-- 次页 -->
      <div class="content_per_container" v-for="(item, index) in category">
        <div class="content_per_container_header">
          <span class="content_title">{{item.child_title}}</span>
          <div class="content_more">
            <router-link tag="span" to='/'>查看更多</router-link>
            <span class="content_more_icon_arrow">
              <img :src="icons.arrow">
            </span>
          </div>
        </div>
        <div class="content_per_container_body">
          <ul>
            <li v-for="(itemS, indexS) in classify[index]">
              <dl>
                <dt>
                  <a href="###">
                    <img class="centent_bg" :src="icons.bgimage">
                    <img :src="itemS.img">
                  </a>
                  <span class="players">
                    &nbsp;&nbsp;
                    <i>
                      <img :src="icons.play_count">
                    </i>
                    {{itemS.play_count}}
                  </span>
                  <span class="reviews">
                    <i>
                      <img :src="icons.review">
                    </i>
                    {{itemS.review}}
                    &nbsp;&nbsp;
                  </span>
                </dt>
                <dd>{{itemS.discribe}}</dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    id: 'second-page',
    data () {
      return {
        // 显示推荐
        suggest: [],
        // 显示种类
        category: [],
        // 显示子类别
        classify: [],
        // show icons
        icons: {},
        // 显示当前页 路径
        nowPage: ''
      }
    },
    created () {
      // console.log(this.$route.params.id)
      this.watchForWindow()
      document.body.addEventListener('click', e => {
        this.watchForWindow()
        document.body.scrollTop = 0
      })
      window.addEventListener('scroll', e => {
        this.judgeScroll()
      })
    },
    methods: {
      // 检测地址栏变化，动态改变网页
      watchForWindow () {
        // get navigator path
        /* let pathNow = this.$store.state.previousPath
        this.nowPage = pathNow.slice(1) ? parseFloat(pathNow.slice(1)) : '1' */
        // 分类数据
        let urlCategory = 'http://localhost:8081/category/' + this.$route.params.id
         this.$http.get(urlCategory)
          .then(data => {
            console.log(data.data.classify_all)
            this.category = data.data.classify_all
            this.rankingData(data.data.classify_all)
            /* this.category = data.data[this.nowPage].classify_all
            this.rankingData(data.data[this.nowPage].classify_all) */
          }) 
          // show icons
        let urlIcon = 'http://localhost:8081/icons'
        this.$http.get(urlIcon)
          .then(data => {
            this.icons = data.data
          })
        history.onchange = () => {
          console.log('a')
          this.pathNow = this.$router.app._route.fullPath
        }
      },
      // 设定内容子菜单的自动隐藏
      judgeScroll () {
        let bodySecond = document.body
        let secondPagepTitle = document.querySelectorAll('.second_pagep_title')[0]
        let scrollStart = bodySecond.scrollTop
        setTimeout(() => {
          if (bodySecond.scrollTop > secondPagepTitle.offsetHeight) {
            secondPagepTitle.style.top =
            bodySecond.scrollTop - scrollStart > 0 ? '0rem' : bodySecond.scrollTop - scrollStart < 0 ? '3.79733rem' : secondPagepTitle.style.top
          } else {
            secondPagepTitle.style.top = '3.79733rem'
          }
        }, 300)
      },
      // 添加每一个子类别的排行头4个
      rankingData (data) {
        // 将每一分类进行遍历，并把所有的元素添加到arr
        let arr = []
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].classify.length; j++) {
            arr.push(data[i].classify[j])
          }
          // 将arr进行排序: 排行方法 以100为基础，点评的分数比例是40，播放的分数比例是60
          arr.sort((a, b) => {
            return (a.review / 100 * 40 + a.play_count / 100 * 60) > (b.review / 100 * 40 + b.play_count / 100 * 60) ? -1 : 1
          })
          // 将arr的头4个添加给对应的分类显示
          this.classify[i] = arr.length > 4 ? arr.slice(0, 4) : arr
          // 将arr归空，以便下一次的操作
          arr = []
        }
        // 显示推荐列表
        let arrHeader = []
        for (let i = 0; i < this.classify.length; i++) {
          for (let j = 0; j < this.classify[i].length; j++) {
            arrHeader.push(this.classify[i][j])
          }
        }
        // 将arr进行排序: 排行方法 以100为基础，点评的分数比例是40，播放的分数比例是60
        arrHeader.sort((a, b) => {
          return (a.review / 100 * 40 + a.play_count / 100 * 60) > (b.review / 100 * 40 + b.play_count / 100 * 60) ? -1 : 1
        })
        this.suggest = arrHeader.slice(0, 4)
        arrHeader = []
      }
    }
  }
</script>

<style lang='less' scoped>
  @import url('../../assets/less/style.less');
  #second-page {
    width: 100%;
    margin-top: 5.67466rem;
    .second_pagep_title{
      position: fixed;
      top: 3.79733rem;
      left: 0;
      width: 100%;
      height: 1.856rem;
      border-bottom: .02133rem solid #ccc;
      z-index: 4;
      transition: 0.5s;
      ul{
        height: 100%;
        margin: 0;
        padding: 0;
        padding-left: .896rem;
        background-color: #F9F9F9;
        overflow-y: hidden;
        overflow-x: scroll;
        white-space: nowrap;
        &::-webkit-scrollbar {
          width: 0;
          height: 0;
        } 
        li{
          display: inline-block;
          list-style: none;
          margin-right: 1.024rem;
          height: 1.87733rem;
          line-height: 1.87733rem;
          color: @main-text-color;
        }
      }
    }
    .content{
      width: 100%;
      .content_per_container{
        width: 15.488rem;
        padding: 0 .256rem;
        padding-top: .95573rem;
      }
      .content_title{
        display: inline-block;
        width: 50%;
        font-size: .68267rem;
        vertical-align: top;
        padding-left: .1rem;
        margin-left: .216rem;
        .no-wrap();
      }
      .content_more{
        float: right;
        padding-right: .256rem;
        fill: #aaa;
        color: #aaa;
        .content_more_icon{
          display: inline-block;
          width: 1.19467rem;
          height: .95573rem;
          fill: orange;
          img{
            width: 100%;
            height: 100%;
            vertical-align: middle;
          }
        }
        .content_more_icon_arrow{
          display: inline-block;
          width: .5rem;
          height: .5rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .content_more_rank{
          color: orange;
        }
      }
      .content_per_container_body{
        margin-top: .68267rem;
        ul{
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          li{
            float: left;
            width: 50%;
            list-style: none;
            dl{
              margin: 0;
              display: block;
              padding: 0 .256rem;
              padding-bottom: .68267rem;
              dt{
                width: 100%;
                height: 4.52267rem;
                position: relative;
                border-radius: .256rem;
                overflow: hidden;
                a{
                  width: 100%;
                  height: 100%;
                  display: block;
                  img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                  }
                  img.centent_bg{
                    width: 4.52267rem;
                    height: 4.52267rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                  }
                }
                span{
                  width: 50.15%;
                  position: absolute;
                  bottom: 0;
                  padding-bottom: .256rem;
                  font-size: .46933rem;
                  color: white;
                  background: linear-gradient(180deg,rgba(33,33,33,0), rgba(33,33,33,0.1) 5%, rgba(100,100,100,.5));
                  fill: white;
                  i{
                    display: inline-block;
                    width: .46933rem;
                    height: .46933rem;
                    padding-right: .1rem;
                    img{
                      width: 100%;
                      height: 100%;
                      vertical-align: middle;
                    }
                  }
                }
                span.players{
                  text-align: left;
                  .no-wrap();
                }
                span.reviews{
                  right: 0;
                  text-align: right;
                  .no-wrap();
                }
              }
              dd{
                margin: .21333rem auto 0;
                height: 1.36533rem;
                padding: 0 .256rem;
                overflow: hidden;
              }
            }
          }
        }
      }
    }
  }
</style>

