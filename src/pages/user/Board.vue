<template lang="pug">
  div
    router-link(:to="`/users/${user.id}/boards/${board.id}`")
      v-card(:color="board.color")
        v-card-title.pb-0
          div.title.white--text {{ board.name }}
          v-spacer

          // Edit User
          EditBoardButton(:board="board").pr-2

          // Delete User
          DeleteBoardButton(:board="board")

        v-card-text.text-start.white--text
          v-row.no-gutters.flex-nowrap
            v-col(cols="6" md="5" lg="4")
              div id:
            v-col
              div {{ board.id }}

          v-row.no-gutters.flex-nowrap
            v-col(cols="6" md="5" lg="4")
              div tasks:
            v-col
              div {{ tasks.length }}
</template>

<script>
import DeleteBoardButton from './DeleteBoardButton'
import EditBoardButton from './EditBoardButton'

export default {
  name: 'board',

  components: {
    DeleteBoardButton,
    EditBoardButton
  },

  props: {
    board: {
      type: Object,
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showDeleteBoardDialog: false,
      showUpdateBoardDialog: false,
    }
  },

  computed: {
    tasks () {
      return this.$store.state.tasks.filter(task => {
        return task.board === this.board.id
      })
    }
  }
}
</script>
