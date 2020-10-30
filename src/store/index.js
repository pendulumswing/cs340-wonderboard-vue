import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
      { id: 1, name: 'Jason', email: 'jb@email.com', url: '/users/User' },
      { id: 2, name: 'Peter', email: 'pw@email.com', url: '/users/User' },
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
      { id: 1, name: 'make front end', status: 'in process', list: 2 },
      { id: 2, name: 'ERD diagram', status: 'complete', list: 3 },
      { id: 3, name: 'finish project', status: 'to do', list: 1 },
      { id: 4, name: 'submit project step 3', status: 'in process', list: 2 },
      { id: 5, name: 'review project step 2', status: 'complete', list: 3 },
      { id: 6, name: 'build back-end', status: 'to do', list: 1 }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
