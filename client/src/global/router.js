// import Vue from 'vue'
// import Router from 'vue-router'
import index from '../views/index/router'
import edit from '../views/edit/router'
import pigeonhole from '../views/pigeonhole/router'
import test from '../views/test/router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect:'/index',
    },
    ...index,
    ...edit,
    ...pigeonhole,
    ...test
  ],
})