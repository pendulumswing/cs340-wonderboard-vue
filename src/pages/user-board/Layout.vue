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

        //Debug
          p lists: {{ lists }}
          p state.lists {{ $store.state.lists.lists }}

        // Add List Button
        v-col(cols="12" sm="3" :class="buttonClass").d-flex.pa-0
          v-btn(
            color="grey white--text"
            tile
            @click="showCreateListDialog=true"
          ).mr-3 Add List

          // Add Task Button
          v-btn(
            color="grey white--text"
            tile
            @click="showCreateTaskDialog=true"
          ) Add Task

      v-card-text

        v-row(v-if="this.$vuetify.breakpoint.smAndUp")
          // Lists
          v-col(cols="12" sm="8" md="9" lg="10" xl="11")
            v-row.no-gutters.pa-0.ma-0
              v-col(v-for="list in lists" cols="12" sm="6" md="6" lg="4")
                List(
                  :list="list"
                  :lists="lists"
                  :user="user"
                ).px-2
          // Board Users
          v-col(cols="12" sm="4" md="3" lg="2" xl="1")
            BoardUsers(
              :board="board"
              :boards="boards"
              :user="user"
              :users="users"
              :boardUsers="boardUsers"
              :key="boardUsers.length"
            ).pa-0

        // Alt Order on breakpoint
        // TODO - Modify responsive logic to be more elegant
        v-row(v-else)
          // Board Users
          v-col(cols="12" sm="4" md="3" lg="2" xl="1")
            BoardUsers(
              :board="board"
              :boards="boards"
              :user="user"
              :users="users"
              :boardUsers="boardUsers"
              :key="boardUsers.length"
            ).pa-0
          // Lists
          v-col(cols="12" sm="8" md="9" lg="10" xl="11")
            v-row.no-gutters.pa-0.ma-0
              v-col(v-for="list in lists" cols="12" sm="6" md="6" lg="4")
                List(
                  :list="list"
                  :lists="lists"
                  :user="user"
                ).px-2

        // Description
        v-row.pl-3.pt-7
          div.text-justify.
            This is the board detail page for the selected user and the selected board. It shows all lists
            associated with the board. Each list may or may not have tasks. Each task can be moved between
            lists using the arrow buttons.

          // lists
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

          // tasks
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

          // taskUsers
          div.pt-3.text-start
            div
              span.text-start.subtitle-1 taskUsers
            div
              span.subtitle-2 M-to-M relationship table.
              span  taskUsers is used to join tasks and users tables.
            ul
              li.text-justify.
                A new task_user can be created with the 'add user' button on the task tile.
                There can be zero, one, or multiple users assigned to each task (CREATE).
              li.text-justify.
                A task_user can be deleted with the delete icon next to the name. There is no warning for this action. (DELETE).

          // boardUsers
          div.pt-3.text-start
            div
              span.text-start.subtitle-1 boardUsers
            div
              span.subtitle-2 M-to-M relationship table.
              span  boardUsers is used to join boards and users tables.
            ul
              li.text-justify.
                A new board_user can be created with the 'add member' button at the top of the board (CREATE).
              li.text-justify.
                A board_user can be deleted with the delete icon next to the name.
                This is only available for members that are not the original creator of the board.
                There is no warning for this action. (DELETE).

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
import { mapState } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
import CreateListDialog from '@/dialogs/list/Create'
import CreateTaskDialog from '@/dialogs/task/Create'
import List from './List'
import BoardUsers from './BoardUsers'

export default {
  name: 'home',

  components: {
    HelloWorld,
    CreateListDialog,
    CreateTaskDialog,
    List,
    BoardUsers
  },

  data () {
    return {
      showCreateListDialog: false,
      showCreateTaskDialog: false
    }
  },

  computed: {
    buttonClass () {
      return this.$vuetify.breakpoint.smAndUp ? 'justify-end pa-0 ma-0' : 'justify-center pt-3 px-0 pb-0'
    },
    ...mapState({
      board () {
        return this.$store.state.boards.boards.find(board => {
          return board.id === Number(this.$route.params.boardId)
        })
      },

      boards () {
        return this.$store.state.boards.boards
      },

      lists () {
        return this.$store.state.lists.lists.filter(list => {
          return list.board === Number(this.$route.params.boardId)
        })
      },

      tasks () {
        return this.$store.state.tasks.tasks.filter(task => {
          return task.board === Number(this.$route.params.boardId)
        })
      },

      user () {
        return this.$store.state.users.users.find(user => {
          return user.id === Number(this.$route.params.userId)
        })
      },

      users () {
        return this.$store.state.users.users
      },

      boardUsers () {
        return this.$store.state.boardUsers.boardUsers.filter(boardUser => {
          return boardUser.board === Number(this.$route.params.boardId)
        })
      }
    })
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
