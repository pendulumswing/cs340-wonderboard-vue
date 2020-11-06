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
    colors: [
      { name: 'Red', color: 'red lighten-3' },
      { name: 'Blue', color: 'blue lighten-3' },
      { name: 'Green', color: 'green lighten-3' },
      { name: 'Orange', color: 'orange lighten-3' },
      { name: 'Purple', color: 'purple lighten-3' },
      { name: 'Yellow', color: 'yellow lighten-3' },
      { name: 'Grey', color: 'grey lighten-3' },
      { name: 'White', color: 'white' },
      { name: 'Dark Blue', color: 'blue' },
    ]
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
