const state = {
  board_users: [
    { id: 1, user: 1, board: 1, role: 'admin' },
    { id: 2, user: 1, board: 2, role: 'designer' },
    { id: 3, user: 2, board: 3, role: 'admin' },
    { id: 4, user: 2, board: 4, role: 'observer' },
  ]
}

const getters = {

}

const mutations = {
  addBoardUser (state, payload) {
    state.board_users.push(payload)
  },

  removeBoardUser (state, payload) {
    const index = state.board_users.findIndex(item => {
      return item.board === payload.boardId && item.user === payload.userId
    })
    if (index >= 0) {
      state.board_users.splice(index, 1)
    }
  }
}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions
}
