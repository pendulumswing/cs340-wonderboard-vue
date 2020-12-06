<template lang="pug">
  div
    // Edit User
    v-btn(
      color="grey lighten-1 white--text"
      small
      depressed
      icon
      @click.stop.prevent="showUpdateTaskDialog=true"
    )
      v-icon(small) mdi-pencil

    // Dialog
    span
      UpdateTaskDialog(
        v-if="showUpdateTaskDialog"
        :lists="lists"
        :task="task"
        :users="users"
        @close="showUpdateTaskDialog = false"
      )
</template>

<script>
import UpdateTaskDialog from '@/dialogs/task/Update'

export default {
  name: 'editTaskButton',

  components: {
    UpdateTaskDialog
  },

  props: {
    lists: {
      type: [Array, Object],
      default: undefined
    },
    task: {
      type: [Array, Object],
      default: undefined
    },
    users: {
      type: [Array, Object],
      default: undefined
    }
  },

  data () {
    return {
      showUpdateTaskDialog: false
    }
  }
}
</script>
