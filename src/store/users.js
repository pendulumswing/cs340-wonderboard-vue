const state = {
  users: [
    { id: 1, username: 'jb', first_name: 'Jason', last_name: 'Brown', email: 'jb@email.com', password: 'password' },
    { id: 2, username: 'pw', first_name: 'Peter', last_name: 'Wright', email: 'pw@email.com', password: 'password' }
  ]
}

const getters = {

}

const mutations = {
  createUser: (state, payload) => {
    state.users.push(payload)
  },

  deleteUser: (state, payload) => {
    const index = state.users.findIndex(user => {
      return user.id === payload.id
    })
    if (index >= 0) {
      state.users.splice(index, 1)
    }
  },
  updateUser: (state, payload) => {
    const index = state.users.findIndex(user => {
      return user.id === payload.id
    })
    if (index >= 0) {
      state.users.splice(index, 1, payload)
    }
  },
  getUsers: (state, payload) => {
    this.state.users = payload
  }
}

const actions = {
  createUser: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('createUser', payload)
  },
  deleteUser: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('deleteUser', payload)
  },
  updateUser: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateUser', payload)
  },
  getUsers: (context, payload) => {
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('getUsers', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
