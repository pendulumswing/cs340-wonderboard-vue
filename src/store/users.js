import axios from 'axios'

const state = {
  users: [
    // { id: 1, username: 'jb', first_name: 'Jason', last_name: 'Brown', email: 'jb@email.com', password: 'password' },
    // { id: 2, username: 'pw', first_name: 'Peter', last_name: 'Wright', email: 'pw@email.com', password: 'password' }
  ]
}

const getters = {

}

const mutations = {
  createUser: (state, payload) => {
    state.users.push(payload)
  },

  getUsers: (state, payload) => {
    state.users = []
    state.users = payload
  },

  updateUser: (state, payload) => {
    const index = state.users.findIndex(user => {
      return user.id === payload.id
    })
    if (index >= 0) {
      state.users.splice(index, 1, payload)
    }
  },

  deleteUser: (state, payload) => {
    const index = state.users.findIndex(user => {
      return user.id === payload.id
    })
    if (index >= 0) {
      state.users.splice(index, 1)
    }
  }
}

const actions = {
  createUser: (context, payload) => {
    axios.post('users', payload)
      .then(res => {
        return context.commit('createUser', res.data)
      })
      .catch(error => console.log(error))
  },

  getUsers: (context) => {
    axios.get('users')
      .then(res => {
        return context.commit('getUsers', res.data)
      })
      .catch(error => console.log(error))
  },

  updateUser: (context, payload) => {
    axios.put(`users/${payload.id}`, payload)
      .then(res => {
        return context.commit('updateUser', res.data)
      })
      .catch(error => console.log(error))
  },

  deleteUser: (context, payload) => {
    axios.delete(`users/${payload.id}`)
      .then(res => {
        return context.commit('deleteUser', payload)
      }).then(res => {
      // console.log('calling getBoards')
        return context.dispatch('getBoards')
      }).then(res => {
        // console.log('calling getBoardUsers')
        return context.dispatch('getBoardUsers')
      }).then(res => {
        // console.log('calling getLists')
        return context.dispatch('getLists')
      }).then(res => {
        // console.log('calling getTasks')
        return context.dispatch('getTasks')
      }).then(res => {
        // console.log('calling getTaskUsers')
        return context.dispatch('getTaskUsers')
      })
      .catch(error => console.log(error))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
