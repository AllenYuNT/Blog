// import Vue from 'vue'

import router from './router'
import filters from './filters'

export default {
  install(Vue) {
    Vue.use(filters)
  },
  router
}