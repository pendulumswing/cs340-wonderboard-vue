<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2" primary-title) New User
      v-card-text
        v-row
          v-col
            // id
            v-text-field(
              v-model="data.id"
              label="id"
              disabled
            )

            // username
            v-text-field(
              v-model="data.username"
              label="username"
              :rules="[min1chars, max64chars]"
              counter="64"
            )

            // first_name
            v-text-field(
              v-model="data.firstName"
              label="first_name"
              :rules="[min1chars, max64chars]"
              counter="64"
            )

            // last_name
            v-text-field(
              v-model="data.lastName"
              label="last_name"
              :rules="[min1chars, max64chars]"
              counter="64"
            )

            // Email
            v-text-field(
              v-model="data.email"
              label="email"
              :rules="[min1chars, max128chars]"
              counter="128"
            )

            // Password
            v-text-field(
              v-model="data.password"
              label="password"
              :rules="[min1chars, max256chars]"
              counter="256"
            )
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: this.$store.state.users.length + 1,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      max32chars: v => ( v && v.length <= 32) || 'Input too long',
      max64chars: v => ( v && v.length <= 64) || 'Input too long',
      max128chars: v => ( v && v.length <= 128) || 'Input too long',
      max256chars: v => ( v && v.length <= 256) || 'Input too long',
      min1chars: v => ( v && v.length > 0) || 'Input too short'
    }
  },

  methods: {
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    onSubmit () {
      // const valid = this.$refs.form.validate()
      this.onClose()
      // if (valid) {
      //   this.request = this.$lore.actions.user.create(this.data).payload
      // }
    }
  }
}
</script>
