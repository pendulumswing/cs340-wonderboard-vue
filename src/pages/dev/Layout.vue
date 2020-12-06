<!--This page was used for development testing -->
<template lang="pug">
  div
    v-card(color="transparent").elevation-0
      v-card-title
        span.grey--text.text--darken-2
        v-spacer
      v-card-text

        // CRUD Operations
        v-card
          v-card-title(class="title grey white--text" primary-title) CRUD operations
          v-card-text
            v-row.d-flex.justify-space-between.justify-lg-space-around.align-center
              v-col
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onGetUsers"
                ) Get Users
              v-col
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onCreateUser"
                ) Create User
              v-col
                p.title Select User:
                v-select(
                  v-model="userPayload"
                  :items="users"
                  label="select user"
                  return-object
                  dense
                  single-line
                  height="20"
                  solo
                  flat
                ).pb-0
                  template(v-slot:item="{ item }")
                    span id: {{ item.id }}, name: {{ item.first_name }}
                  template(v-slot:selection="{ item }")
                    span id: {{ item.id }}
              v-col
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onUpdateUser"
                ) Update User
              v-col
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onDeleteUser(userPayload)"
                ) Delete User

        // User Form
        v-row
          v-col(cols="12" md="6").pr-2
            v-card
              v-card-title(class="title grey white--text" primary-title) User Form
              v-card-text
                v-form(ref="form")

                  // id
                  v-text-field(
                    v-model="userPayload.id"
                    label="id"
                    disabled
                  )

                  // username
                  v-text-field(
                    ref="inputFocus"
                    v-model="userPayload.username"
                    label="username"
                    :rules="[min1chars, max64chars]"
                    counter="64"
                  )

                  // first_name
                  v-text-field(
                    v-model="userPayload.first_name"
                    label="first_name"
                    :rules="[min1chars, max64chars]"
                    counter="64"
                  )

                  // last_name
                  v-text-field(
                    v-model="userPayload.last_name"
                    label="last_name"
                    :rules="[min1chars, max64chars]"
                    counter="64"
                  )

                  // Email
                  v-text-field(
                    v-model="userPayload.email"
                    label="email"
                    :rules="emailRules"
                    counter="128"
                  )

                  // Password
                  v-text-field(
                    v-model="userPayload.password"
                    label="password"
                    :rules="[min1chars, max256chars]"
                    counter="256"
                  )

          // Database
          v-col(cols="12" md="6").pl-1
            v-card
              v-card-title(class="title grey white--text" primary-title) Database
              v-card-text.pt-2
                div
                  div(v-for="(user, index) in users").py-1
                    v-row.no-gutters
                      v-col.text-justify
                        span.subtitle-2 User {{ user.id }}
                    v-row.no-gutters.pb-1
                      v-col(cols="1")
                      v-col
                        div(v-for="pair in Object.entries(user)").text-start
                          span.subtitle-2 {{ pair[0] }}:
                          span   {{ pair[1] }}
                    v-divider

            // Debug
              div
                p users: {{ $store.state.users.users }}
                p boards: {{ $store.state.boards.boards }}
                p boardsUsers: {{ $store.state.boardUsers.boardUsers }}
                p lists: {{ $store.state.lists.lists }}
                p tasks: {{ $store.state.tasks.tasks }}
                p tasksUsers: {{ $store.state.taskUsers.taskUsers }}
            //
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'dev',

  data () {
    return {
      userPayload: {
        id: undefined,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      max32chars: v => (v && v.length <= 32) || 'Input too long',
      max64chars: v => (v && v.length <= 64) || 'Input too long',
      max128chars: v => (v && v.length <= 128) || 'Input too long',
      max256chars: v => (v && v.length <= 256) || 'Input too long',
      min1chars: v => (v && v.length > 0) || 'Input too short'
    }
  },

  computed: {
    users () {
      return this.$store.state.users.users
    }
  },

  mounted () {
    this.getUsers()
  },

  methods: {
    ...mapActions([
      'createUser',
      'getUsers',
      'updateUser',
      'deleteUser'
    ]),
    onGetUsers () {
      this.getUsers()
    },

    onCreateUser () {
      const valid = this.$refs.form.validate()

      if (valid) {
        const payload = this.userPayload
        this.createUser(payload)
        this.resetUserPayload()
        this.$refs.form.reset()
      }
    },

    onDeleteUser (id) {
      this.deleteUser(id)
      this.resetUserPayload()
      this.$refs.form.reset()
    },

    onUpdateUser () {
      const valid = this.$refs.form.validate()

      if (valid) {
        let payload = this.userPayload
        this.updateUser(payload)
        this.resetUserPayload()
        this.$refs.form.reset()
      }
    },

    resetUserPayload () {
      this.userPayload = {
        id: undefined,
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}

body {
  background-color: transparent;
}
</style>
