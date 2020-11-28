<template lang="pug">
  div
    // Delete List
    v-btn(
      color="white lighten-2 white--text"
      x-small
      depressed
      icon
      @click.stop.prevent="showDeleteListDialog=true"
    )
      v-icon(small) mdi-delete
    span
      DeleteListDialog(
        v-if="showDeleteListDialog"
        :list="list"
        :lists="lists"
        @close="showDeleteListDialog = false"
      )
</template>

<script>
import DeleteListDialog from '@/dialogs/list/Delete'

export default {
  name: 'deleteListButton',

  components: {
    DeleteListDialog
  },

  props: {
    list: {
      type: Object,
      default: undefined
    },
    lists: {
      type: [Object, Array],
      default: undefined
    }
  },

  data () {
    return {
      showDeleteListDialog: false
    }
  }
}
</script>
