import axios from 'axios'

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
  getListAutoId (state) {
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

  updateListAutoId (state, payload) {
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
  },

  deleteAllLists (state, payload) {
    state.lists = state.lists.filter(list => {
      return list.board !== Number(payload.id)
    })
  }
}

const actions = {

  // pw - add list to board
  createList: (context, payload) => {
    // TODO - set up async call to server,
    axios.post('lists', payload)
      .then(res => {
        console.log('added list:', res.data)
      })
      .catch(error => console.log(error))

    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    context.commit('updateListAutoId')
    payload.id = state.id
    console.log('setting new id for list: ', payload.id)

    //  add to DB, on success commit to store
    // Commit
    context.commit('createList', payload)

    // TODO - this might be handled by the server whenever a list is created
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

  // pw - delete list from board on listId
  deleteList: (context, payload) => {
    console.log(payload.id)
    axios.delete(`lists/${payload.id}`, payload)
      .then(res => {
        console.log('deleted list:', res.data)
      })
      .catch(error => console.log(error))

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

    // Delete List Tasks
    // TODO - this might be handled by the server CASCADE whenever a list is delete
    // const listPayload = {
    //   id: Number(payload.id)
    // }
    context.dispatch('deleteAllTasks', payload)
  },

  // pw - update list based on listId
  updateList: (context, payload) => {
    // console.log(payload)

    // TODO - set up async call to server,
    axios.put(`lists/${payload.id}`, payload)
      .then(res => {
        console.log('updated list:', res.data)
      })
      .catch(error => console.log(error))

    //  add to DB, on success commit to store
    context.commit('updateList', payload)
  },

  // pw - Note: need to verify if this is what setasks should return
  // pw - get all lists
  getLists: (context, payload) => {
    axios.get('lists')
      .then(res => {
        console.log('lists:', res.data)
      })
      .catch(error => console.log(error))
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('getLists', payload)
  },

  deleteAllLists: (context, payload) => {
    const listsToDelete = state.lists.filter(list => {
      return list.board === Number(payload.id)
    })
    context.commit('deleteAllLists', payload)

    // Delete TaskUsers
    // TODO - this might be handled by the server CASCADE
    //  whenever multiple lists are deleted
    listsToDelete.forEach(list => {
      context.dispatch('deleteAllTasks', list)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
