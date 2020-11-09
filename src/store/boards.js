const state = {
  boards: [
    { id: 1, name: 'Banana 1', creator: 1, color: 'blue lighten-3' },
    { id: 2, name: 'Banana 2', creator: 1, color: 'orange lighten-3' },
    { id: 3, name: 'Apple 1', creator: 2, color: 'red lighten-3' },
    { id: 4, name: 'Apple 2', creator: 2, color: 'green lighten-3' }
  ]
}

const getters = {

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
  }
}

const actions = {
  createBoard: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Commit
    context.commit('createBoard', payload)

    // TODO - this might be hangled by the server whenever a board is created
    // Create Payload for boardUser
    const boardUsersLength = context.getters.getBoardUsersLength + 1
    const boardUserPayload = {
      id: boardUsersLength,
      user: Number(payload.creator),
      board: Number(payload.id)
    }
    context.dispatch('createBoardUser', boardUserPayload)

    // TODO - this might be hangled by the server whenever a board is created
    // Create Default Lists for Board
  },

  deleteBoard: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('deleteBoard', payload)

    // TODO - this might be handled by the server CASCADE whenever a board is delete
    // Delete BoardUser
    const boardUserPayload = {
      board: Number(payload.id)
    }
    context.dispatch('deleteAllBoardUsers', boardUserPayload)
  },
  updateBoard: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateBoard', payload)
  },
  getBoards: (context, payload) => {
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('getBoards', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
