import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index-page'
import SecondPage from '@/components/second-page'

Vue.use(Router)

// let addRoute = () => {
  // 分类数据
  // let allRouter = 
 /* let urlCategory = 'http://localhost:8081/category'
  $http.get(urlCategory)
    .then(data => {
      let eleCount = data.data
      for (let i = 2; i < eleCount.length + 2; i++) {
        let obj = {
          path: '/' + i,
          component: SecondPage
        }
        allRouter.push(obj)
      }
      console.log(allRouter)
      return allRouter
    }) */
// }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      component: SecondPage
    },
    {
      path: '/',
      component: Index
    }
  ]
})
