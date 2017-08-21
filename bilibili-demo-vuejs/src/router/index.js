import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index-page'
import SecondPage from '@/components/second-page'
import Ranking from '@/components/ranking'
import Player from '@/components/player'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/player',
      component: Player
    },
    {
      path: '/ranking/:id',
      component: Ranking
    },
    {
      path: '/:id',
      component: SecondPage
    }
  ]
})
