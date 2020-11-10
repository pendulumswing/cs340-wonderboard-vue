import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home/Layout'
import Api from './pages/api/Layout'
import User from './pages/user/Layout'
import Board from './pages/user-board/Layout'
import Dev from './pages/dev/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/api', name: 'api', component: Api },
    { path: '/users/:userId', name: 'users', component: User },
    { path: '/users/:userId/boards/:boardId', name: 'board', component: Board },
    { path: '/dev', name: 'dev', component: Dev }
  ]
})
