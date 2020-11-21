import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './filters'

axios.defaults.baseURL = '/api/'
// axios.defaults.headers.common['Authorization'] = 'password_key'
axios.defaults.headers.get['Accepts'] = 'application/json'

// Request Interceptor
axios.interceptors.request.use(config => {
  // console.log('Request Interceptor', config)
  // config.headers['Authorization'] = 'Fake Token'
  return config
})

// Response Interceptor to handle and log errors
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Handle Error
  console.log('Response Interceptor', error)
  return Promise.reject(error)
})

// let $axios = axios.defaults ({
//   baseURL: '/api/',
//   timeout: 5000,
//   headers: { 'Content-Type': 'application/json' }
// })

Vue.config.productionTip = false
// Vue.use(Vuetify) //Add any theme modifications here

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
