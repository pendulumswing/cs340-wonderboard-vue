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
        p Jason Page
        v-spacer
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateBoardDialog=true"
        ) Add Board
      v-card-text
        v-row
          v-col(v-for="board in boards" cols="4" md="3")
            router-link(:to="board.url")
              v-card
                p.title.grey--text {{ board.name }}
                p Tasks {{ board.tasks }}
    span
    CreateBoardDialog(
      v-if="showCreateBoardDialog"
      @close="showCreateBoardDialog = false"
    )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateBoardDialog from '../dialogs/board/Create'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateBoardDialog
  },

  data () {
    return {
      showCreateBoardDialog: false,
      boards: [
        { id: 1, name: 'Project 1', tasks: 5, url: '/users/Jason/boards/Project1' },
        { id: 2, name: 'Project 2', tasks: 9, url: '/users/Jason/boards/Project1' },
      ]
    }
  }
}
</script>

<style lang="scss">

</style>
