import _ from 'lodash'
import axios from 'axios'

const state = {
  id: 4,
  boards: [
    { id: 1, name: 'Banana 1', creator: 1, color: 'blue lighten-3' },
    { id: 2, name: 'Banana 2', creator: 1, color: 'orange lighten-3' },
    { id: 3, name: 'Apple 1', creator: 2, color: 'red lighten-3' },
    { id: 4, name: 'Apple 2', creator: 2, color: 'green lighten-3' }
  ]
}

const getters = {
  getBoardAutoId () {
    return state.id
  }
}

const mutations = {
  createBoard: (state, payload) => {
    state.boards.push(payload)
  },

  deleteBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1)
    }
  },
  updateBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1, payload)
    }
  },
  getBoards: (state, payload) => {
    state.boards = []
    state.boards = payload
  }

  // updateBoardAutoId (state, payload) {
  //   state.id += 1
  // },

  // deleteAllBoards (state, payload) {
  //   state.boards = state.boards.filter(board => {
  //     return board.creator !== Number(payload.id)
  //   })
  // }
}

const actions = {
  createBoard: (context, payload) => {
    axios.post('boards', payload)
      .then(res => {
        context.commit('createBoard', res.data)

        const boardId = res.data.id
        const creatorId = res.data.creator

        const boardUserPayload = {
          user: Number(payload.creator),
          board: Number(boardId)
        }
        // Inner promise to Create Default Lists
        context.dispatch('createBoardUser', boardUserPayload)
          .then(res => {
            context.rootState.defaultLists.forEach(list => {
              let newList = _.cloneDeep(list)
              newList.board = boardId
              newList.creator = creatorId
              return context.dispatch('createList', newList)
            })
          })
      })
      .catch(error => console.log(error))
  },

  deleteBoard: (context, payload) => {
    axios.delete(`boards/${payload.id}`)
      .then(res => {
        console.log('deleteBoard:', res.data)
        return context.commit('deleteBoard', payload)
      }).then(res => {
        return context.dispatch('getBoardUsers')
      }).then(res => {
        return context.dispatch('getLists')
      }).then(res => {
        return context.dispatch('getTasks')
      }).then(res => {
        return context.dispatch('getTaskUsers')
      })
      .catch(error => console.log(error))
  },

  updateBoard: (context, payload) => {
    axios.put(`boards/${payload.id}`, payload)
      .then(res => {
        console.log('updateBoard:', res.data)
        return context.commit('updateBoard', res.data)
      })
      .catch(error => console.log(error))
  },

  getBoards: (context) => {
    axios.get(`boards`)
      .then(res => {
        console.log('getBoards:', res.data)
        return context.commit('getBoards', res.data)
      })
      .catch(error => console.log(error))
  }

  // Pseudo Cascade Delete (Client-only - use if no DB attached)
  // deleteAllBoards: (context, payload) => {
  //   const boardsToDelete = state.boards.filter(board => {
  //     return board.creator === Number(payload.id)
  //   })
  //   context.commit('deleteAllBoards', payload)
  //
  //   // Delete TaskUsers
  //   // TODO - this might be handled by the server CASCADE
  //   //  whenever multiple boards are deleted
  //   boardsToDelete.forEach(board => {
  //     context.dispatch('deleteAllLists', board)
  //     context.dispatch('deleteAllBoardUsers', board)
  //   })
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
