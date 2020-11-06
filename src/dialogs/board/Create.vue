<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) New Board
      v-card-text
        v-form(ref="form")

          // id
          v-text-field(
            v-model="data.id"
            label="id"
            disabled
          )

          // creator
          v-text-field(
            v-model="data.creator"
            label="creator"
            required
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
          v-select(
            v-model="data.color"
            :items="colors"
            label="color"
            item-value="color"
            item-text="name"
          ).pb-0

          // role
            v-text-field(
              v-model="data.role"
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
import { mapState } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'
import _ from 'lodash'

export default {
  mixins: [
    DialogMixin
  ],

  data () {
    return {
      show: true,
      request: undefined,
      form: undefined,
      data: {
        id: this.$store.state.boards.boards.length + 1,
        name: '',
        color: '',
        // role: '',
        creator: this.$route.params.userId || undefined
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      max32chars: v => ( v && v.length <= 32) || 'Input too long',
      max64chars: v => ( v && v.length <= 64) || 'Input too long',
      max128chars: v => ( v && v.length <= 128) || 'Input too long',
      max256chars: v => ( v && v.length <= 256) || 'Input too long',
      min1chars: v => ( v && v.length > 0) || 'Input too short'
    }
  },

  computed: {
    ...mapState({
      colors () {
        return this.$store.state.colors
      }
    })
  },

  mounted () {
    this.form = this.$refs.form
    // console.log('form: ', _.isEmpty(this.form))
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
        console.log('CREATE board submitted')
        this.onClose()
      }
    },
  }
}
</script>
