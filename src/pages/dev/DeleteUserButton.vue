<template lang="pug">
  div
    // Delete User
    v-btn(
      color="grey lighten-2 white--text"
      x-small
      depressed
      fab
      @click.stop.prevent="showDeleteUserDialog=true"
    )
      v-icon(small) mdi-delete
    span
      DeleteUserDialog(
        v-if="showDeleteUserDialog"
        :user="user"
        @close="showDeleteUserDialog = false"
      )
</template>

<script>
import DeleteUserDialog from '@/dialogs/user/Delete'

export default {
  name: 'deleteUserButton',
  components: {
    DeleteUserDialog
  },
  props: {
    user: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showDeleteUserDialog: false
    }
  }

  // computed: {
  //   users () {
  //     return this.$store.state..users.users
  //   }
  // },
  //
  // methods: {
  //   onDelete () {
  //     alert('deleting user')
  //   },
  //
  //   onEdit () {
  //     alert('edit user')
  //   }
  // }
}
</script>
