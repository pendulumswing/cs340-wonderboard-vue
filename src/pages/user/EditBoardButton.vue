<template lang="pug">
  div
    // Edit User
    v-btn(
      v-if="board.creator === user.id"
      color="white lighten-2 white--text"
      x-small
      depressed
      icon
      @click.stop.prevent="showUpdateBoardDialog=true"
    )
      v-icon(small) mdi-pencil
    div(v-else :class="memberTextColor").caption.pa-0
      div.pa-0 Guest

    // Dialog
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
  name: 'editBoardButton',

  components: {
    UpdateBoardDialog
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
      showUpdateBoardDialog: false
    }
  },

  computed: {
    // SOURCE: https://bit.ly/3n6rxi8
    memberTextColor () {
      return `text--darken-1 ${this.board.color.replace(/ .*/, '')}--text`
    }
  }
}
</script>
