<template>
  <div id="index_page">
    <div class="content">
      <div class="content_per_container">
        <div class="content_per_container_body">
          <ul>
            <li v-for="(item, index) in rankingContent">
              <dl>
                <dt>
                  <var>
                    <img src="./images/rank1.png" v-show="index === 0">
                    <img src="./images/rank2.png" v-show="index === 1">
                    <img src="./images/rank3.png" v-show="index === 2">
                    <p v-show="index >2">{{index + 1}}</p>
                  </var>
                  <span>
                    <img class="centent_bg" :src="icons.bgimage">
                    <img v-lazy="item.img">
                  </span>
                </dt>
                <dd>
                  <div class="movie_discribe">
                    <p>
                      &nbsp;&nbsp;{{item.discribe}}
                    </p>
                  </div>
                  <p class="movie_author">
                    <img src="./images/ico_up.png">
                    &nbsp;
                    {{item.author.name}}
                  </p>
                  <span class="players">
                    <i>
                      <img src="./images/ico_play.png">
                    </i>
                    &nbsp;
                    {{item.play_count}}
                  </span>
                  <span class="reviews">
                    <i>
                      <img src="./images/ico_danmu.png">
                    </i>
                    &nbsp;
                    {{item.review}}
                  </span>
                </dd>
              </dl>
            </li>
            <li class="loading" v-show="!showLoading && dataOver">
              <div>
                <mt-spinner type="triple-bounce" :size="100" color="lightgreen"></mt-spinner>
              </div>
            </li>
            <li class="more_data" v-show="showLoading && dataOver">
              <div @click="showLoadingFn()">
                查看更多
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Lazyload, Spinner } from 'mint-ui'
  Vue.use(Lazyload)
  Vue.component(Spinner.name, Spinner)
  export default {
    id: 'index_page',
    data () {
      return {
        // 显示所有的数据
        categoryDataAll: [],
        // 显示图标
        icons: {},
        // 显示排行榜
        rankingContent: [],
        // 显示当前的地址id
        locationKey: 0,
        // 显示加载的数量
        dataCount: 20,
        // 显示是否加载
        showLoading: true,
        // 判断数据是否加载完成
        dataOver: true
      }
    },
    created () {
      this.locationKey = parseFloat(this.$route.params.id)
      // 分类数据
      let urlCategory = 'http://localhost:8081/category'
      this.$http.get(urlCategory)
        .then(data => {
          this.categoryDataAll = data.data
          this.rankingData(this.categoryDataAll)
        })
        // show icons
      let urlIcon = 'http://localhost:8081/icons'
      this.$http.get(urlIcon)
        .then(data => {
          this.icons = data.data
        })
      window.addEventListener('touchstart', e => {
        let nowLocationKey = parseFloat(this.$route.params.id)
        if (nowLocationKey !== this.locationKey) {
          this.locationKey = nowLocationKey
          document.body.scrollTop = 0
          this.dataCount = 20
          this.showLoading = true
          this.dataOver = true
          this.rankingData(this.categoryDataAll)
        }
      })
    },
    beforeUpdate () {
      let nowLocationKey = parseFloat(this.$route.params.id)
      if (nowLocationKey !== this.locationKey) {
        this.locationKey = nowLocationKey
        document.body.scrollTop = 0
        this.dataCount = 20
        this.showLoading = true
        this.dataOver = true
        this.rankingData(this.categoryDataAll)
      }
    },
    methods: {
      // 添加排行榜
      rankingData (data) {
        if (this.locationKey === 0) {
          // 将每一分类进行遍历，并把所有的元素添加到arr
          let arr = []
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].classify_all.length; j++) {
              for (let m = 0; m < data[i].classify_all[j].classify.length; m++) {
                arr.push(data[i].classify_all[j].classify[m])
              }
            }
          }
          // 将arr进行排序: 排行方法 以100为基础，点评的分数比例是40，播放的分数比例是60
          arr.sort((a, b) => {
            return (a.review / 100 * 40 + a.play_count / 100 * 60) > (b.review / 100 * 40 + b.play_count / 100 * 60) ? -1 : 1
          })
          this.rankingContent.length >= arr.length ? this.dataOver = false : this.dataOver = true
          this.rankingContent = arr.length > 20 ? arr.slice(0, this.dataCount) : arr
        } else if (this.locationKey > 0) {
          // 将每一分类进行遍历，并把所有的元素添加到arr
          let dataKey = this.locationKey - 1
          let arr = []
          for (let i = 0; i < data[dataKey].classify_all.length; i++) {
            for (let j = 0; j < data[dataKey].classify_all[i].classify.length; j++) {
              arr.push(data[dataKey].classify_all[i].classify[j])
            }
          }
          // 将arr进行排序: 排行方法 以100为基础，点评的分数比例是40，播放的分数比例是60
          arr.sort((a, b) => {
            return (a.review / 100 * 40 + a.play_count / 100 * 60) > (b.review / 100 * 40 + b.play_count / 100 * 60) ? -1 : 1
          })
          this.rankingContent.length >= arr.length ? this.dataOver = false : this.dataOver = true
          this.rankingContent = arr.length > 20 ? arr.slice(0, this.dataCount) : arr
        }
      },
      // 显示是否加载
      showLoadingFn () {
        this.showLoading = false
        this.dataCount += 10
        setTimeout(
          () => {
            this.showLoading = true
            this.rankingData(this.categoryDataAll)
            let nowScrollTop = document.body.scrollTop
            nowScrollTop !== 0 ? document.body.scrollTop = nowScrollTop : ''
          }, 2000)
      }
    }
  }
