<template lang="pug">
  div
    v-row
      v-col(v-for="board in boards" cols="12" sm="6" md="4" lg="3")
        Board(
          :user="user"
          :board="board"
        )
</template>

<script>
import Board from './Board'
import _ from 'lodash'

export default {
  name: 'boards',

  components: {
    Board
  },

  props: {
    boardUsers: {
      type: Array,
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    }
  },

  computed: {
    boards () {
      return this.$store.state.boards.boards.filter(board => {
        return _.find(this.boardUsers, { board: board.id })
      })
    },
  }
}
</script>
