const state = {
  id: 13,
  tasks: [
    { id: 1, list: 1, name: 'finish project', description: 'do some stuff', creator: 1 },
    { id: 3, list: 2, name: 'make front end', description: 'do some stuff', creator: 1 },
    { id: 6, list: 3, name: 'ERD diagram', description: 'do some stuff', creator: 1 },
    { id: 2, list: 4, name: 'Flask tutorials', description: 'do some stuff', creator: 1 },
    { id: 4, list: 5, name: 'work on routes', description: 'do some stuff', creator: 1 },
    { id: 5, list: 6, name: 'Deploy to Heroku', description: 'do some stuff', creator: 1 },
    { id: 7, list: 9, name: 'Mess things up', description: 'do some stuff', creator: 2 },
    { id: 8, list: 7, name: 'build back-end', description: 'do some stuff', creator: 2 },
    { id: 9, list: 8, name: 'submit project step 3', description: 'do some stuff', creator: 2 },
    { id: 10, list: 11, name: 'Vue tutorials', description: 'do some stuff', creator: 2 },
    { id: 11, list: 12, name: 'review project step 2', description: 'do some stuff', creator: 2 },
    { id: 12, list: 12, name: 'connect web app to server', description: 'do some stuff', creator: 2 },
    { id: 13, list: 2, name: 'update front end', description: 'do some stuff', creator: 1 }
  ]
}

const getters = {
  getTaskAutoId (state) {
    return state.id
  }
}

const mutations = {
  createTask: (state, payload) => {
    state.tasks.push(payload)
  },

  deleteTask: (state, payload) => {
    const index = state.tasks.findIndex(task => {
      return task.id === payload.id
    })
    if (index >= 0) {
      state.tasks.splice(index, 1)
    }
  },

  updateTask: (state, payload) => {
    const index = state.tasks.findIndex(task => {
      return task.id === payload.id
    })
    console.log('Task index: ', index, ' payload: ', payload)
    if (index >= 0) {
      state.tasks.splice(index, 1, payload)
    }
  },

  deleteAllTasks (state, payload) {
    state.tasks = state.tasks.filter(task => {
      return task.list !== Number(payload.id)
    })
  },

  setTasks: (state, payload) => {
    this.state.tasks = payload
  },

  updateTaskAutoId (state, payload) {
    state.id += 1
  }
}

const actions = {
  createTask: (context, payload) => {
    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    context.commit('updateTaskAutoId')

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Commit
    context.commit('createTask', payload)
    console.log('task: ', ' id: ', payload.id, ', ', payload)

    // Create Payload for taskUser
    // const taskUsersLength = context.getters.getTaskUsersLength + 1
    const taskUserPayload = {
      id: context.getters.getTaskUsersAutoId + 1,
      user: Number(payload.creator),
      task: Number(payload.id)
    }
    console.log('taskUserPayload: ', ' id: ', taskUserPayload.id, ', ', taskUserPayload)
    context.dispatch('createTaskUser', taskUserPayload)

    // TODO - this might be handled by the server whenever a task is created
    // Create Payload for taskUser
    // context.dispatch('createTaskUser', taskUserPayload)

    // TODO - this might be handled by the server whenever a task is created
    // Create Default Tasks for Task
  },

  deleteTask: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Payload includes task and TaskUser
    console.log('delete task action called')
    context.commit('deleteTask', payload)

    // Delete TaskUsers
    // TODO - this might be handled by the server CASCADE whenever a task is delete
    console.log('delete taskUser action called')
    context.dispatch('deleteAllTaskUsers', payload)
  },

  updateTask: (context, payload) => {
    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateTask', payload)
  },

  deleteAllTasks: (context, payload) => {
    const tasksToDelete = state.tasks.filter(task => {
      return task.list === Number(payload.id)
    })
    console.log('deleteAllTasks action called')
    context.commit('deleteAllTasks', payload)

    // Delete TaskUsers
    // TODO - this might be handled by the server CASCADE
    //  whenever multiple tasks are deleted
    tasksToDelete.forEach(task => {
      console.log('delete taskUser action called')
      context.dispatch('deleteAllTaskUsers', task)
    })
  },

  setTasks: (context, payload) => {
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('setTasks', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
