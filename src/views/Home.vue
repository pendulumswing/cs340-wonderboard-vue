<!--<template>-->
<!--  <div class="home">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js + Flask App"/>-->
<!--    <v-card>-->
<!--      <v-card-title>Users</v-card-title>-->
<!--      <v-card-text>-->
<!--        <div v-for="user in users">-->
<!--          <span> Name: {{ user.name }} </span>-->
<!--          <span>  Email: {{ user.email }} </span>-->
<!--        </div>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
<!--  </div>-->
<!--</template>-->
<template lang="pug">
  div
    v-card
      v-card-title
        p Home
        v-spacer
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateUserDialog=true"
        ) Add User
      v-card-text
        v-row
          v-col(v-for="user in users" cols="4" md="3")
            router-link(:to="`/users/${user.id}`")
              v-card
                v-card-title
                  p.title.grey--text {{ user.name }}
                  v-spacer
                  v-btn(
                    color="grey lighten-1 white--text"
                    tile
                    small
                    @click.stop.prevent="user.id += 1"
                  ) ID +1
                v-card-text
                  p.text-start User ID: {{ user.id }}
                  p.text-start Email: {{ user.email }}
    span
    CreateUserDialog(
      v-if="showCreateUserDialog"
      @close="showCreateUserDialog = false"
    )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateUserDialog from '../dialogs/user/Create'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateUserDialog
  },

  data () {
    return {
      showCreateUserDialog: false,
      // users: [
      //   { id: 1, name: 'Jason', email: 'jb@email.com', url: '/users/User' },
      //   { id: 2, name: 'Peter', email: 'pw@email.com', url: '/users/User' },
      // ]
    }
  },

  computed: {
    users () {
      return this.$store.state.users
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
