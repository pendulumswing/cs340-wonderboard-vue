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
            router-link(:to="user.url")
              v-card
                p.title.grey--text {{ user.name }}
                p Email {{ user.email }}
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
      users: [
        { id: 1, name: 'Jason', email: 'jb@email.com', url: '/users/User' },
        { id: 2, name: 'Peter', email: 'pw@email.com', url: '/users/User' },
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
