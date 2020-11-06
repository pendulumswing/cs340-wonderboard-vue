import Vue from 'vue'
import Vuex from 'vuex'
import users from './users'
import boards from './boards'
import boardUsers from './board_users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [
      { id: 1, board: 1, name: 'To Do', index: 1, creator: 1, color: 'red lighten-3' },
      { id: 2, board: 1, name: 'In Process', index: 2, creator: 1, color: 'blue lighten-3' },
      { id: 3, board: 1, name: 'Completed', index: 3, creator: 1, color: 'green lighten-3' },
      { id: 4, board: 2, name: 'To Do', index: 1, creator: 1, color: 'orange lighten-3' },
      { id: 5, board: 2, name: 'In Process', index: 2, creator: 1, color: 'purple lighten-3' },
      { id: 6, board: 2, name: 'Completed', index: 3, creator: 2, color: 'blue lighten-3' },
      { id: 7, board: 3, name: 'To Do', index: 1, creator: 1, color: 'red lighten-3' },
      { id: 8, board: 3, name: 'In Process', index: 2, creator: 2, color: 'blue lighten-3' },
      { id: 9, board: 3, name: 'Completed', index: 3, creator: 2, color: 'green lighten-3' },
      { id: 10, board: 4, name: 'To Do', index: 1, creator: 2, color: 'orange lighten-3' },
      { id: 11, board: 4, name: 'In Process', index: 2, creator: 2, color: 'purple lighten-3' },
      { id: 12, board: 4, name: 'Completed', index: 3, creator: 2, color: 'blue lighten-3' },
    ],
    tasks: [
      { id: 1, list: 1, name: 'finish project', description: 'do some stuff', creator: 1 },
      { id: 3, list: 2, name: 'make front end', description: 'do some stuff', creator: 1 },
      { id: 6, list: 3, name: 'ERD diagram', description: 'do some stuff', creator: 1 },
      { id: 2, list: 4, name: 'Flask tutorials', description: 'do some stuff', creator: 1 },
      { id: 4, list: 5, name: 'work on routes', description: 'do some stuff', creator: 1 },
      { id: 5, list: 6, name: 'Deploy to Heroku', description: 'do some stuff', creator: 1 },
      { id: 7, list: 9, name: 'Mess things up', description: 'do some stuff', creator: 2 },
      { id: 8, list: 7, name: 'build back-end', description: 'do some stuff', creator: 2 },
      { id: 9, list: 8, name: 'submit project step 3', description: 'do some stuff', creator: 2 },
      { id: 10, list: 11, name: 'Vue tutorials', description: 'do some stuff', creator: 2 },
      { id: 11, list: 12, name: 'review project step 2', description: 'do some stuff', creator: 2 },
      { id: 12, list: 12, name: 'connect web app to server', description: 'do some stuff', creator: 2 },
    ],
    task_users: [
      { id: 1, user: 1, task: 1 },
      { id: 1, user: 1, task: 2 },
      { id: 1, user: 1, task: 3 },
      { id: 1, user: 1, task: 4 },
      { id: 1, user: 2, task: 4 },
      { id: 1, user: 1, task: 5 },
      { id: 1, user: 2, task: 5 },
      { id: 1, user: 1, task: 6 },
      { id: 1, user: 1, task: 7 },
      { id: 1, user: 2, task: 7 },
      { id: 1, user: 2, task: 8 },
      { id: 1, user: 1, task: 9 },
      { id: 1, user: 2, task: 9 },
      { id: 1, user: 2, task: 10 },
      { id: 1, user: 2, task: 11 },
      { id: 1, user: 2, task: 12 },
    ]
  },
  mutations: {
    addTaskUser (state, payload) {
      state.task_users.push(payload)
    },

    removeTaskUser (state, payload) {
      const index = state.task_users.findIndex(item => {
        return item.task === payload.taskId && item.user === payload.userId
      })
      if (index >= 0) {
        state.task_users.splice(index, 1)
      }
    }
  },
  actions: {

  },
  modules: {
    users,
    boards,
    boardUsers
  }
})
