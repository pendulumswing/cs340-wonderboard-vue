<template lang="pug">
  div
    // Edit User
    v-btn(
      color="white lighten-2 white--text"
      x-small
      depressed
      icon
      @click.stop.prevent="showUpdateBoardDialog=true"
    )
      v-icon(small) mdi-pencil
    span
      UpdateBoardDialog(
        v-if="showUpdateBoardDialog"
        :board="board"
        @close="showUpdateBoardDialog = false"
      )
</template>

<script>
import UpdateBoardDialog from '@/dialogs/board/Update'

export default {
  name: 'editUserButton',
  components: {
    UpdateBoardDialog
  },
  props: {
    board: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showUpdateBoardDialog: false
    }
  }
}
</script>
