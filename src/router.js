import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Api from './views/Api.vue'
import User from './views/User.vue'
import Project from './views/Project'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/api',
      name: 'api',
      component: Api
    },
    {
      path: '/users/User',
      name: 'users',
      component: User
    },
    {
      path: '/users/User/boards/Project',
      name: 'project',
      component: Project
    },
  ]
})
