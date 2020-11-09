<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) New List
      v-card-text
        v-form(ref="form")
          v-row
            v-col

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

              // creator
              v-text-field(
                v-model="data.creator"
                label="creator"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  props: {
    lists: {
      type: [Array, Object],
      default: undefined
    }
  },

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: this.$store.getters.getListAutoId + 1,
        board: Number(this.$route.params.boardId),
        name: '',
        index: this.lists.length + 1,
        creator: Number(this.$route.params.userId),
        color: ''
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short',
      min0chars: v => (v && v.length < 0) || 'Input too short'
    }
  },

  computed: {
    ...mapState({
      colors () {
        return this.$store.state.colors
      }
    }),
    ...mapGetters({
      getListAutoId: 'getListAutoId'
    })
  },

  methods: {
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    ...mapActions([
      'createList'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        console.log('CREATE list submitted')
        console.log('listId to create: ', this.data.id)
        this.createList(this.data)
        this.onClose()
      }
    }
  }
}
</script>
