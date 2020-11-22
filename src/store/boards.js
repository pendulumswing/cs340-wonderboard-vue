import _ from 'lodash'
import axios from 'axios'

const state = {
  id: 4,
  boards: [
    { id: 1, name: 'Banana 1', creator: 1, color: 'blue lighten-3' },
    { id: 2, name: 'Banana 2', creator: 1, color: 'orange lighten-3' },
    { id: 3, name: 'Apple 1', creator: 2, color: 'red lighten-3' },
    { id: 4, name: 'Apple 2', creator: 2, color: 'green lighten-3' }
  ]
}

const getters = {
  getBoardAutoId () {
    return state.id
  }
}

const mutations = {
  createBoard: (state, payload) => {
    // console.log('pushing data to board state: ', payload)
    state.boards.push(payload)
  },

  deleteBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1)
    }
  },
  updateBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1, payload)
    }
  },
  getBoards: (state, payload) => {
    this.state.boards = payload
  },

  updateBoardAutoId (state, payload) {
    state.id += 1
  },

  deleteAllBoards (state, payload) {
    state.boards = state.boards.filter(board => {
      return board.creator !== Number(payload.id)
    })
  }
}

const actions = {
  createBoard: (context, payload) => {
    // axios.post('boards', payload)
    //   console.log(payload)
    //   .then(res => {
    //     console.log('this is', res.data)
    //     // this.onGetUsers()
    //   })
    //   .catch(error => console.log(error))

    axios.post('boards', payload)
      .then(res => {
        console.log('createBoards:', res.data)
      // this.onGetUsers()
      // context.commit('createUser', res.data)
      })
      .catch(error => console.log(error))

    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    console.log('this is ', payload)
    context.commit('updateBoardAutoId')
    // payload.id = state.id

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Commit
    context.commit('createBoard', payload)

    // Create BoardUser Relationship
    // TODO - this might be hangled by the server whenever a board is created
    // const boardUsersLength = context.getters.getBoardUsersLength + 1
    const boardUserPayload = {
      // id: boardUsersLength,
      user: Number(payload.creator),
      board: Number(payload.id)
    }
    context.dispatch('createBoardUser', boardUserPayload)

    // TODO - this might be hangled by the server whenever a board is created
    // Create Default Lists for Board
    context.rootState.defaultLists.forEach(list => {
      let newList = _.cloneDeep(list)
      newList.board = payload.id
      context.dispatch('createList', newList)
    })
  },

  deleteBoard: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('deleteBoard', payload)

    // TODO - this might be handled by the server CASCADE whenever a board is delete
    // Delete BoardUser
    // const boardUserPayload = {
    //   board: Number(payload.id)
    // }
    context.dispatch('deleteAllBoardUsers', payload)
    context.dispatch('deleteAllLists', payload)
  },
  updateBoard: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateBoard', payload)
  },

  getBoards: (context, payload) => {
    console.log(payload)
    axios.get(`boards/${payload.creator}`)
      .then(res => {
        console.log('getBoards:', res.data)
      // this.onGetUsers()
      // context.commit('createUser', res.data)
      })
      .catch(error => console.log(error))
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('getBoards', payload)
  },

  deleteAllBoards: (context, payload) => {
    const boardsToDelete = state.boards.filter(board => {
      return board.creator === Number(payload.id)
    })
    context.commit('deleteAllBoards', payload)

    // Delete TaskUsers
    // TODO - this might be handled by the server CASCADE
    //  whenever multiple boards are deleted
    boardsToDelete.forEach(board => {
      context.dispatch('deleteAllLists', board)
      context.dispatch('deleteAllBoardUsers', board)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
