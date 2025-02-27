import axios from 'axios'

const state = {
  lists: [
    // { id: 1, board: 1, name: 'To Do', index: 1, creator: 1, color: 'red lighten-3' },
    // { id: 2, board: 1, name: 'In Process', index: 2, creator: 1, color: 'blue lighten-3' },
    // { id: 3, board: 1, name: 'Completed', index: 3, creator: 1, color: 'green lighten-3' },
    // { id: 4, board: 2, name: 'To Do', index: 1, creator: 1, color: 'orange lighten-3' },
    // { id: 5, board: 2, name: 'In Process', index: 2, creator: 1, color: 'purple lighten-3' },
    // { id: 6, board: 2, name: 'Completed', index: 3, creator: 2, color: 'blue lighten-3' },
    // { id: 7, board: 3, name: 'To Do', index: 1, creator: 1, color: 'red lighten-3' },
    // { id: 8, board: 3, name: 'In Process', index: 2, creator: 2, color: 'blue lighten-3' },
    // { id: 9, board: 3, name: 'Completed', index: 3, creator: 2, color: 'green lighten-3' },
    // { id: 10, board: 4, name: 'To Do', index: 1, creator: 2, color: 'orange lighten-3' },
    // { id: 11, board: 4, name: 'In Process', index: 2, creator: 2, color: 'purple lighten-3' },
    // { id: 12, board: 4, name: 'Completed', index: 3, creator: 2, color: 'blue lighten-3' }
  ]
}

const getters = {

}

const mutations = {
  createList: (state, payload) => {
    state.lists.push(payload)
  },

  getLists: (state, payload) => {
    state.lists = []
    state.lists = payload
  },

  updateList: (state, payload) => {
    const index = state.lists.findIndex(list => {
      return list.id === payload.id
    })
    if (index >= 0) {
      state.lists.splice(index, 1, payload)
    }
  },

  deleteList: (state, payload) => {
    const index = state.lists.findIndex(list => {
      return list.id === payload.id
    })
    if (index >= 0) {
      state.lists.splice(index, 1)
    }
  }
}

const actions = {
  createList: (context, payload) => {
    axios.post('lists', payload)
      .then(res => {
        return context.commit('createList', res.data)
        // context.dispatch('incrementLists', res.data)
      })
      .catch(error => console.log(error))
  },

  getLists: (context) => {
    axios.get('lists')
      .then(res => {
        return context.commit('getLists', res.data)
      })
      .catch(error => console.log(error))
  },

  updateList: (context, payload) => {
    axios.put(`lists/${payload.id}`, payload)
      .then(res => {
        return context.commit('updateList', res.data)
      })
      .catch(error => console.log('update error: ', error))
  },

  deleteList: (context, payload) => {
    axios.delete(`lists/${payload.id}`, payload)
      .then(res => {
        return context.commit('deleteList', payload)
      }).then(res => {
        return context.dispatch('getTasks')
      }).then(res => {
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
