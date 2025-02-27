<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) New Board
      v-card-text
        v-form(ref="form")

          // creator
          v-text-field(
            v-model="data.creator"
            label="creator"
            required
            disabled
          )

          // name
          v-text-field(
            autofocus
            v-model="data.name"
            label="name"
            :rules="[min1chars, max64chars]"
            counter="64"
            required
          )

          // color
          v-select(
            v-model="data.color"
            :items="colors"
            label="color"
            item-value="color"
            item-text="name"
            required
          )

      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
import DialogMixin from '../../mixins/DialogMixin'
import { mapState, mapActions } from 'vuex'

export default {
  mixins: [
    DialogMixin
  ],

  data () {
    return {
      show: true,
      request: undefined,
      form: undefined,
      data: {
        name: '',
        creator: Number(this.$route.params.userId) || undefined,
        color: this.$store.state.colors[0].color
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max255chars: v => (v && v.length <= 255) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short'
    }
  },

  computed: {
    ...mapState(['colors'])
  },

  mounted () {
    this.form = this.$refs.form
  },

  methods: {
    ...mapActions([
      'createBoard'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        this.createBoard(this.data)
        this.onClose()
      }
    }
  }
}
</script>
