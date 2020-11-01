<template lang="pug">
  div
    v-card(:color="list.color")
      v-card-title
        span.title.white--text {{ list.name }}
        v-spacer

        // Edit User
        EditListButton(:list="list").pr-2

        // Delete User
        DeleteListButton(:list="list")

      // Attributes
      v-card-text.text-start.white--text
        v-row.no-gutters.flex-nowrap
          v-col(cols="6" md="5" lg="4")
            div id:
          v-col
            div {{ list.id }}
        v-row.no-gutters.flex-nowrap
          v-col(cols="6" md="5" lg="4")
            div board:
          v-col
            div {{ list.board }}
        v-row.no-gutters.flex-nowrap
          v-col(cols="6" md="5" lg="4")
            div index:
          v-col
            div {{ list.index }}

        // Tasks
        v-card(v-for="task in tasks")
          Task(
            :user="user"
            :task="task"
            :list="list"
            :lists="lists"
          ).my-3
          //
            v-card-title
              span {{ task.name }}
            v-card-text
              p Status: {{ task.status }}
            v-row
              v-col(v-for="task in tasks" cols="6" md="4" lg="3")
                Task(
                  :user="user"
                  :task="task"
                )
</template>

<script>
import Task from './Task'
import DeleteListButton from './DeleteListButton'
import EditListButton from './EditListButton'
import _ from 'lodash'

export default {
  name: 'list',

  components: {
    Task,
    DeleteListButton,
    EditListButton
  },

  props: {
    list: {
      type: Object,
      default: undefined
    },
    lists: {
      type: [Array, Object],
      default: undefined
    },
    user: {
      type: Object,
      default: undefined
    }
  },

  computed: {
    // boards () {
    //   return this.$store.state.boards.filter(board => {
    //     return _.find(this.boardUsers, { board: board.id })
    //   })
    // },

    tasks () {
      return this.$store.state.tasks.filter(task => {
        return task.list === this.list.id
      })
    }
  }
}
</script>
