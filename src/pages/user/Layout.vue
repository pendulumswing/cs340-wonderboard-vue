
<template lang="pug">
  div
    v-card.elevation-0
      v-card-title
        div
          router-link(to="/")
            span.grey--text Home
          span.grey--text.mx-1 :
          span.grey--text.text--darken-2 {{ user.first_name }} {{ user.last_name }}
        v-spacer
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateBoardDialog=true"
        ) Add Board
      v-card-text
        // v-row.pl-3.pb-5
          div.text-justify.
            This is the boards page for the selected user. It lists all boards associated with the user.
            Selecting a board tile will redirect to the the board detail page for that board and that user.
          ul
            li.text-justify.
              A new board can be created with the 'ADD BOARD' button (CREATE).
            li.text-justify.
              All boards are fetched from the the database and listed here, based on route parameter 'userId' (READ).
            li.text-justify.
              A board can be updated by selecting the pencil icon on the board tile. A dialog will popup to edit any fields. (UPDATE).
            li.text-justify.
              A board can also be deleted with the delete icon (DELETE).
        v-row
          v-col(v-for="board in boards" cols="6" md="4" lg="3")
            router-link(:to="`/users/${user.id}/boards/${board.id}`")
              v-card(:color="board.color")
                v-card-title.pb-0
                  div.title.white--text {{ board.name }}
                  v-spacer

                  // Edit User
                  EditBoardButton(:board="board").pr-2

                  // Delete User
                  DeleteBoardButton(:board="board")
                v-card-text
                  span Tasks: {{ board.tasks }}

        // Description
        v-row.pl-3.pt-5
          div.text-justify.
            This is the boards page for the selected user. It lists all boards associated with the user.
            Selecting a board tile will redirect to the the board detail page for that board and that user.
          ul
            li.text-justify.
              A new board can be created with the 'ADD BOARD' button (CREATE).
            li.text-justify.
              All boards are fetched from the the database and listed here, based on route parameter 'userId' (READ).
            li.text-justify.
              A board can be updated by selecting the pencil icon on the board tile. A dialog will popup to edit any fields. (UPDATE).
            li.text-justify.
              A board can also be deleted with the delete icon (DELETE).
    span
      CreateBoardDialog(
        v-if="showCreateBoardDialog"
        @close="showCreateBoardDialog = false"
      )
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import CreateBoardDialog from '@/dialogs/board/Create'
import DeleteBoardButton from './DeleteBoardButton'
import EditBoardButton from './EditBoardButton'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateBoardDialog,
    DeleteBoardButton,
    EditBoardButton
  },

  data () {
    return {
      showCreateBoardDialog: false,
      showDeleteBoardDialog: false,
      showUpdateBoardDialog: false,
    }
  },

  computed: {
    user () {
      return this.$store.state.users.find(user => {
        return user.id === Number(this.$route.params.userId)
      })
    },

    boards () {
      return this.$store.state.boards
    }
  }
}
</script>

<style lang="scss">

</style>
