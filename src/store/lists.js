import axios from 'axios'
import _ from 'lodash'

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
  },

  getListsByBoard: (state) => (id) => {
    const listArray = state.lists.filter(list => {
      return list.board === id
    })

    const sorted = _.sortBy(listArray, function (list) {
      return list.index
    })

    return _.cloneDeep(sorted)
  }
}

const mutations = {
  createList: (state, payload) => {
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
    state.lists = []
    state.lists = payload
  }

  // updateListAutoId (state, payload) {
  //   state.id += 1
  // },

  // decrementIndex (state, payload) {
  //   const index = state.lists.findIndex(list => {
  //     return list.id === payload.id
  //   })
  //   if (index >= 0) {
  //     if (state.lists[index].index > 1) {
  //       state.lists[index].index -= 1
  //     }
  //   }
  // },

  // deleteAllLists (state, payload) {
  //   state.lists = state.lists.filter(list => {
  //     return list.board !== Number(payload.id)
  //   })
  // }
}

const actions = {
  decrementLists: (context, payload) => {
    console.log('decrementLists')
    // Get remaining lists with greater index
    const lists = state.lists.filter(list => {
      return list.board === payload.board && list.index >= payload.index && list.id !== payload.id
    })

    // Update indices for each list
    lists.forEach(list => {
      let listCopy = _.cloneDeep(list)
      if (listCopy.index >= 0) {
        listCopy.index -= 1
      }
      context.dispatch('updateList', listCopy)
    })
  },

  incrementLists: (context, payload) => {
    // Get remaining lists with greater index
    console.log('payload: ', payload)
    const lists = state.lists.filter(list => {
      return list.board === payload.board && list.index >= payload.index && list.id !== payload.id
    })
    console.log('lists: ', lists)

    // Update indices for each list
    lists.forEach(list => {
      let listCopy = _.cloneDeep(list)
      if (listCopy.index >= 0) {
        listCopy.index += 1
      }
      context.dispatch('updateList', listCopy)
    })
  },

  createList: (context, payload) => {
    axios.post('lists', payload)
      .then(res => {
        console.log('added list:', res.data)
        context.commit('createList', res.data)
        // context.dispatch('incrementLists', res.data)
      })
      .catch(error => console.log(error))
  },

  deleteList: (context, payload) => {
    axios.delete(`lists/${payload.id}`, payload)
      .then(res => {
        // console.log('deleted list:', res.data)
        context.commit('deleteList', payload)
        // context.dispatch('decrementLists', res.data)
      })
      .catch(error => console.log(error))
  },

  updateList: (context, payload) => {
    axios.put(`lists/${payload.id}`, payload)
      .then(res => {
        context.commit('updateList', res.data)
      })
      .catch(error => console.log(error))
  },

  getLists: (context) => {
    axios.get('lists')
      .then(res => {
        // console.log('lists:', res.data)
        context.commit('getLists', res.data)
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
