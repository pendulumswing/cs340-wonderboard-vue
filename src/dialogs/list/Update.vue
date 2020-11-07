<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) Edit List
      v-card-text
        v-form(ref="form")
          // id
          v-text-field(
            v-model="data.id"
            label="id"
            disabled
          )

          // board
          v-text-field(
            v-model="data.board"
            label="board"
            disabled
          )

          // index
          v-text-field(
            v-model="data.index"
            label="index"
            disabled
          )

          // name
          v-text-field(
            v-model="data.name"
            label="name"
            :rules="[min1chars, max128chars]"
            counter="128"
            required
          )

          // color
          v-select(
            v-model="data.color"
            :items="colors"
            label="color"
            item-value="color"
            item-text="name"
          )

      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
import { mapState, mapActions } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  props: {
    list: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: Number(this.list.id) || '',
        board: Number(this.list.board) || '',
        index: Number(this.list.index) || '',
        name: this.list.name || '',
        color: this.list.color || ''
        // creator: this.$route.params.userId || undefined
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short'
    }
  },

  computed: {
    ...mapState({
      colors () {
        return this.$store.state.colors
      }
    })
  },

  methods: {
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    ...mapActions([
      'updateList'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        this.updateList(this.data)
        console.log('UPDATE user submitted')
        this.onClose()
      }
    }
  }
}
</script>
