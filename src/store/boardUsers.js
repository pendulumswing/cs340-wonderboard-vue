import axios from 'axios'
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
  getBoardUsersLength (state) {
    return state.boardUsers.length
  },

  getBoardUsersAutoId (state) {
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
    state.boardUsers = state.boardUsers.filter(boardUser => {
      return boardUser.board !== Number(payload.id)
    })
  },

  // deleteAllBoardUsersByUser (state, payload) {
  //   state.boardUsers = state.boardUsers.filter(boardUser => {
  //     return boardUser.user !== Number(payload.id)
  //   })
  // },

  updateBoardUsersAutoId (state, payload) {
    state.id += 1
  }
}

const actions = {
  createBoardUser: (context, payload) => {
    axios.get('board_users')
      .then(res => {
        console.log('created board user:', res.data)
      })
      .catch(error => console.log(error))
    // Auto-increment id - REMOVE AFTER DB IMPLEMENTATION
    context.commit('updateBoardUsersAutoId')
    payload.id = state.id

    context.commit('createBoardUser', payload)
    console.log('createBoardUser from action: ', payload)
  },

  // no id to delete
  // pw - delete board user based on
  deleteBoardUser: (context, payload) => {
    axios.delete(`board_users/${payload.id}`)
      .then(res => {
        console.log('deleted board user:', res.data)
      })
      .catch(error => console.log(error))
    context.commit('deleteBoardUser', payload)
  },

  deleteAllBoardUsers: (context, payload) => {
    context.commit('deleteAllBoardUsers', payload)
  }

  // deleteAllBoardUsersByUser: (context, payload) => {
  //   context.commit('deleteAllBoardUsersByUser', payload)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
