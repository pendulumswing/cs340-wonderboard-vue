import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import boards from './boards'
import boardUsers from './boardUsers'
import lists from './lists'
import tasks from './tasks'
import taskUsers from './taskUsers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    users,
    boards,
    boardUsers,
    lists,
    tasks,
    taskUsers
  }
})
