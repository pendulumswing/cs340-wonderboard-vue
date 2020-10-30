<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + Flask App"/>
    <v-card>
      <v-card-title>Users</v-card-title>
      <v-card-text>
        <div v-for="user in users">
          <span> Name: {{ user.name }} </span>
          <span>  Email: {{ user.email }} </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },

  data () {
    return {
      users: [
        {name: 'Jason', email: 'jb@email.com'},
        {name: 'Peter', email: 'pw@email.com'},
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
