<template lang="pug">
  div
    // Delete User
    v-btn(
      v-show="board.creator === user.id"
      color="white white--text"
      x-small
      depressed
      icon
      @click.stop.prevent="showDeleteBoardDialog=true"
    )
      v-icon(small) mdi-delete

    // Dialog
    span
      DeleteBoardDialog(
        v-if="showDeleteBoardDialog"
        :board="board"
        @close="showDeleteBoardDialog = false"
      )
</template>

<script>
import DeleteBoardDialog from '@/dialogs/board/Delete'

export default {
  name: 'deleteBoardDialog',

  components: {
    DeleteBoardDialog
  },

  props: {
    user: {
      type: Object,
      default: undefined
    },
    board: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showDeleteBoardDialog: false
    }
  }
}
</script>
