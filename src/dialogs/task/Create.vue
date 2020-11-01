<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2" primary-title) New Task
      v-card-text
        v-form(ref="form")
          v-row
            v-col
              p lists: {{ lists }}
              p Selected List: {{ data.list }}

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

              // description
              v-text-field(
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
        id: this.$store.state.tasks.length + 1,
        list: Object,
        name: '',
        description: '',
        creator: this.$route.params.userId
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      max4096chars: v => (v.length <= 4096) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short',
      rules: {
        min0: value => value >= 0 || 'Min 0',
        min1: value => value >= 1 || 'Min 1',
        min5: value => value >= 5 || 'Min 5',
        min10: value => value >= 10 || 'Min 10',
        min30: value => value >= 30 || 'Min 30',
        min40: value => value >= 40 || 'Min 40',
        min50: value => value >= 50 || 'Min 50',
        min10k: value => value >= 10000 || 'Min 10k',
        min500k: value => value >= 500000 || 'Min 500K',
        max5: value => value <= 5 || 'Max 5',
        max10: value => value <= 10 || 'Max 10',
        max20: value => value <= 20 || 'Max 20',
        max30: value => value <= 30 || 'Max 30',
        max42: value => value <= 42 || 'Max 42',
        max70: value => value <= 70 || 'Max 70',
        max80: value => value <= 80 || 'Max 80',
        max96: value => value <= 96 || 'Max 96',
        max100: value => value <= 100 || 'Max 100',
        max180: value => value <= 180 || 'Max 180',
        max250: value => value <= 250 || 'Max 250',
        max500: value => value <= 500 || 'Max 500',
        max1k: value => value <= 1000 || 'Max 1000',
        max100k: value => value <= 100000 || 'Max 100K',
        max1M: value => value <= 1000000 || 'Max 1M',
        max5M: value => value <= 5000000 || 'Max 5M'
      }
    }
  },

  methods: {
    // getRequest (request) {
    //   return this.$useConnect('user.byCid', {
    //     cid: request.cid
    //   })
    // },
    onClose () {
      this.show = false
      setTimeout(() => {
        this.$emit('close')
      }, 300)
    },
    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        console.log('CREATE task submitted')
        this.onClose()
      }
    },
  }
}
</script>
