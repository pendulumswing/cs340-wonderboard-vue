import _ from 'lodash'
import axios from 'axios'

const state = {
  boards: [
    // { id: 1, name: 'Banana 1', creator: 1, color: 'blue lighten-3' },
    // { id: 2, name: 'Banana 2', creator: 1, color: 'orange lighten-3' },
    // { id: 3, name: 'Apple 1', creator: 2, color: 'red lighten-3' },
    // { id: 4, name: 'Apple 2', creator: 2, color: 'green lighten-3' }
  ]
}

const getters = {

}

const mutations = {
  createBoard: (state, payload) => {
    state.boards.push(payload)
  },

  getBoards: (state, payload) => {
    state.boards = []
    state.boards = payload
  },

  updateBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1, payload)
    }
  },

  deleteBoard: (state, payload) => {
    const index = state.boards.findIndex(board => {
      return board.id === payload.id
    })
    if (index >= 0) {
      state.boards.splice(index, 1)
    }
  }
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

  updateBoard: (context, payload) => {
    axios.put(`boards/${payload.id}`, payload)
      .then(res => {
        return context.commit('updateBoard', res.data)
      })
      .catch(error => console.log(error))
  },

  getBoards: (context) => {
    axios.get(`boards`)
      .then(res => {
        return context.commit('getBoards', res.data)
      })
      .catch(error => console.log(error))
  },

  deleteBoard: (context, payload) => {
    axios.delete(`boards/${payload.id}`)
      .then(res => {
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
