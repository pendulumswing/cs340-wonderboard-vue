<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title red lighten-2" primary-title) Delete User?
      v-card-text.pt-6
        p Are sure you want to delete user
          span.font-weight-bold  '{{user.first_name}} {{user.last_name}}'
          |?
      v-card-text.pb-0
        p If yes, confirm by typing
          span.font-weight-bold.px-1 DELETE
          | into the box below:
      v-card-text
        v-text-field(
          autofocus
          filled
          v-model="confirmDelete"
          placeholder="DELETE"
          :rules="[confirmDeleteRule]"
        ).confirmbox
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose()") Cancel
        v-btn(:disabled="confirmDelete !== 'DELETE'" color="red darken-1" text @click='onSubmit()') Delete
</template>

<script>
import { mapActions } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  props: [
    'design',
    'user'
  ],

  data () {
    return {
      show: true,
      confirmDelete: '',
      confirmDeleteRule: s => s === 'DELETE' || 'Mismatch'
    }
  },

  methods: {
    ...mapActions([
      'deleteUser'
    ]),

    onSubmit () {
      this.deleteUser(this.user)
      this.onClose()
    }
  }
}
</script>
