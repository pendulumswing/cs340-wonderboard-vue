<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title red lighten-2" primary-title) Delete List?
      v-card-text
        div.pt-5
        p Are you sure you want to delete this list?
        p All current tasks for the list will also be deleted.
      v-card-actions.pt-0
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose()") Cancel
        v-btn(color="red darken-1" text @click='onSubmit()') Delete
</template>

<script>
import { mapActions } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'
import _ from 'lodash'

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
      confirmDelete: '',
      confirmDeleteRule: s => s === 'DELETE' || 'Mismatch'
    }
  },

  methods: {
    ...mapActions([
      'deleteList',
      'updateList'
    ]),

    onSubmit () {
      this.shiftListsDown()
      this.deleteList(this.list)
      this.onClose()
    },

    shiftListsDown () {
      let listArray = _.cloneDeep(this.lists)

      // Find index in array
      const oldIndex = listArray.findIndex(list => {
        return list.id === this.list.id
      })

      // For every item above new index...
      listArray.forEach((list, index) => {
        if (index > oldIndex) {
          list.index -= 1
          this.updateList(list)
        }
      })
    }
  }
}
</script>