</script>

<style lang='less' scoped>
  @import url('../../assets/less/style.less');
  #index_page {
    width: 100%;
    margin-top: 3.79733rem;
    .content{
      width: 100%;
      .content_per_container{
        width: 100%;
      }
      .content_per_container_body{
        margin-top: .68267rem;
        ul{
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          li{
            width: 100%;
            height: 3.11467rem;
            list-style: none;
            dl{
              width: 100%;
              height: 100%;
              margin: .768rem 0 0;
              overflow: hidden;
              dt{
                width: 44.796875%;
                height: 100%;
                float: left;
                var{
                  width: 2.1755rem;
                  height: 100%;
                  float: left;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  font-style: normal;
                  color: #999;
                  img{
                    width: .81067rem;
                  }
                }
                span{
                  width: 4.992rem;
                  height: 100%;
                  float: right;
                  position: relative;
                  border-radius: .256rem;
                  overflow: hidden;
                  i{
                    float: left;
                    width: 2.176rem;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                      width: .81067rem;
                    }
                  }
                  img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                  }
                  img.centent_bg{
                    width: 100%;
                    height: 100%;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                  }
                }
              }
              dd{
                width: 7.8085rem;
                height: 100%;
                float: right;
                margin: 0 .512rem;
                padding: 0;
                position: relative;
                .movie_discribe{
                  height: 1.36534rem;
                  overflow: hidden;
                  p{
                    margin: 0;
                    height: 100%;
                    line-height: .68267rem;
                  }
                }
                .movie_author{
                  width: 100%;
                  height: 1.19467rem;
                  margin: 0;
                  line-height: 1.19467rem;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  color: #999;
                  img{
                    position: static;
                    width: .59733rem;
                    height: .46933rem;
                  }
                }
                span.players{
                  left: 0;
                  .no-wrap();
                }
                span.reviews{
                  right: 0;
                  .no-wrap();
                }
                span{
                  width: 50%;
                  position: absolute;
                  bottom: 0;
                  font-size: .512rem;
                  color: #999;
                  i{
                    display: inline-block;
                    width: .46933rem;
                    height: .46933rem;
                    padding-right: .1rem;
                    img{
                      width: .59733rem;
                      height: .46933rem;
                      vertical-align: middle;
                    }
                  }
                }
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
            }
          }
          .loading,
          .more_data{
            width: 100%;
            height: 1rem;
            line-height: 2rem;
            text-align: center;
            padding: 1rem;
          }
          .more_data div{
            width: 8rem;
            height: 1rem;
            line-height: 1rem;
            margin: 0 auto;
            border-radius: .5rem;
            background-color: pink;
            color: white;
          }
        }
      }
    }
  }
</style>
