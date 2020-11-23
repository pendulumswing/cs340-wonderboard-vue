<template lang="pug">
  div
    // Edit User
    v-btn(
      color="white lighten-2 white--text"
      x-small
      depressed
      icon
      @click.stop.prevent="showUpdateListDialog=true"
    )
      v-icon(small) mdi-pencil
    span
      UpdateListDialog(
        v-if="showUpdateListDialog"
        :list="list"
        :lists="lists"
        @close="showUpdateListDialog = false"
      )
</template>

<script>
import UpdateListDialog from '@/dialogs/list/Update'

export default {
  name: 'editListButton',
  components: {
    UpdateListDialog
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
      showUpdateListDialog: false
    }
  }
}
</script>
