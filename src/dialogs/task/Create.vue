<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) New Task
      v-card-text
        v-form(ref="form")
          v-row
            v-col

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

              // description
              v-textarea(
                auto-grow
                rows="3"
                v-model="data.description"
                label="description"
                :rules="[max4096chars]"
                counter="4096"
              )

              // list
              v-select(
                v-model="data.list"
                label="list"
                :items="lists"
                item-text="name"
                item-value="id"
                counter="4096"
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
        list: this.lists[0].id || undefined,
        name: '',
        description: '',
        creator: Number(this.$route.params.userId)
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max255chars: v => (v && v.length <= 255) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      max4096chars: v => (v.length <= 4096) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short',
      rules: {
        min0: value => value >= 0 || 'Min 0',
        min1: value => value >= 1 || 'Min 1',
        min5: value => value >= 5 || 'Min 5',
        max5: value => value <= 5 || 'Max 5',
        max10: value => value <= 10 || 'Max 10',
        max20: value => value <= 20 || 'Max 20',
        max30: value => value <= 30 || 'Max 30',
        max80: value => value <= 80 || 'Max 80',
        max100: value => value <= 100 || 'Max 100',
        max180: value => value <= 180 || 'Max 180',
        max250: value => value <= 250 || 'Max 250',
        max500: value => value <= 500 || 'Max 500',
        max1k: value => value <= 1000 || 'Max 1000'
      }
    }
  },

  methods: {
    ...mapActions([
      'createTask'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        this.createTask(this.data)
        this.onClose()
      }
    }
  }
}
</script>
