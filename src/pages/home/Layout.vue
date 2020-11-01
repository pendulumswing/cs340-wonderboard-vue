<template lang="pug">
  div
    v-card.elevation-0
      v-card-title
        span.grey--text.text--darken-2 Home
        v-spacer
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateUserDialog=true"
        ) Add User
      v-card-text
        v-row.pl-3.pb-5
          div.text-justify.
            This is the landing page for the site. It lists all users in the database.
            Selecting a user tile will redirect to the boards page for that user.
          ul
            li.text-justify.
              A new user can be created with the 'ADD USER' button (CREATE).
            li.text-justify.
              All users are fetched from the the database and listed here (READ).
            li.text-justify.
              A user can be updated by selecting the pencil icon on the user tile (UPDATE).
            li.text-justify.
              A dialog will popup to edit any fields.A user can also be deleted with the delete icon (DELETE).
        v-row
          v-col(v-for="user in users" cols="6" md="4")
            router-link(:to="`/users/${user.id}`")
              v-card
                v-card-title.pb-3
                  p.title.grey--text.text--darken-2 {{ user.first_name + ' ' + user.last_name}}
                  v-spacer

                  // Edit User
                  EditUserButton(:user="user").pr-2

                  // Delete User
                  DeleteUserButton(:user="user")

                v-card-text
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start id:
                    v-col
                      div.text-start {{ user.id }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start first_name:
                    v-col
                      div.text-start {{ user.first_name }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start last_name:
                    v-col
                      div.text-start {{ user.last_name }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start email:
                    v-col
                      div.text-start {{ user.email }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start username:
                    v-col
                      div.text-start {{ user.username }}
                  v-row.no-gutters.flex-nowrap
                    v-col(cols="6" md="5" lg="4")
                      div.text-start password:
                    v-col
                      div.text-start {{ user.password }}
    span
      CreateUserDialog(
        v-if="showCreateUserDialog"
        @close="showCreateUserDialog = false"
      )
</template>

<script>
// @ is an alias to /src
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
      return this.$store.state.users
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
</style>
