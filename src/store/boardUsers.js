const state = {
  id: 4,
  boardUsers: [
    { id: 1, user: 1, board: 1 },
    { id: 2, user: 1, board: 2 },
    { id: 3, user: 2, board: 3 },
    { id: 4, user: 2, board: 4 }
  ]
}

const getters = {
  getBoardUsersLength () {
    return state.boardUsers.length
  },

  getBoardAutoId () {
    return state.id
  }
}

const mutations = {
  createBoardUser (state, payload) {
    state.boardUsers.push(payload)
  },

  deleteBoardUser (state, payload) {
    const index = state.boardUsers.findIndex(item => {
      return item.board === payload.boardId && item.user === payload.userId
    })
    if (index >= 0) {
      state.boardUsers.splice(index, 1)
    }
  },

  deleteAllBoardUsers (state, payload) {
    const test = state.boardUsers.filter(boardUser => {
      return boardUser.board !== Number(payload.board)
    })
    state.boardUsers = test
  },

  updateBoardUsersAutoId (state, payload) {
    state.id += 1
  }
}

const actions = {
  createBoardUser: (context, payload) => {
    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    context.commit('updateBoardUsersAutoId')
    payload.id = state.id

    context.commit('createBoardUser', payload)
    console.log('createBoardUser from action: ', payload)
  },

  deleteBoardUser: (context, payload) => {
    context.commit('deleteBoardUser', payload)
  },

  deleteAllBoardUsers: (context, payload) => {
    console.log('deleteAllboardUsers action called')
    context.commit('deleteAllBoardUsers', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
