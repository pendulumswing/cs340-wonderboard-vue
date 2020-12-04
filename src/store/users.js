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

    axios.post('users', payload)
      .then(res => {
        console.log('createUser:', res.data)
        return context.commit('createUser', res.data)
      })
      .catch(error => console.log(error))
  },
  deleteUser: (context, payload) => {
    axios.delete(`users/${payload.id}`)
      .then(res => {
        console.log('delete: ', res)
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

    // // TODO Handle CASCADE deletion
    // context.dispatch('deleteAllBoards', id)
  },
  updateUser: (context, payload) => {
    axios.put(`users/${payload.id}`, payload)
      .then(res => {
        console.log('update: ', res.data)
        // this.onGetUsers()
        return context.commit('updateUser', res.data)
      })
      .catch(error => console.log(error))
  },
  getUsers: (context) => {
    axios.get('users')
      .then(res => {
        return context.commit('getUsers', res.data)
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
