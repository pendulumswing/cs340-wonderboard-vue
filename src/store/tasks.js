import axios from 'axios'

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

  getTasks: (state, payload) => {
    state.tasks = []
    state.tasks = payload
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
  // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
  // context.commit('updateTaskAutoId')
  // pw - creates Task
  createTask: (context, payload) => {
    axios.post('tasks', payload)
      .then(res => {
        console.log('created task:', res.data)
        context.commit('createTask', res.data)

        const taskId = res.data.id
        const creatorId = res.data.creator
        const taskUserPayload = {
          task: Number(taskId),
          user: Number(creatorId)
        }
        context.dispatch('createTaskUser', taskUserPayload)
      })
      .catch(error => console.log(error))

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    // Commit

    // Create Payload for taskUser
    // const taskUsersLength = context.getters.getTaskUsersLength + 1

    // TODO - this might be handled by the server whenever a task is created
    // Create Payload for taskUser
    // context.dispatch('createTaskUser', taskUserPayload)

    // TODO - this might be handled by the server whenever a task is created
    // Create Default Tasks for Task
  },

  // pw - delete task based on taskId
  deleteTask: (context, payload) => {
    axios.delete(`tasks/${payload.id}`)
      .then(res => {
        console.log('task:', res.data)
      })
      .catch(error => console.log(error))

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

  // pw - update task based on taskId
  updateTask: (context, payload) => {
    axios.put(`tasks/${payload.id}`, payload)
      .then(res => {
        console.log('updated tasks:', res.data)
      })
      .catch(error => console.log(error))

    // TODO - set up async call to server,
    //  add to DB, on success commit to store
    context.commit('updateTask', payload)
  },

  // -- left off here

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

  // pw - Note: need to verify if this is what setTasks should return
  // pw - set tasks
  setTasks: (context, payload) => {
    axios.get(`tasks`)
      .then(res => {
        console.log('tasks:', res.data)
      })
      .catch(error => console.log(error))
    // TODO - set up async call to server,
    //  retrieve from DB, on success commit to store
    context.commit('setTasks', payload)
  },

  getTasks: (context) => {
    axios.get(`tasks`)
      .then(res => {
        console.log('getTasks:', res.data)
        context.commit('getTasks', res.data)
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
