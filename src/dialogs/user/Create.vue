<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2" primary-title) New User
      v-card-text
        v-container(grid-list-md)
          v-layout(justify-center wrap)
            v-flex(xs8)
              v-text-field(
                v-model="data.username"
                label="username"
                :rules="[min1chars, max32chars]"
                counter="32"
              )
              v-text-field(
                v-model="data.email"
                label="email"
                :rules="[min1chars, max32chars]"
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
        username: '',
        email: ''
      },
      max32chars: v => v.length <= 32 || 'Input too long',
      min1chars: v => v.length > 0 || 'Input too short'
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
      // const valid = this.$refs.form.validate()
      //
      // if (valid) {
      //   this.request = this.$lore.actions.user.create(this.data).payload
      // }
    }
  }
}
</script>
