import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      { id: 1, username: 'jb', first_name: 'Jason', last_name: 'Brown', email: 'jb@email.com', password: 'password' },
      { id: 2, username: 'pw', first_name: 'Peter', last_name: 'Wright', email: 'pw@email.com', password: 'password' },
    ],
    boards: [
      { id: 1, name: 'Project 1', tasks: 5, url: '/users/User/boards/Project', color: 'blue lighten-3' },
      { id: 2, name: 'Project 2', tasks: 9, url: '/users/User/boards/Project', color: 'orange lighten-3' },
    ],
    lists: [
      { id: 1, name: 'To Do', color: 'red lighten-3' },
      { id: 2, name: 'In Process', color: 'blue lighten-3' },
      { id: 3, name: 'Completed', color: 'green lighten-3' },
    ],
    tasks: [
      { id: 3, name: 'finish project', status: 'to do', board: 1, list: 1 },
      { id: 3, name: 'Flask tutorials', status: 'to do', board: 1, list: 1 },
      { id: 1, name: 'make front end', status: 'in process', board: 1, list: 2 },
      { id: 1, name: 'work on routes', status: 'in process', board: 1, list: 2 },
      { id: 2, name: 'Deploy to Heroku', status: 'complete', board: 1, list: 2 },
      { id: 2, name: 'ERD diagram', status: 'complete', board: 1, list: 3 },
      { id: 2, name: 'Mess things up', status: 'complete', board: 1, list: 3 },
      { id: 6, name: 'build back-end', status: 'to do', board: 2, list: 1 },
      { id: 4, name: 'submit project step 3', status: 'in process', board: 2, list: 2 },
      { id: 4, name: 'Vue tutorials', status: 'in process', board: 2, list: 2 },
      { id: 5, name: 'review project step 2', status: 'complete', board: 2, list: 3 },
      { id: 5, name: 'connect web app to server', status: 'complete', board: 2, list: 3 },
    ]
  },
  mutations: {

  },
  actions: {

  }
})
