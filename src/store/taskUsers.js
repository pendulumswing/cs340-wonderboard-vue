import _ from 'lodash'
import axios from 'axios'

const state = {
  id: 16,
  taskUsers: [
    { id: 1, user: 1, task: 1 },
    { id: 2, user: 1, task: 2 },
    { id: 3, user: 1, task: 3 },
    { id: 4, user: 1, task: 4 },
    { id: 5, user: 2, task: 4 },
    { id: 6, user: 1, task: 5 },
    { id: 7, user: 2, task: 5 },
    { id: 8, user: 1, task: 6 },
    { id: 9, user: 1, task: 7 },
    { id: 10, user: 2, task: 7 },
    { id: 11, user: 2, task: 8 },
    { id: 12, user: 1, task: 9 },
    { id: 13, user: 2, task: 9 },
    { id: 14, user: 2, task: 10 },
    { id: 15, user: 2, task: 11 },
    { id: 16, user: 2, task: 12 }
  ]
}

const getters = {
  getTaskUsersLength (state) {
    return state.taskUsers.length
  },
  getTaskUsersNextId (state) {
    const maxId = _.maxBy(state.taskUsers, taskUser => {
      return taskUser.id
    })
    console.log('maxId: ', maxId.id)
    return maxId.id + 1
  },

  getTaskUsersAutoId (state) {
    return state.id
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

  getTaskUsers: (state, payload) => {
    state.tasksUsers = []
    state.tasksUsers = payload
  }

  // deleteAllTaskUsers (state, payload) {
  //   state.taskUsers = state.taskUsers.filter(taskUser => {
  //     return taskUser.task !== Number(payload.id)
  //   })
  // },

  // udpateTaskUserAutoId (state, payload) {
  //   state.id += 1
  //   console.log('state.id = ', state.id)
  // }
}

const actions = {
  createTaskUser: (context, payload) => {
    axios.post('task_users', payload)
      .then(res => {
        console.log('task_user: ', res.data)
        context.commit('createTaskUser', res.data)
      })
      .catch(error => console.log(error))
  },

  deleteTaskUser: (context, payload) => {
    axios.delete(`task_users/${payload.id}`)
      .then(res => {
        console.log('task_users: ', res.data)
        context.commit('deleteTaskUser', payload)
      })
      .catch(error => console.log(error))
  },

  getTaskUsers: (context) => {
    axios.get(`tasks`)
      .then(res => {
        console.log('getTaskUsers:', res.data)
        context.commit('getTaskUsers', res.data)
      })
      .catch(error => console.log(error))
  }
  // deleteAllTaskUsers: (context, payload) => {
  //   console.log('deleteAllTaskUsers action called')
  //   context.commit('deleteAllTaskUsers', payload)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
