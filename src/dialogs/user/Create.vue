<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) New User
      v-card-text
        v-form(ref="form")

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
              v-model="data.first_name"
              label="first_name"
              :rules="[min1chars, max64chars]"
              counter="64"
            )

            // last_name
            v-text-field(
              v-model="data.last_name"
              label="last_name"
              :rules="[min1chars, max64chars]"
              counter="64"
            )

            // Email
            v-text-field(
              v-model="data.email"
              label="email"
              :rules="emailRules"
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
import { mapActions } from 'vuex'

export default {
  mixins: [
    DialogMixin
  ],

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: this.$store.state.users.users.length + 1,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      max32chars: v => ( v && v.length <= 32) || 'Input too long',
      max64chars: v => ( v && v.length <= 64) || 'Input too long',
      max128chars: v => ( v && v.length <= 128) || 'Input too long',
      max256chars: v => ( v && v.length <= 256) || 'Input too long',
      min1chars: v => ( v && v.length > 0) || 'Input too short'
    }
  },

  methods: {
    ...mapActions([
      'createUser'
    ]),
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        this.createUser(this.data)
        console.log('CREATE user submitted')
        this.onClose()
      }
    },
  }
}
</script>
