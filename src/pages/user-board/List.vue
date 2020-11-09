<template lang="pug">
  div
    v-card(:color="list.color" min-height="800").mb-4
      v-card-title.pb-0
        span.title.white--text {{ list.name }}
        v-spacer

        // Edit User
        EditListButton(:list="list").pr-2

        // Delete User
        DeleteListButton(:list="list")

      v-card-text
        p {{ tasks }}

        // Attributes
        v-expansion-panels(flat).pa-0
          v-expansion-panel.elevation-0.pa-0
            v-expansion-panel-header(:color="list.color").pa-0.body-2 attributes
            v-expansion-panel-content(:color="list.color").text-start
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
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div name:
                v-col
                  div {{ list.name }}
              v-row.no-gutters.flex-nowrap
                v-col(cols="6" md="5" lg="4")
                  div creator:
                v-col
                  div {{ list.creator }}

        // Tasks
        v-card(v-for="task in tasks")
          Task(
            :user="user"
            :task="task"
            :list="list"
            :lists="lists"
          ).my-3
</template>

<script>
import Task from './Task/index'
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
    //   return this.$store.state.boards.boards.filter(board => {
    //     return _.find(this.boardUsers, { board: board.id })
    //   })
    // },

    tasks () {
      return this.$store.state.tasks.tasks.filter(task => {
        return task.list === this.list.id
      })
    },

    role () {
      return this.$store.state.boardUsers.boardUsers.find(boardUser => {
        console.log('boardUser ID: ', boardUser.id, ' boardBU: ', boardUser.board, ' board: ', this.data.id, ' userBU: ', boardUser.user, ' user: ', this.data.user)
        return boardUser.board === this.data.id && boardUser.user === this.data.user
      })
    },

    taskUsers () {
      return this.$store.state.taskUsers.taskUsers.filter(taskUser => {
        return taskUser.task === Number(this.$route.params.userId)
      })
    },

    boards () {
      return this.$store.state.boards.boards.filter(board => {
        return _.find(this.boardUsers, { board: board.id })
      })
    }

  }
}
</script>
