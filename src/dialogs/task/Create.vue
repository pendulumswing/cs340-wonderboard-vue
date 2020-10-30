<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2" primary-title) New Task
      v-card-text
        v-container(grid-list-md)
          v-layout(justify-center wrap)
            v-flex(xs8)
              v-text-field(
                v-show=false
                v-model="data.id"
                label="id"
                type="number"
                single-line
                :rules="[rules.min1, rules.max100]"
                counter="32"
                disabled
              )
              v-text-field(
                v-model="data.name"
                label="name"
                :rules="[min1chars, max64chars]"
                counter="128"
              )
              v-text-field(
                v-model="data.status"
                label="status"
                :rules="[min1chars, max32chars]"
                counter="32"
              )
              //
                v-text-field(
                  v-model="data.description"
                  label="description"
                  :rules="[min1chars, max32chars]"
                  counter="32"
                )
              v-text-field(
                v-model="data.list"
                label="list"
                type="number"
                single-line
                :rules="[rules.min1, rules.max100]"
                counter="32"
              )
      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
// import DialogMixin from '../../mixins/DialogMixin'

export default {
  // mixins: [
  //   DialogMixin
  // ],

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: this.$store.state.tasks.length + 1,
        name: '',
        status: '',
        list: 1
        // description: '',
      },
      max32chars: v => v.length <= 32 || 'Input too long',
      max64chars: v => v.length <= 64 || 'Input too long',
      min1chars: v => v.length > 0 || 'Input too short',
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
      // TODO add to state using vuex actions
      // this.$store.state.tasks.push(this.data)
      this.onClose()
      // const valid = this.$refs.form.validate()
      //
      // if (valid) {
      //   this.request = this.$lore.actions.user.create(this.data).payload
      // }
    }
  }
}
</script>
