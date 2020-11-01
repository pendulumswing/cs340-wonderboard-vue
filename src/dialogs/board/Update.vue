<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2" primary-title) Edit Board
      v-card-text
        p Role: {{ role.role }}
        v-form(ref="form")
          // id
          v-text-field(
            v-model="data.id"
            label="id"
            disabled
          )

          // name
          v-text-field(
            v-model="data.name"
            label="name"
            :rules="[min1chars, max64chars]"
            counter="64"
            required
          )

          // color
          v-text-field(
            v-model="data.color"
            label="color"
            :rules="[min1chars, max64chars]"
            counter="64"
            required
          )

          // role
          v-text-field(
            v-model="role.role"
            label="user role"
            :rules="[min1chars, max128chars]"
            counter="128"
            required
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

  props: {
    board: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: this.board.id || '',
        name: this.board.name || '',
        color: this.board.color || '',
        role: '',
        user: Number(this.$route.params.userId) || undefined
      },
      // SOURCE: https://vuetifyjs.com/en/components/forms/#misc
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

  computed: {
    role () {
      return this.$store.state.board_users.find(boardUser => {
        console.log('boardUser ID: ', boardUser.id, ' boardBU: ', boardUser.board, ' board: ', this.data.id, ' userBU: ', boardUser.user, ' user: ', this.data.user)
        return boardUser.board === this.data.id && boardUser.user === this.data.user
      })
    },
  },

  methods: {
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        console.log('UPDATE user submitted')
        this.onClose()
      }
    },
  }
}
</script>
