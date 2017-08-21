<template>
  <div id="player">
    <div class="player_header">
      <router-link class="player_header_logo" tag="div" to="/">
        <img src="../../assets/images/logo.png">
      </router-link>
      <div class="player_header_search">
        <a href="javascript:;">
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
        <input type="text" name="searching" placeholder="搜索视频 番剧 UP主">
      </div>
      <div class="player_header_download">
        下载客户端
      </div>
    </div>
    <div class="player_content">
      <div class="player_window">
        <video id="playing" poster="../../../static/datas/movies/test.gif" controls>
          <source src="../../../static/datas/movies/test.mp4" type="video/mp4">
          Your browser does not support video.
        </video>
        <i v-if="playerData.favorites" @click="collection()">
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20.188 19.445" enable-background="new 0 0 20.188 19.445" xml:space="preserve" fill="red">
            <path d="M12.082,3.999c0.022,0.18,0.041,0.336,2.645,0.336c0.955,0,1.835-0.023,1.844-0.023l0.569-0.016l0.061-0.02
            c0,0,1.029-0.771,0-2.058c0.857-1.973-0.343-2.06-0.343-2.06c-2.313-0.599-4.802,0.687-4.802,0.687v3.087
            c0.011-0.004,0.023-0.007,0.036-0.013C12.084,3.945,12.08,3.972,12.082,3.999z M12.782,3.929c0.46-0.11,0.925-0.165,1.385-0.165
            c0.657,0,1.207,0.115,1.604,0.237c-0.304,0.004-0.668,0.009-1.045,0.009c-1.101,0-1.692-0.03-2.008-0.063
            C12.737,3.94,12.759,3.936,12.782,3.929z M10.198,0.875h1.257v3.004h-1.257V0.875z M4.509,4.386l0.022,0.001
            c0,0,1.651-0.058,2.708-0.058c2.396,0,2.415-0.15,2.435-0.322c0.005-0.042-0.003-0.078-0.02-0.11V0.846c0,0-2.487-1.285-4.802-0.687
            c0,0-1.201,0.087-0.344,2.06C3.48,3.505,4.509,4.386,4.509,4.386z M7.561,3.77c0.473,0,0.952,0.057,1.419,0.17
            c0.013,0.004,0.027,0.007,0.042,0.01c-0.3,0.028-0.835,0.055-1.782,0.055c-0.454,0-0.906-0.008-1.274-0.014
            C6.366,3.875,6.913,3.77,7.561,3.77z M5.567,6.124c0,0,0.028,0.993,1.778,1.366c1.752,0.372,1.683,0.766,1.843,2.134
            c0,0,1.34-2.584,0.818-5.688C10.007,3.937,7.505,6.354,5.567,6.124z M14.305,7.49c1.751-0.373,1.779-1.366,1.779-1.366
            c-1.938,0.23-4.438-2.188-4.438-2.188c-0.521,3.104,0.817,5.688,0.817,5.688C12.625,8.256,12.556,7.862,14.305,7.49z M9.738,9.911
            c0.056-0.112,0.355-0.73,0.614-1.681C10.148,8.772,9.941,9.334,9.738,9.911z M4.851,6.146l-0.02-0.769l0.763,0.091
            c0.21,0.026,0.434,0.001,0.662-0.046c0.052-0.145,0.1-0.282,0.149-0.418c-0.918,0.016-1.89,0.05-1.904,0.05L4.48,5.056l-0.277-0.01
            L4.024,4.894c-0.558-0.477-1.047-1.57-0.316-2.759c-0.14-0.39-0.21-0.741-0.217-1.059C2.37,1.401,1.519,1.945,0.92,2.729
            c-0.831,1.093-1.102,2.589-0.8,4.448c0.3,1.825,1.844,4.097,3.602,6.173c0.537-1.97,1.208-4.07,1.841-5.933
            C5.049,6.983,4.861,6.48,4.851,6.146z M19.27,2.729c-0.332-0.435-0.745-0.794-1.233-1.086C18,1.799,17.96,1.961,17.897,2.132
            c0.298,0.476,0.417,0.955,0.356,1.431c-0.021,0.156-0.111,0.425-0.111,0.425l-0.396,0.638c0,0-0.18,0.171-0.201,0.188l-0.09,0.067
            l-0.35,0.083L16.537,4.98c-0.164,0.005-0.981,0.023-1.863,0.023c-0.18,0-0.349,0-0.513-0.001c0.607,0.32,1.244,0.538,1.79,0.468
            l0.766-0.091l-0.022,0.769c-0.015,0.563-0.517,1.617-2.303,1.998C13.22,8.394,13.22,8.394,13.1,9.455l-0.285,2.398l-0.993-1.921
            c-0.031-0.056-0.393-0.775-0.676-1.894c-1.26,3.312-2.553,7.252-2.887,10.016c0.728,0.678,1.228,1.11,1.309,1.182
            c0.163,0.14,0.363,0.209,0.562,0.209c0.202,0,0.404-0.072,0.567-0.212c0.352-0.307,8.636-7.547,9.369-12.059
            C20.371,5.32,20.104,3.823,19.27,2.729z M9.727,9.933l-0.995,1.919L8.448,9.455c-0.12-1.062-0.12-1.062-1.292-1.311
            c-0.405-0.086-0.737-0.211-1.02-0.353c-0.712,2.114-1.384,4.264-1.891,6.166c1.198,1.361,2.443,2.608,3.432,3.549
            c0.319-2.28,1.165-5.069,2.061-7.596C9.733,9.919,9.728,9.931,9.727,9.933z"/>
          </svg>
        </i>
        <i v-if="!(playerData.favorites)" @click="collection()">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 96 96" enable-background="new 0 0 96 96" xml:space="preserve" fill="white">
          <path d="M48,17.282C30.371-2.757,0.93,12.771,0.93,35.524c0,25.761,45.442,51.499,47.031,52.392v0.043c0,0,0.032-0.018,0.039-0.021
            c0.008,0.004,0.039,0.021,0.039,0.021v-0.043c1.589-0.893,47.031-26.631,47.031-52.392C95.07,12.771,65.629-2.757,48,17.282z
             M44.178,71.013l2.73-19.758h-9.553l13.783-26.268l-2.729,18.987h10.235L44.178,71.013z"/>
          </svg>
        </i>
      </div>
      <p>{{playerData.discribe}}</p>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    data () {
      return {
        showCover: true,
        playerData: this.$store.state.toPlaying
      }
    },
    created () {
      window.addEventListener('scroll', e => {
        this.slidePlayerHeader()
      })
    },
    beforeCreate () {
      this.playerData = this.$store.state.toPlaying
    },
    methods: {
      slidePlayerHeader () {
        let playerHeader = document.querySelectorAll('.player_header')[0]
        let playerWindow = document.querySelectorAll('.player_window')[0]
        let playerContent = document.querySelectorAll('.player_content')[0]
        if (playerHeader && playerWindow && playerContent) {
          if (document.body.scrollTop <= playerWindow.offsetHeight + parseFloat(getComputedStyle(playerContent).paddingTop)) {
            playerHeader.style.top = `-${document.body.scrollTop}`
          } else {
            playerHeader.style.top = 0
          }
        }
      },
      collection () {
        this.playerData.favorites = !this.playerData.favorites
        // 分类数据
        let urlCategory = 'http://localhost:8081/category'
        this.$http.get(urlCategory)
          .then(data => {
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].classify_all.length; j++) {
                for (let m = 0; m < data[i].classify_all[j].classify.length; m++) {
                  if (data[i].classify_all[j].classify[m] === this.playerData) {
                    data[i].classify_all[j].classify[m].favorites = this.playerData.favorites
                  }
                }
              }
            }
            this.$http.put('http://localhost:8081/category', data)
          })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url('../../assets/less/style.less');
  #player{
    width: 100%;
    .player_header{
      width: 100%;
      height: 1.19467rem;
      padding: .256rem 0;
      z-index: 99;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fff;
      .player_header_logo{
        width: 2.64533rem;
        height: 1.19467rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: .768rem;
        margin: auto;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .player_header_download{
        width: 3.41333rem;
        height: 1.28rem;
        position: absolute;
        top: 0;
        bottom: 0;
        right: .512rem;
        margin: auto;
        border-radius: .128rem;
        background-color: @main-color;
        color: #fff;
        line-height: 1.28rem;
        font-size: .55467rem;
        text-align: center;
      }
      .player_header_search{
        position: relative;
        width: 6.82667rem;
        height: 1.19467rem;
        margin: 0 auto;
        a{
          position: absolute;
          width: .64rem;
          height: .64rem;
          top: .27733rem;
          left: .42667rem;
          fill: #aaa;
        }
        input{
          width: 100%;
          height: 100%;
          padding-left: 1.28rem;
          padding-right: .59733rem;
          box-sizing: border-box;
          font-size: .46933rem;
          border-radius: .59733rem;
          background-color: #f0f0f0;
          border: none;
          outline: none;
        }
      }
    }
    .player_content{
      width: 100%;
      height: 10000px;
      padding-top: 1.70667rem;
      .player_window{
        width: 100%;
        height: 10rem;
        position: relative;
        video{
          width: 100%;
          height: 100%;
        }
        i{
          display: block;
          position: absolute;
          bottom: 1rem;
          right: 0.5rem;
          width: 1rem;
          height: 1rem;
          svg{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
