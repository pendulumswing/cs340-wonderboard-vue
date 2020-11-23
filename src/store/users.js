import axios from 'axios'

const state = {
  id: 2,
  users: [
    { id: 1, username: 'jb', first_name: 'Jason', last_name: 'Brown', email: 'jb@email.com', password: 'password' },
    { id: 2, username: 'pw', first_name: 'Peter', last_name: 'Wright', email: 'pw@email.com', password: 'password' }
  ]
}

const getters = {
  getUserAutoId (state) {
    return state.id
  }
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
    console.log('inside getUsers')
    state.users = []
    state.users = payload
    console.log('this.state.users: ', state.users)
  },

  updateUserAutoId (state, payload) {
    state.id += 1
  }
}

const actions = {
  createUser: (context, payload) => {
    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    // context.commit('updateUserAutoId')
    // console.log('user state id: ', state.id, ', : ', context.getters.getUserAutoId)
    // payload.id = state.id

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    axios.post('users', payload)
      .then(res => {
        console.log('createUser:', res.data)
        // this.onGetUsers()
        context.commit('createUser', res.data)
      })
      .catch(error => console.log(error))
  },
  deleteUser: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    axios.delete(`users/${payload.id}`)
      .then(res => {
        console.log('delete: ', res)
        context.commit('deleteUser', payload)
      })
      .catch(error => console.log(error))

    // // TODO Handle CASCADE deletion
    // context.dispatch('deleteAllBoards', id)
  },
  updateUser: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // let payload = { username: 'test_update', first_name: 'fName_update', last_name: 'lName_update', email:
    // 'test@email.com', password: 'password' }
    axios.put(`users/${payload.id}`, payload)
      .then(res => {
        console.log('update: ', res.data)
        // this.onGetUsers()
        context.commit('updateUser', res.data)
      })
      .catch(error => console.log(error))
  },
  getUsers: (context) => {
    axios.get('users')
      .then(res => {
        context.commit('getUsers', res.data)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
