import axios from 'axios'
const state = {
  id: 4,
  boardUsers: [
    // { id: 1, user: 1, board: 1 },
    // { id: 2, user: 1, board: 2 },
    // { id: 3, user: 2, board: 3 },
    // { id: 4, user: 2, board: 4 }
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
    const index = state.boardUsers.findIndex(boardUser => {
      return boardUser.id === payload.id
    })
    if (index >= 0) {
      state.boardUsers.splice(index, 1)
    }
  },

  getBoardUsers: (state, payload) => {
    state.boardUsers = []
    state.boardUsers = payload
  }
}

const actions = {
  createBoardUser: (context, payload) => {
    axios.post('board_users', payload)
      .then(res => {
        // console.log('created board user:', res.data)
        return context.commit('createBoardUser', res.data)
      })
      .catch(error => console.log(error))
  },

  deleteBoardUser: (context, payload) => {
    axios.delete(`board_users/${payload.id}`)
      .then(res => {
        // console.log('deleted board user:', payload.id)
        return context.commit('deleteBoardUser', payload)
      })
      .catch(error => console.log(error))
  },

  getBoardUsers: (context) => {
    axios.get(`board_users`)
      .then(res => {
        // console.log('getBoardUsers:', res.data)
        return context.commit('getBoardUsers', res.data)
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
