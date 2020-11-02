<template lang="pug">
  div
    v-card(color="transparent").elevation-0
      v-card-title
        div
          router-link(to="/")
            span.grey--text Users
          span.grey--text.mx-1 :
          router-link(:to="`/users/${user.id}`")
            span.grey--text {{ user.first_name }} {{ user.last_name }}
          span.grey--text.mx-1 :
          span.grey--text.text--darken-2 {{ board.name }}
        v-spacer

        // Add Button
        v-btn(
          color="grey white--text"
          tile
          @click="showCreateListDialog=true"
        ).mr-3 Add List

        // Add Task
        v-btn(
          color="grey white--text"
          tile
          @click="showCreateTaskDialog=true"
        ) Add Task

      v-card-text
        v-row
          v-col(v-for="list in lists" cols="12" sm="6" md="4" lg="3")
            List(
              :list="list"
              :lists="lists"
              :user="user"
            )

        // Description
        v-row.pl-3.pt-7
          div.text-justify.
            This is the board detail page for the selected user and the selected board. It shows all lists
            associated with the board. Each list may or may not have tasks. Each task can be moved between
            lists using the arrow buttons.

          div.pt-3
            div.text-start.subtitle-1 lists
            ul
              li.text-justify.
                A new list can be created with the 'ADD LIST' button (CREATE).
              li.text-justify.
                All lists are fetched based on route parameter 'boardId' (READ).
              li.text-justify.
                A list can be updated by selecting the pencil icon on the list tile. A dialog will popup to edit any fields. (UPDATE).
              li.text-justify.
                A list can also be deleted with the delete icon (DELETE).

          div.pt-3
            div.text-start.subtitle-1 tasks
            ul
              li.text-justify.
                A new task can be created with the 'ADD TASK' button (CREATE).
              li.text-justify.
                All tasks are fetched based on each list id (READ).
              li.text-justify.
                A task can be updated by selecting the pencil icon on the tile. A dialog will popup to edit any fields. (UPDATE).
              li.text-justify.
                A task can also be moved to a new list by updated its list attribute (UPDATE).
              li.text-justify.
                A task can also be deleted with the delete icon. There is no warning for this action. (DELETE).

          div.pt-3.text-start
            div
              span.text-start.subtitle-1 task_users
            div
              span.subtitle-2 M-to-M relationship table.
              span  task_users is used to join tasks and users tables.
            ul
              li.text-justify.
                A new task_user can be created with the 'add user' button on the task tile (CREATE).
              li.text-justify.
                A task_user can be deleted with the delete icon next to the name. There is no warning for this action. (DELETE).

        // Debug
          p {{ tasks }}
    span
      CreateListDialog(
        v-if="showCreateListDialog"
        :lists="lists"
        @close="showCreateListDialog = false"
      )
    span
      CreateTaskDialog(
        v-if="showCreateTaskDialog"
        :lists="lists"
        @close="showCreateTaskDialog = false"
      )
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateListDialog from '@/dialogs/list/Create'
import CreateTaskDialog from '@/dialogs/task/Create'
import List from './List'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateListDialog,
    CreateTaskDialog,
    List
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
      return this.$store.state.lists.filter(list => {
        return list.board === Number(this.$route.params.boardId)
      })
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
