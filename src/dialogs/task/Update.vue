<template lang='pug'>
  v-dialog(
    v-model="show"
    max-width="400px"
    @click:outside="onClose"
  )
    v-card
      v-card-title(class="title blue lighten-2 white--text" primary-title) Edit Task
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

              // creator
              v-select(
                v-model="data.creator"
                label="creator"
                :items="addNullToUsers"
                item-text2="first_name"
                item-value="id"
              )
                template(v-slot:item="{ item }")
                  span.grey--text {{ item.first_name }} {{ item.last_name }}
                template(v-slot:selection="{ item }")
                  span {{ item.first_name }} {{ item.last_name }}

              // list
              v-select(
                v-model="data.list"
                label="list"
                :items="lists"
                item-text="name"
                item-value="id"
              )

      v-card-actions
        v-spacer
        v-btn(color="blue darken-1" text @click="onClose") Cancel
        v-btn(color="blue darken-1" text @click="onSubmit") Save
</template>

<script>
import DialogMixin from '../../mixins/DialogMixin'
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  mixins: [
    DialogMixin
  ],

  props: {
    lists: {
      type: [Array, Object],
      default: undefined
    },
    task: {
      type: [Array, Object],
      default: undefined
    },
    users: {
      type: [Array, Object],
      default: undefined
    }
  },

  data () {
    return {
      show: true,
      request: undefined,
      data: {
        id: Number(this.task.id) || '',
        list: Number(this.task.list) || '',
        name: this.task.name || '',
        description: this.task.description || '',
        creator: Number(this.task.creator) || null
      },
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      max4096chars: v => (v.length <= 4096) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short'
    }
  },

  computed: {
    addNullToUsers () {
      const users = _.cloneDeep(this.users)
      users.push({
        id: null,
        first_name: 'Null',
        last_name: ''
      })
      return users
    }
  },

  methods: {
    ...mapActions([
      'updateTask'
    ]),

    onSubmit () {
      const valid = this.$refs.form.validate()

      if (valid) {
        // TODO - make call to delete user here
        this.updateTask(this.data)
        console.log('UPDATE user submitted')
        this.onClose()
      }
    }
  }
}
</script>
