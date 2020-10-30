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
        p Board Page
        v-spacer
        // Button
          v-btn(
            color="blue white--text"
            tile
            @click="showCreateBoardDialog=true"
          ) Add Board
      v-card-text
        v-row
          v-col(v-for="list in lists" cols="4" md="3")
            v-card(:color="list.color")
              p.title.white--text {{ list.name }}
              v-card-text
                v-card(v-for="task in sortTasksByListId(list.id)").ma-3
                  v-card-title
                    span {{ task.name }}
                  v-card-text
                    p Status: {{ task.status }}
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
      lists: [
        { id: 1, name: 'To Do', color: 'red' },
        { id: 2, name: 'In Process', color: 'blue' },
        { id: 3, name: 'Completed', color: 'green' },
      ],
      tasks: [
        { id: 1, name: 'make front end', status: 'in process', list: 2 },
        { id: 2, name: 'ERD diagram', status: 'complete', list: 3 },
        { id: 3, name: 'finish project', status: 'to do', list: 1 },
        { id: 4, name: 'make front end', status: 'in process', list: 2 },
        { id: 5, name: 'ERD diagram', status: 'complete', list: 3 },
        { id: 6, name: 'finish project', status: 'to do', list: 1 }
      ]
    }
  },

  methods: {
    sortTasksByListId (id) {
      return this.tasks.filter(task => {
        return task.list === id
      })
    }
  }
}
</script>

<style lang="scss">

</style>
