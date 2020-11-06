const state = {
  task_users: [
    { id: 1, user: 1, task: 1 },
    { id: 1, user: 1, task: 2 },
    { id: 1, user: 1, task: 3 },
    { id: 1, user: 1, task: 4 },
    { id: 1, user: 2, task: 4 },
    { id: 1, user: 1, task: 5 },
    { id: 1, user: 2, task: 5 },
    { id: 1, user: 1, task: 6 },
    { id: 1, user: 1, task: 7 },
    { id: 1, user: 2, task: 7 },
    { id: 1, user: 2, task: 8 },
    { id: 1, user: 1, task: 9 },
    { id: 1, user: 2, task: 9 },
    { id: 1, user: 2, task: 10 },
    { id: 1, user: 2, task: 11 },
    { id: 1, user: 2, task: 12 },
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
