const state = {
  taskUsers: [
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
    { id: 1, user: 2, task: 12 }
  ]
}

const getters = {
  getTaskUsersLength () {
    return state.taskUsers.length
  }
}

const mutations = {
  createTaskUser (state, payload) {
    state.taskUsers.push(payload)
  },

  deleteTaskUser (state, payload) {
    const index = state.taskUsers.findIndex(taskUser => {
      return taskUser.task === payload.task && taskUser.user === payload.user
    })
    if (index >= 0) {
      state.taskUsers.splice(index, 1)
    }
  },

  deleteAllTaskUsers (state, payload) {
    state.taskUsers = state.taskUsers.filter(taskUser => {
      return taskUser.task !== Number(payload.id)
    })
  }
}

const actions = {
  createTaskUser: (context, payload) => {
    context.commit('createTaskUser', payload)
    console.log('createTaskUser from action: ', payload)
  },

  deleteTaskUser: (context, payload) => {
    context.commit('deleteTaskUser', payload)
  },

  deleteAllTaskUsers: (context, payload) => {
    console.log('deleteAllTaskUsers action called')
    context.commit('deleteAllTaskUsers', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
