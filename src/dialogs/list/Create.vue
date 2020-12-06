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

              // creator
              v-text-field(
                v-model="data.creator"
                label="creator"
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
import { mapState, mapGetters, mapActions } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'
import _ from 'lodash'

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
        // id: this.$store.state.lists.lists.length + 1,
        board: Number(this.$route.params.boardId),
        name: '',
        index: this.lists.length + 1,
        creator: Number(this.$route.params.userId),
        color: this.$store.state.colors[0].color
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short',
      min0chars: v => (v && v.length < 0) || 'Input too short',
      min1: v => (v && v > 0) || 'Must be greater than 0'
    }
  },

  computed: {
    maxIndex (v) {
      return v => (v && v <= this.lists.length + 1) || `Must be less than or equal to ${this.lists.length + 1}`
    },

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
    ...mapActions([
      'createList',
      'updateList'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        console.log('CREATE list submitted')
        // console.log('listId to create: ', this.data.id)
        this.shiftListsUp(this.data)
        this.createList(this.data)
        this.onClose()
      }
    },

    shiftListsUp (newList) {
      let listArray = _.cloneDeep(this.lists)

      // Find index of list with same index as payload, if any
      const targetIndex = listArray.findIndex(list => {
        console.log(list.index, ', ', this.data.index - 1)
        return list.index === Number(this.data.index) - 1
      })

      listArray.forEach((list, index) => {
        if (index > targetIndex) {
          list.index += 1
          this.updateList(list)
        }
      })
    }
  }
}
</script>
