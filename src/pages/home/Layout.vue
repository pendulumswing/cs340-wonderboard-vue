<template lang="pug">
  div
    v-card(color="transparent").elevation-0
      v-card-title
        span.grey--text.text--darken-2 Users
        v-spacer
        v-btn(
          color="grey white--text"
          tile
          @click="showCreateUserDialog=true"
        ) Add User
      v-card-text
        // Debug
          div
            p users: {{ $store.state.users.users }}
            p boards: {{ $store.state.boards.boards }}
            p boardsUsers: {{ $store.state.boardUsers.boardUsers }}
            p lists: {{ $store.state.lists.lists }}
            p tasks: {{ $store.state.tasks.tasks }}
            p tasksUsers: {{ $store.state.taskUsers.taskUsers }}
        v-row
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

        // Description
        v-row.pl-3.pt-7
          div.text-justify.
            This is the landing page for the site. It lists all users in the database.
            Selecting a user tile will redirect to the boards page for that user.
          div.pt-3
            div.text-start.subtitle-1 users
            ul
              li.text-justify.
                A new user can be created with the 'ADD USER' button (CREATE).
              li.text-justify.
                All users are fetched from the the database and listed here (READ).
              li.text-justify.
                A user can be updated by selecting the pencil icon on the user tile. A dialog will popup to edit any fields. (UPDATE).
              li.text-justify.
                A user can also be deleted with the delete icon (DELETE).
          div.text-justify.pt-3.
            NOTE: The path breadcrumbs can also be clicked to move around the site.
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
      showDeleteUserDialog: false
    }
  },

  computed: {
    users () {
      return this.$store.state.users.users
    }
  },

  methods: {
    onDelete () {
      alert('deleting user')
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
