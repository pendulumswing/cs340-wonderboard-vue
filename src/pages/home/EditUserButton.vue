<template lang="pug">
  div
    // Edit User
    v-btn(
      color="grey lighten-2 white--text"
      x-small
      depressed
      fab
      @click.stop.prevent="showUpdateUserDialog=true"
    )
      v-icon(small) mdi-pencil

    // Dialog
    span
      UpdateUserDialog(
        v-if="showUpdateUserDialog"
        :user="user"
        @close="showUpdateUserDialog = false"
      )
</template>

<script>
import UpdateUserDialog from '@/dialogs/user/Update'

export default {
  name: 'editUserButton',

  components: {
    UpdateUserDialog
  },

  props: {
    user: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showUpdateUserDialog: false
    }
  }
}
</script>
