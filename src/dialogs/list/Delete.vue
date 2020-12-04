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
        //
          v-card-text.pt-6
            p Are sure you want to delete list
              span.font-weight-bold  '{{ list.name }}'
              |?
          v-card-text.pb-0
            p If yes, confirm by typing
              span.font-weight-bold.px-1 DELETE
              | into the box below:
          v-text-field(
            autofocus
            filled
            v-model="confirmDelete"
            placeholder="DELETE"
            :rules="[confirmDeleteRule]"
          ).confirmbox
      v-card-actions.pt-0
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose()") Cancel
        v-btn(color="red darken-1" text @click='onSubmit()') Delete
</template>

<script>
// import { mapState } from 'vuex'
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
      // TODO - make call to delete user here
      console.log('DELETE list submitted')
      this.shiftListsDown()
      this.deleteList(this.list)
      this.onClose()
    },

    shiftListsDown () {
      let listArray = _.cloneDeep(this.lists)
      console.log('listArray', listArray)

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
