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
            v-row.d-flex.justify-space-between.justify-lg-space-around.align-center
              v-col(cols="2")
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onGetUsers"
                ) Get Users
              v-col(cols="2")
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onCreateUser"
                ) Add User
              v-col(cols="2")
                p.title Select User:
                v-select(
                  v-model="selectedUser"
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
              v-col(cols="2")
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onDeleteUser(selectedUser.id)"
                ) Delete User
              v-col(cols="2")
                v-btn(
                  color="grey white--text"
                  tile
                  @click="onUpdateUser"
                ) Edit User
            v-row.py-5
              v-col
                p Show Results Here
                p {{ usersResponse }}
            v-row.py-5
              p store
              p {{ $store.state.users.users }}
    v-card(color="transparent" flat)
      v-card-text
        UserForm
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
import { mapActions } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
import CreateUserDialog from '../../dialogs/user/Create'
import DeleteUserDialog from '../../dialogs/user/Delete'
import DeleteUserButton from './DeleteUserButton'
import EditUserButton from './EditUserButton'
import UserForm from './UserForm'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateUserDialog,
    DeleteUserDialog,
    DeleteUserButton,
    EditUserButton,
    UserForm
  },

  data () {
    return {
      showCreateUserDialog: false,
      showDeleteUserDialog: false,
      usersResponse: [],
      userPayload: {
        username: 'test',
        first_name: 'fName',
        last_name: 'lName',
        email: 'test@email.com',
        password: 'password'
      },
      selectedUser: {
        id: 1,
        username: 'test_update',
        first_name: 'fName_update',
        last_name: 'lName_update',
        email: 'test@email.com_update',
        password: 'password'
      },
      updateUserPayload: {
        id: 1,
        username: 'test_update',
        first_name: 'fName_update',
        last_name: 'lName_update',
        email: 'test@email.com_update',
        password: 'password'
      }
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
      const payload = this.userPayload
      this.createUser(payload)
    },

    onDeleteUser (id) {
      this.deleteUser(id)
    },

    onUpdateUser () {
      let payload = this.updateUserPayload
      payload.id = this.selectedUser.id
      this.updateUser(payload)
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
