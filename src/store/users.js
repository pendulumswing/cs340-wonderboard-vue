const state = {
  users: [
    { id: 1, username: 'jb', first_name: 'Jason', last_name: 'Brown', email: 'jb@email.com', password: 'password' },
    { id: 2, username: 'pw', first_name: 'Peter', last_name: 'Wright', email: 'pw@email.com', password: 'password' },
  ]
}

const getters = {

}

const mutations = {
  addTaskUser (state, payload) {
    state.task_users.push(payload)
  },

  removeTaskUser (state, payload) {
    const index = state.task_users.findIndex(item => {
      return item.task === payload.taskId && item.user === payload.userId
    })
    if (index >= 0) {
      state.task_users.splice(index, 1)
    }
  },

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
