
<template lang="pug">
  div
    v-card(color="transparent").elevation-0

      // Header
      v-card-title
        div
          router-link(to="/")
            span.grey--text Users
          span.grey--text.mx-1 :
          span.grey--text.text--darken-2 {{ user.first_name }} {{ user.last_name }}
        v-spacer
        v-btn(
          color="grey white--text"
          tile
          @click="showCreateBoardDialog=true"
        ) Add Board
      v-card-text

        // Board Array
        Boards(
          :user="user"
          :boardUsers="board_users"
        )

        // Description
        v-row.pl-3.pt-7
          div.text-justify.
            This is the boards page for the selected user. It lists all boards associated with the user.
            Selecting a board tile will redirect to the the board detail page for that board and that user.
          div.pt-3
            div.text-start.subtitle-1 boards
            ul
              li.text-justify.
                A new board can be created with the 'ADD BOARD' button (CREATE).
              li.text-justify.
                All boards are fetched from the the database and listed here, based on route parameter 'userId' (READ).
              li.text-justify.
                A board can be updated by selecting the pencil icon on the board tile. A dialog will popup to edit any fields. (UPDATE).
              li.text-justify.
                A board can also be deleted with the delete icon (DELETE).

    // Add Board Dialog
    span
      CreateBoardDialog(
        v-if="showCreateBoardDialog"
        @close="showCreateBoardDialog = false"
      )
</template>

<script>
import CreateBoardDialog from '@/dialogs/board/Create'
import Boards from './Boards'

export default {
  name: 'home',
  components: {
    CreateBoardDialog,
    Boards
  },

  data () {
    return {
      showCreateBoardDialog: false,
    }
  },

  computed: {
    user () {
      return this.$store.state.users.find(user => {
        return user.id === Number(this.$route.params.userId)
      })
    },

    board_users () {
      return this.$store.state.board_users.filter(boardUser => {
        return boardUser.user === Number(this.$route.params.userId)
      })
    },
  }
}
</script>

<style lang="scss">

</style>
