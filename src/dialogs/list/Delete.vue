<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title red lighten-2" primary-title) Delete List?
      v-card-text.pt-6
        p Are sure you want to delete list
          span.font-weight-bold  '{{ list.name }}'
          |?
      v-card-text.pb-0
        p If yes, confirm by typing
          span.font-weight-bold.px-1 DELETE
          | into the box below:
      v-card-text
        v-text-field(
          filled
          v-model="confirmDelete"
          placeholder="DELETE"
          :rules="[confirmDeleteRule]"
        ).confirmbox
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose()") Cancel
        v-btn(:disabled="confirmDelete !== 'DELETE'" color="red darken-1" text @click='onSubmit()') Delete
</template>

<script>
// import { mapState } from 'vuex'
import DialogMixin from '../../mixins/DialogMixin'

export default {
  mixins: [
    DialogMixin
  ],

  props: [
    'design',
    'list'
  ],

  data () {
    return {
      show: true,
      confirmDelete: '',
      confirmDeleteRule: s => s === 'DELETE' || 'Mismatch'
    }
  },

  // computed: {
  //   ...mapState({
  //     autobreak: function (state) {
  //       if (this.design.data.autobreak) {
  //         return this.$useConnect('autobreak.byId', {
  //           id: this.design.data.autobreak
  //         })
  //       }
  //     },
  //     _design: function (state) {
  //       return this.$useConnect('design.byId', {
  //         id: this.design.id
  //       })
  //     }
  //   })
  // },
  //
  // watch: {
  //   autobreak: function (newModel, oldModel) {
  //     if (
  //       oldModel &&
  //       oldModel.state === PayloadStates.DELETING &&
  //       newModel.state === PayloadStates.DELETED
  //     ) {
  //       this.onClose()
  //     }
  //   },
  //   _design: function (newDesign, oldDesign) {
  //     if (newDesign.state === PayloadStates.DELETED) {
  //       this.onClose()
  //     }
  //   }
  // },

  methods: {
    onSubmit () {
      // TODO - make call to delete user here
      console.log('DELETE list submitted')
      this.onClose()
    },
  }
}
</script>
