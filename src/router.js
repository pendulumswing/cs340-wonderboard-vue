import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Api from './views/Api.vue'
// import User from './views/User.vue'
import User from './views/user/Layout'
import Project from './views/Project'
import Board from './views/user-board/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/api', name: 'api', component: Api },
    // { path: '/users/User', name: 'users', component: User },
    { path: '/users/:userId', name: 'users', component: User },
    { path: '/users/User/boards/Project', name: 'project', component: Project },
    { path: '/users/:userId/boards/:boardId', name: 'board', component: Board },
  ]
})
