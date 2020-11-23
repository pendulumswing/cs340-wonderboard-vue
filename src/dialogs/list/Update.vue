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
          p {{ getListsByBoard(list.board) }}
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
            autofocus
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

          // index
          v-text-field(
            v-model="data.index"
            label="index"
            min='1'
            :max='lists.length + 1'
            type='number'
          )

      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  props: {
    list: {
      type: Object,
      default: undefined
    },

    lists: {
      type: [Object, Array],
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
        color: this.list.color || '',
        creator: Number(this.$route.params.userId) || undefined
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
    }),

    ...mapGetters([
      'getListsByBoard'
    ])
  },

  methods: {
    ...mapActions([
      'updateList'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        console.log('calling shiftLists')
        this.shiftLists()
        this.updateList(this.data)
        console.log('UPDATE user submitted')
        this.onClose()
      }
    },

    shiftLists () {
      let moveUp = false
      let moveDown = false

      let listArray = _.cloneDeep(this.lists)
      console.log('listArray', listArray)

      // const newIndex = this.list.index
      // Find index of list with same index as payload, if any
      const newIndex = listArray.findIndex(list => {
        console.log(list.index, ', ', this.data.index)
        return list.index === Number(this.data.index)
      })

      // Find old index in array
      const oldIndex = listArray.findIndex(list => {
        return list.id === this.list.id
      })

      if (oldIndex >= 0) {
        oldIndex < newIndex ? moveUp = true : moveDown = true
      }

      console.log(oldIndex, ', ', newIndex, ', ', moveUp, ', ', moveDown)

      if (moveUp) {
        // For every item below new index...
        listArray.forEach((list, index) => {
          if (index <= newIndex && index > oldIndex) {
            list.index -= 1
            this.updateList(list)
          }
        })
      }

      if (moveDown) {
        // For every item above new index...
        listArray.forEach((list, index) => {
          if (index >= newIndex && index < oldIndex) {
            list.index += 1
            this.updateList(list)
          }
        })
      }
    }
  }
}
</script>
