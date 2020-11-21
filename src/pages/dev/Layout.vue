<template lang="pug">
  div
    v-card(color="transparent").elevation-0
      v-card-title
        span.grey--text.text--darken-2
        v-spacer
        //
          v-btn(
            color="grey white--text"
            tile
            @click="showCreateUserDialog=true"
          ) Add User

      v-card-text
        v-card
          v-card-title
            p.grey--text.text--darken-2 Development
          v-card-text
            v-row.d-flex.justify-space-between.justify-lg-space-around
              v-btn(
                color="grey white--text"
                tile
                @click="onGetUsers"
              ) Get Users
              v-btn(
                color="grey white--text"
                tile
                @click="onAddUser"
              ) Add User
              v-btn(
                color="grey white--text"
                tile
                @click="onDeleteUser"
              ) Delete User
              v-btn(
                color="grey white--text"
                tile
                @click="onUpdateUser"
              ) Edit User
            v-row.py-5
              v-col
                p Show Results Here
                p {{ usersResponse }}
        // Debug
          div
            p users: {{ $store.state.users.users }}
            p boards: {{ $store.state.boards.boards }}
            p boardsUsers: {{ $store.state.boardUsers.boardUsers }}
            p lists: {{ $store.state.lists.lists }}
            p tasks: {{ $store.state.tasks.tasks }}
            p tasksUsers: {{ $store.state.taskUsers.taskUsers }}
        //
          v-row(v-if="users.length > 0")
            v-col(v-for="user in users" cols="12" sm="6" md="4" lg="3")
              router-link(:to="`/users/${user.id}`")
                v-card
                  v-card-title.pb-3
                    p.title.grey--text.text--darken-2 {{ user.first_name + ' ' + user.last_name}}
                    v-spacer

                    // Edit User
                    EditUserButton(:user="user").pr-2

                    // Delete User
                    DeleteUserButton(:user="user")

                  v-card-text.text-start
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div id:
                      v-col
                        div {{ user.id }}
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div first_name:
                      v-col
                        div {{ user.first_name }}
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div last_name:
                      v-col
                        div {{ user.last_name }}
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div email:
                      v-col
                        div {{ user.email }}
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div username:
                      v-col
                        div {{ user.username }}
                    v-row.no-gutters.flex-nowrap
                      v-col(cols="6" md="5" lg="4")
                        div password:
                      v-col
                        div {{ user.password }}
          v-row(v-else)
            v-col.d-flex.justify-center
              div.text-center.subtitle-1 Add a user to get started.
    span
      CreateUserDialog(
        v-if="showCreateUserDialog"
        @close="showCreateUserDialog = false"
      )
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import CreateUserDialog from '../../dialogs/user/Create'
import DeleteUserDialog from '../../dialogs/user/Delete'
import DeleteUserButton from './DeleteUserButton'
import EditUserButton from './EditUserButton'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateUserDialog,
    DeleteUserDialog,
    DeleteUserButton,
    EditUserButton
  },

  data () {
    return {
      showCreateUserDialog: false,
      showDeleteUserDialog: false,
      usersResponse: []
    }
  },

  computed: {
    users () {
      return this.$store.state.users.users
    }
  },

  methods: {
    onGetUsers () {
      axios.get('users')
        .then(res => {
          console.log('users: ', res)
          this.usersResponse = res.data
        })
    },

    onAddUser (userPayload) {
      let payload = { username: 'test', first_name: 'fName', last_name: 'lName', email: 'test@email.com', password: 'password' }
      axios.post('users', payload)
        .then(res => {
          console.log(res)
          this.onGetUsers()
        })
        .catch(error => console.log(error))
    },

    onDeleteUser () {
      axios.delete('users/6')
        .then(res => {
          console.log('delete: ', res)
          this.onGetUsers()
        })
        .catch(error => console.log(error))
    },

    onUpdateUser () {
      let payload = { username: 'test_update', first_name: 'fName_update', last_name: 'lName_update', email: 'test@email.com', password: 'password' }
      axios.put('users/5', payload)
        .then(res => {
          console.log('update: ', res)
          this.onGetUsers()
        })
        .catch(error => console.log(error))
    },

    onEdit () {
      alert('edit user')
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
