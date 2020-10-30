import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'

import './filters'

Vue.config.productionTip = false
// Vue.use(Vuetify) //Add any theme modifications here

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
