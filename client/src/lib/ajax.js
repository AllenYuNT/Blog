// import Vue from 'vue'
// import axios from 'axios'
// 创建一个axios实例
const ajax = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://119.23.74.116:8088' : 'http://localhost:8088',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 25000 // 请求超时时间
})
// 注册请求拦截器
ajax.interceptors.request.use(config => {
  if (window.sessionStorage && window.localStorage) {
    if (sessionStorage.token || localStorage.token) {
      config.headers['Authorization'] = sessionStorage.token || localStorage.token
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})
// 注册响应拦截器
ajax.interceptors.response.use(response => {
  let res = response.data
  if (response.status === 200) {
    return Promise.resolve(res)
  } else {
    alert(res.errMsg)
    return Promise.resolve()
  }
}, err => {
  return Promise.reject(err)
})

export default {
  install(Vue) {
    Vue.prototype.$ajax = ajax
  },
  ajax
}