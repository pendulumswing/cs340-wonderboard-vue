import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Api from './views/Api.vue'
import Jason from './views/Jason.vue'
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
      path: '/users/Jason',
      name: 'users',
      component: Jason
    },
    {
      path: '/users/Jason/boards/Project1',
      name: 'project1',
      component: Project
    },
  ]
})
