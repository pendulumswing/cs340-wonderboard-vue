<template lang="pug">
  div
    v-card
      v-card-title
        p {{ user.name }}'s {{ board.name }} Board
        v-spacer

        // Add Button
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateListDialog=true"
        ).mr-3 Add List

        // Add Task
        v-btn(
          color="blue white--text"
          tile
          @click="showCreateTaskDialog=true"
        ) Add Task

      v-card-text
        v-row
          v-col(v-for="list in lists" cols="12" sm="6" md="4" lg="3")
            v-card(:color="list.color")
              v-card-title
                p.title.white--text {{ list.name }}
              v-card-text
                v-card(v-for="task in sortTasksByListId(list.id)").ma-3
                  v-card-title
                    span {{ task.name }}
                  v-card-text
                    p Status: {{ task.status }}

        // Debug
          p {{ tasks }}
    span
      CreateListDialog(
        v-if="showCreateListDialog"
        @close="showCreateListDialog = false"
      )
    span
      CreateTaskDialog(
        v-if="showCreateTaskDialog"
        @close="showCreateTaskDialog = false"
      )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateListDialog from '@/dialogs/list/Create'
import CreateTaskDialog from '@/dialogs/task/Create'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateListDialog,
    CreateTaskDialog
  },

  data () {
    return {
      showCreateListDialog: false,
      showCreateTaskDialog: false
    }
  },

  computed: {
    board () {
      return this.$store.state.boards.find(board => {
        return board.id === Number(this.$route.params.boardId)
      })
    },

    lists () {
      return this.$store.state.lists
    },

    tasks () {
      return this.$store.state.tasks.filter(task => {
        return task.board === Number(this.$route.params.boardId)
      })
    },

    user () {
      return this.$store.state.users.find(user => {
        return user.id === Number(this.$route.params.userId)
      })
    },
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
