const state = {
  id: 12,
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
    { id: 12, board: 4, name: 'Completed', index: 3, creator: 2, color: 'blue lighten-3' }
  ]
}

const getters = {
  getId () {
    return state.id
  }
}

const mutations = {
  createList: (state, payload) => {
    // console.log('pushing data to list state: ', payload)
    state.lists.push(payload)
  },

  deleteList: (state, payload) => {
    const index = state.lists.findIndex(list => {
      return list.id === payload.id
    })
    if (index >= 0) {
      state.lists.splice(index, 1)
    }
  },
  updateList: (state, payload) => {
    const index = state.lists.findIndex(list => {
      return list.id === payload.id
    })
    if (index >= 0) {
      state.lists.splice(index, 1, payload)
    }
  },

  getLists: (state, payload) => {
    this.state.lists = payload
  },

  updateId (state, payload) {
    state.id += 1
  },

  decrementIndex (state, payload) {
    const index = state.lists.findIndex(list => {
      return list.id === payload.id
    })
    if (index >= 0) {
      if (state.lists[index].index > 1) {
        state.lists[index].index -= 1
      }
    }
  }
}

const actions = {
  createList: (context, payload) => {
    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    context.commit('updateId')
    payload.id = state.id

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Commit
    context.commit('createList', payload)

    // TODO - this might be hangled by the server whenever a list is created
    // Create Payload for listUser
    // const listUsersLength = context.getters.getListUsersLength + 1
    // const listUserPayload = {
    //   id: listUsersLength,
    //   user: Number(payload.creator),
    //   list: Number(payload.id)
    // }
    // context.dispatch('createListUser', listUserPayload)

    // TODO - this might be hangled by the server whenever a list is created
    // Create Default Lists for List
  },

  // TODO - REMAINING LIST INDICES MUST UPDATE
  deleteList: (context, payload) => {
    const lists = state.lists.filter(list => {
      return list.board === payload.board && list.index > payload.index
    })

    // Update indices for each list not to be deleted
    lists.forEach(list => {
      context.commit('decrementIndex', list)
    })

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('deleteList', payload)

    // TODO - this might be handled by the server CASCADE whenever a list is delete
    // // Delete ListUser
    // const listUserPayload = {
    //   list: Number(payload.id)
    // }
    // context.dispatch('deleteAllListUsers', listUserPayload)
  },
  updateList: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateList', payload)
  },
  getLists: (context, payload) => {
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('getLists', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
