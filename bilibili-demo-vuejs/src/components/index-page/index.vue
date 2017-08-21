<template>
  <div id="index_page">
    <div class="slide_wall">
      <mt-swipe :auto="5000">
        <mt-swipe-item v-for="(item, index) in slideImgs.data" key="{{item}}">
          <img :src="'//' + item.pic.slice(7) + '@750w_235h.webp'" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="content">
    <!-- 首页 -->
      <div class="content_per_container">
        <div class="content_per_container_header">
          <span class="content_icon">
            <img :src="icons.classify_icon[0]">
          </span><span class="content_title">热门推荐</span>
          <div class="content_more">
            <span class="content_more_icon">
              <img :src="icons.ranking">
            </span>
            <router-link class="content_more_rank" tag="span" to="/ranking/0">排行榜</router-link>
            <span class="content_more_icon_arrow">
              <img :src="icons.arrow">
            </span>
          </div>
        </div>
        <div class="content_per_container_body">
          <ul>
            <router-link v-for="(itemH, indexH) in suggest" key="{{itemH}}" to="/player" @click.native="playingThis(itemH)" tag="li">
              <dl>
                <dt>
                  <a href="javascript:;">
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
            </router-link>
          </ul>
        </div>
      </div>
      <!-- 次页 -->
      <div class="content_per_container" v-for="(item, index) in category">
        <div class="content_per_container_header">
          <span class="content_icon">
            <img :src="icons.classify_icon[index + 1]">
          </span>
          <span class="content_title">{{item.title}}</span>
          <div class="content_more">
            <router-link :to="'/' + (index + 2)" tag="span">查看更多</router-link>
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
// 设置轮播图
  import Vue from 'vue'
  import { Swipe, SwipeItem } from 'mint-ui'
  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  export default {
    id: 'index_page',
    data () {
      return {
        // 显示首页轮播图
        slideImgs: [],
        // 显示推荐
        suggest: [],
        // 显示种类
        category: [],
        // 显示子类别
        classify: [],
        // show icons
        icons: {}
      }
    },
    created () {
      // 轮播图数据
      // let urlSlide = 'http://localhost:8081/firstPageSlide'
      // this.$http.get(urlSlide)
      //   .then(data => {
      //     this.slideImgs = data.data
      //   })
      let urlSlide = '/api/x/web-show/res/loc?jsonp=jsonp&pf=7&id=1695'
      this.$http.get(urlSlide)
        .then(data => {
          this.slideImgs = data.data
        })
      // 分类数据
      let urlCategory = 'http://localhost:8081/category'
      this.$http.get(urlCategory)
        .then(data => {
          this.category = data.data
          this.rankingData(data.data)
        })
        // show icons
      let urlIcon = 'http://localhost:8081/icons'
      this.$http.get(urlIcon)
        .then(data => {
          this.icons = data.data
        })
    },
    methods: {
      // 添加每一个子类别的排行头4个
      rankingData (data) {
        // 将每一分类进行遍历，并把所有的元素添加到arr
        let arr = []
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].classify_all.length; j++) {
            for (let m = 0; m < data[i].classify_all[j].classify.length; m++) {
              arr.push(data[i].classify_all[j].classify[m])
            }
          }
          // 将arr进行排序: 排行方法 以100为基础，点评的分数比例是40，播放的分数比例是60
          arr.sort((a, b) => {
            return (a.review / 100 * 40 + a.play_count / 100 * 60) > (b.review / 100 * 40 + b.play_count / 100 * 60) ? -1 : 1
          })
          // 将arr的头4个添加给对应的分类显示
          this.classify[i] = arr.slice(0, 4)
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
      },
      playingThis (data) {
        this.$store.dispatch('getPlaying', data)
      }
    }
  }
</script>

<style lang='less' scoped>
  @import url('../../assets/less/style.less');
  #index_page {
    width: 100%;
    margin-top: 3.79733rem;
    .slide_wall{
      width: 100%;
      height: 4.69333rem;
      margin-bottom: .68267rem;
      img {
        width: 100%;
        height: 100%;
      }
      .mint-swipe .mint-swipe-indicators{
        height: 0.4rem;
        bottom: 0.2rem;
        padding: 0 0.3rem;
        border-radius: 0.21333rem;
        background-color: rgba(0, 0, 0, 0.2);
        .mint-swipe-indicator {
          opacity: 0.5;
          margin-bottom: .3rem;
        }
      }
    }
    .content{
      width: 100%;
      .content_per_container{
        width: 15.488rem;
        padding: 0 .256rem;
      }
      .content_icon{
        display: inline-block;
        width: 1.19467rem;
        height: .95573rem;
        padding-left: .256rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .content_title{
        display: inline-block;
        width: 50%;
        font-size: .68267rem;
        vertical-align: top;
        padding-left: .1rem;
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
